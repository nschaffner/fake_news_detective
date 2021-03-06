// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
 
   
  chrome.storage.local.set({"realIcon":{"image":"images/real16.png", "message":"This webpage is real."}, 
  "unknownIcon":{"image":"images/unknown16.png", "message":"The articles status is unknown."},
  "fakeIcon":{"image":"images/fake16.png","message":"The articles status is fake."},
  "baseIcon":{"image":"images/base16.png","message":"This is the default extension icon."}}, function() {
    console.log("Added all icons to background storage.");
  });

    chrome.storage.local.set({"currentIcon":{"image":"images/base16.png","message":"This is the default extension icon."}}, function (){
      console.log("Set the current Icon.")

    });
    chrome.storage.local.set({"pastIcon":{"image":"images/base16.png","message":"This is the default extension icon."}}, function (){
      console.log("Set the past Icon.")

    });


    console.log('Im the background script');
    chrome.identity.getAuthToken({interactive: true}, function(token) {
      let init = {
        method: 'GET',
        async: true,
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        'contentType': 'json'
      };
      fetch(
        'https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses&key=AIzaSyD5xMcNJynDl_3plmoELw4mDWFwFxInZ6k',
          init)
          .then((response) => response.json())
          .then(function(data) {
            let user_id = data['names'][0]['metadata']['source']['id'];
            let email = data['emailAddresses'][0]['value'];
            chrome.storage.local.set({"userid": user_id,'email':email}, function() {
              console.log('userid : ' + user_id + ',email: ' + email);
            });
          })
          .catch(error => { callback(error,null)});
    });
  
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


///https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
        chrome.storage.local.set({"changeurl": changeInfo.url,'title':tab.title}, function() {
          console.log('changeurl: ' + changeInfo.url);
        });
  }
  
  if (tabId == tab.id && changeInfo.status == 'complete') {
    console.log(document.getElementsByTagName("body")[0]);
   // var tab = tab[0];
    console.log(tab.url, tab.title);
    //savePage(tabId);
    chrome.tabs.executeScript(tab.id,{
      code: 'document.body.innerText;'
    },receiveText);
}

});
function receiveText(resultsArray){
  chrome.storage.local.set({"currentDOM": resultsArray[0]}, function() {
   // console.log(document.getElementsByTagName("body")[0]);
    });
}





