import { test, expect } from '@playwright/test';
async function drag(page:any,label:string,x:number,y:number){const item=page.getByRole('button',{name:label,exact:true});const box=await item.boundingBox();if(!box)throw Error('Missing drag target');await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(box.x+box.width/2+x,box.y+box.height/2+y,{steps:10});await page.mouse.up()}
test('five levels, wrong-answer feedback, hints, and certificate',async({page})=>{
await page.goto('/');await page.getByRole('button',{name:'我不是人类'}).click();
await page.getByRole('button',{name:/豪华云朵猫窝/}).click();await expect(page.getByText('你选择了符合人体工程学的昂贵猫窝。人类嫌疑 +15%。',{exact:true}).first()).toBeVisible();
await page.getByRole('button',{name:/一个普通的纸箱/}).click();await page.getByRole('button',{name:'下一项'}).click();
await drag(page,'拖动玻璃杯',110,80);await page.getByRole('button',{name:'下一项'}).click();
for(const key of ['Q','W','E'])await page.getByRole('button',{name:key,exact:true}).click();await page.getByRole('button',{name:'在键盘上坐下'}).click();await page.getByRole('button',{name:'下一项'}).click();
await page.getByRole('button',{name:'喵，开门。',exact:true}).click();await page.getByRole('button',{name:'留在原地'}).click();await page.getByRole('button',{name:'喵，再开一次。'}).click();await page.getByRole('button',{name:'下一项'}).click();
await drag(page,'请勿点击此按钮',0,90);await page.getByRole('button',{name:'领取证明'}).click();await expect(page.getByRole('heading',{name:'猫类身份认证书'})).toBeVisible();await expect(page.getByText('已排除 ✓')).toBeVisible();await page.screenshot({path:`test-results/certificate-${test.info().project.name}.png`,fullPage:true});
await page.getByRole('button',{name:'再当一次猫'}).click();await expect(page.getByRole('button',{name:'我不是人类'})).toBeVisible();
});
test('resume, shortcut ending, responsive layout',async({page})=>{
await page.goto('/');await page.evaluate(()=>{localStorage.setItem('cat-started','yes');localStorage.setItem('cat-level','4')});await page.reload();await expect(page.getByRole('heading',{name:'最终身份确认'})).toBeVisible();
for(let i=0;i<3;i++)await page.getByRole('button',{name:'拨动进度条线头'}).click();await expect(page.getByText('好奇型猫',{exact:true})).toBeVisible();
expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();
});
test('initial appearance and first level',async({page})=>{await page.goto('/');await page.getByRole('button',{name:'我不是人类'}).click();await page.screenshot({path:`test-results/game-${test.info().project.name}.png`,fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy()});
