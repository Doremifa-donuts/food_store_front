export function validateInput(email, password) {
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('無効なメールアドレス形式です');
    }
    return {
        email: escapeHtml(email),
        password: escapeHtml(password)
    };
}

//文字のバリデーション
export function escapeHtml(str) {
    if (!str) return '';

    return str.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

//http通信のステータスコードをチェック
export function checkStatus(response) {
    switch (response.status) {
        case 200:
            return response.json();
        case 401:   //認証情報が正しくなければログイン画面に遷移
            localStorage.removeItem('JtiToken');
            window.location.href = './login.html';
            return;
        case 404:
            break;
        case 500:
            localStorage.removeItem('JtiToken');
            window.location.href = './login.html';
            return;
        default:
            throw new Error('送信に失敗しました');
    }
}