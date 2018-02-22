class TicketGoods_Add_Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pictures: [],
			reorder: null,
			name: null,
			desc: null,
			price: null,
			priceLevel1: null,
			priceLevel2: null,
			priceLevel3: null,
			tickets: null
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		var modal = this;
		// 焦点
		$('#ticketGoods_Add_Modal').on('shown.bs.modal', function(e){
			$("#ticketGoods_Add_Modal input")[0].focus();
		});
		// 图片上传
		$("#ticketGoods_Add_Modal input[type=file]").fileinput({
			showUpload : false,
			showRemove : false,
			language : 'zh',
			allowedPreviewTypes : [ 'image' ],
			allowedFileExtensions : [ 'jpg', 'jpeg', 'png', 'gif' ],
			maxFileSize : 2000,
			uploadUrl: "http://182.92.74.206:8082/micro-file-server",
			uploadAsync: true,
			maxFileCount: 6
		});
		$("#ticketGoods_Add_Modal input[type=file]").on("fileuploaded", function(event, data, previewId, index) {
			var resp = data.response;
			if (resp.code == 0) {
				var pictures = modal.state.pictures;
				pictures[index] = resp.data[0].url;
				modal.setState({pictures: pictures});
			} else {
				toastr.error("图片上传失败");
			}
		});
		$("#ticketGoods_Add_Modal input[type=file]").on("filesuccessremove", function(event, previewId, index) {
			var pictures = modal.state.pictures;
			pictures[index] = null;
			modal.setState({pictures: pictures});
		});
	}

	handleChange(e, field) {
		var state = {};
		state[field] = e.target.value;
		this.setState(state);
	}

	handleSubmit() {
		var modal = this;
		var pictureUrls = [];
		for(var i = 0; i < this.state.pictures.length; i++) {
			var url = this.state.pictures[i];
			if (url != null) {
				pictureUrls.push(url);
			}
		}
		fn_api({
			"apiName": "TicketGoods_Publish_Api",
			"reorder": this.state.reorder,
			"pictureUrls": JSON.stringify(pictureUrls),
			"name": this.state.name,
			"desc": this.state.desc,
			"price": this.state.price,
			"priceLevel1": this.state.priceLevel1,
			"priceLevel2": this.state.priceLevel2,
			"priceLevel3": this.state.priceLevel3,
			"tickets": this.state.tickets
		}, function(resp){
			toastr.info("添加成功");
			modal.hide();
			ticketGoods_Main_Panel.reload();
		});
	}

	show() {
		$("#ticketGoods_Add_Modal").modal({keyboard: true});
	}

	hide() {
		$("#ticketGoods_Add_Modal").modal("hide");
	}

	render() {
		return (
			<div className="modal fade" id="ticketGoods_Add_Modal" tabindex="-1" role="dialog" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4>添加卡密商品</h4>
						</div>
						<div className="modal-body">
							<form className="form-horizontal" role="form">
								<div className="form-group">
									<label className="col-sm-3 control-label">选择图片</label>
									<div className="col-sm-7">
										<input type="file" multiple/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">名字</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.name} onChange={e => this.handleChange(e, "name")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">商品描述</label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.desc} onChange={e => this.handleChange(e, "desc")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">价格<small>(分)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.price} onChange={e => this.handleChange(e, "price")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">一级代理<small>(分)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.priceLevel1} onChange={e => this.handleChange(e, "priceLevel1")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">二级代理<small>(分)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.priceLevel2} onChange={e => this.handleChange(e, "priceLevel2")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">三级代理<small>(分)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.priceLevel3} onChange={e => this.handleChange(e, "priceLevel3")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">卡密列表<small>(换行符分隔)</small></label>
									<div className="col-sm-7"><textarea className="form-control" value={this.state.tickets} onChange={e => this.handleChange(e, "tickets")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label">排序号<small>(小的在前)</small></label>
									<div className="col-sm-7"><input type="text" className="form-control" value={this.state.reorder} onChange={e => this.handleChange(e, "reorder")} /></div>
								</div>
								<div className="form-group">
									<label className="col-sm-3 control-label"></label>
									<div className="col-sm-7"><a href="#" className="btn btn-danger" role="button" onClick={this.handleSubmit}>添加</a></div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

var ticketGoods_Add_Modal = ReactDOM.render(<TicketGoods_Add_Modal />, $("<div></div>").appendTo(document.body)[0]);
