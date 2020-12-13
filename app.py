# Brijeshkumar Naik 
from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
import models 
import re

MESSAGING = 'message received'

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)

database_uri = os.environ['DATABASE_URL']

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app

db.create_all()
db.session.commit()

def emit_all_messages(channel):
    all_messages =[ db_message.message for db_message in db.session.query(models.Messaging).all()]
    
    socketio.emit(channel,{
        'allMessages': all_messages
    })

@socketio.on('connect')
def on_connect():
    print('Someone connected!')

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')

@socketio.on('new input')
def on_new_input(data):
    print("Got an input data", data)
    db.session.add(models.Messaging(data["message"]));
    db.session.commit();
    
    emit_all_messages(MESSAGING)

@socketio.on('new name')
def new_name(data):
    realName=(data['name'])
    socketio.emit('realname', {
        'name': realName
    })

@socketio.on('new email')
def new_email(data):
    emailAddress=(data['email'])
    socketio.emit('emailAddress', {
        'email': emailAddress
    })
    
@socketio.on('new image')
def new_image(data):
    imageLink=(data['image'])
    socketio.emit('imageLinks', {
        'image': imageLink
    })


@app.route('/')
def index():
    emit_all_messages(MESSAGING)

    return flask.render_template("index.html")

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )