import {useEffect,useRef,useState} from 'react';
type Props={locked:boolean;onWin:()=>void;onWrong:(message:string)=>void};
const ROUTE=['窗台','沙发','书架','窗台','沙发'];
const DURATION=30_000;
export default function NightLevel({locked,onWin,onWrong}:Props){
 const [step,setStep]=useState(0),[running,setRunning]=useState(false),[remaining,setRemaining]=useState(30),[expired,setExpired]=useState(false),[note,setNote]=useState('记住路线后开始检测。');
 const deadline=useRef(0),handled=useRef(false),wrong=useRef(onWrong);wrong.current=onWrong;
 function timeout(){if(handled.current)return;handled.current=true;setRunning(false);setExpired(true);setRemaining(0);setStep(0);setNote('本轮已超时。可以重新开始夜间检测。');wrong.current('夜间检测超时。行动过于谨慎，人类嫌疑 +15%。')}
 useEffect(()=>{if(!running||locked)return;const tick=()=>{const ms=deadline.current-Date.now();setRemaining(Math.max(0,Math.ceil(ms/1000)));if(ms<=0)timeout()};tick();const timer=setInterval(tick,100);return()=>clearInterval(timer)},[running,locked]);
 function start(){if(locked)return;handled.current=false;deadline.current=Date.now()+DURATION;setRemaining(30);setStep(0);setExpired(false);setNote('检测正在进行。');setRunning(true)}
 function jump(place:string){if(locked||!running)return;if(Date.now()>=deadline.current){timeout();return}if(place!==ROUTE[step]){onWrong('落点错误，跑酷节奏中断。人类嫌疑 +15%。');setNote(`落点错误，已完成 ${step} / 5，继续本步。`);return}const n=step+1;setStep(n);setNote(`动静等级 ${n} / 5`);if(n===ROUTE.length){handled.current=true;setRunning(false);onWin()}}
 return <div className="advanced-scene night-scene"><div className="night-clock"><span className="night-hour">房间时间 03:00</span><span role="timer" aria-label="夜间检测剩余时间">00:{String(remaining).padStart(2,'0')}</span><small>{locked?'检测结束':running?'剩余时间':'限时 30 秒 · 准备后开始'}</small></div><div className="route-clue">{!running&&!locked?'窗台 → 沙发 → 书架 → 窗台 → 沙发':`落点记录 ${step} / 5`}</div>{!running&&!locked?<button className="night-start primary" onClick={start}>{expired?'重新开始夜间检测':'开始夜间检测'}</button>:<div className="night-platforms">{['窗台','沙发','书架'].map((place,i)=><button aria-label={place} disabled={locked||!running} className={'platform platform-'+i} key={place} onClick={()=>jump(place)}><span aria-hidden="true">{['▥','▰','▤'][i]}</span>{place}</button>)}</div>}<p className="advanced-note" aria-live="polite">{note}</p></div>
}
