// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let countyCount = document.getElementById('county');
let stateCount = document.getElementById('state');
let nationalCount = document.getElementById('national');
let globalCount = document.getElementById('global');
let searchBar = document.getElementById('search');

chrome.storage.sync.get('color', function(data) {
  firstButton.style.backgroundColor = data.color;
  firstButton.setAttribute('value', data.color);
});


countyCount.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: 'window.alert("There have been ' + Math.floor(Math.random()*10) + ' new cases in Alameda County");'});
  });
};
