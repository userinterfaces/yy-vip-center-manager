class System_SidebarNav extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: "GoodsCategory_Main_Panel",
			data: [{
				name: "GoodsCategory_Main_Panel",
				title: "商品分类",
				icon: "lnr lnr-dice"
			}, {
				name: "Goods_Main_Panel",
				title: "商品库",
				icon: "lnr lnr-dice"
			}, {
				name: "TicketGoods_Main_Panel",
				title: "卡密商品库",
				icon: "lnr lnr-dice"
			}, {
				name: "User_Main_Panel",
				title: "用户管理",
				icon: "lnr lnr-dice"
			}, {
				name: "RechargeCard_Main_Panel",
				title: "充值卡管理",
				icon: "lnr lnr-dice"
			}, {
				name: "MixOrder_Main_Panel",
				title: "订单管理",
				icon: "lnr lnr-dice"
			}]
		};
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if( $('.sidebar-scroll').length > 0 ) {
			$('.sidebar-scroll').slimScroll({
				height: '95%',
				wheelStep: 2,
			});
		}

		this.loadMainPanel(this.state.active);
	}

	handleClick(panel) {
		this.loadMainPanel(panel.name);
	}

	loadMainPanel(name) {
		this.setState({active: name});
		var varName = name.substring(0, 1).toLowerCase() + name.substring(1);
		window[varName] = ReactDOM.render(React.createElement(eval(name), null, null), document.getElementById("mainContainer"));
	}

	render() {
		return (
			React.createElement("div", {id: "sidebar-nav", className: "sidebar"}, 
				React.createElement("div", {className: "sidebar-scroll"}, 
					React.createElement("nav", null, 
						React.createElement("ul", {className: "nav"}, 
							this.state.data.map(x => React.createElement("li", {onClick: e => this.handleClick(x)}, 
								React.createElement("a", {href: "#", className: this.state.active == x.name ? "active" : ""}, React.createElement("i", {className: x.icon}), " ", React.createElement("span", null, x.title))
							))
						)
					)
				)
			)
		);
	}
}

var system_SidebarNav = ReactDOM.render(React.createElement(System_SidebarNav, null), document.getElementById("system_SidebarNav_Container"));
