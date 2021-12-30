$(document).ready(function () {
    show_comment();
});

function show_comment() {
    $.ajax({
        type: "GET",
        url: "/comment",
        data: {},
        success: function (response) {
            let rows = response['comments'] // [GET] - 3
            for (let i = 0; i < rows.length; i++) {
                let user_id = rows[i]['id']
                let comment = rows[i]['comment']
                let temp_html = `` // [GET] - 4
                temp_html = `<p class="post-author">${user_id}</p>
                            <p class="post-content">${comment}</p>`
                $('#comment-list').append(temp_html) // [GET] - 5
            }
        }
    });
}

function save_comment() {
    let comment = $('#comment-box').val() // [POST] - 5
    $.ajax({
        type: "POST",
        url: "/comment",
        data: {comment_give: comment}, // [POST] - 6
        success: function (response) {
            alert(response["msg"])
            window.location.reload() // [POST] - 7
        }
    });
}
