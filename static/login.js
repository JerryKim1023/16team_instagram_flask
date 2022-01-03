const idInput = document.getElementById('userID');
const pwInput = document.getElementById('userPW');
const loginBtn = document.getElementById('btn_login');
const linkToMain = document.getElementsByTagName('a')[0];

idInput.addEventListener('keyup', function(event) {
    if (idInput.value && pwInput.value) {
        loginBtn.disabled = false;
        // 로그인 버튼 활성화 시 클릭할 때 깃헙에 저장된 feedindex.html로 링크 걸어놓음
        linkToMain.href = "/feedindex";
    }
    else {
        loginBtn.disabled = true;
        linkToMain.href = "#none";
    }
})

pwInput.addEventListener('keyup', function(event) {
    if (idInput.value && pwInput.value) {
        loginBtn.disabled = false;
        // 로그인 버튼 활성화 시 클릭할 때 깃헙에 저장된 feedindex.html로 링크 걸어놓음
        linkToMain.href = "/feedindex";
    }
    else {
        loginBtn.disabled = true;
        linkToMain.href = "#none";
    }
})

// 엔터키 사용을 위한 설정 / 엔터의 keyCode가 13
document.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        document.getElementById("btn_login").click();
    }
})

// 인스타 로고 클릭시 홈메뉴로 복귀
function to_main() {
    window.location.href = "https://newmeta.shop"
}
