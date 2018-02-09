class User_Edit_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			data: {
				level: null,
				isDisable: null
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$('#user_Edit_Modal').on('shown.bs.modal', function(e){
			$("#user_Edit_Modal select")[0].focus();
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
			"apiName": "User_Update_Api",
			"userId": this.state.id,
			"level": this.state.data.level,
			"isDisable": this.state.data.isDisable
		}, function(resp){
			toastr.info("修改成功");
			modal.hide();
			user_Main_Panel.reload();
		});
	}

	show(state) {
		this.setState(state);
		$("#user_Edit_Modal").modal({keyboard: true});
	}

	hide() {
		$("#user_Edit_Modal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="user_Edit_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>编辑用户</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">等级</label>
									<div className="col-sm-7">
										<select className="form-control" value={this.state.data.level} onChange={e => this.handleChange(e, "level")}>
											<option value="0">普通用户</option>
											<option value="1">一级代理</option>
											<option value="2">二级代理</option>
											<option value="3">三级代理</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">是否禁用</label>
									<div className="col-sm-7">
										<select className="form-control" value={this.state.data.isDisable} onChange={e => this.handleChange(e, "isDisable")}>
											<option value="0">启用</option>
											<option value="1">禁用</option>
										</select>
									</div>
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

var user_Edit_Modal = ReactDOM.render(<User_Edit_Modal />, $("<div></div>").appendTo(document.body)[0]);
