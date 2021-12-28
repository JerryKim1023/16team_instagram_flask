from pymongo import MongoClient
client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbakbari


doc = {
    'hmail':'doublej@gmail.com',
    'name':'jiyongkim',
    'nname':'jerrykim',
    'pw':'sparta'    
}

db.login.insert_one(doc)

# db.movies.update_one({'title':'가버나움'},{'$set':{'star':"0"}})

# movie = db.movies.find_one({'title':'가버나움'})
# cscore = movie['star']
#
# all_movies = list(db.movies.find({'star':cscore},{'_id':False}))
#
# for same_movie in all_movies:
#         print(same_movie['title'])




# insert
# doc = {'name':'bobby','age':21}
# db.users.insert_one(doc)

# find_one
# user = db.users.find_one({'name': 'bobby'})

# find
# same_ages = list(db.users.find({'age':21},{'_id':False}))

# update
# db.users.update_one({'name':'bobby'},{'$set':{'age':19}})

# delete
# db.users.delete_one({'name':'bobby'})

# # 저장 - 예시
# doc = {'name':'bobby','age':21}
# db.users.insert_one(doc)
#
# # 한 개 찾기 - 예시
# user = db.users.find_one({'name':'bobby'})
#
# # 여러개 찾기 - 예시 ( _id 값은 제외하고 출력)
# all_users = list(db.users.find({},{'_id':False}))
#
# # 바꾸기 - 예시
# db.users.update_one({'name':'bobby'},{'$set':{'age':19}})
#
# # 지우기 - 예시
# db.users.delete_one({'name':'bobby'})