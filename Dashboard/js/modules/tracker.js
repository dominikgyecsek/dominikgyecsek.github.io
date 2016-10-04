var Tracker = function () {}

Tracker.prototype.create = function(id) {

	$("#time-trackers").append("\
		<div data-theme='" + m.getDefaultSkin(13) + "' data-module='13' data-time='0' data-state='paused' data-id=" + id + " class='frame tracker open-module'>\
			" + m.controllers + "\
			<div class='content'>\
				<div class='contenteditable title' contenteditable='true' onclick='$(this).focus();'>" + this.randomCategory() + "</div>\
				<span class='tracker-count info'> 0 days 00:00:00</span>\
			</div>\
		</div>\
	");

	$(".tracker").last().draggable({ handle: '.controllers', containment: '#dashboard' }).css("position", "absolute");
	
}

Tracker.prototype.randomCategory = function() {

	const categories = [
		"Brainstorming",
		"Sleeping",
		"Running",
		"Coding",
		"Playing",
		"Working"
	];

	return categories[m.random(0, categories.length-1)];

}

Tracker.prototype.start = function($this) {

	var state = $this.attr("data-state");
	var id = $this.attr("data-id");
	var time = $this.attr("data-time");

	if ( state == "paused" ) {

		$this.attr("data-state", "playing");
		$this.find(".tracker-start>i").text("pause")

		update.timeUpdates.push([3, id, time]);
		update.start();

	} else {

		$this.attr("data-state", "paused");
		$this.find(".tracker-start>i").text("play_arrow")

		for (var i = 0; i < update.timeUpdates.length; i++) {

			var row = update.timeUpdates[i];
			console.log(row);

			if ( ( row[0] == 3 ) && ( parseInt(row[1]) == id ) ) {
				console.log("STOPIING");
				update.timeUpdates.splice(i, 1);
				break;
			}

		}

	}

	storage.save();

}

Tracker.prototype.generateTimestampt = function(time) {

	var days = Math.floor(time/60/60/24);
	time = time - days * 60 * 60 * 24;
	var hours = Math.floor(time/60/60);
	time = time - hours * 60 * 60;
	var minutes = Math.floor(time/60);
	var seconds = time - minutes * 60;

	time = days + " days " + update.addLeadingZero(hours) + ":" + update.addLeadingZero(minutes) + ":" + update.addLeadingZero(seconds);
	return time;

}

tracker = new Tracker();