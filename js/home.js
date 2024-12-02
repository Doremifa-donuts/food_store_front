// ブーストボタン
const boostBtnBtn = document.getElementById('boost-btn');
// ダイアログ
const boostDialog = document.getElementById('boostDialog');
// 閉じるボタン
const closeButton = document.getElementById('closeButton');


// ブーストボタンを押された時にダイアログを出す
boostBtn.addEventListener('click', () => {
    boostDialog.showModal();
    // モーダルダイアログを表示する際に背景部分がスクロールしないようにする
    document.documentElement.style.overflow = "hidden";
});

// モーダルを閉じる
closeButton.addEventListener('click', () => {
    boostDialog.close();
    // モーダルを解除すると、スクロール可能になる
    document.documentElement.removeAttribute("style");
  });