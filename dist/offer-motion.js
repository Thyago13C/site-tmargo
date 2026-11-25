/* Liquid aurora: slow organic morphing and sparse, gently drifting particles. */
(() => {
  const visual = document.querySelector('.offer-visual');
  const shape = visual?.querySelector('.offer-liquid-shape');
  const canvas = visual?.querySelector('.offer-particles');
  const ctx = canvas?.getContext('2d');
  if (!shape || !ctx) return;

  // Each silhouette shares seven cubic segments, so transitions never cross-fade.
  const initial = shape.getAttribute('d');
  const forms = [initial,
    // Compact, softly squared, rounded shape with a shallow upper hollow.
    'M99 198C98 153 129 118 174 118C218 118 226 149 257 128C293 105 353 113 381 152C411 194 400 243 358 265C317 290 285 288 249 292C198 303 151 287 122 259C105 241 100 216 99 198Z',
    // A fuller, almost circular shape with a little liquid asymmetry.
    'M136 192C136 145 152 105 187 83C223 61 257 62 291 83C328 108 347 142 355 184C367 228 345 272 317 298C285 328 257 337 218 324C176 311 151 290 137 257C125 229 130 211 136 192Z',
    // Rounded pebble, with a soft indentation along the lower edge.
    'M109 198C106 155 134 127 170 111C210 94 247 91 286 108C333 126 368 150 378 194C389 243 358 279 317 298C277 316 266 267 232 277C195 289 151 310 128 264C111 239 108 220 109 198Z',
    // Round-topped, broad-bottomed droplet. The direction stays fixed.
    'M120 196C126 148 161 126 188 101C224 68 260 72 296 102C329 130 352 169 368 206C387 248 351 286 315 301C279 316 251 320 215 310C172 300 134 288 117 256C104 231 115 216 120 196Z'
  ];
  const values = forms.map(d => d.match(/-?\d+(?:\.\d+)?/g).map(Number));
  const format = v => `M${v[0]} ${v[1]}` + Array.from({length:7}, (_, i) => `C${v.slice(2+i*6,8+i*6).join(' ')}`).join('') + 'Z';
  const color = ['#65bfc8','#6d9fdf','#7f8ade','#8b70dc','#b28ce8'];
  const TAU = Math.PI * 2;
  const random = (() => { let n=701; return () => ((n=Math.imul(n,1664525)+1013904223|0)>>>0)/4294967296; })();
  const particles = Array.from({length:220}, () => ({
    edge:random(), phase:random()*TAU, speed:.20+random()*.23,
    offset:7+Math.pow(random(),1.35)*58, size:.62+Math.pow(random(),1.6)*1.12,
    sway:5+random()*15, opacity:.40+random()*.30, color:color[Math.floor(random()*color.length)]
  }));
  const samples=112;
  const hover = matchMedia('(prefers-reduced-motion: reduce)');
  let visible=false, raf=0, last=0, elapsed=0;

  function draw(t) {
    const stage=t/7.4;
    const i=Math.floor(stage)%forms.length, j=(i+1)%forms.length;
    const u=stage%1, ease=.5-.5*Math.cos(Math.PI*u);
    // Corresponding points retain the same orientation across all silhouettes.
    // No angle, rotation, spin or changing perspective is applied.
    const v=values[i].map((x,k)=>Math.round((x+(values[j][k]-x)*ease)*10)/10);
    shape.setAttribute('d', format(v));
    const length=shape.getTotalLength();
    const contour=Array.from({length:samples},(_,k)=>shape.getPointAtLength(length*k/samples));
    const centroid=contour.reduce((a,p)=>[a[0]+p.x/samples,a[1]+p.y/samples],[0,0]);
    ctx.setTransform(2,0,0,2,0,0);
    ctx.clearRect(0,0,500,400);
    for(const p of particles){
      // Local, independently drifting wisps: no full circular or radial current.
      // Each particle follows its changing patch of the contour and meanders,
      // fading into the surrounding white space and drawing back toward the edge.
      const travel=(p.edge+.028*Math.sin(t*p.speed+p.phase)+.016*Math.sin(t*.21-p.phase)+1)%1;
      const fraction=travel*samples;
      const k=Math.floor(fraction), next=(k+1)%samples;
      const a=contour[k],b=contour[next], f=fraction-k;
      const x=a.x+(b.x-a.x)*f,y=a.y+(b.y-a.y)*f;
      const tx=b.x-a.x,ty=b.y-a.y,mag=Math.hypot(tx,ty)||1;
      let nx=ty/mag,ny=-tx/mag;
      if(nx*(x-centroid[0])+ny*(y-centroid[1])<0){nx=-nx;ny=-ny;}
      const fold=.5+.5*Math.sin(p.edge*TAU*2+.9*Math.sin(t*.24));
      const drift=p.offset*(.82+.32*Math.sin(t*p.speed+p.phase)) + p.sway*.62*Math.sin(t*.31+p.phase+travel*TAU);
      const wave=p.sway*.75*Math.cos(t*.38+p.phase);
      const positionX=x+nx*drift+tx/mag*wave,positionY=y+ny*drift+ty/mag*wave;
      // Broken, feathery clusters instead of a continuous ring. Opacity melts
      // away toward the outside and gently varies as the shape breathes.
      const density=.32+.68*Math.pow(fold,1.5);
      const fade=Math.max(.10,1-Math.max(0,drift)/85);
      const alpha=p.opacity*density*fade*(.68+.32*Math.sin(t*.24+p.phase)**2);
      ctx.globalAlpha=alpha;
      ctx.fillStyle=p.color;
      ctx.beginPath();ctx.arc(positionX,positionY,p.size*(.91+.09*Math.sin(t*.3+p.phase)),0,TAU);ctx.fill();
    }
    ctx.globalAlpha=1;
  }
  function tick(now){
    if(!visible||document.hidden||hover.matches){raf=0;last=0;return;}
    if(!last)last=now;
    const dt=now-last;
    if(dt>=30){elapsed+=Math.min(dt,80)/1000;draw(elapsed);last=now;}
    raf=requestAnimationFrame(tick);
  }
  function update(){
    if(!visible||document.hidden||hover.matches){
      if(raf)cancelAnimationFrame(raf);raf=0;last=0;
      if(hover.matches){shape.setAttribute('d',initial);ctx.clearRect(0,0,500,400);}
    }else if(!raf){raf=requestAnimationFrame(tick);}
  }
  if('IntersectionObserver' in window){new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();}).observe(visual);}
  else{visible=true;update();}
  document.addEventListener('visibilitychange',update);
  hover.addEventListener?.('change',update);
})();
