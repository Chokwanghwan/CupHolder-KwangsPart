#-*- coding: utf-8 -*-
from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for

voiceSearch= Blueprint('voiceRecognition', __name__, url_prefix='/voiceSearch')
 
@voiceSearch.route("/Search", methods=['GET'])
def dic():
	if request.method == 'GET':
		rssUrl = 'http://openapi.naver.com/search?key=51627fdc5735c05d3d74506315ad3422&query='+request.args.get('id')+'&display=5&start=1&target=kin&sort=sim'
		print 'rss url = ' +rssUrl
	else:
		print 'GET으로 안넘어왔습니다.'
	return rssUrl