# Ascii Canvas

JS library for converting ascii art plus color key to an image.

## How To Use

See [demo.html](demo.html) for an html/js example of usage.

The following documentation is duplicated in [ascii_canvas.js](js/ascii_canvas.js):

Methods available from this library:
- `ascii_canvas.get_image(string, object, int)`
  - param 1: the ascii art string
  - param 2: the color key, where object key is a char and object value is a hex or rgb or html color string
  - param 3: the scale, optional, defaults to 1, how big to draw the image where 1=100%, 2=200% etc
  - returns an image source of the colored art
    - use: `imgElement.src = result;`
	- OR use: `divElement.style.backgroundImage = "url('" + result + "')";`

These methods will throw descriptive errors (visible in your console) if invalid data is provided.
