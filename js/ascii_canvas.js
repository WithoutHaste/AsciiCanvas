/*
Methods available from this library:
- ascii_canvas.get_image(string, associative_array)
  - param 1: the ascii art string
  - param 2: the color key, where array key is a char and array value is a hex or rgb or html color string
  - returns an image source of the colored art, which can be set as an img element's 'src'
    - use: imgElement.src = result;
	- OR use: divElement.style.backgroundImage = "url('" + result + "')";
*/
const ascii_canvas = (function() {
	
	const char_line_break = '\n';
	
	function unique_chars(str) {
		return String.prototype.concat.call(...new Set(str));
	}
	
	function generate_img_src(ascii_art, color_key) {
		const lines = ascii_art.split(char_line_break);
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		canvas.setAttribute('width', lines[0].length);
		canvas.setAttribute('height', lines.length);
		for(var row=0; row<lines.length; row++) {
			for(var col=0; col<lines[0].length; col++) {
				context.fillStyle = color_key[lines[row][col]];
				context.fillRect(col, row, 1, 1);
			}
		}
		return canvas.toDataURL()
	}

	function validate_ascii_art(ascii_art) {
		if(!(typeof ascii_art === 'string' || ascii_art instanceof String)) {
			throw { message: 'Ascii art must be a string.' };
		}
		if(ascii_art.length == 0) {
			throw { message: 'Ascii art cannot be an empty string.' };
		}
		const lines = ascii_art.split(char_line_break);
		const line_length = lines[0].length;
		for(var i=1; i<lines.length; i++) {
			if(lines[i].length != line_length) {
				throw { message: 'All lines of the ascii art must be the same length.' };
			}
		}
		return true;
	}
	
	function validate_color_key(color_key, ascii_art) {
		if(!(typeof color_key === 'object' && color_key !== null)) {
			throw { message: 'Color key must be an object.' };
		}
		const keys = Object.keys(color_key);
		for(var c of unique_chars(ascii_art)) {
			if(c == char_line_break) {
				continue;
			}
			if(!keys.includes(c)) {
				throw { message: 'Color key must contain a key for each character in the ascii art (except for the line-break character). Missing character = ' + c };
			}
		}
	}
	
	return {
		'get_image': function(ascii_art, color_key) {
			validate_ascii_art(ascii_art);
			validate_color_key(color_key, ascii_art);
			return generate_img_src(ascii_art, color_key);
		}
	};
})();