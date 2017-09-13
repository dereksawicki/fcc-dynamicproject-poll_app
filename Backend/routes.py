from flask import Flask, render_template, jsonify, request, session, redirect, url_for, make_response
from flask_cors import CORS, cross_origin
from models import db, User, PollQuestion, PollAnswer, VoteLog
from forms import SignupForm, LoginForm
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

import json


#----------------------------------------------------------------
# Inits
#

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:[PASSWORD]@localhost:5432/Poll_App'
db.init_app(app)
CORS(app)
app.secret_key = "development-key"


#--------------------------------------------------------------------
# JWT
#
jwt = JWTManager(app)

def authenticate(username, password):
   user = User.query.filter_by(username=username).first()
   if user:
      if user.check_password(password):
            return user
   return None

#--------------------------------------------------------------
# Routes
#

@app.route('/signup', methods=['POST'])
def signup():
   print("here")
   if request.method == 'POST':
      req = request.get_json()
      newuser = User(req['username'], req['password'])
      db.session.add(newuser)
      db.session.commit()
      # Check that email does not already exist
      # if it doesnt, add it to the database
      return make_response("received password: " + req['password'])

@app.route('/login', methods=['POST'])
def login():
   if request.method == 'POST':
      data = request.get_json()

      print (data['username'])
      user = authenticate(data['username'], data['password'])
      if user:
         access_token = create_access_token(identity=user.username)
         ret = {'access_token': access_token, 'id': user.id}
         return jsonify(ret), 200
      else: 
         return jsonify({"err" : "Bad username or password"}), 401


@app.route('/mypolls', methods=['POST'])
@jwt_required
def myPolls():
   # return a list of all the questions
   req = request.get_json()

   data = {}
   i = 0
   for q in PollQuestion.query.filter_by(owner_id=req['id']).all():
      data[i] = {'body': q.body, 'id': q.id}
      i+= 1

   return jsonify(data)

@app.route('/newpoll', methods=['POST'])
@jwt_required
def newPoll():
   if request.method == 'POST':
      data = request.get_json()

      new_question = PollQuestion(data['id'], data['question'])

      db.session.add(new_question)
      db.session.commit()

      del data['question']
      del data['id']


      question_id = new_question.id
      for key in data:
         new_ans = PollAnswer(question_id, data[key])
         db.session.add(new_ans)
         db.session.commit()

      return jsonify({'msg':'success'}), 200
   else:
      return jsonify({'err': 'what? Howd you get here?'}), 401


@app.route('/deletepoll', methods=['POST'])
@jwt_required
def deletepoll():
   print(" HERE LOOK AT ME " )
   
   req = request.get_json()
   print("Deleting poll " + req['poll_id'], flush=True)

   # delete all the answers associated with the poll
   for a in PollAnswer.query.filter_by(question_id=req['poll_id']).all():
      db.session.delete(a)
      db.session.commit()

   db.session.delete(PollQuestion.query.filter_by(id=req['poll_id']).first())
   db.session.commit()

   return jsonify({'msg':'success'}), 200

@app.route('/polldetail', methods=['POST'])
@jwt_required
def pollDetail():
   data = request.get_json()

   response = {}

   i = 0
   for answer in PollAnswer.query.filter_by(question_id=data['poll_id']).all():
      response[i] = {'body': answer.body, 'vote_count': answer.vote_count, 'id':answer.id }
      i += 1

   return jsonify(response), 200


@app.route('/vote', methods=['POST'])
@jwt_required
def vote():
   data = request.get_json() #user_id and ans_id
   poll_ans = PollAnswer.query.filter_by(id=data['ans_id']).first();

   # Make sure that this user has not voted on this poll already
   if(VoteLog.query.filter(VoteLog.user_id==data['user_id'], VoteLog.poll_id==poll_ans.question_id).first()):
      return jsonify({'err':'User already voted'}), 401

   #incremet vote_count
   poll_ans.vote_count += 1
   db.session.commit()   

   #log that this user has voted on this poll
   pollid = PollQuestion.query.filter_by(id=poll_ans.question_id).first().id
   votelog = VoteLog( pollid, data['user_id'])
   db.session.add(votelog)
   db.session.commit()

   return jsonify({'msg':'success'}), 200


@app.route('/hasvoted', methods=['POST'])
@jwt_required
def hasVoted():
   data = request.get_json()
   if(VoteLog.query.filter(VoteLog.user_id==data['user_id'], VoteLog.poll_id==data['poll_id']).first()):
      return jsonify({'msg':True}), 200
   else:
      return jsonify({'msg':False}), 200


# Catch all
@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def catch_all(path):
   print(path + " requested")
   return "Hello! You requested: /%s" % path

if __name__ == "__main__":
   app.run(debug=True)
