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
			React.createElement("div", {className: "main"}, 
				React.createElement("div", {className: "main-content"}, 
					React.createElement("div", {className: "container-fluid"}, 
						React.createElement("h3", {className: "page-title"}, 
							"商品分类", 
							React.createElement("div", {className: "pull-right"}, 
								React.createElement("button", {className: "btn btn-danger btn-sm", onClick: this.handleClickAdd}, React.createElement("i", {className: "fa fa-plus", "aria-hidden": "true"}), " 添加")
							)
						), 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-md-12"}, 
								React.createElement("div", {className: "panel"}, 
									React.createElement("div", {className: "panel-heading"}, 
										React.createElement("h3", {className: "panel-title"}, "Table")
									), 
									React.createElement("div", {className: "panel-body"}, 
										React.createElement("table", {className: "table table-striped table-hover"}, 
											React.createElement("thead", null, 
												React.createElement("tr", null, 
													React.createElement("th", null, "排序号"), 
													React.createElement("th", null, "名称"), 
													React.createElement("th", null, "描述"), 
													React.createElement("th", null, "操作")
												)
											), 
											React.createElement("tbody", null, 
												this.state.data.map((x) => React.createElement("tr", null, 
													React.createElement("td", null, x.reorder), 
													React.createElement("td", null, x.name), 
													React.createElement("td", null, x.desc), 
													React.createElement("td", null, 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickEdit(x)}, React.createElement("i", {className: "fa fa-pencil", "aria-hidden": "true"}), " 编辑"), 
														" ", 
														React.createElement("button", {className: "btn btn-default btn-sm", onClick: e => this.handleClickDelete(x)}, React.createElement("i", {className: "fa fa-times", "aria-hidden": "true"}), " 删除")
													)
												))
											)
										)
									)
								)
							)
						)
					)
				)
			)
		);
	}
}
