from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import certifi
ca = certifi.where()


app = Flask(__name__)

client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbakbari



@app.route('/')
def home():
    return render_template('crud.html')


@app.route("/api/read", methods=["GET"])
def db_read():
    dbs_list = list(db.db.find({}, {'_id': False}))
    return jsonify({'dbs': dbs_list})


@app.route("/api/update", methods=["POST"])
def db_update():
    num_receive = request.form["num_give"]
    db.db.update_one({'num': int(num_receive)}, {'$set': {'done': 1}})
    return jsonify({'msg': 'db_update()버킷 완료!'})


@app.route("/api/create", methods=["POST"])
def db_create():
    db_receive = request.form["db_give"]

    count = list(db.db.find({}, {'_id': False}))
    num = len(count) + 1

    doc = {
        'num': num,
        'db': db_receive,
        'done': 0
    }

    db.db.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})


@app.route("/api/mypage", methods=['POST'])
def page_my():
    rest_list = []
    count = int(request.form['count_give'])
    rest = list(db.rest.find({}, {'_id': False}).sort('like', -1))
    for count_ in rest[count:count + 8]:
        rest_list.append(count_)
    return jsonify({'rest': rest_list})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
