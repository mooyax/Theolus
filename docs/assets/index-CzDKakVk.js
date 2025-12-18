(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const Ca="181",Rn={ROTATE:0,DOLLY:1,PAN:2},An={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$l=0,Ka=1,Yl=2,cl=1,jl=2,Ei=3,Hi=0,ze=1,Ye=2,Ai=0,tn=1,Nr=2,Ja=3,Qa=4,Kl=5,Ji=100,Jl=101,Ql=102,th=103,eh=104,ih=200,nh=201,sh=202,rh=203,Br=204,Or=205,ah=206,oh=207,lh=208,hh=209,ch=210,dh=211,uh=212,fh=213,ph=214,zr=0,Gr=1,kr=2,Dn=3,Hr=4,Vr=5,Wr=6,Xr=7,Da=0,mh=1,gh=2,Gi=0,xh=1,_h=2,Mh=3,vh=4,bh=5,yh=6,Sh=7,dl=300,Pn=301,In=302,Zr=303,qr=304,Ys=306,$r=1e3,wi=1001,Yr=1002,je=1003,Th=1004,os=1005,ei=1006,er=1007,Oi=1008,xi=1009,ul=1010,fl=1011,jn=1012,Pa=1013,en=1014,mi=1015,Fn=1016,Ia=1017,La=1018,Kn=1020,pl=35902,ml=35899,gl=1021,xl=1022,hi=1023,Jn=1026,Qn=1027,Ua=1028,Fa=1029,Na=1030,Ba=1031,Oa=1033,Ns=33776,Bs=33777,Os=33778,zs=33779,jr=35840,Kr=35841,Jr=35842,Qr=35843,ta=36196,ea=37492,ia=37496,na=37808,sa=37809,ra=37810,aa=37811,oa=37812,la=37813,ha=37814,ca=37815,da=37816,ua=37817,fa=37818,pa=37819,ma=37820,ga=37821,xa=36492,_a=36494,Ma=36495,va=36283,ba=36284,ya=36285,Sa=36286,Eh=3200,wh=3201,za=0,Ah=1,Bi="",$e="srgb",Ln="srgb-linear",Hs="linear",ee="srgb",ln=7680,to=519,Rh=512,Ch=513,Dh=514,_l=515,Ph=516,Ih=517,Lh=518,Uh=519,Ta=35044,Ze=35048,eo="300 es",gi=2e3,Vs=2001;function Ml(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ws(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Fh(){const r=Ws("canvas");return r.style.display="block",r}const io={};function Xs(...r){const t="THREE."+r.shift();console.log(t,...r)}function Lt(...r){const t="THREE."+r.shift();console.warn(t,...r)}function fe(...r){const t="THREE."+r.shift();console.error(t,...r)}function ts(...r){const t=r.join(" ");t in io||(io[t]=!0,Lt(...r))}function Nh(r,t,e){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}class rn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,a=n.length;s<a;s++)n[s].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gs=Math.PI/180,Ea=180/Math.PI;function ki(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ee[r&255]+Ee[r>>8&255]+Ee[r>>16&255]+Ee[r>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[i&255]+Ee[i>>8&255]+Ee[i>>16&255]+Ee[i>>24&255]).toLowerCase()}function kt(r,t,e){return Math.max(t,Math.min(e,r))}function Bh(r,t){return(r%t+t)%t}function ir(r,t,e){return(1-e)*r+e*t}function pi(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ie(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Oh={DEG2RAD:Gs};class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*n+t.x,this.y=s*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nn{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,a,o){let l=i[n+0],h=i[n+1],c=i[n+2],d=i[n+3],u=s[a+0],p=s[a+1],g=s[a+2],x=s[a+3];if(o<=0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=d;return}if(o>=1){t[e+0]=u,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==u||h!==p||c!==g){let m=l*u+h*p+c*g+d*x;m<0&&(u=-u,p=-p,g=-g,x=-x,m=-m);let f=1-o;if(m<.9995){const T=Math.acos(m),M=Math.sin(T);f=Math.sin(f*T)/M,o=Math.sin(o*T)/M,l=l*f+u*o,h=h*f+p*o,c=c*f+g*o,d=d*f+x*o}else{l=l*f+u*o,h=h*f+p*o,c=c*f+g*o,d=d*f+x*o;const T=1/Math.sqrt(l*l+h*h+c*c+d*d);l*=T,h*=T,c*=T,d*=T}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,s,a){const o=i[n],l=i[n+1],h=i[n+2],c=i[n+3],d=s[a],u=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+c*d+l*p-h*u,t[e+1]=l*g+c*u+h*d-o*p,t[e+2]=h*g+c*p+o*u-l*d,t[e+3]=c*g-o*d-l*u-h*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(i/2),c=o(n/2),d=o(s/2),u=l(i/2),p=l(n/2),g=l(s/2);switch(a){case"XYZ":this._x=u*c*d+h*p*g,this._y=h*p*d-u*c*g,this._z=h*c*g+u*p*d,this._w=h*c*d-u*p*g;break;case"YXZ":this._x=u*c*d+h*p*g,this._y=h*p*d-u*c*g,this._z=h*c*g-u*p*d,this._w=h*c*d+u*p*g;break;case"ZXY":this._x=u*c*d-h*p*g,this._y=h*p*d+u*c*g,this._z=h*c*g+u*p*d,this._w=h*c*d-u*p*g;break;case"ZYX":this._x=u*c*d-h*p*g,this._y=h*p*d+u*c*g,this._z=h*c*g-u*p*d,this._w=h*c*d+u*p*g;break;case"YZX":this._x=u*c*d+h*p*g,this._y=h*p*d+u*c*g,this._z=h*c*g-u*p*d,this._w=h*c*d-u*p*g;break;case"XZY":this._x=u*c*d-h*p*g,this._y=h*p*d-u*c*g,this._z=h*c*g+u*p*d,this._w=h*c*d+u*p*g;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],d=e[10],u=i+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-h)*p,this._z=(a-n)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(c-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(s+h)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(s-h)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(a-n)/p,this._x=(s+h)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=i*c+a*o+n*h-s*l,this._y=n*c+a*l+s*o-i*h,this._z=s*c+a*h+i*l-n*o,this._w=a*c-i*o-n*l-s*h,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,n=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){const h=Math.acos(o),c=Math.sin(h);l=Math.sin(l*h)/c,e=Math.sin(e*h)/c,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,i=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(no.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(no.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*n-o*i),c=2*(o*e-s*n),d=2*(s*i-a*e);return this.x=e+l*h+a*d-o*c,this.y=i+l*c+o*h-s*d,this.z=n+l*d+s*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-s*o,this.y=s*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return nr.copy(this).projectOnVector(t),this.sub(nr)}reflect(t){return this.sub(nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nr=new L,no=new nn;class Bt{constructor(t,e,i,n,s,a,o,l,h){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,l,h)}set(t,e,i,n,s,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=n,c[2]=o,c[3]=e,c[4]=s,c[5]=l,c[6]=i,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],h=i[1],c=i[4],d=i[7],u=i[2],p=i[5],g=i[8],x=n[0],m=n[3],f=n[6],T=n[1],M=n[4],E=n[7],w=n[2],b=n[5],A=n[8];return s[0]=a*x+o*T+l*w,s[3]=a*m+o*M+l*b,s[6]=a*f+o*E+l*A,s[1]=h*x+c*T+d*w,s[4]=h*m+c*M+d*b,s[7]=h*f+c*E+d*A,s[2]=u*x+p*T+g*w,s[5]=u*m+p*M+g*b,s[8]=u*f+p*E+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-i*s*c+i*o*l+n*s*h-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=c*a-o*h,u=o*l-c*s,p=h*s-a*l,g=e*d+i*u+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(n*h-c*i)*x,t[2]=(o*i-n*a)*x,t[3]=u*x,t[4]=(c*e-n*l)*x,t[5]=(n*s-o*e)*x,t[6]=p*x,t[7]=(i*l-h*e)*x,t[8]=(a*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,a,o){const l=Math.cos(s),h=Math.sin(s);return this.set(i*l,i*h,-i*(l*a+h*o)+a+t,-n*h,n*l,-n*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(sr.makeScale(t,e)),this}rotate(t){return this.premultiply(sr.makeRotation(-t)),this}translate(t,e){return this.premultiply(sr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const sr=new Bt,so=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ro=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zh(){const r={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(n,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ee&&(n.r=Ri(n.r),n.g=Ri(n.g),n.b=Ri(n.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(n.r=Cn(n.r),n.g=Cn(n.g),n.b=Cn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Bi?Hs:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,a){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[Ln]:{primaries:t,whitePoint:i,transfer:Hs,toXYZ:so,fromXYZ:ro,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:i,transfer:ee,toXYZ:so,fromXYZ:ro,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),r}const $t=zh();function Ri(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Cn(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hn;class Gh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{hn===void 0&&(hn=Ws("canvas")),hn.width=t.width,hn.height=t.height;const n=hn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=hn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ws("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let a=0;a<s.length;a++)s[a]=Ri(s[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ri(e[i]/255)*255):e[i]=Ri(e[i]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let kh=0;class Ga{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?s.push(rr(n[a].image)):s.push(rr(n[a]))}else s=rr(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function rr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Gh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let Hh=0;const ar=new L;class Ce extends rn{constructor(t=Ce.DEFAULT_IMAGE,e=Ce.DEFAULT_MAPPING,i=wi,n=wi,s=ei,a=Oi,o=hi,l=xi,h=Ce.DEFAULT_ANISOTROPY,c=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=ki(),this.name="",this.source=new Ga(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ar).x}get height(){return this.source.getSize(ar).y}get depth(){return this.source.getSize(ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $r:t.x=t.x-Math.floor(t.x);break;case wi:t.x=t.x<0?0:1;break;case Yr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $r:t.y=t.y-Math.floor(t.y);break;case wi:t.y=t.y<0?0:1;break;case Yr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ce.DEFAULT_IMAGE=null;Ce.DEFAULT_MAPPING=dl;Ce.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,n=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const l=t.elements,h=l[0],c=l[4],d=l[8],u=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(c-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(h+1)/2,E=(p+1)/2,w=(f+1)/2,b=(c+u)/4,A=(d+x)/4,D=(g+m)/4;return M>E&&M>w?M<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(M),n=b/i,s=A/i):E>w?E<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(E),i=b/n,s=D/n):w<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(w),i=A/s,n=D/s),this.set(i,n,s,e),this}let T=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-c)*(u-c));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(d-x)/T,this.z=(u-c)/T,this.w=Math.acos((h+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vh extends rn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new Ce(n);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ei,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Ga(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Vh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class vl extends Ce{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=je,this.minFilter=je,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wh extends Ce{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=je,this.minFilter=je,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class an{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ri.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ri.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ri.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ri):ri.fromBufferAttribute(s,a),ri.applyMatrix4(t.matrixWorld),this.expandByPoint(ri);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ls.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(t.matrixWorld),this.union(ls)}const n=t.children;for(let s=0,a=n.length;s<a;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ri),ri.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(On),hs.subVectors(this.max,On),cn.subVectors(t.a,On),dn.subVectors(t.b,On),un.subVectors(t.c,On),Pi.subVectors(dn,cn),Ii.subVectors(un,dn),Zi.subVectors(cn,un);let e=[0,-Pi.z,Pi.y,0,-Ii.z,Ii.y,0,-Zi.z,Zi.y,Pi.z,0,-Pi.x,Ii.z,0,-Ii.x,Zi.z,0,-Zi.x,-Pi.y,Pi.x,0,-Ii.y,Ii.x,0,-Zi.y,Zi.x,0];return!or(e,cn,dn,un,hs)||(e=[1,0,0,0,1,0,0,0,1],!or(e,cn,dn,un,hs))?!1:(cs.crossVectors(Pi,Ii),e=[cs.x,cs.y,cs.z],or(e,cn,dn,un,hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ri).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ri).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Mi=[new L,new L,new L,new L,new L,new L,new L,new L],ri=new L,ls=new an,cn=new L,dn=new L,un=new L,Pi=new L,Ii=new L,Zi=new L,On=new L,hs=new L,cs=new L,qi=new L;function or(r,t,e,i,n){for(let s=0,a=r.length-3;s<=a;s+=3){qi.fromArray(r,s);const o=n.x*Math.abs(qi.x)+n.y*Math.abs(qi.y)+n.z*Math.abs(qi.z),l=t.dot(qi),h=e.dot(qi),c=i.dot(qi);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Xh=new an,zn=new L,lr=new L;class ni{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Xh.setFromPoints(t).getCenter(i);let n=0;for(let s=0,a=t.length;s<a;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zn.subVectors(t,this.center);const e=zn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(zn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zn.copy(t.center).add(lr)),this.expandByPoint(zn.copy(t.center).sub(lr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const vi=new L,hr=new L,ds=new L,Li=new L,cr=new L,us=new L,dr=new L;class is{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){hr.copy(t).add(e).multiplyScalar(.5),ds.copy(e).sub(t).normalize(),Li.copy(this.origin).sub(hr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ds),o=Li.dot(this.direction),l=-Li.dot(ds),h=Li.lengthSq(),c=Math.abs(1-a*a);let d,u,p,g;if(c>0)if(d=a*l-o,u=a*o-l,g=s*c,d>=0)if(u>=-g)if(u<=g){const x=1/c;d*=x,u*=x,p=d*(d+a*u+2*o)+u*(a*d+u+2*l)+h}else u=s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+h;else u=-s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+h;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+h):u<=g?(d=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+h):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+u*(u+2*l)+h);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*l)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(hr).addScaledVector(ds,u),p}intersectSphere(t,e){vi.subVectors(t.center,this.origin);const i=vi.dot(this.direction),n=vi.dot(vi)-i*i,s=t.radius*t.radius;if(n>s)return null;const a=Math.sqrt(s-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,u=this.origin;return h>=0?(i=(t.min.x-u.x)*h,n=(t.max.x-u.x)*h):(i=(t.max.x-u.x)*h,n=(t.min.x-u.x)*h),c>=0?(s=(t.min.y-u.y)*c,a=(t.max.y-u.y)*c):(s=(t.max.y-u.y)*c,a=(t.min.y-u.y)*c),i>a||s>n||((s>i||isNaN(i))&&(i=s),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,i,n,s){cr.subVectors(e,t),us.subVectors(i,t),dr.crossVectors(cr,us);let a=this.direction.dot(dr),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Li.subVectors(this.origin,t);const l=o*this.direction.dot(us.crossVectors(Li,us));if(l<0)return null;const h=o*this.direction.dot(cr.cross(Li));if(h<0||l+h>a)return null;const c=-o*Li.dot(dr);return c<0?null:this.at(c/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,i,n,s,a,o,l,h,c,d,u,p,g,x,m){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,l,h,c,d,u,p,g,x,m)}set(t,e,i,n,s,a,o,l,h,c,d,u,p,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=n,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=h,f[6]=c,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/fn.setFromMatrixColumn(t,0).length(),s=1/fn.setFromMatrixColumn(t,1).length(),a=1/fn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),h=Math.sin(n),c=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=a*c,p=a*d,g=o*c,x=o*d;e[0]=l*c,e[4]=-l*d,e[8]=h,e[1]=p+g*h,e[5]=u-x*h,e[9]=-o*l,e[2]=x-u*h,e[6]=g+p*h,e[10]=a*l}else if(t.order==="YXZ"){const u=l*c,p=l*d,g=h*c,x=h*d;e[0]=u+x*o,e[4]=g*o-p,e[8]=a*h,e[1]=a*d,e[5]=a*c,e[9]=-o,e[2]=p*o-g,e[6]=x+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*c,p=l*d,g=h*c,x=h*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*c,e[9]=x-u*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*c,p=a*d,g=o*c,x=o*d;e[0]=l*c,e[4]=g*h-p,e[8]=u*h+x,e[1]=l*d,e[5]=x*h+u,e[9]=p*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,p=a*h,g=o*l,x=o*h;e[0]=l*c,e[4]=x-u*d,e[8]=g*d+p,e[1]=d,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=p*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*l,p=a*h,g=o*l,x=o*h;e[0]=l*c,e[4]=-d,e[8]=h*c,e[1]=u*d+x,e[5]=a*c,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*c,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zh,t,qh)}lookAt(t,e,i){const n=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Ui.crossVectors(i,Ve),Ui.lengthSq()===0&&(Math.abs(i.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Ui.crossVectors(i,Ve)),Ui.normalize(),fs.crossVectors(Ve,Ui),n[0]=Ui.x,n[4]=fs.x,n[8]=Ve.x,n[1]=Ui.y,n[5]=fs.y,n[9]=Ve.y,n[2]=Ui.z,n[6]=fs.z,n[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],h=i[12],c=i[1],d=i[5],u=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],T=i[3],M=i[7],E=i[11],w=i[15],b=n[0],A=n[4],D=n[8],v=n[12],y=n[1],C=n[5],U=n[9],O=n[13],H=n[2],W=n[6],q=n[10],J=n[14],k=n[3],et=n[7],it=n[11],yt=n[15];return s[0]=a*b+o*y+l*H+h*k,s[4]=a*A+o*C+l*W+h*et,s[8]=a*D+o*U+l*q+h*it,s[12]=a*v+o*O+l*J+h*yt,s[1]=c*b+d*y+u*H+p*k,s[5]=c*A+d*C+u*W+p*et,s[9]=c*D+d*U+u*q+p*it,s[13]=c*v+d*O+u*J+p*yt,s[2]=g*b+x*y+m*H+f*k,s[6]=g*A+x*C+m*W+f*et,s[10]=g*D+x*U+m*q+f*it,s[14]=g*v+x*O+m*J+f*yt,s[3]=T*b+M*y+E*H+w*k,s[7]=T*A+M*C+E*W+w*et,s[11]=T*D+M*U+E*q+w*it,s[15]=T*v+M*O+E*J+w*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],d=t[6],u=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+s*l*d-n*h*d-s*o*u+i*h*u+n*o*p-i*l*p)+x*(+e*l*p-e*h*u+s*a*u-n*a*p+n*h*c-s*l*c)+m*(+e*h*d-e*o*p-s*a*d+i*a*p+s*o*c-i*h*c)+f*(-n*o*c-e*l*d+e*o*u+n*a*d-i*a*u+i*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=t[9],u=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],T=d*m*h-x*u*h+x*l*p-o*m*p-d*l*f+o*u*f,M=g*u*h-c*m*h-g*l*p+a*m*p+c*l*f-a*u*f,E=c*x*h-g*d*h+g*o*p-a*x*p-c*o*f+a*d*f,w=g*d*l-c*x*l-g*o*u+a*x*u+c*o*m-a*d*m,b=e*T+i*M+n*E+s*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return t[0]=T*A,t[1]=(x*u*s-d*m*s-x*n*p+i*m*p+d*n*f-i*u*f)*A,t[2]=(o*m*s-x*l*s+x*n*h-i*m*h-o*n*f+i*l*f)*A,t[3]=(d*l*s-o*u*s-d*n*h+i*u*h+o*n*p-i*l*p)*A,t[4]=M*A,t[5]=(c*m*s-g*u*s+g*n*p-e*m*p-c*n*f+e*u*f)*A,t[6]=(g*l*s-a*m*s-g*n*h+e*m*h+a*n*f-e*l*f)*A,t[7]=(a*u*s-c*l*s+c*n*h-e*u*h-a*n*p+e*l*p)*A,t[8]=E*A,t[9]=(g*d*s-c*x*s-g*i*p+e*x*p+c*i*f-e*d*f)*A,t[10]=(a*x*s-g*o*s+g*i*h-e*x*h-a*i*f+e*o*f)*A,t[11]=(c*o*s-a*d*s-c*i*h+e*d*h+a*i*p-e*o*p)*A,t[12]=w*A,t[13]=(c*x*n-g*d*n+g*i*u-e*x*u-c*i*m+e*d*m)*A,t[14]=(g*o*n-a*x*n-g*i*l+e*x*l+a*i*m-e*o*m)*A,t[15]=(a*d*n-c*o*n+c*i*l-e*d*l-a*i*u+e*o*u)*A,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,h=s*a,c=s*o;return this.set(h*a+i,h*o-n*l,h*l+n*o,0,h*o+n*l,c*o+i,c*l-n*a,0,h*l-n*o,c*l+n*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,a){return this.set(1,i,s,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,h=s+s,c=a+a,d=o+o,u=s*h,p=s*c,g=s*d,x=a*c,m=a*d,f=o*d,T=l*h,M=l*c,E=l*d,w=i.x,b=i.y,A=i.z;return n[0]=(1-(x+f))*w,n[1]=(p+E)*w,n[2]=(g-M)*w,n[3]=0,n[4]=(p-E)*b,n[5]=(1-(u+f))*b,n[6]=(m+T)*b,n[7]=0,n[8]=(g+M)*A,n[9]=(m-T)*A,n[10]=(1-(u+x))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=fn.set(n[0],n[1],n[2]).length();const a=fn.set(n[4],n[5],n[6]).length(),o=fn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],ai.copy(this);const h=1/s,c=1/a,d=1/o;return ai.elements[0]*=h,ai.elements[1]*=h,ai.elements[2]*=h,ai.elements[4]*=c,ai.elements[5]*=c,ai.elements[6]*=c,ai.elements[8]*=d,ai.elements[9]*=d,ai.elements[10]*=d,e.setFromRotationMatrix(ai),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,n,s,a,o=gi,l=!1){const h=this.elements,c=2*s/(e-t),d=2*s/(i-n),u=(e+t)/(e-t),p=(i+n)/(i-n);let g,x;if(l)g=s/(a-s),x=a*s/(a-s);else if(o===gi)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Vs)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=c,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=d,h[9]=p,h[13]=0,h[2]=0,h[6]=0,h[10]=g,h[14]=x,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,n,s,a,o=gi,l=!1){const h=this.elements,c=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),p=-(i+n)/(i-n);let g,x;if(l)g=1/(a-s),x=a/(a-s);else if(o===gi)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===Vs)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=c,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=d,h[9]=0,h[13]=p,h[2]=0,h[6]=0,h[10]=g,h[14]=x,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fn=new L,ai=new Kt,Zh=new L(0,0,0),qh=new L(1,1,1),Ui=new L,fs=new L,Ve=new L,ao=new Kt,oo=new nn;class di{constructor(t=0,e=0,i=0,n=di.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],a=n[4],o=n[8],l=n[1],h=n[5],c=n[9],d=n[2],u=n[6],p=n[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-kt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ao.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ao,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oo.setFromEuler(this),this.setFromQuaternion(oo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class ka{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let $h=0;const lo=new L,pn=new nn,bi=new Kt,ps=new L,Gn=new L,Yh=new L,jh=new nn,ho=new L(1,0,0),co=new L(0,1,0),uo=new L(0,0,1),fo={type:"added"},Kh={type:"removed"},mn={type:"childadded",child:null},ur={type:"childremoved",child:null};class xe extends rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new L,e=new di,i=new nn,n=new L(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Bt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return pn.setFromAxisAngle(t,e),this.quaternion.multiply(pn),this}rotateOnWorldAxis(t,e){return pn.setFromAxisAngle(t,e),this.quaternion.premultiply(pn),this}rotateX(t){return this.rotateOnAxis(ho,t)}rotateY(t){return this.rotateOnAxis(co,t)}rotateZ(t){return this.rotateOnAxis(uo,t)}translateOnAxis(t,e){return lo.copy(t).applyQuaternion(this.quaternion),this.position.add(lo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ho,t)}translateY(t){return this.translateOnAxis(co,t)}translateZ(t){return this.translateOnAxis(uo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ps.copy(t):ps.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Gn,ps,this.up):bi.lookAt(ps,Gn,this.up),this.quaternion.setFromRotationMatrix(bi),n&&(bi.extractRotation(n.matrixWorld),pn.setFromRotationMatrix(bi),this.quaternion.premultiply(pn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(fo),mn.child=t,this.dispatchEvent(mn),mn.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Kh),ur.child=t,this.dispatchEvent(ur),ur.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(fo),mn.child=t,this.dispatchEvent(mn),mn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,t,Yh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,jh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const d=l[h];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(s(t.materials,this.material[l]));n.material=o}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}xe.DEFAULT_UP=new L(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const oi=new L,yi=new L,fr=new L,Si=new L,gn=new L,xn=new L,po=new L,pr=new L,mr=new L,gr=new L,xr=new ge,_r=new ge,Mr=new ge;class ti{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),oi.subVectors(t,e),n.cross(oi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){oi.subVectors(n,e),yi.subVectors(i,e),fr.subVectors(t,e);const a=oi.dot(oi),o=oi.dot(yi),l=oi.dot(fr),h=yi.dot(yi),c=yi.dot(fr),d=a*h-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,p=(h*l-o*c)*u,g=(a*c-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(t,e,i,n,s,a,o,l){return this.getBarycoord(t,e,i,n,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Si.x),l.addScaledVector(a,Si.y),l.addScaledVector(o,Si.z),l)}static getInterpolatedAttribute(t,e,i,n,s,a){return xr.setScalar(0),_r.setScalar(0),Mr.setScalar(0),xr.fromBufferAttribute(t,e),_r.fromBufferAttribute(t,i),Mr.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(xr,s.x),a.addScaledVector(_r,s.y),a.addScaledVector(Mr,s.z),a}static isFrontFacing(t,e,i,n){return oi.subVectors(i,e),yi.subVectors(t,e),oi.cross(yi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return oi.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),oi.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ti.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ti.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return ti.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return ti.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ti.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let a,o;gn.subVectors(n,i),xn.subVectors(s,i),pr.subVectors(t,i);const l=gn.dot(pr),h=xn.dot(pr);if(l<=0&&h<=0)return e.copy(i);mr.subVectors(t,n);const c=gn.dot(mr),d=xn.dot(mr);if(c>=0&&d<=c)return e.copy(n);const u=l*d-c*h;if(u<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(i).addScaledVector(gn,a);gr.subVectors(t,s);const p=gn.dot(gr),g=xn.dot(gr);if(g>=0&&p<=g)return e.copy(s);const x=p*h-l*g;if(x<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(i).addScaledVector(xn,o);const m=c*g-p*d;if(m<=0&&d-c>=0&&p-g>=0)return po.subVectors(s,n),o=(d-c)/(d-c+(p-g)),e.copy(n).addScaledVector(po,o);const f=1/(m+x+u);return a=x*f,o=u*f,e.copy(i).addScaledVector(gn,a).addScaledVector(xn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const bl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},ms={h:0,s:0,l:0};function vr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class ut{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=$t.workingColorSpace){if(t=Bh(t,1),e=kt(e,0,1),i=kt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=vr(a,s,t+1/3),this.g=vr(a,s,t),this.b=vr(a,s,t-1/3)}return $t.colorSpaceToWorking(this,n),this}setStyle(t,e=$e){function i(s){s!==void 0&&parseFloat(s)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const i=bl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}copyLinearToSRGB(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return $t.workingToColorSpace(we.copy(this),t),Math.round(kt(we.r*255,0,255))*65536+Math.round(kt(we.g*255,0,255))*256+Math.round(kt(we.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(we.copy(this),e);const i=we.r,n=we.g,s=we.b,a=Math.max(i,n,s),o=Math.min(i,n,s);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const d=a-o;switch(h=c<=.5?d/(a+o):d/(2-a-o),a){case i:l=(n-s)/d+(n<s?6:0);break;case n:l=(s-i)/d+2;break;case s:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=$e){$t.workingToColorSpace(we.copy(this),t);const e=we.r,i=we.g,n=we.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Fi),this.setHSL(Fi.h+t,Fi.s+e,Fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fi),t.getHSL(ms);const i=ir(Fi.h,ms.h,e),n=ir(Fi.s,ms.s,e),s=ir(Fi.l,ms.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new ut;ut.NAMES=bl;let Jh=0;class Di extends rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=tn,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Br,this.blendDst=Or,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=Dn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=to,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ln,this.stencilZFail=ln,this.stencilZPass=ln,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==tn&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Br&&(i.blendSrc=this.blendSrc),this.blendDst!==Or&&(i.blendDst=this.blendDst),this.blendEquation!==Ji&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Dn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==to&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ln&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ln&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ln&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=n(t.textures),a=n(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class es extends Di{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Da,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new L,gs=new bt;let Qh=0;class Ge{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ta,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)gs.fromBufferAttribute(this,e),gs.applyMatrix3(t),this.setXY(e,gs.x,gs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=pi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ie(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array),s=ie(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ta&&(t.usage=this.usage),t}}class yl extends Ge{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Sl extends Ge{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ue extends Ge{constructor(t,e,i){super(new Float32Array(t),e,i)}}let tc=0;const Je=new Kt,br=new xe,_n=new L,We=new an,kn=new an,Se=new L;class Fe extends rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tc++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ml(t)?Sl:yl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Bt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,i){return Je.makeTranslation(t,e,i),this.applyMatrix4(Je),this}scale(t,e,i){return Je.makeScale(t,e,i),this.applyMatrix4(Je),this}lookAt(t){return br.lookAt(t),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_n).negate(),this.translate(_n.x,_n.y,_n.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];We.setFromBufferAttribute(s),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ni);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];kn.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(We.min,kn.min),We.expandByPoint(Se),Se.addVectors(We.max,kn.max),We.expandByPoint(Se)):(We.expandByPoint(kn.min),We.expandByPoint(kn.max))}We.getCenter(i);let n=0;for(let s=0,a=t.count;s<a;s++)Se.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Se));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Se.fromBufferAttribute(o,h),l&&(_n.fromBufferAttribute(t,h),Se.add(_n)),n=Math.max(n,i.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new L,l[D]=new L;const h=new L,c=new L,d=new L,u=new bt,p=new bt,g=new bt,x=new L,m=new L;function f(D,v,y){h.fromBufferAttribute(i,D),c.fromBufferAttribute(i,v),d.fromBufferAttribute(i,y),u.fromBufferAttribute(s,D),p.fromBufferAttribute(s,v),g.fromBufferAttribute(s,y),c.sub(h),d.sub(h),p.sub(u),g.sub(u);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(c).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(C),m.copy(d).multiplyScalar(p.x).addScaledVector(c,-g.x).multiplyScalar(C),o[D].add(x),o[v].add(x),o[y].add(x),l[D].add(m),l[v].add(m),l[y].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let D=0,v=T.length;D<v;++D){const y=T[D],C=y.start,U=y.count;for(let O=C,H=C+U;O<H;O+=3)f(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const M=new L,E=new L,w=new L,b=new L;function A(D){w.fromBufferAttribute(n,D),b.copy(w);const v=o[D];M.copy(v),M.sub(w.multiplyScalar(w.dot(v))).normalize(),E.crossVectors(b,v);const C=E.dot(l[D])<0?-1:1;a.setXYZW(D,M.x,M.y,M.z,C)}for(let D=0,v=T.length;D<v;++D){const y=T[D],C=y.start,U=y.count;for(let O=C,H=C+U;O<H;O+=3)A(t.getX(O+0)),A(t.getX(O+1)),A(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const n=new L,s=new L,a=new L,o=new L,l=new L,h=new L,c=new L,d=new L;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);n.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),c.subVectors(a,s),d.subVectors(n,s),c.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,m),o.add(c),l.add(c),h.add(c),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let u=0,p=e.count;u<p;u+=3)n.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),c.subVectors(a,s),d.subVectors(n,s),c.cross(d),i.setXYZ(u+0,c.x,c.y,c.z),i.setXYZ(u+1,c.x,c.y,c.z),i.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,d=o.normalized,u=new h.constructor(l.length*c);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*c;for(let f=0;f<c;f++)u[g++]=h[p++]}return new Ge(u,c,d)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Fe,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],h=t(l,i);e.setAttribute(o,h)}const s=this.morphAttributes;for(const o in s){const l=[],h=s[o];for(let c=0,d=h.length;c<d;c++){const u=h[c],p=t(u,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const h=i[l];t.data.attributes[l]=h.toJSON(t.data)}const n={};let s=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let d=0,u=h.length;d<u;d++){const p=h[d];c.push(p.toJSON(t.data))}c.length>0&&(n[l]=c,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const h in n){const c=n[h];this.setAttribute(h,c.clone(e))}const s=t.morphAttributes;for(const h in s){const c=[],d=s[h];for(let u=0,p=d.length;u<p;u++)c.push(d[u].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const d=a[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const mo=new Kt,$i=new is,xs=new ni,go=new L,_s=new L,Ms=new L,vs=new L,yr=new L,bs=new L,xo=new L,ys=new L;class se extends xe{constructor(t=new Fe,e=new es){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(s&&o){bs.set(0,0,0);for(let l=0,h=s.length;l<h;l++){const c=o[l],d=s[l];c!==0&&(yr.fromBufferAttribute(d,t),a?bs.addScaledVector(yr,c):bs.addScaledVector(yr.sub(e),c))}e.add(bs)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(s),$i.copy(t.ray).recast(t.near),!(xs.containsPoint($i.origin)===!1&&($i.intersectSphere(xs,go)===null||$i.origin.distanceToSquared(go)>(t.far-t.near)**2))&&(mo.copy(s).invert(),$i.copy(t.ray).applyMatrix4(mo),!(i.boundingBox!==null&&$i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,$i)))}_computeIntersections(t,e,i){let n;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,h=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=a[m.materialIndex],T=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=T,w=M;E<w;E+=3){const b=o.getX(E),A=o.getX(E+1),D=o.getX(E+2);n=Ss(this,f,t,i,h,c,d,b,A,D),n&&(n.faceIndex=Math.floor(E/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const T=o.getX(m),M=o.getX(m+1),E=o.getX(m+2);n=Ss(this,a,t,i,h,c,d,T,M,E),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],f=a[m.materialIndex],T=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let E=T,w=M;E<w;E+=3){const b=E,A=E+1,D=E+2;n=Ss(this,f,t,i,h,c,d,b,A,D),n&&(n.faceIndex=Math.floor(E/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const T=m,M=m+1,E=m+2;n=Ss(this,a,t,i,h,c,d,T,M,E),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}}function ec(r,t,e,i,n,s,a,o){let l;if(t.side===ze?l=i.intersectTriangle(a,s,n,!0,o):l=i.intersectTriangle(n,s,a,t.side===Hi,o),l===null)return null;ys.copy(o),ys.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(ys);return h<e.near||h>e.far?null:{distance:h,point:ys.clone(),object:r}}function Ss(r,t,e,i,n,s,a,o,l,h){r.getVertexPosition(o,_s),r.getVertexPosition(l,Ms),r.getVertexPosition(h,vs);const c=ec(r,t,e,i,_s,Ms,vs,xo);if(c){const d=new L;ti.getBarycoord(xo,_s,Ms,vs,d),n&&(c.uv=ti.getInterpolatedAttribute(n,o,l,h,d,new bt)),s&&(c.uv1=ti.getInterpolatedAttribute(s,o,l,h,d,new bt)),a&&(c.normal=ti.getInterpolatedAttribute(a,o,l,h,d,new L),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const u={a:o,b:l,c:h,normal:new L,materialIndex:0};ti.getNormal(_s,Ms,vs,u.normal),c.face=u,c.barycoord=d}return c}class le extends Fe{constructor(t=1,e=1,i=1,n=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:a};const o=this;n=Math.floor(n),s=Math.floor(s),a=Math.floor(a);const l=[],h=[],c=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,s,4),g("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Ue(h,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(d,2));function g(x,m,f,T,M,E,w,b,A,D,v){const y=E/A,C=w/D,U=E/2,O=w/2,H=b/2,W=A+1,q=D+1;let J=0,k=0;const et=new L;for(let it=0;it<q;it++){const yt=it*C-O;for(let Ht=0;Ht<W;Ht++){const Zt=Ht*y-U;et[x]=Zt*T,et[m]=yt*M,et[f]=H,h.push(et.x,et.y,et.z),et[x]=0,et[m]=0,et[f]=b>0?1:-1,c.push(et.x,et.y,et.z),d.push(Ht/A),d.push(1-it/D),J+=1}}for(let it=0;it<D;it++)for(let yt=0;yt<A;yt++){const Ht=u+yt+W*it,Zt=u+yt+W*(it+1),Yt=u+(yt+1)+W*(it+1),Jt=u+(yt+1)+W*it;l.push(Ht,Zt,Jt),l.push(Zt,Yt,Jt),k+=6}o.addGroup(p,k,v),p+=k,u+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Un(r){const t={};for(const e in r){t[e]={};for(const i in r[e]){const n=r[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Ie(r){const t={};for(let e=0;e<r.length;e++){const i=Un(r[e]);for(const n in i)t[n]=i[n]}return t}function ic(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Tl(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const nc={clone:Un,merge:Ie};var sc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends Di{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sc,this.fragmentShader=rc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Un(t.uniforms),this.uniformsGroups=ic(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class El extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new L,_o=new bt,Mo=new bt;class li extends El{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ea*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ea*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z)}getViewSize(t,e){return this.getViewBounds(t,_o,Mo),e.subVectors(Mo,_o)}setViewOffset(t,e,i,n,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;s+=a.offsetX*n/l,e-=a.offsetY*i/h,n*=a.width/l,i*=a.height/h}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Mn=-90,vn=1;class ac extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new li(Mn,vn,t,e);n.layers=this.layers,this.add(n);const s=new li(Mn,vn,t,e);s.layers=this.layers,this.add(s);const a=new li(Mn,vn,t,e);a.layers=this.layers,this.add(a);const o=new li(Mn,vn,t,e);o.layers=this.layers,this.add(o);const l=new li(Mn,vn,t,e);l.layers=this.layers,this.add(l);const h=new li(Mn,vn,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,a,o,l]=e;for(const h of e)this.remove(h);if(t===gi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,h,c]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,h),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),t.render(e,c),t.setRenderTarget(d,u,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class wl extends Ce{constructor(t=[],e=Pn,i,n,s,a,o,l,h,c){super(t,e,i,n,s,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class oc extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new wl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new le(5,5,5),s=new _i({name:"CubemapFromEquirect",uniforms:Un(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:Ai});s.uniforms.tEquirect.value=e;const a=new se(n,s),o=e.minFilter;return e.minFilter===Oi&&(e.minFilter=ei),new ac(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(s)}}class ii extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const lc={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),f=this._getHandJoint(h,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const c=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],u=c.position.distanceTo(d.position),p=.02,g=.005;h.inputState.pinching&&u>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&u<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(lc)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ii;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class hc extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class cc{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ta,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,s=this.stride;n<s;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pe=new L;class Zs{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=pi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ie(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ie(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=pi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=pi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=pi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=pi(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ie(e,this.array),i=ie(i,this.array),n=ie(n,this.array),s=ie(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Xs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Xs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Al extends Di{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let bn;const Hn=new L,yn=new L,Sn=new L,Tn=new bt,Vn=new bt,Rl=new Kt,Ts=new L,Wn=new L,Es=new L,vo=new bt,Tr=new bt,bo=new bt;class dc extends xe{constructor(t=new Al){if(super(),this.isSprite=!0,this.type="Sprite",bn===void 0){bn=new Fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new cc(e,5);bn.setIndex([0,1,2,0,2,3]),bn.setAttribute("position",new Zs(i,3,0,!1)),bn.setAttribute("uv",new Zs(i,2,3,!1))}this.geometry=bn,this.material=t,this.center=new bt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yn.setFromMatrixScale(this.matrixWorld),Rl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Sn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yn.multiplyScalar(-Sn.z);const i=this.material.rotation;let n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));const a=this.center;ws(Ts.set(-.5,-.5,0),Sn,a,yn,n,s),ws(Wn.set(.5,-.5,0),Sn,a,yn,n,s),ws(Es.set(.5,.5,0),Sn,a,yn,n,s),vo.set(0,0),Tr.set(1,0),bo.set(1,1);let o=t.ray.intersectTriangle(Ts,Wn,Es,!1,Hn);if(o===null&&(ws(Wn.set(-.5,.5,0),Sn,a,yn,n,s),Tr.set(0,1),o=t.ray.intersectTriangle(Ts,Es,Wn,!1,Hn),o===null))return;const l=t.ray.origin.distanceTo(Hn);l<t.near||l>t.far||e.push({distance:l,point:Hn.clone(),uv:ti.getInterpolation(Hn,Ts,Wn,Es,vo,Tr,bo,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ws(r,t,e,i,n,s){Tn.subVectors(r,e).addScalar(.5).multiply(i),n!==void 0?(Vn.x=s*Tn.x-n*Tn.y,Vn.y=n*Tn.x+s*Tn.y):Vn.copy(Tn),r.copy(t),r.x+=Vn.x,r.y+=Vn.y,r.applyMatrix4(Rl)}class Cl extends Ce{constructor(t=null,e=1,i=1,n,s,a,o,l,h=je,c=je,d,u){super(null,a,o,l,h,c,n,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yo extends Ge{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const En=new Kt,So=new Kt,As=[],To=new an,uc=new Kt,Xn=new se,Zn=new ni;class qe extends se{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new yo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,uc)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new an),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,En),To.copy(t.boundingBox).applyMatrix4(En),this.boundingBox.union(To)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ni),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,En),Zn.copy(t.boundingSphere).applyMatrix4(En),this.boundingSphere.union(Zn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,a=t*s+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(Xn.geometry=this.geometry,Xn.material=this.material,Xn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zn.copy(this.boundingSphere),Zn.applyMatrix4(i),t.ray.intersectsSphere(Zn)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,En),So.multiplyMatrices(i,En),Xn.matrixWorld=So,Xn.raycast(t,As);for(let a=0,o=As.length;a<o;a++){const l=As[a];l.instanceId=s,l.object=this,e.push(l)}As.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new yo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Cl(new Float32Array(n*this.count),n,this.count,Ua,mi));const s=this.morphTexture.source.data.data;let a=0;for(let h=0;h<i.length;h++)a+=i[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Er=new L,fc=new L,pc=new Bt;class Qe{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Er.subVectors(i,e).cross(fc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Er),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||pc.getNormalMatrix(t),n=this.coplanarPoint(Er).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yi=new ni,mc=new bt(.5,.5),Rs=new L;class ns{constructor(t=new Qe,e=new Qe,i=new Qe,n=new Qe,s=new Qe,a=new Qe){this.planes=[t,e,i,n,s,a]}set(t,e,i,n,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gi,i=!1){const n=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],h=s[3],c=s[4],d=s[5],u=s[6],p=s[7],g=s[8],x=s[9],m=s[10],f=s[11],T=s[12],M=s[13],E=s[14],w=s[15];if(n[0].setComponents(h-a,p-c,f-g,w-T).normalize(),n[1].setComponents(h+a,p+c,f+g,w+T).normalize(),n[2].setComponents(h+o,p+d,f+x,w+M).normalize(),n[3].setComponents(h-o,p-d,f-x,w-M).normalize(),i)n[4].setComponents(l,u,m,E).normalize(),n[5].setComponents(h-l,p-u,f-m,w-E).normalize();else if(n[4].setComponents(h-l,p-u,f-m,w-E).normalize(),e===gi)n[5].setComponents(h+l,p+u,f+m,w+E).normalize();else if(e===Vs)n[5].setComponents(l,u,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(t){Yi.center.set(0,0,0);const e=mc.distanceTo(t.center);return Yi.radius=.7071067811865476+e,Yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Rs.x=n.normal.x>0?t.max.x:t.min.x,Rs.y=n.normal.y>0?t.max.y:t.min.y,Rs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dl extends Di{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const qs=new L,$s=new L,Eo=new Kt,qn=new is,Cs=new ni,wr=new L,wo=new L;class gc extends xe{constructor(t=new Fe,e=new Dl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,s=e.count;n<s;n++)qs.fromBufferAttribute(e,n-1),$s.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=qs.distanceTo($s);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(n),Cs.radius+=s,t.ray.intersectsSphere(Cs)===!1)return;Eo.copy(n).invert(),qn.copy(t.ray).applyMatrix4(Eo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=this.isLineSegments?2:1,c=i.index,u=i.attributes.position;if(c!==null){const p=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=h){const f=c.getX(x),T=c.getX(x+1),M=Ds(this,t,qn,l,f,T,x);M&&e.push(M)}if(this.isLineLoop){const x=c.getX(g-1),m=c.getX(p),f=Ds(this,t,qn,l,x,m,g-1);f&&e.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=h){const f=Ds(this,t,qn,l,x,x+1,x);f&&e.push(f)}if(this.isLineLoop){const x=Ds(this,t,qn,l,g-1,p,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ds(r,t,e,i,n,s,a){const o=r.geometry.attributes.position;if(qs.fromBufferAttribute(o,n),$s.fromBufferAttribute(o,s),e.distanceSqToSegment(qs,$s,wr,wo)>i)return;wr.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(wr);if(!(h<t.near||h>t.far))return{distance:h,point:wo.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Ao=new L,Ro=new L;class xc extends gc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,s=e.count;n<s;n+=2)Ao.fromBufferAttribute(e,n),Ro.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Ao.distanceTo(Ro);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pl extends Di{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Co=new Kt,wa=new is,Ps=new ni,Is=new L;class _c extends xe{constructor(t=new Fe,e=new Pl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ps.copy(i.boundingSphere),Ps.applyMatrix4(n),Ps.radius+=s,t.ray.intersectsSphere(Ps)===!1)return;Co.copy(n).invert(),wa.copy(t.ray).applyMatrix4(Co);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=i.index,d=i.attributes.position;if(h!==null){const u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=u,x=p;g<x;g++){const m=h.getX(g);Is.fromBufferAttribute(d,m),Do(Is,m,l,n,t,e,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,x=p;g<x;g++)Is.fromBufferAttribute(d,g),Do(Is,g,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Do(r,t,e,i,n,s,a){const o=wa.distanceSqToPoint(r);if(o<e){const l=new L;wa.closestPointToPoint(r,l),l.applyMatrix4(i);const h=n.ray.origin.distanceTo(l);if(h<n.near||h>n.far)return;s.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Re extends Ce{constructor(t,e,i,n,s,a,o,l,h){super(t,e,i,n,s,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Il extends Ce{constructor(t,e,i=en,n,s,a,o=je,l=je,h,c=Jn,d=1){if(c!==Jn&&c!==Qn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,n,s,a,o,l,c,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ga(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Ll extends Ce{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ci extends Fe{constructor(t=1,e=1,i=1,n=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const h=this;n=Math.floor(n),s=Math.floor(s);const c=[],d=[],u=[],p=[];let g=0;const x=[],m=i/2;let f=0;T(),a===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(c),this.setAttribute("position",new Ue(d,3)),this.setAttribute("normal",new Ue(u,3)),this.setAttribute("uv",new Ue(p,2));function T(){const E=new L,w=new L;let b=0;const A=(e-t)/i;for(let D=0;D<=s;D++){const v=[],y=D/s,C=y*(e-t)+t;for(let U=0;U<=n;U++){const O=U/n,H=O*l+o,W=Math.sin(H),q=Math.cos(H);w.x=C*W,w.y=-y*i+m,w.z=C*q,d.push(w.x,w.y,w.z),E.set(W,A,q).normalize(),u.push(E.x,E.y,E.z),p.push(O,1-y),v.push(g++)}x.push(v)}for(let D=0;D<n;D++)for(let v=0;v<s;v++){const y=x[v][D],C=x[v+1][D],U=x[v+1][D+1],O=x[v][D+1];(t>0||v!==0)&&(c.push(y,C,O),b+=3),(e>0||v!==s-1)&&(c.push(C,U,O),b+=3)}h.addGroup(f,b,0),f+=b}function M(E){const w=g,b=new bt,A=new L;let D=0;const v=E===!0?t:e,y=E===!0?1:-1;for(let U=1;U<=n;U++)d.push(0,m*y,0),u.push(0,y,0),p.push(.5,.5),g++;const C=g;for(let U=0;U<=n;U++){const H=U/n*l+o,W=Math.cos(H),q=Math.sin(H);A.x=v*q,A.y=m*y,A.z=v*W,d.push(A.x,A.y,A.z),u.push(0,y,0),b.x=W*.5+.5,b.y=q*.5*y+.5,p.push(b.x,b.y),g++}for(let U=0;U<n;U++){const O=w+U,H=C+U;E===!0?c.push(H,H+1,O):c.push(H+1,H,O),D+=3}h.addGroup(f,D,E===!0?1:2),f+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ci extends Ci{constructor(t=1,e=1,i=32,n=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ci(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vi extends Fe{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),h=o+1,c=l+1,d=t/o,u=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<c;f++){const T=f*u-a;for(let M=0;M<h;M++){const E=M*d-s;g.push(E,-T,0),x.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let T=0;T<o;T++){const M=T+h*f,E=T+h*(f+1),w=T+1+h*(f+1),b=T+1+h*f;p.push(M,E,b),p.push(E,w,b)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.width,t.height,t.widthSegments,t.heightSegments)}}class ss extends Fe{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let h=0;const c=[],d=new L,u=new L,p=[],g=[],x=[],m=[];for(let f=0;f<=i;f++){const T=[],M=f/i;let E=0;f===0&&a===0?E=.5/e:f===i&&l===Math.PI&&(E=-.5/e);for(let w=0;w<=e;w++){const b=w/e;d.x=-t*Math.cos(n+b*s)*Math.sin(a+M*o),d.y=t*Math.cos(a+M*o),d.z=t*Math.sin(n+b*s)*Math.sin(a+M*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(b+E,1-M),T.push(h++)}c.push(T)}for(let f=0;f<i;f++)for(let T=0;T<e;T++){const M=c[f][T+1],E=c[f][T],w=c[f+1][T],b=c[f+1][T+1];(f!==0||a>0)&&p.push(M,E,b),(f!==i-1||l<Math.PI)&&p.push(E,w,b)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xe extends Di{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class jt extends Di{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Da,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Mc extends Di{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class vc extends Di{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ul extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ar=new Kt,Po=new L,Io=new L;class bc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=xi,this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ns,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Po.setFromMatrixPosition(t.matrixWorld),e.position.copy(Po),Io.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Io),e.updateMatrixWorld(),Ar.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ar,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ar)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ha extends El{constructor(t=-1,e=1,i=1,n=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,a=s+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class yc extends bc{constructor(){super(new Ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Sc extends Ul{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new yc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Tc extends Ul{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ec extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Lo=new Kt;class wc{constructor(t,e,i=0,n=1/0){this.ray=new is(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new ka,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Lo.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Lo),this}intersectObject(t,e=!0,i=[]){return Aa(t,this,i,e),i.sort(Uo),i}intersectObjects(t,e=!0,i=[]){for(let n=0,s=t.length;n<s;n++)Aa(t[n],this,i,e);return i.sort(Uo),i}}function Uo(r,t){return r.distance-t.distance}function Aa(r,t,e,i){let n=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)Aa(s[a],t,e,!0)}}class Fo{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Ac extends rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function No(r,t,e,i){const n=Rc(i);switch(e){case gl:return r*t;case Ua:return r*t/n.components*n.byteLength;case Fa:return r*t/n.components*n.byteLength;case Na:return r*t*2/n.components*n.byteLength;case Ba:return r*t*2/n.components*n.byteLength;case xl:return r*t*3/n.components*n.byteLength;case hi:return r*t*4/n.components*n.byteLength;case Oa:return r*t*4/n.components*n.byteLength;case Ns:case Bs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Os:case zs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Kr:case Qr:return Math.max(r,16)*Math.max(t,8)/4;case jr:case Jr:return Math.max(r,8)*Math.max(t,8)/2;case ta:case ea:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ia:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case na:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ra:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case aa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case oa:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case la:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ha:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ca:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case da:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ua:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case fa:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case pa:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ma:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ga:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case xa:case _a:case Ma:return Math.ceil(r/4)*Math.ceil(t/4)*16;case va:case ba:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ya:case Sa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Rc(r){switch(r){case xi:case ul:return{byteLength:1,components:1};case jn:case fl:case Fn:return{byteLength:2,components:1};case Ia:case La:return{byteLength:2,components:4};case en:case Pa:case mi:return{byteLength:4,components:1};case pl:case ml:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);function Fl(){let r=null,t=!1,e=null,i=null;function n(s,a){e(s,a),i=r.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=r.requestAnimationFrame(n),t=!0)},stop:function(){r.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Cc(r){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,d=h.byteLength,u=r.createBuffer();r.bindBuffer(l,u),r.bufferData(l,h,c),o.onUploadCallback();let p;if(h instanceof Float32Array)p=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)p=r.HALF_FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=r.SHORT;else if(h instanceof Uint32Array)p=r.UNSIGNED_INT;else if(h instanceof Int32Array)p=r.INT;else if(h instanceof Int8Array)p=r.BYTE;else if(h instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:u,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,h){const c=l.array,d=l.updateRanges;if(r.bindBuffer(h,o),d.length===0)r.bufferSubData(h,0,c);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];r.bufferSubData(h,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,l),h.version=o.version}}return{get:n,remove:s,update:a}}var Dc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pc=`#ifdef USE_ALPHAHASH
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
#endif`,Ic=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nc=`#ifdef USE_AOMAP
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
#endif`,Bc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Oc=`#ifdef USE_BATCHING
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
#endif`,zc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Gc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,kc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Vc=`#ifdef USE_IRIDESCENCE
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
#endif`,Wc=`#ifdef USE_BUMPMAP
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
#endif`,Xc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,qc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$c=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Jc=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Qc=`#define PI 3.141592653589793
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
} // validated`,td=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ed=`vec3 transformedNormal = objectNormal;
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
#endif`,id=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ad="gl_FragColor = linearToOutputTexel( gl_FragColor );",od=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ld=`#ifdef USE_ENVMAP
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
#endif`,hd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cd=`#ifdef USE_ENVMAP
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
#endif`,dd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ud=`#ifdef USE_ENVMAP
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
#endif`,fd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,md=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xd=`#ifdef USE_GRADIENTMAP
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
}`,_d=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Md=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bd=`uniform bool receiveShadow;
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
#endif`,yd=`#ifdef USE_ENVMAP
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
#endif`,Sd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ed=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ad=`PhysicalMaterial material;
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
#endif`,Rd=`uniform sampler2D dfgLUT;
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
}`,Cd=`
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
#endif`,Dd=`#if defined( RE_IndirectDiffuse )
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
#endif`,Pd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Id=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ld=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ud=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Bd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Od=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,zd=`#if defined( USE_POINTS_UV )
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
#endif`,Gd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xd=`#ifdef USE_MORPHTARGETS
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
#endif`,Zd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$d=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Yd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jd=`#ifdef USE_NORMALMAP
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
#endif`,Qd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,su=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ru=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,au=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ou=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,du=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pu=`float getShadowMask() {
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
}`,mu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gu=`#ifdef USE_SKINNING
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
#endif`,xu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_u=`#ifdef USE_SKINNING
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
#endif`,Mu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Su=`#ifdef USE_TRANSMISSION
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
#endif`,Tu=`#ifdef USE_TRANSMISSION
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
#endif`,Eu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Au=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ru=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Du=`uniform sampler2D t2D;
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
}`,Pu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Lu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Fu=`#include <common>
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
}`,Nu=`#if DEPTH_PACKING == 3200
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
}`,Bu=`#define DISTANCE
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
}`,Ou=`#define DISTANCE
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
}`,zu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Gu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ku=`uniform float scale;
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
}`,Hu=`uniform vec3 diffuse;
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
}`,Vu=`#include <common>
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
}`,Wu=`uniform vec3 diffuse;
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
}`,Xu=`#define LAMBERT
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
}`,Zu=`#define LAMBERT
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
}`,qu=`#define MATCAP
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
}`,$u=`#define MATCAP
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
}`,Yu=`#define NORMAL
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
}`,ju=`#define NORMAL
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
}`,Ku=`#define PHONG
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
}`,Ju=`#define PHONG
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
}`,Qu=`#define STANDARD
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
}`,tf=`#define STANDARD
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
}`,ef=`#define TOON
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
}`,nf=`#define TOON
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
}`,sf=`uniform float size;
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
}`,rf=`uniform vec3 diffuse;
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
}`,af=`#include <common>
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
}`,of=`uniform vec3 color;
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
}`,lf=`uniform float rotation;
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
}`,hf=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:Dc,alphahash_pars_fragment:Pc,alphamap_fragment:Ic,alphamap_pars_fragment:Lc,alphatest_fragment:Uc,alphatest_pars_fragment:Fc,aomap_fragment:Nc,aomap_pars_fragment:Bc,batching_pars_vertex:Oc,batching_vertex:zc,begin_vertex:Gc,beginnormal_vertex:kc,bsdfs:Hc,iridescence_fragment:Vc,bumpmap_pars_fragment:Wc,clipping_planes_fragment:Xc,clipping_planes_pars_fragment:Zc,clipping_planes_pars_vertex:qc,clipping_planes_vertex:$c,color_fragment:Yc,color_pars_fragment:jc,color_pars_vertex:Kc,color_vertex:Jc,common:Qc,cube_uv_reflection_fragment:td,defaultnormal_vertex:ed,displacementmap_pars_vertex:id,displacementmap_vertex:nd,emissivemap_fragment:sd,emissivemap_pars_fragment:rd,colorspace_fragment:ad,colorspace_pars_fragment:od,envmap_fragment:ld,envmap_common_pars_fragment:hd,envmap_pars_fragment:cd,envmap_pars_vertex:dd,envmap_physical_pars_fragment:yd,envmap_vertex:ud,fog_vertex:fd,fog_pars_vertex:pd,fog_fragment:md,fog_pars_fragment:gd,gradientmap_pars_fragment:xd,lightmap_pars_fragment:_d,lights_lambert_fragment:Md,lights_lambert_pars_fragment:vd,lights_pars_begin:bd,lights_toon_fragment:Sd,lights_toon_pars_fragment:Td,lights_phong_fragment:Ed,lights_phong_pars_fragment:wd,lights_physical_fragment:Ad,lights_physical_pars_fragment:Rd,lights_fragment_begin:Cd,lights_fragment_maps:Dd,lights_fragment_end:Pd,logdepthbuf_fragment:Id,logdepthbuf_pars_fragment:Ld,logdepthbuf_pars_vertex:Ud,logdepthbuf_vertex:Fd,map_fragment:Nd,map_pars_fragment:Bd,map_particle_fragment:Od,map_particle_pars_fragment:zd,metalnessmap_fragment:Gd,metalnessmap_pars_fragment:kd,morphinstance_vertex:Hd,morphcolor_vertex:Vd,morphnormal_vertex:Wd,morphtarget_pars_vertex:Xd,morphtarget_vertex:Zd,normal_fragment_begin:qd,normal_fragment_maps:$d,normal_pars_fragment:Yd,normal_pars_vertex:jd,normal_vertex:Kd,normalmap_pars_fragment:Jd,clearcoat_normal_fragment_begin:Qd,clearcoat_normal_fragment_maps:tu,clearcoat_pars_fragment:eu,iridescence_pars_fragment:iu,opaque_fragment:nu,packing:su,premultiplied_alpha_fragment:ru,project_vertex:au,dithering_fragment:ou,dithering_pars_fragment:lu,roughnessmap_fragment:hu,roughnessmap_pars_fragment:cu,shadowmap_pars_fragment:du,shadowmap_pars_vertex:uu,shadowmap_vertex:fu,shadowmask_pars_fragment:pu,skinbase_vertex:mu,skinning_pars_vertex:gu,skinning_vertex:xu,skinnormal_vertex:_u,specularmap_fragment:Mu,specularmap_pars_fragment:vu,tonemapping_fragment:bu,tonemapping_pars_fragment:yu,transmission_fragment:Su,transmission_pars_fragment:Tu,uv_pars_fragment:Eu,uv_pars_vertex:wu,uv_vertex:Au,worldpos_vertex:Ru,background_vert:Cu,background_frag:Du,backgroundCube_vert:Pu,backgroundCube_frag:Iu,cube_vert:Lu,cube_frag:Uu,depth_vert:Fu,depth_frag:Nu,distanceRGBA_vert:Bu,distanceRGBA_frag:Ou,equirect_vert:zu,equirect_frag:Gu,linedashed_vert:ku,linedashed_frag:Hu,meshbasic_vert:Vu,meshbasic_frag:Wu,meshlambert_vert:Xu,meshlambert_frag:Zu,meshmatcap_vert:qu,meshmatcap_frag:$u,meshnormal_vert:Yu,meshnormal_frag:ju,meshphong_vert:Ku,meshphong_frag:Ju,meshphysical_vert:Qu,meshphysical_frag:tf,meshtoon_vert:ef,meshtoon_frag:nf,points_vert:sf,points_frag:rf,shadow_vert:af,shadow_frag:of,sprite_vert:lf,sprite_frag:hf},at={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},fi={basic:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Ie([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Ie([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Ie([at.points,at.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Ie([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Ie([at.common,at.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Ie([at.sprite,at.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Ie([at.common,at.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Ie([at.lights,at.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};fi.physical={uniforms:Ie([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Ls={r:0,b:0,g:0},ji=new di,cf=new Kt;function df(r,t,e,i,n,s,a){const o=new ut(0);let l=s===!0?0:1,h,c,d=null,u=0,p=null;function g(M){let E=M.isScene===!0?M.background:null;return E&&E.isTexture&&(E=(M.backgroundBlurriness>0?e:t).get(E)),E}function x(M){let E=!1;const w=g(M);w===null?f(o,l):w&&w.isColor&&(f(w,1),E=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,a):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(r.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(M,E){const w=g(E);w&&(w.isCubeTexture||w.mapping===Ys)?(c===void 0&&(c=new se(new le(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:Un(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),ji.copy(E.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),c.material.uniforms.envMap.value=w,c.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cf.makeRotationFromEuler(ji)),c.material.toneMapped=$t.getTransfer(w.colorSpace)!==ee,(d!==w||u!==w.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,d=w,u=w.version,p=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new se(new Vi(2,2),new _i({name:"BackgroundMaterial",uniforms:Un(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.toneMapped=$t.getTransfer(w.colorSpace)!==ee,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||u!==w.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,d=w,u=w.version,p=r.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function f(M,E){M.getRGB(Ls,Tl(r)),i.buffers.color.setClear(Ls.r,Ls.g,Ls.b,E,a)}function T(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(M,E=1){o.set(M),l=E,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,f(o,l)},render:x,addToRenderList:m,dispose:T}}function uf(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=u(null);let s=n,a=!1;function o(y,C,U,O,H){let W=!1;const q=d(O,U,C);s!==q&&(s=q,h(s.object)),W=p(y,O,U,H),W&&g(y,O,U,H),H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,E(y,C,U,O),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return r.createVertexArray()}function h(y){return r.bindVertexArray(y)}function c(y){return r.deleteVertexArray(y)}function d(y,C,U){const O=U.wireframe===!0;let H=i[y.id];H===void 0&&(H={},i[y.id]=H);let W=H[C.id];W===void 0&&(W={},H[C.id]=W);let q=W[O];return q===void 0&&(q=u(l()),W[O]=q),q}function u(y){const C=[],U=[],O=[];for(let H=0;H<e;H++)C[H]=0,U[H]=0,O[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:O,object:y,attributes:{},index:null}}function p(y,C,U,O){const H=s.attributes,W=C.attributes;let q=0;const J=U.getAttributes();for(const k in J)if(J[k].location>=0){const it=H[k];let yt=W[k];if(yt===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor)),it===void 0||it.attribute!==yt||yt&&it.data!==yt.data)return!0;q++}return s.attributesNum!==q||s.index!==O}function g(y,C,U,O){const H={},W=C.attributes;let q=0;const J=U.getAttributes();for(const k in J)if(J[k].location>=0){let it=W[k];it===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(it=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(it=y.instanceColor));const yt={};yt.attribute=it,it&&it.data&&(yt.data=it.data),H[k]=yt,q++}s.attributes=H,s.attributesNum=q,s.index=O}function x(){const y=s.newAttributes;for(let C=0,U=y.length;C<U;C++)y[C]=0}function m(y){f(y,0)}function f(y,C){const U=s.newAttributes,O=s.enabledAttributes,H=s.attributeDivisors;U[y]=1,O[y]===0&&(r.enableVertexAttribArray(y),O[y]=1),H[y]!==C&&(r.vertexAttribDivisor(y,C),H[y]=C)}function T(){const y=s.newAttributes,C=s.enabledAttributes;for(let U=0,O=C.length;U<O;U++)C[U]!==y[U]&&(r.disableVertexAttribArray(U),C[U]=0)}function M(y,C,U,O,H,W,q){q===!0?r.vertexAttribIPointer(y,C,U,H,W):r.vertexAttribPointer(y,C,U,O,H,W)}function E(y,C,U,O){x();const H=O.attributes,W=U.getAttributes(),q=C.defaultAttributeValues;for(const J in W){const k=W[J];if(k.location>=0){let et=H[J];if(et===void 0&&(J==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),J==="instanceColor"&&y.instanceColor&&(et=y.instanceColor)),et!==void 0){const it=et.normalized,yt=et.itemSize,Ht=t.get(et);if(Ht===void 0)continue;const Zt=Ht.buffer,Yt=Ht.type,Jt=Ht.bytesPerElement,X=Yt===r.INT||Yt===r.UNSIGNED_INT||et.gpuType===Pa;if(et.isInterleavedBufferAttribute){const $=et.data,ht=$.stride,Et=et.offset;if($.isInstancedInterleavedBuffer){for(let Mt=0;Mt<k.locationSize;Mt++)f(k.location+Mt,$.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)m(k.location+Mt);r.bindBuffer(r.ARRAY_BUFFER,Zt);for(let Mt=0;Mt<k.locationSize;Mt++)M(k.location+Mt,yt/k.locationSize,Yt,it,ht*Jt,(Et+yt/k.locationSize*Mt)*Jt,X)}else{if(et.isInstancedBufferAttribute){for(let $=0;$<k.locationSize;$++)f(k.location+$,et.meshPerAttribute);y.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let $=0;$<k.locationSize;$++)m(k.location+$);r.bindBuffer(r.ARRAY_BUFFER,Zt);for(let $=0;$<k.locationSize;$++)M(k.location+$,yt/k.locationSize,Yt,it,yt*Jt,yt/k.locationSize*$*Jt,X)}}else if(q!==void 0){const it=q[J];if(it!==void 0)switch(it.length){case 2:r.vertexAttrib2fv(k.location,it);break;case 3:r.vertexAttrib3fv(k.location,it);break;case 4:r.vertexAttrib4fv(k.location,it);break;default:r.vertexAttrib1fv(k.location,it)}}}}T()}function w(){D();for(const y in i){const C=i[y];for(const U in C){const O=C[U];for(const H in O)c(O[H].object),delete O[H];delete C[U]}delete i[y]}}function b(y){if(i[y.id]===void 0)return;const C=i[y.id];for(const U in C){const O=C[U];for(const H in O)c(O[H].object),delete O[H];delete C[U]}delete i[y.id]}function A(y){for(const C in i){const U=i[C];if(U[y.id]===void 0)continue;const O=U[y.id];for(const H in O)c(O[H].object),delete O[H];delete U[y.id]}}function D(){v(),a=!0,s!==n&&(s=n,h(s.object))}function v(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:D,resetDefaultState:v,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function ff(r,t,e){let i;function n(h){i=h}function s(h,c){r.drawArrays(i,h,c),e.update(c,i,1)}function a(h,c,d){d!==0&&(r.drawArraysInstanced(i,h,c,d),e.update(c,i,d))}function o(h,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,d);let p=0;for(let g=0;g<d;g++)p+=c[g];e.update(p,i,1)}function l(h,c,d,u){if(d===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h.length;g++)a(h[g],c[g],u[g]);else{p.multiDrawArraysInstancedWEBGL(i,h,0,c,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=c[x]*u[x];e.update(g,i,1)}}this.setMode=n,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function pf(r,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==hi&&i.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==xi&&i.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mi&&!D)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(Lt("WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),T=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),E=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:w,maxSamples:b}}function mf(r){const t=this;let e=null,i=0,n=!1,s=!1;const a=new Qe,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||i!==0||n;return n=u,i=d.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=c(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=r.get(d);if(!n||g===null||g.length===0||s&&!m)s?c(null):h();else{const T=s?0:i,M=T*4;let E=f.clippingState||null;l.value=E,E=c(g,u,M,p);for(let w=0;w!==M;++w)E[w]=e[w];f.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(d,u,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=p+x*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,E=p;M!==x;++M,E+=4)a.copy(d[M]).applyMatrix4(T,o),a.normal.toArray(m,E),m[E+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function gf(r){let t=new WeakMap;function e(a,o){return o===Zr?a.mapping=Pn:o===qr&&(a.mapping=In),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Zr||o===qr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new oc(l.height);return h.fromEquirectangularTexture(r,a),t.set(a,h),a.addEventListener("dispose",n),e(h.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const zi=4,Bo=[.125,.215,.35,.446,.526,.582],Qi=20,xf=256,$n=new Ha,Oo=new ut;let Rr=null,Cr=0,Dr=0,Pr=!1;const _f=new L;class zo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,s={}){const{size:a=256,position:o=_f}=s;Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ho(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ko(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Rr,Cr,Dr),this._renderer.xr.enabled=Pr,t.scissorTest=!1,wn(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pn||t.mapping===In?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Fn,format:hi,colorSpace:Ln,depthBuffer:!1},n=Go(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Go(t,e,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Mf(s)),this._blurMaterial=bf(s,t,e),this._ggxMaterial=vf(s,t,e)}return n}_compileMaterial(t){const e=new se(new Fe,t);this._renderer.compile(e,$n)}_sceneToCubeUV(t,e,i,n,s){const l=new li(90,1,e,i),h=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(Oo),d.toneMapping=Gi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new se(new le,new es({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let f=!1;const T=t.background;T?T.isColor&&(m.color.copy(T),t.background=null,f=!0):(m.color.copy(Oo),f=!0);for(let M=0;M<6;M++){const E=M%3;E===0?(l.up.set(0,h[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+c[M],s.y,s.z)):E===1?(l.up.set(0,0,h[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+c[M],s.z)):(l.up.set(0,h[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+c[M]));const w=this._cubeSize;wn(n,E*w,M>2?w:0,w,w),d.setRenderTarget(n),f&&d.render(x,l),d.render(t,l)}d.toneMapping=p,d.autoClear=u,t.background=T}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Pn||t.mapping===In;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ho()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ko());const s=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;wn(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,$n)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,h=i/(this._lodMeshes.length-1),c=e/(this._lodMeshes.length-1),d=Math.sqrt(h*h-c*c),u=.05+h*.95,p=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-zi?i-g+zi:0),f=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,wn(s,m,f,3*x,2*x),n.setRenderTarget(s),n.render(o,$n),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,wn(t,m,f,3*x,2*x),n.setRenderTarget(t),n.render(o,$n)}_blur(t,e,i,n,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",s),this._halfBlur(a,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const c=3,d=this._lodMeshes[n];d.material=h;const u=h.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Qi-1),x=s/g,m=isFinite(s)?1+Math.floor(c*x):Qi;m>Qi&&Lt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qi}`);const f=[];let T=0;for(let A=0;A<Qi;++A){const D=A/x,v=Math.exp(-D*D/2);f.push(v),A===0?T+=v:A<m&&(T+=2*v)}for(let A=0;A<f.length;A++)f[A]=f[A]/T;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const E=this._sizeLods[n],w=3*E*(n>M-zi?n-M+zi:0),b=4*(this._cubeSize-E);wn(e,w,b,3*E,2*E),l.setRenderTarget(e),l.render(d,$n)}}function Mf(r){const t=[],e=[],i=[];let n=r;const s=r-zi+1+Bo.length;for(let a=0;a<s;a++){const o=Math.pow(2,n);t.push(o);let l=1/o;a>r-zi?l=Bo[a-r+zi-1]:a===0&&(l=0),e.push(l);const h=1/(o-2),c=-h,d=1+h,u=[c,c,d,c,d,d,c,c,d,d,c,d],p=6,g=6,x=3,m=2,f=1,T=new Float32Array(x*g*p),M=new Float32Array(m*g*p),E=new Float32Array(f*g*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,D=b>2?0:-1,v=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];T.set(v,x*g*b),M.set(u,m*g*b);const y=[b,b,b,b,b,b];E.set(y,f*g*b)}const w=new Fe;w.setAttribute("position",new Ge(T,x)),w.setAttribute("uv",new Ge(M,m)),w.setAttribute("faceIndex",new Ge(E,f)),i.push(new se(w,null)),n>zi&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Go(r,t,e){const i=new sn(r,t,e);return i.texture.mapping=Ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wn(r,t,e,i,n){r.viewport.set(t,e,i,n),r.scissor.set(t,e,i,n)}function vf(r,t,e){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function bf(r,t,e){const i=new Float32Array(Qi),n=new L(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Qi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function ko(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Ho(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function js(){return`

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
	`}function yf(r){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,h=l===Zr||l===qr,c=l===Pn||l===In;if(h||c){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new zo(r)),d=h?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return h&&p&&p.height>0||c&&p&&n(p)?(e===null&&(e=new zo(r)),d=h?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function n(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function s(o){const l=o.target;l.removeEventListener("dispose",s);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Sf(r){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=r.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&ts("WebGLRenderer: "+i+" extension not supported."),n}}}function Tf(r,t,e,i){const n={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];const p=s.get(u);p&&(t.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)t.update(u[p],r.ARRAY_BUFFER)}function h(d){const u=[],p=d.index,g=d.attributes.position;let x=0;if(p!==null){const T=p.array;x=p.version;for(let M=0,E=T.length;M<E;M+=3){const w=T[M+0],b=T[M+1],A=T[M+2];u.push(w,b,b,A,A,w)}}else if(g!==void 0){const T=g.array;x=g.version;for(let M=0,E=T.length/3-1;M<E;M+=3){const w=M+0,b=M+1,A=M+2;u.push(w,b,b,A,A,w)}}else return;const m=new(Ml(u)?Sl:yl)(u,1);m.version=x;const f=s.get(d);f&&t.remove(f),s.set(d,m)}function c(d){const u=s.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&h(d)}else h(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:c}}function Ef(r,t,e){let i;function n(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function l(u,p){r.drawElements(i,p,s,u*a),e.update(p,i,1)}function h(u,p,g){g!==0&&(r.drawElementsInstanced(i,p,s,u*a,g),e.update(p,i,g))}function c(u,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,u,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function d(u,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<u.length;f++)h(u[f]/a,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,u,0,x,0,g);let f=0;for(let T=0;T<g;T++)f+=p[T]*x[T];e.update(f,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=d}function wf(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:fe("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Af(r,t,e){const i=new WeakMap,n=new ge;function s(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=c!==void 0?c.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let y=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",y)};var p=y;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],T=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),m===!0&&(E=3);let w=o.attributes.position.count*E,b=1;w>t.maxTextureSize&&(b=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const A=new Float32Array(w*b*4*d),D=new vl(A,w,b,d);D.type=mi,D.needsUpdate=!0;const v=E*4;for(let C=0;C<d;C++){const U=f[C],O=T[C],H=M[C],W=w*b*4*C;for(let q=0;q<U.count;q++){const J=q*v;g===!0&&(n.fromBufferAttribute(U,q),A[W+J+0]=n.x,A[W+J+1]=n.y,A[W+J+2]=n.z,A[W+J+3]=0),x===!0&&(n.fromBufferAttribute(O,q),A[W+J+4]=n.x,A[W+J+5]=n.y,A[W+J+6]=n.z,A[W+J+7]=0),m===!0&&(n.fromBufferAttribute(H,q),A[W+J+8]=n.x,A[W+J+9]=n.y,A[W+J+10]=n.z,A[W+J+11]=H.itemSize===4?n.w:1)}}u={count:d,texture:D,size:new bt(w,b)},i.set(o,u),o.addEventListener("dispose",y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",x),l.getUniforms().setValue(r,"morphTargetInfluences",h)}l.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Rf(r,t,e,i){let n=new WeakMap;function s(l){const h=i.render.frame,c=l.geometry,d=t.get(l,c);if(n.get(d)!==h&&(t.update(d),n.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==h&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),n.set(l,h))),l.isSkinnedMesh){const u=l.skeleton;n.get(u)!==h&&(u.update(),n.set(u,h))}return d}function a(){n=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:a}}const Nl=new Ce,Vo=new Il(1,1),Bl=new vl,Ol=new Wh,zl=new wl,Wo=[],Xo=[],Zo=new Float32Array(16),qo=new Float32Array(9),$o=new Float32Array(4);function Nn(r,t,e){const i=r[0];if(i<=0||i>0)return r;const n=t*e;let s=Wo[n];if(s===void 0&&(s=new Float32Array(n),Wo[n]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function be(r,t){if(r.length!==t.length)return!1;for(let e=0,i=r.length;e<i;e++)if(r[e]!==t[e])return!1;return!0}function ye(r,t){for(let e=0,i=t.length;e<i;e++)r[e]=t[e]}function Ks(r,t){let e=Xo[t];e===void 0&&(e=new Int32Array(t),Xo[t]=e);for(let i=0;i!==t;++i)e[i]=r.allocateTextureUnit();return e}function Cf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Df(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2fv(this.addr,t),ye(e,t)}}function Pf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;r.uniform3fv(this.addr,t),ye(e,t)}}function If(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4fv(this.addr,t),ye(e,t)}}function Lf(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(be(e,i))return;$o.set(i),r.uniformMatrix2fv(this.addr,!1,$o),ye(e,i)}}function Uf(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(be(e,i))return;qo.set(i),r.uniformMatrix3fv(this.addr,!1,qo),ye(e,i)}}function Ff(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(be(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(be(e,i))return;Zo.set(i),r.uniformMatrix4fv(this.addr,!1,Zo),ye(e,i)}}function Nf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Bf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2iv(this.addr,t),ye(e,t)}}function Of(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3iv(this.addr,t),ye(e,t)}}function zf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4iv(this.addr,t),ye(e,t)}}function Gf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function kf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;r.uniform2uiv(this.addr,t),ye(e,t)}}function Hf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;r.uniform3uiv(this.addr,t),ye(e,t)}}function Vf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;r.uniform4uiv(this.addr,t),ye(e,t)}}function Wf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(Vo.compareFunction=_l,s=Vo):s=Nl,e.setTexture2D(t||s,n)}function Xf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Ol,n)}function Zf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||zl,n)}function qf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Bl,n)}function $f(r){switch(r){case 5126:return Cf;case 35664:return Df;case 35665:return Pf;case 35666:return If;case 35674:return Lf;case 35675:return Uf;case 35676:return Ff;case 5124:case 35670:return Nf;case 35667:case 35671:return Bf;case 35668:case 35672:return Of;case 35669:case 35673:return zf;case 5125:return Gf;case 36294:return kf;case 36295:return Hf;case 36296:return Vf;case 35678:case 36198:case 36298:case 36306:case 35682:return Wf;case 35679:case 36299:case 36307:return Xf;case 35680:case 36300:case 36308:case 36293:return Zf;case 36289:case 36303:case 36311:case 36292:return qf}}function Yf(r,t){r.uniform1fv(this.addr,t)}function jf(r,t){const e=Nn(t,this.size,2);r.uniform2fv(this.addr,e)}function Kf(r,t){const e=Nn(t,this.size,3);r.uniform3fv(this.addr,e)}function Jf(r,t){const e=Nn(t,this.size,4);r.uniform4fv(this.addr,e)}function Qf(r,t){const e=Nn(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function tp(r,t){const e=Nn(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function ep(r,t){const e=Nn(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function ip(r,t){r.uniform1iv(this.addr,t)}function np(r,t){r.uniform2iv(this.addr,t)}function sp(r,t){r.uniform3iv(this.addr,t)}function rp(r,t){r.uniform4iv(this.addr,t)}function ap(r,t){r.uniform1uiv(this.addr,t)}function op(r,t){r.uniform2uiv(this.addr,t)}function lp(r,t){r.uniform3uiv(this.addr,t)}function hp(r,t){r.uniform4uiv(this.addr,t)}function cp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);be(i,s)||(r.uniform1iv(this.addr,s),ye(i,s));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Nl,s[a])}function dp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);be(i,s)||(r.uniform1iv(this.addr,s),ye(i,s));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||Ol,s[a])}function up(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);be(i,s)||(r.uniform1iv(this.addr,s),ye(i,s));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||zl,s[a])}function fp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);be(i,s)||(r.uniform1iv(this.addr,s),ye(i,s));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Bl,s[a])}function pp(r){switch(r){case 5126:return Yf;case 35664:return jf;case 35665:return Kf;case 35666:return Jf;case 35674:return Qf;case 35675:return tp;case 35676:return ep;case 5124:case 35670:return ip;case 35667:case 35671:return np;case 35668:case 35672:return sp;case 35669:case 35673:return rp;case 5125:return ap;case 36294:return op;case 36295:return lp;case 36296:return hp;case 35678:case 36198:case 36298:case 36306:case 35682:return cp;case 35679:case 36299:case 36307:return dp;case 35680:case 36300:case 36308:case 36293:return up;case 36289:case 36303:case 36311:case 36292:return fp}}class mp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=$f(e.type)}}class gp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=pp(e.type)}}class xp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,a=n.length;s!==a;++s){const o=n[s];o.setValue(t,e[o.id],i)}}}const Ir=/(\w+)(\])?(\[|\.)?/g;function Yo(r,t){r.seq.push(t),r.map[t.id]=t}function _p(r,t,e){const i=r.name,n=i.length;for(Ir.lastIndex=0;;){const s=Ir.exec(i),a=Ir.lastIndex;let o=s[1];const l=s[2]==="]",h=s[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===n){Yo(e,h===void 0?new mp(o,r,t):new gp(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new xp(o),Yo(e,d)),e=d}}}class ks{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),a=t.getUniformLocation(e,s.name);_p(s,a,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function jo(r,t,e){const i=r.createShader(t);return r.shaderSource(i,e),r.compileShader(i),i}const Mp=37297;let vp=0;function bp(r,t){const e=r.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=n;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Ko=new Bt;function yp(r){$t._getMatrix(Ko,$t.workingColorSpace,r);const t=`mat3( ${Ko.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(r)){case Hs:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Jo(r,t,e){const i=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+bp(r.getShaderSource(t),o)}else return s}function Sp(r,t){const e=yp(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Tp(r,t){let e;switch(t){case xh:e="Linear";break;case _h:e="Reinhard";break;case Mh:e="Cineon";break;case vh:e="ACESFilmic";break;case yh:e="AgX";break;case Sh:e="Neutral";break;case bh:e="Custom";break;default:Lt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Us=new L;function Ep(){$t.getLuminanceCoefficients(Us);const r=Us.x.toFixed(4),t=Us.y.toFixed(4),e=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wp(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yn).join(`
`)}function Ap(r){const t=[];for(const e in r){const i=r[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Rp(r,t){const e={},i=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=r.getActiveAttrib(t,n),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function Yn(r){return r!==""}function Qo(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function tl(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Cp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(r){return r.replace(Cp,Pp)}const Dp=new Map;function Pp(r,t){let e=Ot[t];if(e===void 0){const i=Dp.get(t);if(i!==void 0)e=Ot[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ra(e)}const Ip=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function el(r){return r.replace(Ip,Lp)}function Lp(r,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function il(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Up(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===cl?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===jl?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function Fp(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Pn:case In:t="ENVMAP_TYPE_CUBE";break;case Ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Np(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case In:t="ENVMAP_MODE_REFRACTION";break}return t}function Bp(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Da:t="ENVMAP_BLENDING_MULTIPLY";break;case mh:t="ENVMAP_BLENDING_MIX";break;case gh:t="ENVMAP_BLENDING_ADD";break}return t}function Op(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function zp(r,t,e,i){const n=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Up(e),h=Fp(e),c=Np(e),d=Bp(e),u=Op(e),p=wp(e),g=Ap(s),x=n.createProgram();let m,f,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yn).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yn).join(`
`),f.length>0&&(f+=`
`)):(m=[il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yn).join(`
`),f=[il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gi?"#define TONE_MAPPING":"",e.toneMapping!==Gi?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Gi?Tp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,Sp("linearToOutputTexel",e.outputColorSpace),Ep(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yn).join(`
`)),a=Ra(a),a=Qo(a,e),a=tl(a,e),o=Ra(o),o=Qo(o,e),o=tl(o,e),a=el(a),o=el(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===eo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===eo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=T+m+a,E=T+f+o,w=jo(n,n.VERTEX_SHADER,M),b=jo(n,n.FRAGMENT_SHADER,E);n.attachShader(x,w),n.attachShader(x,b),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function A(C){if(r.debug.checkShaderErrors){const U=n.getProgramInfoLog(x)||"",O=n.getShaderInfoLog(w)||"",H=n.getShaderInfoLog(b)||"",W=U.trim(),q=O.trim(),J=H.trim();let k=!0,et=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,x,w,b);else{const it=Jo(n,w,"vertex"),yt=Jo(n,b,"fragment");fe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+it+`
`+yt)}else W!==""?Lt("WebGLProgram: Program Info Log:",W):(q===""||J==="")&&(et=!1);et&&(C.diagnostics={runnable:k,programLog:W,vertexShader:{log:q,prefix:m},fragmentShader:{log:J,prefix:f}})}n.deleteShader(w),n.deleteShader(b),D=new ks(n,x),v=Rp(n,x)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let v;this.getAttributes=function(){return v===void 0&&A(this),v};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=n.getProgramParameter(x,Mp)),y},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vp++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=b,this}let Gp=0;class kp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Hp(t),e.set(t,i)),i}}class Hp{constructor(t){this.id=Gp++,this.code=t,this.usedTimes=0}}function Vp(r,t,e,i,n,s,a){const o=new ka,l=new kp,h=new Set,c=[],d=n.logarithmicDepthBuffer,u=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return h.add(v),v===0?"uv":`uv${v}`}function m(v,y,C,U,O){const H=U.fog,W=O.geometry,q=v.isMeshStandardMaterial?U.environment:null,J=(v.isMeshStandardMaterial?e:t).get(v.envMap||q),k=J&&J.mapping===Ys?J.image.height:null,et=g[v.type];v.precision!==null&&(p=n.getMaxPrecision(v.precision),p!==v.precision&&Lt("WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const it=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,yt=it!==void 0?it.length:0;let Ht=0;W.morphAttributes.position!==void 0&&(Ht=1),W.morphAttributes.normal!==void 0&&(Ht=2),W.morphAttributes.color!==void 0&&(Ht=3);let Zt,Yt,Jt,X;if(et){const Qt=fi[et];Zt=Qt.vertexShader,Yt=Qt.fragmentShader}else Zt=v.vertexShader,Yt=v.fragmentShader,l.update(v),Jt=l.getVertexShaderID(v),X=l.getFragmentShaderID(v);const $=r.getRenderTarget(),ht=r.state.buffers.depth.getReversed(),Et=O.isInstancedMesh===!0,Mt=O.isBatchedMesh===!0,Nt=!!v.map,_e=!!v.matcap,zt=!!J,he=!!v.aoMap,P=!!v.lightMap,Vt=!!v.bumpMap,Wt=!!v.normalMap,ae=!!v.displacementMap,xt=!!v.emissiveMap,ce=!!v.metalnessMap,Tt=!!v.roughnessMap,Ft=v.anisotropy>0,R=v.clearcoat>0,_=v.dispersion>0,B=v.iridescence>0,Z=v.sheen>0,j=v.transmission>0,V=Ft&&!!v.anisotropyMap,vt=R&&!!v.clearcoatMap,ot=R&&!!v.clearcoatNormalMap,wt=R&&!!v.clearcoatRoughnessMap,_t=B&&!!v.iridescenceMap,K=B&&!!v.iridescenceThicknessMap,nt=Z&&!!v.sheenColorMap,Dt=Z&&!!v.sheenRoughnessMap,Rt=!!v.specularMap,dt=!!v.specularColorMap,It=!!v.specularIntensityMap,I=j&&!!v.transmissionMap,lt=j&&!!v.thicknessMap,st=!!v.gradientMap,rt=!!v.alphaMap,Q=v.alphaTest>0,Y=!!v.alphaHash,mt=!!v.extensions;let Ut=Gi;v.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ut=r.toneMapping);const oe={shaderID:et,shaderType:v.type,shaderName:v.name,vertexShader:Zt,fragmentShader:Yt,defines:v.defines,customVertexShaderID:Jt,customFragmentShaderID:X,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:Mt,batchingColor:Mt&&O._colorsTexture!==null,instancing:Et,instancingColor:Et&&O.instanceColor!==null,instancingMorph:Et&&O.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:$===null?r.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ln,alphaToCoverage:!!v.alphaToCoverage,map:Nt,matcap:_e,envMap:zt,envMapMode:zt&&J.mapping,envMapCubeUVHeight:k,aoMap:he,lightMap:P,bumpMap:Vt,normalMap:Wt,displacementMap:u&&ae,emissiveMap:xt,normalMapObjectSpace:Wt&&v.normalMapType===Ah,normalMapTangentSpace:Wt&&v.normalMapType===za,metalnessMap:ce,roughnessMap:Tt,anisotropy:Ft,anisotropyMap:V,clearcoat:R,clearcoatMap:vt,clearcoatNormalMap:ot,clearcoatRoughnessMap:wt,dispersion:_,iridescence:B,iridescenceMap:_t,iridescenceThicknessMap:K,sheen:Z,sheenColorMap:nt,sheenRoughnessMap:Dt,specularMap:Rt,specularColorMap:dt,specularIntensityMap:It,transmission:j,transmissionMap:I,thicknessMap:lt,gradientMap:st,opaque:v.transparent===!1&&v.blending===tn&&v.alphaToCoverage===!1,alphaMap:rt,alphaTest:Q,alphaHash:Y,combine:v.combine,mapUv:Nt&&x(v.map.channel),aoMapUv:he&&x(v.aoMap.channel),lightMapUv:P&&x(v.lightMap.channel),bumpMapUv:Vt&&x(v.bumpMap.channel),normalMapUv:Wt&&x(v.normalMap.channel),displacementMapUv:ae&&x(v.displacementMap.channel),emissiveMapUv:xt&&x(v.emissiveMap.channel),metalnessMapUv:ce&&x(v.metalnessMap.channel),roughnessMapUv:Tt&&x(v.roughnessMap.channel),anisotropyMapUv:V&&x(v.anisotropyMap.channel),clearcoatMapUv:vt&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:ot&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&x(v.sheenRoughnessMap.channel),specularMapUv:Rt&&x(v.specularMap.channel),specularColorMapUv:dt&&x(v.specularColorMap.channel),specularIntensityMapUv:It&&x(v.specularIntensityMap.channel),transmissionMapUv:I&&x(v.transmissionMap.channel),thicknessMapUv:lt&&x(v.thicknessMap.channel),alphaMapUv:rt&&x(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Wt||Ft),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(Nt||rt),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ht,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Ht,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Nt&&v.map.isVideoTexture===!0&&$t.getTransfer(v.map.colorSpace)===ee,decodeVideoTextureEmissive:xt&&v.emissiveMap.isVideoTexture===!0&&$t.getTransfer(v.emissiveMap.colorSpace)===ee,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ye,flipSided:v.side===ze,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:mt&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&v.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return oe.vertexUv1s=h.has(1),oe.vertexUv2s=h.has(2),oe.vertexUv3s=h.has(3),h.clear(),oe}function f(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)y.push(C),y.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(T(y,v),M(y,v),y.push(r.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function T(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function M(v,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),v.push(o.mask)}function E(v){const y=g[v.type];let C;if(y){const U=fi[y];C=nc.clone(U.uniforms)}else C=v.uniforms;return C}function w(v,y){let C;for(let U=0,O=c.length;U<O;U++){const H=c[U];if(H.cacheKey===y){C=H,++C.usedTimes;break}}return C===void 0&&(C=new zp(r,y,v,s),c.push(C)),C}function b(v){if(--v.usedTimes===0){const y=c.indexOf(v);c[y]=c[c.length-1],c.pop(),v.destroy()}}function A(v){l.remove(v)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:E,acquireProgram:w,releaseProgram:b,releaseShaderCache:A,programs:c,dispose:D}}function Wp(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function i(a){r.delete(a)}function n(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function Xp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function nl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function sl(){const r=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function a(d,u,p,g,x,m){let f=r[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},r[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=p,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=x,f.group=m),t++,f}function o(d,u,p,g,x,m){const f=a(d,u,p,g,x,m);p.transmission>0?i.push(f):p.transparent===!0?n.push(f):e.push(f)}function l(d,u,p,g,x,m){const f=a(d,u,p,g,x,m);p.transmission>0?i.unshift(f):p.transparent===!0?n.unshift(f):e.unshift(f)}function h(d,u){e.length>1&&e.sort(d||Xp),i.length>1&&i.sort(u||nl),n.length>1&&n.sort(u||nl)}function c(){for(let d=t,u=r.length;d<u;d++){const p=r[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:c,sort:h}}function Zp(){let r=new WeakMap;function t(i,n){const s=r.get(i);let a;return s===void 0?(a=new sl,r.set(i,[a])):n>=s.length?(a=new sl,s.push(a)):a=s[n],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function qp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new ut};break;case"SpotLight":e={position:new L,direction:new L,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":e={color:new ut,position:new L,halfWidth:new L,halfHeight:new L};break}return r[t.id]=e,e}}}function $p(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Yp=0;function jp(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Kp(r){const t=new qp,e=$p(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new L);const n=new L,s=new Kt,a=new Kt;function o(h){let c=0,d=0,u=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,T=0,M=0,E=0,w=0,b=0,A=0;h.sort(jp);for(let v=0,y=h.length;v<y;v++){const C=h[v],U=C.color,O=C.intensity,H=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)c+=U.r*O,d+=U.g*O,u+=U.b*O;else if(C.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(C.sh.coefficients[q],O);A++}else if(C.isDirectionalLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,k=e.get(C);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,i.directionalShadow[p]=k,i.directionalShadowMap[p]=W,i.directionalShadowMatrix[p]=C.shadow.matrix,T++}i.directional[p]=q,p++}else if(C.isSpotLight){const q=t.get(C);q.position.setFromMatrixPosition(C.matrixWorld),q.color.copy(U).multiplyScalar(O),q.distance=H,q.coneCos=Math.cos(C.angle),q.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),q.decay=C.decay,i.spot[x]=q;const J=C.shadow;if(C.map&&(i.spotLightMap[w]=C.map,w++,J.updateMatrices(C),C.castShadow&&b++),i.spotLightMatrix[x]=J.matrix,C.castShadow){const k=e.get(C);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,i.spotShadow[x]=k,i.spotShadowMap[x]=W,E++}x++}else if(C.isRectAreaLight){const q=t.get(C);q.color.copy(U).multiplyScalar(O),q.halfWidth.set(C.width*.5,0,0),q.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=q,m++}else if(C.isPointLight){const q=t.get(C);if(q.color.copy(C.color).multiplyScalar(C.intensity),q.distance=C.distance,q.decay=C.decay,C.castShadow){const J=C.shadow,k=e.get(C);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,k.shadowCameraNear=J.camera.near,k.shadowCameraFar=J.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=C.shadow.matrix,M++}i.point[g]=q,g++}else if(C.isHemisphereLight){const q=t.get(C);q.skyColor.copy(C.color).multiplyScalar(O),q.groundColor.copy(C.groundColor).multiplyScalar(O),i.hemi[f]=q,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=u;const D=i.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==T||D.numPointShadows!==M||D.numSpotShadows!==E||D.numSpotMaps!==w||D.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,D.directionalLength=p,D.pointLength=g,D.spotLength=x,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=T,D.numPointShadows=M,D.numSpotShadows=E,D.numSpotMaps=w,D.numLightProbes=A,i.version=Yp++)}function l(h,c){let d=0,u=0,p=0,g=0,x=0;const m=c.matrixWorldInverse;for(let f=0,T=h.length;f<T;f++){const M=h[f];if(M.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(m),d++}else if(M.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(M.matrixWorld),n.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),a.identity(),s.copy(M.matrixWorld),s.premultiply(m),a.extractRotation(s),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const E=i.hemi[x];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function rl(r){const t=new Kp(r),e=[],i=[];function n(c){h.camera=c,e.length=0,i.length=0}function s(c){e.push(c)}function a(c){i.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:h,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function Jp(r){let t=new WeakMap;function e(n,s=0){const a=t.get(n);let o;return a===void 0?(o=new rl(r),t.set(n,[o])):s>=a.length?(o=new rl(r),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const Qp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tm=`uniform sampler2D shadow_pass;
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
}`;function em(r,t,e){let i=new ns;const n=new bt,s=new bt,a=new ge,o=new Mc({depthPacking:wh}),l=new vc,h={},c=e.maxTextureSize,d={[Hi]:ze,[ze]:Hi,[Ye]:Ye},u=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:Qp,fragmentShader:tm}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Fe;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new se(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cl;let f=this.type;this.render=function(b,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const v=r.getRenderTarget(),y=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Ai),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const O=f!==Ei&&this.type===Ei,H=f===Ei&&this.type!==Ei;for(let W=0,q=b.length;W<q;W++){const J=b[W],k=J.shadow;if(k===void 0){Lt("WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;n.copy(k.mapSize);const et=k.getFrameExtents();if(n.multiply(et),s.copy(k.mapSize),(n.x>c||n.y>c)&&(n.x>c&&(s.x=Math.floor(c/et.x),n.x=s.x*et.x,k.mapSize.x=s.x),n.y>c&&(s.y=Math.floor(c/et.y),n.y=s.y*et.y,k.mapSize.y=s.y)),k.map===null||O===!0||H===!0){const yt=this.type!==Ei?{minFilter:je,magFilter:je}:{};k.map!==null&&k.map.dispose(),k.map=new sn(n.x,n.y,yt),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const it=k.getViewportCount();for(let yt=0;yt<it;yt++){const Ht=k.getViewport(yt);a.set(s.x*Ht.x,s.y*Ht.y,s.x*Ht.z,s.y*Ht.w),U.viewport(a),k.updateMatrices(J,yt),i=k.getFrustum(),E(A,D,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===Ei&&T(k,D),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(v,y,C)};function T(b,A){const D=t.update(x);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new sn(n.x,n.y)),u.uniforms.shadow_pass.value=b.map.texture,u.uniforms.resolution.value=b.mapSize,u.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(A,null,D,u,x,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(A,null,D,p,x,null)}function M(b,A,D,v){let y=null;const C=D.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(C!==void 0)y=C;else if(y=D.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=y.uuid,O=A.uuid;let H=h[U];H===void 0&&(H={},h[U]=H);let W=H[O];W===void 0&&(W=y.clone(),H[O]=W,A.addEventListener("dispose",w)),y=W}if(y.visible=A.visible,y.wireframe=A.wireframe,v===Ei?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,D.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const U=r.properties.get(y);U.light=D}return y}function E(b,A,D,v,y){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&y===Ei)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,b.matrixWorld);const O=t.update(b),H=b.material;if(Array.isArray(H)){const W=O.groups;for(let q=0,J=W.length;q<J;q++){const k=W[q],et=H[k.materialIndex];if(et&&et.visible){const it=M(b,et,v,y);b.onBeforeShadow(r,b,A,D,O,it,k),r.renderBufferDirect(D,null,O,it,b,k),b.onAfterShadow(r,b,A,D,O,it,k)}}}else if(H.visible){const W=M(b,H,v,y);b.onBeforeShadow(r,b,A,D,O,W,null),r.renderBufferDirect(D,null,O,W,b,null),b.onAfterShadow(r,b,A,D,O,W,null)}}const U=b.children;for(let O=0,H=U.length;O<H;O++)E(U[O],A,D,v,y)}function w(b){b.target.removeEventListener("dispose",w);for(const D in h){const v=h[D],y=b.target.uuid;y in v&&(v[y].dispose(),delete v[y])}}}const im={[zr]:Gr,[kr]:Wr,[Hr]:Xr,[Dn]:Vr,[Gr]:zr,[Wr]:kr,[Xr]:Hr,[Vr]:Dn};function nm(r,t){function e(){let I=!1;const lt=new ge;let st=null;const rt=new ge(0,0,0,0);return{setMask:function(Q){st!==Q&&!I&&(r.colorMask(Q,Q,Q,Q),st=Q)},setLocked:function(Q){I=Q},setClear:function(Q,Y,mt,Ut,oe){oe===!0&&(Q*=Ut,Y*=Ut,mt*=Ut),lt.set(Q,Y,mt,Ut),rt.equals(lt)===!1&&(r.clearColor(Q,Y,mt,Ut),rt.copy(lt))},reset:function(){I=!1,st=null,rt.set(-1,0,0,0)}}}function i(){let I=!1,lt=!1,st=null,rt=null,Q=null;return{setReversed:function(Y){if(lt!==Y){const mt=t.get("EXT_clip_control");Y?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT),lt=Y;const Ut=Q;Q=null,this.setClear(Ut)}},getReversed:function(){return lt},setTest:function(Y){Y?$(r.DEPTH_TEST):ht(r.DEPTH_TEST)},setMask:function(Y){st!==Y&&!I&&(r.depthMask(Y),st=Y)},setFunc:function(Y){if(lt&&(Y=im[Y]),rt!==Y){switch(Y){case zr:r.depthFunc(r.NEVER);break;case Gr:r.depthFunc(r.ALWAYS);break;case kr:r.depthFunc(r.LESS);break;case Dn:r.depthFunc(r.LEQUAL);break;case Hr:r.depthFunc(r.EQUAL);break;case Vr:r.depthFunc(r.GEQUAL);break;case Wr:r.depthFunc(r.GREATER);break;case Xr:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}rt=Y}},setLocked:function(Y){I=Y},setClear:function(Y){Q!==Y&&(lt&&(Y=1-Y),r.clearDepth(Y),Q=Y)},reset:function(){I=!1,st=null,rt=null,Q=null,lt=!1}}}function n(){let I=!1,lt=null,st=null,rt=null,Q=null,Y=null,mt=null,Ut=null,oe=null;return{setTest:function(Qt){I||(Qt?$(r.STENCIL_TEST):ht(r.STENCIL_TEST))},setMask:function(Qt){lt!==Qt&&!I&&(r.stencilMask(Qt),lt=Qt)},setFunc:function(Qt,ui,si){(st!==Qt||rt!==ui||Q!==si)&&(r.stencilFunc(Qt,ui,si),st=Qt,rt=ui,Q=si)},setOp:function(Qt,ui,si){(Y!==Qt||mt!==ui||Ut!==si)&&(r.stencilOp(Qt,ui,si),Y=Qt,mt=ui,Ut=si)},setLocked:function(Qt){I=Qt},setClear:function(Qt){oe!==Qt&&(r.clearStencil(Qt),oe=Qt)},reset:function(){I=!1,lt=null,st=null,rt=null,Q=null,Y=null,mt=null,Ut=null,oe=null}}}const s=new e,a=new i,o=new n,l=new WeakMap,h=new WeakMap;let c={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,T=null,M=null,E=null,w=null,b=null,A=new ut(0,0,0),D=0,v=!1,y=null,C=null,U=null,O=null,H=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,J=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(k)[1]),q=J>=1):k.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),q=J>=2);let et=null,it={};const yt=r.getParameter(r.SCISSOR_BOX),Ht=r.getParameter(r.VIEWPORT),Zt=new ge().fromArray(yt),Yt=new ge().fromArray(Ht);function Jt(I,lt,st,rt){const Q=new Uint8Array(4),Y=r.createTexture();r.bindTexture(I,Y),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let mt=0;mt<st;mt++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(lt,0,r.RGBA,1,1,rt,0,r.RGBA,r.UNSIGNED_BYTE,Q):r.texImage2D(lt+mt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Q);return Y}const X={};X[r.TEXTURE_2D]=Jt(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=Jt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=Jt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=Jt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),$(r.DEPTH_TEST),a.setFunc(Dn),Vt(!1),Wt(Ka),$(r.CULL_FACE),he(Ai);function $(I){c[I]!==!0&&(r.enable(I),c[I]=!0)}function ht(I){c[I]!==!1&&(r.disable(I),c[I]=!1)}function Et(I,lt){return d[I]!==lt?(r.bindFramebuffer(I,lt),d[I]=lt,I===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=lt),I===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=lt),!0):!1}function Mt(I,lt){let st=p,rt=!1;if(I){st=u.get(lt),st===void 0&&(st=[],u.set(lt,st));const Q=I.textures;if(st.length!==Q.length||st[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,mt=Q.length;Y<mt;Y++)st[Y]=r.COLOR_ATTACHMENT0+Y;st.length=Q.length,rt=!0}}else st[0]!==r.BACK&&(st[0]=r.BACK,rt=!0);rt&&r.drawBuffers(st)}function Nt(I){return g!==I?(r.useProgram(I),g=I,!0):!1}const _e={[Ji]:r.FUNC_ADD,[Jl]:r.FUNC_SUBTRACT,[Ql]:r.FUNC_REVERSE_SUBTRACT};_e[th]=r.MIN,_e[eh]=r.MAX;const zt={[ih]:r.ZERO,[nh]:r.ONE,[sh]:r.SRC_COLOR,[Br]:r.SRC_ALPHA,[ch]:r.SRC_ALPHA_SATURATE,[lh]:r.DST_COLOR,[ah]:r.DST_ALPHA,[rh]:r.ONE_MINUS_SRC_COLOR,[Or]:r.ONE_MINUS_SRC_ALPHA,[hh]:r.ONE_MINUS_DST_COLOR,[oh]:r.ONE_MINUS_DST_ALPHA,[dh]:r.CONSTANT_COLOR,[uh]:r.ONE_MINUS_CONSTANT_COLOR,[fh]:r.CONSTANT_ALPHA,[ph]:r.ONE_MINUS_CONSTANT_ALPHA};function he(I,lt,st,rt,Q,Y,mt,Ut,oe,Qt){if(I===Ai){x===!0&&(ht(r.BLEND),x=!1);return}if(x===!1&&($(r.BLEND),x=!0),I!==Kl){if(I!==m||Qt!==v){if((f!==Ji||E!==Ji)&&(r.blendEquation(r.FUNC_ADD),f=Ji,E=Ji),Qt)switch(I){case tn:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Nr:r.blendFunc(r.ONE,r.ONE);break;case Ja:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Qa:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:fe("WebGLState: Invalid blending: ",I);break}else switch(I){case tn:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Nr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Ja:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qa:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",I);break}T=null,M=null,w=null,b=null,A.set(0,0,0),D=0,m=I,v=Qt}return}Q=Q||lt,Y=Y||st,mt=mt||rt,(lt!==f||Q!==E)&&(r.blendEquationSeparate(_e[lt],_e[Q]),f=lt,E=Q),(st!==T||rt!==M||Y!==w||mt!==b)&&(r.blendFuncSeparate(zt[st],zt[rt],zt[Y],zt[mt]),T=st,M=rt,w=Y,b=mt),(Ut.equals(A)===!1||oe!==D)&&(r.blendColor(Ut.r,Ut.g,Ut.b,oe),A.copy(Ut),D=oe),m=I,v=!1}function P(I,lt){I.side===Ye?ht(r.CULL_FACE):$(r.CULL_FACE);let st=I.side===ze;lt&&(st=!st),Vt(st),I.blending===tn&&I.transparent===!1?he(Ai):he(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const rt=I.stencilWrite;o.setTest(rt),rt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),xt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?$(r.SAMPLE_ALPHA_TO_COVERAGE):ht(r.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(I){y!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),y=I)}function Wt(I){I!==$l?($(r.CULL_FACE),I!==C&&(I===Ka?r.cullFace(r.BACK):I===Yl?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ht(r.CULL_FACE),C=I}function ae(I){I!==U&&(q&&r.lineWidth(I),U=I)}function xt(I,lt,st){I?($(r.POLYGON_OFFSET_FILL),(O!==lt||H!==st)&&(r.polygonOffset(lt,st),O=lt,H=st)):ht(r.POLYGON_OFFSET_FILL)}function ce(I){I?$(r.SCISSOR_TEST):ht(r.SCISSOR_TEST)}function Tt(I){I===void 0&&(I=r.TEXTURE0+W-1),et!==I&&(r.activeTexture(I),et=I)}function Ft(I,lt,st){st===void 0&&(et===null?st=r.TEXTURE0+W-1:st=et);let rt=it[st];rt===void 0&&(rt={type:void 0,texture:void 0},it[st]=rt),(rt.type!==I||rt.texture!==lt)&&(et!==st&&(r.activeTexture(st),et=st),r.bindTexture(I,lt||X[I]),rt.type=I,rt.texture=lt)}function R(){const I=it[et];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function _(){try{r.compressedTexImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function B(){try{r.compressedTexImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function Z(){try{r.texSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function j(){try{r.texSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function V(){try{r.compressedTexSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function vt(){try{r.compressedTexSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function ot(){try{r.texStorage2D(...arguments)}catch(I){I("WebGLState:",I)}}function wt(){try{r.texStorage3D(...arguments)}catch(I){I("WebGLState:",I)}}function _t(){try{r.texImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function K(){try{r.texImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function nt(I){Zt.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),Zt.copy(I))}function Dt(I){Yt.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Yt.copy(I))}function Rt(I,lt){let st=h.get(lt);st===void 0&&(st=new WeakMap,h.set(lt,st));let rt=st.get(I);rt===void 0&&(rt=r.getUniformBlockIndex(lt,I.name),st.set(I,rt))}function dt(I,lt){const rt=h.get(lt).get(I);l.get(lt)!==rt&&(r.uniformBlockBinding(lt,rt,I.__bindingPointIndex),l.set(lt,rt))}function It(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},et=null,it={},d={},u=new WeakMap,p=[],g=null,x=!1,m=null,f=null,T=null,M=null,E=null,w=null,b=null,A=new ut(0,0,0),D=0,v=!1,y=null,C=null,U=null,O=null,H=null,Zt.set(0,0,r.canvas.width,r.canvas.height),Yt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:$,disable:ht,bindFramebuffer:Et,drawBuffers:Mt,useProgram:Nt,setBlending:he,setMaterial:P,setFlipSided:Vt,setCullFace:Wt,setLineWidth:ae,setPolygonOffset:xt,setScissorTest:ce,activeTexture:Tt,bindTexture:Ft,unbindTexture:R,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:_t,texImage3D:K,updateUBOMapping:Rt,uniformBlockBinding:dt,texStorage2D:ot,texStorage3D:wt,texSubImage2D:Z,texSubImage3D:j,compressedTexSubImage2D:V,compressedTexSubImage3D:vt,scissor:nt,viewport:Dt,reset:It}}function sm(r,t,e,i,n,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new bt,c=new WeakMap;let d;const u=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,_){return p?new OffscreenCanvas(R,_):Ws("canvas")}function x(R,_,B){let Z=1;const j=Ft(R);if((j.width>B||j.height>B)&&(Z=B/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const V=Math.floor(Z*j.width),vt=Math.floor(Z*j.height);d===void 0&&(d=g(V,vt));const ot=_?g(V,vt):d;return ot.width=V,ot.height=vt,ot.getContext("2d").drawImage(R,0,0,V,vt),Lt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+V+"x"+vt+")."),ot}else return"data"in R&&Lt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),R;return R}function m(R){return R.generateMipmaps}function f(R){r.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(R,_,B,Z,j=!1){if(R!==null){if(r[R]!==void 0)return r[R];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let V=_;if(_===r.RED&&(B===r.FLOAT&&(V=r.R32F),B===r.HALF_FLOAT&&(V=r.R16F),B===r.UNSIGNED_BYTE&&(V=r.R8)),_===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(V=r.R8UI),B===r.UNSIGNED_SHORT&&(V=r.R16UI),B===r.UNSIGNED_INT&&(V=r.R32UI),B===r.BYTE&&(V=r.R8I),B===r.SHORT&&(V=r.R16I),B===r.INT&&(V=r.R32I)),_===r.RG&&(B===r.FLOAT&&(V=r.RG32F),B===r.HALF_FLOAT&&(V=r.RG16F),B===r.UNSIGNED_BYTE&&(V=r.RG8)),_===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(V=r.RG8UI),B===r.UNSIGNED_SHORT&&(V=r.RG16UI),B===r.UNSIGNED_INT&&(V=r.RG32UI),B===r.BYTE&&(V=r.RG8I),B===r.SHORT&&(V=r.RG16I),B===r.INT&&(V=r.RG32I)),_===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&(V=r.RGB8UI),B===r.UNSIGNED_SHORT&&(V=r.RGB16UI),B===r.UNSIGNED_INT&&(V=r.RGB32UI),B===r.BYTE&&(V=r.RGB8I),B===r.SHORT&&(V=r.RGB16I),B===r.INT&&(V=r.RGB32I)),_===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&(V=r.RGBA8UI),B===r.UNSIGNED_SHORT&&(V=r.RGBA16UI),B===r.UNSIGNED_INT&&(V=r.RGBA32UI),B===r.BYTE&&(V=r.RGBA8I),B===r.SHORT&&(V=r.RGBA16I),B===r.INT&&(V=r.RGBA32I)),_===r.RGB&&(B===r.UNSIGNED_INT_5_9_9_9_REV&&(V=r.RGB9_E5),B===r.UNSIGNED_INT_10F_11F_11F_REV&&(V=r.R11F_G11F_B10F)),_===r.RGBA){const vt=j?Hs:$t.getTransfer(Z);B===r.FLOAT&&(V=r.RGBA32F),B===r.HALF_FLOAT&&(V=r.RGBA16F),B===r.UNSIGNED_BYTE&&(V=vt===ee?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(V=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(V=r.RGB5_A1)}return(V===r.R16F||V===r.R32F||V===r.RG16F||V===r.RG32F||V===r.RGBA16F||V===r.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function E(R,_){let B;return R?_===null||_===en||_===Kn?B=r.DEPTH24_STENCIL8:_===mi?B=r.DEPTH32F_STENCIL8:_===jn&&(B=r.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===en||_===Kn?B=r.DEPTH_COMPONENT24:_===mi?B=r.DEPTH_COMPONENT32F:_===jn&&(B=r.DEPTH_COMPONENT16),B}function w(R,_){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==je&&R.minFilter!==ei?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function b(R){const _=R.target;_.removeEventListener("dispose",b),D(_),_.isVideoTexture&&c.delete(_)}function A(R){const _=R.target;_.removeEventListener("dispose",A),y(_)}function D(R){const _=i.get(R);if(_.__webglInit===void 0)return;const B=R.source,Z=u.get(B);if(Z){const j=Z[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&v(R),Object.keys(Z).length===0&&u.delete(B)}i.remove(R)}function v(R){const _=i.get(R);r.deleteTexture(_.__webglTexture);const B=R.source,Z=u.get(B);delete Z[_.__cacheKey],a.memory.textures--}function y(R){const _=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let j=0;j<_.__webglFramebuffer[Z].length;j++)r.deleteFramebuffer(_.__webglFramebuffer[Z][j]);else r.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)r.deleteFramebuffer(_.__webglFramebuffer[Z]);else r.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&r.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&r.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=R.textures;for(let Z=0,j=B.length;Z<j;Z++){const V=i.get(B[Z]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),a.memory.textures--),i.remove(B[Z])}i.remove(R)}let C=0;function U(){C=0}function O(){const R=C;return R>=n.maxTextures&&Lt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+n.maxTextures),C+=1,R}function H(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function W(R,_){const B=i.get(R);if(R.isVideoTexture&&ce(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){const Z=R.image;if(Z===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,R,_);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+_)}function q(R,_){const B=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){X(B,R,_);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+_)}function J(R,_){const B=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){X(B,R,_);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+_)}function k(R,_){const B=i.get(R);if(R.version>0&&B.__version!==R.version){$(B,R,_);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+_)}const et={[$r]:r.REPEAT,[wi]:r.CLAMP_TO_EDGE,[Yr]:r.MIRRORED_REPEAT},it={[je]:r.NEAREST,[Th]:r.NEAREST_MIPMAP_NEAREST,[os]:r.NEAREST_MIPMAP_LINEAR,[ei]:r.LINEAR,[er]:r.LINEAR_MIPMAP_NEAREST,[Oi]:r.LINEAR_MIPMAP_LINEAR},yt={[Rh]:r.NEVER,[Uh]:r.ALWAYS,[Ch]:r.LESS,[_l]:r.LEQUAL,[Dh]:r.EQUAL,[Lh]:r.GEQUAL,[Ph]:r.GREATER,[Ih]:r.NOTEQUAL};function Ht(R,_){if(_.type===mi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ei||_.magFilter===er||_.magFilter===os||_.magFilter===Oi||_.minFilter===ei||_.minFilter===er||_.minFilter===os||_.minFilter===Oi)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,et[_.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,et[_.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,et[_.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,it[_.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,it[_.minFilter]),_.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,yt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===je||_.minFilter!==os&&_.minFilter!==Oi||_.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,n.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Zt(R,_){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",b));const Z=_.source;let j=u.get(Z);j===void 0&&(j={},u.set(Z,j));const V=H(_);if(V!==R.__cacheKey){j[V]===void 0&&(j[V]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,B=!0),j[V].usedTimes++;const vt=j[R.__cacheKey];vt!==void 0&&(j[R.__cacheKey].usedTimes--,vt.usedTimes===0&&v(_)),R.__cacheKey=V,R.__webglTexture=j[V].texture}return B}function Yt(R,_,B){return Math.floor(Math.floor(R/B)/_)}function Jt(R,_,B,Z){const V=R.updateRanges;if(V.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,_.width,_.height,B,Z,_.data);else{V.sort((K,nt)=>K.start-nt.start);let vt=0;for(let K=1;K<V.length;K++){const nt=V[vt],Dt=V[K],Rt=nt.start+nt.count,dt=Yt(Dt.start,_.width,4),It=Yt(nt.start,_.width,4);Dt.start<=Rt+1&&dt===It&&Yt(Dt.start+Dt.count-1,_.width,4)===dt?nt.count=Math.max(nt.count,Dt.start+Dt.count-nt.start):(++vt,V[vt]=Dt)}V.length=vt+1;const ot=r.getParameter(r.UNPACK_ROW_LENGTH),wt=r.getParameter(r.UNPACK_SKIP_PIXELS),_t=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,_.width);for(let K=0,nt=V.length;K<nt;K++){const Dt=V[K],Rt=Math.floor(Dt.start/4),dt=Math.ceil(Dt.count/4),It=Rt%_.width,I=Math.floor(Rt/_.width),lt=dt,st=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,It),r.pixelStorei(r.UNPACK_SKIP_ROWS,I),e.texSubImage2D(r.TEXTURE_2D,0,It,I,lt,st,B,Z,_.data)}R.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ot),r.pixelStorei(r.UNPACK_SKIP_PIXELS,wt),r.pixelStorei(r.UNPACK_SKIP_ROWS,_t)}}function X(R,_,B){let Z=r.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=r.TEXTURE_3D);const j=Zt(R,_),V=_.source;e.bindTexture(Z,R.__webglTexture,r.TEXTURE0+B);const vt=i.get(V);if(V.version!==vt.__version||j===!0){e.activeTexture(r.TEXTURE0+B);const ot=$t.getPrimaries($t.workingColorSpace),wt=_.colorSpace===Bi?null:$t.getPrimaries(_.colorSpace),_t=_.colorSpace===Bi||ot===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let K=x(_.image,!1,n.maxTextureSize);K=Tt(_,K);const nt=s.convert(_.format,_.colorSpace),Dt=s.convert(_.type);let Rt=M(_.internalFormat,nt,Dt,_.colorSpace,_.isVideoTexture);Ht(Z,_);let dt;const It=_.mipmaps,I=_.isVideoTexture!==!0,lt=vt.__version===void 0||j===!0,st=V.dataReady,rt=w(_,K);if(_.isDepthTexture)Rt=E(_.format===Qn,_.type),lt&&(I?e.texStorage2D(r.TEXTURE_2D,1,Rt,K.width,K.height):e.texImage2D(r.TEXTURE_2D,0,Rt,K.width,K.height,0,nt,Dt,null));else if(_.isDataTexture)if(It.length>0){I&&lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let Q=0,Y=It.length;Q<Y;Q++)dt=It[Q],I?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,dt.width,dt.height,nt,Dt,dt.data):e.texImage2D(r.TEXTURE_2D,Q,Rt,dt.width,dt.height,0,nt,Dt,dt.data);_.generateMipmaps=!1}else I?(lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,K.width,K.height),st&&Jt(_,K,nt,Dt)):e.texImage2D(r.TEXTURE_2D,0,Rt,K.width,K.height,0,nt,Dt,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){I&&lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,rt,Rt,It[0].width,It[0].height,K.depth);for(let Q=0,Y=It.length;Q<Y;Q++)if(dt=It[Q],_.format!==hi)if(nt!==null)if(I){if(st)if(_.layerUpdates.size>0){const mt=No(dt.width,dt.height,_.format,_.type);for(const Ut of _.layerUpdates){const oe=dt.data.subarray(Ut*mt/dt.data.BYTES_PER_ELEMENT,(Ut+1)*mt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,Ut,dt.width,dt.height,1,nt,oe)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,dt.width,dt.height,K.depth,nt,dt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,Rt,dt.width,dt.height,K.depth,0,dt.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?st&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,dt.width,dt.height,K.depth,nt,Dt,dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Q,Rt,dt.width,dt.height,K.depth,0,nt,Dt,dt.data)}else{I&&lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let Q=0,Y=It.length;Q<Y;Q++)dt=It[Q],_.format!==hi?nt!==null?I?st&&e.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,dt.width,dt.height,nt,dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Q,Rt,dt.width,dt.height,0,dt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,dt.width,dt.height,nt,Dt,dt.data):e.texImage2D(r.TEXTURE_2D,Q,Rt,dt.width,dt.height,0,nt,Dt,dt.data)}else if(_.isDataArrayTexture)if(I){if(lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,rt,Rt,K.width,K.height,K.depth),st)if(_.layerUpdates.size>0){const Q=No(K.width,K.height,_.format,_.type);for(const Y of _.layerUpdates){const mt=K.data.subarray(Y*Q/K.data.BYTES_PER_ELEMENT,(Y+1)*Q/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Y,K.width,K.height,1,nt,Dt,mt)}_.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,nt,Dt,K.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Rt,K.width,K.height,K.depth,0,nt,Dt,K.data);else if(_.isData3DTexture)I?(lt&&e.texStorage3D(r.TEXTURE_3D,rt,Rt,K.width,K.height,K.depth),st&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,nt,Dt,K.data)):e.texImage3D(r.TEXTURE_3D,0,Rt,K.width,K.height,K.depth,0,nt,Dt,K.data);else if(_.isFramebufferTexture){if(lt)if(I)e.texStorage2D(r.TEXTURE_2D,rt,Rt,K.width,K.height);else{let Q=K.width,Y=K.height;for(let mt=0;mt<rt;mt++)e.texImage2D(r.TEXTURE_2D,mt,Rt,Q,Y,0,nt,Dt,null),Q>>=1,Y>>=1}}else if(It.length>0){if(I&&lt){const Q=Ft(It[0]);e.texStorage2D(r.TEXTURE_2D,rt,Rt,Q.width,Q.height)}for(let Q=0,Y=It.length;Q<Y;Q++)dt=It[Q],I?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,nt,Dt,dt):e.texImage2D(r.TEXTURE_2D,Q,Rt,nt,Dt,dt);_.generateMipmaps=!1}else if(I){if(lt){const Q=Ft(K);e.texStorage2D(r.TEXTURE_2D,rt,Rt,Q.width,Q.height)}st&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt,Dt,K)}else e.texImage2D(r.TEXTURE_2D,0,Rt,nt,Dt,K);m(_)&&f(Z),vt.__version=V.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function $(R,_,B){if(_.image.length!==6)return;const Z=Zt(R,_),j=_.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+B);const V=i.get(j);if(j.version!==V.__version||Z===!0){e.activeTexture(r.TEXTURE0+B);const vt=$t.getPrimaries($t.workingColorSpace),ot=_.colorSpace===Bi?null:$t.getPrimaries(_.colorSpace),wt=_.colorSpace===Bi||vt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const _t=_.isCompressedTexture||_.image[0].isCompressedTexture,K=_.image[0]&&_.image[0].isDataTexture,nt=[];for(let Y=0;Y<6;Y++)!_t&&!K?nt[Y]=x(_.image[Y],!0,n.maxCubemapSize):nt[Y]=K?_.image[Y].image:_.image[Y],nt[Y]=Tt(_,nt[Y]);const Dt=nt[0],Rt=s.convert(_.format,_.colorSpace),dt=s.convert(_.type),It=M(_.internalFormat,Rt,dt,_.colorSpace),I=_.isVideoTexture!==!0,lt=V.__version===void 0||Z===!0,st=j.dataReady;let rt=w(_,Dt);Ht(r.TEXTURE_CUBE_MAP,_);let Q;if(_t){I&&lt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,rt,It,Dt.width,Dt.height);for(let Y=0;Y<6;Y++){Q=nt[Y].mipmaps;for(let mt=0;mt<Q.length;mt++){const Ut=Q[mt];_.format!==hi?Rt!==null?I?st&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,0,0,Ut.width,Ut.height,Rt,Ut.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,It,Ut.width,Ut.height,0,Ut.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,0,0,Ut.width,Ut.height,Rt,dt,Ut.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,It,Ut.width,Ut.height,0,Rt,dt,Ut.data)}}}else{if(Q=_.mipmaps,I&&lt){Q.length>0&&rt++;const Y=Ft(nt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,rt,It,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(K){I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,nt[Y].width,nt[Y].height,Rt,dt,nt[Y].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,It,nt[Y].width,nt[Y].height,0,Rt,dt,nt[Y].data);for(let mt=0;mt<Q.length;mt++){const oe=Q[mt].image[Y].image;I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,0,0,oe.width,oe.height,Rt,dt,oe.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,It,oe.width,oe.height,0,Rt,dt,oe.data)}}else{I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Rt,dt,nt[Y]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,It,Rt,dt,nt[Y]);for(let mt=0;mt<Q.length;mt++){const Ut=Q[mt];I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,0,0,Rt,dt,Ut.image[Y]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,It,Rt,dt,Ut.image[Y])}}}m(_)&&f(r.TEXTURE_CUBE_MAP),V.__version=j.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ht(R,_,B,Z,j,V){const vt=s.convert(B.format,B.colorSpace),ot=s.convert(B.type),wt=M(B.internalFormat,vt,ot,B.colorSpace),_t=i.get(_),K=i.get(B);if(K.__renderTarget=_,!_t.__hasExternalTextures){const nt=Math.max(1,_.width>>V),Dt=Math.max(1,_.height>>V);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,V,wt,nt,Dt,_.depth,0,vt,ot,null):e.texImage2D(j,V,wt,nt,Dt,0,vt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),xt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,j,K.__webglTexture,0,ae(_)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,j,K.__webglTexture,V),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Et(R,_,B){if(r.bindRenderbuffer(r.RENDERBUFFER,R),_.depthBuffer){const Z=_.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,V=E(_.stencilBuffer,j),vt=_.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=ae(_);xt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,V,_.width,_.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,V,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,V,_.width,_.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,R)}else{const Z=_.textures;for(let j=0;j<Z.length;j++){const V=Z[j],vt=s.convert(V.format,V.colorSpace),ot=s.convert(V.type),wt=M(V.internalFormat,vt,ot,V.colorSpace),_t=ae(_);B&&xt(_)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_t,wt,_.width,_.height):xt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_t,wt,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,wt,_.width,_.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Mt(R,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(_.depthTexture);Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W(_.depthTexture,0);const j=Z.__webglTexture,V=ae(_);if(_.depthTexture.format===Jn)xt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,V):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(_.depthTexture.format===Qn)xt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,V):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Nt(R){const _=i.get(R),B=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const Z=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=Z}if(R.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const Z=R.texture.mipmaps;Z&&Z.length>0?Mt(_.__webglFramebuffer[0],R):Mt(_.__webglFramebuffer,R)}else if(B){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=r.createRenderbuffer(),Et(_.__webglDepthbuffer[Z],R,!1);else{const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=_.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,V),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,V)}}else{const Z=R.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=r.createRenderbuffer(),Et(_.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=_.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,V),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,V)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(R,_,B){const Z=i.get(R);_!==void 0&&ht(Z.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Nt(R)}function zt(R){const _=R.texture,B=i.get(R),Z=i.get(_);R.addEventListener("dispose",A);const j=R.textures,V=R.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=_.version,a.memory.textures++),V){B.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[ot]=[];for(let wt=0;wt<_.mipmaps.length;wt++)B.__webglFramebuffer[ot][wt]=r.createFramebuffer()}else B.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let ot=0;ot<_.mipmaps.length;ot++)B.__webglFramebuffer[ot]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(vt)for(let ot=0,wt=j.length;ot<wt;ot++){const _t=i.get(j[ot]);_t.__webglTexture===void 0&&(_t.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&xt(R)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ot=0;ot<j.length;ot++){const wt=j[ot];B.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[ot]);const _t=s.convert(wt.format,wt.colorSpace),K=s.convert(wt.type),nt=M(wt.internalFormat,_t,K,wt.colorSpace,R.isXRRenderTarget===!0),Dt=ae(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,nt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,B.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),Et(B.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(V){e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Ht(r.TEXTURE_CUBE_MAP,_);for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0)for(let wt=0;wt<_.mipmaps.length;wt++)ht(B.__webglFramebuffer[ot][wt],R,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,wt);else ht(B.__webglFramebuffer[ot],R,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(_)&&f(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let ot=0,wt=j.length;ot<wt;ot++){const _t=j[ot],K=i.get(_t);let nt=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(nt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(nt,K.__webglTexture),Ht(nt,_t),ht(B.__webglFramebuffer,R,_t,r.COLOR_ATTACHMENT0+ot,nt,0),m(_t)&&f(nt)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ot=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,Z.__webglTexture),Ht(ot,_),_.mipmaps&&_.mipmaps.length>0)for(let wt=0;wt<_.mipmaps.length;wt++)ht(B.__webglFramebuffer[wt],R,_,r.COLOR_ATTACHMENT0,ot,wt);else ht(B.__webglFramebuffer,R,_,r.COLOR_ATTACHMENT0,ot,0);m(_)&&f(ot),e.unbindTexture()}R.depthBuffer&&Nt(R)}function he(R){const _=R.textures;for(let B=0,Z=_.length;B<Z;B++){const j=_[B];if(m(j)){const V=T(R),vt=i.get(j).__webglTexture;e.bindTexture(V,vt),f(V),e.unbindTexture()}}}const P=[],Vt=[];function Wt(R){if(R.samples>0){if(xt(R)===!1){const _=R.textures,B=R.width,Z=R.height;let j=r.COLOR_BUFFER_BIT;const V=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,vt=i.get(R),ot=_.length>1;if(ot)for(let _t=0;_t<_.length;_t++)e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const wt=R.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let _t=0;_t<_.length;_t++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,vt.__webglColorRenderbuffer[_t]);const K=i.get(_[_t]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,B,Z,0,0,B,Z,j,r.NEAREST),l===!0&&(P.length=0,Vt.length=0,P.push(r.COLOR_ATTACHMENT0+_t),R.depthBuffer&&R.resolveDepthBuffer===!1&&(P.push(V),Vt.push(V),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Vt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,P))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let _t=0;_t<_.length;_t++){e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,vt.__webglColorRenderbuffer[_t]);const K=i.get(_[_t]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,K,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const _=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_])}}}function ae(R){return Math.min(n.maxSamples,R.samples)}function xt(R){const _=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ce(R){const _=a.render.frame;c.get(R)!==_&&(c.set(R,_),R.update())}function Tt(R,_){const B=R.colorSpace,Z=R.format,j=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Ln&&B!==Bi&&($t.getTransfer(B)===ee?(Z!==hi||j!==xi)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",B)),_}function Ft(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(h.width=R.naturalWidth||R.width,h.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(h.width=R.displayWidth,h.height=R.displayHeight):(h.width=R.width,h.height=R.height),h}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=k,this.rebindTextures=_e,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=xt}function rm(r,t){function e(i,n=Bi){let s;const a=$t.getTransfer(n);if(i===xi)return r.UNSIGNED_BYTE;if(i===Ia)return r.UNSIGNED_SHORT_4_4_4_4;if(i===La)return r.UNSIGNED_SHORT_5_5_5_1;if(i===pl)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===ml)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===ul)return r.BYTE;if(i===fl)return r.SHORT;if(i===jn)return r.UNSIGNED_SHORT;if(i===Pa)return r.INT;if(i===en)return r.UNSIGNED_INT;if(i===mi)return r.FLOAT;if(i===Fn)return r.HALF_FLOAT;if(i===gl)return r.ALPHA;if(i===xl)return r.RGB;if(i===hi)return r.RGBA;if(i===Jn)return r.DEPTH_COMPONENT;if(i===Qn)return r.DEPTH_STENCIL;if(i===Ua)return r.RED;if(i===Fa)return r.RED_INTEGER;if(i===Na)return r.RG;if(i===Ba)return r.RG_INTEGER;if(i===Oa)return r.RGBA_INTEGER;if(i===Ns||i===Bs||i===Os||i===zs)if(a===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ns)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ns)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Os)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jr||i===Kr||i===Jr||i===Qr)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jr)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Kr)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jr)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qr)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ta||i===ea||i===ia)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ta||i===ea)return a===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ia)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===na||i===sa||i===ra||i===aa||i===oa||i===la||i===ha||i===ca||i===da||i===ua||i===fa||i===pa||i===ma||i===ga)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===na)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ra)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===aa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===la)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ha)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ca)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===da)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ua)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ma)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ga)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xa||i===_a||i===Ma)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===xa)return a===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_a)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ma)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===va||i===ba||i===ya||i===Sa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===va)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ba)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ya)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kn?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:e}}const am=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,om=`
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

}`;class lm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Ll(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new _i({vertexShader:am,fragmentShader:om,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new se(new Vi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hm extends rn{constructor(t,e){super();const i=this;let n=null,s=1,a=null,o="local-floor",l=1,h=null,c=null,d=null,u=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new lm,f={},T=e.getContextAttributes();let M=null,E=null;const w=[],b=[],A=new bt;let D=null;const v=new li;v.viewport=new ge;const y=new li;y.viewport=new ge;const C=[v,y],U=new Ec;let O=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=w[X];return $===void 0&&($=new Sr,w[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=w[X];return $===void 0&&($=new Sr,w[X]=$),$.getGripSpace()},this.getHand=function(X){let $=w[X];return $===void 0&&($=new Sr,w[X]=$),$.getHandSpace()};function W(X){const $=b.indexOf(X.inputSource);if($===-1)return;const ht=w[$];ht!==void 0&&(ht.update(X.inputSource,X.frame,h||a),ht.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",q),n.removeEventListener("inputsourceschange",J);for(let X=0;X<w.length;X++){const $=b[X];$!==null&&(b[X]=null,w[X].disconnect($))}O=null,H=null,m.reset();for(const X in f)delete f[X];t.setRenderTarget(M),p=null,u=null,d=null,n=null,E=null,Jt.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(X){h=X},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(M=t.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",q),n.addEventListener("inputsourceschange",J),T.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,Et=null,Mt=null;T.depth&&(Mt=T.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=T.stencil?Qn:Jn,Et=T.stencil?Kn:en);const Nt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Nt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),E=new sn(u.textureWidth,u.textureHeight,{format:hi,type:xi,depthTexture:new Il(u.textureWidth,u.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:T.stencil,colorSpace:t.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ht={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(n,e,ht),n.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new sn(p.framebufferWidth,p.framebufferHeight,{format:hi,type:xi,colorSpace:t.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await n.requestReferenceSpace(o),Jt.setContext(n),Jt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(X){for(let $=0;$<X.removed.length;$++){const ht=X.removed[$],Et=b.indexOf(ht);Et>=0&&(b[Et]=null,w[Et].disconnect(ht))}for(let $=0;$<X.added.length;$++){const ht=X.added[$];let Et=b.indexOf(ht);if(Et===-1){for(let Nt=0;Nt<w.length;Nt++)if(Nt>=b.length){b.push(ht),Et=Nt;break}else if(b[Nt]===null){b[Nt]=ht,Et=Nt;break}if(Et===-1)break}const Mt=w[Et];Mt&&Mt.connect(ht)}}const k=new L,et=new L;function it(X,$,ht){k.setFromMatrixPosition($.matrixWorld),et.setFromMatrixPosition(ht.matrixWorld);const Et=k.distanceTo(et),Mt=$.projectionMatrix.elements,Nt=ht.projectionMatrix.elements,_e=Mt[14]/(Mt[10]-1),zt=Mt[14]/(Mt[10]+1),he=(Mt[9]+1)/Mt[5],P=(Mt[9]-1)/Mt[5],Vt=(Mt[8]-1)/Mt[0],Wt=(Nt[8]+1)/Nt[0],ae=_e*Vt,xt=_e*Wt,ce=Et/(-Vt+Wt),Tt=ce*-Vt;if($.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Tt),X.translateZ(ce),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Mt[10]===-1)X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const Ft=_e+ce,R=zt+ce,_=ae-Tt,B=xt+(Et-Tt),Z=he*zt/R*Ft,j=P*zt/R*Ft;X.projectionMatrix.makePerspective(_,B,Z,j,Ft,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function yt(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;let $=X.near,ht=X.far;m.texture!==null&&(m.depthNear>0&&($=m.depthNear),m.depthFar>0&&(ht=m.depthFar)),U.near=y.near=v.near=$,U.far=y.far=v.far=ht,(O!==U.near||H!==U.far)&&(n.updateRenderState({depthNear:U.near,depthFar:U.far}),O=U.near,H=U.far),U.layers.mask=X.layers.mask|6,v.layers.mask=U.layers.mask&3,y.layers.mask=U.layers.mask&5;const Et=X.parent,Mt=U.cameras;yt(U,Et);for(let Nt=0;Nt<Mt.length;Nt++)yt(Mt[Nt],Et);Mt.length===2?it(U,v,y):U.projectionMatrix.copy(v.projectionMatrix),Ht(X,U,Et)};function Ht(X,$,ht){ht===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(ht.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ea*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(X){return f[X]};let Zt=null;function Yt(X,$){if(c=$.getViewerPose(h||a),g=$,c!==null){const ht=c.views;p!==null&&(t.setRenderTargetFramebuffer(E,p.framebuffer),t.setRenderTarget(E));let Et=!1;ht.length!==U.cameras.length&&(U.cameras.length=0,Et=!0);for(let zt=0;zt<ht.length;zt++){const he=ht[zt];let P=null;if(p!==null)P=p.getViewport(he);else{const Wt=d.getViewSubImage(u,he);P=Wt.viewport,zt===0&&(t.setRenderTargetTextures(E,Wt.colorTexture,Wt.depthStencilTexture),t.setRenderTarget(E))}let Vt=C[zt];Vt===void 0&&(Vt=new li,Vt.layers.enable(zt),Vt.viewport=new ge,C[zt]=Vt),Vt.matrix.fromArray(he.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(he.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(P.x,P.y,P.width,P.height),zt===0&&(U.matrix.copy(Vt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Et===!0&&U.cameras.push(Vt)}const Mt=n.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const zt=d.getDepthInformation(ht[0]);zt&&zt.isValid&&zt.texture&&m.init(zt,n.renderState)}if(Mt&&Mt.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let zt=0;zt<ht.length;zt++){const he=ht[zt].camera;if(he){let P=f[he];P||(P=new Ll,f[he]=P);const Vt=d.getCameraImage(he);P.sourceTexture=Vt}}}}for(let ht=0;ht<w.length;ht++){const Et=b[ht],Mt=w[ht];Et!==null&&Mt!==void 0&&Mt.update(Et,$,h||a)}Zt&&Zt(X,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),g=null}const Jt=new Fl;Jt.setAnimationLoop(Yt),this.setAnimationLoop=function(X){Zt=X},this.dispose=function(){}}}const Ki=new di,cm=new Kt;function dm(r,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Tl(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,T,M,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),c(m,f)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,E)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,T,M):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ze&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ze&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const T=t.get(f),M=T.envMap,E=T.envMapRotation;M&&(m.envMap.value=M,Ki.copy(E),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(cm.makeRotationFromEuler(Ki)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,T,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=M*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ze&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const T=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function um(r,t,e,i){let n={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,M){const E=M.program;i.uniformBlockBinding(T,E)}function h(T,M){let E=n[T.id];E===void 0&&(g(T),E=c(T),n[T.id]=E,T.addEventListener("dispose",m));const w=M.program;i.updateUBOMapping(T,w);const b=t.render.frame;s[T.id]!==b&&(u(T),s[T.id]=b)}function c(T){const M=d();T.__bindingPointIndex=M;const E=r.createBuffer(),w=T.__size,b=T.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,w,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,E),E}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(T){const M=n[T.id],E=T.uniforms,w=T.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let b=0,A=E.length;b<A;b++){const D=Array.isArray(E[b])?E[b]:[E[b]];for(let v=0,y=D.length;v<y;v++){const C=D[v];if(p(C,b,v,w)===!0){const U=C.__offset,O=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let W=0;W<O.length;W++){const q=O[W],J=x(q);typeof q=="number"||typeof q=="boolean"?(C.__data[0]=q,r.bufferSubData(r.UNIFORM_BUFFER,U+H,C.__data)):q.isMatrix3?(C.__data[0]=q.elements[0],C.__data[1]=q.elements[1],C.__data[2]=q.elements[2],C.__data[3]=0,C.__data[4]=q.elements[3],C.__data[5]=q.elements[4],C.__data[6]=q.elements[5],C.__data[7]=0,C.__data[8]=q.elements[6],C.__data[9]=q.elements[7],C.__data[10]=q.elements[8],C.__data[11]=0):(q.toArray(C.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(T,M,E,w){const b=T.value,A=M+"_"+E;if(w[A]===void 0)return typeof b=="number"||typeof b=="boolean"?w[A]=b:w[A]=b.clone(),!0;{const D=w[A];if(typeof b=="number"||typeof b=="boolean"){if(D!==b)return w[A]=b,!0}else if(D.equals(b)===!1)return D.copy(b),!0}return!1}function g(T){const M=T.uniforms;let E=0;const w=16;for(let A=0,D=M.length;A<D;A++){const v=Array.isArray(M[A])?M[A]:[M[A]];for(let y=0,C=v.length;y<C;y++){const U=v[y],O=Array.isArray(U.value)?U.value:[U.value];for(let H=0,W=O.length;H<W;H++){const q=O[H],J=x(q),k=E%w,et=k%J.boundary,it=k+et;E+=et,it!==0&&w-it<J.storage&&(E+=w-it),U.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=E,E+=J.storage}}}const b=E%w;return b>0&&(E+=w-b),T.__size=E,T.__cache={},this}function x(T){const M={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(M.boundary=4,M.storage=4):T.isVector2?(M.boundary=8,M.storage=8):T.isVector3||T.isColor?(M.boundary=16,M.storage=12):T.isVector4?(M.boundary=16,M.storage=16):T.isMatrix3?(M.boundary=48,M.storage=48):T.isMatrix4?(M.boundary=64,M.storage=64):T.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Lt("WebGLRenderer: Unsupported uniform value type.",T),M}function m(T){const M=T.target;M.removeEventListener("dispose",m);const E=a.indexOf(M.__bindingPointIndex);a.splice(E,1),r.deleteBuffer(n[M.id]),delete n[M.id],delete s[M.id]}function f(){for(const T in n)r.deleteBuffer(n[T]);a=[],n={},s={}}return{bind:l,update:h,dispose:f}}const fm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Ti=null;function pm(){return Ti===null&&(Ti=new Cl(fm,32,32,Na,Fn),Ti.minFilter=ei,Ti.magFilter=ei,Ti.wrapS=wi,Ti.wrapT=wi,Ti.generateMipmaps=!1,Ti.needsUpdate=!0),Ti}class mm{constructor(t={}){const{canvas:e=Fh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Set([Oa,Ba,Fa]),x=new Set([xi,en,jn,Kn,Ia,La]),m=new Uint32Array(4),f=new Int32Array(4);let T=null,M=null;const E=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let A=!1;this._outputColorSpace=$e;let D=0,v=0,y=null,C=-1,U=null;const O=new ge,H=new ge;let W=null;const q=new ut(0);let J=0,k=e.width,et=e.height,it=1,yt=null,Ht=null;const Zt=new ge(0,0,k,et),Yt=new ge(0,0,k,et);let Jt=!1;const X=new ns;let $=!1,ht=!1;const Et=new Kt,Mt=new L,Nt=new ge,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function he(){return y===null?it:1}let P=i;function Vt(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ca}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",Y,!1),e.addEventListener("webglcontextcreationerror",mt,!1),P===null){const F="webgl2";if(P=Vt(F,S),P===null)throw Vt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw S("WebGLRenderer: "+S.message),S}let Wt,ae,xt,ce,Tt,Ft,R,_,B,Z,j,V,vt,ot,wt,_t,K,nt,Dt,Rt,dt,It,I,lt;function st(){Wt=new Sf(P),Wt.init(),It=new rm(P,Wt),ae=new pf(P,Wt,t,It),xt=new nm(P,Wt),ae.reversedDepthBuffer&&u&&xt.buffers.depth.setReversed(!0),ce=new wf(P),Tt=new Wp,Ft=new sm(P,Wt,xt,Tt,ae,It,ce),R=new gf(b),_=new yf(b),B=new Cc(P),I=new uf(P,B),Z=new Tf(P,B,ce,I),j=new Rf(P,Z,B,ce),Dt=new Af(P,ae,Ft),_t=new mf(Tt),V=new Vp(b,R,_,Wt,ae,I,_t),vt=new dm(b,Tt),ot=new Zp,wt=new Jp(Wt),nt=new df(b,R,_,xt,j,p,l),K=new em(b,j,ae),lt=new um(P,ce,ae,xt),Rt=new ff(P,Wt,ce),dt=new Ef(P,Wt,ce),ce.programs=V.programs,b.capabilities=ae,b.extensions=Wt,b.properties=Tt,b.renderLists=ot,b.shadowMap=K,b.state=xt,b.info=ce}st();const rt=new hm(b,P);this.xr=rt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const S=Wt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Wt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(S){S!==void 0&&(it=S,this.setSize(k,et,!1))},this.getSize=function(S){return S.set(k,et)},this.setSize=function(S,F,z=!0){if(rt.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}k=S,et=F,e.width=Math.floor(S*it),e.height=Math.floor(F*it),z===!0&&(e.style.width=S+"px",e.style.height=F+"px"),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set(k*it,et*it).floor()},this.setDrawingBufferSize=function(S,F,z){k=S,et=F,it=z,e.width=Math.floor(S*z),e.height=Math.floor(F*z),this.setViewport(0,0,S,F)},this.getCurrentViewport=function(S){return S.copy(O)},this.getViewport=function(S){return S.copy(Zt)},this.setViewport=function(S,F,z,G){S.isVector4?Zt.set(S.x,S.y,S.z,S.w):Zt.set(S,F,z,G),xt.viewport(O.copy(Zt).multiplyScalar(it).round())},this.getScissor=function(S){return S.copy(Yt)},this.setScissor=function(S,F,z,G){S.isVector4?Yt.set(S.x,S.y,S.z,S.w):Yt.set(S,F,z,G),xt.scissor(H.copy(Yt).multiplyScalar(it).round())},this.getScissorTest=function(){return Jt},this.setScissorTest=function(S){xt.setScissorTest(Jt=S)},this.setOpaqueSort=function(S){yt=S},this.setTransparentSort=function(S){Ht=S},this.getClearColor=function(S){return S.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,z=!0){let G=0;if(S){let N=!1;if(y!==null){const tt=y.texture.format;N=g.has(tt)}if(N){const tt=y.texture.type,ct=x.has(tt),gt=nt.getClearColor(),ft=nt.getClearAlpha(),Ct=gt.r,Pt=gt.g,St=gt.b;ct?(m[0]=Ct,m[1]=Pt,m[2]=St,m[3]=ft,P.clearBufferuiv(P.COLOR,0,m)):(f[0]=Ct,f[1]=Pt,f[2]=St,f[3]=ft,P.clearBufferiv(P.COLOR,0,f))}else G|=P.COLOR_BUFFER_BIT}F&&(G|=P.DEPTH_BUFFER_BIT),z&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",Y,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),nt.dispose(),ot.dispose(),wt.dispose(),Tt.dispose(),R.dispose(),_.dispose(),j.dispose(),I.dispose(),lt.dispose(),V.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Wa),rt.removeEventListener("sessionend",Xa),Wi.stop()};function Q(S){S.preventDefault(),Xs("WebGLRenderer: Context Lost."),A=!0}function Y(){Xs("WebGLRenderer: Context Restored."),A=!1;const S=ce.autoReset,F=K.enabled,z=K.autoUpdate,G=K.needsUpdate,N=K.type;st(),ce.autoReset=S,K.enabled=F,K.autoUpdate=z,K.needsUpdate=G,K.type=N}function mt(S){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ut(S){const F=S.target;F.removeEventListener("dispose",Ut),oe(F)}function oe(S){Qt(S),Tt.remove(S)}function Qt(S){const F=Tt.get(S).programs;F!==void 0&&(F.forEach(function(z){V.releaseProgram(z)}),S.isShaderMaterial&&V.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,z,G,N,tt){F===null&&(F=_e);const ct=N.isMesh&&N.matrixWorld.determinant()<0,gt=Hl(S,F,z,G,N);xt.setMaterial(G,ct);let ft=z.index,Ct=1;if(G.wireframe===!0){if(ft=Z.getWireframeAttribute(z),ft===void 0)return;Ct=2}const Pt=z.drawRange,St=z.attributes.position;let Xt=Pt.start*Ct,te=(Pt.start+Pt.count)*Ct;tt!==null&&(Xt=Math.max(Xt,tt.start*Ct),te=Math.min(te,(tt.start+tt.count)*Ct)),ft!==null?(Xt=Math.max(Xt,0),te=Math.min(te,ft.count)):St!=null&&(Xt=Math.max(Xt,0),te=Math.min(te,St.count));const pe=te-Xt;if(pe<0||pe===1/0)return;I.setup(N,G,gt,z,ft);let me,re=Rt;if(ft!==null&&(me=B.get(ft),re=dt,re.setIndex(me)),N.isMesh)G.wireframe===!0?(xt.setLineWidth(G.wireframeLinewidth*he()),re.setMode(P.LINES)):re.setMode(P.TRIANGLES);else if(N.isLine){let At=G.linewidth;At===void 0&&(At=1),xt.setLineWidth(At*he()),N.isLineSegments?re.setMode(P.LINES):N.isLineLoop?re.setMode(P.LINE_LOOP):re.setMode(P.LINE_STRIP)}else N.isPoints?re.setMode(P.POINTS):N.isSprite&&re.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ts("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))re.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const At=N._multiDrawStarts,de=N._multiDrawCounts,qt=N._multiDrawCount,ke=ft?B.get(ft).bytesPerElement:1,on=Tt.get(G).currentProgram.getUniforms();for(let He=0;He<qt;He++)on.setValue(P,"_gl_DrawID",He),re.render(At[He]/ke,de[He])}else if(N.isInstancedMesh)re.renderInstances(Xt,pe,N.count);else if(z.isInstancedBufferGeometry){const At=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,de=Math.min(z.instanceCount,At);re.renderInstances(Xt,pe,de)}else re.render(Xt,pe)};function ui(S,F,z){S.transparent===!0&&S.side===Ye&&S.forceSinglePass===!1?(S.side=ze,S.needsUpdate=!0,as(S,F,z),S.side=Hi,S.needsUpdate=!0,as(S,F,z),S.side=Ye):as(S,F,z)}this.compile=function(S,F,z=null){z===null&&(z=S),M=wt.get(z),M.init(F),w.push(M),z.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(M.pushLight(N),N.castShadow&&M.pushShadow(N))}),S!==z&&S.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(M.pushLight(N),N.castShadow&&M.pushShadow(N))}),M.setupLights();const G=new Set;return S.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const tt=N.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){const gt=tt[ct];ui(gt,z,N),G.add(gt)}else ui(tt,z,N),G.add(tt)}),M=w.pop(),G},this.compileAsync=function(S,F,z=null){const G=this.compile(S,F,z);return new Promise(N=>{function tt(){if(G.forEach(function(ct){Tt.get(ct).currentProgram.isReady()&&G.delete(ct)}),G.size===0){N(S);return}setTimeout(tt,10)}Wt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let si=null;function kl(S){si&&si(S)}function Wa(){Wi.stop()}function Xa(){Wi.start()}const Wi=new Fl;Wi.setAnimationLoop(kl),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(S){si=S,rt.setAnimationLoop(S),S===null?Wi.stop():Wi.start()},rt.addEventListener("sessionstart",Wa),rt.addEventListener("sessionend",Xa),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(F),F=rt.getCamera()),S.isScene===!0&&S.onBeforeRender(b,S,F,y),M=wt.get(S,w.length),M.init(F),w.push(M),Et.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),X.setFromProjectionMatrix(Et,gi,F.reversedDepth),ht=this.localClippingEnabled,$=_t.init(this.clippingPlanes,ht),T=ot.get(S,E.length),T.init(),E.push(T),rt.enabled===!0&&rt.isPresenting===!0){const tt=b.xr.getDepthSensingMesh();tt!==null&&Qs(tt,F,-1/0,b.sortObjects)}Qs(S,F,0,b.sortObjects),T.finish(),b.sortObjects===!0&&T.sort(yt,Ht),zt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,zt&&nt.addToRenderList(T,S),this.info.render.frame++,$===!0&&_t.beginShadows();const z=M.state.shadowsArray;K.render(z,S,F),$===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=T.opaque,N=T.transmissive;if(M.setupLights(),F.isArrayCamera){const tt=F.cameras;if(N.length>0)for(let ct=0,gt=tt.length;ct<gt;ct++){const ft=tt[ct];qa(G,N,S,ft)}zt&&nt.render(S);for(let ct=0,gt=tt.length;ct<gt;ct++){const ft=tt[ct];Za(T,S,ft,ft.viewport)}}else N.length>0&&qa(G,N,S,F),zt&&nt.render(S),Za(T,S,F);y!==null&&v===0&&(Ft.updateMultisampleRenderTarget(y),Ft.updateRenderTargetMipmap(y)),S.isScene===!0&&S.onAfterRender(b,S,F),I.resetDefaultState(),C=-1,U=null,w.pop(),w.length>0?(M=w[w.length-1],$===!0&&_t.setGlobalState(b.clippingPlanes,M.state.camera)):M=null,E.pop(),E.length>0?T=E[E.length-1]:T=null};function Qs(S,F,z,G){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLight)M.pushLight(S),S.castShadow&&M.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||X.intersectsSprite(S)){G&&Nt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Et);const ct=j.update(S),gt=S.material;gt.visible&&T.push(S,ct,gt,z,Nt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||X.intersectsObject(S))){const ct=j.update(S),gt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Nt.copy(S.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Nt.copy(ct.boundingSphere.center)),Nt.applyMatrix4(S.matrixWorld).applyMatrix4(Et)),Array.isArray(gt)){const ft=ct.groups;for(let Ct=0,Pt=ft.length;Ct<Pt;Ct++){const St=ft[Ct],Xt=gt[St.materialIndex];Xt&&Xt.visible&&T.push(S,ct,Xt,z,Nt.z,St)}}else gt.visible&&T.push(S,ct,gt,z,Nt.z,null)}}const tt=S.children;for(let ct=0,gt=tt.length;ct<gt;ct++)Qs(tt[ct],F,z,G)}function Za(S,F,z,G){const{opaque:N,transmissive:tt,transparent:ct}=S;M.setupLightsView(z),$===!0&&_t.setGlobalState(b.clippingPlanes,z),G&&xt.viewport(O.copy(G)),N.length>0&&rs(N,F,z),tt.length>0&&rs(tt,F,z),ct.length>0&&rs(ct,F,z),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function qa(S,F,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;M.state.transmissionRenderTarget[G.id]===void 0&&(M.state.transmissionRenderTarget[G.id]=new sn(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?Fn:xi,minFilter:Oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const tt=M.state.transmissionRenderTarget[G.id],ct=G.viewport||O;tt.setSize(ct.z*b.transmissionResolutionScale,ct.w*b.transmissionResolutionScale);const gt=b.getRenderTarget(),ft=b.getActiveCubeFace(),Ct=b.getActiveMipmapLevel();b.setRenderTarget(tt),b.getClearColor(q),J=b.getClearAlpha(),J<1&&b.setClearColor(16777215,.5),b.clear(),zt&&nt.render(z);const Pt=b.toneMapping;b.toneMapping=Gi;const St=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),M.setupLightsView(G),$===!0&&_t.setGlobalState(b.clippingPlanes,G),rs(S,z,G),Ft.updateMultisampleRenderTarget(tt),Ft.updateRenderTargetMipmap(tt),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let te=0,pe=F.length;te<pe;te++){const me=F[te],{object:re,geometry:At,material:de,group:qt}=me;if(de.side===Ye&&re.layers.test(G.layers)){const ke=de.side;de.side=ze,de.needsUpdate=!0,$a(re,z,G,At,de,qt),de.side=ke,de.needsUpdate=!0,Xt=!0}}Xt===!0&&(Ft.updateMultisampleRenderTarget(tt),Ft.updateRenderTargetMipmap(tt))}b.setRenderTarget(gt,ft,Ct),b.setClearColor(q,J),St!==void 0&&(G.viewport=St),b.toneMapping=Pt}function rs(S,F,z){const G=F.isScene===!0?F.overrideMaterial:null;for(let N=0,tt=S.length;N<tt;N++){const ct=S[N],{object:gt,geometry:ft,group:Ct}=ct;let Pt=ct.material;Pt.allowOverride===!0&&G!==null&&(Pt=G),gt.layers.test(z.layers)&&$a(gt,F,z,ft,Pt,Ct)}}function $a(S,F,z,G,N,tt){S.onBeforeRender(b,F,z,G,N,tt),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),N.onBeforeRender(b,F,z,G,S,tt),N.transparent===!0&&N.side===Ye&&N.forceSinglePass===!1?(N.side=ze,N.needsUpdate=!0,b.renderBufferDirect(z,F,G,N,S,tt),N.side=Hi,N.needsUpdate=!0,b.renderBufferDirect(z,F,G,N,S,tt),N.side=Ye):b.renderBufferDirect(z,F,G,N,S,tt),S.onAfterRender(b,F,z,G,N,tt)}function as(S,F,z){F.isScene!==!0&&(F=_e);const G=Tt.get(S),N=M.state.lights,tt=M.state.shadowsArray,ct=N.state.version,gt=V.getParameters(S,N.state,tt,F,z),ft=V.getProgramCacheKey(gt);let Ct=G.programs;G.environment=S.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(S.isMeshStandardMaterial?_:R).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,Ct===void 0&&(S.addEventListener("dispose",Ut),Ct=new Map,G.programs=Ct);let Pt=Ct.get(ft);if(Pt!==void 0){if(G.currentProgram===Pt&&G.lightsStateVersion===ct)return ja(S,gt),Pt}else gt.uniforms=V.getUniforms(S),S.onBeforeCompile(gt,b),Pt=V.acquireProgram(gt,ft),Ct.set(ft,Pt),G.uniforms=gt.uniforms;const St=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(St.clippingPlanes=_t.uniform),ja(S,gt),G.needsLights=Wl(S),G.lightsStateVersion=ct,G.needsLights&&(St.ambientLightColor.value=N.state.ambient,St.lightProbe.value=N.state.probe,St.directionalLights.value=N.state.directional,St.directionalLightShadows.value=N.state.directionalShadow,St.spotLights.value=N.state.spot,St.spotLightShadows.value=N.state.spotShadow,St.rectAreaLights.value=N.state.rectArea,St.ltc_1.value=N.state.rectAreaLTC1,St.ltc_2.value=N.state.rectAreaLTC2,St.pointLights.value=N.state.point,St.pointLightShadows.value=N.state.pointShadow,St.hemisphereLights.value=N.state.hemi,St.directionalShadowMap.value=N.state.directionalShadowMap,St.directionalShadowMatrix.value=N.state.directionalShadowMatrix,St.spotShadowMap.value=N.state.spotShadowMap,St.spotLightMatrix.value=N.state.spotLightMatrix,St.spotLightMap.value=N.state.spotLightMap,St.pointShadowMap.value=N.state.pointShadowMap,St.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Pt,G.uniformsList=null,Pt}function Ya(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=ks.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ja(S,F){const z=Tt.get(S);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.batchingColor=F.batchingColor,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.instancingMorph=F.instancingMorph,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function Hl(S,F,z,G,N){F.isScene!==!0&&(F=_e),Ft.resetTextureUnits();const tt=F.fog,ct=G.isMeshStandardMaterial?F.environment:null,gt=y===null?b.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:Ln,ft=(G.isMeshStandardMaterial?_:R).get(G.envMap||ct),Ct=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Pt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),St=!!z.morphAttributes.position,Xt=!!z.morphAttributes.normal,te=!!z.morphAttributes.color;let pe=Gi;G.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(pe=b.toneMapping);const me=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,re=me!==void 0?me.length:0,At=Tt.get(G),de=M.state.lights;if($===!0&&(ht===!0||S!==U)){const De=S===U&&G.id===C;_t.setState(G,S,De)}let qt=!1;G.version===At.__version?(At.needsLights&&At.lightsStateVersion!==de.state.version||At.outputColorSpace!==gt||N.isBatchedMesh&&At.batching===!1||!N.isBatchedMesh&&At.batching===!0||N.isBatchedMesh&&At.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&At.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&At.instancing===!1||!N.isInstancedMesh&&At.instancing===!0||N.isSkinnedMesh&&At.skinning===!1||!N.isSkinnedMesh&&At.skinning===!0||N.isInstancedMesh&&At.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&At.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&At.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&At.instancingMorph===!1&&N.morphTexture!==null||At.envMap!==ft||G.fog===!0&&At.fog!==tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==_t.numPlanes||At.numIntersection!==_t.numIntersection)||At.vertexAlphas!==Ct||At.vertexTangents!==Pt||At.morphTargets!==St||At.morphNormals!==Xt||At.morphColors!==te||At.toneMapping!==pe||At.morphTargetsCount!==re)&&(qt=!0):(qt=!0,At.__version=G.version);let ke=At.currentProgram;qt===!0&&(ke=as(G,F,N));let on=!1,He=!1,Bn=!1;const ue=ke.getUniforms(),Ne=At.uniforms;if(xt.useProgram(ke.program)&&(on=!0,He=!0,Bn=!0),G.id!==C&&(C=G.id,He=!0),on||U!==S){xt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ue.setValue(P,"projectionMatrix",S.projectionMatrix),ue.setValue(P,"viewMatrix",S.matrixWorldInverse);const Be=ue.map.cameraPosition;Be!==void 0&&Be.setValue(P,Mt.setFromMatrixPosition(S.matrixWorld)),ae.logarithmicDepthBuffer&&ue.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ue.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),U!==S&&(U=S,He=!0,Bn=!0)}if(N.isSkinnedMesh){ue.setOptional(P,N,"bindMatrix"),ue.setOptional(P,N,"bindMatrixInverse");const De=N.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),ue.setValue(P,"boneTexture",De.boneTexture,Ft))}N.isBatchedMesh&&(ue.setOptional(P,N,"batchingTexture"),ue.setValue(P,"batchingTexture",N._matricesTexture,Ft),ue.setOptional(P,N,"batchingIdTexture"),ue.setValue(P,"batchingIdTexture",N._indirectTexture,Ft),ue.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&ue.setValue(P,"batchingColorTexture",N._colorsTexture,Ft));const Ke=z.morphAttributes;if((Ke.position!==void 0||Ke.normal!==void 0||Ke.color!==void 0)&&Dt.update(N,z,ke),(He||At.receiveShadow!==N.receiveShadow)&&(At.receiveShadow=N.receiveShadow,ue.setValue(P,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ne.envMap.value=ft,Ne.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(Ne.envMapIntensity.value=F.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=pm()),He&&(ue.setValue(P,"toneMappingExposure",b.toneMappingExposure),At.needsLights&&Vl(Ne,Bn),tt&&G.fog===!0&&vt.refreshFogUniforms(Ne,tt),vt.refreshMaterialUniforms(Ne,G,it,et,M.state.transmissionRenderTarget[S.id]),ks.upload(P,Ya(At),Ne,Ft)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ks.upload(P,Ya(At),Ne,Ft),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ue.setValue(P,"center",N.center),ue.setValue(P,"modelViewMatrix",N.modelViewMatrix),ue.setValue(P,"normalMatrix",N.normalMatrix),ue.setValue(P,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const De=G.uniformsGroups;for(let Be=0,tr=De.length;Be<tr;Be++){const Xi=De[Be];lt.update(Xi,ke),lt.bind(Xi,ke)}}return ke}function Vl(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Wl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return v},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(S,F,z){const G=Tt.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Tt.get(S.texture).__webglTexture=F,Tt.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const z=Tt.get(S);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0};const Xl=P.createFramebuffer();this.setRenderTarget=function(S,F=0,z=0){y=S,D=F,v=z;let G=!0,N=null,tt=!1,ct=!1;if(S){const ft=Tt.get(S);if(ft.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(ft.__webglFramebuffer===void 0)Ft.setupRenderTarget(S);else if(ft.__hasExternalTextures)Ft.rebindTextures(S,Tt.get(S.texture).__webglTexture,Tt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const St=S.depthTexture;if(ft.__boundDepthTexture!==St){if(St!==null&&Tt.has(St)&&(S.width!==St.image.width||S.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(S)}}const Ct=S.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ct=!0);const Pt=Tt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pt[F])?N=Pt[F][z]:N=Pt[F],tt=!0):S.samples>0&&Ft.useMultisampledRTT(S)===!1?N=Tt.get(S).__webglMultisampledFramebuffer:Array.isArray(Pt)?N=Pt[z]:N=Pt,O.copy(S.viewport),H.copy(S.scissor),W=S.scissorTest}else O.copy(Zt).multiplyScalar(it).floor(),H.copy(Yt).multiplyScalar(it).floor(),W=Jt;if(z!==0&&(N=Xl),xt.bindFramebuffer(P.FRAMEBUFFER,N)&&G&&xt.drawBuffers(S,N),xt.viewport(O),xt.scissor(H),xt.setScissorTest(W),tt){const ft=Tt.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,ft.__webglTexture,z)}else if(ct){const ft=F;for(let Ct=0;Ct<S.textures.length;Ct++){const Pt=Tt.get(S.textures[Ct]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ct,Pt.__webglTexture,z,ft)}}else if(S!==null&&z!==0){const ft=Tt.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ft.__webglTexture,z)}C=-1},this.readRenderTargetPixels=function(S,F,z,G,N,tt,ct,gt=0){if(!(S&&S.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft){xt.bindFramebuffer(P.FRAMEBUFFER,ft);try{const Ct=S.textures[gt],Pt=Ct.format,St=Ct.type;if(!ae.textureFormatReadable(Pt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(St)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-G&&z>=0&&z<=S.height-N&&(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(F,z,G,N,It.convert(Pt),It.convert(St),tt))}finally{const Ct=y!==null?Tt.get(y).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(S,F,z,G,N,tt,ct,gt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft)if(F>=0&&F<=S.width-G&&z>=0&&z<=S.height-N){xt.bindFramebuffer(P.FRAMEBUFFER,ft);const Ct=S.textures[gt],Pt=Ct.format,St=Ct.type;if(!ae.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.bufferData(P.PIXEL_PACK_BUFFER,tt.byteLength,P.STREAM_READ),S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(F,z,G,N,It.convert(Pt),It.convert(St),0);const te=y!==null?Tt.get(y).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,te);const pe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Nh(P,pe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,tt),P.deleteBuffer(Xt),P.deleteSync(pe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,z=0){const G=Math.pow(2,-z),N=Math.floor(S.image.width*G),tt=Math.floor(S.image.height*G),ct=F!==null?F.x:0,gt=F!==null?F.y:0;Ft.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,ct,gt,N,tt),xt.unbindTexture()};const Zl=P.createFramebuffer(),ql=P.createFramebuffer();this.copyTextureToTexture=function(S,F,z=null,G=null,N=0,tt=null){tt===null&&(N!==0?(ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=N,N=0):tt=0);let ct,gt,ft,Ct,Pt,St,Xt,te,pe;const me=S.isCompressedTexture?S.mipmaps[tt]:S.image;if(z!==null)ct=z.max.x-z.min.x,gt=z.max.y-z.min.y,ft=z.isBox3?z.max.z-z.min.z:1,Ct=z.min.x,Pt=z.min.y,St=z.isBox3?z.min.z:0;else{const Ke=Math.pow(2,-N);ct=Math.floor(me.width*Ke),gt=Math.floor(me.height*Ke),S.isDataArrayTexture?ft=me.depth:S.isData3DTexture?ft=Math.floor(me.depth*Ke):ft=1,Ct=0,Pt=0,St=0}G!==null?(Xt=G.x,te=G.y,pe=G.z):(Xt=0,te=0,pe=0);const re=It.convert(F.format),At=It.convert(F.type);let de;F.isData3DTexture?(Ft.setTexture3D(F,0),de=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ft.setTexture2DArray(F,0),de=P.TEXTURE_2D_ARRAY):(Ft.setTexture2D(F,0),de=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const qt=P.getParameter(P.UNPACK_ROW_LENGTH),ke=P.getParameter(P.UNPACK_IMAGE_HEIGHT),on=P.getParameter(P.UNPACK_SKIP_PIXELS),He=P.getParameter(P.UNPACK_SKIP_ROWS),Bn=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,me.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,me.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ct),P.pixelStorei(P.UNPACK_SKIP_ROWS,Pt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,St);const ue=S.isDataArrayTexture||S.isData3DTexture,Ne=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const Ke=Tt.get(S),De=Tt.get(F),Be=Tt.get(Ke.__renderTarget),tr=Tt.get(De.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Be.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let Xi=0;Xi<ft;Xi++)ue&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.get(S).__webglTexture,N,St+Xi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.get(F).__webglTexture,tt,pe+Xi)),P.blitFramebuffer(Ct,Pt,ct,gt,Xt,te,ct,gt,P.DEPTH_BUFFER_BIT,P.NEAREST);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(N!==0||S.isRenderTargetTexture||Tt.has(S)){const Ke=Tt.get(S),De=Tt.get(F);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Zl),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,ql);for(let Be=0;Be<ft;Be++)ue?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ke.__webglTexture,N,St+Be):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ke.__webglTexture,N),Ne?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,De.__webglTexture,tt,pe+Be):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,De.__webglTexture,tt),N!==0?P.blitFramebuffer(Ct,Pt,ct,gt,Xt,te,ct,gt,P.COLOR_BUFFER_BIT,P.NEAREST):Ne?P.copyTexSubImage3D(de,tt,Xt,te,pe+Be,Ct,Pt,ct,gt):P.copyTexSubImage2D(de,tt,Xt,te,Ct,Pt,ct,gt);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Ne?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(de,tt,Xt,te,pe,ct,gt,ft,re,At,me.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(de,tt,Xt,te,pe,ct,gt,ft,re,me.data):P.texSubImage3D(de,tt,Xt,te,pe,ct,gt,ft,re,At,me):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,tt,Xt,te,ct,gt,re,At,me.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,tt,Xt,te,me.width,me.height,re,me.data):P.texSubImage2D(P.TEXTURE_2D,tt,Xt,te,ct,gt,re,At,me);P.pixelStorei(P.UNPACK_ROW_LENGTH,qt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ke),P.pixelStorei(P.UNPACK_SKIP_PIXELS,on),P.pixelStorei(P.UNPACK_SKIP_ROWS,He),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Bn),tt===0&&F.generateMipmaps&&P.generateMipmap(de),xt.unbindTexture()},this.initRenderTarget=function(S){Tt.get(S).__webglFramebuffer===void 0&&Ft.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ft.setTextureCube(S,0):S.isData3DTexture?Ft.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ft.setTexture2DArray(S,0):Ft.setTexture2D(S,0),xt.unbindTexture()},this.resetState=function(){D=0,v=0,y=null,xt.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class gm{constructor(t,e){this.scene=t,this.clippingPlanes=e||[],this.logicalWidth=160,this.logicalDepth=160,this.width=this.logicalWidth*3,this.depth=this.logicalDepth*3,this.grid=[],this.geometry=null,this.mesh=null,this.waterMesh=null,this.meshes=[],this.buildings=[],this.initTerrain(),this.totalHousingPop=0,this.entityGrid=[],this.initEntityGrid()}initEntityGrid(){this.entityGrid=[];for(let t=0;t<this.logicalWidth;t++){this.entityGrid[t]=[];for(let e=0;e<this.logicalDepth;e++)this.entityGrid[t][e]=[]}}registerEntity(t,e,i,n){this.isValidGrid(e,i)&&(t._spatial={x:e,z:i,type:n},this.entityGrid[e][i].push(t))}unregisterEntity(t){if(!t._spatial)return;const{x:e,z:i}=t._spatial;if(this.isValidGrid(e,i)){const n=this.entityGrid[e][i],s=n.indexOf(t);s!==-1&&n.splice(s,1)}t._spatial=null}gridToWorld(t){return t-this.logicalWidth/2+.5}moveEntity(t,e,i,n,s,a){if(Math.floor(e)===Math.floor(n)&&Math.floor(i)===Math.floor(s)){t._spatial={x:n,z:s,type:a};return}this.unregisterEntity(t),this.registerEntity(t,n,s,a)}findNearestEntity(t,e,i,n){let s=null,a=n*n;const o=Math.ceil(n),l=Math.max(0,e-o),h=Math.min(this.logicalWidth-1,e+o),c=Math.max(0,i-o),d=Math.min(this.logicalDepth-1,i+o);for(let u=l;u<=h;u++)for(let p=c;p<=d;p++){const g=this.entityGrid[u][p];for(let x=0;x<g.length;x++){const m=g[x];if(m._spatial&&m._spatial.type===t){const f=u-e,T=p-i,M=f*f+T*T;if(M<a){if(m.isDead)continue;a=M,s=m}}}}return s}findBestTarget(t,e,i,n,s){let a=null,o=1/0;const l=Math.ceil(n),h=Math.max(0,e-l),c=Math.min(this.logicalWidth-1,e+l),d=Math.max(0,i-l),u=Math.min(this.logicalDepth-1,i+l);for(let p=h;p<=c;p++)for(let g=d;g<=u;g++){const x=this.entityGrid[p][g];for(let m=0;m<x.length;m++){const f=x[m];if(f._spatial&&f._spatial.type===t){if(f.isDead)continue;const T=p-e,M=g-i,E=Math.sqrt(T*T+M*M);if(E>n)continue;const w=s(f,E);w<o&&(o=w,a=f)}}}return a}initTerrain(){this.grid=[];for(let i=0;i<this.logicalWidth;i++){this.grid[i]=[];for(let n=0;n<this.logicalDepth;n++)this.grid[i][n]={height:0,type:"grass",hasBuilding:!1,noise:(Math.random()-.5)*.05}}this.geometry=new Vi(this.width,this.depth,this.width,this.depth);const t=this.geometry.attributes.position.count;this.geometry.setAttribute("color",new Ge(new Float32Array(t*3),3));const e=this.geometry.attributes.position;for(let i=0;i<t;i++){const n=e.getX(i),s=e.getY(i),a=this.getVisualOffset(n,s);e.setX(i,n+a.x),e.setY(i,s+a.y)}e.needsUpdate=!0,this.generateRandomTerrain(),this.createMesh(),this.createWater()}generateRandomTerrain(){this.seed=Math.random()*100;for(let t=0;t<this.logicalWidth;t++)for(let e=0;e<this.logicalDepth;e++){const i=t/this.logicalWidth,n=e/this.logicalDepth;let a=this.seamlessFbm(i,n,this.seed)*35-15;a=Math.max(-5,a),a=Math.round(a),this.grid[t][e].height=a;let o=this.seamlessFbm(i,n,this.seed+123.45);this.grid[t][e].moisture=o}this.updateMesh(),this.updateColors()}updateMesh(){const t=this.geometry.attributes.position.array;for(let e=0;e<t.length;e+=3){const i=t[e],n=t[e+1],s=Math.round(i+this.width/2),a=Math.round(-n+this.depth/2),o=(s%this.logicalWidth+this.logicalWidth)%this.logicalWidth,l=(a%this.logicalDepth+this.logicalDepth)%this.logicalDepth;this.grid[o]&&this.grid[o][l]&&(t[e+2]=this.grid[o][l].height)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}createMesh(){this.mesh&&this.scene.remove(this.mesh),this.meshes=[];const t=new jt({vertexColors:!0,flatShading:!1,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.mesh=new se(this.geometry,t),this.mesh.rotation.x=-Math.PI/2,this.mesh.position.set(0,0,0);const e=new Fe;e.setAttribute("position",this.geometry.attributes.position);const i=[],n=this.width+1,s=this.depth+1;for(let c=0;c<s;c++)for(let d=0;d<n;d++){const u=c*n+d;d<this.width&&i.push(u,u+1),c<this.depth&&i.push(u,u+n)}e.setIndex(i);const a=new Dl({color:0,transparent:!0,opacity:.15,clippingPlanes:this.clippingPlanes}),o=new xc(e,a);o.position.set(0,0,.04),this.mesh.add(o);const l=new Pl({color:0,size:.15,sizeAttenuation:!0,transparent:!0,opacity:.2,clippingPlanes:this.clippingPlanes}),h=new _c(this.geometry,l);h.position.set(0,0,.05),this.mesh.add(h),this.scene.add(this.mesh),this.meshes.push(this.mesh)}createWater(){this.waterMesh&&this.scene.remove(this.waterMesh);const t=new Vi(this.width,this.depth),e=new jt({color:2003199,transparent:!0,opacity:.6,side:Ye,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.waterMesh=new se(t,e),this.waterMesh.rotation.x=-Math.PI/2,this.waterMesh.position.set(0,.2,0),this.scene.add(this.waterMesh)}updateLights(t){const e=t>=18||t<6;this._lastIsNight!==e&&(this._lastIsNight=e,this.updateColors(e),console.log(`Terrain: Night Lights Update. Night=${e}`))}setSeason(t){this.currentSeason!==t&&(console.log(`[DEBUG] Terrain.setSeason: Changing from ${this.currentSeason} to ${t}`),this.currentSeason=t,this.updateColors(this._lastIsNight))}updateColors(t){t===void 0&&(t=this._lastIsNight||!1);const e=this.geometry.attributes.color.array,i=this.geometry.attributes.position.array,n=this.currentSeason||"Spring";console.log(`[DEBUG] Terrain.updateColors: Season=${n}, IsNight=${t}`);for(let s=0;s<i.length;s+=3){const a=i[s],o=i[s+1],l=Math.round(a+this.width/2),h=Math.round(-o+this.depth/2),c=(l%this.logicalWidth+this.logicalWidth)%this.logicalWidth,d=(h%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[c]&&this.grid[c][d]){const u=this.grid[c][d],p=u.height,g=u.noise,x=u.moisture||.5,m=this.getBiomeColor(p,x,g,t,n,c,d);e[s]=m.r,e[s+1]=m.g,e[s+2]=m.b}}this.geometry.attributes.color.needsUpdate=!0}getBiomeColor(t,e,i,n,s,a,o,l=!1){const h=new ut;if(t<=0){if(l){const d=new ut(8965375),u=new ut(26316);let p=Math.abs(t)/10;return p=Math.min(1,p),h.copy(d).lerp(u,p),h}h.setHex(16032864);const c=.9+i*.2;return h.multiplyScalar(c),h}if(t<=4)if(s==="Winter"){h.setHex(12433259);const c=(i+1)*.5;h.lerp(new ut(10525274),c*.2)}else s==="Summer"?h.setHex(43088):h.setHex(8969608);else if(t<=8)if(s==="Winter"){h.setHex(16777215);const c=(i+1)*.5;h.lerp(new ut(15660543),c*.1)}else if(s==="Autumn"){const c=a*12.9898+o*78.233;let d=Math.sin(c)*43758.5453;d=d-Math.floor(d),d>.66?h.setHex(13369344):d>.33?h.setHex(16763904):h.setHex(2263842)}else s==="Summer"?h.setHex(25600):h.setHex(2263842);else{h.setHex(8421504);const c=(i+1)*.5;h.lerp(new ut(6316128),c*.2)}if(e<.5&&t<=8){const c=new ut(16032864);let d=1;e>.35&&(d=1-(e-.35)/.15),h.lerp(c,d)}if(e>.6&&t<=3){const c=new ut(3100495);let d=Math.min(1,Math.max(0,(e-.6)/.15));s==="Autumn"&&c.setHex(4929057);let u=t>2?1-(t-2):1;h.lerp(c,d*u)}if(n){const c={};h.getHSL(c),c.l*=.3;let d=0;if(t>0){const u=this.logicalWidth,p=this.logicalDepth;for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const m=(a+g+u)%u,f=(o+x+p)%p;if(this.grid[m]&&this.grid[m][f]&&this.grid[m][f].hasBuilding){const T=Math.sqrt(g*g+x*x);T<=2.5&&(d+=Math.max(0,1-T/2.5))}}}if(d>0){d=Math.min(1,d);const u=.1;c.h=c.h*(1-d)+u*d,c.l+=d*.4}h.setHSL(c.h,c.s,c.l)}return h}modifyMoisture(t,e,i){const n=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,s=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[n]&&this.grid[n][s]){const a=this.grid[n][s];a.moisture=Math.max(0,Math.min(1,(a.moisture||.5)+i)),this.updateColorAt(n,s)}}updateColorAt(t,e){const i=this._lastIsNight||!1,n=this.currentSeason||"Spring",s=this.geometry.attributes.color,a=this.logicalWidth,o=this.logicalDepth,l=a+1,h=[{x:t,z:e}];t===0&&h.push({x:a,z:e}),e===0&&h.push({x:t,z:o}),t===0&&e===0&&h.push({x:a,z:o}),h.forEach(c=>{const d=c.z*l+c.x;if(d<0||d>=s.count)return;const u=c.x%a,p=c.z%o;if(this.grid[u]&&this.grid[u][p]){const g=this.grid[u][p],x=g.height,m=g.noise,f=g.moisture||.5,T=this.getBiomeColor(x,f,m,i,n,u,p);s.setXYZ(d,T.r,T.g,T.b)}}),s.needsUpdate=!0}modifyHeight(t,e,i){let n=0;const s=[],a=(h,c)=>({x:(h+this.logicalWidth)%this.logicalWidth,z:(c+this.logicalDepth)%this.logicalDepth}),o=a(t,e);this.grid[o.x]&&this.grid[o.x][o.z]&&(this.grid[o.x][o.z].height+=i,n+=Math.abs(i),s.push(o));let l=0;for(;l<s.length;){const h=s[l++],c=h.x,d=h.z,u=this.grid[c][d],p=u.height;u.hasBuilding&&u.building&&(u.building.userData.type==="cave"?(u.building.y=p,u.building.userData.y=p):this.removeBuilding(u.building));const g=[{x:c+1,z:d},{x:c-1,z:d},{x:c,z:d+1},{x:c,z:d-1}];for(const m of g){const f=a(m.x,m.z),T=this.grid[f.x][f.z],M=T.height,E=p-M;if(E>1){const w=p-1;n+=Math.abs(w-M),T.height=w,s.push(f)}else if(E<-1){const w=p+1;n+=Math.abs(w-M),T.height=w,s.push(f)}}[{x:(c-1+this.logicalWidth)%this.logicalWidth,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:c,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:(c-1+this.logicalWidth)%this.logicalWidth,z:d},{x:c,z:d}].forEach(m=>{const f=this.grid[m.x][m.z];f.hasBuilding&&f.building&&(this.checkBuildingIntegrity(f.building)||this.removeBuilding(f.building))})}return this.updateMesh(),this.updateColors(),n}getTileHeight(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]?this.grid[i][n].height:0}getBuildingAt(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]&&this.grid[i][n].building?this.grid[i][n].building:null}getVisualOffset(t,e){if(this.grid){const d=this.logicalWidth||80,u=this.logicalDepth||80,p=Math.round(t+d/2),g=Math.round(-e+u/2),x=(p%d+d)%d,m=(g%u+u)%u;if(this.grid[x]&&this.grid[x][m]&&this.grid[x][m].hasBuilding)return{x:0,y:0}}const i=this.logicalWidth||80,n=this.logicalDepth||80,s=Math.PI*2/i,a=Math.PI*2/n,o=t*s*10,l=e*a*10,h=(Math.sin(l)+Math.cos(o))*.2,c=(Math.cos(l)+Math.sin(o))*.2;return{x:h,y:c}}getVisualPosition(t,e,i=!0){const n=this.logicalWidth||80,s=this.logicalDepth||80,a=i?.5:0,o=t-n/2+a,l=e-s/2+a,h=o,c=-l,d=this.getVisualOffset(h,c),u=o+d.x,p=l-d.y,g=this.getTileHeight(t,e);return{x:u,y:g,z:p}}getInterpolatedHeight(t,e){let i=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,n=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;const s=Math.floor(i),a=Math.floor(n),o=(s+1)%this.logicalWidth,l=(a+1)%this.logicalDepth,h=i-s,c=n-a,d=this.grid[s][a].height,u=this.grid[o][a].height,p=this.grid[s][l].height,g=this.grid[o][l].height,x=d*(1-h)+u*h,m=p*(1-h)+g*h;return x*(1-c)+m*c}isValidGrid(t,e){return t>=0&&t<this.logicalWidth&&e>=0&&e<this.logicalDepth}raise(t,e){return this.modifyHeight(t,e,1)}lower(t,e){return this.modifyHeight(t,e,-1)}seamlessFbm(t,e,i){let n=0,s=1,a=1,o=0;for(let l=0;l<4;l++)n+=this.periodicNoise(t*a,e*a,a,i)*s,o+=s,s*=.5,a*=2;return n/o}periodicNoise(t,e,i,n){const a=t*5,o=e*5,l=i*5,h=Math.floor(a),c=Math.floor(o),d=a-h,u=o-c,p=Math.floor(l),g=w=>(w%p+p)%p,x=this.random(g(h),g(c),n),m=this.random(g(h+1),g(c),n),f=this.random(g(h),g(c+1),n),T=this.random(g(h+1),g(c+1),n),M=d*d*(3-2*d),E=u*u*(3-2*u);return(1-M)*(1-E)*x+M*(1-E)*m+(1-M)*E*f+M*E*T}raycast(t,e){t.clone();const s=e.clone().normalize(),a=new L;for(let o=0;o<300;o+=.5){if(a.copy(s).multiplyScalar(o).add(t),a.y>50)continue;if(a.y<-10)break;const l=a.x+this.logicalWidth/2,h=a.z+this.logicalDepth/2,c=this.getInterpolatedHeight(l,h);if(a.y<=c)return a.y=c,a}return null}random(t,e,i){const n=Math.sin(t*12.9898+e*78.233+i)*43758.5453123;return n-Math.floor(n)}removeBuilding(t){if(!t)return;this.unregisterEntity(t);const e=this.buildings.indexOf(t);e>-1&&this.buildings.splice(e,1);const i=this.getBuildingSize(t.type);for(let n=0;n<i;n++)for(let s=0;s<i;s++){const a=(t.gridX+n)%this.logicalWidth,o=(t.gridZ+s)%this.logicalDepth;this.grid[a][o].building===t&&(this.grid[a][o].hasBuilding=!1,this.grid[a][o].building=null)}}addBuilding(t,e,i,n=!1){if(!this.grid[e]||!this.grid[e][i])return null;const s=this.grid[e][i].height,a={type:t,gridX:e,gridZ:i,y:s,rotation:Math.random()*Math.PI*2,population:0,id:Math.random().toString(36).substr(2,9),userData:{type:t,gridX:e,gridZ:i,population:0,hp:t==="goblin_hut"?100:t==="cave"?200:50}},o=this.logicalWidth,l=this.logicalDepth,h=this.getBuildingSize(t);if(this.clearArea(e,i,h),this.flattenArea(e,i,h),!n&&t!=="cave"&&!this.checkFlatArea(e,i,h))return null;this.buildings.push(a);for(let c=0;c<h;c++)for(let d=0;d<h;d++){const u=(e+c)%o,p=(i+d)%l,g=this.grid[u][p];g.hasBuilding=!0,g.building=a}return console.log(`[Terrain] Building Added: ${t} at (${e}, ${i}) Size:${h}x${h}. Total: ${this.buildings.length}`),this.registerEntity(a,e,i,"building"),this.updateMesh(),a}clearArea(t,e,i){const n=new Set,s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<i;o++)for(let l=0;l<i;l++){const h=(t+o)%s,c=(e+l)%a,d=this.grid[h][c];d.hasBuilding&&d.building&&n.add(d.building)}for(const o of n)console.log(`[Terrain] Clearing obstacle: ${o.type} for new construction.`),this.removeBuilding(o)}getBuildingSize(t){return t==="tower"||t==="barracks"?3:t==="farm"||t==="house"?2:1}checkBuildingIntegrity(t){if(!t)return!1;const e=this.grid[t.gridX][t.gridZ].height;if(e<=0)return!1;if(t.userData.type!=="cave"&&(typeof t.y!="number"||Math.abs(e-t.y)>.1))return console.log(`[Terrain] Integrity Fail: Type = ${t.userData.type} RootH = ${e.toFixed(2)} b.y = ${t.y} (Height Mismatch)`),!1;const i=t.userData.type,n=this.getBuildingSize(i);if(i==="cave")return!0;const s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<=n;o++)for(let l=0;l<=n;l++){const h=(t.gridX+o)%s,c=(t.gridZ+l)%a,d=this.grid[h][c];if(d.height!==e||d.height<=0)return!1}return!0}checkFlatArea(t,e,i){const n=this.logicalWidth,s=this.logicalDepth;if(!this.grid[t]||!this.grid[t][e])return!1;const a=this.grid[t][e].height;if(a<=0||this.grid[t][e].hasBuilding)return!1;for(let o=0;o<=i;o++)for(let l=0;l<=i;l++){const h=(t+o)%n,c=(e+l)%s,d=this.grid[h][c];if(d.height!==a||d.height<=0||o<i&&l<i&&d.hasBuilding)return!1}return!0}flattenArea(t,e,i){const n=this.grid[t][e].height,s=this.logicalWidth,a=this.logicalDepth;let o=!1;for(let l=0;l<=i;l++)for(let h=0;h<=i;h++){const c=(t+l)%s,d=(e+h)%a,u=this.grid[c][d];u.height!==n&&(u.height=n,o=!0,u.hasBuilding&&u.building&&this.checkBuildingIntegrity(u.building))}return o&&(this.updateMesh(),this.updateColors()),!0}updatePopulation(t,e,i,n){let s=0;this.buildings.forEach(m=>{const f=m.userData.type;(f==="house"||f==="mansion"||f==="castle")&&m.userData.population>0&&(s+=m.userData.population)}),this.totalHousingPop=s;const a=Math.floor(s)+i;let o=.005;e&&(o*=.1);let l=a*o*t;const h=window.game&&window.game.resources?window.game.resources:{grain:0,fish:0,meat:0};let c=!0;if(l>0){let m=l*.4,f=l*.3,T=l*.3;const M=(D,v)=>{if(v<=0)return 0;if(h[D]>=v)return h[D]-=v,0;{const y=h[D];return h[D]=0,v-y}};let E=M("grain",m),w=M("meat",f),b=M("fish",T);E>0&&(E=M("meat",E)),w>0&&(w=M("fish",w)),E>0&&(E=M("fish",E));let A=E+w+b;A>0&&(A=M("grain",A),A=M("meat",A),A=M("fish",A)),A>1e-4&&(c=!1)}let d=0;h.grain>0&&d++,h.fish>0&&d++,h.meat>0&&d++;let u=.5;d===1&&(u=1),d===2&&(u=2.5),d===3&&(u=5);const p=.05*u;this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const g=20,x=this.frameCount%g;this.buildings.forEach((m,f)=>{if(f%g!==x)return;const T=t*g,M=m.userData.type;if(M==="house"||M==="barracks"){const E=m.userData.gridX,w=m.userData.gridZ;let b=p,A=10;M==="barracks"&&(b*=5,A=200);const D=2e5/(2e5+a);if(b*=D,c||(b=0),m.userData.population+=b*T,m.userData.population>=A&&n)if(M==="house")n(E,w,M,m)?m.userData.population=0:m.userData.population=A;else if(M==="barracks"){let v=0;for(let y=0;y<4;y++)n(E,w,M,m)&&v++;v>0?m.userData.population=0:m.userData.population=A}else m.userData.population>A&&(m.userData.population=A)}else if(M==="tower"){const E=p*5,w=300;if(m.userData.population+=E*T,m.userData.population>=w&&n){let b=0;for(let A=0;A<4;A++)n(m.userData.gridX,m.userData.gridZ,"tower",m)&&b++;b>0?m.userData.population=0:m.userData.population=w}}else if(M==="farm"){for(m.userData.population=(m.userData.population||0)+10*T;m.userData.population>=100;)if(m.userData.population-=100,window.game&&window.game.resources){const w=m.userData.gridX,b=m.userData.gridZ,A=this.grid[w][b].moisture||.5;let v=1-Math.abs(A-.5)*2;v<.2&&(v=.2);const y=Math.floor(8*v);window.game.resources.grain+=y}}})}update(t,e,i){this.colorsDirty&&(this.updateColors(),this.colorsDirty=!1);const n=window.game&&window.game.units?window.game.units.length:0;this.updatePopulation(t,i,n,e)}updateLights(t){}serialize(){const t={logicalWidth:this.logicalWidth,logicalDepth:this.logicalDepth,grid:[]},e=new Set;for(let i=0;i<this.logicalWidth;i++){t.grid[i]=[];for(let n=0;n<this.logicalDepth;n++){const s=this.grid[i][n],a={};if(a.h=Math.round(s.height*100)/100,a.n=Math.round(s.noise*100)/100,s.moisture!==void 0&&(a.m=Math.round(s.moisture*100)/100),s.hasBuilding&&(a.hb=1,s.building&&!e.has(s.building.id))){e.add(s.building.id);const o=s.building.gridX!==void 0?s.building.gridX:s.building.userData.gridX,l=s.building.gridZ!==void 0?s.building.gridZ:s.building.userData.gridZ;a.b={t:s.building.userData.type,p:s.building.userData.population,x:o,z:l,r:s.building.rotation!==void 0?Math.round(s.building.rotation*100)/100:0}}t.grid[i][n]=a}}return t}deserialize(t){if(!t){console.error("Terrain.deserialize received invalid data:",t);return}this.buildings.forEach(e=>{this.scene.remove(e),e.userData.clones&&e.userData.clones.forEach(i=>this.scene.remove(i))}),this.buildings=[];for(let e=0;e<this.logicalWidth;e++)for(let i=0;i<this.logicalDepth;i++){const n=this.grid[e][i];n.hasBuilding&&n.building&&this.scene.remove(n.building),n.hasBuilding=!1,n.building=null}this.logicalWidth=t.logicalWidth,this.logicalDepth=t.logicalDepth;for(let e=0;e<this.logicalWidth;e++)for(let i=0;i<this.logicalDepth;i++){const n=t.grid[e][i],s=n.h!==void 0?n.h:n.height,a=n.n!==void 0?n.n:n.noise;this.grid[e][i].height=s,this.grid[e][i].noise=a,n.m!==void 0?this.grid[e][i].moisture=n.m:n.moisture!==void 0&&(this.grid[e][i].moisture=n.moisture);let o=n.hb||n.hasBuilding,l=n.b||n.building;if(o&&l){const h=l.x!==void 0?l.x:l.gridX,c=l.z!==void 0?l.z:l.gridZ;if(h===e&&c===i){const d=l.t||l.type,u={gridX:h,gridZ:c,type:d,population:l.p!==void 0?l.p:l.population,rotation:l.r!==void 0?l.r:l.rotation};d==="house"?this.restoreHouse(u):d==="farm"?this.restoreFarm(u):d==="mansion"?this.restoreMansion(u):d==="castle"?this.restoreCastle(u):d==="goblin_hut"?this.restoreGoblinHut(u):d==="tower"?this.restoreTower(u):d==="barracks"?this.restoreBarracks(u):d==="cave"&&this.restoreCave(u)}}}this.updateMesh(),this.updateColors()}restoreHouse(t){const e=this.addBuilding("house",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreFarm(t){const e=this.addBuilding("farm",t.gridX,t.gridZ,!0);e&&(e.userData.hp=5,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreMansion(t){const e=this.addBuilding("mansion",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCastle(t){this.restoreMansion(t)}updateMeshPosition(t){if(!t)return;const e=this.logicalWidth,i=this.logicalDepth,n=t.position.x,s=t.position.z,a=Math.round(n/e)*e,o=Math.round(s/i)*i;(this.mesh.position.x!==a||this.mesh.position.z!==o)&&(this.mesh.position.set(a,0,o),this.waterMesh&&this.waterMesh.position.set(a,.2,o))}restoreGoblinHut(t){const e=this.addBuilding("goblin_hut",t.gridX,t.gridZ,!0);e?(e.population=t.population||1,e.userData.population=t.population||1,t.rotation!==void 0&&(e.rotation=t.rotation)):console.warn("Failed to restore goblin_hut at",t.gridX,t.gridZ)}restoreTower(t){const e=this.addBuilding("tower",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreBarracks(t){const e=this.addBuilding("barracks",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCave(t){const e=this.addBuilding("cave",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0)}findPath(t,e,i,n){const s=this.logicalWidth,a=this.logicalDepth,l=[{x:t,z:e,g:0,h:0,f:0,parent:null}],h=new Set;let c=0;const d=1e3;for(;l.length>0;){if(c++,c>d)return null;l.sort((x,m)=>x.f-m.f);const u=l.shift();if(u.x===i&&u.z===n){const x=[];let m=u;for(;m;)x.push({x:m.x,z:m.z}),m=m.parent;return x.reverse()}const p=`${u.x},${u.z} `;h.add(p);const g=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(const x of g){let m=u.x+x.x,f=u.z+x.z;if(m<0&&(m=s-1),m>=s&&(m=0),f<0&&(f=a-1),f>=a&&(f=0),h.has(`${m},${f} `))continue;const T=this.grid[u.x][u.z].height;if(!this.grid[m]||!this.grid[m][f])continue;const M=this.grid[m][f].height;if(M<=0||Math.abs(M-T)>2||this.grid[m][f].hasBuilding)continue;const E=u.g+1,w=l.find(y=>y.x===m&&y.z===f);if(w&&w.g<=E)continue;let b=Math.abs(m-i),A=Math.abs(f-n);b>s/2&&(b=s-b),A>a/2&&(A=a-A);const D=b+A,v={x:m,z:f,g:E,h:D,f:E+D,parent:u};if(w){const y=l.indexOf(w);l.splice(y,1)}l.push(v)}}return null}}class xm{constructor(t,e,i,n,s,a,o){this.scene=t,this.camera=e,this.terrain=i,this.spawnCallback=n,this.units=s||[],this.unitRenderer=a,this.game=o,this.raycaster=new wc,this.mouse=new bt,this.mode="raise";const l=new ci(.2,1,8),h=new es({color:16711680,wireframe:!0});this.cursor=new se(l,h),this.cursor.rotation.x=Math.PI,this.scene.add(this.cursor),this.tooltip=document.getElementById("tooltip"),this.setupUI(),window.addEventListener("pointerdown",this.onPointerDown.bind(this)),window.addEventListener("pointerup",this.onPointerUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),this.dragThreshold=5,this.downPosition=new bt}setupUI(){const t=document.getElementById("btn-raise"),e=document.getElementById("btn-lower"),i=document.getElementById("btn-spawn"),n=document.getElementById("btn-barracks"),s=document.getElementById("btn-tower"),a=document.getElementById("btn-cancel"),o=l=>{this.mode=l,t&&t.classList.toggle("active",l==="raise"),e&&e.classList.toggle("active",l==="lower"),i&&i.classList.toggle("active",l==="spawn"),n&&n.classList.toggle("active",l==="barracks"),s&&s.classList.toggle("active",l==="tower"),a&&a.classList.toggle("active",l==="cancel")};t&&t.addEventListener("click",()=>o("raise")),e&&e.addEventListener("click",()=>o("lower")),a&&a.addEventListener("click",()=>o("cancel")),i&&i.addEventListener("click",()=>o("spawn")),n&&n.addEventListener("click",()=>o("barracks")),s&&s.addEventListener("click",()=>o("tower"))}isUIInteraction(t){const e=t.target;return e.closest("button")||e.closest("input")||e.closest("select")||e.closest("a")||e.id==="minimap"||e.closest("#minimap")||e.closest("#start-screen")||e.closest("#save-modal")||e.closest(".ui-container")}onPointerDown(t){this.isUIInteraction(t)||this.downPosition.set(t.clientX,t.clientY)}onPointerUp(t){if(this.isUIInteraction(t))return;const e=new bt(t.clientX,t.clientY);this.downPosition.distanceTo(e)>this.dragThreshold||this.handleInteraction(t)}onMouseMove(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updateCursor(),this.updateTooltip(t.clientX,t.clientY)}updateTooltip(t,e){if(!this.tooltip)return;let i="",n=!1;this.raycaster.setFromCamera(this.mouse,this.camera);const s=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(s){const a=Math.round(s.x),o=Math.round(s.z),l=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;let c=Math.round(a+l/2),d=Math.round(o+h/2);c=(c%l+l)%l,d=(d%h+h)%h;const u=this.terrain.grid[c][d];if(u&&u.hasBuilding&&u.building){const p=u.building,g=p.userData.type||p.type;g==="house"?(i=`House Pop: ${Math.floor(p.userData.population||0)}/10`,n=!0):g==="castle"?(i=`Castle Pop: ${Math.floor(p.userData.population||0)}/200`,n=!0):g==="barracks"?(i=`Barracks Pop: ${Math.floor(p.userData.population||0)}/200`,n=!0):g==="tower"&&(i=`Tower Pop: ${Math.floor(p.userData.population||0)}/300`,n=!0)}if(!n){const p=this.terrain.findNearestEntity("unit",c,d,2.5);p&&(i=`Age: ${Math.floor(p.age)}`,p.action&&(i+=`
${p.action}`),n=!0)}}n?(this.tooltip.textContent=i,this.tooltip.style.display="block",this.tooltip.style.left=t+15+"px",this.tooltip.style.top=e+15+"px"):this.tooltip.style.display="none"}update(){this.lastClientX!==void 0&&this.lastClientY!==void 0&&this.updateTooltip(this.lastClientX,this.lastClientY)}updateCursor(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=null;t=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);const e=t?[{point:t}]:[];if(e.length>0){const n=e[0].point,s=Math.round(n.x),a=Math.round(n.z),o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;let h=Math.round(s+o/2),c=Math.round(a+l/2);h=(h%o+o)%o,c=(c%l+l)%l;const d=this.terrain.getVisualPosition(h,c,!1),u=h-o/2,p=c-l/2,g=d.x-u,x=d.z-p;this.cursor.position.set(s+g,d.y+.5,a+x),this.cursor.visible=!0,this.mode==="spawn"?this.cursor.material.color.setHex(255):this.cursor.material.color.setHex(16711680)}else this.cursor.visible=!1}handleInteraction(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(e){const i=e,n=Math.round(i.x),s=Math.round(i.z),a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let l=Math.round(n+a/2),h=Math.round(s+o/2);if(l=(l%a+a)%a,h=(h%o+o)%o,t.button===0){if(this.game&&!this.game.canAction()){console.warn("Action Blocked: Not enough Mana (Negative)");return}const c=i.x,d=i.z;this.mode==="raise"?this.game&&(this.game.addRequest("raise",l,h,null,c,d),this.game.consumeMana(10),console.log(`[Input] Request Queued: Raise at ${l},${h}`)):this.mode==="lower"?this.game&&(this.game.addRequest("lower",l,h,null,c,d),this.game.consumeMana(10),console.log(`[Input] Request Queued: Lower at ${l},${h}`)):this.mode==="cancel"?this.game&&this.game.tryCancelRequest(l,h)&&console.log(`[Input] Request Canceled at ${l},${h}`):this.mode==="spawn"?this.spawnCallback&&(this.spawnCallback(l,h,!0),this.game&&this.game.consumeMana(20)):this.mode==="barracks"?this.game&&(this.game.addRequest("build_barracks",l,h,null,c,d),this.game.consumeMana(50)):this.mode==="tower"&&this.game&&(this.game.addRequest("build_tower",l,h,null,c,d),this.game.consumeMana(50))}else if(t.button===2){if(this.game&&!this.game.canAction())return;if(this.game){const c=i.x,d=i.z;this.game.addRequest("lower",l,h,null,c,d),this.game.consumeMana(10)}}this.updateCursor()}}}class Js{static nextId=0;constructor(t,e,i,n,s){this.id=Js.nextId++,this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.type=s||"entity",this.position=new L,this.rotationY=0,this.isMoving=!1,this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.walkAnimTimer=0,this.terrain&&this.terrain.registerEntity&&this.terrain.registerEntity(this,this.gridX,this.gridZ,this.type),this.updatePosition()}updatePosition(){if(isNaN(this.gridX)||isNaN(this.gridZ))return;const t=this.getPositionForGrid(this.gridX,this.gridZ);this.position.copy(t)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=t-i/2+.5,a=e-n/2+.5,o=s,l=-a;let h={x:0,y:0};this.terrain&&this.terrain.getVisualOffset&&(h=this.terrain.getVisualOffset(o,l));let c=0;return this.terrain&&this.terrain.getInterpolatedHeight?c=this.terrain.getInterpolatedHeight(t,e):this.terrain&&this.terrain.getTileHeight&&(c=this.terrain.getTileHeight(t,e)),new L(s+h.x,c,a-h.y)}getDistance(t,e){const i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);return Math.sqrt(i*i+n*n)}startMove(t,e,i){this.isMoving=!0,this.moveStartTime=i,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=t,this.targetGridZ=e;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=t-this.gridX,o=e-this.gridZ;Math.abs(a)>n/2&&(a-=Math.sign(a)*n),Math.abs(o)>s/2&&(o-=Math.sign(o)*s),this.rotationY=Math.atan2(a,o)}updateMovement(t){if(!this.isMoving)return;const e=(t-this.moveStartTime)/this.moveDuration;if(e>=1)this.isMoving=!1,this.terrain&&this.terrain.moveEntity&&this.terrain.moveEntity(this,this.gridX,this.gridZ,this.targetGridX,this.targetGridZ,this.type),this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition(),this.onMoveFinished&&this.onMoveFinished(t);else{const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=this.startGridX,a=this.startGridZ,o=this.targetGridX,l=this.targetGridZ;o-s>i/2&&(s+=i),s-o>i/2&&(s-=i),l-a>n/2&&(a+=n),a-l>n/2&&(a-=n);const h=s+(o-s)*e,c=a+(l-a)*e,d=this.getPositionForGrid(h,c);this.position.copy(d),this.onMoveStep&&this.onMoveStep(e)}}die(){this.isDead=!0,this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this)}}console.log("[Unit.js] Module Loaded! V=FINAL");class pt extends Js{static assets={geometries:{},materials:{},textures:{}};static nextId=0;static initAssets(){if(pt.assets.initialized)return;const t=new le(.3,.35,.2);t.translate(0,.3,0),pt.assets.geometries.body=t;const e=new le(.25,.25,.25);e.translate(0,.6,0),pt.assets.geometries.head=e;const i=new Vi(.2,.2);i.translate(0,.6,.126),pt.assets.geometries.facePlane=i;const n=new le(.1,.25,.1);n.translate(0,-.1,0),pt.assets.geometries.limb=n;const s=new le(.05,.5,.05);s.translate(0,.25,0),pt.assets.geometries.sword=s;const a=new le(.05,.8,.05);a.translate(0,0,0),pt.assets.geometries.staff=a,new Ci(.25,.25,.02,16).translate(0,0,0),new ci(.15,.4,16).translate(0,.2,0);const h=new ci(.2,.5,16);h.translate(0,.25,0),pt.assets.geometries.wizardHat=h;const c=new Ci(.3,.3,.02,16);pt.assets.geometries.wizardHatBrim=c,pt.assets.materials.skin=new Xe({color:16764074,roughness:.8}),pt.assets.materials.clothes=new Xe({color:8934707,roughness:1}),pt.assets.materials.tool=new Xe({color:5592405,metalness:.5}),pt.assets.materials.hat=new Xe({color:9127187,roughness:1}),pt.assets.materials.armor=new Xe({color:11184810,metalness:.8,roughness:.2}),pt.assets.materials.helmet=new Xe({color:8947848,metalness:.9,roughness:.1}),pt.assets.materials.robe=new Xe({color:4474009,roughness:1}),pt.assets.materials.robe=new Xe({color:4474009,roughness:1}),pt.assets.materials.wizardHat=new Xe({color:3355528,roughness:1}),pt.assets.materials.metal=new Xe({color:14540253,metalness:.9,roughness:.2}),pt.assets.materials.wood=new Xe({color:9127187,roughness:.9}),pt.assets.materials.darkMagic=new Xe({color:3342387,roughness:1}),pt.assets.textures.face=pt.createFaceTexture(),pt.assets.materials.face=new Xe({map:pt.assets.textures.face,transparent:!0}),pt.assets.textures.hair=pt.createHairTexture(),pt.assets.materials.hair=new jt({map:pt.assets.textures.hair,transparent:!0}),pt.assets.materials.heads=null,pt.assets.initialized=!0}static createFaceTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");return e.fillStyle="#FFCCAA",e.fillRect(0,0,64,64),e.fillStyle="#4A3000",e.fillRect(0,0,64,15),e.fillStyle="#000000",e.fillRect(15,25,8,8),e.fillRect(41,25,8,8),e.fillStyle="#A0522D",e.fillRect(20,45,24,4),new Re(t)}static createHairTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,64,64),e.fillStyle="#DDDDDD";for(let i=0;i<40;i++)e.fillRect(Math.random()*60,Math.random()*60,4,4);return new Re(t)}constructor(t,e,i,n,s,a=!1){super(t,e,i,n,"unit"),this.id=pt.nextId++,console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${s} Pos:${i},${n} Special:${a}`),this.gridX=i!==void 0?i:20,this.gridZ=n!==void 0?n:20;let o=a;typeof s=="boolean"&&(o=s,s="worker"),this.role=s||"worker",this.isSpecial=o,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0,this.buildStagnationCount=0,this.lastTime=0,this.lastGatherTime=-Math.random()*30,this.position=new L,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}};const l=80+Math.random()*20;this.lifespan=l,this.age=20,this.isDead=!1,this.isFinished=!1,this.crossMesh=null,this.hp=35+Math.floor(Math.random()*15),this.maxHp=this.hp,this.attackCooldown=0,this.attackRate=1,this.damage=4,this.targetGoblin=null,this.role==="knight"?(this.hp*=15,this.maxHp=this.hp,this.damage*=25):this.role==="wizard"&&(this.hp*=3,this.maxHp=this.hp,this.damage*=20,this.attackRate=2),this.updatePosition(),this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.lastTime=0,this.moveInterval=2e3+Math.random()*3e3,(this.role==="knight"||this.role==="wizard")&&(this.moveInterval=0),this.stagnationTimer=0,this.huntingCooldown=0,this.target=null,this.isMoving=!1,this.targetX=0,this.targetZ=0,this.terrain.registerEntity(this,this.gridX,this.gridZ,"unit"),this.wanderCount=0,this.migrationTarget=null,this.ignoredTargets=new Map}takeDamage(t){this.hp-=t,this.hp<=0&&this.die()}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.role==="worker"&&this.targetRequest&&window.game&&(console.log(`Unit ${this.id} died. Releasing job ${this.targetRequest.id}`),window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null),this.createCross(),console.log("Unit died."))}attackGoblin(t){if(!(this.attackCooldown>0)){if(console.log(`[Unit Debug] ATTACKING Goblin ${t.id}`),this.role==="wizard"){if(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,window.game&&window.game.spawnProjectile){const e=this.position.clone().add(new L(0,.9,0)),i=this.terrain.getTileHeight(t.gridX,t.gridZ),n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80,a=new L(t.gridX-n/2,i+1,t.gridZ-s/2);window.game.spawnProjectile(e,a)}setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200);t.takeDamage(this.damage),(this.role==="knight"||this.role==="wizard")&&this.reportEnemy(t),t.hp<=0&&(t.isDead=!0,this.targetGoblin=null,window.game&&(this.role==="knight"||this.role==="wizard")&&this.searchForHut(t.gridX,t.gridZ)),this.attackCooldown=this.attackRate}}attackBuilding(t){this.attackCooldown>0||(this.role==="wizard"?(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)):(this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200)),t.userData.hp===void 0&&(t.userData.hp=100),t.userData.hp-=this.damage,console.log(`Unit ${this.id} attacking ${t.type}. HP: ${t.userData.hp}`),t.userData.hp<=0&&(console.log(`Building ${t.type} Destroyed!`),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ)),this.attackCooldown=this.attackRate)}debugGetAge(){return"DEBUG_AGE_"+this.age}updateLogic(t,e,i,n,s,a){if(this.id===0&&console.log(`[Unit.js] ENTERED updateLogic. Dead=${this.isDead}`),this.isDead){this.updateDeathAnimation(e),this.action="Dead";return}if(this.id===0){const h=this.terrain.getTileHeight(this.gridX,this.gridZ);console.log(`[Unit Debug V2] Start Logic. Night=${i}, Stag=${this.stagnationTimer.toFixed(1)}, Age=${this.age.toFixed(1)}, H=${h}, Action=${this.action}`)}if(this.id===0&&this.debugFrame%60===0&&console.log(`[Unit Heartbeat] ID:${this.id} Action:${this.action} Moving:${this.isMoving} T:${t.toFixed(1)} dt:${e.toFixed(4)} Int:${this.moveInterval.toFixed(0)}`),this.attackCooldown>0&&(this.attackCooldown-=e),this.isMoving&&this.updateMovement(t),this.ignoredTargets.size>0)for(const[h,c]of this.ignoredTargets)t>c&&this.ignoredTargets.delete(h);if(this.isMoving&&t-this.moveStartTime>2e4&&(console.warn(`[Unit] Stuck moving for >20s. Forcing Reset. ID:${this.id}`),this.isMoving=!1,this.updatePosition(),this.role==="worker"&&this.targetRequest&&window.game&&(console.warn(`Unit ${this.id} stuck. Releasing job ${this.targetRequest.id}`),window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null,this.action="Idle")),this.action==="Working"&&!this.targetRequest&&(this.action="Idle",this.isMoving=!1),this.role==="worker"&&this.targetRequest&&window.game&&this.debugFrame%60===0){const h=this.targetRequest,c=window.game.requestQueue.includes(h),d=h.assignedTo===this.id;(!c||!d)&&(console.warn(`[Unit ${this.id}] Detected GHOST Job (Valid:${c}, Ours:${d}). Dropping.`),this.targetRequest=null,this.action="Idle",this.isMoving=!1)}!this.isMoving&&t>=this.lastTime&&this.action!=="Migrating"&&(this.action="Idle");let o=1;if((this.role==="knight"||this.role==="wizard")&&(o=.1),this.age+=e*o,this.age>=this.lifespan){this.die();return}if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}if(this.action==="Migrating"&&this.migrationTarget){if(this.migrationTimer=(this.migrationTimer||0)+e,this.migrationTimer>30){console.log(`Unit ${this.id} migration timed out. Retrying.`),this.migrate(t);return}if(Math.random()<.05){if(this.role==="worker"&&window.game){const c=window.game.findBestRequest(this);if(c&&window.game.claimRequest(this,c)){console.log(`Unit ${this.id} interrupted migration for Job ${c.type}`),this.targetRequest=c,this.action="Idle",this.migrationTarget=null,this.migrationTimer=0;return}}if(this.searchSurroundings(this.gridX,this.gridZ),this.targetGoblin||this.targetBuilding&&this.role!=="worker"){console.log(`Unit ${this.id} interrupted migration for combat.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0;return}}this.getDistance(this.migrationTarget.x,this.migrationTarget.z)<=2?(console.log(`Unit ${this.id} finished migration.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0):!this.isMoving&&t-(this.lastMoveAttempt||0)>1e3&&(this.lastMoveAttempt=t,this.triggerMove(this.migrationTarget.x,this.migrationTarget.z,t));return}{let h=null,c=1/0;const d=this.targetGoblin&&!this.targetGoblin.isDead,u=this.targetBuilding&&this.targetBuilding.userData.hp>0;let p=this.action==="Chasing"||this.action==="Fighting"||this.action==="Sieging"||this.action==="Unstuck";this.role==="worker"&&this.targetRequest&&(p=!0),this.scanTimer=(this.scanTimer||0)+1;let g=30;(d||u)&&(g=300);const x=this.scanTimer>g;let m=!p||!d&&!u||x;if(this.role==="worker"&&this.targetRequest&&(m=!1),m){x&&(this.scanTimer=0);const f=this.targetGoblin?this.targetGoblin.id:this.targetBuilding?this.targetBuilding.id:null;if(n){const T=this.role==="knight"||this.role==="wizard"?50:15;for(const M of n){if(M.isDead||this.ignoredTargets.has(M.id))continue;const E=this.getDistance(M.gridX,M.gridZ);let w=T;if(M.id===f&&(w=T*2),E>w)continue;const b=this.terrain.getTileHeight(M.gridX,M.gridZ);let A=E-1e3;b>8&&(A+=20),M.id===f&&(A-=500),A<c&&(c=A,h={type:"goblin",obj:M})}}if(this.terrain.buildings){const T=this.role==="knight"||this.role==="wizard"?1/0:30;for(const M of this.terrain.buildings)if(!(this.role==="worker"&&M.type!=="goblin_hut")&&(M.type==="goblin_hut"||M.type==="cave")){if(M.userData&&M.userData.hp<=0||this.ignoredTargets.has(M.id))continue;const E=this.getDistance(M.gridX,M.gridZ);if(E>T)continue;let w=E-5;M.id===f&&(w-=500),E<8&&(this.role==="knight"||this.role==="wizard")&&(w-=2e3),w<c&&(c=w,h={type:"building",obj:M})}}this.targetGoblin=null,this.targetBuilding=null,h&&(h.type==="goblin"?this.targetGoblin=h.obj:this.targetBuilding=h.obj),!this.targetGoblin&&!this.targetBuilding&&window.game&&window.game.raidPoints&&window.game.raidPoints.length>0&&this.findRaidTarget()}}if(this.targetGoblin){const h=this.getDistance(this.targetGoblin.gridX,this.targetGoblin.gridZ);let c=1.8;this.role==="wizard"&&(c=5.5),h<=c?(this.action="Fighting",this.isMoving=!1,this.attackGoblin(this.targetGoblin)):(this.isMoving,this.isMoving||(this.action="Chasing",this.triggerMove(this.targetGoblin.gridX,this.targetGoblin.gridZ,t),this.moveInterval=0))}else if(this.targetBuilding){const h=this.getDistance(this.targetBuilding.gridX,this.targetBuilding.gridZ);h<=2?(this.action="Sieging",this.attackBuilding(this.targetBuilding)):!this.isMoving&&t-this.lastTime>this.moveInterval&&(this.action=h>20?"Travelling":"Approaching Target",this.triggerMove(this.targetBuilding.gridX,this.targetBuilding.gridZ,t))}else if(this.targetRaidPoint)this.getDistance(this.targetRaidPoint.x,this.targetRaidPoint.z)<=5?(this.searchSurroundings(this.gridX,this.gridZ),this.targetRaidPoint=null):!this.isMoving&&t-this.lastTime>this.moveInterval&&this.triggerMove(this.targetRaidPoint.x,this.targetRaidPoint.z,t);else if(this.role==="worker"&&this.targetRequest)if(this.isSleeping&&(this.isSleeping=!1),this.isMoving&&(this.action==="Idle"||this.action==="Moving"||this.action==="Migrating")&&(console.log(`[Unit ${this.id}] Interrupting movement for Job ${this.targetRequest.type}`),this.isMoving=!1,this.moveTimer=0,this.lastMoveAttempt=0),this.getDistance(this.targetRequest.x,this.targetRequest.z)<=2)if(this.action="Working",this.isMoving=!1,window.game&&window.game.completeRequest(this,this.targetRequest),this.targetRequest=null,window.game){const c=window.game.findBestRequest(this);c&&window.game.claimRequest(this,c)?(this.targetRequest=c,this.action="Approaching Job",console.log(`[Unit ${this.id}] Chained Job ${c.type}`)):this.action="Idle"}else this.action="Idle";else this.action="Working",!this.isMoving&&t-(this.lastMoveAttempt||0)>1e3&&(this.lastMoveAttempt=t,this.triggerMove(this.targetRequest.x,this.targetRequest.z,t),this.isMoving&&(this.action="Approaching Job"),this.isMoving?this.jobMoveFailures=0:(this.jobMoveFailures=(this.jobMoveFailures||0)+1,this.jobMoveFailures>5&&(console.warn(`Unit ${this.id} failed to reach job ${this.targetRequest.id} after 5 attempts. Releasing.`),window.game&&window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null,this.action="Idle",this.jobMoveFailures=0)));else if(this.role==="worker"&&!this.targetRequest&&window.game&&Math.random()<.5){const h=window.game.findBestRequest(this);h&&window.game.claimRequest(this,h)&&(this.targetRequest=h,console.log(`Unit ${this.id} claimed job ${h.type}`))}if((this.action==="Chasing"||this.action==="Fighting")&&!this.targetGoblin&&!this.targetBuilding&&(this.isMoving=!1,this.action="Idle"),this.gatherResources(t),this.moveStuckTimer=0,this.lastGridX===this.gridX&&this.lastGridZ===this.gridZ&&!this.isSleeping&&!this.isMoving?this.stagnationTimer+=e:(this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0),this.stagnationTimer>10){this.moveRandomly(t),this.stagnationTimer>20&&(this.migrate(t),this.stagnationTimer=0);return}if(!this.isMoving&&!this.targetGoblin&&!this.targetBuilding&&!this.targetRaidPoint&&!this.targetRequest){const h=this.role==="worker"||this.role==="fisher"||this.role==="hunter";if(i&&h){const c=this.terrain.grid[this.gridX][this.gridZ];if(c.hasBuilding&&c.building&&(c.building.type==="house"||c.building.type==="castle")){this.isSleeping||(console.log(`[Unit ${this.id}] Sleeping`),this.isSleeping=!0);return}else if(!this.isMoving&&t-this.lastTime>this.moveInterval){let u=this.homeBase;if(u||(this.nightShelterTarget&&this.nightShelterTarget.userData.hp>0?u=this.nightShelterTarget:(u=this.findNearestShelter(),this.nightShelterTarget=u)),u){this.action="Going Home",this.triggerMove(u.userData.gridX,u.userData.gridZ,t);return}else this.nightShelterTarget=null}}else this.isSleeping&&(this.isSleeping=!1)}if(!this.isMoving&&t-this.lastTime>this.moveInterval){if(this.id===0&&this.debugFrame%60===0&&console.log(`[Unit Debug] Executing Logic. Role: ${this.role}`),this.role==="worker"){const h=this.terrain.grid[this.gridX][this.gridZ];h&&h.moisture!==.5&&Math.random()<.1?this.improveLand(t):this.moveRandomly(t)}else this.role==="knight"||this.role==="wizard"?(this.findRaidTarget()||this.exploreSurroundings(t),this.targetRaidPoint?this.triggerMove(this.targetRaidPoint.x,this.targetRaidPoint.z,t):this.patrol(t)):this.moveRandomly(t);this.lastTime=t,this.moveInterval=2e3+Math.random()*3e3}}searchForHut(t,e){this.findTargetBuilding(40)}findTargetBuilding(t){if(!this.terrain.buildings)return;const e=this.terrain.buildings;let i=null,n=1/0,s=null;const a=t!==void 0?t:1/0;for(const o of e)if(!(this.role==="worker"&&o.type!=="goblin_hut")&&(o.type==="goblin_hut"||o.type==="cave")){const l=this.getDistance(o.gridX,o.gridZ);if(l>a)continue;l<n&&(n=l,i=o,s=o.type)}this.role==="knight"&&Math.random()<.001&&console.log(`[Unit Debug] Targeted: ${this.targetGoblin?"Goblin":this.targetBuilding?this.targetBuilding.type:"None"}`),i&&s&&(this.targetBuilding=i,this.reportEnemy(i))}reportEnemy(t){const e=t.gridX,i=t.gridZ,n=this.game?this.game.gameTotalTime:Date.now();this.homeBase&&this.homeBase.userData&&this.homeBase.userData.memory?this.homeBase.userData.memory.reportRaid(e,i,n):this.game&&this.game.battleMemory&&this.game.battleMemory.reportRaid(e,i,n)}findRaidTarget(){let t=[];const e=this.game?this.game.gameTotalTime:Date.now();if(this.homeBase&&this.homeBase.userData&&this.homeBase.userData.memory?t=this.homeBase.userData.memory.getPriorities(e):this.game&&this.game.battleMemory&&(t=this.game.battleMemory.getPriorities(e)),!t||t.length===0)return;let i=null,n=1/0;return t.forEach(s=>{const a=this.getDistance(s.x,s.z);a<8||this.ignoredTargets&&this.ignoredTargets.has(`${s.x},${s.z}`)||a<n&&(n=a,i=s)}),i?(this.targetRaidPoint=i,!0):!1}findNearestShelter(){if(!this.terrain||!this.terrain.buildings)return null;let t=null,e=1/0;for(const i of this.terrain.buildings)if(!(this.ignoredTargets&&this.ignoredTargets.has(i.id))&&!(this.ignoredTargets&&this.ignoredTargets.has(`${i.gridX},${i.gridZ}`))&&(i.type==="house"||i.type==="castle")&&i.userData&&i.userData.hp>0){const n=this.getDistance(i.gridX,i.gridZ);n<e&&(e=n,t=i)}return t}exploreSurroundings(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.floor(Math.random()*e),s=Math.floor(Math.random()*i);this.terrain.getTileHeight(n,s)<=0||this.getDistance(n,s)<15||(this.targetRaidPoint={x:n,z:s,priority:1},console.log(`Unit ${this.id} exploring to ${n},${s}`))}searchSurroundings(t,e){if(this.game&&this.terrain&&this.terrain.findBestTarget){const i=this.terrain.findBestTarget("goblin",t,e,12,(s,a)=>a);if(i){this.targetGoblin=i,this.reportEnemy(i),console.log(`Unit ${this.id} found Goblin via Spatial Search!`);return}if(this.terrain.findBestTarget("building",t,e,12,(s,a)=>s.userData.type==="goblin_hut"||s.userData.type==="cave"?a:1/0)){console.log(`Unit ${this.id} found Base via Spatial Search!`);return}}}patrol(t){if(this.terrain.buildings&&this.terrain.buildings.length>0){const e=Math.floor(Math.random()*this.terrain.buildings.length),i=this.terrain.buildings[e],n=Math.abs(this.gridX-i.gridX),s=Math.abs(this.gridZ-i.gridZ);n<5&&s<5?this.moveRandomly(t):this.triggerMove(i.gridX,i.gridZ,t)}else this.moveRandomly(t)}onMoveFinished(t){this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0,this.tryBuildStructure(t)?(this.action==="Migrating"&&(console.log(`Unit ${this.id} built structure during migration. Stopping.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0),this.buildStagnationCount=0):this.action==="Migrating"?this.buildStagnationCount=0:(this.buildStagnationCount=(this.buildStagnationCount||0)+1,this.buildStagnationCount>5&&(console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`),this.migrate(t),this.buildStagnationCount=0))}onMoveStep(t){const e=Math.sin(t*Math.PI*4)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-e,this.limbs.rightLeg.x=e,this.mesh&&(this.mesh.position.copy(this.position),this.rotationY!==void 0&&(this.mesh.rotation.y=this.rotationY))}triggerMove(t,e,i){let n=t-this.gridX,s=e-this.gridZ;const a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;Math.abs(n)>a/2&&(n=-Math.sign(n)*(a-Math.abs(n))),Math.abs(s)>o/2&&(s=-Math.sign(s)*(o-Math.abs(s)));let l=this.gridX,h=this.gridZ,c=Math.abs(n)>Math.abs(s);if(c?l+=Math.sign(n):h+=Math.sign(s),l<0&&(l=a-1),l>=a&&(l=0),h<0&&(h=o-1),h>=o&&(h=0),this.canMoveTo(l,h)){this.executeMove(l,h,i);return}let d=this.gridX,u=this.gridZ,p=!1;if(c&&Math.abs(s)>0?(u+=Math.sign(s),p=!0):!c&&Math.abs(n)>0&&(d+=Math.sign(n),p=!0),p&&(d<0&&(d=a-1),d>=a&&(d=0),u<0&&(u=o-1),u>=o&&(u=0),this.canMoveTo(d,u))){this.executeMove(d,u,i);return}if(this.action,this.lastTime=i,this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>10){console.log(`Unit ${this.id} stuck chasing. Skipping target temporarily.`);const g=i+5e3;this.targetGoblin&&(this.ignoredTargets.set(this.targetGoblin.id,g),this.ignoredTargets.set(`${this.targetGoblin.gridX},${this.targetGoblin.gridZ}`,g),this.targetGoblin=null),this.targetBuilding&&(this.ignoredTargets.set(this.targetBuilding.id,g),this.ignoredTargets.set(`${this.targetBuilding.gridX},${this.targetBuilding.gridZ}`,g),this.targetBuilding=null),this.targetRaidPoint&&(this.ignoredTargets.set(`${this.targetRaidPoint.x},${this.targetRaidPoint.z}`,g),this.targetRaidPoint=null),this.stuckCount=0}}canMoveTo(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=t,a=e;s<0&&(s=i-1),s>=i&&(s=0),a<0&&(a=n-1),a>=n&&(a=0);const o=this.terrain.getTileHeight(this.gridX,this.gridZ),l=this.terrain.getTileHeight(s,a);if(l<=0)return console.log(`[Unit ${this.id}] Blocked by Water at ${s},${a} H:${l}`),!1;if(l>8&&console.log(`[Unit ${this.id}] Moving onto Rock at ${s},${a} H:${l} (Speed Penalty)`),Math.abs(l-o)>2)return console.log(`[Unit ${this.id}] Blocked by Slope at ${s},${a} H:${o}->${l}`),!1;const h=this.terrain.grid[s][a];return h.hasBuilding&&h.building,!0}executeMove(t,e,i){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;t<0&&(t=n-1),t>=n&&(t=0),e<0&&(e=s-1),e>=s&&(e=0),super.startMove(t,e,i),this.action="Moving";const a=this.terrain.getTileHeight(this.gridX,this.gridZ),o=this.terrain.getTileHeight(t,e),l=Math.abs(o-a);o>8?this.moveDuration=8e3:l>.1?this.moveDuration=4e3:this.moveDuration=1e3,this.stuckCount=0}gatherResources(t){if(t-this.lastGatherTime<5e3)return;this.lastGatherTime=t;const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,s=!1;const a=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:4,z:0},{x:-4,z:0},{x:0,z:4},{x:0,z:-4}];for(const o of a){let l=this.gridX+o.x,h=this.gridZ+o.z;l<0&&(l=e+l),l>=e&&(l=l-e),h<0&&(h=i+h),h>=i&&(h=h-i),l=(l%e+e)%e,h=(h%i+i)%i;const c=this.terrain.getTileHeight(l,h);if(c<=0?n=!0:c>4&&c<=8&&(s=!0),n&&s)break}if(window.game&&window.game.resources){if(n){const o=this.role==="fisher"?3:1;window.game.resources.fish+=o}if(s){const o=this.role==="hunter"?3:1;window.game.resources.meat+=o}}}findTargetGoblin(t){if(!t||t.length===0)return;let e=null,i=1/0;const n=this.role==="knight"||this.role==="wizard"?50:15;for(const s of t){if(s.isDead||this.ignoredTargets&&this.ignoredTargets.has(s.id))continue;const a=this.gridX-s.gridX,o=this.gridZ-s.gridZ,l=Math.sqrt(a*a+o*o);if(l>n)continue;const h=this.terrain.getTileHeight(s.gridX,s.gridZ);let c=l;h>8&&(c+=20),c<i&&(i=c,e=s)}this.targetGoblin=e}getDistance(t,e){const i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);return Math.sqrt(i*i+n*n)}moveRandomly(t){this.id===0&&console.log(`[Unit Debug] moveRandomly called for ID:0 at ${t}`);const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}];if(this.wanderCount=(this.wanderCount||0)+1,this.wanderCount>15)for(let c=0;c<15;c++){const d=Math.floor(Math.random()*e),u=Math.floor(Math.random()*i),p=this.terrain.getTileHeight(d,u),g=this.terrain.grid[d][u];if((p>8||p>0&&p<2)&&(!g||!g.hasBuilding)){this.migrationTarget={x:d,z:u},this.wanderCount=0,console.log(`Unit bored. Migrating to ${p>8?"Mountain":"Sea"} at ${d},${u}`),this.triggerMove(d,u,t);return}}const s=this.terrain.getTileHeight(this.gridX,this.gridZ),a=[];for(const c of n){let d=this.gridX+c.x,u=this.gridZ+c.z;d<0&&(d=e-1),d>=e&&(d=0),u<0&&(u=i-1),u>=i&&(u=0);const p=this.terrain.getTileHeight(d,u);this.terrain.grid[d][u],Math.abs(p-s)<=2&&p>0&&a.push({x:d,z:u,h:p,dir:c})}if(a.length===0){this.lastTime=t;return}let o=null;if(this.role==="hunter"||this.role==="fisher"){let c=0;a.forEach(u=>{let p=1;this.role==="hunter"?u.h>4&&u.h<=8?p=5:u.h>8&&(p=2):this.role==="fisher"&&u.h<=2.5&&(p=5),u.weight=p,c+=p});let d=Math.random()*c;for(const u of a)if(d-=u.weight,d<=0){o=u;break}}if(!o){const c=Math.floor(Math.random()*a.length);o=a[c]}this.isMoving=!0,this.action="Moving";const l=Math.abs(o.h-s);o.h>8?this.moveDuration=6e3:l>.1?this.moveDuration=2500:this.moveDuration=1e3,this.moveStartTime=t,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=o.x,this.targetGridZ=o.z;const h=Math.atan2(o.dir.x,o.dir.z);this.rotationY=h}cleanIgnoredTargets(t){if(this.ignoredTargets)for(const[e,i]of this.ignoredTargets)t>i&&this.ignoredTargets.delete(e)}forceUnstuck(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;let i=!1,n=0;for(;!i&&n<10;){const s=Math.floor(Math.random()*7)-3,a=Math.floor(Math.random()*7)-3;if(s===0&&a===0)continue;let o=this.gridX+s,l=this.gridZ+a;o<0&&(o=t-1),o>=t&&(o=0),l<0&&(l=e-1),l>=e&&(l=0);const h=this.terrain.getTileHeight(o,l),c=this.terrain.grid[o][l];if(h>0&&c&&!c.hasBuilding){const d=this.gridX,u=this.gridZ;this.gridX=o,this.gridZ=l,this.updatePosition(),this.terrain.moveEntity(this,d,u,o,l,"unit"),console.log(`Unit warped from ${d},${u} to ${o},${l}`),i=!0}n++}}migrate(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.random()*Math.PI*2,s=20+Math.random()*20;let a=Math.floor(this.gridX+Math.cos(n)*s),o=Math.floor(this.gridZ+Math.sin(n)*s);a<0&&(a+=e),a>=e&&(a-=e),o<0&&(o+=i),o>=i&&(o-=i),this.terrain.getTileHeight(a,o)<=0&&(a=(a+5)%e),console.log(`Unit ${this.id} migrating to ${a},${o} (Walking)`),this.action="Migrating",this.migrationTarget={x:a,z:o},this.migrationTimer=0,this.triggerMove(a,o,t)}tryBuildStructure(t){this.terrain.logicalWidth,this.terrain.logicalDepth;const e=this.gridX,i=this.gridZ,n=this.terrain.grid[e][i];if(n.hasBuilding||n.height>8)return;const s=this.terrain.buildings.filter(M=>M.type==="house"),a=this.terrain.buildings.filter(M=>M.type==="farm"),o=this.terrain.buildings.filter(M=>M.type==="mansion"),l=s.length,h=a.length;o.length;const c=window.game?window.game.totalPopulation:0,d=this.terrain.buildings.filter(M=>M.type==="tower"),u=Math.floor(c/3e3);if(d.length<u&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("tower",e,i),this.moveRandomly(t),!0;const g=this.terrain.buildings.filter(M=>M.type==="barracks").length,x=Math.floor(c/1e3);if(g<x&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("barracks",e,i),this.moveRandomly(t),!0;const f=(window.game?window.game.resources.grain:100)<c*2,T=h<l/2+1;return(f||T)&&Math.random()<.3&&this.terrain.checkFlatArea(e,i,2)&&this.buildFarm(t)?!0:this.terrain.checkFlatArea(e,i,2)?n.moisture>.8?!1:(this.terrain.addBuilding("house",e,i),this.moveRandomly(t),!0):!1}improveLand(t){if(!this.terrain.grid[this.gridX]||!this.terrain.grid[this.gridX][this.gridZ])return;const i=this.terrain.grid[this.gridX][this.gridZ].moisture||.5;let s=.5-i,a=s*.4;Math.abs(a)<.1&&Math.abs(s)>.01&&(a=s>0?.1:-.1),Math.abs(a)>Math.abs(s)&&(a=s),this.terrain.modifyMoisture(this.gridX,this.gridZ,a),console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${i.toFixed(2)} -> ${(i+a).toFixed(2)}`),this.moveRandomly(t)}buildFarm(t){let e=null;if(this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]&&(e=this.terrain.grid[this.gridX][this.gridZ]),e){const i=e.moisture||.5;let s=1-Math.abs(i-.5)*2.5;if(s<0&&(s=0),Math.random()>s)return console.log(`Farm construction failed due to soil conditions (Moisture: ${i.toFixed(2)}, Chance: ${(s*100).toFixed(0)}%). Improving Land.`),this.improveLand(t),!1}return this.terrain.addBuilding("farm",this.gridX,this.gridZ),this.moveRandomly(t),!0}static getCrossAssets(){return pt.assets.geometries.crossV||(pt.assets.geometries.crossV=new le(.2,1,.2),pt.assets.geometries.crossH=new le(.8,.2,.2)),pt.assets.geometries}createCross(){const t=new ii,e=pt.getCrossAssets(),i=new jt({color:16777215,transparent:!0,opacity:1}),n=new se(e.crossV,i);n.position.y=.5,t.add(n);const s=new se(e.crossH,i);s.position.y=.7,t.add(s);const a=this.getPositionForGrid(this.gridX,this.gridZ);t.position.copy(a),this.scene.add(t),this.crossMesh=t,this.deathTimer=0}updateDeathAnimation(t){if(!this.crossMesh)return;isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=3;if(this.deathTimer>=i)this.scene.remove(this.crossMesh),this.crossMesh.children.forEach(n=>{n.material&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material.opacity=1-n})}}static createWoodTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#8B4513",e.fillRect(0,0,64,64),e.strokeStyle="#5D2906",e.lineWidth=2;for(let i=0;i<8;i++)e.beginPath(),e.moveTo(0,i*8+Math.random()*4),e.lineTo(64,i*8+Math.random()*4),e.stroke();return new Re(t)}static createRoofTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#A52A2A",e.fillRect(0,0,64,64),e.fillStyle="#800000";for(let i=0;i<64;i+=8)for(let n=0;n<64;n+=8)(n+i)%16===0&&e.fillRect(n,i,7,7);return new Re(t)}serialize(){let t,e;return this.homeBase&&this.homeBase.userData&&(t=this.homeBase.userData.gridX,e=this.homeBase.userData.gridZ),{gridX:this.gridX,gridZ:this.gridZ,age:this.age,lifespan:this.lifespan,isDead:this.isDead,isFinished:this.isFinished,isMoving:this.isMoving,targetX:this.targetX,targetZ:this.targetZ,moveStartTime:this.moveStartTime,startGridX:this.startGridX,startGridZ:this.startGridZ,targetGridX:this.targetGridX,targetGridZ:this.targetGridZ,isSpecial:this.isSpecial,role:this.role,hp:this.hp,maxHp:this.maxHp,damage:this.damage,xp:this.xp||0,level:this.level||1,name:this.name,homeBaseGridX:t,homeBaseGridZ:e}}dispose(){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh=null),this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.geometry&&t.geometry.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}static deserialize(t,e,i){const n=new pt(e,i,t.gridX,t.gridZ,t.role||t.isSpecial,t.isSpecial);if(n.age=t.age||20,typeof t.lifespan=="number"&&t.lifespan>0&&(n.lifespan=t.lifespan),t.lifespan&&(n.lifespan=t.lifespan),n.isDead=t.isDead||!1,n.isDead=t.isDead||!1,n.isFinished=t.isFinished||!1,t.hp!==void 0&&(n.hp=t.hp),t.maxHp!==void 0&&(n.maxHp=t.maxHp),t.damage!==void 0&&(n.damage=t.damage),t.xp!==void 0&&(n.xp=t.xp),t.level!==void 0&&(n.level=t.level),t.level!==void 0&&(n.level=t.level),t.name!==void 0&&(n.name=t.name),t.homeBaseGridX!==void 0&&t.homeBaseGridZ!==void 0&&(n.savedHomeBaseX=t.homeBaseGridX,n.savedHomeBaseZ=t.homeBaseGridZ),t.isMoving){n.isMoving=!0,n.targetX=t.targetX,n.targetZ=t.targetZ,n.moveStartTime=t.moveStartTime,n.startGridX=t.startGridX,n.startGridZ=t.startGridZ,n.targetGridX=t.targetGridX,n.targetGridZ=t.targetGridZ,n.getDistance(n.targetGridX,n.targetGridZ);const s=Math.abs(n.startGridX-n.targetGridX),a=Math.abs(n.startGridZ-n.targetGridZ),o=Math.sqrt(s*s+a*a);n.moveDuration=o*1e3}return n.isDead&&(n.isFinished||n.createCross()),n}}const al={type:"change"},Va={type:"start"},Gl={type:"end"},Fs=new is,ol=new Qe,_m=Math.cos(70*Oh.DEG2RAD),ve=new L,Oe=2*Math.PI,ne={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lr=1e-6;class Mm extends Ac{constructor(t,e=null){super(t,e),this.state=ne.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.DOLLY,RIGHT:Rn.PAN},this.touches={ONE:An.ROTATE,TWO:An.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new nn,this._lastTargetPosition=new L,this._quat=new nn().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fo,this._sphericalDelta=new Fo,this._scale=1,this._panOffset=new L,this._rotateStart=new bt,this._rotateEnd=new bt,this._rotateDelta=new bt,this._panStart=new bt,this._panEnd=new bt,this._panDelta=new bt,this._dollyStart=new bt,this._dollyEnd=new bt,this._dollyDelta=new bt,this._dollyDirection=new L,this._mouse=new bt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=bm.bind(this),this._onPointerDown=vm.bind(this),this._onPointerUp=ym.bind(this),this._onContextMenu=Cm.bind(this),this._onMouseWheel=Em.bind(this),this._onKeyDown=wm.bind(this),this._onTouchStart=Am.bind(this),this._onTouchMove=Rm.bind(this),this._onMouseDown=Sm.bind(this),this._onMouseMove=Tm.bind(this),this._interceptControlDown=Dm.bind(this),this._interceptControlUp=Pm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(al),this.update(),this.state=ne.NONE}update(t=null){const e=this.object.position;ve.copy(e).sub(this.target),ve.applyQuaternion(this._quat),this._spherical.setFromVector3(ve),this.autoRotate&&this.state===ne.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Oe:i>Math.PI&&(i-=Oe),n<-Math.PI?n+=Oe:n>Math.PI&&(n-=Oe),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(ve.setFromSpherical(this._spherical),ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ve.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const h=new L(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),a=ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Fs.origin.copy(this.object.position),Fs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fs.direction))<_m?this.object.lookAt(this.target):(ol.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fs.intersectPlane(ol,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Lr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lr||this._lastTargetPosition.distanceToSquared(this.target)>Lr?(this.dispatchEvent(al),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Oe/60*this.autoRotateSpeed*t:Oe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ve.setFromMatrixColumn(e,0),ve.multiplyScalar(-t),this._panOffset.add(ve)}_panUp(t,e){this.screenSpacePanning===!0?ve.setFromMatrixColumn(e,1):(ve.setFromMatrixColumn(e,0),ve.crossVectors(this.object.up,ve)),ve.multiplyScalar(t),this._panOffset.add(ve)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;ve.copy(n).sub(this.target);let s=ve.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=t-i.left,s=e-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new bt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function vm(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function bm(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function ym(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Gl),this.state=ne.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Sm(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ne.DOLLY;break;case Rn.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ne.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ne.ROTATE}break;case Rn.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ne.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ne.PAN}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(Va)}function Tm(r){switch(this.state){case ne.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ne.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ne.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Em(r){this.enabled===!1||this.enableZoom===!1||this.state!==ne.NONE||(r.preventDefault(),this.dispatchEvent(Va),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Gl))}function wm(r){this.enabled!==!1&&this._handleKeyDown(r)}function Am(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case An.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ne.TOUCH_ROTATE;break;case An.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ne.TOUCH_PAN;break;default:this.state=ne.NONE}break;case 2:switch(this.touches.TWO){case An.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ne.TOUCH_DOLLY_PAN;break;case An.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ne.TOUCH_DOLLY_ROTATE;break;default:this.state=ne.NONE}break;default:this.state=ne.NONE}this.state!==ne.NONE&&this.dispatchEvent(Va)}function Rm(r){switch(this._trackPointer(r),this.state){case ne.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ne.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ne.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ne.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ne.NONE}}function Cm(r){this.enabled!==!1&&r.preventDefault()}function Dm(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Pm(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Im(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Ur={exports:{}},ll;function Lm(){return ll||(ll=1,(function(r){var t=(function(){var e=String.fromCharCode,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={};function a(l,h){if(!s[l]){s[l]={};for(var c=0;c<l.length;c++)s[l][l.charAt(c)]=c}return s[l][h]}var o={compressToBase64:function(l){if(l==null)return"";var h=o._compress(l,6,function(c){return i.charAt(c)});switch(h.length%4){default:case 0:return h;case 1:return h+"===";case 2:return h+"==";case 3:return h+"="}},decompressFromBase64:function(l){return l==null?"":l==""?null:o._decompress(l.length,32,function(h){return a(i,l.charAt(h))})},compressToUTF16:function(l){return l==null?"":o._compress(l,15,function(h){return e(h+32)})+" "},decompressFromUTF16:function(l){return l==null?"":l==""?null:o._decompress(l.length,16384,function(h){return l.charCodeAt(h)-32})},compressToUint8Array:function(l){for(var h=o.compress(l),c=new Uint8Array(h.length*2),d=0,u=h.length;d<u;d++){var p=h.charCodeAt(d);c[d*2]=p>>>8,c[d*2+1]=p%256}return c},decompressFromUint8Array:function(l){if(l==null)return o.decompress(l);for(var h=new Array(l.length/2),c=0,d=h.length;c<d;c++)h[c]=l[c*2]*256+l[c*2+1];var u=[];return h.forEach(function(p){u.push(e(p))}),o.decompress(u.join(""))},compressToEncodedURIComponent:function(l){return l==null?"":o._compress(l,6,function(h){return n.charAt(h)})},decompressFromEncodedURIComponent:function(l){return l==null?"":l==""?null:(l=l.replace(/ /g,"+"),o._decompress(l.length,32,function(h){return a(n,l.charAt(h))}))},compress:function(l){return o._compress(l,16,function(h){return e(h)})},_compress:function(l,h,c){if(l==null)return"";var d,u,p={},g={},x="",m="",f="",T=2,M=3,E=2,w=[],b=0,A=0,D;for(D=0;D<l.length;D+=1)if(x=l.charAt(D),Object.prototype.hasOwnProperty.call(p,x)||(p[x]=M++,g[x]=!0),m=f+x,Object.prototype.hasOwnProperty.call(p,m))f=m;else{if(Object.prototype.hasOwnProperty.call(g,f)){if(f.charCodeAt(0)<256){for(d=0;d<E;d++)b=b<<1,A==h-1?(A=0,w.push(c(b)),b=0):A++;for(u=f.charCodeAt(0),d=0;d<8;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1}else{for(u=1,d=0;d<E;d++)b=b<<1|u,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=0;for(u=f.charCodeAt(0),d=0;d<16;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1}T--,T==0&&(T=Math.pow(2,E),E++),delete g[f]}else for(u=p[f],d=0;d<E;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1;T--,T==0&&(T=Math.pow(2,E),E++),p[m]=M++,f=String(x)}if(f!==""){if(Object.prototype.hasOwnProperty.call(g,f)){if(f.charCodeAt(0)<256){for(d=0;d<E;d++)b=b<<1,A==h-1?(A=0,w.push(c(b)),b=0):A++;for(u=f.charCodeAt(0),d=0;d<8;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1}else{for(u=1,d=0;d<E;d++)b=b<<1|u,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=0;for(u=f.charCodeAt(0),d=0;d<16;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1}T--,T==0&&(T=Math.pow(2,E),E++),delete g[f]}else for(u=p[f],d=0;d<E;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1;T--,T==0&&(T=Math.pow(2,E),E++)}for(u=2,d=0;d<E;d++)b=b<<1|u&1,A==h-1?(A=0,w.push(c(b)),b=0):A++,u=u>>1;for(;;)if(b=b<<1,A==h-1){w.push(c(b));break}else A++;return w.join("")},decompress:function(l){return l==null?"":l==""?null:o._decompress(l.length,32768,function(h){return l.charCodeAt(h)})},_decompress:function(l,h,c){var d=[],u=4,p=4,g=3,x="",m=[],f,T,M,E,w,b,A,D={val:c(0),position:h,index:1};for(f=0;f<3;f+=1)d[f]=f;for(M=0,w=Math.pow(2,2),b=1;b!=w;)E=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),M|=(E>0?1:0)*b,b<<=1;switch(M){case 0:for(M=0,w=Math.pow(2,8),b=1;b!=w;)E=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),M|=(E>0?1:0)*b,b<<=1;A=e(M);break;case 1:for(M=0,w=Math.pow(2,16),b=1;b!=w;)E=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),M|=(E>0?1:0)*b,b<<=1;A=e(M);break;case 2:return""}for(d[3]=A,T=A,m.push(A);;){if(D.index>l)return"";for(M=0,w=Math.pow(2,g),b=1;b!=w;)E=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),M|=(E>0?1:0)*b,b<<=1;switch(A=M){case 0:for(M=0,w=Math.pow(2,8),b=1;b!=w;)E=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),M|=(E>0?1:0)*b,b<<=1;d[p++]=e(M),A=p-1,u--;break;case 1:for(M=0,w=Math.pow(2,16),b=1;b!=w;)E=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),M|=(E>0?1:0)*b,b<<=1;d[p++]=e(M),A=p-1,u--;break;case 2:return m.join("")}if(u==0&&(u=Math.pow(2,g),g++),d[A])x=d[A];else if(A===p)x=T+T.charAt(0);else return null;m.push(x),d[p++]=T+x.charAt(0),u--,T=x,u==0&&(u=Math.pow(2,g),g++)}}};return o})();r!=null?r.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(Ur)),Ur.exports}var Um=Lm();const Fr=Im(Um);class Fm{constructor(){this.prefix="god_game_save_"}save(t,e){try{const i=this.prefix+t,n={timestamp:Date.now(),data:e},s=JSON.stringify(n),a=Fr.compressToUTF16(s);return localStorage.setItem(i,a),console.log(`Saved to slot ${t} (Compressed). Size: ${a.length} chars (Original: ${s.length})`),!0}catch(i){return console.error("Save failed:",i),(i.name==="QuotaExceededError"||i.name==="NS_ERROR_DOM_QUOTA_REACHED")&&(console.warn("LocalStorage Quota Exceeded!"),alert("Save Failed: Storage Quota Exceeded. Try deleting old saves.")),!1}}load(t){try{const e=this.prefix+t,i=localStorage.getItem(e);if(!i)return null;console.log(`Loading slot ${t}, Raw length: ${i.length}`);let n=null;const s=Fr.decompressFromUTF16(i);s&&s.startsWith("{")?(n=s,console.log("Load: Decompressed successfully.")):(console.log("Load: Decompression failed or legacy format. Trying raw JSON..."),n=i);const a=JSON.parse(n);return console.log(`Parsed Data for slot ${t}:`,a),a.data}catch(e){return console.error("Load failed:",e),null}}getSlots(){const t=[];for(let e=1;e<=5;e++){const i=this.prefix+e,n=localStorage.getItem(i);if(n)try{let s=null;const a=Fr.decompressFromUTF16(n);a&&a.startsWith("{")?s=a:s=n;const o=JSON.parse(s);t.push({id:e,timestamp:o.timestamp,empty:!1})}catch(s){console.warn(`Slot ${e} check failed:`,s),t.push({id:e,empty:!0})}else t.push({id:e,empty:!0})}return t}}class Nm{constructor(t,e,i){this.scene=t,this.clouds=[],this.cloudCount=30,this.spreadRadius=80;const n=512,s=512,a=document.createElement("canvas");a.width=n,a.height=s;const o=a.getContext("2d"),l=o.createImageData(n,s),h=l.data;for(let c=0;c<s;c++)for(let d=0;d<n;d++){const u=(d/n-.5)*2,p=(c/s-.5)*2,g=Math.sqrt(u*u+p*p),x=(Math.sin(u*3+p*2.5)+Math.cos(p*3.5-u*2.5))*.25+(Math.sin(u*8+p*6)+Math.cos(p*9-u*7))*.12+(Math.sin(u*18)+Math.cos(p*22))*.05,m=1-(g+x*1.5);let f=m<0?0:m>1?1:m*m*(3-2*m);const T=Math.max(0,1-Math.pow(g,4));f*=T;const M=(c*n+d)*4;h[M]=255,h[M+1]=255,h[M+2]=255,h[M+3]=Math.floor(Math.max(0,Math.min(1,f*.7))*255)}o.putImageData(l,0,0),this.texture=new Re(a),this.texture.colorSpace=$e,this.texture.minFilter=Oi,this.material=new Al({map:this.texture,transparent:!0,opacity:.9,color:16777215,depthWrite:!1,blending:tn}),this.initClouds(),this.windSpeed=1,this.windDir=new L(1,0,.5).normalize()}initClouds(){for(let t=0;t<this.cloudCount;t++){const e=new dc(this.material),i=20+Math.random()*10,n=1.2+Math.random()*.6;e.scale.set(i*n,i,1),e.material=this.material.clone(),e.material.rotation=Math.random()*Math.PI*2,e.position.set((Math.random()-.5)*this.spreadRadius*2,20+Math.random()*10,(Math.random()-.5)*this.spreadRadius*2),this.scene.add(e),this.clouds.push(e)}}update(t,e){if(!e)return;const i=e.position.x,n=e.position.z,s=this.spreadRadius;for(const a of this.clouds){a.position.addScaledVector(this.windDir,this.windSpeed*t);let o=a.position.x-i,l=a.position.z-n;o>s?a.position.x-=s*2:o<-s&&(a.position.x+=s*2),l>s?a.position.z-=s*2:l<-s&&(a.position.z+=s*2)}}}class Ae{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ae.assets.initialized)return;const t=new ci(.05,.2,4);t.rotateX(Math.PI/2),Ae.assets.geometries.body=t;const e=new Fe,i=new Float32Array([0,0,0,.3,0,.1,0,0,.15]);e.setAttribute("position",new Ge(i,3)),e.computeVertexNormals(),Ae.assets.geometries.wing=e,Ae.assets.materials.body=new es({color:16777215}),Ae.assets.materials.wing=new es({color:15658734,side:Ye}),Ae.assets.initialized=!0}constructor(t,e,i,n){Ae.initAssets(),this.scene=t,this.terrainWidth=e,this.terrainDepth=i,this.clippingPlanes=n||[],this.birds=[],this.birdCount=20;const s=Ae.assets.materials;Object.values(s).forEach(a=>{a&&(a.clippingPlanes=this.clippingPlanes)}),this.initBirds()}initBirds(){for(let t=0;t<this.birdCount;t++){const e=new ii,i=new se(Ae.assets.geometries.body,Ae.assets.materials.body);e.add(i);const n=new se(Ae.assets.geometries.wing,Ae.assets.materials.wing);n.position.set(0,0,0),e.add(n);const s=new se(Ae.assets.geometries.wing,Ae.assets.materials.wing);s.position.set(0,0,0),s.scale.x=-1,e.add(s),e.userData.leftWing=n,e.userData.rightWing=s,e.position.set((Math.random()-.5)*this.terrainWidth,15+Math.random()*10,(Math.random()-.5)*this.terrainDepth);const a=2+Math.random()*2,o=Math.random()*Math.PI*2;e.userData.velocity=new L(Math.cos(o)*a,0,Math.sin(o)*a),e.userData.speed=a,e.userData.turnSpeed=.5+Math.random(),e.userData.flapOffset=Math.random()*100,this.scene.add(e),this.birds.push(e)}}update(t,e,i){this.birds.forEach(n=>{n.position.addScaledVector(n.userData.velocity,t);const s=this.terrainWidth/2,a=this.terrainDepth/2;n.position.x>s&&(n.position.x-=this.terrainWidth),n.position.x<-s&&(n.position.x+=this.terrainWidth),n.position.z>a&&(n.position.z-=this.terrainDepth),n.position.z<-a&&(n.position.z+=this.terrainDepth);let o=!0;if(i){const c=new ni(n.position,1);o=i.intersectsSphere(c)}if(!o){n.visible=!1;return}if(n.visible=!0,Math.random()<.01){const c=(Math.random()-.5)*2;n.userData.velocity.applyAxisAngle(new L(0,1,0),c*n.userData.turnSpeed*t)}n.lookAt(n.position.clone().add(n.userData.velocity));const h=Math.sin(e*15+n.userData.flapOffset)*.5;n.userData.leftWing.rotation.z=h,n.userData.rightWing.rotation.z=-h,Math.random()<.001&&window.game&&window.game.soundManager&&window.game.soundManager.playBirdSound(n.position)})}}class Te{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Te.assets.initialized||(Te.assets.geometries.body=new le(.4,.3,.6),Te.assets.geometries.head=new le(.25,.25,.3),Te.assets.geometries.leg=new le(.1,.3,.1),Te.assets.materials.body=new jt({color:16777215}),Te.assets.materials.head=new jt({color:1118481}),Te.assets.materials.leg=new jt({color:1118481}),Te.assets.initialized=!0)}constructor(t,e,i){Te.initAssets(),this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.sheeps=[],this.sheepCount=10;const n=Te.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this.initSheeps()}removeSheep(t){this.terrain.unregisterEntity(t),this.scene.remove(t)}initSheeps(){for(let t=0;t<this.sheepCount;t++){const e=this.createSheep();this.spawnSheep(e),this.scene.add(e),this.sheeps.push({mesh:e,state:"idle",timer:Math.random()*5,targetX:0,targetZ:0})}}createSheep(){const t=new ii,e=new se(Te.assets.geometries.body,Te.assets.materials.body);e.position.y=.3,t.add(e);const i=new se(Te.assets.geometries.head,Te.assets.materials.head);i.position.set(0,.5,.35),t.add(i);const n=[{x:.1,z:.2},{x:-.1,z:.2},{x:.1,z:-.2},{x:-.1,z:-.2}],s=[];return n.forEach(a=>{const o=new se(Te.assets.geometries.leg,Te.assets.materials.leg);o.position.set(a.x,.15,a.z),t.add(o),s.push(o)}),t.userData.legs=s,t}spawnSheep(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,s=0;for(;!n&&s<100;){const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);if(this.terrain.getTileHeight(a,o)>.5){const h=this.getPositionForGrid(a,o);t.position.copy(h),t.userData.gridX=a,t.userData.gridZ=o,this.terrain.registerEntity(t,a,o,"sheep"),n=!0}s++}}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=this.terrain.getInterpolatedHeight(t,e);return new L(t-i/2+.5,s,e-n/2+.5)}update(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;this.sheeps.forEach((s,a)=>{const o=s.mesh;if(this.terrain.getTileHeight(o.userData.gridX,o.userData.gridZ)<=0){this.removeSheep(o),this.sheeps.splice(a,1);return}if(s.timer-=e,s.lastGridX||(s.lastGridX=o.userData.gridX,s.lastGridZ=o.userData.gridZ,s.stagnationTimer=0),s.lastGridX===o.userData.gridX&&s.lastGridZ===o.userData.gridZ?s.stagnationTimer+=e:(s.lastGridX=o.userData.gridX,s.lastGridZ=o.userData.gridZ,s.stagnationTimer=0),s.stagnationTimer>15&&(s.state="moving",s.timer=5,s.stagnationTimer=-Math.random()*5),s.timer<=0)if(Math.random()<.3||s.stagnationTimer<0){s.state="moving",s.timer=2+Math.random()*3;const h=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let d=h.length-1;d>0;d--){const u=Math.floor(Math.random()*(d+1));[h[d],h[u]]=[h[u],h[d]]}let c=!1;for(const d of h){let u=o.userData.gridX+d.x,p=o.userData.gridZ+d.z;u<0&&(u=i-1),u>=i&&(u=0),p<0&&(p=n-1),p>=n&&(p=0);const g=this.terrain.getTileHeight(u,p),x=this.terrain.getTileHeight(o.userData.gridX,o.userData.gridZ);if(g>0&&Math.abs(g-x)<=1){s.targetX=u,s.targetZ=p,c=!0;break}}c||(s.state="idle")}else s.state="idle",s.timer=1+Math.random()*2;if(s.state==="moving"&&s.targetX!==void 0){const h=this.getPositionForGrid(s.targetX,s.targetZ),c=o.position.clone(),d=h.clone().sub(c).normalize();if(c.distanceTo(h)<.1){o.position.copy(h);const g=o.userData.gridX,x=o.userData.gridZ;o.userData.gridX=s.targetX,o.userData.gridZ=s.targetZ,this.terrain.moveEntity(o,g,x,o.userData.gridX,o.userData.gridZ,"sheep"),s.state="idle",s.targetX=void 0}else{o.position.addScaledVector(d,2*e);const x=this.terrain.logicalWidth||80,m=this.terrain.logicalDepth||80,f=o.position.x+x/2-.5,T=o.position.z+m/2-.5;o.position.y=this.terrain.getInterpolatedHeight(f,T);const M=Math.atan2(d.x,d.z);o.rotation.y=M}const p=Math.sin(t*10)*.2;o.userData.legs&&(o.userData.legs[0].rotation.x=p,o.userData.legs[1].rotation.x=-p,o.userData.legs[2].rotation.x=-p,o.userData.legs[3].rotation.x=p)}else o.userData.legs&&o.userData.legs.forEach(h=>h.rotation.x=0)})}}class Bm{constructor(){this.context=null,this.masterGain=null,this.initialized=!1,this.camera=null,this.frustum=new ns,this.projScreenMatrix=new Kt}init(t){if(this.camera=t,!this.context)try{const e=window.AudioContext||window.webkitAudioContext;this.context=new e,this.masterGain=this.context.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.context.destination),console.log("AudioContext created")}catch(e){console.error("Web Audio API not supported",e);return}try{const e=this.context.createBuffer(1,1,22050),i=this.context.createBufferSource();i.buffer=e,i.connect(this.context.destination),i.start(0)}catch(e){console.warn("Silent buffer unlock failed",e)}this.context.state!=="running"?this.context.resume().then(()=>{console.log("AudioContext resumed, state:",this.context.state),this.initialized=!0}).catch(e=>{console.error("AudioContext resume failed",e)}):this.initialized=!0}resumeContext(){this.context&&this.context.state!=="running"&&this.context.resume().then(()=>{console.log("AudioContext resumed by user gesture."),this.initialized=!0})}updateFrustum(){this.camera&&(this.camera.updateMatrixWorld(),this.projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projScreenMatrix))}isVisible(t){return!this.camera||!this.initialized?!0:(this.updateFrustum(),this.frustum.containsPoint(t))}getVolume(){if(!this.camera)return .5;const t=this.camera.zoom,e=.8;return .1+(t-e)/(4-e)*.9}playBirdSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=n=>{setTimeout(()=>{if(!this.context)return;const s=this.context.currentTime,a=this.context.createOscillator(),o=this.context.createGain();a.type="sine";const l=2500+Math.random()*200;a.frequency.setValueAtTime(l,s),a.frequency.exponentialRampToValueAtTime(l*.8,s+.1),a.connect(o),o.connect(this.masterGain),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(e*.4,s+.01),o.gain.exponentialRampToValueAtTime(.01,s+.15),a.start(s),a.stop(s+.15)},n)};i(0),i(200),i(400)}playSheepSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=this.context.currentTime,n=.6+Math.random()*.4,s=this.context.createOscillator();s.type="sawtooth";const a=350+Math.random()*40;s.frequency.setValueAtTime(a,i),s.frequency.exponentialRampToValueAtTime(a*.8,i+n);const o=this.context.createOscillator(),l=this.context.createGain();o.frequency.value=7+Math.random()*2,l.gain.setValueAtTime(.7,i);const h=this.context.createGain(),c=this.context.createGain();c.gain.value=1;const d=this.context.createGain();d.gain.value=.3,o.connect(d),d.connect(c.gain),o.start(i),o.stop(i+n);const u=this.context.createBiquadFilter();u.type="lowpass",u.frequency.value=1200,u.Q.value=1,s.connect(c),c.connect(u),u.connect(h),h.connect(this.masterGain),h.gain.setValueAtTime(0,i),h.gain.linearRampToValueAtTime(e*.6,i+.1),h.gain.linearRampToValueAtTime(e*.5,i+n*.6),h.gain.exponentialRampToValueAtTime(.01,i+n),s.start(i),s.stop(i+n)}}class Gt extends Js{static nextId=0;static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Gt.assets.initialized||(Gt.assets.geometries.torsoNormal=new le(.25,.3,.2),Gt.assets.geometries.torsoHob=new le(.35,.3,.2),Gt.assets.geometries.head=new le(.2,.2,.2),Gt.assets.geometries.ear=new ci(.05,.15,4),Gt.assets.geometries.arm=new le(.08,.25,.08),Gt.assets.geometries.leg=new le(.1,.25,.1),Gt.assets.geometries.club=new Ci(.03,.05,.4,6),Gt.assets.geometries.staff=new le(.04,.8,.04),Gt.assets.geometries.crossV=new le(.2,.8,.2),Gt.assets.geometries.crossH=new le(.6,.2,.2),Gt.assets.materials.skinNormal=new jt({color:5614165}),Gt.assets.materials.clothesNormal=new jt({color:9127187}),Gt.assets.materials.skinHob=new jt({color:3368499}),Gt.assets.materials.clothesHob=new jt({color:2236962}),Gt.assets.materials.club=new jt({color:6636321}),Gt.assets.materials.staff=new jt({color:9127187}),Gt.assets.materials.skinShaman=new jt({color:34952}),Gt.assets.materials.clothesShaman=new jt({color:3342438}),Gt.assets.materials.skinKing=new jt({color:8912896}),Gt.assets.materials.clothesKing=new jt({color:16766720}),Gt.assets.materials.cross=new jt({color:5614165,transparent:!0,opacity:1}),Gt.assets.initialized=!0)}constructor(t,e,i,n,s="normal",a=null){Gt.initAssets(),super(t,e,i,n,"goblin"),this.type=s,this.type=s,this.clanId=a,this.id=Gt.nextId++,this.scale=1,this.isRanged=!1,this.type==="king"?(this.hp=1200+Math.floor(Math.random()*200),this.maxHp=this.hp,this.lifespan=200,this.damage=200,this.scale=1.8,this.attackRate=1.5):this.type==="shaman"?(this.hp=500+Math.floor(Math.random()*100),this.maxHp=this.hp,this.lifespan=100,this.damage=80,this.scale=1.2,this.isRanged=!0,this.attackRate=2):this.type==="hobgoblin"?(this.hp=60+Math.floor(Math.random()*30),this.maxHp=this.hp,this.lifespan=80+Math.random()*40,this.damage=15,this.scale=1.2):(this.hp=30+Math.floor(Math.random()*10),this.maxHp=this.hp,this.lifespan=30+Math.random()*20,this.damage=8),this.age=0,this.isDead=!1,this.isFinished=!1,this.state="idle",this.targetUnit=null,this.targetBuilding=null,this.attackCooldown=0,this.attackRate||(this.attackRate=1),this.position=new L,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}},this.walkAnimTimer=0,this.position.set(this.terrain.gridToWorld(this.gridX),this.terrain.getTileHeight(this.gridX,this.gridZ),this.terrain.gridToWorld(this.gridZ)),this.isMoving=!1,this.moveTimer=0,this.moveInterval=1600,this.lastTime=window.game&&window.game.gameTotalTime!==void 0?window.game.gameTotalTime:0,this.baseMoveDuration=800,this.moveDuration=this.baseMoveDuration,this.terrain.registerEntity(this,this.gridX,this.gridZ,"goblin")}takeDamage(t){this.hp-=t,this.hp<=0&&this.die()}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.clanId&&window.goblinManager,this.createCross(),console.log(`Goblin (${this.type}) died. ID:${this.id}`),this.type==="king"&&window.game&&(window.game.mana+=500,console.log("King Defeated! +500 Mana")))}updateLogic(t,e,i,n){if(this.isDead||this.isFinished)return;if(this.age+=e,this.age>=this.lifespan){this.die();return}if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}if(this.isMoving&&this.updateMovement(t),this.attackCooldown>0&&(this.attackCooldown-=e),Math.random()<.005&&console.log(`[GoblinAI] ID:${this.id} State:${this.state} Moving:${this.isMoving} TargetU:${!!this.targetUnit} TargetB:${!!this.targetBuilding} Pos:${this.gridX.toFixed(1)},${this.gridZ.toFixed(1)}`),!this.isMoving){if(this.state==="migrating"&&this.migrationTarget){this.moveToTarget(this.migrationTarget.x,this.migrationTarget.z,t),this.getDistance(this.migrationTarget.x,this.migrationTarget.z)<2&&(console.log(`Goblin ${this.id} finished migrating.`),this.state="idle",this.migrationTarget=null);return}if(this.findTarget(i,n),this.targetUnit&&this.targetUnit.isDead&&(this.targetUnit=null,this.chaseTimer=0),this.currentMemoryTarget&&!this.targetUnit&&!this.targetBuilding&&(this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z)<5&&window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null),this.targetUnit)if(this.chaseTimer=(this.chaseTimer||0)+e,this.chaseTimer>10)this.targetUnit=null,this.chaseTimer=0,this.moveRandomly(t);else{if(this.moveToTarget(this.targetUnit.gridX,this.targetUnit.gridZ,t),!this.targetUnit)return;this.getDistance(this.targetUnit.gridX,this.targetUnit.gridZ)<=1.8&&(this.attackTarget(t,e),this.chaseTimer=0)}else if(this.targetBuilding)this.moveToTarget(this.targetBuilding.gridX,this.targetBuilding.gridZ,t),this.getDistanceToBuilding(this.targetBuilding)<=1.5&&this.attackTarget(t,e);else if(!this.isMoving&&t-this.lastTime>this.moveInterval){this.wanderCount=(this.wanderCount||0)+1;let a=!1;if(Math.random()<.02&&(a=this.tryBuildHut()),a)this.wanderCount=0;else if(this.wanderCount>10){console.log(`Goblin ${this.id} bored. Migrating...`),this.migrate(t),this.wanderCount=0,this.lastTime=t;return}this.moveRandomly(t),this.lastTime=t}}}findTarget(t,e){if(this.targetUnit&&(this.targetUnit.isDead||this.targetUnit.isFinished)&&(this.targetUnit=null),this.targetBuilding&&this.targetBuilding.userData.hp<=0&&(this.targetBuilding=null),this.targetUnit||this.targetBuilding)return;const i=this.terrain.findBestTarget("unit",this.gridX,this.gridZ,10,(s,a)=>{if(s.isSleeping)return 1/0;const o=this.terrain.getTileHeight(s.gridX,s.gridZ);let l=a;return o>8&&(l+=20),l});if(this.targetUnit=i,this.targetUnit)return;const n=this.terrain.findBestTarget("building",this.gridX,this.gridZ,20,(s,a)=>s.userData.type==="goblin_hut"||s.userData.type==="cave"||s.userData.hp<=0?1/0:a);this.targetBuilding=n,!this.targetUnit&&!this.targetBuilding&&this.currentMemoryTarget&&(this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z)<5&&window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null)}getDistanceToBuilding(t){if(!t)return 1/0;let e=1;this.terrain&&this.terrain.getBuildingSize?e=this.terrain.getBuildingSize(t.type):((t.type==="house"||t.type==="farm")&&(e=2),(t.type==="mansion"||t.type==="barracks"||t.type==="tower")&&(e=3),t.type==="castle"&&(e=4));const i=t.gridX,n=t.gridX+e-1,s=t.gridZ,a=t.gridZ+e-1,o=Math.max(i-this.gridX,0,this.gridX-n),l=Math.max(s-this.gridZ,0,this.gridZ-a);return Math.sqrt(o*o+l*l)}moveToTarget(t,e,i){if(this.isMoving)return;const n=this.getDistance(t,e);let s=this.gridX,a=this.gridZ,o=!1;if(n>2&&this.terrain.findPath){if(this.terrain.grid[t]&&this.terrain.grid[t][e]&&this.terrain.grid[t][e].hasBuilding){let c=t,d=e,u=1/0;const p=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(const g of p){const x=t+g.x,m=e+g.z;if(this.terrain.isValidGrid(x,m)&&!this.terrain.grid[x][m].hasBuilding&&this.terrain.grid[x][m].height>0){const f=Math.pow(this.gridX-x,2)+Math.pow(this.gridZ-m,2);f<u&&(u=f,c=x,d=m)}}u!==1/0&&(t=c,e=d)}if(!this.path||this.path.length===0||i-this.lastPathTime>2e3){const c=this.terrain.findPath(this.gridX,this.gridZ,t,e);c&&c.length>1&&(this.path=c,this.pathIndex=1,this.lastPathTime=i)}if(this.path&&this.pathIndex<this.path.length){const c=this.path[this.pathIndex];s=c.x,a=c.z,this.pathIndex++,o=!0}}if(!o){const c=t-this.gridX,d=e-this.gridZ;Math.abs(c)>Math.abs(d)?s+=Math.sign(c):a+=Math.sign(d);const u=this.terrain.logicalWidth||80,p=this.terrain.logicalDepth||80;s<0&&(s=u-1),s>=u&&(s=0),a<0&&(a=p-1),a>=p&&(a=0)}const l=this.terrain.getTileHeight(s,a);let h=!1;if((l<=0||Math.abs(l-this.terrain.getTileHeight(this.gridX,this.gridZ))>2||this.terrain.grid[s][a].hasBuilding)&&(h=!0),h){this.path=null,this.handleMoveFailure(i);return}this.startMove(s,a,i)}moveRandomly(t){if(this.clanId&&Math.random()<.3){if(Math.random()<.2)console.log(`Goblin ${this.id} distracted from raid!`),this.tryBuildHut();else if(window.game&&window.game.goblinManager){const a=window.game.goblinManager.getClanRaidTarget(this.clanId);if(a){this.currentMemoryTarget=a;const o=a.x-this.gridX,l=a.z-this.gridZ;if(Math.abs(o)>0||Math.abs(l)>0){const h=this.gridX+Math.sign(o),c=this.gridZ+Math.sign(l),d=this.terrain.getTileHeight(h,c),u=this.terrain.getTileHeight(this.gridX,this.gridZ);if(d>0&&Math.abs(d-u)<=2){this.startMove(h,c,t);return}}}}}const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let a=n.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[n[a],n[o]]=[n[o],n[a]]}const s=this.terrain.getTileHeight(this.gridX,this.gridZ);for(const a of n){let o=this.gridX+a.x,l=this.gridZ+a.z;o<0&&(o=e-1),o>=e&&(o=0),l<0&&(l=i-1),l>=i&&(l=0);const h=this.terrain.getTileHeight(o,l);if(Math.abs(h-s)<=2&&h>0){this.startMove(o,l,t);return}}this.lastTime=t}handleMoveFailure(t){this.pathFailCount=(this.pathFailCount||0)+1,this.pathFailCount>3&&(console.log(`Goblin ${this.id} gave up target! Stuck/Coast.`),this.targetUnit=null,this.targetBuilding=null,this.currentMemoryTarget=null,this.path=null,this.pathFailCount=0,this.moveRandomly(t))}startMove(t,e,i){if(this.gridX===void 0||isNaN(this.gridX)){console.error(`Goblin ${this.id} startMove failed: Invalid gridX (${this.gridX})`),this.isMoving=!1;return}const n=this.terrain.getTileHeight(t,e),s=this.terrain.getTileHeight(this.gridX,this.gridZ);if(Math.abs(n-s)>2){this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>5&&(this.targetBuilding=null,this.stuckCount=0,this.moveRandomly(i));return}super.startMove(t,e,i);const a=Math.abs(n-s);n>8?this.moveDuration=6e3:a>.1?this.moveDuration=3e3:this.moveDuration=this.baseMoveDuration||800,this.stuckCount=0,this.pathFailCount=0}onMoveFinished(t){this.walkAnimTimer=0,this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0}onMoveStep(t){this.walkAnimTimer+=.1;const e=Math.sin(this.walkAnimTimer)*.5,i=Math.sin(this.walkAnimTimer)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-i,this.limbs.rightLeg.x=i}attackTarget(t,e){this.targetUnit?this.attackUnit(this.targetUnit):this.targetBuilding&&this.attackBuilding(this.targetBuilding)}attackTarget(t,e){this.targetUnit?this.attackUnit(this.targetUnit):this.targetBuilding&&this.attackBuilding(this.targetBuilding)}attackUnit(t){if(!(this.attackCooldown>0)){if(t.isDead){this.targetUnit=null;return}if(this.isRanged){if(this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},500),window.game&&window.game.spawnProjectile){const e=this.position.clone().add(new L(0,.8*this.scale,0)),i=t.position.clone().add(new L(0,.5,0));window.game.spawnProjectile(e,i,65535)}}else this.limbs.rightArm.x=-Math.PI/2;setTimeout(()=>{this.isRanged||(this.limbs.rightArm.x=0);const e=this.getDistance(t.gridX,t.gridZ);!t.isDead&&(this.isRanged||e<=2.5)&&(t.takeDamage(this.damage),console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${t.hp}`),t.isDead&&window.game&&window.game.goblinManager&&(window.goblinManager.increasePlunder(),window.game.goblinManager.recordRaidLocation(this.clanId,t.gridX,t.gridZ)))},200),this.attackCooldown=this.attackRate}}attackBuilding(t){if(this.attackCooldown>0)return;if(this.isRanged){if(this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},500),window.game&&window.game.spawnProjectile){const n=this.position.clone().add(new L(0,.8*this.scale,0)),s=this.terrain.gridToWorld(t.userData.gridX),a=this.terrain.gridToWorld(t.userData.gridZ),o=new L(s,t.y+1,a);window.game.spawnProjectile(n,o,65535)}}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.limbs.rightArm.x=0},200);t.userData.population===void 0&&(t.userData.population=10);const e=t.userData.type==="castle",i=t.userData.type==="farm";if(i&&t.userData.hp!==void 0)t.userData.hp-=1,console.log(`Goblin hit Farm! HP: ${t.userData.hp}`),t.userData.hp<=0&&this.destroyBuilding(t);else{const n=e?2:5;if(t.userData.population-=n,!i){const s=e?.5:.2,a=Math.floor(t.userData.population*s);a>0&&(this.takeDamage(a),console.log(`Goblin took ${a} retaliation damage from ${t.userData.type}!`))}}t.userData.population<1&&this.destroyBuilding(t),t.userData.population<1&&this.destroyBuilding(t)}destroyBuilding(t){t&&(this.terrain.removeBuilding(t),console.log(`Goblin ${this.id} destroyed ${t.userData.type}!`),window.game&&window.game.goblinManager&&window.game.goblinManager.increasePlunder(),this.targetBuilding=null)}takeDamage(t){if(!this.isDead){if(this.hp-=t,this.isMoving,this.attackCooldown>0){const e=this.attackCooldown/this.attackRate;e<.9&&e>.5&&(this.limbs.rightArm.x=-Math.PI/2+Math.sin(e*Math.PI*4)*.5)}this.hp<=0&&this.die()}}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.createCross())}dispose(){this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.material&&t.userData.clonedMat&&t.material.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}createCross(){const t=new ii,e=new se(Gt.assets.geometries.crossV,Gt.assets.materials.cross);e.position.y=.4,t.add(e);const i=new se(Gt.assets.geometries.crossH,Gt.assets.materials.cross);i.position.y=.6,t.add(i);const n=this.terrain.getVisualPosition(this.gridX,this.gridZ,!0);t.position.set(n.x,n.y+.2,n.z),this.scene.add(t),this.crossMesh=t,this.deathTimer=0,setTimeout(()=>{this.crossMesh&&(console.log(`[Goblin] Failsafe removing cross ID:${this.id}`),this.scene.remove(this.crossMesh),this.crossMesh.traverse(s=>{s.material&&s.userData.clonedMat&&s.material.dispose()}),this.crossMesh=null)},1500)}updateDeathAnimation(t){if(!this.crossMesh){this.isFinished=!0;return}isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=1;if(this.deathTimer>=i)console.log(`[Goblin] Death Animation Finished ID:${this.id}. Removing Cross.`),this.scene.remove(this.crossMesh),this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this),this.crossMesh.children.forEach(n=>{n.material&&n.userData.clonedMat&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material&&(s.userData.clonedMat||(s.material=s.material.clone(),s.userData.clonedMat=!0),s.material.opacity=1-n)})}}migrate(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.random()*Math.PI*2,s=20+Math.random()*20;let a=Math.floor(this.gridX+Math.cos(n)*s),o=Math.floor(this.gridZ+Math.sin(n)*s);a<0&&(a+=e),a>=e&&(a-=e),o<0&&(o+=i),o>=i&&(o-=i),this.terrain.getTileHeight(a,o)<=0&&(a=(a+5)%e),console.log(`Goblin ${this.id} migrating to ${a},${o} (Walking)`),this.state="migrating",this.migrationTarget={x:a,z:o},this.moveToTarget(a,o,t)}tryBuildHut(){const t=Math.round(this.gridX),e=Math.round(this.gridZ);if(!this.terrain.grid[t]||!this.terrain.grid[t][e]||this.terrain.grid[t][e].hasBuilding)return!1;const i=this.terrain.getTileHeight(t,e);if(i>8||i<=0)return!1;const n=this.terrain.buildings||[],s=6;for(const o of n)if(o.userData.type==="goblin_hut"){const l=o.userData.gridX-t,h=o.userData.gridZ-e;if(l*l+h*h<s*s)return!1}const a=this.terrain.addBuilding("goblin_hut",t,e);return a?(a.userData.clanId=this.clanId,console.log(`Goblin (Clan: ${this.clanId}) built a Hut!`),!0):!1}serialize(){return{id:this.id,type:this.type,gridX:this.gridX,gridZ:this.gridZ,hp:this.hp,maxHp:this.maxHp,clanId:this.clanId,age:this.age,lifespan:this.lifespan,state:this.state,migrationTarget:this.migrationTarget,scale:this.scale}}}class Om{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.MAX_INSTANCES=5e4,Gt.initAssets();const n=Gt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this._dummy=new xe,this._scratchVector=new L,this._scratchSphere=new ni(new L,2),this.initInstancedMeshes()}initInstancedMeshes(){const t=(i,n,s)=>{const a=new qe(i,n,s);return a.instanceMatrix.setUsage(Ze),a.frustumCulled=!1,a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a),a},e=Gt.assets;this.torsoMesh=t(e.geometries.torsoNormal,this.getWhiteMaterial(),this.MAX_INSTANCES),this.headMesh=t(e.geometries.head,this.getWhiteMaterial(),this.MAX_INSTANCES),this.earMesh=t(e.geometries.ear,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.armMesh=t(e.geometries.arm,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.legMesh=t(e.geometries.leg,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.clubMesh=t(e.geometries.club,e.materials.club,this.MAX_INSTANCES),this.staffMesh=t(e.geometries.staff,e.materials.staff,this.MAX_INSTANCES)}getWhiteMaterial(){return this.whiteMat||(this.whiteMat=new jt({color:16777215,clippingPlanes:this.clippingPlanes})),this.whiteMat}update(t,e){if(!t)return;let i=0,n=0,s=0,a=0,o=0,l=0;const h=performance.now();(!this.lastLog||h-this.lastLog>2e3)&&(console.log(`[GoblinRenderer] Updating ${t.length} goblins.`),this.lastLog=h);const c=this._dummy,d=this.terrain.logicalWidth||80,u=this.terrain.logicalDepth||80;e&&(Math.round(e.position.x/d),Math.round(e.position.z/u));const p=new ut(5614165),g=new ut(3368499),x=new ut(34952),m=new ut(8912896),f=new ut(9127187),T=new ut(2236962),M=new ut(3342438),E=new ut(16766720);for(const w of t){if(w.isDead||w.isFinished)continue;const b=w.type==="hobgoblin",A=w.type==="king",D=w.type==="shaman";let v=p,y=f;b?(v=g,y=T):D?(v=x,y=M):A&&(v=m,y=E);let C=w.scale||1;b&&C===1&&(C=1.2);let U;w.position&&w.isMoving?U={x:w.position.x,y:w.position.y,z:w.position.z}:U=this.terrain.getVisualPosition(w.gridX,w.gridZ,!0);const O=90,H=Math.floor((e.position.x-O-U.x)/d),W=Math.ceil((e.position.x+O-U.x)/d),q=Math.floor((e.position.z-O-U.z)/u),J=Math.ceil((e.position.z+O-U.z)/u),k=w.rotationY||0,et=w.limbs&&w.limbs.leftArm?w.limbs.leftArm.x:0,it=w.limbs&&w.limbs.rightArm?w.limbs.rightArm.x:0,yt=w.limbs&&w.limbs.leftLeg?w.limbs.leftLeg.x:0,Ht=w.limbs&&w.limbs.rightLeg?w.limbs.rightLeg.x:0;for(let Zt=H;Zt<=W;Zt++)for(let Yt=q;Yt<=J&&!(i>=this.MAX_INSTANCES);Yt++){const Jt=Zt*d,X=Yt*u,$=U.x+Jt,ht=U.z+X,Et=U.y;c.position.set($,Et+.3,ht),c.rotation.set(0,k,0);const Mt=b?1.4:1;if(c.scale.set(C*Mt,C,C),c.updateMatrix(),this.torsoMesh.setMatrixAt(i,c.matrix),this.torsoMesh.setColorAt(i,v),c.position.set($,Et+.55,ht),c.rotation.set(0,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.headMesh.setMatrixAt(i,c.matrix),this.headMesh.setColorAt(i,v),c.position.set(.12*C,.55,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L($,Et,ht)),c.rotation.set(0,k,-Math.PI/2),c.scale.set(C,C,C),c.updateMatrix(),this.earMesh.setMatrixAt(n++,c.matrix),this.earMesh.setColorAt(n-1,v),c.position.set(-.12*C,.55,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L($,Et,ht)),c.rotation.set(0,k,Math.PI/2),c.scale.set(C,C,C),c.updateMatrix(),this.earMesh.setMatrixAt(n++,c.matrix),this.earMesh.setColorAt(n-1,v),c.position.set(.18*C,.3,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L($,Et,ht)),c.rotation.set(et,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.armMesh.setMatrixAt(s++,c.matrix),this.armMesh.setColorAt(s-1,v),c.position.set(-.18*C,.3,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L($,Et,ht)),c.rotation.set(it,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.armMesh.setMatrixAt(s++,c.matrix),this.armMesh.setColorAt(s-1,v),D){const Nt=new L(0,0,.1);Nt.applyEuler(c.rotation);const _e=c.position.clone().add(Nt);c.position.copy(_e),c.rotation.set(it+Math.PI/2,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.staffMesh.setMatrixAt(l++,c.matrix)}else{const Nt=new L(0,-.15,.1);Nt.applyEuler(c.rotation);const _e=c.position.clone().add(Nt);c.position.copy(_e),c.rotation.set(it+Math.PI/2,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.clubMesh.setMatrixAt(o++,c.matrix)}c.position.set(.08*C,.12,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L($,Et,ht)),c.rotation.set(yt,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.legMesh.setMatrixAt(a++,c.matrix),this.legMesh.setColorAt(a-1,y),c.position.set(-.08*C,.12,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L($,Et,ht)),c.rotation.set(Ht,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.legMesh.setMatrixAt(a++,c.matrix),this.legMesh.setColorAt(a-1,y),i++}}this.torsoMesh.count=i,this.headMesh.count=i,this.earMesh.count=n,this.armMesh.count=s,this.legMesh.count=a,this.clubMesh.count=o,this.staffMesh.count=l,this.torsoMesh.instanceMatrix.needsUpdate=!0,this.torsoMesh.instanceColor.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.headMesh.instanceColor.needsUpdate=!0,this.earMesh.instanceMatrix.needsUpdate=!0,this.earMesh.instanceColor.needsUpdate=!0,this.armMesh.instanceMatrix.needsUpdate=!0,this.armMesh.instanceColor.needsUpdate=!0,this.legMesh.instanceMatrix.needsUpdate=!0,this.legMesh.instanceColor.needsUpdate=!0,this.clubMesh.instanceMatrix.needsUpdate=!0,this.staffMesh.instanceMatrix.needsUpdate=!0}}class zm{constructor(t,e,i){this.scene=t,this.terrain=e,this.particleManager=i,this.goblins=[],this.caves=[],this.hutSpawnTimers=new Map,this.renderer=new Om(t,e,e.clippingPlanes),this.spawnTimer=0,this.spawnInterval=2,this.plunderCount=0,this.MAX_GOBLINS=2e4,this.clanMemory={},Gt.initAssets();const n=Gt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.terrain.clippingPlanes)}),this.caveGroup=new ii,this.scene.add(this.caveGroup),this.generateCaves(),this.caves.length>0&&(console.log("GoblinManager: Force spawning Debug Goblin"),this.spawnGoblinAtCave(this.caves[0]))}reset(){console.log("Resetting GoblinManager...");for(const t of this.goblins)t.mesh&&this.scene.remove(t.mesh),t.dispose&&t.dispose();this.goblins=[],this.plunderCount=0,this.caves.forEach(t=>{t.mesh&&this.caveGroup.remove(t.mesh)}),this.caves=[]}scanForCaves(){this.terrain.buildings.forEach(t=>{t.userData.type==="cave"&&this.registerCave(t)})}registerCave(t){if(this.caves.some(i=>i.gridX===t.userData.gridX&&i.gridZ===t.userData.gridZ))return;const e={gridX:t.userData.gridX,gridZ:t.userData.gridZ,mesh:new ii,spawnCooldown:0,originalHeight:t.y,building:t,clanId:`clan_${t.userData.gridX}_${t.userData.gridZ} `};this.caves.push(e)}generateCaves(){console.log("GoblinManager: Generation started...");const t=5,e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=0,s=0;for(;n<t&&s<5e3;){s++;const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);this.isValidCaveSpot(a,o)&&this.createCave(a,o)&&n++}console.log(`GoblinManager: Generated ${n} goblin caves after ${s} attempts.`)}isValidCaveSpot(t,e){const i=this.terrain.getTileHeight(t,e);return!(i<=2||i>10)}createCaveTexture(){if(this.caveTexture)return this.caveTexture;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),i=e.createRadialGradient(64,64,10,64,64,60);return i.addColorStop(0,"#000000"),i.addColorStop(.6,"#1a1a1a"),i.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=i,e.fillRect(0,0,128,128),e.fillStyle="#FFFF00",e.beginPath(),e.arc(50,50,2,0,Math.PI*2),e.arc(78,50,2,0,Math.PI*2),e.fill(),this.caveTexture=new Re(t),this.caveTexture}createCave(t,e){const i=this.terrain.getTileHeight(t,e),n=new ss(.4,16,16),s=new jt({color:0,clippingPlanes:this.terrain.clippingPlanes||[]}),a=new se(n,s),o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;a.position.set(t-o/2+.5,i,e-l/2+.5),a.scale.set(1,.6,1),this.caveGroup.add(a);const h=this.terrain.addBuilding("cave",t,e);return h?(console.log(`GoblinManager: Cave registered at ${t},${e} `),h.userData.linkedMesh=a,this.caves.push({mesh:a,building:h,gridX:t,gridZ:e,originalHeight:i,spawnCooldown:Math.random()*this.spawnInterval,clanId:`clan_cave_${t}_${e} `}),!0):(console.warn(`GoblinManager: Failed to register cave at ${t},${e} (Terrain rejected)`),this.caveGroup.remove(a),!1)}update(t,e,i,n,s=1,a){this.caves.forEach((c,d)=>{d===0&&Math.random()<.01&&console.log(`[GoblinManager] Cave 0 Pos: ${c.mesh.position.x.toFixed(2)}, ${c.mesh.position.y.toFixed(2)}, ${c.mesh.position.z.toFixed(2)} Visible:${c.mesh.visible} Parent:${!!c.mesh.parent} `);const u=this.terrain.getTileHeight(c.gridX,c.gridZ);if(u<=0){console.error(`[GoblinManager] Cave destroyed: SUBMERGED(H = ${u})`),this.destroyCave(c,d);return}if(c.building){if(!this.terrain.buildings.includes(c.building)){console.error("[GoblinManager] Cave destroyed: BUILDING MISSING from Terrain!"),this.destroyCave(c,d);return}c.mesh.position.y!==c.building.y&&(c.mesh.position.y=c.building.y)}else c.mesh.position.y=u;Math.abs(u-c.originalHeight)>.1&&(c.originalHeight=u,c.mesh.position.y=u,c.mesh.updateMatrix()),c.spawnCooldown-=e,c.spawnCooldown<=0&&this.goblins.length<(this.MAX_GOBLINS||2e4)&&(this.spawnGoblinAtCave(c),c.spawnCooldown=this.spawnInterval+Math.random()*5)}),this.updateHuts(e);const o=this.terrain.buildings||[],l=Math.max(1,Math.floor(2/s));this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const h=this.frameCount%l;for(let c=this.goblins.length-1;c>=0;c--){const d=this.goblins[c];if(d.updateMovement&&d.updateMovement(t),d.updateVisuals&&d.updateVisuals(),c%l===h){try{d.isDead?d.updateDeathAnimation(e*l):d.updateLogic(t,e*l,n,o)}catch(u){console.error(`[GoblinManager] Error updating goblin ${c}: `,u);continue}d.isFinished&&this.goblins.splice(c,1)}}this.renderer&&this.renderer.update(this.goblins,a)}spawnGoblinAtCave(t){if(t.building&&!this.terrain.buildings.includes(t.building)){console.warn("[GoblinManager] Aborting spawn: Cave building missing"),this.destroyCave(t,this.caves.indexOf(t));return}const e=this.terrain.grid[t.gridX][t.gridZ];if(!e||!e.hasBuilding){console.warn("[GoblinManager] Aborting spawn: Grid cell has no building");return}const i=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];i.sort(()=>Math.random()-.5);for(const n of i){const s=t.gridX+n.x,a=t.gridZ+n.z;if(this.terrain.getTileHeight(s,a)>0){this.spawnGoblin(s,a,t.clanId);return}}this.spawnGoblin(t.gridX,t.gridZ,t.clanId)}spawnGoblin(t,e,i=null){const n=Math.random();let s="normal";n<.01?(s="king",console.log("👑 Goblin King Spawned!")):n<.055?s="shaman":n<.145&&(s="hobgoblin");const a=new Gt(this.scene,this.terrain,t,e,s,i);this.goblins.push(a),this.terrain.registerEntity&&this.terrain.registerEntity(a,t,e,"goblin")}increasePlunder(){this.plunderCount++,console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount} `)}updateHuts(t){let e=.15;e+=this.plunderCount*.03,e>2&&(e=2),(this.terrain.buildings||[]).forEach(n=>{if(n.userData&&n.userData.type==="goblin_hut"&&(n.userData.population=(n.userData.population||0)+e*t,n.userData.population>=10)){n.userData.population-=10;const s=n.userData.clanId||`clan_hut_${n.userData.gridX}_${n.userData.gridZ}`,a={gridX:n.userData.gridX,gridZ:n.userData.gridZ,clanId:s};this.spawnGoblinAtCave(a),console.log(`Goblin born from Hut! Clan: ${s}. Global Pop: ${this.goblins.length}`)}})}recordRaidLocation(t,e,i){if(!t)return;this.clanMemory[t]||(this.clanMemory[t]=[]);const n=this.clanMemory[t],s=n.find(a=>Math.abs(a.x-e)<5&&Math.abs(a.z-i)<5);s?(s.weight=Math.min(s.weight+1,10),s.timestamp=window.game?window.game.gameTotalTime:Date.now()):n.push({x:e,z:i,weight:1,timestamp:window.game?window.game.gameTotalTime:Date.now()}),n.sort((a,o)=>o.weight-a.weight),n.length>5&&(n.length=5)}getClanRaidTarget(t){if(!t||!this.clanMemory[t]||this.clanMemory[t].length===0)return null;const e=this.clanMemory[t],i=e.reduce((s,a)=>s+a.weight,0);let n=Math.random()*i;for(const s of e)if(n-=s.weight,n<=0)return s;return e[0]}destroyCave(t,e){console.error(`[GoblinManager] DESTROYING CAVE at ${t.gridX},${t.gridZ}!`),t.mesh&&(this.scene.remove(t.mesh),this.caveGroup.remove(t.mesh)),t.building&&this.terrain.buildings.includes(t.building)&&this.terrain.removeBuilding(t.building),this.caves.splice(e,1)}reportRaidFailure(t,e,i){if(!t||!this.clanMemory[t])return;const n=this.clanMemory[t],s=n.findIndex(a=>Math.abs(a.x-e)<5&&Math.abs(a.z-i)<5);s!==-1&&(n[s].weight-=2,console.log(`Clan ${t} raid failure at ${e},${i}. Weight: ${n[s].weight}`),n[s].weight<=0&&(n.splice(s,1),console.log(`Clan ${t} forgot raid location ${e},${i}`)))}serialize(){return{plunderCount:this.plunderCount,goblins:this.goblins.map(t=>typeof t.serialize=="function"?t.serialize():(console.warn(`Goblin ${t.id} missing serialize method! HMR issue?`),{id:t.id,type:t.type,gridX:t.gridX,gridZ:t.gridZ,hp:t.hp,maxHp:t.maxHp,clanId:t.clanId,age:t.age||0,lifespan:t.lifespan||100,state:t.state||"idle",migrationTarget:t.migrationTarget})),caves:this.caves.map(t=>({x:t.gridX,z:t.gridZ,spawnCooldown:t.spawnCooldown,clanId:t.clanId}))}}deserialize(t){try{if(!t){console.warn("GoblinManager: No data to deserialize");return}console.log("GoblinManager: Deserializing...",t),this.plunderCount=t.plunderCount||0,this.caves=[],t.caves&&t.caves.forEach(e=>{const i=this.terrain.getBuildingAt(e.x,e.z);i&&i.userData.type==="cave"&&this.caves.push({gridX:e.x,gridZ:e.z,mesh:new ii,spawnCooldown:e.spawnCooldown||0,originalHeight:i.y,building:i,clanId:e.clanId})}),t.goblins&&Array.isArray(t.goblins)?(t.goblins.forEach(e=>{const i=new Gt(this.scene,this.terrain,e.gridX,e.gridZ,e.type,e.clanId);i.id=e.id,i.hp=e.hp,i.maxHp=e.maxHp,i.age=e.age||0,i.lifespan=e.lifespan||100,i.state=e.state||"idle",i.migrationTarget=e.migrationTarget,e.scale&&(i.scale=e.scale),this.goblins.push(i),this.terrain.registerEntity&&this.terrain.registerEntity(i,e.gridX,e.gridZ,"goblin")}),console.log(`GoblinManager: Restored ${this.goblins.length} goblins.`)):console.warn("GoblinManager: No goblins list in save data.")}catch(e){console.error("GoblinManager Deserialize CRITICAL ERROR:",e),alert("Goblin Load Error: "+e.message)}}scanForCaves(){(this.terrain.buildings||[]).forEach(e=>{e.userData.type==="cave"&&this.registerCave(e)})}}class Le{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Le.assets.initialized)return;const t=new ss(.12,8,8);t.scale(.4,.6,1.5),Le.assets.geometries.body=t;const e=new ci(.1,.3,4);e.rotateX(-Math.PI/2),Le.assets.geometries.tail=e,Le.assets.materials.fish=new jt({color:4500223}),Le.assets.initialized=!0}constructor(t,e,i,n){Le.initAssets(),this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.isDead=!1,this.mesh=new ii;const s=new se(Le.assets.geometries.body,Le.assets.materials.fish);this.mesh.add(s);const a=new se(Le.assets.geometries.tail,Le.assets.materials.fish);a.position.z=-.3,this.mesh.add(a),this.scene.add(this.mesh),this.updatePosition(),this.moveTimer=0,this.moveInterval=500+Math.random()*1500,this.lastTime=performance.now(),this.isMoving=!1,this.targetGridX=i,this.targetGridZ=n,this.startGridX=i,this.startGridZ=n,this.moveStartTime=0,this.moveDuration=800,this.wiggleOffset=Math.random()*100,this.terrain.registerEntity(this,this.gridX,this.gridZ,"fish")}update(t,e,i=!0){if(this.isDead)return;if(this.terrain.getTileHeight(this.gridX,this.gridZ)>.5){this.die();return}if(this.isMoving){const s=(t-this.moveStartTime)/this.moveDuration;if(s>=1)this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition();else{const a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let l=this.startGridX,h=this.startGridZ,c=this.targetGridX,d=this.targetGridZ;c-l>a/2&&(l+=a),l-c>a/2&&(c+=a),d-h>o/2&&(h+=o),h-d>o/2&&(d+=o);const u=l+(c-l)*s,p=h+(d-h)*s,g=this.getPositionForGrid(u,p);if(this.mesh.position.copy(g),i){const x=Math.sin(t*.01+this.wiggleOffset)*.3;this.mesh.rotation.z=x}}}else if(t-this.lastTime>this.moveInterval&&(this.moveRandomly(t),this.lastTime=t),i){const s=Math.sin(t*.003+this.wiggleOffset)*.15;this.mesh.rotation.z=s}}updatePosition(){const t=this._spatial?this._spatial.x:this.gridX,e=this._spatial?this._spatial.z:this.gridZ;this.terrain.moveEntity(this,t,e,this.gridX,this.gridZ,"fish");const i=this.getPositionForGrid(this.gridX,this.gridZ);this.mesh.position.copy(i)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=-.2;return new L(t-i/2+.5,s,e-n/2+.5)}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let s=n.length-1;s>0;s--){const a=Math.floor(Math.random()*(s+1));[n[s],n[a]]=[n[a],n[s]]}for(const s of n){let a=this.gridX+s.x,o=this.gridZ+s.z;if(a<0&&(a=e-1),a>=e&&(a=0),o<0&&(o=i-1),o>=i&&(o=0),this.terrain.getTileHeight(a,o)<=.5){this.isMoving=!0,this.moveStartTime=t,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=a,this.targetGridZ=o;const h=Math.atan2(s.x,s.z);this.mesh.rotation.y=h;return}}Math.random()<.3&&(this.mesh.rotation.y+=(Math.random()-.5)*1)}die(){this.isDead=!0,this.terrain.unregisterEntity(this),this.scene.remove(this.mesh)}}class Gm{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.fishes=[],Le.initAssets(),Le.assets.materials.fish&&(Le.assets.materials.fish.clippingPlanes=this.clippingPlanes),this.init()}init(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;this.fishes=[];for(let i=0;i<75;i++)this.spawnRandomFish(t,e);console.log("Spawned initial fish.")}spawnRandomFish(t,e){if(this.fishes.length>=75)return;let i=0;for(;i<10;){const n=Math.floor(Math.random()*t),s=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,s)<=.5){const o=new Le(this.scene,this.terrain,n,s);this.fishes.push(o);return}i++}}update(t,e,i){for(let n=this.fishes.length-1;n>=0;n--){const s=this.fishes[n];if(i&&s.mesh){const a=new ni(s.mesh.position,1.5);i.intersectsSphere(a)?s.update(t,e,!0):s.update(t,e,!1)}else s.update(t,e,!0);s.isDead&&this.fishes.splice(n,1)}if(this.fishes.length<60){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;Math.random()<.05&&this.spawnRandomFish(n,s)}}}class km{constructor(t){this.game=t,this.terrain=t.terrain,this.canvas=document.getElementById("minimap"),this.ctx=this.canvas.getContext("2d"),this.logicalW=this.terrain.logicalWidth,this.logicalD=this.terrain.logicalDepth,this.isDragging=!1,this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this))}onMouseDown(t){t.preventDefault(),t.stopPropagation(),t.target===this.canvas&&(this.isDragging=!0,this.game.controls&&(this.game.controls.enabled=!1),this.updateCameraFromMiniMap(t))}onMouseMove(t){this.isDragging&&(t.preventDefault(),t.stopPropagation(),this.updateCameraFromMiniMap(t))}onMouseUp(t){this.isDragging=!1,this.game.controls&&(this.game.controls.enabled=!0)}updateCameraFromMiniMap(t){const e=this.canvas.getBoundingClientRect(),i=t.clientX-e.left,n=t.clientY-e.top,s=this.game.terrain.logicalWidth,a=this.game.terrain.logicalDepth,o=i/this.canvas.width,l=n/this.canvas.height,h=o*s,c=l*a,d=h-s/2,u=c-a/2,p=this.game.camera,g=this.game.controls;if(g){const x=g.target.y,m=p.position.x-g.target.x,f=p.position.z-g.target.z,T=p.position.y-g.target.y;g.target.set(d,x,u),p.position.set(d+m,g.target.y+T,u+f),g.update()}}update(){if(!this.ctx)return;this.ctx.fillStyle="#000",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.canvas.width/this.logicalW,e=this.canvas.height/this.logicalD;this.imgData||(this.imgData=this.ctx.createImageData(this.canvas.width,this.canvas.height));const i=this.imgData,n=i.data,s=this.terrain.grid;for(let x=0;x<this.logicalW;x++)for(let m=0;m<this.logicalD;m++){const f=s[x][m],T=f.height,M=this.game.terrain._lastIsNight||!1,E=this.game.terrain.currentSeason||"Spring",w=f.noise,b=f.moisture||.5,A=this.terrain.getBiomeColor(T,b,w,M,E,x,m,!0),D=(m*160+x)*4;n[D]=A.r*255,n[D+1]=A.g*255,n[D+2]=A.b*255,n[D+3]=255}this.ctx.putImageData(i,0,0),this.ctx.fillStyle="blue",this.game.units.forEach(x=>{if(x.isDead)return;const m=Math.floor(x.gridX*t),f=Math.floor(x.gridZ*e);this.ctx.fillRect(m,f,2,2)}),this.ctx.fillStyle="red",this.game.goblinManager.goblins.forEach(x=>{if(x.isDead)return;const m=Math.floor(x.gridX*t),f=Math.floor(x.gridZ*e);this.ctx.fillRect(m,f,2,2)});const a=this.game.camera.position.x,o=this.game.camera.position.z;let l=a,h=o,c=l+this.logicalW/2,d=h+this.logicalD/2;c=(c%this.logicalW+this.logicalW)%this.logicalW,d=(d%this.logicalD+this.logicalD)%this.logicalD;const u=c*t,p=d*e,g=30*t;this.ctx.strokeStyle="white",this.ctx.lineWidth=1,this.ctx.strokeRect(u-g,p-g,g*2,g*2);for(let x=-1;x<=1;x++)for(let m=-1;m<=1;m++){if(x===0&&m===0)continue;const f=u+x*this.canvas.width,T=p+m*this.canvas.height;this.ctx.strokeRect(f-g,T-g,g*2,g*2)}}}class Hm{constructor(t){this.game=t,this.camera=t.camera,this.wrapper=document.createElement("div"),this.wrapper.id="compass-wrapper",this.wrapper.style.position="absolute",this.wrapper.style.top="60px",this.wrapper.style.left="180px",this.wrapper.style.width="60px",this.wrapper.style.height="60px",this.wrapper.style.pointerEvents="none",this.wrapper.style.zIndex="1000",this.canvas=document.createElement("canvas"),this.canvas.width=60,this.canvas.height=60,this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),document.body.appendChild(this.wrapper)}update(){if(!this.game.controls)return;const e=-this.game.controls.getAzimuthalAngle(),i=this.ctx,n=this.canvas.width,s=this.canvas.height,a=n/2,o=s/2,l=n/2-5;i.clearRect(0,0,n,s),i.save(),i.translate(a,o),i.rotate(e),i.strokeStyle="#8B4513",i.lineWidth=4,i.beginPath(),i.arc(0,0,l,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(210, 180, 140, 0.3)",i.fill(),i.fillStyle="#800000",i.beginPath(),i.moveTo(0,-l+5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.strokeStyle="#3e2723",i.lineWidth=1,i.stroke(),i.fillStyle="#D2691E",i.beginPath(),i.moveTo(0,l-5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.stroke(),i.restore(),i.save(),i.translate(a,o),i.rotate(e),i.font="bold 16px serif",i.fillStyle="#F5DEB3",i.textAlign="center",i.textBaseline="middle",i.fillText("N",0,-l+12),i.restore()}}class Vm{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],pt.initAssets();const n=pt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),n.heads&&n.heads.forEach(s=>s.clippingPlanes=this.clippingPlanes),this.maxInstances=5e4,this.dummy=new xe,this.whiteMaterial=new jt({color:16777215,clippingPlanes:this.clippingPlanes}),this.skinMaterial=pt.assets.materials.skin,this.headMaterials=pt.assets.materials.heads,this.torsoMesh=new qe(pt.assets.geometries.body,this.whiteMaterial,this.maxInstances),this.torsoMesh.instanceMatrix.setUsage(Ze),this.torsoMesh.frustumCulled=!1,this.scene.add(this.torsoMesh),this.headMesh=new qe(pt.assets.geometries.head,pt.assets.materials.hair,this.maxInstances),this.headMesh.instanceMatrix.setUsage(Ze),this.headMesh.frustumCulled=!1,this.scene.add(this.headMesh),this.faceMesh=new qe(pt.assets.geometries.facePlane,pt.assets.materials.face,this.maxInstances),this.faceMesh.instanceMatrix.setUsage(Ze),this.faceMesh.frustumCulled=!1,this.scene.add(this.faceMesh),this.leftArmMesh=new qe(pt.assets.geometries.limb,this.skinMaterial,this.maxInstances),this.leftArmMesh.instanceMatrix.setUsage(Ze),this.leftArmMesh.frustumCulled=!1,this.scene.add(this.leftArmMesh),this.rightArmMesh=new qe(pt.assets.geometries.limb,this.skinMaterial,this.maxInstances),this.rightArmMesh.instanceMatrix.setUsage(Ze),this.rightArmMesh.frustumCulled=!1,this.scene.add(this.rightArmMesh),this.leftLegMesh=new qe(pt.assets.geometries.limb,this.whiteMaterial,this.maxInstances),this.leftLegMesh.instanceMatrix.setUsage(Ze),this.leftLegMesh.frustumCulled=!1,this.scene.add(this.leftLegMesh),this.rightLegMesh=new qe(pt.assets.geometries.limb,this.whiteMaterial,this.maxInstances),this.rightLegMesh.instanceMatrix.setUsage(Ze),this.rightLegMesh.frustumCulled=!1,this.scene.add(this.rightLegMesh),this.swordMesh=new qe(pt.assets.geometries.sword,pt.assets.materials.metal,this.maxInstances),this.swordMesh.instanceMatrix.setUsage(Ze),this.swordMesh.frustumCulled=!1,this.scene.add(this.swordMesh),this.staffMesh=new qe(pt.assets.geometries.staff,pt.assets.materials.wood,this.maxInstances),this.staffMesh.instanceMatrix.setUsage(Ze),this.staffMesh.frustumCulled=!1,this.scene.add(this.staffMesh),this.hatMesh=new qe(pt.assets.geometries.wizardHat,pt.assets.materials.wizardHat,this.maxInstances),this.hatMesh.instanceMatrix.setUsage(Ze),this.hatMesh.frustumCulled=!1,this.scene.add(this.hatMesh),this.hatBrimMesh=new qe(pt.assets.geometries.wizardHatBrim,pt.assets.materials.wizardHat,this.maxInstances),this.hatBrimMesh.instanceMatrix.setUsage(Ze),this.hatBrimMesh.frustumCulled=!1,this.scene.add(this.hatBrimMesh),this._scratchVector=new L,this._scratchSphere=new ni(new L,2),this._up=new L(0,1,0),this._neighborOffsets=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}]}update(t,e,i){if(!i)return;if(!pt.assets.initialized){console.error("UR: Assets Missing");return}let n=0,s=0,a=0,o=0;const l=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;i&&(Math.round(i.position.x/l),Math.round(i.position.z/h)),t.length>0&&Math.random()<.01;const c=new ut(6636321),d=new ut(13938487),u=new ut(139),p=new ut(11184810),g=new ut(4456584),x=new ut(16764074);for(const m of t){if(m.isDead||m.isSleeping||!m.position)continue;let f=c;m.role==="knight"?f=p:m.role==="wizard"?f=g:m.role==="fisher"?f=u:m.role==="hunter"?f=new ut(25600):m.role==="worker"&&(m.isSpecial?f=new ut(9109504):f=c);const T=90,M=Math.floor((i.position.x-T-m.position.x)/l),E=Math.ceil((i.position.x+T-m.position.x)/l),w=Math.floor((i.position.z-T-m.position.z)/h),b=Math.ceil((i.position.z+T-m.position.z)/h);for(let A=M;A<=E;A++)for(let D=w;D<=b&&!(n>=this.maxInstances);D++){const v=A,y=D,C=m.position.x+v*l,U=m.position.z+y*h,O=m.position.y,H=m.rotationY;if(this.dummy.position.set(C,O,U),this.dummy.rotation.set(0,H,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.torsoMesh.setMatrixAt(n,this.dummy.matrix),this.torsoMesh.setColorAt(n,f),this.dummy.position.set(C,O,U),this.dummy.rotation.set(0,H,0),this.dummy.scale.set(1,1,1),m.role==="wizard"&&(this.dummy.scale.set(1,.5,1),this.dummy.position.y+=.2375),this.dummy.updateMatrix(),this.headMesh.setMatrixAt(n,this.dummy.matrix),this.faceMesh.setMatrixAt(n,this.dummy.matrix),m.role==="knight"?this.headMesh.setColorAt(n,f):this.headMesh.setColorAt(n,d),this.faceMesh.setColorAt(n,new ut(16777215)),this.dummy.position.set(.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,O,U)),this.dummy.rotation.set(m.limbs.leftArm.x,H,0),this.dummy.updateMatrix(),this.leftArmMesh.setMatrixAt(n,this.dummy.matrix),this.leftArmMesh.setColorAt(n,x),this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,O,U)),this.dummy.rotation.set(m.limbs.rightArm.x,H,0),this.dummy.updateMatrix(),this.rightArmMesh.setMatrixAt(n,this.dummy.matrix),this.rightArmMesh.setColorAt(n,x),this.dummy.position.set(.08,.25,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,O,U)),this.dummy.rotation.set(m.limbs.leftLeg.x,H,0),this.dummy.updateMatrix(),this.leftLegMesh.setMatrixAt(n,this.dummy.matrix),this.leftLegMesh.setColorAt(n,f),this.dummy.position.set(-.08,.25,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,O,U)),this.dummy.rotation.set(m.limbs.rightLeg.x,H,0),this.dummy.updateMatrix(),this.rightLegMesh.setMatrixAt(n,this.dummy.matrix),this.rightLegMesh.setColorAt(n,f),m.role==="knight"&&(this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,O,U)),this.dummy.rotation.set(m.limbs.rightArm.x+Math.PI/2,H,0),this.dummy.rotation.set(m.limbs.rightArm.x,H,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.swordMesh.setMatrixAt(s,this.dummy.matrix),s++),m.role==="wizard"){this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,O,U)),this.dummy.rotation.set(m.limbs.rightArm.x,H,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.staffMesh.setMatrixAt(a,this.dummy.matrix),this.staffMesh.setColorAt(a,pt.assets.materials.wood.color),a++;const W=m.role==="wizard"?.625:.75;this.dummy.position.set(C,O+W,U),this.dummy.rotation.set(0,H,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.hatMesh.setMatrixAt(o,this.dummy.matrix),this.hatBrimMesh.setMatrixAt(o,this.dummy.matrix),o++}n++}}this.torsoMesh.count=n,this.headMesh.count=n,this.faceMesh.count=n,this.leftArmMesh.count=n,this.rightArmMesh.count=n,this.leftLegMesh.count=n,this.rightLegMesh.count=n,this.swordMesh.count=s,this.staffMesh.count=a,this.hatMesh.count=o,this.hatBrimMesh.count=o,this.torsoMesh.frustumCulled=!1,this.headMesh.frustumCulled=!1,this.faceMesh.frustumCulled=!1,this.leftArmMesh.frustumCulled=!1,this.rightArmMesh.frustumCulled=!1,this.leftLegMesh.frustumCulled=!1,this.rightLegMesh.frustumCulled=!1,this.torsoMesh.instanceColor&&(this.torsoMesh.instanceColor.needsUpdate=!0),this.headMesh.instanceColor&&(this.headMesh.instanceColor.needsUpdate=!0),this.faceMesh.instanceColor&&(this.faceMesh.instanceColor.needsUpdate=!0),this.leftLegMesh.instanceColor&&(this.leftLegMesh.instanceColor.needsUpdate=!0),this.rightLegMesh.instanceColor&&(this.rightLegMesh.instanceColor.needsUpdate=!0),this.leftArmMesh.instanceColor&&(this.leftArmMesh.instanceColor.needsUpdate=!0),this.rightArmMesh.instanceColor&&(this.rightArmMesh.instanceColor.needsUpdate=!0),this.staffMesh.instanceColor&&(this.staffMesh.instanceColor.needsUpdate=!0),this.torsoMesh.instanceMatrix.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.faceMesh.instanceMatrix.needsUpdate=!0,this.leftArmMesh.instanceMatrix.needsUpdate=!0,this.rightArmMesh.instanceMatrix.needsUpdate=!0,this.leftLegMesh.instanceMatrix.needsUpdate=!0,this.rightLegMesh.instanceMatrix.needsUpdate=!0,this.swordMesh.instanceMatrix.needsUpdate=!0,this.staffMesh.instanceMatrix.needsUpdate=!0,this.hatMesh.instanceMatrix.needsUpdate=!0,this.hatBrimMesh.instanceMatrix.needsUpdate=!0}}class Wm{constructor(t,e,i){this.scene=t,this.terrain=e,this.terrainWidth=e.logicalWidth,this.terrainDepth=e.logicalDepth,this.clippingPlanes=i||[],this.MAX_INSTANCES=1e4,this.meshes={},this.initAssets(),this.initInstancedMeshes(),this._scratchVector=new L,this._scratchSphere=new ni(new L,2),this._dummy=new xe}initAssets(){this.assets={};const t={clippingPlanes:this.clippingPlanes,clipShadows:!0};this.assets.houseWallGeo=new le(1.6,.8,1.6),this.assets.houseWallGeo.translate(0,.4,0);const e=document.createElement("canvas");e.width=128,e.height=64;const i=e.getContext("2d"),n=document.createElement("canvas");n.width=128,n.height=64;const s=n.getContext("2d");i.fillStyle="#654321",i.fillRect(0,0,128,64),s.fillStyle="#000000",s.fillRect(0,0,128,64),i.fillStyle="#5A3A1A";for(let v=0;v<64;v+=16)for(let y=0;y<128;y+=16)(y+v)/16%2===0&&i.fillRect(y+1,v+1,14,14);const a=(v,y)=>{i.fillStyle="#111",i.fillRect(v-6,y-8,12,16),s.fillStyle="#FFFFFF",s.fillRect(v-4,y-6,8,12)};a(32,32),a(96,32),this.assets.houseWallMat=new jt({...t,map:new Re(e),emissiveMap:new Re(n),emissive:0,emissiveIntensity:0});const o=document.createElement("canvas");o.width=64,o.height=64;const l=o.getContext("2d");l.fillStyle="#800000",l.fillRect(0,0,64,64),l.fillStyle="#600000";for(let v=0;v<64;v+=8)l.fillRect(0,v,64,2);l.fillStyle="#A00000";for(let v=0;v<64;v+=8)for(let y=v%16===0?0:4;y<64;y+=8)l.fillRect(y,v,2,8);this.assets.houseRoofMat=new jt({...t,map:new Re(o),color:16777215}),this.assets.houseRoofGeo=new ci(1.2,.8,4),this.assets.houseRoofGeo.translate(0,1.2,0),this.assets.houseRoofGeo.rotateY(Math.PI/4);const h=new Ci(1.4,1.4,4.5,16);h.translate(0,2.25,0);const c=new Ci(1.6,1.6,.4,16);c.translate(0,4.5,0),this.assets.towerGeo=h,this.assets.towerRimGeo=c,console.log("Tower Geometry Initialized (Split Mode)");const d=document.createElement("canvas");d.width=128,d.height=256;const u=d.getContext("2d"),p=document.createElement("canvas");p.width=128,p.height=256;const g=p.getContext("2d");u.fillStyle="#505050",u.fillRect(0,0,128,256),g.fillStyle="#000000",g.fillRect(0,0,128,256),u.fillStyle="#404040";for(let v=0;v<256;v+=16){const y=v/16%2===0?0:8;for(let C=0;C<128;C+=16)u.fillRect((C+y)%128+1,v+1,14,14)}const x=(v,y,C,U)=>{u.fillStyle="#101010",u.fillRect(v,y,C,U),g.fillStyle="#FFFFEE",g.fillRect(v+1,y+1,C-2,U-2)};x(20,80,6,18),x(80,80,6,18),x(50,180,6,18),x(110,180,6,18),this.assets.towerMat=new jt({...t,map:new Re(d),emissiveMap:new Re(p),color:15658734,emissive:0,emissiveIntensity:0}),this.assets.towerCapMat=new jt({...t,color:5263440,map:null,emissive:0}),console.log("Tower Debug: Generated High-Res Tower Texture + Cap Material"),this.assets.farmGeo=new Vi(1.8,1.8),this.assets.farmGeo.rotateX(-Math.PI/2),this.assets.farmGeo.translate(0,.05,0);const m=document.createElement("canvas");m.width=64,m.height=64;const f=m.getContext("2d");f.fillStyle="#DAA520",f.fillRect(0,0,64,64),f.fillStyle="#B8860B";for(let v=0;v<10;v++)f.fillRect(v*6,0,2,64);this.assets.farmMat=new jt({...t,map:new Re(m),side:Ye}),this.assets.barracksGeo=new le(2.4,1.2,2.4),this.assets.barracksGeo.translate(0,.6,0);const T=document.createElement("canvas");T.width=128,T.height=64;const M=T.getContext("2d"),E=document.createElement("canvas");E.width=128,E.height=64;const w=E.getContext("2d");M.fillStyle="#654321",M.fillRect(0,0,128,64),w.fillStyle="#000000",w.fillRect(0,0,128,64),M.fillStyle="#5A3A1A";for(let v=0;v<64;v+=16)for(let y=0;y<128;y+=16)(y+v)/16%2===0&&M.fillRect(y+1,v+1,14,14);const b=(v,y)=>{M.fillStyle="#111",M.fillRect(v-6,y-8,12,16),w.fillStyle="#FFFFEE",w.fillRect(v-4,y-6,8,12)};b(22,32),b(64,32),b(106,32),this.assets.barracksRoofGeo=new ci(2,1.2,8),this.assets.barracksRoofGeo.translate(0,1.8,0),this.assets.barracksMat=new jt({...t,map:new Re(T),emissiveMap:new Re(E),emissive:0,emissiveIntensity:0}),this.assets.barracksRoofMat=new jt({...t,map:new Re(o),color:16777215}),this.assets.goblinHutGeo=new ci(.4,.6,6),this.assets.goblinHutGeo.translate(0,.3,0);const A=document.createElement("canvas");A.width=64,A.height=64;const D=A.getContext("2d");D.fillStyle="#654321",D.fillRect(0,0,64,64),D.fillStyle="#8B4513";for(let v=0;v<30;v++)D.fillRect(Math.random()*60,Math.random()*60,4,2);this.assets.goblinHutMat=new jt({...t,map:new Re(A),color:11184810}),[this.assets.houseWallMat,this.assets.barracksMat,this.assets.towerMat].forEach(v=>{v&&(v.clippingPlanes=this.clippingPlanes,v.needsUpdate=!0)})}initInstancedMeshes(){const t=(i,n)=>{const s=new qe(i,n,this.MAX_INSTANCES);return s.instanceMatrix.setUsage(Ze),s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1,this.scene.add(s),s};this.meshes.houseWalls=t(this.assets.houseWallGeo,this.assets.houseWallMat),this.meshes.houseRoofs=t(this.assets.houseRoofGeo,this.assets.houseRoofMat),this.meshes.farms=t(this.assets.farmGeo,this.assets.farmMat),this.meshes.goblinHuts=t(this.assets.goblinHutGeo,this.assets.goblinHutMat);const e=[this.assets.towerMat,this.assets.towerCapMat,this.assets.towerCapMat];this.meshes.towers=t(this.assets.towerGeo,e),this.meshes.towerRims=t(this.assets.towerRimGeo,e),this.meshes.barracksWalls=t(this.assets.barracksGeo,this.assets.barracksMat),this.meshes.barracksRoofs=t(this.assets.barracksRoofGeo,this.assets.barracksRoofMat)}update(t,e,i){if(!t)return;const n=this.terrainWidth||80,s=this.terrainDepth||80;let a=0,o=0;if(i&&(a=Math.round(i.position.x/n),o=Math.round(i.position.z/s)),this._lastBaseGridX===a&&this._lastBaseGridZ===o&&this._lastBuildingCount===t.length&&!this.forceUpdate)return;this._lastBaseGridX=a,this._lastBaseGridZ=o,this._lastBuildingCount=t.length,this.forceUpdate=!1;let l=0,h=0,c=0,d=0,u=0;const p=this._dummy,g=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}],x=new ut(16777215),m=new ut(16777215),f=new ut(11184810);for(const T of t){const M=T.gridX,E=T.gridZ,w=this.terrain.getVisualPosition(M,E,!0),b=w.y||0;for(const A of g){const D=(A.x+a)*n,v=(A.z+o)*s,y=w.x+D,C=w.z+v;let U=y,O=C;T.type==="farm"||T.type==="house"?(U+=.5,O+=.5):(T.type==="barracks"||T.type==="tower")&&(U+=1,O+=1),T.type,p.position.set(U,b,O),p.scale.set(1,1,1),p.rotation.set(0,T.rotation||0,0),p.updateMatrix(),T.type==="house"&&l<this.MAX_INSTANCES?(this.meshes.houseWalls.setMatrixAt(l,p.matrix),this.meshes.houseRoofs.setMatrixAt(l,p.matrix),this.meshes.houseRoofs.setColorAt(l,x),l++):T.type==="farm"&&h<this.MAX_INSTANCES?(this.meshes.farms.setMatrixAt(h,p.matrix),h++):T.type==="barracks"&&d<this.MAX_INSTANCES?(this.meshes.barracksWalls.setMatrixAt(d,p.matrix),this.meshes.barracksRoofs.setMatrixAt(d,p.matrix),this.meshes.barracksRoofs.setColorAt(d,m),d++):T.type==="goblin_hut"&&c<this.MAX_INSTANCES?(this.meshes.goblinHuts.setMatrixAt(c,p.matrix),this.meshes.goblinHuts.setColorAt(c,f),this.meshes.goblinHuts.setColorAt(c,f),c++):T.type==="tower"&&u<this.MAX_INSTANCES&&(this.meshes.towers.setMatrixAt(u,p.matrix),this.meshes.towerRims.setMatrixAt(u,p.matrix),u++)}}Math.random()<.005&&console.log(`[BuildingRenderer] Updated Buffers. House:${l}, Farm:${h} (BaseGrid: ${a},${o})`),this.meshes.houseWalls.count=l,this.meshes.houseRoofs.count=l,this.meshes.farms.count=h,this.meshes.goblinHuts.count=c,this.meshes.barracksWalls.count=d,this.meshes.barracksRoofs.count=d,this.meshes.towers.count=u,this.meshes.towerRims.count=u,this.meshes.houseWalls.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceColor&&(this.meshes.houseRoofs.instanceColor.needsUpdate=!0),this.meshes.farms.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceColor&&(this.meshes.goblinHuts.instanceColor.needsUpdate=!0),this.meshes.barracksWalls.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceColor&&(this.meshes.barracksRoofs.instanceColor.needsUpdate=!0),this.meshes.towers.instanceMatrix.needsUpdate=!0,this.meshes.towerRims.instanceMatrix.needsUpdate=!0}updateLighting(t){if(this._lastIsNight===t)return;this._lastIsNight=t;const e=t?1:0,i=t?16747520:0;this.assets.houseWallMat&&(this.assets.houseWallMat.emissive.setHex(i),this.assets.houseWallMat.emissiveIntensity=e,this.assets.houseWallMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0),this.assets.towerMat&&(this.assets.towerMat.emissive.setHex(i),this.assets.towerMat.emissiveIntensity=e,this.assets.towerMat.needsUpdate=!0),this.assets.castleKeepMat&&(this.assets.castleKeepMat.emissive.setHex(i),this.assets.castleKeepMat.emissiveIntensity=e,this.assets.castleKeepMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0)}}class hl{constructor(){this.raids=[]}reportRaid(t,e,i){const n=this.raids.find(s=>{const a=s.x-t,o=s.z-e;return a*a+o*o<100});if(n){n.time=i;return}this.raids.push({x:t,z:e,time:i,threat:10}),this.raids.length>20&&this.raids.shift()}reportVictory(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>100})}reportClear(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>25})}getPriorities(t){return this.raids.filter(e=>t-e.time<3e5)}}class Xm{constructor(){console.log("Game constructor called"),this.saveManager=new Fm,this.soundManager=new Bm,this.mana=100,this.battleMemory={raids:[],victories:[],reportRaid:(c,d)=>{this.battleMemory.raids.push({x:c,z:d,time:this.gameTotalTime,threat:10}),this.battleMemory.raids.length>20&&this.battleMemory.raids.shift()},reportVictory:(c,d)=>{this.battleMemory.victories.push({x:c,z:d,time:this.gameTotalTime}),this.battleMemory.raids=this.battleMemory.raids.filter(u=>{const p=u.x-c,g=u.z-d;return p*p+g*g>100})},getPriorities:()=>{const c=this.gameTotalTime;return this.battleMemory.raids.filter(d=>c-d.time<3e5)}},window.game=this,this.scene=new hc,this.scene.background=new ut(8900331);const t=window.innerWidth/window.innerHeight,e=50;this.camera=new Ha(-e*t,e*t,e,-e,1,1e3),this.camera.position.set(20,20,20),this.camera.lookAt(this.scene.position),this.renderer=new mm({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.localClippingEnabled=!1,document.body.appendChild(this.renderer.domElement),this.controls=new Mm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.screenSpacePanning=!1,this.controls.minZoom=.8,this.controls.maxZoom=4,this.controls.maxPolarAngle=Math.PI/2,this.clippingPlanes=[new Qe(new L(1,0,0),0),new Qe(new L(-1,0,0),0),new Qe(new L(0,0,1),0),new Qe(new L(0,0,-1),0)],this.renderer.clippingPlanes=[],this.renderer.localClippingEnabled=!0,this.setupLights(),this.requestQueue=[],this.requestQueue=[],this.requestIdCounter=0,this.projectiles=[],this.terrain=new gm(this.scene,this.clippingPlanes),this.units=[],this.resources={grain:0,fish:0,meat:0},this.cloudManager=new Nm(this.scene,this.terrain.width,this.terrain.depth),this.birdManager=new Ae(this.scene,this.terrain.width,this.terrain.depth,this.clippingPlanes),this.sheepManager=new Te(this.scene,this.terrain,this.clippingPlanes),this.goblinManager=new zm(this.scene,this.terrain,this,this.clippingPlanes),this.fishManager=new Gm(this.scene,this.terrain,this.clippingPlanes),this.minimap=new km(this),this.compass=new Hm(this),this.unitRenderer=new Vm(this.scene,this.terrain,this.clippingPlanes),this.buildingRenderer=new Wm(this.scene,this.terrain,this.clippingPlanes),this.inputManager=new xm(this.scene,this.camera,this.terrain,this.spawnUnit.bind(this),this.units,this.unitRenderer,this),this.initMarkerMaterial();let i=10,n=10,s=!1,a=0;const o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;for(;!s&&a<1e3;){const c=Math.floor(Math.random()*o),d=Math.floor(Math.random()*l);this.terrain.getTileHeight(c,d)>1&&(i=c,n=d,s=!0),a++}if(this.spawnUnit(i,n,!0),s){const c=i-o/2,d=n-l/2;this.controls&&(this.controls.target.set(c,0,d),this.camera.position.set(c+20,20,d+20),this.controls.update())}this.statsDisplay=document.getElementById("stats-container"),window.addEventListener("resize",this.onWindowResize.bind(this)),this.lastTime=performance.now(),this.gameTime=8,this.gameTotalTime=0,this.raidPoints=[],this.timeScale=1,this.resources={grain:10,fish:10,meat:10};const h=()=>{this.soundManager.initialized||(this.soundManager.init(this.camera),window.removeEventListener("click",h),window.removeEventListener("touchstart",h),window.removeEventListener("touchend",h),window.removeEventListener("keydown",h))};window.addEventListener("click",h),window.addEventListener("touchstart",h),window.addEventListener("touchend",h),window.addEventListener("keydown",h),window.toggleDebugSpeed=()=>{const c=document.getElementById("debug-speed-btn");this.timeScale===1?(this.timeScale=10,console.log("Debug Speed: 10x"),c&&c.classList.add("active")):(this.timeScale=1,console.log("Debug Speed: 1x"),c&&c.classList.remove("active"))},window.addEventListener("keydown",c=>{if(c.key==="p"||c.key==="P"){const d=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex=((this.currentSeasonIndex||0)+1)%4;const u=d[this.currentSeasonIndex];console.log(`[DEBUG] Force Cycle Season: ${u}`),this.season=u,this.daysPassed=(this.daysPassed||0)+1,this.terrain&&this.terrain.setSeason(u);const p=document.getElementById("season-val");p&&(p.textContent=u)}}),this.timeScale=1,this.animate()}setupLights(){this.ambientLight=new Tc(4210752),this.scene.add(this.ambientLight),this.directionalLight=new Sc(16777215,1),this.directionalLight.position.set(10,20,10),this.scene.add(this.directionalLight)}spawnUnit(t,e,i=!1,n=null){let s="citizen",a=!1,o=null;if(i===!0)a=!0,s="worker";else if(typeof i=="string")s=i;else if(n){if(o=n,n.type==="barracks")s="knight";else if(n.type==="tower")s="wizard";else{const h=Math.random();h<.2?s="hunter":h<.4?s="fisher":s="worker"}(s==="knight"||s==="wizard")&&!n.userData.memory&&(n.userData.memory=new hl),console.log(`Spawned ${s} linked to ${n.type} at ${n.userData.gridX},${n.userData.gridZ}`)}else s=(Math.random()>.5,"worker");const l=new pt(this.scene,this.terrain,t,e,s,a);return l.game=this,l.homeBase=o,this.units.push(l),l}handleBuildingSpawn(t,e,i,n){return this.spawnUnit(t,e,null,n),!0}recordRaidPoint(t,e){this.raidPoints.some(n=>Math.abs(n.x-t)<10&&Math.abs(n.z-e)<10)||this.raidPoints.push({x:t,z:e,time:this.gameTime})}canAction(){return this.mana>=0}consumeMana(t){this.mana-=t}onWindowResize(){const t=window.innerWidth/window.innerHeight,e=20;this.camera.left=-e*t,this.camera.right=e*t,this.camera.top=e,this.camera.bottom=-e,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}updateEnvironment(t){this.gameTime+=t*(this.dayNightSpeed||.05),this.gameTime>=24&&(this.gameTime=0);let e=!1;return this.gameTime>=18||this.gameTime<6?(e=!0,this.scene.background.setHex(51),this.directionalLight.intensity=.2):(this.scene.background.setHex(8900331),this.directionalLight.intensity=1),e}updateSeasons(t){const i=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex===void 0&&(this.currentSeasonIndex=0);const n=this.gameTime/24;if(this.prevTimeOfDay===void 0&&(this.prevTimeOfDay=n),n<this.prevTimeOfDay&&(this.daysPassed=(this.daysPassed||0)+1,console.log(`New Day! Day ${this.daysPassed}. Season: ${i[this.currentSeasonIndex]}`),this.daysPassed%3===0)){this.currentSeasonIndex=(this.currentSeasonIndex+1)%4;const a=i[this.currentSeasonIndex];console.log(`Season Changed to: ${a}`),this.terrain&&this.terrain.setSeason(a)}this.prevTimeOfDay=n;const s=i[this.currentSeasonIndex];this.season!==s&&(console.log(`[DEBUG] Game.updateSeasons: Syncing season mismatch. Game:${this.season} -> ${s}`),this.season=s,this.terrain&&this.terrain.setSeason(this.season))}initMarkerMaterial(){const t=`
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,e=`
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;

            // Simple Pseudo-Random Noise
            float random (vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
                // Scroll UVs vertically
                vec2 st = vUv;
                // ULTRA FINE SETTINGS (Adjusted for Visibility)
                float time = uTime * 8.0; 
                
                // Grid: 60x40 (Fine but visible)
                vec2 grid = vec2(st.x * 60.0, st.y * 40.0 - time);
                vec2 ipos = floor(grid);
                vec2 fpos = fract(grid);

                // Random brightness
                float noise = random(ipos);
                
                // Very Sparse (95% empty) -> Visible Dust
                float sparkle = step(0.95, noise);
                
                // Sharp tiny dots
                float dist = length(fpos - 0.5);
                float glow = 1.0 - smoothstep(0.0, 0.4, dist); // Tighter glow
                
                // Fade out at top and bottom
                float alpha = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
                
                // Core Pillar Glow (Vertical Beam)
                float beam = (1.0 - abs(vUv.x - 0.5) * 2.0);
                beam = smoothstep(0.4, 0.8, beam) * 0.3; // Subtle core
                
                // Combine
                float finalAlpha = (sparkle * glow) + beam;
                finalAlpha *= alpha;

                gl_FragColor = vec4(uColor, finalAlpha);
            }
        `;this.markerMaterial=new _i({uniforms:{uTime:{value:0},uColor:{value:new ut(16776960)}},vertexShader:t,fragmentShader:e,transparent:!0,blending:Nr,depthWrite:!1,side:Ye})}addRequest(t,e,i,n=null,s=null,a=null){const o=`req_${this.requestIdCounter++}`,l={id:o,type:t,x:e,z:i,status:"pending",assignedTo:null,mesh:null,createdAt:Date.now()},h=new Ci(.5,.5,5,16,1,!0),c=this.markerMaterial.clone();c.uniforms.uColor.value.setHex(16776960);const d=new se(h,c);d.renderOrder=2e3;const u=s!==null?s:e,p=a!==null?a:i;let g=this.terrain.getTileHeight(e,i);return(g===void 0||isNaN(g))&&(g=10),d.position.set(u,g+2,p),this.scene.add(d),l.mesh=d,this.requestQueue.push(l),console.log(`[Game] Request Added: ${t} at (${e},${i}) ID:${o}`),this.forceAssignRequest(l),l}findBestRequest(t){if(!t)return null;let e=null,i=1/0;const n=this.terrain.logicalWidth||160,s=this.terrain.logicalDepth||160;for(const a of this.requestQueue){if(a.status!=="pending")continue;let o=Math.abs(a.x-t.gridX),l=Math.abs(a.z-t.gridZ);o>n/2&&(o=n-o),l>s/2&&(l=s-l);const h=o*o+l*l;h<i&&(i=h,e=a)}return e}forceAssignRequest(t){!t||t.status!=="pending"||setTimeout(()=>{try{if(!this.units||!t||t.status!=="pending")return;let e=null,i=1/0;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=0,o=0,l=0,h=0;for(const c of this.units){if(c.role!=="worker"){l++;continue}a++;let d=0;c.targetRequest?(o++,d=1e6):c.action==="Working"?d=1e6:h++;let u=Math.abs(c.gridX-t.x),p=Math.abs(c.gridZ-t.z);u>n/2&&(u=n-u),p>s/2&&(p=s-p);const x=u*u+p*p+d;x<i&&(i=x,e=c)}if(e)e.targetRequest&&(console.log(`[Game] INTERRUPTING Unit ${e.id} (Job: ${e.targetRequest.id}) for Priority Request ${t.id}`),this.releaseRequest(e,e.targetRequest),e.targetRequest=null,e.action="Idle"),this.claimRequest(e,t)&&(e.targetRequest=t,e.action="Approaching Job",console.log(`[Game] Force-Assigned Request ${t.id} to Unit ${e.id} (Score: ${i.toFixed(1)})`));else{let c=Math.abs(unit.gridX-t.x),d=Math.abs(unit.gridZ-t.z);c>n/2&&(c=n-c),d>s/2&&(d=s-d);const u=c*c+d*d;u<i&&(i=u,e=unit)}e?this.claimRequest(e,t)&&(e.targetRequest=t,e.action="Approaching Job",console.log(`[Game] Force-Assigned (Reassigned) Request ${t.id} to Unit ${e.id} (Dist: ${Math.sqrt(i).toFixed(1)})`)):console.warn(`[Game] Force Assign FAILED for ${t.id}. Scanned:${this.units.length} (Workers:${a} Busy:${o} Valid:${h})`)}catch(e){console.error("[Game] Force Assignment Error:",e)}},10)}claimRequest(t,e){return!e||e.status!=="pending"||t.role!=="worker"?!1:(e.status="assigned",e.assignedTo=t.id,t.targetGoblin=null,t.targetBuilding=null,t.action="Idle",!0)}releaseRequest(t,e){e&&e.assignedTo===t.id&&(e.status="pending",e.assignedTo=null,console.log(`[Game] Request ${e.id} released by Unit ${t.id}. Searching for replacement...`),this.forceAssignRequest(e))}updateRequestMarkers(){if(!this.scene||!this.camera)return;const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80,i=this.camera.position.x,n=this.camera.position.z;for(const s of this.requestQueue)if(s.mesh){const a=s.x-t/2,o=s.z-e/2,l=a+Math.round((i-a)/t)*t,h=o+Math.round((n-o)/e)*e;let c=this.terrain.getTileHeight(s.x,s.z);(c===void 0||isNaN(c))&&(c=10),s.mesh.position.set(l,c+2.5,h)}}tryCancelRequest(t,e){let n=-1,s=9;for(let a=0;a<this.requestQueue.length;a++){const o=this.requestQueue[a];if(o.status!=="pending"&&o.status!=="assigned")continue;const l=o.x-t,h=o.z-e,c=l*l+h*h;c<s&&(s=c,n=a)}if(n!==-1){const a=this.requestQueue[n];return a.mesh&&(this.scene.remove(a.mesh),a.mesh.geometry&&a.mesh.geometry.dispose(),a.mesh.material&&a.mesh.material.dispose()),this.requestQueue.splice(n,1),console.log(`[Game] Request Canceled at ${a.x},${a.z} (Target: ${t},${e})`),this.consumeMana(-10),!0}return!1}checkExpiredRequests(t){for(let i=this.requestQueue.length-1;i>=0;i--){const n=this.requestQueue[i];if(n.status==="assigned"){const s=n.assignedTo;if(s!==null){const a=this.units.find(l=>l.id===s);let o=!1;if(a?(a.isDead||a.targetRequest!==n)&&(o=!0):o=!0,o){console.warn(`[Game] Detected ZOMBIE Request ${n.id} (Assigned to ${s}). Resetting.`),n.status="pending",n.assignedTo=null,this.forceAssignRequest(n);continue}}}if(n.status==="pending"&&(n.lastAttempt||(n.lastAttempt=n.createdAt),t-n.lastAttempt>1e3)){const s=t-n.createdAt;s>3e4&&s%5e3<1e3&&console.warn(`[Game] Request ${n.id} pending for ${(s/1e3).toFixed(1)}s. Retrying Force Assign...`),this.forceAssignRequest(n),n.lastAttempt=t}n.status==="pending"&&t-n.createdAt>3e5&&(console.log(`[Game] Request Timed Out: ${n.type} ID:${n.id}`),n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&n.mesh.material.dispose()),this.requestQueue.splice(i,1))}}clearProjectiles(){if(this.projectiles){console.log(`Clearing ${this.projectiles.length} projectiles...`);for(const t of this.projectiles)t.mesh&&(this.scene.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),t.mesh.material&&t.mesh.material!==this.markerMaterial&&t.mesh.material.dispose());this.projectiles=[]}}spawnProjectile(t,e,i=16729088){this.projectileGeo||(this.projectileGeo=new ss(.3,16,16));const n=this.markerMaterial.clone();n.uniforms.uColor.value.setHex(i);const s=new se(this.projectileGeo,n);s.position.copy(t);const a=this.terrain&&this.terrain.logicalWidth?this.terrain.logicalWidth:80,o=this.terrain&&this.terrain.logicalDepth?this.terrain.logicalDepth:80,l=e.x-t.x,h=e.z-t.z,c=e.clone();Math.abs(l)>a/2&&(l>0?c.x-=a:c.x+=a),Math.abs(h)>o/2&&(h>0?c.z-=o:c.z+=o),this.scene.add(s),this.projectiles.push({mesh:s,target:c,speed:15,uTime:0})}updateProjectiles(t){for(let e=this.projectiles.length-1;e>=0;e--){const i=this.projectiles[e];i.uTime+=t,i.mesh.material.uniforms&&(i.mesh.material.uniforms.uTime.value=i.uTime);const n=new L().subVectors(i.target,i.mesh.position),s=n.length();if(s<.5)this.scene.remove(i.mesh),i.mesh.material&&i.mesh.material.dispose(),this.projectiles.splice(e,1);else{n.normalize();const a=i.speed*t;a>=s?i.mesh.position.copy(i.target):i.mesh.position.add(n.multiplyScalar(a))}}}completeRequest(t,e){if(!e)return;if(console.log(`[Game] Completing Request ${e.type} at ${e.x},${e.z} `),e.mesh){e.mesh.material.uniforms&&e.mesh.material.uniforms.uColor.value.setHex(65280);const n=e.mesh,s=this.scene;setTimeout(()=>{n&&(n.visible=!1,s&&s.remove(n),n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose())},1e3),e.mesh=null}e.type==="raise"?this.terrain.raise(e.x,e.z):e.type==="lower"?this.terrain.lower(e.x,e.z):e.type==="build_tower"?this.terrain.addBuilding("tower",e.x,e.z):e.type==="build_barracks"&&this.terrain.addBuilding("barracks",e.x,e.z);const i=this.requestQueue.indexOf(e);i!==-1&&this.requestQueue.splice(i,1)}updateCameraControls(){this.controls&&this.controls.update();const t=this.camera.position.x,e=this.camera.position.z,i=30;this.clippingPlanes&&(this.clippingPlanes[0].constant=-(t-i),this.clippingPlanes[1].constant=t+i,this.clippingPlanes[2].constant=-(e-i),this.clippingPlanes[3].constant=e+i)}updateStats(){if(!this.statsDisplay)return;const t=this.terrain.totalHousingPop||0;this.totalPopulation=Math.floor(t)+this.units.length*10;const e=Math.floor(this.gameTime),i=Math.floor(this.gameTime%1*60),n=`${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")} `,a=this.gameTime>=18||this.gameTime<6?"🌙":"☀️";document.getElementById("time-val").innerText=`${n} ${a} `;const o=document.getElementById("day-val");o&&(o.innerText=`Day ${this.daysPassed||1} `),document.getElementById("season-val").innerText=this.season||"Spring",document.getElementById("pop-val").innerText=Math.floor(this.totalPopulation||0);const l=this.units.filter(p=>p.role==="knight").length,h=this.units.filter(p=>p.role==="wizard").length;document.getElementById("active-val").innerText=this.units.length;const c=document.getElementById("knight-val");c&&(c.innerText=l);const d=document.getElementById("wizard-val");d&&(d.innerText=h),document.getElementById("house-val").innerText=this.terrain.buildings.filter(p=>p.userData.type==="house").length,document.getElementById("castle-val").innerText=this.terrain.buildings.filter(p=>p.userData.type==="barracks").length,document.getElementById("grain-val").innerText=Math.floor(this.resources.grain),document.getElementById("fish-val").innerText=Math.floor(this.resources.fish),document.getElementById("meat-val").innerText=Math.floor(this.resources.meat);const u=document.getElementById("mana-val");u&&(u.innerText=Math.floor(this.mana),u.style.color=this.mana<0?"#ff4444":"white")}animate(){requestAnimationFrame(this.animate.bind(this));const t=performance.now();let e=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t,e*=this.timeScale||1,this.gameTotalTime+=e*1e3;const i=this.gameTotalTime,n=i/1e3;(!this.lastHeartbeat||t-this.lastHeartbeat>5e3)&&(this.lastHeartbeat=t);let s=!1;try{s=this.updateEnvironment(e),this.updateSeasons(e),this.terrain&&this.terrain.update(e,this.handleBuildingSpawn.bind(this),s)}catch(u){console.error("Env/Season Error:",u)}this.checkExpiredRequests(Date.now()),this.updateRequestMarkers();try{this.updateCameraControls()}catch(u){console.error("Cam Error:",u)}try{this.updateStats()}catch(u){console.error("Stats Error:",u)}const o=(this.totalPopulation||0)*.1*e;this.mana+=o;try{this.inputManager.update(e)}catch(u){console.error("Input Error:",u)}try{this.cloudManager.update(e,this.camera)}catch(u){console.error("Cloud Error:",u)}this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();const l=new ns,h=new Kt;h.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),l.setFromProjectionMatrix(h);try{this.birdManager.update(e,n,l)}catch(u){console.error("Bird Error:",u)}try{this.sheepManager.update(n,e)}catch(u){console.error("Sheep Error:",u)}try{this.goblinManager.update(i,e,s,this.units,this.timeScale,this.camera)}catch(u){console.error("Goblin Manager Error:",u)}try{this.fishManager.update(i,e,l)}catch(u){console.error("Fish Error:",u)}if(this.minimap)try{this.minimap.update()}catch(u){console.error("Minimap Error:",u)}if(this.compass)try{this.compass.update()}catch(u){console.error("Compass Error:",u)}this.inputManager&&this.inputManager.update(),this.updateRequestMarkers(),this.markerTime===void 0&&(this.markerTime=0),this.markerTime+=e;for(const u of this.requestQueue)u.mesh&&u.mesh.material.uniforms&&(u.mesh.material.uniforms.uTime.value=this.markerTime);this.updateProjectiles(e),this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const c=Math.max(1,Math.floor(4/this.timeScale)),d=this.frameCount%c;for(let u=this.units.length-1;u>=0;u--){const p=this.units[u];if(u===0&&this.frameCount%60===0&&console.log(`[Game Loop] Updating Units.Count: ${this.units.length}, Unit[0] ID: ${p.id} `),p.updateMovement&&p.updateMovement(i),u%c===d){p.id===0&&this.frameCount%60===0&&(console.log(`[Game Loop] Calling updateLogic for ID: 0. Dead: ${p.isDead} `),console.log(`[Game Loop] Func Start: ${p.updateLogic.toString().substring(0,100)} `),console.log(`[Game Loop Debug]Unit[0] State: Moving = ${p.isMoving}, Action = ${p.action}, Interval = ${p.moveInterval}, LastTime = ${p.lastTime}, T = ${i.toFixed(0)} `));try{p.updateLogic(i,e*c,s,this.goblinManager.goblins)}catch(g){console.error("Unit Logic Error:",g,p)}p.isDead&&p.isFinished&&this.units.splice(u,1)}}try{this.terrain.update(e,this.handleBuildingSpawn.bind(this),s)}catch(u){console.error("Terrain Update Error:",u)}if(this.terrain.updateMeshPosition(this.camera),this.terrain.updateLights(this.gameTime),this.buildingRenderer&&this.buildingRenderer.updateLighting(s),this.unitRenderer)try{this.unitRenderer.update(this.units,l,this.camera)}catch(u){console.error("UnitRenderer Error:",u)}if(this.buildingRenderer)try{this.buildingRenderer.update(this.terrain.buildings,l,this.camera)}catch(u){console.error("BuildingRenderer Error:",u)}this.renderer.render(this.scene,this.camera)}saveGame(t){if(!this.saveManager)return!1;const e={slotId:t,timestamp:Date.now(),resources:this.resources,gameTime:this.gameTime,gameTotalTime:this.gameTotalTime,currentSeasonIndex:this.currentSeasonIndex,daysPassed:this.daysPassed,terrain:this.terrain.serialize(),units:this.units.filter(i=>!i.isDead).map(i=>i.serialize()),goblinManager:this.goblinManager?this.goblinManager.serialize():null,camera:{position:{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z},zoom:this.camera.zoom,target:{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}}};return console.log("Saving Game Data:",e),e.terrain||console.error("Save Error: Terrain data is missing!"),this.saveManager.save(t,e)}loadGame(t){if(!this.saveManager)return!1;const e=this.saveManager.load(t);if(!e)return console.error("Load Game Failed: No data for slot",t),!1;console.log("Load Game: Data found",e),this.goblinManager&&this.goblinManager.reset(),this.clearProjectiles(),this.resources=e.resources||{grain:0,fish:0,meat:0},this.gameTime=e.gameTime||8,this.gameTotalTime=e.gameTotalTime||0,this.currentSeasonIndex=e.currentSeasonIndex||0,this.daysPassed=e.daysPassed||0;const i=["Spring","Summer","Autumn","Winter"];this.season=i[this.currentSeasonIndex],this.terrain&&this.terrain.setSeason(this.season);try{console.log("Deserializing Terrain with:",e.terrain),this.terrain.deserialize(e.terrain)}catch(n){return console.error("Terrain deserialize failed:",n),!1}this.goblinManager&&(e.goblinManager?this.goblinManager.deserialize(e.goblinManager):(console.warn("[Game.js] No goblinManager data found in save slot!"),this.goblinManager.scanForCaves()));try{this.units.forEach(n=>{n.dispose?n.dispose():n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose())}),this.units=[]}catch(n){console.error("Unit cleanup failed:",n)}try{(e.units||[]).forEach(s=>{try{const a=pt.deserialize(s,this.scene,this.terrain);if(a.game=this,this.units.push(a),a.role==="knight"||a.role==="wizard"){let o=null;if(a.savedHomeBaseX!==void 0&&a.savedHomeBaseZ!==void 0&&(o=this.terrain.buildings.find(l=>Math.abs(l.gridX-a.savedHomeBaseX)<.1&&Math.abs(l.gridZ-a.savedHomeBaseZ)<.1)),!o){const l=a.role==="knight"?"barracks":"tower";let h=1/0;this.terrain.buildings.forEach(c=>{if(c.userData.type===l){const d=Math.abs(c.gridX-a.gridX)+Math.abs(c.gridZ-a.gridZ);d<h&&(h=d,o=c)}})}o&&(a.homeBase=o,o.userData.memory||(o.userData.memory=new hl))}}catch(a){console.error("Failed to deserialize unit:",a,s)}})}catch(n){console.error("Unit restoration loop failed:",n)}return this.inputManager.units=this.units,e.camera&&(e.camera.position&&this.camera.position.set(e.camera.position.x,e.camera.position.y,e.camera.position.z),e.camera.zoom&&(this.camera.zoom=e.camera.zoom),e.camera.target&&this.controls.target.set(e.camera.target.x,e.camera.target.y,e.camera.target.z),this.camera.updateProjectionMatrix(),this.controls.update()),console.log("Game loaded from slot",t),!0}}new Xm;
