$(document).ready(function () {
    random_show();
    random_show_history()
    mainpost_show()
});

function random_show() {
    let max = 1200
    let min = 0
    let count = Math.floor(Math.random() * (max - min + 1)) + min;
    $.ajax({
        type: "POST",
        url: "/api/random_show",
        data: {count_give: count},
        success: function (response) {
            let rest = response['rest']
            for (let i = 0; i < rest.length; i++) {

                // let j = i + 10
                let title = rest[i]['title']
                let img = rest[i]['img']
                // let title2 = rest[j]['title']
                // let img2 = rest[j]['img']


                let temp_html = `        
                    <div class = "sub-item" >
                    <div class = "sub-item-user" >
                    <a href = "/mypage"> <img src ="${img}"></a>
                <div class="sub-item-text">
                    <p class="sub-item-name">${title}</p>
                    <p class="sub-item-follower">${title}님이 팔로우합니다</p>
                </div>
            </div>
                <p class="sub-item-button">팔로우</p>
            </div>`

                //   let temp_html_story = `
                //      <div class="story-wrapper">
                //     <div class="story-off">
                //         <img src="${img2}"/>
                //     </div>
                //     <p>${title2}</p>
                // </div>`

                $('#sub-icon-wrapper').append(temp_html)
                // $('#story-container').append(temp_html_story)

                count += 10;
            }
        }
    })

}

function random_show_history() {
    let max = 1200
    let min = 0
    let count = Math.floor(Math.random() * (max - min + 1)) + min;
    $.ajax({
        type: "POST",
        url: "/api/random_show",
        data: {count_give: count},
        success: function (response) {
            let rest = response['rest']
            for (let i = 0; i < rest.length; i++) {

                // let title = rest[i]['title']
                // let img = rest[i]['img']
                let title2 = rest[i]['title']
                let img2 = rest[i]['img']


                //     let temp_html = `
                //         <div class = "sub-item" >
                //         <div class = "sub-item-user" >
                //         <a href = "/mypage"> <img src ="${img}"></a>
                //     <div class="sub-item-text">
                //         <p class="sub-item-name">${title}</p>
                //         <p class="sub-item-follower">${title}님이 팔로우합니다</p>
                //     </div>
                // </div>
                //     <p class="sub-item-button">팔로우</p>
                // </div>`

                let temp_html_story = `        
                     <div class="story-wrapper">
                    <div class="story-off">
                        <img src="${img2}"/>
                    </div>
                    <p>${title2}</p>
                </div>`

                // $('#sub-icon-wrapper').append(temp_html)
                $('#story-container').append(temp_html_story)

                count += 10;
            }
        }
    })

}


function mainpost_show() {
    $('#post-container').empty()

    $.ajax({
        type: "POST",
        url: "/api/show_post_main",
        data: {user_give: user},
        success: function (response) {
            console.log(response)
            let shows = response['show']
            let count = shows.length

            alert('포스팅 숫자는 : ' + count);

            for (let i = 0; i < count; i++) {

                let img = shows[i]['image']
                let id = shows[i]['id']
                let like = shows[i]['like']
                let comment = shows[i]['comment']
                let docu_id = shows[i]['docu_id']


                let temp_html = ` <div class="post-wrapper">
                    <div class="post-header">
                        <div class="left-wrapper">
                            <img src="${img}"/>
                            <p>"${id}"</p>
                        </div>
                        <div class="right-wrapper">
                            <img src="https://i.imgur.com/n0hgaRi.png">
                        </div>
                    </div>
                    <div class="post-body">
                        <img src="${img}">
                        <div class="post-icons-wrapper">
                            <div class="left-wrapper">
                                <img class="post-icon" src="https://i.imgur.com/GRWPfw7.png">
                                <img class="post-icon-2" src="https://i.imgur.com/BGg2TNJ.png">
                            </div>
                            <div class="right-wrapper">
                                <img src="https://i.imgur.com/n0hgaRi.png">
                            </div>
                        </div>
                    </div>
                    <div class="post-footer">
                        <div class="post-like-wrapper">
                            <img src="${img}">
                            <p><strong>"${id}"</strong>님 <strong>외 ${like} 명</strong>이 좋아합니다</p>
                        </div>
                        <div class="post-content-wrapper" class="comment-list" id="comment-list-01">
                            
                        </div>
                        <p class="post-time">8시간 전</p>  
<!--                        포스트 타임 확인 되야함-->
                        <div class="comment-container">
                            <div class="comment-left-side">
                                <img src="${img}">
                                <input class="comment" type="text" placeholder="댓글달기...">
                            </div>
                            <button onclick="post_comment()" type="button" class="comment-button">게시</button>
                        </div>
                    </div>
                </div>
            `

                $('#post-container').append(temp_html)


            }
        }
    })
}