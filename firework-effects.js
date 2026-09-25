/* One greeting made of sparks, plus bounded, reusable Web Audio fireworks. */
(() => {
  'use strict';
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  const TAU=Math.PI*2;

  function makeGreetingParticles(){
    const mask=document.createElement('canvas');mask.width=480;mask.height=204;
    const ctx=mask.getContext('2d',{willReadFrequently:true});
    ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='700 62px Arial, "DejaVu Sans", sans-serif';
    ctx.fillText('TRUNG THU',240,76);
    // Draw the hook accent separately so local fallback fonts cannot drop Ẻ.
    const line='VUI VE',metrics=ctx.measureText(line);
    ctx.fillText(line,240,168);
    const hookX=240+metrics.width/2-ctx.measureText('E').width*.5;
    const hookY=168-(metrics.actualBoundingBoxAscent||46)-11;
    ctx.strokeStyle='#fff';ctx.lineWidth=4.8;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(hookX-4,hookY-3);
    ctx.bezierCurveTo(hookX-1,hookY-8,hookX+7,hookY-6,hookX+7,hookY-1);
    ctx.bezierCurveTo(hookX+7,hookY+3,hookX+1,hookY+3,hookX+1,hookY+7);ctx.stroke();
    const image=ctx.getImageData(0,0,mask.width,mask.height).data;
    let points=[],step=4;
    do{
      points=[];
      for(let y=2;y<mask.height;y+=step)for(let x=2;x<mask.width;x+=step){
        const px=Math.floor(x),py=Math.floor(y);
        if(image[(py*mask.width+px)*4+3]<135)continue;
        points.push({x:(x-240)/480*.9,y:(y-102)/480*.9});
      }
      step+=.3;
    }while(points.length>650);
    return points.map(p=>({...p,delay:Math.random()*.16,phase:Math.random()*TAU,
      drift:(Math.random()-.5)*.2,fall:.14+Math.random()*.15,
      size:.85+Math.random()*.35,tone:Math.random()>.78?1:0}));
  }

  function makeSpark(color){
    const sprite=document.createElement('canvas');sprite.width=sprite.height=20;
    const ctx=sprite.getContext('2d'),g=ctx.createRadialGradient(10,10,0,10,10,10);
    g.addColorStop(0,'#fffdf0');g.addColorStop(.16,'#fff7d7');g.addColorStop(.32,color);
    g.addColorStop(.55,color+'5c');g.addColorStop(1,color+'00');
    ctx.fillStyle=g;ctx.fillRect(0,0,20,20);return sprite;
  }

  function createGreeting(reduced=false){
    const sprites=[makeSpark('#ffcd76'),makeSpark('#fff1c1')];
    let phase='idle',began=0,burstAt=0,pausedAt=null,points=null;
    return {
      get busy(){return phase==='rocket'||phase==='letters'},
      get phase(){return phase},
      start(t){phase='waiting';began=t;burstAt=0;pausedAt=null;if(!points)points=makeGreetingParticles()},
      cancel(){phase='idle';pausedAt=null},
      pause(t){if(phase!=='idle'&&pausedAt===null)pausedAt=t},
      resume(t){if(pausedAt!==null){const gap=Math.max(0,t-pausedAt);began+=gap;burstAt+=gap;pausedAt=null}},
      launchDue(t){if(phase!=='waiting'||pausedAt!==null||t-began<4400)return false;phase='rocket';return true},
      burst(t){if(phase!=='rocket')return false;phase='letters';burstAt=t;return true},
      draw(ctx,t,w,h){
        if(phase!=='letters'||pausedAt!==null)return false;
        const age=(t-burstAt)/1000,duration=reduced?3.6:5.35;
        if(age>=duration){phase='done';return true}
        const dissolve=reduced?0:clamp((age-3.55)/1.8,0,1),cx=w*.5,cy=h*.35;
        ctx.save();ctx.globalCompositeOperation='lighter';
        for(const p of points){
          const progress=reduced?1:clamp((age-p.delay)/1.06,0,1);
          if(progress===0)continue;
          const spread=1-Math.pow(1-progress,3),curl=reduced?0:Math.sin(progress*Math.PI)*(1-progress)*.13;
          const x=cx+w*(p.x*spread+Math.sin(p.phase)*curl+p.drift*dissolve);
          const y=cy+w*(p.y*spread+Math.cos(p.phase)*curl+p.fall*dissolve*dissolve);
          const alpha=reduced?.9:Math.min(1,progress*6)*(1-dissolve)**1.35*(.82+.12*Math.sin(age*3+p.phase));
          const size=Math.max(4.4,w*.0155)*p.size*(1-dissolve*.38);
          ctx.globalAlpha=alpha;ctx.drawImage(sprites[p.tone],x-size/2,y-size/2,size,size);
          if(!reduced&&dissolve>.04&&p.tone===1){
            ctx.strokeStyle='#ffcf86';ctx.globalAlpha=alpha*.35;ctx.lineWidth=.75;
            ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-p.drift*w*.05,y-p.fall*w*dissolve*.055);ctx.stroke();
          }
        }
        ctx.restore();return false;
      }
    };
  }

  let audio=null;
  const voices=new Set();
  function stopSounds(){for(const voice of [...voices])voice.stop()}
  function prepareAudio(ctx,destination){
    if(audio?.ctx===ctx&&audio.destination===destination)return audio;
    stopSounds();if(audio)audio.compressor.disconnect();
    const length=Math.ceil(ctx.sampleRate*2),boom=ctx.createBuffer(1,length,ctx.sampleRate),crackle=ctx.createBuffer(1,length,ctx.sampleRate);
    const body=boom.getChannelData(0),pops=crackle.getChannelData(0);let brown=0,pulse=0;
    for(let i=0;i<length;i++){
      const white=Math.random()*2-1;brown=(brown+.05*white)/1.02;
      body[i]=clamp(white*.7+brown*.9,-1,1);
      if(i>ctx.sampleRate*.1&&Math.random()<.00055)pulse=.3+Math.random()*.7;
      pulse*=.955;pops[i]=white*pulse;
    }
    const compressor=ctx.createDynamicsCompressor();
    compressor.threshold.value=-16;compressor.knee.value=12;compressor.ratio.value=4;
    compressor.attack.value=.003;compressor.release.value=.2;compressor.connect(destination);
    audio={ctx,destination,boom,crackle,compressor};return audio;
  }
  function playExplosion(ctx,destination,{small=false,celebration=false,pan=0}={}){
    if(!ctx||ctx.state!=='running'||!destination)return;
    const state=prepareAudio(ctx,destination);
    if(voices.size>=5)voices.values().next().value.stop();
    const now=ctx.currentTime,life=small?.52:celebration?1.65:1.35;
    const master=ctx.createGain(),noise=ctx.createBufferSource(),noiseFilter=ctx.createBiquadFilter(),noiseGain=ctx.createGain();
    const bass=ctx.createOscillator(),bassGain=ctx.createGain(),tail=ctx.createBufferSource(),tailFilter=ctx.createBiquadFilter(),tailGain=ctx.createGain();
    const panner=typeof ctx.createStereoPanner==='function'?ctx.createStereoPanner():null;
    master.gain.value=small?.2:celebration?.76:.63;
    if(panner){panner.pan.value=clamp(pan,-.65,.65);master.connect(panner).connect(state.compressor)}
    else master.connect(state.compressor);
    noise.buffer=state.boom;noise.playbackRate.value=.93+Math.random()*.17;
    noiseFilter.type='lowpass';noiseFilter.frequency.setValueAtTime(small?3200:2600,now);
    noiseFilter.frequency.exponentialRampToValueAtTime(small?750:220,now+life*.8);
    noiseGain.gain.setValueAtTime(.0001,now);noiseGain.gain.exponentialRampToValueAtTime(.85,now+.006);
    noiseGain.gain.exponentialRampToValueAtTime(.15,now+.1);noiseGain.gain.exponentialRampToValueAtTime(.0001,now+life);
    noise.connect(noiseFilter).connect(noiseGain).connect(master);
    bass.type='sine';bass.frequency.setValueAtTime(small?190:135+Math.random()*30,now);
    bass.frequency.exponentialRampToValueAtTime(small?105:48,now+.18);
    bassGain.gain.setValueAtTime(.0001,now);bassGain.gain.exponentialRampToValueAtTime(small?.07:.24,now+.009);
    bassGain.gain.exponentialRampToValueAtTime(.0001,now+life*.7);
    bass.connect(bassGain).connect(master);
    tail.buffer=state.crackle;tail.playbackRate.value=.95+Math.random()*.1;
    tailFilter.type='highpass';tailFilter.frequency.value=1500;
    tailGain.gain.setValueAtTime(.0001,now);tailGain.gain.linearRampToValueAtTime(small?.15:.48,now+.13);
    tailGain.gain.exponentialRampToValueAtTime(.0001,now+life);
    tail.connect(tailFilter).connect(tailGain).connect(master);
    const sources=[noise,bass,tail],nodes=[master,noise,noiseFilter,noiseGain,bass,bassGain,tail,tailFilter,tailGain,panner].filter(Boolean);
    let remaining=sources.length,stopped=false;
    const voice={stop(){
      if(stopped)return;stopped=true;voices.delete(voice);
      const at=ctx.currentTime;master.gain.cancelScheduledValues(at);master.gain.setTargetAtTime(.0001,at,.008);
      for(const source of sources){try{source.stop(at+.04)}catch{}}
    }};
    for(const source of sources){
      source.onended=()=>{if(--remaining===0){voices.delete(voice);nodes.forEach(node=>node.disconnect())}};
      source.start(now);source.stop(now+life+.02);
    }
    voices.add(voice);
  }
  window.FireworkEffects={createGreeting,playExplosion,stopSounds};
})();
