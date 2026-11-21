/* ===== DADES (edita aquí els horaris) ===== */
const DAYS={lab:"Laborable",sab:"Dissabte",fes:"Diumenge/festiu"};
const m=s=>{const[h,x]=s.split(":");return +h*60+ +x};
const SV=[];
/* Tren R13. days: "all" = sense marca al PDF; "sun" = només diumenges i festius.
   dep/arr = costat de la línia cap a on surt / d’on arriba (BCN o LLE) */
function tr(id,type,days,dep,arr,s){SV.push({mode:"tren",line:"R13 "+type,id,days,dep,arr,
 stops:s.split(";").map(x=>{x=x.trim();const i=x.lastIndexOf(" ");return{n:x.slice(0,i),s:x.slice(i+1),t:m(x.slice(i+1))}})})}
tr("15041","RE","all","LLE","BCN","Barcelona Est. França 7:12;Barcelona Pg. de Gràcia 7:23;Barcelona Sants 7:30;Sant Vicenç de Calders 8:16;Roda de Mar 8:23;Salomó 8:34;Nulles-Bràfim 8:42;Valls 8:50;La Plana-Picamoixons 8:59");
tr("15043","RE","all","LLE","BCN","Barcelona Est. França 14:42;Barcelona Pg. de Gràcia 14:53;Barcelona Sants 15:00;Sant Vicenç de Calders 15:46;Roda de Mar 15:53;Salomó 16:04;Nulles-Bràfim 16:12;Valls 16:20;La Plana-Picamoixons 16:29");
tr("15045","RE","all","LLE","BCN","Barcelona Est. França 17:12;Barcelona Pg. de Gràcia 17:23;Barcelona Sants 17:30;Sant Vicenç de Calders 18:16;Roda de Mar 18:23;Salomó 18:33;Vilabella 18:39;Nulles-Bràfim 18:42;Valls 18:50;La Plana-Picamoixons 18:59");
tr("15042","RE","all","BCN","LLE","La Plana-Picamoixons 9:14;Valls 9:22;Nulles-Bràfim 9:28;Vilabella 9:32;Salomó 9:37;Roda de Mar 9:45;Sant Vicenç de Calders 9:53;Barcelona Sants 10:42;Barcelona Pg. de Gràcia 10:47;Barcelona Est. França 10:57");
tr("15044","RE","all","BCN","LLE","La Plana-Picamoixons 16:44;Valls 16:52;Nulles-Bràfim 16:58;Salomó 17:06;Roda de Mar 17:14;Sant Vicenç de Calders 17:23;Barcelona Sants 18:12;Barcelona Pg. de Gràcia 18:17;Barcelona Est. França 18:27");
tr("15046","RE","all","BCN","LLE","La Plana-Picamoixons 19:14;Valls 19:22;Nulles-Bràfim 19:28;Salomó 19:36;Roda de Mar 19:44;Sant Vicenç de Calders 19:53;Barcelona Sants 20:42;Barcelona Pg. de Gràcia 20:47;Barcelona Est. França 20:57");
/* Bus Empresa Plana (dilluns a divendres feiners). "-" = no hi para */
function bus(line,dep,arr,names,rows){rows.forEach(r=>{const t=r.split(" "),st=[];
 names.forEach((n,i)=>{if(t[i]&&t[i]!=="-")st.push({n,s:t[i],t:m(t[i])})});
 SV.push({mode:"bus",line,days:"lab",dep,arr,stops:st})})}
const TG1=["Salomó","La Nou de Gaià","Riera de Gaià","Ferran","Tarragona (Via Augusta)","Tarragona (Estació Bus)"];
bus("Bus Tarragona","TGN",null,TG1,["7:00 7:10 7:17 7:22 7:40 7:45","9:50 10:05 10:15 10:20 10:30 10:35","13:30 13:45 13:55 14:00 14:10 14:15","15:30 15:45 15:55 16:10 16:20 16:25","- - 19:05 19:15 19:25 19:35"]);
bus("Bus Tarragona",null,"TGN",[...TG1].reverse().map((n,i)=>n),["9:05 9:10 9:20 9:25 9:35 9:50","11:15 11:20 11:30 11:35 11:45 12:00","14:45 14:50 15:00 15:05 15:15 15:30","18:30 18:35 18:50 19:00 - -","20:10 20:15 20:25 20:30 20:40 20:55"]);
const TR1=["Salomó","Vespella de Gaià","La Nou de Gaià","Riera de Gaià","Torredembarra (Av. Sant Jordi)","Torredembarra Renfe (només juliol i agost)","IES d’Altafulla (només dies lectius)"];
bus("Bus Torredembarra","TRE",null,TR1,["6:55 7:03 7:15 7:25 7:35 - 7:50","9:45 9:53 10:00 10:15 10:30 - -","12:00 12:08 12:20 12:30 12:45 - -","15:50 15:58 16:10 16:20 16:35 16:40 -","18:50 18:58 19:10 19:20 19:35 - -"]);
bus("Bus Torredembarra",null,"TRE",[...TR1].reverse(),["- - 9:00 9:15 9:25 9:37 9:45","- - 12:45 13:00 13:10 13:22 13:30","15:05 - 15:15 15:25 15:30 15:39 15:49","- 18:00 18:05 18:20 18:30 18:42 18:50"]);
