function loadFeedJSON() {
  return fetch("feed.json").then(r => r.json());
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
