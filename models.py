import flask_sqlalchemy
from app import db

class Messaging(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(120))
    
    def __init__(self, a):
        self.message = a
        
    def __repr__(self):
        return '<Messaging System: %s>' % self.message