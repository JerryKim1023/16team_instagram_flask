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

    mail_search()
});






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
            let email = mail_search['email', 'pw'][1]

            if (mail_search == false) {
                alert('메일 입력 값이 없습니다 : ');
            } else {
                alert('입력하신 메일이 DB에 있습니다. 메일은 : ' + email);
            }

        }
    })

}