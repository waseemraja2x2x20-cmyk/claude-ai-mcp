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

// Email sign-up: adds the address to the Supabase subscribers table (insert-only key).
document.querySelectorAll('form.signup').forEach(function(f){
  var note=f.querySelector('.signup-note'), btn=f.querySelector('button'), input=f.querySelector('input[type=email]');
  function say(cls,msg){f.classList.remove('ok','err');if(cls)f.classList.add(cls);note.textContent=msg}
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var email=input.value.trim();
    if(f.querySelector('.hp').value){say('ok','Thanks, you are on the list.');return}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){say('err','Please enter a valid email address.');input.focus();return}
    btn.disabled=true; say('','Signing you up…');
    fetch(f.dataset.url+'/rest/v1/subscribers',{method:'POST',headers:{'apikey':f.dataset.key,'Content-Type':'application/json','Prefer':'return=minimal'},body:JSON.stringify({email:email,source:f.dataset.source})})
      .then(function(r){
        if(r.ok||r.status===409){say('ok','Thanks, you are on the list.');f.reset();return}
        throw new Error(r.status);
      })
      .catch(function(){say('err','Something went wrong. Please try again, or message us on Instagram.')})
      .then(function(){btn.disabled=false});
  });
});

// Home page: pillar tabs (click or arrow keys). Without JS every panel shows.
(function(){
  var tabs=[].slice.call(document.querySelectorAll('.tabs [role=tab]'));
  if(!tabs.length)return;
  function select(t,focus){
    tabs.forEach(function(x){
      var on=x===t; x.setAttribute('aria-selected',on); x.tabIndex=on?0:-1;
      document.getElementById(x.getAttribute('aria-controls')).hidden=!on;
    });
    if(focus)t.focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){select(t)});
    t.addEventListener('keydown',function(e){
      var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(!d)return;
      e.preventDefault(); select(tabs[(i+d+tabs.length)%tabs.length],true);
    });
  });
  select(tabs[0]);
})();

// "Start this week" checklist: remember ticks on this device only.
document.querySelectorAll('[data-starter]').forEach(function(c){
  var k='tgf-starter-'+c.getAttribute('data-starter');
  try{c.checked=localStorage.getItem(k)==='1'}catch(e){}
  c.addEventListener('change',function(){try{localStorage.setItem(k,c.checked?'1':'0')}catch(e){}});
});

// Gentle fade-in for sections as they scroll into view.
(function(){
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var els=document.querySelectorAll('.manifesto .mf p,.panel,.starter li,.fdn-sec,.topic');
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(el){el.classList.add('reveal');io.observe(el)});
})();
