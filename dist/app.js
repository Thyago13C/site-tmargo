// The page language is applied before the demo and contact form initialize.
const siteCopy = (portuguese, english, spanish) => {
  const language = document.documentElement.lang;
  if (language === 'en') return english;
  if (language === 'es') return spanish;
  return portuguese;
};

const scenarios = {
  agenda: [
    ['customer', siteCopy("Oii! Vocês têm horário disponível para amanhã?", "Hi! Do you have any appointments available tomorrow?", "¡Hola! ¿Tienen citas disponibles para mañana?")],
    ['agent', siteCopy("Olá! É uma alegria ter você aqui. 😊", "Hello! It’s lovely to hear from you. 😊", "¡Hola! Nos alegra saber de ti. 😊")],
    ['agent', siteCopy("Para amanhã, temos horários disponíveis às 9:30 ou às 11:00. Qual horário fica melhor para você?", "We have openings tomorrow at 9:30 or 11:00. Which time works best for you?", "Mañana tenemos disponibilidad a las 9:30 o a las 11:00. ¿Qué hora te viene mejor?")],
    ['customer', siteCopy("9:30 seria perfeito!", "9:30 would be perfect!", "¡A las 9:30 sería perfecto!")],
    ['agent', siteCopy("Ótimo! Para confirmar sua consulta, me informa seu nome?", "Great! Could I have your name to confirm your appointment?", "¡Genial! ¿Me dices tu nombre para confirmar la cita?")],
    ['customer', 'Mariana Costa.'],
    ['agent', siteCopy("Prontinho, Mariana! Sua consulta está agendada para amanhã, às 9:30. ✅", "You’re all set, Mariana! Your appointment is booked for tomorrow at 9:30. ✅", "¡Listo, Mariana! Tu cita está confirmada para mañana a las 9:30. ✅")],
    ['agent', siteCopy("Vou te enviar um lembrete antes da consulta. Até amanhã! 💜", "I’ll send you a reminder before your appointment. See you tomorrow! 💜", "Te enviaré un recordatorio antes de la cita. ¡Hasta mañana! 💜")]
  ],
  vendas: [
    ['customer', siteCopy("Oi! Queria saber quanto custa instalar energia solar na minha casa.", "Hi! I’d like to know how much it costs to install solar panels at home.", "¡Hola! Quisiera saber cuánto cuesta instalar paneles solares en casa.")],
    ['agent', siteCopy("Olá! Que bom que você quer economizar na conta de luz. ☀️", "Hello! It’s great that you’re looking to save on your electricity bill. ☀️", "¡Hola! Qué bien que quieras ahorrar en tu factura de luz. ☀️")],
    ['agent', siteCopy("Me conta: quanto você paga de energia por mês e em qual cidade mora?", "How much do you spend on electricity each month, and which city do you live in?", "¿Cuánto pagas de luz al mes y en qué ciudad vives?")],
    ['customer', siteCopy("Em torno de R$ 500 por mês. Moro em Campinas.", "Around R$500 a month. I live in Campinas.", "Unos R$ 500 al mes. Vivo en Campinas.")],
    ['agent', siteCopy("Ótimo! Podemos montar um projeto sob medida para o seu consumo.", "Great! We can design a system to suit your energy needs.", "¡Perfecto! Podemos diseñar un sistema a medida según tu consumo.")],
    ['agent', siteCopy("Vou encaminhar essas informações ao nosso consultor para preparar sua proposta. Podemos te chamar amanhã?", "I’ll pass this along to our consultant so they can prepare a quote. Can we get in touch tomorrow?", "Le pasaré estos datos a nuestro asesor para que prepare tu propuesta. ¿Podemos contactarte mañana?")],
    ['customer', siteCopy("Pode sim! Obrigado.", "Of course! Thank you.", "¡Claro! Gracias.")],
    ['agent', siteCopy("Combinado! Já deixei tudo registrado para nosso consultor entrar em contato com você. 😊", "Perfect! I’ve noted everything down so our consultant can get in touch. 😊", "¡De acuerdo! Ya registré todo para que nuestro asesor se ponga en contacto contigo. 😊")]
  ],
  estoque: [
    ['customer', siteCopy("Oi! Vocês têm notebook disponível para pronta entrega?", "Hi! Do you have any laptops available for immediate delivery?", "¡Hola! ¿Tienen portátiles disponibles para entrega inmediata?")],
    ['agent', siteCopy("Olá! Vou conferir nosso estoque pra você. 😊", "Hello! Let me check our stock for you. 😊", "¡Hola! Voy a consultar nuestras existencias. 😊")],
    ['agent', siteCopy("Encontrei estas três opções à pronta entrega:\n\n1. Notebook Essencial 15 — 8 GB RAM, SSD 256 GB — R$ 2.599\n2. Notebook Pro 14 — 16 GB RAM, SSD 512 GB — R$ 4.299\n3. Notebook Max 16 — 32 GB RAM, SSD 1 TB — R$ 6.499\n\nQual deles chamou sua atenção?", "I found three options available for immediate delivery:\n\n1. Essential 15 laptop — 8 GB RAM, 256 GB SSD — R$2,599\n2. Pro 14 laptop — 16 GB RAM, 512 GB SSD — R$4,299\n3. Max 16 laptop — 32 GB RAM, 1 TB SSD — R$6,499\n\nWhich one catches your eye?", "Encontré tres opciones para entrega inmediata:\n\n1. Portátil Esencial 15 — 8 GB de RAM, SSD de 256 GB — R$ 2599\n2. Portátil Pro 14 — 16 GB de RAM, SSD de 512 GB — R$ 4299\n3. Portátil Max 16 — 32 GB de RAM, SSD de 1 TB — R$ 6499\n\n¿Cuál te llama la atención?")],
    ['customer', siteCopy("Gostei do Pro 14!", "I like the Pro 14!", "¡Me gusta el Pro 14!")],
    ['agent', siteCopy("Notebook Pro 14 prateado, aberto, com tela em tons de lilás e azul.", "An open silver Pro 14 laptop with shades of lilac and blue on its screen.", "Portátil Pro 14 plateado, abierto, con una pantalla en tonos lila y azul."), 'assets/pro-14.webp'],
    ['agent', siteCopy("Ótima escolha! Com 16 GB de RAM, o Pro 14 dá conta de várias abas e aplicativos abertos ao mesmo tempo. E o SSD de 512 GB tem bastante espaço pros seus arquivos.", "Great choice! With 16 GB of RAM, the Pro 14 can handle several tabs and apps at once. The 512 GB SSD also has plenty of room for your files.", "¡Buena elección! Con 16 GB de RAM, el Pro 14 puede manejar varias pestañas y aplicaciones a la vez. Además, el SSD de 512 GB ofrece mucho espacio para tus archivos.")],
    ['customer', siteCopy("Gostei! Tem como parcelar?", "Sounds good! Can I pay in installments?", "¡Me gusta! ¿Puedo pagar a plazos?")],
    ['agent', siteCopy("Sim, dá pra parcelar no cartão! Quer que eu te conecte com um vendedor para finalizar?", "Yes, you can pay in installments by card! Would you like me to connect you with a salesperson to complete your purchase?", "¡Sí, puedes pagar a plazos con tarjeta! ¿Quieres que te ponga en contacto con un asesor para finalizar la compra?")],
    ['customer', siteCopy("Quero sim!", "Yes, please!", "¡Sí, por favor!")],
    ['agent', siteCopy("Perfeito! Já encaminhei sua conversa para nossa equipe com os detalhes do produto escolhido. 💜", "Perfect! I’ve sent your conversation to our team along with the details of the product you chose. 💜", "¡Perfecto! Ya envié la conversación a nuestro equipo junto con los detalles del producto que elegiste. 💜")]
  ]
};

const agentSummaries={
  agenda:{title:siteCopy("Mais consultas.", "More appointments.", "Más citas."),accent:siteCopy("Menos trabalho manual.", "Less manual work.", "Menos trabajo manual."),intro:siteCopy("Seu cliente manda uma mensagem. Em segundos, seu agente responde, tira dúvidas e conduz a conversa até o agendamento.", "Your customer sends a message. Within seconds, your agent replies, answers questions and guides them through booking an appointment.", "Tu cliente envía un mensaje. En segundos, tu agente responde, resuelve sus dudas y le ayuda a reservar una cita."),outro:siteCopy("Ele consulta os horários disponíveis, marca a consulta direto no calendário da clínica e ainda faz o follow-up. Tudo isso de forma automática.", "It checks availability, books the appointment directly in the clinic’s calendar and follows up automatically.", "Consulta los horarios disponibles, reserva la cita directamente en el calendario de la clínica y hace el seguimiento de forma automática.")},
  vendas:{title:siteCopy("Cada conversa,", "Every conversation,", "Cada conversación,"),accent:siteCopy("uma nova oportunidade.", "a new opportunity.", "una nueva oportunidad."),intro:siteCopy("Um cliente demonstra interesse. Seu agente responde na hora, entende o que ele procura e apresenta a solução certa.", "A customer shows interest. Your agent replies right away, finds out what they need and offers the right solution.", "Un cliente muestra interés. Tu agente responde al instante, averigua qué busca y le ofrece la solución adecuada."),outro:siteCopy("Ele qualifica o lead, faz o follow-up e encaminha a oportunidade ao comercial com todo o contexto da conversa. Sua equipe entra em cena quando realmente importa.", "It qualifies the lead, follows up and sends the opportunity to your sales team with the full conversation history. Your team steps in when it matters most.", "Califica al cliente potencial, hace el seguimiento y pasa la oportunidad al equipo comercial con todo el contexto de la conversación. Tu equipo interviene cuando más importa.")},
  estoque:{title:siteCopy("O produto certo,", "The right product,", "El producto adecuado,"),accent:siteCopy("na hora certa.", "at the right time.", "en el momento justo."),intro:siteCopy("Seu cliente quer saber se um produto está disponível? Seu agente responde na hora e encontra as opções certas.", "Does your customer want to know if a product is available? Your agent answers right away and finds suitable options.", "¿Tu cliente quiere saber si un producto está disponible? Tu agente responde al instante y encuentra las opciones adecuadas."),outro:siteCopy("Ele consulta seu estoque em tempo real, informa preços e detalhes, ajuda na escolha e encaminha o cliente ao vendedor quando necessário. Sem deixar ninguém esperando.", "It checks stock in real time, shares prices and product details, helps customers choose and connects them with a salesperson when needed. No one is left waiting.", "Consulta el inventario en tiempo real, informa sobre precios y características, ayuda a elegir y conecta al cliente con un asesor de ventas cuando hace falta. Nadie se queda esperando.")}
};

const $=id=>document.getElementById(id);
const messages=$('messages'), chat=$('demo-chat'), status=$('demoStatus');
const motion=matchMedia('(prefers-reduced-motion: reduce)');
let active='agenda', visible=false, cursor=0, phase='first', timer=null, typing=null;
const canPlay=()=>visible&&!document.hidden;

function scrollMessages(){messages.scrollTo({top:messages.scrollHeight,behavior:motion.matches?'auto':'smooth'});}
function addBubble(kind, text, imageUrl){
  const bubble=document.createElement('div');
  bubble.className='bubble '+kind;
  if (imageUrl) {
    const photo = document.createElement('img');
    photo.src = imageUrl;
    photo.alt = text;
    photo.width = 600;
    photo.height = 400;
    bubble.classList.add('product-photo');
    bubble.append(photo);
  } else {
    bubble.textContent = text;
  }
  messages.append(bubble);scrollMessages();
}
function showTyping(kind){
  typing=document.createElement('div');
  typing.className='bubble '+kind+' typing';
  typing.setAttribute('aria-hidden','true');
  for(let i=0;i<3;i++){const dot=document.createElement('i');dot.className='typing-dot';typing.append(dot);}
  messages.append(typing);scrollMessages();
}
function clearTyping(){if(typing){typing.remove();typing=null;}}
function finish(){phase='finished';status.textContent=siteCopy("Demonstração concluída", "Demo complete", "Demostración finalizada");}
function deliver(){
  clearTyping();addBubble(...scenarios[active][cursor++]);
  if(cursor===scenarios[active].length)finish();else phase='typing';
  schedule();
}
function schedule(){
  if(timer!==null||!canPlay()||phase==='finished')return;
  if(motion.matches){clearTyping();while(cursor<scenarios[active].length){addBubble(...scenarios[active][cursor++]);}finish();return;}
  status.textContent=siteCopy("Demonstração em andamento", "Demo in progress", "Demostración en curso");
  if(phase==='first'){
    timer=setTimeout(()=>{timer=null;if(canPlay())deliver();},450);
  }else if(phase==='typing'){
    const previous=scenarios[active][cursor-1][1];
    const readingPause=scenarios[active][cursor-1][2] ? 2400 : 520+Math.min(2600,Math.max(0,(previous.length-85)*13));
    timer=setTimeout(()=>{timer=null;if(!canPlay())return;showTyping(scenarios[active][cursor][0]);phase='deliver';schedule();},readingPause);
  }else if(phase==='deliver'){
    const text=scenarios[active][cursor][1];
    const duration=Math.min(2450,Math.max(850,520+text.length*16));
    timer=setTimeout(()=>{timer=null;if(canPlay())deliver();},duration);
  }
}
function pause(){if(timer!==null){clearTimeout(timer);timer=null;}}
function reset(){pause();clearTyping();cursor=0;phase='first';messages.replaceChildren();messages.scrollTop=0;status.textContent=siteCopy("Demonstração automática", "Automatic demo", "Demostración automática");schedule();}
function updateVisibility(){if(canPlay())schedule();else pause();}

const tabs=[...document.querySelectorAll('.demo-tabs .tab')];
function selectTab(tab){
  active=tab.dataset.scenario;
  tabs.forEach(t=>{const selected=t===tab;t.classList.toggle('active',selected);t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;});
  chat.setAttribute('aria-labelledby',tab.id);
  const summary=agentSummaries[active];$('agentTitleLead').textContent=summary.title;$('agentTitleAccent').textContent=summary.accent;$('agentIntro').textContent=summary.intro;$('agentOutro').textContent=summary.outro;
  reset();
}
tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>selectTab(tab));
  tab.addEventListener('keydown',event=>{const next=event.key==='ArrowRight'?(index+1)%tabs.length:event.key==='ArrowLeft'?(index+tabs.length-1)%tabs.length:event.key==='Home'?0:event.key==='End'?tabs.length-1:null;if(next===null)return;event.preventDefault();selectTab(tabs[next]);tabs[next].focus();});
});
$('restart').addEventListener('click',reset);
document.addEventListener('visibilitychange',updateVisibility);
motion.addEventListener?.('change',()=>{pause();updateVisibility();});
// Nothing begins until the actual message area is visible below the sticky navigation.
if('IntersectionObserver' in window){
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting&&entries[0].intersectionRatio>=.45;updateVisibility();},{threshold:[0,.45],rootMargin:'-76px 0px 0px 0px'}).observe(messages);
}else{
  function checkVisibility(){const r=messages.getBoundingClientRect();visible=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,76))>=r.height*.45;updateVisibility();}
  addEventListener('scroll',checkVisibility,{passive:true});addEventListener('resize',checkVisibility);checkVisibility();
}

const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav-links');
function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open
    ? siteCopy("Fechar menu", "Close menu", "Cerrar menú")
    : siteCopy("Abrir menu", "Open menu", "Abrir menú"));
}
toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
document.addEventListener('click', event => {
  if (nav.classList.contains('open') && !toggle.contains(event.target)
      && (!nav.contains(event.target) || event.target.closest('a'))) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (!event.defaultPrevented && event.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    toggle.focus();
  }
});
matchMedia('(max-width: 1199px)').addEventListener('change', () => setMenu(false));

document.querySelectorAll('[data-interest]').forEach(a=>a.addEventListener('click',()=>{$('interest').value=a.dataset.interest;}));
const automationInterests = {
  "Atendimento no WhatsApp": siteCopy(
    "automação de atendimento no WhatsApp",
    "automating WhatsApp customer support",
    "automatizar la atención por WhatsApp"
  ),
  "Agendamentos": siteCopy(
    "automação de agendamentos",
    "automating appointment scheduling",
    "automatizar la gestión de citas"
  ),
  "Vendas e qualificação de leads": siteCopy(
    "automação de vendas e qualificação de leads",
    "automating sales and lead qualification",
    "automatizar las ventas y la calificación de clientes potenciales"
  ),
  "Catálogo e estoque": siteCopy(
    "automação de catálogo e estoque",
    "automating catalog and inventory management",
    "automatizar la gestión del catálogo y del inventario"
  ),
  "Integração de sistemas": siteCopy(
    "automação de integração de sistemas",
    "automating systems integration",
    "automatizar la integración de sistemas"
  ),
  "Clínicas e consultórios": siteCopy(
    "automações para clínicas e consultórios",
    "automation for clinics and medical practices",
    "automatizaciones para clínicas y consultorios"
  ),
  "Lojas e e-commerce": siteCopy(
    "automações para lojas e e-commerce",
    "automation for stores and e-commerce",
    "automatizaciones para tiendas y comercio electrónico"
  ),
  "Empresas de serviços": siteCopy(
    "automações para empresas de serviços",
    "automation for service businesses",
    "automatizaciones para empresas de servicios"
  ),
  "Equipes comerciais e administrativas": siteCopy(
    "automações para equipes comerciais e administrativas",
    "automation for sales and administrative teams",
    "automatizaciones para equipos comerciales y administrativos"
  ),
  "Outro processo": siteCopy(
    "automatizar outro processo",
    "automating another process",
    "automatizar otro proceso"
  ),
};

const footerContact = document.querySelector('.footer-social.whatsapp');
const footerMessage = siteCopy(
  'Olá! Vim pelo site da Tmargo e gostaria de saber mais sobre automações para o meu negócio.',
  'Hi! I found you through the Tmargo website and would like to learn more about automation for my business.',
  '¡Hola! Vengo del sitio de Tmargo y me gustaría saber más sobre automatizaciones para mi negocio.'
);
const footerUrl = new URL(footerContact.href);
footerUrl.searchParams.set('text', footerMessage);
footerContact.href = footerUrl.href;

$('contactForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = $('contactName').value.trim();
  const interest = $('interest').value;
  const detail = $('detail').value.trim();
  const topic = automationInterests[interest] ?? $('interest').selectedOptions[0].textContent;
  const paragraphs = [
    siteCopy(
      'Olá! Vim pelo site da Tmargo e gostaria de saber mais sobre automações.',
      'Hi! I found you through the Tmargo website and would like to learn more about automation.',
      '¡Hola! Vengo del sitio de Tmargo y me gustaría saber más sobre automatizaciones.'
    ),
    siteCopy(
      `Meu nome é ${name} e tenho interesse em ${topic}.`,
      `My name is ${name} and I’m interested in ${topic}.`,
      `Me llamo ${name} y tengo interés en ${topic}.`
    ),
  ];

  if (detail) paragraphs.push(/[.!?…]$/.test(detail) ? detail : detail + '.');
  paragraphs.push(siteCopy('Podemos conversar?', 'Can we talk?', '¿Podemos conversar?'));

  const message = encodeURIComponent(paragraphs.join('\n\n'));
  window.open('https://wa.me/5549999260377?text=' + message, '_blank', 'noopener,noreferrer');
});
