var MYAPPLICATION = {
	coreRecognition : {
		oRecognition : new webkitSpeechRecognition(),
		checkScriptList : '',

		init:function(){
			this.oRecognition.continuous = true;
			this.oRecognition.interimResults = true;

			this.oRecognition.onresult = this.onresult.bind(this);
			this.oRecognition.onstart = this.onstart;
			this.oRecognition.onerror = this.onerror;
			this.oRecognition.onend = this.onend;

			this.oRecognition.lang = 'ko-KR';
			this.oRecognition.start();
		},

		onresult:function(event){
			var pattern = new RegExp('시작');
			try{
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						this.checkScriptList += event.results[i][0].transcript;
						console.log('coreRecognition checkScriptList : '+this.checkScriptList);	
						if(pattern.exec(this.checkScriptList)) {
							console.log('시작이 입력되었습니다.');
							console.log('when input checkScriptList : '+this.checkScriptList);
							this.oRecognition.stop();
							this.checkScriptList = '';
						}
					}
				}
			}
			catch (e) {
				console.log('에러 발생!! 에러명 : '+e);
				this.oRecognition.stop();
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
			MYAPPLICATION.voiceRecognition.init();
		},

		searchResult : function (){
			if(this.oXhr.readyState==4){
				console.log('oXhr.responseText : '+this.oXhr.responseText)
			}
		}
	},

	voiceRecognition : {
		oRecognition : new webkitSpeechRecognition(),
		final_transcript : '',

		init:function(){
			this.oRecognition.continuous = true;
			this.oRecognition.interimResults = true;

			this.oRecognition.onresult = this.onresult.bind(this);
			this.oRecognition.onstart = this.onstart;
			this.oRecognition.onerror = this.onerror;
			this.oRecognition.onend = this.onend;

			this.oRecognition.lang = 'ko-KR';
			this.oRecognition.start();
		},

		onresult:function(event){
			var interim_transcript = '';
			var checkScriptList = '';
			try{	
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						this.final_transcript += event.results[i][0].transcript;
						checkScriptList += event.results[i][0].transcript;
						console.log('final_transcript : '+this.final_transcript)
						console.log('voiceRecognition checkScriptList : '+checkScriptList);
						(function(){
							var checkScript = ['결과', '끝'];
							var pattern = new RegExp(checkScript);
							console.log('함수는 실행된다!!!!!!!!!!!!!!!!!!!!!!');
							console.log('checkScriptList : '+checkScriptList);
							console.log('checkScript : '+checkScript);
							for (var i = 0; i < checkScript.length; i++){
								if (pattern.exec(checkScriptList) == checkScript[i]) {
									if(checkScript == '결과') {
										console.log('결과창 성공!!!');
									}
									else if(checkScript == '끝') {
										console.log('끝 성공!!');
										this.oRecognition.stop();
									}
									else{
										console.log('고려되지 않은 결과!!');
									}
								}
							}
						}());
					} else {
						interim_transcript += event.results[i][0].transcript;
						console.log('interim_transcriptList : '+interim_transcript)
					}
				}
			}

			catch (e) {
				console.log('에러 발생!! 에러명 : '+e);
				this.oRecognition.stop();
			}
		},

		onstart:function(){
			console.log('onstart');
		},

		onerror:function(event){
			console.log('onerropythr');
			console.log(event);
		},

		onend:function(){
			console.log('onend');
			MYAPPLICATION.coreRecognition.init();
		}
	}
}

MYAPPLICATION.coreRecognition.init();