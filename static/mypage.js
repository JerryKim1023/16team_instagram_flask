// 모달창
function show() {
    document.querySelector(".background").className = "background show";
}

function close() {
    document.querySelector(".background").className = "background";
}

document.querySelector("#show").addEventListener("click", show);
document.querySelector("#close").addEventListener("click", close);


// 서버-클라이언트 통신
$(document).ready(function () {

    setTimeout(user_info, 130);

    showing();

});


function user_info() {
    $.ajax({
        type: "GET",
        url: "/api/show_post_main_user",
        data: {},
        success: function (response) {
            let user_image = response['user_image']
            alert(user_image)
             alert(user)

            // alert('1 : ' + user_image);


            let temp_html = ` <div id="profile-container">
            <div id="profile-photo">
                 <img src="${user_image}">
            </div>
            <div class="profile-wrapper">
                <div class="profile-id">
                    <h1>${user}</h1>
                </div>
                <div class="profile-set">
                    <ul class="profile-info">
                        <li class="profile-follow">
                            <a class="profile-follow" href="url" tabindex="0">
                                게시물
                                <span class="profile-follow" title="14">31</span>
                            </a>
                            </span>
                        </li>
                        <li class="profile-follow">
                            <a class="profile-follow" href="팔로우url" tabindex="0">
                                팔로워
                                <span class="profile-follow" title="14">14</span>
                            </a>
                        </li>
                        <li class="profile-follow">
                            <a class="profile-follow" href="팔로워url" tabindex="0">
                                팔로우
                                <span class="profile-follow">29</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="profile-bio">
                    <span>자기소개가 들어가는 자리입니다</span>
                </div>
            </div>
        </div>`

            $('#main-container').append(temp_html)

        }
    })
}


function posting() {
    let title = $('#title').val()
    let file = $('#file')[0].files[0]
    let comment = $('#upload-comment').val()
    let form_data = new FormData()
    form_data.append("title_give", title)
    form_data.append("file_give", file)
    form_data.append("comment_give", comment)
    $.ajax({
        type: "POST",
        url: "/fileupload",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["result"])
            window.location.reload()
        }
    });
}


function showing() {
    $.ajax({
        type: "GET",
        url: "/fileupload",
        data: {},
        success: function (response) {
            let rows = response['post_list']
            console.log(rows)
            for (let i = 0; i < rows.length; i++) {
                let comment = rows[i]['comment']
                let img = rows[i]['img']
                let temp_html = ``
                temp_html = `<div class="myfeed-photo-wrapper">
                              <div class="myfeed-photoset">
                                <img src="data:image/png;base64, {{ img }}">
                                <p>${comment}</p>
                                <div>${img}</div>
                              </div>
                             </div>`

                $('#upload-post').append(temp_html)
            }
        }
    });
}

function find_img() {
    let title = $('#find_title').val()
    document.getElementById('link').href = '/fileshow/' + title
}


function readImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            previewImage.src = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('file').addEventListener('change', (e) => {
    readImage(e.target);
})
