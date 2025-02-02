import { LOGIN_URL } from "./url.js";
import * as security from "./security.js";

// ログインボタン
const loginBtn = document.getElementById('login-btn');

// ログインボタンを押された時に入力情報取得
loginBtn.addEventListener('click', () => {
    let store_mail = document.getElementById('store_mail').value; //店舗番号
    let password = document.getElementById('password').value; //パスワード

    try {
        const validatedInput = security.validateInput(store_mail, password);
        // 入力情報を検証
        store_mail = validatedInput.email;
        password = validatedInput.password;
    } catch (error) {
        console.log(error);
        return;
    }
    //ログイン処理
    fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            MailAddress: store_mail,
            Password: password
        }),
        mode: 'cors',
    })
    .then(response => {
        switch (response.status) {
            case 200:
                return response.json();
            case 401:
                throw new Error('パスワードが間違っています');
            case 404:
                throw new Error('メールアドレスが間違っています');
            default:
                throw new Error('ログインに失敗しました');
        }
    }).then(data => {   //ログイン成功時
        localStorage.setItem('JtiToken', data.Response.Data.JtiToken);
        window.location.href = '/html/home.html';
    }).catch(error => {
        console.log(error);
    });
});
