$(document).ready(function () {
    random_show();
    random_show_history()
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
