function moreInfo(postid){
  var container=document.querySelector('.outid-'+postid);
  if(!container)return;
  var bottomBar=container.nextElementSibling;
  if(!bottomBar||!bottomBar.classList.contains('post-bottom-bar'))return;
  var moreSpan=bottomBar.querySelector('.post-bottom-content .more-text');
  if(!moreSpan)return;
  var txt=moreSpan.textContent.trim();
    
  if(txt==='Show')
  {
      const url = assetRouter(postid);
        fetch(url)
          .then(r => r.text())
          .then(txt => {
            if(!txt) return;
            if(txt.trim().startsWith('<')) return;
            const wrapped = '<pre>' + txt + '</pre>';
            bottomBar.style.minHeight='35px';
            bottomBar.style.height='auto';
            var d=document.createElement('div');
            d.className='more-text-content';
            d.innerHTML=wrapped;
            bottomBar.appendChild(d);
            moreSpan.textContent='Less';
          })
      .catch(() => { return; });
  }
  else
  {
      var infoDiv=bottomBar.querySelector('.more-text-content');
      if(infoDiv) infoDiv.remove();
      bottomBar.style.removeProperty('min-height');
      bottomBar.style.height='35px';
      moreSpan.textContent='Show';
  }
}