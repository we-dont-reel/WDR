MicroModal.init();

setInterval(function(){
  MicroModal.show('share-modal');
}, 5000);

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