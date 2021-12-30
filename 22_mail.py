from flask import Flask
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

@app.route('/')
def index():
    # 메시지 제목
    msg = Message('Hello', sender='본인의계정@gmail.com', recipients=['수신인의이메일주소'])
    # 메시지 내용   ,   html을 붙여서 꾸며서 보낼수도 있다.
    msg.body = "Hello Flask message sent from Coder'stagram-Flask-Mail"
    mail.send(msg)
    return 'sent'


if __name__ == '__main__':
    app.run(debug=True)
