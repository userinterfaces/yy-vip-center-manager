class System_Footer extends React.Component {

	render() {
		return (
			<footer>
				<div className="container-fluid">
					<p className="copyright">&copy; 2018 YY大户业务网. All Rights Reserved.</p>
				</div>
			</footer>
		);
	}
}

var system_Footer = ReactDOM.render(<System_Footer />, document.getElementById("system_Footer_Container"));
