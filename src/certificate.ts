export async function saveCertificate(name:string,title:string){
 await document.fonts.ready;
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=1500;
 const context=canvas.getContext('2d');if(!context)throw Error('浏览器不支持图片导出');const c=context;
 c.fillStyle='#f7f8fb';c.fillRect(0,0,1200,1500);c.fillStyle='#fff';c.fillRect(70,70,1060,1360);c.strokeStyle='#c3cedd';c.lineWidth=3;c.strokeRect(95,95,1010,1310);c.strokeRect(110,110,980,1280);
 c.textAlign='center';c.fillStyle='#8d9bb0';c.font='20px sans-serif';c.fillText('CATNET · OFFICIAL CERTIFICATE',600,200);
 function paw(x:number,y:number,color:string){c.fillStyle=color;c.beginPath();c.ellipse(x,y+13,30,23,0,0,Math.PI*2);c.fill();for(const [dx,dy] of [[-35,-15],[-13,-36],[15,-36],[37,-14]]){c.beginPath();c.ellipse(x+dx,y+dy,10,14,dx/100,0,Math.PI*2);c.fill()}}
 paw(600,310,'#6f87aa');c.fillStyle='#344760';c.font='bold 54px sans-serif';c.fillText('猫类身份认证书',600,445);c.fillStyle='#95a0b1';c.font='24px sans-serif';c.fillText('人类通常不会这样使用网页。',600,503);c.fillStyle='#617c9f';c.font='34px sans-serif';c.fillText(title,600,610);
 c.strokeStyle='#e0e5ed';c.beginPath();c.moveTo(220,665);c.lineTo(980,665);c.stroke();
 const rows=[['姓名',name.trim()||'未提供，叫了也不一定回应'],['品种','标准家猫'],['人类嫌疑','已排除'],['认证意见','建议尽快提供纸箱']];
 rows.forEach(([label,value],i)=>{const y=750+i*94;c.textAlign='left';c.fillStyle='#96a1b2';c.font='25px sans-serif';c.fillText(label,225,y);c.fillStyle='#52657c';c.font='28px sans-serif';let size=28;while(c.measureText(value).width>550&&size>16){size--;c.font=`${size}px sans-serif`}c.fillText(value,425,y)});
 c.save();c.translate(880,1180);c.rotate(-.2);c.strokeStyle='#b46f69';c.lineWidth=4;c.strokeRect(-120,-62,240,125);paw(-65,-8,'#b46f69');c.fillStyle='#b46f69';c.font='28px sans-serif';c.fillText('审核通过',-10,13);c.restore();c.textAlign='center';c.fillStyle='#a4adbb';c.font='18px sans-serif';c.fillText('猫联网 · 为猫服务，偶尔也为人。',600,1325);
 const blob=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(Error('图片生成失败')),'image/png'));
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`猫籍证明-${(name.trim()||'未命名猫').replace(/[\\/:*?"<>|]/g,'_')}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);
}
