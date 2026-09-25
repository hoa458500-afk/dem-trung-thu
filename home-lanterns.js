/* Three illuminated paper cutout lanterns, drawn entirely in SVG.
   Static paths and gradients are rendered once; CSS moves the hanging pieces.
   No image requests, SVG filters, per-frame drawing, or extra animation loop. */
(() => {
  'use strict';

  function drawing(kind, definitions, body) {
    return `<svg class="home-lantern-svg home-lantern-${kind}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 246" width="180" height="246" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="hl-${kind}-gold" x2="0" y2="1"><stop stop-color="#fff2b9"/><stop offset=".48" stop-color="#eeb849"/><stop offset="1" stop-color="#b96a25"/></linearGradient>
        <radialGradient id="hl-${kind}-paper" cx="43%" cy="39%" r="72%"><stop stop-color="#fffdf0"/><stop offset=".6" stop-color="#fff1cb"/><stop offset="1" stop-color="#e8bd79"/></radialGradient>
        ${definitions}
      </defs>
      ${body}
    </svg>`;
  }

  function lion() {
    return drawing('lion', `
      <radialGradient id="hl-lion-red" cx="46%" cy="37%" r="72%"><stop stop-color="#ff9860"/><stop offset=".43" stop-color="#f45036"/><stop offset="1" stop-color="#a6262b"/></radialGradient>
      <radialGradient id="hl-lion-eye"><stop stop-color="#846c59"/><stop offset=".6" stop-color="#34302f"/><stop offset="1" stop-color="#221d27"/></radialGradient>
      <linearGradient id="hl-lion-teal" x2="0" y2="1"><stop stop-color="#70d3b4"/><stop offset="1" stop-color="#237c81"/></linearGradient>`, `
      <path d="M90 0V16" stroke="#edbd70" stroke-width="1.8"/>
      <g stroke="#6b352c" stroke-width="2.7" stroke-linejoin="round" stroke-linecap="round">
        <path d="M70 163Q58 184 59 204L72 218H106L120 205Q122 183 110 162Z" fill="url(#hl-lion-red)"/>
        <path d="M77 170Q90 180 105 170L103 194Q91 205 78 194Z" fill="url(#hl-lion-gold)"/>
        <path d="M79 174L86 178V191L79 195M96 177L102 174V194L96 191" fill="url(#hl-lion-teal)" stroke-width="1.5"/>
        <path d="M86 177H95V197H86Z" fill="#fff0ba" stroke-width="1.5"/>
        <path d="M62 182Q49 181 44 194L49 201L60 198M117 182Q130 181 136 193L131 201L119 198" fill="url(#hl-lion-red)"/>
        <path d="M43 192q-5 3-1 7q-1 6 5 6q3 4 7 0q7 1 7-6l-5-8q-6-3-13 1M124 193q7-5 12-1q7 2 5 7q2 6-4 7q-5 4-8-1q-7 1-7-5Z" fill="url(#hl-lion-paper)"/>
        <path d="M63 207q-10 0-12 9q-4 7 4 10h23q8-5 4-12l-4-5M102 209q-7 5-4 14q5 5 13 3h13q7-3 4-10q-3-9-14-9" fill="url(#hl-lion-paper)"/>
        <path d="M61 218v6m8-6v6m42-6v6m8-7v7" fill="none" stroke-width="1.8"/>
        <path d="M90 168v39" fill="none" stroke="#fff2b4" stroke-width="1.3" opacity=".65"/>
        <path d="M31 79Q13 82 10 64Q7 61 11 56Q9 49 15 48Q16 40 23 42Q28 35 34 41Q43 38 47 48L49 70" fill="url(#hl-lion-paper)"/>
        <path d="M149 79q19 4 21-15q5-3 1-9q2-6-5-8q-2-8-9-5q-6-6-12 0q-9-2-12 8l-2 20" fill="url(#hl-lion-paper)"/>
        <path d="M30 67q-13 1-10-11q5-10 16-4M149 67q12 0 10-10q-5-11-16-5" fill="#e56d55" stroke-width="2"/>
        <path d="M25 100Q15 64 45 48Q59 32 84 36Q102 29 126 43Q157 50 159 88L153 132Q160 150 143 164Q123 177 91 173Q51 180 29 161Q16 148 25 129Z" fill="url(#hl-lion-red)"/>
        <path d="M31 93Q27 64 51 52Q69 40 82 42M103 40q36 2 46 30" fill="none" stroke="#ffcd80" stroke-width="2.2" opacity=".85"/>
        <path d="M79 37q-10-4-7-12q-2-7 5-9q3-7 10-3q5-6 10-1q8-1 9 7q6 5 1 12q-2 8-14 7Z" fill="url(#hl-lion-gold)"/>
        <path d="M87 16q-6 9-4 17M97 15q-5 10-4 18" fill="none" stroke="#bd782e" stroke-width="1.7"/>
        <path d="M91 43q5 0 6 6q9-2 10 6q0 6-8 7q-1 9-9 9q-7-1-7-9q-9-1-8-8q1-7 10-5q1-6 6-6Z" fill="url(#hl-lion-teal)" stroke="#fbdc86" stroke-width="2"/>
        <ellipse cx="54" cy="101" rx="25" ry="29" fill="url(#hl-lion-paper)"/>
        <ellipse cx="127" cy="101" rx="25" ry="29" fill="url(#hl-lion-paper)"/>
        <ellipse cx="58" cy="104" rx="17" ry="23" fill="url(#hl-lion-eye)" stroke-width="2"/>
        <ellipse cx="123" cy="104" rx="17" ry="23" fill="url(#hl-lion-eye)" stroke-width="2"/>
        <path d="M46 111q9 13 22-1M113 111q10 13 21-1" fill="none" stroke="#68b7ba" stroke-width="3.2"/>
        <g fill="#fffdf2" stroke="none"><ellipse cx="54" cy="95" rx="7" ry="9"/><ellipse cx="119" cy="95" rx="7" ry="9"/><circle cx="65" cy="110" r="3"/><circle cx="132" cy="110" r="3"/></g>
        <path d="M29 80q-10-10 0-18q5-5 11 0q6-5 12 2q7-2 12 7q11 1 13 15q0 7-7 7q-9-17-28-16q-8 1-13 3Z" fill="url(#hl-lion-paper)"/>
        <path d="M151 80q10-10 0-18q-5-5-11 0q-6-5-12 2q-7-2-12 7q-11 1-13 15q0 7 7 7q9-17 28-16q8 1 13 3Z" fill="url(#hl-lion-paper)"/>
        <path d="M73 117q17-14 35 0l-2 19H76Z" fill="#f5ad60"/>
        <ellipse cx="82" cy="121" rx="4" ry="3" fill="#6b352c" stroke="none"/><ellipse cx="100" cy="121" rx="4" ry="3" fill="#6b352c" stroke="none"/>
        <path d="M55 147q34 14 69-2q-5 27-33 26q-26 0-36-24Z" fill="#6b302c"/>
        <path d="M67 150v9l13 3v-10m21 0v10l13-4v-9" fill="url(#hl-lion-paper)" stroke-width="1.5"/>
        <path d="M31 122q-12-3-16 8q-6 13 7 20q22 14 48 1q11-6 20-11q12 9 26 13q22 7 39-4q13-9 5-20q-5-8-14-4q-15 9-34 5q-12-8-23 1q-9-8-21-2q-18 5-37-7Z" fill="url(#hl-lion-paper)"/>
        <path d="M29 139q20 9 38-2m48 1q19 8 34-2" fill="none" stroke="#d9ae72" stroke-width="1.5"/>
        <path d="M79 172l2 9l9-5l9 5l4-10" fill="url(#hl-lion-gold)" stroke-width="1.6"/>
      </g>
      <g fill="#fff4c2"><circle cx="56" cy="47" r="2"/><circle cx="120" cy="49" r="2"/><path d="M89 77l2 5l5 2l-5 2l-2 5l-2-5l-5-2l5-2Z"/></g>`);
  }

  function moon() {
    return drawing('moon', `
      <radialGradient id="hl-moon-face" cx="43%" cy="40%" r="70%"><stop stop-color="#fff5b2"/><stop offset=".56" stop-color="#f8d875"/><stop offset="1" stop-color="#e4aa44"/></radialGradient>
      <linearGradient id="hl-moon-cloak" x2="0" y2="1"><stop stop-color="#a4e0c4"/><stop offset="1" stop-color="#3ca69b"/></linearGradient>`, `
      <path d="M90 0V26" stroke="#edbd70" stroke-width="1.8"/>
      <path d="M84 29v-5a6 6 0 0 1 12 0v5" fill="none" stroke="#f4d994" stroke-width="2"/>
      <circle cx="90" cy="105" r="75" fill="url(#hl-moon-paper)" stroke="#bb8c53" stroke-width="1.5"/>
      <circle cx="90" cy="105" r="68" fill="url(#hl-moon-face)" stroke="#fff3b7" stroke-width="1.2"/>
      <g fill="#d6a441" opacity=".52"><circle cx="57" cy="72" r="8"/><circle cx="107" cy="73" r="13"/><circle cx="48" cy="110" r="12"/><circle cx="77" cy="134" r="7"/><circle cx="131" cy="105" r="5"/><circle cx="115" cy="142" r="15"/><circle cx="50" cy="145" r="4"/></g>
      <g fill="none" stroke="#fff3b0" stroke-width="2.2" opacity=".7"><path d="M49 69q-1 8 8 11M95 69q-3 13 10 17M36 106q-1 13 12 15M70 132q0 8 8 9"/></g>
      <path d="M28 89Q35 48 75 42M21 114q5 30 24 42" fill="none" stroke="#fffef0" stroke-width="2.3" stroke-linecap="round" opacity=".8"/>
      <g fill="#fff6d5" opacity=".82"><path d="M84 94l2 8l6 2l-6 2l-2 8l-2-8l-6-2l6-2Z"/><path d="M71 84l1 4l4 1l-4 1l-1 4l-1-4l-4-1l4-1Z"/><circle cx="111" cy="121" r="1.8"/></g>
      <g fill="none" stroke="#fff4cf" stroke-linecap="round"><path d="M119 88h43q-3-7-12-6q-4-10-13-4" stroke-width="2" opacity=".67"/><path d="M27 151h51q-4-6-13-4q-6-9-16-4" stroke-width="2" opacity=".8"/></g>
      <g stroke="#ad8055" stroke-linecap="round" stroke-linejoin="round">
        <path d="M47 199H144M57 195l-5 22m77-22l6 22M57 210h76" fill="none" stroke="#cca263" stroke-width="2.5"/>
        <path d="M61 191h71v9H61Z" fill="url(#hl-moon-gold)" stroke-width="1.3"/>
        <path d="M114 158q27 4 24 22q15-2 15 9q-1 10-22 9h-20" fill="url(#hl-moon-paper)" stroke-width="1.5"/>
        <path d="M107 151q-22 13-14 41q16 9 35 0q5-28-9-37" fill="url(#hl-moon-cloak)" stroke-width="1.5"/>
        <path d="M111 165q-6 16-3 30M113 166q6 17 3 30" fill="none" stroke="#ddf3cc" stroke-width="1.5"/>
        <path d="M105 129q-8-17-2-29q4-4 8 1q5 10 5 22M120 126q-3-19 4-28q5-4 8 2q2 14-3 28" fill="url(#hl-moon-paper)" stroke-width="1.6"/>
        <path d="M107 107l4 18m16-20l-2 19" stroke="#efb0a3" stroke-width="3.8"/>
        <path d="M98 126q12-12 26-4q14 5 12 18q-1 17-19 20q-17 3-24-9q-7-11 5-25Z" fill="url(#hl-moon-paper)" stroke-width="1.6"/>
        <path d="M101 139q3 4 6 0M123 138q3 4 6-1" fill="none" stroke="#74544a" stroke-width="1.8"/>
        <path d="M112 144l3 2l3-3m-3 3v3q3 2 5-1" fill="none" stroke="#a87866" stroke-width="1.2"/>
        <ellipse cx="101" cy="147" rx="4.5" ry="2.6" fill="#efb1a0" stroke="none"/><ellipse cx="128" cy="146" rx="4.5" ry="2.6" fill="#efb1a0" stroke="none"/>
        <path d="M126 158q9 2 5 14l-4 6" fill="none" stroke="#d8897a" stroke-width="7"/>
        <path d="M123 157q9 1 7 14l-4 7" fill="none" stroke="#f5beaa" stroke-width="4"/>
        <ellipse cx="104" cy="194" rx="11" ry="4.5" fill="url(#hl-moon-paper)" stroke-width="1.3"/>
        <path d="M104 163q-8 12-21 5" fill="none" stroke="#ad8055" stroke-width="9"/><path d="M104 163q-8 12-21 5" fill="none" stroke="#fff0d1" stroke-width="6"/>
        <path d="M80 158v35" fill="none" stroke-width="1.1"/>
        <path d="M69 170q11-7 22 0v15q-11 8-22 0Z" fill="#f3a06b" stroke-width="1.1"/>
        <path d="M72 170q8 3 16 0m-16 16q8-3 16 0M80 170v15M79 190v10" fill="none" stroke="#fff1bf" stroke-width="1.3"/>
        <path d="M76 199v7m4-8v10m4-9v7" stroke="#efc272" stroke-width="1.2"/>
      </g>`);
  }

  function rabbit() {
    return drawing('rabbit', `
      <linearGradient id="hl-rabbit-pink" x2="0" y2="1"><stop stop-color="#f8c4b8"/><stop offset="1" stop-color="#e9958e"/></linearGradient>
      <radialGradient id="hl-rabbit-cake" cx="42%" cy="38%" r="69%"><stop stop-color="#ffe5a0"/><stop offset=".56" stop-color="#eabe64"/><stop offset="1" stop-color="#bd7a31"/></radialGradient>`, `
      <path d="M90 0v15l-17 12m17-12l22 13" fill="none" stroke="#e1b36b" stroke-width="1.4"/>
      <g stroke="#ab845f" stroke-linecap="round" stroke-linejoin="round">
        <path d="M111 162q26-8 32 12q23 2 16 19q-5 12-25 8" fill="url(#hl-rabbit-paper)" stroke-width="2"/>
        <path d="M67 139q-24 15-24 45q0 27 38 32q40 4 53-17q11-24-21-52" fill="url(#hl-rabbit-paper)" stroke-width="2.2"/>
        <path d="M73 93Q48 76 48 37Q47 18 58 19Q75 20 82 80M97 84Q94 48 106 24Q113 10 122 21Q135 37 117 91" fill="url(#hl-rabbit-paper)" stroke-width="2.2"/>
        <path d="M65 75Q55 56 55 38Q55 27 61 29Q69 35 74 74Q73 84 65 75M104 73q-1-25 10-42q5-5 7 2q4 19-9 43q-7 7-8-3" fill="url(#hl-rabbit-pink)" stroke="none"/>
        <path d="M48 98Q57 77 83 81Q109 74 126 91Q146 105 138 126Q144 141 126 151Q109 164 86 160Q59 163 43 148Q29 139 35 123Q30 110 48 98Z" fill="url(#hl-rabbit-paper)" stroke-width="2.2"/>
        <path d="M76 84q4 7 8 8l4-8l5 7l6-8" fill="none" stroke="#ead4ad" stroke-width="1.3"/>
        <ellipse cx="67" cy="122" rx="5" ry="6.5" fill="#655044" stroke="none"/><ellipse cx="108" cy="121" rx="5" ry="6.5" fill="#655044" stroke="none"/>
        <g fill="#fffdf2" stroke="none"><circle cx="65.5" cy="119.5" r="1.9"/><circle cx="106.5" cy="118.5" r="1.9"/></g>
        <ellipse cx="52" cy="136" rx="8" ry="4.8" fill="#edb1a1" stroke="none" opacity=".83"/><ellipse cx="122" cy="135" rx="8" ry="4.8" fill="#edb1a1" stroke="none" opacity=".83"/>
        <path d="M83 131q4-4 8 0l-4 4Z" fill="#c18a7a" stroke="none"/>
        <path d="M87 135v4m0 0q-6 5-10 0m10 0q5 5 10-1" fill="none" stroke="#916958" stroke-width="1.5"/>
        <path d="M63 156q20 14 45-1l2 10q-29 11-49 0Z" fill="#e9b969" stroke-width="1.4"/>
        <path d="M98 163q16 5 27 1q-7 14-18 13l8 18l-11-1l-9-27" fill="#eb9c87" stroke-width="1.5"/>
        <ellipse cx="67" cy="213" rx="20" ry="8" fill="url(#hl-rabbit-paper)" stroke-width="1.7"/><ellipse cx="115" cy="213" rx="20" ry="8" fill="url(#hl-rabbit-paper)" stroke-width="1.7"/>
        <path d="M55 214v4m8-4v6m48-6v6m8-6v4" fill="none" stroke="#d1ae83" stroke-width="1.2"/>
        <path d="M85 166q6-6 12-1q8-1 11 5q9 2 10 10q7 6 2 13q2 9-6 13q-3 8-12 7q-6 6-14 2q-9 3-14-4q-9-1-10-10q-6-6-2-13q-1-9 7-13q4-8 12-7Z" fill="url(#hl-rabbit-cake)" stroke="#ba8137" stroke-width="2"/>
        <circle cx="91" cy="191" r="20" fill="none" stroke="#aa742e" stroke-width="1.3"/>
        <circle cx="91" cy="190" r="17" fill="none" stroke="#fff0b8" stroke-width="1.1"/>
        <path d="M91 177q8 4 5 10q7-3 10 4q-4 8-10 5q3 7-5 11q-8-4-5-11q-7 3-10-5q4-7 10-4q-3-7 5-10Z" fill="none" stroke="#b78035" stroke-width="1.5"/>
        <path d="M91 185l6 6l-6 6l-6-6Z" fill="#fce5a3" stroke="#b78035" stroke-width="1.2"/>
        <path d="M54 172q-8 0-7 12q2 13 16 10q9-2 8-8q-4-6-11-5M127 172q9 1 8 13q-2 12-15 9q-8-2-7-8q4-6 10-5" fill="url(#hl-rabbit-paper)" stroke-width="1.9"/>
      </g>
      <path d="M49 110q6-17 21-18" fill="none" stroke="#fffef0" stroke-width="2.4" stroke-linecap="round"/>
      <g fill="#fff1be"><path d="M146 96l2 7l6 2l-6 2l-2 7l-2-7l-6-2l6-2Z"/><path d="M28 171l1 4l4 1l-4 1l-1 4l-1-4l-4-1l4-1Z"/></g>`);
  }

  const artwork = {lion: lion(), moon: moon(), rabbit: rabbit()};
  window.HomeLanterns = Object.freeze({art: kind => artwork[kind] || ''});
})();
