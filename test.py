팀원들과 공유하고자 하는 폴더 들어가서 터미널 실행

cd 폴더명 들어가서 git 입력

git init 입력
# Initialized empty Git repository in C:/Users/ecec1/OneDrive/바탕 화면/insta_flask_project/.git/

git config --global user.name "JerryKim"
git config --global user.email "ecec1023@gmail.com"
# 완전 처음 깃 만들 때 한번만 하는 거임


git remote add origin https://github.com/JerryKim1023/16team_instagram_flask.git

git add .
# 앞으로 git으로 관리할 파일을 추가하겠다   .은 폴더 안의 모든것을 의미



git commit -m""
# 커밋과 메세지 "" 안에 작성

git push origin main
# 깃 커밋한 것을 마스터 브랜치에 올리겠다


# 협업하는 사람이 할 행동들
git clone https://github.com/JerryKim1023/16team_instagram_flask

git commit -m""
# 커밋과 메세지 "" 안에 작성

git push origin main
# 깃 커밋한 것을 마스터 브랜치에 올리겠다


# 다른사람들이 수정하면 아래 명령어 수행 후 커밋 푸쉬
git pull origin main



###################### 웬만하면 동일한 부분(함수 등등)을 팀원간에 작성하지 말것
### 웬만하면 파일 단위로 팀원간의 역할 분배하시고
### 파일 단위로 분배하기 어렵다면, 함수 단위로 분배
