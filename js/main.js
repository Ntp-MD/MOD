

$(document).ready(function () {
	if (localStorage.getItem('darkMode') === 'enabled') {
		$('body').addClass('dark-mode');
	}
});

$(document).on('click', function (e) {
	if ($(e.target).closest('.toggle-mode').length) {
		$('body').toggleClass('dark-mode');

		// Save the mode in local storage
		if ($('body').hasClass('dark-mode')) {
			localStorage.setItem('darkMode', 'enabled');
		} else {
			localStorage.setItem('darkMode', 'disabled');
		}
	}
});


