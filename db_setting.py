from pymongo import MongoClient

client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbakbari

db.follow.drop()
# Data base를 비우고 시작합니다.


trs = {
          'hmail': 'doublej@gmail.com',
          'name': 'jiyongkim'}, {
          'id': 'jerrykim',
          'pw': 'sparta'
      }

for tr in trs:
    db.follow.insert_one(login_doc)
