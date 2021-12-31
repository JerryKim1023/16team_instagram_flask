// JavaScript용 Facebook SDK
// SDK를 페이지에 비동기식으로 읽어들일 HTML에 간단한 JavaScript 정규식 -->> 페이지의 다른 요소를 읽어들이는 것을 차단하지 않음

window.fbAsyncInit = function () {
    FB.init({
        appId: '{your-app-id}',
        cookie: true,
        xfbml: true,
        version: '{api-version}'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// FB.getLoginStatus를 호출하면 로그인 상태를 가져오기 위해 Facebook에 대한 호출을 시작
// 그러면 Facebook에서 이 결과를 사용하여 콜백 함수를 호출
// https://developers.facebook.com/docs/facebook-login/web

// // 샘플 호출
// FB.getLoginStatus(function (response) {
//     statusChangeCallback(response);
// });
//
// // 샘플 JSON 응답
// {
//     status: 'connected',
//     authResponse: {
//         accessToken: '{access-token}',
//         expiresIn:'{unix-timestamp}',
//         reauthorize_required_in:'{seconds-until-token-expires}',
//         signedRequest:'{signed-parameter}',
//         userID:'{user-id}'
//     }
// }



// 전체 코드 예시 중 js / 이 코드는 HTML 페이지에 JavaScript SDK를 읽어들여 초기화합니다.
// {app-id}를 앱 ID로 바꾸고, {api-version}을 사용할 그래프 API 버전으로 바꿉니다.
// 이전 버전을 사용해야 할 특별한 이유가 없다면 가장 최신 버전( v12.0.)을 지정하세요.
function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }

  //
  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '{app-id}',
  //     cookie     : true,                     // Enable cookies to allow the server to access the session.
  //     xfbml      : true,                     // Parse social plugins on this webpage.
  //     version    : '{api-version}'           // Use this Graph API version for this call.
  //   });


  //   FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
  //     statusChangeCallback(response);        // Returns the login status.
  //   });
  // };

  // function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }




  // // appID 적용 위한 js
  // (function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.9&appId=439520574345603";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));



  function fbLogin() {
    // 로그인 여부 체크
    FB.getLoginStatus(function(response) {

        if (response.status === 'connected') {
            FB.api('/me', function(res) {
                // 제일 마지막에 실행
                console.log("Success Login : " + response.name);
                // alert("Success Login : " + response.name);
            });
        } else if (response.status === 'not_authorized') {
            // 사람은 Facebook에 로그인했지만 앱에는 로그인하지 않았습니다.
            alert('앱에 로그인해야 이용가능한 기능입니다.');
        } else {
            // 그 사람은 Facebook에 로그인하지 않았으므로이 앱에 로그인했는지 여부는 확실하지 않습니다.
            alert('페이스북에 로그인해야 이용가능한 기능입니다.');
        }
    }, true); // 중복실행방지
}

window.fbAsyncInit = function() {
    FB.init({
        appId   : '439520574345603',
        cookie  : true,
        xfbml   : true,
        version : 'v2.8'
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    // ko_KR 을 en_US 로 바꾸면 영문으로 로그인버튼을 사용할 수 있어요.
    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));