class GoodsCategory_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.reload = this.reload.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	handleClickEdit(category) {
		fn_api({
			"apiName": "GoodsCategory_QueryDetail_Api",
			"categoryId": category.id
		}, function(resp){
			goodsCategory_Edit_Modal.show({id:category.id, data:resp.data});
		});
	}

	handleClickDelete(category) {
		var panel = this;
		swal({
			title: "确定删除吗？",
			icon: "warning",
			buttons: ["取消", "确定"],
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				fn_api({
					"apiName": "GoodsCategory_Delete_Api",
					"categoryId": category.id
				}, function(resp){
					swal("删除成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	handleClickAdd() {
		goodsCategory_Add_Modal.show();
	}

	reload() {
		var panel = this;
		fn_api({
			"apiName": "GoodsCategory_QueryAll_Api"
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
							商品分类
							<div className="pull-right">
								<button className="btn btn-danger btn-sm" onClick={this.handleClickAdd}><i className="fa fa-plus" aria-hidden="true"></i> 添加</button>
							</div>
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
													<th>排序号</th>
													<th>名称</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map((x) => <tr>
													<td>{x.reorder}</td>
													<td>{x.name}</td>
													<td>
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickEdit(x)}><i className="fa fa-pencil" aria-hidden="true"></i> 编辑</button>
														&nbsp;
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickDelete(x)}><i className="fa fa-times" aria-hidden="true"></i> 删除</button>
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
