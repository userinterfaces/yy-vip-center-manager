class Goods_Edit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: {
				name: null,
				desc: null,
				pictureUrls: "[\"test\"]",
				reorder: null
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#goods_Edit_Modal').on('shown.bs.modal', function(e){
			$("#goods_Edit_Modal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var data = this.state.data;
		data[field] = e.target.value;
		this.setState({data: data});
	}

	handleSubmit() {
		var modal = this;
		fn_api({
			"apiName": "Goods_Update_Api",
			"goodsId": this.state.id,
			"name": this.state.data.name,
			"desc": this.state.data.desc,
			"pictureUrls": this.state.data.pictureUrls,
			"reorder": this.state.data.reorder
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			goods_Main_Panel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#goods_Edit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#goods_Edit_Modal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="goods_Edit_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>编辑商品</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">名字</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.name} onChange={e => this.handleChange(e, "name")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">商品描述</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.desc} onChange={e => this.handleChange(e, "desc")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">排序号<small>(小的在前)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.data.reorder} onChange={e => this.handleChange(e, "reorder")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleSubmit}>修改</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var goods_Edit_Modal = ReactDOM.render(<Goods_Edit_Modal />, $("<div></div>").appendTo(document.body)[0]);
