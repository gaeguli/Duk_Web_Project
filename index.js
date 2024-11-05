let lastOpenedPost = null; // 마지막으로 열린 글 저장
let currentUser = null; // 로그인한 사용자 이름 저장

function addPost() {
    const userId = currentUser;
    const textInput = document.getElementById('textInput').value;

    if (!userId) {
        alert("로그인 후 글을 작성할 수 있습니다.");
        return;
    }
    if (textInput.trim() === "") {
        alert("글을 입력해주세요.");
        return;
    }

    const outputArea = document.getElementById('outputArea');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
        <p class="author">${userId}</p>
        <div class="content">${textInput}</div>
        <button class="copy-button" onclick="copyToClipboard('${textInput}'); event.stopPropagation();">복사</button>
    `;

    postDiv.onclick = function() {
        const contentDiv = postDiv.querySelector('.content');
        const copyButton = postDiv.querySelector('.copy-button');

        if (lastOpenedPost && lastOpenedPost !== contentDiv) {
            lastOpenedPost.classList.remove('expanded');
            lastOpenedPost.parentElement.querySelector('.copy-button').style.display = 'none';
        }

        contentDiv.classList.toggle('expanded');
        copyButton.style.display = contentDiv.classList.contains('expanded') ? 'block' : 'none';
        lastOpenedPost = contentDiv.classList.contains('expanded') ? contentDiv : null;
    };

    outputArea.appendChild(postDiv);
    document.getElementById('textInput').value = ""; // 입력란 초기화
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("글이 클립보드에 복사되었습니다.");
    }).catch(err => {
        alert("복사하는데 오류가 발생했습니다.");
    });
}

// 회원가입 함수
function register() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const registerStatus = document.getElementById("registerStatus");

    if (newUsername && newPassword) {
        localStorage.setItem("username", newUsername);
        localStorage.setItem("password", newPassword);
        registerStatus.textContent = "회원가입 성공!";
        registerStatus.style.color = "green";
    } else {
        registerStatus.textContent = "아이디와 비밀번호를 입력하세요.";
        registerStatus.style.color = "red";
    }
}

// 로그인 함수
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginStatus = document.getElementById("loginStatus");

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
        loginStatus.textContent = "로그인 성공!";
        loginStatus.style.color = "green";
        currentUser = username; // 로그인한 사용자 이름을 저장
        document.getElementById('userId').value = currentUser; // 글쓰기 섹션에 아이디 자동 입력
    } else {
        loginStatus.textContent = "아이디 또는 비밀번호가 잘못되었습니다.";
        loginStatus.style.color = "red";
    }
}
