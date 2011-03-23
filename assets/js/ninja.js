if(!window.jsninjaMe){ window.jsninjaMe = {}; }

jsninjaMe.ninja = function(ninja, speechbubble){

	this._ninja = document.getElementById(ninja) || this._createNinja('ninja');
	this._speechbubble = document.getElementById(speechbubble) || this._createSpeechBubble('ninja-speechbubble');

};


jsninjaMe.ninja.prototype = {

	_createNinja: function(id){

		var element = document.createElement('div');
		element.id = id || 'ninja';
		element.className = 'ninja';
		element.innerHTML = '<div class="ninja-head"><div class="ninja-face"><div class="ninja-eye-left"></div><div class="ninja-eye-right"></div></div></div><div class="ninja-body"><div class="ninja-leg-left"></div><div class="ninja-leg-right"></div></div><div class="ninja-arm-left"></div><div class="ninja-arm-right"></div>';

		document.body.appendChild(element);

		return element;
	},

	_createSpeechBubble: function(id){

		var element = document.createElement('div');
		element.id = id || 'ninja-speechbubble';
		element.className = 'ui-speechbubble';

		element.innerText = '...';

		document.body.appendChild(element);

		return element;

	},

	mood: function(mood){

		if(!mood || !this._ninja) return;

		this._ninja.className = 'ninja '+mood;

		return this;

	},

	say: function(message){

		if(!message || !this._speechbubble) return;

		this._speechbubble.innerText = message;

		return this; // allows chaining

	},

	start: function(animation, what){

		if(!animation || !this._ninja) return;

		if(what){
			var elements = this._ninja.getElementsByClassName('ninja-'+what);
			for(var e=0; e<elements.length; e++){
				elements[e].setAttribute('data-ani', animation);
			}
		}else{
			this._ninja.setAttribute('data-ani', animation);
		}

		return this; // allows chaining
	},

	stop: function(what){

		if(!this._ninja) return;

		if(what){
			var elements = this._ninja.getElementsByClassName('ninja-'+what);
			for(var e=0; e<elements.length; e++){
				elements[e].setAttribute('data-ani', '');
			}
		}else{
			this._ninja.setAttribute('data-ani', '');
		}

		return this; // allows chaining
	},

	toggle: function(animation, what){

		if(!animation || !this._ninja) return;

		if(what){
			var elements = this._ninja.getElementsByClassName('ninja-'+what);

			for(var e=0; e<elements.length; e++){
				if(elements[e].getAttribute('data-ani') != animation){
					elements[e].setAttribute('data-ani', animation);
				}else{
					elements[e].setAttribute('data-ani', '');
				}
			}
		}else{
			if(this._ninja.getAttribute('data-ani') != animation){
				this._ninja.setAttribute('data-ani', animation);
			}else{
				this._ninja.setAttribute('data-ani', '');
			}
		}

		return this; // allows chaining
	}

};