// ログインボタン
const loginBtn = document.getElementById('login-btn');

// ログインボタンを押された時に入力情報取得
loginBtn.addEventListener('click', () => {
    const store_number = document.getElementById('store_number').value; //店舗番号
    const password = document.getElementById('password').value; //パスワード
    console.log(store_number,password);
});