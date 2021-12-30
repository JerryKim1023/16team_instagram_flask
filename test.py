from pymongo import MongoClient
import certifi
ca = certifi.where()
client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority', tlsCAFile = ca)
db = client.dbakbari

from flask import Flask, render_template, jsonify
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('test.html')

# 남효정: 테스트용, 나중에 삭제예정
@app.route('/test', method=['POST'])
def test_post():
    img_receive= request.form['img_give']
    comment_receive = request.form['comment_give']

    doc = {
        'img': img_receive,
        'comment': comment_receive
    }

    doc.rest.insert_one(doc)

    return jsonify({'msg': 'POST 업로드 완료!'})
    # return render_template('test.html') # 테스트 작업이 완료되면 사용
    # return 'This is a test'