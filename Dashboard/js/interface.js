var Interface = function() {}

Interface.prototype.openMenu = function() {

	if ( $("#aside").hasClass("close") ) {

		$("#aside").removeClass("close").addClass("open");
		$("#aside-close").show();
		$("nav").addClass("open");
		$("#hamburger-1").removeClass("hamburger-1-open").addClass("hamburger-1-close");
		$("#hamburger-2").removeClass("hamburger-2-open").addClass("hamburger-2-close");
		$("#hamburger-3").removeClass("hamburger-3-open").addClass("hamburger-3-close");

	} else {

		$("#aside").removeClass("open").addClass("close");
		$("#aside-close").hide();
		$("nav").removeClass("open");
		$("#hamburger-1").removeClass("hamburger-1-close").addClass("hamburger-1-open");
		$("#hamburger-2").removeClass("hamburger-2-close").addClass("hamburger-2-open");
		$("#hamburger-3").removeClass("hamburger-3-close").addClass("hamburger-3-open");
				
	}
}

var iF = new Interface();

function addClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.add(className);
		} else {
			element.className += ' ' + className;
		}
	}
}

function removeClass(elements, className) {
	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];
		if (element.classList) {
			element.classList.remove(className);
		} else {
			element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
		}
	}
}