if(!window.jsninjaMe){ window.jsninjaMe = {}; }

jsninjaMe.ui = function(settings){

	this.settings = {
		hash: ((settings.hash && settings.hash.match(/!/)) ? settings.hash.split(/!/)[1] : 'ui-welcome')
	};

	// initial load
	this.load();

	this._init();
};

jsninjaMe.ui.prototype = {

	_init: function(){

		if(!this.settings.hash) return false;

		// first bin the location hash functionality
		// why onhashchange? because even IE8 supports it, dude =)
		var self = this;
		window.onhashchange = function(){
			self.load(window.location.hash);
		};


		// initial load
		var loaded = self.load(this.settings.hash);
		if(loaded){
			var notification = document.getElementById('javascript-notification');
			if(notification && notification.parentNode){
				notification.parentNode.removeChild(notification);
			}
		}

		this._bindLinks();

	},

	_bindLinks: function(){

		var elements = document.getElementsByTagName('a'),
			self = this;

		for(var e=0; e<elements.length; e++){
			if(!elements[e].className.match(/noload/)){
				elements[e].onclick = function(){
					if(this.href.match(/!/)){
						// self.load(this.href.split(/!/)[1]);
						window.location.hash = '!'+this.href.split(/!/)[1];
						return false;
					}else if(this.href.match(/#/)){
						// self.load(this.href.split(/#/)[1]);
						window.location.hash = this.href.split(/#/)[1];
						return false;
					}
				};
			}
		}

	},

	_loadAjax: function(url){

		if(!url) return this;

		var self = this,
			callback = arguments[1] || false;

		var req=new XMLHttpRequest();
		req.open('GET',(url.match(/\./) ? url : url+'.html'),false);
		req.send(null);

		if(req.status == (200 || 304)){		
			var data = req.responseText || req.responseXML;
			callback && callback(data);

			return data;
		}else{
			callback && callback(false);
		}

		return false;

	},

	_loadContents: function(query){

		var url = query.join('/')+'.html';

		this._loadAjax(url, function(data){
			if(data && data.length){
				var element = document.getElementById(query[0]+'-content');
				element.innerHTML = data;

				var tables = document.getElementsByTagName('table');
				for(var t=0; t<tables.length; t++){
					if(tables[t].parentNode.className.match(/ui-content/)){
						tables[t].setAttribute('cellpadding', '0');
						tables[t].setAttribute('cellspacing', '3');
					}
				}
			};
		});

	},

	load: function(url){

		url = url || this.settings.hash;

		// allow calling with #...
		if(url.match(/!/)){
			url = url.split(/!/)[1];
		}

		this.query = url.split(/\//);

		var _sections = document.getElementsByClassName('ui-section'),
			_lightboxes = document.getElementsByClassName('ui-lightbox'),
			_target = document.getElementById(this.query[0]);

		if(_sections && _target){
			for(var s=0; s<_sections.length; s++){
				_sections[s].className = _sections[s].className.replace(/\sactive/,'');
			}
		}

		if(_lightboxes && _target){
			for(var l=0; l<_lightboxes.length; l++){
				_lightboxes[l].className = _lightboxes[l].className.replace(/\sactive/,'');
			}
		}


		// update the targeted section or lightbox
		if(_target && _target.className && !_target.className.match(/active/)){
			_target.className+=' active';
		}

		if(this.query.length > 1){
			this._loadContents(this.query);
		}

		// everything went fine...should be okay
		return true;

	},

	bind: function(selector, event, callback){

		var elements = document.querySelectorAll(selector);

		if(elements.length && callback){
			for(var e=0; e<elements.length; e++){
				if(event.match(/on/)){
					elements[e][event] = callback;
				}else{
					elements[e].addEventListener(event, callback, true);
				}
			}
		}

	},

	print: function(section){

		if(!section){
			var elements = document.getElementById('dojo-sidebar').getElementsByTagName('a');

			for(var e=0; e<elements.length; e++){
				if(!elements[e].className.match(/ui-button/)){
					var url = elements[e].getAttribute('href').split(/!/)[1];

					console.log(url);

				}
			}

		}

	}

};
