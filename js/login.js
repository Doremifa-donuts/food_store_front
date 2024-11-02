// ログインボタン
const loginBtn = document.getElementById('login-btn');
// クローズ゙ボタン
const closeBtn = document.getElementById('close-btn');

// ログインダイアログ
const loginDialog = document.getElementById('login-dialog');


// ログインボタンを押された時にダイアログを出す
loginBtn.addEventListener('click', () => {
    // モーダルダイアログを表示する際に背景部分がスクロールしないようにする
    document.documentElement.style.overflow = "hidden";
    loginDialog.show();
});

// クローズボタンを押された時にダイアログを閉じる
closeBtn.addEventListener('click', () => {
    loginDialog.close();
});