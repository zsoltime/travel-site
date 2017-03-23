!function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:o})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e){!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,e+=1}var e=0,n={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in n)e.push(n[o]);for(var i=0,r=e.length;i<r;i++)e[i][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.Context.refreshAll();for(var e in n)n[e].enabled=!0;return this},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=i.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,n+=1,i.windowContext||(i.windowContext=!0,i.windowContext=new e(window)),this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,o={},i=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical),n=this.element==this.element.window;t&&e&&!n&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,i.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){e.didScroll&&!i.isTouch||(e.didScroll=!0,i.requestAnimationFrame(t))})},e.prototype.handleResize=function(){i.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in e){var o=e[n],i=o.newScroll>o.oldScroll,r=i?o.forward:o.backward;for(var s in this.waypoints[n]){var l=this.waypoints[n][s];if(null!==l.triggerPoint){var a=o.oldScroll<l.triggerPoint,c=o.newScroll>=l.triggerPoint,u=a&&c,h=!a&&!c;(u||h)&&(l.queueTrigger(r),t[l.group.id]=l.group)}}}for(var f in t)t[f].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?i.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?i.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var n in this.waypoints[e])t.push(this.waypoints[e][n]);for(var o=0,i=t.length;o<i;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,n=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:n.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:n.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var l in this.waypoints[r]){var a,c,u,h,f,d=this.waypoints[r][l],p=d.options.offset,y=d.triggerPoint,m=0,g=null==y;d.element!==d.element.window&&(m=d.adapter.offset()[s.offsetProp]),"function"==typeof p?p=p.apply(d):"string"==typeof p&&(p=parseFloat(p),d.options.offset.indexOf("%")>-1&&(p=Math.ceil(s.contextDimension*p/100))),a=s.contextScroll-s.contextOffset,d.triggerPoint=Math.floor(m+a-p),c=y<s.oldScroll,u=d.triggerPoint>=s.oldScroll,h=c&&u,f=!c&&!u,!g&&h?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&f?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return i.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},i.requestAnimationFrame=function(e){(window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t).call(window,e)},i.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function n(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},i=window.Waypoint;n.prototype.add=function(t){this.waypoints.push(t)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var o=this.triggerQueues[n],i="up"===n||"left"===n;o.sort(i?e:t);for(var r=0,s=o.length;r<s;r+=1){var l=o[r];(l.options.continuous||r===o.length-1)&&l.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(e){this.waypoints.sort(t);var n=i.Adapter.inArray(e,this.waypoints);return n===this.waypoints.length-1?null:this.waypoints[n+1]},n.prototype.previous=function(e){this.waypoints.sort(t);var n=i.Adapter.inArray(e,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},n.prototype.remove=function(t){var e=i.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(t){return o[t.axis][t.name]||new n(t)},i.Group=n}(),function(){"use strict";function t(t){return t===t.window}function e(e){return t(e)?e:e.defaultView}function n(t){this.element=t,this.handlers={}}var o=window.Waypoint;n.prototype.innerHeight=function(){return t(this.element)?this.element.innerHeight:this.element.clientHeight},n.prototype.innerWidth=function(){return t(this.element)?this.element.innerWidth:this.element.clientWidth},n.prototype.off=function(t,e){function n(t,e,n){for(var o=0,i=e.length-1;o<i;o++){var r=e[o];n&&n!==r||t.removeEventListener(r)}}var o=t.split("."),i=o[0],r=o[1],s=this.element;if(r&&this.handlers[r]&&i)n(s,this.handlers[r][i],e),this.handlers[r][i]=[];else if(i)for(var l in this.handlers)n(s,this.handlers[l][i]||[],e),this.handlers[l][i]=[];else if(r&&this.handlers[r]){for(var a in this.handlers[r])n(s,this.handlers[r][a],e);this.handlers[r]={}}},n.prototype.offset=function(){if(!this.element.ownerDocument)return null;var t=this.element.ownerDocument.documentElement,n=e(this.element.ownerDocument),o={top:0,left:0};return this.element.getBoundingClientRect&&(o=this.element.getBoundingClientRect()),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}},n.prototype.on=function(t,e){var n=t.split("."),o=n[0],i=n[1]||"__default",r=this.handlers[i]=this.handlers[i]||{};(r[o]=r[o]||[]).push(e),this.element.addEventListener(o,e)},n.prototype.outerHeight=function(e){var n,o=this.innerHeight();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),o+=parseInt(n.marginTop,10),o+=parseInt(n.marginBottom,10)),o},n.prototype.outerWidth=function(e){var n,o=this.innerWidth();return e&&!t(this.element)&&(n=window.getComputedStyle(this.element),o+=parseInt(n.marginLeft,10),o+=parseInt(n.marginRight,10)),o},n.prototype.scrollLeft=function(){var t=e(this.element);return t?t.pageXOffset:this.element.scrollLeft},n.prototype.scrollTop=function(){var t=e(this.element);return t?t.pageYOffset:this.element.scrollTop},n.extend=function(){for(var t=Array.prototype.slice.call(arguments),e=1,n=t.length;e<n;e++)!function(t,e){if("object"==typeof t&&"object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t}(t[0],t[e]);return t[0]},n.inArray=function(t,e,n){return null==e?-1:e.indexOf(t,n)},n.isEmptyObject=function(t){for(var e in t)return!1;return!0},o.adapters.push({name:"noframework",Adapter:n}),o.Adapter=n}()},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=function(){function t(){o(this,t),this.siteHeader=document.querySelector(".site-header"),this.menuIcon=document.querySelector(".site-header__menu-icon"),this.menuContent=document.querySelector(".site-header__menu-content"),this.events()}return i(t,[{key:"events",value:function(){this.menuIcon.addEventListener("click",this.toggleMenu.bind(this))}},{key:"toggleMenu",value:function(){this.menuContent.classList.toggle("site-header__menu-content--is-visible"),this.siteHeader.classList.toggle("site-header--is-expanded"),this.menuIcon.classList.toggle("site-header__menu-icon--close-x")}}]),t}();e.default=r},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=function(){function t(){o(this,t),this.openModalButton=document.querySelectorAll(".open-modal"),this.modal=document.querySelector(".modal"),this.closeModalButton=document.querySelector(".modal__close"),this.events()}return i(t,[{key:"events",value:function(){var t=this;this.openModalButton.forEach(function(e){return e.addEventListener("click",t.openModal.bind(t))}),this.closeModalButton.addEventListener("click",this.closeModal.bind(this)),document.addEventListener("keyup",this.handleKeyPress.bind(this))}},{key:"openModal",value:function(t){t.preventDefault(),this.modal.classList.add("modal--is-visible")}},{key:"closeModal",value:function(t){t.preventDefault(),this.modal.classList.remove("modal--is-visible")}},{key:"handleKeyPress",value:function(t){27===event.keyCode&&this.modal.classList.contains("modal--is-visible")&&this.closeModal(t)}}]),t}();e.default=r},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=n(0),s=(function(t){t&&t.__esModule?t:{default:t}}(r),function(){function t(e,n){o(this,t),this.itemsToReveal=document.querySelectorAll(e),this.offsetPercentage=n,this.hideInitially(),this.createWaypoints()}return i(t,[{key:"hideInitially",value:function(){this.itemsToReveal.forEach(function(t){return t.classList.add("reveal-item")})}},{key:"createWaypoints",value:function(){var t=this;this.itemsToReveal.forEach(function(e){new Waypoint({element:e,handler:function(){return e.classList.add("reveal-item--is-visible")},offset:t.offsetPercentage})})}}]),t}());e.default=s},function(t,e,n){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),r=n(0),s=(function(t){t&&t.__esModule?t:{default:t}}(r),n(10)),l=function(){function t(){o(this,t),this.lazyImages=document.querySelectorAll(".lazyload"),this.siteHeader=document.querySelector(".site-header"),this.headerTriggerElement=document.querySelector(".large-hero__title"),this.logo=document.querySelector(".site-header__logo"),this.pageSections=document.querySelectorAll(".page-section"),this.headerLinks=document.querySelectorAll(".primary-nav a"),this.createHeaderWaypoint(),this.createPageSectionWaypoints(),this.addSmoothScrolling(),this.refreshWaypoints()}return i(t,[{key:"createHeaderWaypoint",value:function(){var t=this;new Waypoint({element:t.headerTriggerElement,handler:function(){t.siteHeader.classList.toggle("site-header--dark"),t.logo.classList.toggle("site-header__logo--small")}})}},{key:"refreshWaypoints",value:function(){this.lazyImages.forEach(function(t){return t.addEventListener("load",function(){return Waypoint.refreshAll()})})}},{key:"toggleActivate",value:function(t){var e=document.querySelector(t.dataset.matchingLink);this.headerLinks.forEach(function(t){return t.classList.remove("is-active")}),e.classList.toggle("is-active")}},{key:"createPageSectionWaypoints",value:function(){var t=this;this.pageSections.forEach(function(e){new Waypoint({element:e,handler:function(n){"up"!==n&&t.toggleActivate(e)},offset:"15%"}),new Waypoint({element:e,handler:function(n){"down"!==n&&t.toggleActivate(e)},offset:"-40%"})})}},{key:"addSmoothScrolling",value:function(){(0,s.polyfill)(),this.headerLinks.forEach(function(t){t.addEventListener("click",function(t){document.querySelector(t.target.hash).scrollIntoView({behavior:"smooth"})})})}}]),t}();e.default=l},,,,function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}var i=n(1),r=o(i),s=n(3),l=o(s),a=n(4),c=o(a),u=n(2),h=o(u);new r.default;new l.default(".feature-item","85%"),new l.default(".testimonial","60%");new c.default,new h.default},,function(t,e,n){!function(e,n,o){"use strict";function i(){function t(t,e){this.scrollLeft=t,this.scrollTop=e}function i(t){return.5*(1-Math.cos(Math.PI*t))}function r(t){if("object"!=typeof t||null===t||t.behavior===o||"auto"===t.behavior||"instant"===t.behavior)return!0;if("object"==typeof t&&"smooth"===t.behavior)return!1;throw new TypeError("behavior not valid")}function s(t){var o,i,r;do{t=t.parentNode,o=t===n.body,i=t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth,r="visible"===e.getComputedStyle(t,null).overflow}while(!o&&(!i||r));return o=i=r=null,t}function l(t){t.frame=e.requestAnimationFrame(l.bind(e,t));var n,o,r,s=f(),a=(s-t.startTime)/u;if(a=a>1?1:a,n=i(a),o=t.startX+(t.x-t.startX)*n,r=t.startY+(t.y-t.startY)*n,t.method.call(t.scrollable,o,r),o===t.x&&r===t.y)return void e.cancelAnimationFrame(t.frame)}function a(o,i,r){var s,a,c,u,d=f();o===n.body?(s=e,a=e.scrollX||e.pageXOffset,c=e.scrollY||e.pageYOffset,u=h.scroll):(s=o,a=o.scrollLeft,c=o.scrollTop,u=t),l({scrollable:s,method:u,startTime:d,startX:a,startY:c,x:i,y:r,frame:void 0})}if(!("scrollBehavior"in n.documentElement.style)){var c=e.HTMLElement||e.Element,u=468,h={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,scrollIntoView:c.prototype.scrollIntoView},f=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now;e.scroll=e.scrollTo=function(){if(r(arguments[0]))return void h.scroll.call(e,arguments[0].left||arguments[0],arguments[0].top||arguments[1]);a.call(e,n.body,~~arguments[0].left,~~arguments[0].top)},e.scrollBy=function(){if(r(arguments[0]))return void h.scrollBy.call(e,arguments[0].left||arguments[0],arguments[0].top||arguments[1]);a.call(e,n.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset))},c.prototype.scrollIntoView=function(){if(r(arguments[0]))return void h.scrollIntoView.call(this,arguments[0]||!0);var t=s(this),o=t.getBoundingClientRect(),i=this.getBoundingClientRect();t!==n.body?(a.call(this,t,t.scrollLeft+i.left-o.left,t.scrollTop+i.top-o.top),e.scrollBy({left:o.left,top:o.top,behavior:"smooth"})):e.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}}}t.exports={polyfill:i}}(window,document)}]);