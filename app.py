from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def main():
    return render_template("login.html")  # 처음 페이지


@app.route('/detail')
def detail():
    return render_template("detail.html")  # 상세페이지로 이동


@app.route('/sign_up')
def sign_up():
    return render_template('sign_up.html')  # 로그인 등록 작업이 완료되면 사용


@app.route('/login')
def login():
    return render_template('login.html')  # 로그인 화면으로 이동


@app.route('/login_fail')
def login_fail():
    # return render_template('loginfail.html') # 로그인 실패 작업이 완료되면 사용
    return 'Login fail..'


@app.route('/login_success')
def login_success():
    # return render_template('loginsuccess.html') # 로그인 성공 작업이 완료되면 사용
    return 'Login success!'


@app.route('/mypage')
def mypage():
    # return render_template('mypage.html') # 마이페이지 작업이 완료되면 사용
    return 'This is mypage'


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
