const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    autoplay: {
        delay: 1500,
        disableOnInteraction: true
    }
});
function applyRbgenToSlide(el) {
    if (el.getAttribute('data-rbgen-applied') === '1') return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const randomShape = Math.random() < 0.5 ? 'circles' : 'rectangles';
    el.setAttribute('data-rbgen-width', vw.toString());
    el.setAttribute('data-rbgen-height', vh.toString());
    const rb = new Rbgen();
    const {
        backgroundColorHex,
        svgHtml
    } = rb.generateSvgImageAsHtml({
        width: vw,
        height: vh,
        tone: el.getAttribute('data-rbgen-tone'),
        shapes: randomShape,
        shapesCount: parseInt(el.getAttribute('data-rbgen-shapes-count') || '10'),
        shapesColorHex: el.getAttribute('data-rbgen-shapes-color-hex'),
        shapesMaximumOpacity: parseFloat(el.getAttribute('data-rbgen-shapes-max-opacity') || '0.05')
    });
    //const url = rb.convertSvgHtmlImageToBackgroundUrl(svgHtml);
    //el.setAttribute('data-rbgen-current-bgcolor-hex', backgroundColorHex);
    //el.setAttribute('data-rbgen-current-raw', btoa(svgHtml));
    //el.style.background = "no-repeat black " + url;
    //el.style.backgroundSize = "cover";
    el.style.background = "#000080";
    el.setAttribute('data-rbgen-applied', '1');
}
document.querySelectorAll('.swiper-slide.rbgen').forEach(el => applyRbgenToSlide(el));
window.addEventListener('load', function() {
    document.querySelectorAll('.gsml-biglabel').forEach(function(label) {
        const style = window.getComputedStyle(label);
        const lineHeight = parseFloat(style.lineHeight) || 20;
        const paddingTop = parseFloat(style.paddingTop) || 0;
        const paddingBottom = parseFloat(style.paddingBottom) || 0;
        const height = label.offsetHeight - paddingTop - paddingBottom;
        const lines = Math.round(height / lineHeight);
        if (lines > 1) {
            label.style.borderRadius = "10px";
            label.style.width = "100%";
            label.style.paddingLeft = "5px";
            label.style.paddingRight = "5px";
            label.style.marginLeft = "0px";
            label.style.marginRight = "0px";
        }
    });
    document.querySelectorAll('.gsml-link-item').forEach(function(item) {
        item.querySelectorAll('svg').forEach(function(svg) {
            const classes = svg.getAttribute('class') || '';
            if (classes.includes('fa-circle-check') || classes.includes('fa-arrow-up-right-from-square')) svg.remove();
        });
        item.querySelectorAll('i').forEach(function(icon) {
            const classes = icon.getAttribute('class') || '';
            if (classes.includes('fa-circle-check') || classes.includes('fa-arrow-up-right-from-square')) icon.remove();
        });
        const arrow = document.createElement('i');
        arrow.className = 'fas fa-arrow-up-right-from-square';
        arrow.style.color = 'white';
        arrow.style.minWidth = '1.2em';
        arrow.style.textAlign = 'center';
        item.appendChild(arrow);
    });
    document.querySelectorAll('.gsml-link-item').forEach(function(item) {
        item.addEventListener('click', function() {
            item.querySelectorAll('svg,i').forEach(function(el) {
                const cls = el.getAttribute('class') || '';
                if (cls.includes('fa-arrow-up-right-from-square') || cls.includes('fa-circle-check')) el.remove();
            });
            const check = document.createElement('i');
            check.className = 'fas fa-circle-check';
            check.style.color = 'white';
            check.style.minWidth = '1.2em';
            check.style.textAlign = 'center';
            item.appendChild(check);
        });
    });
});
function manageColorMaskOverlay() {
    const vw = window.innerWidth;
    document.querySelectorAll('.swiper-slide.rbgen').forEach(el => {
        let left = el.querySelector('.rbgen-mask-left');
        let right = el.querySelector('.rbgen-mask-right');
        if (vw > 480) {
            if (!left) {
                left = document.createElement('div');
                left.className = 'rbgen-mask-left';
                left.style.position = 'absolute';
                left.style.left = '0';
                left.style.top = '0';
                left.style.width = `${(vw-480)/2}px`;
                left.style.height = '100%';
                left.style.backgroundColor = 'black';
                left.style.zIndex = '2';
                el.appendChild(left);
            }
            if (!right) {
                right = document.createElement('div');
                right.className = 'rbgen-mask-right';
                right.style.position = 'absolute';
                right.style.right = '0';
                right.style.top = '0';
                right.style.width = `${(vw-480)/2}px`;
                right.style.height = '100%';
                right.style.backgroundColor = 'black';
                right.style.zIndex = '2';
                el.appendChild(right);
            }
            el.style.position = 'relative';
        } else {
            if (left) left.remove();
            if (right) right.remove();
        }
    });
}
window.addEventListener('resize', manageColorMaskOverlay);
window.addEventListener('orientationchange', manageColorMaskOverlay);
window.addEventListener('load', manageColorMaskOverlay);
function adjustScrollableTextFlex() {
    document.querySelectorAll('.gsml-place-text, .gsml-time-text').forEach(el => {
        const backup = el.innerHTML;
        el.innerHTML = '';
        el.style.marginBottom = '0px';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.textAlign = 'center';
        el.innerHTML = '';
        el.innerHTML = backup;
        if (el.scrollHeight > el.clientHeight) {
            el.style.alignItems = 'stretch';
            el.style.marginBottom = '3px';
        }
    });
}
window.addEventListener('load', adjustScrollableTextFlex);
function updateAllTimeBombs() {
    const blocks = document.querySelectorAll('.gsml-timebomb-text');
    const now = Date.now();
    blocks.forEach(el => {
        const expire = parseInt(el.getAttribute('data-expire'));
        const hoursOriginal = parseFloat(el.getAttribute('data-hours'));
        if (!expire || isNaN(expire) || !hoursOriginal) return;
        const diff = expire - now;
        if (diff <= 0) {
            el.innerHTML = `Very Sorry...<br>Time's Up!!!`;
            return;
        }
        const minsTotal = Math.floor(diff / 60000);
        const hrs = Math.floor(minsTotal / 60);
        const mins = Math.floor((minsTotal % 60) / 10) * 10;
        let line1 = '';
        if (hrs === 0 && mins > 0) {
            line1 = `Hurry Up! ${mins} ${mins === 1 ? 'Min' : 'Mins'}`;
        } else {
            const hText = `${hrs} ${hrs === 1 ? 'Hour' : 'Hours'}`;
            const mText = `${mins} ${mins === 1 ? 'Min' : 'Mins'}`;
            line1 = `${hText} ${mText}`;
        }
        if (line1 === '0 Hours 0 Mins') line1 = 'Hurry Up! 5 Mins';
        el.innerHTML = `${line1}<br>Remaining`;
    });
}
window.addEventListener("load", updateAllTimeBombs);
function shuffleMCQOptions() {
  const greenGradient = 'linear-gradient(to right, rgba(30,30,30,0.5), rgba(30,150,30,1), rgba(30,30,30,0.5))';
  const redGradient = 'linear-gradient(to right, rgba(30,30,30,0.5), rgba(200,30,30,1), rgba(30,30,30,0.5))';
  const containers = document.querySelectorAll('.gsml-mcqoptions-container');
  containers.forEach(container => {
    const options = Array.from(container.querySelectorAll('.gsml-mcqoptions'));
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    container.innerHTML = '';
    options.forEach(option => {
      option.style.color = 'white';
      option.style.cursor = 'pointer';
      container.appendChild(option);
    });
    container.addEventListener('click', event => {
      const option = event.target.closest('.gsml-mcqoptions');
      if (!option || container.classList.contains('mcq-locked')) return;
      const correctOption = container.querySelector('.gsml-mcqoptions.right-option');
      const isRight = option === correctOption;
      option.style.background = isRight ? greenGradient : redGradient;
      if (!isRight && correctOption) correctOption.style.background = greenGradient;
      container.classList.add('mcq-locked');
      container.querySelectorAll('.gsml-mcqoptions').forEach(opt => {
        opt.style.pointerEvents = 'none';
      });
    });
  });
}
window.addEventListener("load", shuffleMCQOptions);
function iframeswipeOverlay() {
  const classNames = ['gsml-embed-container', 'gsml-youtube-container'];
  classNames.forEach(className => {
    document.querySelectorAll(`.${className}`).forEach(container => {
      if (container.querySelector('.iframe-swipe-overlay')) return;
      const overlay = document.createElement('div');
      overlay.className = 'iframe-swipe-overlay';
      Object.assign(overlay.style, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: 'transparent',
        touchAction: 'pan-y pinch-zoom',
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
      const button = document.createElement('div');
      button.textContent = 'Show this...';
      Object.assign(button.style, {
        backgroundColor: 'black',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '6px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
        fontSize: '15px',
        cursor: 'pointer'
      });
      button.addEventListener('click', () => wrapWithBars(container));
      overlay.appendChild(button);
      const computedStyle = window.getComputedStyle(container);
      if (computedStyle.position === 'static') container.style.position = 'relative';
      container.appendChild(overlay);
    });
  });
}
function wrapWithBars(container) {
  document.querySelectorAll('.iframe-surround-wrapper').forEach(wrapper => {
    const inner = wrapper.querySelector('.gsml-embed-container, .gsml-youtube-container');
    if (inner) {
      const parent = wrapper.parentNode;
      parent.replaceChild(inner, wrapper);
      addOverlayBack(inner);
    }
  });
  const overlay = container.querySelector('.iframe-swipe-overlay');
  if (overlay) overlay.remove();
  const wrapper = document.createElement('div');
  wrapper.className = 'iframe-surround-wrapper';
  const topBar = document.createElement('div');
  Object.assign(topBar.style, {
    height: '50px',
    background: 'linear-gradient(to bottom, rgba(30,30,30,0.95), rgba(30,30,30,0))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    fontFamily: 'sans-serif'
  });
  const closeButton = document.createElement('div');
  closeButton.textContent = 'Close';
  Object.assign(closeButton.style, {
    color: 'white',
    fontSize: '15px',
    cursor: 'pointer'
  });
  closeButton.addEventListener('click', () => {
    const parent = wrapper.parentNode;
    parent.replaceChild(container, wrapper);
    addOverlayBack(container);
  });
  topBar.appendChild(closeButton);

  const bottomBar = document.createElement('div');
  Object.assign(bottomBar.style, {
    height: '50px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    background: 'linear-gradient(to top, rgba(30,30,30,0.95), rgba(30,30,30,0))'
  });
  const parent = container.parentNode;
  parent.insertBefore(wrapper, container);
  wrapper.appendChild(topBar);
  wrapper.appendChild(container);
  wrapper.appendChild(bottomBar);
  container.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function addOverlayBack(container) {
  if (container.querySelector('.iframe-swipe-overlay')) return;
  const overlay = document.createElement('div');
  overlay.className = 'iframe-swipe-overlay';
  Object.assign(overlay.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 2,
    backgroundColor: 'transparent',
    touchAction: 'pan-y pinch-zoom',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  });
  const button = document.createElement('div');
  button.textContent = 'Show this...';
  Object.assign(button.style, {
    backgroundColor: 'black',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '6px',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: '15px',
    cursor: 'pointer'
  });
  button.addEventListener('click', () => wrapWithBars(container));
  overlay.appendChild(button);
  const computedStyle = window.getComputedStyle(container);
  if (computedStyle.position === 'static') container.style.position = 'relative';
  container.appendChild(overlay);
}
window.addEventListener('load', iframeswipeOverlay);
function addSlideNumber() {
    const wrapper = document.querySelector('.swiper-wrapper');
    if (!wrapper) return;
    const slides = wrapper.querySelectorAll('.swiper-slide');
    const total = slides.length;
    slides.forEach((slide, i) => {
        const oldCounter = slide.querySelector('.slide-number-counter');
        if (oldCounter) oldCounter.remove();
        const counter = document.createElement('div');
        counter.className = 'slide-number-counter';
        Object.assign(counter.style, {
            position: 'absolute',
            top: '3px',
            left: '0',
            width: '20px',
            borderRadius: '8px',
            height: '31px',
            padding: '2px 0',
            fontFamily: 'sans-serif',
            fontSize: '9px',
            fontWeight: 'bold',
            color: '#fff',
            background: 'rgba(30,30,30,0.3)',
            userSelect: 'none',
            zIndex: '3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        });
        const slideNumber = (i + 1).toString();
        const totalSlides = total.toString();
        counter.innerHTML = `<div>${slideNumber}</div><div style="width:12px;border-top:1px solid #fff;"></div><div style="margin-top:1px;">${totalSlides}</div>`;
        if (getComputedStyle(slide).position === 'static') slide.style.position = 'relative';
        slide.insertBefore(counter, slide.firstChild);
    });
}
window.addEventListener('load', addSlideNumber);
document.querySelectorAll('[class^="gsml-"]').forEach(el => {
  if (el.classList.contains('gsml-title') || el.classList.contains('gsml-text') || el.classList.contains('gsml-list') || el.classList.contains('gsml-error')) return
  const next = el.nextElementSibling
  if (!next) return
  if (next.classList.contains('gsml-title') || next.classList.contains('gsml-text') || next.classList.contains('gsml-list') || next.classList.contains('gsml-error')) el.style.marginBottom = '22px'
});
window.addEventListener("load", function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches) return;
  if (window.innerWidth <= 500) return;
  swiper.autoplay.stop();
  const swiperNavBarHTML = `<div style="position:absolute;top:0;left:0;width:100%;height:22px;background:transparent;z-index:9999;font-family:sans-serif;font-size:14px;line-height:22px;color:white;pointer-events:none;display:flex;justify-content:center;align-items:center;"><span onclick="swiper.slidePrev()" style="cursor:pointer;pointer-events:auto;">&lt;&nbsp;Prev.</span><span style="width:500px;"></span><span onclick="swiper.slideNext()" style="cursor:pointer;pointer-events:auto;">Next&nbsp;&gt;</span></div>`;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = swiperNavBarHTML;
  document.body.insertBefore(wrapper.firstElementChild, document.body.firstChild);
});