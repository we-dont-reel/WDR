MicroModal.init({
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
  closeAnimationDuration: 300
});

setTimeout(function(){
  MicroModal.show('report-modal');
}, 5000);