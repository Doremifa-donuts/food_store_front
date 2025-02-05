import * as url from "./url.js";
const jtiToken = localStorage.getItem('JtiToken');

fetch(url.RESTAURANT_URL, {
    method: 'GET',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jtiToken}`
    },
    mode: 'cors',
})
.then(response => {
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
            window.location.href = './login.html'
    }
})
.then(data => {
    const uuid = data.Response.Data.RestaurantUuid;

    const qrCode = new QRious({
        element: document.getElementById('qrcode'),
        value: uuid,
        size: 600,
        level: 'H',
        foreground: '#000000',
        background: '#ffffff',
        backgroundAlpha: 0.0
    });
})
.catch(error => {
    console.log(error);
});