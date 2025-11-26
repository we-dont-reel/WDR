var swiperObserver=null;
var swiperMap={};
function initSwiperObserver(){
swiperObserver=new IntersectionObserver(handleSwiperObs,{threshold:0,rootMargin:'50% 0px 50% 0px'});
document.querySelectorAll('.obsi').forEach(function(x){swiperObserver.observe(x)});
}

function handleSwiperObs(entries){
for(var i=0;i<entries.length;i++){
var e=entries[i];
var el=e.target;
if(e.isIntersecting){if(!el.dataset.active) buildSwiper(el)} else {if(el.dataset.active) destroySwiper(el)}
}
}

function buildSwiper(el){
el.dataset.active="1";
var c=el.className;
if(c.indexOf('outid-')===-1||c.indexOf('tot-img-')===-1){el.dataset.active="";return;}
var tid=c.split('outid-')[1].split(' ')[0];
var tot=parseInt(c.split('tot-img-')[1].split(' ')[0],10);
var url=assetRouter(tid);
fetch(url+'index.txt').then(function(r){return r.text()}).then(function(t){
if(!t||t.trim().charAt(0)==='<'){el.dataset.active="";return;}
var arr=t.trim().split('\n');
var wrap=document.createElement('div');
wrap.className='swiper';
wrap.style.width='100%';
wrap.style.height='100%';
wrap.style.border='none';
var w2=document.createElement('div');
w2.className='swiper-wrapper';
wrap.appendChild(w2);
el.appendChild(wrap);
for(var i=0;i<tot;i++){
if(!arr[i]) continue;
var s=document.createElement('div');
s.className='swiper-slide';
var img=document.createElement('img');
img.setAttribute('data-src', url + arr[i]);
img.style.width='100%';
img.style.height='100%';
img.style.objectFit='cover';
s.appendChild(img);
w2.appendChild(s);
}
var cfg={loop:false,slidesPerView:1,preloadImages:false,lazy:{loadPrevNext:true,loadOnTransitionStart:true}};
if(tot===1) cfg.allowTouchMove=false;
var sw=new Swiper(wrap,cfg);
swiperMap[tid]=sw;
}).catch(function(){el.dataset.active="";});
}

function destroySwiper(el){
el.dataset.active="";
var c=el.className;
if(c.indexOf('outid-')===-1) return;
var tid=c.split('outid-')[1].split(' ')[0];
var sw=swiperMap[tid];
if(sw){sw.destroy(true,true);delete swiperMap[tid];}
el.innerHTML="";
}