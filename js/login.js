import { LOGIN_URL } from "./variable.js";

// ログインボタン
const loginBtn = document.getElementById('login-btn');

// ログインボタンを押された時に入力情報取得
loginBtn.addEventListener('click', () => {
    const store_number = document.getElementById('store_number').value; //店舗番号
    const password = document.getElementById('password').value; //パスワード

    //ログイン処理
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            MailAddress: store_number,
            Password: password
        }),
        mode: 'cors',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('ログインに失敗しました');
        }
        return response.json();
    }).then(data => {   //ログイン成功時
        console.log('ログイン成功:', data);
        window.location.href = '/html/home.html';
    }).catch(error => {
        console.error('ログインエラー:', error);
    });
});

