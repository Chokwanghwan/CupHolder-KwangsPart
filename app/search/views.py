#-*- coding: utf-8 -*-
from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for

import urllib2
import xmltodict

import json

voiceSearch= Blueprint('voiceRecognition', __name__, url_prefix='/search')
 
@voiceSearch.route("/resultSearch/", methods=['GET'])
def dic():
	if request.method == 'GET':
		rssUrl = 'http://openapi.naver.com/search?key=51627fdc5735c05d3d74506315ad3422&query='+request.args.get('id')+'&display=5&start=1&target=kin&sort=sim'
		rssUrl = rssUrl.replace(' ', '%20');
		u = urllib2.urlopen(rssUrl.encode('utf-8'))
		data = u.read()
		
		result = xmltodict.parse(data.decode('utf-8'))
		real_result = json.dumps(result).decode('utf-8') 

		return real_result
	else:
		data = ''
		print 'else'
	return data
