import os
from flask import Flask, flash, helpers, redirect, render_template, request, session, make_response
from flask_session import Session
from flask.sessions import SecureCookieSessionInterface
from tempfile import mkdtemp
from sqlalchemy.sql.base import Executable
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
import sqlite3
from flask_mail import Mail, Message


# Configure application
app = Flask(__name__)

app.config["MAIL_PORT"] = 587
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "order.bot.hotel.web.app@gmail.com"
app.config["MAIL_PASSWORD"] = "password69420"

mail = Mail(app)
# Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Custom filter


# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.after_request
def after_request(response):
    '''Ensure responses aren't cached'''
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    response.set_cookie('key', samesite=None)

    return response


@app.route('/', methods=["GET"])
def index():

    return render_template("home.html")


@app.route('/rooms', methods=["GET"])
def rooms():
    return render_template("buy.html")


@app.route('/rooms-v2')
def rooms_v2():
    return render_template("rooms-v2.html")


@app.route('/rooms/room-2')
def room2():
    return render_template('room-2.html')


@app.route('/location')
def location():
    return render_template('location.html')


@app.route('/rooms-v2/double-superior')
def ds_room():
    return render_template('double-superior.html')


@app.route('/rooms-v2/double-big')
def db_room():
    return render_template('rooms-v2.html')


@app.route('/rooms-v2/double')
def d_room():
    return render_template('rooms-v2.html')


@app.route('/rooms-v2/triple')
def t_room():
    return render_template('rooms-v2.html')


@app.route('/rooms-v2/apartment')
def ap_room():
    return render_template('rooms-v2.html')


@app.route('/contact-us', methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        rooms = request.form.get('rooms')

        start_date = str(request.form.get('start-date'))
        end_date = str(request.form.get('end-date'))

        name = request.form.get('name')
        email = str(request.form.get('contacts'))
        comment = str(request.form.get('comment'))
        print(name)
        print(start_date)
        print(email)

        msg = Message('Hello from Hotel WebApp', sender='ybezforarteezy@gmail.com',
                      recipients=['v.shk.business@gmail.com'])
        msg.body = str("BOOKING: " + rooms + "\nby: " + name + "\nContact: " +
                       email + "\nfrom: " + start_date + " till " + end_date + "\nComment: " + comment)
        mail.send(msg)

        return redirect(request.referrer)
    else:
        return render_template('contact.html')


if __name__ == "__main__":
   # app.run(host="172.16.200.10", port=5050, debug=True)

    app.run(host="192.168.0.166", port=5500, debug=True)
