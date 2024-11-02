// ログインボタン
const loginBtn = document.getElementById('login-btn');

// ログインダイアログ
const loginDialog = document.getElementById('login-dialog');

// ログインボタンを押された時にダイアログを出す
loginBtn.addEventListener('click', () => {
    
    loginDialog.show();
});