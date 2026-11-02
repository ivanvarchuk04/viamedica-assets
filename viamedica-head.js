/* Via Medica: original HEAD scripts, preserved in source order */

document.addEventListener('DOMContentLoaded', function () {
    const blockId = '#rec1222074481';
    function initRadioButtons() {
        const radios = Array.from(
            document.querySelectorAll(blockId + ' .t-radio.js-tilda-rule')
        );
        if (!radios.length) {
            return false;
        }
        function updateActiveStates() {
            radios.forEach(function (radio) {
                const control = radio.closest('.t-radio__control');
                if (!control) return;
                control.classList.toggle(
                    't-radio__control_active',
                    radio.checked
                );
            });
        }
        updateActiveStates();
        radios.forEach(function (radio) {
            radio.addEventListener('change', updateActiveStates);
        });
        return true;
    }
    if (!initRadioButtons()) {
        const interval = setInterval(function () {
            if (initRadioButtons()) {
                clearInterval(interval);
            }
        }, 200);
        setTimeout(function () {
            clearInterval(interval);
        }, 10000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function setupProductTabs() {
        const popupInfo = document.querySelector('.t-store__prod-popup__info');
        const tabsAccordion = document.querySelector('.t-store__tabs_accordion');
        if (!popupInfo || !tabsAccordion) {
            return false;
        }
        if (!popupInfo.contains(tabsAccordion)) {
            popupInfo.appendChild(tabsAccordion);
        }
        const firstTab = tabsAccordion.querySelector(
            '.t-store__tabs__item:first-child .js-store-tab-button'
        );
        if (firstTab && !firstTab.dataset.autoSelected) {
            firstTab.dataset.autoSelected = 'true';
            firstTab.click();
        }
        return true;
    }
    document.addEventListener('click', function (event) {
        const productLink = event.target.closest('a[href*="/tproduct/"]');
        if (!productLink) return;
        let attempts = 0;
        const interval = setInterval(function () {
            attempts++;
            if (setupProductTabs() || attempts >= 20) {
                clearInterval(interval);
            }
        }, 200);
    });
    setupProductTabs();
});

(function () {
    const STORAGE_KEY = 'viaMedicaProductReturnUrl';
    
    document.addEventListener('click', function (event) {
        const productLink = event.target.closest(
            'a[href*="/tproduct/"], a[href*="/product/"]'
        );
        if (!productLink) return;
        sessionStorage.setItem(
            STORAGE_KEY,
            window.location.href
        );
    }, true);
    
    function returnFromProduct(event) {
        const backButton = event.target.closest(
            '.js-catalog-close-text.t-catalog__prod-popup__close-txt'
        );
        const closeButton = event.target.closest(
            '.t-popup__close'
        );
        if (!backButton && !closeButton) return;
        const returnUrl = sessionStorage.getItem(STORAGE_KEY);
        
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        if (returnUrl) {
            sessionStorage.removeItem(STORAGE_KEY);
            window.location.href = returnUrl;
        } else {
            
            window.location.href = '/';
        }
    }
    
    document.addEventListener(
        'click',
        returnFromProduct,
        true
    );
})();

(function(){
'use strict';
if(window.__vm20Installed)return;
window.__vm20Installed=true;
var URLS={size:'https://viamedica.shop/size-chart',telegram:'https://t.me/viamedicasupport',max:'https://max.ru/u/f9LHodD0cOI-xne7KcpjIVh6udUqzHMv_ZpmV5-UOjx6sxwDsoWUxMUuYSg',whatsapp:'https://api.whatsapp.com/send/?phone=%2B79817394949&text&type=phone_number&app_absent=0'};
function link(className,label,url){var a=document.createElement('a');a.className=className;a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
function fixGift(info){
  var options=Array.from(info.querySelectorAll('.t-product__option'));
  function byName(name){return options.find(function(option){
    var heading=option.querySelector('.js-product-edition-option-name, .t-product__option-title');
    var label=(heading&&heading.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
    return label===name.toLowerCase()&&!!option.querySelector('.t-product__option-variants_regular > select');
  })}
  var denomination=byName('Номинал');
  var certificateType=byName('Тип сертификата');
  if(!denomination||!certificateType)return;
  info.classList.add('vm20-gift');
}
function fixOptions(info){
if(!info.classList.contains('vm20-info'))return;
fixGift(info);
var color=info.querySelector('[data-edition-option-id="Цвет"]');
var size=info.querySelector('[data-edition-option-id="Размер"]');
if(!size)return;
if(color&&color.parentElement===size.parentElement&&color.nextElementSibling!==size)size.before(color);
var row=size.querySelector('.t-product__option-variants_radio');
if(row)row.classList.add('vm20-size-row');
if(!size.querySelector('.vm20-guide')){
var guide=link('vm20-guide','Таблица размеров',URLS.size);var arrow=document.createElementNS('http://www.w3.org/2000/svg','svg');arrow.setAttribute('viewBox','0 0 16 16');arrow.setAttribute('width','13');arrow.setAttribute('height','13');arrow.setAttribute('aria-hidden','true');arrow.classList.add('vm20-guide-arrow');arrow.innerHTML='<path d="M4 12L12 4M5 4h7v7" fill="none" stroke="#12294B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>';guide.append(arrow);
var heading=size.querySelector('.js-product-edition-option-name');
if(heading){
var header=size.querySelector('.vm20-size-header');
if(!header){header=document.createElement('div');header.className='vm20-size-header';heading.before(header);header.append(heading)}
header.append(guide);
}else size.prepend(guide);
}
}
function cleanText(s){return (s||'').replace(/\s+/g,' ').trim()}
function splitDescription(raw){
  var m=raw.match(/^(.+?[.!?])(?=\s+[А-ЯЁA-Z«"„]|$)/);
  if(!m)return {short:raw,seo:''};
  return {short:m[1].trim(),seo:raw.slice(m[1].length).trim()};
}
function readDescription(description){
  var walker=document.createTreeWalker(description,NodeFilter.SHOW_TEXT);
  var chunks=[],node;
  while((node=walker.nextNode())){
    if(node.parentElement&&node.parentElement.closest('script,style'))continue;
    var chunk=cleanText(node.nodeValue);
    if(chunk)chunks.push(chunk);
  }
  return cleanText(chunks.join(' '));
}
function alignSeo(seo,layout){
  if(!seo||!seo.isConnected||!layout.isConnected)return;
  var popup=layout.closest('.t-catalog__prod-popup__container')||layout.parentElement;
  var tabs=popup&&popup.querySelector('.t-catalog__tabs');
  var reference=tabs||layout;
  var r=reference.getBoundingClientRect();
  var parent=seo.parentElement&&seo.parentElement.getBoundingClientRect();
  if(!parent||!r.width)return;
  if(window.innerWidth<=767){
    seo.style.setProperty('width',Math.max(0,r.width-40)+'px','important');
    seo.style.setProperty('margin-left',(r.left-parent.left+20)+'px','important');
  }else{
    seo.style.setProperty('width',r.width+'px','important');
    seo.style.setProperty('margin-left',(r.left-parent.left)+'px','important');
  }
  seo.style.setProperty('max-width','none','important');
  seo.style.setProperty('margin-right','0','important');
}
function addSeo(info,layout,parts){
  if(info.classList.contains('vm20-gift')||!parts.seo){var stale=layout.nextElementSibling;if(stale&&stale.classList.contains('vm20-seo-description'))stale.remove();return;}
  var existing=layout.nextElementSibling;
  var seo=existing&&existing.classList.contains('vm20-seo-description')?existing:null;
  if(!seo){
    seo=document.createElement('section');
    seo.className='vm20-seo-description';
    seo.setAttribute('aria-label','О модели');
    var heading=document.createElement('div');heading.className='vm20-seo-heading';heading.textContent='О модели';
    var text=document.createElement('div');text.className='vm20-seo-text';
    seo.append(heading,text);
    layout.after(seo);
  }
  var textEl=seo.querySelector('.vm20-seo-text');
  if(textEl&&textEl.textContent!==parts.seo)textEl.textContent=parts.seo;
  var update=function(){alignSeo(seo,layout)};
  update();requestAnimationFrame(update);setTimeout(update,300);
  if(!seo.dataset.vm20Bound){
    seo.dataset.vm20Bound='1';
    window.addEventListener('resize',update);
    if(typeof ResizeObserver!=='undefined'){
      var popup=layout.closest('.t-catalog__prod-popup__container')||layout.parentElement;
      var tabs=popup&&popup.querySelector('.t-catalog__tabs');
      if(tabs){var ro=new ResizeObserver(update);ro.observe(tabs)}
    }
  }
}
function init(info){
if(info.dataset.vm20Ready==='1')return;
var layout=info.parentElement;if(!layout)return;
var gallery=Array.prototype.find.call(layout.children,function(el){return el.classList.contains('t-catalog__prod-popup__slider')});if(!gallery)return;
info.dataset.vm20Ready='1';layout.classList.add('vm20-layout');gallery.classList.add('vm20-gallery');info.classList.add('vm20-info');
fixOptions(info);
var title=info.querySelector('.t-catalog__prod-popup__title-wrapper'),description=info.querySelector('.js-catalog-prod-text, .t-catalog__prod-popup__text');
if(title&&description){var raw=readDescription(description);if(raw){var parts=splitDescription(raw);var short=info.querySelector('.vm20-short');if(!short){short=document.createElement('div');short.className='vm20-short';title.after(short)}short.textContent=parts.short;addSeo(info,layout,parts)}}
var buy=info.querySelector('.t-catalog__prod-popup__btn-wrapper');if(buy&&!info.querySelector('.vm20-help')){var help=document.createElement('div');help.className='vm20-help';var heading=document.createElement('div');heading.className='vm20-help-heading';heading.textContent='Не уверены в размере?';
var p=document.createElement('p');p.className='vm20-help-text';
p.append(document.createTextNode('Воспользуйтесь '),link('','таблицей размеров',URLS.size),document.createTextNode(', чтобы сверить параметры модели с Вашими.\nЕсли останутся сомнения, напишите нам — поможем подобрать размер и расскажем об особенностях посадки.\nДоставка по России бесплатна при заказе от 20 000 ₽.'));
var services=document.createElement('div');services.className='vm20-messengers';[['Telegram',URLS.telegram,'telegram'],['MAX',URLS.max,'max'],['WhatsApp',URLS.whatsapp,'whatsapp']].forEach(function(item){var a=link('vm20-messenger','',item[1]);a.setAttribute('aria-label','Написать в '+item[0]);var img=document.createElement('img');
if(item[2]==='max'){
  img.src='https://maxicons.ru/icons/Max_logo.svg';img.className='vm20-max-img';img.addEventListener('error',function(){img.style.display='none';var fallback=document.createElement('span');fallback.className='vm20-max-fallback';fallback.textContent='M';img.after(fallback)},{once:true});
}else{
  var svg=item[2]==='telegram'?'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#12294B" fill-rule="evenodd" d="M50 100c27.614 0 50-22.386 50-50S77.614 0 50 0 0 22.386 0 50s22.386 50 50 50Zm21.977-68.056c.386-4.38-4.24-2.576-4.24-2.576-3.415 1.414-6.937 2.85-10.497 4.302-11.04 4.503-22.444 9.155-32.159 13.734-5.268 1.932-2.184 3.864-2.184 3.864l8.351 2.577c3.855 1.16 5.91-.129 5.91-.129l17.988-12.238c6.424-4.38 4.882-.773 3.34.773l-13.49 12.882c-2.056 1.804-1.028 3.35-.129 4.123 2.55 2.249 8.82 6.364 11.557 8.16.712.467 1.185.778 1.292.858.642.515 4.111 2.834 6.424 2.319 2.313-.516 2.57-3.479 2.57-3.479l3.083-20.226c.462-3.511.993-6.886 1.417-9.582.4-2.546.705-4.485.767-5.362Z"/></svg>':'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#12294B" d="M20.52 3.48A11.87 11.87 0 0 0 12.05 0C5.5 0 .16 5.34.15 11.9a11.8 11.8 0 0 0 1.59 5.94L.05 24l6.31-1.65a11.95 11.95 0 0 0 5.69 1.45h.01c6.55 0 11.9-5.34 11.9-11.9a11.82 11.82 0 0 0-3.44-8.42ZM12.06 21.8a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.88 9.88 0 0 1-1.52-5.26c0-5.46 4.44-9.9 9.9-9.9a9.85 9.85 0 0 1 7 2.9 9.83 9.83 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>';
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
}
img.alt='';img.width=15;img.height=15;var label=document.createElement('span');label.className='vm20-messenger-label';label.textContent=item[0];a.append(img,label);services.append(a)});help.append(heading,p,services);buy.after(help)}
var slider=gallery.querySelector('.t-slds'),wrapper=gallery.querySelector('.t-slds__items-wrapper');if(slider&&!slider.querySelector('.vm20-counter')){var counter=document.createElement('div');counter.className='vm20-counter';slider.append(counter)}
function updateCounter(){var counter=gallery.querySelector('.vm20-counter');if(!counter)return;var total=Number(wrapper&&wrapper.getAttribute('data-slider-totalslides'))||gallery.querySelectorAll('.t-slds__thumbsbullet').length||1;var current=Number(wrapper&&wrapper.getAttribute('data-slider-pos'))||1;counter.textContent=current+'/'+total}
updateCounter();if(wrapper){var observer=new MutationObserver(updateCounter);observer.observe(wrapper,{attributes:true,attributeFilter:['data-slider-pos']})}
function refresh(){window.dispatchEvent(new Event('resize'));var main=gallery.querySelector('.t-slds__main');if(main&&typeof window.t_slds_updateSlider==='function'){try{window.t_slds_updateSlider(main)}catch(e){console.warn('Via Medica slider:',e)}}updateCounter()}
requestAnimationFrame(function(){requestAnimationFrame(refresh)});setTimeout(refresh,350);
}
function scan(){document.querySelectorAll('.t-catalog__prod-popup__info').forEach(function(info){
if(!info.getClientRects().length)return;
if(info.dataset.vm20Ready!=='1')init(info);
else fixOptions(info);
})}
var scheduled=false;function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){scheduled=false;scan()})}
function start(){scan();var observer=new MutationObserver(schedule);observer.observe(document.body,{childList:true,subtree:true});document.addEventListener('click',function(){setTimeout(scan,80)},true);window.addEventListener('popstate',function(){setTimeout(scan,80)});console.info('Via Medica v2.1: автоинициализация включена')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();

(function(){
'use strict';
if(window.__vm22Installed)return;window.__vm22Installed=true;
var LOGO='https://static.tildacdn.com/tila3863-6636-4336-a633-633134656663/dolyami-logo.svg';
var money=function(n){return new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n)+' ₽'};
function priceOf(info){
 var el=info.querySelector('.js-product-price, .t-catalog__prod-popup__price, .t-store__prod-popup__price');
 if(!el)return 0;
 var s=(el.textContent||'').replace(/\s/g,'').replace(/[^\d,.]/g,'').replace(',','.');
 var n=Number(s);return Number.isFinite(n)&&n>0?n:0;
}
function logo(){var wrap=document.createElement('span');wrap.className='vm-dolyame-brand';var img=document.createElement('img');img.src=LOGO;img.alt='Долями';wrap.append(img);return wrap}
function node(tag,cls,value){var e=document.createElement(tag);if(cls)e.className=cls;if(value!==undefined)e.textContent=value;return e}
var datesShort=['Сегодня','Через 2 нед.','Через 4 нед.','Через 6 нед.'];
var datesLong=['Сегодня','Через 2 недели','Через 4 недели','Через 6 недель'];
function installCard(info){
 if(!info.classList.contains('vm20-info'))return;
 var price=priceOf(info);if(!price)return;
 var widget=info.querySelector('.vm-dolyame-widget');
 if(!widget){
  widget=node('div','vm-dolyame-widget');widget.setAttribute('role','button');widget.setAttribute('tabindex','0');widget.setAttribute('aria-label','Узнать об оплате Долями');
  var option=info.querySelector('.t-product__option');
  var options=option&&(option.closest('.t-product__options, .t-catalog__prod-popup__options, .t-store__prod-popup__options')||option);
  if(options)options.before(widget);
  else {var priceEl=info.querySelector('.js-product-price, .t-catalog__prod-popup__price, .t-store__prod-popup__price');var container=priceEl&&(priceEl.closest('.t-catalog__prod-popup__price-wrapper, .t-catalog__prod-popup__price-block')||priceEl.parentElement);if(container)container.after(widget);else info.prepend(widget)}
 }
 if(widget.dataset.vmPrice===String(price))return;
 widget.dataset.vmPrice=String(price);widget.replaceChildren();
 var top=node('div','vm-dolyame-top');top.append(logo(),node('span','vm-dolyame-payment','4 платежа по '+money(price/4)),node('span','vm-dolyame-arrow','›'));
 var schedule=node('div','vm-dolyame-schedule');datesShort.forEach(function(date){var step=node('div','vm-dolyame-step');step.append(node('div','vm-dolyame-date',date),node('div','vm-dolyame-amount',money(price/4)),node('div','vm-dolyame-line'));schedule.append(step)});
 widget.append(top,schedule);
}
function divider(){return node('div','vm-dm-divider')}
var lastFocus=null,priorOverflow=null;
function closeModal(){var overlay=document.getElementById('vm22-dolyame-overlay');if(!overlay)return;overlay.remove();document.body.style.overflow=priorOverflow===null?'':priorOverflow;document.removeEventListener('keydown',onModalKey);if(lastFocus&&lastFocus.isConnected)lastFocus.focus()}
function onModalKey(e){if(e.key==='Escape')closeModal()}
function openModal(widget){
 var info=widget.closest('.vm20-info');var price=info&&priceOf(info);if(!price)return;
 closeModal();lastFocus=widget;
 var overlay=node('div','vm-dolyame-overlay');overlay.id='vm22-dolyame-overlay';
 var modal=node('div','vm-dolyame-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Оплата Долями');
 var close=node('button','vm-dolyame-close','×');close.type='button';close.setAttribute('aria-label','Закрыть');close.addEventListener('click',closeModal);
 var intro=node('p','vm-dm-intro','Разделите стоимость покупки на четыре платежа. Первый оплачивается при оформлении заказа, остальные — каждые две недели.');
 var rows=node('div','vm-dm-schedule');datesLong.forEach(function(date){var row=node('div','vm-dm-row');row.append(node('span','vm-dm-dot'),node('span','',date),node('span','vm-dm-amount',money(price/4)));rows.append(row)});
 var checkout=node('div','vm-dm-checkout');checkout.append(node('div','vm-dm-checkout-title','Как оплатить Долями?'));
 var instructions=node('div','vm-dm-checkout-text');instructions.append(document.createTextNode('Добавьте понравившиеся товары в корзину и перейдите к оформлению заказа. На этапе выбора способа оплаты выберите '));instructions.append(node('strong','','«Долями»'));instructions.append(document.createTextNode(' и следуйте дальнейшим инструкциям.'));checkout.append(instructions);
 modal.append(close,logo(),node('h2','','Покупайте сейчас, платите частями'),intro,divider(),node('div','vm-dm-section-title','Ваш график платежей'),rows,divider(),checkout,node('p','vm-dm-note','Расчёт предварительный. Окончательные условия и график платежей будут доступны при оформлении заказа.'));
 overlay.append(modal);overlay.addEventListener('click',function(e){if(e.target===overlay)closeModal()});document.body.append(overlay);priorOverflow=document.body.style.overflow;document.body.style.overflow='hidden';document.addEventListener('keydown',onModalKey);close.focus();
}
function fixRelated(snippet){
 var tabs=snippet.querySelector('.t-catalog__tabs');var title=snippet.querySelector('.t-catalog__relevants__title');if(!tabs||!title)return;
 var active=Array.from(tabs.querySelectorAll('.t-catalog__tabs__content')).find(function(el){return el.getClientRects().length&&getComputedStyle(el).display!=='none'});
 if(!active)return;
 var children=active.querySelectorAll('li');var last=children.length?children[children.length-1]:active;
 var end=Math.max(last.getBoundingClientRect().bottom,active.getBoundingClientRect().bottom);
 var start=title.getBoundingClientRect().top;
 var desiredGap=22;
 var base=40;
 var current=Number(title.dataset.vm22Extra||0);
 var delta=end+desiredGap-start;
 var next=Math.max(0,Math.ceil(current+delta));
 if(Math.abs(next-current)>2){title.dataset.vm22Extra=String(next);title.style.setProperty('margin-top',(base+next)+'px','important')}
}
function applyAccordionTypography(snippet){
 var tabs=snippet.querySelector('.t-catalog__tabs');if(!tabs)return;
 var seo=snippet.querySelector('.vm20-seo-heading');
 var size=seo?getComputedStyle(seo).fontSize:(window.innerWidth<=767?'18px':'20px');
 if(tabs.style.getPropertyValue('--vm23-heading-size')!==size){tabs.style.setProperty('--vm23-heading-size',size)}
 var names=['детали','состав и уход','доставка'];
 tabs.querySelectorAll('*').forEach(function(el){
   if(el.children.length===0&&names.includes((el.textContent||'').trim().toLowerCase())){
     if(!el.classList.contains('vm23-accordion-heading'))el.classList.add('vm23-accordion-heading');
   }
 });
}
function scan(){document.querySelectorAll('.vm20-info').forEach(installCard);document.querySelectorAll('.t-catalog__prod-snippet__container').forEach(function(snippet){applyAccordionTypography(snippet);fixRelated(snippet)})}
var queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;scan()})}
function start(){scan();var observer=new MutationObserver(schedule);observer.observe(document.body,{childList:true,subtree:true,characterData:true});document.addEventListener('click',function(e){var widget=e.target.closest&&e.target.closest('.vm-dolyame-widget');if(widget){e.preventDefault();e.stopImmediatePropagation();openModal(widget)}else setTimeout(schedule,80)},true);document.addEventListener('keydown',function(e){var widget=e.target.closest&&e.target.closest('.vm-dolyame-widget');if(widget&&(e.key==='Enter'||e.key===' ')){e.preventDefault();openModal(widget)}});window.addEventListener('resize',schedule);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(schedule);console.info('Via Medica v2.3 enabled')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();

(function(){
'use strict';
if(window.__vm24CheckoutDolyameInstalled)return;
window.__vm24CheckoutDolyameInstalled=true;
var LOGO='https://static.tildacdn.com/tila3863-6636-4336-a633-633134656663/dolyami-logo.svg';
var dates=['Сегодня','Через 2 нед.','Через 4 нед.','Через 6 нед.'];
var money=function(n){return new Intl.NumberFormat('ru-RU',{maximumFractionDigits:2}).format(n)+' ₽'};
function parseAmount(text){
 var found=String(text||'').match(/\d[\d\s\u00a0\u202f]*(?:[.,]\d{1,2})?/g);
 if(!found||!found.length)return null;
 var n=Number(found[found.length-1].replace(/[\s\u00a0\u202f]/g,'').replace(',','.'));
 return Number.isFinite(n)&&n>=0?n:null;
}
function totalOf(cart){
 var row=cart.querySelector('.t706__cartwin-totalamount-row_total');
 if(!row)return null;
 var el=row.querySelector('.t706__cartwin-totalamount')||row;
 return parseAmount(el.textContent);
}
function build(){
 var wrap=document.createElement('div');wrap.className='vm24-checkout-dolyame';
 var card=document.createElement('div');card.className='vm24-checkout-dolyame__card';
 var head=document.createElement('div');head.className='vm24-checkout-dolyame__head';
 var img=document.createElement('img');img.className='vm24-checkout-dolyame__logo';img.src=LOGO;img.alt='Долями';
 var summary=document.createElement('span');summary.className='vm24-checkout-dolyame__summary';
 head.append(img,summary);
 var schedule=document.createElement('div');schedule.className='vm24-checkout-dolyame__schedule';
 dates.forEach(function(date){
  var step=document.createElement('div');step.className='vm24-checkout-dolyame__step';
  var d=document.createElement('div');d.className='vm24-checkout-dolyame__date';d.textContent=date;
  var amount=document.createElement('div');amount.className='vm24-checkout-dolyame__amount';
  var bar=document.createElement('div');bar.className='vm24-checkout-dolyame__bar';
  step.append(d,amount,bar);schedule.append(step);
 });
 card.append(head,schedule);
 var note=document.createElement('div');note.className='vm24-checkout-dolyame__note';
 note.textContent='Расчёт платежей предварительный и основан на полной сумме корзины. Точный график и условия оплаты определяются сервисом «Долями» при оформлении заказа.';
 wrap.append(card,note);return wrap;
}
function update(){
 var cart=document.querySelector('.t706__cartwin');if(!cart)return;
 var group=cart.querySelector('.t-input-group_pm');if(!group)return;
 var wrap=group.querySelector('.vm24-checkout-dolyame');
 if(!wrap){wrap=build();group.append(wrap)}
 var selected=group.querySelector('input[name="paymentsystem"]:checked');
 var active=selected&&selected.value==='tinkoff';
 var total=totalOf(cart);
 var visible=Boolean(active&&total!==null&&total>0);
 var display=visible?'block':'none';if(wrap.style.display!==display)wrap.style.display=display;
 if(!visible)return;
 var cents=Math.round(total*100),base=Math.floor(cents/4);
 var amounts=[base,base,base,cents-3*base];
 var key=String(cents);if(wrap.dataset.vm24Total===key)return;
 wrap.dataset.vm24Total=key;
 wrap.querySelector('.vm24-checkout-dolyame__summary').textContent='4 платежа по '+money(base/100);
 wrap.querySelectorAll('.vm24-checkout-dolyame__amount').forEach(function(el,i){el.textContent=money(amounts[i]/100)});
}
var scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(function(){scheduled=false;update()})}
function start(){
 update();
 document.addEventListener('change',function(e){if(e.target.matches('input[name="paymentsystem"]'))schedule()});
 var observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,childList:true,characterData:true});
 document.addEventListener('click',schedule,true);
 console.info('Via Medica v2.4 checkout Dolyame enabled');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();


