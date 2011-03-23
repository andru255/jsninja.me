if(!window.jsninjaMe){ window.jsninjaMe = {}; }

jsninjaMe.wizard = function(){

	this.guide = [{
		type: 'event',
		event: 'click',
		focus: '#ninja',
		exec: function(next){
			ninja.say('click!').stop('arm-left');

			next();
		}
	},{
		type: 'time',
		timeout: 5000,
		exec: function(next){
			ninja.mood('happy').say('hooray, timeout!').toggle('wave', 'arm-right').toggle('wave', 'arm-left');

			next();
		}
	},{
		type: 'time',
		timeout: 5000,
		exec: function(next){
			ninja.mood('sad').say('second timeout!').toggle('wave', 'arm-right').toggle('wave', 'arm-left');

			next();
		}
	},{
		type: 'time',
		timeout: 3000,
		exec: function(next){
			ninja.mood('normal').say('third timeout!').start('walk');

			next();
		}
	},{
		type: 'time',
		timeout: 3000,
		exec: function(next){
			ninja.mood('happy').say('fourth timeout!').stop();

			next();
		}
	}];

	return this;

};

jsninjaMe.wizard.prototype = {

	init: function(id){

		id = id || 0;

		var step = this.guide[id],
			self = this;

		if(!step) return; // no step in guide found

		if(step.type == 'time'){

			window.setTimeout(function(){
				step.exec(function(){
					wizard.init(id+1);
				});
			},step.timeout);

		}else if(step.type == 'event'){

			var elements = document.querySelectorAll(step.focus);
			for(var e=0; e<elements.length; e++){
				elements[e].addEventListener(step.event, function(){
					step.exec(function(){
						wizard.init(id+1);
					});
					this.removeEventListener(step.event, arguments.callee, false);
				}, true);
			}

		}

	}

}