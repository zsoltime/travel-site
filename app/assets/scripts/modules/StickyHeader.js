import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import { polyfill as smoothScroll } from 'smoothscroll-polyfill';

class StickyHeader {
  constructor() {
    this.siteHeader = document.querySelector('.site-header');
    this.headerTriggerElement = document.querySelector('.large-hero__title');
    this.logo = document.querySelector('.site-header__logo');
    this.pageSections = document.querySelectorAll('.page-section');
    this.headerLinks = document.querySelectorAll('.primary-nav a');

    this.createHeaderWaypoint();
    this.createPageSectionWaypoints();
    this.addSmoothScrolling();
  }
  createHeaderWaypoint() {
    const that = this;
    new Waypoint({
      element: that.headerTriggerElement,
      handler: () => {
        that.siteHeader.classList.toggle('site-header--dark');
        that.logo.classList.toggle('site-header__logo--small');
      },
    });
  }
  createPageSectionWaypoints() {
    this.pageSections.forEach(section => {
      const that = this;
      new Waypoint({
        element: section,
        handler: (dir) => {
          if (dir === 'up') return;
          const matchingLink = document.querySelector(section.dataset.matchingLink);
          that.headerLinks.forEach(i => i.classList.remove('is-active'));
          matchingLink.classList.toggle('is-active');
        },
        offset: '15%',
      });

      new Waypoint({
        element: section,
        handler: (dir) => {
          if (dir === 'down') return;
          const matchingLink = document.querySelector(section.dataset.matchingLink);
          that.headerLinks.forEach(i => i.classList.remove('is-active'));
          matchingLink.classList.toggle('is-active');
        },
        offset: '-40%',
      });
    });
  }
  addSmoothScrolling() {
    smoothScroll();

    this.headerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        document.querySelector(e.target.hash).scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }
}

export default StickyHeader;
