MicroModal.init({
  onShow: function(modal) {
    document.body.classList.add('modal-blur');
    modal.querySelector('.modal__container').classList.add('modal-ease-active');
  },
  onClose: function(modal) {
    document.body.classList.remove('modal-blur');
    modal.querySelector('.modal__container').classList.remove('modal-ease-active');
  }
});

document.querySelector('#report-modal .modal__container').classList.add('modal-ease');


setTimeout(function(){
  MicroModal.show('report-modal');
}, 5000);