$(document).ready(function() {

	$(".scroll-btn").click(function() { interface.scroll( $(this).attr("data-scroll") ); })
	$("#hamburger-menu").click(interface.openMenu);
	$(".project-inner").click(function() { interface.projectOptions( $(this) ) })
	$(".input").focus(function() { interface.inputEnter( $(this) ) })
	$(".input").blur(function() { interface.inputLeave( $(this) ) })
	$(".submit-form").click(function() { interface.submitForm( $(this) ) } )

})

var Interface = function() {

	this.isMenuOpen = false;
	this.pages = [
		[true, null],
		[true, "Dashboard"],
		[true, null],
		[true, "2048"],
		[true, "Amoeba"]
	];

}

Interface.prototype.scroll = function( position ) {

	if (interface.isMenuOpen) this.openMenu();
	console.log(position)
	$("html, body").animate({ scrollTop: $("[data-scroll-to='" + position + "']").offset().top - 58 });
	

}

Interface.prototype.inputEnter = function ( $this ) {

	$this.parent().find(".placeholder").addClass("placeholder-shift");

}

Interface.prototype.inputLeave = function ( $this ) {

	if ( $this.val() == "" ) $this.parent().find(".placeholder").removeClass("placeholder-shift");

}

Interface.prototype.submitForm = function ( $this ) {

	var id = $this.attr("id");
	$(".input-section").removeClass("error")
	var error = false;
	
	switch(id) {

		case "submit-msg-btn":
			var email = $("#email").val();
			var name = $("#name").val();
			var msg = $("#msg").val();
			if ( !interface.validate("email", email) ) $("#email").parent().addClass("error"); 
			if ( !interface.validate("name", name) ) $("#name").parent().addClass("error"); 
			if ( !interface.validate("msg", msg) ) $("#msg").parent().addClass("error"); 
			break;

		case "submit-email-btn":
			var email = $("#email-subscribe").val();
			if ( !interface.validate("email", email) ) $("#email-subscribe").parent().addClass("error"); 
			break;

		default:
			console.log("Unknown Form")

	}

}

Interface.prototype.validate = function(type, value) {

	var result = false;

	switch (type) {

		case "email":
    		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    		result = re.test(value);
    		break;

		case "name":
			if ( (value.length != 0) && (value.length < 128) ) 
				result = true;
			break;

		case "msg":
			if ( (value.length > 5) && (value.length < 2048) )
				result = true;
			break;

	}

	return result;

}

Interface.prototype.openMenu = function() {

	if ( interface.isMenuOpen ) {

		$("#hamburger-menu>i").text("menu");
		$(".menu-show").addClass("col-sm-hide");	

	} else {

		$("#hamburger-menu>i").text("close");
		$(".menu-show").removeClass("col-sm-hide");

	}

	interface.isMenuOpen = !interface.isMenuOpen;

}

Interface.prototype.projectOptions = function($this) {

	var id = $this.parent().attr("data-project-id");
	var page = interface.pages[id];

	if (page[1] == null) return;

	if (page[0]) {
		// External
		console.log("EXT");
		window.open(page[1]);
	} else {
		// Internal
		console.log("INT");
		window.open(page[1]);
	}

}

var interface = new Interface();