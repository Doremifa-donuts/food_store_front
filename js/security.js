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