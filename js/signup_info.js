let signup_btn = document.getElementById('signup_next');  //signup
let store_btn = document.getElementById('store_next');    //store_info
let reservation_btn = document.getElementById('reservation_next');  //reservation_info

//get signup
if(signup_btn){
  signup_btn.addEventListener('click',() => {
  var mail = document.getElementById('mail').value;
  var tel = document.getElementById('tel').value;
  var pass = document.getElementById('pass').value;
  console.log(mail , tel , pass);
});
};


//get store
if(store_btn){
  store_btn.addEventListener('click',() => {
  var img_file = document.getElementById('img_file').value;
  var name = document.getElementById('name').value;
  var address = document.getElementById('address').value;
  var open_time = document.getElementById('open_time').value;
  var close_time = document.getElementById('close_time').value;
  var url = document.getElementById('url').value;
  var description = document.getElementById('description').value;

  console.log(img_file, name, address, open_time, close_time, url, description);
});
};


