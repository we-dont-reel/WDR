function loadFeedJSON() {
  return fetch("feed.json").then(r => r.json());
}

function buildDivs(data) {
  const box = document.querySelector(".the-main-empty-box");
  data.divs.forEach(item => {
    const parts = item.split(" ");
    const user = parts.pop();
    const d = document.createElement("div");
    d.className = parts.join(" ");
    d.dataset.user = user;
    box.appendChild(d);
  });
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
