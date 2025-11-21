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
    el.select();
    el.setSelectionRange(0,99999);
    document.execCommand("copy");
    el.blur();
    window.getSelection().removeAllRanges();
    btn.innerText="Copied...";
    setTimeout(function(){btn.innerText="Copy";},1200);
  });
}

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('share-modal').addEventListener('transitionend', function(){
    var el = document.getElementById('share-text');
    if(el) el.blur();
  });
});

function closeModal(id){
  setTimeout(function(){
    MicroModal.close(id);
  }, 100);
}