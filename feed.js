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
      const postClass = parts[1];
      const imageCounter = parts[2].replace("tot-img-", "");
      const mainDiv = `<div class="${parts.join(" ")}" data-user="${user}"></div>`;
      const topBar = `
        <div class="post-top-bar">
          <div class="post-top-left">
            <div class="avatar-circle" style="background-color:${getRandomColor()}">
              ${cleanUser.charAt(0).toUpperCase()}
            </div>
            ${cleanUser}
          </div>
        </div>`;
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

function getRandomColor() {
  const colors = [
    "#3A4A6B", "#5A6B8C", "#2E5A72",
    "#7B4F8F", "#8C3A4A", "#6A7F3A",
    "#4A5D4E", "#36495A", "#6B3F5A",
    "#5C4B8A", "#4F6A7B", "#7A553C",
    "#3F6B5C", "#6B2F3F", "#4A3F6B"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

window.addEventListener("load", function() {
  startFeedLoad();
});
