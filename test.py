from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
import certifi
ca = certifi.where()
app = Flask(__name__)
client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority', tlsCAFile=ca)
db = client.dbakbari


@app.route('/')
def home():
    return render_template('test2.html')

@app.route("/bucket", methods=["POST"])
def bucket_post():
    comment_receive = request.form['comment_give'] # [POST] - 1
    # comment_list = list(db.comment.find({}, {'_id': False})) # [POST] - 3
    # count = len(comment_list) + 1
    doc = { # [POST] - 2
        # 'user_id': user_id_receive,
        # 'num': count, # 댓글 순번
        'comment': comment_receive,
    }
    db.comment.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})


@app.route("/bucket", methods=["GET"])
def bucket_get():
    comment_list = list(db.comment.find({}, {'_id': False})) # [GET] - 1
    return jsonify({'comments': comment_list}) # [GET] - 2






if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)