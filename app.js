var data = {
  navs:[
  {"id": "MAA181", "url": "https://www.moneycontrol.com/mutual-funds/nav/axis-bluechip-fund-direct-plan/MAA181", "name": "item1", "nickname": "some1"},
  {"id": "MAA588", "url": "https://www.moneycontrol.com/mutual-funds/nav/axis-arbitrage-fund-direct-plan/MAA588", "name": "item2", "nickname": "some2"}
  ]
}

function loadUrls() {
  data.navs.forEach(function (nav) {
    var parent = document.getElementById('parent');
    var child = document.createElement('div');
    child.className = 'children';
    var title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = nav.nickname;
    createSubchildren(nav.url).then((subchildren) => {
      console.log(subchildren.subchild2.label2);
      var btn = createButtons(nav.url);
      child.append(title);
      child.append(subchildren.subchild1);
      child.append(subchildren.subchild2);
      child.append(subchildren.preview);
      child.append(btn);
      parent.append(child);
    });
  });
}

function createButtons(navUrl) {
  var btn = document.createElement('div');
  btn.className = 'btns';
  var urlBtn = document.createElement('button');
  urlBtn.className = 'urlBtn';
  urlBtn.innerHTML = 'Open NAV';
  urlBtn.onclick = function() { loadUrl(navUrl) };
  var submitBtn = document.createElement('button');
  submitBtn.className = 'submitBtn';
  submitBtn.innerHTML = 'Send Data';
  btn.append(urlBtn);
  btn.append(submitBtn);
  return btn;
}

async function createSubchildren(navUrl) {
  return this.requestNavSite(navUrl).then((data) => {
    var subchild1 = document.createElement('div');
    var subchild2 = document.createElement('div');
    var preview = document.createElement('div');

    var subchildren = {subchild1: subchild1, subchild2: subchild2, preview: preview};
    var label1 = document.createElement('label');
    label1.className = 'label';
    label1.for = 'text1';
    label1.innerHTML = "Date: ";
    var text1 = document.createElement('input');
    text1.className = 'textinput';
    text1.type = "text";
    text1.readOnly = "true";
    text1.value = data[0];
    subchild1.className = 'subchild';
    subchild1.append(label1);
    subchild1.append(text1);
    subchildren.subchild1 = subchild1;

    var label2 = document.createElement('label');
    label2.className = 'label';
    label2.for = 'text2';
    label2.innerHTML = "Price: ";
    var text2 = document.createElement('input');
    text2.className = 'textinput';
    text2.type = "text2";
    text2.readOnly = "true";
    text2.value = data[1];
    subchild2.className = 'subchild';
    subchild2.append(label2);
    subchild2.append(text2);
    subchildren.subchild2 = subchild2;

    preview.className = 'preview';
    preview.append(data[2]);
    subchildren.preview = preview;

    return subchildren;
  });
}

function loadUrl(url) {
  window.open(url, document.getElementById('frame'), "top=150,left=700,width=400,height=400");
}

function requestNavSite(url) {
  return fetch(url).then(function (response) {
	 return response.text();
  }).then(function (html) {
    var parser = new DOMParser();
     var doc = parser.parseFromString(html, "text/html");
     var dateOf = doc.querySelector('.grayvalue').innerHTML;
     var price = doc.querySelector('.amt').innerHTML;
     var img = doc.querySelector('.common_left');
     return [dateOf,price,img];
  }).catch(function (err) {
	 console.warn('Something went wrong.', err);
  });
}
