$(document).ready(function() {

	$("#add-module").click(function() { iF.openMenu(); })

	$(".module").click(function() {
		m.add( $(this).attr("data-module") );
	})

	$("html").on("click", ".close-module", function() { m.close( $(this) ); })
	$("#aside-close").click(function() { $("#add-module").trigger("click"); })
	$("html").on("click", ".button", function() { calc.press( $(this) ); })

	// Timer

	$("html").on("click", ".start-pause-timer", function() {

		timer.start( $(this).parent().parent().parent() );

	})

	$("html").on("click", ".stop-timer", function() {

		timer.stop( $(this).parent().parent().parent() );

	})

	// Tally

	$("html").on("click", ".tally-inc", function() {
		tally.increase( $(this).parent() );
	})

	$("html").on("click", ".tally-dec", function() {
		tally.decrease( $(this).parent() );
	})

	/* Focusing */

	$("html").on("mouseenter", ".frame", function() {

		$(".frame").css("z-index", "5");
		$(this).css("z-index", "6");

	})

	// Tracker

	$("html").on("click", ".tracker-count", function() {

		tracker.start( $(this).parent().parent() );

	})

	/* Sticky Notes */

	$("html").on("keyup", ".sticky .contenteditable", function() {
		storage.save();
	})

	/* Skin change */

	$("html").on("click", ".skin-change", function() {
		var $this = $(this).parent().parent();
		m.changeSkin($this.attr("data-id"), $this.attr("data-module"), $this.attr("data-theme"));
	})

	/* Modal */

	$("#modal-close").click(function() {
		$("#modal-wrapper").hide();
	})

	$("html").on("click", ".note-delete", function() {
		var id = $("#modal-procede").attr("data-id");
		var moduleId = $("#modal-procede").attr("data-module");
		var $frame = $(".frame[data-id='" + id + "'][data-module='" + moduleId + "']");
		m.close($frame.find(".close-module"), true)
		$("#modal-wrapper").hide();
	})

	/* Countdown */

	$("html").on("click", ".start-stop-countdown", function() {
		countdown.start( $(this).parent().parent().parent().parent() );
	})

	$("html").on("click", ".countdown-edit", function() {
		countdown.stop( $(this).parent().parent() );
	})

	/* Window */

	$(window).blur(function(){
		storage.save();
		update.isRunning = false;
		clearInterval(updateInterval);
	});

	$(window).focus(function(){
		update.start()
		countdown.updateAll();
		isItToday();
	});

		
	$(window).on('beforeunload', function(){
		storage.save();
	});

	$(".module-group").click(function() {
		
		var $this = $(this);
		var module = $(this).attr("data-module");
		var state = $(this).attr("data-collapse");

		if ( state == "open" ) {
			$(this).attr("data-collapse", "collapsed");
			$(".frame[data-module='" + module + "']").hide();
		} else {
			$(this).attr("data-collapse", "open");
			$(".frame[data-module='" + module + "']").show();			
		}

	})

	$("html").on("keyup", ".tally-count", function() {

		var $this = $(this);
		var count = $this.text()

		if ( isNaN(count) ) $this.text(0);
	
	})

})