const body = document.body;
const btn = document.querySelectorAll('.button')[0];

btn.addEventListener('mouseenter', () => {
	body.classList.add('show');
});

btn.addEventListener('mouseleave', () => {
	body.classList.remove('show');
});

/*=====================*/
/*=====================*/
/*=====================*/


function generateNoise(opacity, h, w) {
	function fakeCanvas(h, w) {
	  var canvas = document.createElement('canvas');
	  canvas.height = h;
	  canvas.width = w;
	  return canvas;
	}
	
	function randomise(data, opacity) {
	  var i, x;
	  for (i = 0; i < data.length; ++i) {
		x = Math.floor(Math.random() * 0xffffff);
		data[i] = x | opacity;
	  }
	}
	
	function generate(opacity, h, w) {
	  var canvas = fakeCanvas(h, w),
		  context = canvas.getContext('2d'),
		  image = context.createImageData(h, w),
		  data = new Uint32Array(image.data.buffer);
	  
	  opacity = Math.floor(opacity * 0x255) << 24;
	  
	  return function() {
		randomise(data, opacity);
		context.putImageData(image, 0, 0);
		var screen = document.getElementsByClassName('screen')[0];
		screen.style.backgroundImage = 'url("' + canvas.toDataURL('image/png') + '")';
	  };
	}
  
	return generate(opacity || 0.2, h || 55, w || 55);
  }
  
  var noise = generateNoise(.13, 173, 147);
  
  (function loop() {
	noise();
	
	if (window.requestAnimationFrame) {
	  requestAnimationFrame(loop);
	} else {
	  setTimeout(loop, 30); // About 33 fps
	}
  })();

  /*=====================*/
/*=====================*/
/*=====================*/
