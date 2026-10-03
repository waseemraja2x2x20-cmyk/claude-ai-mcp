// Shared browser behaviour for every page: menu, theme, article filter, Instagram embeds.
(function(){
  var menu=document.getElementById('menuBtn'), nav=document.getElementById('nav');
  if(menu&&nav)menu.addEventListener('click',function(){var o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o)});

  var themeBtn=document.getElementById('themeBtn');
  if(themeBtn)themeBtn.addEventListener('click',function(){
    var r=document.documentElement, cur=r.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
    var nx=cur==='dark'?'light':'dark'; r.setAttribute('data-theme',nx); try{localStorage.setItem('tgf-theme',nx)}catch(e){}
  });

  var yr=document.getElementById('yr'); if(yr)yr.textContent=new Date().getFullYear();

  // All articles page: filter cards by pillar without reloading.
  var filters=document.querySelector('.filters');
  if(filters)filters.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b)return;
    var p=b.getAttribute('data-p');
    filters.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    document.querySelectorAll('.grid [data-pillar]').forEach(function(c){c.hidden=!(p==='All'||c.getAttribute('data-pillar')===p)});
  });

  // Instagram embeds (home page only).
  if(document.querySelector('.instagram-media')){
    var s=document.createElement('script'); s.async=true; s.src='https://www.instagram.com/embed.js'; document.body.appendChild(s);
  }
})();
