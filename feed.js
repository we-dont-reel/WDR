function loadFeedJSON() {
  let sources = ["feed1.json", "feed0.json"];
  let promises = sources.map(url => fetch(url).then(r => r.json()));
  return Promise.all(promises).then(results => {
    let allRandomized = [];
    for (let data of results) {
      if (data && data.divs) {
        let originalDivs = data.divs.slice();
        for (let i = originalDivs.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [originalDivs[i], originalDivs[j]] = [originalDivs[j], originalDivs[i]];
        }
        allRandomized = allRandomized.concat(originalDivs);
      }
    }
    let filteredDivs = allRandomized;
    var p=new URLSearchParams(location.search).get("p");
    var u=new URLSearchParams(location.search).get("u");
    var l=new URLSearchParams(location.search).get("l");
    if(p){
    var oc="outid-"+p;
    var pi=filteredDivs.find(v=>v.includes(oc));
    if(pi){
    var pl=pi.split(" ").find(x=>x.startsWith("lan-"));
    filteredDivs=filteredDivs.filter(v=>v.includes("lan-en")||v.includes(pl));
    filteredDivs=filteredDivs.filter(v=>v!==pi);
    filteredDivs.unshift(pi);
    document.querySelector('.top-intro-div').firstElementChild.firstElementChild.textContent='Post First';
    }}
    if(u){
    var un="@"+u;
    var ups=filteredDivs.filter(v=>v.endsWith(un));
    var uls=[];
    ups.forEach(v=>{
    var pl=v.split(" ").find(x=>x.startsWith("lan-"));
    if(pl)uls.push(pl);
    });
    uls=[...new Set(uls)];
    uls.push("lan-en");
    ups.sort(function(a,b){
    var pa=parseInt(a.split(" ").find(x=>x.startsWith("outid-")).replace("outid-",""));
    var pb=parseInt(b.split(" ").find(x=>x.startsWith("outid-")).replace("outid-",""));
    return pb-pa;
    });
    filteredDivs=filteredDivs.filter(v=>{
    var pl=v.split(" ").find(x=>x.startsWith("lan-"));
    return uls.includes(pl);
    });
    ups.forEach(v=>{
    filteredDivs=filteredDivs.filter(x=>x!==v);
    });
    filteredDivs.unshift(...ups);
    if(ups.length>0)document.querySelector('.top-intro-div').firstElementChild.firstElementChild.textContent='Creator First';
    }
    if(l){
      var ls=l.split(",").map(x=>x.trim().toLowerCase()).filter(Boolean).map(x=>x.startsWith("lan-")?x:"lan-"+x);
      ls=[...new Set(ls)];
      filteredDivs=filteredDivs.filter(v=>{
        var pl=v.split(" ").find(x=>x.startsWith("lan-"));
        return pl && ls.includes(pl);
      });
    }
    return { divs: filteredDivs };
  });
}

function buildDivs(data) {
  const box = document.querySelector(".the-main-empty-box");
  let html = "";
    data.divs.forEach(item => {
      const parts = item.split(" ");
      const user = parts.pop();
      const cleanUser = user.substring(1);
      const postID = parts[1].replace("outid-", "");
      const imageCounter = parts[2].replace("tot-img-", "");
      var topHint = "Single";
      if (imageCounter > 1) topHint = "Swipe";
      const mainDiv = `<div class="${parts.join(" ")}" data-user="${user}"></div>`;
      const topBar = `
        <div class="post-top-bar">
          <div class="post-top-left">
            <div class="avatar-circle" style="background-color:${getRandomColor()}" onclick="location.href='instagram://user?username=${cleanUser}'">
              <i class="fa-regular fa-user"></i>
            </div>
            <a href="instagram://user?username=${cleanUser}">${cleanUser}</a>
          </div>
            <div class="post-top-right">${topHint}</div>
        </div>`;
      const bottomBar = `
        <div class="post-bottom-bar">
          <div class="post-bottom-content">

              <button class="report-btn" onclick="showReportModal(${postID})">
              <i class="fa-solid fa-circle-info">
              </i></button>

              <button class="share-btn" onclick="showShareModal(${postID})">
              <i class="fa-solid fa-share-nodes">
              </i></button>

              <span class="more-text-na" data-postid="${postID}">None</span>

              </div>
          </div>`;
      html += `${topBar}${mainDiv}${bottomBar}`;
    });
  box.innerHTML = html.trim();
  document.querySelector('.bottom-end-div p').textContent = 'Nothing more for now :-)';
  initMoreTextObserver();
  initSwiperObserver();
}

function startFeedLoad() {
  function tryLoad() {
    loadFeedJSON()
      .then(buildDivs)
      .catch(() => setTimeout(tryLoad, 500));
  }
  tryLoad();
}

function getRandomColor() {
  const colors = [
  "#F4511E","#E91E63","#AD1457","#6A1B9A","#8E24AA",
  "#3949AB","#283593","#1E88E5","#1565C0","#0277BD",
  "#00838F","#00695C","#2E7D32","#1B5E20","#558B2F",
  "#827717","#F9A825","#FF8F00","#EF6C00","#D84315",
  "#C62828","#B71C1C","#4E342E","#3E2723","#424242",
  "#37474F","#263238","#D81B60","#5E35B1","#039BE5",
  "#00ACC1","#00897B","#43A047","#7CB342","#C0CA33",
  "#FDD835","#FFB300","#FB8C00","#6D4C41","#8D6E63",
  "#5D4037","#455A64","#546E7A","#7E57C2","#4FC3F7",
  "#29B6F6","#26C6DA","#26A69A","#66BB6A","#9CCC65",
  "#D4E157","#FFCA28","#FFA726","#FF7043","#EF5350",
  "#AB47BC","#5C6BC0","#42A5F5","#8E352E","#7A3E65",
  "#4D2C3D","#2F3E46","#354F52","#52796F","#2C3E50",
  "#34495E","#5D6D7E","#1C2833","#512E5F","#4A235A",
  "#154360","#1B4F72","#0E6251","#145A32","#186A3B",
  "#7D6608","#935116","#784212"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

window.addEventListener("load", function() {
  startFeedLoad();
});
