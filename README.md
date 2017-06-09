# Description
This project is an attempt at one of the freecodingcamp front end final projects. The goal was to create a website that allows users to sign up, log in, create a poll, vote in a poll, and view the results.

## Backend
I use Flask, a python microframework to handle the backend. Using a number of flask extensions, I set up communication with a postgresql database and user authorization using JSON web tokens.

## Database Schema
There are four tables used. The only one I believe needs explanation is vote_log, which simply keeps track of which users have voted in which polls to prohibit a user from casting more than one vote in any poll.

#### users
id        | int       | PRIMARY KEY  
username  | char(120) |   
pwd_hash  | text      |  

#### poll_questions
id        | int   | PRIMARY KEY  
body      | text  |  
owner_id  | text  | REFERENCES users(id)  

#### poll_answers
id          | int   | PRIMARY KEY  
question_id | int   | REFERENCES poll_questions(id)  
body        | text  |  
vote_count  | int   |  

#### vote_log
id      | int | PRIMARY KEY  
user_id | int | REFERENCES users(id)  
poll_id | int | REFERNECES poll_questions(id)  



## Frontend
For the front end I use the angular2 framework, which features a combination css, html, javascript, and typescript files.
