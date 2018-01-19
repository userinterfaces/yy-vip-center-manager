class EditGoodsCategoryModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: {
				name: null
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		$('#editGoodsCategoryModal').on('shown.bs.modal', function(e){
			$("#editGoodsCategoryModal input")[0].focus();
		});
	}

	handleChange(e) {
		var data = this.state.data;
		data.name = e.target.value;
		this.setState({data: data});
	}

	handleClick() {
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_Update_Api",
			"categoryId": this.state.id,
			"name": this.state.data.name
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			goodsCategoryPanel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#editGoodsCategoryModal").modal({keyboard: true});
	}

	hide() {
		$("#editGoodsCategoryModal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="editGoodsCategoryModal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>编辑商品分类</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">名字</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.name} onChange={this.handleChange} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleClick}>修改</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var editGoodsCategoryModal = ReactDOM.render(<EditGoodsCategoryModal />, $("<div></div>").appendTo(document.body)[0]);
