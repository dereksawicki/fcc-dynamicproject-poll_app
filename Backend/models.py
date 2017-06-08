from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash

db = SQLAlchemy()


# User database model
class User(db.Model):
   __tablename__ = "users"
   id       = db.Column(db.Integer, primary_key=True)
   username = db.Column(db.String(120), unique=True)
   pwd_hash = db.Column(db.String())

   def __init__(self, username, password):
      self.username = username
      self.set_password(password)

   def set_password(self, password):
      self.pwd_hash = generate_password_hash(password)

   def check_password(self, password):
      return check_password_hash(self.pwd_hash, password)

   @staticmethod
   def get(userid):
      return User.query.filter_by(id=userid).first()


# Poll Question model
class PollQuestion(db.Model):
   __tablename__ = "poll_questions"
   id       = db.Column(db.Integer, primary_key=True)
   body     = db.Column(db.Text)
   owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

   def __init__(self, owner_id, body):
      self.owner_id  = owner_id
      self.body      = body

class PollAnswer(db.Model):
   __tablename__ = "poll_answers"
   id          = db.Column(db.Integer, primary_key=True)
   question_id = db.Column(db.Integer, db.ForeignKey('poll_questions.id'))
   body        = db.Column(db.Text)
   vote_count  = db.Column(db.Integer)

   def __init__(self, question_id, body):
      self.question_id  = question_id
      self.body         = body
      self.vote_count   = 0

class VoteLog(db.Model):
   __tablename__ = "vote_log"
   id          = db.Column(db.Integer, primary_key=True)
   poll_id     = db.Column(db.Integer)
   user_id     = db.Column(db.Integer)

   def __init__(self, poll_id, user_id):
      self.poll_id = poll_id
      self.user_id = user_id
