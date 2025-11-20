MicroModal.init();

setTimeout(function(){
  MicroModal.show('report-modal');
}, 5000);

function closeModal(id){
  const modal=document.getElementById(id);
  const overlay=modal.querySelector('.modal__overlay');
  const container=modal.querySelector('.modal__container');
  overlay.classList.add('fadeout');
  container.classList.add('fadeout');
  setTimeout(function(){
    overlay.classList.remove('fadeout');
    container.classList.remove('fadeout');
    MicroModal.close(id);
  },300);
}