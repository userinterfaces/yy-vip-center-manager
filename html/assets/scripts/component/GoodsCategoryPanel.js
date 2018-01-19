class GoodsCategoryPanel extends React.Component {
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
			editGoodsCategoryModal.show({id:category.id, data:resp.data});
		});
	}

	reload() {
		var modal = this;
		fn_api({
			"apiName": "GoodsCategory_QueryAll_Api"
		}, function(resp){
			modal.setState({data: resp.data});
		});
	}

	render() {
		return (
			<div className="main">
				<div className="main-content">
					<div className="container-fluid">
						<h3 className="page-title">商品分类</h3>
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
													<th>排序号<small>（小的在前）</small></th>
													<th>名称</th>
													<th>操作</th>
												</tr>
											</thead>
											<tbody>
												{this.state.data.map((x) => <tr>
													<td>{x.reorder}</td>
													<td>{x.name}</td>
													<td><button className="btn btn-danger btn-sm" onClick={e => this.handleClickEdit(x)}>编辑</button></td>
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

var goodsCategoryPanel = ReactDOM.render(<GoodsCategoryPanel />, document.getElementById("mainContainer"));
