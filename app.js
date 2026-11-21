/* ===== LÒGICA ===== */
const dow=new Date().getDay(),TODAY=dow==0?"fes":dow==6?"sab":"lab";
let day=TODAY,view="hub",tab="out",open=new Set();
const SAL=["Salomó",1.376,41.223];
const DEST={
BCN:{n:"Barcelona",mode:"tren",pts:[SAL,["Roda de Barà",1.46,41.19],["Sant Vicenç de Calders",1.527,41.185],["Cunit",1.633,41.2],["Vilanova i la Geltrú",1.725,41.222],["Sitges",1.812,41.236],["Castelldefels",1.975,41.282],["Barcelona",2.17,41.385]],
 ln:["Salomó","Roda de Mar","Sant Vicenç de Calders","Barcelona Sants","Barcelona Pg. de Gràcia","Barcelona Est. de França"]},
LLE:{n:"Lleida",mode:"tren",pts:[SAL,["Vilabella",1.31,41.24],["Nulles-Bràfim",1.255,41.262],["Valls",1.25,41.287],["Picamoixons",1.24,41.33],["Montblanc",1.161,41.376],["L’Espluga",1.10,41.40],["Les Borges",0.87,41.52],["Lleida",0.626,41.615]],
 ln:["Salomó","Vilabella","Nulles-Bràfim","Valls","La Plana-Picamoixons","Lleida (amb bus alternatiu des de Picamoixons)"]},
TGN:{n:"Tarragona",mode:"bus",pts:[SAL,["La Nou de Gaià",1.355,41.19],["Riera de Gaià",1.36,41.165],["Ferran",1.31,41.15],["Tarragona",1.245,41.118]],
 ln:["Salomó","La Nou de Gaià","Riera de Gaià","Ferran","Tarragona"]},
TRE:{n:"Torredembarra",mode:"bus",pts:[SAL,["Vespella",1.366,41.207],["La Nou de Gaià",1.355,41.19],["Riera de Gaià",1.36,41.165],["Torredembarra",1.40,41.145]],
 ln:["Salomó","Vespella de Gaià","La Nou de Gaià","Riera de Gaià","Torredembarra"]}};
const CAT=[[3.32,42.32],[3.17,42.43],[2.75,42.46],[2.45,42.40],[2.12,42.38],[1.98,42.43],[1.73,42.49],[1.45,42.60],[1.40,42.72],[1.10,42.78],[0.72,42.86],[0.66,42.74],[0.72,42.60],[0.70,42.50],[0.72,42.30],[0.70,42.10],[0.58,41.95],[0.52,41.80],[0.40,41.62],[0.30,41.50],[0.30,41.35],[0.33,41.28],[0.16,41.02],[0.20,40.85],[0.17,40.72],[0.25,40.62],[0.30,40.55],[0.49,40.52],[0.72,40.62],[0.90,40.72],[0.88,40.78],[0.78,40.82],[0.80,40.88],[1.03,41.05],[1.25,41.10],[1.40,41.13],[1.53,41.175],[1.70,41.20],[1.81,41.225],[1.97,41.26],[2.18,41.37],[2.45,41.55],[2.80,41.67],[3.15,41.83],[3.20,41.95],[3.18,42.10],[3.18,42.26]];
/* Transport amb cotxe des de Salomó: [destí, minuts, km, carretera]. Estimacions sense trànsit, NO verificades amb cap servei de rutes */
const CAR=[["Torredembarra",15,14,"carreteres locals"],["Altafulla",20,19,"carreteres locals + N-340"],["Valls",20,17,"carretera local"],["Calafell",25,30,"N-340"],["El Vendrell",30,33,"AP-7"],["Tarragona",30,25,"N-340 / AP-7"],["Reus",35,33,"AP-7 + T-11"],["Cambrils",35,40,"AP-7"],["Montblanc",40,38,"N-240"],["Salou",40,40,"AP-7"],["Vilafranca del Penedès",45,55,"AP-7"],["Vilanova i la Geltrú",50,65,"AP-7"],["Sitges",55,72,"AP-7"],["Barcelona · entrada (Pl. d’Espanya)",60,85,"AP-7"],["Barcelona · centre (Pl. de Catalunya)",70,95,"AP-7"],["Barcelona · cap a Badalona (Fòrum)",80,105,"AP-7 + ronda litoral"],["Lleida",75,100,"N-240 + AP-2"],["Tortosa",80,95,"AP-7"],["Girona",130,210,"AP-7"]];
const IC={tren:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C8 2 4 2.5 4 6v9.5A3.5 3.5 0 0 0 7.5 19L6 20.5V21h2l2-2h4l2 2h2v-.5L16.5 19a3.5 3.5 0 0 0 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM18 11H6V6h12v5z"/></svg>',
bus:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4 16c0 .9.4 1.7 1 2.2V20a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1h8v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1.8c.6-.5 1-1.3 1-2.2V6c0-3.5-3.6-4-8-4S4 2.5 4 6v10zm3.5 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM18 11H6V6h12v5z"/></svg>',
car:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M18.9 6c-.2-.6-.8-1-1.4-1h-11c-.7 0-1.2.4-1.4 1L3 12v8c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-1h12v1c0 .6.4 1 1 1h1c.6 0 1-.4 1-1v-8l-2.1-6zM6.9 7h10.2l1.1 3.1H5.8L6.9 7zM7.5 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg>'};
const hhmm=n=>Math.floor(n/60)+":"+String(n%60).padStart(2,"0");
const nowMin=()=>{const d=new Date();return d.getHours()*60+d.getMinutes()};
const runs=s=>s.days==="all"?true:s.days==="sun"?day==="fes":day==="lab";
function items(D,T){const out=[];SV.forEach(s=>{if(!runs(s))return;
 const i=s.stops.findIndex(x=>x.n==="Salomó");if(i<0)return;const L=s.stops.length-1;
 const f=s.stops[0],l=s.stops[L],sa=s.stops[i],pic=s.mode==="tren";
 if(T==="out"&&s.dep===D&&i<L)out.push({s,t:sa.t,shown:s.stops.slice(i),lab:"→ "+l.n,sub:"arriba a les "+l.s+(pic&&D==="LLE"?" · després, bus alternatiu fins a Lleida":"")});
 if(T==="in"&&s.arr===D&&i>0)out.push({s,t:f.t,shown:s.stops.slice(0,i+1),lab:"des de "+f.n,sub:"arriba a Salomó a les "+sa.s+(pic&&D==="LLE"?" · connexió amb bus des de Lleida":"")})});
 return out.sort((a,b)=>a.t-b.t)}
const P=(lo,la)=>[(lo-0.1)*74.9,(42.9-la)*100];
function map(){const x0=67.4,y0=147,w=71.1,h=40,fs=2.3;
 const poly="M"+CAT.map(c=>P(c[0],c[1]).join(",")).join("L")+"Z";
 let s=`<svg class="map" viewBox="${x0} ${y0} ${w} ${h}" role="img" aria-label="Mapa de la zona de Salomó"><path d="${poly}" fill="var(--land)" stroke="var(--line)" stroke-width=".4"/>`;
 Object.keys(DEST).forEach(d=>{s+=`<path d="M${DEST[d].pts.map(p=>P(p[1],p[2]).join(",")).join("L")}" fill="none" stroke="var(--${DEST[d].mode})" stroke-width=".9" ${DEST[d].mode==="bus"?'stroke-dasharray="2 1.4"':""}/>`});
 const txt=(x,y,t,a,d,b)=>`<text x="${x}" y="${y}" text-anchor="${a}" font-size="${fs}" fill="var(--fg)" ${b?'font-weight="700"':""} paint-order="stroke" stroke="var(--land)" stroke-width=".6" ${d?`onclick="go('${d}')" style="cursor:pointer"`:""}>${t}</text>`;
 const dot=(p,d,sal)=>{const [x,y]=P(p[1],p[2]);return `<g ${d?`onclick="go('${d}')" style="cursor:pointer"`:""}><circle cx="${x}" cy="${y}" r="${sal?2.2:1.5}" fill="${sal?"var(--sal)":"var(--card)"}" stroke="${sal?"var(--card)":"var(--fg)"}" stroke-width=".5"/>`+
  (sal?txt(x+3.2,y+.8,"Salomó","start",null,1):p[0]==="Tarragona"?txt(x-2.6,y+.8,"Tarragona","end",d):txt(x+2.6,y+.8,p[0],"start",d))+"</g>"};
 s+=dot(DEST.TGN.pts[4],"TGN")+dot(DEST.TRE.pts[4],"TRE")+dot(SAL,null,1);
 s+=txt(137,163.5,"Barcelona ›","end","BCN",1)+txt(68.5,157,"‹ Lleida","start","LLE",1);
 return s+"</svg>"}
function card(D){const d=DEST[D],L=items(D,"out"),nx=day===TODAY?L.find(x=>x.t>=nowMin()):L[0];
 return `<button class="card" onclick="go('${D}')"><span class="ico ${d.mode}">${IC[d.mode]}</span><span class="t">${d.n}</span>`+
 (nx?`<b>${hhmm(nx.t)}</b><small>${day===TODAY?"propera sortida":"primera sortida"}</small>`:`<small>Cap sortida ${day===TODAY?"avui":"aquest dia"}</small>`)+`</button>`}
function line(D){const d=DEST[D],a=tab==="in"?[...d.ln].reverse():d.ln;
 return `<div class="ln ${d.mode}">${a.map(n=>`<div class="st ${n==="Salomó"?"sal":""}"><i></i>${n}</div>`).join("")}</div>`}
function render(){const a=document.getElementById("app"),d=new Date(),n=nowMin();
 let h=`<div class="top"><div><h1>Mobilitat Salomó</h1><div class="sub">Transport públic i trajectes</div></div><span class="clock">${d.toLocaleTimeString("ca",{hour:"2-digit",minute:"2-digit"})}</span></div>
 <div class="warn">⚠ Versió de prova. Tren: horaris del servei modificat per robatori de cable (des del 28 de juliol), pendents de confirmar que continuen vigents; el tram La Plana-Picamoixons–Lleida es cobreix amb bus alternatiu, no inclòs. Bus: horari d’estiu 2023. Els festius s’han de triar a mà.</div>
 <div class="days">${Object.keys(DAYS).map(k=>`<button class="${k===day?"on":""}" onclick="setDay('${k}')">${DAYS[k]}</button>`).join("")}</div>`;
 if(view==="hub"){h+=map()+`<div class="grid">${["BCN","LLE","TGN","TRE"].map(card).join("")}</div><button class="card alt" onclick="go('CAR')"><span class="ico">${IC.car}</span><span class="t">Transport amb cotxe</span><small>Temps, quilòmetres i carretera cap a ciutats i pobles</small></button>`}
 else if(view==="CAR"){h+=`<button class="back" onclick="go('hub')">← Salomó</button><h1><span class="ico">${IC.car}</span> Transport amb cotxe</h1><div class="warn">Trajectes des de Salomó. Estimacions sense trànsit, a partir de distàncies i velocitats habituals; no estan verificades amb cap servei de rutes. Comprova-les amb Google Maps.</div>`+
  CAR.map(c=>`<div class="item"><div class="row"><span class="h">${c[1]} min<small>${c[2]} km</small></span><span class="d">${c[0]}<small>${c[3]}</small></span></div></div>`).join("")}
 else{const D=DEST[view],L=items(view,tab);
  h+=`<button class="back" onclick="go('hub')">← Salomó</button><h1><span class="ico ${D.mode}">${IC[D.mode]}</span> ${D.n}</h1>
  <div class="tabs"><button class="${tab==="out"?"on":""}" onclick="setTab('out')">Direcció ${D.n}</button><button class="${tab==="in"?"on":""}" onclick="setTab('in')">Direcció Salomó</button></div>${line(view)}`;
  if(!L.length)h+=`<p class="empty">Cap servei en aquesta direcció aquest dia.</p>`;
  L.forEach((x,k)=>{const id=view+tab+k,past=day===TODAY&&x.t<n;
   h+=`<div class="item ${past?"past":""}"><button class="row" onclick="tog('${id}')"><span class="ico ${x.s.mode}">${IC[x.s.mode]}</span><span class="h">${hhmm(x.t)}</span><span class="d">${x.lab}<small>${x.sub} · ${x.s.line}${x.s.id?" "+x.s.id:""}</small></span></button>`+
   (open.has(id)?`<div class="stops">${x.shown.map(p=>`<div class="${p.n==="Salomó"?"me":""}"><span>${p.n}</span><span class="tm">${p.s}</span></div>`).join("")}</div>`:"")+`</div>`})}
 h+=`<footer>Dades: PDF Rodalies R13/R14 (modificació de servei per robatori de cable) i horari Empresa Plana (dilluns a divendres feiners). Els trens sense marca al PDF es tracten com a “tots els dies”.</footer>`;
 a.innerHTML=h}
function go(v){view=v;tab="out";open=new Set();render();scrollTo(0,0)}
function setDay(k){day=k;open=new Set();render()}
function setTab(t){tab=t;open=new Set();render()}
function tog(id){open.has(id)?open.delete(id):open.add(id);render()}
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
render();setInterval(()=>{if(!open.size)render()},60000);
