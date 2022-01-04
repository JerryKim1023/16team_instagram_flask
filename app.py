from flask import Flask, render_template, jsonify, request, redirect, url_for
from pymongo import MongoClient
# from datetime
# import만 사용하면 모듈 안의 함수를 사용할 때, 모듈명.함수명( )으로 하고, from을 사용하면 바로 함수명( )으로 사용
# 그래서 from datetime을 주석 처리 했더니 로그인 이슈를 해결할 수 있었음.
import datetime
import jwt
import hashlib
import certifi
import gridfs
import codecs
ca = certifi.where()
app = Flask(__name__)
client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority',
                     tlsCAFile=ca)
db = client.dbakbari
SECRET_KEY = 'TEST'
fs = gridfs.GridFS(db)
@app.route('/')
def main():
    token_receive = request.cookies.get('mytoken')  # 토큰 가져오기
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])  # jwt decode
        print(payload)
        user_info = db.user.find_one({'id': payload['id']})
        return render_template('feedindex.html', user=user_info["id"])
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))
@app.route("/api/random_show", methods=['POST'])
def show_random():
    book_list = []
    count = int(request.form['count_give'])
    book = list(db.bookmark.find({}, {'_id': False}).sort('like', -1))
    for count_ in book[count:count + 12]:
        book_list.append(count_)
    return jsonify({'book': book_list})
@app.route("/api/random_show_history", methods=['POST'])
def show_historyrandom():
    mypage_list = []
    count = int(request.form['count_give'])
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    mypage = db.mypage.find({"id": payload['id']}, {'_id': False})
    mypages = list(mypage)
    for my_ in mypages[count:count + 10]:
        mypage_list.append(my_)
    return jsonify({'mypage': mypage_list})
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
@app.route('/login', methods=['POST'])
def login():
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    # 해쉬 적용
    pw_hash = hashlib.sha256(password_receive.encode('utf-8')).hexdigest()
    # id hash된 pw 가지고 유저 찾기
    result = db.user.find_one({'id': username_receive, 'pw': pw_hash})
    # db에서 찾으면 JWT 토큰 발급
    if result is not None:
        payload = {
            'id': username_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # 만료시간 세팅
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256') \
            # .decode('utf-8')
        # 로컬에서는 pyJWT가 최신버전이라 디코드를 안해도 스트링값으로 반환
        # ec2에서는 pyJWT가 decode를 안하면 바이너리값으로 반환해서
        # 디코드해서 스트링값으로 반환해줘야함.
        # token 리턴
        return jsonify({'result': 'success', 'token': token})
    # db에서 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호를 확인해 주세요.'})
@app.route('/login')
def login_after():
    return render_template('login.html')  # 로그인 화면으로 이동
@app.route('/sign_up')
def login_after_sign_up():
    return render_template('sign_up.html')  # 회원가입 로그인 화면으로 이동
# @app.route('/mypage')
# def mypage():
#     return render_template('mypage.html')  # 마이페이지 작업이 완료되면 사용
@app.route('/forgot_password')
def login_fail():
    return render_template('forgot_password.html')  # 비밀번호 잊었을때 사용
@app.route('/search')
def search_redirection():
    return render_template('search.html')  # 비밀번호 잊었을때 사용
@app.route("/api/search", methods=['POST'])
def search_db():
    input = request.form['input_give']
    rest_search = db.rest.find(
        {"title": {"$regex": f".*{input}.*"}}, {"_id": False})
    follow_search = db.follow.find(
        {"title": {"$regex": f".*{input}.*"}}, {"_id": False})
    return jsonify({'insta_search': list(rest_search) + list(follow_search)}), 200
@app.route("/api/mailsearch", methods=['POST'])
def search_mail():
    input = request.form['input_give']
    # same_ages = list(db.users.find({'age':21},{'_id':False}))
    mail_search = list(db.user.find({'email': input}, {'_id': False}))
    return jsonify({'mail_search': mail_search})
# comment 작성 구현_수정
@app.route("/api/comment", methods=["GET"])
def comment_get():
    # mypages = list(db.mypage.find({}, {'_id': False}).sort('like', -1))
    comment_list = list(db.comment.find({}, {'_id': False}))
    return jsonify({'comments': comment_list})
@app.route("/api/comment", methods=["POST"])
def comment_post():
    comment_receive = request.form['comment_give']
    user_receive = request.form['user_give']
    docu_id_receive = request.form['docu_id_give']
    # docu_id_receive = request.form['docu_id_give']
    # doc = {'comment': comment_receive, 'id': user_receive, 'docu_id' = docu_id_receive}
    doc = {'comment': comment_receive, 'id': user_receive, 'docu_id': docu_id_receive}
    db.comment.insert_one(doc)
    return jsonify({'msg': '등록 완료!'})
#
# # comment 작성 구현_01
# @app.route("/comment_01", methods=["POST"])
# def comment_post_01():
#     comment_receive_01 = request.form['comment_give_01']
#     user_receive = request.form['user_give']
#     doc = {'comment_01': comment_receive_01, 'user': user_receive}
#     db.comment_01.insert_one(doc)
#     return jsonify({'msg': '등록 완료!'})
#
#
# @app.route("/comment_01", methods=["GET"])
# def comment_get_01():
#     comment_list_01 = list(db.comment_01.find({}, {'_id': False}))
#     return jsonify({'comments_01': comment_list_01})
#
#
# # comment 작성 구현_02
# @app.route("/comment_02", methods=["POST"])
# def comment_post_02():
#     comment_receive_02 = request.form['comment_give_02']
#     user_receive = request.form['user_give']
#     doc = {'comment_02': comment_receive_02, 'user': user_receive}
#     db.comment_02.insert_one(doc)
#     return jsonify({'msg': '등록 완료!'})
#
#
# @app.route("/comment_02", methods=["GET"])
# def comment_get_02():
#     comment_list_02 = list(db.comment_02.find({}, {'_id': False}))
#     return jsonify({'comments_02': comment_list_02})
@app.route("/api/show_post_main", methods=['POST'])
def show_mypage():
    show_list = []
    # count = int(request.form['user_give'])
    # db.student.find({}, {roll: 1, _id: 0})
    mypages = list(db.mypage.find({}, {'_id': False}).sort('like', -1))
    print(mypages)
    for mypage in mypages:
        show_list.append(mypage)
    return jsonify({'show': show_list})
@app.route("/api/show_post_main_user", methods=['POST'])
def show_user_info():
    token_receive = request.cookies.get('mytoken')
    payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])  # jwt decode
    print(payload)
    user_info = db.user_info.find_one({'id': payload['id']})
    image = user_info['image']
    return jsonify({'user_image': image})
# 서버 올릴 때는 없애고 올려주기!!!
# 파일 업로드 구현(방식 2)
@app.route('/fileupload', methods=['POST'])
def file_upload():
    title_receive = request.form['title_give']
    file = request.files['file_give']
    comment_receive = request.form['comment_give']
    fs_image_id = fs.put(file)
    doc = {'title': title_receive, 'img': fs_image_id, 'comment': comment_receive}
    db.upload.insert_one(doc)
    return jsonify({'result': '업로드 완료!'})
@app.route('/mypage')
def file_show():
    img_infos = list(db.upload.find())
    img_binaries = []
    for img_info in img_infos:
        img_binary = fs.get(img_info['img'])
        base64_data = codecs.encode(img_binary.read(), 'base64')
        image = base64_data.decode('utf-8')
        img_binaries.append(image)
    return render_template('mypage.html', img=img_binaries)
if __name__ == '__main__':
    app.run('0.0.0.0', debug=True)