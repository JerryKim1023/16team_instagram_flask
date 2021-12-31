from flask import Flask, request
from flask_mail import Mail, Message

app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = '본인의계정@gmail.com'
app.config['MAIL_PASSWORD'] = '비밀번호'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)


@app.route('/forgot_password', methods=['POST'])
def index():
    userEmail = request.form['userEmail_pw_give']
    # 메시지 제목
    msg = Message('Hello', sender='본인의계정@gmail.com', recipients=[userEmail])
    # 메시지 내용   ,   html을 붙여서 꾸며서 보낼수도 있다.
    msg.body = "Hello Flask message sent from Coder'stagram-Flask-Mail" \
               "[user pw 변수값]"
    mail.send(msg)

    user_pw = list(db.user.find({}, {'_id': False}))

    return 'sent'


if __name__ == '__main__':
    app.run(debug=True)