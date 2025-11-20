MicroModal.init({
  awaitOpenAnimation: true,
  awaitCloseAnimation: true
});

setTimeout(function(){
  MicroModal.show('report-modal');
}, 5000);