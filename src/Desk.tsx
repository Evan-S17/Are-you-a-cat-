import { useRef, useState } from 'react';
const items = [
  { id: 'laptop', name: '笔记本电脑', x: 210, y: 111, w: 156, h: 95 },
  { id: 'book', name: '书本', x: 345, y: 175, w: 76, h: 31 },
  { id: 'cup', name: '玻璃杯', x: 411, y: 146, w: 32, h: 60 },
  { id: 'phone', name: '手机', x: 129, y: 194, w: 48, h: 12 },
  { id: 'pen', name: '钢笔', x: 99, y: 201, w: 59, h: 5 },
];
function ObjectArt({id}:{id:string}) {
  if(id==='laptop')return <><rect x="12" y="0" width="132" height="84" rx="5" fill="#778698"/><rect x="17" y="5" width="122" height="72" rx="2" fill="#dbe7eb"/><path d="M33 25h69m-69 11h89m-89 11h58" stroke="#a7bbc7" strokeWidth="3"/><path d="M12 84h132l12 9q0 2-5 2H5q-5 0-5-2z" fill="#9eacb9"/><path d="M61 86h34l3 5H58z" fill="#7d8b9b"/></>;
  if(id==='book')return <><rect x="0" y="6" width="74" height="23" rx="2" fill="#768e99"/><path d="M3 10h67v14H3z" fill="#f3ebdc"/><path d="M5 14h60m-60 5h60" stroke="#cfc8bb"/><path d="M0 6l16-6h59v7z" fill="#97abb0"/></>;
  if(id==='cup')return <><path d="M2 4h28l-4 52q-10 6-20 0z" fill="#e4f1f4" fillOpacity=".8" stroke="#7d9ba7" strokeWidth="1.5"/><path d="M5 27h22l-2 28q-9 5-18 0z" fill="#a9d1dc"/><ellipse cx="16" cy="4" rx="14" ry="3" fill="#f7fbfd" stroke="#7d9ba7"/><path d="M9 10l2 35" stroke="#fff" strokeWidth="2"/></>;
  if(id==='phone')return <><rect width="48" height="12" rx="3" fill="#566477"/><rect x="4" y="2" width="39" height="7" rx="1" fill="#b9cbd4"/></>;
  return <><path d="M0 1h49l8 2-8 2H0z" fill="#455a76"/><path d="M49 1l10 2-10 2" fill="#bfa57e"/><path d="M54 2l5 1-5 1" fill="#475163"/></>;
}
export default function Desk({onComplete,locked}:{onComplete:()=>void;locked:boolean}) {
 const svg=useRef<SVGSVGElement>(null);
 const [positions,setPositions]=useState<Record<string,{x:number;y:number}>>({});
 const active=useRef<{id:string;offsetX:number;offsetY:number}|null>(null);
 const [onFloor,setOnFloor]=useState<string[]>([]);
 const [message,setMessage]=useState('桌面上的电脑、书本、水杯、手机和钢笔都可以拖动。');
 function point(e:React.PointerEvent){const r=svg.current!.getBoundingClientRect();return {x:(e.clientX-r.left)*600/r.width,y:(e.clientY-r.top)*420/r.height}}
 function end(e:React.PointerEvent){const a=active.current;if(!a)return;active.current=null;const item=items.find(i=>i.id===a.id)!;const p=point(e);const x=Math.max(0,Math.min(600-item.w,p.x-a.offsetX));const y=Math.max(8,Math.min(398-item.h,p.y-a.offsetY));setPositions(v=>({...v,[a.id]:{x,y}}));if(y+item.h>=330){setOnFloor(v=>v.includes(a.id)?v:[...v,a.id]);setMessage(`${item.name}已移至地面。重力研究取得进展。`);onComplete()}else{setOnFloor(v=>v.filter(id=>id!==a.id));setMessage('还没有到地面。请继续向下拖入标有「地面」的区域。')}}
 return <div className="desk-v2"><svg role="img" ref={svg} viewBox="0 0 600 420" aria-label="可互动桌面场景"><rect width="600" height="420" rx="8" fill="#f4f2ed"/><text x="20" y="26" fontSize="10" fill="#9d988e">工作人员的书桌</text><path d="M0 330h600v90H0z" fill="#e3ddcf"/><path d="M0 330h600" stroke="#c8bcaa"/><text x="22" y="356" fontSize="12" fill="#8d8270">地面 · 将物品拖到这里再松爪</text><ellipse cx="300" cy="366" rx="224" ry="13" fill="#d6cdbc"/><rect x="72" y="221" width="13" height="124" fill="#b6a18a"/><rect x="515" y="221" width="13" height="124" fill="#b6a18a"/><path d="M48 206h504v16H48z" fill="#b09576"/><path d="M48 206l18-25h468l18 25z" fill="#d3b897"/>{items.map(item=>{const p=positions[item.id]||item;return <g key={item.id} role="button" aria-label={`拖动${item.name}`} tabIndex={locked?-1:0} transform={`translate(${p.x} ${p.y})`} className="desk-object" onPointerDown={e=>{if(locked)return;e.preventDefault();const q=point(e);active.current={id:item.id,offsetX:q.x-p.x,offsetY:q.y-p.y};e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(active.current?.id!==item.id)return;const q=point(e);const a=active.current;setPositions(v=>({...v,[item.id]:{x:Math.max(0,Math.min(600-item.w,q.x-a.offsetX)),y:Math.max(8,Math.min(398-item.h,q.y-a.offsetY))}}))}} onPointerUp={end} onPointerCancel={()=>{active.current=null}} onKeyDown={e=>{if(locked)return;if(e.key==='ArrowDown'){e.preventDefault();setPositions(v=>({...v,[item.id]:{x:p.x,y:Math.min(398-item.h,p.y+30)}}))}if(e.key==='Enter'||e.key===' '){e.preventDefault();if(p.y+item.h>=330){setMessage(`${item.name}已移至地面。`);onComplete()}else setMessage('用向下方向键将物品移到地面，再按回车松爪。')}}}><title>{item.name}：可拖动；也可用向下方向键移动，回车松开</title><rect width={item.w} height={item.h} fill="transparent"/><ObjectArt id={item.id}/>{onFloor.includes(item.id)&&<circle cx={item.w/2} cy={item.h+6} r="3" fill="#6b8e77"/>}</g>})}</svg><p className="desk-message" aria-live="polite">{message}</p></div>
}
