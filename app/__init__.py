#-*- coding: utf-8 -*-
import os
import sys

from flask import Flask, render_template
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)

"""
install secret key
"""
def install_secret_key(app, filename='secret_key'):
	filename = os.path.join(app.instance_path, filename)
	try:
		app.config['SECRET_KEY'] = open(filename, 'rb').read()
	except IOError:
		print('Error: No secret key. Create it with:')
		full_path = os.path.dirname(filename)
		if not os.path.isdir(full_path):
			print('mkdir -p {filename}'.format(filename=full_path))
		print('head -c 24 /dev/urandom > {filename}'.format(filename=full_path))
		sys.exit(1)

if not app.config['DEBUG']:
	install_secret_key(app)

"""
error handler
"""
@app.errorhandler(404)
def not_found(error):
	return render_template('404.html'), 404

from app.users.views import mod as usersModule
from app.search.views import voiceSearch
app.register_blueprint(usersModule)
app.register_blueprint(voiceSearch)