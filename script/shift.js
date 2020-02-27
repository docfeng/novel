if (!-[1, ]||!window.chrome) {
	warn = function(txt) {
		alert(txt)
	}
} else {
	warn = function(txt) {
		if (txt) {
			chrome.speak(txt);
		} else {
			chrome.shock();
		}
	}
}
