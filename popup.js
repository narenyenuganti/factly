// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let firstButton = document.getElementById('first');
let secondButton = document.getElementById('second');
let thirdButton = document.getElementById('third');

chrome.storage.sync.get('color', function(data) {
  firstButton.style.backgroundColor = data.color;
  firstButton.setAttribute('value', data.color);
});


firstButton.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'window.alert("first fact fake!!");'});
  });
};
