var Storage = function() {

	this.dashboard =  [];

}

Storage.prototype.retrieve = function() {

	//localStorage.clear();

	if ( localStorage.getItem("dashboard") != null ) {
		
		$("#dashboard").append(JSON.parse(localStorage.getItem("dashboard")));
		$(".frame").draggable({ handle: '.controllers', containment: '#dashboard' }).css("position", "absolute");
		$(".sticky").resizable();
		m.loaded = JSON.parse(localStorage.getItem("loaded"));
		m.currentTheme = JSON.parse(localStorage.getItem("currentTheme"));
		update.timeUpdates = JSON.parse(localStorage.getItem("timeUpdates"));
		update.start();

		for (var key in m.loaded) {
			if ( m.loaded[key] == m.limit[key] ) $(".module[data-module='" + key + "']").addClass("disabled");
		}
		
	} else {

		$("#dashboard").append('\
			<div class="calendar_modern" id="calendar"></div>\
			<div id="calculator"></div>\
			<div id="sticky-notes">\
				<div data-module="11" data-collapse="open" class="big-hide module-group hide">Sticky Notes</div>\
			</div>\
			<div id="tallies">\
				<div data-module="15" data-collapse="open" class="big-hide module-group hide">Tallies</div>\
			</div>\
			<div id="timers">\
				<div data-module="12" data-collapse="open" class="big-hide module-group hide">Timers</div>\
			</div>\
			<div id="time-trackers">\
				<div data-module="13" data-collapse="open" class="big-hide module-group hide">Time Trackers</div>\
			</div>\
			<div id="countdowns">\
				<div data-module="14" data-collapse="open" class="big-hide module-group hide">Countdowns</div>\
			</div>\
		')

		setTimeout(function() {
			recalculateCalendar();
		}, 1000);

	}

}

Storage.prototype.save = function() {

	var dashboard = $("#dashboard").html();
	localStorage.setItem("dashboard", JSON.stringify(dashboard));
	localStorage.setItem("loaded", JSON.stringify(m.loaded));
	localStorage.setItem("currentTheme", JSON.stringify(m.currentTheme));
	localStorage.setItem("timeUpdates", JSON.stringify(update.timeUpdates));
	//alert("SAVED");

}

var storage = new Storage();
storage.retrieve();