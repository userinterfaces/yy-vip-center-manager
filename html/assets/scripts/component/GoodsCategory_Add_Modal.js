class GoodsCategory_Add_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: null,
			reorder: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#goodsCategory_Add_Modal').on('shown.bs.modal', function(e){
			$("#goodsCategory_Add_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleSubmit() {
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_Add_Api",
			"name": this.state.name,
			"reorder": this.state.reorder
		}, function(resp){
			toastr.info("添加成功");
			modal.hide();
			goodsCategory_Main_Panel.reload();
		});
	}

	show() {
		$("#goodsCategory_Add_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goodsCategory_Add_Modal").modal("hide");
		this.setState({
			name: "",
			reorder: ""
		});
	}

	render() {
		return (
			<div className="modal fade" id="goodsCategory_Add_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>添加商品分类</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">名字</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.name} onChange={e => this.handleChange(e, "name")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">排序号<small>(小的在前)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.reorder} onChange={e => this.handleChange(e, "reorder")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleSubmit}>添加</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var goodsCategory_Add_Modal = ReactDOM.render(<GoodsCategory_Add_Modal />, $("<div></div>").appendTo(document.body)[0]);
