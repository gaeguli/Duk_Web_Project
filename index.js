$("#test").html("wow");



let lastOpenedPost = null; // 마지막으로 열린 글 저장

function addPost() {
    const userId = document.getElementById('userId').value;
    const textInput = document.getElementById('textInput').value;

    if (userId.trim() === "") {
        alert("아이디를 입력해주세요.");
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

    // 클릭 이벤트 추가
    postDiv.onclick = function() {
        const contentDiv = postDiv.querySelector('.content');
        const copyButton = postDiv.querySelector('.copy-button');

        // 이전에 열린 글이 있다면 숨김
        if (lastOpenedPost && lastOpenedPost !== contentDiv) {
            lastOpenedPost.classList.remove('expanded'); // 이전 글 축소
            lastOpenedPost.parentElement.querySelector('.copy-button').style.display = 'none'; // 복사 버튼 숨김
        }

        // 현재 클릭한 글 내용 토글
        contentDiv.classList.toggle('expanded');

        // 복사 버튼 표시
        copyButton.style.display = contentDiv.classList.contains('expanded') ? 'block' : 'none';

        // 현재 글을 마지막으로 열린 글로 저장
        lastOpenedPost = contentDiv.classList.contains('expanded') ? contentDiv : null;
    };

    outputArea.appendChild(postDiv);
    document.getElementById('userId').value = ""; // 아이디 입력란 초기화
    document.getElementById('textInput').value = ""; // 입력란 초기화
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("글이 클립보드에 복사되었습니다.");
    }).catch(err => {
        alert("복사하는데 오류가 발생했습니다.");
    });
}



