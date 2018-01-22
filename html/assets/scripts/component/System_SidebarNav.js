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
				name: "User_Main_Panel",
				title: "用户管理",
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
			<div id="sidebar-nav" className="sidebar">
				<div className="sidebar-scroll">
					<nav>
						<ul className="nav">
							{this.state.data.map(x => <li onClick={e => this.handleClick(x)}>
								<a href="#" className={this.state.active == x.name ? "active" : ""}><i className={x.icon}></i> <span>{x.title}</span></a>
							</li>)}
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}

var system_SidebarNav = ReactDOM.render(<System_SidebarNav />, document.getElementById("system_SidebarNav_Container"));
