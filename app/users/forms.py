#-*- coding: utf-8 -*-
from flask.ext.wtf import Form, RecaptchaField
from wtforms import TextField, PasswordField, BooleanField
from wtforms.validators import Required, EqualTo, Email

"""
Email과 password를 통해서 로그인
"""
class LoginForm(Form):
  email = TextField('Email address', [Required(), Email()])
  password = PasswordField('Password', [Required()])

"""
회원가입을 위한 폼 
"""
class RegisterForm(Form):
  name = TextField('NickName', [Required()])
  email = TextField('Email address', [Required(), Email()])
  password = PasswordField('Password', [Required()])
  confirm = PasswordField('Repeat Password', [
    Required(),
    EqualTo('password', message='Passwords must match')
  ])
  accept_tos = BooleanField('I accept the TOS', [Required()])
  recaptcha = RecaptchaField()