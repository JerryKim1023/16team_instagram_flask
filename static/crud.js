$(document).ready(function () {
    my_page();
    // read_db();
});
// my_page() 주석과 read_db() 주석을 변경하여 보세요

function read_db() {
    $('#db-list').empty()
    $.ajax({
        type: "GET",
        url: "/api/read",
        data: {},
        success: function (response) {
            let rows = response['dbs']
            for (let i = 0; i < rows.length; i++) {
                let db = rows[i]['db']
                let num = rows[i]['num']
                let done = rows[i]['done']

                let temp_html = ``
                if (done == 0) {
                    temp_html = `<li>
                                    <h2>✅ ${db}</h2>
                                    <button onclick="update_db(${num})" type="button" class="btn btn-outline-primary">완료!</button>
                                </li>`
                } else {
                    temp_html = `<li>
                                    <h2 class="done">✅ ${db}</h2>
                                </li>`
                }

                $('#db-list').append(temp_html)

            }
        }
    });
}

function update_db(num) {
    $.ajax({
        type: "POST",
        url: "/api/update",
        data: {'num_give': num},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}

function create_db() {
    let db = $('#db').val()
    $.ajax({
        type: "POST",
        url: "/api/create",
        data: {db_give: db},
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    });
}


function my_page() {
    let max = 1200
    let min = 0
    let count = Math.floor(Math.random() * (max - min + 1)) + min;
    $.ajax({
        type: "POST",
        url: "/api/mypage",
        data: {count_give: count},
        success: function (response) {
            let rest = response['rest']
            for (let i = 0; i < rest.length; i++) {
                let title = rest[i]['title']
                let img = rest[i]['img']
                let sub_title = rest[i]['sub_title']
                let item_tags1 = rest[i]['item_tags1']
                let item_tags2 = rest[i]['item_tags2']
                let item_tags3 = rest[i]['item_tags3']
                let sub_item_tag = rest[i]['sub_item_tag']
                let sub_item_tag2 = rest[i]['sub_item_tag2']
                let sub_item_tag3 = rest[i]['sub_item_tag3']
                let sub_item_tag4 = rest[i]['sub_item_tag4']
                let sub_item_tag5 = rest[i]['sub_item_tag5']
                let like = rest[i]['like']

                if (sub_item_tag == null) {
                    sub_item_tag = ''
                    sub_item_tag2 = ''
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag2 == null) {
                    sub_item_tag2 = ''
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag3 == null) {
                    sub_item_tag3 = ''
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag4 == null) {
                    sub_item_tag4 = ''
                    sub_item_tag5 = ''
                } else if (sub_item_tag5 == null) {
                    sub_item_tag5 = ''
                }
                if (like == 0) {
                    like = ''
                }


                let temp_html = `
                <div class="card" id="card_${i}">
            <img class="card-img-top"
                 src="${img}"
            >
            <p class="card-title">${title}</p>
            <p class="card-text">${sub_title}</p>
            <p class="card-text">${item_tags1} ${item_tags2} ${item_tags3}</p>
            <p class="card-text">${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}</p>`

                $('#column_container').append(temp_html)
                count += 10;
            }
        }
    })

}
