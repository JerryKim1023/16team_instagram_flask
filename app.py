from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbakbari

import hashlib


@app.route('/')
def main():
    return render_template("login.html")  # 처음 페이지


@app.route("/api/random_show", methods=['POST'])
def show_random():
    rest_list = []
    count = int(request.form['count_give'])
    rest = list(db.rest.find({}, {'_id': False}).sort('like', -1))
    for count_ in rest[count:count + 8]:
        rest_list.append(count_)
    return jsonify({'rest': rest_list})


@app.route('/feedindex')
def detail():
    return render_template("feedindex.html")  # 상세페이지로 이동


# 회원가입 부분 구현
@app.route('/sign_up', methods=['POST'])
def sign_up():
    userEmail_receive = request.form['userEmail_give']

    userName_receive = request.form['userName_give']

    user_sign_ID_receive = request.form['user_sign_ID_give']

    user_sign_PW_receive = request.form['user_sign_PW_give']

    # PW 해쉬 적용
    pw_hash = hashlib.sha256(user_sign_PW_receive.encode('utf-8')).hexdigest()

    db.user.insert_one(
        {'email': userEmail_receive, 'name': userName_receive, 'id': user_sign_ID_receive, 'pw': pw_hash})

    return jsonify({'result': 'success'})


@app.route('/login')
def login():
    return render_template('login.html')  # 로그인 화면으로 이동


@app.route('/sign_up')
def login_after_sign_up():
    return render_template('sign_up.html')  # 회원가입 로그인 화면으로 이동


@app.route('/mypage')
def mypage():
    return render_template('mypage.html')  # 마이페이지 작업이 완료되면 사용


@app.route('/forgot_password')
def login_fail():
    return render_template('forgot_password.html')  # 비밀번호 잊었을때 사용


@app.route('/login_success')
def login_success():
    # return render_template('loginsuccess.html') # 로그인 성공 작업이 완료되면 사용
    return 'Login success!'


# comment 작성 구현
@app.route("/comment", methods=["POST"])
def comment_post():
    comment_receive = request.form['comment_give'] # [POST] - 1
    doc = { # [POST] - 2
        'comment': comment_receive,
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})


@app.route("/comment", methods=["GET"])
def comment_get():
    comment_list = list(db.comment.find({}, {'_id': False})) # [GET] - 1
    return jsonify({'comments': comment_list}) # [GET] - 2


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
