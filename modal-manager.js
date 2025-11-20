MicroModal.init();

document.addEventListener('micromodal:show', function () {
  document.body.classList.add('modal-blur');
});

document.addEventListener('micromodal:close', function () {
  document.body.classList.remove('modal-blur');
});

setTimeout(function(){
  MicroModal.show('report-modal');
}, 5000);