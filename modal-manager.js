MicroModal.init();

setInterval(function(){
  MicroModal.show('share-modal');
}, 5000);

function copyShareText(textareaId){
  var el = document.getElementById(textareaId);
  el.select();
  el.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(el.value);
}

function closeModal(id){
  setTimeout(function(){
    MicroModal.close(id);
  }, 100);
}