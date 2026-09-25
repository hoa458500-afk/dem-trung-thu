/* Responsive SVG backgrounds, drawn entirely in code. */
(() => {
  'use strict';
  const n=value=>Number(value.toFixed(2));
  function random(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
  function svg(height,body){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${n(height)}" width="400" height="${n(height)}" preserveAspectRatio="none" focusable="false">${body}</svg>`;}
  function starfield(seed,count,top,bottom,subtle=false){
    const rand=random(seed);let result='';
    for(let i=0;i<count;i++){
      const x=n(8+rand()*384),y=n(top+rand()*(bottom-top)),r=n(.35+rand()*.65),alpha=n((subtle?.18:.28)+rand()*.5);
      result+=`<g ${i%13===0?`class="coded-star" style="--delay:-${n(rand()*9)}s"`:''} opacity="${alpha}"><circle cx="${x}" cy="${y}" r="${r}" fill="${i%4?'#d9e8ff':'#ffe6b0'}"/>${i%19===0?`<path d="M${x-3} ${y}h6M${x} ${y-3}v6" stroke="#dfedff" stroke-width=".45" opacity=".55"/>`:''}</g>`;
    }
    return result;
  }
  function moon(id,x,y,r){
    const rand=random(42);let craters='';
    for(let i=0;i<22;i++){
      const a=rand()*Math.PI*2,d=Math.sqrt(rand())*r*.82,size=2+rand()*r*.18;
      craters+=`<ellipse cx="${n(x+Math.cos(a)*d)}" cy="${n(y+Math.sin(a)*d)}" rx="${n(size)}" ry="${n(size*.65)}" fill="${i%2?'#8c795f':'#f5d899'}" opacity="${n(.035+rand()*.065)}"/>`;
    }
    return `<defs><radialGradient id="${id}-halo"><stop stop-color="#ffe6ac" stop-opacity=".27"/><stop offset=".38" stop-color="#ffe0a3" stop-opacity=".12"/><stop offset="1" stop-color="#ffe0a3" stop-opacity="0"/></radialGradient><radialGradient id="${id}-disc" cx="32%" cy="27%"><stop stop-color="#fffbea"/><stop offset=".64" stop-color="#fce6ae"/><stop offset="1" stop-color="#d9be81"/></radialGradient><clipPath id="${id}-clip"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath></defs><circle cx="${x}" cy="${y}" r="${r*3.1}" fill="url(#${id}-halo)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}-disc)"/><g clip-path="url(#${id}-clip)">${craters}</g><circle cx="${x}" cy="${y}" r="${r-.5}" fill="none" stroke="#fff9dd" stroke-opacity=".48" stroke-width=".7"/>`;
  }
  function ripples(seed,top,bottom,center,color,spread=1){
    const rand=random(seed);let result='';
    for(let i=0;i<65;i++){
      const t=(i+1)/66,y=top+(bottom-top)*t,w=(2+rand()*20+t*33)*spread,x=center+(rand()-.5)*(10+t*135)*spread;
      result+=`<path d="M${n(x-w/2)} ${n(y)}q${n(w*.25)} ${n((rand()-.5)*1.8)} ${n(w)} 0" fill="none" stroke="${color}" stroke-width="${n(.5+t*.85)}" opacity="${n((1-t)*(.07+rand()*.34))}"/>`;
    }
    return result;
  }
  function village(seed,y,color='#102334'){
    const rand=random(seed);let result='';
    for(let x=-10;x<410;x+=24+rand()*20){
      const w=16+rand()*15,h=9+rand()*9,roof=5+rand()*4;
      result+=`<g><path d="M${n(x)} ${n(y)}v-${n(h)}l${n(w*.52)} -${n(roof)} ${n(w*.48)} ${n(roof)}v${n(h)}Z" fill="${color}"/><path d="M${n(x-3)} ${n(y-h)}l${n(w*.57)} -${n(roof+3)} ${n(w*.57)} ${n(roof+3)}" fill="none" stroke="#142334" stroke-width="2"/><rect x="${n(x+w*.35)}" y="${n(y-h*.7)}" width="3.1" height="4" rx=".3" fill="#edc17c" opacity="${n(.35+rand()*.55)}"/></g>`;
    }
    return result;
  }
  function reeds(seed,x,y,flip=1,color='#071c27'){
    const rand=random(seed);let result='';
    for(let i=0;i<17;i++){
      const start=x+flip*rand()*47,tipX=start+flip*(rand()*65-13),tipY=y-24-rand()*74;
      result+=`<path d="M${n(start)} ${y}Q${n(start+flip*13)} ${n(tipY+25)} ${n(tipX)} ${n(tipY)}" fill="none" stroke="${color}" stroke-width="${n(.8+rand()*1.1)}"/><path d="M${n(start+flip*6)} ${n(y-22)}q${n(flip*23)} -23 ${n(flip*(24+rand()*15))} -20q${n(-flip*7)} 18 ${n(-flip*(24+rand()*9))} 22" fill="${color}"/>`;
    }
    return result;
  }
  function moonlitLanding(h){
    const shore=h*.745,water=h*.775,my=h*.235;
    const rand=random(910);let willow='',fireflies='',lakeLines='';
    for(let i=0;i<11;i++){
      const x=7+i*5.5,y=105+i*5.8,length=26+rand()*42;
      willow+=`<path d="M${n(x)} ${n(y)}q14 23 5 ${n(length)}" fill="none" stroke="#142d43" stroke-width=".9"/>
        <path d="M${n(x+6)} ${n(y+12)}q-11 9-9 23q10-8 9-23M${n(x+9)} ${n(y+27)}q9 11 3 25q-5-10-3-25" fill="#203c50"/>`;
    }
    for(let i=0;i<11;i++){
      const x=n(23+rand()*354),y=n(h*(.58+rand()*.34));
      fireflies+=`<g class="home-firefly" style="--delay:-${n(rand()*9)}s;--duration:${n(5+rand()*5)}s;--dx:${n((rand()-.5)*22)}px;--dy:${n(-8-rand()*17)}px"><circle cx="${x}" cy="${y}" r="7" fill="url(#g0-firefly)"/><circle cx="${x}" cy="${y}" r="${n(.7+rand()*.6)}" fill="#ffdf98"/></g>`;
    }
    for(let i=0;i<18;i++){
      const y=n(water+9+i*(h-water)/19),x=n(rand()*370-20),length=n(21+rand()*78);
      lakeLines+=`<path d="M${x} ${y}q${n(length*.4)} -1 ${length} 0" fill="none" stroke="#9db8c6" stroke-width=".6" opacity="${n(.05+rand()*.11)}"/>`;
    }
    return svg(h,`<defs>
      <linearGradient id="g0-sky" x2="0" y2="1"><stop stop-color="#071329"/><stop offset=".33" stop-color="#172c4b"/><stop offset=".66" stop-color="#3b526b"/><stop offset="1" stop-color="#82908e"/></linearGradient>
      <radialGradient id="g0-blue-veil"><stop stop-color="#8daac8" stop-opacity=".19"/><stop offset="1" stop-color="#6889b7" stop-opacity="0"/></radialGradient>
      <radialGradient id="g0-moon-bloom"><stop stop-color="#ffdc96" stop-opacity=".21"/><stop offset=".42" stop-color="#f9dbae" stop-opacity=".08"/><stop offset="1" stop-color="#e7d5ba" stop-opacity="0"/></radialGradient>
      <linearGradient id="g0-cloud" x2="0" y2="1"><stop stop-color="#dae4dd" stop-opacity=".19"/><stop offset="1" stop-color="#c1ced2" stop-opacity="0"/></linearGradient>
      <linearGradient id="g0-lake" x2="0" y2="1"><stop stop-color="#345264"/><stop offset=".38" stop-color="#1c374d"/><stop offset="1" stop-color="#081d31"/></linearGradient>
      <radialGradient id="g0-reflection"><stop stop-color="#ffdda0" stop-opacity=".23"/><stop offset=".5" stop-color="#f8d5a1" stop-opacity=".07"/><stop offset="1" stop-color="#f8d5a1" stop-opacity="0"/></radialGradient>
      <linearGradient id="g0-haze" x2="0" y2="1"><stop stop-color="#cad9d2" stop-opacity="0"/><stop offset=".55" stop-color="#bed3d0" stop-opacity=".14"/><stop offset="1" stop-color="#c7ded8" stop-opacity="0"/></linearGradient>
      <radialGradient id="g0-firefly"><stop stop-color="#ffe6a6" stop-opacity=".6"/><stop offset=".25" stop-color="#f9d582" stop-opacity=".17"/><stop offset="1" stop-color="#f9d582" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="400" height="${h}" fill="url(#g0-sky)"/>
    <ellipse cx="185" cy="${n(h*.34)}" rx="98" ry="${n(h*.46)}" transform="rotate(28 185 ${n(h*.34)})" fill="url(#g0-blue-veil)"/>
    ${starfield(211,44,62,shore-45,true)}
    <circle class="home-moon-halo" cx="264" cy="${n(my)}" r="152" fill="url(#g0-moon-bloom)"/>
    ${moon('g0',264,n(my),49)}
    <g class="home-cloud home-cloud-high" fill="url(#g0-cloud)">
      <path d="M-50 ${n(h*.34)}q45-17 72-8q24-20 58-6q39-17 70-2q38-10 81 1q-21 15-66 15q-40 9-89 3q-68 5-126-3Z"/>
      <path d="M243 ${n(my+34)}q28-7 51-1q20-12 42-5q21-9 44-1q25-7 55 2q-49 18-99 14q-51 3-93-9Z" opacity=".65"/>
    </g>
    <g class="home-cloud home-cloud-low" fill="url(#g0-cloud)">
      <path d="M140 ${n(h*.42)}q42-13 68-7q37-18 74-7q42-13 65-3q36-9 90 7q-64 9-101 7q-69 9-113 7q-55 4-83-4Z" opacity=".62"/>
      <path d="M-38 ${n(h*.62)}q53-11 96-4q45-12 91-3q-44 10-91 9q-48 4-96-2Z" opacity=".4"/>
    </g>
    <g class="home-willow"><path d="M-8 94Q29 119 76 172M-4 94Q19 99 32 120" fill="none" stroke="#152b40" stroke-width="3" stroke-linecap="round"/>${willow}</g>
    <path d="M0 ${n(shore+20)}V${n(shore-38)}Q28 ${n(shore-54)} 58 ${n(shore-27)}Q108 ${n(shore-91)} 156 ${n(shore-35)}Q207 ${n(shore-74)} 250 ${n(shore-29)}Q298 ${n(shore-71)} 353 ${n(shore-44)}Q376 ${n(shore-58)} 400 ${n(shore-64)}V${n(water+8)}H0Z" fill="#334c5b"/>
    <path d="M0 ${n(shore+11)}q46-43 95-15t83-1t104-12t118-6V${n(water+8)}H0Z" fill="#233e4d"/>
    <path d="M0 ${n(water-10)}q50-24 100-12t100-7t92 12t108-11V${n(water+6)}H0Z" fill="#142d3a"/>
    <g transform="translate(34 ${n(water-9)})"><path d="M0 0v-12h24V0M-5-12l16-10 18 10Z" fill="#102937"/><path d="M8-9h4v6H8Zm9 0h3v6h-3Z" fill="#e4bc80" opacity=".72"/><path d="M31 0v-9h17v9M27-9l12-8 13 8Z" fill="#132c38"/><path d="M37-7h3v4h-3Z" fill="#dab584" opacity=".55"/></g>
    <rect y="${n(water-18)}" width="400" height="48" fill="url(#g0-haze)"/>
    <path d="M0 ${n(water)}H400V${h}H0Z" fill="url(#g0-lake)"/>
    <path d="M0 ${n(water)}H400" stroke="#98b6bb" stroke-width=".7" opacity=".3"/>
    <g class="home-water-glow"><ellipse cx="264" cy="${n(water+(h-water)*.44)}" rx="68" ry="${n((h-water)*.75)}" fill="url(#g0-reflection)"/>${ripples(61,water+2,h-7,264,'#f4ddb0',.92)}</g>
    ${lakeLines}
    <g fill="none" stroke="#b9cccc" opacity=".18" stroke-width=".65"><path d="M28 ${n(water+15)}h33m12 0h14M135 ${n(h*.845)}q22-2 45 0M39 ${n(h*.91)}q28-2 54 0M304 ${n(h*.875)}q28-2 57 0"/></g>
    <path d="M0 ${n(h-29)}q24-9 59 6t76 23H0Z" fill="#071e2b"/>
    <path d="M277 ${h}q49-29 123-34v34Z" fill="#061a26"/>
    ${reeds(12,-24,h+20,1,'#0a2632')}${reeds(34,424,h+17,-1,'#09212d')}
    <g transform="translate(340 ${n(h-35)})"><path d="M0 3q-18-20-34-7q13 10 34 7M3 3q18-20 38-9q-12 13-38 9" fill="#173b43"/><path d="M1 0q-5-15 2-28q7 16-2 28" fill="#4e7170"/><path d="M1 0q-14-7-14-20Q0-15 1 0M1 0q13-8 13-21Q1-15 1 0" fill="#355b60"/><path d="M1 2v22" stroke="#244a50" stroke-width="1.2"/></g>
    ${fireflies}`);
  }
  function lanternSky(h){
    const horizon=h*.79,water=h*.86;
    return svg(h,`<defs>
      <linearGradient id="g1-sky" x2="0" y2="1"><stop stop-color="#061026"/><stop offset=".42" stop-color="#11264a"/><stop offset=".78" stop-color="#285271"/><stop offset="1" stop-color="#091c32"/></linearGradient>
      <radialGradient id="g1-veil"><stop stop-color="#829cc8" stop-opacity=".14"/><stop offset="1" stop-color="#5678bc" stop-opacity="0"/></radialGradient>
      <linearGradient id="g1-water" x2="0" y2="1"><stop stop-color="#18354a"/><stop offset="1" stop-color="#05121f"/></linearGradient>
      <linearGradient id="g1-mist" x2="0" y2="1"><stop stop-color="#99cfce" stop-opacity=".13"/><stop offset="1" stop-color="#7b9fc3" stop-opacity="0"/></linearGradient>
      <radialGradient id="g1-amber"><stop stop-color="#f6b95b" stop-opacity=".16"/><stop offset="1" stop-color="#dfac6b" stop-opacity="0"/></radialGradient>
    </defs>
    <path d="M0 0H400V${h}H0Z" fill="url(#g1-sky)"/>
    <ellipse cx="162" cy="${n(h*.34)}" rx="87" ry="${n(h*.47)}" transform="rotate(30 162 ${n(h*.34)})" fill="url(#g1-veil)"/>
    ${starfield(810,120,18,horizon-40)}
    ${moon('g1',284,n(h*.205),37)}
    <g class="coded-cloud coded-cloud-a" fill="#b9d3e7" opacity=".065"><path d="M-35 ${n(h*.28)}q53 -17 91 -3t94 1q-32 6 -69 5t-116 -3Z"/><path d="M232 ${n(h*.44)}q50 -16 111 -4t104 -7q-50 23 -111 14t-104 -3Z"/></g>
    <g class="coded-cloud coded-cloud-b" fill="#afc7e0" opacity=".075"><path d="M-10 ${n(h*.54)}q60 -13 115 -3t110 -4q-41 18 -105 13t-120 -6Z"/><path d="M176 ${n(h*.13)}q59 -8 121 -2t131 -8q-53 18 -109 13t-143 -3Z"/></g>
    <path d="M0 ${n(horizon+9)}L0 ${n(horizon-24)}Q39 ${n(horizon-43)} 72 ${n(horizon-20)}Q105 ${n(horizon-61)} 147 ${n(horizon-25)}Q194 ${n(horizon-69)} 247 ${n(horizon-30)}Q289 ${n(horizon-47)} 325 ${n(horizon-18)}Q368 ${n(horizon-49)} 400 ${n(horizon-29)}V${n(water+8)}H0Z" fill="#244359"/>
    <path d="M0 ${n(horizon+9)}q45 -32 91 -9t93 -4t109 5t107 -13V${n(water+8)}H0Z" fill="#153548"/>
    <path d="M0 ${n(water-9)}q48 -20 102 -6t87 -8t117 6t94 -4V${h}H0Z" fill="#0b2535"/>
    ${village(20,water-2)}
    <path d="M0 ${n(water)}H400V${h}H0Z" fill="url(#g1-water)"/>
    <path d="M0 ${n(water-19)}H400V${n(water+31)}H0Z" fill="url(#g1-mist)"/>
    <g class="coded-waterlight">${ripples(85,water+3,h,275,'#f6d9a1',.9)}</g>
    <ellipse cx="32" cy="${n(h*.98)}" rx="145" ry="90" fill="url(#g1-amber)"/>
    <g fill="none" stroke="#7faeb9" opacity=".1" stroke-width=".6"><path d="M0 ${n(h*.91)}q85 -5 177 0t223 0M-30 ${n(h*.95)}q135 -7 250 -1t210 0"/></g>
    ${reeds(51,-8,h+2,1)}${reeds(87,406,h+2,-1)}
    <path d="M0 ${n(h-7)}q80 -13 124 1t276 -3V${h}H0Z" fill="#05131e"/>`);
  }
  function fireworksLake(h){
    const water=h*.72;
    let rail='';
    for(let i=0;i<11;i++){const x=i*40,y=h-56-22*Math.sin(i/10*Math.PI);rail+=`<path d="M${x} ${n(y)}v52" stroke="#091523" stroke-width="5"/><circle cx="${x}" cy="${n(y-3)}" r="2.4" fill="#e5b57e" opacity=".65"/>`;}
    return svg(h,`<defs>
      <linearGradient id="g2-sky" x2="0" y2="1"><stop stop-color="#050a1a"/><stop offset=".55" stop-color="#121c39"/><stop offset="1" stop-color="#263a55"/></linearGradient>
      <linearGradient id="g2-lake" x2="0" y2="1"><stop stop-color="#18253d"/><stop offset=".45" stop-color="#0c1b30"/><stop offset="1" stop-color="#050b18"/></linearGradient>
      <radialGradient id="g2-aura"><stop stop-color="#847db8" stop-opacity=".15"/><stop offset="1" stop-color="#8179b2" stop-opacity="0"/></radialGradient>
      <linearGradient id="g2-haze" x2="0" y2="1"><stop stop-color="#9193c1" stop-opacity=".15"/><stop offset="1" stop-color="#8897c4" stop-opacity="0"/></linearGradient>
      <mask id="g2-crescent"><rect width="400" height="${h}" fill="black"/><circle cx="327" cy="${n(h*.15)}" r="17" fill="white"/><circle cx="333" cy="${n(h*.15-5)}" r="16" fill="black"/></mask>
    </defs>
    <path d="M0 0H400V${h}H0Z" fill="url(#g2-sky)"/>
    <ellipse cx="280" cy="${n(h*.57)}" rx="280" ry="${n(h*.34)}" fill="url(#g2-aura)"/>
    ${starfield(34,77,18,water-58,true)}
    <circle cx="327" cy="${n(h*.15)}" r="23" fill="#ecd9b9" opacity=".85" mask="url(#g2-crescent)"/>
    <g class="coded-cloud coded-cloud-b" fill="#9bafce" opacity=".045"><path d="M-25 ${n(h*.48)}q96 -25 154 -3t144 -8q-60 25 -133 13t-165 -2Z"/></g>
    <path d="M0 ${n(water-5)}V${n(water-27)}q53 -41 103 -17t78 1t100 -6t119 -20V${n(water+5)}Z" fill="#16243d"/>
    <path d="M0 ${n(water+2)}V${n(water-11)}q61 -21 109 -4t114 -4t177 -10V${n(water+12)}Z" fill="#0b192c"/>
    ${village(43,water-1,'#091526')}
    <g transform="translate(303 ${n(water-25)})" fill="#080f22"><path d="M-5 23V4H36V23ZM-14 4Q5 2 15 -13Q25 2 45 4L39 8H-8Z"/><path d="M14 -14v-9h2v9M4 5v18M26 5v18" stroke="#080f22" stroke-width="3"/><path d="M8 10h5v7H8Zm12 0h5v7h-5Z" fill="#d7a975" opacity=".7"/></g>
    <path d="M0 ${n(water)}H400V${h}H0Z" fill="url(#g2-lake)"/>
    <path d="M0 ${n(water-4)}H400V${n(water+45)}H0Z" fill="url(#g2-haze)"/>
    <g class="coded-waterlight">${ripples(52,water+4,h-21,325,'#9cb5d4',.75)}${ripples(81,water+2,h*.86,65,'#d8ae8e',.5)}</g>
    <g fill="none" stroke="#708cb9" stroke-width=".65" opacity=".15"><path d="M-8 ${n(h*.82)}q74 -5 158 0t266 0M24 ${n(h*.88)}q130 -7 235 0t158 -3M-40 ${n(h*.94)}q128 -8 267 0t190 -2"/></g>
    <path d="M-10 ${n(h-6)}Q200 ${n(h-65)} 410 ${n(h-6)}V${h}H0Z" fill="#060d19"/>
    ${rail}<path d="M-12 ${n(h-54)}Q200 ${n(h-106)} 412 ${n(h-54)}" fill="none" stroke="#0b1728" stroke-width="8"/><path d="M-12 ${n(h-58)}Q200 ${n(h-110)} 412 ${n(h-58)}" fill="none" stroke="#7b6e71" stroke-opacity=".28" stroke-width="1.3"/>`);
  }
  function houseLantern(x,drop,delay){
    // Keep the swing pivot at the actual hook on the beam, above the glow.
    return `<g class="coded-house-lantern" style="--delay:${delay}s;transform-origin:${x}px 72px"><g transform="translate(${x} 72)">
      <path d="M0 0V${drop}" stroke="#eac48a" stroke-width="1.2"/>
      <g transform="translate(0 ${drop})">
        <ellipse cy="27" rx="48" ry="71" fill="url(#g3-light)"/>
        <path d="M0 -8c-4 0-4 7 0 7s4-7 0-7" fill="none" stroke="#f4d592" stroke-width="1.2"/>
        <rect x="-12" y="-1" width="24" height="5" rx="1.5" fill="url(#g3-gold)"/>
        <path d="M-11 4C-30 13-30 41-12 51H12C30 41 30 13 11 4Z" fill="url(#g3-lantern)" stroke="#e9b966" stroke-width=".8"/>
        <g fill="none" stroke="#f9d886" stroke-width=".8" opacity=".65"><path d="M-7 4C-18 16-18 40-7 51M7 4C18 16 18 40 7 51M0 4V51M-23 19Q0 25 23 19M-23 36Q0 42 23 36"/></g>
        <ellipse cy="26" rx="9" ry="14" fill="#ffefac" opacity=".16"/>
        <path d="M-5 27q-4-5 0-7q3-2 5 2q2-4 5-2q4 2 0 7q-5 5-10 0Z" fill="none" stroke="#fff0b8" stroke-width="1.1"/>
        <path d="M-15 11q-5 5-5 12" stroke="#fff1be" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
        <rect x="-11" y="50" width="22" height="5" rx="1.5" fill="url(#g3-gold)"/>
        <path d="M0 55v10m-5 1v15m2.5-15v19M0 65v21m2.5-20v19M5 66v15" stroke="#f0c47c" stroke-width="1.2"/>
        <path d="M0 60l3 4-3 4-3-4Z" fill="#f7daa0"/>
      </g>
    </g></g>`;
  }
  function reunionHouse(h){
    const floor=h*.765,wr=Math.min(109,h*.15),wy=Math.min(floor-wr-20,Math.max(h*.57,440));
    let boards='',rafters='';
    for(let i=0;i<8;i++){
      const y=floor+(h-floor)*(i/8)**1.6;
      boards+=`<path d="M20 ${n(y)}H380" stroke="#edaa76" stroke-opacity=".1"/>`;
    }
    for(let i=-2;i<8;i++){const x=i*80;boards+=`<path d="M${n(200+(x-200)*.4)} ${n(floor)}L${x} ${h}" stroke="#370c14" stroke-opacity=".3"/>`;}
    for(let i=0;i<10;i++){const x=i*46;rafters+=`<path d="M${x-24} 0L${x+20} 59" stroke="#220810" stroke-width="7"/><path d="M${x-20} 0L${x+24} 59" stroke="#f2b979" stroke-width=".7" opacity=".19"/>`;}
    return svg(h,`<defs>
      <radialGradient id="g3-wall" cx="50%" cy="43%" r="74%"><stop stop-color="#b94a42"/><stop offset=".48" stop-color="#992b36"/><stop offset="1" stop-color="#4d1023"/></radialGradient>
      <linearGradient id="g3-floor" x2="0" y2="1"><stop stop-color="#762936"/><stop offset=".52" stop-color="#54202b"/><stop offset="1" stop-color="#280e1b"/></linearGradient>
      <linearGradient id="g3-wood" x2="1" y2="0"><stop stop-color="#2e1018"/><stop offset=".26" stop-color="#6f2f2c"/><stop offset=".5" stop-color="#80402f"/><stop offset=".72" stop-color="#582127"/><stop offset="1" stop-color="#2c0b16"/></linearGradient>
      <linearGradient id="g3-gold" x2="0" y2="1"><stop stop-color="#fff0b8"/><stop offset=".45" stop-color="#d6a75e"/><stop offset="1" stop-color="#946136"/></linearGradient>
      <linearGradient id="g3-night" x2="0" y2="1"><stop stop-color="#142443"/><stop offset=".6" stop-color="#2b5369"/><stop offset="1" stop-color="#6d8b87"/></linearGradient>
      <radialGradient id="g3-lantern" cx="47%" cy="40%" r="66%"><stop stop-color="#ffe391"/><stop offset=".3" stop-color="#ed9c53"/><stop offset=".65" stop-color="#d65a3d"/><stop offset="1" stop-color="#861d30"/></radialGradient>
      <radialGradient id="g3-light"><stop stop-color="#ffd990" stop-opacity=".32"/><stop offset=".4" stop-color="#ffba69" stop-opacity=".12"/><stop offset="1" stop-color="#ffbe75" stop-opacity="0"/></radialGradient>
      <radialGradient id="g3-window-light"><stop stop-color="#ccdcca" stop-opacity=".14"/><stop offset="1" stop-color="#dfdbb3" stop-opacity="0"/></radialGradient>
      <linearGradient id="g3-beam" x2="0" y2="1"><stop stop-color="#eff0ca" stop-opacity=".1"/><stop offset="1" stop-color="#eed5af" stop-opacity="0"/></linearGradient>
      <clipPath id="g3-window"><circle cx="200" cy="${n(wy)}" r="${wr}"/></clipPath>
    </defs>
    <path d="M0 0H400V${h}H0Z" fill="url(#g3-wall)"/>
    <rect x="31" y="91" width="338" height="${n(floor-107)}" rx="3" fill="none" stroke="#f0bf82" stroke-opacity=".18"/>
    <path d="M37 122V98H62M363 122V98H338M37 ${n(floor-44)}v22h25M363 ${n(floor-44)}v22h-25" fill="none" stroke="#edc58b" stroke-opacity=".4" stroke-width="1.5"/>
    <path d="M76 93V${n(floor-16)}M324 93V${n(floor-16)}" stroke="#f9c388" stroke-opacity=".06"/>
    <ellipse cx="200" cy="${n(wy)}" rx="177" ry="${wr*1.75}" fill="url(#g3-window-light)"/>
    <circle cx="200" cy="${n(wy+7)}" r="${wr+13}" fill="#300f20" opacity=".36"/>
    <g clip-path="url(#g3-window)"><rect x="70" y="${n(wy-wr)}" width="260" height="${wr*2}" fill="url(#g3-night)"/>
      ${starfield(63,24,wy-wr,wy+wr*.2,true)}${moon('g3',239,n(wy-wr*.38),28)}
      <g fill="none" stroke="#d7e6d7" stroke-linecap="round" opacity=".16"><path d="M98 ${n(wy-12)}q31 -8 67 -2M223 ${n(wy+8)}q30 -5 62 1" stroke-width="2"/><path d="M124 ${n(wy-6)}h40M256 ${n(wy+14)}h38" stroke-width=".8"/></g>
      <path d="M73 ${n(wy+wr*.55)}q40 -52 90 -24t73 -9t91 -9V${n(wy+wr)}H73Z" fill="#284a54"/>
      <path d="M70 ${n(wy+wr*.8)}q63 -32 131 -11t131 -13V${n(wy+wr)}H70Z" fill="#183a40"/>
      <path d="M107 ${n(wy+wr)}q7 -53 2 -101m1 38q-24 -23-23-40m24 31q17-23 23-24" fill="none" stroke="#173539" stroke-width="2"/>
      <g fill="#173539"><path d="M109 ${n(wy+25)}q-23-4-29-18q24 2 29 18M113 ${n(wy+13)}q22-6 26-22q-21 6-26 22M105 ${n(wy+2)}q-16-3-19-18q19 7 19 18"/></g>
      <path d="M200 ${n(wy-wr)}V${n(wy+wr)}M${200-wr} ${n(wy+wr*.45)}H${200+wr}" stroke="#6b3932" stroke-width="5"/>
      <path d="M198 ${n(wy-wr)}V${n(wy+wr)}M${200-wr} ${n(wy+wr*.45-2)}H${200+wr}" stroke="#e0bd85" stroke-opacity=".45" stroke-width="1"/>
    </g>
    <circle cx="200" cy="${n(wy)}" r="${wr+5}" fill="none" stroke="#572330" stroke-width="11"/>
    <circle cx="200" cy="${n(wy)}" r="${wr+10}" fill="none" stroke="url(#g3-gold)" stroke-width="1.5"/>
    <circle cx="200" cy="${n(wy)}" r="${wr+5}" fill="none" stroke="#e8b87e" stroke-opacity=".6" stroke-width="1.4" stroke-dasharray="1 6"/>
    <circle cx="200" cy="${n(wy)}" r="${wr-.5}" fill="none" stroke="#e7b781" stroke-opacity=".8" stroke-width="1.5"/>
    <path d="M${190-wr} ${n(wy+wr+15)}H${210+wr}" stroke="#40121f" stroke-width="8" stroke-linecap="round"/><path d="M${188-wr} ${n(wy+wr+11)}H${212+wr}" stroke="#c69264" stroke-width="1.3"/>
    <path d="M0 ${n(floor)}H400V${h}H0Z" fill="url(#g3-floor)"/>
    ${boards}
    <path d="M129 ${n(floor)}H271L351 ${h}H49Z" fill="url(#g3-beam)"/>
    <path d="M20 ${n(floor-10)}H380V${n(floor+2)}H20Z" fill="#4b1622"/><path d="M20 ${n(floor-10)}H380" stroke="#dba776" stroke-opacity=".45"/>
    <ellipse cx="200" cy="${n(h*.853)}" rx="145" ry="${n(h*.05)}" fill="#d79a70" opacity=".13"/>
    <ellipse cx="200" cy="${n(h*.853)}" rx="140" ry="${n(h*.045)}" fill="none" stroke="#eac692" stroke-opacity=".13"/>
    <path d="M0 0H400V66H0Z" fill="#3a121c"/>${rafters}
    <path d="M0 55Q200 38 400 55V78Q200 64 0 78Z" fill="url(#g3-wood)"/><path d="M20 72Q200 60 380 72" fill="none" stroke="#e2af71" stroke-opacity=".7" stroke-width="1.2"/>
    <path d="M0 0H21V${h}H0ZM379 0H400V${h}H379Z" fill="url(#g3-wood)"/>
    <path d="M19 79V${h}M381 79V${h}" stroke="#dcb17d" stroke-opacity=".6"/><path d="M7 81V${h}M393 81V${h}" stroke="#f7c895" stroke-opacity=".12"/>
    <g fill="none" stroke="#e6ba7c" stroke-width="1.1" opacity=".7"><path d="M24 82h35v9H34v26H24ZM376 82h-35v9h25v26h10Z"/></g>
    ${houseLantern(47,35,-1.2)}${houseLantern(353,43,-3.9)}
    <path d="M0 ${h-9}H400V${h}H0Z" fill="#2e0d19"/><path d="M21 ${h-9}H379" stroke="#d2a477" stroke-opacity=".35"/>`);
  }
  const scenes={0:moonlitLanding,1:lanternSky,2:fireworksLake,3:reunionHouse};
  let lastSize='';
  const sceneSizes=new Map();
  window.GiftBackgrounds={
    markup(scene,width=400,height=840){return scenes[scene](400*height/Math.max(width,1));},
    renderScene(scene,width,height){
      if(width<=0||height<=0)return;
      const el=document.querySelector(`[data-gift-background="${scene}"]`),size=`${width}:${height}`;
      if(!el||sceneSizes.get(scene)===size)return;
      el.innerHTML=this.markup(scene,width,height);sceneSizes.set(scene,size);
    },
    render(width,height){
      if(width<=0||height<=0)return;
      const size=`${width}:${height}`;if(size===lastSize)return;lastSize=size;
      document.querySelectorAll('[data-gift-background]').forEach(el=>{
        el.innerHTML=this.markup(Number(el.dataset.giftBackground),width,height);
      });
    }
  };
})();
