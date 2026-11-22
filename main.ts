// Tiny stack VM for make.fun tiny-stack-vm-01-run-20261122, written fresh from
// program/generator/subject/ISA.md in the kit. Node 22, plain JS in a .ts file.
import {mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W} from 'node:fs';
import {join as J} from 'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
function run(p,q){
 const n=p.length,s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536),d=new Int16Array(n).fill(-1),v=new Int32Array(n);
 let sp=0,cp=0,pc=0,ip=0,ol=0,st=0;
 const e=x=>[Buffer.from(o.subarray(0,ol)),x];
 for(;;){
  if(st>=1e6)return e(10);
  if(pc<0||pc>=n)return e(9);
  let op=d[pc];
  if(op<0){
   const b=p[pc],k=b<=7||b>=16&&b<=34||b>=48&&b<=52||b>=64&&b<=65||b>=80&&b<=83;
   if(!k){d[pc]=255;return e(5)}
   const L=b==1?2:b==2?5:b>=48&&b<=51?3:1;
   if(pc+L>n){d[pc]=254;return e(9)}
   let im=0;
   if(b==1)im=p[pc+1]<<24>>24;
   else if(b==2)im=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;
   else if(b>=48&&b<=50){im=p[pc+1]|p[pc+2]<<8;if(im>=32768)im-=65536}
   else if(b==51)im=p[pc+1]|p[pc+2]<<8;
   d[pc]=b;v[pc]=im;op=b;
  }else if(op==255)return e(5);
  else if(op==254)return e(9);
  const im=v[pc],L=op==1?2:op==2?5:op>=48&&op<=51?3:1;
  st++;
  let a,b,t;
  switch(op){
   case 0:return e(0);
   case 1:case 2:if(sp>=256)return e(3);s[sp++]=im;pc+=L;break;
   case 3:if(sp<1)return e(2);sp--;pc++;break;
   case 4:if(sp<1)return e(2);if(sp>=256)return e(3);s[sp]=s[sp-1];sp++;pc++;break;
   case 5:if(sp<2)return e(2);t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;pc++;break;
   case 6:if(sp<2)return e(2);if(sp>=256)return e(3);s[sp]=s[sp-2];sp++;pc++;break;
   case 7:if(sp<3)return e(2);t=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=t;pc++;break;
   case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
    if(sp<2)return e(2);
    b=s[--sp];a=s[sp-1];
    if(op==16)s[sp-1]=a+b|0;
    else if(op==17)s[sp-1]=a-b|0;
    else if(op==18)s[sp-1]=Math.imul(a,b);
    else if(op==19){if(!b)return e(4);s[sp-1]=a==-2147483648&&b==-1?a:Math.trunc(a/b)|0}
    else if(op==20){if(!b)return e(4);s[sp-1]=a%b|0}
    else if(op==21){if(!b)return e(4);s[sp-1]=Math.trunc((a>>>0)/(b>>>0))|0}
    else if(op==22){if(!b)return e(4);s[sp-1]=(a>>>0)%(b>>>0)|0}
    else if(op==24)s[sp-1]=a&b;
    else if(op==25)s[sp-1]=a|b;
    else if(op==26)s[sp-1]=a^b;
    else if(op==28)s[sp-1]=a<<(b&31);
    else if(op==29)s[sp-1]=a>>(b&31);
    else if(op==30)s[sp-1]=(a>>>(b&31))|0;
    else if(op==32)s[sp-1]=a==b?1:0;
    else if(op==33)s[sp-1]=a<b?1:0;
    else s[sp-1]=(a>>>0)<(b>>>0)?1:0;
    pc++;break;
   case 23:if(sp<1)return e(2);s[sp-1]=-s[sp-1]|0;pc++;break;
   case 27:if(sp<1)return e(2);s[sp-1]=~s[sp-1];pc++;break;
   case 48:pc=pc+3+im;break;
   case 49:if(sp<1)return e(2);pc=s[--sp]==0?pc+3+im:pc+3;break;
   case 50:if(sp<1)return e(2);pc=s[--sp]!=0?pc+3+im:pc+3;break;
   case 51:if(cp>=64)return e(7);c[cp++]=pc+3;pc=im;break;
   case 52:if(cp<1)return e(8);pc=c[--cp];break;
   case 64:if(sp<1)return e(2);a=s[sp-1];if(a<0||a>255)return e(6);s[sp-1]=m[a];pc++;break;
   case 65:if(sp<2)return e(2);b=s[--sp];a=s[--sp];if(b<0||b>255)return e(6);m[b]=a;pc++;break;
   case 80:{if(sp<1)return e(2);const g=String(s[--sp]);if(ol+g.length>65536)return e(11);for(let i=0;i<g.length;i++)o[ol++]=g.charCodeAt(i);pc++;break}
   case 81:if(sp<1)return e(2);if(ol>=65536)return e(11);o[ol++]=s[--sp]&255;pc++;break;
   case 82:if(sp>=256)return e(3);s[sp++]=ip<q.length?q[ip++]:-1;pc++;break;
   case 83:if(sp<1)return e(2);return e(s[--sp]&255);
  }
 }
}
for(const id of R(I).sort()){
 const g=J(I,id);let p,q;
 try{p=F(J(g,'program.bin'))}catch{p=Buffer.alloc(0)}
 try{q=F(J(g,'input.bin'))}catch{q=Buffer.alloc(0)}
 const[O2,x]=run(p,q);
 M(J(O,id),{recursive:true});
 W(J(O,id,'stdout.bin'),O2);
 W(J(O,id,'exit.txt'),x+'\n');
}
