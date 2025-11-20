MicroModal.init();

setInterval(function(){
  MicroModal.show('report-modal');
}, 5000);

function closeModal(id){
  setTimeout(function(){
    MicroModal.close(id);
  }, 100);
}