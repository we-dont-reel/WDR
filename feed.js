function loadFeedJSON() {
  return fetch("feed.json").then(r => r.json());
}

function buildDivs(data) {
  const box = document.querySelector(".the-main-empty-box");
  let html = "";
  data.divs.forEach(item => {
    const parts = item.split(" ");
    const user = parts.pop();
    html += `<div class="${parts.join(" ")}" data-user="${user}"></div>`;
  });
  box.innerHTML = html;
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
