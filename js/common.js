//ダイアログ表示処理
const dialogs = document.querySelectorAll('.dialog'); //ダイアログ取得
const open = document.querySelectorAll('.dialog-open'); //ダイアログを開くボタン

// ダイアログを開く
open.forEach((button) => {
  button.addEventListener('click', () => {
    const dialogId = button.getAttribute('data-dialog');    //どっちのダイアログを開くか
    const dialog = document.getElementById(dialogId);
    dialog.showModal();
    dialog.classList.add('show');
  });
});

// ダイアログを閉じる
const close = document.querySelectorAll('.back_btn');
close.forEach(button => {
  button.addEventListener('click', () => {
  const dialog = button.closest('dialog');
  dialog.classList.remove('show');
  setTimeout(() => dialog.close(), 500);
  });
});

// オーバーレイクリックでダイアログを閉じる
dialogs.forEach(button => {
    button.addEventListener('click', (event) => {
      if(event.target.closest('.dialog-inner') === null) {
        const dialog = button.closest('dialog');
        dialog.classList.remove('show');
        setTimeout(() => dialog.close(), 500);
      }
    });
  });