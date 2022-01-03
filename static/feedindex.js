$(document).ready(function () {
    setTimeout(() => get_comment(), 3000);
    // setTimeout(() => show_comment_01(), 3000);
    // setTimeout(() => show_comment_02(), 3000);
});


function get_comment() {
    $.ajax({
        type: "GET",
        url: "/api/comment",
        data: {},
        success: function (response) {
            let rows = response['comments']

            for (let i = 0; i < rows.length; i++) {
                let comment = rows[i]['comment']
                let user = rows[i]['id']
                let docu_id = rows[i]['docu_id']


                let temp_html = ``
                temp_html = `<div class="comment-box">
                                <p class="post-author">${user}</p>
                                <p class="post-content">${comment}</p>
                             </div>`



                $('#'+'comment-list'+docu_id).append(temp_html)
            }
        }
    });
}


function post_comment(docu_idd) {

    let comment= $('#'+'comment'+docu_idd).val()
    let docu_id = docu_idd
    $.ajax({
        type: "POST",
        url: "/api/comment",
        // data: {comment_give: comment, user_give: user,docu_id_give : docu_id},
        data: {comment_give: comment, user_give: user,docu_id_give : docu_id },
        success: function (response) {
            window.location.reload()
        }
    });
}


//
// function show_comment_01() {
//     $.ajax({
//         type: "GET",
//         url: "/comment_01",
//         data: {},
//         success: function (response) {
//             let rows_01 = response['comments_01']
//             console.log(rows_01)
//             for (let i = 0; i < rows_01.length; i++) {
//                 let comment = rows_01[i]['comment_01']
//                 let user = rows_01[i]['user']
//                 let temp_html = ``
//                 temp_html = `<div class="comment-box">
//                                 <p class="post-author">${user}</p>
//                                 <p class="post-content">${comment}</p>
//                              </div>`
//                 $('#comment-list-01').append(temp_html)
//             }
//         }
//     });
// }
//
//
// function save_comment_01() {
//     let comment_01 = $('#comment_01').val()
//     $.ajax({
//         type: "POST",
//         url: "/comment_01",
//         data: {comment_give_01: comment_01, user_give: user},
//         success: function (response) {
//             window.location.reload()
//         }
//     });
// }
//
//
// function show_comment_02() {
//     $.ajax({
//         type: "GET",
//         url: "/comment_02",
//         data: {},
//         success: function (response) {
//             let rows_02 = response['comments_02']
//             console.log(rows_02)
//             for (let i = 0; i < rows_02.length; i++) {
//                let user = rows_02[i]['user']
//                 let comment = rows_02[i]['comment_02']
//                 let temp_html = ``
//                 temp_html = `<div class="comment-box">
//                                 <p class="post-author">${user}</p>
//                                 <p class="post-content">${comment}</p>
//                              </div>`
//                 $('#comment-list-02').append(temp_html)
//             }
//         }
//     });
// }
//
//
// function save_comment_02() {
//     let comment_02 = $('#comment_02').val()
//     $.ajax({
//         type: "POST",
//         url: "/comment_02",
//         data: {comment_give_02: comment_02, user_give: user},
//         success: function (response) {
//             window.location.reload()
//         }
//     });
// }