import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
  constructor(els, offset) {
    this.itemsToReveal = document.querySelectorAll(els);
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }
  hideInitially() {
    this.itemsToReveal.forEach(item => item.classList.add('reveal-item'));
  }
  createWaypoints() {
    const that = this;
    this.itemsToReveal.forEach(item => {
      new Waypoint({
        element: item,
        handler: () => item.classList.add('reveal-item--is-visible'),
        offset: that.offsetPercentage,
      });
    });
  }
}

export default RevealOnScroll;
