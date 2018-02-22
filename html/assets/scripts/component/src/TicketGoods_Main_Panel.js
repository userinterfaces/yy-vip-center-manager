class TicketGoods_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			pager: {
				isFirstPage: null,
				isLastPage: null,
				pageIndex: null,
				pageSize: null,
				totalPages: null,
				totalRecords: null
			},
			neighborPageIndexs: []
		};
		this.handleClickReplenish = this.handleClickReplenish.bind(this);
		this.handleClickShowTickets = this.handleClickShowTickets.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.reload = this.reload.bind(this);
		this.handleClickPageIndex = this.handleClickPageIndex.bind(this);
	}

	componentDidMount() {
		this.reload();
	}

	handleClickReplenish(goods) {
		ticketGoods_Replenish_Modal.show({id: goods.id});
	}

	handleClickShowTickets(goods) {
		fn_api({
			"apiName": "TicketGoods_QueryTickets_Api",
			"ticketGoodsId": goods.id
		}, function(resp){
			ticketGoods_ShowTickets_Modal.show({tickets: resp.data});
		});
	}

	handleClickEdit(goods) {
		fn_api({
			"apiName": "TicketGoods_QueryDetail_Api",
			"ticketGoodsId": goods.id
		}, function(resp){
			ticketGoods_Edit_Modal.show({id:goods.id, data:resp.data});
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
					"apiName": "TicketGoods_SoldOut_Api",
					"ticketGoodsId": goods.id
				}, function(resp){
					swal("下架成功！", {icon: "success", buttons: "确定"});
					panel.reload();
				});
			}
		});
	}

	handleClickAdd() {
		ticketGoods_Add_Modal.show();
	}

	reload(pageIndex, pageSize) {
		if (pageIndex == null) {
			pageIndex = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		var panel = this;
		fn_api({
			"apiName": "TicketGoods_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize
		}, function(resp){
			panel.setState({data: resp.data, pager: resp.pager, neighborPageIndexs: fn_getNeighborPageIndexs(resp.pager, 5)});
		});
	}

	handleClickPageIndex(pageIndex) {
		if (pageIndex == "first" && this.state.pager.isFirstPage == 0) {
			this.reload(0, 15);
		} else if (pageIndex == "last" && this.state.pager.isLastPage == 0) {
			this.reload(this.state.pager.totalPages - 1, 15);
		} else if (pageIndex == "previous" && this.state.pager.isFirstPage == 0) {
			this.reload(this.state.pager.pageIndex - 1, 15);
		} else if (pageIndex == "next" && this.state.pager.isLastPage == 0) {
			this.reload(this.state.pager.pageIndex + 1, 15);
		} else if (typeof(pageIndex) == "number") {
			this.reload(pageIndex, 15);
		}
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">
							卡密商品库
							<div className="pull-right" style={{paddingLeft: "20px"}}>
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
													<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickReplenish(x)}> 补货</button>
														&nbsp;
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickShowTickets(x)}> 查看剩余卡密</button>
														&nbsp;
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickEdit(x)}><i className="fa fa-pencil" aria-hidden="true"></i> 编辑</button>
														&nbsp;
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickDelete(x)}><i className="fa fa-times" aria-hidden="true"></i> 下架</button>
													</td>
												</tr>)}
											</tbody>
										</table>
										<div className="row">
											<div className="col-md-12">
												<span className="pull-right">
													<ul className="pagination">
														<li className={this.state.pager.isFirstPage == 1 ? "disabled" : ""} onClick={e => this.handleClickPageIndex("first")}><a href="#">首页</a></li>
														<li className={this.state.pager.isFirstPage == 1 ? "disabled" : ""} onClick={e => this.handleClickPageIndex("previous")}><a href="#">上一页</a></li>
														{this.state.neighborPageIndexs.map(x => <li className={this.state.pager.pageIndex == x ? "active" : ""} onClick={e => this.handleClickPageIndex(x)}>
															<a href="#">{x+1}</a>
														</li>)}
														<li className={this.state.pager.isLastPage == 1 ? "disabled" : ""} onClick={e => this.handleClickPageIndex("next")}><a href="#">下一页</a></li>
														<li className={this.state.pager.isLastPage == 1 ? "disabled" : ""} onClick={e => this.handleClickPageIndex("last")}><a href="#">末页</a></li>
													</ul>
												</span>
												<span className="pull-right">
													<p style={{paddingTop: "28px", paddingBottom: "21px", paddingRight: "25px"}}>
														<small>当前第{this.state.pager.pageIndex+1}/{this.state.pager.totalPages}页，共{this.state.pager.totalRecords}条数据</small>
													</p>
												</span>
											</div>
										</div>
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
