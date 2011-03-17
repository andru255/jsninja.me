var jsninjaMe = {};

jsninjaMe.ui = function(settings){

	this.settings = {
		hash: ((settings.hash && settings.hash.match(/!/)) ? settings.hash.split(/!/)[1] : 'ui-welcome')
	};

	this._init();
};

jsninjaMe.ui.prototype = {

	_init: function(){

		if(!this.settings.hash) return false;

		var loaded = this.load(this.settings.hash);

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
			elements[e].onclick = function(){
				if(this.href.match(/!/)){
					self.load(this.href.split(/!/)[1]);
					return false;
				}else if(this.href.match(/#/)){
					self.load(this.href.split(/#/)[1]);
					return false;
				}
			};
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
			};
		});

	},

	load: function(url){

		url = url || this.settings.hash;

		// update the URL for direct / deep linking
		if('#'+url != window.location.hash){
			window.location.hash = '!'+url;
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

	}

}
