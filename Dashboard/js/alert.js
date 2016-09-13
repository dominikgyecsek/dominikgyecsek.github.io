var Modal = function () {

	this.msgs = {
		11: ["Are you sure you want to delete this note?", "Yes", "note-delete", "No"],
		13: ["Are you sure you want to delete this time tracker?", "Yes", "note-delete", "No"],
		15: ["Are you sure you want to delete this tally?", "Yes", "note-delete", "No"],
	};

};

Modal.prototype.show = function(id, data) {

	var msg = this.msgs[id];
	$("#modal-msg").text(msg[0]);
	$("#modal-procede").text(msg[1]).addClass(msg[2]).attr("data-id", data).attr("data-module", id);
	$("#modal-close").text(msg[3]);
	$("#modal-wrapper").show();

}

Modal.prototype.hide = function() {

	$("#modal-wrapper").hide();

}

var modal = new Modal();