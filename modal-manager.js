MicroModal.init();

function showReportModal(postid){
  var el=document.querySelector('.report-post-id');
  if(el){el.textContent=postid;}
  MicroModal.show('report-modal');
}

function showShareModal(postid){
  var el=document.getElementById('share-text');
  if(el){el.value='https://in.wedontreel.com/feed?p='+postid;}
  MicroModal.show('share-modal');    
}

function copyShareText(textareaId){
  var el=document.getElementById(textareaId);
  var btn=event.target;
  var oldText=btn.innerHTML;
  navigator.clipboard.writeText(el.value).then(function(){
    el.blur();
    window.getSelection().removeAllRanges();
    btn.innerText="Copied...Closing now.";
    setTimeout(function(){
      btn.innerHTML=oldText;
      MicroModal.close('share-modal');
    },800);
  }).catch(function(){
    navigator.clipboard.writeText(el.value);
    el.blur();
    window.getSelection().removeAllRanges();
    btn.innerText="Copied...Closing now.";
    setTimeout(function(){
      btn.innerHTML=oldText;
      closeModal('share-modal');
    },800);
  });
}

function closeModal(id){
  setTimeout(function(){
    MicroModal.close(id);
  }, 100);
}