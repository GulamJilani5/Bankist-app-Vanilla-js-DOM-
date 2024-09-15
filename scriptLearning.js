'use strict';

/**************************************************************************************************************
 ******************************************************************************
 *** CODE FLOW IS SAME AS LEARNING OCCURRED ON THE TUTORIAL BASED ON THE TOPICS,
 *** WITHOUT PUTTING THE CODE UP OR DOWN. script.js has organised code order.
 ******************************************************************************
 ****************************************************************************************************************/

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
/////////////// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  dwwwh;
};

// For each is better than standard for loop below.
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i <a btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////// SELECTING ELEMENTS

// console.log(document.documentElement); // Selecting the entire documents.
// console.log(document.head);
// console.log(document.title);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section'); // Stored in the Nodelist and it is not live
// console.log(allSections);

const allButtons = document.getElementsByTagName('button'); // Stored in the HTMLCollection() and it is live
//                          getElementByClassName("btn")
// console.log(allButtons);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////// CREATING AND INSERTING ELEMENTS

/////.insertAdjacentHTML()
// beforebegin, afterbegin, beforeend, afterend

const message = document.createElement('div'); // Now dom element 'div' is stored in the message
message.classList.add('cookie-message');
// message.textContent =
//   'We used cookies for improved functionality and analytics';
message.innerHTML =
  'We used cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it</button>';

/////// Place item as a child element to another element
// header.prepend(); // First Child of the parent element(header)
header.append(); //Last Child of the parent element(header)
// DOM element is unique so these menthods place the dom element once in the dom
// header.append(message.cloneNode(true)); //It will make the dom element can be present more than once
//                                        true means all the child element as well.

/////// Place item as a sibling element to another element
header.before(message);
header.after(message);

///////Delete element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); //Recent
    // message.parentElement.removeChild(message); // Older to remove an element from the dom
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////// STYLES

message.style.backgroundColor = '#37383d';
message.style.width = '100%';
// console.log(message.style.backgroundColor);

// console.log('height', message.style.height); // we will only get the inline styles.
// console.log(message.style.color); // we will only get the inline styles.
///////getComputedStyle() - we can get all the styles
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// CSS custom property( variables) are defined in the root. So they are available at the document.
// document.documentElement.style.setProperty('--color-primary', 'orangered');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////// ATTRIBUTES

const logo = document.querySelector('.nav__logo');
//Standard Attributes
// console.log(logo.alt);
// console.log(logo.className);
logo.alt = 'Beautiful minimalist logo';

// Non Standard attributes
// console.log(logo.designer); // undefined
// console.log(logo.getAttribute('designer'));

logo.setAttribute('company', 'Bankist');

// img's src attribute and anchor tag's(</a) href attribute
// console.log(logo.src); //absolute path
// console.log(logo.getAttribute('src')); // relative path
const link = document.querySelector('.nav__link-btn');
// console.log(link.href); // absolute path
// console.log(link.getAttribute('href')); // relative path

// data attribute
// console.log(logo.dataset.versionNumber);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
/////////// CLASSES

// logo.classList.add("class1", "class2", ...)
// logo.classList.remove("class1", "class2", ...)
// logo.classList.toggle("class1")
// logo.classList.contains("class1")

///// Never use it because it will replace all the existing classes and replace them with this one
// logo.className = 'jonas'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////// Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // It is deprecated from the javascript
  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset)

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Scrolling
  // window.scrollTo(s1coords.left + window.scrollX,
  //  s1coords.top + window.scrollY);

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // better and most modern way to do scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////Events types and Event handlers

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  // We can also place here and event will be listen only once
  // h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

//// assigning the event handler as event property to the element
//// Disadvantage of it is like we can't remove the event handler
//// If we reassign another event handler to the element, It will overwrite the previous
//// onevent
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////Page Navigation(Event Delegation : Capturing and Bubbling)

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAtrribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth',
//     });
//   });
// });
// Above approach is not efficient because we have attach event handler to all the
// link which will cause the performance issue.
// 1. Add event listner to the common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('clicl', function (e) {
  e.preventDefault();

  // Matching strategy

  if (e.target.classList.contains('.nav__link')) {
    const id = e.target.getAtrribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////// DOM Traversing

/*
///// Going downwards: childs
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

///// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('.h1').style.background = 'var(--gradient-primary)';

///// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});

*/
////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
///////////////////// Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //  console.log(clicked)

  //If clicking the padding space between the tabs, then clicked === null
  //Gaurd clause
  if (!clicked) return;
  //deleting the 'operations__tab-active' class from all the tabs
  //and then adding to the clicked tab element
  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  //Activate the content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////// Menu Fade Animation

// const handleHover = function (e, opacity) {
const handleHover = function () {
  // console.log(this)

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        // el.style.opacity = opacity;
        el.style.opacity = this;
      }
    });
    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

//Calling event handler inside the callback function
// nav.addEventListener('mouseover', function (e) {
//   handleHover(e, 0.5);
// });
// nav.addEventListener('mouseout', function (e) {
//   handleHover(e, 1);
// });
// using bind method, this===0.5 or 1
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/*
Bubbling Behavior:
mouseover: Bubbles up to parent elements.
           Triggers when entering both the element and its child elements.
Child Elements:
mouseenter: Does not bubble up.
            Only triggers when entering the element itself, ignoring child elements.
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////// Sticky Navigation
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
window.addEventListener('scroll', function (e) {
  // console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
