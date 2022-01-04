from pymongo import MongoClient

client = MongoClient('mongodb+srv://AKBARI:sparta@cluster0.jujbu.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client.dbakbari

comment_doc = {
    'docu_id': '20',
    'id': 'test2',
    'image': 'https://i.imgur.com/v2Uclog.jpg',
    'comment': "스택오버플로우",
    'like': '423'
}
db.bookmark.insert_one(comment_doc)




# login_doc = {
#     'hmail': 'doublej@gmail.com',
#     'name': 'jiyongkim',
#     'id': 'jerrykim',
#     'pw': 'sparta'
# }
# db.login.insert_one(login_doc)
#
# user_info_doc = {
#     'name': '김개똥',
#     'photo': 'URL입력',
#     'birth': '몇 월 몇 일',
#     'id': 'nmdkims',
#     'pw': 'sparta'
# }
# db.user_info.insert_one(user_info_doc)
#
# contents_doc = {
#     'text_id': '1',
#     'id': 'idid',
#     'text_time': '몇 월 몇 일',
#     'comment': '잘 있었냔 인사가 무색할 만큼',
#     'like': '좋아요'
# }
# db.contents.insert_one(contents_doc)
#
# bookmark_doc = {
#     'text_id': '1'
# }
# db.bookmark.insert_one(bookmark_doc)
#
# mypage_doc = {
#     'text_id': '1'
# }
# db.mypage.insert_one(mypage_doc)
#
# comment_doc = {
#     'id': '1',
#     'comment': '댓글 작성중입니다.',
#     'comment_time': '몇년 몇월 몇일에 작성되었습니다.',
#
# }
# db.comment.insert_one(comment_doc)

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
