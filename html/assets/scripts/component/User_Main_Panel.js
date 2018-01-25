class User_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.reload = this.reload.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	handleClickEdit(user) {
		fn_api({
			"apiName": "User_QueryDetail_Api",
			"userId": user.id
		}, function(resp){
			user_Edit_Modal.show({id:user.id, data:resp.data});
		});
	}

	reload() {
		var panel = this;
		fn_api({
			"apiName": "User_QueryList_Api",
			"pageIndex": 0,
			"pageSize": 15
		}, function(resp){
			panel.setState({data: resp.data});
		});
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">
							用户管理
						</h3>
						<div className="row">
							<div className="col-md-12">
								<div className="panel">
									<div className="panel-heading">
										<h3 className="panel-title">Table</h3>
									</div>
									<div className="panel-body">
										<table className="table table-striped table-hover">
											<thead>
												<tr>
													<th>用户ID</th>
													<th>昵称</th>
													<th>手机号</th>
													<th>等级</th>
													<th>余额<small>(元)</small></th>
													<th>注册时间</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map((x) => <tr>
													<td>{x.id}</td>
													<td>{x.nickname}</td>
													<td>{x.phone}</td>
													<td>
														{x.level == 0 && "普通用户"}
														{x.level == 1 && "一级代理"}
														{x.level == 2 && "二级代理"}
														{x.level == 3 && "三级代理"}
													</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.walletAmount)}</td>
													<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickEdit(x)}><i className="fa fa-pencil" aria-hidden="true"></i> 提权</button>
													</td>
												</tr>)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
