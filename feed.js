function loadFeedJSON() {
  let sources = ["feed.json", "feed2.json"];
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
    return { divs: filteredDivs };
  });
}

function buildDivs(data) {
  const box = document.querySelector(".the-main-empty-box");
  let html = "";
  data.divs.forEach(item => {
    const parts = item.split(" ");
    const user = parts.pop();
    const mainDiv = `<div class="${parts.join(" ")}" data-user="${user}"></div>`;
    const topBar = `<div class="post-top-bar"></div>`;
    const bottomBar = `<div class="post-bottom-bar"></div>`;
    html += `${topBar}${mainDiv}${bottomBar}`;
  });
  box.innerHTML = html.trim();
}

function startFeedLoad() {
  function tryLoad() {
    loadFeedJSON()
      .then(buildDivs)
      .catch(() => setTimeout(tryLoad, 500));
  }
  tryLoad();
}

window.addEventListener("load", function() {
  startFeedLoad();
});
