function getParameter(strParamName) {
    var arrResult = null;
    if (strParamName) {
        arrResult = location.search.match(new RegExp("[&?]" + strParamName + "=(.*?)(&|$)"));
        return arrResult && arrResult[1] ? arrResult[1] : null;
    }
}

var p_name = getParameter("q");
alert('p_name은 : ' + p_name);
var parasearch_input = decodeURIComponent(p_name);
alert('parasearch는 : ' + parasearch_input);

// $('input[name=q]').attr('value', 1);
// $('input[name=q]').attr('value', parasearch_input);


$(document).ready(function () {
    // if (parasearch_input == null) {
    //     $('input[name=q]').attr('value', '');
    //      alert('화면이 변화할때 입력 값이 없을때 : ' +  parasearch_input );
    // } else {
    //     $('input[name=q]').attr('value', parasearch_input);
    //      alert('화면이 변화할때 입력 값이 있을때  : ' +  parasearch_input );
    //      alert('화면이 변화할때 입력 값이 있을때  : ' + ('input[name=q]').attr('value', parasearch_input));
    // }
    db_search()
    // mail_search()
});

function db_search() {

    let input = parasearch_input
    $('#search-box').empty()
    $.ajax({
        type: "POST",
        url: "/api/search",
        data: {input_give: input},
        success: function (response) {
            console.log(response)
            let insta_searchs = response['insta_search']

            for (let i = 0; i < insta_searchs.length; i++) {
                let title = insta_searchs[i]['title']
                let img = insta_searchs[i]['img']
                let sub_title = insta_searchs[i]['sub_title']
                let item_tags1 = insta_searchs[i]['item_tags1']
                let item_tags2 = insta_searchs[i]['item_tags2']
                let item_tags3 = insta_searchs[i]['item_tags3']
                let sub_item_tag = insta_searchs[i]['sub_item_tag']
                let sub_item_tag2 = insta_searchs[i]['sub_item_tag2']
                let sub_item_tag3 = insta_searchs[i]['sub_item_tag3']
                let sub_item_tag4 = insta_searchs[i]['sub_item_tag4']
                let sub_item_tag5 = insta_searchs[i]['sub_item_tag5']

                if (sub_item_tag == null) {
                    sub_item_tag = '　'
                    sub_item_tag2 = '　'
                    sub_item_tag3 = '　'
                    sub_item_tag4 = '　'
                    sub_item_tag5 = '　'
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

                let temp_html = `
            <div class="card">
        <img class="card-img-top"
             src="${img}"
             alt="Card image cap">
        <p class="card-title">${title}</p>
        <p class="card-text">${sub_title}</p>
        <p class="card-text">${item_tags1} ${item_tags2} ${item_tags3}</p>
        <p class="card-text">${sub_item_tag} ${sub_item_tag2} ${sub_item_tag3} ${sub_item_tag4} ${sub_item_tag5}</p>
    </div>
    `
                $('#search-box').append(temp_html)

            }
        }

    })

}

function mail_search() {

    let input = parasearch_input
    $('#search-box').empty()
    $.ajax({
        type: "POST",
        url: "/api/mailsearch",
        data: {input_give: input},
        success: function (response) {
            console.log(response)
            let mail_search = response['mail_search']
            let email = mail_search[0]['pw']

            if (mail_search == false) {
                alert('메일 입력 값이 없습니다 : ');
            } else {
                alert('입력하신 메일이 DB에 있습니다. 메일은 : ' + email);
            }

        }
    })

}
