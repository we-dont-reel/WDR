MicroModal.init();

setInterval(function(){
  MicroModal.show('share-modal');
}, 5000);

function copyShareText(textareaId){
  var el=document.getElementById(textareaId);
  var btn=event.target;
  navigator.clipboard.writeText(el.value).then(function(){
    el.blur();
    window.getSelection().removeAllRanges();
    btn.innerText="Copied...";
    setTimeout(function(){btn.innerText="Copy";},1200);
  }).catch(function(){
    navigator.clipboard.writeText(el.value);
    el.blur();
    window.getSelection().removeAllRanges();
    btn.innerText="Copied...";
    setTimeout(function(){btn.innerText="Copy";},1200);
  });
}

function closeModal(id){
  setTimeout(function(){
    MicroModal.close(id);
  }, 100);
}