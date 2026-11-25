(() => {
  const section = document.querySelector('#integracoes');
  const layer = document.querySelector('#integrationNodes');
  if (!section || !layer) return;

  const NS = 'http://www.w3.org/2000/svg';
  const rings = [
    {track:"integrationTrackOuter", delay:0, duration:42000, direction:1, phase:.075, logos:['whatsapp','redis','google-docs','notion','postgresql','slack','gmail','instagram'], pulse:'integrationPulseOuter'},
    {track:"integrationTrackInner", delay:1100, duration:38000, direction:-1, phase:.12, logos:['google-calendar','n8n','google-sheets','telegram','asaas','google-drive','supabase'], pulse:'integrationPulseInner'}
  ];
  const make = (tag, attrs) => {
    const element = document.createElementNS(NS, tag);
    for (const [key,value] of Object.entries(attrs)) element.setAttribute(key,value);
    return element;
  };
  for (const ring of rings) {
    ring.nodes = ring.logos.map(logo => {
      const g = make('g', {class:'integration-node','data-tool':logo});
      const badge = make('g', {class:'integration-badge'});
      g.append(badge);
      badge.append(make('circle', {r:21}));
      const icon = make('svg', {x:-11.5,y:-11.5,width:23,height:23,viewBox:'0 0 32 32'});
      if (logo === 'instagram' || logo === 'supabase') {
        icon.append(make('image', {href: `assets/${logo}.svg`, width:32, height:32}));
      } else if (logo === 'n8n') {
        icon.append(make('image', {href:'assets/n8n-badge.png', width:32, height:32}));
      } else if (['slack','asaas','notion'].includes(logo)) {
        const width = logo === 'asaas' ? 46 : 32;
        icon.setAttribute('overflow', 'visible');
        icon.append(make('image', {href: `assets/${logo}.png`, x:(32-width)/2, width, height:32}));
      } else {
        icon.append(make('use',{href:`assets/integration-logos.svg#${logo}`}));
      }
      badge.append(icon);
      layer.append(g);
      return g;
    });
    ring.trackElement = document.getElementById(ring.track);
    ring.length = ring.trackElement.getTotalLength();
    ring.pulseElement=document.getElementById(ring.pulse);
  }
  const art = layer.ownerSVGElement;
  function sizeMobileBadges() {
    if (!matchMedia('(max-width: 800px), (max-width: 1440px) and (any-pointer: coarse)').matches) return;
    const width = art.getBoundingClientRect().width;
    if (!width) return;
    const mobileDiameter = Math.min(64, Math.max(27, section.clientWidth * .075));
    const tablet = matchMedia('(pointer: coarse) and (min-width: 600px) and (min-height: 600px)').matches;
    const portrait = matchMedia('(orientation: portrait)').matches;
    const diameter = tablet ? mobileDiameter * (portrait ? 0.78 : 0.88) : mobileDiameter;
    layer.style.setProperty('--mobile-badge-scale', diameter * art.viewBox.baseVal.width / (42 * width));
  }
  sizeMobileBadges();
  window.addEventListener('resize', sizeMobileBadges);

  const slotsPerRing = 5;
  const smooth = t => { t=Math.max(0,Math.min(1,t)); return t*t*(3-2*t); };
  const fade = t => smooth((t-.018)/.14)*smooth((.982-t)/.14);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  function render(elapsed) {
    for (const ring of rings) {
      const phase=ring.phase+ring.direction*elapsed/ring.duration;
      ring.nodes.forEach((g,i) => {
        const cycle = ring.nodes.length / slotsPerRing;
        const position = phase + i / slotsPerRing;
        const t = position - Math.floor(position / cycle) * cycle;
        const visible = t < 1;
        if (g.style.display !== (visible ? '' : 'none')) {
          g.style.display = visible ? '' : 'none';
        }
        if (!visible) return;
        const {x,y}=ring.trackElement.getPointAtLength(t * ring.length);
        g.setAttribute('transform',`translate(${x.toFixed(2)} ${y.toFixed(2)})`);
        g.setAttribute('opacity',fade(t).toFixed(3));
      });
      const progress = ((elapsed % 6000) - ring.delay) / 3300;
      const pulse = ring.pulseElement;
      pulse.style.opacity = progress >= 0 && progress <= 1 && !reduce.matches
        ? String(fade(progress)) : '0';
      pulse.setAttribute('stroke-dashoffset', String(5 - 105 * progress));
    }
  }
  let elapsed=0,last=0,frame=0,visible=false;
  function tick(now) {
    if(last) elapsed+=Math.min(now-last,100)*0.98;
    last=now;
    render(elapsed);
    frame=requestAnimationFrame(tick);
  }
  function sync() {
    if (visible&&!reduce.matches&&!document.hidden) {
      if(!frame){last=0;frame=requestAnimationFrame(tick);}
    } else if(frame){cancelAnimationFrame(frame);frame=0;last=0;}
  }
  render(0);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(section);
  } else {visible=true;sync();}
  document.addEventListener('visibilitychange',sync);
  reduce.addEventListener?.('change',()=>{if(reduce.matches)render(0);sync();});
})();
