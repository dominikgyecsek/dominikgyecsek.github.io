var Timer = function() {};

Timer.prototype.initialise = function(id) {

	var DOM = "\
		<div data-theme='" + m.getDefaultSkin(12) + "' data-module='12' data-state='paused' data-time='undefined' data-id=" + id + " class='frame timer open-module'>\
			" + m.controllers + "\
			<div class='content scrollbar-hide'>\
				<div class='contenteditable title' contenteditable='true' onclick='$(this).focus();'>" + this.randomCategory() + "</div>\
				<span class='big-hide-opacity timer-btn-wrapper'>\
					<i class='stop-timer timer-btn material-icons'>stop</i>\
				</span>\
				<div class='timer-remainder info'></div>\
				<div class='timer-picker'>\
					<input type='text' class='timer-input timer-hour' placeholder='hour'>\
					<input type='text' class='timer-input timer-minute' placeholder='min'>\
				</div>\
				<span class='big-hide-opacity timer-btn-wrapper'>\
					<i class='start-pause-timer timer-btn material-icons'>play_arrow</i>\
				</span>\
			</div>\
		</div>\
	";

	$("#timers").append(DOM);
	$(".timer").last().draggable({ handle: '.controllers', containment: '#dashboard' }).css("position", "absolute");

}

Timer.prototype.randomCategory = function() {

	const categories = [
		"Trun off oven",
		"Meditation",
		"Running"
	];

	return categories[m.random(0, categories.length-1)];

}


Timer.prototype.validate = function(m, h) {

	if ( ( m == 0) && (h == 0) ) return false;
	if ( ( h > 168 ) || ( m > 59 ) ) return false;
	if ( ( isNaN(m) ) || ( isNaN(h) ) ) return false;

	return true;
}

Timer.prototype.start = function($this) {

	var id = $this.attr("data-id");

	if ( $this.find(".start-pause-timer").text() == "pause" ) {

		$this.find(".start-pause-timer").text("play_arrow")

		for (var i = 0; i < update.timeUpdates.length; i++) {
			var row = update.timeUpdates[i];
			if ( ( row[0] == 1 ) && ( row[2] == id ) ) {
				$(".timer[data-id=" + id + "]").attr("data-time",  row[1]).attr("data-state", "paused");
				update.timeUpdates.splice(i, 1);
			}
		}

	} else {

		var time = $(".timer[data-id=" + id + "]").attr("data-time");
		$(".timer[data-id=" + id + "]").attr("data-time", time).attr("data-state", "playing");

		if ( (time == "undefined") || (time == undefined) ) {

			var minute = $this.find(".timer-minute").val();
			var hour = $this.find(".timer-hour").val();

			if (minute == "") minute = 0;
			if (hour == "") hour = 0;

			if ( ! timer.validate(minute, hour) ) return;

			var time = parseInt(minute) + parseInt(hour) * 60;
			if (time == 0) return;

			$this.find(".timer-picker, .timer-layer").hide();
			$this.find(".timer-remainder").show();
			$this.find(".start-pause-timer").text("pause");
			$this.find(".timer-remainder").text(update.addLeadingZero(hour) + ":" + update.addLeadingZero(minute) + ":" + update.addLeadingZero(00));
			update.timeUpdates.push([1, time*60, id]);

		} else {

			$this.find(".start-pause-timer").text("pause")
			update.timeUpdates.push([1, time, id]);

		}

		update.start();	
		
	}

	storage.save()();

}

Timer.prototype.stop = function($this) {

	var id = $this.attr("data-id");

	$this.find(".timer-remainder").hide();
	$this.find(".timer-picker, .timer-layer").show();
	$this.find(".start-pause-timer").text("play_arrow");
	$(".timer[data-id=" + id + "]").attr("data-time", "undefined").attr("data-state", "paused");

	for (var i = 0; i < update.timeUpdates.length; i++) {
		var row = update.timeUpdates[i];
		if ( ( row[0] == 1 ) && ( row[2] == id ) ) {
			update.timeUpdates.splice(i, 1);
			break;
		}
	}

	storage.save()();

}

var timer = new Timer();