class GoodsCategory_Edit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: {
				name: null,
				desc: null,
				reorder: null
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		$('#goodsCategory_Edit_Modal').on('shown.bs.modal', function(e){
			$("#goodsCategory_Edit_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var data = this.state.data;
		data[field] = e.target.value;
		this.setState({data: data});
	}

	handleClick() {
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_Update_Api",
			"categoryId": this.state.id,
			"name": this.state.data.name,
			"desc": this.state.data.desc,
			"reorder": this.state.data.reorder
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			goodsCategory_Main_Panel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#goodsCategory_Edit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goodsCategory_Edit_Modal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="goodsCategory_Edit_Modal" tabindex="-1" role="dialog" aria-hidden="true">
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
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.name} onChange={e => this.handleChange(e, "name")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">描述</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.desc} onChange={e => this.handleChange(e, "desc")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">排序号<small>(小的在前)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.reorder} onChange={e => this.handleChange(e, "reorder")} /></div>
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

var goodsCategory_Edit_Modal = ReactDOM.render(<GoodsCategory_Edit_Modal />, $("<div></div>").appendTo(document.body)[0]);
