(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=e(n);fetch(n.href,r)}})();const Ta="181",An={ROTATE:0,DOLLY:1,PAN:2},wn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kl=0,Za=1,Wl=2,sl=1,Xl=2,Si=3,zi=0,ze=1,Ke=2,yi=0,Qi=1,Ya=2,qa=3,$a=4,Zl=5,Ki=100,Yl=101,ql=102,$l=103,jl=104,Kl=200,Jl=201,Ql=202,tc=203,Ir=204,Ur=205,ec=206,ic=207,nc=208,sc=209,rc=210,ac=211,oc=212,lc=213,cc=214,Fr=0,Nr=1,Or=2,Rn=3,Br=4,zr=5,Gr=6,Hr=7,wa=0,hc=1,dc=2,Oi=0,uc=1,fc=2,pc=3,mc=4,gc=5,xc=6,_c=7,rl=300,Dn=301,Pn=302,Vr=303,kr=304,qs=306,Wr=1e3,bi=1001,Xr=1002,Ye=1003,vc=1004,as=1005,Qe=1006,tr=1007,Fi=1008,fi=1009,al=1010,ol=1011,jn=1012,Aa=1013,tn=1014,di=1015,Fn=1016,Ca=1017,Ra=1018,Kn=1020,ll=35902,cl=35899,hl=1021,dl=1022,ri=1023,Jn=1026,Qn=1027,Da=1028,Pa=1029,La=1030,Ia=1031,Ua=1033,Fs=33776,Ns=33777,Os=33778,Bs=33779,Zr=35840,Yr=35841,qr=35842,$r=35843,jr=36196,Kr=37492,Jr=37496,Qr=37808,ta=37809,ea=37810,ia=37811,na=37812,sa=37813,ra=37814,aa=37815,oa=37816,la=37817,ca=37818,ha=37819,da=37820,ua=37821,fa=36492,pa=36494,ma=36495,ga=36283,xa=36284,_a=36285,va=36286,Mc=3200,Sc=3201,ul=0,bc=1,Ui="",Xe="srgb",Ln="srgb-linear",Hs="linear",ee="srgb",on=7680,ja=519,yc=512,Ec=513,Tc=514,fl=515,wc=516,Ac=517,Cc=518,Rc=519,Ma=35044,$i=35048,Ka="300 es",ui=2e3,Vs=2001;function pl(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ks(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Dc(){const s=ks("canvas");return s.style.display="block",s}const Ja={};function Ws(...s){const t="THREE."+s.shift();console.log(t,...s)}function Lt(...s){const t="THREE."+s.shift();console.warn(t,...s)}function pe(...s){const t="THREE."+s.shift();console.error(t,...s)}function ts(...s){const t=s.join(" ");t in Ja||(Ja[t]=!0,Lt(...s))}function Pc(s,t,e){return new Promise(function(i,n){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:n();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}class sn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const r=n.indexOf(e);r!==-1&&n.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,t);t.target=null}}}const we=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],zs=Math.PI/180,Sa=180/Math.PI;function Bi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(we[s&255]+we[s>>8&255]+we[s>>16&255]+we[s>>24&255]+"-"+we[t&255]+we[t>>8&255]+"-"+we[t>>16&15|64]+we[t>>24&255]+"-"+we[e&63|128]+we[e>>8&255]+"-"+we[e>>16&255]+we[e>>24&255]+we[i&255]+we[i>>8&255]+we[i>>16&255]+we[i>>24&255]).toLowerCase()}function Ht(s,t,e){return Math.max(t,Math.min(e,s))}function Lc(s,t){return(s%t+t)%t}function er(s,t,e){return(1-e)*s+e*t}function hi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ie(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ic={DEG2RAD:zs};class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*n+t.x,this.y=r*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class en{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,r,a,o){let c=i[n+0],l=i[n+1],d=i[n+2],u=i[n+3],f=r[a+0],m=r[a+1],x=r[a+2],_=r[a+3];if(o<=0){t[e+0]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u;return}if(o>=1){t[e+0]=f,t[e+1]=m,t[e+2]=x,t[e+3]=_;return}if(u!==_||c!==f||l!==m||d!==x){let g=c*f+l*m+d*x+u*_;g<0&&(f=-f,m=-m,x=-x,_=-_,g=-g);let p=1-o;if(g<.9995){const w=Math.acos(g),b=Math.sin(w);p=Math.sin(p*w)/b,o=Math.sin(o*w)/b,c=c*p+f*o,l=l*p+m*o,d=d*p+x*o,u=u*p+_*o}else{c=c*p+f*o,l=l*p+m*o,d=d*p+x*o,u=u*p+_*o;const w=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=w,l*=w,d*=w,u*=w}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,r,a){const o=i[n],c=i[n+1],l=i[n+2],d=i[n+3],u=r[a],f=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+d*u+c*m-l*f,t[e+1]=c*x+d*f+l*u-o*m,t[e+2]=l*x+d*m+o*f-c*u,t[e+3]=d*x-o*u-c*f-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),d=o(n/2),u=o(r/2),f=c(i/2),m=c(n/2),x=c(r/2);switch(a){case"XYZ":this._x=f*d*u+l*m*x,this._y=l*m*u-f*d*x,this._z=l*d*x+f*m*u,this._w=l*d*u-f*m*x;break;case"YXZ":this._x=f*d*u+l*m*x,this._y=l*m*u-f*d*x,this._z=l*d*x-f*m*u,this._w=l*d*u+f*m*x;break;case"ZXY":this._x=f*d*u-l*m*x,this._y=l*m*u+f*d*x,this._z=l*d*x+f*m*u,this._w=l*d*u-f*m*x;break;case"ZYX":this._x=f*d*u-l*m*x,this._y=l*m*u+f*d*x,this._z=l*d*x-f*m*u,this._w=l*d*u+f*m*x;break;case"YZX":this._x=f*d*u+l*m*x,this._y=l*m*u+f*d*x,this._z=l*d*x-f*m*u,this._w=l*d*u-f*m*x;break;case"XZY":this._x=f*d*u-l*m*x,this._y=l*m*u-f*d*x,this._z=l*d*x+f*m*u,this._w=l*d*u+f*m*x;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],d=e[6],u=e[10],f=i+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(a-n)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(d-c)/m,this._x=.25*m,this._y=(n+a)/m,this._z=(r+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(r-l)/m,this._x=(n+a)/m,this._y=.25*m,this._z=(c+d)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-n)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,d=e._w;return this._x=i*d+a*o+n*l-r*c,this._y=n*d+a*c+r*o-i*l,this._z=r*d+a*l+i*c-n*o,this._w=a*d-i*o-n*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,n=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),d=Math.sin(l);c=Math.sin(c*l)/d,e=Math.sin(e*l)/d,this._x=this._x*c+i*e,this._y=this._y*c+n*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+i*e,this._y=this._y*c+n*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,i=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Qa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Qa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*n,this.y=r[1]*e+r[4]*i+r[7]*n,this.z=r[2]*e+r[5]*i+r[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*n+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*n+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*n+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*n+r[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*n-o*i),d=2*(o*e-r*n),u=2*(r*i-a*e);return this.x=e+c*l+a*u-o*d,this.y=i+c*d+o*l-r*u,this.z=n+c*u+r*d-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n,this.y=r[1]*e+r[5]*i+r[9]*n,this.z=r[2]*e+r[6]*i+r[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=n*c-r*o,this.y=r*a-i*c,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ir.copy(this).projectOnVector(t),this.sub(ir)}reflect(t){return this.sub(ir.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ir=new I,Qa=new en;class Bt{constructor(t,e,i,n,r,a,o,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,c,l)}set(t,e,i,n,r,a,o,c,l){const d=this.elements;return d[0]=t,d[1]=n,d[2]=o,d[3]=e,d[4]=r,d[5]=c,d[6]=i,d[7]=a,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],d=i[4],u=i[7],f=i[2],m=i[5],x=i[8],_=n[0],g=n[3],p=n[6],w=n[1],b=n[4],T=n[7],C=n[2],E=n[5],R=n[8];return r[0]=a*_+o*w+c*C,r[3]=a*g+o*b+c*E,r[6]=a*p+o*T+c*R,r[1]=l*_+d*w+u*C,r[4]=l*g+d*b+u*E,r[7]=l*p+d*T+u*R,r[2]=f*_+m*w+x*C,r[5]=f*g+m*b+x*E,r[8]=f*p+m*T+x*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8];return e*a*d-e*o*l-i*r*d+i*o*c+n*r*l-n*a*c}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],u=d*a-o*l,f=o*c-d*r,m=l*r-a*c,x=e*u+i*f+n*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/x;return t[0]=u*_,t[1]=(n*l-d*i)*_,t[2]=(o*i-n*a)*_,t[3]=f*_,t[4]=(d*e-n*c)*_,t[5]=(n*r-o*e)*_,t[6]=m*_,t[7]=(i*c-l*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-n*l,n*c,-n*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(nr.makeScale(t,e)),this}rotate(t){return this.premultiply(nr.makeRotation(-t)),this}translate(t,e){return this.premultiply(nr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const nr=new Bt,to=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),eo=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uc(){const s={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(n,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ee&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[r].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(n.r=Cn(n.r),n.g=Cn(n.g),n.b=Cn(n.b))),n},workingToColorSpace:function(n,r){return this.convert(n,this.workingColorSpace,r)},colorSpaceToWorking:function(n,r){return this.convert(n,r,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Ui?Hs:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,r=this.workingColorSpace){return n.fromArray(this.spaces[r].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,r,a){return n.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,r){return ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(n,r)},toWorkingColorSpace:function(n,r){return ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(n,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return s.define({[Ln]:{primaries:t,whitePoint:i,transfer:Hs,toXYZ:to,fromXYZ:eo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Xe},outputColorSpaceConfig:{drawingBufferColorSpace:Xe}},[Xe]:{primaries:t,whitePoint:i,transfer:ee,toXYZ:to,fromXYZ:eo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Xe}}}),s}const jt=Uc();function Ei(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Cn(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let ln;class Fc{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ln===void 0&&(ln=ks("canvas")),ln.width=t.width,ln.height=t.height;const n=ln.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=ln}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ks("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),r=n.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nc=0;class Fa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nc++}),this.uuid=Bi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let r;if(Array.isArray(n)){r=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?r.push(sr(n[a].image)):r.push(sr(n[a]))}else r=sr(n);i.url=r}return e||(t.images[this.uuid]=i),i}}function sr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let Oc=0;const rr=new I;class Re extends sn{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,i=bi,n=bi,r=Qe,a=Fi,o=ri,c=fi,l=Re.DEFAULT_ANISOTROPY,d=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Oc++}),this.uuid=Bi(),this.name="",this.source=new Fa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(rr).x}get height(){return this.source.getSize(rr).y}get depth(){return this.source.getSize(rr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wr:t.x=t.x-Math.floor(t.x);break;case bi:t.x=t.x<0?0:1;break;case Xr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wr:t.y=t.y-Math.floor(t.y);break;case bi:t.y=t.y<0?0:1;break;case Xr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=rl;Re.DEFAULT_ANISOTROPY=1;class xe{constructor(t=0,e=0,i=0,n=1){xe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,r;const c=t.elements,l=c[0],d=c[4],u=c[8],f=c[1],m=c[5],x=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(d-f)<.01&&Math.abs(u-_)<.01&&Math.abs(x-g)<.01){if(Math.abs(d+f)<.1&&Math.abs(u+_)<.1&&Math.abs(x+g)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,T=(m+1)/2,C=(p+1)/2,E=(d+f)/4,R=(u+_)/4,N=(x+g)/4;return b>T&&b>C?b<.01?(i=0,n=.707106781,r=.707106781):(i=Math.sqrt(b),n=E/i,r=R/i):T>C?T<.01?(i=.707106781,n=0,r=.707106781):(n=Math.sqrt(T),i=E/n,r=N/n):C<.01?(i=.707106781,n=.707106781,r=0):(r=Math.sqrt(C),i=R/r,n=N/r),this.set(i,n,r,e),this}let w=Math.sqrt((g-x)*(g-x)+(u-_)*(u-_)+(f-d)*(f-d));return Math.abs(w)<.001&&(w=1),this.x=(g-x)/w,this.y=(u-_)/w,this.z=(f-d)/w,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bc extends sn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);const n={width:t,height:e,depth:i.depth},r=new Re(n);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Qe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,r=this.textures.length;n<r;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Fa(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nn extends Bc{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class ml extends Re{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zc extends Re{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=bi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rn{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ei.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ei.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ei.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ei):ei.fromBufferAttribute(r,a),ei.applyMatrix4(t.matrixWorld),this.expandByPoint(ei);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),os.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),os.copy(i.boundingBox)),os.applyMatrix4(t.matrixWorld),this.union(os)}const n=t.children;for(let r=0,a=n.length;r<a;r++)this.expandByObject(n[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ei),ei.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bn),ls.subVectors(this.max,Bn),cn.subVectors(t.a,Bn),hn.subVectors(t.b,Bn),dn.subVectors(t.c,Bn),Ci.subVectors(hn,cn),Ri.subVectors(dn,hn),ki.subVectors(cn,dn);let e=[0,-Ci.z,Ci.y,0,-Ri.z,Ri.y,0,-ki.z,ki.y,Ci.z,0,-Ci.x,Ri.z,0,-Ri.x,ki.z,0,-ki.x,-Ci.y,Ci.x,0,-Ri.y,Ri.x,0,-ki.y,ki.x,0];return!ar(e,cn,hn,dn,ls)||(e=[1,0,0,0,1,0,0,0,1],!ar(e,cn,hn,dn,ls))?!1:(cs.crossVectors(Ci,Ri),e=[cs.x,cs.y,cs.z],ar(e,cn,hn,dn,ls))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ei).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ei).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const mi=[new I,new I,new I,new I,new I,new I,new I,new I],ei=new I,os=new rn,cn=new I,hn=new I,dn=new I,Ci=new I,Ri=new I,ki=new I,Bn=new I,ls=new I,cs=new I,Wi=new I;function ar(s,t,e,i,n){for(let r=0,a=s.length-3;r<=a;r+=3){Wi.fromArray(s,r);const o=n.x*Math.abs(Wi.x)+n.y*Math.abs(Wi.y)+n.z*Math.abs(Wi.z),c=t.dot(Wi),l=e.dot(Wi),d=i.dot(Wi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>o)return!1}return!0}const Gc=new rn,zn=new I,or=new I;class oi{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Gc.setFromPoints(t).getCenter(i);let n=0;for(let r=0,a=t.length;r<a;r++)n=Math.max(n,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zn.subVectors(t,this.center);const e=zn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(zn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(or.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zn.copy(t.center).add(or)),this.expandByPoint(zn.copy(t.center).sub(or))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const gi=new I,lr=new I,hs=new I,Di=new I,cr=new I,ds=new I,hr=new I;class es{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,gi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=gi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(gi.copy(this.origin).addScaledVector(this.direction,e),gi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){lr.copy(t).add(e).multiplyScalar(.5),hs.copy(e).sub(t).normalize(),Di.copy(this.origin).sub(lr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(hs),o=Di.dot(this.direction),c=-Di.dot(hs),l=Di.lengthSq(),d=Math.abs(1-a*a);let u,f,m,x;if(d>0)if(u=a*c-o,f=a*o-c,x=r*d,u>=0)if(f>=-x)if(f<=x){const _=1/d;u*=_,f*=_,m=u*(u+a*f+2*o)+f*(a*u+f+2*c)+l}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;else f<=-x?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l):f<=x?(u=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(lr).addScaledVector(hs,f),m}intersectSphere(t,e){gi.subVectors(t.center,this.origin);const i=gi.dot(this.direction),n=gi.dot(gi)-i*i,r=t.radius*t.radius;if(n>r)return null;const a=Math.sqrt(r-n),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,r,a,o,c;const l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,n=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,n=(t.min.x-f.x)*l),d>=0?(r=(t.min.y-f.y)*d,a=(t.max.y-f.y)*d):(r=(t.max.y-f.y)*d,a=(t.min.y-f.y)*d),i>a||r>n||((r>i||isNaN(i))&&(i=r),(a<n||isNaN(n))&&(n=a),u>=0?(o=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(o=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||o>n)||((o>i||i!==i)&&(i=o),(c<n||n!==n)&&(n=c),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,gi)!==null}intersectTriangle(t,e,i,n,r){cr.subVectors(e,t),ds.subVectors(i,t),hr.crossVectors(cr,ds);let a=this.direction.dot(hr),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Di.subVectors(this.origin,t);const c=o*this.direction.dot(ds.crossVectors(Di,ds));if(c<0)return null;const l=o*this.direction.dot(cr.cross(Di));if(l<0||c+l>a)return null;const d=-o*Di.dot(hr);return d<0?null:this.at(d/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,i,n,r,a,o,c,l,d,u,f,m,x,_,g){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,r,a,o,c,l,d,u,f,m,x,_,g)}set(t,e,i,n,r,a,o,c,l,d,u,f,m,x,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=d,p[10]=u,p[14]=f,p[3]=m,p[7]=x,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/un.setFromMatrixColumn(t,0).length(),r=1/un.setFromMatrixColumn(t,1).length(),a=1/un.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(n),l=Math.sin(n),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=a*d,m=a*u,x=o*d,_=o*u;e[0]=c*d,e[4]=-c*u,e[8]=l,e[1]=m+x*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=x+m*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*d,m=c*u,x=l*d,_=l*u;e[0]=f+_*o,e[4]=x*o-m,e[8]=a*l,e[1]=a*u,e[5]=a*d,e[9]=-o,e[2]=m*o-x,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*d,m=c*u,x=l*d,_=l*u;e[0]=f-_*o,e[4]=-a*u,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*d,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*d,m=a*u,x=o*d,_=o*u;e[0]=c*d,e[4]=x*l-m,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=m*l-x,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,m=a*l,x=o*c,_=o*l;e[0]=c*d,e[4]=_-f*u,e[8]=x*u+m,e[1]=u,e[5]=a*d,e[9]=-o*d,e[2]=-l*d,e[6]=m*u+x,e[10]=f-_*u}else if(t.order==="XZY"){const f=a*c,m=a*l,x=o*c,_=o*l;e[0]=c*d,e[4]=-u,e[8]=l*d,e[1]=f*u+_,e[5]=a*d,e[9]=m*u-x,e[2]=x*u-m,e[6]=o*d,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hc,t,Vc)}lookAt(t,e,i){const n=this.elements;return ke.subVectors(t,e),ke.lengthSq()===0&&(ke.z=1),ke.normalize(),Pi.crossVectors(i,ke),Pi.lengthSq()===0&&(Math.abs(i.z)===1?ke.x+=1e-4:ke.z+=1e-4,ke.normalize(),Pi.crossVectors(i,ke)),Pi.normalize(),us.crossVectors(ke,Pi),n[0]=Pi.x,n[4]=us.x,n[8]=ke.x,n[1]=Pi.y,n[5]=us.y,n[9]=ke.y,n[2]=Pi.z,n[6]=us.z,n[10]=ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],d=i[1],u=i[5],f=i[9],m=i[13],x=i[2],_=i[6],g=i[10],p=i[14],w=i[3],b=i[7],T=i[11],C=i[15],E=n[0],R=n[4],N=n[8],y=n[12],M=n[1],L=n[5],O=n[9],H=n[13],X=n[2],W=n[6],q=n[10],Q=n[14],k=n[3],nt=n[7],at=n[11],Et=n[15];return r[0]=a*E+o*M+c*X+l*k,r[4]=a*R+o*L+c*W+l*nt,r[8]=a*N+o*O+c*q+l*at,r[12]=a*y+o*H+c*Q+l*Et,r[1]=d*E+u*M+f*X+m*k,r[5]=d*R+u*L+f*W+m*nt,r[9]=d*N+u*O+f*q+m*at,r[13]=d*y+u*H+f*Q+m*Et,r[2]=x*E+_*M+g*X+p*k,r[6]=x*R+_*L+g*W+p*nt,r[10]=x*N+_*O+g*q+p*at,r[14]=x*y+_*H+g*Q+p*Et,r[3]=w*E+b*M+T*X+C*k,r[7]=w*R+b*L+T*W+C*nt,r[11]=w*N+b*O+T*q+C*at,r[15]=w*y+b*H+T*Q+C*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],d=t[2],u=t[6],f=t[10],m=t[14],x=t[3],_=t[7],g=t[11],p=t[15];return x*(+r*c*u-n*l*u-r*o*f+i*l*f+n*o*m-i*c*m)+_*(+e*c*m-e*l*f+r*a*f-n*a*m+n*l*d-r*c*d)+g*(+e*l*u-e*o*m-r*a*u+i*a*m+r*o*d-i*l*d)+p*(-n*o*d-e*c*u+e*o*f+n*a*u-i*a*f+i*c*d)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],d=t[8],u=t[9],f=t[10],m=t[11],x=t[12],_=t[13],g=t[14],p=t[15],w=u*g*l-_*f*l+_*c*m-o*g*m-u*c*p+o*f*p,b=x*f*l-d*g*l-x*c*m+a*g*m+d*c*p-a*f*p,T=d*_*l-x*u*l+x*o*m-a*_*m-d*o*p+a*u*p,C=x*u*c-d*_*c-x*o*f+a*_*f+d*o*g-a*u*g,E=e*w+i*b+n*T+r*C;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/E;return t[0]=w*R,t[1]=(_*f*r-u*g*r-_*n*m+i*g*m+u*n*p-i*f*p)*R,t[2]=(o*g*r-_*c*r+_*n*l-i*g*l-o*n*p+i*c*p)*R,t[3]=(u*c*r-o*f*r-u*n*l+i*f*l+o*n*m-i*c*m)*R,t[4]=b*R,t[5]=(d*g*r-x*f*r+x*n*m-e*g*m-d*n*p+e*f*p)*R,t[6]=(x*c*r-a*g*r-x*n*l+e*g*l+a*n*p-e*c*p)*R,t[7]=(a*f*r-d*c*r+d*n*l-e*f*l-a*n*m+e*c*m)*R,t[8]=T*R,t[9]=(x*u*r-d*_*r-x*i*m+e*_*m+d*i*p-e*u*p)*R,t[10]=(a*_*r-x*o*r+x*i*l-e*_*l-a*i*p+e*o*p)*R,t[11]=(d*o*r-a*u*r-d*i*l+e*u*l+a*i*m-e*o*m)*R,t[12]=C*R,t[13]=(d*_*n-x*u*n+x*i*f-e*_*f-d*i*g+e*u*g)*R,t[14]=(x*o*n-a*_*n-x*i*c+e*_*c+a*i*g-e*o*g)*R,t[15]=(a*u*n-d*o*n+d*i*c-e*u*c-a*i*f+e*o*f)*R,this}scale(t){const e=this.elements,i=t.x,n=t.y,r=t.z;return e[0]*=i,e[4]*=n,e[8]*=r,e[1]*=i,e[5]*=n,e[9]*=r,e[2]*=i,e[6]*=n,e[10]*=r,e[3]*=i,e[7]*=n,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,d=r*o;return this.set(l*a+i,l*o-n*c,l*c+n*o,0,l*o+n*c,d*o+i,d*c-n*a,0,l*c-n*o,d*c+n*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,r,a){return this.set(1,i,r,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,d=a+a,u=o+o,f=r*l,m=r*d,x=r*u,_=a*d,g=a*u,p=o*u,w=c*l,b=c*d,T=c*u,C=i.x,E=i.y,R=i.z;return n[0]=(1-(_+p))*C,n[1]=(m+T)*C,n[2]=(x-b)*C,n[3]=0,n[4]=(m-T)*E,n[5]=(1-(f+p))*E,n[6]=(g+w)*E,n[7]=0,n[8]=(x+b)*R,n[9]=(g-w)*R,n[10]=(1-(f+_))*R,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let r=un.set(n[0],n[1],n[2]).length();const a=un.set(n[4],n[5],n[6]).length(),o=un.set(n[8],n[9],n[10]).length();this.determinant()<0&&(r=-r),t.x=n[12],t.y=n[13],t.z=n[14],ii.copy(this);const l=1/r,d=1/a,u=1/o;return ii.elements[0]*=l,ii.elements[1]*=l,ii.elements[2]*=l,ii.elements[4]*=d,ii.elements[5]*=d,ii.elements[6]*=d,ii.elements[8]*=u,ii.elements[9]*=u,ii.elements[10]*=u,e.setFromRotationMatrix(ii),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,n,r,a,o=ui,c=!1){const l=this.elements,d=2*r/(e-t),u=2*r/(i-n),f=(e+t)/(e-t),m=(i+n)/(i-n);let x,_;if(c)x=r/(a-r),_=a*r/(a-r);else if(o===ui)x=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Vs)x=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,r,a,o=ui,c=!1){const l=this.elements,d=2/(e-t),u=2/(i-n),f=-(e+t)/(e-t),m=-(i+n)/(i-n);let x,_;if(c)x=1/(a-r),_=a/(a-r);else if(o===ui)x=-2/(a-r),_=-(a+r)/(a-r);else if(o===Vs)x=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=d,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const un=new I,ii=new Kt,Hc=new I(0,0,0),Vc=new I(1,1,1),Pi=new I,us=new I,ke=new I,io=new Kt,no=new en;class pi{constructor(t=0,e=0,i=0,n=pi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,r=n[0],a=n[4],o=n[8],c=n[1],l=n[5],d=n[9],u=n[2],f=n[6],m=n[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ht(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return io.makeRotationFromQuaternion(t),this.setFromRotationMatrix(io,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return no.setFromEuler(this),this.setFromQuaternion(no,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pi.DEFAULT_ORDER="XYZ";class Na{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kc=0;const so=new I,fn=new en,xi=new Kt,fs=new I,Gn=new I,Wc=new I,Xc=new en,ro=new I(1,0,0),ao=new I(0,1,0),oo=new I(0,0,1),lo={type:"added"},Zc={type:"removed"},pn={type:"childadded",child:null},dr={type:"childremoved",child:null};class _e extends sn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kc++}),this.uuid=Bi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_e.DEFAULT_UP.clone();const t=new I,e=new pi,i=new en,n=new I(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Bt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=_e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fn.setFromAxisAngle(t,e),this.quaternion.multiply(fn),this}rotateOnWorldAxis(t,e){return fn.setFromAxisAngle(t,e),this.quaternion.premultiply(fn),this}rotateX(t){return this.rotateOnAxis(ro,t)}rotateY(t){return this.rotateOnAxis(ao,t)}rotateZ(t){return this.rotateOnAxis(oo,t)}translateOnAxis(t,e){return so.copy(t).applyQuaternion(this.quaternion),this.position.add(so.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ro,t)}translateY(t){return this.translateOnAxis(ao,t)}translateZ(t){return this.translateOnAxis(oo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?fs.copy(t):fs.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(Gn,fs,this.up):xi.lookAt(fs,Gn,this.up),this.quaternion.setFromRotationMatrix(xi),n&&(xi.extractRotation(n.matrixWorld),fn.setFromRotationMatrix(xi),this.quaternion.premultiply(fn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(pe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(lo),pn.child=t,this.dispatchEvent(pn),pn.child=null):pe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Zc),dr.child=t,this.dispatchEvent(dr),dr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xi.multiply(t.parent.matrixWorld)),t.applyMatrix4(xi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(lo),pn.child=t,this.dispatchEvent(pn),pn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,t,Wc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,Xc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let r=0,a=n.length;r<a;r++)n[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));n.material=o}else n.material=r(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];n.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),d=a(t.images),u=a(t.shapes),f=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),d.length>0&&(i.images=d),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),x.length>0&&(i.nodes=x)}return i.object=n,i;function a(o){const c=[];for(const l in o){const d=o[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}_e.DEFAULT_UP=new I(0,1,0);_e.DEFAULT_MATRIX_AUTO_UPDATE=!0;_e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ni=new I,_i=new I,ur=new I,vi=new I,mn=new I,gn=new I,co=new I,fr=new I,pr=new I,mr=new I,gr=new xe,xr=new xe,_r=new xe;class Je{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ni.subVectors(t,e),n.cross(ni);const r=n.lengthSq();return r>0?n.multiplyScalar(1/Math.sqrt(r)):n.set(0,0,0)}static getBarycoord(t,e,i,n,r){ni.subVectors(n,e),_i.subVectors(i,e),ur.subVectors(t,e);const a=ni.dot(ni),o=ni.dot(_i),c=ni.dot(ur),l=_i.dot(_i),d=_i.dot(ur),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(l*c-o*d)*f,x=(a*d-o*c)*f;return r.set(1-m-x,x,m)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,vi)===null?!1:vi.x>=0&&vi.y>=0&&vi.x+vi.y<=1}static getInterpolation(t,e,i,n,r,a,o,c){return this.getBarycoord(t,e,i,n,vi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,vi.x),c.addScaledVector(a,vi.y),c.addScaledVector(o,vi.z),c)}static getInterpolatedAttribute(t,e,i,n,r,a){return gr.setScalar(0),xr.setScalar(0),_r.setScalar(0),gr.fromBufferAttribute(t,e),xr.fromBufferAttribute(t,i),_r.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(gr,r.x),a.addScaledVector(xr,r.y),a.addScaledVector(_r,r.z),a}static isFrontFacing(t,e,i,n){return ni.subVectors(i,e),_i.subVectors(t,e),ni.cross(_i).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ni.subVectors(this.c,this.b),_i.subVectors(this.a,this.b),ni.cross(_i).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,r){return Je.getInterpolation(t,this.a,this.b,this.c,e,i,n,r)}containsPoint(t){return Je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,r=this.c;let a,o;mn.subVectors(n,i),gn.subVectors(r,i),fr.subVectors(t,i);const c=mn.dot(fr),l=gn.dot(fr);if(c<=0&&l<=0)return e.copy(i);pr.subVectors(t,n);const d=mn.dot(pr),u=gn.dot(pr);if(d>=0&&u<=d)return e.copy(n);const f=c*u-d*l;if(f<=0&&c>=0&&d<=0)return a=c/(c-d),e.copy(i).addScaledVector(mn,a);mr.subVectors(t,r);const m=mn.dot(mr),x=gn.dot(mr);if(x>=0&&m<=x)return e.copy(r);const _=m*l-c*x;if(_<=0&&l>=0&&x<=0)return o=l/(l-x),e.copy(i).addScaledVector(gn,o);const g=d*x-m*u;if(g<=0&&u-d>=0&&m-x>=0)return co.subVectors(r,n),o=(u-d)/(u-d+(m-x)),e.copy(n).addScaledVector(co,o);const p=1/(g+_+f);return a=_*p,o=f*p,e.copy(i).addScaledVector(mn,a).addScaledVector(gn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const gl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},ps={h:0,s:0,l:0};function vr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class It{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Xe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=jt.workingColorSpace){if(t=Lc(t,1),e=Ht(e,0,1),i=Ht(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=vr(a,r,t+1/3),this.g=vr(a,r,t),this.b=vr(a,r,t-1/3)}return jt.colorSpaceToWorking(this,n),this}setStyle(t,e=Xe){function i(r){r!==void 0&&parseFloat(r)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=n[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Xe){const i=gl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Xe){return jt.workingToColorSpace(Ae.copy(this),t),Math.round(Ht(Ae.r*255,0,255))*65536+Math.round(Ht(Ae.g*255,0,255))*256+Math.round(Ht(Ae.b*255,0,255))}getHexString(t=Xe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(Ae.copy(this),e);const i=Ae.r,n=Ae.g,r=Ae.b,a=Math.max(i,n,r),o=Math.min(i,n,r);let c,l;const d=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=d<=.5?u/(a+o):u/(2-a-o),a){case i:c=(n-r)/u+(n<r?6:0);break;case n:c=(r-i)/u+2;break;case r:c=(i-n)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=Xe){jt.workingToColorSpace(Ae.copy(this),t);const e=Ae.r,i=Ae.g,n=Ae.b;return t!==Xe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Li),this.setHSL(Li.h+t,Li.s+e,Li.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Li),t.getHSL(ps);const i=er(Li.h,ps.h,e),n=er(Li.s,ps.s,e),r=er(Li.l,ps.l,e);return this.setHSL(i,n,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*n,this.g=r[1]*e+r[4]*i+r[7]*n,this.b=r[2]*e+r[5]*i+r[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new It;It.NAMES=gl;let Yc=0;class Gi extends sn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yc++}),this.uuid=Bi(),this.name="",this.type="Material",this.blending=Qi,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ir,this.blendDst=Ur,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Rn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ja,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=on,this.stencilZFail=on,this.stencilZPass=on,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(i.blending=this.blending),this.side!==zi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ir&&(i.blendSrc=this.blendSrc),this.blendDst!==Ur&&(i.blendDst=this.blendDst),this.blendEquation!==Ki&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Rn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ja&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==on&&(i.stencilFail=this.stencilFail),this.stencilZFail!==on&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==on&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=n(t.textures),a=n(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let r=0;r!==n;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class In extends Gi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new I,ms=new bt;let qc=0;class Ge{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qc++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ma,this.updateRanges=[],this.gpuType=di,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,r=this.itemSize;n<r;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ms.fromBufferAttribute(this,e),ms.applyMatrix3(t),this.setXY(e,ms.x,ms.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=hi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ie(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array),r=ie(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ma&&(t.usage=this.usage),t}}class xl extends Ge{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class _l extends Ge{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ue extends Ge{constructor(t,e,i){super(new Float32Array(t),e,i)}}let $c=0;const $e=new Kt,Mr=new _e,xn=new I,We=new rn,Hn=new rn,ye=new I;class Fe extends sn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$c++}),this.uuid=Bi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pl(t)?_l:xl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Bt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,i){return $e.makeTranslation(t,e,i),this.applyMatrix4($e),this}scale(t,e,i){return $e.makeScale(t,e,i),this.applyMatrix4($e),this}lookAt(t){return Mr.lookAt(t),Mr.updateMatrix(),this.applyMatrix4(Mr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xn).negate(),this.translate(xn.x,xn.y,xn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new rn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const r=e[i];We.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Hn.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(We.min,Hn.min),We.expandByPoint(ye),ye.addVectors(We.max,Hn.max),We.expandByPoint(ye)):(We.expandByPoint(Hn.min),We.expandByPoint(Hn.max))}We.getCenter(i);let n=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,d=o.count;l<d;l++)ye.fromBufferAttribute(o,l),c&&(xn.fromBufferAttribute(t,l),ye.add(xn)),n=Math.max(n,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let N=0;N<i.count;N++)o[N]=new I,c[N]=new I;const l=new I,d=new I,u=new I,f=new bt,m=new bt,x=new bt,_=new I,g=new I;function p(N,y,M){l.fromBufferAttribute(i,N),d.fromBufferAttribute(i,y),u.fromBufferAttribute(i,M),f.fromBufferAttribute(r,N),m.fromBufferAttribute(r,y),x.fromBufferAttribute(r,M),d.sub(l),u.sub(l),m.sub(f),x.sub(f);const L=1/(m.x*x.y-x.x*m.y);isFinite(L)&&(_.copy(d).multiplyScalar(x.y).addScaledVector(u,-m.y).multiplyScalar(L),g.copy(u).multiplyScalar(m.x).addScaledVector(d,-x.x).multiplyScalar(L),o[N].add(_),o[y].add(_),o[M].add(_),c[N].add(g),c[y].add(g),c[M].add(g))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let N=0,y=w.length;N<y;++N){const M=w[N],L=M.start,O=M.count;for(let H=L,X=L+O;H<X;H+=3)p(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const b=new I,T=new I,C=new I,E=new I;function R(N){C.fromBufferAttribute(n,N),E.copy(C);const y=o[N];b.copy(y),b.sub(C.multiplyScalar(C.dot(y))).normalize(),T.crossVectors(E,y);const L=T.dot(c[N])<0?-1:1;a.setXYZW(N,b.x,b.y,b.z,L)}for(let N=0,y=w.length;N<y;++N){const M=w[N],L=M.start,O=M.count;for(let H=L,X=L+O;H<X;H+=3)R(t.getX(H+0)),R(t.getX(H+1)),R(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const n=new I,r=new I,a=new I,o=new I,c=new I,l=new I,d=new I,u=new I;if(t)for(let f=0,m=t.count;f<m;f+=3){const x=t.getX(f+0),_=t.getX(f+1),g=t.getX(f+2);n.fromBufferAttribute(e,x),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),d.subVectors(a,r),u.subVectors(n,r),d.cross(u),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,g),o.add(d),c.add(d),l.add(d),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,m=e.count;f<m;f+=3)n.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),d.subVectors(a,r),u.subVectors(n,r),d.cross(u),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,c){const l=o.array,d=o.itemSize,u=o.normalized,f=new l.constructor(c.length*d);let m=0,x=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*d;for(let p=0;p<d;p++)f[x++]=l[m++]}return new Ge(f,d,u)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Fe,i=this.index.array,n=this.attributes;for(const o in n){const c=n[o],l=t(c,i);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let d=0,u=l.length;d<u;d++){const f=l[d],m=t(f,i);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const n={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],d=[];for(let u=0,f=l.length;u<f;u++){const m=l[u];d.push(m.toJSON(t.data))}d.length>0&&(n[c]=d,r=!0)}r&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const l in n){const d=n[l];this.setAttribute(l,d.clone(e))}const r=t.morphAttributes;for(const l in r){const d=[],u=r[l];for(let f=0,m=u.length;f<m;f++)d.push(u[f].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,d=a.length;l<d;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ho=new Kt,Xi=new es,gs=new oi,uo=new I,xs=new I,_s=new I,vs=new I,Sr=new I,Ms=new I,fo=new I,Ss=new I;class Zt extends _e{constructor(t=new Fe,e=new In){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(r&&o){Ms.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const d=o[c],u=r[c];d!==0&&(Sr.fromBufferAttribute(u,t),a?Ms.addScaledVector(Sr,d):Ms.addScaledVector(Sr.sub(e),d))}e.add(Ms)}return e}raycast(t,e){const i=this.geometry,n=this.material,r=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),gs.copy(i.boundingSphere),gs.applyMatrix4(r),Xi.copy(t.ray).recast(t.near),!(gs.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(gs,uo)===null||Xi.origin.distanceToSquared(uo)>(t.far-t.near)**2))&&(ho.copy(r).invert(),Xi.copy(t.ray).applyMatrix4(ho),!(i.boundingBox!==null&&Xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Xi)))}_computeIntersections(t,e,i){let n;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,_=f.length;x<_;x++){const g=f[x],p=a[g.materialIndex],w=Math.max(g.start,m.start),b=Math.min(o.count,Math.min(g.start+g.count,m.start+m.count));for(let T=w,C=b;T<C;T+=3){const E=o.getX(T),R=o.getX(T+1),N=o.getX(T+2);n=bs(this,p,t,i,l,d,u,E,R,N),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const x=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let g=x,p=_;g<p;g+=3){const w=o.getX(g),b=o.getX(g+1),T=o.getX(g+2);n=bs(this,a,t,i,l,d,u,w,b,T),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,_=f.length;x<_;x++){const g=f[x],p=a[g.materialIndex],w=Math.max(g.start,m.start),b=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let T=w,C=b;T<C;T+=3){const E=T,R=T+1,N=T+2;n=bs(this,p,t,i,l,d,u,E,R,N),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const x=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let g=x,p=_;g<p;g+=3){const w=g,b=g+1,T=g+2;n=bs(this,a,t,i,l,d,u,w,b,T),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}}}function jc(s,t,e,i,n,r,a,o){let c;if(t.side===ze?c=i.intersectTriangle(a,r,n,!0,o):c=i.intersectTriangle(n,r,a,t.side===zi,o),c===null)return null;Ss.copy(o),Ss.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Ss);return l<e.near||l>e.far?null:{distance:l,point:Ss.clone(),object:s}}function bs(s,t,e,i,n,r,a,o,c,l){s.getVertexPosition(o,xs),s.getVertexPosition(c,_s),s.getVertexPosition(l,vs);const d=jc(s,t,e,i,xs,_s,vs,fo);if(d){const u=new I;Je.getBarycoord(fo,xs,_s,vs,u),n&&(d.uv=Je.getInterpolatedAttribute(n,o,c,l,u,new bt)),r&&(d.uv1=Je.getInterpolatedAttribute(r,o,c,l,u,new bt)),a&&(d.normal=Je.getInterpolatedAttribute(a,o,c,l,u,new I),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const f={a:o,b:c,c:l,normal:new I,materialIndex:0};Je.getNormal(xs,_s,vs,f.normal),d.face=f,d.barycoord=u}return d}class he extends Fe{constructor(t=1,e=1,i=1,n=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:r,depthSegments:a};const o=this;n=Math.floor(n),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],d=[],u=[];let f=0,m=0;x("z","y","x",-1,-1,i,e,t,a,r,0),x("z","y","x",1,-1,i,e,-t,a,r,1),x("x","z","y",1,1,t,i,e,n,a,2),x("x","z","y",1,-1,t,i,-e,n,a,3),x("x","y","z",1,-1,t,e,i,n,r,4),x("x","y","z",-1,-1,t,e,-i,n,r,5),this.setIndex(c),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(u,2));function x(_,g,p,w,b,T,C,E,R,N,y){const M=T/R,L=C/N,O=T/2,H=C/2,X=E/2,W=R+1,q=N+1;let Q=0,k=0;const nt=new I;for(let at=0;at<q;at++){const Et=at*L-H;for(let Yt=0;Yt<W;Yt++){const Jt=Yt*M-O;nt[_]=Jt*w,nt[g]=Et*b,nt[p]=X,l.push(nt.x,nt.y,nt.z),nt[_]=0,nt[g]=0,nt[p]=E>0?1:-1,d.push(nt.x,nt.y,nt.z),u.push(Yt/R),u.push(1-at/N),Q+=1}}for(let at=0;at<N;at++)for(let Et=0;Et<R;Et++){const Yt=f+Et+W*at,Jt=f+Et+W*(at+1),re=f+(Et+1)+W*(at+1),ae=f+(Et+1)+W*at;c.push(Yt,Jt,ae),c.push(Jt,re,ae),k+=6}o.addGroup(m,k,y),m+=k,f+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Un(s){const t={};for(const e in s){t[e]={};for(const i in s[e]){const n=s[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Le(s){const t={};for(let e=0;e<s.length;e++){const i=Un(s[e]);for(const n in i)t[n]=i[n]}return t}function Kc(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function vl(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const Jc={clone:Un,merge:Le};var Qc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,th=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ti extends Gi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qc,this.fragmentShader=th,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Un(t.uniforms),this.uniformsGroups=Kc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ml extends _e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ii=new I,po=new bt,mo=new bt;class si extends Ml{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Sa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(zs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sa*2*Math.atan(Math.tan(zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z),Ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ii.x,Ii.y).multiplyScalar(-t/Ii.z)}getViewSize(t,e){return this.getViewBounds(t,po,mo),e.subVectors(mo,po)}setViewOffset(t,e,i,n,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(zs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,r=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*n/c,e-=a.offsetY*i/l,n*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const _n=-90,vn=1;class eh extends _e{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new si(_n,vn,t,e);n.layers=this.layers,this.add(n);const r=new si(_n,vn,t,e);r.layers=this.layers,this.add(r);const a=new si(_n,vn,t,e);a.layers=this.layers,this.add(a);const o=new si(_n,vn,t,e);o.layers=this.layers,this.add(o);const c=new si(_n,vn,t,e);c.layers=this.layers,this.add(c);const l=new si(_n,vn,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===ui)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,d]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,r),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,c),t.setRenderTarget(i,4,n),t.render(e,l),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,n),t.render(e,d),t.setRenderTarget(u,f,m),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class Sl extends Re{constructor(t=[],e=Dn,i,n,r,a,o,c,l,d){super(t,e,i,n,r,a,o,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ih extends nn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Sl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new he(5,5,5),r=new Ti({name:"CubemapFromEquirect",uniforms:Un(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:yi});r.uniforms.tEquirect.value=e;const a=new Zt(n,r),o=e.minFilter;return e.minFilter===Fi&&(e.minFilter=Qe),new eh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(r)}}class ai extends _e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nh={type:"move"};class br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ai,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ai,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ai,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,i),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=d.position.distanceTo(u.position),m=.02,x=.005;l.inputState.pinching&&f>m+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=m-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&r!==null&&(n=r),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nh)))}return o!==null&&(o.visible=n!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ai;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class sh extends _e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pi,this.environmentIntensity=1,this.environmentRotation=new pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class rh{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ma,this.updateRanges=[],this.version=0,this.uuid=Bi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,r=this.stride;n<r;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pe=new I;class Xs{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=hi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ie(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=hi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=hi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=hi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=hi(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array),r=ie(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=r,this}clone(t){if(t===void 0){Ws("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Xs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ws("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[n+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class bl extends Gi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Mn;const Vn=new I,Sn=new I,bn=new I,yn=new bt,kn=new bt,yl=new Kt,ys=new I,Wn=new I,Es=new I,go=new bt,yr=new bt,xo=new bt;class ah extends _e{constructor(t=new bl){if(super(),this.isSprite=!0,this.type="Sprite",Mn===void 0){Mn=new Fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new rh(e,5);Mn.setIndex([0,1,2,0,2,3]),Mn.setAttribute("position",new Xs(i,3,0,!1)),Mn.setAttribute("uv",new Xs(i,2,3,!1))}this.geometry=Mn,this.material=t,this.center=new bt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&pe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Sn.setFromMatrixScale(this.matrixWorld),yl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),bn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Sn.multiplyScalar(-bn.z);const i=this.material.rotation;let n,r;i!==0&&(r=Math.cos(i),n=Math.sin(i));const a=this.center;Ts(ys.set(-.5,-.5,0),bn,a,Sn,n,r),Ts(Wn.set(.5,-.5,0),bn,a,Sn,n,r),Ts(Es.set(.5,.5,0),bn,a,Sn,n,r),go.set(0,0),yr.set(1,0),xo.set(1,1);let o=t.ray.intersectTriangle(ys,Wn,Es,!1,Vn);if(o===null&&(Ts(Wn.set(-.5,.5,0),bn,a,Sn,n,r),yr.set(0,1),o=t.ray.intersectTriangle(ys,Es,Wn,!1,Vn),o===null))return;const c=t.ray.origin.distanceTo(Vn);c<t.near||c>t.far||e.push({distance:c,point:Vn.clone(),uv:Je.getInterpolation(Vn,ys,Wn,Es,go,yr,xo,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ts(s,t,e,i,n,r){yn.subVectors(s,e).addScalar(.5).multiply(i),n!==void 0?(kn.x=r*yn.x-n*yn.y,kn.y=n*yn.x+r*yn.y):kn.copy(yn),s.copy(t),s.x+=kn.x,s.y+=kn.y,s.applyMatrix4(yl)}class El extends Re{constructor(t=null,e=1,i=1,n,r,a,o,c,l=Ye,d=Ye,u,f){super(null,a,o,c,l,d,n,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _o extends Ge{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const En=new Kt,vo=new Kt,ws=[],Mo=new rn,oh=new Kt,Xn=new Zt,Zn=new oi;class ji extends Zt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new _o(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,oh)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new rn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,En),Mo.copy(t.boundingBox).applyMatrix4(En),this.boundingBox.union(Mo)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new oi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,En),Zn.copy(t.boundingSphere).applyMatrix4(En),this.boundingSphere.union(Zn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,r=i.length+1,a=t*r+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(Xn.geometry=this.geometry,Xn.material=this.material,Xn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zn.copy(this.boundingSphere),Zn.applyMatrix4(i),t.ray.intersectsSphere(Zn)!==!1))for(let r=0;r<n;r++){this.getMatrixAt(r,En),vo.multiplyMatrices(i,En),Xn.matrixWorld=vo,Xn.raycast(t,ws);for(let a=0,o=ws.length;a<o;a++){const c=ws[a];c.instanceId=r,c.object=this,e.push(c)}ws.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new _o(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new El(new Float32Array(n*this.count),n,this.count,Da,di));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=n*t;r[c]=o,r.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Er=new I,lh=new I,ch=new Bt;class je{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Er.subVectors(i,e).cross(lh.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Er),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/n;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||ch.getNormalMatrix(t),n=this.coplanarPoint(Er).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zi=new oi,hh=new bt(.5,.5),As=new I;class is{constructor(t=new je,e=new je,i=new je,n=new je,r=new je,a=new je){this.planes=[t,e,i,n,r,a]}set(t,e,i,n,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ui,i=!1){const n=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],d=r[4],u=r[5],f=r[6],m=r[7],x=r[8],_=r[9],g=r[10],p=r[11],w=r[12],b=r[13],T=r[14],C=r[15];if(n[0].setComponents(l-a,m-d,p-x,C-w).normalize(),n[1].setComponents(l+a,m+d,p+x,C+w).normalize(),n[2].setComponents(l+o,m+u,p+_,C+b).normalize(),n[3].setComponents(l-o,m-u,p-_,C-b).normalize(),i)n[4].setComponents(c,f,g,T).normalize(),n[5].setComponents(l-c,m-f,p-g,C-T).normalize();else if(n[4].setComponents(l-c,m-f,p-g,C-T).normalize(),e===ui)n[5].setComponents(l+c,m+f,p+g,C+T).normalize();else if(e===Vs)n[5].setComponents(c,f,g,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Zi)}intersectsSprite(t){Zi.center.set(0,0,0);const e=hh.distanceTo(t.center);return Zi.radius=.7071067811865476+e,Zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Zi)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(As.x=n.normal.x>0?t.max.x:t.min.x,As.y=n.normal.y>0?t.max.y:t.min.y,As.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(As)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Tl extends Gi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Zs=new I,Ys=new I,So=new Kt,Yn=new es,Cs=new oi,Tr=new I,bo=new I;class dh extends _e{constructor(t=new Fe,e=new Tl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,r=e.count;n<r;n++)Zs.fromBufferAttribute(e,n-1),Ys.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Zs.distanceTo(Ys);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(n),Cs.radius+=r,t.ray.intersectsSphere(Cs)===!1)return;So.copy(n).invert(),Yn.copy(t.ray).applyMatrix4(So);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,d=i.index,f=i.attributes.position;if(d!==null){const m=Math.max(0,a.start),x=Math.min(d.count,a.start+a.count);for(let _=m,g=x-1;_<g;_+=l){const p=d.getX(_),w=d.getX(_+1),b=Rs(this,t,Yn,c,p,w,_);b&&e.push(b)}if(this.isLineLoop){const _=d.getX(x-1),g=d.getX(m),p=Rs(this,t,Yn,c,_,g,x-1);p&&e.push(p)}}else{const m=Math.max(0,a.start),x=Math.min(f.count,a.start+a.count);for(let _=m,g=x-1;_<g;_+=l){const p=Rs(this,t,Yn,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Rs(this,t,Yn,c,x-1,m,x-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Rs(s,t,e,i,n,r,a){const o=s.geometry.attributes.position;if(Zs.fromBufferAttribute(o,n),Ys.fromBufferAttribute(o,r),e.distanceSqToSegment(Zs,Ys,Tr,bo)>i)return;Tr.applyMatrix4(s.matrixWorld);const l=t.ray.origin.distanceTo(Tr);if(!(l<t.near||l>t.far))return{distance:l,point:bo.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}const yo=new I,Eo=new I;class uh extends dh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,r=e.count;n<r;n+=2)yo.fromBufferAttribute(e,n),Eo.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+yo.distanceTo(Eo);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wl extends Gi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const To=new Kt,ba=new es,Ds=new oi,Ps=new I;class fh extends _e{constructor(t=new Fe,e=new wl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ds.copy(i.boundingSphere),Ds.applyMatrix4(n),Ds.radius+=r,t.ray.intersectsSphere(Ds)===!1)return;To.copy(n).invert(),ba.copy(t.ray).applyMatrix4(To);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let x=f,_=m;x<_;x++){const g=l.getX(x);Ps.fromBufferAttribute(u,g),wo(Ps,g,c,n,t,e,this)}}else{const f=Math.max(0,a.start),m=Math.min(u.count,a.start+a.count);for(let x=f,_=m;x<_;x++)Ps.fromBufferAttribute(u,x),wo(Ps,x,c,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function wo(s,t,e,i,n,r,a){const o=ba.distanceSqToPoint(s);if(o<e){const c=new I;ba.closestPointToPoint(s,c),c.applyMatrix4(i);const l=n.ray.origin.distanceTo(c);if(l<n.near||l>n.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Ze extends Re{constructor(t,e,i,n,r,a,o,c,l){super(t,e,i,n,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Al extends Re{constructor(t,e,i=tn,n,r,a,o=Ye,c=Ye,l,d=Jn,u=1){if(d!==Jn&&d!==Qn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,n,r,a,o,c,d,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Fa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Cl extends Re{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ns extends Fe{constructor(t=1,e=1,i=1,n=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;n=Math.floor(n),r=Math.floor(r);const d=[],u=[],f=[],m=[];let x=0;const _=[],g=i/2;let p=0;w(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(d),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(f,3)),this.setAttribute("uv",new Ue(m,2));function w(){const T=new I,C=new I;let E=0;const R=(e-t)/i;for(let N=0;N<=r;N++){const y=[],M=N/r,L=M*(e-t)+t;for(let O=0;O<=n;O++){const H=O/n,X=H*c+o,W=Math.sin(X),q=Math.cos(X);C.x=L*W,C.y=-M*i+g,C.z=L*q,u.push(C.x,C.y,C.z),T.set(W,R,q).normalize(),f.push(T.x,T.y,T.z),m.push(H,1-M),y.push(x++)}_.push(y)}for(let N=0;N<n;N++)for(let y=0;y<r;y++){const M=_[y][N],L=_[y+1][N],O=_[y+1][N+1],H=_[y][N+1];(t>0||y!==0)&&(d.push(M,L,H),E+=3),(e>0||y!==r-1)&&(d.push(L,O,H),E+=3)}l.addGroup(p,E,0),p+=E}function b(T){const C=x,E=new bt,R=new I;let N=0;const y=T===!0?t:e,M=T===!0?1:-1;for(let O=1;O<=n;O++)u.push(0,g*M,0),f.push(0,M,0),m.push(.5,.5),x++;const L=x;for(let O=0;O<=n;O++){const X=O/n*c+o,W=Math.cos(X),q=Math.sin(X);R.x=y*q,R.y=g*M,R.z=y*W,u.push(R.x,R.y,R.z),f.push(0,M,0),E.x=W*.5+.5,E.y=q*.5*M+.5,m.push(E.x,E.y),x++}for(let O=0;O<n;O++){const H=C+O,X=L+O;T===!0?d.push(X,X+1,H):d.push(X+1,X,H),N+=3}l.addGroup(p,N,T===!0?1:2),p+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ns(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class wi extends ns{constructor(t=1,e=1,i=32,n=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new wi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ai extends Fe{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const r=t/2,a=e/2,o=Math.floor(i),c=Math.floor(n),l=o+1,d=c+1,u=t/o,f=e/c,m=[],x=[],_=[],g=[];for(let p=0;p<d;p++){const w=p*f-a;for(let b=0;b<l;b++){const T=b*u-r;x.push(T,-w,0),_.push(0,0,1),g.push(b/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let w=0;w<o;w++){const b=w+l*p,T=w+l*(p+1),C=w+1+l*(p+1),E=w+1+l*p;m.push(b,T,E),m.push(T,C,E)}this.setIndex(m),this.setAttribute("position",new Ue(x,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ai(t.width,t.height,t.widthSegments,t.heightSegments)}}class $s extends Fe{constructor(t=1,e=32,i=16,n=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const d=[],u=new I,f=new I,m=[],x=[],_=[],g=[];for(let p=0;p<=i;p++){const w=[],b=p/i;let T=0;p===0&&a===0?T=.5/e:p===i&&c===Math.PI&&(T=-.5/e);for(let C=0;C<=e;C++){const E=C/e;u.x=-t*Math.cos(n+E*r)*Math.sin(a+b*o),u.y=t*Math.cos(a+b*o),u.z=t*Math.sin(n+E*r)*Math.sin(a+b*o),x.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(E+T,1-b),w.push(l++)}d.push(w)}for(let p=0;p<i;p++)for(let w=0;w<e;w++){const b=d[p][w+1],T=d[p][w],C=d[p+1][w],E=d[p+1][w+1];(p!==0||a>0)&&m.push(b,T,E),(p!==i-1||c<Math.PI)&&m.push(T,C,E)}this.setIndex(m),this.setAttribute("position",new Ue(x,3)),this.setAttribute("normal",new Ue(_,3)),this.setAttribute("uv",new Ue(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class qt extends Gi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ul,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=wa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ph extends Gi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Mc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class mh extends Gi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Rl extends _e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const wr=new Kt,Ao=new I,Co=new I;class gh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=fi,this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new is,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Ao.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ao),Co.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Co),e.updateMatrixWorld(),wr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(wr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(wr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Oa extends Ml{constructor(t=-1,e=1,i=1,n=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=n+e,c=n-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=d*this.view.offsetY,c=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class xh extends gh{constructor(){super(new Oa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _h extends Rl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_e.DEFAULT_UP),this.updateMatrix(),this.target=new _e,this.shadow=new xh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class vh extends Rl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Mh extends si{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Ro=new Kt;class Sh{constructor(t,e,i=0,n=1/0){this.ray=new es(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new Na,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):pe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ro.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ro),this}intersectObject(t,e=!0,i=[]){return ya(t,this,i,e),i.sort(Do),i}intersectObjects(t,e=!0,i=[]){for(let n=0,r=t.length;n<r;n++)ya(t[n],this,i,e);return i.sort(Do),i}}function Do(s,t){return s.distance-t.distance}function ya(s,t,e,i){let n=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const r=s.children;for(let a=0,o=r.length;a<o;a++)ya(r[a],t,e,!0)}}class Po{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ht(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class bh extends sn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Lo(s,t,e,i){const n=yh(i);switch(e){case hl:return s*t;case Da:return s*t/n.components*n.byteLength;case Pa:return s*t/n.components*n.byteLength;case La:return s*t*2/n.components*n.byteLength;case Ia:return s*t*2/n.components*n.byteLength;case dl:return s*t*3/n.components*n.byteLength;case ri:return s*t*4/n.components*n.byteLength;case Ua:return s*t*4/n.components*n.byteLength;case Fs:case Ns:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Os:case Bs:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Yr:case $r:return Math.max(s,16)*Math.max(t,8)/4;case Zr:case qr:return Math.max(s,8)*Math.max(t,8)/2;case jr:case Kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Jr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ta:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case ea:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case ia:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case na:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case sa:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case ra:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case aa:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case oa:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case la:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case ca:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case ha:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case da:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case ua:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case fa:case pa:case ma:return Math.ceil(s/4)*Math.ceil(t/4)*16;case ga:case xa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case _a:case va:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function yh(s){switch(s){case fi:case al:return{byteLength:1,components:1};case jn:case ol:case Fn:return{byteLength:2,components:1};case Ca:case Ra:return{byteLength:2,components:4};case tn:case Aa:case di:return{byteLength:4,components:1};case ll:case cl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ta}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ta);function Dl(){let s=null,t=!1,e=null,i=null;function n(r,a){e(r,a),i=s.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=s.requestAnimationFrame(n),t=!0)},stop:function(){s.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Eh(s){const t=new WeakMap;function e(o,c){const l=o.array,d=o.usage,u=l.byteLength,f=s.createBuffer();s.bindBuffer(c,f),s.bufferData(c,l,d),o.onUploadCallback();let m;if(l instanceof Float32Array)m=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=s.SHORT;else if(l instanceof Uint32Array)m=s.UNSIGNED_INT;else if(l instanceof Int32Array)m=s.INT;else if(l instanceof Int8Array)m=s.BYTE;else if(l instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){const d=c.array,u=c.updateRanges;if(s.bindBuffer(l,o),u.length===0)s.bufferSubData(l,0,d);else{u.sort((m,x)=>m.start-x.start);let f=0;for(let m=1;m<u.length;m++){const x=u[f],_=u[m];_.start<=x.start+x.count+1?x.count=Math.max(x.count,_.start+_.count-x.start):(++f,u[f]=_)}u.length=f+1;for(let m=0,x=u.length;m<x;m++){const _=u[m];s.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:n,remove:r,update:a}}var Th=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ah=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ch=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ph=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ih=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Uh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Fh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Oh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Bh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Gh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Hh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,kh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Wh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,qh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$h=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,td=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ed="gl_FragColor = linearToOutputTexel( gl_FragColor );",id=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ad=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,od=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ld=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,cd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ud=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,md=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,_d=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Md=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,yd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ed=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Td=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ad=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Cd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ld=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Id=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ud=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Od=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Bd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Gd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Hd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,kd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Yd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$d=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Kd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,eu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,su=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ru=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,au=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ou=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,du=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fu=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xu=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_u=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vu=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Mu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Su=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Eu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tu=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Au=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ru=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Du=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pu=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lu=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Iu=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Uu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nu=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ou=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bu=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zu=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gu=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hu=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vu=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ku=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wu=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Xu=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zu=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yu=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qu=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$u=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ju=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ku=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ju=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qu=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ef=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,nf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:Th,alphahash_pars_fragment:wh,alphamap_fragment:Ah,alphamap_pars_fragment:Ch,alphatest_fragment:Rh,alphatest_pars_fragment:Dh,aomap_fragment:Ph,aomap_pars_fragment:Lh,batching_pars_vertex:Ih,batching_vertex:Uh,begin_vertex:Fh,beginnormal_vertex:Nh,bsdfs:Oh,iridescence_fragment:Bh,bumpmap_pars_fragment:zh,clipping_planes_fragment:Gh,clipping_planes_pars_fragment:Hh,clipping_planes_pars_vertex:Vh,clipping_planes_vertex:kh,color_fragment:Wh,color_pars_fragment:Xh,color_pars_vertex:Zh,color_vertex:Yh,common:qh,cube_uv_reflection_fragment:$h,defaultnormal_vertex:jh,displacementmap_pars_vertex:Kh,displacementmap_vertex:Jh,emissivemap_fragment:Qh,emissivemap_pars_fragment:td,colorspace_fragment:ed,colorspace_pars_fragment:id,envmap_fragment:nd,envmap_common_pars_fragment:sd,envmap_pars_fragment:rd,envmap_pars_vertex:ad,envmap_physical_pars_fragment:xd,envmap_vertex:od,fog_vertex:ld,fog_pars_vertex:cd,fog_fragment:hd,fog_pars_fragment:dd,gradientmap_pars_fragment:ud,lightmap_pars_fragment:fd,lights_lambert_fragment:pd,lights_lambert_pars_fragment:md,lights_pars_begin:gd,lights_toon_fragment:_d,lights_toon_pars_fragment:vd,lights_phong_fragment:Md,lights_phong_pars_fragment:Sd,lights_physical_fragment:bd,lights_physical_pars_fragment:yd,lights_fragment_begin:Ed,lights_fragment_maps:Td,lights_fragment_end:wd,logdepthbuf_fragment:Ad,logdepthbuf_pars_fragment:Cd,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Dd,map_fragment:Pd,map_pars_fragment:Ld,map_particle_fragment:Id,map_particle_pars_fragment:Ud,metalnessmap_fragment:Fd,metalnessmap_pars_fragment:Nd,morphinstance_vertex:Od,morphcolor_vertex:Bd,morphnormal_vertex:zd,morphtarget_pars_vertex:Gd,morphtarget_vertex:Hd,normal_fragment_begin:Vd,normal_fragment_maps:kd,normal_pars_fragment:Wd,normal_pars_vertex:Xd,normal_vertex:Zd,normalmap_pars_fragment:Yd,clearcoat_normal_fragment_begin:qd,clearcoat_normal_fragment_maps:$d,clearcoat_pars_fragment:jd,iridescence_pars_fragment:Kd,opaque_fragment:Jd,packing:Qd,premultiplied_alpha_fragment:tu,project_vertex:eu,dithering_fragment:iu,dithering_pars_fragment:nu,roughnessmap_fragment:su,roughnessmap_pars_fragment:ru,shadowmap_pars_fragment:au,shadowmap_pars_vertex:ou,shadowmap_vertex:lu,shadowmask_pars_fragment:cu,skinbase_vertex:hu,skinning_pars_vertex:du,skinning_vertex:uu,skinnormal_vertex:fu,specularmap_fragment:pu,specularmap_pars_fragment:mu,tonemapping_fragment:gu,tonemapping_pars_fragment:xu,transmission_fragment:_u,transmission_pars_fragment:vu,uv_pars_fragment:Mu,uv_pars_vertex:Su,uv_vertex:bu,worldpos_vertex:yu,background_vert:Eu,background_frag:Tu,backgroundCube_vert:wu,backgroundCube_frag:Au,cube_vert:Cu,cube_frag:Ru,depth_vert:Du,depth_frag:Pu,distanceRGBA_vert:Lu,distanceRGBA_frag:Iu,equirect_vert:Uu,equirect_frag:Fu,linedashed_vert:Nu,linedashed_frag:Ou,meshbasic_vert:Bu,meshbasic_frag:zu,meshlambert_vert:Gu,meshlambert_frag:Hu,meshmatcap_vert:Vu,meshmatcap_frag:ku,meshnormal_vert:Wu,meshnormal_frag:Xu,meshphong_vert:Zu,meshphong_frag:Yu,meshphysical_vert:qu,meshphysical_frag:$u,meshtoon_vert:ju,meshtoon_frag:Ku,points_vert:Ju,points_frag:Qu,shadow_vert:tf,shadow_frag:ef,sprite_vert:nf,sprite_frag:sf},ot={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},ci={basic:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new It(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Le([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Le([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new It(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Le([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Le([ot.points,ot.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Le([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Le([ot.common,ot.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Le([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Le([ot.sprite,ot.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Le([ot.common,ot.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Le([ot.lights,ot.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};ci.physical={uniforms:Le([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Ls={r:0,b:0,g:0},Yi=new pi,rf=new Kt;function af(s,t,e,i,n,r,a){const o=new It(0);let c=r===!0?0:1,l,d,u=null,f=0,m=null;function x(b){let T=b.isScene===!0?b.background:null;return T&&T.isTexture&&(T=(b.backgroundBlurriness>0?e:t).get(T)),T}function _(b){let T=!1;const C=x(b);C===null?p(o,c):C&&C.isColor&&(p(C,1),T=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?i.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(s.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(b,T){const C=x(T);C&&(C.isCubeTexture||C.mapping===qs)?(d===void 0&&(d=new Zt(new he(1,1,1),new Ti({name:"BackgroundCubeMaterial",uniforms:Un(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(E,R,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(d)),Yi.copy(T.backgroundRotation),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(rf.makeRotationFromEuler(Yi)),d.material.toneMapped=jt.getTransfer(C.colorSpace)!==ee,(u!==C||f!==C.version||m!==s.toneMapping)&&(d.material.needsUpdate=!0,u=C,f=C.version,m=s.toneMapping),d.layers.enableAll(),b.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Zt(new Ai(2,2),new Ti({name:"BackgroundMaterial",uniforms:Un(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=jt.getTransfer(C.colorSpace)!==ee,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||f!==C.version||m!==s.toneMapping)&&(l.material.needsUpdate=!0,u=C,f=C.version,m=s.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,T){b.getRGB(Ls,vl(s)),i.buffers.color.setClear(Ls.r,Ls.g,Ls.b,T,a)}function w(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,T=1){o.set(b),c=T,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(o,c)},render:_,addToRenderList:g,dispose:w}}function of(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),i={},n=f(null);let r=n,a=!1;function o(M,L,O,H,X){let W=!1;const q=u(H,O,L);r!==q&&(r=q,l(r.object)),W=m(M,H,O,X),W&&x(M,H,O,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,T(M,L,O,H),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function d(M){return s.deleteVertexArray(M)}function u(M,L,O){const H=O.wireframe===!0;let X=i[M.id];X===void 0&&(X={},i[M.id]=X);let W=X[L.id];W===void 0&&(W={},X[L.id]=W);let q=W[H];return q===void 0&&(q=f(c()),W[H]=q),q}function f(M){const L=[],O=[],H=[];for(let X=0;X<e;X++)L[X]=0,O[X]=0,H[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:H,object:M,attributes:{},index:null}}function m(M,L,O,H){const X=r.attributes,W=L.attributes;let q=0;const Q=O.getAttributes();for(const k in Q)if(Q[k].location>=0){const at=X[k];let Et=W[k];if(Et===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(Et=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(Et=M.instanceColor)),at===void 0||at.attribute!==Et||Et&&at.data!==Et.data)return!0;q++}return r.attributesNum!==q||r.index!==H}function x(M,L,O,H){const X={},W=L.attributes;let q=0;const Q=O.getAttributes();for(const k in Q)if(Q[k].location>=0){let at=W[k];at===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(at=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(at=M.instanceColor));const Et={};Et.attribute=at,at&&at.data&&(Et.data=at.data),X[k]=Et,q++}r.attributes=X,r.attributesNum=q,r.index=H}function _(){const M=r.newAttributes;for(let L=0,O=M.length;L<O;L++)M[L]=0}function g(M){p(M,0)}function p(M,L){const O=r.newAttributes,H=r.enabledAttributes,X=r.attributeDivisors;O[M]=1,H[M]===0&&(s.enableVertexAttribArray(M),H[M]=1),X[M]!==L&&(s.vertexAttribDivisor(M,L),X[M]=L)}function w(){const M=r.newAttributes,L=r.enabledAttributes;for(let O=0,H=L.length;O<H;O++)L[O]!==M[O]&&(s.disableVertexAttribArray(O),L[O]=0)}function b(M,L,O,H,X,W,q){q===!0?s.vertexAttribIPointer(M,L,O,X,W):s.vertexAttribPointer(M,L,O,H,X,W)}function T(M,L,O,H){_();const X=H.attributes,W=O.getAttributes(),q=L.defaultAttributeValues;for(const Q in W){const k=W[Q];if(k.location>=0){let nt=X[Q];if(nt===void 0&&(Q==="instanceMatrix"&&M.instanceMatrix&&(nt=M.instanceMatrix),Q==="instanceColor"&&M.instanceColor&&(nt=M.instanceColor)),nt!==void 0){const at=nt.normalized,Et=nt.itemSize,Yt=t.get(nt);if(Yt===void 0)continue;const Jt=Yt.buffer,re=Yt.type,ae=Yt.bytesPerElement,Y=re===s.INT||re===s.UNSIGNED_INT||nt.gpuType===Aa;if(nt.isInterleavedBufferAttribute){const K=nt.data,ft=K.stride,Nt=nt.offset;if(K.isInstancedInterleavedBuffer){for(let Mt=0;Mt<k.locationSize;Mt++)p(k.location+Mt,K.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)g(k.location+Mt);s.bindBuffer(s.ARRAY_BUFFER,Jt);for(let Mt=0;Mt<k.locationSize;Mt++)b(k.location+Mt,Et/k.locationSize,re,at,ft*ae,(Nt+Et/k.locationSize*Mt)*ae,Y)}else{if(nt.isInstancedBufferAttribute){for(let K=0;K<k.locationSize;K++)p(k.location+K,nt.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let K=0;K<k.locationSize;K++)g(k.location+K);s.bindBuffer(s.ARRAY_BUFFER,Jt);for(let K=0;K<k.locationSize;K++)b(k.location+K,Et/k.locationSize,re,at,Et*ae,Et/k.locationSize*K*ae,Y)}}else if(q!==void 0){const at=q[Q];if(at!==void 0)switch(at.length){case 2:s.vertexAttrib2fv(k.location,at);break;case 3:s.vertexAttrib3fv(k.location,at);break;case 4:s.vertexAttrib4fv(k.location,at);break;default:s.vertexAttrib1fv(k.location,at)}}}}w()}function C(){N();for(const M in i){const L=i[M];for(const O in L){const H=L[O];for(const X in H)d(H[X].object),delete H[X];delete L[O]}delete i[M]}}function E(M){if(i[M.id]===void 0)return;const L=i[M.id];for(const O in L){const H=L[O];for(const X in H)d(H[X].object),delete H[X];delete L[O]}delete i[M.id]}function R(M){for(const L in i){const O=i[L];if(O[M.id]===void 0)continue;const H=O[M.id];for(const X in H)d(H[X].object),delete H[X];delete O[M.id]}}function N(){y(),a=!0,r!==n&&(r=n,l(r.object))}function y(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:N,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:E,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:g,disableUnusedAttributes:w}}function lf(s,t,e){let i;function n(l){i=l}function r(l,d){s.drawArrays(i,l,d),e.update(d,i,1)}function a(l,d,u){u!==0&&(s.drawArraysInstanced(i,l,d,u),e.update(d,i,u))}function o(l,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,d,0,u);let m=0;for(let x=0;x<u;x++)m+=d[x];e.update(m,i,1)}function c(l,d,u,f){if(u===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let x=0;x<l.length;x++)a(l[x],d[x],f[x]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,d,0,f,0,u);let x=0;for(let _=0;_<u;_++)x+=d[_]*f[_];e.update(x,i,1)}}this.setMode=n,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function cf(s,t,e,i){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(R){return!(R!==ri&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const N=R===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==fi&&i.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==di&&!N)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const d=c(l);d!==l&&(Lt("WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),x=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),w=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),T=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=x>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:m,maxVertexTextures:x,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:w,maxVaryings:b,maxFragmentUniforms:T,vertexTextures:C,maxSamples:E}}function hf(s){const t=this;let e=null,i=0,n=!1,r=!1;const a=new je,o=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||n;return n=f,i=u.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=d(u,f,0)},this.setState=function(u,f,m){const x=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!n||x===null||x.length===0||r&&!g)r?d(null):l();else{const w=r?0:i,b=w*4;let T=p.clippingState||null;c.value=T,T=d(x,f,b,m);for(let C=0;C!==b;++C)T[C]=e[C];p.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(u,f,m,x){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,x!==!0||g===null){const p=m+_*4,w=f.matrixWorldInverse;o.getNormalMatrix(w),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,T=m;b!==_;++b,T+=4)a.copy(u[b]).applyMatrix4(w,o),a.normal.toArray(g,T),g[T+3]=a.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function df(s){let t=new WeakMap;function e(a,o){return o===Vr?a.mapping=Dn:o===kr&&(a.mapping=Pn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Vr||o===kr)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new ih(c.height);return l.fromEquirectangularTexture(s,a),t.set(a,l),a.addEventListener("dispose",n),e(l.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const Ni=4,Io=[.125,.215,.35,.446,.526,.582],Ji=20,uf=256,qn=new Oa,Uo=new It;let Ar=null,Cr=0,Rr=0,Dr=!1;const ff=new I;class Fo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,r={}){const{size:a=256,position:o=ff}=r;Ar=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Rr=this._renderer.getActiveMipmapLevel(),Dr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,n,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ar,Cr,Rr),this._renderer.xr.enabled=Dr,t.scissorTest=!1,Tn(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Dn||t.mapping===Pn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ar=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Rr=this._renderer.getActiveMipmapLevel(),Dr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:Fn,format:ri,colorSpace:Ln,depthBuffer:!1},n=No(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=No(t,e,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=pf(r)),this._blurMaterial=gf(r,t,e),this._ggxMaterial=mf(r,t,e)}return n}_compileMaterial(t){const e=new Zt(new Fe,t);this._renderer.compile(e,qn)}_sceneToCubeUV(t,e,i,n,r){const c=new si(90,1,e,i),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,m=u.toneMapping;u.getClearColor(Uo),u.toneMapping=Oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Zt(new he,new In({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,g=_.material;let p=!1;const w=t.background;w?w.isColor&&(g.color.copy(w),t.background=null,p=!0):(g.color.copy(Uo),p=!0);for(let b=0;b<6;b++){const T=b%3;T===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[b],r.y,r.z)):T===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[b]));const C=this._cubeSize;Tn(n,T*C,b>2?C:0,C,C),u.setRenderTarget(n),p&&u.render(_,c),u.render(t,c)}u.toneMapping=m,u.autoClear=f,t.background=w}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Dn||t.mapping===Pn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oo());const r=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Tn(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(a,qn)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let r=1;r<n;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),d=e/(this._lodMeshes.length-1),u=Math.sqrt(l*l-d*d),f=.05+l*.95,m=u*f,{_lodMax:x}=this,_=this._sizeLods[i],g=3*_*(i>x-Ni?i-x+Ni:0),p=4*(this._cubeSize-_);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=x-e,Tn(r,g,p,3*_,2*_),n.setRenderTarget(r),n.render(o,qn),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=x-i,Tn(t,g,p,3*_,2*_),n.setRenderTarget(t),n.render(o,qn)}_blur(t,e,i,n,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",r),this._halfBlur(a,t,i,i,n,"longitudinal",r)}_halfBlur(t,e,i,n,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&pe("blur direction must be either latitudinal or longitudinal!");const d=3,u=this._lodMeshes[n];u.material=l;const f=l.uniforms,m=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Ji-1),_=r/x,g=isFinite(r)?1+Math.floor(d*_):Ji;g>Ji&&Lt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ji}`);const p=[];let w=0;for(let R=0;R<Ji;++R){const N=R/_,y=Math.exp(-N*N/2);p.push(y),R===0?w+=y:R<g&&(w+=2*y)}for(let R=0;R<p.length;R++)p[R]=p[R]/w;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:b}=this;f.dTheta.value=x,f.mipInt.value=b-i;const T=this._sizeLods[n],C=3*T*(n>b-Ni?n-b+Ni:0),E=4*(this._cubeSize-T);Tn(e,C,E,3*T,2*T),c.setRenderTarget(e),c.render(u,qn)}}function pf(s){const t=[],e=[],i=[];let n=s;const r=s-Ni+1+Io.length;for(let a=0;a<r;a++){const o=Math.pow(2,n);t.push(o);let c=1/o;a>s-Ni?c=Io[a-s+Ni-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),d=-l,u=1+l,f=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,x=6,_=3,g=2,p=1,w=new Float32Array(_*x*m),b=new Float32Array(g*x*m),T=new Float32Array(p*x*m);for(let E=0;E<m;E++){const R=E%3*2/3-1,N=E>2?0:-1,y=[R,N,0,R+2/3,N,0,R+2/3,N+1,0,R,N,0,R+2/3,N+1,0,R,N+1,0];w.set(y,_*x*E),b.set(f,g*x*E);const M=[E,E,E,E,E,E];T.set(M,p*x*E)}const C=new Fe;C.setAttribute("position",new Ge(w,_)),C.setAttribute("uv",new Ge(b,g)),C.setAttribute("faceIndex",new Ge(T,p)),i.push(new Zt(C,null)),n>Ni&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function No(s,t,e){const i=new nn(s,t,e);return i.texture.mapping=qs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Tn(s,t,e,i,n){s.viewport.set(t,e,i,n),s.scissor.set(t,e,i,n)}function mf(s,t,e){return new Ti({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:uf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function gf(s,t,e){const i=new Float32Array(Ji),n=new I(0,1,0);return new Ti({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Oo(){return new Ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Bo(){return new Ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function js(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xf(s){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Vr||c===kr,d=c===Dn||c===Pn;if(l||d){let u=t.get(o);const f=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Fo(s)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||d&&m&&n(m)?(e===null&&(e=new Fo(s)),u=l?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function n(o){let c=0;const l=6;for(let d=0;d<l;d++)o[d]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function _f(s){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=s.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&ts("WebGLRenderer: "+i+" extension not supported."),n}}}function vf(s,t,e,i){const n={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const x in f.attributes)t.remove(f.attributes[x]);f.removeEventListener("dispose",a),delete n[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(u,f){return n[f.id]===!0||(f.addEventListener("dispose",a),n[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const m in f)t.update(f[m],s.ARRAY_BUFFER)}function l(u){const f=[],m=u.index,x=u.attributes.position;let _=0;if(m!==null){const w=m.array;_=m.version;for(let b=0,T=w.length;b<T;b+=3){const C=w[b+0],E=w[b+1],R=w[b+2];f.push(C,E,E,R,R,C)}}else if(x!==void 0){const w=x.array;_=x.version;for(let b=0,T=w.length/3-1;b<T;b+=3){const C=b+0,E=b+1,R=b+2;f.push(C,E,E,R,R,C)}}else return;const g=new(pl(f)?_l:xl)(f,1);g.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function d(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:d}}function Mf(s,t,e){let i;function n(f){i=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,m){s.drawElements(i,m,r,f*a),e.update(m,i,1)}function l(f,m,x){x!==0&&(s.drawElementsInstanced(i,m,r,f*a,x),e.update(m,i,x))}function d(f,m,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,f,0,x);let g=0;for(let p=0;p<x;p++)g+=m[p];e.update(g,i,1)}function u(f,m,x,_){if(x===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/a,m[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,r,f,0,_,0,x);let p=0;for(let w=0;w<x;w++)p+=m[w]*_[w];e.update(p,i,1)}}this.setMode=n,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Sf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:pe("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function bf(s,t,e){const i=new WeakMap,n=new xe;function r(a,o,c){const l=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==u){let M=function(){N.dispose(),i.delete(o),o.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const x=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],w=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let T=0;x===!0&&(T=1),_===!0&&(T=2),g===!0&&(T=3);let C=o.attributes.position.count*T,E=1;C>t.maxTextureSize&&(E=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const R=new Float32Array(C*E*4*u),N=new ml(R,C,E,u);N.type=di,N.needsUpdate=!0;const y=T*4;for(let L=0;L<u;L++){const O=p[L],H=w[L],X=b[L],W=C*E*4*L;for(let q=0;q<O.count;q++){const Q=q*y;x===!0&&(n.fromBufferAttribute(O,q),R[W+Q+0]=n.x,R[W+Q+1]=n.y,R[W+Q+2]=n.z,R[W+Q+3]=0),_===!0&&(n.fromBufferAttribute(H,q),R[W+Q+4]=n.x,R[W+Q+5]=n.y,R[W+Q+6]=n.z,R[W+Q+7]=0),g===!0&&(n.fromBufferAttribute(X,q),R[W+Q+8]=n.x,R[W+Q+9]=n.y,R[W+Q+10]=n.z,R[W+Q+11]=X.itemSize===4?n.w:1)}}f={count:u,texture:N,size:new bt(C,E)},i.set(o,f),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let x=0;for(let g=0;g<l.length;g++)x+=l[g];const _=o.morphTargetsRelative?1:1-x;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",f.size)}return{update:r}}function yf(s,t,e,i){let n=new WeakMap;function r(c){const l=i.render.frame,d=c.geometry,u=t.get(c,d);if(n.get(u)!==l&&(t.update(u),n.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),n.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),n.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;n.get(f)!==l&&(f.update(),n.set(f,l))}return u}function a(){n=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const Pl=new Re,zo=new Al(1,1),Ll=new ml,Il=new zc,Ul=new Sl,Go=[],Ho=[],Vo=new Float32Array(16),ko=new Float32Array(9),Wo=new Float32Array(4);function Nn(s,t,e){const i=s[0];if(i<=0||i>0)return s;const n=t*e;let r=Go[n];if(r===void 0&&(r=new Float32Array(n),Go[n]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Se(s,t){if(s.length!==t.length)return!1;for(let e=0,i=s.length;e<i;e++)if(s[e]!==t[e])return!1;return!0}function be(s,t){for(let e=0,i=t.length;e<i;e++)s[e]=t[e]}function Ks(s,t){let e=Ho[t];e===void 0&&(e=new Int32Array(t),Ho[t]=e);for(let i=0;i!==t;++i)e[i]=s.allocateTextureUnit();return e}function Ef(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Tf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2fv(this.addr,t),be(e,t)}}function wf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;s.uniform3fv(this.addr,t),be(e,t)}}function Af(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4fv(this.addr,t),be(e,t)}}function Cf(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(Se(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Se(e,i))return;Wo.set(i),s.uniformMatrix2fv(this.addr,!1,Wo),be(e,i)}}function Rf(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(Se(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Se(e,i))return;ko.set(i),s.uniformMatrix3fv(this.addr,!1,ko),be(e,i)}}function Df(s,t){const e=this.cache,i=t.elements;if(i===void 0){if(Se(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Se(e,i))return;Vo.set(i),s.uniformMatrix4fv(this.addr,!1,Vo),be(e,i)}}function Pf(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Lf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2iv(this.addr,t),be(e,t)}}function If(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3iv(this.addr,t),be(e,t)}}function Uf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4iv(this.addr,t),be(e,t)}}function Ff(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Nf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2uiv(this.addr,t),be(e,t)}}function Of(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3uiv(this.addr,t),be(e,t)}}function Bf(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4uiv(this.addr,t),be(e,t)}}function zf(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n);let r;this.type===s.SAMPLER_2D_SHADOW?(zo.compareFunction=fl,r=zo):r=Pl,e.setTexture2D(t||r,n)}function Gf(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Il,n)}function Hf(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Ul,n)}function Vf(s,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(s.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Ll,n)}function kf(s){switch(s){case 5126:return Ef;case 35664:return Tf;case 35665:return wf;case 35666:return Af;case 35674:return Cf;case 35675:return Rf;case 35676:return Df;case 5124:case 35670:return Pf;case 35667:case 35671:return Lf;case 35668:case 35672:return If;case 35669:case 35673:return Uf;case 5125:return Ff;case 36294:return Nf;case 36295:return Of;case 36296:return Bf;case 35678:case 36198:case 36298:case 36306:case 35682:return zf;case 35679:case 36299:case 36307:return Gf;case 35680:case 36300:case 36308:case 36293:return Hf;case 36289:case 36303:case 36311:case 36292:return Vf}}function Wf(s,t){s.uniform1fv(this.addr,t)}function Xf(s,t){const e=Nn(t,this.size,2);s.uniform2fv(this.addr,e)}function Zf(s,t){const e=Nn(t,this.size,3);s.uniform3fv(this.addr,e)}function Yf(s,t){const e=Nn(t,this.size,4);s.uniform4fv(this.addr,e)}function qf(s,t){const e=Nn(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function $f(s,t){const e=Nn(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function jf(s,t){const e=Nn(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Kf(s,t){s.uniform1iv(this.addr,t)}function Jf(s,t){s.uniform2iv(this.addr,t)}function Qf(s,t){s.uniform3iv(this.addr,t)}function tp(s,t){s.uniform4iv(this.addr,t)}function ep(s,t){s.uniform1uiv(this.addr,t)}function ip(s,t){s.uniform2uiv(this.addr,t)}function np(s,t){s.uniform3uiv(this.addr,t)}function sp(s,t){s.uniform4uiv(this.addr,t)}function rp(s,t,e){const i=this.cache,n=t.length,r=Ks(e,n);Se(i,r)||(s.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Pl,r[a])}function ap(s,t,e){const i=this.cache,n=t.length,r=Ks(e,n);Se(i,r)||(s.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||Il,r[a])}function op(s,t,e){const i=this.cache,n=t.length,r=Ks(e,n);Se(i,r)||(s.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Ul,r[a])}function lp(s,t,e){const i=this.cache,n=t.length,r=Ks(e,n);Se(i,r)||(s.uniform1iv(this.addr,r),be(i,r));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Ll,r[a])}function cp(s){switch(s){case 5126:return Wf;case 35664:return Xf;case 35665:return Zf;case 35666:return Yf;case 35674:return qf;case 35675:return $f;case 35676:return jf;case 5124:case 35670:return Kf;case 35667:case 35671:return Jf;case 35668:case 35672:return Qf;case 35669:case 35673:return tp;case 5125:return ep;case 36294:return ip;case 36295:return np;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return ap;case 35680:case 36300:case 36308:case 36293:return op;case 36289:case 36303:case 36311:case 36292:return lp}}class hp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=kf(e.type)}}class dp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=cp(e.type)}}class up{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let r=0,a=n.length;r!==a;++r){const o=n[r];o.setValue(t,e[o.id],i)}}}const Pr=/(\w+)(\])?(\[|\.)?/g;function Xo(s,t){s.seq.push(t),s.map[t.id]=t}function fp(s,t,e){const i=s.name,n=i.length;for(Pr.lastIndex=0;;){const r=Pr.exec(i),a=Pr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===n){Xo(e,l===void 0?new hp(o,s,t):new dp(o,s,t));break}else{let u=e.map[o];u===void 0&&(u=new up(o),Xo(e,u)),e=u}}}class Gs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const r=t.getActiveUniform(e,n),a=t.getUniformLocation(e,r.name);fp(r,a,this)}}setValue(t,e,i,n){const r=this.map[e];r!==void 0&&r.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,r=t.length;n!==r;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Zo(s,t,e){const i=s.createShader(t);return s.shaderSource(i,e),s.compileShader(i),i}const pp=37297;let mp=0;function gp(s,t){const e=s.split(`
`),i=[],n=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=n;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Yo=new Bt;function xp(s){jt._getMatrix(Yo,jt.workingColorSpace,s);const t=`mat3( ${Yo.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(s)){case Hs:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function qo(s,t,e){const i=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+gp(s.getShaderSource(t),o)}else return r}function _p(s,t){const e=xp(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function vp(s,t){let e;switch(t){case uc:e="Linear";break;case fc:e="Reinhard";break;case pc:e="Cineon";break;case mc:e="ACESFilmic";break;case xc:e="AgX";break;case _c:e="Neutral";break;case gc:e="Custom";break;default:Lt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Is=new I;function Mp(){jt.getLuminanceCoefficients(Is);const s=Is.x.toFixed(4),t=Is.y.toFixed(4),e=Is.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($n).join(`
`)}function bp(s){const t=[];for(const e in s){const i=s[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function yp(s,t){const e={},i=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const r=s.getActiveAttrib(t,n),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function $n(s){return s!==""}function $o(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jo(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ep=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ea(s){return s.replace(Ep,wp)}const Tp=new Map;function wp(s,t){let e=zt[t];if(e===void 0){const i=Tp.get(t);if(i!==void 0)e=zt[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ea(e)}const Ap=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ko(s){return s.replace(Ap,Cp)}function Cp(s,t,e,i){let n="";for(let r=parseInt(t);r<parseInt(e);r++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return n}function Jo(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Rp(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===sl?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Xl?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Si&&(t="SHADOWMAP_TYPE_VSM"),t}function Dp(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Dn:case Pn:t="ENVMAP_TYPE_CUBE";break;case qs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Pp(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Pn:t="ENVMAP_MODE_REFRACTION";break}return t}function Lp(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case wa:t="ENVMAP_BLENDING_MULTIPLY";break;case hc:t="ENVMAP_BLENDING_MIX";break;case dc:t="ENVMAP_BLENDING_ADD";break}return t}function Ip(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Up(s,t,e,i){const n=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=Rp(e),l=Dp(e),d=Pp(e),u=Lp(e),f=Ip(e),m=Sp(e),x=bp(r),_=n.createProgram();let g,p,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter($n).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter($n).join(`
`),p.length>0&&(p+=`
`)):(g=[Jo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($n).join(`
`),p=[Jo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Oi?"#define TONE_MAPPING":"",e.toneMapping!==Oi?zt.tonemapping_pars_fragment:"",e.toneMapping!==Oi?vp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,_p("linearToOutputTexel",e.outputColorSpace),Mp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($n).join(`
`)),a=Ea(a),a=$o(a,e),a=jo(a,e),o=Ea(o),o=$o(o,e),o=jo(o,e),a=Ko(a),o=Ko(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Ka?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ka?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=w+g+a,T=w+p+o,C=Zo(n,n.VERTEX_SHADER,b),E=Zo(n,n.FRAGMENT_SHADER,T);n.attachShader(_,C),n.attachShader(_,E),e.index0AttributeName!==void 0?n.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function R(L){if(s.debug.checkShaderErrors){const O=n.getProgramInfoLog(_)||"",H=n.getShaderInfoLog(C)||"",X=n.getShaderInfoLog(E)||"",W=O.trim(),q=H.trim(),Q=X.trim();let k=!0,nt=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(k=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(n,_,C,E);else{const at=qo(n,C,"vertex"),Et=qo(n,E,"fragment");pe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+W+`
`+at+`
`+Et)}else W!==""?Lt("WebGLProgram: Program Info Log:",W):(q===""||Q==="")&&(nt=!1);nt&&(L.diagnostics={runnable:k,programLog:W,vertexShader:{log:q,prefix:g},fragmentShader:{log:Q,prefix:p}})}n.deleteShader(C),n.deleteShader(E),N=new Gs(n,_),y=yp(n,_)}let N;this.getUniforms=function(){return N===void 0&&R(this),N};let y;this.getAttributes=function(){return y===void 0&&R(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=n.getProgramParameter(_,pp)),M},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=mp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=E,this}let Fp=0;class Np{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Op(t),e.set(t,i)),i}}class Op{constructor(t){this.id=Fp++,this.code=t,this.usedTimes=0}}function Bp(s,t,e,i,n,r,a){const o=new Na,c=new Np,l=new Set,d=[],u=n.logarithmicDepthBuffer,f=n.vertexTextures;let m=n.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,M,L,O,H){const X=O.fog,W=H.geometry,q=y.isMeshStandardMaterial?O.environment:null,Q=(y.isMeshStandardMaterial?e:t).get(y.envMap||q),k=Q&&Q.mapping===qs?Q.image.height:null,nt=x[y.type];y.precision!==null&&(m=n.getMaxPrecision(y.precision),m!==y.precision&&Lt("WebGLProgram.getParameters:",y.precision,"not supported, using",m,"instead."));const at=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Et=at!==void 0?at.length:0;let Yt=0;W.morphAttributes.position!==void 0&&(Yt=1),W.morphAttributes.normal!==void 0&&(Yt=2),W.morphAttributes.color!==void 0&&(Yt=3);let Jt,re,ae,Y;if(nt){const Qt=ci[nt];Jt=Qt.vertexShader,re=Qt.fragmentShader}else Jt=y.vertexShader,re=y.fragmentShader,c.update(y),ae=c.getVertexShaderID(y),Y=c.getFragmentShaderID(y);const K=s.getRenderTarget(),ft=s.state.buffers.depth.getReversed(),Nt=H.isInstancedMesh===!0,Mt=H.isBatchedMesh===!0,Vt=!!y.map,Te=!!y.matcap,Gt=!!Q,ce=!!y.aoMap,D=!!y.lightMap,kt=!!y.bumpMap,Wt=!!y.normalMap,oe=!!y.displacementMap,gt=!!y.emissiveMap,de=!!y.metalnessMap,yt=!!y.roughnessMap,Ft=y.anisotropy>0,A=y.clearcoat>0,v=y.dispersion>0,B=y.iridescence>0,Z=y.sheen>0,j=y.transmission>0,V=Ft&&!!y.anisotropyMap,vt=A&&!!y.clearcoatMap,lt=A&&!!y.clearcoatNormalMap,Tt=A&&!!y.clearcoatRoughnessMap,_t=B&&!!y.iridescenceMap,J=B&&!!y.iridescenceThicknessMap,it=Z&&!!y.sheenColorMap,Rt=Z&&!!y.sheenRoughnessMap,At=!!y.specularMap,dt=!!y.specularColorMap,Pt=!!y.specularIntensityMap,P=j&&!!y.transmissionMap,ct=j&&!!y.thicknessMap,st=!!y.gradientMap,rt=!!y.alphaMap,tt=y.alphaTest>0,$=!!y.alphaHash,pt=!!y.extensions;let Ut=Oi;y.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(Ut=s.toneMapping);const le={shaderID:nt,shaderType:y.type,shaderName:y.name,vertexShader:Jt,fragmentShader:re,defines:y.defines,customVertexShaderID:ae,customFragmentShaderID:Y,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:m,batching:Mt,batchingColor:Mt&&H._colorsTexture!==null,instancing:Nt,instancingColor:Nt&&H.instanceColor!==null,instancingMorph:Nt&&H.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:K===null?s.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ln,alphaToCoverage:!!y.alphaToCoverage,map:Vt,matcap:Te,envMap:Gt,envMapMode:Gt&&Q.mapping,envMapCubeUVHeight:k,aoMap:ce,lightMap:D,bumpMap:kt,normalMap:Wt,displacementMap:f&&oe,emissiveMap:gt,normalMapObjectSpace:Wt&&y.normalMapType===bc,normalMapTangentSpace:Wt&&y.normalMapType===ul,metalnessMap:de,roughnessMap:yt,anisotropy:Ft,anisotropyMap:V,clearcoat:A,clearcoatMap:vt,clearcoatNormalMap:lt,clearcoatRoughnessMap:Tt,dispersion:v,iridescence:B,iridescenceMap:_t,iridescenceThicknessMap:J,sheen:Z,sheenColorMap:it,sheenRoughnessMap:Rt,specularMap:At,specularColorMap:dt,specularIntensityMap:Pt,transmission:j,transmissionMap:P,thicknessMap:ct,gradientMap:st,opaque:y.transparent===!1&&y.blending===Qi&&y.alphaToCoverage===!1,alphaMap:rt,alphaTest:tt,alphaHash:$,combine:y.combine,mapUv:Vt&&_(y.map.channel),aoMapUv:ce&&_(y.aoMap.channel),lightMapUv:D&&_(y.lightMap.channel),bumpMapUv:kt&&_(y.bumpMap.channel),normalMapUv:Wt&&_(y.normalMap.channel),displacementMapUv:oe&&_(y.displacementMap.channel),emissiveMapUv:gt&&_(y.emissiveMap.channel),metalnessMapUv:de&&_(y.metalnessMap.channel),roughnessMapUv:yt&&_(y.roughnessMap.channel),anisotropyMapUv:V&&_(y.anisotropyMap.channel),clearcoatMapUv:vt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:lt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:it&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(y.sheenRoughnessMap.channel),specularMapUv:At&&_(y.specularMap.channel),specularColorMapUv:dt&&_(y.specularColorMap.channel),specularIntensityMapUv:Pt&&_(y.specularIntensityMap.channel),transmissionMapUv:P&&_(y.transmissionMap.channel),thicknessMapUv:ct&&_(y.thicknessMap.channel),alphaMapUv:rt&&_(y.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Wt||Ft),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!W.attributes.uv&&(Vt||rt),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ft,skinning:H.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Yt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Vt&&y.map.isVideoTexture===!0&&jt.getTransfer(y.map.colorSpace)===ee,decodeVideoTextureEmissive:gt&&y.emissiveMap.isVideoTexture===!0&&jt.getTransfer(y.emissiveMap.colorSpace)===ee,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ke,flipSided:y.side===ze,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:pt&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pt&&y.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le}function p(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)M.push(L),M.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(w(M,y),b(M,y),M.push(s.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function w(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function b(y,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),y.push(o.mask)}function T(y){const M=x[y.type];let L;if(M){const O=ci[M];L=Jc.clone(O.uniforms)}else L=y.uniforms;return L}function C(y,M){let L;for(let O=0,H=d.length;O<H;O++){const X=d[O];if(X.cacheKey===M){L=X,++L.usedTimes;break}}return L===void 0&&(L=new Up(s,M,y,r),d.push(L)),L}function E(y){if(--y.usedTimes===0){const M=d.indexOf(y);d[M]=d[d.length-1],d.pop(),y.destroy()}}function R(y){c.remove(y)}function N(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:T,acquireProgram:C,releaseProgram:E,releaseShaderCache:R,programs:d,dispose:N}}function zp(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function i(a){s.delete(a)}function n(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:r}}function Gp(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Qo(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function tl(){const s=[];let t=0;const e=[],i=[],n=[];function r(){t=0,e.length=0,i.length=0,n.length=0}function a(u,f,m,x,_,g){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:m,groupOrder:x,renderOrder:u.renderOrder,z:_,group:g},s[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=m,p.groupOrder=x,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function o(u,f,m,x,_,g){const p=a(u,f,m,x,_,g);m.transmission>0?i.push(p):m.transparent===!0?n.push(p):e.push(p)}function c(u,f,m,x,_,g){const p=a(u,f,m,x,_,g);m.transmission>0?i.unshift(p):m.transparent===!0?n.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||Gp),i.length>1&&i.sort(f||Qo),n.length>1&&n.sort(f||Qo)}function d(){for(let u=t,f=s.length;u<f;u++){const m=s[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:n,init:r,push:o,unshift:c,finish:d,sort:l}}function Hp(){let s=new WeakMap;function t(i,n){const r=s.get(i);let a;return r===void 0?(a=new tl,s.set(i,[a])):n>=r.length?(a=new tl,r.push(a)):a=r[n],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function Vp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new It};break;case"SpotLight":e={position:new I,direction:new I,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new I,halfWidth:new I,halfHeight:new I};break}return s[t.id]=e,e}}}function kp(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Wp=0;function Xp(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Zp(s){const t=new Vp,e=kp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const n=new I,r=new Kt,a=new Kt;function o(l){let d=0,u=0,f=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let m=0,x=0,_=0,g=0,p=0,w=0,b=0,T=0,C=0,E=0,R=0;l.sort(Xp);for(let y=0,M=l.length;y<M;y++){const L=l[y],O=L.color,H=L.intensity,X=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=O.r*H,u+=O.g*H,f+=O.b*H;else if(L.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(L.sh.coefficients[q],H);R++}else if(L.isDirectionalLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,k=e.get(L);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,i.directionalShadow[m]=k,i.directionalShadowMap[m]=W,i.directionalShadowMatrix[m]=L.shadow.matrix,w++}i.directional[m]=q,m++}else if(L.isSpotLight){const q=t.get(L);q.position.setFromMatrixPosition(L.matrixWorld),q.color.copy(O).multiplyScalar(H),q.distance=X,q.coneCos=Math.cos(L.angle),q.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),q.decay=L.decay,i.spot[_]=q;const Q=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,Q.updateMatrices(L),L.castShadow&&E++),i.spotLightMatrix[_]=Q.matrix,L.castShadow){const k=e.get(L);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,i.spotShadow[_]=k,i.spotShadowMap[_]=W,T++}_++}else if(L.isRectAreaLight){const q=t.get(L);q.color.copy(O).multiplyScalar(H),q.halfWidth.set(L.width*.5,0,0),q.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=q,g++}else if(L.isPointLight){const q=t.get(L);if(q.color.copy(L.color).multiplyScalar(L.intensity),q.distance=L.distance,q.decay=L.decay,L.castShadow){const Q=L.shadow,k=e.get(L);k.shadowIntensity=Q.intensity,k.shadowBias=Q.bias,k.shadowNormalBias=Q.normalBias,k.shadowRadius=Q.radius,k.shadowMapSize=Q.mapSize,k.shadowCameraNear=Q.camera.near,k.shadowCameraFar=Q.camera.far,i.pointShadow[x]=k,i.pointShadowMap[x]=W,i.pointShadowMatrix[x]=L.shadow.matrix,b++}i.point[x]=q,x++}else if(L.isHemisphereLight){const q=t.get(L);q.skyColor.copy(L.color).multiplyScalar(H),q.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[p]=q,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ot.LTC_FLOAT_1,i.rectAreaLTC2=ot.LTC_FLOAT_2):(i.rectAreaLTC1=ot.LTC_HALF_1,i.rectAreaLTC2=ot.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=u,i.ambient[2]=f;const N=i.hash;(N.directionalLength!==m||N.pointLength!==x||N.spotLength!==_||N.rectAreaLength!==g||N.hemiLength!==p||N.numDirectionalShadows!==w||N.numPointShadows!==b||N.numSpotShadows!==T||N.numSpotMaps!==C||N.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=_,i.rectArea.length=g,i.point.length=x,i.hemi.length=p,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=T+C-E,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=R,N.directionalLength=m,N.pointLength=x,N.spotLength=_,N.rectAreaLength=g,N.hemiLength=p,N.numDirectionalShadows=w,N.numPointShadows=b,N.numSpotShadows=T,N.numSpotMaps=C,N.numLightProbes=R,i.version=Wp++)}function c(l,d){let u=0,f=0,m=0,x=0,_=0;const g=d.matrixWorldInverse;for(let p=0,w=l.length;p<w;p++){const b=l[p];if(b.isDirectionalLight){const T=i.directional[u];T.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(n),T.direction.transformDirection(g),u++}else if(b.isSpotLight){const T=i.spot[m];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(n),T.direction.transformDirection(g),m++}else if(b.isRectAreaLight){const T=i.rectArea[x];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(g),a.identity(),r.copy(b.matrixWorld),r.premultiply(g),a.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){const T=i.point[f];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(g),f++}else if(b.isHemisphereLight){const T=i.hemi[_];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:i}}function el(s){const t=new Zp(s),e=[],i=[];function n(d){l.camera=d,e.length=0,i.length=0}function r(d){e.push(d)}function a(d){i.push(d)}function o(){t.setup(e)}function c(d){t.setupView(e,d)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Yp(s){let t=new WeakMap;function e(n,r=0){const a=t.get(n);let o;return a===void 0?(o=new el(s),t.set(n,[o])):r>=a.length?(o=new el(s),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$p=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function jp(s,t,e){let i=new is;const n=new bt,r=new bt,a=new xe,o=new ph({depthPacking:Sc}),c=new mh,l={},d=e.maxTextureSize,u={[zi]:ze,[ze]:zi,[Ke]:Ke},f=new Ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:qp,fragmentShader:$p}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const x=new Fe;x.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Zt(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sl;let p=this.type;this.render=function(E,R,N){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const y=s.getRenderTarget(),M=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),O=s.state;O.setBlending(yi),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=p!==Si&&this.type===Si,X=p===Si&&this.type!==Si;for(let W=0,q=E.length;W<q;W++){const Q=E[W],k=Q.shadow;if(k===void 0){Lt("WebGLShadowMap:",Q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;n.copy(k.mapSize);const nt=k.getFrameExtents();if(n.multiply(nt),r.copy(k.mapSize),(n.x>d||n.y>d)&&(n.x>d&&(r.x=Math.floor(d/nt.x),n.x=r.x*nt.x,k.mapSize.x=r.x),n.y>d&&(r.y=Math.floor(d/nt.y),n.y=r.y*nt.y,k.mapSize.y=r.y)),k.map===null||H===!0||X===!0){const Et=this.type!==Si?{minFilter:Ye,magFilter:Ye}:{};k.map!==null&&k.map.dispose(),k.map=new nn(n.x,n.y,Et),k.map.texture.name=Q.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const at=k.getViewportCount();for(let Et=0;Et<at;Et++){const Yt=k.getViewport(Et);a.set(r.x*Yt.x,r.y*Yt.y,r.x*Yt.z,r.y*Yt.w),O.viewport(a),k.updateMatrices(Q,Et),i=k.getFrustum(),T(R,N,k.camera,Q,this.type)}k.isPointLightShadow!==!0&&this.type===Si&&w(k,N),k.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(y,M,L)};function w(E,R){const N=t.update(_);f.defines.VSM_SAMPLES!==E.blurSamples&&(f.defines.VSM_SAMPLES=E.blurSamples,m.defines.VSM_SAMPLES=E.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new nn(n.x,n.y)),f.uniforms.shadow_pass.value=E.map.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(R,null,N,f,_,null),m.uniforms.shadow_pass.value=E.mapPass.texture,m.uniforms.resolution.value=E.mapSize,m.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(R,null,N,m,_,null)}function b(E,R,N,y){let M=null;const L=N.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)M=L;else if(M=N.isPointLight===!0?c:o,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const O=M.uuid,H=R.uuid;let X=l[O];X===void 0&&(X={},l[O]=X);let W=X[H];W===void 0&&(W=M.clone(),X[H]=W,R.addEventListener("dispose",C)),M=W}if(M.visible=R.visible,M.wireframe=R.wireframe,y===Si?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,N.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=s.properties.get(M);O.light=N}return M}function T(E,R,N,y,M){if(E.visible===!1)return;if(E.layers.test(R.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Si)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,E.matrixWorld);const H=t.update(E),X=E.material;if(Array.isArray(X)){const W=H.groups;for(let q=0,Q=W.length;q<Q;q++){const k=W[q],nt=X[k.materialIndex];if(nt&&nt.visible){const at=b(E,nt,y,M);E.onBeforeShadow(s,E,R,N,H,at,k),s.renderBufferDirect(N,null,H,at,E,k),E.onAfterShadow(s,E,R,N,H,at,k)}}}else if(X.visible){const W=b(E,X,y,M);E.onBeforeShadow(s,E,R,N,H,W,null),s.renderBufferDirect(N,null,H,W,E,null),E.onAfterShadow(s,E,R,N,H,W,null)}}const O=E.children;for(let H=0,X=O.length;H<X;H++)T(O[H],R,N,y,M)}function C(E){E.target.removeEventListener("dispose",C);for(const N in l){const y=l[N],M=E.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Kp={[Fr]:Nr,[Or]:Gr,[Br]:Hr,[Rn]:zr,[Nr]:Fr,[Gr]:Or,[Hr]:Br,[zr]:Rn};function Jp(s,t){function e(){let P=!1;const ct=new xe;let st=null;const rt=new xe(0,0,0,0);return{setMask:function(tt){st!==tt&&!P&&(s.colorMask(tt,tt,tt,tt),st=tt)},setLocked:function(tt){P=tt},setClear:function(tt,$,pt,Ut,le){le===!0&&(tt*=Ut,$*=Ut,pt*=Ut),ct.set(tt,$,pt,Ut),rt.equals(ct)===!1&&(s.clearColor(tt,$,pt,Ut),rt.copy(ct))},reset:function(){P=!1,st=null,rt.set(-1,0,0,0)}}}function i(){let P=!1,ct=!1,st=null,rt=null,tt=null;return{setReversed:function($){if(ct!==$){const pt=t.get("EXT_clip_control");$?pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.ZERO_TO_ONE_EXT):pt.clipControlEXT(pt.LOWER_LEFT_EXT,pt.NEGATIVE_ONE_TO_ONE_EXT),ct=$;const Ut=tt;tt=null,this.setClear(Ut)}},getReversed:function(){return ct},setTest:function($){$?K(s.DEPTH_TEST):ft(s.DEPTH_TEST)},setMask:function($){st!==$&&!P&&(s.depthMask($),st=$)},setFunc:function($){if(ct&&($=Kp[$]),rt!==$){switch($){case Fr:s.depthFunc(s.NEVER);break;case Nr:s.depthFunc(s.ALWAYS);break;case Or:s.depthFunc(s.LESS);break;case Rn:s.depthFunc(s.LEQUAL);break;case Br:s.depthFunc(s.EQUAL);break;case zr:s.depthFunc(s.GEQUAL);break;case Gr:s.depthFunc(s.GREATER);break;case Hr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}rt=$}},setLocked:function($){P=$},setClear:function($){tt!==$&&(ct&&($=1-$),s.clearDepth($),tt=$)},reset:function(){P=!1,st=null,rt=null,tt=null,ct=!1}}}function n(){let P=!1,ct=null,st=null,rt=null,tt=null,$=null,pt=null,Ut=null,le=null;return{setTest:function(Qt){P||(Qt?K(s.STENCIL_TEST):ft(s.STENCIL_TEST))},setMask:function(Qt){ct!==Qt&&!P&&(s.stencilMask(Qt),ct=Qt)},setFunc:function(Qt,li,ti){(st!==Qt||rt!==li||tt!==ti)&&(s.stencilFunc(Qt,li,ti),st=Qt,rt=li,tt=ti)},setOp:function(Qt,li,ti){($!==Qt||pt!==li||Ut!==ti)&&(s.stencilOp(Qt,li,ti),$=Qt,pt=li,Ut=ti)},setLocked:function(Qt){P=Qt},setClear:function(Qt){le!==Qt&&(s.clearStencil(Qt),le=Qt)},reset:function(){P=!1,ct=null,st=null,rt=null,tt=null,$=null,pt=null,Ut=null,le=null}}}const r=new e,a=new i,o=new n,c=new WeakMap,l=new WeakMap;let d={},u={},f=new WeakMap,m=[],x=null,_=!1,g=null,p=null,w=null,b=null,T=null,C=null,E=null,R=new It(0,0,0),N=0,y=!1,M=null,L=null,O=null,H=null,X=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Q=0;const k=s.getParameter(s.VERSION);k.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(k)[1]),q=Q>=1):k.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),q=Q>=2);let nt=null,at={};const Et=s.getParameter(s.SCISSOR_BOX),Yt=s.getParameter(s.VIEWPORT),Jt=new xe().fromArray(Et),re=new xe().fromArray(Yt);function ae(P,ct,st,rt){const tt=new Uint8Array(4),$=s.createTexture();s.bindTexture(P,$),s.texParameteri(P,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(P,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let pt=0;pt<st;pt++)P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY?s.texImage3D(ct,0,s.RGBA,1,1,rt,0,s.RGBA,s.UNSIGNED_BYTE,tt):s.texImage2D(ct+pt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,tt);return $}const Y={};Y[s.TEXTURE_2D]=ae(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=ae(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=ae(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=ae(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),K(s.DEPTH_TEST),a.setFunc(Rn),kt(!1),Wt(Za),K(s.CULL_FACE),ce(yi);function K(P){d[P]!==!0&&(s.enable(P),d[P]=!0)}function ft(P){d[P]!==!1&&(s.disable(P),d[P]=!1)}function Nt(P,ct){return u[P]!==ct?(s.bindFramebuffer(P,ct),u[P]=ct,P===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ct),P===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ct),!0):!1}function Mt(P,ct){let st=m,rt=!1;if(P){st=f.get(ct),st===void 0&&(st=[],f.set(ct,st));const tt=P.textures;if(st.length!==tt.length||st[0]!==s.COLOR_ATTACHMENT0){for(let $=0,pt=tt.length;$<pt;$++)st[$]=s.COLOR_ATTACHMENT0+$;st.length=tt.length,rt=!0}}else st[0]!==s.BACK&&(st[0]=s.BACK,rt=!0);rt&&s.drawBuffers(st)}function Vt(P){return x!==P?(s.useProgram(P),x=P,!0):!1}const Te={[Ki]:s.FUNC_ADD,[Yl]:s.FUNC_SUBTRACT,[ql]:s.FUNC_REVERSE_SUBTRACT};Te[$l]=s.MIN,Te[jl]=s.MAX;const Gt={[Kl]:s.ZERO,[Jl]:s.ONE,[Ql]:s.SRC_COLOR,[Ir]:s.SRC_ALPHA,[rc]:s.SRC_ALPHA_SATURATE,[nc]:s.DST_COLOR,[ec]:s.DST_ALPHA,[tc]:s.ONE_MINUS_SRC_COLOR,[Ur]:s.ONE_MINUS_SRC_ALPHA,[sc]:s.ONE_MINUS_DST_COLOR,[ic]:s.ONE_MINUS_DST_ALPHA,[ac]:s.CONSTANT_COLOR,[oc]:s.ONE_MINUS_CONSTANT_COLOR,[lc]:s.CONSTANT_ALPHA,[cc]:s.ONE_MINUS_CONSTANT_ALPHA};function ce(P,ct,st,rt,tt,$,pt,Ut,le,Qt){if(P===yi){_===!0&&(ft(s.BLEND),_=!1);return}if(_===!1&&(K(s.BLEND),_=!0),P!==Zl){if(P!==g||Qt!==y){if((p!==Ki||T!==Ki)&&(s.blendEquation(s.FUNC_ADD),p=Ki,T=Ki),Qt)switch(P){case Qi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ya:s.blendFunc(s.ONE,s.ONE);break;case qa:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case $a:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:pe("WebGLState: Invalid blending: ",P);break}else switch(P){case Qi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ya:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case qa:pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $a:pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:pe("WebGLState: Invalid blending: ",P);break}w=null,b=null,C=null,E=null,R.set(0,0,0),N=0,g=P,y=Qt}return}tt=tt||ct,$=$||st,pt=pt||rt,(ct!==p||tt!==T)&&(s.blendEquationSeparate(Te[ct],Te[tt]),p=ct,T=tt),(st!==w||rt!==b||$!==C||pt!==E)&&(s.blendFuncSeparate(Gt[st],Gt[rt],Gt[$],Gt[pt]),w=st,b=rt,C=$,E=pt),(Ut.equals(R)===!1||le!==N)&&(s.blendColor(Ut.r,Ut.g,Ut.b,le),R.copy(Ut),N=le),g=P,y=!1}function D(P,ct){P.side===Ke?ft(s.CULL_FACE):K(s.CULL_FACE);let st=P.side===ze;ct&&(st=!st),kt(st),P.blending===Qi&&P.transparent===!1?ce(yi):ce(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const rt=P.stencilWrite;o.setTest(rt),rt&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),gt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?K(s.SAMPLE_ALPHA_TO_COVERAGE):ft(s.SAMPLE_ALPHA_TO_COVERAGE)}function kt(P){M!==P&&(P?s.frontFace(s.CW):s.frontFace(s.CCW),M=P)}function Wt(P){P!==kl?(K(s.CULL_FACE),P!==L&&(P===Za?s.cullFace(s.BACK):P===Wl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ft(s.CULL_FACE),L=P}function oe(P){P!==O&&(q&&s.lineWidth(P),O=P)}function gt(P,ct,st){P?(K(s.POLYGON_OFFSET_FILL),(H!==ct||X!==st)&&(s.polygonOffset(ct,st),H=ct,X=st)):ft(s.POLYGON_OFFSET_FILL)}function de(P){P?K(s.SCISSOR_TEST):ft(s.SCISSOR_TEST)}function yt(P){P===void 0&&(P=s.TEXTURE0+W-1),nt!==P&&(s.activeTexture(P),nt=P)}function Ft(P,ct,st){st===void 0&&(nt===null?st=s.TEXTURE0+W-1:st=nt);let rt=at[st];rt===void 0&&(rt={type:void 0,texture:void 0},at[st]=rt),(rt.type!==P||rt.texture!==ct)&&(nt!==st&&(s.activeTexture(st),nt=st),s.bindTexture(P,ct||Y[P]),rt.type=P,rt.texture=ct)}function A(){const P=at[nt];P!==void 0&&P.type!==void 0&&(s.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function v(){try{s.compressedTexImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function B(){try{s.compressedTexImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function Z(){try{s.texSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function j(){try{s.texSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function V(){try{s.compressedTexSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function vt(){try{s.compressedTexSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function lt(){try{s.texStorage2D(...arguments)}catch(P){P("WebGLState:",P)}}function Tt(){try{s.texStorage3D(...arguments)}catch(P){P("WebGLState:",P)}}function _t(){try{s.texImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function J(){try{s.texImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function it(P){Jt.equals(P)===!1&&(s.scissor(P.x,P.y,P.z,P.w),Jt.copy(P))}function Rt(P){re.equals(P)===!1&&(s.viewport(P.x,P.y,P.z,P.w),re.copy(P))}function At(P,ct){let st=l.get(ct);st===void 0&&(st=new WeakMap,l.set(ct,st));let rt=st.get(P);rt===void 0&&(rt=s.getUniformBlockIndex(ct,P.name),st.set(P,rt))}function dt(P,ct){const rt=l.get(ct).get(P);c.get(ct)!==rt&&(s.uniformBlockBinding(ct,rt,P.__bindingPointIndex),c.set(ct,rt))}function Pt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},nt=null,at={},u={},f=new WeakMap,m=[],x=null,_=!1,g=null,p=null,w=null,b=null,T=null,C=null,E=null,R=new It(0,0,0),N=0,y=!1,M=null,L=null,O=null,H=null,X=null,Jt.set(0,0,s.canvas.width,s.canvas.height),re.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:K,disable:ft,bindFramebuffer:Nt,drawBuffers:Mt,useProgram:Vt,setBlending:ce,setMaterial:D,setFlipSided:kt,setCullFace:Wt,setLineWidth:oe,setPolygonOffset:gt,setScissorTest:de,activeTexture:yt,bindTexture:Ft,unbindTexture:A,compressedTexImage2D:v,compressedTexImage3D:B,texImage2D:_t,texImage3D:J,updateUBOMapping:At,uniformBlockBinding:dt,texStorage2D:lt,texStorage3D:Tt,texSubImage2D:Z,texSubImage3D:j,compressedTexSubImage2D:V,compressedTexSubImage3D:vt,scissor:it,viewport:Rt,reset:Pt}}function Qp(s,t,e,i,n,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new bt,d=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,v){return m?new OffscreenCanvas(A,v):ks("canvas")}function _(A,v,B){let Z=1;const j=Ft(A);if((j.width>B||j.height>B)&&(Z=B/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const V=Math.floor(Z*j.width),vt=Math.floor(Z*j.height);u===void 0&&(u=x(V,vt));const lt=v?x(V,vt):u;return lt.width=V,lt.height=vt,lt.getContext("2d").drawImage(A,0,0,V,vt),Lt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+V+"x"+vt+")."),lt}else return"data"in A&&Lt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function g(A){return A.generateMipmaps}function p(A){s.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function b(A,v,B,Z,j=!1){if(A!==null){if(s[A]!==void 0)return s[A];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let V=v;if(v===s.RED&&(B===s.FLOAT&&(V=s.R32F),B===s.HALF_FLOAT&&(V=s.R16F),B===s.UNSIGNED_BYTE&&(V=s.R8)),v===s.RED_INTEGER&&(B===s.UNSIGNED_BYTE&&(V=s.R8UI),B===s.UNSIGNED_SHORT&&(V=s.R16UI),B===s.UNSIGNED_INT&&(V=s.R32UI),B===s.BYTE&&(V=s.R8I),B===s.SHORT&&(V=s.R16I),B===s.INT&&(V=s.R32I)),v===s.RG&&(B===s.FLOAT&&(V=s.RG32F),B===s.HALF_FLOAT&&(V=s.RG16F),B===s.UNSIGNED_BYTE&&(V=s.RG8)),v===s.RG_INTEGER&&(B===s.UNSIGNED_BYTE&&(V=s.RG8UI),B===s.UNSIGNED_SHORT&&(V=s.RG16UI),B===s.UNSIGNED_INT&&(V=s.RG32UI),B===s.BYTE&&(V=s.RG8I),B===s.SHORT&&(V=s.RG16I),B===s.INT&&(V=s.RG32I)),v===s.RGB_INTEGER&&(B===s.UNSIGNED_BYTE&&(V=s.RGB8UI),B===s.UNSIGNED_SHORT&&(V=s.RGB16UI),B===s.UNSIGNED_INT&&(V=s.RGB32UI),B===s.BYTE&&(V=s.RGB8I),B===s.SHORT&&(V=s.RGB16I),B===s.INT&&(V=s.RGB32I)),v===s.RGBA_INTEGER&&(B===s.UNSIGNED_BYTE&&(V=s.RGBA8UI),B===s.UNSIGNED_SHORT&&(V=s.RGBA16UI),B===s.UNSIGNED_INT&&(V=s.RGBA32UI),B===s.BYTE&&(V=s.RGBA8I),B===s.SHORT&&(V=s.RGBA16I),B===s.INT&&(V=s.RGBA32I)),v===s.RGB&&(B===s.UNSIGNED_INT_5_9_9_9_REV&&(V=s.RGB9_E5),B===s.UNSIGNED_INT_10F_11F_11F_REV&&(V=s.R11F_G11F_B10F)),v===s.RGBA){const vt=j?Hs:jt.getTransfer(Z);B===s.FLOAT&&(V=s.RGBA32F),B===s.HALF_FLOAT&&(V=s.RGBA16F),B===s.UNSIGNED_BYTE&&(V=vt===ee?s.SRGB8_ALPHA8:s.RGBA8),B===s.UNSIGNED_SHORT_4_4_4_4&&(V=s.RGBA4),B===s.UNSIGNED_SHORT_5_5_5_1&&(V=s.RGB5_A1)}return(V===s.R16F||V===s.R32F||V===s.RG16F||V===s.RG32F||V===s.RGBA16F||V===s.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function T(A,v){let B;return A?v===null||v===tn||v===Kn?B=s.DEPTH24_STENCIL8:v===di?B=s.DEPTH32F_STENCIL8:v===jn&&(B=s.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===tn||v===Kn?B=s.DEPTH_COMPONENT24:v===di?B=s.DEPTH_COMPONENT32F:v===jn&&(B=s.DEPTH_COMPONENT16),B}function C(A,v){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ye&&A.minFilter!==Qe?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function E(A){const v=A.target;v.removeEventListener("dispose",E),N(v),v.isVideoTexture&&d.delete(v)}function R(A){const v=A.target;v.removeEventListener("dispose",R),M(v)}function N(A){const v=i.get(A);if(v.__webglInit===void 0)return;const B=A.source,Z=f.get(B);if(Z){const j=Z[v.__cacheKey];j.usedTimes--,j.usedTimes===0&&y(A),Object.keys(Z).length===0&&f.delete(B)}i.remove(A)}function y(A){const v=i.get(A);s.deleteTexture(v.__webglTexture);const B=A.source,Z=f.get(B);delete Z[v.__cacheKey],a.memory.textures--}function M(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(v.__webglFramebuffer[Z]))for(let j=0;j<v.__webglFramebuffer[Z].length;j++)s.deleteFramebuffer(v.__webglFramebuffer[Z][j]);else s.deleteFramebuffer(v.__webglFramebuffer[Z]);v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer[Z])}else{if(Array.isArray(v.__webglFramebuffer))for(let Z=0;Z<v.__webglFramebuffer.length;Z++)s.deleteFramebuffer(v.__webglFramebuffer[Z]);else s.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&s.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&s.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let Z=0;Z<v.__webglColorRenderbuffer.length;Z++)v.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(v.__webglColorRenderbuffer[Z]);v.__webglDepthRenderbuffer&&s.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const B=A.textures;for(let Z=0,j=B.length;Z<j;Z++){const V=i.get(B[Z]);V.__webglTexture&&(s.deleteTexture(V.__webglTexture),a.memory.textures--),i.remove(B[Z])}i.remove(A)}let L=0;function O(){L=0}function H(){const A=L;return A>=n.maxTextures&&Lt("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+n.maxTextures),L+=1,A}function X(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function W(A,v){const B=i.get(A);if(A.isVideoTexture&&de(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&B.__version!==A.version){const Z=A.image;if(Z===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{Y(B,A,v);return}}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,B.__webglTexture,s.TEXTURE0+v)}function q(A,v){const B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Y(B,A,v);return}else A.isExternalTexture&&(B.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,B.__webglTexture,s.TEXTURE0+v)}function Q(A,v){const B=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){Y(B,A,v);return}e.bindTexture(s.TEXTURE_3D,B.__webglTexture,s.TEXTURE0+v)}function k(A,v){const B=i.get(A);if(A.version>0&&B.__version!==A.version){K(B,A,v);return}e.bindTexture(s.TEXTURE_CUBE_MAP,B.__webglTexture,s.TEXTURE0+v)}const nt={[Wr]:s.REPEAT,[bi]:s.CLAMP_TO_EDGE,[Xr]:s.MIRRORED_REPEAT},at={[Ye]:s.NEAREST,[vc]:s.NEAREST_MIPMAP_NEAREST,[as]:s.NEAREST_MIPMAP_LINEAR,[Qe]:s.LINEAR,[tr]:s.LINEAR_MIPMAP_NEAREST,[Fi]:s.LINEAR_MIPMAP_LINEAR},Et={[yc]:s.NEVER,[Rc]:s.ALWAYS,[Ec]:s.LESS,[fl]:s.LEQUAL,[Tc]:s.EQUAL,[Cc]:s.GEQUAL,[wc]:s.GREATER,[Ac]:s.NOTEQUAL};function Yt(A,v){if(v.type===di&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Qe||v.magFilter===tr||v.magFilter===as||v.magFilter===Fi||v.minFilter===Qe||v.minFilter===tr||v.minFilter===as||v.minFilter===Fi)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,nt[v.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,nt[v.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,nt[v.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,at[v.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,at[v.minFilter]),v.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,Et[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ye||v.minFilter!==as&&v.minFilter!==Fi||v.type===di&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,n.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Jt(A,v){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",E));const Z=v.source;let j=f.get(Z);j===void 0&&(j={},f.set(Z,j));const V=X(v);if(V!==A.__cacheKey){j[V]===void 0&&(j[V]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,B=!0),j[V].usedTimes++;const vt=j[A.__cacheKey];vt!==void 0&&(j[A.__cacheKey].usedTimes--,vt.usedTimes===0&&y(v)),A.__cacheKey=V,A.__webglTexture=j[V].texture}return B}function re(A,v,B){return Math.floor(Math.floor(A/B)/v)}function ae(A,v,B,Z){const V=A.updateRanges;if(V.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,v.width,v.height,B,Z,v.data);else{V.sort((J,it)=>J.start-it.start);let vt=0;for(let J=1;J<V.length;J++){const it=V[vt],Rt=V[J],At=it.start+it.count,dt=re(Rt.start,v.width,4),Pt=re(it.start,v.width,4);Rt.start<=At+1&&dt===Pt&&re(Rt.start+Rt.count-1,v.width,4)===dt?it.count=Math.max(it.count,Rt.start+Rt.count-it.start):(++vt,V[vt]=Rt)}V.length=vt+1;const lt=s.getParameter(s.UNPACK_ROW_LENGTH),Tt=s.getParameter(s.UNPACK_SKIP_PIXELS),_t=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,v.width);for(let J=0,it=V.length;J<it;J++){const Rt=V[J],At=Math.floor(Rt.start/4),dt=Math.ceil(Rt.count/4),Pt=At%v.width,P=Math.floor(At/v.width),ct=dt,st=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Pt),s.pixelStorei(s.UNPACK_SKIP_ROWS,P),e.texSubImage2D(s.TEXTURE_2D,0,Pt,P,ct,st,B,Z,v.data)}A.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,lt),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Tt),s.pixelStorei(s.UNPACK_SKIP_ROWS,_t)}}function Y(A,v,B){let Z=s.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(Z=s.TEXTURE_2D_ARRAY),v.isData3DTexture&&(Z=s.TEXTURE_3D);const j=Jt(A,v),V=v.source;e.bindTexture(Z,A.__webglTexture,s.TEXTURE0+B);const vt=i.get(V);if(V.version!==vt.__version||j===!0){e.activeTexture(s.TEXTURE0+B);const lt=jt.getPrimaries(jt.workingColorSpace),Tt=v.colorSpace===Ui?null:jt.getPrimaries(v.colorSpace),_t=v.colorSpace===Ui||lt===Tt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let J=_(v.image,!1,n.maxTextureSize);J=yt(v,J);const it=r.convert(v.format,v.colorSpace),Rt=r.convert(v.type);let At=b(v.internalFormat,it,Rt,v.colorSpace,v.isVideoTexture);Yt(Z,v);let dt;const Pt=v.mipmaps,P=v.isVideoTexture!==!0,ct=vt.__version===void 0||j===!0,st=V.dataReady,rt=C(v,J);if(v.isDepthTexture)At=T(v.format===Qn,v.type),ct&&(P?e.texStorage2D(s.TEXTURE_2D,1,At,J.width,J.height):e.texImage2D(s.TEXTURE_2D,0,At,J.width,J.height,0,it,Rt,null));else if(v.isDataTexture)if(Pt.length>0){P&&ct&&e.texStorage2D(s.TEXTURE_2D,rt,At,Pt[0].width,Pt[0].height);for(let tt=0,$=Pt.length;tt<$;tt++)dt=Pt[tt],P?st&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,it,Rt,dt.data):e.texImage2D(s.TEXTURE_2D,tt,At,dt.width,dt.height,0,it,Rt,dt.data);v.generateMipmaps=!1}else P?(ct&&e.texStorage2D(s.TEXTURE_2D,rt,At,J.width,J.height),st&&ae(v,J,it,Rt)):e.texImage2D(s.TEXTURE_2D,0,At,J.width,J.height,0,it,Rt,J.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){P&&ct&&e.texStorage3D(s.TEXTURE_2D_ARRAY,rt,At,Pt[0].width,Pt[0].height,J.depth);for(let tt=0,$=Pt.length;tt<$;tt++)if(dt=Pt[tt],v.format!==ri)if(it!==null)if(P){if(st)if(v.layerUpdates.size>0){const pt=Lo(dt.width,dt.height,v.format,v.type);for(const Ut of v.layerUpdates){const le=dt.data.subarray(Ut*pt/dt.data.BYTES_PER_ELEMENT,(Ut+1)*pt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,Ut,dt.width,dt.height,1,it,le)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,J.depth,it,dt.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,tt,At,dt.width,dt.height,J.depth,0,dt.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?st&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,tt,0,0,0,dt.width,dt.height,J.depth,it,Rt,dt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,tt,At,dt.width,dt.height,J.depth,0,it,Rt,dt.data)}else{P&&ct&&e.texStorage2D(s.TEXTURE_2D,rt,At,Pt[0].width,Pt[0].height);for(let tt=0,$=Pt.length;tt<$;tt++)dt=Pt[tt],v.format!==ri?it!==null?P?st&&e.compressedTexSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,it,dt.data):e.compressedTexImage2D(s.TEXTURE_2D,tt,At,dt.width,dt.height,0,dt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?st&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,dt.width,dt.height,it,Rt,dt.data):e.texImage2D(s.TEXTURE_2D,tt,At,dt.width,dt.height,0,it,Rt,dt.data)}else if(v.isDataArrayTexture)if(P){if(ct&&e.texStorage3D(s.TEXTURE_2D_ARRAY,rt,At,J.width,J.height,J.depth),st)if(v.layerUpdates.size>0){const tt=Lo(J.width,J.height,v.format,v.type);for(const $ of v.layerUpdates){const pt=J.data.subarray($*tt/J.data.BYTES_PER_ELEMENT,($+1)*tt/J.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,J.width,J.height,1,it,Rt,pt)}v.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,it,Rt,J.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,At,J.width,J.height,J.depth,0,it,Rt,J.data);else if(v.isData3DTexture)P?(ct&&e.texStorage3D(s.TEXTURE_3D,rt,At,J.width,J.height,J.depth),st&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,it,Rt,J.data)):e.texImage3D(s.TEXTURE_3D,0,At,J.width,J.height,J.depth,0,it,Rt,J.data);else if(v.isFramebufferTexture){if(ct)if(P)e.texStorage2D(s.TEXTURE_2D,rt,At,J.width,J.height);else{let tt=J.width,$=J.height;for(let pt=0;pt<rt;pt++)e.texImage2D(s.TEXTURE_2D,pt,At,tt,$,0,it,Rt,null),tt>>=1,$>>=1}}else if(Pt.length>0){if(P&&ct){const tt=Ft(Pt[0]);e.texStorage2D(s.TEXTURE_2D,rt,At,tt.width,tt.height)}for(let tt=0,$=Pt.length;tt<$;tt++)dt=Pt[tt],P?st&&e.texSubImage2D(s.TEXTURE_2D,tt,0,0,it,Rt,dt):e.texImage2D(s.TEXTURE_2D,tt,At,it,Rt,dt);v.generateMipmaps=!1}else if(P){if(ct){const tt=Ft(J);e.texStorage2D(s.TEXTURE_2D,rt,At,tt.width,tt.height)}st&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,it,Rt,J)}else e.texImage2D(s.TEXTURE_2D,0,At,it,Rt,J);g(v)&&p(Z),vt.__version=V.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function K(A,v,B){if(v.image.length!==6)return;const Z=Jt(A,v),j=v.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+B);const V=i.get(j);if(j.version!==V.__version||Z===!0){e.activeTexture(s.TEXTURE0+B);const vt=jt.getPrimaries(jt.workingColorSpace),lt=v.colorSpace===Ui?null:jt.getPrimaries(v.colorSpace),Tt=v.colorSpace===Ui||vt===lt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,v.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,v.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const _t=v.isCompressedTexture||v.image[0].isCompressedTexture,J=v.image[0]&&v.image[0].isDataTexture,it=[];for(let $=0;$<6;$++)!_t&&!J?it[$]=_(v.image[$],!0,n.maxCubemapSize):it[$]=J?v.image[$].image:v.image[$],it[$]=yt(v,it[$]);const Rt=it[0],At=r.convert(v.format,v.colorSpace),dt=r.convert(v.type),Pt=b(v.internalFormat,At,dt,v.colorSpace),P=v.isVideoTexture!==!0,ct=V.__version===void 0||Z===!0,st=j.dataReady;let rt=C(v,Rt);Yt(s.TEXTURE_CUBE_MAP,v);let tt;if(_t){P&&ct&&e.texStorage2D(s.TEXTURE_CUBE_MAP,rt,Pt,Rt.width,Rt.height);for(let $=0;$<6;$++){tt=it[$].mipmaps;for(let pt=0;pt<tt.length;pt++){const Ut=tt[pt];v.format!==ri?At!==null?P?st&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,0,0,Ut.width,Ut.height,At,Ut.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,Pt,Ut.width,Ut.height,0,Ut.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,0,0,Ut.width,Ut.height,At,dt,Ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt,Pt,Ut.width,Ut.height,0,At,dt,Ut.data)}}}else{if(tt=v.mipmaps,P&&ct){tt.length>0&&rt++;const $=Ft(it[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,rt,Pt,$.width,$.height)}for(let $=0;$<6;$++)if(J){P?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,it[$].width,it[$].height,At,dt,it[$].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Pt,it[$].width,it[$].height,0,At,dt,it[$].data);for(let pt=0;pt<tt.length;pt++){const le=tt[pt].image[$].image;P?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,0,0,le.width,le.height,At,dt,le.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,Pt,le.width,le.height,0,At,dt,le.data)}}else{P?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,At,dt,it[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Pt,At,dt,it[$]);for(let pt=0;pt<tt.length;pt++){const Ut=tt[pt];P?st&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,0,0,At,dt,Ut.image[$]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,pt+1,Pt,At,dt,Ut.image[$])}}}g(v)&&p(s.TEXTURE_CUBE_MAP),V.__version=j.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function ft(A,v,B,Z,j,V){const vt=r.convert(B.format,B.colorSpace),lt=r.convert(B.type),Tt=b(B.internalFormat,vt,lt,B.colorSpace),_t=i.get(v),J=i.get(B);if(J.__renderTarget=v,!_t.__hasExternalTextures){const it=Math.max(1,v.width>>V),Rt=Math.max(1,v.height>>V);j===s.TEXTURE_3D||j===s.TEXTURE_2D_ARRAY?e.texImage3D(j,V,Tt,it,Rt,v.depth,0,vt,lt,null):e.texImage2D(j,V,Tt,it,Rt,0,vt,lt,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),gt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,j,J.__webglTexture,0,oe(v)):(j===s.TEXTURE_2D||j>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Z,j,J.__webglTexture,V),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Nt(A,v,B){if(s.bindRenderbuffer(s.RENDERBUFFER,A),v.depthBuffer){const Z=v.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,V=T(v.stencilBuffer,j),vt=v.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,lt=oe(v);gt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,lt,V,v.width,v.height):B?s.renderbufferStorageMultisample(s.RENDERBUFFER,lt,V,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,V,v.width,v.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,vt,s.RENDERBUFFER,A)}else{const Z=v.textures;for(let j=0;j<Z.length;j++){const V=Z[j],vt=r.convert(V.format,V.colorSpace),lt=r.convert(V.type),Tt=b(V.internalFormat,vt,lt,V.colorSpace),_t=oe(v);B&&gt(v)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,_t,Tt,v.width,v.height):gt(v)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t,Tt,v.width,v.height):s.renderbufferStorage(s.RENDERBUFFER,Tt,v.width,v.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Mt(A,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(v.depthTexture);Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const j=Z.__webglTexture,V=oe(v);if(v.depthTexture.format===Jn)gt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,j,0);else if(v.depthTexture.format===Qn)gt(v)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0,V):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Vt(A){const v=i.get(A),B=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const Z=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),Z){const j=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),v.__depthDisposeCallback=j}v.__boundDepthTexture=Z}if(A.depthTexture&&!v.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const Z=A.texture.mipmaps;Z&&Z.length>0?Mt(v.__webglFramebuffer[0],A):Mt(v.__webglFramebuffer,A)}else if(B){v.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[Z]),v.__webglDepthbuffer[Z]===void 0)v.__webglDepthbuffer[Z]=s.createRenderbuffer(),Nt(v.__webglDepthbuffer[Z],A,!1);else{const j=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer[Z];s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,V)}}else{const Z=A.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=s.createRenderbuffer(),Nt(v.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,V=v.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,V),s.framebufferRenderbuffer(s.FRAMEBUFFER,j,s.RENDERBUFFER,V)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Te(A,v,B){const Z=i.get(A);v!==void 0&&ft(Z.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),B!==void 0&&Vt(A)}function Gt(A){const v=A.texture,B=i.get(A),Z=i.get(v);A.addEventListener("dispose",R);const j=A.textures,V=A.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(Z.__webglTexture===void 0&&(Z.__webglTexture=s.createTexture()),Z.__version=v.version,a.memory.textures++),V){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let Tt=0;Tt<v.mipmaps.length;Tt++)B.__webglFramebuffer[lt][Tt]=s.createFramebuffer()}else B.__webglFramebuffer[lt]=s.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<v.mipmaps.length;lt++)B.__webglFramebuffer[lt]=s.createFramebuffer()}else B.__webglFramebuffer=s.createFramebuffer();if(vt)for(let lt=0,Tt=j.length;lt<Tt;lt++){const _t=i.get(j[lt]);_t.__webglTexture===void 0&&(_t.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&gt(A)===!1){B.__webglMultisampledFramebuffer=s.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<j.length;lt++){const Tt=j[lt];B.__webglColorRenderbuffer[lt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const _t=r.convert(Tt.format,Tt.colorSpace),J=r.convert(Tt.type),it=b(Tt.internalFormat,_t,J,Tt.colorSpace,A.isXRRenderTarget===!0),Rt=oe(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt,it,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+lt,s.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=s.createRenderbuffer(),Nt(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(V){e.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),Yt(s.TEXTURE_CUBE_MAP,v);for(let lt=0;lt<6;lt++)if(v.mipmaps&&v.mipmaps.length>0)for(let Tt=0;Tt<v.mipmaps.length;Tt++)ft(B.__webglFramebuffer[lt][Tt],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt);else ft(B.__webglFramebuffer[lt],A,v,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(v)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let lt=0,Tt=j.length;lt<Tt;lt++){const _t=j[lt],J=i.get(_t);let it=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(it=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(it,J.__webglTexture),Yt(it,_t),ft(B.__webglFramebuffer,A,_t,s.COLOR_ATTACHMENT0+lt,it,0),g(_t)&&p(it)}e.unbindTexture()}else{let lt=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),Yt(lt,v),v.mipmaps&&v.mipmaps.length>0)for(let Tt=0;Tt<v.mipmaps.length;Tt++)ft(B.__webglFramebuffer[Tt],A,v,s.COLOR_ATTACHMENT0,lt,Tt);else ft(B.__webglFramebuffer,A,v,s.COLOR_ATTACHMENT0,lt,0);g(v)&&p(lt),e.unbindTexture()}A.depthBuffer&&Vt(A)}function ce(A){const v=A.textures;for(let B=0,Z=v.length;B<Z;B++){const j=v[B];if(g(j)){const V=w(A),vt=i.get(j).__webglTexture;e.bindTexture(V,vt),p(V),e.unbindTexture()}}}const D=[],kt=[];function Wt(A){if(A.samples>0){if(gt(A)===!1){const v=A.textures,B=A.width,Z=A.height;let j=s.COLOR_BUFFER_BIT;const V=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,vt=i.get(A),lt=v.length>1;if(lt)for(let _t=0;_t<v.length;_t++)e.bindFramebuffer(s.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,vt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const Tt=A.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let _t=0;_t<v.length;_t++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=s.STENCIL_BUFFER_BIT)),lt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,vt.__webglColorRenderbuffer[_t]);const J=i.get(v[_t]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,J,0)}s.blitFramebuffer(0,0,B,Z,0,0,B,Z,j,s.NEAREST),c===!0&&(D.length=0,kt.length=0,D.push(s.COLOR_ATTACHMENT0+_t),A.depthBuffer&&A.resolveDepthBuffer===!1&&(D.push(V),kt.push(V),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,kt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,D))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),lt)for(let _t=0;_t<v.length;_t++){e.bindFramebuffer(s.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,vt.__webglColorRenderbuffer[_t]);const J=i.get(v[_t]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,vt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,J,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const v=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[v])}}}function oe(A){return Math.min(n.maxSamples,A.samples)}function gt(A){const v=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function de(A){const v=a.render.frame;d.get(A)!==v&&(d.set(A,v),A.update())}function yt(A,v){const B=A.colorSpace,Z=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Ln&&B!==Ui&&(jt.getTransfer(B)===ee?(Z!==ri||j!==fi)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):pe("WebGLTextures: Unsupported texture color space:",B)),v}function Ft(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=H,this.resetTextureUnits=O,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=Q,this.setTextureCube=k,this.rebindTextures=Te,this.setupRenderTarget=Gt,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=ft,this.useMultisampledRTT=gt}function tm(s,t){function e(i,n=Ui){let r;const a=jt.getTransfer(n);if(i===fi)return s.UNSIGNED_BYTE;if(i===Ca)return s.UNSIGNED_SHORT_4_4_4_4;if(i===Ra)return s.UNSIGNED_SHORT_5_5_5_1;if(i===ll)return s.UNSIGNED_INT_5_9_9_9_REV;if(i===cl)return s.UNSIGNED_INT_10F_11F_11F_REV;if(i===al)return s.BYTE;if(i===ol)return s.SHORT;if(i===jn)return s.UNSIGNED_SHORT;if(i===Aa)return s.INT;if(i===tn)return s.UNSIGNED_INT;if(i===di)return s.FLOAT;if(i===Fn)return s.HALF_FLOAT;if(i===hl)return s.ALPHA;if(i===dl)return s.RGB;if(i===ri)return s.RGBA;if(i===Jn)return s.DEPTH_COMPONENT;if(i===Qn)return s.DEPTH_STENCIL;if(i===Da)return s.RED;if(i===Pa)return s.RED_INTEGER;if(i===La)return s.RG;if(i===Ia)return s.RG_INTEGER;if(i===Ua)return s.RGBA_INTEGER;if(i===Fs||i===Ns||i===Os||i===Bs)if(a===ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Fs)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Os)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Bs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Fs)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ns)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Os)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Bs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zr||i===Yr||i===qr||i===$r)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Zr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qr)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===$r)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===jr||i===Kr||i===Jr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===jr||i===Kr)return a===ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Jr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qr||i===ta||i===ea||i===ia||i===na||i===sa||i===ra||i===aa||i===oa||i===la||i===ca||i===ha||i===da||i===ua)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Qr)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ta)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ea)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ia)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===na)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===sa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ra)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===aa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===oa)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===la)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ca)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ha)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===da)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ua)return a===ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fa||i===pa||i===ma)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===fa)return a===ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===pa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ma)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ga||i===xa||i===_a||i===va)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ga)return r.COMPRESSED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_a)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===va)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kn?s.UNSIGNED_INT_24_8:s[i]!==void 0?s[i]:null}return{convert:e}}const em=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,im=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class nm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Cl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ti({vertexShader:em,fragmentShader:im,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new Ai(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sm extends sn{constructor(t,e){super();const i=this;let n=null,r=1,a=null,o="local-floor",c=1,l=null,d=null,u=null,f=null,m=null,x=null;const _=typeof XRWebGLBinding<"u",g=new nm,p={},w=e.getContextAttributes();let b=null,T=null;const C=[],E=[],R=new bt;let N=null;const y=new si;y.viewport=new xe;const M=new si;M.viewport=new xe;const L=[y,M],O=new Mh;let H=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let K=C[Y];return K===void 0&&(K=new br,C[Y]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Y){let K=C[Y];return K===void 0&&(K=new br,C[Y]=K),K.getGripSpace()},this.getHand=function(Y){let K=C[Y];return K===void 0&&(K=new br,C[Y]=K),K.getHandSpace()};function W(Y){const K=E.indexOf(Y.inputSource);if(K===-1)return;const ft=C[K];ft!==void 0&&(ft.update(Y.inputSource,Y.frame,l||a),ft.dispatchEvent({type:Y.type,data:Y.inputSource}))}function q(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",q),n.removeEventListener("inputsourceschange",Q);for(let Y=0;Y<C.length;Y++){const K=E[Y];K!==null&&(E[Y]=null,C[Y].disconnect(K))}H=null,X=null,g.reset();for(const Y in p)delete p[Y];t.setRenderTarget(b),m=null,f=null,u=null,n=null,T=null,ae.stop(),i.isPresenting=!1,t.setPixelRatio(N),t.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){o=Y,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return x},this.getSession=function(){return n},this.setSession=async function(Y){if(n=Y,n!==null){if(b=t.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",q),n.addEventListener("inputsourceschange",Q),w.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,Nt=null,Mt=null;w.depth&&(Mt=w.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=w.stencil?Qn:Jn,Nt=w.stencil?Kn:tn);const Vt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(Vt),n.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new nn(f.textureWidth,f.textureHeight,{format:ri,type:fi,depthTexture:new Al(f.textureWidth,f.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:w.stencil,colorSpace:t.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ft={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(n,e,ft),n.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new nn(m.framebufferWidth,m.framebufferHeight,{format:ri,type:fi,colorSpace:t.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await n.requestReferenceSpace(o),ae.setContext(n),ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(Y){for(let K=0;K<Y.removed.length;K++){const ft=Y.removed[K],Nt=E.indexOf(ft);Nt>=0&&(E[Nt]=null,C[Nt].disconnect(ft))}for(let K=0;K<Y.added.length;K++){const ft=Y.added[K];let Nt=E.indexOf(ft);if(Nt===-1){for(let Vt=0;Vt<C.length;Vt++)if(Vt>=E.length){E.push(ft),Nt=Vt;break}else if(E[Vt]===null){E[Vt]=ft,Nt=Vt;break}if(Nt===-1)break}const Mt=C[Nt];Mt&&Mt.connect(ft)}}const k=new I,nt=new I;function at(Y,K,ft){k.setFromMatrixPosition(K.matrixWorld),nt.setFromMatrixPosition(ft.matrixWorld);const Nt=k.distanceTo(nt),Mt=K.projectionMatrix.elements,Vt=ft.projectionMatrix.elements,Te=Mt[14]/(Mt[10]-1),Gt=Mt[14]/(Mt[10]+1),ce=(Mt[9]+1)/Mt[5],D=(Mt[9]-1)/Mt[5],kt=(Mt[8]-1)/Mt[0],Wt=(Vt[8]+1)/Vt[0],oe=Te*kt,gt=Te*Wt,de=Nt/(-kt+Wt),yt=de*-kt;if(K.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(yt),Y.translateZ(de),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Mt[10]===-1)Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse);else{const Ft=Te+de,A=Gt+de,v=oe-yt,B=gt+(Nt-yt),Z=ce*Gt/A*Ft,j=D*Gt/A*Ft;Y.projectionMatrix.makePerspective(v,B,Z,j,Ft,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Et(Y,K){K===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(K.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(n===null)return;let K=Y.near,ft=Y.far;g.texture!==null&&(g.depthNear>0&&(K=g.depthNear),g.depthFar>0&&(ft=g.depthFar)),O.near=M.near=y.near=K,O.far=M.far=y.far=ft,(H!==O.near||X!==O.far)&&(n.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,X=O.far),O.layers.mask=Y.layers.mask|6,y.layers.mask=O.layers.mask&3,M.layers.mask=O.layers.mask&5;const Nt=Y.parent,Mt=O.cameras;Et(O,Nt);for(let Vt=0;Vt<Mt.length;Vt++)Et(Mt[Vt],Nt);Mt.length===2?at(O,y,M):O.projectionMatrix.copy(y.projectionMatrix),Yt(Y,O,Nt)};function Yt(Y,K,ft){ft===null?Y.matrix.copy(K.matrixWorld):(Y.matrix.copy(ft.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(K.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(K.projectionMatrix),Y.projectionMatrixInverse.copy(K.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Sa*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(O)},this.getCameraTexture=function(Y){return p[Y]};let Jt=null;function re(Y,K){if(d=K.getViewerPose(l||a),x=K,d!==null){const ft=d.views;m!==null&&(t.setRenderTargetFramebuffer(T,m.framebuffer),t.setRenderTarget(T));let Nt=!1;ft.length!==O.cameras.length&&(O.cameras.length=0,Nt=!0);for(let Gt=0;Gt<ft.length;Gt++){const ce=ft[Gt];let D=null;if(m!==null)D=m.getViewport(ce);else{const Wt=u.getViewSubImage(f,ce);D=Wt.viewport,Gt===0&&(t.setRenderTargetTextures(T,Wt.colorTexture,Wt.depthStencilTexture),t.setRenderTarget(T))}let kt=L[Gt];kt===void 0&&(kt=new si,kt.layers.enable(Gt),kt.viewport=new xe,L[Gt]=kt),kt.matrix.fromArray(ce.transform.matrix),kt.matrix.decompose(kt.position,kt.quaternion,kt.scale),kt.projectionMatrix.fromArray(ce.projectionMatrix),kt.projectionMatrixInverse.copy(kt.projectionMatrix).invert(),kt.viewport.set(D.x,D.y,D.width,D.height),Gt===0&&(O.matrix.copy(kt.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Nt===!0&&O.cameras.push(kt)}const Mt=n.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const Gt=u.getDepthInformation(ft[0]);Gt&&Gt.isValid&&Gt.texture&&g.init(Gt,n.renderState)}if(Mt&&Mt.includes("camera-access")&&_){t.state.unbindTexture(),u=i.getBinding();for(let Gt=0;Gt<ft.length;Gt++){const ce=ft[Gt].camera;if(ce){let D=p[ce];D||(D=new Cl,p[ce]=D);const kt=u.getCameraImage(ce);D.sourceTexture=kt}}}}for(let ft=0;ft<C.length;ft++){const Nt=E[ft],Mt=C[ft];Nt!==null&&Mt!==void 0&&Mt.update(Nt,K,l||a)}Jt&&Jt(Y,K),K.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:K}),x=null}const ae=new Dl;ae.setAnimationLoop(re),this.setAnimationLoop=function(Y){Jt=Y},this.dispose=function(){}}}const qi=new pi,rm=new Kt;function am(s,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,vl(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function n(g,p,w,b,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),d(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&m(g,p,T)):p.isMeshMatcapMaterial?(r(g,p),x(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,w,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ze&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ze&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const w=t.get(p),b=w.envMap,T=w.envMapRotation;b&&(g.envMap.value=b,qi.copy(T),qi.x*=-1,qi.y*=-1,qi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),g.envMapRotation.value.setFromMatrix4(rm.makeRotationFromEuler(qi)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,w,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*w,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function d(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,w){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ze&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=w.texture,g.transmissionSamplerSize.value.set(w.width,w.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const w=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(w.matrixWorld),g.nearDistance.value=w.shadow.camera.near,g.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function om(s,t,e,i){let n={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,b){const T=b.program;i.uniformBlockBinding(w,T)}function l(w,b){let T=n[w.id];T===void 0&&(x(w),T=d(w),n[w.id]=T,w.addEventListener("dispose",g));const C=b.program;i.updateUBOMapping(w,C);const E=t.render.frame;r[w.id]!==E&&(f(w),r[w.id]=E)}function d(w){const b=u();w.__bindingPointIndex=b;const T=s.createBuffer(),C=w.__size,E=w.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,C,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,T),T}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(w){const b=n[w.id],T=w.uniforms,C=w.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let E=0,R=T.length;E<R;E++){const N=Array.isArray(T[E])?T[E]:[T[E]];for(let y=0,M=N.length;y<M;y++){const L=N[y];if(m(L,E,y,C)===!0){const O=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let X=0;for(let W=0;W<H.length;W++){const q=H[W],Q=_(q);typeof q=="number"||typeof q=="boolean"?(L.__data[0]=q,s.bufferSubData(s.UNIFORM_BUFFER,O+X,L.__data)):q.isMatrix3?(L.__data[0]=q.elements[0],L.__data[1]=q.elements[1],L.__data[2]=q.elements[2],L.__data[3]=0,L.__data[4]=q.elements[3],L.__data[5]=q.elements[4],L.__data[6]=q.elements[5],L.__data[7]=0,L.__data[8]=q.elements[6],L.__data[9]=q.elements[7],L.__data[10]=q.elements[8],L.__data[11]=0):(q.toArray(L.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,O,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(w,b,T,C){const E=w.value,R=b+"_"+T;if(C[R]===void 0)return typeof E=="number"||typeof E=="boolean"?C[R]=E:C[R]=E.clone(),!0;{const N=C[R];if(typeof E=="number"||typeof E=="boolean"){if(N!==E)return C[R]=E,!0}else if(N.equals(E)===!1)return N.copy(E),!0}return!1}function x(w){const b=w.uniforms;let T=0;const C=16;for(let R=0,N=b.length;R<N;R++){const y=Array.isArray(b[R])?b[R]:[b[R]];for(let M=0,L=y.length;M<L;M++){const O=y[M],H=Array.isArray(O.value)?O.value:[O.value];for(let X=0,W=H.length;X<W;X++){const q=H[X],Q=_(q),k=T%C,nt=k%Q.boundary,at=k+nt;T+=nt,at!==0&&C-at<Q.storage&&(T+=C-at),O.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=Q.storage}}}const E=T%C;return E>0&&(T+=C-E),w.__size=T,w.__cache={},this}function _(w){const b={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(b.boundary=4,b.storage=4):w.isVector2?(b.boundary=8,b.storage=8):w.isVector3||w.isColor?(b.boundary=16,b.storage=12):w.isVector4?(b.boundary=16,b.storage=16):w.isMatrix3?(b.boundary=48,b.storage=48):w.isMatrix4?(b.boundary=64,b.storage=64):w.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Lt("WebGLRenderer: Unsupported uniform value type.",w),b}function g(w){const b=w.target;b.removeEventListener("dispose",g);const T=a.indexOf(b.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(n[b.id]),delete n[b.id],delete r[b.id]}function p(){for(const w in n)s.deleteBuffer(n[w]);a=[],n={},r={}}return{bind:c,update:l,dispose:p}}const lm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Mi=null;function cm(){return Mi===null&&(Mi=new El(lm,32,32,La,Fn),Mi.minFilter=Qe,Mi.magFilter=Qe,Mi.wrapS=bi,Mi.wrapT=bi,Mi.generateMipmaps=!1,Mi.needsUpdate=!0),Mi}class hm{constructor(t={}){const{canvas:e=Dc(),context:i=null,depth:n=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const x=new Set([Ua,Ia,Pa]),_=new Set([fi,tn,jn,Kn,Ca,Ra]),g=new Uint32Array(4),p=new Int32Array(4);let w=null,b=null;const T=[],C=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let R=!1;this._outputColorSpace=Xe;let N=0,y=0,M=null,L=-1,O=null;const H=new xe,X=new xe;let W=null;const q=new It(0);let Q=0,k=e.width,nt=e.height,at=1,Et=null,Yt=null;const Jt=new xe(0,0,k,nt),re=new xe(0,0,k,nt);let ae=!1;const Y=new is;let K=!1,ft=!1;const Nt=new Kt,Mt=new I,Vt=new xe,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function ce(){return M===null?at:1}let D=i;function kt(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:n,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ta}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",pt,!1),D===null){const U="webgl2";if(D=kt(U,S),D===null)throw kt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw S("WebGLRenderer: "+S.message),S}let Wt,oe,gt,de,yt,Ft,A,v,B,Z,j,V,vt,lt,Tt,_t,J,it,Rt,At,dt,Pt,P,ct;function st(){Wt=new _f(D),Wt.init(),Pt=new tm(D,Wt),oe=new cf(D,Wt,t,Pt),gt=new Jp(D,Wt),oe.reversedDepthBuffer&&f&&gt.buffers.depth.setReversed(!0),de=new Sf(D),yt=new zp,Ft=new Qp(D,Wt,gt,yt,oe,Pt,de),A=new df(E),v=new xf(E),B=new Eh(D),P=new of(D,B),Z=new vf(D,B,de,P),j=new yf(D,Z,B,de),Rt=new bf(D,oe,Ft),_t=new hf(yt),V=new Bp(E,A,v,Wt,oe,P,_t),vt=new am(E,yt),lt=new Hp,Tt=new Yp(Wt),it=new af(E,A,v,gt,j,m,c),J=new jp(E,j,oe),ct=new om(D,de,oe,gt),At=new lf(D,Wt,de),dt=new Mf(D,Wt,de),de.programs=V.programs,E.capabilities=oe,E.extensions=Wt,E.properties=yt,E.renderLists=lt,E.shadowMap=J,E.state=gt,E.info=de}st();const rt=new sm(E,D);this.xr=rt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=Wt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Wt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return at},this.setPixelRatio=function(S){S!==void 0&&(at=S,this.setSize(k,nt,!1))},this.getSize=function(S){return S.set(k,nt)},this.setSize=function(S,U,z=!0){if(rt.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}k=S,nt=U,e.width=Math.floor(S*at),e.height=Math.floor(U*at),z===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(k*at,nt*at).floor()},this.setDrawingBufferSize=function(S,U,z){k=S,nt=U,at=z,e.width=Math.floor(S*z),e.height=Math.floor(U*z),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy(Jt)},this.setViewport=function(S,U,z,G){S.isVector4?Jt.set(S.x,S.y,S.z,S.w):Jt.set(S,U,z,G),gt.viewport(H.copy(Jt).multiplyScalar(at).round())},this.getScissor=function(S){return S.copy(re)},this.setScissor=function(S,U,z,G){S.isVector4?re.set(S.x,S.y,S.z,S.w):re.set(S,U,z,G),gt.scissor(X.copy(re).multiplyScalar(at).round())},this.getScissorTest=function(){return ae},this.setScissorTest=function(S){gt.setScissorTest(ae=S)},this.setOpaqueSort=function(S){Et=S},this.setTransparentSort=function(S){Yt=S},this.getClearColor=function(S){return S.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(S=!0,U=!0,z=!0){let G=0;if(S){let F=!1;if(M!==null){const et=M.texture.format;F=x.has(et)}if(F){const et=M.texture.type,ht=_.has(et),mt=it.getClearColor(),ut=it.getClearAlpha(),Ct=mt.r,Dt=mt.g,St=mt.b;ht?(g[0]=Ct,g[1]=Dt,g[2]=St,g[3]=ut,D.clearBufferuiv(D.COLOR,0,g)):(p[0]=Ct,p[1]=Dt,p[2]=St,p[3]=ut,D.clearBufferiv(D.COLOR,0,p))}else G|=D.COLOR_BUFFER_BIT}U&&(G|=D.DEPTH_BUFFER_BIT),z&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",pt,!1),it.dispose(),lt.dispose(),Tt.dispose(),yt.dispose(),A.dispose(),v.dispose(),j.dispose(),P.dispose(),ct.dispose(),V.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",za),rt.removeEventListener("sessionend",Ga),Hi.stop()};function tt(S){S.preventDefault(),Ws("WebGLRenderer: Context Lost."),R=!0}function $(){Ws("WebGLRenderer: Context Restored."),R=!1;const S=de.autoReset,U=J.enabled,z=J.autoUpdate,G=J.needsUpdate,F=J.type;st(),de.autoReset=S,J.enabled=U,J.autoUpdate=z,J.needsUpdate=G,J.type=F}function pt(S){pe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ut(S){const U=S.target;U.removeEventListener("dispose",Ut),le(U)}function le(S){Qt(S),yt.remove(S)}function Qt(S){const U=yt.get(S).programs;U!==void 0&&(U.forEach(function(z){V.releaseProgram(z)}),S.isShaderMaterial&&V.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,z,G,F,et){U===null&&(U=Te);const ht=F.isMesh&&F.matrixWorld.determinant()<0,mt=Ol(S,U,z,G,F);gt.setMaterial(G,ht);let ut=z.index,Ct=1;if(G.wireframe===!0){if(ut=Z.getWireframeAttribute(z),ut===void 0)return;Ct=2}const Dt=z.drawRange,St=z.attributes.position;let Xt=Dt.start*Ct,te=(Dt.start+Dt.count)*Ct;et!==null&&(Xt=Math.max(Xt,et.start*Ct),te=Math.min(te,(et.start+et.count)*Ct)),ut!==null?(Xt=Math.max(Xt,0),te=Math.min(te,ut.count)):St!=null&&(Xt=Math.max(Xt,0),te=Math.min(te,St.count));const me=te-Xt;if(me<0||me===1/0)return;P.setup(F,G,mt,z,ut);let ge,se=At;if(ut!==null&&(ge=B.get(ut),se=dt,se.setIndex(ge)),F.isMesh)G.wireframe===!0?(gt.setLineWidth(G.wireframeLinewidth*ce()),se.setMode(D.LINES)):se.setMode(D.TRIANGLES);else if(F.isLine){let wt=G.linewidth;wt===void 0&&(wt=1),gt.setLineWidth(wt*ce()),F.isLineSegments?se.setMode(D.LINES):F.isLineLoop?se.setMode(D.LINE_LOOP):se.setMode(D.LINE_STRIP)}else F.isPoints?se.setMode(D.POINTS):F.isSprite&&se.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ts("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))se.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const wt=F._multiDrawStarts,ue=F._multiDrawCounts,$t=F._multiDrawCount,He=ut?B.get(ut).bytesPerElement:1,an=yt.get(G).currentProgram.getUniforms();for(let Ve=0;Ve<$t;Ve++)an.setValue(D,"_gl_DrawID",Ve),se.render(wt[Ve]/He,ue[Ve])}else if(F.isInstancedMesh)se.renderInstances(Xt,me,F.count);else if(z.isInstancedBufferGeometry){const wt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,ue=Math.min(z.instanceCount,wt);se.renderInstances(Xt,me,ue)}else se.render(Xt,me)};function li(S,U,z){S.transparent===!0&&S.side===Ke&&S.forceSinglePass===!1?(S.side=ze,S.needsUpdate=!0,rs(S,U,z),S.side=zi,S.needsUpdate=!0,rs(S,U,z),S.side=Ke):rs(S,U,z)}this.compile=function(S,U,z=null){z===null&&(z=S),b=Tt.get(z),b.init(U),C.push(b),z.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(b.pushLight(F),F.castShadow&&b.pushShadow(F))}),S!==z&&S.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(b.pushLight(F),F.castShadow&&b.pushShadow(F))}),b.setupLights();const G=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const et=F.material;if(et)if(Array.isArray(et))for(let ht=0;ht<et.length;ht++){const mt=et[ht];li(mt,z,F),G.add(mt)}else li(et,z,F),G.add(et)}),b=C.pop(),G},this.compileAsync=function(S,U,z=null){const G=this.compile(S,U,z);return new Promise(F=>{function et(){if(G.forEach(function(ht){yt.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){F(S);return}setTimeout(et,10)}Wt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let ti=null;function Nl(S){ti&&ti(S)}function za(){Hi.stop()}function Ga(){Hi.start()}const Hi=new Dl;Hi.setAnimationLoop(Nl),typeof self<"u"&&Hi.setContext(self),this.setAnimationLoop=function(S){ti=S,rt.setAnimationLoop(S),S===null?Hi.stop():Hi.start()},rt.addEventListener("sessionstart",za),rt.addEventListener("sessionend",Ga),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(U),U=rt.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,U,M),b=Tt.get(S,C.length),b.init(U),C.push(b),Nt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Y.setFromProjectionMatrix(Nt,ui,U.reversedDepth),ft=this.localClippingEnabled,K=_t.init(this.clippingPlanes,ft),w=lt.get(S,T.length),w.init(),T.push(w),rt.enabled===!0&&rt.isPresenting===!0){const et=E.xr.getDepthSensingMesh();et!==null&&Js(et,U,-1/0,E.sortObjects)}Js(S,U,0,E.sortObjects),w.finish(),E.sortObjects===!0&&w.sort(Et,Yt),Gt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Gt&&it.addToRenderList(w,S),this.info.render.frame++,K===!0&&_t.beginShadows();const z=b.state.shadowsArray;J.render(z,S,U),K===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=w.opaque,F=w.transmissive;if(b.setupLights(),U.isArrayCamera){const et=U.cameras;if(F.length>0)for(let ht=0,mt=et.length;ht<mt;ht++){const ut=et[ht];Va(G,F,S,ut)}Gt&&it.render(S);for(let ht=0,mt=et.length;ht<mt;ht++){const ut=et[ht];Ha(w,S,ut,ut.viewport)}}else F.length>0&&Va(G,F,S,U),Gt&&it.render(S),Ha(w,S,U);M!==null&&y===0&&(Ft.updateMultisampleRenderTarget(M),Ft.updateRenderTargetMipmap(M)),S.isScene===!0&&S.onAfterRender(E,S,U),P.resetDefaultState(),L=-1,O=null,C.pop(),C.length>0?(b=C[C.length-1],K===!0&&_t.setGlobalState(E.clippingPlanes,b.state.camera)):b=null,T.pop(),T.length>0?w=T[T.length-1]:w=null};function Js(S,U,z,G){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Y.intersectsSprite(S)){G&&Vt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Nt);const ht=j.update(S),mt=S.material;mt.visible&&w.push(S,ht,mt,z,Vt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Y.intersectsObject(S))){const ht=j.update(S),mt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Vt.copy(S.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Vt.copy(ht.boundingSphere.center)),Vt.applyMatrix4(S.matrixWorld).applyMatrix4(Nt)),Array.isArray(mt)){const ut=ht.groups;for(let Ct=0,Dt=ut.length;Ct<Dt;Ct++){const St=ut[Ct],Xt=mt[St.materialIndex];Xt&&Xt.visible&&w.push(S,ht,Xt,z,Vt.z,St)}}else mt.visible&&w.push(S,ht,mt,z,Vt.z,null)}}const et=S.children;for(let ht=0,mt=et.length;ht<mt;ht++)Js(et[ht],U,z,G)}function Ha(S,U,z,G){const{opaque:F,transmissive:et,transparent:ht}=S;b.setupLightsView(z),K===!0&&_t.setGlobalState(E.clippingPlanes,z),G&&gt.viewport(H.copy(G)),F.length>0&&ss(F,U,z),et.length>0&&ss(et,U,z),ht.length>0&&ss(ht,U,z),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function Va(S,U,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;b.state.transmissionRenderTarget[G.id]===void 0&&(b.state.transmissionRenderTarget[G.id]=new nn(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?Fn:fi,minFilter:Fi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const et=b.state.transmissionRenderTarget[G.id],ht=G.viewport||H;et.setSize(ht.z*E.transmissionResolutionScale,ht.w*E.transmissionResolutionScale);const mt=E.getRenderTarget(),ut=E.getActiveCubeFace(),Ct=E.getActiveMipmapLevel();E.setRenderTarget(et),E.getClearColor(q),Q=E.getClearAlpha(),Q<1&&E.setClearColor(16777215,.5),E.clear(),Gt&&it.render(z);const Dt=E.toneMapping;E.toneMapping=Oi;const St=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),b.setupLightsView(G),K===!0&&_t.setGlobalState(E.clippingPlanes,G),ss(S,z,G),Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let te=0,me=U.length;te<me;te++){const ge=U[te],{object:se,geometry:wt,material:ue,group:$t}=ge;if(ue.side===Ke&&se.layers.test(G.layers)){const He=ue.side;ue.side=ze,ue.needsUpdate=!0,ka(se,z,G,wt,ue,$t),ue.side=He,ue.needsUpdate=!0,Xt=!0}}Xt===!0&&(Ft.updateMultisampleRenderTarget(et),Ft.updateRenderTargetMipmap(et))}E.setRenderTarget(mt,ut,Ct),E.setClearColor(q,Q),St!==void 0&&(G.viewport=St),E.toneMapping=Dt}function ss(S,U,z){const G=U.isScene===!0?U.overrideMaterial:null;for(let F=0,et=S.length;F<et;F++){const ht=S[F],{object:mt,geometry:ut,group:Ct}=ht;let Dt=ht.material;Dt.allowOverride===!0&&G!==null&&(Dt=G),mt.layers.test(z.layers)&&ka(mt,U,z,ut,Dt,Ct)}}function ka(S,U,z,G,F,et){S.onBeforeRender(E,U,z,G,F,et),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(E,U,z,G,S,et),F.transparent===!0&&F.side===Ke&&F.forceSinglePass===!1?(F.side=ze,F.needsUpdate=!0,E.renderBufferDirect(z,U,G,F,S,et),F.side=zi,F.needsUpdate=!0,E.renderBufferDirect(z,U,G,F,S,et),F.side=Ke):E.renderBufferDirect(z,U,G,F,S,et),S.onAfterRender(E,U,z,G,F,et)}function rs(S,U,z){U.isScene!==!0&&(U=Te);const G=yt.get(S),F=b.state.lights,et=b.state.shadowsArray,ht=F.state.version,mt=V.getParameters(S,F.state,et,U,z),ut=V.getProgramCacheKey(mt);let Ct=G.programs;G.environment=S.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(S.isMeshStandardMaterial?v:A).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Ct===void 0&&(S.addEventListener("dispose",Ut),Ct=new Map,G.programs=Ct);let Dt=Ct.get(ut);if(Dt!==void 0){if(G.currentProgram===Dt&&G.lightsStateVersion===ht)return Xa(S,mt),Dt}else mt.uniforms=V.getUniforms(S),S.onBeforeCompile(mt,E),Dt=V.acquireProgram(mt,ut),Ct.set(ut,Dt),G.uniforms=mt.uniforms;const St=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(St.clippingPlanes=_t.uniform),Xa(S,mt),G.needsLights=zl(S),G.lightsStateVersion=ht,G.needsLights&&(St.ambientLightColor.value=F.state.ambient,St.lightProbe.value=F.state.probe,St.directionalLights.value=F.state.directional,St.directionalLightShadows.value=F.state.directionalShadow,St.spotLights.value=F.state.spot,St.spotLightShadows.value=F.state.spotShadow,St.rectAreaLights.value=F.state.rectArea,St.ltc_1.value=F.state.rectAreaLTC1,St.ltc_2.value=F.state.rectAreaLTC2,St.pointLights.value=F.state.point,St.pointLightShadows.value=F.state.pointShadow,St.hemisphereLights.value=F.state.hemi,St.directionalShadowMap.value=F.state.directionalShadowMap,St.directionalShadowMatrix.value=F.state.directionalShadowMatrix,St.spotShadowMap.value=F.state.spotShadowMap,St.spotLightMatrix.value=F.state.spotLightMatrix,St.spotLightMap.value=F.state.spotLightMap,St.pointShadowMap.value=F.state.pointShadowMap,St.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Dt,G.uniformsList=null,Dt}function Wa(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Gs.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function Xa(S,U){const z=yt.get(S);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function Ol(S,U,z,G,F){U.isScene!==!0&&(U=Te),Ft.resetTextureUnits();const et=U.fog,ht=G.isMeshStandardMaterial?U.environment:null,mt=M===null?E.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Ln,ut=(G.isMeshStandardMaterial?v:A).get(G.envMap||ht),Ct=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Dt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),St=!!z.morphAttributes.position,Xt=!!z.morphAttributes.normal,te=!!z.morphAttributes.color;let me=Oi;G.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(me=E.toneMapping);const ge=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=ge!==void 0?ge.length:0,wt=yt.get(G),ue=b.state.lights;if(K===!0&&(ft===!0||S!==O)){const De=S===O&&G.id===L;_t.setState(G,S,De)}let $t=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==ue.state.version||wt.outputColorSpace!==mt||F.isBatchedMesh&&wt.batching===!1||!F.isBatchedMesh&&wt.batching===!0||F.isBatchedMesh&&wt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&wt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&wt.instancing===!1||!F.isInstancedMesh&&wt.instancing===!0||F.isSkinnedMesh&&wt.skinning===!1||!F.isSkinnedMesh&&wt.skinning===!0||F.isInstancedMesh&&wt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&wt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&wt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&wt.instancingMorph===!1&&F.morphTexture!==null||wt.envMap!==ut||G.fog===!0&&wt.fog!==et||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==_t.numPlanes||wt.numIntersection!==_t.numIntersection)||wt.vertexAlphas!==Ct||wt.vertexTangents!==Dt||wt.morphTargets!==St||wt.morphNormals!==Xt||wt.morphColors!==te||wt.toneMapping!==me||wt.morphTargetsCount!==se)&&($t=!0):($t=!0,wt.__version=G.version);let He=wt.currentProgram;$t===!0&&(He=rs(G,U,F));let an=!1,Ve=!1,On=!1;const fe=He.getUniforms(),Ne=wt.uniforms;if(gt.useProgram(He.program)&&(an=!0,Ve=!0,On=!0),G.id!==L&&(L=G.id,Ve=!0),an||O!==S){gt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),fe.setValue(D,"projectionMatrix",S.projectionMatrix),fe.setValue(D,"viewMatrix",S.matrixWorldInverse);const Oe=fe.map.cameraPosition;Oe!==void 0&&Oe.setValue(D,Mt.setFromMatrixPosition(S.matrixWorld)),oe.logarithmicDepthBuffer&&fe.setValue(D,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&fe.setValue(D,"isOrthographic",S.isOrthographicCamera===!0),O!==S&&(O=S,Ve=!0,On=!0)}if(F.isSkinnedMesh){fe.setOptional(D,F,"bindMatrix"),fe.setOptional(D,F,"bindMatrixInverse");const De=F.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),fe.setValue(D,"boneTexture",De.boneTexture,Ft))}F.isBatchedMesh&&(fe.setOptional(D,F,"batchingTexture"),fe.setValue(D,"batchingTexture",F._matricesTexture,Ft),fe.setOptional(D,F,"batchingIdTexture"),fe.setValue(D,"batchingIdTexture",F._indirectTexture,Ft),fe.setOptional(D,F,"batchingColorTexture"),F._colorsTexture!==null&&fe.setValue(D,"batchingColorTexture",F._colorsTexture,Ft));const qe=z.morphAttributes;if((qe.position!==void 0||qe.normal!==void 0||qe.color!==void 0)&&Rt.update(F,z,He),(Ve||wt.receiveShadow!==F.receiveShadow)&&(wt.receiveShadow=F.receiveShadow,fe.setValue(D,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ne.envMap.value=ut,Ne.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Ne.envMapIntensity.value=U.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=cm()),Ve&&(fe.setValue(D,"toneMappingExposure",E.toneMappingExposure),wt.needsLights&&Bl(Ne,On),et&&G.fog===!0&&vt.refreshFogUniforms(Ne,et),vt.refreshMaterialUniforms(Ne,G,at,nt,b.state.transmissionRenderTarget[S.id]),Gs.upload(D,Wa(wt),Ne,Ft)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(Gs.upload(D,Wa(wt),Ne,Ft),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&fe.setValue(D,"center",F.center),fe.setValue(D,"modelViewMatrix",F.modelViewMatrix),fe.setValue(D,"normalMatrix",F.normalMatrix),fe.setValue(D,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const De=G.uniformsGroups;for(let Oe=0,Qs=De.length;Oe<Qs;Oe++){const Vi=De[Oe];ct.update(Vi,He),ct.bind(Vi,He)}}return He}function Bl(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function zl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(S,U,z){const G=yt.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),yt.get(S.texture).__webglTexture=U,yt.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,U){const z=yt.get(S);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};const Gl=D.createFramebuffer();this.setRenderTarget=function(S,U=0,z=0){M=S,N=U,y=z;let G=!0,F=null,et=!1,ht=!1;if(S){const ut=yt.get(S);if(ut.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(D.FRAMEBUFFER,null),G=!1;else if(ut.__webglFramebuffer===void 0)Ft.setupRenderTarget(S);else if(ut.__hasExternalTextures)Ft.rebindTextures(S,yt.get(S.texture).__webglTexture,yt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const St=S.depthTexture;if(ut.__boundDepthTexture!==St){if(St!==null&&yt.has(St)&&(S.width!==St.image.width||S.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(S)}}const Ct=S.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Dt=yt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Dt[U])?F=Dt[U][z]:F=Dt[U],et=!0):S.samples>0&&Ft.useMultisampledRTT(S)===!1?F=yt.get(S).__webglMultisampledFramebuffer:Array.isArray(Dt)?F=Dt[z]:F=Dt,H.copy(S.viewport),X.copy(S.scissor),W=S.scissorTest}else H.copy(Jt).multiplyScalar(at).floor(),X.copy(re).multiplyScalar(at).floor(),W=ae;if(z!==0&&(F=Gl),gt.bindFramebuffer(D.FRAMEBUFFER,F)&&G&&gt.drawBuffers(S,F),gt.viewport(H),gt.scissor(X),gt.setScissorTest(W),et){const ut=yt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,ut.__webglTexture,z)}else if(ht){const ut=U;for(let Ct=0;Ct<S.textures.length;Ct++){const Dt=yt.get(S.textures[Ct]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Ct,Dt.__webglTexture,z,ut)}}else if(S!==null&&z!==0){const ut=yt.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,ut.__webglTexture,z)}L=-1},this.readRenderTargetPixels=function(S,U,z,G,F,et,ht,mt=0){if(!(S&&S.isWebGLRenderTarget)){pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=yt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ht!==void 0&&(ut=ut[ht]),ut){gt.bindFramebuffer(D.FRAMEBUFFER,ut);try{const Ct=S.textures[mt],Dt=Ct.format,St=Ct.type;if(!oe.textureFormatReadable(Dt)){pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(St)){pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-G&&z>=0&&z<=S.height-F&&(S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+mt),D.readPixels(U,z,G,F,Pt.convert(Dt),Pt.convert(St),et))}finally{const Ct=M!==null?yt.get(M).__webglFramebuffer:null;gt.bindFramebuffer(D.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(S,U,z,G,F,et,ht,mt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=yt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ht!==void 0&&(ut=ut[ht]),ut)if(U>=0&&U<=S.width-G&&z>=0&&z<=S.height-F){gt.bindFramebuffer(D.FRAMEBUFFER,ut);const Ct=S.textures[mt],Dt=Ct.format,St=Ct.type;if(!oe.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Xt),D.bufferData(D.PIXEL_PACK_BUFFER,et.byteLength,D.STREAM_READ),S.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+mt),D.readPixels(U,z,G,F,Pt.convert(Dt),Pt.convert(St),0);const te=M!==null?yt.get(M).__webglFramebuffer:null;gt.bindFramebuffer(D.FRAMEBUFFER,te);const me=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Pc(D,me,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Xt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,et),D.deleteBuffer(Xt),D.deleteSync(me),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,U=null,z=0){const G=Math.pow(2,-z),F=Math.floor(S.image.width*G),et=Math.floor(S.image.height*G),ht=U!==null?U.x:0,mt=U!==null?U.y:0;Ft.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,z,0,0,ht,mt,F,et),gt.unbindTexture()};const Hl=D.createFramebuffer(),Vl=D.createFramebuffer();this.copyTextureToTexture=function(S,U,z=null,G=null,F=0,et=null){et===null&&(F!==0?(ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=F,F=0):et=0);let ht,mt,ut,Ct,Dt,St,Xt,te,me;const ge=S.isCompressedTexture?S.mipmaps[et]:S.image;if(z!==null)ht=z.max.x-z.min.x,mt=z.max.y-z.min.y,ut=z.isBox3?z.max.z-z.min.z:1,Ct=z.min.x,Dt=z.min.y,St=z.isBox3?z.min.z:0;else{const qe=Math.pow(2,-F);ht=Math.floor(ge.width*qe),mt=Math.floor(ge.height*qe),S.isDataArrayTexture?ut=ge.depth:S.isData3DTexture?ut=Math.floor(ge.depth*qe):ut=1,Ct=0,Dt=0,St=0}G!==null?(Xt=G.x,te=G.y,me=G.z):(Xt=0,te=0,me=0);const se=Pt.convert(U.format),wt=Pt.convert(U.type);let ue;U.isData3DTexture?(Ft.setTexture3D(U,0),ue=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ft.setTexture2DArray(U,0),ue=D.TEXTURE_2D_ARRAY):(Ft.setTexture2D(U,0),ue=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const $t=D.getParameter(D.UNPACK_ROW_LENGTH),He=D.getParameter(D.UNPACK_IMAGE_HEIGHT),an=D.getParameter(D.UNPACK_SKIP_PIXELS),Ve=D.getParameter(D.UNPACK_SKIP_ROWS),On=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ge.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ge.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ct),D.pixelStorei(D.UNPACK_SKIP_ROWS,Dt),D.pixelStorei(D.UNPACK_SKIP_IMAGES,St);const fe=S.isDataArrayTexture||S.isData3DTexture,Ne=U.isDataArrayTexture||U.isData3DTexture;if(S.isDepthTexture){const qe=yt.get(S),De=yt.get(U),Oe=yt.get(qe.__renderTarget),Qs=yt.get(De.__renderTarget);gt.bindFramebuffer(D.READ_FRAMEBUFFER,Oe.__webglFramebuffer),gt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Qs.__webglFramebuffer);for(let Vi=0;Vi<ut;Vi++)fe&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.get(S).__webglTexture,F,St+Vi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,yt.get(U).__webglTexture,et,me+Vi)),D.blitFramebuffer(Ct,Dt,ht,mt,Xt,te,ht,mt,D.DEPTH_BUFFER_BIT,D.NEAREST);gt.bindFramebuffer(D.READ_FRAMEBUFFER,null),gt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(F!==0||S.isRenderTargetTexture||yt.has(S)){const qe=yt.get(S),De=yt.get(U);gt.bindFramebuffer(D.READ_FRAMEBUFFER,Hl),gt.bindFramebuffer(D.DRAW_FRAMEBUFFER,Vl);for(let Oe=0;Oe<ut;Oe++)fe?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,qe.__webglTexture,F,St+Oe):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,qe.__webglTexture,F),Ne?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,De.__webglTexture,et,me+Oe):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,De.__webglTexture,et),F!==0?D.blitFramebuffer(Ct,Dt,ht,mt,Xt,te,ht,mt,D.COLOR_BUFFER_BIT,D.NEAREST):Ne?D.copyTexSubImage3D(ue,et,Xt,te,me+Oe,Ct,Dt,ht,mt):D.copyTexSubImage2D(ue,et,Xt,te,Ct,Dt,ht,mt);gt.bindFramebuffer(D.READ_FRAMEBUFFER,null),gt.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ne?S.isDataTexture||S.isData3DTexture?D.texSubImage3D(ue,et,Xt,te,me,ht,mt,ut,se,wt,ge.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(ue,et,Xt,te,me,ht,mt,ut,se,ge.data):D.texSubImage3D(ue,et,Xt,te,me,ht,mt,ut,se,wt,ge):S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,et,Xt,te,ht,mt,se,wt,ge.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,et,Xt,te,ge.width,ge.height,se,ge.data):D.texSubImage2D(D.TEXTURE_2D,et,Xt,te,ht,mt,se,wt,ge);D.pixelStorei(D.UNPACK_ROW_LENGTH,$t),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,He),D.pixelStorei(D.UNPACK_SKIP_PIXELS,an),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ve),D.pixelStorei(D.UNPACK_SKIP_IMAGES,On),et===0&&U.generateMipmaps&&D.generateMipmap(ue),gt.unbindTexture()},this.initRenderTarget=function(S){yt.get(S).__webglFramebuffer===void 0&&Ft.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ft.setTextureCube(S,0):S.isData3DTexture?Ft.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ft.setTexture2DArray(S,0):Ft.setTexture2D(S,0),gt.unbindTexture()},this.resetState=function(){N=0,y=0,M=null,gt.reset(),P.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class dm{constructor(t,e){this.scene=t,this.clippingPlanes=e||[],this.logicalWidth=160,this.logicalDepth=160,this.width=this.logicalWidth*3,this.depth=this.logicalDepth*3,this.grid=[],this.geometry=null,this.mesh=null,this.waterMesh=null,this.meshes=[],this.buildings=[],this.initTerrain(),this.totalHousingPop=0,this.entityGrid=[],this.initEntityGrid()}initEntityGrid(){this.entityGrid=[];for(let t=0;t<this.logicalWidth;t++){this.entityGrid[t]=[];for(let e=0;e<this.logicalDepth;e++)this.entityGrid[t][e]=[]}}registerEntity(t,e,i,n){this.isValidGrid(e,i)&&(t._spatial={x:e,z:i,type:n},this.entityGrid[e][i].push(t))}unregisterEntity(t){if(!t._spatial)return;const{x:e,z:i}=t._spatial;if(this.isValidGrid(e,i)){const n=this.entityGrid[e][i],r=n.indexOf(t);r!==-1&&n.splice(r,1)}t._spatial=null}moveEntity(t,e,i,n,r,a){if(Math.floor(e)===Math.floor(n)&&Math.floor(i)===Math.floor(r)){t._spatial={x:n,z:r,type:a};return}this.unregisterEntity(t),this.registerEntity(t,n,r,a)}findNearestEntity(t,e,i,n){let r=null,a=n*n;const o=Math.ceil(n),c=Math.max(0,e-o),l=Math.min(this.logicalWidth-1,e+o),d=Math.max(0,i-o),u=Math.min(this.logicalDepth-1,i+o);for(let f=c;f<=l;f++)for(let m=d;m<=u;m++){const x=this.entityGrid[f][m];for(let _=0;_<x.length;_++){const g=x[_];if(g._spatial&&g._spatial.type===t){const p=f-e,w=m-i,b=p*p+w*w;if(b<a){if(g.isDead)continue;a=b,r=g}}}}return r}findBestTarget(t,e,i,n,r){let a=null,o=1/0;const c=Math.ceil(n),l=Math.max(0,e-c),d=Math.min(this.logicalWidth-1,e+c),u=Math.max(0,i-c),f=Math.min(this.logicalDepth-1,i+c);for(let m=l;m<=d;m++)for(let x=u;x<=f;x++){const _=this.entityGrid[m][x];for(let g=0;g<_.length;g++){const p=_[g];if(p._spatial&&p._spatial.type===t){if(p.isDead)continue;const w=m-e,b=x-i,T=Math.sqrt(w*w+b*b);if(T>n)continue;const C=r(p,T);C<o&&(o=C,a=p)}}}return a}initTerrain(){this.grid=[];for(let i=0;i<this.logicalWidth;i++){this.grid[i]=[];for(let n=0;n<this.logicalDepth;n++)this.grid[i][n]={height:0,type:"grass",hasBuilding:!1,noise:(Math.random()-.5)*.05}}this.geometry=new Ai(this.width,this.depth,this.width,this.depth);const t=this.geometry.attributes.position.count;this.geometry.setAttribute("color",new Ge(new Float32Array(t*3),3));const e=this.geometry.attributes.position;for(let i=0;i<t;i++){const n=e.getX(i),r=e.getY(i),a=this.getVisualOffset(n,r);e.setX(i,n+a.x),e.setY(i,r+a.y)}e.needsUpdate=!0,this.generateRandomTerrain(),this.createMesh(),this.createWater()}generateRandomTerrain(){this.seed=Math.random()*100;for(let t=0;t<this.logicalWidth;t++)for(let e=0;e<this.logicalDepth;e++){const i=t/this.logicalWidth,n=e/this.logicalDepth;let a=this.seamlessFbm(i,n,this.seed)*20-8;a=Math.max(-5,a),a=Math.round(a),this.grid[t][e].height=a;let o=this.seamlessFbm(i,n,this.seed+123.45);this.grid[t][e].moisture=o}this.updateMesh(),this.updateColors()}updateMesh(){const t=this.geometry.attributes.position.array;for(let e=0;e<t.length;e+=3){const i=t[e],n=t[e+1],r=Math.round(i+this.width/2),a=Math.round(-n+this.depth/2),o=(r%this.logicalWidth+this.logicalWidth)%this.logicalWidth,c=(a%this.logicalDepth+this.logicalDepth)%this.logicalDepth;this.grid[o]&&this.grid[o][c]&&(t[e+2]=this.grid[o][c].height)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}createMesh(){this.mesh&&this.scene.remove(this.mesh),this.meshes=[];const t=new qt({vertexColors:!0,flatShading:!1,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.mesh=new Zt(this.geometry,t),this.mesh.rotation.x=-Math.PI/2,this.mesh.position.set(0,0,0);const e=new Fe;e.setAttribute("position",this.geometry.attributes.position);const i=[],n=this.width+1,r=this.depth+1;for(let d=0;d<r;d++)for(let u=0;u<n;u++){const f=d*n+u;u<this.width&&i.push(f,f+1),d<this.depth&&i.push(f,f+n)}e.setIndex(i);const a=new Tl({color:0,transparent:!0,opacity:.15,clippingPlanes:this.clippingPlanes}),o=new uh(e,a);o.position.set(0,0,.04),this.mesh.add(o);const c=new wl({color:0,size:.15,sizeAttenuation:!0,transparent:!0,opacity:.2,clippingPlanes:this.clippingPlanes}),l=new fh(this.geometry,c);l.position.set(0,0,.05),this.mesh.add(l),this.scene.add(this.mesh),this.meshes.push(this.mesh)}createWater(){this.waterMesh&&this.scene.remove(this.waterMesh);const t=new Ai(this.width,this.depth),e=new qt({color:2003199,transparent:!0,opacity:.6,side:Ke,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.waterMesh=new Zt(t,e),this.waterMesh.rotation.x=-Math.PI/2,this.waterMesh.position.set(0,.2,0),this.scene.add(this.waterMesh)}updateLights(t){const e=t>=18||t<6;this._lastIsNight!==e&&(this._lastIsNight=e,this.updateColors(e),console.log(`Terrain: Night Lights Update. Night=${e}`))}setSeason(t){this.currentSeason!==t&&(console.log(`[DEBUG] Terrain.setSeason: Changing from ${this.currentSeason} to ${t}`),this.currentSeason=t,this.updateColors(this._lastIsNight))}updateColors(t){t===void 0&&(t=this._lastIsNight||!1);const e=this.geometry.attributes.color.array,i=this.geometry.attributes.position.array,n=this.currentSeason||"Spring";console.log(`[DEBUG] Terrain.updateColors: Season=${n}, IsNight=${t}`);for(let r=0;r<i.length;r+=3){const a=i[r],o=i[r+1],c=Math.round(a+this.width/2),l=Math.round(-o+this.depth/2),d=(c%this.logicalWidth+this.logicalWidth)%this.logicalWidth,u=(l%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[d]&&this.grid[d][u]){const f=this.grid[d][u],m=f.height,x=f.noise,_=f.moisture||.5,g=this.getBiomeColor(m,_,x,t,n,d,u);e[r]=g.r,e[r+1]=g.g,e[r+2]=g.b}}this.geometry.attributes.color.needsUpdate=!0}getBiomeColor(t,e,i,n,r,a,o,c=!1){const l=new It;if(t<=0){if(c){const u=new It(8965375),f=new It(26316);let m=Math.abs(t)/10;return m=Math.min(1,m),l.copy(u).lerp(f,m),l}l.setHex(16032864);const d=.9+i*.2;return l.multiplyScalar(d),l}if(t<=4)if(r==="Winter"){l.setHex(12433259);const d=(i+1)*.5;l.lerp(new It(10525274),d*.2)}else r==="Summer"?l.setHex(43088):l.setHex(8969608);else if(t<=8)if(r==="Winter"){l.setHex(16777215);const d=(i+1)*.5;l.lerp(new It(15660543),d*.1)}else if(r==="Autumn"){const d=a*12.9898+o*78.233;let u=Math.sin(d)*43758.5453;u=u-Math.floor(u),u>.66?l.setHex(13369344):u>.33?l.setHex(16763904):l.setHex(2263842)}else r==="Summer"?l.setHex(25600):l.setHex(2263842);else{l.setHex(8421504);const d=(i+1)*.5;l.lerp(new It(6316128),d*.2)}if(e<.5&&t<=8){const d=new It(16032864);let u=1;e>.35&&(u=1-(e-.35)/.15),l.lerp(d,u)}if(e>.6&&t<=3){const d=new It(3100495);let u=Math.min(1,Math.max(0,(e-.6)/.15));r==="Autumn"&&d.setHex(4929057);let f=t>2?1-(t-2):1;l.lerp(d,u*f)}if(n){const d={};l.getHSL(d),d.l*=.3;let u=0;if(t>0){const f=this.logicalWidth,m=this.logicalDepth;for(let x=-2;x<=2;x++)for(let _=-2;_<=2;_++){const g=(a+x+f)%f,p=(o+_+m)%m;if(this.grid[g]&&this.grid[g][p]&&this.grid[g][p].hasBuilding){const w=Math.sqrt(x*x+_*_);w<=2.5&&(u+=Math.max(0,1-w/2.5))}}}if(u>0){u=Math.min(1,u);const f=.1;d.h=d.h*(1-u)+f*u,d.l+=u*.4}l.setHSL(d.h,d.s,d.l)}return l}modifyMoisture(t,e,i){const n=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,r=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[n]&&this.grid[n][r]){const a=this.grid[n][r];a.moisture=Math.max(0,Math.min(1,(a.moisture||.5)+i)),this.updateColorAt(n,r)}}updateColorAt(t,e){const i=this._lastIsNight||!1,n=this.currentSeason||"Spring",r=this.geometry.attributes.color,a=this.logicalWidth,o=this.logicalDepth,c=a+1,l=[{x:t,z:e}];t===0&&l.push({x:a,z:e}),e===0&&l.push({x:t,z:o}),t===0&&e===0&&l.push({x:a,z:o}),l.forEach(d=>{const u=d.z*c+d.x;if(u<0||u>=r.count)return;const f=d.x%a,m=d.z%o;if(this.grid[f]&&this.grid[f][m]){const x=this.grid[f][m],_=x.height,g=x.noise,p=x.moisture||.5,w=this.getBiomeColor(_,p,g,i,n,f,m);r.setXYZ(u,w.r,w.g,w.b)}}),r.needsUpdate=!0}modifyHeight(t,e,i){const n=[],r=(c,l)=>({x:(c+this.logicalWidth)%this.logicalWidth,z:(l+this.logicalDepth)%this.logicalDepth}),a=r(t,e);this.grid[a.x]&&this.grid[a.x][a.z]&&(this.grid[a.x][a.z].height+=i,n.push(a));let o=0;for(;o<n.length;){const c=n[o++],l=c.x,d=c.z,u=this.grid[l][d],f=u.height;if(u.hasBuilding&&u.building){this.scene.remove(u.building),u.building.userData&&u.building.userData.clones&&u.building.userData.clones.forEach(g=>this.scene.remove(g)),u.building=null,u.hasBuilding=!1;const _=this.buildings.indexOf(u.building);_>-1&&this.buildings.splice(_,1),console.log("Building destroyed at",l,d)}const m=[{x:l+1,z:d},{x:l-1,z:d},{x:l,z:d+1},{x:l,z:d-1}];for(const _ of m){const g=r(_.x,_.z),p=this.grid[g.x][g.z],w=p.height,b=f-w;b>1?(p.height=f-1,n.push(g)):b<-1&&(p.height=f+1,n.push(g))}[{x:(l-1+this.logicalWidth)%this.logicalWidth,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:l,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:(l-1+this.logicalWidth)%this.logicalWidth,z:d},{x:l,z:d}].forEach(_=>{const g=this.grid[_.x][_.z];if(g.hasBuilding&&g.building){const p=g.building;let w=!0;if(this.grid[_.x][_.z].height<=0&&(w=!1,console.log("Building drowned!")),p.userData.type==="house"||p.userData.type==="farm"){const T=this.grid[_.x][_.z].height,C=this.grid[(_.x+1)%this.logicalWidth][_.z].height,E=this.grid[_.x][(_.z+1)%this.logicalDepth].height,R=this.grid[(_.x+1)%this.logicalWidth][(_.z+1)%this.logicalDepth].height;(T!==C||T!==E||T!==R)&&(w=!1)}else if(p.userData.type==="castle"){const T=p.userData.gridX,C=p.userData.gridZ;for(let E=0;E<=2;E++)for(let R=0;R<=2;R++){const N=(T+E)%this.logicalWidth,y=(C+R)%this.logicalDepth;this.grid[N][y].height!==h&&(w=!1)}}if(!w){if(this.scene.remove(p),p.userData&&p.userData.clones&&p.userData.clones.forEach(C=>this.scene.remove(C)),p.userData.type==="castle"){const C=p.userData.gridX,E=p.userData.gridZ;[{x:C,z:E},{x:(C+1)%this.logicalWidth,z:E},{x:C,z:(E+1)%this.logicalDepth},{x:(C+1)%this.logicalWidth,z:(E+1)%this.logicalDepth}].forEach(N=>{const y=this.grid[N.x][N.z];y.hasBuilding=!1,y.building=null})}else g.hasBuilding=!1,g.building=null;const T=this.buildings.indexOf(p);T>-1&&this.buildings.splice(T,1),console.log("Building destroyed due to terrain change at",_.x,_.z)}}})}this.updateMesh(),this.updateColors()}getTileHeight(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]?this.grid[i][n].height:0}getVisualOffset(t,e){const i=(Math.sin(e*.5)+Math.cos(t*.4))*.2,n=(Math.cos(e*.4)+Math.sin(t*.5))*.2;return{x:i,y:n}}getVisualPosition(t,e,i=!0){const n=this.logicalWidth||80,r=this.logicalDepth||80,a=i?.5:0,o=t-n/2+a,c=e-r/2+a,l=o,d=-c,u=this.getVisualOffset(l,d),f=o+u.x,m=c-u.y,x=this.getTileHeight(t,e);return{x:f,y:x,z:m}}getInterpolatedHeight(t,e){let i=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,n=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;const r=Math.floor(i),a=Math.floor(n),o=(r+1)%this.logicalWidth,c=(a+1)%this.logicalDepth,l=i-r,d=n-a,u=this.grid[r][a].height,f=this.grid[o][a].height,m=this.grid[r][c].height,x=this.grid[o][c].height,_=u*(1-l)+f*l,g=m*(1-l)+x*l;return _*(1-d)+g*d}isValidGrid(t,e){return t>=0&&t<this.logicalWidth&&e>=0&&e<this.logicalDepth}raise(t,e){this.modifyHeight(t,e,1)}lower(t,e){this.modifyHeight(t,e,-1)}seamlessFbm(t,e,i){let n=0,r=1,a=1,o=0;for(let c=0;c<4;c++)n+=this.periodicNoise(t*a,e*a,a,i)*r,o+=r,r*=.5,a*=2;return n/o}periodicNoise(t,e,i,n){const a=t*5,o=e*5,c=i*5,l=Math.floor(a),d=Math.floor(o),u=a-l,f=o-d,m=Math.floor(c),x=C=>(C%m+m)%m,_=this.random(x(l),x(d),n),g=this.random(x(l+1),x(d),n),p=this.random(x(l),x(d+1),n),w=this.random(x(l+1),x(d+1),n),b=u*u*(3-2*u),T=f*f*(3-2*f);return(1-b)*(1-T)*_+b*(1-T)*g+(1-b)*T*p+b*T*w}raycast(t,e){t.clone();const r=e.clone().normalize(),a=new I;for(let o=0;o<300;o+=.5){if(a.copy(r).multiplyScalar(o).add(t),a.y>20)continue;if(a.y<-5)break;this.getInterpolatedHeight(a.x+this.width/2,a.z+this.depth/2);const c=a.x+this.logicalWidth/2,l=a.z+this.logicalDepth/2,d=this.getInterpolatedHeight(c,l);if(a.y<=d)return a.y=d,a}return null}random(t,e,i){const n=Math.sin(t*12.9898+e*78.233+i)*43758.5453123;return n-Math.floor(n)}addBuilding(t,e,i){const n=this.grid[e][i].height,r={type:t,gridX:e,gridZ:i,y:n,rotation:Math.random()*Math.PI*2,population:0,id:Math.random().toString(36).substr(2,9)};t==="house"&&(r.population=10),t==="farm"&&(r.population=10,r.hp=5),t==="castle"&&(r.population=50),t==="goblin_hut"&&(r.population=1),r.userData=r,this.buildings.push(r);const a=this.grid[e][i];return a.hasBuilding=!0,a.building=r,t==="castle"&&[{x:1,z:0},{x:0,z:1},{x:1,z:1}].forEach(c=>{const l=(e+c.x)%this.logicalWidth,d=(i+c.z)%this.logicalDepth;this.grid[l][d].hasBuilding=!0,this.grid[l][d].building=r}),console.log(`Building added: ${t} at ${e},${i}`),r}removeBuilding(t){const e=this.buildings.indexOf(t);e!==-1?(this.buildings.splice(e,1),console.log("Terrain: Building removed from list. Remaining:",this.buildings.length)):console.warn("Terrain: removeBuilding called but building not found in list!");for(let i=0;i<this.logicalWidth;i++)for(let n=0;n<this.logicalDepth;n++)this.grid[i][n].building===t&&(this.grid[i][n].hasBuilding=!1,this.grid[i][n].building=null)}updatePopulation(t,e,i=!1){const n=window.game&&window.game.units?window.game.units.length:0;let r=0;this.buildings.forEach(g=>{const p=g.userData.type||g.type;(p==="house"||p==="castle")&&g.userData.population&&(r+=g.userData.population)}),this.totalHousingPop=r;const a=Math.floor(r)+n;let o=.005;i&&(o*=.1);let c=a*o*t;const l=window.game?window.game.resources:{grain:0,fish:0,meat:0};let d=!0;if(c>0){let g=c*.4,p=c*.3,w=c*.3;const b=(N,y)=>{if(y<=0)return 0;if(l[N]>=y)return l[N]-=y,0;{const M=l[N];return l[N]=0,y-M}};let T=b("grain",g),C=b("meat",p),E=b("fish",w);T>0&&(T=b("meat",T)),C>0&&(C=b("fish",C)),T>0&&(T=b("fish",T));let R=T+C+E;R>0&&(R=b("grain",R),R=b("meat",R),R=b("fish",R)),R>1e-4&&(d=!1)}let u=0;l.grain>0&&u++,l.fish>0&&u++,l.meat>0&&u++;let f=.5;u===1&&(f=1),u===2&&(f=2.5),u===3&&(f=5);const m=.5*f;this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const x=20,_=this.frameCount%x;this.buildings.forEach((g,p)=>{if(p%x!==_)return;const w=t*x,b=g.userData.type;if(b==="house"||b==="castle"){const T=g.userData.gridX,C=g.userData.gridZ;let E=m;b==="castle"&&(E*=2);const R=2e5/(2e5+a);E*=R,d||(E=0),g.userData.population+=E*w;let N=0;for(;g.userData.population>=100&&N<10;){g.userData.population-=100,N++;let y=!1;if(l.fish>=1?(l.fish--,y=!0):l.meat>=1?(l.meat--,y=!0):l.grain>=1&&(l.grain--,y=!0),y){let M="worker";if((window.game?.units?.length||0)>30){const O=Math.random();O<.2?M="hunter":O<.4?M="fisher":M="worker"}if(b==="castle")for(let O=0;O<4;O++)e(T,C,M);else e(T,C,M)}}g.userData.population>100&&(g.userData.population=99)}else if(b==="farm"){for(g.userData.population=(g.userData.population||0)+10*w;g.userData.population>=100;)if(g.userData.population-=100,window.game&&window.game.resources){const C=g.userData.gridX,E=g.userData.gridZ,R=this.grid[C][E].moisture||.5;let y=1-Math.abs(R-.5)*2;y<.2&&(y=.2);const M=Math.floor(5*y);window.game.resources.grain+=M}}})}update(t,e){this.colorsDirty&&(this.updateColors(),this.colorsDirty=!1),this.updatePopulation(t,e)}updateLights(t){}serialize(){const t={logicalWidth:this.logicalWidth,logicalDepth:this.logicalDepth,grid:[]};for(let e=0;e<this.logicalWidth;e++){t.grid[e]=[];for(let i=0;i<this.logicalDepth;i++){const n=this.grid[e][i],r={};r.h=Math.round(n.height*100)/100,r.n=Math.round(n.noise*100)/100,n.hasBuilding&&(r.hb=1,n.building&&n.building.gridX===e&&n.building.gridZ===i&&(r.b={t:n.building.userData.type,p:n.building.userData.population,x:n.building.userData.gridX,z:n.building.userData.gridZ,r:Math.round(n.building.rotation*100)/100})),t.grid[e][i]=r}}return t}deserialize(t){if(!t){console.error("Terrain.deserialize received invalid data:",t);return}this.buildings.forEach(e=>{this.scene.remove(e),e.userData.clones&&e.userData.clones.forEach(i=>this.scene.remove(i))}),this.buildings=[];for(let e=0;e<this.logicalWidth;e++)for(let i=0;i<this.logicalDepth;i++){const n=this.grid[e][i];n.hasBuilding&&n.building&&this.scene.remove(n.building),n.hasBuilding=!1,n.building=null}this.logicalWidth=t.logicalWidth,this.logicalDepth=t.logicalDepth;for(let e=0;e<this.logicalWidth;e++)for(let i=0;i<this.logicalDepth;i++){const n=t.grid[e][i],r=n.h!==void 0?n.h:n.height,a=n.n!==void 0?n.n:n.noise;this.grid[e][i].height=r,this.grid[e][i].noise=a;let o=n.hb||n.hasBuilding,c=n.b||n.building;if(o&&c){const l=c.x!==void 0?c.x:c.gridX,d=c.z!==void 0?c.z:c.gridZ;if(l===e&&d===i){const u=c.t||c.type,f={gridX:l,gridZ:d,type:u,population:c.p!==void 0?c.p:c.population,rotation:c.r!==void 0?c.r:c.rotation};u==="house"?this.restoreHouse(f):u==="farm"?this.restoreFarm(f):u==="castle"?this.restoreCastle(f):u==="goblin_hut"&&this.restoreGoblinHut(f)}}}this.updateMesh(),this.updateColors()}restoreHouse(t){const e={type:"house",gridX:t.gridX,gridZ:t.gridZ,y:this.getTileHeight(t.gridX,t.gridZ),rotation:t.rotation!==void 0?t.rotation:Math.random()*Math.PI*2,population:t.population||0,id:Math.random().toString(36).substr(2,9),userData:{type:"house",population:t.population||0,gridX:t.gridX,gridZ:t.gridZ}},i=this.grid[t.gridX][t.gridZ];i.hasBuilding=!0,i.building=e,this.buildings.push(e)}restoreFarm(t){const e={type:"farm",gridX:t.gridX,gridZ:t.gridZ,y:this.getTileHeight(t.gridX,t.gridZ),rotation:t.rotation!==void 0?t.rotation:Math.random()*Math.PI*2,population:0,id:Math.random().toString(36).substr(2,9),userData:{type:"farm",gridX:t.gridX,gridZ:t.gridZ}},i=this.grid[t.gridX][t.gridZ];i.hasBuilding=!0,i.building=e,this.buildings.push(e)}restoreGoblinHut(t){const e={type:"goblin_hut",gridX:t.gridX,gridZ:t.gridZ,y:this.getTileHeight(t.gridX,t.gridZ),rotation:t.rotation!==void 0?t.rotation:Math.random()*Math.PI*2,population:t.population||1,id:Math.random().toString(36).substr(2,9),userData:{type:"goblin_hut",population:t.population||1,gridX:t.gridX,gridZ:t.gridZ}},i=this.grid[t.gridX][t.gridZ];i.hasBuilding=!0,i.building=e,this.buildings.push(e)}restoreCastle(t){const e={type:"castle",gridX:t.gridX,gridZ:t.gridZ,y:this.getTileHeight(t.gridX,t.gridZ),rotation:t.rotation!==void 0?t.rotation:Math.random()*Math.PI*2,population:t.population||50,id:Math.random().toString(36).substr(2,9),userData:{type:"castle",population:t.population||50,gridX:t.gridX,gridZ:t.gridZ}},i=this.grid[t.gridX][t.gridZ];i.hasBuilding=!0,i.building=e,this.buildings.push(e),[{x:1,z:0},{x:0,z:1},{x:1,z:1}].forEach(r=>{const a=(t.gridX+r.x)%this.logicalWidth,o=(t.gridZ+r.z)%this.logicalDepth;this.grid[a][o].hasBuilding=!0,this.grid[a][o].building=e})}}class um{constructor(t,e,i,n,r,a){this.scene=t,this.camera=e,this.terrain=i,this.spawnCallback=n,this.units=r||[],this.unitRenderer=a,this.raycaster=new Sh,this.mouse=new bt,this.mode="raise";const o=new wi(.2,1,8),c=new In({color:16711680,wireframe:!0});this.cursor=new Zt(o,c),this.cursor.rotation.x=Math.PI,this.scene.add(this.cursor),this.tooltip=document.getElementById("tooltip"),this.setupUI(),window.addEventListener("pointerdown",this.onPointerDown.bind(this)),window.addEventListener("pointerup",this.onPointerUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),this.dragThreshold=5,this.downPosition=new bt}setupUI(){const t=document.getElementById("btn-raise"),e=document.getElementById("btn-lower"),i=document.getElementById("btn-spawn"),n=r=>{this.mode=r,t&&t.classList.toggle("active",r==="raise"),e&&e.classList.toggle("active",r==="lower"),i&&i.classList.toggle("active",r==="spawn")};t&&t.addEventListener("click",()=>n("raise")),e&&e.addEventListener("click",()=>n("lower")),i&&i.addEventListener("click",()=>n("spawn"))}onPointerDown(t){t.target.tagName==="BUTTON"||t.target.id==="minimap"||this.downPosition.set(t.clientX,t.clientY)}onPointerUp(t){if(t.target.tagName==="BUTTON"||t.target.id==="minimap")return;const e=new bt(t.clientX,t.clientY);this.downPosition.distanceTo(e)>this.dragThreshold||this.handleInteraction(t)}onMouseMove(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updateCursor(),this.updateTooltip(t.clientX,t.clientY)}updateTooltip(t,e){if(!this.tooltip)return;let i="",n=!1;this.raycaster.setFromCamera(this.mouse,this.camera);const r=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(r){const a=Math.round(r.x),o=Math.round(r.z),c=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;let d=Math.round(a+c/2),u=Math.round(o+l/2);d=(d%c+c)%c,u=(u%l+l)%l;const f=this.terrain.grid[d][u];if(f&&f.hasBuilding&&f.building){const m=f.building,x=m.userData.type||m.type;x==="house"?(i=`House Pop: ${Math.floor(m.userData.population||0)}/100`,n=!0):x==="castle"&&(i=`Castle Pop: ${Math.floor(m.userData.population||0)}/200`,n=!0)}if(!n){const m=this.terrain.findNearestEntity("unit",d,u,2.5);m&&(i=`Age: ${Math.floor(m.age)}`,m.action&&(i+=`
${m.action}`),n=!0)}}n?(this.tooltip.textContent=i,this.tooltip.style.display="block",this.tooltip.style.left=t+15+"px",this.tooltip.style.top=e+15+"px"):this.tooltip.style.display="none"}update(){this.lastClientX!==void 0&&this.lastClientY!==void 0&&this.updateTooltip(this.lastClientX,this.lastClientY)}updateCursor(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=null;t=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);const e=t?[{point:t}]:[];if(e.length>0){const n=e[0].point,r=Math.round(n.x),a=Math.round(n.z),o=this.terrain.logicalWidth||80,c=this.terrain.logicalDepth||80;let l=Math.round(r+o/2),d=Math.round(a+c/2);l=(l%o+o)%o,d=(d%c+c)%c;const u=this.terrain.getVisualPosition(l,d,!1),f=l-o/2,m=d-c/2,x=u.x-f,_=u.z-m;this.cursor.position.set(r+x,u.y+.5,a+_),this.cursor.visible=!0,this.mode==="spawn"?this.cursor.material.color.setHex(255):this.cursor.material.color.setHex(16711680)}else this.cursor.visible=!1}handleInteraction(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(e){const i=e,n=Math.round(i.x),r=Math.round(i.z),a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let c=Math.round(n+a/2),l=Math.round(r+o/2);c=(c%a+a)%a,l=(l%o+o)%o,t.button===0?this.mode==="raise"?this.terrain.raise(c,l):this.mode==="lower"?this.terrain.lower(c,l):this.mode==="spawn"&&this.spawnCallback&&this.spawnCallback(c,l,!0):t.button===2&&this.terrain.lower(c,l),this.updateCursor()}}update(t){this.updateCursor()}}class xt{static assets={geometries:{},materials:{},textures:{}};static initAssets(){xt.assets.initialized||(xt.assets.geometries.torso=new he(.3,.4,.2),xt.assets.geometries.head=new he(.2,.2,.2),xt.assets.geometries.arm=new he(.1,.3,.1),xt.assets.geometries.leg=new he(.12,.3,.12),xt.assets.textures.face=xt.createFaceTexture(),xt.assets.textures.hair=xt.createHairTexture(),xt.assets.materials.limb=new qt({color:16764074}),xt.assets.materials.clothesNormal=new qt({color:9127187}),xt.assets.materials.clothesSpecial=new qt({color:255}),xt.assets.materials.heads=[new qt({map:xt.assets.textures.hair}),new qt({map:xt.assets.textures.hair}),new qt({map:xt.assets.textures.hair}),new qt({map:xt.assets.textures.hair}),new qt({map:xt.assets.textures.face}),new qt({map:xt.assets.textures.hair})],xt.assets.initialized=!0)}static createFaceTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");return e.fillStyle="#FFCCAA",e.fillRect(0,0,64,64),e.fillStyle="#4A3000",e.fillRect(0,0,64,15),e.fillStyle="#000000",e.fillRect(15,25,8,8),e.fillRect(41,25,8,8),e.fillStyle="#A0522D",e.fillRect(20,45,24,4),new Ze(t)}static createHairTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#4A3000",e.fillRect(0,0,64,64),e.fillStyle="#3A2000";for(let i=0;i<20;i++)e.fillRect(Math.random()*60,Math.random()*60,4,4);return new Ze(t)}constructor(t,e,i,n,r="worker"){xt.initAssets(),this.scene=t,this.terrain=e,this.gridX=i||20,this.gridZ=n||20;let a="worker",o=!1;typeof r=="boolean"?o=r:a=r,this.role=a||"worker",this.isSpecial=o,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0,this.lastGatherTime=-Math.random()*30,this.position=new I,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}},this.isSpecial=o||!1;const c=50+Math.random()*30;this.lifespan=this.isSpecial?c+20:c,this.age=20,this.isDead=!1,this.isFinished=!1,this.crossMesh=null,this.hp=30+Math.floor(Math.random()*20),this.maxHp=this.hp,this.attackCooldown=0,this.attackRate=1,this.damage=6,this.targetGoblin=null,this.updatePosition(),this.moveTimer=0,this.moveInterval=200,this.lastTime=window.game&&window.game.gameTotalTime!==void 0?window.game.gameTotalTime:0,this.lastGatherTime=0,this.isMoving=!1,this.targetX=0,this.targetZ=0,this.moveStartTime=0,this.moveDuration=1e3,this.terrain.registerEntity(this,this.gridX,this.gridZ,"unit")}takeDamage(t){this.hp-=t,this.hp<=0&&this.die()}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.createCross(),console.log("Unit died."))}attackGoblin(t){this.attackCooldown>0||(this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200),t.takeDamage(this.damage),this.attackCooldown=this.attackRate)}updateLogic(t,e,i,n,r,a){if(this.isDead){this.updateDeathAnimation(e),this.action="Dead";return}if(!this.isMoving&&t>=this.lastTime&&(this.action="Idle"),this.age+=e,this.age>=this.lifespan){this.die();return}{const o=this.terrain.getTileHeight(this.gridX,this.gridZ);if(o<=0){console.log(`Unit drowned at ${this.gridX},${this.gridZ} (Height: ${o})`),this.die();return}}if(this.terrain.logicalWidth,this.terrain.logicalDepth,this.lastGridX===this.gridX&&this.lastGridZ===this.gridZ&&!this.isSleeping?this.stagnationTimer+=e:(this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0),this.stagnationTimer>10&&(this.moveRandomly(t),this.stagnationTimer>20&&(console.warn("Unit critically stuck. Teleporting to safety."),this.forceUnstuck(),this.stagnationTimer=0)),this.isMoving&&t-this.moveStartTime>this.moveDuration+500&&(console.warn("Unit stuck in moving state. Forcing finish. Duration:",this.moveDuration),this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition(),this.tryBuildStructure(t)),i){const o=this.terrain.grid[this.gridX][this.gridZ];if(o.hasBuilding&&o.building&&(o.building.type==="house"||o.building.type==="castle")){this.isSleeping||(this.isSleeping=!0);return}else this.isSleeping&&(this.isSleeping=!1),this.isMoving}else this.isSleeping&&(this.isSleeping=!1);if(!this.isMoving&&i&&!this.isMoving&&!this.targetGoblin&&!this.targetFood){let o=null,c=30;if(this.terrain.buildings&&this.terrain.buildings.forEach(l=>{if(l.type!=="house"&&l.type!=="castle")return;const d=l.gridX-this.gridX,u=l.gridZ-this.gridZ,f=Math.sqrt(d*d+u*u);f<c&&(c=f,o=l)}),o){this.triggerMove(o.userData.gridX,o.userData.gridZ,t);return}}if(this.attackCooldown-=e,!(this.huntingCooldown&&t<this.huntingCooldown)){if(n&&(this.findTargetGoblin(n),this.targetGoblin)){if(this.getDistance(this.targetGoblin.gridX,this.targetGoblin.gridZ)<=1.5)this.attackGoblin(this.targetGoblin);else if(!this.isMoving&&t-this.lastTime>this.moveInterval){const c=this.targetGoblin.gridX,l=this.targetGoblin.gridZ;this.triggerMove(c,l,t)}}}if(this.gatherResources(t),!this.isMoving&&!this.targetGoblin&&t-this.lastTime>this.moveInterval){let o=null;if(this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]&&(o=this.terrain.grid[this.gridX][this.gridZ]),o&&!o.hasBuilding){const c=o.moisture||.5;let l=!1;if(c<.35?(this.terrain.modifyMoisture(this.gridX,this.gridZ,.05),console.log(`Unit irrigated land at ${this.gridX},${this.gridZ} (M: ${c.toFixed(2)} -> ${(c+.05).toFixed(2)})`),this.action="Irrigating",l=!0):c>.75&&(this.terrain.modifyMoisture(this.gridX,this.gridZ,-.05),console.log(`Unit drained land at ${this.gridX},${this.gridZ} (M: ${c.toFixed(2)} -> ${(c-.05).toFixed(2)})`),this.action="Draining",l=!0),l){this.lastTime=t+1e3;return}}this.moveRandomly(t),this.lastTime=t}}updateMovement(t){if(!this.isMoving)return;const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=(t-this.moveStartTime)/this.moveDuration;if(n>=1)this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition(),this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0,this.tryBuildStructure(t);else{let r=this.startGridX,a=this.startGridZ,o=this.targetGridX,c=this.targetGridZ;o-r>e/2&&(r+=e),r-o>e/2&&(o+=e),c-a>i/2&&(a+=i),a-c>i/2&&(c+=i);const l=r+(o-r)*n,d=a+(c-a)*n,u=this.getPositionForGrid(l,d);this.position.copy(u);const f=Math.sin(n*Math.PI*4)*.5;this.limbs.leftArm.x=f,this.limbs.rightArm.x=-f,this.limbs.leftLeg.x=-f,this.limbs.rightLeg.x=f}}triggerMove(t,e,i){const n=t-this.gridX,r=e-this.gridZ;let a=this.gridX,o=this.gridZ;Math.abs(n)>Math.abs(r)?a+=Math.sign(n):o+=Math.sign(r);const c=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;a<0&&(a=c-1),a>=c&&(a=0),o<0&&(o=l-1),o>=l&&(o=0);const d=this.terrain.getTileHeight(this.gridX,this.gridZ),u=this.terrain.getTileHeight(a,o);if(Math.abs(u-d)<=2&&u>0){this.isMoving=!0;const f=Math.abs(u-d);u>8?this.moveDuration=8e3:f>.1?this.moveDuration=4e3:this.moveDuration=1e3,this.moveStartTime=i,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=a,this.targetGridZ=o;const m=Math.atan2(Math.sign(n),Math.sign(r));this.rotationY=m,this.lastTime=i,this.stuckCount=0}else this.lastTime=i,this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>5&&(console.log("Unit stuck chasing target. Abandoning and cooling down."),this.targetGoblin=null,this.targetFood=null,this.stuckCount=0,this.huntingCooldown=i+5e3,this.moveRandomly(i))}gatherResources(t){if(t-this.lastGatherTime<30)return;this.lastGatherTime=t;const e=this.gridX,i=this.gridZ,n=this.terrain.getTileHeight(e,i);let r=!1,a=!1;n>4&&n<=8&&(a=!0);const o=[[0,1],[0,-1],[1,0],[-1,0]],c=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;for(const[d,u]of o){let f=e+d,m=i+u;if(f<0&&(f=c-1),f>=c&&(f=0),m<0&&(m=l-1),m>=l&&(m=0),this.terrain.getTileHeight(f,m)<=0){r=!0;break}}r?window.game&&window.game.resources&&(window.game.resources.fish+=.5):a&&window.game&&window.game.resources&&(window.game.resources.meat+=.5)}findTargetGoblin(t){if(!t||t.length===0)return;let e=null,i=1/0;for(const n of t){const r=this.gridX-n.gridX,a=this.gridZ-n.gridZ,o=Math.sqrt(r*r+a*a);if(o>10)continue;const c=this.terrain.getTileHeight(n.gridX,n.gridZ);let l=o;c>8&&(l+=20),l<i&&(i=l,e=n)}this.targetGoblin=e}getDistance(t,e){const i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);return Math.sqrt(i*i+n*n)}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}],r=this.terrain.getTileHeight(this.gridX,this.gridZ),a=[];for(const d of n){let u=this.gridX+d.x,f=this.gridZ+d.z;u<0&&(u=e-1),u>=e&&(u=0),f<0&&(f=i-1),f>=i&&(f=0);const m=this.terrain.getTileHeight(u,f);Math.abs(m-r)<=2&&m>0&&a.push({x:u,z:f,h:m,dir:d})}if(a.length===0){this.lastTime=t;return}let o=null;if(this.role==="hunter"||this.role==="fisher"){let d=0;a.forEach(f=>{let m=1;this.role==="hunter"?f.h>4&&f.h<=8?m=5:f.h>8&&(m=2):this.role==="fisher"&&f.h<=2.5&&(m=5),f.weight=m,d+=m});let u=Math.random()*d;for(const f of a)if(u-=f.weight,u<=0){o=f;break}}if(!o){const d=Math.floor(Math.random()*a.length);o=a[d]}this.isMoving=!0,this.action="Moving";const c=Math.abs(o.h-r);o.h>8?this.moveDuration=6e3:c>.1?this.moveDuration=2500:this.moveDuration=1e3,this.moveStartTime=t,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=o.x,this.targetGridZ=o.z;const l=Math.atan2(o.dir.x,o.dir.z);this.rotationY=l}updatePosition(){const t=this.getPositionForGrid(this.gridX,this.gridZ);this.position.copy(t)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,r=this.terrain.getInterpolatedHeight(t,e);return new I(t-i/2+.5,r+.25,e-n/2+.5)}forceUnstuck(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;let i=!1,n=0;for(;!i&&n<10;){const r=Math.floor(Math.random()*7)-3,a=Math.floor(Math.random()*7)-3;if(r===0&&a===0)continue;let o=this.gridX+r,c=this.gridZ+a;if(o<0&&(o=t-1),o>=t&&(o=0),c<0&&(c=e-1),c>=e&&(c=0),this.terrain.getTileHeight(o,c)>0){const d=this.gridX,u=this.gridZ;this.gridX=o,this.gridZ=c,this.updatePosition(),this.terrain.moveEntity(this,d,u,o,c,"unit"),console.log(`Unit warped from ${d},${u} to ${o},${c}`),i=!0}n++}}tryBuildStructure(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=this.gridX,r=this.gridZ,a=this.terrain.grid[n][r];if(a.hasBuilding||a.height>8)return;const o=window.game?window.game.totalPopulation:0;this.isSleeping=!1;const c=(n+1)%e,l=(r+1)%i,d=a,u=this.terrain.grid[c][r],f=this.terrain.grid[n][l],m=this.terrain.grid[c][l];if(d.hasBuilding||u.hasBuilding||f.hasBuilding||m.hasBuilding)return;const x=d.height,_=u.height,g=f.height,p=m.height,w=x===_&&x===g&&x===p&&x>0;let b=!1;if(w){const T=(n+2)%e,C=(r+2)%i,E=this.terrain.grid[T][r].height,R=this.terrain.grid[T][l].height,N=this.terrain.grid[T][C].height,y=this.terrain.grid[n][C].height,M=this.terrain.grid[c][C].height;x===E&&x===R&&x===N&&x===y&&x===M&&(b=!0)}if(b){let T=0;this.terrain.buildings.length>0&&this.terrain.buildings.forEach(E=>{E.userData.type==="castle"&&T++});const C=1e3*(T+1);if(o>=C){const E=window.game?window.game.resources:{grain:0,meat:0,fish:0};if(E.grain+E.meat+E.fish>200&&(console.log(`Castle Construction Attempt: Pop ${o} >= ${C}. Flatness verified (3x3).`),Math.random()<.2)){this.buildCastle();return}}}if(w){let T=0,C=0;this.terrain.buildings.forEach(M=>{M.type==="house"||M.userData&&M.userData.type==="house"?T++:(M.type==="farm"||M.userData&&M.userData.type==="farm")&&C++});let E=!1;const R=window.game?window.game.resources:{grain:0,meat:0,fish:0},N=R.grain+R.meat+R.fish;(N<100||R.grain<5)&&(E=!0);const y=N>5e3;!E&&!y&&C<Math.ceil(T/2)&&(E=!0),!E&&Math.random()<.2&&(E=!0),E?this.buildFarm(t)||(N>50?this.buildHouse(t):console.log("Starvation Mode: Aborted House construction due to Farm failure.")):this.buildHouse(t),this.lastTime=t,this.stagnationTimer=0,setTimeout(()=>{if(!this.isDead){const M=window.game?window.game.gameTotalTime:performance.now();this.moveRandomly(M)}},500)}else this.moveRandomly(t)}buildCastle(){this.terrain.logicalWidth,this.terrain.logicalDepth;const t=this.gridX,e=this.gridZ;this.terrain.addBuilding("castle",t,e),this.isFinished=!0,this.isDead=!0,console.log(`Unit entered castle at ${t}, ${e} and became a citizen.`)}static getBuildingAssets(){if(!xt.assets.buildings){xt.assets.buildings={},xt.assets.buildings.woodTexture=xt.createWoodTexture(),xt.assets.buildings.roofTexture=xt.createRoofTexture(),xt.assets.buildings.wallMat=new qt({map:xt.assets.buildings.woodTexture}),xt.assets.buildings.roofMat=new qt({map:xt.assets.buildings.roofTexture}),xt.assets.buildings.wallGeo=new he(.6,.4,.6),xt.assets.buildings.roofGeo=new wi(.5,.4,4),xt.assets.buildings.windowGeo=new Ai(.15,.15),xt.assets.buildings.windowMat=new In({color:0});const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#DAA520",e.fillRect(0,0,64,64),e.fillStyle="#B8860B";for(let n=0;n<10;n++)e.fillRect(n*6,0,2,64);xt.assets.buildings.wheatTexture=new Ze(t),xt.assets.buildings.farmMat=new qt({map:xt.assets.buildings.wheatTexture});const i=new Ai(.8,.8);i.rotateX(-Math.PI/2),xt.assets.buildings.farmGeo=i}return xt.assets.buildings}buildHouse(t){this.terrain.addBuilding("house",this.gridX,this.gridZ),console.log("House built at",this.gridX,this.gridZ),this.moveRandomly(t)}improveLand(t){if(!this.terrain.grid[this.gridX]||!this.terrain.grid[this.gridX][this.gridZ])return;const i=this.terrain.grid[this.gridX][this.gridZ].moisture||.5;let r=.5-i,a=r*.4;Math.abs(a)<.1&&Math.abs(r)>.01&&(a=r>0?.1:-.1),Math.abs(a)>Math.abs(r)&&(a=r),this.terrain.modifyMoisture(this.gridX,this.gridZ,a),console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${i.toFixed(2)} -> ${(i+a).toFixed(2)}`),this.moveRandomly(t)}buildFarm(t){this.terrain.getTileHeight(this.gridX,this.gridZ),this.terrain.logicalWidth,this.terrain.logicalDepth;let e=null;if(this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]&&(e=this.terrain.grid[this.gridX][this.gridZ]),e){const i=e.moisture||.5;let r=1-Math.abs(i-.5)*2.5;if(r<0&&(r=0),Math.random()>r)return console.log(`Farm construction failed due to soil conditions (Moisture: ${i.toFixed(2)}, Chance: ${(r*100).toFixed(0)}%). Improving Land.`),this.improveLand(t),!1}return this.terrain.addBuilding("farm",this.gridX,this.gridZ),this.moveRandomly(t),!0}static getCrossAssets(){return xt.assets.geometries.crossV||(xt.assets.geometries.crossV=new he(.2,1,.2),xt.assets.geometries.crossH=new he(.8,.2,.2)),xt.assets.geometries}createCross(){const t=new ai,e=xt.getCrossAssets(),i=new qt({color:16777215,transparent:!0,opacity:1}),n=new Zt(e.crossV,i);n.position.y=.5,t.add(n);const r=new Zt(e.crossH,i);r.position.y=.7,t.add(r);const a=this.getPositionForGrid(this.gridX,this.gridZ);t.position.copy(a),this.scene.add(t),this.crossMesh=t,this.deathTimer=0}updateDeathAnimation(t){if(!this.crossMesh)return;isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=3;if(this.deathTimer>=i)this.scene.remove(this.crossMesh),this.crossMesh.children.forEach(n=>{n.material&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(r=>{r.material.opacity=1-n})}}static createWoodTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#8B4513",e.fillRect(0,0,64,64),e.strokeStyle="#5D2906",e.lineWidth=2;for(let i=0;i<8;i++)e.beginPath(),e.moveTo(0,i*8+Math.random()*4),e.lineTo(64,i*8+Math.random()*4),e.stroke();return new Ze(t)}static createRoofTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#A52A2A",e.fillRect(0,0,64,64),e.fillStyle="#800000";for(let i=0;i<64;i+=8)for(let n=0;n<64;n+=8)(n+i)%16===0&&e.fillRect(n,i,7,7);return new Ze(t)}serialize(){return{gridX:this.gridX,gridZ:this.gridZ,age:this.age,lifespan:this.lifespan,isDead:this.isDead,isFinished:this.isFinished,isMoving:this.isMoving,targetX:this.targetX,targetZ:this.targetZ,moveStartTime:this.moveStartTime,startGridX:this.startGridX,startGridZ:this.startGridZ,targetGridX:this.targetGridX,targetGridZ:this.targetGridZ,isSpecial:this.isSpecial}}static deserialize(t,e,i){const n=new xt(e,i,t.gridX,t.gridZ,t.isSpecial);return n.age=t.age||20,typeof t.lifespan=="number"&&t.lifespan>0&&(n.lifespan=t.lifespan),t.lifespan&&(n.lifespan=t.lifespan),n.isDead=t.isDead||!1,n.isFinished=t.isFinished||!1,t.isMoving&&(n.isMoving=!0,n.targetX=t.targetX,n.targetZ=t.targetZ,n.isMoving=!1,n.gridX=t.targetGridX,n.gridZ=t.targetGridZ,n.updatePosition()),n.isDead&&(n.isFinished||n.createCross()),n}}const il={type:"change"},Ba={type:"start"},Fl={type:"end"},Us=new es,nl=new je,fm=Math.cos(70*Ic.DEG2RAD),Me=new I,Be=2*Math.PI,ne={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lr=1e-6;class pm extends bh{constructor(t,e=null){super(t,e),this.state=ne.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:An.ROTATE,MIDDLE:An.DOLLY,RIGHT:An.PAN},this.touches={ONE:wn.ROTATE,TWO:wn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new en,this._lastTargetPosition=new I,this._quat=new en().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Po,this._sphericalDelta=new Po,this._scale=1,this._panOffset=new I,this._rotateStart=new bt,this._rotateEnd=new bt,this._rotateDelta=new bt,this._panStart=new bt,this._panEnd=new bt,this._panDelta=new bt,this._dollyStart=new bt,this._dollyEnd=new bt,this._dollyDelta=new bt,this._dollyDirection=new I,this._mouse=new bt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=gm.bind(this),this._onPointerDown=mm.bind(this),this._onPointerUp=xm.bind(this),this._onContextMenu=Em.bind(this),this._onMouseWheel=Mm.bind(this),this._onKeyDown=Sm.bind(this),this._onTouchStart=bm.bind(this),this._onTouchMove=ym.bind(this),this._onMouseDown=_m.bind(this),this._onMouseMove=vm.bind(this),this._interceptControlDown=Tm.bind(this),this._interceptControlUp=wm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(il),this.update(),this.state=ne.NONE}update(t=null){const e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===ne.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Be:i>Math.PI&&(i-=Be),n<-Math.PI?n+=Be:n>Math.PI&&(n-=Be),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Me.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Us.origin.copy(this.object.position),Us.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Us.direction))<fm?this.object.lookAt(this.target):(nl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Us.intersectPlane(nl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Lr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lr||this._lastTargetPosition.distanceToSquared(this.target)>Lr?(this.dispatchEvent(il),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Be/60*this.autoRotateSpeed*t:Be/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;Me.copy(n).sub(this.target);let r=Me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Be*this._rotateDelta.x/e.clientHeight),this._rotateUp(Be*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Be*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Be*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Be*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Be*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,r=Math.sqrt(i*i+n*n);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(n,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Be*this._rotateDelta.x/e.clientHeight),this._rotateUp(Be*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,r=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new bt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function mm(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function gm(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function xm(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Fl),this.state=ne.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function _m(s){let t;switch(s.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case An.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ne.DOLLY;break;case An.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ne.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ne.ROTATE}break;case An.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ne.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ne.PAN}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(Ba)}function vm(s){switch(this.state){case ne.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ne.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ne.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Mm(s){this.enabled===!1||this.enableZoom===!1||this.state!==ne.NONE||(s.preventDefault(),this.dispatchEvent(Ba),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Fl))}function Sm(s){this.enabled!==!1&&this._handleKeyDown(s)}function bm(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case wn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ne.TOUCH_ROTATE;break;case wn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ne.TOUCH_PAN;break;default:this.state=ne.NONE}break;case 2:switch(this.touches.TWO){case wn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ne.TOUCH_DOLLY_PAN;break;case wn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ne.TOUCH_DOLLY_ROTATE;break;default:this.state=ne.NONE}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(Ba)}function ym(s){switch(this._trackPointer(s),this.state){case ne.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ne.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ne.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ne.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ne.NONE}}function Em(s){this.enabled!==!1&&s.preventDefault()}function Tm(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function wm(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Am{constructor(){this.prefix="god_game_save_"}save(t,e){try{const i=this.prefix+t,n={timestamp:Date.now(),data:e};return localStorage.setItem(i,JSON.stringify(n)),console.log(`Saved to slot ${t}. Verify:`,JSON.parse(localStorage.getItem(i))),!0}catch(i){return console.error("Save failed:",i),(i.name==="QuotaExceededError"||i.name==="NS_ERROR_DOM_QUOTA_REACHED")&&console.warn("LocalStorage Quota Exceeded!"),!1}}load(t){try{const e=this.prefix+t,i=localStorage.getItem(e);if(console.log(`Loading slot ${t}, Raw JSON:`,i?i.substring(0,50)+"...":"null"),!i)return null;const n=JSON.parse(i);return console.log(`Parsed Data for slot ${t}:`,n),n.data}catch(e){return console.error("Load failed:",e),null}}getSlots(){const t=[];for(let e=1;e<=5;e++){const i=this.prefix+e,n=localStorage.getItem(i);if(n)try{const r=JSON.parse(n);t.push({id:e,timestamp:r.timestamp,empty:!1})}catch{t.push({id:e,empty:!0})}else t.push({id:e,empty:!0})}return t}}class Cm{constructor(t,e,i){this.scene=t,this.clouds=[],this.cloudCount=30,this.spreadRadius=80;const n=512,r=512,a=document.createElement("canvas");a.width=n,a.height=r;const o=a.getContext("2d"),c=o.createImageData(n,r),l=c.data;for(let d=0;d<r;d++)for(let u=0;u<n;u++){const f=(u/n-.5)*2,m=(d/r-.5)*2,x=Math.sqrt(f*f+m*m),_=(Math.sin(f*3+m*2.5)+Math.cos(m*3.5-f*2.5))*.25+(Math.sin(f*8+m*6)+Math.cos(m*9-f*7))*.12+(Math.sin(f*18)+Math.cos(m*22))*.05,g=1-(x+_*1.5);let p=g<0?0:g>1?1:g*g*(3-2*g);const w=Math.max(0,1-Math.pow(x,4));p*=w;const b=(d*n+u)*4;l[b]=255,l[b+1]=255,l[b+2]=255,l[b+3]=Math.floor(Math.max(0,Math.min(1,p*.7))*255)}o.putImageData(c,0,0),this.texture=new Ze(a),this.texture.colorSpace=Xe,this.texture.minFilter=Fi,this.material=new bl({map:this.texture,transparent:!0,opacity:.9,color:16777215,depthWrite:!1,blending:Qi}),this.initClouds(),this.windSpeed=1,this.windDir=new I(1,0,.5).normalize()}initClouds(){for(let t=0;t<this.cloudCount;t++){const e=new ah(this.material),i=20+Math.random()*10,n=1.2+Math.random()*.6;e.scale.set(i*n,i,1),e.material=this.material.clone(),e.material.rotation=Math.random()*Math.PI*2,e.position.set((Math.random()-.5)*this.spreadRadius*2,20+Math.random()*10,(Math.random()-.5)*this.spreadRadius*2),this.scene.add(e),this.clouds.push(e)}}update(t,e){if(!e)return;const i=e.position.x,n=e.position.z,r=this.spreadRadius;for(const a of this.clouds){a.position.addScaledVector(this.windDir,this.windSpeed*t);let o=a.position.x-i,c=a.position.z-n;o>r?a.position.x-=r*2:o<-r&&(a.position.x+=r*2),c>r?a.position.z-=r*2:c<-r&&(a.position.z+=r*2)}}}class Ce{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ce.assets.initialized)return;const t=new wi(.05,.2,4);t.rotateX(Math.PI/2),Ce.assets.geometries.body=t;const e=new Fe,i=new Float32Array([0,0,0,.3,0,.1,0,0,.15]);e.setAttribute("position",new Ge(i,3)),e.computeVertexNormals(),Ce.assets.geometries.wing=e,Ce.assets.materials.body=new In({color:16777215}),Ce.assets.materials.wing=new In({color:15658734,side:Ke}),Ce.assets.initialized=!0}constructor(t,e,i,n){Ce.initAssets(),this.scene=t,this.terrainWidth=e,this.terrainDepth=i,this.clippingPlanes=n||[],this.birds=[],this.birdCount=20;const r=Ce.assets.materials;Object.values(r).forEach(a=>{a&&(a.clippingPlanes=this.clippingPlanes)}),this.initBirds()}initBirds(){for(let t=0;t<this.birdCount;t++){const e=new ai,i=new Zt(Ce.assets.geometries.body,Ce.assets.materials.body);e.add(i);const n=new Zt(Ce.assets.geometries.wing,Ce.assets.materials.wing);n.position.set(0,0,0),e.add(n);const r=new Zt(Ce.assets.geometries.wing,Ce.assets.materials.wing);r.position.set(0,0,0),r.scale.x=-1,e.add(r),e.userData.leftWing=n,e.userData.rightWing=r,e.position.set((Math.random()-.5)*this.terrainWidth,15+Math.random()*10,(Math.random()-.5)*this.terrainDepth);const a=2+Math.random()*2,o=Math.random()*Math.PI*2;e.userData.velocity=new I(Math.cos(o)*a,0,Math.sin(o)*a),e.userData.speed=a,e.userData.turnSpeed=.5+Math.random(),e.userData.flapOffset=Math.random()*100,this.scene.add(e),this.birds.push(e)}}update(t,e,i){this.birds.forEach(n=>{n.position.addScaledVector(n.userData.velocity,t);const r=this.terrainWidth/2,a=this.terrainDepth/2;n.position.x>r&&(n.position.x-=this.terrainWidth),n.position.x<-r&&(n.position.x+=this.terrainWidth),n.position.z>a&&(n.position.z-=this.terrainDepth),n.position.z<-a&&(n.position.z+=this.terrainDepth);let o=!0;if(i){const d=new oi(n.position,1);o=i.intersectsSphere(d)}if(!o){n.visible=!1;return}if(n.visible=!0,Math.random()<.01){const d=(Math.random()-.5)*2;n.userData.velocity.applyAxisAngle(new I(0,1,0),d*n.userData.turnSpeed*t)}n.lookAt(n.position.clone().add(n.userData.velocity));const l=Math.sin(e*15+n.userData.flapOffset)*.5;n.userData.leftWing.rotation.z=l,n.userData.rightWing.rotation.z=-l,Math.random()<.001&&window.game&&window.game.soundManager&&window.game.soundManager.playBirdSound(n.position)})}}class Ee{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Ee.assets.initialized||(Ee.assets.geometries.body=new he(.4,.3,.6),Ee.assets.geometries.head=new he(.25,.25,.3),Ee.assets.geometries.leg=new he(.1,.3,.1),Ee.assets.materials.body=new qt({color:16777215}),Ee.assets.materials.head=new qt({color:1118481}),Ee.assets.materials.leg=new qt({color:1118481}),Ee.assets.initialized=!0)}constructor(t,e,i){Ee.initAssets(),this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.sheeps=[],this.sheepCount=10;const n=Ee.assets.materials;Object.values(n).forEach(r=>{r&&(r.clippingPlanes=this.clippingPlanes)}),this.initSheeps()}removeSheep(t){this.terrain.unregisterEntity(t),this.scene.remove(t)}initSheeps(){for(let t=0;t<this.sheepCount;t++){const e=this.createSheep();this.spawnSheep(e),this.scene.add(e),this.sheeps.push({mesh:e,state:"idle",timer:Math.random()*5,targetX:0,targetZ:0})}}createSheep(){const t=new ai,e=new Zt(Ee.assets.geometries.body,Ee.assets.materials.body);e.position.y=.3,t.add(e);const i=new Zt(Ee.assets.geometries.head,Ee.assets.materials.head);i.position.set(0,.5,.35),t.add(i);const n=[{x:.1,z:.2},{x:-.1,z:.2},{x:.1,z:-.2},{x:-.1,z:-.2}],r=[];return n.forEach(a=>{const o=new Zt(Ee.assets.geometries.leg,Ee.assets.materials.leg);o.position.set(a.x,.15,a.z),t.add(o),r.push(o)}),t.userData.legs=r,t}spawnSheep(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,r=0;for(;!n&&r<100;){const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);if(this.terrain.getTileHeight(a,o)>.5){const l=this.getPositionForGrid(a,o);t.position.copy(l),t.userData.gridX=a,t.userData.gridZ=o,this.terrain.registerEntity(t,a,o,"sheep"),n=!0}r++}}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,r=this.terrain.getInterpolatedHeight(t,e);return new I(t-i/2+.5,r,e-n/2+.5)}update(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;this.sheeps.forEach((r,a)=>{const o=r.mesh;if(this.terrain.getTileHeight(o.userData.gridX,o.userData.gridZ)<=0){this.removeSheep(o),this.sheeps.splice(a,1);return}if(r.timer-=e,r.lastGridX||(r.lastGridX=o.userData.gridX,r.lastGridZ=o.userData.gridZ,r.stagnationTimer=0),r.lastGridX===o.userData.gridX&&r.lastGridZ===o.userData.gridZ?r.stagnationTimer+=e:(r.lastGridX=o.userData.gridX,r.lastGridZ=o.userData.gridZ,r.stagnationTimer=0),r.stagnationTimer>15&&(r.state="moving",r.timer=5,r.stagnationTimer=-Math.random()*5),r.timer<=0)if(Math.random()<.3||r.stagnationTimer<0){r.state="moving",r.timer=2+Math.random()*3;const l=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let u=l.length-1;u>0;u--){const f=Math.floor(Math.random()*(u+1));[l[u],l[f]]=[l[f],l[u]]}let d=!1;for(const u of l){let f=o.userData.gridX+u.x,m=o.userData.gridZ+u.z;f<0&&(f=i-1),f>=i&&(f=0),m<0&&(m=n-1),m>=n&&(m=0);const x=this.terrain.getTileHeight(f,m),_=this.terrain.getTileHeight(o.userData.gridX,o.userData.gridZ);if(x>0&&Math.abs(x-_)<=1){r.targetX=f,r.targetZ=m,d=!0;break}}d||(r.state="idle")}else r.state="idle",r.timer=1+Math.random()*2;if(r.state==="moving"&&r.targetX!==void 0){const l=this.getPositionForGrid(r.targetX,r.targetZ),d=o.position.clone(),u=l.clone().sub(d).normalize();if(d.distanceTo(l)<.1){o.position.copy(l);const x=o.userData.gridX,_=o.userData.gridZ;o.userData.gridX=r.targetX,o.userData.gridZ=r.targetZ,this.terrain.moveEntity(o,x,_,o.userData.gridX,o.userData.gridZ,"sheep"),r.state="idle",r.targetX=void 0}else{o.position.addScaledVector(u,2*e);const _=this.terrain.logicalWidth||80,g=this.terrain.logicalDepth||80,p=o.position.x+_/2-.5,w=o.position.z+g/2-.5;o.position.y=this.terrain.getInterpolatedHeight(p,w);const b=Math.atan2(u.x,u.z);o.rotation.y=b}const m=Math.sin(t*10)*.2;o.userData.legs&&(o.userData.legs[0].rotation.x=m,o.userData.legs[1].rotation.x=-m,o.userData.legs[2].rotation.x=-m,o.userData.legs[3].rotation.x=m)}else o.userData.legs&&o.userData.legs.forEach(l=>l.rotation.x=0)})}}class Rm{constructor(){this.context=null,this.masterGain=null,this.initialized=!1,this.camera=null,this.frustum=new is,this.projScreenMatrix=new Kt}init(t){if(this.camera=t,!this.context)try{const e=window.AudioContext||window.webkitAudioContext;this.context=new e,this.masterGain=this.context.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.context.destination),console.log("AudioContext created")}catch(e){console.error("Web Audio API not supported",e);return}try{const e=this.context.createBuffer(1,1,22050),i=this.context.createBufferSource();i.buffer=e,i.connect(this.context.destination),i.start(0)}catch(e){console.warn("Silent buffer unlock failed",e)}this.context.state!=="running"?this.context.resume().then(()=>{console.log("AudioContext resumed, state:",this.context.state),this.initialized=!0}).catch(e=>{console.error("AudioContext resume failed",e)}):this.initialized=!0}resumeContext(){this.context&&this.context.state!=="running"&&this.context.resume().then(()=>{console.log("AudioContext resumed by user gesture."),this.initialized=!0})}updateFrustum(){this.camera&&(this.camera.updateMatrixWorld(),this.projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projScreenMatrix))}isVisible(t){return!this.camera||!this.initialized?!0:(this.updateFrustum(),this.frustum.containsPoint(t))}getVolume(){if(!this.camera)return .5;const t=this.camera.zoom,e=.8;return .1+(t-e)/(4-e)*.9}playBirdSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=n=>{setTimeout(()=>{if(!this.context)return;const r=this.context.currentTime,a=this.context.createOscillator(),o=this.context.createGain();a.type="sine";const c=2500+Math.random()*200;a.frequency.setValueAtTime(c,r),a.frequency.exponentialRampToValueAtTime(c*.8,r+.1),a.connect(o),o.connect(this.masterGain),o.gain.setValueAtTime(0,r),o.gain.linearRampToValueAtTime(e*.4,r+.01),o.gain.exponentialRampToValueAtTime(.01,r+.15),a.start(r),a.stop(r+.15)},n)};i(0),i(200),i(400)}playSheepSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=this.context.currentTime,n=.6+Math.random()*.4,r=this.context.createOscillator();r.type="sawtooth";const a=350+Math.random()*40;r.frequency.setValueAtTime(a,i),r.frequency.exponentialRampToValueAtTime(a*.8,i+n);const o=this.context.createOscillator(),c=this.context.createGain();o.frequency.value=7+Math.random()*2,c.gain.setValueAtTime(.7,i);const l=this.context.createGain(),d=this.context.createGain();d.gain.value=1;const u=this.context.createGain();u.gain.value=.3,o.connect(u),u.connect(d.gain),o.start(i),o.stop(i+n);const f=this.context.createBiquadFilter();f.type="lowpass",f.frequency.value=1200,f.Q.value=1,r.connect(d),d.connect(f),f.connect(l),l.connect(this.masterGain),l.gain.setValueAtTime(0,i),l.gain.linearRampToValueAtTime(e*.6,i+.1),l.gain.linearRampToValueAtTime(e*.5,i+n*.6),l.gain.exponentialRampToValueAtTime(.01,i+n),r.start(i),r.stop(i+n)}}class Ot{static nextId=0;static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Ot.assets.initialized||(Ot.assets.geometries.torsoNormal=new he(.25,.3,.2),Ot.assets.geometries.torsoHob=new he(.35,.3,.2),Ot.assets.geometries.head=new he(.2,.2,.2),Ot.assets.geometries.ear=new wi(.05,.15,4),Ot.assets.geometries.arm=new he(.08,.25,.08),Ot.assets.geometries.leg=new he(.1,.25,.1),Ot.assets.geometries.club=new ns(.03,.05,.4,6),Ot.assets.geometries.crossV=new he(.2,.8,.2),Ot.assets.geometries.crossH=new he(.6,.2,.2),Ot.assets.materials.skinNormal=new qt({color:5614165}),Ot.assets.materials.clothesNormal=new qt({color:9127187}),Ot.assets.materials.skinHob=new qt({color:3368499}),Ot.assets.materials.clothesHob=new qt({color:2236962}),Ot.assets.materials.club=new qt({color:6636321}),Ot.assets.materials.cross=new qt({color:5614165,transparent:!0,opacity:1}),Ot.assets.initialized=!0)}constructor(t,e,i,n,r="normal"){Ot.initAssets(),this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.type=r,this.id=Ot.nextId++,(this.gridX===void 0||isNaN(this.gridX)||this.gridZ===void 0||isNaN(this.gridZ))&&console.error(`Goblin Created with INVALID COORDS: ${this.gridX},${this.gridZ}`),this.type==="hobgoblin"?(this.hp=50+Math.floor(Math.random()*20),this.maxHp=this.hp,this.lifespan=80+Math.random()*40,this.damage=20):(this.hp=20+Math.floor(Math.random()*10),this.maxHp=this.hp,this.lifespan=30+Math.random()*20,this.damage=10),this.age=0,this.isDead=!1,this.isFinished=!1,this.state="idle",this.targetUnit=null,this.targetBuilding=null,this.attackCooldown=0,this.attackRate=1,this.mesh=new ai,this.createMesh(),this.updatePosition(),this.scene.add(this.mesh),this.isMoving=!1,this.moveTimer=0,this.moveInterval=1600,this.lastTime=window.game&&window.game.gameTotalTime!==void 0?window.game.gameTotalTime:0,this.lastTime=window.game&&window.game.gameTotalTime!==void 0?window.game.gameTotalTime:0,this.baseMoveDuration=800,this.moveDuration=this.baseMoveDuration,this.terrain.registerEntity(this,this.gridX,this.gridZ,"goblin")}createMesh(){const t=this.type==="hobgoblin",e=t?Ot.assets.materials.skinHob:Ot.assets.materials.skinNormal,i=t?Ot.assets.materials.clothesHob:Ot.assets.materials.clothesNormal,n=t?Ot.assets.geometries.torsoHob:Ot.assets.geometries.torsoNormal;this.torso=new Zt(n,e),this.torso.position.y=.3,this.mesh.add(this.torso),this.head=new Zt(Ot.assets.geometries.head,e),this.head.position.y=.55,this.mesh.add(this.head);const r=new Zt(Ot.assets.geometries.ear,e);r.position.set(.12,.55,0),r.rotation.z=-Math.PI/2,this.mesh.add(r);const a=new Zt(Ot.assets.geometries.ear,e);a.position.set(-.12,.55,0),a.rotation.z=Math.PI/2,this.mesh.add(a),this.leftArm=new Zt(Ot.assets.geometries.arm,e),this.leftArm.position.set(.18,.3,0),this.mesh.add(this.leftArm),this.rightArm=new Zt(Ot.assets.geometries.arm,e),this.rightArm.position.set(-.18,.3,0),this.mesh.add(this.rightArm),this.leftLeg=new Zt(Ot.assets.geometries.leg,i),this.leftLeg.position.set(.08,.12,0),this.mesh.add(this.leftLeg),this.rightLeg=new Zt(Ot.assets.geometries.leg,i),this.rightLeg.position.set(-.08,.12,0),this.mesh.add(this.rightLeg),this.club=new Zt(Ot.assets.geometries.club,Ot.assets.materials.club),this.club.position.set(0,-.15,.1),this.club.rotation.x=Math.PI/2,this.rightArm.add(this.club),t&&this.mesh.scale.set(1.2,1.2,1.2)}updateLogic(t,e,i,n){if(this.isDead){this.updateDeathAnimation(e);return}if(this.age+=e,this.age>=this.lifespan){this.die();return}if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}this.attackCooldown-=e,this.isMoving||(this.findTarget(i,n),this.targetUnit&&this.targetUnit.isDead&&(this.targetUnit=null,this.chaseTimer=0),this.targetUnit?(this.chaseTimer=(this.chaseTimer||0)+e,this.chaseTimer>10?(this.targetUnit=null,this.chaseTimer=0,this.moveRandomly(t)):(this.moveToTarget(this.targetUnit.gridX,this.targetUnit.gridZ,t),this.getDistance(this.targetUnit.gridX,this.targetUnit.gridZ)<=1.8&&(this.attackUnit(this.targetUnit),this.chaseTimer=0))):this.targetBuilding?(this.moveToTarget(this.targetBuilding.userData.gridX,this.targetBuilding.userData.gridZ,t),this.getDistance(this.targetBuilding.userData.gridX,this.targetBuilding.userData.gridZ)<=2.5&&this.attackBuilding(this.targetBuilding)):t-this.lastTime>this.moveInterval&&(Math.random()<.05&&this.tryBuildHut(),this.moveRandomly(t),this.lastTime=t))}findTarget(t,e){const i=this.terrain.findBestTarget("unit",this.gridX,this.gridZ,10,(n,r)=>{if(n.isSleeping)return 1/0;const a=this.terrain.getTileHeight(n.gridX,n.gridZ);let o=r;return a>8&&(o+=20),o});if(this.targetUnit=i,!this.targetUnit){let n=null,r=20;for(const a of e){const o=Math.abs(a.userData.gridX-this.gridX),c=Math.abs(a.userData.gridZ-this.gridZ);if(o>r||c>r)continue;const l=this.getDistance(a.userData.gridX,a.userData.gridZ);l<r&&(r=l,n=a)}this.targetBuilding=n}}getDistance(t,e){const i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);return Math.sqrt(i*i+n*n)}moveToTarget(t,e,i){if(this.isMoving)return;const n=t-this.gridX,r=e-this.gridZ;let a=this.gridX,o=this.gridZ;Math.abs(n)>Math.abs(r)?a+=Math.sign(n):o+=Math.sign(r);const c=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;a<0&&(a=c-1),a>=c&&(a=0),o<0&&(o=l-1),o>=l&&(o=0),!(this.terrain.getTileHeight(a,o)<=0)&&this.startMove(a,o,i)}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let a=n.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[n[a],n[o]]=[n[o],n[a]]}const r=this.terrain.getTileHeight(this.gridX,this.gridZ);for(const a of n){let o=this.gridX+a.x,c=this.gridZ+a.z;o<0&&(o=e-1),o>=e&&(o=0),c<0&&(c=i-1),c>=i&&(c=0);const l=this.terrain.getTileHeight(o,c);if(Math.abs(l-r)<=2&&l>0){this.startMove(o,c,t);return}}this.lastTime=t}startMove(t,e,i){if(this.gridX===void 0||isNaN(this.gridX)){console.error(`Goblin ${this.id} startMove failed: Invalid gridX (${this.gridX})`),this.isMoving=!1;return}const n=this.terrain.getTileHeight(t,e);if(n>8?this.moveDuration=6e3:this.moveDuration=this.baseMoveDuration||800,Math.abs(n-currentH)>2){this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>5&&(this.targetBuilding=null,this.stuckCount=0,this.moveRandomly(i));return}this.stuckCount=0,this.isMoving=!0,this.moveStartTime=i,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=t,this.targetGridZ=e;let r=t-this.gridX,a=e-this.gridZ;const o=Math.atan2(r,a);this.mesh.rotation.y=o}updateMovement(t){if(!this.isMoving)return;const e=(t-this.moveStartTime)/this.moveDuration;if(e>=1)this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition();else{const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let r=this.startGridX,a=this.startGridZ,o=this.targetGridX,c=this.targetGridZ;o-r>i/2&&(r+=i),r-o>i/2&&(o+=i),c-a>n/2&&(a+=n),a-c>n/2&&(c+=n);const l=r+(o-r)*e,d=a+(c-a)*e;if(isNaN(l)||isNaN(d)){console.warn(`Goblin NaN detected. ID:${this.id} Time:${t} StartT:${this.moveStartTime} SX:${r} TX:${o} Prog:${e}`),this.isMoving=!1;return}const u=this.getPositionForGrid(l,d);this.mesh.position.copy(u);const f=Math.sin(e*Math.PI*4)*.5;this.leftArm.rotation.x=f,this.rightArm.rotation.x=-f,this.leftLeg.rotation.x=-f,this.rightLeg.rotation.x=f}}updatePosition(){const t=this._spatial?this._spatial.x:this.gridX,e=this._spatial?this._spatial.z:this.gridZ;this.terrain.moveEntity(this,t,e,this.gridX,this.gridZ,"goblin");const i=this.getPositionForGrid(this.gridX,this.gridZ);this.mesh.position.copy(i)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,r=this.terrain.getInterpolatedHeight(t,e);return new I(t-i/2+.5,r+.2,e-n/2+.5)}attackUnit(t){if(!(this.attackCooldown>0)){if(t.isDead){this.targetUnit=null;return}this.rightArm.rotation.x=-Math.PI/2,setTimeout(()=>{this.rightArm.rotation.x=0,!t.isDead&&this.getDistance(t.gridX,t.gridZ)<=2&&(t.takeDamage(this.damage),console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${t.hp}`),t.isDead&&window.game&&window.game.goblinManager&&window.game.goblinManager.increasePlunder())},200),this.attackCooldown=this.attackRate}}attackBuilding(t){if(this.attackCooldown>0)return;this.rightArm.rotation.x=-Math.PI/2,setTimeout(()=>{this.rightArm.rotation.x=0},200),t.userData.population===void 0&&(t.userData.population=10);const e=t.userData.type==="castle",i=t.userData.type==="farm";if(i&&t.userData.hp!==void 0)t.userData.hp-=1,console.log(`Goblin hit Farm! HP: ${t.userData.hp}`),t.userData.hp<=0&&this.destroyBuilding(t);else{const n=e?2:5;if(t.userData.population-=n,!i){const r=e?.5:.2,a=Math.floor(t.userData.population*r);a>0&&(this.takeDamage(a),console.log(`Goblin took ${a} retaliation damage from ${t.userData.type}!`))}t.userData.population<=0&&this.destroyBuilding(t)}this.attackCooldown=this.attackRate}destroyBuilding(t){this.terrain.removeBuilding(t),console.log("Building destroyed!"),window.game&&window.game.goblinManager&&window.game.goblinManager.increasePlunder()}takeDamage(t){this.isDead||(this.hp-=t,this.hp<=0&&this.die())}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.mesh.visible=!1,this.scene.remove(this.mesh),this.createCross())}createCross(){const t=new ai,e=new Zt(Ot.assets.geometries.crossV,Ot.assets.materials.cross);e.position.y=.4,t.add(e);const i=new Zt(Ot.assets.geometries.crossH,Ot.assets.materials.cross);i.position.y=.6,t.add(i);const n=this.getPositionForGrid(this.gridX,this.gridZ);t.position.copy(n),this.scene.add(t),this.crossMesh=t,this.deathTimer=0}updateDeathAnimation(t){if(!this.crossMesh)return;isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=3;if(this.deathTimer>=i)this.scene.remove(this.crossMesh),this.crossMesh.children.forEach(n=>{n.material&&n.userData.clonedMat&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(r=>{r.material&&(r.userData.clonedMat||(r.material=r.material.clone(),r.userData.clonedMat=!0),r.material.opacity=1-n)})}}tryBuildHut(){const t=this.gridX,e=this.gridZ;if(this.terrain.grid[t][e].hasBuilding)return;const i=this.terrain.getTileHeight(t,e);i>8||i<=0||(this.terrain.addBuilding("goblin_hut",t,e),console.log("Goblin built a Hut!"))}}class Dm{constructor(t,e,i,n){this.scene=t,this.terrain=e,this.unitManager=i,this.clippingPlanes=n||[],this.goblins=[],this.caves=[],this.spawnTimer=0,this.spawnInterval=2,this.plunderCount=0,Ot.initAssets();const r=Ot.assets.materials;Object.values(r).forEach(a=>{a&&(a.clippingPlanes=this.clippingPlanes)}),this.caveGroup=new ai,this.scene.add(this.caveGroup),this.generateCaves(),this.caves.length>0&&(console.log("GoblinManager: Force spawning Debug Goblin"),this.spawnGoblinAtCave(this.caves[0]))}generateCaves(){console.log("GoblinManager: Generation started...");const t=5,e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=0,r=0;for(;n<t&&r<1e3;){r++;const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);this.isValidCaveSpot(a,o)&&(this.createCave(a,o),n++)}console.log(`GoblinManager: Generated ${n} goblin caves after ${r} attempts.`)}isValidCaveSpot(t,e){const i=this.terrain.getTileHeight(t,e);return!(i<=2||i>10)}createCave(t,e){const i=this.terrain.getTileHeight(t,e),n=new $s(.4,8,8,0,Math.PI),r=new qt({color:2236962,clippingPlanes:this.clippingPlanes}),a=new Zt(n,r),o=this.terrain.logicalWidth||80,c=this.terrain.logicalDepth||80;a.position.set(t-o/2+.5,i,e-c/2+.5),a.rotation.x=-Math.PI/2,a.scale.set(1,.5,1),this.caveGroup.add(a),this.caves.push({mesh:a,gridX:t,gridZ:e,originalHeight:i,spawnCooldown:Math.random()*this.spawnInterval})}update(t,e,i,n,r=1){this.caves.forEach((l,d)=>{const u=this.terrain.getTileHeight(l.gridX,l.gridZ);if(u<=0||Math.abs(u-l.originalHeight)>1){this.scene.remove(l.mesh),this.caveGroup.remove(l.mesh),this.caves.splice(d,1);return}l.spawnCooldown-=e,l.spawnCooldown<=0&&this.goblins.length<50&&(this.spawnGoblinAtCave(l),l.spawnCooldown=this.spawnInterval+Math.random()*5)}),this.updateHuts(e);const a=this.terrain.buildings||[],o=Math.max(1,Math.floor(2/r));this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const c=this.frameCount%o;for(let l=this.goblins.length-1;l>=0;l--){const d=this.goblins[l];d.updateMovement&&d.updateMovement(t),l%o===c&&(d.updateLogic(t,e*o,n,a),d.isFinished&&this.goblins.splice(l,1))}}spawnGoblinAtCave(t){const e=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];e.sort(()=>Math.random()-.5);for(const i of e){const n=t.gridX+i.x,r=t.gridZ+i.z;if(this.terrain.getTileHeight(n,r)>0){this.spawnGoblin(n,r);return}}this.spawnGoblin(t.gridX,t.gridZ)}spawnGoblin(t,e){const n=Math.random()<.1?"hobgoblin":"normal",r=new Ot(this.scene,this.terrain,t,e,n);this.goblins.push(r),console.log("Goblin spawned at",t,e)}increasePlunder(){this.plunderCount++,console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount}`)}updateHuts(t){let e=.5;e+=this.plunderCount*.1,e>5&&(e=5),(this.terrain.buildings||[]).forEach(n=>{if(n.userData.type==="goblin_hut"&&(n.userData.population=(n.userData.population||0)+e*t,n.userData.population>=10)){n.userData.population-=10;const r={gridX:n.userData.gridX,gridZ:n.userData.gridZ};this.spawnGoblinAtCave(r),console.log("Goblin born from Hut!")}})}}class Ie{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ie.assets.initialized)return;const t=new $s(.12,8,8);t.scale(.4,.6,1.5),Ie.assets.geometries.body=t;const e=new wi(.1,.3,4);e.rotateX(-Math.PI/2),Ie.assets.geometries.tail=e,Ie.assets.materials.fish=new qt({color:4500223}),Ie.assets.initialized=!0}constructor(t,e,i,n){Ie.initAssets(),this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.isDead=!1,this.mesh=new ai;const r=new Zt(Ie.assets.geometries.body,Ie.assets.materials.fish);this.mesh.add(r);const a=new Zt(Ie.assets.geometries.tail,Ie.assets.materials.fish);a.position.z=-.3,this.mesh.add(a),this.scene.add(this.mesh),this.updatePosition(),this.moveTimer=0,this.moveInterval=500+Math.random()*1500,this.lastTime=performance.now(),this.isMoving=!1,this.targetGridX=i,this.targetGridZ=n,this.startGridX=i,this.startGridZ=n,this.moveStartTime=0,this.moveDuration=800,this.wiggleOffset=Math.random()*100,this.terrain.registerEntity(this,this.gridX,this.gridZ,"fish")}update(t,e,i=!0){if(this.isDead)return;if(this.terrain.getTileHeight(this.gridX,this.gridZ)>.5){this.die();return}if(this.isMoving){const r=(t-this.moveStartTime)/this.moveDuration;if(r>=1)this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition();else{const a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let c=this.startGridX,l=this.startGridZ,d=this.targetGridX,u=this.targetGridZ;d-c>a/2&&(c+=a),c-d>a/2&&(d+=a),u-l>o/2&&(l+=o),l-u>o/2&&(u+=o);const f=c+(d-c)*r,m=l+(u-l)*r,x=this.getPositionForGrid(f,m);if(this.mesh.position.copy(x),i){const _=Math.sin(t*.01+this.wiggleOffset)*.3;this.mesh.rotation.z=_}}}else if(t-this.lastTime>this.moveInterval&&(this.moveRandomly(t),this.lastTime=t),i){const r=Math.sin(t*.003+this.wiggleOffset)*.15;this.mesh.rotation.z=r}}updatePosition(){const t=this._spatial?this._spatial.x:this.gridX,e=this._spatial?this._spatial.z:this.gridZ;this.terrain.moveEntity(this,t,e,this.gridX,this.gridZ,"fish");const i=this.getPositionForGrid(this.gridX,this.gridZ);this.mesh.position.copy(i)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,r=-.2;return new I(t-i/2+.5,r,e-n/2+.5)}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let r=n.length-1;r>0;r--){const a=Math.floor(Math.random()*(r+1));[n[r],n[a]]=[n[a],n[r]]}for(const r of n){let a=this.gridX+r.x,o=this.gridZ+r.z;if(a<0&&(a=e-1),a>=e&&(a=0),o<0&&(o=i-1),o>=i&&(o=0),this.terrain.getTileHeight(a,o)<=.5){this.isMoving=!0,this.moveStartTime=t,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=a,this.targetGridZ=o;const l=Math.atan2(r.x,r.z);this.mesh.rotation.y=l;return}}Math.random()<.3&&(this.mesh.rotation.y+=(Math.random()-.5)*1)}die(){this.isDead=!0,this.terrain.unregisterEntity(this),this.scene.remove(this.mesh)}}class Pm{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.fishes=[],Ie.initAssets(),Ie.assets.materials.fish&&(Ie.assets.materials.fish.clippingPlanes=this.clippingPlanes),this.init()}init(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;this.fishes=[];for(let i=0;i<75;i++)this.spawnRandomFish(t,e);console.log("Spawned initial fish.")}spawnRandomFish(t,e){if(this.fishes.length>=75)return;let i=0;for(;i<10;){const n=Math.floor(Math.random()*t),r=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,r)<=.5){const o=new Ie(this.scene,this.terrain,n,r);this.fishes.push(o);return}i++}}update(t,e,i){for(let n=this.fishes.length-1;n>=0;n--){const r=this.fishes[n];if(i&&r.mesh){const a=new oi(r.mesh.position,1.5);i.intersectsSphere(a)?r.update(t,e,!0):r.update(t,e,!1)}else r.update(t,e,!0);r.isDead&&this.fishes.splice(n,1)}if(this.fishes.length<60){const n=this.terrain.logicalWidth||80,r=this.terrain.logicalDepth||80;Math.random()<.05&&this.spawnRandomFish(n,r)}}}class Lm{constructor(t){this.game=t,this.terrain=t.terrain,this.canvas=document.getElementById("minimap"),this.ctx=this.canvas.getContext("2d"),this.logicalW=this.terrain.logicalWidth,this.logicalD=this.terrain.logicalDepth,this.isDragging=!1,this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this))}onMouseDown(t){t.preventDefault(),t.stopPropagation(),t.target===this.canvas&&(this.isDragging=!0,this.game.controls&&(this.game.controls.enabled=!1),this.updateCameraFromMiniMap(t))}onMouseMove(t){this.isDragging&&(t.preventDefault(),t.stopPropagation(),this.updateCameraFromMiniMap(t))}onMouseUp(t){this.isDragging=!1,this.game.controls&&(this.game.controls.enabled=!0)}updateCameraFromMiniMap(t){const e=this.canvas.getBoundingClientRect(),i=t.clientX-e.left,n=t.clientY-e.top,r=this.game.terrain.logicalWidth,a=this.game.terrain.logicalDepth,o=i/this.canvas.width,c=n/this.canvas.height,l=o*r,d=c*a,u=l-r/2,f=d-a/2,m=this.game.camera,x=this.game.controls;if(x){const _=x.target.y,g=m.position.x-x.target.x,p=m.position.z-x.target.z,w=m.position.y-x.target.y;x.target.set(u,_,f),m.position.set(u+g,x.target.y+w,f+p),x.update()}}update(){if(!this.ctx)return;this.ctx.fillStyle="#000",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.canvas.width/this.logicalW,e=this.canvas.height/this.logicalD;this.imgData||(this.imgData=this.ctx.createImageData(this.canvas.width,this.canvas.height));const i=this.imgData,n=i.data,r=this.terrain.grid;for(let m=0;m<this.logicalW;m++)for(let x=0;x<this.logicalD;x++){const _=r[m][x],g=_.height,p=this.game.terrain._lastIsNight||!1,w=this.game.terrain.currentSeason||"Spring",b=_.noise,T=_.moisture||.5,C=this.terrain.getBiomeColor(g,T,b,p,w,m,x,!0),E=(x*160+m)*4;n[E]=C.r*255,n[E+1]=C.g*255,n[E+2]=C.b*255,n[E+3]=255}this.ctx.putImageData(i,0,0),this.ctx.fillStyle="blue",this.game.units.forEach(m=>{if(m.isDead)return;const x=Math.floor(m.gridX*t),_=Math.floor(m.gridZ*e);this.ctx.fillRect(x,_,2,2)}),this.ctx.fillStyle="red",this.game.goblinManager.goblins.forEach(m=>{if(m.isDead)return;const x=Math.floor(m.gridX*t),_=Math.floor(m.gridZ*e);this.ctx.fillRect(x,_,2,2)});const a=this.game.camera.position.x,o=this.game.camera.position.z;(a+this.logicalW/2)%this.logicalW;const c=a+this.logicalW/2,l=o+this.logicalD/2,d=c*t,u=l*e,f=30*t;this.ctx.strokeStyle="white",this.ctx.lineWidth=1,this.ctx.strokeRect(d-f,u-f,f*2,f*2)}}class Im{constructor(t){this.game=t,this.camera=t.camera,this.wrapper=document.createElement("div"),this.wrapper.id="compass-wrapper",this.wrapper.style.position="absolute",this.wrapper.style.top="60px",this.wrapper.style.left="180px",this.wrapper.style.width="60px",this.wrapper.style.height="60px",this.wrapper.style.pointerEvents="none",this.wrapper.style.zIndex="1000",this.canvas=document.createElement("canvas"),this.canvas.width=60,this.canvas.height=60,this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),document.body.appendChild(this.wrapper)}update(){if(!this.game.controls)return;const e=-this.game.controls.getAzimuthalAngle(),i=this.ctx,n=this.canvas.width,r=this.canvas.height,a=n/2,o=r/2,c=n/2-5;i.clearRect(0,0,n,r),i.save(),i.translate(a,o),i.rotate(e),i.strokeStyle="#8B4513",i.lineWidth=4,i.beginPath(),i.arc(0,0,c,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(210, 180, 140, 0.3)",i.fill(),i.fillStyle="#800000",i.beginPath(),i.moveTo(0,-c+5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.strokeStyle="#3e2723",i.lineWidth=1,i.stroke(),i.fillStyle="#D2691E",i.beginPath(),i.moveTo(0,c-5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.stroke(),i.restore(),i.save(),i.translate(a,o),i.rotate(e),i.font="bold 16px serif",i.fillStyle="#F5DEB3",i.textAlign="center",i.textBaseline="middle",i.fillText("N",0,-c+12),i.restore()}}class Um{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],xt.initAssets();const n=xt.assets.materials;Object.values(n).forEach(r=>{r&&(r.clippingPlanes=this.clippingPlanes)}),n.heads&&n.heads.forEach(r=>r.clippingPlanes=this.clippingPlanes),this.maxInstances=1e4,this.dummy=new _e,this.whiteMaterial=new qt({color:16777215,clippingPlanes:this.clippingPlanes}),this.skinMaterial=xt.assets.materials.limb,this.headMaterials=xt.assets.materials.heads,this.torsoMesh=new ji(xt.assets.geometries.torso,this.whiteMaterial,this.maxInstances),this.torsoMesh.instanceMatrix.setUsage($i),this.torsoMesh.frustumCulled=!1,this.scene.add(this.torsoMesh),this.headMesh=new ji(xt.assets.geometries.head,this.headMaterials,this.maxInstances),this.headMesh.instanceMatrix.setUsage($i),this.headMesh.frustumCulled=!1,this.scene.add(this.headMesh),this.leftArmMesh=new ji(xt.assets.geometries.arm,this.skinMaterial,this.maxInstances),this.leftArmMesh.instanceMatrix.setUsage($i),this.leftArmMesh.frustumCulled=!1,this.scene.add(this.leftArmMesh),this.rightArmMesh=new ji(xt.assets.geometries.arm,this.skinMaterial,this.maxInstances),this.rightArmMesh.instanceMatrix.setUsage($i),this.rightArmMesh.frustumCulled=!1,this.scene.add(this.rightArmMesh),this.leftLegMesh=new ji(xt.assets.geometries.leg,this.whiteMaterial,this.maxInstances),this.leftLegMesh.instanceMatrix.setUsage($i),this.leftLegMesh.frustumCulled=!1,this.scene.add(this.leftLegMesh),this.rightLegMesh=new ji(xt.assets.geometries.leg,this.whiteMaterial,this.maxInstances),this.rightLegMesh.instanceMatrix.setUsage($i),this.rightLegMesh.frustumCulled=!1,this.scene.add(this.rightLegMesh),this._scratchVector=new I,this._scratchSphere=new oi(new I,1),this._up=new I(0,1,0),this._neighborOffsets=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}]}update(t,e){if(!xt.assets.initialized)return;let i=0;const n=this.terrain.logicalWidth||80,r=this.terrain.logicalDepth||80;t.length>0&&Math.random()<.01;const a=new It(9127187),o=new It(255);for(const c of t){if(c.isDead||c.isSleeping||!c.position)continue;const l=9,d=c.isSpecial?o:a;for(let u=0;u<l&&!(i>=this.maxInstances);u++){let f=0,m=0;if(u>0){const w=this._neighborOffsets[u-1];f=w.x,m=w.z}const x=c.position.x+f*n,_=c.position.z+m*r,g=c.position.y,p=c.rotationY;e&&(this._scratchVector.set(x,g+.5,_),this._scratchSphere.center.copy(this._scratchVector),!e.intersectsSphere(this._scratchSphere))||(this.dummy.position.set(x,g+.4,_),this.dummy.rotation.set(0,p,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.torsoMesh.setMatrixAt(i,this.dummy.matrix),this.torsoMesh.setColorAt(i,d),this.dummy.position.set(x,g+.7,_),this.dummy.rotation.set(0,p,0),this.dummy.updateMatrix(),this.headMesh.setMatrixAt(i,this.dummy.matrix),this.dummy.position.set(.2,.4,0),this.dummy.position.applyAxisAngle(this._up,p),this.dummy.position.add(this._scratchVector.set(x,g,_)),this.dummy.rotation.set(c.limbs.leftArm.x,p,0),this.dummy.updateMatrix(),this.leftArmMesh.setMatrixAt(i,this.dummy.matrix),this.dummy.position.set(-.2,.4,0),this.dummy.position.applyAxisAngle(this._up,p),this.dummy.position.add(this._scratchVector.set(x,g,_)),this.dummy.rotation.set(c.limbs.rightArm.x,p,0),this.dummy.updateMatrix(),this.rightArmMesh.setMatrixAt(i,this.dummy.matrix),this.dummy.position.set(.1,.15,0),this.dummy.position.applyAxisAngle(this._up,p),this.dummy.position.add(this._scratchVector.set(x,g,_)),this.dummy.rotation.set(c.limbs.leftLeg.x,p,0),this.dummy.updateMatrix(),this.leftLegMesh.setMatrixAt(i,this.dummy.matrix),this.leftLegMesh.setColorAt(i,d),this.dummy.position.set(-.1,.15,0),this.dummy.position.applyAxisAngle(this._up,p),this.dummy.position.add(this._scratchVector.set(x,g,_)),this.dummy.rotation.set(c.limbs.rightLeg.x,p,0),this.dummy.updateMatrix(),this.rightLegMesh.setMatrixAt(i,this.dummy.matrix),this.rightLegMesh.setColorAt(i,d),i++)}}this.torsoMesh.count=i,this.headMesh.count=i,this.leftArmMesh.count=i,this.rightArmMesh.count=i,this.leftLegMesh.count=i,this.rightLegMesh.count=i,this.torsoMesh.frustumCulled=!1,this.headMesh.frustumCulled=!1,this.leftArmMesh.frustumCulled=!1,this.rightArmMesh.frustumCulled=!1,this.leftLegMesh.frustumCulled=!1,this.rightLegMesh.frustumCulled=!1,this.rightArmMesh.count=i,this.leftLegMesh.count=i,this.rightLegMesh.count=i,this.leftLegMesh.instanceColor.needsUpdate=!0,this.rightLegMesh.instanceColor.needsUpdate=!0,this.torsoMesh.instanceMatrix.needsUpdate=!0,this.torsoMesh.instanceColor.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.leftArmMesh.instanceMatrix.needsUpdate=!0,this.rightArmMesh.instanceMatrix.needsUpdate=!0,this.leftLegMesh.instanceMatrix.needsUpdate=!0,this.rightLegMesh.instanceMatrix.needsUpdate=!0}}class Fm{constructor(t,e,i){this.scene=t,this.terrain=e,this.terrainWidth=e.logicalWidth,this.terrainDepth=e.logicalDepth,this.clippingPlanes=i||[],this.MAX_INSTANCES=1e4,this.meshes={},this.initAssets(),this.initInstancedMeshes(),this._scratchVector=new I,this._scratchSphere=new oi(new I,2),this._dummy=new _e}initAssets(){this.assets={};const t={clippingPlanes:this.clippingPlanes,clipShadows:!0};this.assets.houseWallGeo=new he(.6,.4,.6),this.assets.houseWallGeo.translate(0,.2,0);const e=document.createElement("canvas");e.width=64,e.height=64;const i=e.getContext("2d"),n=document.createElement("canvas");n.width=64,n.height=64;const r=n.getContext("2d");i.fillStyle="#8B4513",i.fillRect(0,0,64,64),r.fillStyle="#000000",r.fillRect(0,0,64,64),i.strokeStyle="#5D2906",i.lineWidth=2;for(let b=0;b<8;b++)i.beginPath(),i.moveTo(0,b*8),i.lineTo(64,b*8),i.stroke();((b,T)=>{i.fillStyle="#222",i.fillRect(b-10,T-10,20,20),r.fillStyle="#FFFFFF",r.fillRect(b-8,T-8,16,16)})(32,32),this.assets.houseWallMat=new qt({...t,map:new Ze(e),emissiveMap:new Ze(n),emissive:16777215,emissiveIntensity:0}),this.assets.houseRoofGeo=new wi(.5,.4,4),this.assets.houseRoofGeo.translate(0,.6,0),this.assets.houseRoofGeo.rotateY(Math.PI/4);const o=document.createElement("canvas");o.width=64,o.height=64;const c=o.getContext("2d");c.fillStyle="#A52A2A",c.fillRect(0,0,64,64),c.fillStyle="#800000";for(let b=0;b<64;b+=8)for(let T=0;T<64;T+=8)(T+b)%16===0&&c.fillRect(T,b,7,7);this.assets.houseRoofMat=new qt({...t,map:new Ze(o)}),this.assets.farmGeo=new Ai(.8,.8),this.assets.farmGeo.rotateX(-Math.PI/2),this.assets.farmGeo.translate(0,.05,0);const l=document.createElement("canvas");l.width=64,l.height=64;const d=l.getContext("2d");d.fillStyle="#DAA520",d.fillRect(0,0,64,64),d.fillStyle="#B8860B";for(let b=0;b<10;b++)d.fillRect(b*6,0,2,64);this.assets.farmMat=new qt({...t,map:new Ze(l),side:Ke}),this.assets.castleKeepGeo=new he(1.6,1,1.6),this.assets.castleKeepGeo.translate(0,.5,0);const u=document.createElement("canvas");u.width=128,u.height=64;const f=u.getContext("2d"),m=document.createElement("canvas");m.width=128,m.height=64;const x=m.getContext("2d");f.fillStyle="#654321",f.fillRect(0,0,128,64),x.fillStyle="#000000",x.fillRect(0,0,128,64),f.fillStyle="#5A3A1A";for(let b=0;b<64;b+=16)for(let T=0;T<128;T+=16)(T+b)/16%2===0&&f.fillRect(T+1,b+1,14,14);const _=(b,T)=>{f.fillStyle="#111",f.fillRect(b-6,T-8,12,16),x.fillStyle="#FFFFFF",x.fillRect(b-4,T-6,8,12)};_(32,32),_(96,32),this.assets.castleKeepMat=new qt({...t,map:new Ze(u),emissiveMap:new Ze(m),emissive:0,emissiveIntensity:0}),this.assets.castleRoofGeo=new ns(.5,1.1,.6,4),this.assets.castleRoofGeo.translate(0,1.3,0),this.assets.castleRoofGeo.rotateY(Math.PI/4),this.assets.castleRoofGeo.rotateY(Math.PI/4),this.assets.castleRoofMat=new qt({...t,color:8388608}),this.assets.goblinHutGeo=new wi(.4,.6,6),this.assets.goblinHutGeo.translate(0,.3,0);const g=document.createElement("canvas");g.width=64,g.height=64;const p=g.getContext("2d");p.fillStyle="#654321",p.fillRect(0,0,64,64),p.fillStyle="#8B4513";for(let b=0;b<30;b++)p.fillRect(Math.random()*60,Math.random()*60,4,2);this.assets.goblinHutMat=new qt({...t,map:new Ze(g),color:11184810}),[this.assets.houseWallMat,this.assets.houseRoofMat,this.assets.farmMat,this.assets.castleKeepMat,this.assets.castleKeepMat,this.assets.castleRoofMat,this.assets.goblinHutMat].forEach(b=>{b&&(b.clippingPlanes=this.clippingPlanes,b.needsUpdate=!0)})}initInstancedMeshes(){const t=(e,i)=>{const n=new ji(e,i,this.MAX_INSTANCES);return n.instanceMatrix.setUsage($i),n.castShadow=!0,n.receiveShadow=!0,n.frustumCulled=!1,this.scene.add(n),n};this.meshes.houseWalls=t(this.assets.houseWallGeo,this.assets.houseWallMat),this.meshes.houseRoofs=t(this.assets.houseRoofGeo,this.assets.houseRoofMat),this.meshes.farms=t(this.assets.farmGeo,this.assets.farmMat),this.meshes.castleKeeps=t(this.assets.castleKeepGeo,this.assets.castleKeepMat),this.meshes.castleKeeps=t(this.assets.castleKeepGeo,this.assets.castleKeepMat),this.meshes.castleRoofs=t(this.assets.castleRoofGeo,this.assets.castleRoofMat),this.meshes.goblinHuts=t(this.assets.goblinHutGeo,this.assets.goblinHutMat)}update(t,e){if(!t)return;let i=0,n=0,r=0,a=0;const o=this._dummy,c=this.terrainWidth||80,l=this.terrainDepth||80,d=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}];for(const u of t){const f=u.gridX,m=u.gridZ,x=u.y||0,_=this.terrain.getVisualPosition(f,m,!0);for(const g of d){const p=g.x*c,w=g.z*l,b=_.x+p,T=_.z+w;if(!(e&&(this._scratchVector.set(b,x+.5,T),this._scratchSphere.center.copy(this._scratchVector),!e.intersectsSphere(this._scratchSphere))))if(o.position.set(b,x,T),o.rotation.set(0,u.rotation||0,0),o.scale.set(1,1,1),o.updateMatrix(),u.type==="house"&&i<this.MAX_INSTANCES)this.meshes.houseWalls.setMatrixAt(i,o.matrix),this.meshes.houseRoofs.setMatrixAt(i,o.matrix),i++;else if(u.type==="farm"&&n<this.MAX_INSTANCES)this.meshes.farms.setMatrixAt(n,o.matrix),n++;else if(u.type==="castle"&&r<this.MAX_INSTANCES){const C=b,E=T;o.position.set(C+1,x,E+1),o.updateMatrix(),this.meshes.castleKeeps.setMatrixAt(r,o.matrix),this.meshes.castleRoofs.setMatrixAt(r,o.matrix),r++,r++}else u.type==="goblin_hut"&&a<this.MAX_INSTANCES&&(this.meshes.goblinHuts.setMatrixAt(a,o.matrix),a++)}}this.meshes.houseWalls.count=i,this.meshes.houseRoofs.count=i,this.meshes.farms.count=n,this.meshes.castleKeeps.count=r,this.meshes.castleRoofs.count=r,this.meshes.goblinHuts.count=a,this.meshes.houseWalls.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceMatrix.needsUpdate=!0,this.meshes.farms.instanceMatrix.needsUpdate=!0,this.meshes.castleKeeps.instanceMatrix.needsUpdate=!0,this.meshes.castleRoofs.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceMatrix.needsUpdate=!0,this.meshes.castleRoofs.instanceMatrix.needsUpdate=!0}updateLighting(t){if(this._lastIsNight===t)return;this._lastIsNight=t;const e=t?1:0,i=t?16747520:0;this.assets.houseWallMat&&(this.assets.houseWallMat.emissive.setHex(i),this.assets.houseWallMat.emissiveIntensity=e,this.assets.houseWallMat.needsUpdate=!0),this.assets.castleKeepMat&&(this.assets.castleKeepMat.emissive.setHex(i),this.assets.castleKeepMat.emissiveIntensity=e,this.assets.castleKeepMat.needsUpdate=!0)}}class Nm{constructor(){console.log("Game constructor called"),this.saveManager=new Am,this.soundManager=new Rm,window.game=this,this.scene=new sh,this.scene.background=new It(8900331);const t=window.innerWidth/window.innerHeight,e=20;this.camera=new Oa(-e*t,e*t,e,-e,1,1e3),this.camera.position.set(20,20,20),this.camera.lookAt(this.scene.position),this.renderer=new hm({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.localClippingEnabled=!1,document.body.appendChild(this.renderer.domElement),this.controls=new pm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.screenSpacePanning=!1,this.controls.minZoom=.8,this.controls.maxZoom=4,this.controls.maxPolarAngle=Math.PI/2,this.clippingPlanes=[new je(new I(1,0,0),0),new je(new I(-1,0,0),0),new je(new I(0,0,1),0),new je(new I(0,0,-1),0)],this.renderer.clippingPlanes=[],this.renderer.localClippingEnabled=!0,this.setupLights(),this.terrain=new dm(this.scene,this.clippingPlanes),this.units=[],this.resources={grain:0,fish:0,meat:0},this.cloudManager=new Cm(this.scene,this.terrain.width,this.terrain.depth),this.birdManager=new Ce(this.scene,this.terrain.width,this.terrain.depth,this.clippingPlanes),this.sheepManager=new Ee(this.scene,this.terrain,this.clippingPlanes),this.goblinManager=new Dm(this.scene,this.terrain,this,this.clippingPlanes),this.fishManager=new Pm(this.scene,this.terrain,this.clippingPlanes),this.minimap=new Lm(this),this.compass=new Im(this),this.unitRenderer=new Um(this.scene,this.terrain,this.clippingPlanes),this.buildingRenderer=new Fm(this.scene,this.terrain,this.clippingPlanes),this.inputManager=new um(this.scene,this.camera,this.terrain,this.spawnUnit.bind(this),this.units,this.unitRenderer);let i=10,n=10,r=!1,a=0;const o=this.terrain.logicalWidth||80,c=this.terrain.logicalDepth||80;for(;!r&&a<1e3;){const d=Math.floor(Math.random()*o),u=Math.floor(Math.random()*c);this.terrain.getTileHeight(d,u)>1&&(i=d,n=u,r=!0),a++}if(this.spawnUnit(i,n,!0),r){const d=i-o/2,u=n-c/2;this.controls&&(this.controls.target.set(d,0,u),this.camera.position.set(d+20,20,u+20),this.controls.update())}this.statsDisplay=document.getElementById("stats-container"),window.addEventListener("resize",this.onWindowResize.bind(this)),this.lastTime=performance.now(),this.gameTime=8,this.gameTotalTime=0,this.timeScale=1,this.resources={grain:10,fish:10,meat:10};const l=()=>{this.soundManager.initialized||(this.soundManager.init(this.camera),window.removeEventListener("click",l),window.removeEventListener("touchstart",l),window.removeEventListener("touchend",l),window.removeEventListener("keydown",l))};window.addEventListener("click",l),window.addEventListener("touchstart",l),window.addEventListener("touchend",l),window.addEventListener("keydown",l),window.toggleDebugSpeed=()=>{const d=document.getElementById("debug-speed-btn");this.timeScale===1?(this.timeScale=10,console.log("Debug Speed: 10x"),d&&d.classList.add("active")):(this.timeScale=1,console.log("Debug Speed: 1x"),d&&d.classList.remove("active"))},window.addEventListener("keydown",d=>{if(d.key==="p"||d.key==="P"){const u=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex=((this.currentSeasonIndex||0)+1)%4;const f=u[this.currentSeasonIndex];console.log(`[DEBUG] Force Cycle Season: ${f}`),this.season=f,this.daysPassed=(this.daysPassed||0)+1,this.terrain&&this.terrain.setSeason(f);const m=document.getElementById("season-val");m&&(m.textContent=f)}}),this.timeScale=1,this.animate()}setupLights(){this.ambientLight=new vh(4210752),this.scene.add(this.ambientLight),this.directionalLight=new _h(16777215,1),this.directionalLight.position.set(10,20,10),this.scene.add(this.directionalLight)}spawnUnit(t,e,i=!1){const n=new xt(this.scene,this.terrain,t,e,i);this.units.push(n)}onWindowResize(){const t=window.innerWidth/window.innerHeight,e=20;this.camera.left=-e*t,this.camera.right=e*t,this.camera.top=e,this.camera.bottom=-e,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}updateEnvironment(t){this.gameTime+=t*(this.dayNightSpeed||.05),this.gameTime>=24&&(this.gameTime=0);let e=!1;return this.gameTime>=18||this.gameTime<6?(e=!0,this.scene.background.setHex(51),this.directionalLight.intensity=.2):(this.scene.background.setHex(8900331),this.directionalLight.intensity=1),e}updateSeasons(t){const i=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex===void 0&&(this.currentSeasonIndex=0);const n=this.gameTime/24;if(this.prevTimeOfDay===void 0&&(this.prevTimeOfDay=n),n<this.prevTimeOfDay&&(this.daysPassed=(this.daysPassed||0)+1,console.log(`New Day! Day ${this.daysPassed}. Season: ${i[this.currentSeasonIndex]}`),this.daysPassed%3===0)){this.currentSeasonIndex=(this.currentSeasonIndex+1)%4;const a=i[this.currentSeasonIndex];console.log(`Season Changed to: ${a}`),this.terrain&&this.terrain.setSeason(a)}this.prevTimeOfDay=n;const r=i[this.currentSeasonIndex];this.season!==r&&(console.log(`[DEBUG] Game.updateSeasons: Syncing season mismatch. Game:${this.season} -> ${r}`),this.season=r,this.terrain&&this.terrain.setSeason(this.season))}updateCameraControls(){this.controls&&this.controls.update();const t=this.camera.position.x,e=this.camera.position.z,i=30;this.clippingPlanes&&(this.clippingPlanes[0].constant=-(t-i),this.clippingPlanes[1].constant=t+i,this.clippingPlanes[2].constant=-(e-i),this.clippingPlanes[3].constant=e+i)}updateStats(){if(!this.statsDisplay)return;const t=this.terrain.totalHousingPop||0;this.totalPopulation=Math.floor(t)+this.units.length;const e=Math.floor(this.gameTime),i=Math.floor(this.gameTime%1*60),n=`${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")}`,a=this.gameTime>=18||this.gameTime<6?"🌙":"☀️";document.getElementById("time-val").innerText=`${n} ${a}`,document.getElementById("season-val").innerText=this.season||"Spring",document.getElementById("pop-val").innerText=Math.floor(this.totalPopulation||0),document.getElementById("active-val").innerText=this.units.length,document.getElementById("house-val").innerText=this.terrain.buildings.filter(o=>o.userData.type==="house").length,document.getElementById("castle-val").innerText=this.terrain.buildings.filter(o=>o.userData.type==="castle").length,document.getElementById("grain-val").innerText=Math.floor(this.resources.grain),document.getElementById("fish-val").innerText=Math.floor(this.resources.fish),document.getElementById("meat-val").innerText=Math.floor(this.resources.meat)}animate(){requestAnimationFrame(this.animate.bind(this));const t=performance.now();let e=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t,e*=this.timeScale||1,this.gameTotalTime+=e*1e3;const i=this.gameTotalTime,n=i/1e3;(!this.lastHeartbeat||t-this.lastHeartbeat>5e3)&&(this.lastHeartbeat=t);let r=!1;try{r=this.updateEnvironment(e),this.updateSeasons(e)}catch(d){console.error("Env/Season Error:",d)}try{this.updateCameraControls()}catch(d){console.error("Cam Error:",d)}try{this.updateStats()}catch(d){console.error("Stats Error:",d)}try{this.inputManager.update(e)}catch(d){console.error("Input Error:",d)}try{this.cloudManager.update(e,this.camera)}catch(d){console.error("Cloud Error:",d)}this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();const a=new is,o=new Kt;o.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),a.setFromProjectionMatrix(o);try{this.birdManager.update(e,n,a)}catch(d){console.error("Bird Error:",d)}try{this.sheepManager.update(n,e)}catch(d){console.error("Sheep Error:",d)}try{this.goblinManager.update(i,e,r,this.units,this.timeScale)}catch(d){console.error("Goblin Manager Error:",d)}try{this.fishManager.update(i,e,a)}catch(d){console.error("Fish Error:",d)}if(this.minimap)try{this.minimap.update()}catch(d){console.error("Minimap Error:",d)}if(this.compass)try{this.compass.update()}catch(d){console.error("Compass Error:",d)}this.inputManager&&this.inputManager.update(),this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const c=Math.max(1,Math.floor(4/this.timeScale)),l=this.frameCount%c;for(let d=this.units.length-1;d>=0;d--){const u=this.units[d];u.updateMovement&&u.updateMovement(i),d%c===l&&(u.updateLogic(i,e*c,r,this.goblinManager.goblins),u.isDead&&u.isFinished&&this.units.splice(d,1))}this.terrain.update(e,this.spawnUnit.bind(this),r),this.terrain.updateLights(this.gameTime),this.buildingRenderer&&this.buildingRenderer.updateLighting(r),this.unitRenderer&&this.unitRenderer.update(this.units,a),this.buildingRenderer&&this.buildingRenderer.update(this.terrain.buildings,a),this.renderer.render(this.scene,this.camera)}saveGame(t){if(!this.saveManager)return!1;const e={slotId:t,timestamp:Date.now(),resources:this.resources,gameTime:this.gameTime,currentSeasonIndex:this.currentSeasonIndex,daysPassed:this.daysPassed,terrain:this.terrain.serialize(),units:this.units.map(i=>i.serialize())};return console.log("Saving Game Data:",e),e.terrain||console.error("Save Error: Terrain data is missing!"),this.saveManager.save(t,e)}loadGame(t){if(!this.saveManager)return!1;const e=this.saveManager.load(t);if(!e)return console.error("Load Game Failed: No data for slot",t),!1;console.log("Load Game: Data found",e),this.resources=e.resources||{grain:0,fish:0,meat:0},this.gameTime=e.gameTime||8,this.currentSeasonIndex=e.currentSeasonIndex||0,this.daysPassed=e.daysPassed||0;const i=["Spring","Summer","Autumn","Winter"];this.season=i[this.currentSeasonIndex],this.terrain&&this.terrain.setSeason(this.season);try{console.log("Deserializing Terrain with:",e.terrain),this.terrain.deserialize(e.terrain)}catch(n){return console.error("Terrain deserialize failed:",n),!1}try{this.units.forEach(n=>{n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose())}),this.units=[]}catch(n){console.error("Unit cleanup failed:",n)}try{(e.units||[]).forEach(r=>{try{const a=xt.deserialize(r,this.scene,this.terrain);this.units.push(a)}catch(a){console.error("Failed to deserialize unit:",a,r)}})}catch(n){console.error("Unit restoration loop failed:",n)}return this.inputManager.units=this.units,console.log("Game loaded from slot",t),!0}}new Nm;
