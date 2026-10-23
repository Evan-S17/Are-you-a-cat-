import { test, expect } from '@playwright/test';
async function drag(page:any,label:string,x:number,y:number){const item=page.getByRole('button',{name:label,exact:true});const box=await item.boundingBox();if(!box)throw Error('Missing drag target');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+x,box.y+box.height/2+y,{steps:10});await page.mouse.up()}
test('ten levels, wrong-answer feedback, hints, and certificate',async({page})=>{
await page.goto('/');await page.getByRole('button',{name:'我不是人类'}).click();
await page.getByRole('button',{name:/豪华云朵猫窝/}).click();await expect(page.getByText('你选择了符合人体工程学的昂贵猫窝。人类嫌疑 +15%。',{exact:true}).first()).toBeVisible();
await page.getByRole('button',{name:/一个普通的纸箱/}).click();await page.getByRole('button',{name:'下一项'}).click();
const cup=page.getByRole('button',{name:'拖动玻璃杯',exact:true});const cb=await cup.boundingBox();const room=await page.getByRole('img',{name:'可互动桌面场景'}).boundingBox();if(!cb||!room)throw Error('Missing desk');await page.mouse.move(cb.x+cb.width/2,cb.y+cb.height/2);await page.mouse.down();await page.mouse.move(cb.x+cb.width/2,room.y+room.height*.88,{steps:12});await page.mouse.up();await page.getByRole('button',{name:'下一项'}).click();
for(const key of ['Q','W','E'])await page.getByRole('button',{name:key,exact:true}).click();await page.getByRole('button',{name:'在键盘上坐下'}).click();await page.getByRole('button',{name:'下一项'}).click();
await page.getByRole('button',{name:'喵，开门。',exact:true}).click();await page.getByRole('button',{name:'留在原地'}).click();await page.getByRole('button',{name:'喵，再开一次。'}).click();await page.getByRole('button',{name:'下一项'}).click();
await page.getByRole('button',{name:'看向窗外',exact:true}).click();await page.getByRole('button',{name:'背过身舔爪子'}).click();await page.getByRole('button',{name:'下一项'}).click();
await page.getByRole('button',{name:'工作人员的杯子',exact:false}).click();await page.getByRole('button',{name:'饮用杯中水',exact:false}).click();await page.getByRole('button',{name:'下一项'}).click();
for(let i=0;i<3;i++)await page.getByRole('button',{name:'捕获红点',exact:true}).click();const pen=await page.getByRole('button',{name:'按住激光笔',exact:true}).boundingBox();if(!pen)throw Error('No laser');await page.mouse.move(pen.x+pen.width/2,pen.y+pen.height/2);await page.mouse.down();await page.waitForTimeout(800);await page.mouse.up();await page.getByRole('button',{name:'下一项'}).click();
for(const name of ['窗台','沙发','书架','窗台','沙发'])await page.getByRole('button',{name,exact:true}).click();await page.getByRole('button',{name:'下一项'}).click();
for(const name of ['钥匙','鼠标','工作证']){const item=page.getByRole('button',{name:'拖动'+name,exact:true});await item.focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter')}await page.getByRole('button',{name:'下一项'}).click();
await drag(page,'请勿点击此按钮',0,90);await page.getByRole('button',{name:'领取证明'}).click();await expect(page.getByRole('heading',{name:'猫类身份认证书'})).toBeVisible();await expect(page.getByText('已排除 ✓')).toBeVisible();await page.screenshot({path:`test-results/certificate-${test.info().project.name}.png`,fullPage:true});
await page.getByRole('button',{name:'再当一次猫'}).click();await expect(page.getByRole('button',{name:'我不是人类'})).toBeVisible();
});
test('resume, shortcut ending, responsive layout',async({page})=>{
await page.goto('/');await page.evaluate(()=>{localStorage.setItem('cat-started','yes');localStorage.setItem('cat-level','9')});await page.reload();await expect(page.getByRole('heading',{name:'最终身份确认'})).toBeVisible();
for(let i=0;i<3;i++)await page.getByRole('button',{name:'拨动进度条线头'}).click();await expect(page.getByText('好奇型猫',{exact:true})).toBeVisible();
expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
});
test('initial appearance and first level',async({page})=>{await page.goto('/');await page.getByRole('button',{name:'我不是人类'}).click();await page.screenshot({path:`test-results/game-${test.info().project.name}.png`,fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy()});
test('custom name, PNG download, real keyboard and elimination',async({page})=>{
 await page.goto('/');await page.getByLabel('你的猫名').fill('小鱼干 <猫>');await page.getByRole('button',{name:'我不是人类'}).click();
 await page.evaluate(()=>localStorage.setItem('cat-level','2'));await page.reload();
 await expect(page.getByRole('heading',{name:'协助办公'})).toBeVisible();await page.keyboard.type('cat',{delay:60});await expect(page.locator('.document p')).toContainText('c喵a喵t喵');await page.getByRole('button',{name:'在键盘上坐下'}).click();
 await page.evaluate(()=>localStorage.setItem('cat-level','9'));await page.reload();for(let i=0;i<3;i++)await page.getByRole('button',{name:'拨动进度条线头'}).click();
 await expect(page.locator('.certificate-player')).toHaveText('小鱼干 <猫>');
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'保存证书图片'}).click();const file=await downloaded;expect(file.suggestedFilename()).toMatch(/\.png$/);const stream=await file.createReadStream();const buffers=[];for await(const chunk of stream!)buffers.push(chunk);const data=Buffer.concat(buffers);expect(data.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');expect(data.readUInt32BE(16)).toBe(1200);expect(data.readUInt32BE(20)).toBe(1500);
 await page.getByRole('button',{name:'再当一次猫'}).click();await page.getByRole('button',{name:'我不是人类'}).click();for(let i=0;i<7;i++)await page.getByRole('button',{name:/豪华云朵猫窝/}).click();await expect(page.getByRole('heading',{name:'检测到人类行为'})).toBeVisible();await expect(page.getByRole('meter',{name:'人类嫌疑'})).toHaveAttribute('aria-valuenow','100');await page.reload();await expect(page.getByRole('heading',{name:'检测到人类行为'})).toBeVisible();await expect(page.getByRole('button',{name:'拨动进度条线头'})).toBeDisabled();await page.getByRole('button',{name:'重新验证',exact:true}).first().click();await expect(page.getByRole('button',{name:'我不是人类'})).toBeVisible();
});
test('every desk object is movable; only floor release passes',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{localStorage.setItem('cat-started','yes');localStorage.setItem('cat-level','1')});await page.reload();
 for(const name of ['笔记本电脑','书本','玻璃杯','手机','钢笔']){const item=page.getByRole('button',{name:'拖动'+name,exact:true});const b=await item.boundingBox();if(!b)throw Error('No object');await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2+8,b.y+b.height/2+8,{steps:3});await page.mouse.up();await expect(page.getByRole('button',{name:'下一项'})).toHaveCount(0)}
 const cup=page.getByRole('button',{name:'拖动玻璃杯',exact:true});await cup.focus();for(let i=0;i<6;i++)await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'下一项'})).toBeVisible();
 await page.screenshot({path:`test-results/desk-${test.info().project.name}.png`,fullPage:true});
});
test('progressive hints, laser hold, memory error, and ownership drag',async({page})=>{
 await page.goto('/');await page.evaluate(()=>{localStorage.setItem('cat-started','yes');localStorage.setItem('cat-level','6')});await page.reload();await expect(page.getByRole('button',{name:'独立审查中'})).toBeDisabled();
 const device=page.getByRole('button',{name:'按住激光笔'});await device.focus();await page.keyboard.down('Space');await page.waitForTimeout(800);await page.keyboard.up('Space');await expect(page.getByRole('button',{name:'下一项'})).toHaveCount(0);
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'捕获红点'}).click();await device.focus();await page.keyboard.down('Space');await page.waitForTimeout(800);await page.keyboard.up('Space');await page.getByRole('button',{name:'下一项'}).click();
 await page.getByRole('button',{name:'沙发',exact:true}).click();await page.getByRole('button',{name:'沙发',exact:true}).click();await expect(page.getByRole('button',{name:'有限提示'})).toBeEnabled();await page.getByRole('button',{name:'有限提示'}).click();await expect(page.locator('.help-box')).toHaveText('先记住，再行动。');
 for(const name of ['窗台','沙发','书架','窗台','沙发'])await page.getByRole('button',{name,exact:true}).click();await page.getByRole('button',{name:'下一项'}).click();await expect(page.locator('.help-box')).toHaveCount(0);await expect(page.getByRole('button',{name:'需要帮助？'})).toHaveCount(0);
 for(const name of ['钥匙','鼠标','工作证']){const item=page.getByRole('button',{name:'拖动'+name,exact:true});const b=await item.boundingBox();const zone=await page.locator('.claim-box').boundingBox();if(!b||!zone)throw Error('Missing object');await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(zone.x+zone.width/2,zone.y+zone.height/2,{steps:10});await page.mouse.up()}
 await page.getByRole('button',{name:'下一项'}).click();await expect(page.getByRole('heading',{name:'最终身份确认'})).toBeVisible();await expect(page.locator('.help-box')).toHaveCount(0);await expect(page.locator('.panel-bottom button')).toHaveCount(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await page.screenshot({path:`test-results/final-${test.info().project.name}.png`,fullPage:true});
});
