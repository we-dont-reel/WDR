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
      bottomBar.style.minHeight='35px';
      bottomBar.style.height='auto';
      var d=document.createElement('div');
      d.className='more-text-content';
      d.textContent='Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
      bottomBar.appendChild(d);
      moreSpan.textContent='Less';
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