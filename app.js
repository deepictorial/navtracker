
// var data = {
//   navs:[
//   this is send data format -> {"id": "MAA181", "url": "https://www.moneycontrol.com/mutual-funds/nav/axis-bluechip-fund-direct-plan/MAA181", "name": "item1", "friendly_name": "some1", "date": "08 may 2020", "nav": "r20"},
//   this is receive tracker format -> {"id": "MAA588", "url": "https://www.moneycontrol.com/mutual-funds/nav/axis-arbitrage-fund-direct-plan/MAA588", "name": "item2", "friendly_name": "some2"}
//   ]
// }

var postData = {navs:[]};

async function loadUrls() {
  var id, date, nav;
  const data = await getTrackers();
  data.navs.forEach(function (nav, index) {
    var parent = document.getElementById('parent');
    var child = document.createElement('div');
    child.className = 'children';
    var title = document.createElement('h2');
    title.className = 'title';
    title.innerHTML = nav.friendly_name;
    createSubchildren(nav.url).then((subchildrenData) => {
      var btn = createButtons(nav);
      child.append(title);
      child.append(subchildrenData[0].preview);
      child.append(subchildrenData[0].subchild1);
      child.append(subchildrenData[0].subchild2);
      child.append(btn);
      parent.append(child);
      addToPostData(subchildrenData, nav);
    });
  });
}

function addToPostData(subchildrenData, nav) {
  postData.navs.push({id: nav.id, date: subchildrenData[1], nav: subchildrenData[2]});
}

function createButtons(nav) {
  var btn = document.createElement('div');
  btn.className = 'btns';
  var urlBtn = document.createElement('button');
  urlBtn.className = 'urlBtn';
  urlBtn.innerHTML = 'Open NAV';
  urlBtn.onclick = function() { loadUrl(nav.url) };
  var submitBtn = document.createElement('button');
  submitBtn.id = nav.id;
  submitBtn.className = 'submitBtn';
  submitBtn.innerHTML = 'Send Data';
  submitBtn.onclick = function() { sendOne(nav.id) };

  btn.append(urlBtn);
  btn.append(submitBtn);
  return btn;
}

async function createSubchildren(navUrl) {
  const data = await requestNavSite(navUrl);
  var parser = new DOMParser();
  var doc = parser.parseFromString(data, "text/html");
  var dateOf = doc.querySelector('.grayvalue').innerHTML;
  var price = doc.querySelector('.amt').innerHTML;
  var img = doc.querySelector('.common_left');
  doc.getElementsByClassName('invest_now_container')[0].remove();
  doc.getElementsByClassName('left_block')[0].remove();

  var subchild1 = document.createElement('div');
  var subchild2 = document.createElement('div');
  var preview = document.createElement('div');

  var subchildren = {subchild1: subchild1, subchild2: subchild2, preview: preview};
  preview.className = 'preview';
  preview.append(img);
  subchildren.preview = preview;

  var label1 = document.createElement('label');
  label1.className = 'label';
  label1.for = 'text1';
  label1.innerHTML = "Date: ";
  var text1 = document.createElement('input');
  text1.className = 'textinput';
  text1.type = "text";
  text1.value = dateOf;
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
  text2.value = price;
  subchild2.className = 'subchild';
  subchild2.append(label2);
  subchild2.append(text2);
  subchildren.subchild2 = subchild2;

  return [subchildren, dateOf, price];
}

function loadUrl(url) {
  window.open(url, '_blank', "fullscreen=yes");
}

function getTrackers() {
  return new Promise(resolve => {
   fetch("https://1n9dgddt95.execute-api.us-west-2.amazonaws.com/prod/gettrackers").then(function (response) {
	    resolve(response.json());
    });
  }).catch(function (err) {
	  console.warn('Something went wrong.', err);
  });
}

function requestNavSite(url) {
  return new Promise(resolve => {
    fetch(url).then(function (response) {
	     resolve(response.text());
     });
  }).catch(function (err) {
	 console.warn('Something went wrong.', err);
  });
}

async function sendAll() {
  let response = await fetch('https://1n9dgddt95.execute-api.us-west-2.amazonaws.com/prod/record', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
    body: JSON.stringify(postData)
  }).then(function (response) {
    if(response.status === 200) {
      document.getElementById('sendAll').style.backgroundColor = 'green';
    } else if(response.status > 399){
      document.getElementById('sendAll').style.backgroundColor = 'red';
    }
  }).catch(function (err) {
	  console.warn('Something went wrong.', err);
    document.getElementById('sendAll').style.backgroundColor = 'red';
  });
}

async function sendOne(id) {
  console.log("clicked send one");
  //var dataRow = postData.navs.filter()
  // let response = await fetch('https://1n9dgddt95.execute-api.us-west-2.amazonaws.com/prod/record', {
  // method: 'POST',
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // },
  //   body: JSON.stringify(postData)
  // }).then(function (response) {
  //   if(response.status === 200) {
  //     document.getElementById('sendAll').style.backgroundColor = 'green';
  //   } else if(response.status > 399){
  //     document.getElementById('sendAll').style.backgroundColor = 'red';
  //   }
  // }).catch(function (err) {
	//   console.warn('Something went wrong.', err);
  //   document.getElementById('sendAll').style.backgroundColor = 'red';
  // });
}
