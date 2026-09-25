/* Mooncake illustrations and the small opening flourish are all SVG/CSS. */
(() => {
  'use strict';
  const n=value=>Number(value.toFixed(2));
  function scallop(radius,depth,lobes){
    let path='';
    for(let i=0;i<=192;i++){
      const angle=i/192*Math.PI*2,r=radius+Math.cos(angle*lobes)*depth;
      path+=`${i?'L':'M'}${n(60+Math.cos(angle)*r)} ${n(52+Math.sin(angle)*r*.84)}`;
    }
    return path+'Z';
  }
  function petals(count,outer,inner,width){
    return Array.from({length:count},(_,i)=>`<path transform="rotate(${i*360/count})" d="M0 -${inner}C-${width} -${inner+5} -${width} -${outer-6} 0 -${outer}C${width} -${outer-6} ${width} -${inner+5} 0 -${inner}Z"/>`).join('');
  }
  function ringDots(count,radius){
    return Array.from({length:count},(_,i)=>{const angle=i/count*Math.PI*2;return `<circle cx="${n(Math.cos(angle)*radius)}" cy="${n(Math.sin(angle)*radius)}" r=".8"/>`;}).join('');
  }
  const palettes=[
    {edge:'#824017',side:'#b96825',light:'#f7cb71',top:'#f3bf62',middle:'#e4a043',rim:'#bd7526',ink:'#ad651e',shine:'#ffe3a1'},
    {edge:'#c09a80',side:'#dec2a8',light:'#fff7e8',top:'#fffaf0',middle:'#f4e5ce',rim:'#debaa2',ink:'#bd8c72',shine:'#fffdf5'},
    {edge:'#743817',side:'#a75220',light:'#e9a34b',top:'#f4c379',middle:'#d58a39',rim:'#a75722',ink:'#985021',shine:'#fce0a0'}
  ];
  function art(index){
    const c=palettes[index],id=`cake-${index}`,square=index===2;
    const face=square?'M30 15H90Q106 15 106 31V77Q106 92 90 92H30Q14 92 14 77V31Q14 15 30 15Z':scallop(45,index===1?2.8:1.5,index===1?8:16);
    const rim=square?'M32 22H88Q99 22 99 33V75Q99 85 88 85H32Q21 85 21 75V33Q21 22 32 22Z':scallop(38.5,.55,index===1?8:16);
    let grooves='';
    for(let i=0;i<13;i++){
      const angle=(i+.5)/13*Math.PI,x=60+Math.cos(angle)*44,y=52+Math.sin(angle)*44*.84;
      grooves+=square?`<path d="M${24+i*6} 92v8"/>`:`<path d="M${n(x)} ${n(y+1)}q1 5 0 10"/>`;
    }
    let engraving;
    if(index===0)engraving=`<circle r="32.5"/><g>${petals(8,28,8,7)}</g><circle r="7"/><circle r="3.4"/><g fill="currentColor" stroke="none">${ringDots(28,35)}</g>`;
    else if(index===1)engraving=`<g>${petals(8,30,13,8)}</g><g transform="rotate(22.5)">${petals(8,19,4,5)}</g><circle r="3"/><circle r="34" stroke-dasharray="1.3 3.4"/>`;
    else engraving=`<rect x="-31" y="-32" width="62" height="64" rx="7"/><path d="M-26 -22v-5h8v5h-4v6M26 -22v-5h-8v5h4v6M-26 22v5h8v-5h-4v-6M26 22v5h-8v-5h4v-6"/><g transform="rotate(45)">${petals(4,26,4,10)}</g><path d="M0 -8L8 0 0 8 -8 0Z"/><circle r="2"/>`;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" focusable="false">
      <defs>
        <linearGradient id="${id}-side" x2="0" y2="1"><stop stop-color="${c.side}"/><stop offset=".52" stop-color="${c.light}"/><stop offset="1" stop-color="${c.edge}"/></linearGradient>
        <radialGradient id="${id}-top" cx="33%" cy="22%" r="90%"><stop stop-color="${c.top}"/><stop offset=".65" stop-color="${c.middle}"/><stop offset="1" stop-color="${c.rim}"/></radialGradient>
        <linearGradient id="${id}-plate" x2="0" y2="1"><stop stop-color="#f8dd9f"/><stop offset="1" stop-color="#936d3d"/></linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="48" ry="6" fill="#5c341d" opacity=".15"/>
      <ellipse cx="60" cy="104" rx="53" ry="8" fill="url(#${id}-plate)"/>
      <ellipse cx="60" cy="102" rx="48" ry="5" fill="#fff0ca" opacity=".55"/>
      <path d="${face}" transform="translate(0 12)" fill="url(#${id}-side)" stroke="${c.edge}" stroke-width="1"/>
      <g fill="none" stroke="${c.edge}" stroke-opacity=".48" stroke-width="1.3">${grooves}</g>
      <path d="${face}" fill="url(#${id}-top)" stroke="${c.rim}" stroke-width="1.2"/>
      <path d="${rim}" fill="none" stroke="${c.ink}" stroke-opacity=".7" stroke-width="1.3"/>
      <path d="${rim}" transform="translate(0 -.9)" fill="none" stroke="${c.shine}" stroke-opacity=".72" stroke-width="1"/>
      <g transform="translate(60 53) scale(1 .84)" fill="none" color="${c.ink}" stroke="${c.ink}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${engraving}</g>
      <g transform="translate(60 51.9) scale(1 .84)" fill="none" color="${c.shine}" stroke="${c.shine}" stroke-opacity=".64" stroke-width=".7" stroke-linecap="round" stroke-linejoin="round">${engraving}</g>
      <path d="M26 32Q36 23 47 23" fill="none" stroke="${c.shine}" stroke-opacity=".35" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }
  function flourish(index){
    const particles=Array.from({length:14},(_,i)=>{
      const angle=i/14*Math.PI*2-Math.PI/2+index*.15,distance=i%2?.64:.72;
      return `<i class="cake-mote${i%4===0?' cake-petal':''}" style="--dx:${n(Math.cos(angle)*distance)};--dy:${n(Math.sin(angle)*distance)};--turn:${(i%2?-1:1)*(55+i*17)}deg;--delay:${i%5*42}ms;--mote-size:${i%4===0?7:2+i%3}px"></i>`;
    }).join('');
    return `<span class="cake-bloom cake-bloom-${index}" aria-hidden="true"><i class="cake-aura"></i><i class="cake-ripple"></i><span class="cake-orbit cake-orbit-a"><i></i></span><span class="cake-orbit cake-orbit-b"><i></i></span>${particles}<i class="cake-shimmer"></i></span>`;
  }
  window.Mooncakes={art,flourish};
})();
