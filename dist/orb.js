/* Original, softly shaded animated sphere. No external graphics or video. */
(() => {
  const canvas = document.querySelector('.orb-fluid');
  if (!canvas) return;
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) return;
  const orb = canvas.parentElement;
  // The soft gradient does not need a desktop-sized buffer on a small screen.
  const compact = matchMedia('(max-width: 800px)').matches;
  const size = compact ? 120 : 168;
  const frameInterval = compact ? 40 : 30;
  canvas.width = canvas.height = size;
  const frame = context.createImageData(size, size);
  const data = frame.data;
  const clamp = v => Math.max(0, Math.min(1, v));
  const smooth = (a,b,v) => { const n=clamp((v-a)/(b-a)); return n*n*(3-2*n); };
  const bell = v => Math.exp(-v*v);
  const mix = (a,b,v) => a+(b-a)*v;
  const coords = Array.from({length:size}, (_,i)=>(i+.5-size*.5)/(size*.5));
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const started = performance.now();
  let visible=true, raf=null, last=0;

  function draw(seconds) {
    const t = seconds * .3141592654;
    const rotation = t+.22*Math.sin(t*2);
    const c = Math.cos(rotation), s = Math.sin(rotation);
    const yaw = .68*Math.sin(t+.6), cy=Math.cos(yaw), sy=Math.sin(yaw);
    const pitch = .28*Math.cos(t*2-.5), cp=Math.cos(pitch), sp=Math.sin(pitch);
    const dx=.022*Math.sin(t*2), dy=.018*Math.cos(t*2+.5);
    const dentAngle=t*1.0+2.7;
    for(let row=0;row<size;row++) for(let col=0;col<size;col++){
      const k=(row*size+col)*4;
      const x=coords[col]-dx, y=-coords[row]-dy;
      const distance=Math.hypot(x,y);
      if(distance>1){data[k+3]=0;continue;}
      const angle=Math.atan2(y,x);
      const dent=Math.pow(Math.max(0,Math.cos(angle-dentAngle)),12);
      const radius=.815+.035*Math.sin(angle*3-t*2)+.028*Math.sin(angle*2+t*2+.7)-.085*dent;
      const edge=.037+.030*(.5+.5*Math.sin(angle+t+.4))+.035*dent;
      const alpha=1-smooth(radius-edge,radius+edge,distance);
      if(alpha<.001){data[k+3]=0;continue;}

      // Project an animated, subtly warped sphere onto the view plane.
      const px=x/radius,py=y/radius;
      const z=Math.sqrt(Math.max(0,1-px*px-py*py));
      const xr=px*c-py*s,yr=px*s+py*c;
      const a=xr*cy+z*sy,b=yr*cp-(-xr*sy+z*cy)*sp;
      const depth=yr*sp+(-xr*sy+z*cy)*cp;
      const ribbon=a+.40*Math.sin(b*2.0+.85*depth+t*.35)+.10*Math.sin(b*3.3-t);
      const blue=smooth(-.22,.83,ribbon+.13*b);
      const cyan=bell((ribbon+.24)/.47)*(.90+.10*Math.cos(b*1.8+t));
      const green=bell((ribbon+.30)/.24)*bell((b+.15)/.9)*.52;
      const light=bell((ribbon+.83)/.44)*(.71+.18*Math.sin(t+b))+.12*bell((b-.72)/.35);
      const low=smooth(.15,1.1,-py*.72+px*.55+(1-z)*.28)*.45;
      const rim=smooth(.68,1.04,distance/radius)*(.25+.24*(.5+.5*Math.sin(angle-rotation)));
      // One wide curved light fold and its soft blue underside give the ball depth.
      const curve=b+.42*a+.45*Math.sin(a*1.8+.55*t)+.10*depth;
      const fold=bell(curve/.32)*bell((a+.12)/1.10)*.90;
      const underside=bell((curve+.38)/.24)*bell((a+.12)/.90)*.29;
      const lowerFold=bell((b+.65+.19*Math.sin(a*2.2+t))/.17)*smooth(-.8,.35,a)*.31;
      const sheen=bell((a+.39+b*.30)/.20)*bell((b-.1)/.58)*.12;
      const luminous=bell((a+.18)/.88)*bell((b-.23)/.78)*.76;
      const backlit=smooth(.52,.96,distance/radius)*smooth(.15,.9,-a+.3*b)*.37;

      let r=mix(144,113,blue),g=mix(190,157,blue),bl=mix(242,231,blue);
      r=mix(r,162,cyan);g=mix(g,239,cyan);bl=mix(bl,249,cyan);
      r=mix(r,186,green);g=mix(g,249,green);bl=mix(bl,220,green);
      r=mix(r,183,fold);g=mix(g,250,fold);bl=mix(bl,244,fold);
      r=mix(r,197,luminous);g=mix(g,249,luminous);bl=mix(bl,247,luminous);
      const shadow=clamp(underside+lowerFold);
      r=mix(r,78,shadow);g=mix(g,125,shadow);bl=mix(bl,210,shadow);
      r=mix(r,86,low);g=mix(g,118,low);bl=mix(bl,204,low);
      const white=clamp(light*.83+sheen+rim*.63+backlit);
      r=mix(r,248,white);g=mix(g,252,white);bl=mix(bl,255,white);
      data[k]=r;data[k+1]=g;data[k+2]=bl;data[k+3]=alpha*255;
    }
    context.putImageData(frame,0,0);
  }
  function tick(now){
    if(!visible||document.hidden||motion.matches){raf=null;return;}
    if(now-last>=frameInterval){draw((now-started)/1000+5);last=now;}
    raf=requestAnimationFrame(tick);
  }
  function update(){
    if(!visible||document.hidden||motion.matches){if(raf!==null)cancelAnimationFrame(raf);raf=null;if(motion.matches)draw(5);}
    else if(raf===null)raf=requestAnimationFrame(tick);
  }
  draw(5);orb.classList.add('fluid-ready');update();
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;update();}).observe(orb);
  document.addEventListener('visibilitychange',update);
  motion.addEventListener?.('change',update);
})();
