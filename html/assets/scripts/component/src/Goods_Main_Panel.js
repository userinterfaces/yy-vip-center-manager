class Goods_Main_Panel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			data: [],
			pager: {
				isFirstPage: null,
				isLastPage: null,
				pageIndex: null,
				pageSize: null,
				totalPages: null,
				totalRecords: null
			},
			neighborPageIndexs: [],
			searchGoodsCategoryId: ""
		};
		this.handleClickSetBuyLimit = this.handleClickSetBuyLimit.bind(this);
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.reload = this.reload.bind(this);
		this.handleClickPageIndex = this.handleClickPageIndex.bind(this);
	}

	componentDidMount() {
		this.reload();
		// 加载商品分类数据
		var panel = this;
		fn_api({
			"apiName": "GoodsCategory_QueryAll_Api"
		}, function(resp){
			panel.setState({categories: resp.data});
		});
	}

	handleClickSetBuyLimit(goods) {
		fn_api({
			"apiName": "Goods_QueryDetail_Api",
			"goodsId": goods.id
		}, function(resp){
			goods_SetBuyLimit_Main_Modal.show({goodsId:goods.id, goodsDetail:resp.data});
		});
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

	reload(pageIndex, pageSize) {
		if (pageIndex == null) {
			pageIndex = 0;
		}
		if (pageSize == null) {
			pageSize = 15;
		}
		var panel = this;
		fn_api({
			"apiName": "Goods_QueryList_Api",
			"pageIndex": pageIndex,
			"pageSize": pageSize,
			"searchCategoryId": this.state.searchGoodsCategoryId
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

	handleChangeSearchGoodsCategoryId(e) {
		this.setState({searchGoodsCategoryId: e.target.value}, function() {
			this.reload();
		});
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">
							商品库
							<div className="pull-right" style={{paddingLeft: "20px"}}>
								<button className="btn btn-danger btn-sm" onClick={this.handleClickAdd}><i className="fa fa-plus" aria-hidden="true"></i> 添加</button>
							</div>
							<div className="pull-right">
								<select className="form-control" style={{minWidth: "140px", height: "30px"}} value={this.state.searchGoodsCategoryId} onChange={e => this.handleChangeSearchGoodsCategoryId(e)}>
									<option value="">请选择商品分类</option>
									{this.state.categories.map(x => <option value={x.id}>{x.name}</option>)}
								</select>
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
													<th>商品分类</th>
													<th>商品名称</th>
													<th>原价<small>(元)</small></th>
													<th>一级<small>(元)</small></th>
													<th>二级<small>(元)</small></th>
													<th>三级<small>(元)</small></th>
													<th>库存<small>(件)</small></th>
													<th>备注模板</th>
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
													<td>{x.categoryName}</td>
													<td>{x.name}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.price)}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.priceLevel1)}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.priceLevel2)}</td>
													<td><i className="fa fa-jpy" aria-hidden="true"></i>{fn_fen2yuan_in_thousands(x.priceLevel3)}</td>
													<td>{x.stock}</td>
													<td>
														{x.commentTemplate == 0 && <p>-</p>}
														{x.commentTemplate == 1 && <span className="label label-info">第一套</span>}
														{x.commentTemplate == 2 && <span className="label label-info">第二套</span>}
														{x.commentTemplate == 3 && <span className="label label-info">第三套</span>}
													</td>
													<td>{fn_format_date(new Date(x.dtCreate), "yyyy-MM-dd hh:mm:ss")}</td>
													<td>
														<button className="btn btn-default btn-sm" onClick={e => this.handleClickSetBuyLimit(x)}><i className="fa fa-pencil" aria-hidden="true"></i> 设置限购</button>
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
