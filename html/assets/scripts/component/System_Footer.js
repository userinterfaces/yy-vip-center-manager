class System_Footer extends React.Component {

	render() {
		return (
			React.createElement("footer", null, 
				React.createElement("div", {className: "container-fluid"}, 
					React.createElement("p", {className: "copyright"}, "© 2018 YY大户业务网. All Rights Reserved.")
				)
			)
		);
	}
}

var system_Footer = ReactDOM.render(React.createElement(System_Footer, null), document.getElementById("system_Footer_Container"));
