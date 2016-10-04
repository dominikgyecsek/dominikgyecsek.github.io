var Tally = function () {}

Tally.prototype.create = function(id) {

	var DOM = "\
		<div data-theme='" + m.getDefaultSkin(15) + "' data-module='15' data-id=" + id + " class='frame tally open-module'>\
			" + m.controllers + "\
			<div class='content'>\
				<div class='contenteditable title' contenteditable='true' onclick='$(this).focus();'>" +  tally.randomCategory() + "</div>\
				<span class='info tally-count contenteditable' contenteditable='true' onclick='$(this).focus();'> 0 </span>\
				<span class='big-hide-opacity'><button class='tally-btn tally-dec left'> <i class='material-icons'>remove</i> </button>\
				<button class='tally-btn tally-inc right'> <i class='material-icons'>add</i> </button></span>\
			</div>\
		</div>\
	";

	$("#tallies").append(DOM);
	$(".tally").last().draggable({ handle: '.controllers', containment: '#dashboard' }).css("position", "absolute");
	
}

Tally.prototype.randomCategory = function() {

	const categories = [
		"Movies seen",
		"Books read",
		"Cookies bought",
		"Games downloaded"
	];

	return categories[m.random(0, categories.length-1)];

}

Tally.prototype.increase = function(id) {

	$this = id;
	var before = $this.parent().find(".tally-count").text();
	$this.parent().find(".tally-count").text( parseInt(before) + 1 );
	storage.save();
	
}

Tally.prototype.decrease = function(id) {

	$this = id;
	var before = $this.parent().find(".tally-count").text();
	$this.parent().find(".tally-count").text( parseInt(before) - 1 );
	storage.save();

}

tally = new Tally();