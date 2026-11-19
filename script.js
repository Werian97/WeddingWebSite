
(function(){
var target=new Date(2027,3,17,10,0,0).getTime(),box=document.getElementById('count');
function tick(){
var d=target-Date.now();
if(d<=0){box.innerHTML='<div><b>♥</b><span>Evviva!</span></div>';return}
var s=Math.floor(d/1000),v=[['giorni',Math.floor(s/86400)],['ore',Math.floor(s%86400/3600)],['min',Math.floor(s%3600/60)],['sec',s%60]];
box.innerHTML=v.map(function(x){return '<div><b>'+x[1]+'</b><span>'+x[0]+'</span></div>'}).join('');
}
tick();setInterval(tick,1000);
var msg=encodeURIComponent('Ciao! Confermo la presenza al vostro matrimonio del 17 aprile 2027.\nNumero di persone (adulti/bambini): \nAllergie o intolleranze: \nInteressati al pernottamento: ');
document.getElementById('rsvpE').href='https://wa.me/393661879071?text='+msg;
document.getElementById('rsvpV').href='https://wa.me/393454228276?text='+msg;
document.getElementById('rsvpE').target=document.getElementById('rsvpV').target='_blank';
document.getElementById('rsvpE').rel=document.getElementById('rsvpV').rel='noopener';
var cb=document.getElementById('copy');
cb.addEventListener('click',function(){
var t=document.getElementById('iban').textContent;
function ok(){cb.textContent='Copiato ✓';setTimeout(function(){cb.textContent='Copia'},2000)}
try{navigator.clipboard.writeText(t).then(ok,fb)}catch(e){fb()}
function fb(){var r=document.createRange();r.selectNodeContents(document.getElementById('iban'));var s=getSelection();s.removeAllRanges();s.addRange(r);if(document.execCommand('copy'))ok();else{cb.textContent='Copia manualmente';setTimeout(function(){cb.textContent='Copia'},3000)}}
});
var PH={arun:{src:'assets/photos/arun.jpg',p:"Bangkok",t:"Wat Arun, il tempio dell’alba",pos:'50% 15%'},float:{src:'assets/photos/float.jpg',p:"Bangkok",t:"il mercato galleggiante",pos:'50% 50%'},rail:{src:'assets/photos/rail.jpg',p:"Bangkok",t:"il mercato sui binari",pos:'50% 62%'},ayu:{src:'assets/photos/ayu.jpg',p:"Ayutthaya",t:"le antiche rovine dei templi",pos:'50% 45%'},white:{src:'assets/photos/white.jpg',p:"Chiang Rai",t:"il Tempio Bianco",pos:'50% 40%'},blue:{src:'assets/photos/blue.jpg',p:"Chiang Rai",t:"il Tempio Blu",pos:'50% 55%'},tea:{src:'assets/photos/tea.jpg',p:"Chiang Rai",t:"le piantagioni di tè",pos:'50% 55%'},eleph:{src:'assets/photos/eleph.jpg',p:"Chiang Mai",t:"spa di fango con gli elefanti",pos:'50% 50%'},lake:{src:'assets/photos/lake.jpg',p:"Khao Sok",t:"il lago tra le rocce calcaree",pos:'50% 55%'},phuket:{src:'assets/photos/phuket.jpg',p:"Phuket",t:"spiagge e acque cristalline",pos:'50% 55%'}};
var SETS={bkk:['arun','float','rail','ayu'],rai:['white','blue','tea'],mai:['eleph'],kao:['lake'],phu:['phuket']};
var dlg=document.getElementById('photo-dialog'),pim=document.getElementById('photo-dialog-image'),pcap=document.getElementById('photo-dialog-caption'),pol=document.getElementById('polaroid'),pnav=document.getElementById('photo-nav'),pcnt=document.getElementById('ph-count'),cur=[],ci=0;
function show(){var p=PH[cur[ci]],b=document.createElement('strong'),s=document.createElement('span');
pim.src=p.src;pim.alt='Foto: '+p.p+', '+p.t;pim.style.objectPosition=p.pos;
b.textContent=p.p;s.textContent=p.t;pcap.textContent='';pcap.appendChild(b);pcap.appendChild(s);
pnav.hidden=cur.length<2;pcnt.textContent=(ci+1)+' / '+cur.length;
pol.style.setProperty('--tilt',(ci%2?1.5:-1.6)+'deg');pol.style.animation='none';void pol.offsetWidth;pol.style.animation=''}
function step(n){ci=(ci+n+cur.length)%cur.length;show()}
document.querySelectorAll('.stop[data-set]').forEach(function(g){
function go(){cur=SETS[g.getAttribute('data-set')];ci=0;show();dlg.showModal()}
g.addEventListener('click',go);
g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
});
document.getElementById('photo-close').addEventListener('click',function(e){e.stopPropagation();dlg.close()});
document.getElementById('ph-prev').addEventListener('click',function(){step(-1)});
document.getElementById('ph-next').addEventListener('click',function(){step(1)});
dlg.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
var sx=null;pol.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
pol.addEventListener('touchend',function(e){if(sx===null||cur.length<2)return;var d=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(d)>45)step(d<0?1:-1)});
function fitLabels(){document.querySelectorAll('.itinerary-map .lbl').forEach(function(g){var t=g.querySelector('text'),r=g.querySelector('rect');try{var w=t.getComputedTextLength()+34;r.setAttribute('width',w);r.setAttribute('x',-w/2)}catch(e){}})}
fitLabels();if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fitLabels);
var els=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
els.forEach(function(e){io.observe(e)});
}else{els.forEach(function(e){e.classList.add('in')})}
})();
