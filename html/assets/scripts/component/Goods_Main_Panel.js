class Goods_Main_Panel extends React.Component {
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

	handleClickEdit(goods) {
		fn_api({
			"apiName": "Goods_QueryDetail_Api",
			"goodsId": goods.id
		}, function(resp){
			goods_Edit_Modal.show({id:goods.id, data:resp.data});
		});
	}

	handleClickDelete(goods) {
		var panel = this;
		swal({
			title: "确定下架吗？",
			icon: "warning",
			buttons: ["取消", "确定"],
			dangerMode: true
		}).then((willDelete) => {
			if (willDelete) {
				fn_api({
					"apiName": "Goods_SoldOut_Api",
					"goodsId": goods.id
				}, function(resp){
					swal("下架成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	handleClickAdd() {
		goods_Add_Modal.show();
	}

	reload() {
		var panel = this;
		fn_api({
			"apiName": "Goods_QueryList_Api",
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
							商品库
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
													<th>图片</th>
													<th>商品名称</th>
													<th>原价<small>(元)</small></th>
													<th>一级<small>(元)</small></th>
													<th>二级<small>(元)</small></th>
													<th>三级<small>(元)</small></th>
													<th>库存<small>(件)</small></th>
													<th>上架时间</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map((x) => <tr>
													<td>{x.reorder}</td>
													<td>
														<img height="60px" src={JSON.parse(x.pictureUrls)[0]}/>
													</td>
													<td>{x.name}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.price)}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.priceLevel1)}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.priceLevel2)}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.priceLevel3)}</td>
													<td>{x.stock}</td>
													<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickEdit(x)}><i className="fa fa-pencil" aria-hidden="true"></i> 编辑</button>
														&nbsp;
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickDelete(x)}><i className="fa fa-times" aria-hidden="true"></i> 下架</button>
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
