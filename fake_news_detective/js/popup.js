'use strict';
/*
let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});
*/

const imgList = ["images/real16.png", "images/unknown16.png", "images/fake16.png"]//, "images/base32.png"];
var imgIndex = 0;

window.onload=function(){
<<<<<<< HEAD
  
  
  let button = document.getElementById('geturl');

  button.addEventListener ("click", function() {
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.value = window.location.href;


  });

  document.getElementById('changeIcon').addEventListener("click", function(){

    let i = imgList[imgIndex];
    console.log(i);
    chrome.browserAction.setIcon({path: imgList[imgIndex]});
    imgIndex= (imgIndex+1)%imgList.length;
  });
  

=======
  //let button = document.getElementById('geturl');
>>>>>>> master

  //https://stackoverflow.com/questions/18150774/get-all-keys-from-chrome-storage
      document.getElementById('getUserInfo').addEventListener("click", function(){
        chrome.storage.local.get(['userid'], function(userid){
        
          let idhtml = document.getElementById('id');
          idhtml.innerHTML = userid.userid;
        });
        chrome.storage.local.get(['email'], function(email){
          let emailhtml = document.getElementById('email');
          emailhtml.innerHTML = email.email;
      
      });
      chrome.storage.local.get(['changeurl'], function(cururl){
        let urlhtml = document.getElementById('current_url');
        urlhtml.innerHTML = cururl.changeurl;
    
    });
    });   
}
