var MYAPPLICATION = {
	voiceRecognition : {
		oRecognition : new webkitSpeechRecognition(),
		final_transcript : '',

		init:function(){
			this.oRecognition.continuous = true;
			this.oRecognition.interimResults = true;

			console.log('final_transcript '+this.final_transcript);
			this.oRecognition.onresult = this.onresult.bind(this);
			this.oRecognition.onstart = this.onstart;
			this.oRecognition.onerror = this.onerror;
			this.oRecognition.onene = this.onend;

			this.oRecognition.lang = 'ko-KR';
			this.oRecognition.start();
		},

		onresult:function(event){
			var interim_transcript = '';
		    
			for (var i = event.resultIndex; i < event.results.length; ++i) {
				if (event.results[i].isFinal) {
					this.final_transcript += event.results[i][0].transcript;
					console.log('final_transcript : '+this.final_transcript)
				} else {
					interim_transcript += event.results[i][0].transcript;
					console.log('interim_transcript : '+interim_transcript)
				}
				document.querySelector('#test').innerHTML = this.final_transcript;
				document.querySelector('#test2').innerHTML = interim_transcript;
			}
		},

		onstart:function(){
			console.log('onstart');
		},

		onerror:function(event){
			console.log('onerror');
			console.log(event);
		},

		onend:function(){
			console.log('onend');
		},

		searchResult : function (){
			if(this.oXhr.readyState==4){			
				console.log('oXhr.responseText : '+this.oXhr.responseText)
			}
		}
	},

	ajax : {
		oXhr : '',
		run : function(method, url, callback){
			this.oXhr = new XMLHttpRequest();
			
			this.oXhr.onreadystatechange = callback.bind(this);
			this.oXhr.open(method, url, true);
			this.oXhr.send();
		}
	},

	start : function(){
		console.log('Application Start');
		this.voiceRecognition.init();

		var searchCompleteButton = document.querySelector("#voiceButton");
		searchCompleteButton.addEventListener("click", function(event){
			event.preventDefault();
			var url = "/search/resultSearch/?id=" + document.querySelector('#test').innerHTML;
			MYAPPLICATION.ajax.run("GET", url, function (){
				if(this.oXhr.readyState==4){
					console.log('oXhr.responseText : '+this.oXhr.responseText);
				}
			});
		}, false);
	}
}

MYAPPLICATION.start();