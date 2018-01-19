class EditMyPasswordModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: null,
			newPassword: null,
			repeatNewPassword: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		$("#editMyPasswordModal").on('shown.bs.modal', function(e){
			$("#editMyPasswordModal input")[0].focus();
		});
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleSubmit() {
		var modal = this;
		if (this.state.repeatNewPassword != this.state.newPassword) {
			toastr.error("两次输入的密码不一致");
			return;
		}
		fn_api({
			"apiName": "System_UpdateMyPassword_Api",
			"oldLoginPassword": this.state.oldPassword,
			"newLoginPassword": this.state.newPassword
		}, function(){
			toastr.info("修改成功");
			modal.hide();
		});
	}

	show() {
		$("#editMyPasswordModal").modal({keyboard: true});
	}

	hide() {
		$("#editMyPasswordModal").modal("hide");
		this.setState({
			oldPassword: "",
			newPassword: "",
			repeatNewPassword: ""
		});
	}

	render() {
		return (
			<div className="modal fade" id="editMyPasswordModal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>修改密码</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">旧密码</label>
									<div className="col-sm-7"><input type="text" className="form-control" placeholder="请输入旧密码" value={this.state.oldPassword} onChange={e => this.handleChange(e, "oldPassword")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">新密码</label>
									<div className="col-sm-7"><input type="text" className="form-control" placeholder="请输入新密码" value={this.state.newPassword} onChange={e => this.handleChange(e, "newPassword")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">再次输入新密码</label>
									<div className="col-sm-7"><input type="text" className="form-control" placeholder="请再次输入新密码" value={this.state.repeatNewPassword} onChange={e => this.handleChange(e, "repeatNewPassword")} /></div>
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

var editMyPasswordModal = ReactDOM.render(<EditMyPasswordModal />, $("<div></div>").appendTo(document.body)[0]);
