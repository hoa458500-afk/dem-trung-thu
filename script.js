const app=document.querySelector('#app');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const names=['Lồng đèn bay','Một trời pháo hoa','Ba chiếc bánh Trung Thu'];
const cakeWishes=['Chúc bà Trung Thu vui vẻ.','Ngày càng khỏe mạnh và xinh đẹp.','Hạnh phúc bên gia đình.'];
const entryLattice=side=>`<svg class="gate-emblem" viewBox="0 0 400 400" aria-hidden="true"><defs><clipPath id="gate-clip-${side}"><circle cx="200" cy="200" r="184"/></clipPath></defs><g fill="none" stroke="#f9da8b"><circle cx="200" cy="200" r="193" stroke-width="3"/><circle cx="200" cy="200" r="184" stroke-width="1.6"/><g clip-path="url(#gate-clip-${side})" stroke-width="1.7"><path d="M22 200H378M63 85V315M337 85V315M132 40V360M268 40V360M31 144H369M31 256H369M132 66H268M132 334H268"/><path d="M132 82H111V104H132M268 82H289V104H268M132 296H111V318H132M268 296H289V318H268"/><rect x="84" y="181" width="48" height="38"/><rect x="107" y="168" width="43" height="64"/><rect x="268" y="181" width="48" height="38"/><rect x="250" y="168" width="43" height="64"/></g></g></svg>`;
app.innerHTML=`
  <div class="gift-experience showing-home" inert aria-hidden="true">
  <div class="backdrop code-background home-background" data-gift-background="0" aria-hidden="true"></div><canvas id="sky" aria-hidden="true"></canvas><div class="vignette"></div><div class="grain"></div>
  <section class="ui home" id="home" aria-label="Chọn lồng đèn">
    <div class="masthead">MỘT CHÚT TRUNG THU GỬI BÀ<span class="rule"></span></div>
    <div class="lanterns">
      ${['lion','moon','rabbit'].map((v,i)=>`<div class="lantern-slot"><button class="lantern-btn" type="button" data-scene="${i+1}" aria-label="Mở ${names[i]}"><span class="lantern-rope" aria-hidden="true"></span><span class="lantern-glow" aria-hidden="true"></span><span class="lantern-art" aria-hidden="true">${window.HomeLanterns.art(v)}</span></button></div>`).join('')}
    </div><div class="hint"><span>✦</span> Chạm vào một chiếc đèn để mở quà</div>
  </section>
  <section class="scene wish-scene" id="scene1" aria-hidden="true" aria-label="Món quà thứ nhất">
    <div class="code-background" data-gift-background="1" aria-hidden="true"></div>
    <button class="back" type="button" aria-label="Về ba chiếc đèn" title="Về ba chiếc đèn">←</button>
    <canvas class="lantern-flight" aria-hidden="true"></canvas>
    <h2 class="visually-hidden">Lồng đèn bay và mưa sao băng trong đêm</h2>
    <button class="release-lanterns" type="button">Thả lồng đèn</button>
    <button class="next-prompt" type="button" data-next="2" aria-label="Mở món quà tiếp theo">Tiếp →</button><div class="progress"><i class="on"></i><i></i><i></i></div>
  </section>
  <section class="scene fireworks-scene" id="scene2" aria-hidden="true" aria-label="Món quà thứ hai">
    <div class="code-background" data-gift-background="2" aria-hidden="true"></div><canvas class="fireworks-canvas" aria-hidden="true"></canvas>
    <button class="back" type="button" aria-label="Về ba chiếc đèn" title="Về ba chiếc đèn">←</button>
    <h2 class="visually-hidden">Một trời pháo hoa</h2><p class="visually-hidden fireworks-message" role="status" aria-live="polite" aria-atomic="true"></p><div class="tap-hint">Chạm vào trời để bắn thêm ✦</div>
    <button class="next-prompt" type="button" data-next="3" aria-label="Mở món quà tiếp theo">Tiếp →</button><div class="progress"><i></i><i class="on"></i><i></i></div>
  </section>
  <section class="scene mooncake-scene" id="scene3" aria-hidden="true" aria-label="Món quà thứ ba">
    <div class="code-background" data-gift-background="3" aria-hidden="true"></div>
    <button class="back" type="button" aria-label="Về ba chiếc đèn" title="Về ba chiếc đèn">←</button>
    <div class="mooncake-gleams" aria-hidden="true"></div>
    <div class="mooncake-content"><h2 class="visually-hidden">Ba chiếc bánh Trung Thu</h2>
      <div class="mooncake-row" role="group" aria-label="Chọn một chiếc bánh Trung Thu" aria-describedby="cake-hint">
        ${cakeWishes.map((wish,i)=>`<div class="cake-gift"><button class="mooncake" type="button" data-message="${i}" aria-label="Mở lời chúc từ bánh Trung Thu ${i+1}" aria-expanded="false" aria-controls="cake-wish-${i}"><span class="mooncake-art" aria-hidden="true">${window.Mooncakes.art(i)}</span>${window.Mooncakes.flourish(i)}</button><div class="wish-banner" id="cake-wish-${i}" aria-hidden="true"><p><span class="visually-hidden">${wish}</span>${wish.split(' ').map(word=>`<span aria-hidden="true">${word}</span>`).join('')}</p></div></div>`).join('')}
      </div>
      <p class="mooncake-hint" id="cake-hint">Nhấn vào 3 chiếc bánh bên trên</p>
      <img class="family-illustration" src="./assets/gift3-rustic-family-v13.webp" alt="Bố mẹ và bốn người con gái ngồi trên sáu chiếc ghế xung quanh bàn tròn, cùng đón Trung Thu trong ngôi nhà quê mộc mạc" decoding="async">
    </div>
    <button class="next-prompt finale-entry" type="button" data-next="4" hidden>Ngắm trăng một chút <span aria-hidden="true">☾</span></button><div class="progress"><i></i><i></i><i class="on"></i></div>
  </section>
  <section class="scene moon-finale" id="scene4" aria-hidden="true" aria-label="Ngắm trăng dưới hiên nhà" tabindex="-1" inert>
    <div class="moon-portrait">
      <img class="finale-art" src="./assets/moon-porch-star-v19.webp" alt="Hiên nhà gỗ nhìn ra đồng lúa dưới trăng tròn, một chiếc lồng đèn ngôi sao nằm trên sàn hiên" decoding="async">
      <div class="finale-shade" aria-hidden="true"></div>
      <div class="finale-lantern" aria-hidden="true"></div>
      <div class="finale-stars" aria-hidden="true">${Array.from({length:10},(_,i)=>`<i style="--x:${12+(i*17)%77}%;--y:${9+(i*7)%34}%;--delay:-${i*.7}s"></i>`).join('')}</div>
      <div class="finale-fireflies" aria-hidden="true">${Array.from({length:10},(_,i)=>`<i style="--x:${9+(i*19)%84}%;--y:${49+(i*11)%31}%;--dx:${i%2?-19:24}px;--dy:${-13-i%4*7}px;--delay:-${i*.9}s;--duration:${6+i%4}s"></i>`).join('')}</div>
    </div>
    <button class="finale-back" type="button" data-next="3" aria-label="Về ba lời chúc" title="Về ba lời chúc">←</button>
  </section><div class="transition-flash" aria-hidden="true"></div>
  </div>
  <section class="entry-gate" aria-label="Mở quà Trung Thu">
    <div class="gate-panel gate-left" aria-hidden="true">${entryLattice('left')}</div>
    <div class="gate-panel gate-right" aria-hidden="true">${entryLattice('right')}</div>
    <button class="entry-open" type="button" aria-label="Mở ba chiếc lồng đèn Trung Thu">
      <span class="gate-lantern" aria-hidden="true">
        <svg viewBox="0 0 140 220"><defs><linearGradient id="gate-red" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#b70b23"/><stop offset=".4" stop-color="#ff3443"/><stop offset=".67" stop-color="#ec1e31"/><stop offset="1" stop-color="#a70420"/></linearGradient><linearGradient id="gate-gold" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff1ae"/><stop offset=".5" stop-color="#e9b746"/><stop offset="1" stop-color="#a95b1a"/></linearGradient></defs><g stroke="#7e2317" stroke-width="1.8"><path d="M70 0V27" stroke="#ffe9a0" stroke-width="2"/><path d="M70 23c-9 7-7 13 0 13s9-7 0-13Z" fill="url(#gate-gold)"/><rect x="45" y="37" width="50" height="10" rx="3" fill="url(#gate-gold)"/><ellipse cx="70" cy="89" rx="55" ry="44" fill="url(#gate-red)"/><g fill="none" stroke="#9b1026"><path d="M54 47C28 67 28 109 54 131M86 47C112 67 112 109 86 131M66 46C50 69 50 110 66 132M74 46C90 69 90 110 74 132"/></g><path d="M39 61c10-10 24-13 36-12" fill="none" stroke="#ff8f6b" stroke-width="3" stroke-linecap="round" opacity=".75"/><rect x="46" y="132" width="48" height="10" rx="2" fill="url(#gate-gold)"/><g stroke="#f8d471" stroke-width="2"><path d="M51 143V167M57 143V174M63 143V178M69 143V179M75 143V178M81 143V174M87 143V167"/></g><path d="M70 142V193" stroke="#bc571a"/><path d="M70 181l6 9-6 7-6-7Z" fill="#cf1327"/><path d="M70 194l-5 17 5-4 5 4Z" fill="#bc0c25"/><path d="M70 195v16" stroke="#f3c764" stroke-width="1"/></g></svg>
      </span>
      <span class="gate-caption"><span aria-hidden="true">✦</span> CHẠM ĐỂ MỞ <span aria-hidden="true">✦</span></span>
    </button>
  </section>`;

let entryOpened=false,entryOpening=false;
const entryGate=document.querySelector('.entry-gate'),entryButton=document.querySelector('.entry-open'),experience=document.querySelector('.gift-experience');
function openEntry(){
  if(entryOpened||entryOpening)return;
  entryOpening=true;entryButton.disabled=true;
  app.classList.remove('entry-locked');app.classList.add('entry-opening');entryGate.classList.add('is-opening');
  setTimeout(()=>{
    entryOpened=true;entryOpening=false;entryGate.hidden=true;
    app.classList.remove('entry-opening');app.classList.add('entry-opened');
    experience.inert=false;experience.setAttribute('aria-hidden','false');
    document.querySelector('meta[name="theme-color"]').setAttribute('content','#09132b');
    document.querySelector('.lantern-btn').focus({preventScroll:true});
  },reduced?0:1650);
}
entryButton.addEventListener('click',openEntry);
document.querySelector('.finale-lantern').innerHTML=document.querySelector('.gate-lantern').innerHTML.replaceAll('gate-red','finale-red').replaceAll('gate-gold','finale-gold');

let current=0,changing=false,stars=[],last=0,autoFire=0,audioCtx=null,effectGain=null,musicGain=null,musicSourceNode=null,musicEnabled=false,musicStartAttempt=0,finaleUnlocked=false;
const viewedCakeWishes=new Set();
const canvas=document.querySelector('#sky'),ctx=canvas.getContext('2d',{alpha:true});
const fireCanvas=document.querySelector('.fireworks-canvas'),fireCtx=fireCanvas.getContext('2d',{alpha:true,desynchronized:true});
const fireScene=document.querySelector('#scene2'),fireworkMessage=document.querySelector('.fireworks-message');
const fireworkGreeting=window.FireworkEffects.createGreeting(reduced);
const lanternCanvas=document.querySelector('.lantern-flight'),lanternCtx=lanternCanvas.getContext('2d',{alpha:true,desynchronized:true});
const lanternSheet=new Image();lanternSheet.decoding='async';lanternSheet.src='./assets/flying-lanterns-v9.webp';
lanternSheet.decode?.().catch(()=>{});
let W=0,H=0,dpr=1,rockets=[],sparks=[],flashes=[],delayed=[];
let lanterns=[],lanternQueue=[],lanternHasFrame=false,meteors=[],nextMeteorAt=0;
const palettes=[{h:39,s:100,l:70},{h:349,s:100,l:72},{h:195,s:100,l:75},{h:276,s:100,l:78},{h:20,s:100,l:69}];
function resize(){W=experience.clientWidth;H=experience.clientHeight;const pixelRatio=window.devicePixelRatio||1,skyDpr=Math.min(pixelRatio,1.25),lanternDpr=Math.min(pixelRatio,W<650?1:1.25);dpr=Math.min(pixelRatio,W<650?1.25:1.5);canvas.width=Math.round(W*skyDpr);canvas.height=Math.round(H*skyDpr);fireCanvas.width=Math.round(W*dpr);fireCanvas.height=Math.round(H*dpr);lanternCanvas.width=Math.round(W*lanternDpr);lanternCanvas.height=Math.round(H*lanternDpr);ctx.setTransform(skyDpr,0,0,skyDpr,0,0);fireCtx.setTransform(dpr,0,0,dpr,0,0);lanternCtx.setTransform(lanternDpr,0,0,lanternDpr,0,0);lanternHasFrame=false;stars=Array.from({length:Math.min(55,Math.round(W*H/11000))},()=>({x:Math.random()*W,y:Math.random()*H*.7,r:.4+Math.random()*.8,p:Math.random()*6.28,s:.4+Math.random()*.8})).filter(s=>(s.x-W*.66)**2+(s.y-H*.235)**2>(W*.14)**2);window.GiftBackgrounds.renderScene(0,W,H);window.GiftBackgrounds.renderScene(3,W,H);}
addEventListener('resize',resize,{passive:true});resize();
function launchFirework(tx,ty,choice,celebration=false){
  tx=Math.max(W*.08,Math.min(W*.92,tx));ty=Math.max(H*.12,Math.min(H*.60,ty));
  const duration=28+Math.random()*15,x=W*(.22+Math.random()*.56),y=H+15;
  if(rockets.length>=3)rockets.shift();
  rockets.push({x,y,tx,ty,vx:(tx-x)/duration,vy:(ty-y)/duration,age:0,duration,trail:[],celebration,palette:choice??palettes[Math.floor(Math.random()*palettes.length)]});
}
function playFireworkSound(x,small=false,celebration=false){
  if(current!==2||document.hidden||!musicEnabled||!audioCtx||audioCtx.state!=='running'||!effectGain)return;
  window.FireworkEffects.playExplosion(audioCtx,effectGain,{small,celebration,pan:(x/Math.max(1,W)-.5)*1.1});
}
function revealFireworkGreeting(t){
  if(fireworkGreeting.burst(t))fireworkMessage.textContent='Trung Thu vui vẻ!';
}
function explode(x,y,palette,small=false,celebration=false){
  playFireworkSound(x,small,celebration);
  const mobile=W<650,scale=Math.min(mobile?1.03:1.35,Math.max(.75,W/420));
  const count=celebration?(mobile?44:64):small?(mobile?28:38):(mobile?68:96);
  flashes.push({x,y,age:0,size:small?72:celebration?165:135,color:palette});
  for(let i=0;i<count;i++){
    const a=i*Math.PI*2/count+(Math.random()-.5)*.075;
    const outer=i%5!==0,speed=(outer?3.05+Math.random()*2.35:1.5+Math.random()*1.25)*scale*(small?.67:1);
    const h=palette.h+(Math.random()-.5)*18;
    sparks.push({x,y,oldX:x,oldY:y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:1,decay:(outer?.011:.014)+Math.random()*.004,drag:outer?.983:.974,gravity:outer?.046:.058,h,s:palette.s,l:palette.l,width:outer?1.8+Math.random()*1.5:1.25,crackle:outer&&i%19===0});
  }
  if(!small)delayed.push({x,y:y+2,palette,at:performance.now()+280});
  const limit=mobile?320:480;if(sparks.length>limit)sparks.splice(0,sparks.length-limit);
}
function drawFireworks(t,dt){
  if(current!==2||document.hidden)return;
  fireCtx.clearRect(0,0,W,H);
  fireCtx.globalCompositeOperation='lighter';
  if(fireworkGreeting.launchDue(t)){
    fireScene.classList.add('is-celebrating');
    if(reduced){revealFireworkGreeting(t);playFireworkSound(W*.5,false,true)}
    else launchFirework(W*.5,H*.35,palettes[0],true);
  }
  for(let i=delayed.length-1;i>=0;i--)if(t>=delayed[i].at){const d=delayed.splice(i,1)[0];explode(d.x,d.y,d.palette,true)}
  for(let i=rockets.length-1;i>=0;i--){
    let r=rockets[i];r.age+=dt;r.trail.push({x:r.x,y:r.y});if(r.trail.length>6)r.trail.shift();
    r.x+=r.vx*dt;r.y+=r.vy*dt;
    if(r.trail.length){fireCtx.beginPath();fireCtx.strokeStyle='rgba(255,210,139,.65)';fireCtx.lineWidth=3;fireCtx.moveTo(r.trail[0].x,r.trail[0].y);for(let j=1;j<r.trail.length;j++)fireCtx.lineTo(r.trail[j].x,r.trail[j].y);fireCtx.lineTo(r.x,r.y);fireCtx.stroke()}
    fireCtx.beginPath();fireCtx.fillStyle='#fff8dc';fireCtx.arc(r.x,r.y,3.5,0,Math.PI*2);fireCtx.fill();
    if(r.age>=r.duration){rockets.splice(i,1);explode(r.tx,r.ty,r.palette,false,r.celebration);if(r.celebration)revealFireworkGreeting(t)}
  }
  for(let i=flashes.length-1;i>=0;i--){let f=flashes[i];f.age+=dt;if(f.age>12){flashes.splice(i,1);continue}
    let k=1-f.age/12,rad=f.size*(.3+f.age/12),g=fireCtx.createRadialGradient(f.x,f.y,0,f.x,f.y,rad);
    g.addColorStop(0,`rgba(255,252,227,${.68*k})`);g.addColorStop(.24,`hsla(${f.color.h},100%,70%,${.35*k})`);g.addColorStop(1,'rgba(255,206,130,0)');
    fireCtx.fillStyle=g;fireCtx.beginPath();fireCtx.arc(f.x,f.y,rad,0,Math.PI*2);fireCtx.fill();
    const reflectedY=H*.72+(H*.72-f.y)*.3;
    fireCtx.fillStyle=`hsla(${f.color.h},100%,75%,${.1*k})`;fireCtx.beginPath();fireCtx.ellipse(f.x,reflectedY,rad*1.25,rad*.1,0,0,Math.PI*2);fireCtx.fill();
  }
  for(let i=sparks.length-1;i>=0;i--){let p=sparks[i];p.oldX=p.x;p.oldY=p.y;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=Math.pow(p.drag,dt);p.vy=p.vy*Math.pow(p.drag,dt)+p.gravity*dt;p.life-=p.decay*dt;
    if(p.life<=0){sparks.splice(i,1);continue}
    const tail=2.4,fromX=p.x-(p.x-p.oldX)*tail,fromY=p.y-(p.y-p.oldY)*tail;
    if(i%7===0){fireCtx.beginPath();fireCtx.strokeStyle=`hsla(${p.h},100%,72%,${p.life*.17})`;fireCtx.lineWidth=p.width*4;fireCtx.moveTo(fromX,fromY);fireCtx.lineTo(p.x,p.y);fireCtx.stroke()}
    fireCtx.beginPath();fireCtx.strokeStyle=`hsla(${p.h},${p.s}%,${p.l}%,${p.life*.9})`;fireCtx.lineWidth=Math.max(.7,p.width*p.life);fireCtx.moveTo(fromX,fromY);fireCtx.lineTo(p.x,p.y);fireCtx.stroke();
    if(i%4===0){fireCtx.beginPath();fireCtx.fillStyle=`hsla(${p.h},100%,93%,${p.life})`;fireCtx.arc(p.x,p.y,Math.max(.8,p.width*.8*p.life),0,Math.PI*2);fireCtx.fill()}
    if(i%3===0&&p.y<H*.72){
      const reflectedY=H*.72+(H*.72-p.y)*.3,reflectedX=p.x+Math.sin(t*.002+p.y*.09)*2.4;
      fireCtx.beginPath();fireCtx.strokeStyle=`hsla(${p.h},${p.s}%,${p.l}%,${p.life*.24})`;fireCtx.lineWidth=Math.max(.6,p.life*1.3);
      fireCtx.moveTo(reflectedX-2-p.life*2.5,reflectedY);fireCtx.lineTo(reflectedX+2+p.life*2.5,reflectedY);fireCtx.stroke();
    }
    if(p.crackle&&p.life<.48){p.crackle=false;for(let k=0;k<2;k++)sparks.push({x:p.x,y:p.y,oldX:p.x,oldY:p.y,vx:(Math.random()-.5)*2.3,vy:(Math.random()-.5)*2.3,life:.45,decay:.035,drag:.96,gravity:.04,h:p.h,s:p.s,l:85,width:1,crackle:false})}
  }
  if(fireworkGreeting.draw(fireCtx,t,W,H)){fireScene.classList.remove('is-celebrating');autoFire=t-1900}
  fireCtx.globalCompositeOperation='source-over';
  if(!reduced&&!fireworkGreeting.busy&&t-autoFire>1850&&rockets.length<2&&sparks.length<(W<650?230:350)){autoFire=t;launchFirework(W*(.17+Math.random()*.66),H*(.17+Math.random()*.32))}
}
function animate(t){if(!entryOpened&&!entryOpening){last=t;requestAnimationFrame(animate);return}if(t-last<1000/(W<650?30:40)){requestAnimationFrame(animate);return}if(document.hidden){last=t;requestAnimationFrame(animate);return}let dt=Math.min((t-last)/16.67||1,3);last=t;if(current===0){ctx.clearRect(0,0,W,H);for(const s of stars){const alpha=reduced?.38:.35+.18*Math.sin(t*.0007*s.s+s.p);ctx.beginPath();ctx.fillStyle=`rgba(255,232,184,${alpha})`;ctx.arc(s.x,s.y,s.r,0,6.283);ctx.fill()}}drawFireworks(t,dt);drawLanterns(t);requestAnimationFrame(animate)}requestAnimationFrame(animate);

function show(n,origin){
  if(changing||n===current||(n===4&&!finaleUnlocked))return;
  changing=true;
  const quietTransition=n===4||current===4,flash=document.querySelector('.transition-flash');
  flash.classList.remove('go');
  if(!quietTransition){
    const bounds=experience.getBoundingClientRect();
    flash.style.setProperty('--x',`${origin?origin.clientX-bounds.left:W/2}px`);flash.style.setProperty('--y',`${origin?origin.clientY-bounds.top:H/2}px`);
    void flash.offsetWidth;flash.classList.add('go');
  }
  const delay=reduced?10:quietTransition?0:370;
  setTimeout(()=>{
    const old=current;current=n;
    experience.classList.toggle('showing-home',n===0);
    const home=document.querySelector('#home');home.classList.toggle('hidden',n!==0);home.inert=n!==0;home.setAttribute('aria-hidden',String(n!==0));
    for(let i=1;i<=4;i++){
      const scene=document.querySelector(`#scene${i}`);scene.classList.toggle('active',i===n);scene.inert=i!==n;scene.setAttribute('aria-hidden',String(i!==n));
    }
    if(n===2){
      autoFire=performance.now();fireworkGreeting.start(autoFire);fireworkMessage.textContent='';fireScene.classList.remove('is-celebrating');launchFirework(W*.34,H*.28,palettes[0]);
      setTimeout(()=>{if(current===2)launchFirework(W*.66,H*.24,palettes[2])},420);
      setTimeout(()=>{if(current===2)launchFirework(W*.51,H*.37,palettes[1])},900);
    }else if(old===2){rockets=[];sparks=[];flashes=[];delayed=[];fireworkGreeting.cancel();window.FireworkEffects.stopSounds();fireScene.classList.remove('is-celebrating');fireworkMessage.textContent='';fireCtx.clearRect(0,0,W,H)}
    if(n===1)startLanterns();
    if(old===1&&n!==1)clearLanterns();
    if(old===3&&n!==3)closeScroll(false);
    applyMusicMood();
    if(n===4)document.querySelector('#scene4').focus({preventScroll:true});
    else if(old===4&&n===3)document.querySelector('.finale-entry').focus({preventScroll:true});
    setTimeout(()=>{changing=false;flash.classList.remove('go')},reduced?10:quietTransition?1200:650);
  },delay);
}

function clearLanterns(){lanterns=[];lanternQueue=[];meteors=[];nextMeteorAt=0;lanternCtx.clearRect(0,0,W,H);lanternHasFrame=false}
function startLanterns(){clearLanterns();nextMeteorAt=performance.now()+350}
function drawMeteorShower(t){
  if(reduced)return;
  const mobile=W<650,limit=mobile?5:8;
  if(t>=nextMeteorAt){
    const count=Math.min(mobile?2:3,limit-meteors.length);
    for(let i=0;i<count;i++)meteors.push({born:t+i*190,duration:1450+Math.random()*650,x:W*(.26+Math.random()*1.03),y:-28-Math.random()*75,distance:Math.min(H*.9,W*1.5)*(.66+Math.random()*.28),tail:mobile?65+Math.random()*40:115+Math.random()*70});
    nextMeteorAt=t+(mobile?1550:1250)+Math.random()*650;
  }
  for(let i=meteors.length-1;i>=0;i--){
    const m=meteors[i],p=(t-m.born)/m.duration;
    if(p>=1){meteors.splice(i,1);continue}
    if(p<0)continue;
    const x=m.x-m.distance*.72*p,y=m.y+m.distance*.82*p;
    const tailX=x+m.tail*.66,tailY=y-m.tail*.75,alpha=Math.min(1,p*9,(1-p)*4);
    const trail=lanternCtx.createLinearGradient(tailX,tailY,x,y);
    trail.addColorStop(0,'rgba(158,206,255,0)');trail.addColorStop(.65,'rgba(189,222,255,.5)');trail.addColorStop(1,'#fff8dd');
    lanternCtx.beginPath();lanternCtx.moveTo(tailX,tailY);lanternCtx.lineTo(x,y);lanternCtx.strokeStyle=trail;
    lanternCtx.globalAlpha=alpha*.16;lanternCtx.lineWidth=4;lanternCtx.stroke();
    lanternCtx.globalAlpha=alpha*.92;lanternCtx.lineWidth=1.4;lanternCtx.stroke();
    lanternCtx.beginPath();lanternCtx.fillStyle='#fff8e5';lanternCtx.arc(x,y,1.55,0,Math.PI*2);lanternCtx.fill();
  }
  lanternCtx.globalAlpha=1;
}
function releaseLanterns(count){
  if(current!==1)return;
  if(reduced){clearLanterns();count=9}
  else count=Math.min(count,W<650?12:18);
  const now=performance.now();
  for(let i=0;i<count;i++){
    lanternQueue.push({at:now+(reduced?0:i*140),variant:(i+Math.floor(Math.random()*6))%6,x:W*(.08+Math.random()*.84),size:W<650?56+Math.random()*30:75+Math.random()*55,drift:(Math.random()-.5)*(W<650?78:185),duration:10500+Math.random()*5500,phase:Math.random()*Math.PI*2,stillY:H*(.19+Math.random()*.57)});
  }
  if(lanternQueue.length>30)lanternQueue.splice(0,lanternQueue.length-30);
}
function drawLanterns(t){
  if(current!==1)return;
  const sheetReady=lanternSheet.complete&&lanternSheet.naturalWidth;
  for(let i=lanternQueue.length-1;i>=0;i--)if(sheetReady&&t>=lanternQueue[i].at){
    const lantern=lanternQueue.splice(i,1)[0];lantern.born=t;lanterns.push(lantern);
  }
  const limit=W<650?18:26;if(lanterns.length>limit)lanterns.splice(0,lanterns.length-limit);
  if(reduced&&lanternHasFrame)return;
  lanternCtx.clearRect(0,0,W,H);lanternHasFrame=lanterns.length>0;
  drawMeteorShower(t);
  if(!sheetReady)return;
  for(let i=lanterns.length-1;i>=0;i--){
    const l=lanterns[i],p=reduced?0:Math.min(1,(t-l.born)/l.duration);
    if(!reduced&&p>=1){lanterns.splice(i,1);continue}
    const size=l.size*(reduced?.73:1-.33*p);
    const x=l.x+(reduced?0:l.drift*p+Math.sin(t*.0007+l.phase)*5);
    const y=reduced?l.stillY:H+l.size*.08-p*(H+l.size*1.55);
    if(y>H||y+size<0)continue;
    lanternCtx.globalAlpha=reduced?.95:Math.min(1,p*22,(1-p)*9);
    lanternCtx.drawImage(lanternSheet,l.variant%3*512,Math.floor(l.variant/3)*512,512,512,x-size/2,y,size,size);
  }
  lanternCtx.globalAlpha=1;
}
document.querySelectorAll('[data-scene]').forEach(b=>b.addEventListener('click',e=>show(Number(b.dataset.scene),e)));
document.querySelectorAll('.back').forEach(b=>b.addEventListener('click',e=>show(0,e)));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',e=>show(Number(b.dataset.next),e)));
document.querySelector('.release-lanterns').addEventListener('click',()=>releaseLanterns(W<650?8:12));
document.querySelector('#scene2').addEventListener('pointerdown',e=>{
  if(e.target.closest('button')||current!==2||changing||fireworkGreeting.busy)return;
  const bounds=fireCanvas.getBoundingClientRect();
  launchFirework((e.clientX-bounds.left)*W/bounds.width,(e.clientY-bounds.top)*H/bounds.height);
});
const cakeButtons=Array.from(document.querySelectorAll('.mooncake'));
const cakeFlourishTimers=new Map();
const cakeContent=document.querySelector('.mooncake-content');
let activeCake=null;
function stopCakeFlourish(cake){
  const timers=cakeFlourishTimers.get(cake);
  if(timers){clearTimeout(timers.reveal);clearTimeout(timers.finish);cakeFlourishTimers.delete(cake)}
  cake.classList.remove('is-opening');cake.removeAttribute('aria-busy');
}
function updateCakeHint(){
  cakeContent.classList.toggle('has-open-wish',cakeButtons.some(cake=>cake.hasAttribute('aria-busy')||cake.getAttribute('aria-expanded')==='true'));
}
function closeCake(cake){
  const banner=document.getElementById(cake.getAttribute('aria-controls'));
  stopCakeFlourish(cake);banner.classList.remove('is-open');banner.setAttribute('aria-hidden','true');
  cake.setAttribute('aria-expanded','false');cake.setAttribute('aria-label',`Mở lời chúc từ bánh Trung Thu ${Number(cake.dataset.message)+1}`);
}
function closeScroll(restoreFocus=false){
  cakeButtons.forEach(closeCake);updateCakeHint();
  if(restoreFocus&&activeCake)activeCake.focus();
}
cakeButtons.forEach(cake=>cake.addEventListener('click',()=>{
  if(current!==3||changing)return;
  const index=Number(cake.dataset.message),banner=document.getElementById(cake.getAttribute('aria-controls'));
  activeCake=cake;
  if(cake.hasAttribute('aria-busy')||banner.classList.contains('is-open')){closeCake(cake);updateCakeHint();return}
  stopCakeFlourish(cake);
  const reveal=()=>{
    if(current!==3||changing){closeCake(cake);updateCakeHint();return}
    cake.removeAttribute('aria-busy');banner.classList.add('is-open');banner.setAttribute('aria-hidden','false');
    cake.setAttribute('aria-expanded','true');cake.setAttribute('aria-label',`Thu lời chúc từ bánh Trung Thu ${index+1}`);
    viewedCakeWishes.add(index);updateCakeHint();
    if(!finaleUnlocked&&viewedCakeWishes.size===cakeWishes.length){
      finaleUnlocked=true;const finaleEntry=document.querySelector('.finale-entry');finaleEntry.hidden=false;finaleEntry.classList.add('is-unlocked');
    }
  };
  playTone([523,659,784][index],.6,.1);
  if(reduced)reveal();
  else{
    cake.setAttribute('aria-busy','true');void cake.offsetWidth;cake.classList.add('is-opening');updateCakeHint();
    cakeFlourishTimers.set(cake,{reveal:setTimeout(reveal,480),finish:setTimeout(()=>stopCakeFlourish(cake),1450)});
  }
}));
if(!reduced){const gleams=document.querySelector('.mooncake-gleams');for(let i=0;i<18;i++){const dot=document.createElement('i');dot.style.left=`${Math.round(Math.random()*100)}%`;dot.style.top=`${Math.round(14+Math.random()*69)}%`;dot.style.animationDelay=`${(Math.random()*5).toFixed(1)}s`;gleams.append(dot)}}
addEventListener('keydown',e=>{
  if(e.key==='Escape'&&current){if(current===4)show(3);else if(current===3&&document.querySelector('.wish-banner.is-open,.mooncake.is-opening'))closeScroll(true);else show(0)}
});

function playTone(freq,duration=.3,volume=.045){if(!musicEnabled||!audioCtx||audioCtx.state!=='running'||!effectGain)return;const now=audioCtx.currentTime,o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.setValueAtTime(freq,now);o.frequency.exponentialRampToValueAtTime(freq*.998,now+duration);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(volume*.55,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+duration);o.connect(g).connect(effectGain);o.start(now);o.stop(now+duration+.02)}
const backgroundMusic=new Audio('./assets/dem-trang-doan-vien-v16.mp3');
backgroundMusic.loop=true;backgroundMusic.preload='auto';backgroundMusic.autoplay=true;backgroundMusic.volume=.55;
function applyMusicMood(smooth=true){
  const volume=current===4?.34:.55;
  if(musicGain){
    const now=audioCtx.currentTime;musicGain.gain.cancelScheduledValues(now);
    musicGain.gain.setTargetAtTime(volume,now,smooth&&!reduced?.45:.01);
  }else backgroundMusic.volume=volume;
}
async function startMusic(fromGesture=false){
  if(document.hidden)return;
  const needsAudioGraph=fromGesture&&!audioCtx&&(window.AudioContext||window.webkitAudioContext);
  if(musicEnabled&&!backgroundMusic.paused&&(!audioCtx||audioCtx.state==='running')&&!needsAudioGraph)return;
  const attempt=++musicStartAttempt;
  try{
    // Create Web Audio only in a user gesture; native autoplay can work before it.
    if(fromGesture){
      try{
        const AudioEngine=window.AudioContext||window.webkitAudioContext;
        if(AudioEngine&&!audioCtx){audioCtx=new AudioEngine();effectGain=audioCtx.createGain();effectGain.gain.value=0;effectGain.connect(audioCtx.destination)}
        if(audioCtx&&!musicSourceNode&&location.protocol!=='file:'&&typeof audioCtx.createMediaElementSource==='function'){
          musicGain=audioCtx.createGain();musicGain.gain.value=current===4?.34:.55;
          musicSourceNode=audioCtx.createMediaElementSource(backgroundMusic);
          musicSourceNode.connect(musicGain).connect(audioCtx.destination);backgroundMusic.volume=1;
        }
      }catch{
        if(!musicSourceNode)musicGain=null;
      }
    }
    applyMusicMood(false);
    const resumed=audioCtx?.resume();
    await Promise.all([backgroundMusic.play(),resumed]);
    if(attempt!==musicStartAttempt)return;
    musicEnabled=true;effectGain?.gain.setTargetAtTime(1,audioCtx.currentTime,.03);
  }catch{
    if(attempt!==musicStartAttempt)return;
    musicEnabled=false;if(effectGain)effectGain.gain.value=0;
  }
}
// The existing opening tap also unlocks music on phones that block autoplay.
document.addEventListener('click',()=>startMusic(true),{capture:true});
document.addEventListener('keydown',event=>{
  if(event.key==='Enter'||event.key===' ')startMusic(true);
},{capture:true});
document.addEventListener('visibilitychange',()=>{
  const now=performance.now();
  experience.classList.toggle('home-paused',document.hidden);
  if(document.hidden){fireworkGreeting.pause(now);window.FireworkEffects.stopSounds()}
  else{fireworkGreeting.resume(now)}
  if(!document.hidden&&entryOpened)startMusic();
});
startMusic();
