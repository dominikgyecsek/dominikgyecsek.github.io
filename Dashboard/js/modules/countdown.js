var Countdown = function () {};

Countdown.prototype.initialise = function(id) {

	var date = new Date();

	var DOM = "\
		<div data-set='unset' data-theme='" + m.getDefaultSkin(14) + "' data-module='14' data-time='undefined' data-id=" + id + " class='frame countdown open-module'>\
			" + m.controllers + "\
			<div class='content scrollbar-hide'>\
				<div class='contenteditable title' contenteditable='true' onclick='$(this).focus();'>" + this.randomCategory() + "</div>\
				<div class='countdown-picker'>\
					<input type='text' class='countdown-input countdown-year' placeholder='year' value='" + date.getFullYear() + "'>\
					<input type='text' class='countdown-input countdown-month' placeholder='month' value='" + eval( date.getMonth() + 1 ) + "'>\
					<input type='text' class='countdown-input countdown-day' placeholder='day' value='" + date.getDate() + "'>\
				</div>\
				<div class='countdown-remaining'>\
					<div class='countdown-day-remaining info'></div>\
					<div class='countdown-date info-secondary'></div>\
				</div>\
					<div class='countdown-controllers'>\
						<span class='big-hide-height'>\
						<button class='start-stop-countdown countdown-btn'>Start</button>\
						</span>\
					</div>\
			</div>\
		</div>\
	";

	$("#countdowns").append(DOM);
	$(".countdown").last().draggable({ handle: '.controllers', containment: '#dashboard' }).css("position", "absolute");
	$(".countdown").last().find(".controllers").append('<span class="countdown-edit"><i class="material-icons">mode_edit</i></span>')

}

Countdown.prototype.randomCategory = function() {

	const categories = [
		"Vacation",
		"Golden anniversary",
		"Subscription",
		"University",
		"GoT Finale",
		"Birthday",
		"Christmas"
	];

	return categories[m.random(0, categories.length-1)];

}

Countdown.prototype.start = function($frame) {

	var date = $frame.find(".countdown-month").val() + "/" + $frame.find(".countdown-day").val() + "/" + $frame.find(".countdown-year").val();

	if ( this.validate(date) ) {

		var days = this.difference(date)
		$frame.find(".countdown-edit").show();
		
		if (days != false) {

			var prettyDate = this.prettyDate(date);
			var id = $frame.attr("data-id");

			$frame.attr({
				"data-set": "set",
				"data-remaining": days,
				"data-time": date,
				"data-pretty": prettyDate
			});

			$frame.find(".countdown-picker").hide();
			$frame.find(".start-stop-countdown").text("Stop");
			this.update(id, days, prettyDate);
			$frame.find(".countdown-controllers").hide();
			

		} else {

			console.log("NOT VALUD");

		}

	} else {

		console.log("NOT VALUD");

	}

	console.log($frame);

}

Countdown.prototype.update = function(id, remainingDays, prettyDate) {

	$this = $(".countdown[data-id='" + id + "'][data-module='14']");
	if ($this.attr("data-set") == "unset") return;
	$this.find(".countdown-date").text(prettyDate);
	$this.find(".countdown-day-remaining").text(remainingDays + " days left");

	storage.save();

}

Countdown.prototype.updateAll = function() {

	$(".countdown").each(function() {

		var $this = $(this);
		var previousDays = $this.attr("data-remaining");
		var date = $this.attr("data-time");
		var newDays = countdown.difference(date);
		
		if (newDays != previousDays) {
			var prettyDate = $this.attr("data-pretty");
			var id = $this.attr("data-id");
			countdown.update(id, newDays, prettyDate);
		}

	})

}

Countdown.prototype.stop = function($frame) {

	$frame.attr("data-set", "unset");
	$frame.find(".countdown-picker").show();
	$frame.find(".countdown-day-remaining, .countdown-date").text("");
	$frame.find(".start-stop-countdown").text("Start");
	$frame.find(".countdown-controllers").show();
	$frame.find(".countdown-edit").hide();

}

Countdown.prototype.prettyDate = function(date) {

	var prettyDate = new Date(date);
	return prettyDate.getFullYear() + "." + update.addLeadingZero(prettyDate.getMonth()) + "." + update.addLeadingZero(prettyDate.getDate());

}

Countdown.prototype.difference = function(date) {

	var now = new Date();
	var will = new Date(date);
	var timeDiff = Math.abs(will.getTime() - now.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	if (diffDays < 1) return false;
	else return diffDays;

}

Countdown.prototype.validate = function(date) {

    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date))
        return false;

    // Parse the date parts to integers
    var parts = date.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check if its before today
	var now = new Date();
	var will = new Date(date);
	if ( will <= now ) return false;

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];

}

var countdown = new Countdown();