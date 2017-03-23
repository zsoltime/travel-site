class Modal {
  constructor() {
    this.openModalButton = document.querySelectorAll('.open-modal');
    this.modal = document.querySelector('.modal');
    this.closeModalButton = document.querySelector('.modal__close');
    this.events();
  }
  events() {
    this.openModalButton.forEach(btn => (
      btn.addEventListener('click', this.openModal.bind(this))
    ));
    this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
    document.addEventListener('keyup', this.handleKeyPress.bind(this));
  }
  openModal(e) {
    e.preventDefault();
    this.modal.classList.add('modal--is-visible');
  }
  closeModal(e) {
    e.preventDefault();
    this.modal.classList.remove('modal--is-visible');
  }
  handleKeyPress(e) {
    if (event.keyCode === 27 && this.modal.classList.contains('modal--is-visible')) {
      this.closeModal(e);
    }
  }
}

export default Modal;
