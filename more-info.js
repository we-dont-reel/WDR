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
      const url = assetRouter(postid)+'caption.txt';
        fetch(url)
          .then(r => r.text())
          .then(txt => {
            if(!txt) return;
            if(txt.trim().startsWith('<')) return;
            const wrapped = '<pre>' + txt + '</pre>';
            bottomBar.style.minHeight='35px';
            bottomBar.style.height='auto';
            bottomBar.style.paddingTop='5px';
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
      bottomBar.style.removeProperty('padding-top');
      bottomBar.style.height='35px';
      moreSpan.textContent='Show';
  }
}

var moreTextObserver=null;
function initMoreTextObserver(){
if(moreTextObserver) return;
moreTextObserver=new IntersectionObserver(function(entries,observer){
entries.forEach(function(entry){
if(!entry.isIntersecting) return;
var el=entry.target;
var id=el.getAttribute('data-postid');
if(!id){observer.unobserve(el);return;}
var url=assetRouter(id)+'caption.txt';
fetch(url).then(function(r){
if(!r.ok) return null;
return r.text();
}).then(function(t){
if(!t) return;
t=t.trim();
if(!t) return;
if(t.charAt(0)==='<') return;
if(t.startsWith('[No description available]')) return;
el.removeAttribute('class');
el.removeAttribute('data-postid');
el.className='more-text';
el.setAttribute('onclick','moreInfo('+id+')');
el.innerText='Show';
observer.unobserve(el);
}).catch(function(){});
});
},{threshold:0});
document.querySelectorAll('.more-text-na').forEach(function(el){
moreTextObserver.observe(el);
});
}