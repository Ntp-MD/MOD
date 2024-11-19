$(document).ready(async () => {
	$('html *[id]').each(async function () {
		for (const folder of ['components', 'pages'])
			if (await $.get(`/${folder}/${this.id}.html`).catch(() => null))
				return $(this).html(await $.get(`/${folder}/${this.id}.html`));
	});
});


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