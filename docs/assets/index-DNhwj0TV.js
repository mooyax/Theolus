(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const Aa="181",Rn={ROTATE:0,DOLLY:1,PAN:2},An={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Xl=0,Ya=1,Zl=2,ol=1,ql=2,Ei=3,Hi=0,ze=1,Ye=2,Ai=0,tn=1,Ur=2,ja=3,Ka=4,$l=5,Ji=100,Yl=101,jl=102,Kl=103,Jl=104,Ql=200,th=201,eh=202,ih=203,Fr=204,Nr=205,nh=206,sh=207,rh=208,ah=209,oh=210,lh=211,hh=212,ch=213,dh=214,Br=0,Or=1,zr=2,Dn=3,Gr=4,kr=5,Hr=6,Vr=7,Ra=0,uh=1,fh=2,Gi=0,ph=1,mh=2,gh=3,xh=4,_h=5,Mh=6,vh=7,ll=300,Pn=301,In=302,Wr=303,Xr=304,Ys=306,Zr=1e3,wi=1001,qr=1002,je=1003,bh=1004,os=1005,ei=1006,er=1007,Oi=1008,xi=1009,hl=1010,cl=1011,jn=1012,Ca=1013,en=1014,mi=1015,Fn=1016,Da=1017,Pa=1018,Kn=1020,dl=35902,ul=35899,fl=1021,pl=1022,li=1023,Jn=1026,Qn=1027,Ia=1028,La=1029,Ua=1030,Fa=1031,Na=1033,Ns=33776,Bs=33777,Os=33778,zs=33779,$r=35840,Yr=35841,jr=35842,Kr=35843,Jr=36196,Qr=37492,ta=37496,ea=37808,ia=37809,na=37810,sa=37811,ra=37812,aa=37813,oa=37814,la=37815,ha=37816,ca=37817,da=37818,ua=37819,fa=37820,pa=37821,ma=36492,ga=36494,xa=36495,_a=36283,Ma=36284,va=36285,ba=36286,yh=3200,Sh=3201,Ba=0,Th=1,Bi="",$e="srgb",Ln="srgb-linear",Hs="linear",te="srgb",ln=7680,Ja=519,Eh=512,wh=513,Ah=514,ml=515,Rh=516,Ch=517,Dh=518,Ph=519,ya=35044,Ze=35048,Qa="300 es",gi=2e3,Vs=2001;function gl(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ws(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ih(){const r=Ws("canvas");return r.style.display="block",r}const to={};function Xs(...r){const t="THREE."+r.shift();console.log(t,...r)}function Lt(...r){const t="THREE."+r.shift();console.warn(t,...r)}function fe(...r){const t="THREE."+r.shift();console.error(t,...r)}function ts(...r){const t=r.join(" ");t in to||(to[t]=!0,Lt(...r))}function Lh(r,t,e){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}class rn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,a=n.length;s<a;s++)n[s].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gs=Math.PI/180,Sa=180/Math.PI;function ki(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ee[r&255]+Ee[r>>8&255]+Ee[r>>16&255]+Ee[r>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[i&255]+Ee[i>>8&255]+Ee[i>>16&255]+Ee[i>>24&255]).toLowerCase()}function Ht(r,t,e){return Math.max(t,Math.min(e,r))}function Uh(r,t){return(r%t+t)%t}function ir(r,t,e){return(1-e)*r+e*t}function pi(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ee(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Fh={DEG2RAD:Gs};class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*n+t.x,this.y=s*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nn{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,a,o){let h=i[n+0],l=i[n+1],c=i[n+2],d=i[n+3],u=s[a+0],m=s[a+1],g=s[a+2],x=s[a+3];if(o<=0){t[e+0]=h,t[e+1]=l,t[e+2]=c,t[e+3]=d;return}if(o>=1){t[e+0]=u,t[e+1]=m,t[e+2]=g,t[e+3]=x;return}if(d!==x||h!==u||l!==m||c!==g){let f=h*u+l*m+c*g+d*x;f<0&&(u=-u,m=-m,g=-g,x=-x,f=-f);let p=1-o;if(f<.9995){const S=Math.acos(f),b=Math.sin(S);p=Math.sin(p*S)/b,o=Math.sin(o*S)/b,h=h*p+u*o,l=l*p+m*o,c=c*p+g*o,d=d*p+x*o}else{h=h*p+u*o,l=l*p+m*o,c=c*p+g*o,d=d*p+x*o;const S=1/Math.sqrt(h*h+l*l+c*c+d*d);h*=S,l*=S,c*=S,d*=S}}t[e]=h,t[e+1]=l,t[e+2]=c,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,s,a){const o=i[n],h=i[n+1],l=i[n+2],c=i[n+3],d=s[a],u=s[a+1],m=s[a+2],g=s[a+3];return t[e]=o*g+c*d+h*m-l*u,t[e+1]=h*g+c*u+l*d-o*m,t[e+2]=l*g+c*m+o*u-h*d,t[e+3]=c*g-o*d-h*u-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,a=t._order,o=Math.cos,h=Math.sin,l=o(i/2),c=o(n/2),d=o(s/2),u=h(i/2),m=h(n/2),g=h(s/2);switch(a){case"XYZ":this._x=u*c*d+l*m*g,this._y=l*m*d-u*c*g,this._z=l*c*g+u*m*d,this._w=l*c*d-u*m*g;break;case"YXZ":this._x=u*c*d+l*m*g,this._y=l*m*d-u*c*g,this._z=l*c*g-u*m*d,this._w=l*c*d+u*m*g;break;case"ZXY":this._x=u*c*d-l*m*g,this._y=l*m*d+u*c*g,this._z=l*c*g+u*m*d,this._w=l*c*d-u*m*g;break;case"ZYX":this._x=u*c*d-l*m*g,this._y=l*m*d+u*c*g,this._z=l*c*g-u*m*d,this._w=l*c*d+u*m*g;break;case"YZX":this._x=u*c*d+l*m*g,this._y=l*m*d+u*c*g,this._z=l*c*g-u*m*d,this._w=l*c*d-u*m*g;break;case"XZY":this._x=u*c*d-l*m*g,this._y=l*m*d-u*c*g,this._z=l*c*g+u*m*d,this._w=l*c*d+u*m*g;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],a=e[1],o=e[5],h=e[9],l=e[2],c=e[6],d=e[10],u=i+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(c-h)*m,this._y=(s-l)*m,this._z=(a-n)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(c-h)/m,this._x=.25*m,this._y=(n+a)/m,this._z=(s+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(s-l)/m,this._x=(n+a)/m,this._y=.25*m,this._z=(h+c)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(a-n)/m,this._x=(s+l)/m,this._y=(h+c)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,a=t._w,o=e._x,h=e._y,l=e._z,c=e._w;return this._x=i*c+a*o+n*l-s*h,this._y=n*c+a*h+s*o-i*l,this._z=s*c+a*l+i*h-n*o,this._w=a*c-i*o-n*h-s*l,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,n=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,s=-s,a=-a,o=-o);let h=1-e;if(o<.9995){const l=Math.acos(o),c=Math.sin(l);h=Math.sin(h*l)/c,e=Math.sin(e*l)/c,this._x=this._x*h+i*e,this._y=this._y*h+n*e,this._z=this._z*h+s*e,this._w=this._w*h+a*e,this._onChangeCallback()}else this._x=this._x*h+i*e,this._y=this._y*h+n*e,this._z=this._z*h+s*e,this._w=this._w*h+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,i=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(eo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(eo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,a=t.y,o=t.z,h=t.w,l=2*(a*n-o*i),c=2*(o*e-s*n),d=2*(s*i-a*e);return this.x=e+h*l+a*d-o*c,this.y=i+h*c+o*l-s*d,this.z=n+h*d+s*c-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,a=e.x,o=e.y,h=e.z;return this.x=n*h-s*o,this.y=s*a-i*h,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return nr.copy(this).projectOnVector(t),this.sub(nr)}reflect(t){return this.sub(nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nr=new I,eo=new nn;class Ot{constructor(t,e,i,n,s,a,o,h,l){Ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,h,l)}set(t,e,i,n,s,a,o,h,l){const c=this.elements;return c[0]=t,c[1]=n,c[2]=o,c[3]=e,c[4]=s,c[5]=h,c[6]=i,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[3],h=i[6],l=i[1],c=i[4],d=i[7],u=i[2],m=i[5],g=i[8],x=n[0],f=n[3],p=n[6],S=n[1],b=n[4],E=n[7],R=n[2],y=n[5],A=n[8];return s[0]=a*x+o*S+h*R,s[3]=a*f+o*b+h*y,s[6]=a*p+o*E+h*A,s[1]=l*x+c*S+d*R,s[4]=l*f+c*b+d*y,s[7]=l*p+c*E+d*A,s[2]=u*x+m*S+g*R,s[5]=u*f+m*b+g*y,s[8]=u*p+m*E+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8];return e*a*c-e*o*l-i*s*c+i*o*h+n*s*l-n*a*h}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],d=c*a-o*l,u=o*h-c*s,m=l*s-a*h,g=e*d+i*u+n*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(n*l-c*i)*x,t[2]=(o*i-n*a)*x,t[3]=u*x,t[4]=(c*e-n*h)*x,t[5]=(n*s-o*e)*x,t[6]=m*x,t[7]=(i*h-l*e)*x,t[8]=(a*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,a,o){const h=Math.cos(s),l=Math.sin(s);return this.set(i*h,i*l,-i*(h*a+l*o)+a+t,-n*l,n*h,-n*(-l*a+h*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(sr.makeScale(t,e)),this}rotate(t){return this.premultiply(sr.makeRotation(-t)),this}translate(t,e){return this.premultiply(sr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const sr=new Ot,io=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),no=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Nh(){const r={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(n,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===te&&(n.r=Ri(n.r),n.g=Ri(n.g),n.b=Ri(n.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===te&&(n.r=Cn(n.r),n.g=Cn(n.g),n.b=Cn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Bi?Hs:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,a){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return ts("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return ts("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[Ln]:{primaries:t,whitePoint:i,transfer:Hs,toXYZ:io,fromXYZ:no,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:$e},outputColorSpaceConfig:{drawingBufferColorSpace:$e}},[$e]:{primaries:t,whitePoint:i,transfer:te,toXYZ:io,fromXYZ:no,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:$e}}}),r}const $t=Nh();function Ri(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Cn(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hn;class Bh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{hn===void 0&&(hn=Ws("canvas")),hn.width=t.width,hn.height=t.height;const n=hn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=hn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ws("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let a=0;a<s.length;a++)s[a]=Ri(s[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ri(e[i]/255)*255):e[i]=Ri(e[i]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Oh=0;class Oa{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?s.push(rr(n[a].image)):s.push(rr(n[a]))}else s=rr(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function rr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Bh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let zh=0;const ar=new I;class Re extends rn{constructor(t=Re.DEFAULT_IMAGE,e=Re.DEFAULT_MAPPING,i=wi,n=wi,s=ei,a=Oi,o=li,h=xi,l=Re.DEFAULT_ANISOTROPY,c=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=ki(),this.name="",this.source=new Oa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ar).x}get height(){return this.source.getSize(ar).y}get depth(){return this.source.getSize(ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ll)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zr:t.x=t.x-Math.floor(t.x);break;case wi:t.x=t.x<0?0:1;break;case qr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zr:t.y=t.y-Math.floor(t.y);break;case wi:t.y=t.y<0?0:1;break;case qr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Re.DEFAULT_IMAGE=null;Re.DEFAULT_MAPPING=ll;Re.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,n=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const h=t.elements,l=h[0],c=h[4],d=h[8],u=h[1],m=h[5],g=h[9],x=h[2],f=h[6],p=h[10];if(Math.abs(c-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-f)<.01){if(Math.abs(c+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,E=(m+1)/2,R=(p+1)/2,y=(c+u)/4,A=(d+x)/4,U=(g+f)/4;return b>E&&b>R?b<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(b),n=y/i,s=A/i):E>R?E<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(E),i=y/n,s=U/n):R<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(R),i=A/s,n=U/s),this.set(i,n,s,e),this}let S=Math.sqrt((f-g)*(f-g)+(d-x)*(d-x)+(u-c)*(u-c));return Math.abs(S)<.001&&(S=1),this.x=(f-g)/S,this.y=(d-x)/S,this.z=(u-c)/S,this.w=Math.acos((l+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gh extends rn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new Re(n);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ei,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Oa(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Gh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class xl extends Re{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=je,this.minFilter=je,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class kh extends Re{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=je,this.minFilter=je,this.wrapR=wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class an{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(si.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(si.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=si.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,si):si.fromBufferAttribute(s,a),si.applyMatrix4(t.matrixWorld),this.expandByPoint(si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ls.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(t.matrixWorld),this.union(ls)}const n=t.children;for(let s=0,a=n.length;s<a;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,si),si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(On),hs.subVectors(this.max,On),cn.subVectors(t.a,On),dn.subVectors(t.b,On),un.subVectors(t.c,On),Pi.subVectors(dn,cn),Ii.subVectors(un,dn),Zi.subVectors(cn,un);let e=[0,-Pi.z,Pi.y,0,-Ii.z,Ii.y,0,-Zi.z,Zi.y,Pi.z,0,-Pi.x,Ii.z,0,-Ii.x,Zi.z,0,-Zi.x,-Pi.y,Pi.x,0,-Ii.y,Ii.x,0,-Zi.y,Zi.x,0];return!or(e,cn,dn,un,hs)||(e=[1,0,0,0,1,0,0,0,1],!or(e,cn,dn,un,hs))?!1:(cs.crossVectors(Pi,Ii),e=[cs.x,cs.y,cs.z],or(e,cn,dn,un,hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Mi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Mi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Mi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Mi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Mi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Mi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Mi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Mi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Mi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Mi=[new I,new I,new I,new I,new I,new I,new I,new I],si=new I,ls=new an,cn=new I,dn=new I,un=new I,Pi=new I,Ii=new I,Zi=new I,On=new I,hs=new I,cs=new I,qi=new I;function or(r,t,e,i,n){for(let s=0,a=r.length-3;s<=a;s+=3){qi.fromArray(r,s);const o=n.x*Math.abs(qi.x)+n.y*Math.abs(qi.y)+n.z*Math.abs(qi.z),h=t.dot(qi),l=e.dot(qi),c=i.dot(qi);if(Math.max(-Math.max(h,l,c),Math.min(h,l,c))>o)return!1}return!0}const Hh=new an,zn=new I,lr=new I;class ii{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Hh.setFromPoints(t).getCenter(i);let n=0;for(let s=0,a=t.length;s<a;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zn.subVectors(t,this.center);const e=zn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(zn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zn.copy(t.center).add(lr)),this.expandByPoint(zn.copy(t.center).sub(lr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const vi=new I,hr=new I,ds=new I,Li=new I,cr=new I,us=new I,dr=new I;class is{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=vi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,e),vi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){hr.copy(t).add(e).multiplyScalar(.5),ds.copy(e).sub(t).normalize(),Li.copy(this.origin).sub(hr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ds),o=Li.dot(this.direction),h=-Li.dot(ds),l=Li.lengthSq(),c=Math.abs(1-a*a);let d,u,m,g;if(c>0)if(d=a*h-o,u=a*o-h,g=s*c,d>=0)if(u>=-g)if(u<=g){const x=1/c;d*=x,u*=x,m=d*(d+a*u+2*o)+u*(a*d+u+2*h)+l}else u=s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*h)+l;else u=-s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*h)+l;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-h),s),m=-d*d+u*(u+2*h)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-h),s),m=u*(u+2*h)+l):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-h),s),m=-d*d+u*(u+2*h)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),m=-d*d+u*(u+2*h)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(hr).addScaledVector(ds,u),m}intersectSphere(t,e){vi.subVectors(t.center,this.origin);const i=vi.dot(this.direction),n=vi.dot(vi)-i*i,s=t.radius*t.radius;if(n>s)return null;const a=Math.sqrt(s-n),o=i-a,h=i+a;return h<0?null:o<0?this.at(h,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,a,o,h;const l=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,n=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,n=(t.min.x-u.x)*l),c>=0?(s=(t.min.y-u.y)*c,a=(t.max.y-u.y)*c):(s=(t.max.y-u.y)*c,a=(t.min.y-u.y)*c),i>a||s>n||((s>i||isNaN(i))&&(i=s),(a<n||isNaN(n))&&(n=a),d>=0?(o=(t.min.z-u.z)*d,h=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,h=(t.min.z-u.z)*d),i>h||o>n)||((o>i||i!==i)&&(i=o),(h<n||n!==n)&&(n=h),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,e,i,n,s){cr.subVectors(e,t),us.subVectors(i,t),dr.crossVectors(cr,us);let a=this.direction.dot(dr),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Li.subVectors(this.origin,t);const h=o*this.direction.dot(us.crossVectors(Li,us));if(h<0)return null;const l=o*this.direction.dot(cr.cross(Li));if(l<0||h+l>a)return null;const c=-o*Li.dot(dr);return c<0?null:this.at(c/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jt{constructor(t,e,i,n,s,a,o,h,l,c,d,u,m,g,x,f){jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,h,l,c,d,u,m,g,x,f)}set(t,e,i,n,s,a,o,h,l,c,d,u,m,g,x,f){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=s,p[5]=a,p[9]=o,p[13]=h,p[2]=l,p[6]=c,p[10]=d,p[14]=u,p[3]=m,p[7]=g,p[11]=x,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/fn.setFromMatrixColumn(t,0).length(),s=1/fn.setFromMatrixColumn(t,1).length(),a=1/fn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),h=Math.cos(n),l=Math.sin(n),c=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=a*c,m=a*d,g=o*c,x=o*d;e[0]=h*c,e[4]=-h*d,e[8]=l,e[1]=m+g*l,e[5]=u-x*l,e[9]=-o*h,e[2]=x-u*l,e[6]=g+m*l,e[10]=a*h}else if(t.order==="YXZ"){const u=h*c,m=h*d,g=l*c,x=l*d;e[0]=u+x*o,e[4]=g*o-m,e[8]=a*l,e[1]=a*d,e[5]=a*c,e[9]=-o,e[2]=m*o-g,e[6]=x+u*o,e[10]=a*h}else if(t.order==="ZXY"){const u=h*c,m=h*d,g=l*c,x=l*d;e[0]=u-x*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*c,e[9]=x-u*o,e[2]=-a*l,e[6]=o,e[10]=a*h}else if(t.order==="ZYX"){const u=a*c,m=a*d,g=o*c,x=o*d;e[0]=h*c,e[4]=g*l-m,e[8]=u*l+x,e[1]=h*d,e[5]=x*l+u,e[9]=m*l-g,e[2]=-l,e[6]=o*h,e[10]=a*h}else if(t.order==="YZX"){const u=a*h,m=a*l,g=o*h,x=o*l;e[0]=h*c,e[4]=x-u*d,e[8]=g*d+m,e[1]=d,e[5]=a*c,e[9]=-o*c,e[2]=-l*c,e[6]=m*d+g,e[10]=u-x*d}else if(t.order==="XZY"){const u=a*h,m=a*l,g=o*h,x=o*l;e[0]=h*c,e[4]=-d,e[8]=l*c,e[1]=u*d+x,e[5]=a*c,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*c,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vh,t,Wh)}lookAt(t,e,i){const n=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Ui.crossVectors(i,Ve),Ui.lengthSq()===0&&(Math.abs(i.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Ui.crossVectors(i,Ve)),Ui.normalize(),fs.crossVectors(Ve,Ui),n[0]=Ui.x,n[4]=fs.x,n[8]=Ve.x,n[1]=Ui.y,n[5]=fs.y,n[9]=Ve.y,n[2]=Ui.z,n[6]=fs.z,n[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[4],h=i[8],l=i[12],c=i[1],d=i[5],u=i[9],m=i[13],g=i[2],x=i[6],f=i[10],p=i[14],S=i[3],b=i[7],E=i[11],R=i[15],y=n[0],A=n[4],U=n[8],T=n[12],v=n[1],P=n[5],L=n[9],O=n[13],k=n[2],W=n[6],q=n[10],J=n[14],V=n[3],et=n[7],nt=n[11],xt=n[15];return s[0]=a*y+o*v+h*k+l*V,s[4]=a*A+o*P+h*W+l*et,s[8]=a*U+o*L+h*q+l*nt,s[12]=a*T+o*O+h*J+l*xt,s[1]=c*y+d*v+u*k+m*V,s[5]=c*A+d*P+u*W+m*et,s[9]=c*U+d*L+u*q+m*nt,s[13]=c*T+d*O+u*J+m*xt,s[2]=g*y+x*v+f*k+p*V,s[6]=g*A+x*P+f*W+p*et,s[10]=g*U+x*L+f*q+p*nt,s[14]=g*T+x*O+f*J+p*xt,s[3]=S*y+b*v+E*k+R*V,s[7]=S*A+b*P+E*W+R*et,s[11]=S*U+b*L+E*q+R*nt,s[15]=S*T+b*O+E*J+R*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],a=t[1],o=t[5],h=t[9],l=t[13],c=t[2],d=t[6],u=t[10],m=t[14],g=t[3],x=t[7],f=t[11],p=t[15];return g*(+s*h*d-n*l*d-s*o*u+i*l*u+n*o*m-i*h*m)+x*(+e*h*m-e*l*u+s*a*u-n*a*m+n*l*c-s*h*c)+f*(+e*l*d-e*o*m-s*a*d+i*a*m+s*o*c-i*l*c)+p*(-n*o*c-e*h*d+e*o*u+n*a*d-i*a*u+i*h*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],h=t[6],l=t[7],c=t[8],d=t[9],u=t[10],m=t[11],g=t[12],x=t[13],f=t[14],p=t[15],S=d*f*l-x*u*l+x*h*m-o*f*m-d*h*p+o*u*p,b=g*u*l-c*f*l-g*h*m+a*f*m+c*h*p-a*u*p,E=c*x*l-g*d*l+g*o*m-a*x*m-c*o*p+a*d*p,R=g*d*h-c*x*h-g*o*u+a*x*u+c*o*f-a*d*f,y=e*S+i*b+n*E+s*R;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/y;return t[0]=S*A,t[1]=(x*u*s-d*f*s-x*n*m+i*f*m+d*n*p-i*u*p)*A,t[2]=(o*f*s-x*h*s+x*n*l-i*f*l-o*n*p+i*h*p)*A,t[3]=(d*h*s-o*u*s-d*n*l+i*u*l+o*n*m-i*h*m)*A,t[4]=b*A,t[5]=(c*f*s-g*u*s+g*n*m-e*f*m-c*n*p+e*u*p)*A,t[6]=(g*h*s-a*f*s-g*n*l+e*f*l+a*n*p-e*h*p)*A,t[7]=(a*u*s-c*h*s+c*n*l-e*u*l-a*n*m+e*h*m)*A,t[8]=E*A,t[9]=(g*d*s-c*x*s-g*i*m+e*x*m+c*i*p-e*d*p)*A,t[10]=(a*x*s-g*o*s+g*i*l-e*x*l-a*i*p+e*o*p)*A,t[11]=(c*o*s-a*d*s-c*i*l+e*d*l+a*i*m-e*o*m)*A,t[12]=R*A,t[13]=(c*x*n-g*d*n+g*i*u-e*x*u-c*i*f+e*d*f)*A,t[14]=(g*o*n-a*x*n-g*i*h+e*x*h+a*i*f-e*o*f)*A,t[15]=(a*d*n-c*o*n+c*i*h-e*d*h-a*i*u+e*o*u)*A,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,a=t.x,o=t.y,h=t.z,l=s*a,c=s*o;return this.set(l*a+i,l*o-n*h,l*h+n*o,0,l*o+n*h,c*o+i,c*h-n*a,0,l*h-n*o,c*h+n*a,s*h*h+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,a){return this.set(1,i,s,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,a=e._y,o=e._z,h=e._w,l=s+s,c=a+a,d=o+o,u=s*l,m=s*c,g=s*d,x=a*c,f=a*d,p=o*d,S=h*l,b=h*c,E=h*d,R=i.x,y=i.y,A=i.z;return n[0]=(1-(x+p))*R,n[1]=(m+E)*R,n[2]=(g-b)*R,n[3]=0,n[4]=(m-E)*y,n[5]=(1-(u+p))*y,n[6]=(f+S)*y,n[7]=0,n[8]=(g+b)*A,n[9]=(f-S)*A,n[10]=(1-(u+x))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=fn.set(n[0],n[1],n[2]).length();const a=fn.set(n[4],n[5],n[6]).length(),o=fn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],ri.copy(this);const l=1/s,c=1/a,d=1/o;return ri.elements[0]*=l,ri.elements[1]*=l,ri.elements[2]*=l,ri.elements[4]*=c,ri.elements[5]*=c,ri.elements[6]*=c,ri.elements[8]*=d,ri.elements[9]*=d,ri.elements[10]*=d,e.setFromRotationMatrix(ri),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,n,s,a,o=gi,h=!1){const l=this.elements,c=2*s/(e-t),d=2*s/(i-n),u=(e+t)/(e-t),m=(i+n)/(i-n);let g,x;if(h)g=s/(a-s),x=a*s/(a-s);else if(o===gi)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Vs)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,n,s,a,o=gi,h=!1){const l=this.elements,c=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),m=-(i+n)/(i-n);let g,x;if(h)g=1/(a-s),x=a/(a-s);else if(o===gi)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===Vs)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fn=new I,ri=new jt,Vh=new I(0,0,0),Wh=new I(1,1,1),Ui=new I,fs=new I,Ve=new I,so=new jt,ro=new nn;class di{constructor(t=0,e=0,i=0,n=di.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],a=n[4],o=n[8],h=n[1],l=n[5],c=n[9],d=n[2],u=n[6],m=n[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ht(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,m),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return so.makeRotationFromQuaternion(t),this.setFromRotationMatrix(so,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ro.setFromEuler(this),this.setFromQuaternion(ro,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class za{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Xh=0;const ao=new I,pn=new nn,bi=new jt,ps=new I,Gn=new I,Zh=new I,qh=new nn,oo=new I(1,0,0),lo=new I(0,1,0),ho=new I(0,0,1),co={type:"added"},$h={type:"removed"},mn={type:"childadded",child:null},ur={type:"childremoved",child:null};class xe extends rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new I,e=new di,i=new nn,n=new I(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new jt},normalMatrix:{value:new Ot}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new za,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return pn.setFromAxisAngle(t,e),this.quaternion.multiply(pn),this}rotateOnWorldAxis(t,e){return pn.setFromAxisAngle(t,e),this.quaternion.premultiply(pn),this}rotateX(t){return this.rotateOnAxis(oo,t)}rotateY(t){return this.rotateOnAxis(lo,t)}rotateZ(t){return this.rotateOnAxis(ho,t)}translateOnAxis(t,e){return ao.copy(t).applyQuaternion(this.quaternion),this.position.add(ao.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(oo,t)}translateY(t){return this.translateOnAxis(lo,t)}translateZ(t){return this.translateOnAxis(ho,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ps.copy(t):ps.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Gn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(Gn,ps,this.up):bi.lookAt(ps,Gn,this.up),this.quaternion.setFromRotationMatrix(bi),n&&(bi.extractRotation(n.matrixWorld),pn.setFromRotationMatrix(bi),this.quaternion.premultiply(pn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(co),mn.child=t,this.dispatchEvent(mn),mn.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($h),ur.child=t,this.dispatchEvent(ur),ur.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(co),mn.child=t,this.dispatchEvent(mn),mn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,t,Zh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gn,qh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,c=h.length;l<c;l++){const d=h[l];s(t.shapes,d)}else s(t.shapes,h)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(s(t.materials,this.material[h]));n.material=o}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];n.animations.push(s(t.animations,h))}}if(e){const o=a(t.geometries),h=a(t.materials),l=a(t.textures),c=a(t.images),d=a(t.shapes),u=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),h.length>0&&(i.materials=h),l.length>0&&(i.textures=l),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const h=[];for(const l in o){const c=o[l];delete c.metadata,h.push(c)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}xe.DEFAULT_UP=new I(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new I,yi=new I,fr=new I,Si=new I,gn=new I,xn=new I,uo=new I,pr=new I,mr=new I,gr=new I,xr=new ge,_r=new ge,Mr=new ge;class ti{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ai.subVectors(t,e),n.cross(ai);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){ai.subVectors(n,e),yi.subVectors(i,e),fr.subVectors(t,e);const a=ai.dot(ai),o=ai.dot(yi),h=ai.dot(fr),l=yi.dot(yi),c=yi.dot(fr),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,m=(l*h-o*c)*u,g=(a*c-o*h)*u;return s.set(1-m-g,g,m)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(t,e,i,n,s,a,o,h){return this.getBarycoord(t,e,i,n,Si)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(s,Si.x),h.addScaledVector(a,Si.y),h.addScaledVector(o,Si.z),h)}static getInterpolatedAttribute(t,e,i,n,s,a){return xr.setScalar(0),_r.setScalar(0),Mr.setScalar(0),xr.fromBufferAttribute(t,e),_r.fromBufferAttribute(t,i),Mr.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(xr,s.x),a.addScaledVector(_r,s.y),a.addScaledVector(Mr,s.z),a}static isFrontFacing(t,e,i,n){return ai.subVectors(i,e),yi.subVectors(t,e),ai.cross(yi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ai.subVectors(this.c,this.b),yi.subVectors(this.a,this.b),ai.cross(yi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ti.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ti.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return ti.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return ti.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ti.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let a,o;gn.subVectors(n,i),xn.subVectors(s,i),pr.subVectors(t,i);const h=gn.dot(pr),l=xn.dot(pr);if(h<=0&&l<=0)return e.copy(i);mr.subVectors(t,n);const c=gn.dot(mr),d=xn.dot(mr);if(c>=0&&d<=c)return e.copy(n);const u=h*d-c*l;if(u<=0&&h>=0&&c<=0)return a=h/(h-c),e.copy(i).addScaledVector(gn,a);gr.subVectors(t,s);const m=gn.dot(gr),g=xn.dot(gr);if(g>=0&&m<=g)return e.copy(s);const x=m*l-h*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(i).addScaledVector(xn,o);const f=c*g-m*d;if(f<=0&&d-c>=0&&m-g>=0)return uo.subVectors(s,n),o=(d-c)/(d-c+(m-g)),e.copy(n).addScaledVector(uo,o);const p=1/(f+x+u);return a=x*p,o=u*p,e.copy(i).addScaledVector(gn,a).addScaledVector(xn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},ms={h:0,s:0,l:0};function vr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class pt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=$t.workingColorSpace){if(t=Uh(t,1),e=Ht(e,0,1),i=Ht(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=vr(a,s,t+1/3),this.g=vr(a,s,t),this.b=vr(a,s,t-1/3)}return $t.colorSpaceToWorking(this,n),this}setStyle(t,e=$e){function i(s){s!==void 0&&parseFloat(s)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){const i=_l[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ri(t.r),this.g=Ri(t.g),this.b=Ri(t.b),this}copyLinearToSRGB(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return $t.workingToColorSpace(we.copy(this),t),Math.round(Ht(we.r*255,0,255))*65536+Math.round(Ht(we.g*255,0,255))*256+Math.round(Ht(we.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(we.copy(this),e);const i=we.r,n=we.g,s=we.b,a=Math.max(i,n,s),o=Math.min(i,n,s);let h,l;const c=(o+a)/2;if(o===a)h=0,l=0;else{const d=a-o;switch(l=c<=.5?d/(a+o):d/(2-a-o),a){case i:h=(n-s)/d+(n<s?6:0);break;case n:h=(s-i)/d+2;break;case s:h=(i-n)/d+4;break}h/=6}return t.h=h,t.s=l,t.l=c,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(we.copy(this),e),t.r=we.r,t.g=we.g,t.b=we.b,t}getStyle(t=$e){$t.workingToColorSpace(we.copy(this),t);const e=we.r,i=we.g,n=we.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Fi),this.setHSL(Fi.h+t,Fi.s+e,Fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fi),t.getHSL(ms);const i=ir(Fi.h,ms.h,e),n=ir(Fi.s,ms.s,e),s=ir(Fi.l,ms.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const we=new pt;pt.NAMES=_l;let Yh=0;class Di extends rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=tn,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fr,this.blendDst=Nr,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=Dn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ja,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ln,this.stencilZFail=ln,this.stencilZPass=ln,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==tn&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fr&&(i.blendSrc=this.blendSrc),this.blendDst!==Nr&&(i.blendDst=this.blendDst),this.blendEquation!==Ji&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Dn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ja&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ln&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ln&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ln&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const a=[];for(const o in s){const h=s[o];delete h.metadata,a.push(h)}return a}if(e){const s=n(t.textures),a=n(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class es extends Di{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new I,gs=new yt;let jh=0;class Ge{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:jh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=ya,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)gs.fromBufferAttribute(this,e),gs.applyMatrix3(t),this.setXY(e,gs.x,gs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=pi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ee(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),i=ee(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),i=ee(i,this.array),n=ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=ee(e,this.array),i=ee(i,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ya&&(t.usage=this.usage),t}}class Ml extends Ge{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class vl extends Ge{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ue extends Ge{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Kh=0;const Je=new jt,br=new xe,_n=new I,We=new an,kn=new an,ye=new I;class Fe extends rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(gl(t)?vl:Ml)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ot().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,i){return Je.makeTranslation(t,e,i),this.applyMatrix4(Je),this}scale(t,e,i){return Je.makeScale(t,e,i),this.applyMatrix4(Je),this}lookAt(t){return br.lookAt(t),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_n).negate(),this.translate(_n.x,_n.y,_n.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];We.setFromBufferAttribute(s),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ii);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];kn.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(We.min,kn.min),We.expandByPoint(ye),ye.addVectors(We.max,kn.max),We.expandByPoint(ye)):(We.expandByPoint(kn.min),We.expandByPoint(kn.max))}We.getCenter(i);let n=0;for(let s=0,a=t.count;s<a;s++)ye.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(ye));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],h=this.morphTargetsRelative;for(let l=0,c=o.count;l<c;l++)ye.fromBufferAttribute(o,l),h&&(_n.fromBufferAttribute(t,l),ye.add(_n)),n=Math.max(n,i.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let U=0;U<i.count;U++)o[U]=new I,h[U]=new I;const l=new I,c=new I,d=new I,u=new yt,m=new yt,g=new yt,x=new I,f=new I;function p(U,T,v){l.fromBufferAttribute(i,U),c.fromBufferAttribute(i,T),d.fromBufferAttribute(i,v),u.fromBufferAttribute(s,U),m.fromBufferAttribute(s,T),g.fromBufferAttribute(s,v),c.sub(l),d.sub(l),m.sub(u),g.sub(u);const P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(x.copy(c).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(P),f.copy(d).multiplyScalar(m.x).addScaledVector(c,-g.x).multiplyScalar(P),o[U].add(x),o[T].add(x),o[v].add(x),h[U].add(f),h[T].add(f),h[v].add(f))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let U=0,T=S.length;U<T;++U){const v=S[U],P=v.start,L=v.count;for(let O=P,k=P+L;O<k;O+=3)p(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const b=new I,E=new I,R=new I,y=new I;function A(U){R.fromBufferAttribute(n,U),y.copy(R);const T=o[U];b.copy(T),b.sub(R.multiplyScalar(R.dot(T))).normalize(),E.crossVectors(y,T);const P=E.dot(h[U])<0?-1:1;a.setXYZW(U,b.x,b.y,b.z,P)}for(let U=0,T=S.length;U<T;++U){const v=S[U],P=v.start,L=v.count;for(let O=P,k=P+L;O<k;O+=3)A(t.getX(O+0)),A(t.getX(O+1)),A(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const n=new I,s=new I,a=new I,o=new I,h=new I,l=new I,c=new I,d=new I;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),x=t.getX(u+1),f=t.getX(u+2);n.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,f),c.subVectors(a,s),d.subVectors(n,s),c.cross(d),o.fromBufferAttribute(i,g),h.fromBufferAttribute(i,x),l.fromBufferAttribute(i,f),o.add(c),h.add(c),l.add(c),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,h.x,h.y,h.z),i.setXYZ(f,l.x,l.y,l.z)}else for(let u=0,m=e.count;u<m;u+=3)n.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),c.subVectors(a,s),d.subVectors(n,s),c.cross(d),i.setXYZ(u+0,c.x,c.y,c.z),i.setXYZ(u+1,c.x,c.y,c.z),i.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,h){const l=o.array,c=o.itemSize,d=o.normalized,u=new l.constructor(h.length*c);let m=0,g=0;for(let x=0,f=h.length;x<f;x++){o.isInterleavedBufferAttribute?m=h[x]*o.data.stride+o.offset:m=h[x]*c;for(let p=0;p<c;p++)u[g++]=l[m++]}return new Ge(u,c,d)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Fe,i=this.index.array,n=this.attributes;for(const o in n){const h=n[o],l=t(h,i);e.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const h=[],l=s[o];for(let c=0,d=l.length;c<d;c++){const u=l[c],m=t(u,i);h.push(m)}e.morphAttributes[o]=h}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(t[l]=h[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const h in i){const l=i[h];t.data.attributes[h]=l.toJSON(t.data)}const n={};let s=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],c=[];for(let d=0,u=l.length;d<u;d++){const m=l[d];c.push(m.toJSON(t.data))}c.length>0&&(n[h]=c,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const l in n){const c=n[l];this.setAttribute(l,c.clone(e))}const s=t.morphAttributes;for(const l in s){const c=[],d=s[l];for(let u=0,m=d.length;u<m;u++)c.push(d[u].clone(e));this.morphAttributes[l]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,c=a.length;l<c;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const fo=new jt,$i=new is,xs=new ii,po=new I,_s=new I,Ms=new I,vs=new I,yr=new I,bs=new I,mo=new I,ys=new I;class ne extends xe{constructor(t=new Fe,e=new es){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(s&&o){bs.set(0,0,0);for(let h=0,l=s.length;h<l;h++){const c=o[h],d=s[h];c!==0&&(yr.fromBufferAttribute(d,t),a?bs.addScaledVector(yr,c):bs.addScaledVector(yr.sub(e),c))}e.add(bs)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(s),$i.copy(t.ray).recast(t.near),!(xs.containsPoint($i.origin)===!1&&($i.intersectSphere(xs,po)===null||$i.origin.distanceToSquared(po)>(t.far-t.near)**2))&&(fo.copy(s).invert(),$i.copy(t.ray).applyMatrix4(fo),!(i.boundingBox!==null&&$i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,$i)))}_computeIntersections(t,e,i){let n;const s=this.geometry,a=this.material,o=s.index,h=s.attributes.position,l=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const f=u[g],p=a[f.materialIndex],S=Math.max(f.start,m.start),b=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let E=S,R=b;E<R;E+=3){const y=o.getX(E),A=o.getX(E+1),U=o.getX(E+2);n=Ss(this,p,t,i,l,c,d,y,A,U),n&&(n.faceIndex=Math.floor(E/3),n.face.materialIndex=f.materialIndex,e.push(n))}}else{const g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let f=g,p=x;f<p;f+=3){const S=o.getX(f),b=o.getX(f+1),E=o.getX(f+2);n=Ss(this,a,t,i,l,c,d,S,b,E),n&&(n.faceIndex=Math.floor(f/3),e.push(n))}}else if(h!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const f=u[g],p=a[f.materialIndex],S=Math.max(f.start,m.start),b=Math.min(h.count,Math.min(f.start+f.count,m.start+m.count));for(let E=S,R=b;E<R;E+=3){const y=E,A=E+1,U=E+2;n=Ss(this,p,t,i,l,c,d,y,A,U),n&&(n.faceIndex=Math.floor(E/3),n.face.materialIndex=f.materialIndex,e.push(n))}}else{const g=Math.max(0,m.start),x=Math.min(h.count,m.start+m.count);for(let f=g,p=x;f<p;f+=3){const S=f,b=f+1,E=f+2;n=Ss(this,a,t,i,l,c,d,S,b,E),n&&(n.faceIndex=Math.floor(f/3),e.push(n))}}}}function Jh(r,t,e,i,n,s,a,o){let h;if(t.side===ze?h=i.intersectTriangle(a,s,n,!0,o):h=i.intersectTriangle(n,s,a,t.side===Hi,o),h===null)return null;ys.copy(o),ys.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(ys);return l<e.near||l>e.far?null:{distance:l,point:ys.clone(),object:r}}function Ss(r,t,e,i,n,s,a,o,h,l){r.getVertexPosition(o,_s),r.getVertexPosition(h,Ms),r.getVertexPosition(l,vs);const c=Jh(r,t,e,i,_s,Ms,vs,mo);if(c){const d=new I;ti.getBarycoord(mo,_s,Ms,vs,d),n&&(c.uv=ti.getInterpolatedAttribute(n,o,h,l,d,new yt)),s&&(c.uv1=ti.getInterpolatedAttribute(s,o,h,l,d,new yt)),a&&(c.normal=ti.getInterpolatedAttribute(a,o,h,l,d,new I),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const u={a:o,b:h,c:l,normal:new I,materialIndex:0};ti.getNormal(_s,Ms,vs,u.normal),c.face=u,c.barycoord=d}return c}class he extends Fe{constructor(t=1,e=1,i=1,n=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:a};const o=this;n=Math.floor(n),s=Math.floor(s),a=Math.floor(a);const h=[],l=[],c=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,s,4),g("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(h),this.setAttribute("position",new Ue(l,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(d,2));function g(x,f,p,S,b,E,R,y,A,U,T){const v=E/A,P=R/U,L=E/2,O=R/2,k=y/2,W=A+1,q=U+1;let J=0,V=0;const et=new I;for(let nt=0;nt<q;nt++){const xt=nt*P-O;for(let Nt=0;Nt<W;Nt++){const Gt=Nt*v-L;et[x]=Gt*S,et[f]=xt*b,et[p]=k,l.push(et.x,et.y,et.z),et[x]=0,et[f]=0,et[p]=y>0?1:-1,c.push(et.x,et.y,et.z),d.push(Nt/A),d.push(1-nt/U),J+=1}}for(let nt=0;nt<U;nt++)for(let xt=0;xt<A;xt++){const Nt=u+xt+W*nt,Gt=u+xt+W*(nt+1),_t=u+(xt+1)+W*(nt+1),Kt=u+(xt+1)+W*nt;h.push(Nt,Gt,Kt),h.push(Gt,_t,Kt),V+=6}o.addGroup(m,V,T),m+=V,u+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new he(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Un(r){const t={};for(const e in r){t[e]={};for(const i in r[e]){const n=r[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Pe(r){const t={};for(let e=0;e<r.length;e++){const i=Un(r[e]);for(const n in i)t[n]=i[n]}return t}function Qh(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function bl(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const tc={clone:Un,merge:Pe};var ec=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ic=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends Di{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ec,this.fragmentShader=ic,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Un(t.uniforms),this.uniformsGroups=Qh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class yl extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new I,go=new yt,xo=new yt;class oi extends yl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Sa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Sa*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z)}getViewSize(t,e){return this.getViewBounds(t,go,xo),e.subVectors(xo,go)}setViewOffset(t,e,i,n,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;s+=a.offsetX*n/h,e-=a.offsetY*i/l,n*=a.width/h,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Mn=-90,vn=1;class nc extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new oi(Mn,vn,t,e);n.layers=this.layers,this.add(n);const s=new oi(Mn,vn,t,e);s.layers=this.layers,this.add(s);const a=new oi(Mn,vn,t,e);a.layers=this.layers,this.add(a);const o=new oi(Mn,vn,t,e);o.layers=this.layers,this.add(o);const h=new oi(Mn,vn,t,e);h.layers=this.layers,this.add(h);const l=new oi(Mn,vn,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,a,o,h]=e;for(const l of e)this.remove(l);if(t===gi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,h,l,c]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,h),t.setRenderTarget(i,4,n),t.render(e,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),t.render(e,c),t.setRenderTarget(d,u,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Sl extends Re{constructor(t=[],e=Pn,i,n,s,a,o,h,l,c){super(t,e,i,n,s,a,o,h,l,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class sc extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Sl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new he(5,5,5),s=new _i({name:"CubemapFromEquirect",uniforms:Un(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:Ai});s.uniforms.tEquirect.value=e;const a=new ne(n,s),o=e.minFilter;return e.minFilter===Oi&&(e.minFilter=ei),new nc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(s)}}class hi extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rc={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const f=e.getJointPose(x,i),p=this._getHandJoint(l,x);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const c=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=c.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&u>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(rc)))}return o!==null&&(o.visible=n!==null),h!==null&&(h.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new hi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class ac extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class oc{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ya,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,s=this.stride;n<s;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const De=new I;class Zs{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyMatrix4(t),this.setXYZ(e,De.x,De.y,De.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.applyNormalMatrix(t),this.setXYZ(e,De.x,De.y,De.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)De.fromBufferAttribute(this,e),De.transformDirection(t),this.setXYZ(e,De.x,De.y,De.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=pi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ee(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=pi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=pi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=pi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=pi(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),i=ee(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),i=ee(i,this.array),n=ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ee(e,this.array),i=ee(i,this.array),n=ee(n,this.array),s=ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Xs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Xs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Tl extends Di{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new pt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let bn;const Hn=new I,yn=new I,Sn=new I,Tn=new yt,Vn=new yt,El=new jt,Ts=new I,Wn=new I,Es=new I,_o=new yt,Tr=new yt,Mo=new yt;class lc extends xe{constructor(t=new Tl){if(super(),this.isSprite=!0,this.type="Sprite",bn===void 0){bn=new Fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new oc(e,5);bn.setIndex([0,1,2,0,2,3]),bn.setAttribute("position",new Zs(i,3,0,!1)),bn.setAttribute("uv",new Zs(i,2,3,!1))}this.geometry=bn,this.material=t,this.center=new yt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yn.setFromMatrixScale(this.matrixWorld),El.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Sn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yn.multiplyScalar(-Sn.z);const i=this.material.rotation;let n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));const a=this.center;ws(Ts.set(-.5,-.5,0),Sn,a,yn,n,s),ws(Wn.set(.5,-.5,0),Sn,a,yn,n,s),ws(Es.set(.5,.5,0),Sn,a,yn,n,s),_o.set(0,0),Tr.set(1,0),Mo.set(1,1);let o=t.ray.intersectTriangle(Ts,Wn,Es,!1,Hn);if(o===null&&(ws(Wn.set(-.5,.5,0),Sn,a,yn,n,s),Tr.set(0,1),o=t.ray.intersectTriangle(Ts,Es,Wn,!1,Hn),o===null))return;const h=t.ray.origin.distanceTo(Hn);h<t.near||h>t.far||e.push({distance:h,point:Hn.clone(),uv:ti.getInterpolation(Hn,Ts,Wn,Es,_o,Tr,Mo,new yt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function ws(r,t,e,i,n,s){Tn.subVectors(r,e).addScalar(.5).multiply(i),n!==void 0?(Vn.x=s*Tn.x-n*Tn.y,Vn.y=n*Tn.x+s*Tn.y):Vn.copy(Tn),r.copy(t),r.x+=Vn.x,r.y+=Vn.y,r.applyMatrix4(El)}class wl extends Re{constructor(t=null,e=1,i=1,n,s,a,o,h,l=je,c=je,d,u){super(null,a,o,h,l,c,n,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class vo extends Ge{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const En=new jt,bo=new jt,As=[],yo=new an,hc=new jt,Xn=new ne,Zn=new ii;class qe extends ne{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new vo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,hc)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new an),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,En),yo.copy(t.boundingBox).applyMatrix4(En),this.boundingBox.union(yo)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ii),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,En),Zn.copy(t.boundingSphere).applyMatrix4(En),this.boundingSphere.union(Zn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,a=t*s+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(Xn.geometry=this.geometry,Xn.material=this.material,Xn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zn.copy(this.boundingSphere),Zn.applyMatrix4(i),t.ray.intersectsSphere(Zn)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,En),bo.multiplyMatrices(i,En),Xn.matrixWorld=bo,Xn.raycast(t,As);for(let a=0,o=As.length;a<o;a++){const h=As[a];h.instanceId=s,h.object=this,e.push(h)}As.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new vo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new wl(new Float32Array(n*this.count),n,this.count,Ia,mi));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<i.length;l++)a+=i[l];const o=this.geometry.morphTargetsRelative?1:1-a,h=n*t;s[h]=o,s.set(i,h+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Er=new I,cc=new I,dc=new Ot;class Qe{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Er.subVectors(i,e).cross(cc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Er),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||dc.getNormalMatrix(t),n=this.coplanarPoint(Er).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yi=new ii,uc=new yt(.5,.5),Rs=new I;class ns{constructor(t=new Qe,e=new Qe,i=new Qe,n=new Qe,s=new Qe,a=new Qe){this.planes=[t,e,i,n,s,a]}set(t,e,i,n,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gi,i=!1){const n=this.planes,s=t.elements,a=s[0],o=s[1],h=s[2],l=s[3],c=s[4],d=s[5],u=s[6],m=s[7],g=s[8],x=s[9],f=s[10],p=s[11],S=s[12],b=s[13],E=s[14],R=s[15];if(n[0].setComponents(l-a,m-c,p-g,R-S).normalize(),n[1].setComponents(l+a,m+c,p+g,R+S).normalize(),n[2].setComponents(l+o,m+d,p+x,R+b).normalize(),n[3].setComponents(l-o,m-d,p-x,R-b).normalize(),i)n[4].setComponents(h,u,f,E).normalize(),n[5].setComponents(l-h,m-u,p-f,R-E).normalize();else if(n[4].setComponents(l-h,m-u,p-f,R-E).normalize(),e===gi)n[5].setComponents(l+h,m+u,p+f,R+E).normalize();else if(e===Vs)n[5].setComponents(h,u,f,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(t){Yi.center.set(0,0,0);const e=uc.distanceTo(t.center);return Yi.radius=.7071067811865476+e,Yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Rs.x=n.normal.x>0?t.max.x:t.min.x,Rs.y=n.normal.y>0?t.max.y:t.min.y,Rs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Al extends Di{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const qs=new I,$s=new I,So=new jt,qn=new is,Cs=new ii,wr=new I,To=new I;class fc extends xe{constructor(t=new Fe,e=new Al){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,s=e.count;n<s;n++)qs.fromBufferAttribute(e,n-1),$s.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=qs.distanceTo($s);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(n),Cs.radius+=s,t.ray.intersectsSphere(Cs)===!1)return;So.copy(n).invert(),qn.copy(t.ray).applyMatrix4(So);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,c=i.index,u=i.attributes.position;if(c!==null){const m=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let x=m,f=g-1;x<f;x+=l){const p=c.getX(x),S=c.getX(x+1),b=Ds(this,t,qn,h,p,S,x);b&&e.push(b)}if(this.isLineLoop){const x=c.getX(g-1),f=c.getX(m),p=Ds(this,t,qn,h,x,f,g-1);p&&e.push(p)}}else{const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=m,f=g-1;x<f;x+=l){const p=Ds(this,t,qn,h,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=Ds(this,t,qn,h,g-1,m,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ds(r,t,e,i,n,s,a){const o=r.geometry.attributes.position;if(qs.fromBufferAttribute(o,n),$s.fromBufferAttribute(o,s),e.distanceSqToSegment(qs,$s,wr,To)>i)return;wr.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(wr);if(!(l<t.near||l>t.far))return{distance:l,point:To.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Eo=new I,wo=new I;class pc extends fc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,s=e.count;n<s;n+=2)Eo.fromBufferAttribute(e,n),wo.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Eo.distanceTo(wo);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Rl extends Di{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new pt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ao=new jt,Ta=new is,Ps=new ii,Is=new I;class mc extends xe{constructor(t=new Fe,e=new Rl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ps.copy(i.boundingSphere),Ps.applyMatrix4(n),Ps.radius+=s,t.ray.intersectsSphere(Ps)===!1)return;Ao.copy(n).invert(),Ta.copy(t.ray).applyMatrix4(Ao);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=u,x=m;g<x;g++){const f=l.getX(g);Is.fromBufferAttribute(d,f),Ro(Is,f,h,n,t,e,this)}}else{const u=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=u,x=m;g<x;g++)Is.fromBufferAttribute(d,g),Ro(Is,g,h,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ro(r,t,e,i,n,s,a){const o=Ta.distanceSqToPoint(r);if(o<e){const h=new I;Ta.closestPointToPoint(r,h),h.applyMatrix4(i);const l=n.ray.origin.distanceTo(h);if(l<n.near||l>n.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:h,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Le extends Re{constructor(t,e,i,n,s,a,o,h,l){super(t,e,i,n,s,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cl extends Re{constructor(t,e,i=en,n,s,a,o=je,h=je,l,c=Jn,d=1){if(c!==Jn&&c!==Qn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,n,s,a,o,h,c,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Oa(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Dl extends Re{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ci extends Fe{constructor(t=1,e=1,i=1,n=32,s=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:h};const l=this;n=Math.floor(n),s=Math.floor(s);const c=[],d=[],u=[],m=[];let g=0;const x=[],f=i/2;let p=0;S(),a===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(c),this.setAttribute("position",new Ue(d,3)),this.setAttribute("normal",new Ue(u,3)),this.setAttribute("uv",new Ue(m,2));function S(){const E=new I,R=new I;let y=0;const A=(e-t)/i;for(let U=0;U<=s;U++){const T=[],v=U/s,P=v*(e-t)+t;for(let L=0;L<=n;L++){const O=L/n,k=O*h+o,W=Math.sin(k),q=Math.cos(k);R.x=P*W,R.y=-v*i+f,R.z=P*q,d.push(R.x,R.y,R.z),E.set(W,A,q).normalize(),u.push(E.x,E.y,E.z),m.push(O,1-v),T.push(g++)}x.push(T)}for(let U=0;U<n;U++)for(let T=0;T<s;T++){const v=x[T][U],P=x[T+1][U],L=x[T+1][U+1],O=x[T][U+1];(t>0||T!==0)&&(c.push(v,P,O),y+=3),(e>0||T!==s-1)&&(c.push(P,L,O),y+=3)}l.addGroup(p,y,0),p+=y}function b(E){const R=g,y=new yt,A=new I;let U=0;const T=E===!0?t:e,v=E===!0?1:-1;for(let L=1;L<=n;L++)d.push(0,f*v,0),u.push(0,v,0),m.push(.5,.5),g++;const P=g;for(let L=0;L<=n;L++){const k=L/n*h+o,W=Math.cos(k),q=Math.sin(k);A.x=T*q,A.y=f*v,A.z=T*W,d.push(A.x,A.y,A.z),u.push(0,v,0),y.x=W*.5+.5,y.y=q*.5*v+.5,m.push(y.x,y.y),g++}for(let L=0;L<n;L++){const O=R+L,k=P+L;E===!0?c.push(k,k+1,O):c.push(k+1,k,O),U+=3}l.addGroup(p,U,E===!0?1:2),p+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ci(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ci extends Ci{constructor(t=1,e=1,i=32,n=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new ci(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vi extends Fe{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,a=e/2,o=Math.floor(i),h=Math.floor(n),l=o+1,c=h+1,d=t/o,u=e/h,m=[],g=[],x=[],f=[];for(let p=0;p<c;p++){const S=p*u-a;for(let b=0;b<l;b++){const E=b*d-s;g.push(E,-S,0),x.push(0,0,1),f.push(b/o),f.push(1-p/h)}}for(let p=0;p<h;p++)for(let S=0;S<o;S++){const b=S+l*p,E=S+l*(p+1),R=S+1+l*(p+1),y=S+1+l*p;m.push(b,E,y),m.push(E,R,y)}this.setIndex(m),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.width,t.height,t.widthSegments,t.heightSegments)}}class ss extends Fe{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const h=Math.min(a+o,Math.PI);let l=0;const c=[],d=new I,u=new I,m=[],g=[],x=[],f=[];for(let p=0;p<=i;p++){const S=[],b=p/i;let E=0;p===0&&a===0?E=.5/e:p===i&&h===Math.PI&&(E=-.5/e);for(let R=0;R<=e;R++){const y=R/e;d.x=-t*Math.cos(n+y*s)*Math.sin(a+b*o),d.y=t*Math.cos(a+b*o),d.z=t*Math.sin(n+y*s)*Math.sin(a+b*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),f.push(y+E,1-b),S.push(l++)}c.push(S)}for(let p=0;p<i;p++)for(let S=0;S<e;S++){const b=c[p][S+1],E=c[p][S],R=c[p+1][S],y=c[p+1][S+1];(p!==0||a>0)&&m.push(b,E,y),(p!==i-1||h<Math.PI)&&m.push(E,R,y)}this.setIndex(m),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xe extends Di{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class oe extends Di{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ba,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gc extends Di{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xc extends Di{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Pl extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new pt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ar=new jt,Co=new I,Do=new I;class _c{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.mapType=xi,this.map=null,this.mapPass=null,this.matrix=new jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ns,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Co.setFromMatrixPosition(t.matrixWorld),e.position.copy(Co),Do.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Do),e.updateMatrixWorld(),Ar.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ar,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ar)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ga extends yl{constructor(t=-1,e=1,i=1,n=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=n+e,h=n-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=c*this.view.offsetY,h=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Mc extends _c{constructor(){super(new Ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class vc extends Pl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new Mc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class bc extends Pl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class yc extends oi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Po=new jt;class Sc{constructor(t,e,i=0,n=1/0){this.ray=new is(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new za,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Po.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Po),this}intersectObject(t,e=!0,i=[]){return Ea(t,this,i,e),i.sort(Io),i}intersectObjects(t,e=!0,i=[]){for(let n=0,s=t.length;n<s;n++)Ea(t[n],this,i,e);return i.sort(Io),i}}function Io(r,t){return r.distance-t.distance}function Ea(r,t,e,i){let n=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)Ea(s[a],t,e,!0)}}class Lo{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ht(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Tc extends rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Uo(r,t,e,i){const n=Ec(i);switch(e){case fl:return r*t;case Ia:return r*t/n.components*n.byteLength;case La:return r*t/n.components*n.byteLength;case Ua:return r*t*2/n.components*n.byteLength;case Fa:return r*t*2/n.components*n.byteLength;case pl:return r*t*3/n.components*n.byteLength;case li:return r*t*4/n.components*n.byteLength;case Na:return r*t*4/n.components*n.byteLength;case Ns:case Bs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Os:case zs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Yr:case Kr:return Math.max(r,16)*Math.max(t,8)/4;case $r:case jr:return Math.max(r,8)*Math.max(t,8)/2;case Jr:case Qr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ta:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ea:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ia:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case na:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case sa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case ra:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case aa:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case oa:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case la:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case ha:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ca:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case da:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case ua:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case fa:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case pa:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case ma:case ga:case xa:return Math.ceil(r/4)*Math.ceil(t/4)*16;case _a:case Ma:return Math.ceil(r/4)*Math.ceil(t/4)*8;case va:case ba:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ec(r){switch(r){case xi:case hl:return{byteLength:1,components:1};case jn:case cl:case Fn:return{byteLength:2,components:1};case Da:case Pa:return{byteLength:2,components:4};case en:case Ca:case mi:return{byteLength:4,components:1};case dl:case ul:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);function Il(){let r=null,t=!1,e=null,i=null;function n(s,a){e(s,a),i=r.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=r.requestAnimationFrame(n),t=!0)},stop:function(){r.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function wc(r){const t=new WeakMap;function e(o,h){const l=o.array,c=o.usage,d=l.byteLength,u=r.createBuffer();r.bindBuffer(h,u),r.bufferData(h,l,c),o.onUploadCallback();let m;if(l instanceof Float32Array)m=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=r.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=r.HALF_FLOAT:m=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=r.SHORT;else if(l instanceof Uint32Array)m=r.UNSIGNED_INT;else if(l instanceof Int32Array)m=r.INT;else if(l instanceof Int8Array)m=r.BYTE;else if(l instanceof Uint8Array)m=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,h,l){const c=h.array,d=h.updateRanges;if(r.bindBuffer(l,o),d.length===0)r.bufferSubData(l,0,c);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){const g=d[u],x=d[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){const x=d[m];r.bufferSubData(l,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}h.clearUpdateRanges()}h.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=t.get(o);h&&(r.deleteBuffer(h.buffer),t.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,h),l.version=o.version}}return{get:n,remove:s,update:a}}var Ac=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rc=`#ifdef USE_ALPHAHASH
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
#endif`,Cc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Dc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Pc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ic=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Lc=`#ifdef USE_AOMAP
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
#endif`,Uc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fc=`#ifdef USE_BATCHING
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
#endif`,Nc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Oc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gc=`#ifdef USE_IRIDESCENCE
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
#endif`,kc=`#ifdef USE_BUMPMAP
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
#endif`,Hc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Vc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,qc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$c=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Yc=`#if defined( USE_COLOR_ALPHA )
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
#endif`,jc=`#define PI 3.141592653589793
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
} // validated`,Kc=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Jc=`vec3 transformedNormal = objectNormal;
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
#endif`,Qc=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,td=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ed=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,nd="gl_FragColor = linearToOutputTexel( gl_FragColor );",sd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rd=`#ifdef USE_ENVMAP
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
#endif`,ad=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,od=`#ifdef USE_ENVMAP
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
#endif`,ld=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hd=`#ifdef USE_ENVMAP
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
#endif`,cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ud=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pd=`#ifdef USE_GRADIENTMAP
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
}`,md=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_d=`uniform bool receiveShadow;
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
#endif`,Md=`#ifdef USE_ENVMAP
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
#endif`,vd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yd=`BlinnPhongMaterial material;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Td=`PhysicalMaterial material;
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
#endif`,Ed=`uniform sampler2D dfgLUT;
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
}`,wd=`
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
#endif`,Ad=`#if defined( RE_IndirectDiffuse )
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
#endif`,Rd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Pd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Id=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ld=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Nd=`#if defined( USE_POINTS_UV )
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
#endif`,Bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Od=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,kd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hd=`#ifdef USE_MORPHTARGETS
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
#endif`,Vd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Xd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$d=`#ifndef FLAT_SHADED
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
#endif`,jd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Qd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,iu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,su=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ru=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,au=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ou=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,hu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,du=`float getShadowMask() {
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
}`,uu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,fu=`#ifdef USE_SKINNING
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
#endif`,pu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mu=`#ifdef USE_SKINNING
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
#endif`,gu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_u=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vu=`#ifdef USE_TRANSMISSION
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
#endif`,bu=`#ifdef USE_TRANSMISSION
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
#endif`,yu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Eu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const wu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Au=`uniform sampler2D t2D;
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
}`,Ru=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Du=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Pu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iu=`#include <common>
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
}`,Lu=`#if DEPTH_PACKING == 3200
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
}`,Uu=`#define DISTANCE
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
}`,Fu=`#define DISTANCE
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
}`,Nu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ou=`uniform float scale;
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
}`,zu=`uniform vec3 diffuse;
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
}`,Gu=`#include <common>
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
}`,ku=`uniform vec3 diffuse;
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
}`,Hu=`#define LAMBERT
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
}`,Vu=`#define LAMBERT
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
}`,Wu=`#define MATCAP
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
}`,Xu=`#define MATCAP
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
}`,Zu=`#define NORMAL
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
}`,qu=`#define NORMAL
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
}`,$u=`#define PHONG
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
}`,ju=`#define STANDARD
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
}`,Ku=`#define STANDARD
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
}`,Ju=`#define TOON
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
}`,Qu=`#define TOON
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
}`,tf=`uniform float size;
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
}`,ef=`uniform vec3 diffuse;
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
}`,nf=`#include <common>
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
}`,sf=`uniform vec3 color;
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
}`,rf=`uniform float rotation;
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
}`,af=`uniform vec3 diffuse;
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
}`,zt={alphahash_fragment:Ac,alphahash_pars_fragment:Rc,alphamap_fragment:Cc,alphamap_pars_fragment:Dc,alphatest_fragment:Pc,alphatest_pars_fragment:Ic,aomap_fragment:Lc,aomap_pars_fragment:Uc,batching_pars_vertex:Fc,batching_vertex:Nc,begin_vertex:Bc,beginnormal_vertex:Oc,bsdfs:zc,iridescence_fragment:Gc,bumpmap_pars_fragment:kc,clipping_planes_fragment:Hc,clipping_planes_pars_fragment:Vc,clipping_planes_pars_vertex:Wc,clipping_planes_vertex:Xc,color_fragment:Zc,color_pars_fragment:qc,color_pars_vertex:$c,color_vertex:Yc,common:jc,cube_uv_reflection_fragment:Kc,defaultnormal_vertex:Jc,displacementmap_pars_vertex:Qc,displacementmap_vertex:td,emissivemap_fragment:ed,emissivemap_pars_fragment:id,colorspace_fragment:nd,colorspace_pars_fragment:sd,envmap_fragment:rd,envmap_common_pars_fragment:ad,envmap_pars_fragment:od,envmap_pars_vertex:ld,envmap_physical_pars_fragment:Md,envmap_vertex:hd,fog_vertex:cd,fog_pars_vertex:dd,fog_fragment:ud,fog_pars_fragment:fd,gradientmap_pars_fragment:pd,lightmap_pars_fragment:md,lights_lambert_fragment:gd,lights_lambert_pars_fragment:xd,lights_pars_begin:_d,lights_toon_fragment:vd,lights_toon_pars_fragment:bd,lights_phong_fragment:yd,lights_phong_pars_fragment:Sd,lights_physical_fragment:Td,lights_physical_pars_fragment:Ed,lights_fragment_begin:wd,lights_fragment_maps:Ad,lights_fragment_end:Rd,logdepthbuf_fragment:Cd,logdepthbuf_pars_fragment:Dd,logdepthbuf_pars_vertex:Pd,logdepthbuf_vertex:Id,map_fragment:Ld,map_pars_fragment:Ud,map_particle_fragment:Fd,map_particle_pars_fragment:Nd,metalnessmap_fragment:Bd,metalnessmap_pars_fragment:Od,morphinstance_vertex:zd,morphcolor_vertex:Gd,morphnormal_vertex:kd,morphtarget_pars_vertex:Hd,morphtarget_vertex:Vd,normal_fragment_begin:Wd,normal_fragment_maps:Xd,normal_pars_fragment:Zd,normal_pars_vertex:qd,normal_vertex:$d,normalmap_pars_fragment:Yd,clearcoat_normal_fragment_begin:jd,clearcoat_normal_fragment_maps:Kd,clearcoat_pars_fragment:Jd,iridescence_pars_fragment:Qd,opaque_fragment:tu,packing:eu,premultiplied_alpha_fragment:iu,project_vertex:nu,dithering_fragment:su,dithering_pars_fragment:ru,roughnessmap_fragment:au,roughnessmap_pars_fragment:ou,shadowmap_pars_fragment:lu,shadowmap_pars_vertex:hu,shadowmap_vertex:cu,shadowmask_pars_fragment:du,skinbase_vertex:uu,skinning_pars_vertex:fu,skinning_vertex:pu,skinnormal_vertex:mu,specularmap_fragment:gu,specularmap_pars_fragment:xu,tonemapping_fragment:_u,tonemapping_pars_fragment:Mu,transmission_fragment:vu,transmission_pars_fragment:bu,uv_pars_fragment:yu,uv_pars_vertex:Su,uv_vertex:Tu,worldpos_vertex:Eu,background_vert:wu,background_frag:Au,backgroundCube_vert:Ru,backgroundCube_frag:Cu,cube_vert:Du,cube_frag:Pu,depth_vert:Iu,depth_frag:Lu,distanceRGBA_vert:Uu,distanceRGBA_frag:Fu,equirect_vert:Nu,equirect_frag:Bu,linedashed_vert:Ou,linedashed_frag:zu,meshbasic_vert:Gu,meshbasic_frag:ku,meshlambert_vert:Hu,meshlambert_frag:Vu,meshmatcap_vert:Wu,meshmatcap_frag:Xu,meshnormal_vert:Zu,meshnormal_frag:qu,meshphong_vert:$u,meshphong_frag:Yu,meshphysical_vert:ju,meshphysical_frag:Ku,meshtoon_vert:Ju,meshtoon_frag:Qu,points_vert:tf,points_frag:ef,shadow_vert:nf,shadow_frag:sf,sprite_vert:rf,sprite_frag:af},at={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},fi={basic:{uniforms:Pe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:Pe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new pt(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:Pe([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:Pe([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:Pe([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new pt(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:Pe([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:Pe([at.points,at.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:Pe([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:Pe([at.common,at.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:Pe([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:Pe([at.sprite,at.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:Pe([at.common,at.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:Pe([at.lights,at.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};fi.physical={uniforms:Pe([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Ls={r:0,b:0,g:0},ji=new di,of=new jt;function lf(r,t,e,i,n,s,a){const o=new pt(0);let h=s===!0?0:1,l,c,d=null,u=0,m=null;function g(b){let E=b.isScene===!0?b.background:null;return E&&E.isTexture&&(E=(b.backgroundBlurriness>0?e:t).get(E)),E}function x(b){let E=!1;const R=g(b);R===null?p(o,h):R&&R.isColor&&(p(R,1),E=!0);const y=r.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(r.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function f(b,E){const R=g(E);R&&(R.isCubeTexture||R.mapping===Ys)?(c===void 0&&(c=new ne(new he(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:Un(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(y,A,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),ji.copy(E.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),c.material.uniforms.envMap.value=R,c.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(of.makeRotationFromEuler(ji)),c.material.toneMapped=$t.getTransfer(R.colorSpace)!==te,(d!==R||u!==R.version||m!==r.toneMapping)&&(c.material.needsUpdate=!0,d=R,u=R.version,m=r.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new ne(new Vi(2,2),new _i({name:"BackgroundMaterial",uniforms:Un(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=$t.getTransfer(R.colorSpace)!==te,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||u!==R.version||m!==r.toneMapping)&&(l.material.needsUpdate=!0,d=R,u=R.version,m=r.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,E){b.getRGB(Ls,bl(r)),i.buffers.color.setClear(Ls.r,Ls.g,Ls.b,E,a)}function S(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,E=1){o.set(b),h=E,p(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(b){h=b,p(o,h)},render:x,addToRenderList:f,dispose:S}}function hf(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=u(null);let s=n,a=!1;function o(v,P,L,O,k){let W=!1;const q=d(O,L,P);s!==q&&(s=q,l(s.object)),W=m(v,O,L,k),W&&g(v,O,L,k),k!==null&&t.update(k,r.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,E(v,P,L,O),k!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function h(){return r.createVertexArray()}function l(v){return r.bindVertexArray(v)}function c(v){return r.deleteVertexArray(v)}function d(v,P,L){const O=L.wireframe===!0;let k=i[v.id];k===void 0&&(k={},i[v.id]=k);let W=k[P.id];W===void 0&&(W={},k[P.id]=W);let q=W[O];return q===void 0&&(q=u(h()),W[O]=q),q}function u(v){const P=[],L=[],O=[];for(let k=0;k<e;k++)P[k]=0,L[k]=0,O[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:L,attributeDivisors:O,object:v,attributes:{},index:null}}function m(v,P,L,O){const k=s.attributes,W=P.attributes;let q=0;const J=L.getAttributes();for(const V in J)if(J[V].location>=0){const nt=k[V];let xt=W[V];if(xt===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(xt=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(xt=v.instanceColor)),nt===void 0||nt.attribute!==xt||xt&&nt.data!==xt.data)return!0;q++}return s.attributesNum!==q||s.index!==O}function g(v,P,L,O){const k={},W=P.attributes;let q=0;const J=L.getAttributes();for(const V in J)if(J[V].location>=0){let nt=W[V];nt===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(nt=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(nt=v.instanceColor));const xt={};xt.attribute=nt,nt&&nt.data&&(xt.data=nt.data),k[V]=xt,q++}s.attributes=k,s.attributesNum=q,s.index=O}function x(){const v=s.newAttributes;for(let P=0,L=v.length;P<L;P++)v[P]=0}function f(v){p(v,0)}function p(v,P){const L=s.newAttributes,O=s.enabledAttributes,k=s.attributeDivisors;L[v]=1,O[v]===0&&(r.enableVertexAttribArray(v),O[v]=1),k[v]!==P&&(r.vertexAttribDivisor(v,P),k[v]=P)}function S(){const v=s.newAttributes,P=s.enabledAttributes;for(let L=0,O=P.length;L<O;L++)P[L]!==v[L]&&(r.disableVertexAttribArray(L),P[L]=0)}function b(v,P,L,O,k,W,q){q===!0?r.vertexAttribIPointer(v,P,L,k,W):r.vertexAttribPointer(v,P,L,O,k,W)}function E(v,P,L,O){x();const k=O.attributes,W=L.getAttributes(),q=P.defaultAttributeValues;for(const J in W){const V=W[J];if(V.location>=0){let et=k[J];if(et===void 0&&(J==="instanceMatrix"&&v.instanceMatrix&&(et=v.instanceMatrix),J==="instanceColor"&&v.instanceColor&&(et=v.instanceColor)),et!==void 0){const nt=et.normalized,xt=et.itemSize,Nt=t.get(et);if(Nt===void 0)continue;const Gt=Nt.buffer,_t=Nt.type,Kt=Nt.bytesPerElement,X=_t===r.INT||_t===r.UNSIGNED_INT||et.gpuType===Ca;if(et.isInterleavedBufferAttribute){const Y=et.data,dt=Y.stride,Ut=et.offset;if(Y.isInstancedInterleavedBuffer){for(let St=0;St<V.locationSize;St++)p(V.location+St,Y.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let St=0;St<V.locationSize;St++)f(V.location+St);r.bindBuffer(r.ARRAY_BUFFER,Gt);for(let St=0;St<V.locationSize;St++)b(V.location+St,xt/V.locationSize,_t,nt,dt*Kt,(Ut+xt/V.locationSize*St)*Kt,X)}else{if(et.isInstancedBufferAttribute){for(let Y=0;Y<V.locationSize;Y++)p(V.location+Y,et.meshPerAttribute);v.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Y=0;Y<V.locationSize;Y++)f(V.location+Y);r.bindBuffer(r.ARRAY_BUFFER,Gt);for(let Y=0;Y<V.locationSize;Y++)b(V.location+Y,xt/V.locationSize,_t,nt,xt*Kt,xt/V.locationSize*Y*Kt,X)}}else if(q!==void 0){const nt=q[J];if(nt!==void 0)switch(nt.length){case 2:r.vertexAttrib2fv(V.location,nt);break;case 3:r.vertexAttrib3fv(V.location,nt);break;case 4:r.vertexAttrib4fv(V.location,nt);break;default:r.vertexAttrib1fv(V.location,nt)}}}}S()}function R(){U();for(const v in i){const P=i[v];for(const L in P){const O=P[L];for(const k in O)c(O[k].object),delete O[k];delete P[L]}delete i[v]}}function y(v){if(i[v.id]===void 0)return;const P=i[v.id];for(const L in P){const O=P[L];for(const k in O)c(O[k].object),delete O[k];delete P[L]}delete i[v.id]}function A(v){for(const P in i){const L=i[P];if(L[v.id]===void 0)continue;const O=L[v.id];for(const k in O)c(O[k].object),delete O[k];delete L[v.id]}}function U(){T(),a=!0,s!==n&&(s=n,l(s.object))}function T(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:U,resetDefaultState:T,dispose:R,releaseStatesOfGeometry:y,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:f,disableUnusedAttributes:S}}function cf(r,t,e){let i;function n(l){i=l}function s(l,c){r.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,d){d!==0&&(r.drawArraysInstanced(i,l,c,d),e.update(c,i,d))}function o(l,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let m=0;for(let g=0;g<d;g++)m+=c[g];e.update(m,i,1)}function h(l,c,d,u){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],c[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,c,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=c[x]*u[x];e.update(g,i,1)}}this.setMode=n,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function df(r,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==li&&i.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const U=A===Fn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==xi&&i.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mi&&!U)}function h(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=h(l);c!==l&&(Lt("WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),f=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),b=r.getParameter(r.MAX_VARYING_VECTORS),E=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,y=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:E,vertexTextures:R,maxSamples:y}}function uf(r){const t=this;let e=null,i=0,n=!1,s=!1;const a=new Qe,o=new Ot,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||i!==0||n;return n=u,i=d.length,m},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=c(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,x=d.clipIntersection,f=d.clipShadows,p=r.get(d);if(!n||g===null||g.length===0||s&&!f)s?c(null):l();else{const S=s?0:i,b=S*4;let E=p.clippingState||null;h.value=E,E=c(g,u,b,m);for(let R=0;R!==b;++R)E[R]=e[R];p.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){h.value!==e&&(h.value=e,h.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(d,u,m,g){const x=d!==null?d.length:0;let f=null;if(x!==0){if(f=h.value,g!==!0||f===null){const p=m+x*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(f===null||f.length<p)&&(f=new Float32Array(p));for(let b=0,E=m;b!==x;++b,E+=4)a.copy(d[b]).applyMatrix4(S,o),a.normal.toArray(f,E),f[E+3]=a.constant}h.value=f,h.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,f}}function ff(r){let t=new WeakMap;function e(a,o){return o===Wr?a.mapping=Pn:o===Xr&&(a.mapping=In),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Wr||o===Xr)if(t.has(a)){const h=t.get(a).texture;return e(h,a.mapping)}else{const h=a.image;if(h&&h.height>0){const l=new sc(h.height);return l.fromEquirectangularTexture(r,a),t.set(a,l),a.addEventListener("dispose",n),e(l.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const h=t.get(o);h!==void 0&&(t.delete(o),h.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const zi=4,Fo=[.125,.215,.35,.446,.526,.582],Qi=20,pf=256,$n=new Ga,No=new pt;let Rr=null,Cr=0,Dr=0,Pr=!1;const mf=new I;class Bo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,s={}){const{size:a=256,position:o=mf}=s;Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(t,i,n,h,o),e>0&&this._blur(h,0,0,e),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Go(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Rr,Cr,Dr),this._renderer.xr.enabled=Pr,t.scissorTest=!1,wn(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pn||t.mapping===In?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Fn,format:li,colorSpace:Ln,depthBuffer:!1},n=Oo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oo(t,e,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=gf(s)),this._blurMaterial=_f(s,t,e),this._ggxMaterial=xf(s,t,e)}return n}_compileMaterial(t){const e=new ne(new Fe,t);this._renderer.compile(e,$n)}_sceneToCubeUV(t,e,i,n,s){const h=new oi(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,m=d.toneMapping;d.getClearColor(No),d.toneMapping=Gi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ne(new he,new es({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,f=x.material;let p=!1;const S=t.background;S?S.isColor&&(f.color.copy(S),t.background=null,p=!0):(f.color.copy(No),p=!0);for(let b=0;b<6;b++){const E=b%3;E===0?(h.up.set(0,l[b],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x+c[b],s.y,s.z)):E===1?(h.up.set(0,0,l[b]),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y+c[b],s.z)):(h.up.set(0,l[b],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y,s.z+c[b]));const R=this._cubeSize;wn(n,E*R,b>2?R:0,R,R),d.setRenderTarget(n),p&&d.render(x,h),d.render(t,h)}d.toneMapping=m,d.autoClear=u,t.background=S}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Pn||t.mapping===In;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Go()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zo());const s=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const h=this._cubeSize;wn(e,0,0,3*h,2*h),i.setRenderTarget(e),i.render(a,$n)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const h=a.uniforms,l=i/(this._lodMeshes.length-1),c=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-c*c),u=.05+l*.95,m=d*u,{_lodMax:g}=this,x=this._sizeLods[i],f=3*x*(i>g-zi?i-g+zi:0),p=4*(this._cubeSize-x);h.envMap.value=t.texture,h.roughness.value=m,h.mipInt.value=g-e,wn(s,f,p,3*x,2*x),n.setRenderTarget(s),n.render(o,$n),h.envMap.value=s.texture,h.roughness.value=0,h.mipInt.value=g-i,wn(t,f,p,3*x,2*x),n.setRenderTarget(t),n.render(o,$n)}_blur(t,e,i,n,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",s),this._halfBlur(a,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const c=3,d=this._lodMeshes[n];d.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Qi-1),x=s/g,f=isFinite(s)?1+Math.floor(c*x):Qi;f>Qi&&Lt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Qi}`);const p=[];let S=0;for(let A=0;A<Qi;++A){const U=A/x,T=Math.exp(-U*U/2);p.push(T),A===0?S+=T:A<f&&(S+=2*T)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;u.envMap.value=t.texture,u.samples.value=f,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;const E=this._sizeLods[n],R=3*E*(n>b-zi?n-b+zi:0),y=4*(this._cubeSize-E);wn(e,R,y,3*E,2*E),h.setRenderTarget(e),h.render(d,$n)}}function gf(r){const t=[],e=[],i=[];let n=r;const s=r-zi+1+Fo.length;for(let a=0;a<s;a++){const o=Math.pow(2,n);t.push(o);let h=1/o;a>r-zi?h=Fo[a-r+zi-1]:a===0&&(h=0),e.push(h);const l=1/(o-2),c=-l,d=1+l,u=[c,c,d,c,d,d,c,c,d,d,c,d],m=6,g=6,x=3,f=2,p=1,S=new Float32Array(x*g*m),b=new Float32Array(f*g*m),E=new Float32Array(p*g*m);for(let y=0;y<m;y++){const A=y%3*2/3-1,U=y>2?0:-1,T=[A,U,0,A+2/3,U,0,A+2/3,U+1,0,A,U,0,A+2/3,U+1,0,A,U+1,0];S.set(T,x*g*y),b.set(u,f*g*y);const v=[y,y,y,y,y,y];E.set(v,p*g*y)}const R=new Fe;R.setAttribute("position",new Ge(S,x)),R.setAttribute("uv",new Ge(b,f)),R.setAttribute("faceIndex",new Ge(E,p)),i.push(new ne(R,null)),n>zi&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Oo(r,t,e){const i=new sn(r,t,e);return i.texture.mapping=Ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wn(r,t,e,i,n){r.viewport.set(t,e,i,n),r.scissor.set(t,e,i,n)}function xf(r,t,e){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:pf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function _f(r,t,e){const i=new Float32Array(Qi),n=new I(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Qi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function zo(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ai,depthTest:!1,depthWrite:!1})}function Go(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

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
	`}function Mf(r){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const h=o.mapping,l=h===Wr||h===Xr,c=h===Pn||h===In;if(l||c){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new Bo(r)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return l&&m&&m.height>0||c&&m&&n(m)?(e===null&&(e=new Bo(r)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function n(o){let h=0;const l=6;for(let c=0;c<l;c++)o[c]!==void 0&&h++;return h===l}function s(o){const h=o.target;h.removeEventListener("dispose",s);const l=t.get(h);l!==void 0&&(t.delete(h),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function vf(r){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=r.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&ts("WebGLRenderer: "+i+" extension not supported."),n}}}function bf(r,t,e,i){const n={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete n[u.id];const m=s.get(u);m&&(t.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",a),n[u.id]=!0,e.memory.geometries++),u}function h(d){const u=d.attributes;for(const m in u)t.update(u[m],r.ARRAY_BUFFER)}function l(d){const u=[],m=d.index,g=d.attributes.position;let x=0;if(m!==null){const S=m.array;x=m.version;for(let b=0,E=S.length;b<E;b+=3){const R=S[b+0],y=S[b+1],A=S[b+2];u.push(R,y,y,A,A,R)}}else if(g!==void 0){const S=g.array;x=g.version;for(let b=0,E=S.length/3-1;b<E;b+=3){const R=b+0,y=b+1,A=b+2;u.push(R,y,y,A,A,R)}}else return;const f=new(gl(u)?vl:Ml)(u,1);f.version=x;const p=s.get(d);p&&t.remove(p),s.set(d,f)}function c(d){const u=s.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:h,getWireframeAttribute:c}}function yf(r,t,e){let i;function n(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function h(u,m){r.drawElements(i,m,s,u*a),e.update(m,i,1)}function l(u,m,g){g!==0&&(r.drawElementsInstanced(i,m,s,u*a,g),e.update(m,i,g))}function c(u,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,u,0,g);let f=0;for(let p=0;p<g;p++)f+=m[p];e.update(f,i,1)}function d(u,m,g,x){if(g===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<u.length;p++)l(u[p]/a,m[p],x[p]);else{f.multiDrawElementsInstancedWEBGL(i,m,0,s,u,0,x,0,g);let p=0;for(let S=0;S<g;S++)p+=m[S]*x[S];e.update(p,i,1)}}this.setMode=n,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=c,this.renderMultiDrawInstances=d}function Sf(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:fe("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Tf(r,t,e){const i=new WeakMap,n=new ge;function s(a,o,h){const l=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=c!==void 0?c.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let v=function(){U.dispose(),i.delete(o),o.removeEventListener("dispose",v)};var m=v;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),f===!0&&(E=3);let R=o.attributes.position.count*E,y=1;R>t.maxTextureSize&&(y=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const A=new Float32Array(R*y*4*d),U=new xl(A,R,y,d);U.type=mi,U.needsUpdate=!0;const T=E*4;for(let P=0;P<d;P++){const L=p[P],O=S[P],k=b[P],W=R*y*4*P;for(let q=0;q<L.count;q++){const J=q*T;g===!0&&(n.fromBufferAttribute(L,q),A[W+J+0]=n.x,A[W+J+1]=n.y,A[W+J+2]=n.z,A[W+J+3]=0),x===!0&&(n.fromBufferAttribute(O,q),A[W+J+4]=n.x,A[W+J+5]=n.y,A[W+J+6]=n.z,A[W+J+7]=0),f===!0&&(n.fromBufferAttribute(k,q),A[W+J+8]=n.x,A[W+J+9]=n.y,A[W+J+10]=n.z,A[W+J+11]=k.itemSize===4?n.w:1)}}u={count:d,texture:U,size:new yt(R,y)},i.set(o,u),o.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let g=0;for(let f=0;f<l.length;f++)g+=l[f];const x=o.morphTargetsRelative?1:1-g;h.getUniforms().setValue(r,"morphTargetBaseInfluence",x),h.getUniforms().setValue(r,"morphTargetInfluences",l)}h.getUniforms().setValue(r,"morphTargetsTexture",u.texture,e),h.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function Ef(r,t,e,i){let n=new WeakMap;function s(h){const l=i.render.frame,c=h.geometry,d=t.get(h,c);if(n.get(d)!==l&&(t.update(d),n.set(d,l)),h.isInstancedMesh&&(h.hasEventListener("dispose",o)===!1&&h.addEventListener("dispose",o),n.get(h)!==l&&(e.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,r.ARRAY_BUFFER),n.set(h,l))),h.isSkinnedMesh){const u=h.skeleton;n.get(u)!==l&&(u.update(),n.set(u,l))}return d}function a(){n=new WeakMap}function o(h){const l=h.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:a}}const Ll=new Re,ko=new Cl(1,1),Ul=new xl,Fl=new kh,Nl=new Sl,Ho=[],Vo=[],Wo=new Float32Array(16),Xo=new Float32Array(9),Zo=new Float32Array(4);function Nn(r,t,e){const i=r[0];if(i<=0||i>0)return r;const n=t*e;let s=Ho[n];if(s===void 0&&(s=new Float32Array(n),Ho[n]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function ve(r,t){if(r.length!==t.length)return!1;for(let e=0,i=r.length;e<i;e++)if(r[e]!==t[e])return!1;return!0}function be(r,t){for(let e=0,i=t.length;e<i;e++)r[e]=t[e]}function Ks(r,t){let e=Vo[t];e===void 0&&(e=new Int32Array(t),Vo[t]=e);for(let i=0;i!==t;++i)e[i]=r.allocateTextureUnit();return e}function wf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Af(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;r.uniform2fv(this.addr,t),be(e,t)}}function Rf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ve(e,t))return;r.uniform3fv(this.addr,t),be(e,t)}}function Cf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;r.uniform4fv(this.addr,t),be(e,t)}}function Df(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(ve(e,i))return;Zo.set(i),r.uniformMatrix2fv(this.addr,!1,Zo),be(e,i)}}function Pf(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(ve(e,i))return;Xo.set(i),r.uniformMatrix3fv(this.addr,!1,Xo),be(e,i)}}function If(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(ve(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(ve(e,i))return;Wo.set(i),r.uniformMatrix4fv(this.addr,!1,Wo),be(e,i)}}function Lf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Uf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;r.uniform2iv(this.addr,t),be(e,t)}}function Ff(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;r.uniform3iv(this.addr,t),be(e,t)}}function Nf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;r.uniform4iv(this.addr,t),be(e,t)}}function Bf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Of(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ve(e,t))return;r.uniform2uiv(this.addr,t),be(e,t)}}function zf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ve(e,t))return;r.uniform3uiv(this.addr,t),be(e,t)}}function Gf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ve(e,t))return;r.uniform4uiv(this.addr,t),be(e,t)}}function kf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(ko.compareFunction=ml,s=ko):s=Ll,e.setTexture2D(t||s,n)}function Hf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Fl,n)}function Vf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Nl,n)}function Wf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Ul,n)}function Xf(r){switch(r){case 5126:return wf;case 35664:return Af;case 35665:return Rf;case 35666:return Cf;case 35674:return Df;case 35675:return Pf;case 35676:return If;case 5124:case 35670:return Lf;case 35667:case 35671:return Uf;case 35668:case 35672:return Ff;case 35669:case 35673:return Nf;case 5125:return Bf;case 36294:return Of;case 36295:return zf;case 36296:return Gf;case 35678:case 36198:case 36298:case 36306:case 35682:return kf;case 35679:case 36299:case 36307:return Hf;case 35680:case 36300:case 36308:case 36293:return Vf;case 36289:case 36303:case 36311:case 36292:return Wf}}function Zf(r,t){r.uniform1fv(this.addr,t)}function qf(r,t){const e=Nn(t,this.size,2);r.uniform2fv(this.addr,e)}function $f(r,t){const e=Nn(t,this.size,3);r.uniform3fv(this.addr,e)}function Yf(r,t){const e=Nn(t,this.size,4);r.uniform4fv(this.addr,e)}function jf(r,t){const e=Nn(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Kf(r,t){const e=Nn(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Jf(r,t){const e=Nn(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function Qf(r,t){r.uniform1iv(this.addr,t)}function tp(r,t){r.uniform2iv(this.addr,t)}function ep(r,t){r.uniform3iv(this.addr,t)}function ip(r,t){r.uniform4iv(this.addr,t)}function np(r,t){r.uniform1uiv(this.addr,t)}function sp(r,t){r.uniform2uiv(this.addr,t)}function rp(r,t){r.uniform3uiv(this.addr,t)}function ap(r,t){r.uniform4uiv(this.addr,t)}function op(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ve(i,s)||(r.uniform1iv(this.addr,s),be(i,s));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Ll,s[a])}function lp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ve(i,s)||(r.uniform1iv(this.addr,s),be(i,s));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||Fl,s[a])}function hp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ve(i,s)||(r.uniform1iv(this.addr,s),be(i,s));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Nl,s[a])}function cp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ve(i,s)||(r.uniform1iv(this.addr,s),be(i,s));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Ul,s[a])}function dp(r){switch(r){case 5126:return Zf;case 35664:return qf;case 35665:return $f;case 35666:return Yf;case 35674:return jf;case 35675:return Kf;case 35676:return Jf;case 5124:case 35670:return Qf;case 35667:case 35671:return tp;case 35668:case 35672:return ep;case 35669:case 35673:return ip;case 5125:return np;case 36294:return sp;case 36295:return rp;case 36296:return ap;case 35678:case 36198:case 36298:case 36306:case 35682:return op;case 35679:case 36299:case 36307:return lp;case 35680:case 36300:case 36308:case 36293:return hp;case 36289:case 36303:case 36311:case 36292:return cp}}class up{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Xf(e.type)}}class fp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=dp(e.type)}}class pp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,a=n.length;s!==a;++s){const o=n[s];o.setValue(t,e[o.id],i)}}}const Ir=/(\w+)(\])?(\[|\.)?/g;function qo(r,t){r.seq.push(t),r.map[t.id]=t}function mp(r,t,e){const i=r.name,n=i.length;for(Ir.lastIndex=0;;){const s=Ir.exec(i),a=Ir.lastIndex;let o=s[1];const h=s[2]==="]",l=s[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===n){qo(e,l===void 0?new up(o,r,t):new fp(o,r,t));break}else{let d=e.map[o];d===void 0&&(d=new pp(o),qo(e,d)),e=d}}}class ks{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),a=t.getUniformLocation(e,s.name);mp(s,a,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,a=e.length;s!==a;++s){const o=e[s],h=i[o.id];h.needsUpdate!==!1&&o.setValue(t,h.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function $o(r,t,e){const i=r.createShader(t);return r.shaderSource(i,e),r.compileShader(i),i}const gp=37297;let xp=0;function _p(r,t){const e=r.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=n;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Yo=new Ot;function Mp(r){$t._getMatrix(Yo,$t.workingColorSpace,r);const t=`mat3( ${Yo.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(r)){case Hs:return[t,"LinearTransferOETF"];case te:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function jo(r,t,e){const i=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+_p(r.getShaderSource(t),o)}else return s}function vp(r,t){const e=Mp(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function bp(r,t){let e;switch(t){case ph:e="Linear";break;case mh:e="Reinhard";break;case gh:e="Cineon";break;case xh:e="ACESFilmic";break;case Mh:e="AgX";break;case vh:e="Neutral";break;case _h:e="Custom";break;default:Lt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Us=new I;function yp(){$t.getLuminanceCoefficients(Us);const r=Us.x.toFixed(4),t=Us.y.toFixed(4),e=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Sp(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Yn).join(`
`)}function Tp(r){const t=[];for(const e in r){const i=r[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ep(r,t){const e={},i=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=r.getActiveAttrib(t,n),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function Yn(r){return r!==""}function Ko(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Jo(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const wp=/^[ \t]*#include +<([\w\d./]+)>/gm;function wa(r){return r.replace(wp,Rp)}const Ap=new Map;function Rp(r,t){let e=zt[t];if(e===void 0){const i=Ap.get(t);if(i!==void 0)e=zt[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return wa(e)}const Cp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qo(r){return r.replace(Cp,Dp)}function Dp(r,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function tl(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function Pp(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===ol?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===ql?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function Ip(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Pn:case In:t="ENVMAP_TYPE_CUBE";break;case Ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Lp(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case In:t="ENVMAP_MODE_REFRACTION";break}return t}function Up(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ra:t="ENVMAP_BLENDING_MULTIPLY";break;case uh:t="ENVMAP_BLENDING_MIX";break;case fh:t="ENVMAP_BLENDING_ADD";break}return t}function Fp(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Np(r,t,e,i){const n=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const h=Pp(e),l=Ip(e),c=Lp(e),d=Up(e),u=Fp(e),m=Sp(e),g=Tp(s),x=n.createProgram();let f,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yn).join(`
`),f.length>0&&(f+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Yn).join(`
`),p.length>0&&(p+=`
`)):(f=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yn).join(`
`),p=[tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gi?"#define TONE_MAPPING":"",e.toneMapping!==Gi?zt.tonemapping_pars_fragment:"",e.toneMapping!==Gi?bp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,vp("linearToOutputTexel",e.outputColorSpace),yp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yn).join(`
`)),a=wa(a),a=Ko(a,e),a=Jo(a,e),o=wa(o),o=Ko(o,e),o=Jo(o,e),a=Qo(a),o=Qo(o),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,p=["#define varying in",e.glslVersion===Qa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=S+f+a,E=S+p+o,R=$o(n,n.VERTEX_SHADER,b),y=$o(n,n.FRAGMENT_SHADER,E);n.attachShader(x,R),n.attachShader(x,y),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function A(P){if(r.debug.checkShaderErrors){const L=n.getProgramInfoLog(x)||"",O=n.getShaderInfoLog(R)||"",k=n.getShaderInfoLog(y)||"",W=L.trim(),q=O.trim(),J=k.trim();let V=!0,et=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(V=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,x,R,y);else{const nt=jo(n,R,"vertex"),xt=jo(n,y,"fragment");fe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+W+`
`+nt+`
`+xt)}else W!==""?Lt("WebGLProgram: Program Info Log:",W):(q===""||J==="")&&(et=!1);et&&(P.diagnostics={runnable:V,programLog:W,vertexShader:{log:q,prefix:f},fragmentShader:{log:J,prefix:p}})}n.deleteShader(R),n.deleteShader(y),U=new ks(n,x),T=Ep(n,x)}let U;this.getUniforms=function(){return U===void 0&&A(this),U};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=n.getProgramParameter(x,gp)),v},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=xp++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=R,this.fragmentShader=y,this}let Bp=0;class Op{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new zp(t),e.set(t,i)),i}}class zp{constructor(t){this.id=Bp++,this.code=t,this.usedTimes=0}}function Gp(r,t,e,i,n,s,a){const o=new za,h=new Op,l=new Set,c=[],d=n.logarithmicDepthBuffer,u=n.vertexTextures;let m=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return l.add(T),T===0?"uv":`uv${T}`}function f(T,v,P,L,O){const k=L.fog,W=O.geometry,q=T.isMeshStandardMaterial?L.environment:null,J=(T.isMeshStandardMaterial?e:t).get(T.envMap||q),V=J&&J.mapping===Ys?J.image.height:null,et=g[T.type];T.precision!==null&&(m=n.getMaxPrecision(T.precision),m!==T.precision&&Lt("WebGLProgram.getParameters:",T.precision,"not supported, using",m,"instead."));const nt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,xt=nt!==void 0?nt.length:0;let Nt=0;W.morphAttributes.position!==void 0&&(Nt=1),W.morphAttributes.normal!==void 0&&(Nt=2),W.morphAttributes.color!==void 0&&(Nt=3);let Gt,_t,Kt,X;if(et){const Jt=fi[et];Gt=Jt.vertexShader,_t=Jt.fragmentShader}else Gt=T.vertexShader,_t=T.fragmentShader,h.update(T),Kt=h.getVertexShaderID(T),X=h.getFragmentShaderID(T);const Y=r.getRenderTarget(),dt=r.state.buffers.depth.getReversed(),Ut=O.isInstancedMesh===!0,St=O.isBatchedMesh===!0,Vt=!!T.map,Te=!!T.matcap,kt=!!J,le=!!T.aoMap,C=!!T.lightMap,Wt=!!T.bumpMap,Xt=!!T.normalMap,re=!!T.displacementMap,Mt=!!T.emissiveMap,ce=!!T.metalnessMap,Et=!!T.roughnessMap,Bt=T.anisotropy>0,w=T.clearcoat>0,_=T.dispersion>0,B=T.iridescence>0,Z=T.sheen>0,j=T.transmission>0,H=Bt&&!!T.anisotropyMap,bt=w&&!!T.clearcoatMap,ot=w&&!!T.clearcoatNormalMap,wt=w&&!!T.clearcoatRoughnessMap,vt=B&&!!T.iridescenceMap,K=B&&!!T.iridescenceThicknessMap,it=Z&&!!T.sheenColorMap,Dt=Z&&!!T.sheenRoughnessMap,Rt=!!T.specularMap,ct=!!T.specularColorMap,It=!!T.specularIntensityMap,D=j&&!!T.transmissionMap,lt=j&&!!T.thicknessMap,st=!!T.gradientMap,rt=!!T.alphaMap,Q=T.alphaTest>0,$=!!T.alphaHash,mt=!!T.extensions;let Ft=Gi;T.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ft=r.toneMapping);const ae={shaderID:et,shaderType:T.type,shaderName:T.name,vertexShader:Gt,fragmentShader:_t,defines:T.defines,customVertexShaderID:Kt,customFragmentShaderID:X,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:m,batching:St,batchingColor:St&&O._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&O.instanceColor!==null,instancingMorph:Ut&&O.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Y===null?r.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:Ln,alphaToCoverage:!!T.alphaToCoverage,map:Vt,matcap:Te,envMap:kt,envMapMode:kt&&J.mapping,envMapCubeUVHeight:V,aoMap:le,lightMap:C,bumpMap:Wt,normalMap:Xt,displacementMap:u&&re,emissiveMap:Mt,normalMapObjectSpace:Xt&&T.normalMapType===Th,normalMapTangentSpace:Xt&&T.normalMapType===Ba,metalnessMap:ce,roughnessMap:Et,anisotropy:Bt,anisotropyMap:H,clearcoat:w,clearcoatMap:bt,clearcoatNormalMap:ot,clearcoatRoughnessMap:wt,dispersion:_,iridescence:B,iridescenceMap:vt,iridescenceThicknessMap:K,sheen:Z,sheenColorMap:it,sheenRoughnessMap:Dt,specularMap:Rt,specularColorMap:ct,specularIntensityMap:It,transmission:j,transmissionMap:D,thicknessMap:lt,gradientMap:st,opaque:T.transparent===!1&&T.blending===tn&&T.alphaToCoverage===!1,alphaMap:rt,alphaTest:Q,alphaHash:$,combine:T.combine,mapUv:Vt&&x(T.map.channel),aoMapUv:le&&x(T.aoMap.channel),lightMapUv:C&&x(T.lightMap.channel),bumpMapUv:Wt&&x(T.bumpMap.channel),normalMapUv:Xt&&x(T.normalMap.channel),displacementMapUv:re&&x(T.displacementMap.channel),emissiveMapUv:Mt&&x(T.emissiveMap.channel),metalnessMapUv:ce&&x(T.metalnessMap.channel),roughnessMapUv:Et&&x(T.roughnessMap.channel),anisotropyMapUv:H&&x(T.anisotropyMap.channel),clearcoatMapUv:bt&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:ot&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:vt&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:it&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&x(T.sheenRoughnessMap.channel),specularMapUv:Rt&&x(T.specularMap.channel),specularColorMapUv:ct&&x(T.specularColorMap.channel),specularIntensityMapUv:It&&x(T.specularIntensityMap.channel),transmissionMapUv:D&&x(T.transmissionMap.channel),thicknessMapUv:lt&&x(T.thicknessMap.channel),alphaMapUv:rt&&x(T.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Xt||Bt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(Vt||rt),fog:!!k,useFog:T.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:dt,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Nt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:T.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Vt&&T.map.isVideoTexture===!0&&$t.getTransfer(T.map.colorSpace)===te,decodeVideoTextureEmissive:Mt&&T.emissiveMap.isVideoTexture===!0&&$t.getTransfer(T.emissiveMap.colorSpace)===te,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Ye,flipSided:T.side===ze,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:mt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&T.extensions.multiDraw===!0||St)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ae.vertexUv1s=l.has(1),ae.vertexUv2s=l.has(2),ae.vertexUv3s=l.has(3),l.clear(),ae}function p(T){const v=[];if(T.shaderID?v.push(T.shaderID):(v.push(T.customVertexShaderID),v.push(T.customFragmentShaderID)),T.defines!==void 0)for(const P in T.defines)v.push(P),v.push(T.defines[P]);return T.isRawShaderMaterial===!1&&(S(v,T),b(v,T),v.push(r.outputColorSpace)),v.push(T.customProgramCacheKey),v.join()}function S(T,v){T.push(v.precision),T.push(v.outputColorSpace),T.push(v.envMapMode),T.push(v.envMapCubeUVHeight),T.push(v.mapUv),T.push(v.alphaMapUv),T.push(v.lightMapUv),T.push(v.aoMapUv),T.push(v.bumpMapUv),T.push(v.normalMapUv),T.push(v.displacementMapUv),T.push(v.emissiveMapUv),T.push(v.metalnessMapUv),T.push(v.roughnessMapUv),T.push(v.anisotropyMapUv),T.push(v.clearcoatMapUv),T.push(v.clearcoatNormalMapUv),T.push(v.clearcoatRoughnessMapUv),T.push(v.iridescenceMapUv),T.push(v.iridescenceThicknessMapUv),T.push(v.sheenColorMapUv),T.push(v.sheenRoughnessMapUv),T.push(v.specularMapUv),T.push(v.specularColorMapUv),T.push(v.specularIntensityMapUv),T.push(v.transmissionMapUv),T.push(v.thicknessMapUv),T.push(v.combine),T.push(v.fogExp2),T.push(v.sizeAttenuation),T.push(v.morphTargetsCount),T.push(v.morphAttributeCount),T.push(v.numDirLights),T.push(v.numPointLights),T.push(v.numSpotLights),T.push(v.numSpotLightMaps),T.push(v.numHemiLights),T.push(v.numRectAreaLights),T.push(v.numDirLightShadows),T.push(v.numPointLightShadows),T.push(v.numSpotLightShadows),T.push(v.numSpotLightShadowsWithMaps),T.push(v.numLightProbes),T.push(v.shadowMapType),T.push(v.toneMapping),T.push(v.numClippingPlanes),T.push(v.numClipIntersection),T.push(v.depthPacking)}function b(T,v){o.disableAll(),v.supportsVertexTextures&&o.enable(0),v.instancing&&o.enable(1),v.instancingColor&&o.enable(2),v.instancingMorph&&o.enable(3),v.matcap&&o.enable(4),v.envMap&&o.enable(5),v.normalMapObjectSpace&&o.enable(6),v.normalMapTangentSpace&&o.enable(7),v.clearcoat&&o.enable(8),v.iridescence&&o.enable(9),v.alphaTest&&o.enable(10),v.vertexColors&&o.enable(11),v.vertexAlphas&&o.enable(12),v.vertexUv1s&&o.enable(13),v.vertexUv2s&&o.enable(14),v.vertexUv3s&&o.enable(15),v.vertexTangents&&o.enable(16),v.anisotropy&&o.enable(17),v.alphaHash&&o.enable(18),v.batching&&o.enable(19),v.dispersion&&o.enable(20),v.batchingColor&&o.enable(21),v.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),v.fog&&o.enable(0),v.useFog&&o.enable(1),v.flatShading&&o.enable(2),v.logarithmicDepthBuffer&&o.enable(3),v.reversedDepthBuffer&&o.enable(4),v.skinning&&o.enable(5),v.morphTargets&&o.enable(6),v.morphNormals&&o.enable(7),v.morphColors&&o.enable(8),v.premultipliedAlpha&&o.enable(9),v.shadowMapEnabled&&o.enable(10),v.doubleSided&&o.enable(11),v.flipSided&&o.enable(12),v.useDepthPacking&&o.enable(13),v.dithering&&o.enable(14),v.transmission&&o.enable(15),v.sheen&&o.enable(16),v.opaque&&o.enable(17),v.pointsUvs&&o.enable(18),v.decodeVideoTexture&&o.enable(19),v.decodeVideoTextureEmissive&&o.enable(20),v.alphaToCoverage&&o.enable(21),T.push(o.mask)}function E(T){const v=g[T.type];let P;if(v){const L=fi[v];P=tc.clone(L.uniforms)}else P=T.uniforms;return P}function R(T,v){let P;for(let L=0,O=c.length;L<O;L++){const k=c[L];if(k.cacheKey===v){P=k,++P.usedTimes;break}}return P===void 0&&(P=new Np(r,v,T,s),c.push(P)),P}function y(T){if(--T.usedTimes===0){const v=c.indexOf(T);c[v]=c[c.length-1],c.pop(),T.destroy()}}function A(T){h.remove(T)}function U(){h.dispose()}return{getParameters:f,getProgramCacheKey:p,getUniforms:E,acquireProgram:R,releaseProgram:y,releaseShaderCache:A,programs:c,dispose:U}}function kp(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function i(a){r.delete(a)}function n(a,o,h){r.get(a)[o]=h}function s(){r=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function Hp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function el(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function il(){const r=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function a(d,u,m,g,x,f){let p=r[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:x,group:f},r[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=m,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=f),t++,p}function o(d,u,m,g,x,f){const p=a(d,u,m,g,x,f);m.transmission>0?i.push(p):m.transparent===!0?n.push(p):e.push(p)}function h(d,u,m,g,x,f){const p=a(d,u,m,g,x,f);m.transmission>0?i.unshift(p):m.transparent===!0?n.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||Hp),i.length>1&&i.sort(u||el),n.length>1&&n.sort(u||el)}function c(){for(let d=t,u=r.length;d<u;d++){const m=r[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:o,unshift:h,finish:c,sort:l}}function Vp(){let r=new WeakMap;function t(i,n){const s=r.get(i);let a;return s===void 0?(a=new il,r.set(i,[a])):n>=s.length?(a=new il,s.push(a)):a=s[n],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function Wp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new pt};break;case"SpotLight":e={position:new I,direction:new I,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new pt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":e={color:new pt,position:new I,halfWidth:new I,halfHeight:new I};break}return r[t.id]=e,e}}}function Xp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Zp=0;function qp(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function $p(r){const t=new Wp,e=Xp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const n=new I,s=new jt,a=new jt;function o(l){let c=0,d=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let m=0,g=0,x=0,f=0,p=0,S=0,b=0,E=0,R=0,y=0,A=0;l.sort(qp);for(let T=0,v=l.length;T<v;T++){const P=l[T],L=P.color,O=P.intensity,k=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)c+=L.r*O,d+=L.g*O,u+=L.b*O;else if(P.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(P.sh.coefficients[q],O);A++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const J=P.shadow,V=e.get(P);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.directionalShadow[m]=V,i.directionalShadowMap[m]=W,i.directionalShadowMatrix[m]=P.shadow.matrix,S++}i.directional[m]=q,m++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(L).multiplyScalar(O),q.distance=k,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,i.spot[x]=q;const J=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,J.updateMatrices(P),P.castShadow&&y++),i.spotLightMatrix[x]=J.matrix,P.castShadow){const V=e.get(P);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,i.spotShadow[x]=V,i.spotShadowMap[x]=W,E++}x++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(L).multiplyScalar(O),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),i.rectArea[f]=q,f++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){const J=P.shadow,V=e.get(P);V.shadowIntensity=J.intensity,V.shadowBias=J.bias,V.shadowNormalBias=J.normalBias,V.shadowRadius=J.radius,V.shadowMapSize=J.mapSize,V.shadowCameraNear=J.camera.near,V.shadowCameraFar=J.camera.far,i.pointShadow[g]=V,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=P.shadow.matrix,b++}i.point[g]=q,g++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(O),q.groundColor.copy(P.groundColor).multiplyScalar(O),i.hemi[p]=q,p++}}f>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=u;const U=i.hash;(U.directionalLength!==m||U.pointLength!==g||U.spotLength!==x||U.rectAreaLength!==f||U.hemiLength!==p||U.numDirectionalShadows!==S||U.numPointShadows!==b||U.numSpotShadows!==E||U.numSpotMaps!==R||U.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=f,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=E+R-y,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=A,U.directionalLength=m,U.pointLength=g,U.spotLength=x,U.rectAreaLength=f,U.hemiLength=p,U.numDirectionalShadows=S,U.numPointShadows=b,U.numSpotShadows=E,U.numSpotMaps=R,U.numLightProbes=A,i.version=Zp++)}function h(l,c){let d=0,u=0,m=0,g=0,x=0;const f=c.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){const b=l[p];if(b.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(f),d++}else if(b.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(b.matrixWorld),n.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(n),E.direction.transformDirection(f),m++}else if(b.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(f),a.identity(),s.copy(b.matrixWorld),s.premultiply(f),a.extractRotation(s),E.halfWidth.set(b.width*.5,0,0),E.halfHeight.set(0,b.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(f),u++}else if(b.isHemisphereLight){const E=i.hemi[x];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(f),x++}}}return{setup:o,setupView:h,state:i}}function nl(r){const t=new $p(r),e=[],i=[];function n(c){l.camera=c,e.length=0,i.length=0}function s(c){e.push(c)}function a(c){i.push(c)}function o(){t.setup(e)}function h(c){t.setupView(e,c)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:l,setupLights:o,setupLightsView:h,pushLight:s,pushShadow:a}}function Yp(r){let t=new WeakMap;function e(n,s=0){const a=t.get(n);let o;return a===void 0?(o=new nl(r),t.set(n,[o])):s>=a.length?(o=new nl(r),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const jp=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kp=`uniform sampler2D shadow_pass;
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
}`;function Jp(r,t,e){let i=new ns;const n=new yt,s=new yt,a=new ge,o=new gc({depthPacking:Sh}),h=new xc,l={},c=e.maxTextureSize,d={[Hi]:ze,[ze]:Hi,[Ye]:Ye},u=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:jp,fragmentShader:Kp}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new Fe;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ne(g,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ol;let p=this.type;this.render=function(y,A,U){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||y.length===0)return;const T=r.getRenderTarget(),v=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),L=r.state;L.setBlending(Ai),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const O=p!==Ei&&this.type===Ei,k=p===Ei&&this.type!==Ei;for(let W=0,q=y.length;W<q;W++){const J=y[W],V=J.shadow;if(V===void 0){Lt("WebGLShadowMap:",J,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;n.copy(V.mapSize);const et=V.getFrameExtents();if(n.multiply(et),s.copy(V.mapSize),(n.x>c||n.y>c)&&(n.x>c&&(s.x=Math.floor(c/et.x),n.x=s.x*et.x,V.mapSize.x=s.x),n.y>c&&(s.y=Math.floor(c/et.y),n.y=s.y*et.y,V.mapSize.y=s.y)),V.map===null||O===!0||k===!0){const xt=this.type!==Ei?{minFilter:je,magFilter:je}:{};V.map!==null&&V.map.dispose(),V.map=new sn(n.x,n.y,xt),V.map.texture.name=J.name+".shadowMap",V.camera.updateProjectionMatrix()}r.setRenderTarget(V.map),r.clear();const nt=V.getViewportCount();for(let xt=0;xt<nt;xt++){const Nt=V.getViewport(xt);a.set(s.x*Nt.x,s.y*Nt.y,s.x*Nt.z,s.y*Nt.w),L.viewport(a),V.updateMatrices(J,xt),i=V.getFrustum(),E(A,U,V.camera,J,this.type)}V.isPointLightShadow!==!0&&this.type===Ei&&S(V,U),V.needsUpdate=!1}p=this.type,f.needsUpdate=!1,r.setRenderTarget(T,v,P)};function S(y,A){const U=t.update(x);u.defines.VSM_SAMPLES!==y.blurSamples&&(u.defines.VSM_SAMPLES=y.blurSamples,m.defines.VSM_SAMPLES=y.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new sn(n.x,n.y)),u.uniforms.shadow_pass.value=y.map.texture,u.uniforms.resolution.value=y.mapSize,u.uniforms.radius.value=y.radius,r.setRenderTarget(y.mapPass),r.clear(),r.renderBufferDirect(A,null,U,u,x,null),m.uniforms.shadow_pass.value=y.mapPass.texture,m.uniforms.resolution.value=y.mapSize,m.uniforms.radius.value=y.radius,r.setRenderTarget(y.map),r.clear(),r.renderBufferDirect(A,null,U,m,x,null)}function b(y,A,U,T){let v=null;const P=U.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(P!==void 0)v=P;else if(v=U.isPointLight===!0?h:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const L=v.uuid,O=A.uuid;let k=l[L];k===void 0&&(k={},l[L]=k);let W=k[O];W===void 0&&(W=v.clone(),k[O]=W,A.addEventListener("dispose",R)),v=W}if(v.visible=A.visible,v.wireframe=A.wireframe,T===Ei?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:d[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,U.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const L=r.properties.get(v);L.light=U}return v}function E(y,A,U,T,v){if(y.visible===!1)return;if(y.layers.test(A.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&v===Ei)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,y.matrixWorld);const O=t.update(y),k=y.material;if(Array.isArray(k)){const W=O.groups;for(let q=0,J=W.length;q<J;q++){const V=W[q],et=k[V.materialIndex];if(et&&et.visible){const nt=b(y,et,T,v);y.onBeforeShadow(r,y,A,U,O,nt,V),r.renderBufferDirect(U,null,O,nt,y,V),y.onAfterShadow(r,y,A,U,O,nt,V)}}}else if(k.visible){const W=b(y,k,T,v);y.onBeforeShadow(r,y,A,U,O,W,null),r.renderBufferDirect(U,null,O,W,y,null),y.onAfterShadow(r,y,A,U,O,W,null)}}const L=y.children;for(let O=0,k=L.length;O<k;O++)E(L[O],A,U,T,v)}function R(y){y.target.removeEventListener("dispose",R);for(const U in l){const T=l[U],v=y.target.uuid;v in T&&(T[v].dispose(),delete T[v])}}}const Qp={[Br]:Or,[zr]:Hr,[Gr]:Vr,[Dn]:kr,[Or]:Br,[Hr]:zr,[Vr]:Gr,[kr]:Dn};function tm(r,t){function e(){let D=!1;const lt=new ge;let st=null;const rt=new ge(0,0,0,0);return{setMask:function(Q){st!==Q&&!D&&(r.colorMask(Q,Q,Q,Q),st=Q)},setLocked:function(Q){D=Q},setClear:function(Q,$,mt,Ft,ae){ae===!0&&(Q*=Ft,$*=Ft,mt*=Ft),lt.set(Q,$,mt,Ft),rt.equals(lt)===!1&&(r.clearColor(Q,$,mt,Ft),rt.copy(lt))},reset:function(){D=!1,st=null,rt.set(-1,0,0,0)}}}function i(){let D=!1,lt=!1,st=null,rt=null,Q=null;return{setReversed:function($){if(lt!==$){const mt=t.get("EXT_clip_control");$?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT),lt=$;const Ft=Q;Q=null,this.setClear(Ft)}},getReversed:function(){return lt},setTest:function($){$?Y(r.DEPTH_TEST):dt(r.DEPTH_TEST)},setMask:function($){st!==$&&!D&&(r.depthMask($),st=$)},setFunc:function($){if(lt&&($=Qp[$]),rt!==$){switch($){case Br:r.depthFunc(r.NEVER);break;case Or:r.depthFunc(r.ALWAYS);break;case zr:r.depthFunc(r.LESS);break;case Dn:r.depthFunc(r.LEQUAL);break;case Gr:r.depthFunc(r.EQUAL);break;case kr:r.depthFunc(r.GEQUAL);break;case Hr:r.depthFunc(r.GREATER);break;case Vr:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}rt=$}},setLocked:function($){D=$},setClear:function($){Q!==$&&(lt&&($=1-$),r.clearDepth($),Q=$)},reset:function(){D=!1,st=null,rt=null,Q=null,lt=!1}}}function n(){let D=!1,lt=null,st=null,rt=null,Q=null,$=null,mt=null,Ft=null,ae=null;return{setTest:function(Jt){D||(Jt?Y(r.STENCIL_TEST):dt(r.STENCIL_TEST))},setMask:function(Jt){lt!==Jt&&!D&&(r.stencilMask(Jt),lt=Jt)},setFunc:function(Jt,ui,ni){(st!==Jt||rt!==ui||Q!==ni)&&(r.stencilFunc(Jt,ui,ni),st=Jt,rt=ui,Q=ni)},setOp:function(Jt,ui,ni){($!==Jt||mt!==ui||Ft!==ni)&&(r.stencilOp(Jt,ui,ni),$=Jt,mt=ui,Ft=ni)},setLocked:function(Jt){D=Jt},setClear:function(Jt){ae!==Jt&&(r.clearStencil(Jt),ae=Jt)},reset:function(){D=!1,lt=null,st=null,rt=null,Q=null,$=null,mt=null,Ft=null,ae=null}}}const s=new e,a=new i,o=new n,h=new WeakMap,l=new WeakMap;let c={},d={},u=new WeakMap,m=[],g=null,x=!1,f=null,p=null,S=null,b=null,E=null,R=null,y=null,A=new pt(0,0,0),U=0,T=!1,v=null,P=null,L=null,O=null,k=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,J=0;const V=r.getParameter(r.VERSION);V.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(V)[1]),q=J>=1):V.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),q=J>=2);let et=null,nt={};const xt=r.getParameter(r.SCISSOR_BOX),Nt=r.getParameter(r.VIEWPORT),Gt=new ge().fromArray(xt),_t=new ge().fromArray(Nt);function Kt(D,lt,st,rt){const Q=new Uint8Array(4),$=r.createTexture();r.bindTexture(D,$),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let mt=0;mt<st;mt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(lt,0,r.RGBA,1,1,rt,0,r.RGBA,r.UNSIGNED_BYTE,Q):r.texImage2D(lt+mt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Q);return $}const X={};X[r.TEXTURE_2D]=Kt(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=Kt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=Kt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=Kt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Y(r.DEPTH_TEST),a.setFunc(Dn),Wt(!1),Xt(Ya),Y(r.CULL_FACE),le(Ai);function Y(D){c[D]!==!0&&(r.enable(D),c[D]=!0)}function dt(D){c[D]!==!1&&(r.disable(D),c[D]=!1)}function Ut(D,lt){return d[D]!==lt?(r.bindFramebuffer(D,lt),d[D]=lt,D===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=lt),D===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=lt),!0):!1}function St(D,lt){let st=m,rt=!1;if(D){st=u.get(lt),st===void 0&&(st=[],u.set(lt,st));const Q=D.textures;if(st.length!==Q.length||st[0]!==r.COLOR_ATTACHMENT0){for(let $=0,mt=Q.length;$<mt;$++)st[$]=r.COLOR_ATTACHMENT0+$;st.length=Q.length,rt=!0}}else st[0]!==r.BACK&&(st[0]=r.BACK,rt=!0);rt&&r.drawBuffers(st)}function Vt(D){return g!==D?(r.useProgram(D),g=D,!0):!1}const Te={[Ji]:r.FUNC_ADD,[Yl]:r.FUNC_SUBTRACT,[jl]:r.FUNC_REVERSE_SUBTRACT};Te[Kl]=r.MIN,Te[Jl]=r.MAX;const kt={[Ql]:r.ZERO,[th]:r.ONE,[eh]:r.SRC_COLOR,[Fr]:r.SRC_ALPHA,[oh]:r.SRC_ALPHA_SATURATE,[rh]:r.DST_COLOR,[nh]:r.DST_ALPHA,[ih]:r.ONE_MINUS_SRC_COLOR,[Nr]:r.ONE_MINUS_SRC_ALPHA,[ah]:r.ONE_MINUS_DST_COLOR,[sh]:r.ONE_MINUS_DST_ALPHA,[lh]:r.CONSTANT_COLOR,[hh]:r.ONE_MINUS_CONSTANT_COLOR,[ch]:r.CONSTANT_ALPHA,[dh]:r.ONE_MINUS_CONSTANT_ALPHA};function le(D,lt,st,rt,Q,$,mt,Ft,ae,Jt){if(D===Ai){x===!0&&(dt(r.BLEND),x=!1);return}if(x===!1&&(Y(r.BLEND),x=!0),D!==$l){if(D!==f||Jt!==T){if((p!==Ji||E!==Ji)&&(r.blendEquation(r.FUNC_ADD),p=Ji,E=Ji),Jt)switch(D){case tn:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ur:r.blendFunc(r.ONE,r.ONE);break;case ja:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ka:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:fe("WebGLState: Invalid blending: ",D);break}else switch(D){case tn:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ur:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case ja:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ka:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",D);break}S=null,b=null,R=null,y=null,A.set(0,0,0),U=0,f=D,T=Jt}return}Q=Q||lt,$=$||st,mt=mt||rt,(lt!==p||Q!==E)&&(r.blendEquationSeparate(Te[lt],Te[Q]),p=lt,E=Q),(st!==S||rt!==b||$!==R||mt!==y)&&(r.blendFuncSeparate(kt[st],kt[rt],kt[$],kt[mt]),S=st,b=rt,R=$,y=mt),(Ft.equals(A)===!1||ae!==U)&&(r.blendColor(Ft.r,Ft.g,Ft.b,ae),A.copy(Ft),U=ae),f=D,T=!1}function C(D,lt){D.side===Ye?dt(r.CULL_FACE):Y(r.CULL_FACE);let st=D.side===ze;lt&&(st=!st),Wt(st),D.blending===tn&&D.transparent===!1?le(Ai):le(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const rt=D.stencilWrite;o.setTest(rt),rt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Mt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Y(r.SAMPLE_ALPHA_TO_COVERAGE):dt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(D){v!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),v=D)}function Xt(D){D!==Xl?(Y(r.CULL_FACE),D!==P&&(D===Ya?r.cullFace(r.BACK):D===Zl?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):dt(r.CULL_FACE),P=D}function re(D){D!==L&&(q&&r.lineWidth(D),L=D)}function Mt(D,lt,st){D?(Y(r.POLYGON_OFFSET_FILL),(O!==lt||k!==st)&&(r.polygonOffset(lt,st),O=lt,k=st)):dt(r.POLYGON_OFFSET_FILL)}function ce(D){D?Y(r.SCISSOR_TEST):dt(r.SCISSOR_TEST)}function Et(D){D===void 0&&(D=r.TEXTURE0+W-1),et!==D&&(r.activeTexture(D),et=D)}function Bt(D,lt,st){st===void 0&&(et===null?st=r.TEXTURE0+W-1:st=et);let rt=nt[st];rt===void 0&&(rt={type:void 0,texture:void 0},nt[st]=rt),(rt.type!==D||rt.texture!==lt)&&(et!==st&&(r.activeTexture(st),et=st),r.bindTexture(D,lt||X[D]),rt.type=D,rt.texture=lt)}function w(){const D=nt[et];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function _(){try{r.compressedTexImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function B(){try{r.compressedTexImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function Z(){try{r.texSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function j(){try{r.texSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function H(){try{r.compressedTexSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function bt(){try{r.compressedTexSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ot(){try{r.texStorage2D(...arguments)}catch(D){D("WebGLState:",D)}}function wt(){try{r.texStorage3D(...arguments)}catch(D){D("WebGLState:",D)}}function vt(){try{r.texImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function K(){try{r.texImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function it(D){Gt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),Gt.copy(D))}function Dt(D){_t.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),_t.copy(D))}function Rt(D,lt){let st=l.get(lt);st===void 0&&(st=new WeakMap,l.set(lt,st));let rt=st.get(D);rt===void 0&&(rt=r.getUniformBlockIndex(lt,D.name),st.set(D,rt))}function ct(D,lt){const rt=l.get(lt).get(D);h.get(lt)!==rt&&(r.uniformBlockBinding(lt,rt,D.__bindingPointIndex),h.set(lt,rt))}function It(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},et=null,nt={},d={},u=new WeakMap,m=[],g=null,x=!1,f=null,p=null,S=null,b=null,E=null,R=null,y=null,A=new pt(0,0,0),U=0,T=!1,v=null,P=null,L=null,O=null,k=null,Gt.set(0,0,r.canvas.width,r.canvas.height),_t.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Y,disable:dt,bindFramebuffer:Ut,drawBuffers:St,useProgram:Vt,setBlending:le,setMaterial:C,setFlipSided:Wt,setCullFace:Xt,setLineWidth:re,setPolygonOffset:Mt,setScissorTest:ce,activeTexture:Et,bindTexture:Bt,unbindTexture:w,compressedTexImage2D:_,compressedTexImage3D:B,texImage2D:vt,texImage3D:K,updateUBOMapping:Rt,uniformBlockBinding:ct,texStorage2D:ot,texStorage3D:wt,texSubImage2D:Z,texSubImage3D:j,compressedTexSubImage2D:H,compressedTexSubImage3D:bt,scissor:it,viewport:Dt,reset:It}}function em(r,t,e,i,n,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new yt,c=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return m?new OffscreenCanvas(w,_):Ws("canvas")}function x(w,_,B){let Z=1;const j=Bt(w);if((j.width>B||j.height>B)&&(Z=B/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const H=Math.floor(Z*j.width),bt=Math.floor(Z*j.height);d===void 0&&(d=g(H,bt));const ot=_?g(H,bt):d;return ot.width=H,ot.height=bt,ot.getContext("2d").drawImage(w,0,0,H,bt),Lt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+H+"x"+bt+")."),ot}else return"data"in w&&Lt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),w;return w}function f(w){return w.generateMipmaps}function p(w){r.generateMipmap(w)}function S(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function b(w,_,B,Z,j=!1){if(w!==null){if(r[w]!==void 0)return r[w];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let H=_;if(_===r.RED&&(B===r.FLOAT&&(H=r.R32F),B===r.HALF_FLOAT&&(H=r.R16F),B===r.UNSIGNED_BYTE&&(H=r.R8)),_===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(H=r.R8UI),B===r.UNSIGNED_SHORT&&(H=r.R16UI),B===r.UNSIGNED_INT&&(H=r.R32UI),B===r.BYTE&&(H=r.R8I),B===r.SHORT&&(H=r.R16I),B===r.INT&&(H=r.R32I)),_===r.RG&&(B===r.FLOAT&&(H=r.RG32F),B===r.HALF_FLOAT&&(H=r.RG16F),B===r.UNSIGNED_BYTE&&(H=r.RG8)),_===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(H=r.RG8UI),B===r.UNSIGNED_SHORT&&(H=r.RG16UI),B===r.UNSIGNED_INT&&(H=r.RG32UI),B===r.BYTE&&(H=r.RG8I),B===r.SHORT&&(H=r.RG16I),B===r.INT&&(H=r.RG32I)),_===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&(H=r.RGB8UI),B===r.UNSIGNED_SHORT&&(H=r.RGB16UI),B===r.UNSIGNED_INT&&(H=r.RGB32UI),B===r.BYTE&&(H=r.RGB8I),B===r.SHORT&&(H=r.RGB16I),B===r.INT&&(H=r.RGB32I)),_===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&(H=r.RGBA8UI),B===r.UNSIGNED_SHORT&&(H=r.RGBA16UI),B===r.UNSIGNED_INT&&(H=r.RGBA32UI),B===r.BYTE&&(H=r.RGBA8I),B===r.SHORT&&(H=r.RGBA16I),B===r.INT&&(H=r.RGBA32I)),_===r.RGB&&(B===r.UNSIGNED_INT_5_9_9_9_REV&&(H=r.RGB9_E5),B===r.UNSIGNED_INT_10F_11F_11F_REV&&(H=r.R11F_G11F_B10F)),_===r.RGBA){const bt=j?Hs:$t.getTransfer(Z);B===r.FLOAT&&(H=r.RGBA32F),B===r.HALF_FLOAT&&(H=r.RGBA16F),B===r.UNSIGNED_BYTE&&(H=bt===te?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(H=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(H=r.RGB5_A1)}return(H===r.R16F||H===r.R32F||H===r.RG16F||H===r.RG32F||H===r.RGBA16F||H===r.RGBA32F)&&t.get("EXT_color_buffer_float"),H}function E(w,_){let B;return w?_===null||_===en||_===Kn?B=r.DEPTH24_STENCIL8:_===mi?B=r.DEPTH32F_STENCIL8:_===jn&&(B=r.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===en||_===Kn?B=r.DEPTH_COMPONENT24:_===mi?B=r.DEPTH_COMPONENT32F:_===jn&&(B=r.DEPTH_COMPONENT16),B}function R(w,_){return f(w)===!0||w.isFramebufferTexture&&w.minFilter!==je&&w.minFilter!==ei?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function y(w){const _=w.target;_.removeEventListener("dispose",y),U(_),_.isVideoTexture&&c.delete(_)}function A(w){const _=w.target;_.removeEventListener("dispose",A),v(_)}function U(w){const _=i.get(w);if(_.__webglInit===void 0)return;const B=w.source,Z=u.get(B);if(Z){const j=Z[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&T(w),Object.keys(Z).length===0&&u.delete(B)}i.remove(w)}function T(w){const _=i.get(w);r.deleteTexture(_.__webglTexture);const B=w.source,Z=u.get(B);delete Z[_.__cacheKey],a.memory.textures--}function v(w){const _=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(_.__webglFramebuffer[Z]))for(let j=0;j<_.__webglFramebuffer[Z].length;j++)r.deleteFramebuffer(_.__webglFramebuffer[Z][j]);else r.deleteFramebuffer(_.__webglFramebuffer[Z]);_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer[Z])}else{if(Array.isArray(_.__webglFramebuffer))for(let Z=0;Z<_.__webglFramebuffer.length;Z++)r.deleteFramebuffer(_.__webglFramebuffer[Z]);else r.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&r.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Z=0;Z<_.__webglColorRenderbuffer.length;Z++)_.__webglColorRenderbuffer[Z]&&r.deleteRenderbuffer(_.__webglColorRenderbuffer[Z]);_.__webglDepthRenderbuffer&&r.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=w.textures;for(let Z=0,j=B.length;Z<j;Z++){const H=i.get(B[Z]);H.__webglTexture&&(r.deleteTexture(H.__webglTexture),a.memory.textures--),i.remove(B[Z])}i.remove(w)}let P=0;function L(){P=0}function O(){const w=P;return w>=n.maxTextures&&Lt("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+n.maxTextures),P+=1,w}function k(w){const _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function W(w,_){const B=i.get(w);if(w.isVideoTexture&&ce(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&B.__version!==w.version){const Z=w.image;if(Z===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,w,_);return}}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+_)}function q(w,_){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){X(B,w,_);return}else w.isExternalTexture&&(B.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+_)}function J(w,_){const B=i.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&B.__version!==w.version){X(B,w,_);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+_)}function V(w,_){const B=i.get(w);if(w.version>0&&B.__version!==w.version){Y(B,w,_);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+_)}const et={[Zr]:r.REPEAT,[wi]:r.CLAMP_TO_EDGE,[qr]:r.MIRRORED_REPEAT},nt={[je]:r.NEAREST,[bh]:r.NEAREST_MIPMAP_NEAREST,[os]:r.NEAREST_MIPMAP_LINEAR,[ei]:r.LINEAR,[er]:r.LINEAR_MIPMAP_NEAREST,[Oi]:r.LINEAR_MIPMAP_LINEAR},xt={[Eh]:r.NEVER,[Ph]:r.ALWAYS,[wh]:r.LESS,[ml]:r.LEQUAL,[Ah]:r.EQUAL,[Dh]:r.GEQUAL,[Rh]:r.GREATER,[Ch]:r.NOTEQUAL};function Nt(w,_){if(_.type===mi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===ei||_.magFilter===er||_.magFilter===os||_.magFilter===Oi||_.minFilter===ei||_.minFilter===er||_.minFilter===os||_.minFilter===Oi)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,et[_.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,et[_.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,et[_.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,nt[_.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,nt[_.minFilter]),_.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,xt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===je||_.minFilter!==os&&_.minFilter!==Oi||_.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(w,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,n.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Gt(w,_){let B=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",y));const Z=_.source;let j=u.get(Z);j===void 0&&(j={},u.set(Z,j));const H=k(_);if(H!==w.__cacheKey){j[H]===void 0&&(j[H]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,B=!0),j[H].usedTimes++;const bt=j[w.__cacheKey];bt!==void 0&&(j[w.__cacheKey].usedTimes--,bt.usedTimes===0&&T(_)),w.__cacheKey=H,w.__webglTexture=j[H].texture}return B}function _t(w,_,B){return Math.floor(Math.floor(w/B)/_)}function Kt(w,_,B,Z){const H=w.updateRanges;if(H.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,_.width,_.height,B,Z,_.data);else{H.sort((K,it)=>K.start-it.start);let bt=0;for(let K=1;K<H.length;K++){const it=H[bt],Dt=H[K],Rt=it.start+it.count,ct=_t(Dt.start,_.width,4),It=_t(it.start,_.width,4);Dt.start<=Rt+1&&ct===It&&_t(Dt.start+Dt.count-1,_.width,4)===ct?it.count=Math.max(it.count,Dt.start+Dt.count-it.start):(++bt,H[bt]=Dt)}H.length=bt+1;const ot=r.getParameter(r.UNPACK_ROW_LENGTH),wt=r.getParameter(r.UNPACK_SKIP_PIXELS),vt=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,_.width);for(let K=0,it=H.length;K<it;K++){const Dt=H[K],Rt=Math.floor(Dt.start/4),ct=Math.ceil(Dt.count/4),It=Rt%_.width,D=Math.floor(Rt/_.width),lt=ct,st=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,It),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),e.texSubImage2D(r.TEXTURE_2D,0,It,D,lt,st,B,Z,_.data)}w.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ot),r.pixelStorei(r.UNPACK_SKIP_PIXELS,wt),r.pixelStorei(r.UNPACK_SKIP_ROWS,vt)}}function X(w,_,B){let Z=r.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Z=r.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Z=r.TEXTURE_3D);const j=Gt(w,_),H=_.source;e.bindTexture(Z,w.__webglTexture,r.TEXTURE0+B);const bt=i.get(H);if(H.version!==bt.__version||j===!0){e.activeTexture(r.TEXTURE0+B);const ot=$t.getPrimaries($t.workingColorSpace),wt=_.colorSpace===Bi?null:$t.getPrimaries(_.colorSpace),vt=_.colorSpace===Bi||ot===wt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,vt);let K=x(_.image,!1,n.maxTextureSize);K=Et(_,K);const it=s.convert(_.format,_.colorSpace),Dt=s.convert(_.type);let Rt=b(_.internalFormat,it,Dt,_.colorSpace,_.isVideoTexture);Nt(Z,_);let ct;const It=_.mipmaps,D=_.isVideoTexture!==!0,lt=bt.__version===void 0||j===!0,st=H.dataReady,rt=R(_,K);if(_.isDepthTexture)Rt=E(_.format===Qn,_.type),lt&&(D?e.texStorage2D(r.TEXTURE_2D,1,Rt,K.width,K.height):e.texImage2D(r.TEXTURE_2D,0,Rt,K.width,K.height,0,it,Dt,null));else if(_.isDataTexture)if(It.length>0){D&&lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let Q=0,$=It.length;Q<$;Q++)ct=It[Q],D?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ct.width,ct.height,it,Dt,ct.data):e.texImage2D(r.TEXTURE_2D,Q,Rt,ct.width,ct.height,0,it,Dt,ct.data);_.generateMipmaps=!1}else D?(lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,K.width,K.height),st&&Kt(_,K,it,Dt)):e.texImage2D(r.TEXTURE_2D,0,Rt,K.width,K.height,0,it,Dt,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){D&&lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,rt,Rt,It[0].width,It[0].height,K.depth);for(let Q=0,$=It.length;Q<$;Q++)if(ct=It[Q],_.format!==li)if(it!==null)if(D){if(st)if(_.layerUpdates.size>0){const mt=Uo(ct.width,ct.height,_.format,_.type);for(const Ft of _.layerUpdates){const ae=ct.data.subarray(Ft*mt/ct.data.BYTES_PER_ELEMENT,(Ft+1)*mt/ct.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,Ft,ct.width,ct.height,1,it,ae)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,ct.width,ct.height,K.depth,it,ct.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,Rt,ct.width,ct.height,K.depth,0,ct.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?st&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,ct.width,ct.height,K.depth,it,Dt,ct.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Q,Rt,ct.width,ct.height,K.depth,0,it,Dt,ct.data)}else{D&&lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let Q=0,$=It.length;Q<$;Q++)ct=It[Q],_.format!==li?it!==null?D?st&&e.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,ct.width,ct.height,it,ct.data):e.compressedTexImage2D(r.TEXTURE_2D,Q,Rt,ct.width,ct.height,0,ct.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ct.width,ct.height,it,Dt,ct.data):e.texImage2D(r.TEXTURE_2D,Q,Rt,ct.width,ct.height,0,it,Dt,ct.data)}else if(_.isDataArrayTexture)if(D){if(lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,rt,Rt,K.width,K.height,K.depth),st)if(_.layerUpdates.size>0){const Q=Uo(K.width,K.height,_.format,_.type);for(const $ of _.layerUpdates){const mt=K.data.subarray($*Q/K.data.BYTES_PER_ELEMENT,($+1)*Q/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,$,K.width,K.height,1,it,Dt,mt)}_.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,it,Dt,K.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Rt,K.width,K.height,K.depth,0,it,Dt,K.data);else if(_.isData3DTexture)D?(lt&&e.texStorage3D(r.TEXTURE_3D,rt,Rt,K.width,K.height,K.depth),st&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,it,Dt,K.data)):e.texImage3D(r.TEXTURE_3D,0,Rt,K.width,K.height,K.depth,0,it,Dt,K.data);else if(_.isFramebufferTexture){if(lt)if(D)e.texStorage2D(r.TEXTURE_2D,rt,Rt,K.width,K.height);else{let Q=K.width,$=K.height;for(let mt=0;mt<rt;mt++)e.texImage2D(r.TEXTURE_2D,mt,Rt,Q,$,0,it,Dt,null),Q>>=1,$>>=1}}else if(It.length>0){if(D&&lt){const Q=Bt(It[0]);e.texStorage2D(r.TEXTURE_2D,rt,Rt,Q.width,Q.height)}for(let Q=0,$=It.length;Q<$;Q++)ct=It[Q],D?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,it,Dt,ct):e.texImage2D(r.TEXTURE_2D,Q,Rt,it,Dt,ct);_.generateMipmaps=!1}else if(D){if(lt){const Q=Bt(K);e.texStorage2D(r.TEXTURE_2D,rt,Rt,Q.width,Q.height)}st&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,it,Dt,K)}else e.texImage2D(r.TEXTURE_2D,0,Rt,it,Dt,K);f(_)&&p(Z),bt.__version=H.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function Y(w,_,B){if(_.image.length!==6)return;const Z=Gt(w,_),j=_.source;e.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+B);const H=i.get(j);if(j.version!==H.__version||Z===!0){e.activeTexture(r.TEXTURE0+B);const bt=$t.getPrimaries($t.workingColorSpace),ot=_.colorSpace===Bi?null:$t.getPrimaries(_.colorSpace),wt=_.colorSpace===Bi||bt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const vt=_.isCompressedTexture||_.image[0].isCompressedTexture,K=_.image[0]&&_.image[0].isDataTexture,it=[];for(let $=0;$<6;$++)!vt&&!K?it[$]=x(_.image[$],!0,n.maxCubemapSize):it[$]=K?_.image[$].image:_.image[$],it[$]=Et(_,it[$]);const Dt=it[0],Rt=s.convert(_.format,_.colorSpace),ct=s.convert(_.type),It=b(_.internalFormat,Rt,ct,_.colorSpace),D=_.isVideoTexture!==!0,lt=H.__version===void 0||Z===!0,st=j.dataReady;let rt=R(_,Dt);Nt(r.TEXTURE_CUBE_MAP,_);let Q;if(vt){D&&lt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,rt,It,Dt.width,Dt.height);for(let $=0;$<6;$++){Q=it[$].mipmaps;for(let mt=0;mt<Q.length;mt++){const Ft=Q[mt];_.format!==li?Rt!==null?D?st&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,0,0,Ft.width,Ft.height,Rt,Ft.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,It,Ft.width,Ft.height,0,Ft.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,0,0,Ft.width,Ft.height,Rt,ct,Ft.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,It,Ft.width,Ft.height,0,Rt,ct,Ft.data)}}}else{if(Q=_.mipmaps,D&&lt){Q.length>0&&rt++;const $=Bt(it[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,rt,It,$.width,$.height)}for(let $=0;$<6;$++)if(K){D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,it[$].width,it[$].height,Rt,ct,it[$].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,It,it[$].width,it[$].height,0,Rt,ct,it[$].data);for(let mt=0;mt<Q.length;mt++){const ae=Q[mt].image[$].image;D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,0,0,ae.width,ae.height,Rt,ct,ae.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,It,ae.width,ae.height,0,Rt,ct,ae.data)}}else{D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Rt,ct,it[$]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,It,Rt,ct,it[$]);for(let mt=0;mt<Q.length;mt++){const Ft=Q[mt];D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,0,0,Rt,ct,Ft.image[$]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,It,Rt,ct,Ft.image[$])}}}f(_)&&p(r.TEXTURE_CUBE_MAP),H.__version=j.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function dt(w,_,B,Z,j,H){const bt=s.convert(B.format,B.colorSpace),ot=s.convert(B.type),wt=b(B.internalFormat,bt,ot,B.colorSpace),vt=i.get(_),K=i.get(B);if(K.__renderTarget=_,!vt.__hasExternalTextures){const it=Math.max(1,_.width>>H),Dt=Math.max(1,_.height>>H);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,H,wt,it,Dt,_.depth,0,bt,ot,null):e.texImage2D(j,H,wt,it,Dt,0,bt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,w),Mt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Z,j,K.__webglTexture,0,re(_)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Z,j,K.__webglTexture,H),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ut(w,_,B){if(r.bindRenderbuffer(r.RENDERBUFFER,w),_.depthBuffer){const Z=_.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,H=E(_.stencilBuffer,j),bt=_.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=re(_);Mt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,H,_.width,_.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,H,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,H,_.width,_.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,bt,r.RENDERBUFFER,w)}else{const Z=_.textures;for(let j=0;j<Z.length;j++){const H=Z[j],bt=s.convert(H.format,H.colorSpace),ot=s.convert(H.type),wt=b(H.internalFormat,bt,ot,H.colorSpace),vt=re(_);B&&Mt(_)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,vt,wt,_.width,_.height):Mt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,vt,wt,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,wt,_.width,_.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function St(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(_.depthTexture);Z.__renderTarget=_,(!Z.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W(_.depthTexture,0);const j=Z.__webglTexture,H=re(_);if(_.depthTexture.format===Jn)Mt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,H):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(_.depthTexture.format===Qn)Mt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,H):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Vt(w){const _=i.get(w),B=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){const Z=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Z){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=Z}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const Z=w.texture.mipmaps;Z&&Z.length>0?St(_.__webglFramebuffer[0],w):St(_.__webglFramebuffer,w)}else if(B){_.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[Z]),_.__webglDepthbuffer[Z]===void 0)_.__webglDepthbuffer[Z]=r.createRenderbuffer(),Ut(_.__webglDepthbuffer[Z],w,!1);else{const j=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer[Z];r.bindRenderbuffer(r.RENDERBUFFER,H),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,H)}}else{const Z=w.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=r.createRenderbuffer(),Ut(_.__webglDepthbuffer,w,!1);else{const j=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,H=_.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,H),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,H)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Te(w,_,B){const Z=i.get(w);_!==void 0&&dt(Z.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&Vt(w)}function kt(w){const _=w.texture,B=i.get(w),Z=i.get(_);w.addEventListener("dispose",A);const j=w.textures,H=w.isWebGLCubeRenderTarget===!0,bt=j.length>1;if(bt||(Z.__webglTexture===void 0&&(Z.__webglTexture=r.createTexture()),Z.__version=_.version,a.memory.textures++),H){B.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[ot]=[];for(let wt=0;wt<_.mipmaps.length;wt++)B.__webglFramebuffer[ot][wt]=r.createFramebuffer()}else B.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let ot=0;ot<_.mipmaps.length;ot++)B.__webglFramebuffer[ot]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(bt)for(let ot=0,wt=j.length;ot<wt;ot++){const vt=i.get(j[ot]);vt.__webglTexture===void 0&&(vt.__webglTexture=r.createTexture(),a.memory.textures++)}if(w.samples>0&&Mt(w)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let ot=0;ot<j.length;ot++){const wt=j[ot];B.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[ot]);const vt=s.convert(wt.format,wt.colorSpace),K=s.convert(wt.type),it=b(wt.internalFormat,vt,K,wt.colorSpace,w.isXRRenderTarget===!0),Dt=re(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,it,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,B.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),Ut(B.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(H){e.bindTexture(r.TEXTURE_CUBE_MAP,Z.__webglTexture),Nt(r.TEXTURE_CUBE_MAP,_);for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0)for(let wt=0;wt<_.mipmaps.length;wt++)dt(B.__webglFramebuffer[ot][wt],w,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,wt);else dt(B.__webglFramebuffer[ot],w,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);f(_)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let ot=0,wt=j.length;ot<wt;ot++){const vt=j[ot],K=i.get(vt);let it=r.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(it=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(it,K.__webglTexture),Nt(it,vt),dt(B.__webglFramebuffer,w,vt,r.COLOR_ATTACHMENT0+ot,it,0),f(vt)&&p(it)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ot=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,Z.__webglTexture),Nt(ot,_),_.mipmaps&&_.mipmaps.length>0)for(let wt=0;wt<_.mipmaps.length;wt++)dt(B.__webglFramebuffer[wt],w,_,r.COLOR_ATTACHMENT0,ot,wt);else dt(B.__webglFramebuffer,w,_,r.COLOR_ATTACHMENT0,ot,0);f(_)&&p(ot),e.unbindTexture()}w.depthBuffer&&Vt(w)}function le(w){const _=w.textures;for(let B=0,Z=_.length;B<Z;B++){const j=_[B];if(f(j)){const H=S(w),bt=i.get(j).__webglTexture;e.bindTexture(H,bt),p(H),e.unbindTexture()}}}const C=[],Wt=[];function Xt(w){if(w.samples>0){if(Mt(w)===!1){const _=w.textures,B=w.width,Z=w.height;let j=r.COLOR_BUFFER_BIT;const H=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=i.get(w),ot=_.length>1;if(ot)for(let vt=0;vt<_.length;vt++)e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);const wt=w.texture.mipmaps;wt&&wt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let vt=0;vt<_.length;vt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,bt.__webglColorRenderbuffer[vt]);const K=i.get(_[vt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,B,Z,0,0,B,Z,j,r.NEAREST),h===!0&&(C.length=0,Wt.length=0,C.push(r.COLOR_ATTACHMENT0+vt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(C.push(H),Wt.push(H),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Wt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,C))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let vt=0;vt<_.length;vt++){e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.RENDERBUFFER,bt.__webglColorRenderbuffer[vt]);const K=i.get(_[vt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+vt,r.TEXTURE_2D,K,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&h){const _=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_])}}}function re(w){return Math.min(n.maxSamples,w.samples)}function Mt(w){const _=i.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ce(w){const _=a.render.frame;c.get(w)!==_&&(c.set(w,_),w.update())}function Et(w,_){const B=w.colorSpace,Z=w.format,j=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||B!==Ln&&B!==Bi&&($t.getTransfer(B)===te?(Z!==li||j!==xi)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",B)),_}function Bt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=O,this.resetTextureUnits=L,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=J,this.setTextureCube=V,this.rebindTextures=Te,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=le,this.updateMultisampleRenderTarget=Xt,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=Mt}function im(r,t){function e(i,n=Bi){let s;const a=$t.getTransfer(n);if(i===xi)return r.UNSIGNED_BYTE;if(i===Da)return r.UNSIGNED_SHORT_4_4_4_4;if(i===Pa)return r.UNSIGNED_SHORT_5_5_5_1;if(i===dl)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===ul)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===hl)return r.BYTE;if(i===cl)return r.SHORT;if(i===jn)return r.UNSIGNED_SHORT;if(i===Ca)return r.INT;if(i===en)return r.UNSIGNED_INT;if(i===mi)return r.FLOAT;if(i===Fn)return r.HALF_FLOAT;if(i===fl)return r.ALPHA;if(i===pl)return r.RGB;if(i===li)return r.RGBA;if(i===Jn)return r.DEPTH_COMPONENT;if(i===Qn)return r.DEPTH_STENCIL;if(i===Ia)return r.RED;if(i===La)return r.RED_INTEGER;if(i===Ua)return r.RG;if(i===Fa)return r.RG_INTEGER;if(i===Na)return r.RGBA_INTEGER;if(i===Ns||i===Bs||i===Os||i===zs)if(a===te)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ns)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ns)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Os)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$r||i===Yr||i===jr||i===Kr)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$r)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Yr)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jr)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Kr)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Jr||i===Qr||i===ta)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Jr||i===Qr)return a===te?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ta)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ea||i===ia||i===na||i===sa||i===ra||i===aa||i===oa||i===la||i===ha||i===ca||i===da||i===ua||i===fa||i===pa)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ea)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===ia)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===na)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===sa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ra)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===aa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===oa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===la)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ha)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ca)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===da)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ua)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pa)return a===te?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ma||i===ga||i===xa)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===ma)return a===te?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ga)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xa)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===_a||i===Ma||i===va||i===ba)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===_a)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ma)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===va)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ba)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Kn?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:e}}const nm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sm=`
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

}`;class rm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Dl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new _i({vertexShader:nm,fragmentShader:sm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ne(new Vi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class am extends rn{constructor(t,e){super();const i=this;let n=null,s=1,a=null,o="local-floor",h=1,l=null,c=null,d=null,u=null,m=null,g=null;const x=typeof XRWebGLBinding<"u",f=new rm,p={},S=e.getContextAttributes();let b=null,E=null;const R=[],y=[],A=new yt;let U=null;const T=new oi;T.viewport=new ge;const v=new oi;v.viewport=new ge;const P=[T,v],L=new yc;let O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Y=R[X];return Y===void 0&&(Y=new Sr,R[X]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(X){let Y=R[X];return Y===void 0&&(Y=new Sr,R[X]=Y),Y.getGripSpace()},this.getHand=function(X){let Y=R[X];return Y===void 0&&(Y=new Sr,R[X]=Y),Y.getHandSpace()};function W(X){const Y=y.indexOf(X.inputSource);if(Y===-1)return;const dt=R[Y];dt!==void 0&&(dt.update(X.inputSource,X.frame,l||a),dt.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",q),n.removeEventListener("inputsourceschange",J);for(let X=0;X<R.length;X++){const Y=y[X];Y!==null&&(y[X]=null,R[X].disconnect(Y))}O=null,k=null,f.reset();for(const X in p)delete p[X];t.setRenderTarget(b),m=null,u=null,d=null,n=null,E=null,Kt.stop(),i.isPresenting=!1,t.setPixelRatio(U),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(b=t.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",q),n.addEventListener("inputsourceschange",J),S.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let dt=null,Ut=null,St=null;S.depth&&(St=S.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,dt=S.stencil?Qn:Jn,Ut=S.stencil?Kn:en);const Vt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Vt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),E=new sn(u.textureWidth,u.textureHeight,{format:li,type:xi,depthTexture:new Cl(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,dt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const dt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(n,e,dt),n.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new sn(m.framebufferWidth,m.framebufferHeight,{format:li,type:xi,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await n.requestReferenceSpace(o),Kt.setContext(n),Kt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function J(X){for(let Y=0;Y<X.removed.length;Y++){const dt=X.removed[Y],Ut=y.indexOf(dt);Ut>=0&&(y[Ut]=null,R[Ut].disconnect(dt))}for(let Y=0;Y<X.added.length;Y++){const dt=X.added[Y];let Ut=y.indexOf(dt);if(Ut===-1){for(let Vt=0;Vt<R.length;Vt++)if(Vt>=y.length){y.push(dt),Ut=Vt;break}else if(y[Vt]===null){y[Vt]=dt,Ut=Vt;break}if(Ut===-1)break}const St=R[Ut];St&&St.connect(dt)}}const V=new I,et=new I;function nt(X,Y,dt){V.setFromMatrixPosition(Y.matrixWorld),et.setFromMatrixPosition(dt.matrixWorld);const Ut=V.distanceTo(et),St=Y.projectionMatrix.elements,Vt=dt.projectionMatrix.elements,Te=St[14]/(St[10]-1),kt=St[14]/(St[10]+1),le=(St[9]+1)/St[5],C=(St[9]-1)/St[5],Wt=(St[8]-1)/St[0],Xt=(Vt[8]+1)/Vt[0],re=Te*Wt,Mt=Te*Xt,ce=Ut/(-Wt+Xt),Et=ce*-Wt;if(Y.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Et),X.translateZ(ce),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),St[10]===-1)X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Bt=Te+ce,w=kt+ce,_=re-Et,B=Mt+(Ut-Et),Z=le*kt/w*Bt,j=C*kt/w*Bt;X.projectionMatrix.makePerspective(_,B,Z,j,Bt,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function xt(X,Y){Y===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Y.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;let Y=X.near,dt=X.far;f.texture!==null&&(f.depthNear>0&&(Y=f.depthNear),f.depthFar>0&&(dt=f.depthFar)),L.near=v.near=T.near=Y,L.far=v.far=T.far=dt,(O!==L.near||k!==L.far)&&(n.updateRenderState({depthNear:L.near,depthFar:L.far}),O=L.near,k=L.far),L.layers.mask=X.layers.mask|6,T.layers.mask=L.layers.mask&3,v.layers.mask=L.layers.mask&5;const Ut=X.parent,St=L.cameras;xt(L,Ut);for(let Vt=0;Vt<St.length;Vt++)xt(St[Vt],Ut);St.length===2?nt(L,T,v):L.projectionMatrix.copy(T.projectionMatrix),Nt(X,L,Ut)};function Nt(X,Y,dt){dt===null?X.matrix.copy(Y.matrixWorld):(X.matrix.copy(dt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Y.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Y.projectionMatrix),X.projectionMatrixInverse.copy(Y.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Sa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&m===null))return h},this.setFoveation=function(X){h=X,u!==null&&(u.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(L)},this.getCameraTexture=function(X){return p[X]};let Gt=null;function _t(X,Y){if(c=Y.getViewerPose(l||a),g=Y,c!==null){const dt=c.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let Ut=!1;dt.length!==L.cameras.length&&(L.cameras.length=0,Ut=!0);for(let kt=0;kt<dt.length;kt++){const le=dt[kt];let C=null;if(m!==null)C=m.getViewport(le);else{const Xt=d.getViewSubImage(u,le);C=Xt.viewport,kt===0&&(t.setRenderTargetTextures(E,Xt.colorTexture,Xt.depthStencilTexture),t.setRenderTarget(E))}let Wt=P[kt];Wt===void 0&&(Wt=new oi,Wt.layers.enable(kt),Wt.viewport=new ge,P[kt]=Wt),Wt.matrix.fromArray(le.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(le.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(C.x,C.y,C.width,C.height),kt===0&&(L.matrix.copy(Wt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ut===!0&&L.cameras.push(Wt)}const St=n.enabledFeatures;if(St&&St.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const kt=d.getDepthInformation(dt[0]);kt&&kt.isValid&&kt.texture&&f.init(kt,n.renderState)}if(St&&St.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let kt=0;kt<dt.length;kt++){const le=dt[kt].camera;if(le){let C=p[le];C||(C=new Dl,p[le]=C);const Wt=d.getCameraImage(le);C.sourceTexture=Wt}}}}for(let dt=0;dt<R.length;dt++){const Ut=y[dt],St=R[dt];Ut!==null&&St!==void 0&&St.update(Ut,Y,l||a)}Gt&&Gt(X,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),g=null}const Kt=new Il;Kt.setAnimationLoop(_t),this.setAnimationLoop=function(X){Gt=X},this.dispose=function(){}}}const Ki=new di,om=new jt;function lm(r,t){function e(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function i(f,p){p.color.getRGB(f.fogColor.value,bl(r)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function n(f,p,S,b,E){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(f,p):p.isMeshToonMaterial?(s(f,p),d(f,p)):p.isMeshPhongMaterial?(s(f,p),c(f,p)):p.isMeshStandardMaterial?(s(f,p),u(f,p),p.isMeshPhysicalMaterial&&m(f,p,E)):p.isMeshMatcapMaterial?(s(f,p),g(f,p)):p.isMeshDepthMaterial?s(f,p):p.isMeshDistanceMaterial?(s(f,p),x(f,p)):p.isMeshNormalMaterial?s(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?h(f,p,S,b):p.isSpriteMaterial?l(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,e(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===ze&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,e(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===ze&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,e(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,e(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const S=t.get(p),b=S.envMap,E=S.envMapRotation;b&&(f.envMap.value=b,Ki.copy(E),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),f.envMapRotation.value.setFromMatrix4(om.makeRotationFromEuler(Ki)),f.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function h(f,p,S,b){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*S,f.scale.value=b*.5,p.map&&(f.map.value=p.map,e(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function l(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,e(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,e(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function d(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function u(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,S){f.ior.value=p.ior,p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ze&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,p){p.matcap&&(f.matcap.value=p.matcap)}function x(f,p){const S=t.get(p).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function hm(r,t,e,i){let n={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function h(S,b){const E=b.program;i.uniformBlockBinding(S,E)}function l(S,b){let E=n[S.id];E===void 0&&(g(S),E=c(S),n[S.id]=E,S.addEventListener("dispose",f));const R=b.program;i.updateUBOMapping(S,R);const y=t.render.frame;s[S.id]!==y&&(u(S),s[S.id]=y)}function c(S){const b=d();S.__bindingPointIndex=b;const E=r.createBuffer(),R=S.__size,y=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,R,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,E),E}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const b=n[S.id],E=S.uniforms,R=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let y=0,A=E.length;y<A;y++){const U=Array.isArray(E[y])?E[y]:[E[y]];for(let T=0,v=U.length;T<v;T++){const P=U[T];if(m(P,y,T,R)===!0){const L=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let k=0;for(let W=0;W<O.length;W++){const q=O[W],J=x(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,r.bufferSubData(r.UNIFORM_BUFFER,L+k,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,k),k+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,L,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(S,b,E,R){const y=S.value,A=b+"_"+E;if(R[A]===void 0)return typeof y=="number"||typeof y=="boolean"?R[A]=y:R[A]=y.clone(),!0;{const U=R[A];if(typeof y=="number"||typeof y=="boolean"){if(U!==y)return R[A]=y,!0}else if(U.equals(y)===!1)return U.copy(y),!0}return!1}function g(S){const b=S.uniforms;let E=0;const R=16;for(let A=0,U=b.length;A<U;A++){const T=Array.isArray(b[A])?b[A]:[b[A]];for(let v=0,P=T.length;v<P;v++){const L=T[v],O=Array.isArray(L.value)?L.value:[L.value];for(let k=0,W=O.length;k<W;k++){const q=O[k],J=x(q),V=E%R,et=V%J.boundary,nt=V+et;E+=et,nt!==0&&R-nt<J.storage&&(E+=R-nt),L.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=J.storage}}}const y=E%R;return y>0&&(E+=R-y),S.__size=E,S.__cache={},this}function x(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Lt("WebGLRenderer: Unsupported uniform value type.",S),b}function f(S){const b=S.target;b.removeEventListener("dispose",f);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),r.deleteBuffer(n[b.id]),delete n[b.id],delete s[b.id]}function p(){for(const S in n)r.deleteBuffer(n[S]);a=[],n={},s={}}return{bind:h,update:l,dispose:p}}const cm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Ti=null;function dm(){return Ti===null&&(Ti=new wl(cm,32,32,Ua,Fn),Ti.minFilter=ei,Ti.magFilter=ei,Ti.wrapS=wi,Ti.wrapT=wi,Ti.generateMipmaps=!1,Ti.needsUpdate=!0),Ti}class um{constructor(t={}){const{canvas:e=Ih(),context:i=null,depth:n=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const g=new Set([Na,Fa,La]),x=new Set([xi,en,jn,Kn,Da,Pa]),f=new Uint32Array(4),p=new Int32Array(4);let S=null,b=null;const E=[],R=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let A=!1;this._outputColorSpace=$e;let U=0,T=0,v=null,P=-1,L=null;const O=new ge,k=new ge;let W=null;const q=new pt(0);let J=0,V=e.width,et=e.height,nt=1,xt=null,Nt=null;const Gt=new ge(0,0,V,et),_t=new ge(0,0,V,et);let Kt=!1;const X=new ns;let Y=!1,dt=!1;const Ut=new jt,St=new I,Vt=new ge,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function le(){return v===null?nt:1}let C=i;function Wt(M,F){return e.getContext(M,F)}try{const M={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Aa}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",mt,!1),C===null){const F="webgl2";if(C=Wt(F,M),C===null)throw Wt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw M("WebGLRenderer: "+M.message),M}let Xt,re,Mt,ce,Et,Bt,w,_,B,Z,j,H,bt,ot,wt,vt,K,it,Dt,Rt,ct,It,D,lt;function st(){Xt=new vf(C),Xt.init(),It=new im(C,Xt),re=new df(C,Xt,t,It),Mt=new tm(C,Xt),re.reversedDepthBuffer&&u&&Mt.buffers.depth.setReversed(!0),ce=new Sf(C),Et=new kp,Bt=new em(C,Xt,Mt,Et,re,It,ce),w=new ff(y),_=new Mf(y),B=new wc(C),D=new hf(C,B),Z=new bf(C,B,ce,D),j=new Ef(C,Z,B,ce),Dt=new Tf(C,re,Bt),vt=new uf(Et),H=new Gp(y,w,_,Xt,re,D,vt),bt=new lm(y,Et),ot=new Vp,wt=new Yp(Xt),it=new lf(y,w,_,Mt,j,m,h),K=new Jp(y,j,re),lt=new hm(C,ce,re,Mt),Rt=new cf(C,Xt,ce),ct=new yf(C,Xt,ce),ce.programs=H.programs,y.capabilities=re,y.extensions=Xt,y.properties=Et,y.renderLists=ot,y.shadowMap=K,y.state=Mt,y.info=ce}st();const rt=new am(y,C);this.xr=rt,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const M=Xt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Xt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(M){M!==void 0&&(nt=M,this.setSize(V,et,!1))},this.getSize=function(M){return M.set(V,et)},this.setSize=function(M,F,z=!0){if(rt.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}V=M,et=F,e.width=Math.floor(M*nt),e.height=Math.floor(F*nt),z===!0&&(e.style.width=M+"px",e.style.height=F+"px"),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(V*nt,et*nt).floor()},this.setDrawingBufferSize=function(M,F,z){V=M,et=F,nt=z,e.width=Math.floor(M*z),e.height=Math.floor(F*z),this.setViewport(0,0,M,F)},this.getCurrentViewport=function(M){return M.copy(O)},this.getViewport=function(M){return M.copy(Gt)},this.setViewport=function(M,F,z,G){M.isVector4?Gt.set(M.x,M.y,M.z,M.w):Gt.set(M,F,z,G),Mt.viewport(O.copy(Gt).multiplyScalar(nt).round())},this.getScissor=function(M){return M.copy(_t)},this.setScissor=function(M,F,z,G){M.isVector4?_t.set(M.x,M.y,M.z,M.w):_t.set(M,F,z,G),Mt.scissor(k.copy(_t).multiplyScalar(nt).round())},this.getScissorTest=function(){return Kt},this.setScissorTest=function(M){Mt.setScissorTest(Kt=M)},this.setOpaqueSort=function(M){xt=M},this.setTransparentSort=function(M){Nt=M},this.getClearColor=function(M){return M.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,z=!0){let G=0;if(M){let N=!1;if(v!==null){const tt=v.texture.format;N=g.has(tt)}if(N){const tt=v.texture.type,ht=x.has(tt),gt=it.getClearColor(),ut=it.getClearAlpha(),Ct=gt.r,Pt=gt.g,Tt=gt.b;ht?(f[0]=Ct,f[1]=Pt,f[2]=Tt,f[3]=ut,C.clearBufferuiv(C.COLOR,0,f)):(p[0]=Ct,p[1]=Pt,p[2]=Tt,p[3]=ut,C.clearBufferiv(C.COLOR,0,p))}else G|=C.COLOR_BUFFER_BIT}F&&(G|=C.DEPTH_BUFFER_BIT),z&&(G|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),it.dispose(),ot.dispose(),wt.dispose(),Et.dispose(),w.dispose(),_.dispose(),j.dispose(),D.dispose(),lt.dispose(),H.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Ha),rt.removeEventListener("sessionend",Va),Wi.stop()};function Q(M){M.preventDefault(),Xs("WebGLRenderer: Context Lost."),A=!0}function $(){Xs("WebGLRenderer: Context Restored."),A=!1;const M=ce.autoReset,F=K.enabled,z=K.autoUpdate,G=K.needsUpdate,N=K.type;st(),ce.autoReset=M,K.enabled=F,K.autoUpdate=z,K.needsUpdate=G,K.type=N}function mt(M){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Ft(M){const F=M.target;F.removeEventListener("dispose",Ft),ae(F)}function ae(M){Jt(M),Et.remove(M)}function Jt(M){const F=Et.get(M).programs;F!==void 0&&(F.forEach(function(z){H.releaseProgram(z)}),M.isShaderMaterial&&H.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,z,G,N,tt){F===null&&(F=Te);const ht=N.isMesh&&N.matrixWorld.determinant()<0,gt=zl(M,F,z,G,N);Mt.setMaterial(G,ht);let ut=z.index,Ct=1;if(G.wireframe===!0){if(ut=Z.getWireframeAttribute(z),ut===void 0)return;Ct=2}const Pt=z.drawRange,Tt=z.attributes.position;let Zt=Pt.start*Ct,Qt=(Pt.start+Pt.count)*Ct;tt!==null&&(Zt=Math.max(Zt,tt.start*Ct),Qt=Math.min(Qt,(tt.start+tt.count)*Ct)),ut!==null?(Zt=Math.max(Zt,0),Qt=Math.min(Qt,ut.count)):Tt!=null&&(Zt=Math.max(Zt,0),Qt=Math.min(Qt,Tt.count));const pe=Qt-Zt;if(pe<0||pe===1/0)return;D.setup(N,G,gt,z,ut);let me,se=Rt;if(ut!==null&&(me=B.get(ut),se=ct,se.setIndex(me)),N.isMesh)G.wireframe===!0?(Mt.setLineWidth(G.wireframeLinewidth*le()),se.setMode(C.LINES)):se.setMode(C.TRIANGLES);else if(N.isLine){let At=G.linewidth;At===void 0&&(At=1),Mt.setLineWidth(At*le()),N.isLineSegments?se.setMode(C.LINES):N.isLineLoop?se.setMode(C.LINE_LOOP):se.setMode(C.LINE_STRIP)}else N.isPoints?se.setMode(C.POINTS):N.isSprite&&se.setMode(C.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ts("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),se.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Xt.get("WEBGL_multi_draw"))se.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const At=N._multiDrawStarts,de=N._multiDrawCounts,qt=N._multiDrawCount,ke=ut?B.get(ut).bytesPerElement:1,on=Et.get(G).currentProgram.getUniforms();for(let He=0;He<qt;He++)on.setValue(C,"_gl_DrawID",He),se.render(At[He]/ke,de[He])}else if(N.isInstancedMesh)se.renderInstances(Zt,pe,N.count);else if(z.isInstancedBufferGeometry){const At=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,de=Math.min(z.instanceCount,At);se.renderInstances(Zt,pe,de)}else se.render(Zt,pe)};function ui(M,F,z){M.transparent===!0&&M.side===Ye&&M.forceSinglePass===!1?(M.side=ze,M.needsUpdate=!0,as(M,F,z),M.side=Hi,M.needsUpdate=!0,as(M,F,z),M.side=Ye):as(M,F,z)}this.compile=function(M,F,z=null){z===null&&(z=M),b=wt.get(z),b.init(F),R.push(b),z.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(b.pushLight(N),N.castShadow&&b.pushShadow(N))}),M!==z&&M.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(b.pushLight(N),N.castShadow&&b.pushShadow(N))}),b.setupLights();const G=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const tt=N.material;if(tt)if(Array.isArray(tt))for(let ht=0;ht<tt.length;ht++){const gt=tt[ht];ui(gt,z,N),G.add(gt)}else ui(tt,z,N),G.add(tt)}),b=R.pop(),G},this.compileAsync=function(M,F,z=null){const G=this.compile(M,F,z);return new Promise(N=>{function tt(){if(G.forEach(function(ht){Et.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){N(M);return}setTimeout(tt,10)}Xt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let ni=null;function Ol(M){ni&&ni(M)}function Ha(){Wi.stop()}function Va(){Wi.start()}const Wi=new Il;Wi.setAnimationLoop(Ol),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(M){ni=M,rt.setAnimationLoop(M),M===null?Wi.stop():Wi.start()},rt.addEventListener("sessionstart",Ha),rt.addEventListener("sessionend",Va),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(F),F=rt.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,F,v),b=wt.get(M,R.length),b.init(F),R.push(b),Ut.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),X.setFromProjectionMatrix(Ut,gi,F.reversedDepth),dt=this.localClippingEnabled,Y=vt.init(this.clippingPlanes,dt),S=ot.get(M,E.length),S.init(),E.push(S),rt.enabled===!0&&rt.isPresenting===!0){const tt=y.xr.getDepthSensingMesh();tt!==null&&Qs(tt,F,-1/0,y.sortObjects)}Qs(M,F,0,y.sortObjects),S.finish(),y.sortObjects===!0&&S.sort(xt,Nt),kt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,kt&&it.addToRenderList(S,M),this.info.render.frame++,Y===!0&&vt.beginShadows();const z=b.state.shadowsArray;K.render(z,M,F),Y===!0&&vt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=S.opaque,N=S.transmissive;if(b.setupLights(),F.isArrayCamera){const tt=F.cameras;if(N.length>0)for(let ht=0,gt=tt.length;ht<gt;ht++){const ut=tt[ht];Xa(G,N,M,ut)}kt&&it.render(M);for(let ht=0,gt=tt.length;ht<gt;ht++){const ut=tt[ht];Wa(S,M,ut,ut.viewport)}}else N.length>0&&Xa(G,N,M,F),kt&&it.render(M),Wa(S,M,F);v!==null&&T===0&&(Bt.updateMultisampleRenderTarget(v),Bt.updateRenderTargetMipmap(v)),M.isScene===!0&&M.onAfterRender(y,M,F),D.resetDefaultState(),P=-1,L=null,R.pop(),R.length>0?(b=R[R.length-1],Y===!0&&vt.setGlobalState(y.clippingPlanes,b.state.camera)):b=null,E.pop(),E.length>0?S=E[E.length-1]:S=null};function Qs(M,F,z,G){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)b.pushLight(M),M.castShadow&&b.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||X.intersectsSprite(M)){G&&Vt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ut);const ht=j.update(M),gt=M.material;gt.visible&&S.push(M,ht,gt,z,Vt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||X.intersectsObject(M))){const ht=j.update(M),gt=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Vt.copy(M.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Vt.copy(ht.boundingSphere.center)),Vt.applyMatrix4(M.matrixWorld).applyMatrix4(Ut)),Array.isArray(gt)){const ut=ht.groups;for(let Ct=0,Pt=ut.length;Ct<Pt;Ct++){const Tt=ut[Ct],Zt=gt[Tt.materialIndex];Zt&&Zt.visible&&S.push(M,ht,Zt,z,Vt.z,Tt)}}else gt.visible&&S.push(M,ht,gt,z,Vt.z,null)}}const tt=M.children;for(let ht=0,gt=tt.length;ht<gt;ht++)Qs(tt[ht],F,z,G)}function Wa(M,F,z,G){const{opaque:N,transmissive:tt,transparent:ht}=M;b.setupLightsView(z),Y===!0&&vt.setGlobalState(y.clippingPlanes,z),G&&Mt.viewport(O.copy(G)),N.length>0&&rs(N,F,z),tt.length>0&&rs(tt,F,z),ht.length>0&&rs(ht,F,z),Mt.buffers.depth.setTest(!0),Mt.buffers.depth.setMask(!0),Mt.buffers.color.setMask(!0),Mt.setPolygonOffset(!1)}function Xa(M,F,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;b.state.transmissionRenderTarget[G.id]===void 0&&(b.state.transmissionRenderTarget[G.id]=new sn(1,1,{generateMipmaps:!0,type:Xt.has("EXT_color_buffer_half_float")||Xt.has("EXT_color_buffer_float")?Fn:xi,minFilter:Oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const tt=b.state.transmissionRenderTarget[G.id],ht=G.viewport||O;tt.setSize(ht.z*y.transmissionResolutionScale,ht.w*y.transmissionResolutionScale);const gt=y.getRenderTarget(),ut=y.getActiveCubeFace(),Ct=y.getActiveMipmapLevel();y.setRenderTarget(tt),y.getClearColor(q),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),kt&&it.render(z);const Pt=y.toneMapping;y.toneMapping=Gi;const Tt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),b.setupLightsView(G),Y===!0&&vt.setGlobalState(y.clippingPlanes,G),rs(M,z,G),Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt),Xt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let Qt=0,pe=F.length;Qt<pe;Qt++){const me=F[Qt],{object:se,geometry:At,material:de,group:qt}=me;if(de.side===Ye&&se.layers.test(G.layers)){const ke=de.side;de.side=ze,de.needsUpdate=!0,Za(se,z,G,At,de,qt),de.side=ke,de.needsUpdate=!0,Zt=!0}}Zt===!0&&(Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt))}y.setRenderTarget(gt,ut,Ct),y.setClearColor(q,J),Tt!==void 0&&(G.viewport=Tt),y.toneMapping=Pt}function rs(M,F,z){const G=F.isScene===!0?F.overrideMaterial:null;for(let N=0,tt=M.length;N<tt;N++){const ht=M[N],{object:gt,geometry:ut,group:Ct}=ht;let Pt=ht.material;Pt.allowOverride===!0&&G!==null&&(Pt=G),gt.layers.test(z.layers)&&Za(gt,F,z,ut,Pt,Ct)}}function Za(M,F,z,G,N,tt){M.onBeforeRender(y,F,z,G,N,tt),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(y,F,z,G,M,tt),N.transparent===!0&&N.side===Ye&&N.forceSinglePass===!1?(N.side=ze,N.needsUpdate=!0,y.renderBufferDirect(z,F,G,N,M,tt),N.side=Hi,N.needsUpdate=!0,y.renderBufferDirect(z,F,G,N,M,tt),N.side=Ye):y.renderBufferDirect(z,F,G,N,M,tt),M.onAfterRender(y,F,z,G,N,tt)}function as(M,F,z){F.isScene!==!0&&(F=Te);const G=Et.get(M),N=b.state.lights,tt=b.state.shadowsArray,ht=N.state.version,gt=H.getParameters(M,N.state,tt,F,z),ut=H.getProgramCacheKey(gt);let Ct=G.programs;G.environment=M.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(M.isMeshStandardMaterial?_:w).get(M.envMap||G.environment),G.envMapRotation=G.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,Ct===void 0&&(M.addEventListener("dispose",Ft),Ct=new Map,G.programs=Ct);let Pt=Ct.get(ut);if(Pt!==void 0){if(G.currentProgram===Pt&&G.lightsStateVersion===ht)return $a(M,gt),Pt}else gt.uniforms=H.getUniforms(M),M.onBeforeCompile(gt,y),Pt=H.acquireProgram(gt,ut),Ct.set(ut,Pt),G.uniforms=gt.uniforms;const Tt=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Tt.clippingPlanes=vt.uniform),$a(M,gt),G.needsLights=kl(M),G.lightsStateVersion=ht,G.needsLights&&(Tt.ambientLightColor.value=N.state.ambient,Tt.lightProbe.value=N.state.probe,Tt.directionalLights.value=N.state.directional,Tt.directionalLightShadows.value=N.state.directionalShadow,Tt.spotLights.value=N.state.spot,Tt.spotLightShadows.value=N.state.spotShadow,Tt.rectAreaLights.value=N.state.rectArea,Tt.ltc_1.value=N.state.rectAreaLTC1,Tt.ltc_2.value=N.state.rectAreaLTC2,Tt.pointLights.value=N.state.point,Tt.pointLightShadows.value=N.state.pointShadow,Tt.hemisphereLights.value=N.state.hemi,Tt.directionalShadowMap.value=N.state.directionalShadowMap,Tt.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Tt.spotShadowMap.value=N.state.spotShadowMap,Tt.spotLightMatrix.value=N.state.spotLightMatrix,Tt.spotLightMap.value=N.state.spotLightMap,Tt.pointShadowMap.value=N.state.pointShadowMap,Tt.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Pt,G.uniformsList=null,Pt}function qa(M){if(M.uniformsList===null){const F=M.currentProgram.getUniforms();M.uniformsList=ks.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function $a(M,F){const z=Et.get(M);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.batchingColor=F.batchingColor,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.instancingMorph=F.instancingMorph,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function zl(M,F,z,G,N){F.isScene!==!0&&(F=Te),Bt.resetTextureUnits();const tt=F.fog,ht=G.isMeshStandardMaterial?F.environment:null,gt=v===null?y.outputColorSpace:v.isXRRenderTarget===!0?v.texture.colorSpace:Ln,ut=(G.isMeshStandardMaterial?_:w).get(G.envMap||ht),Ct=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Pt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Tt=!!z.morphAttributes.position,Zt=!!z.morphAttributes.normal,Qt=!!z.morphAttributes.color;let pe=Gi;G.toneMapped&&(v===null||v.isXRRenderTarget===!0)&&(pe=y.toneMapping);const me=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,se=me!==void 0?me.length:0,At=Et.get(G),de=b.state.lights;if(Y===!0&&(dt===!0||M!==L)){const Ce=M===L&&G.id===P;vt.setState(G,M,Ce)}let qt=!1;G.version===At.__version?(At.needsLights&&At.lightsStateVersion!==de.state.version||At.outputColorSpace!==gt||N.isBatchedMesh&&At.batching===!1||!N.isBatchedMesh&&At.batching===!0||N.isBatchedMesh&&At.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&At.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&At.instancing===!1||!N.isInstancedMesh&&At.instancing===!0||N.isSkinnedMesh&&At.skinning===!1||!N.isSkinnedMesh&&At.skinning===!0||N.isInstancedMesh&&At.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&At.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&At.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&At.instancingMorph===!1&&N.morphTexture!==null||At.envMap!==ut||G.fog===!0&&At.fog!==tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==vt.numPlanes||At.numIntersection!==vt.numIntersection)||At.vertexAlphas!==Ct||At.vertexTangents!==Pt||At.morphTargets!==Tt||At.morphNormals!==Zt||At.morphColors!==Qt||At.toneMapping!==pe||At.morphTargetsCount!==se)&&(qt=!0):(qt=!0,At.__version=G.version);let ke=At.currentProgram;qt===!0&&(ke=as(G,F,N));let on=!1,He=!1,Bn=!1;const ue=ke.getUniforms(),Ne=At.uniforms;if(Mt.useProgram(ke.program)&&(on=!0,He=!0,Bn=!0),G.id!==P&&(P=G.id,He=!0),on||L!==M){Mt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ue.setValue(C,"projectionMatrix",M.projectionMatrix),ue.setValue(C,"viewMatrix",M.matrixWorldInverse);const Be=ue.map.cameraPosition;Be!==void 0&&Be.setValue(C,St.setFromMatrixPosition(M.matrixWorld)),re.logarithmicDepthBuffer&&ue.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ue.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),L!==M&&(L=M,He=!0,Bn=!0)}if(N.isSkinnedMesh){ue.setOptional(C,N,"bindMatrix"),ue.setOptional(C,N,"bindMatrixInverse");const Ce=N.skeleton;Ce&&(Ce.boneTexture===null&&Ce.computeBoneTexture(),ue.setValue(C,"boneTexture",Ce.boneTexture,Bt))}N.isBatchedMesh&&(ue.setOptional(C,N,"batchingTexture"),ue.setValue(C,"batchingTexture",N._matricesTexture,Bt),ue.setOptional(C,N,"batchingIdTexture"),ue.setValue(C,"batchingIdTexture",N._indirectTexture,Bt),ue.setOptional(C,N,"batchingColorTexture"),N._colorsTexture!==null&&ue.setValue(C,"batchingColorTexture",N._colorsTexture,Bt));const Ke=z.morphAttributes;if((Ke.position!==void 0||Ke.normal!==void 0||Ke.color!==void 0)&&Dt.update(N,z,ke),(He||At.receiveShadow!==N.receiveShadow)&&(At.receiveShadow=N.receiveShadow,ue.setValue(C,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ne.envMap.value=ut,Ne.flipEnvMap.value=ut.isCubeTexture&&ut.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(Ne.envMapIntensity.value=F.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=dm()),He&&(ue.setValue(C,"toneMappingExposure",y.toneMappingExposure),At.needsLights&&Gl(Ne,Bn),tt&&G.fog===!0&&bt.refreshFogUniforms(Ne,tt),bt.refreshMaterialUniforms(Ne,G,nt,et,b.state.transmissionRenderTarget[M.id]),ks.upload(C,qa(At),Ne,Bt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ks.upload(C,qa(At),Ne,Bt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ue.setValue(C,"center",N.center),ue.setValue(C,"modelViewMatrix",N.modelViewMatrix),ue.setValue(C,"normalMatrix",N.normalMatrix),ue.setValue(C,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ce=G.uniformsGroups;for(let Be=0,tr=Ce.length;Be<tr;Be++){const Xi=Ce[Be];lt.update(Xi,ke),lt.bind(Xi,ke)}}return ke}function Gl(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function kl(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(M,F,z){const G=Et.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Et.get(M.texture).__webglTexture=F,Et.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){const z=Et.get(M);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0};const Hl=C.createFramebuffer();this.setRenderTarget=function(M,F=0,z=0){v=M,U=F,T=z;let G=!0,N=null,tt=!1,ht=!1;if(M){const ut=Et.get(M);if(ut.__useDefaultFramebuffer!==void 0)Mt.bindFramebuffer(C.FRAMEBUFFER,null),G=!1;else if(ut.__webglFramebuffer===void 0)Bt.setupRenderTarget(M);else if(ut.__hasExternalTextures)Bt.rebindTextures(M,Et.get(M.texture).__webglTexture,Et.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Tt=M.depthTexture;if(ut.__boundDepthTexture!==Tt){if(Tt!==null&&Et.has(Tt)&&(M.width!==Tt.image.width||M.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(M)}}const Ct=M.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Pt=Et.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Pt[F])?N=Pt[F][z]:N=Pt[F],tt=!0):M.samples>0&&Bt.useMultisampledRTT(M)===!1?N=Et.get(M).__webglMultisampledFramebuffer:Array.isArray(Pt)?N=Pt[z]:N=Pt,O.copy(M.viewport),k.copy(M.scissor),W=M.scissorTest}else O.copy(Gt).multiplyScalar(nt).floor(),k.copy(_t).multiplyScalar(nt).floor(),W=Kt;if(z!==0&&(N=Hl),Mt.bindFramebuffer(C.FRAMEBUFFER,N)&&G&&Mt.drawBuffers(M,N),Mt.viewport(O),Mt.scissor(k),Mt.setScissorTest(W),tt){const ut=Et.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+F,ut.__webglTexture,z)}else if(ht){const ut=F;for(let Ct=0;Ct<M.textures.length;Ct++){const Pt=Et.get(M.textures[Ct]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ct,Pt.__webglTexture,z,ut)}}else if(M!==null&&z!==0){const ut=Et.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ut.__webglTexture,z)}P=-1},this.readRenderTargetPixels=function(M,F,z,G,N,tt,ht,gt=0){if(!(M&&M.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=Et.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(ut=ut[ht]),ut){Mt.bindFramebuffer(C.FRAMEBUFFER,ut);try{const Ct=M.textures[gt],Pt=Ct.format,Tt=Ct.type;if(!re.textureFormatReadable(Pt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!re.textureTypeReadable(Tt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-G&&z>=0&&z<=M.height-N&&(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+gt),C.readPixels(F,z,G,N,It.convert(Pt),It.convert(Tt),tt))}finally{const Ct=v!==null?Et.get(v).__webglFramebuffer:null;Mt.bindFramebuffer(C.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(M,F,z,G,N,tt,ht,gt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=Et.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(ut=ut[ht]),ut)if(F>=0&&F<=M.width-G&&z>=0&&z<=M.height-N){Mt.bindFramebuffer(C.FRAMEBUFFER,ut);const Ct=M.textures[gt],Pt=Ct.format,Tt=Ct.type;if(!re.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!re.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Zt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Zt),C.bufferData(C.PIXEL_PACK_BUFFER,tt.byteLength,C.STREAM_READ),M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+gt),C.readPixels(F,z,G,N,It.convert(Pt),It.convert(Tt),0);const Qt=v!==null?Et.get(v).__webglFramebuffer:null;Mt.bindFramebuffer(C.FRAMEBUFFER,Qt);const pe=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Lh(C,pe,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Zt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,tt),C.deleteBuffer(Zt),C.deleteSync(pe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,z=0){const G=Math.pow(2,-z),N=Math.floor(M.image.width*G),tt=Math.floor(M.image.height*G),ht=F!==null?F.x:0,gt=F!==null?F.y:0;Bt.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,z,0,0,ht,gt,N,tt),Mt.unbindTexture()};const Vl=C.createFramebuffer(),Wl=C.createFramebuffer();this.copyTextureToTexture=function(M,F,z=null,G=null,N=0,tt=null){tt===null&&(N!==0?(ts("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=N,N=0):tt=0);let ht,gt,ut,Ct,Pt,Tt,Zt,Qt,pe;const me=M.isCompressedTexture?M.mipmaps[tt]:M.image;if(z!==null)ht=z.max.x-z.min.x,gt=z.max.y-z.min.y,ut=z.isBox3?z.max.z-z.min.z:1,Ct=z.min.x,Pt=z.min.y,Tt=z.isBox3?z.min.z:0;else{const Ke=Math.pow(2,-N);ht=Math.floor(me.width*Ke),gt=Math.floor(me.height*Ke),M.isDataArrayTexture?ut=me.depth:M.isData3DTexture?ut=Math.floor(me.depth*Ke):ut=1,Ct=0,Pt=0,Tt=0}G!==null?(Zt=G.x,Qt=G.y,pe=G.z):(Zt=0,Qt=0,pe=0);const se=It.convert(F.format),At=It.convert(F.type);let de;F.isData3DTexture?(Bt.setTexture3D(F,0),de=C.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Bt.setTexture2DArray(F,0),de=C.TEXTURE_2D_ARRAY):(Bt.setTexture2D(F,0),de=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,F.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,F.unpackAlignment);const qt=C.getParameter(C.UNPACK_ROW_LENGTH),ke=C.getParameter(C.UNPACK_IMAGE_HEIGHT),on=C.getParameter(C.UNPACK_SKIP_PIXELS),He=C.getParameter(C.UNPACK_SKIP_ROWS),Bn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,me.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,me.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ct),C.pixelStorei(C.UNPACK_SKIP_ROWS,Pt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Tt);const ue=M.isDataArrayTexture||M.isData3DTexture,Ne=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){const Ke=Et.get(M),Ce=Et.get(F),Be=Et.get(Ke.__renderTarget),tr=Et.get(Ce.__renderTarget);Mt.bindFramebuffer(C.READ_FRAMEBUFFER,Be.__webglFramebuffer),Mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let Xi=0;Xi<ut;Xi++)ue&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Et.get(M).__webglTexture,N,Tt+Xi),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Et.get(F).__webglTexture,tt,pe+Xi)),C.blitFramebuffer(Ct,Pt,ht,gt,Zt,Qt,ht,gt,C.DEPTH_BUFFER_BIT,C.NEAREST);Mt.bindFramebuffer(C.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||Et.has(M)){const Ke=Et.get(M),Ce=Et.get(F);Mt.bindFramebuffer(C.READ_FRAMEBUFFER,Vl),Mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,Wl);for(let Be=0;Be<ut;Be++)ue?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ke.__webglTexture,N,Tt+Be):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ke.__webglTexture,N),Ne?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ce.__webglTexture,tt,pe+Be):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ce.__webglTexture,tt),N!==0?C.blitFramebuffer(Ct,Pt,ht,gt,Zt,Qt,ht,gt,C.COLOR_BUFFER_BIT,C.NEAREST):Ne?C.copyTexSubImage3D(de,tt,Zt,Qt,pe+Be,Ct,Pt,ht,gt):C.copyTexSubImage2D(de,tt,Zt,Qt,Ct,Pt,ht,gt);Mt.bindFramebuffer(C.READ_FRAMEBUFFER,null),Mt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Ne?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(de,tt,Zt,Qt,pe,ht,gt,ut,se,At,me.data):F.isCompressedArrayTexture?C.compressedTexSubImage3D(de,tt,Zt,Qt,pe,ht,gt,ut,se,me.data):C.texSubImage3D(de,tt,Zt,Qt,pe,ht,gt,ut,se,At,me):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,tt,Zt,Qt,ht,gt,se,At,me.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,tt,Zt,Qt,me.width,me.height,se,me.data):C.texSubImage2D(C.TEXTURE_2D,tt,Zt,Qt,ht,gt,se,At,me);C.pixelStorei(C.UNPACK_ROW_LENGTH,qt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ke),C.pixelStorei(C.UNPACK_SKIP_PIXELS,on),C.pixelStorei(C.UNPACK_SKIP_ROWS,He),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Bn),tt===0&&F.generateMipmaps&&C.generateMipmap(de),Mt.unbindTexture()},this.initRenderTarget=function(M){Et.get(M).__webglFramebuffer===void 0&&Bt.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Bt.setTextureCube(M,0):M.isData3DTexture?Bt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Bt.setTexture2DArray(M,0):Bt.setTexture2D(M,0),Mt.unbindTexture()},this.resetState=function(){U=0,T=0,v=null,Mt.reset(),D.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class fm{constructor(t,e){this.scene=t,this.clippingPlanes=e||[],this.logicalWidth=160,this.logicalDepth=160,this.width=this.logicalWidth*3,this.depth=this.logicalDepth*3,this.grid=[],this.geometry=null,this.mesh=null,this.waterMesh=null,this.meshes=[],this.buildings=[],this.initTerrain(),this.totalHousingPop=0,this.entityGrid=[],this.initEntityGrid()}initEntityGrid(){this.entityGrid=[];for(let t=0;t<this.logicalWidth;t++){this.entityGrid[t]=[];for(let e=0;e<this.logicalDepth;e++)this.entityGrid[t][e]=[]}}registerEntity(t,e,i,n){this.isValidGrid(e,i)&&(t._spatial={x:e,z:i,type:n},this.entityGrid[e][i].push(t))}unregisterEntity(t){if(!t._spatial)return;const{x:e,z:i}=t._spatial;if(this.isValidGrid(e,i)){const n=this.entityGrid[e][i],s=n.indexOf(t);s!==-1&&n.splice(s,1)}t._spatial=null}gridToWorld(t){return t-this.logicalWidth/2+.5}moveEntity(t,e,i,n,s,a){if(Math.floor(e)===Math.floor(n)&&Math.floor(i)===Math.floor(s)){t._spatial={x:n,z:s,type:a};return}this.unregisterEntity(t),this.registerEntity(t,n,s,a)}findNearestEntity(t,e,i,n){let s=null,a=n*n;const o=Math.ceil(n),h=Math.max(0,e-o),l=Math.min(this.logicalWidth-1,e+o),c=Math.max(0,i-o),d=Math.min(this.logicalDepth-1,i+o);for(let u=h;u<=l;u++)for(let m=c;m<=d;m++){const g=this.entityGrid[u][m];for(let x=0;x<g.length;x++){const f=g[x];if(f._spatial&&f._spatial.type===t){const p=u-e,S=m-i,b=p*p+S*S;if(b<a){if(f.isDead)continue;a=b,s=f}}}}return s}findBestTarget(t,e,i,n,s){let a=null,o=1/0;const h=Math.ceil(n),l=Math.max(0,e-h),c=Math.min(this.logicalWidth-1,e+h),d=Math.max(0,i-h),u=Math.min(this.logicalDepth-1,i+h);for(let m=l;m<=c;m++)for(let g=d;g<=u;g++){const x=this.entityGrid[m][g];for(let f=0;f<x.length;f++){const p=x[f];if(p._spatial&&p._spatial.type===t){if(p.isDead)continue;const S=m-e,b=g-i,E=Math.sqrt(S*S+b*b);if(E>n)continue;const R=s(p,E);R<o&&(o=R,a=p)}}}return a}initTerrain(){this.grid=[];for(let i=0;i<this.logicalWidth;i++){this.grid[i]=[];for(let n=0;n<this.logicalDepth;n++)this.grid[i][n]={height:0,type:"grass",hasBuilding:!1,noise:(Math.random()-.5)*.05}}this.geometry=new Vi(this.width,this.depth,this.width,this.depth);const t=this.geometry.attributes.position.count;this.geometry.setAttribute("color",new Ge(new Float32Array(t*3),3));const e=this.geometry.attributes.position;for(let i=0;i<t;i++){const n=e.getX(i),s=e.getY(i),a=this.getVisualOffset(n,s);e.setX(i,n+a.x),e.setY(i,s+a.y)}e.needsUpdate=!0,this.generateRandomTerrain(),this.createMesh(),this.createWater()}generateRandomTerrain(){this.seed=Math.random()*100;for(let t=0;t<this.logicalWidth;t++)for(let e=0;e<this.logicalDepth;e++){const i=t/this.logicalWidth,n=e/this.logicalDepth;let a=this.seamlessFbm(i,n,this.seed)*35-15;a=Math.max(-5,a),a=Math.round(a),this.grid[t][e].height=a;let o=this.seamlessFbm(i,n,this.seed+123.45);this.grid[t][e].moisture=o}this.updateMesh(),this.updateColors()}updateMesh(){const t=this.geometry.attributes.position.array;for(let e=0;e<t.length;e+=3){const i=t[e],n=t[e+1],s=Math.round(i+this.width/2),a=Math.round(-n+this.depth/2),o=(s%this.logicalWidth+this.logicalWidth)%this.logicalWidth,h=(a%this.logicalDepth+this.logicalDepth)%this.logicalDepth;this.grid[o]&&this.grid[o][h]&&(t[e+2]=this.grid[o][h].height)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}createMesh(){this.mesh&&this.scene.remove(this.mesh),this.meshes=[];const t=new oe({vertexColors:!0,flatShading:!1,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.mesh=new ne(this.geometry,t),this.mesh.rotation.x=-Math.PI/2,this.mesh.position.set(0,0,0);const e=new Fe;e.setAttribute("position",this.geometry.attributes.position);const i=[],n=this.width+1,s=this.depth+1;for(let c=0;c<s;c++)for(let d=0;d<n;d++){const u=c*n+d;d<this.width&&i.push(u,u+1),c<this.depth&&i.push(u,u+n)}e.setIndex(i);const a=new Al({color:0,transparent:!0,opacity:.15,clippingPlanes:this.clippingPlanes}),o=new pc(e,a);o.position.set(0,0,.04),this.mesh.add(o);const h=new Rl({color:0,size:.15,sizeAttenuation:!0,transparent:!0,opacity:.2,clippingPlanes:this.clippingPlanes}),l=new mc(this.geometry,h);l.position.set(0,0,.05),this.mesh.add(l),this.scene.add(this.mesh),this.meshes.push(this.mesh)}createWater(){this.waterMesh&&this.scene.remove(this.waterMesh);const t=new Vi(this.width,this.depth),e=new oe({color:2003199,transparent:!0,opacity:.6,side:Ye,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.waterMesh=new ne(t,e),this.waterMesh.rotation.x=-Math.PI/2,this.waterMesh.position.set(0,.2,0),this.scene.add(this.waterMesh)}updateLights(t){const e=t>=18||t<6;this._lastIsNight!==e&&(this._lastIsNight=e,this.updateColors(e),console.log(`Terrain: Night Lights Update. Night=${e}`))}setSeason(t){this.currentSeason!==t&&(console.log(`[DEBUG] Terrain.setSeason: Changing from ${this.currentSeason} to ${t}`),this.currentSeason=t,this.updateColors(this._lastIsNight))}updateColors(t){t===void 0&&(t=this._lastIsNight||!1);const e=this.geometry.attributes.color.array,i=this.geometry.attributes.position.array,n=this.currentSeason||"Spring";console.log(`[DEBUG] Terrain.updateColors: Season=${n}, IsNight=${t}`);for(let s=0;s<i.length;s+=3){const a=i[s],o=i[s+1],h=Math.round(a+this.width/2),l=Math.round(-o+this.depth/2),c=(h%this.logicalWidth+this.logicalWidth)%this.logicalWidth,d=(l%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[c]&&this.grid[c][d]){const u=this.grid[c][d],m=u.height,g=u.noise,x=u.moisture||.5,f=this.getBiomeColor(m,x,g,t,n,c,d);e[s]=f.r,e[s+1]=f.g,e[s+2]=f.b}}this.geometry.attributes.color.needsUpdate=!0}getBiomeColor(t,e,i,n,s,a,o,h=!1){const l=new pt;if(t<=0){if(h){const d=new pt(8965375),u=new pt(26316);let m=Math.abs(t)/10;return m=Math.min(1,m),l.copy(d).lerp(u,m),l}l.setHex(16032864);const c=.9+i*.2;return l.multiplyScalar(c),l}if(t<=4)if(s==="Winter"){l.setHex(12433259);const c=(i+1)*.5;l.lerp(new pt(10525274),c*.2)}else s==="Summer"?l.setHex(43088):l.setHex(8969608);else if(t<=8)if(s==="Winter"){l.setHex(16777215);const c=(i+1)*.5;l.lerp(new pt(15660543),c*.1)}else if(s==="Autumn"){const c=a*12.9898+o*78.233;let d=Math.sin(c)*43758.5453;d=d-Math.floor(d),d>.66?l.setHex(13369344):d>.33?l.setHex(16763904):l.setHex(2263842)}else s==="Summer"?l.setHex(25600):l.setHex(2263842);else{l.setHex(8421504);const c=(i+1)*.5;l.lerp(new pt(6316128),c*.2)}if(e<.5&&t<=8){const c=new pt(16032864);let d=1;e>.35&&(d=1-(e-.35)/.15),l.lerp(c,d)}if(e>.6&&t<=3){const c=new pt(3100495);let d=Math.min(1,Math.max(0,(e-.6)/.15));s==="Autumn"&&c.setHex(4929057);let u=t>2?1-(t-2):1;l.lerp(c,d*u)}if(n){const c={};l.getHSL(c),c.l*=.3;let d=0;if(t>0){const u=this.logicalWidth,m=this.logicalDepth;for(let g=-2;g<=2;g++)for(let x=-2;x<=2;x++){const f=(a+g+u)%u,p=(o+x+m)%m;if(this.grid[f]&&this.grid[f][p]&&this.grid[f][p].hasBuilding){const S=Math.sqrt(g*g+x*x);S<=2.5&&(d+=Math.max(0,1-S/2.5))}}}if(d>0){d=Math.min(1,d);const u=.1;c.h=c.h*(1-d)+u*d,c.l+=d*.4}l.setHSL(c.h,c.s,c.l)}return l}modifyMoisture(t,e,i){const n=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,s=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[n]&&this.grid[n][s]){const a=this.grid[n][s];a.moisture=Math.max(0,Math.min(1,(a.moisture||.5)+i)),this.updateColorAt(n,s)}}updateColorAt(t,e){const i=this._lastIsNight||!1,n=this.currentSeason||"Spring",s=this.geometry.attributes.color,a=this.logicalWidth,o=this.logicalDepth,h=a+1,l=[{x:t,z:e}];t===0&&l.push({x:a,z:e}),e===0&&l.push({x:t,z:o}),t===0&&e===0&&l.push({x:a,z:o}),l.forEach(c=>{const d=c.z*h+c.x;if(d<0||d>=s.count)return;const u=c.x%a,m=c.z%o;if(this.grid[u]&&this.grid[u][m]){const g=this.grid[u][m],x=g.height,f=g.noise,p=g.moisture||.5,S=this.getBiomeColor(x,p,f,i,n,u,m);s.setXYZ(d,S.r,S.g,S.b)}}),s.needsUpdate=!0}modifyHeight(t,e,i){let n=0;const s=[],a=(l,c)=>({x:(l+this.logicalWidth)%this.logicalWidth,z:(c+this.logicalDepth)%this.logicalDepth}),o=a(t,e);this.grid[o.x]&&this.grid[o.x][o.z]&&(this.grid[o.x][o.z].height+=i,n+=Math.abs(i),s.push(o));let h=0;for(;h<s.length;){const l=s[h++],c=l.x,d=l.z,u=this.grid[c][d],m=u.height;u.hasBuilding&&u.building&&(u.building.userData.type==="cave"?(u.building.y=m,u.building.userData.y=m):this.removeBuilding(u.building));const g=[{x:c+1,z:d},{x:c-1,z:d},{x:c,z:d+1},{x:c,z:d-1}];for(const f of g){const p=a(f.x,f.z),S=this.grid[p.x][p.z],b=S.height,E=m-b;if(E>1){const R=m-1;n+=Math.abs(R-b),S.height=R,s.push(p)}else if(E<-1){const R=m+1;n+=Math.abs(R-b),S.height=R,s.push(p)}}[{x:(c-1+this.logicalWidth)%this.logicalWidth,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:c,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:(c-1+this.logicalWidth)%this.logicalWidth,z:d},{x:c,z:d}].forEach(f=>{const p=this.grid[f.x][f.z];p.hasBuilding&&p.building&&(this.checkBuildingIntegrity(p.building)||this.removeBuilding(p.building))})}return this.updateMesh(),this.updateColors(),n}getTileHeight(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]?this.grid[i][n].height:0}getVisualOffset(t,e){if(this.grid){const d=this.logicalWidth||80,u=this.logicalDepth||80,m=Math.round(t+d/2),g=Math.round(-e+u/2),x=(m%d+d)%d,f=(g%u+u)%u;if(this.grid[x]&&this.grid[x][f]&&this.grid[x][f].hasBuilding)return{x:0,y:0}}const i=this.logicalWidth||80,n=this.logicalDepth||80,s=Math.PI*2/i,a=Math.PI*2/n,o=t*s*10,h=e*a*10,l=(Math.sin(h)+Math.cos(o))*.2,c=(Math.cos(h)+Math.sin(o))*.2;return{x:l,y:c}}getVisualPosition(t,e,i=!0){const n=this.logicalWidth||80,s=this.logicalDepth||80,a=i?.5:0,o=t-n/2+a,h=e-s/2+a,l=o,c=-h,d=this.getVisualOffset(l,c),u=o+d.x,m=h-d.y,g=this.getTileHeight(t,e);return{x:u,y:g,z:m}}getInterpolatedHeight(t,e){let i=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,n=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;const s=Math.floor(i),a=Math.floor(n),o=(s+1)%this.logicalWidth,h=(a+1)%this.logicalDepth,l=i-s,c=n-a,d=this.grid[s][a].height,u=this.grid[o][a].height,m=this.grid[s][h].height,g=this.grid[o][h].height,x=d*(1-l)+u*l,f=m*(1-l)+g*l;return x*(1-c)+f*c}isValidGrid(t,e){return t>=0&&t<this.logicalWidth&&e>=0&&e<this.logicalDepth}raise(t,e){return this.modifyHeight(t,e,1)}lower(t,e){return this.modifyHeight(t,e,-1)}seamlessFbm(t,e,i){let n=0,s=1,a=1,o=0;for(let h=0;h<4;h++)n+=this.periodicNoise(t*a,e*a,a,i)*s,o+=s,s*=.5,a*=2;return n/o}periodicNoise(t,e,i,n){const a=t*5,o=e*5,h=i*5,l=Math.floor(a),c=Math.floor(o),d=a-l,u=o-c,m=Math.floor(h),g=R=>(R%m+m)%m,x=this.random(g(l),g(c),n),f=this.random(g(l+1),g(c),n),p=this.random(g(l),g(c+1),n),S=this.random(g(l+1),g(c+1),n),b=d*d*(3-2*d),E=u*u*(3-2*u);return(1-b)*(1-E)*x+b*(1-E)*f+(1-b)*E*p+b*E*S}raycast(t,e){t.clone();const s=e.clone().normalize(),a=new I;for(let o=0;o<300;o+=.5){if(a.copy(s).multiplyScalar(o).add(t),a.y>50)continue;if(a.y<-10)break;const h=a.x+this.logicalWidth/2,l=a.z+this.logicalDepth/2,c=this.getInterpolatedHeight(h,l);if(a.y<=c)return a.y=c,a}return null}random(t,e,i){const n=Math.sin(t*12.9898+e*78.233+i)*43758.5453123;return n-Math.floor(n)}removeBuilding(t){if(!t)return;this.unregisterEntity(t);const e=this.buildings.indexOf(t);e>-1&&this.buildings.splice(e,1);const i=this.getBuildingSize(t.type);for(let n=0;n<i;n++)for(let s=0;s<i;s++){const a=(t.gridX+n)%this.logicalWidth,o=(t.gridZ+s)%this.logicalDepth;this.grid[a][o].building===t&&(this.grid[a][o].hasBuilding=!1,this.grid[a][o].building=null)}}addBuilding(t,e,i,n=!1){if(!this.grid[e]||!this.grid[e][i])return null;const s=this.grid[e][i].height,a={type:t,gridX:e,gridZ:i,y:s,rotation:Math.random()*Math.PI*2,population:0,id:Math.random().toString(36).substr(2,9),userData:{type:t,gridX:e,gridZ:i,population:0,hp:t==="goblin_hut"?100:t==="cave"?200:50}},o=this.logicalWidth,h=this.logicalDepth,l=this.getBuildingSize(t);if(this.clearArea(e,i,l),this.flattenArea(e,i,l),!n&&t!=="cave"&&!this.checkFlatArea(e,i,l))return null;this.buildings.push(a);for(let c=0;c<l;c++)for(let d=0;d<l;d++){const u=(e+c)%o,m=(i+d)%h,g=this.grid[u][m];g.hasBuilding=!0,g.building=a}return console.log(`[Terrain] Building Added: ${t} at (${e}, ${i}) Size:${l}x${l}. Total: ${this.buildings.length}`),this.registerEntity(a,e,i,"building"),this.updateMesh(),a}clearArea(t,e,i){const n=new Set,s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<i;o++)for(let h=0;h<i;h++){const l=(t+o)%s,c=(e+h)%a,d=this.grid[l][c];d.hasBuilding&&d.building&&n.add(d.building)}for(const o of n)console.log(`[Terrain] Clearing obstacle: ${o.type} for new construction.`),this.removeBuilding(o)}getBuildingSize(t){return t==="tower"||t==="barracks"?3:t==="farm"||t==="house"?2:1}checkBuildingIntegrity(t){if(!t)return!1;const e=this.grid[t.gridX][t.gridZ].height;if(e<=0)return!1;if(t.userData.type!=="cave"&&(typeof t.y!="number"||Math.abs(e-t.y)>.1))return console.log(`[Terrain] Integrity Fail: Type = ${t.userData.type} RootH = ${e.toFixed(2)} b.y = ${t.y} (Height Mismatch)`),!1;const i=t.userData.type,n=this.getBuildingSize(i);if(i==="cave")return!0;const s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<=n;o++)for(let h=0;h<=n;h++){const l=(t.gridX+o)%s,c=(t.gridZ+h)%a,d=this.grid[l][c];if(d.height!==e||d.height<=0)return!1}return!0}checkFlatArea(t,e,i){const n=this.logicalWidth,s=this.logicalDepth;if(!this.grid[t]||!this.grid[t][e])return!1;const a=this.grid[t][e].height;if(a<=0||this.grid[t][e].hasBuilding)return!1;for(let o=0;o<=i;o++)for(let h=0;h<=i;h++){const l=(t+o)%n,c=(e+h)%s,d=this.grid[l][c];if(d.height!==a||d.height<=0||o<i&&h<i&&d.hasBuilding)return!1}return!0}flattenArea(t,e,i){const n=this.grid[t][e].height,s=this.logicalWidth,a=this.logicalDepth;let o=!1;for(let h=0;h<=i;h++)for(let l=0;l<=i;l++){const c=(t+h)%s,d=(e+l)%a,u=this.grid[c][d];u.height!==n&&(u.height=n,o=!0,u.hasBuilding&&u.building&&this.checkBuildingIntegrity(u.building))}return o&&(this.updateMesh(),this.updateColors()),!0}updatePopulation(t,e,i,n){let s=0;this.buildings.forEach(f=>{const p=f.userData.type;(p==="house"||p==="mansion"||p==="castle")&&f.userData.population>0&&(s+=f.userData.population)}),this.totalHousingPop=s;const a=Math.floor(s)+i;let o=.005;e&&(o*=.1);let h=a*o*t;const l=window.game&&window.game.resources?window.game.resources:{grain:0,fish:0,meat:0};let c=!0;if(h>0){let f=h*.4,p=h*.3,S=h*.3;const b=(U,T)=>{if(T<=0)return 0;if(l[U]>=T)return l[U]-=T,0;{const v=l[U];return l[U]=0,T-v}};let E=b("grain",f),R=b("meat",p),y=b("fish",S);E>0&&(E=b("meat",E)),R>0&&(R=b("fish",R)),E>0&&(E=b("fish",E));let A=E+R+y;A>0&&(A=b("grain",A),A=b("meat",A),A=b("fish",A)),A>1e-4&&(c=!1)}let d=0;l.grain>0&&d++,l.fish>0&&d++,l.meat>0&&d++;let u=.5;d===1&&(u=1),d===2&&(u=2.5),d===3&&(u=5);const m=.05*u;this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const g=20,x=this.frameCount%g;this.buildings.forEach((f,p)=>{if(p%g!==x)return;const S=t*g,b=f.userData.type;if(b==="house"||b==="barracks"){const E=f.userData.gridX,R=f.userData.gridZ;let y=m,A=10;b==="barracks"&&(y*=5,A=200);const U=2e5/(2e5+a);if(y*=U,c||(y=0),f.userData.population+=y*S,f.userData.population>=A&&n)if(b==="house")n(E,R,b,f)?f.userData.population=0:f.userData.population=A;else if(b==="barracks"){let T=0;for(let v=0;v<4;v++)n(E,R,b,f)&&T++;T>0?f.userData.population=0:f.userData.population=A}else f.userData.population>A&&(f.userData.population=A)}else if(b==="tower"){const E=m*5,R=300;if(f.userData.population+=E*S,f.userData.population>=R&&n){let y=0;for(let A=0;A<4;A++)n(f.userData.gridX,f.userData.gridZ,"tower",f)&&y++;y>0?f.userData.population=0:f.userData.population=R}}else if(b==="farm"){for(f.userData.population=(f.userData.population||0)+10*S;f.userData.population>=100;)if(f.userData.population-=100,window.game&&window.game.resources){const R=f.userData.gridX,y=f.userData.gridZ,A=this.grid[R][y].moisture||.5;let T=1-Math.abs(A-.5)*2;T<.2&&(T=.2);const v=Math.floor(8*T);window.game.resources.grain+=v}}})}update(t,e,i){this.colorsDirty&&(this.updateColors(),this.colorsDirty=!1);const n=window.game&&window.game.units?window.game.units.length:0;this.updatePopulation(t,i,n,e)}updateLights(t){}serialize(){const t={logicalWidth:this.logicalWidth,logicalDepth:this.logicalDepth,grid:[]},e=new Set;for(let i=0;i<this.logicalWidth;i++){t.grid[i]=[];for(let n=0;n<this.logicalDepth;n++){const s=this.grid[i][n],a={};if(a.h=Math.round(s.height*100)/100,a.n=Math.round(s.noise*100)/100,s.moisture!==void 0&&(a.m=Math.round(s.moisture*100)/100),s.hasBuilding&&(a.hb=1,s.building&&!e.has(s.building.id))){e.add(s.building.id);const o=s.building.gridX!==void 0?s.building.gridX:s.building.userData.gridX,h=s.building.gridZ!==void 0?s.building.gridZ:s.building.userData.gridZ;a.b={t:s.building.userData.type,p:s.building.userData.population,x:o,z:h,r:s.building.rotation!==void 0?Math.round(s.building.rotation*100)/100:0}}t.grid[i][n]=a}}return t}deserialize(t){if(!t){console.error("Terrain.deserialize received invalid data:",t);return}this.buildings.forEach(e=>{this.scene.remove(e),e.userData.clones&&e.userData.clones.forEach(i=>this.scene.remove(i))}),this.buildings=[];for(let e=0;e<this.logicalWidth;e++)for(let i=0;i<this.logicalDepth;i++){const n=this.grid[e][i];n.hasBuilding&&n.building&&this.scene.remove(n.building),n.hasBuilding=!1,n.building=null}this.logicalWidth=t.logicalWidth,this.logicalDepth=t.logicalDepth;for(let e=0;e<this.logicalWidth;e++)for(let i=0;i<this.logicalDepth;i++){const n=t.grid[e][i],s=n.h!==void 0?n.h:n.height,a=n.n!==void 0?n.n:n.noise;this.grid[e][i].height=s,this.grid[e][i].noise=a,n.m!==void 0?this.grid[e][i].moisture=n.m:n.moisture!==void 0&&(this.grid[e][i].moisture=n.moisture);let o=n.hb||n.hasBuilding,h=n.b||n.building;if(o&&h){const l=h.x!==void 0?h.x:h.gridX,c=h.z!==void 0?h.z:h.gridZ;if(l===e&&c===i){const d=h.t||h.type,u={gridX:l,gridZ:c,type:d,population:h.p!==void 0?h.p:h.population,rotation:h.r!==void 0?h.r:h.rotation};d==="house"?this.restoreHouse(u):d==="farm"?this.restoreFarm(u):d==="mansion"?this.restoreMansion(u):d==="castle"?this.restoreCastle(u):d==="goblin_hut"?this.restoreGoblinHut(u):d==="tower"?this.restoreTower(u):d==="barracks"?this.restoreBarracks(u):d==="cave"&&this.restoreCave(u)}}}this.updateMesh(),this.updateColors()}restoreHouse(t){const e=this.addBuilding("house",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreFarm(t){const e=this.addBuilding("farm",t.gridX,t.gridZ,!0);e&&(e.userData.hp=5,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreMansion(t){const e=this.addBuilding("mansion",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCastle(t){this.restoreMansion(t)}updateMeshPosition(t){if(!t)return;const e=this.logicalWidth,i=this.logicalDepth,n=t.position.x,s=t.position.z,a=Math.round(n/e)*e,o=Math.round(s/i)*i;(this.mesh.position.x!==a||this.mesh.position.z!==o)&&(this.mesh.position.set(a,0,o),this.waterMesh&&this.waterMesh.position.set(a,.2,o))}restoreGoblinHut(t){const e=this.addBuilding("goblin_hut",t.gridX,t.gridZ,!0);e?(e.population=t.population||1,e.userData.population=t.population||1,t.rotation!==void 0&&(e.rotation=t.rotation)):console.warn("Failed to restore goblin_hut at",t.gridX,t.gridZ)}restoreTower(t){const e=this.addBuilding("tower",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreBarracks(t){const e=this.addBuilding("barracks",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCave(t){const e=this.addBuilding("cave",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0)}findPath(t,e,i,n){const s=this.logicalWidth,a=this.logicalDepth,h=[{x:t,z:e,g:0,h:0,f:0,parent:null}],l=new Set;let c=0;const d=1e3;for(;h.length>0;){if(c++,c>d)return null;h.sort((x,f)=>x.f-f.f);const u=h.shift();if(u.x===i&&u.z===n){const x=[];let f=u;for(;f;)x.push({x:f.x,z:f.z}),f=f.parent;return x.reverse()}const m=`${u.x},${u.z} `;l.add(m);const g=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(const x of g){let f=u.x+x.x,p=u.z+x.z;if(f<0&&(f=s-1),f>=s&&(f=0),p<0&&(p=a-1),p>=a&&(p=0),l.has(`${f},${p} `))continue;const S=this.grid[u.x][u.z].height;if(!this.grid[f]||!this.grid[f][p])continue;const b=this.grid[f][p].height;if(b<=0||Math.abs(b-S)>2||this.grid[f][p].hasBuilding)continue;const E=u.g+1,R=h.find(v=>v.x===f&&v.z===p);if(R&&R.g<=E)continue;let y=Math.abs(f-i),A=Math.abs(p-n);y>s/2&&(y=s-y),A>a/2&&(A=a-A);const U=y+A,T={x:f,z:p,g:E,h:U,f:E+U,parent:u};if(R){const v=h.indexOf(R);h.splice(v,1)}h.push(T)}}return null}}class pm{constructor(t,e,i,n,s,a,o){this.scene=t,this.camera=e,this.terrain=i,this.spawnCallback=n,this.units=s||[],this.unitRenderer=a,this.game=o,this.raycaster=new Sc,this.mouse=new yt,this.mode="raise";const h=new ci(.2,1,8),l=new es({color:16711680,wireframe:!0});this.cursor=new ne(h,l),this.cursor.rotation.x=Math.PI,this.scene.add(this.cursor),this.tooltip=document.getElementById("tooltip"),this.setupUI(),window.addEventListener("pointerdown",this.onPointerDown.bind(this)),window.addEventListener("pointerup",this.onPointerUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),this.dragThreshold=5,this.downPosition=new yt}setupUI(){const t=document.getElementById("btn-raise"),e=document.getElementById("btn-lower"),i=document.getElementById("btn-spawn"),n=document.getElementById("btn-barracks"),s=document.getElementById("btn-tower"),a=document.getElementById("btn-cancel"),o=h=>{this.mode=h,t&&t.classList.toggle("active",h==="raise"),e&&e.classList.toggle("active",h==="lower"),i&&i.classList.toggle("active",h==="spawn"),n&&n.classList.toggle("active",h==="barracks"),s&&s.classList.toggle("active",h==="tower"),a&&a.classList.toggle("active",h==="cancel")};t&&t.addEventListener("click",()=>o("raise")),e&&e.addEventListener("click",()=>o("lower")),a&&a.addEventListener("click",()=>o("cancel")),i&&i.addEventListener("click",()=>o("spawn")),n&&n.addEventListener("click",()=>o("barracks")),s&&s.addEventListener("click",()=>o("tower"))}isUIInteraction(t){const e=t.target;return e.closest("button")||e.closest("input")||e.closest("select")||e.closest("a")||e.id==="minimap"||e.closest("#minimap")||e.closest("#start-screen")||e.closest("#save-modal")||e.closest(".ui-container")}onPointerDown(t){this.isUIInteraction(t)||this.downPosition.set(t.clientX,t.clientY)}onPointerUp(t){if(this.isUIInteraction(t))return;const e=new yt(t.clientX,t.clientY);this.downPosition.distanceTo(e)>this.dragThreshold||this.handleInteraction(t)}onMouseMove(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updateCursor(),this.updateTooltip(t.clientX,t.clientY)}updateTooltip(t,e){if(!this.tooltip)return;let i="",n=!1;this.raycaster.setFromCamera(this.mouse,this.camera);const s=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(s){const a=Math.round(s.x),o=Math.round(s.z),h=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;let c=Math.round(a+h/2),d=Math.round(o+l/2);c=(c%h+h)%h,d=(d%l+l)%l;const u=this.terrain.grid[c][d];if(u&&u.hasBuilding&&u.building){const m=u.building,g=m.userData.type||m.type;g==="house"?(i=`House Pop: ${Math.floor(m.userData.population||0)}/10`,n=!0):g==="castle"?(i=`Castle Pop: ${Math.floor(m.userData.population||0)}/200`,n=!0):g==="barracks"?(i=`Barracks Pop: ${Math.floor(m.userData.population||0)}/200`,n=!0):g==="tower"&&(i=`Tower Pop: ${Math.floor(m.userData.population||0)}/300`,n=!0)}if(!n){const m=this.terrain.findNearestEntity("unit",c,d,2.5);m&&(i=`Age: ${Math.floor(m.age)}`,m.action&&(i+=`
${m.action}`),n=!0)}}n?(this.tooltip.textContent=i,this.tooltip.style.display="block",this.tooltip.style.left=t+15+"px",this.tooltip.style.top=e+15+"px"):this.tooltip.style.display="none"}update(){this.lastClientX!==void 0&&this.lastClientY!==void 0&&this.updateTooltip(this.lastClientX,this.lastClientY)}updateCursor(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=null;t=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);const e=t?[{point:t}]:[];if(e.length>0){const n=e[0].point,s=Math.round(n.x),a=Math.round(n.z),o=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;let l=Math.round(s+o/2),c=Math.round(a+h/2);l=(l%o+o)%o,c=(c%h+h)%h;const d=this.terrain.getVisualPosition(l,c,!1),u=l-o/2,m=c-h/2,g=d.x-u,x=d.z-m;this.cursor.position.set(s+g,d.y+.5,a+x),this.cursor.visible=!0,this.mode==="spawn"?this.cursor.material.color.setHex(255):this.cursor.material.color.setHex(16711680)}else this.cursor.visible=!1}handleInteraction(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(e){const i=e,n=Math.round(i.x),s=Math.round(i.z),a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let h=Math.round(n+a/2),l=Math.round(s+o/2);if(h=(h%a+a)%a,l=(l%o+o)%o,t.button===0){if(this.game&&!this.game.canAction()){console.warn("Action Blocked: Not enough Mana (Negative)");return}const c=i.x,d=i.z;this.mode==="raise"?this.game&&(this.game.addRequest("raise",h,l,null,c,d),this.game.consumeMana(10),console.log(`[Input] Request Queued: Raise at ${h},${l}`)):this.mode==="lower"?this.game&&(this.game.addRequest("lower",h,l,null,c,d),this.game.consumeMana(10),console.log(`[Input] Request Queued: Lower at ${h},${l}`)):this.mode==="cancel"?this.game&&this.game.tryCancelRequest(h,l)&&console.log(`[Input] Request Canceled at ${h},${l}`):this.mode==="spawn"?this.spawnCallback&&(this.spawnCallback(h,l,!0),this.game&&this.game.consumeMana(20)):this.mode==="barracks"?this.game&&(this.game.addRequest("build_barracks",h,l,null,c,d),this.game.consumeMana(50)):this.mode==="tower"&&this.game&&(this.game.addRequest("build_tower",h,l,null,c,d),this.game.consumeMana(50))}else if(t.button===2){if(this.game&&!this.game.canAction())return;if(this.game){const c=i.x,d=i.z;this.game.addRequest("lower",h,l,null,c,d),this.game.consumeMana(10)}}this.updateCursor()}}}class Js{static nextId=0;constructor(t,e,i,n,s){this.id=Js.nextId++,this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.type=s||"entity",this.position=new I,this.rotationY=0,this.isMoving=!1,this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.walkAnimTimer=0,this.terrain&&this.terrain.registerEntity&&this.terrain.registerEntity(this,this.gridX,this.gridZ,this.type),this.updatePosition()}updatePosition(){if(isNaN(this.gridX)||isNaN(this.gridZ))return;const t=this.getPositionForGrid(this.gridX,this.gridZ);this.position.copy(t)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=t-i/2+.5,a=e-n/2+.5,o=s,h=-a;let l={x:0,y:0};this.terrain&&this.terrain.getVisualOffset&&(l=this.terrain.getVisualOffset(o,h));let c=0;return this.terrain&&this.terrain.getInterpolatedHeight?c=this.terrain.getInterpolatedHeight(t,e):this.terrain&&this.terrain.getTileHeight&&(c=this.terrain.getTileHeight(t,e)),new I(s+l.x,c,a-l.y)}getDistance(t,e){const i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);return Math.sqrt(i*i+n*n)}startMove(t,e,i){this.isMoving=!0,this.moveStartTime=i,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=t,this.targetGridZ=e;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=t-this.gridX,o=e-this.gridZ;Math.abs(a)>n/2&&(a-=Math.sign(a)*n),Math.abs(o)>s/2&&(o-=Math.sign(o)*s),this.rotationY=Math.atan2(a,o)}updateMovement(t){if(!this.isMoving)return;const e=(t-this.moveStartTime)/this.moveDuration;if(e>=1)this.isMoving=!1,this.terrain&&this.terrain.moveEntity&&this.terrain.moveEntity(this,this.gridX,this.gridZ,this.targetGridX,this.targetGridZ,this.type),this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition(),this.onMoveFinished&&this.onMoveFinished(t);else{const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=this.startGridX,a=this.startGridZ,o=this.targetGridX,h=this.targetGridZ;o-s>i/2&&(s+=i),s-o>i/2&&(s-=i),h-a>n/2&&(a+=n),a-h>n/2&&(a-=n);const l=s+(o-s)*e,c=a+(h-a)*e,d=this.getPositionForGrid(l,c);this.position.copy(d),this.onMoveStep&&this.onMoveStep(e)}}die(){this.isDead=!0,this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this)}}console.log("[Unit.js] Module Loaded! V=FINAL");class ft extends Js{static assets={geometries:{},materials:{},textures:{}};static nextId=0;static initAssets(){if(ft.assets.initialized)return;const t=new he(.3,.35,.2);t.translate(0,.3,0),ft.assets.geometries.body=t;const e=new he(.25,.25,.25);e.translate(0,.6,0),ft.assets.geometries.head=e;const i=new Vi(.2,.2);i.translate(0,.6,.126),ft.assets.geometries.facePlane=i;const n=new he(.1,.25,.1);n.translate(0,-.1,0),ft.assets.geometries.limb=n;const s=new he(.05,.5,.05);s.translate(0,.25,0),ft.assets.geometries.sword=s;const a=new he(.05,.8,.05);a.translate(0,0,0),ft.assets.geometries.staff=a,new Ci(.25,.25,.02,16).translate(0,0,0),new ci(.15,.4,16).translate(0,.2,0);const l=new ci(.2,.5,16);l.translate(0,.25,0),ft.assets.geometries.wizardHat=l;const c=new Ci(.3,.3,.02,16);ft.assets.geometries.wizardHatBrim=c,ft.assets.materials.skin=new Xe({color:16764074,roughness:.8}),ft.assets.materials.clothes=new Xe({color:8934707,roughness:1}),ft.assets.materials.tool=new Xe({color:5592405,metalness:.5}),ft.assets.materials.hat=new Xe({color:9127187,roughness:1}),ft.assets.materials.armor=new Xe({color:11184810,metalness:.8,roughness:.2}),ft.assets.materials.helmet=new Xe({color:8947848,metalness:.9,roughness:.1}),ft.assets.materials.robe=new Xe({color:4474009,roughness:1}),ft.assets.materials.robe=new Xe({color:4474009,roughness:1}),ft.assets.materials.wizardHat=new Xe({color:3355528,roughness:1}),ft.assets.materials.metal=new Xe({color:14540253,metalness:.9,roughness:.2}),ft.assets.materials.wood=new Xe({color:9127187,roughness:.9}),ft.assets.materials.darkMagic=new Xe({color:3342387,roughness:1}),ft.assets.textures.face=ft.createFaceTexture(),ft.assets.materials.face=new Xe({map:ft.assets.textures.face,transparent:!0}),ft.assets.textures.hair=ft.createHairTexture(),ft.assets.materials.hair=new oe({map:ft.assets.textures.hair,transparent:!0}),ft.assets.materials.heads=null,ft.assets.initialized=!0}static createFaceTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");return e.fillStyle="#FFCCAA",e.fillRect(0,0,64,64),e.fillStyle="#4A3000",e.fillRect(0,0,64,15),e.fillStyle="#000000",e.fillRect(15,25,8,8),e.fillRect(41,25,8,8),e.fillStyle="#A0522D",e.fillRect(20,45,24,4),new Le(t)}static createHairTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,64,64),e.fillStyle="#DDDDDD";for(let i=0;i<40;i++)e.fillRect(Math.random()*60,Math.random()*60,4,4);return new Le(t)}constructor(t,e,i,n,s,a=!1){super(t,e,i,n,"unit"),this.id=ft.nextId++,console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${s} Pos:${i},${n} Special:${a}`),this.gridX=i!==void 0?i:20,this.gridZ=n!==void 0?n:20;let o=a;typeof s=="boolean"&&(o=s,s="worker"),this.role=s||"worker",this.isSpecial=o,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0,this.buildStagnationCount=0,this.lastTime=0,this.lastGatherTime=-Math.random()*30,this.position=new I,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}};const h=80+Math.random()*20;this.lifespan=h,this.age=20,this.isDead=!1,this.isFinished=!1,this.crossMesh=null,this.hp=35+Math.floor(Math.random()*15),this.maxHp=this.hp,this.attackCooldown=0,this.attackRate=1,this.damage=4,this.targetGoblin=null,this.role==="knight"?(this.hp*=15,this.maxHp=this.hp,this.damage*=25):this.role==="wizard"&&(this.hp*=3,this.maxHp=this.hp,this.damage*=20,this.attackRate=2),this.updatePosition(),this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.lastTime=0,this.moveInterval=2e3+Math.random()*3e3,(this.role==="knight"||this.role==="wizard")&&(this.moveInterval=0),this.stagnationTimer=0,this.huntingCooldown=0,this.target=null,this.isMoving=!1,this.targetX=0,this.targetZ=0,this.terrain.registerEntity(this,this.gridX,this.gridZ,"unit"),this.wanderCount=0,this.migrationTarget=null,this.ignoredTargets=new Map}takeDamage(t){this.hp-=t,this.hp<=0&&this.die()}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.role==="worker"&&this.targetRequest&&window.game&&(console.log(`Unit ${this.id} died. Releasing job ${this.targetRequest.id}`),window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null),this.createCross(),console.log("Unit died."))}attackGoblin(t){if(!(this.attackCooldown>0)){if(console.log(`[Unit Debug] ATTACKING Goblin ${t.id}`),this.role==="wizard"){if(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,window.game&&window.game.spawnProjectile){const e=this.position.clone().add(new I(0,.9,0)),i=this.terrain.getTileHeight(t.gridX,t.gridZ),n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80,a=new I(t.gridX-n/2,i+1,t.gridZ-s/2);window.game.spawnProjectile(e,a)}setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200);t.takeDamage(this.damage),(this.role==="knight"||this.role==="wizard")&&this.reportEnemy(t),t.hp<=0&&(t.isDead=!0,this.targetGoblin=null,window.game&&(this.role==="knight"||this.role==="wizard")&&this.searchForHut(t.gridX,t.gridZ)),this.attackCooldown=this.attackRate}}attackBuilding(t){this.attackCooldown>0||(this.role==="wizard"?(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)):(this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200)),t.userData.hp===void 0&&(t.userData.hp=100),t.userData.hp-=this.damage,console.log(`Unit ${this.id} attacking ${t.type}. HP: ${t.userData.hp}`),t.userData.hp<=0&&(console.log(`Building ${t.type} Destroyed!`),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ)),this.attackCooldown=this.attackRate)}debugGetAge(){return"DEBUG_AGE_"+this.age}updateLogic(t,e,i,n,s,a){if(this.id===0&&console.log(`[Unit.js] ENTERED updateLogic. Dead=${this.isDead}`),this.isDead){this.updateDeathAnimation(e),this.action="Dead";return}if(this.id===0){const l=this.terrain.getTileHeight(this.gridX,this.gridZ);console.log(`[Unit Debug V2] Start Logic. Night=${i}, Stag=${this.stagnationTimer.toFixed(1)}, Age=${this.age.toFixed(1)}, H=${l}, Action=${this.action}`)}if(this.id===0&&this.debugFrame%60===0&&console.log(`[Unit Heartbeat] ID:${this.id} Action:${this.action} Moving:${this.isMoving} T:${t.toFixed(1)} dt:${e.toFixed(4)} Int:${this.moveInterval.toFixed(0)}`),this.attackCooldown>0&&(this.attackCooldown-=e),this.isMoving&&this.updateMovement(t),this.ignoredTargets.size>0)for(const[l,c]of this.ignoredTargets)t>c&&this.ignoredTargets.delete(l);if(this.isMoving&&t-this.moveStartTime>2e4&&(console.warn(`[Unit] Stuck moving for >20s. Forcing Reset. ID:${this.id}`),this.isMoving=!1,this.updatePosition(),this.role==="worker"&&this.targetRequest&&window.game&&(console.warn(`Unit ${this.id} stuck. Releasing job ${this.targetRequest.id}`),window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null,this.action="Idle")),this.action==="Working"&&!this.targetRequest&&(this.action="Idle",this.isMoving=!1),this.role==="worker"&&this.targetRequest&&window.game&&this.debugFrame%60===0){const l=this.targetRequest,c=window.game.requestQueue.includes(l),d=l.assignedTo===this.id;(!c||!d)&&(console.warn(`[Unit ${this.id}] Detected GHOST Job (Valid:${c}, Ours:${d}). Dropping.`),this.targetRequest=null,this.action="Idle",this.isMoving=!1)}!this.isMoving&&t>=this.lastTime&&this.action!=="Migrating"&&(this.action="Idle");let o=1;if((this.role==="knight"||this.role==="wizard")&&(o=.1),this.age+=e*o,this.age>=this.lifespan){this.die();return}if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}if(this.action==="Migrating"&&this.migrationTarget){if(this.migrationTimer=(this.migrationTimer||0)+e,this.migrationTimer>30){console.log(`Unit ${this.id} migration timed out. Retrying.`),this.migrate(t);return}if(Math.random()<.05){if(this.role==="worker"&&window.game){const c=window.game.findBestRequest(this);if(c&&window.game.claimRequest(this,c)){console.log(`Unit ${this.id} interrupted migration for Job ${c.type}`),this.targetRequest=c,this.action="Idle",this.migrationTarget=null,this.migrationTimer=0;return}}if(this.searchSurroundings(this.gridX,this.gridZ),this.targetGoblin||this.targetBuilding&&this.role!=="worker"){console.log(`Unit ${this.id} interrupted migration for combat.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0;return}}this.getDistance(this.migrationTarget.x,this.migrationTarget.z)<=2?(console.log(`Unit ${this.id} finished migration.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0):!this.isMoving&&t-(this.lastMoveAttempt||0)>1e3&&(this.lastMoveAttempt=t,this.triggerMove(this.migrationTarget.x,this.migrationTarget.z,t));return}{let l=null,c=1/0;const d=this.targetGoblin&&!this.targetGoblin.isDead,u=this.targetBuilding&&this.targetBuilding.userData.hp>0,m=this.action==="Chasing"||this.action==="Fighting"||this.action==="Sieging"||this.action==="Unstuck";this.scanTimer=(this.scanTimer||0)+1;const g=this.scanTimer>30;if(!m||!d&&!u||g){if(g&&(this.scanTimer=0),n){const x=this.role==="knight"||this.role==="wizard"?50:15,f=this.targetGoblin?this.targetGoblin.id:null;for(const p of n){if(p.isDead||this.ignoredTargets.has(p.id))continue;const S=this.getDistance(p.gridX,p.gridZ);let b=x;if(p.id===f&&(b=x*2),S>b)continue;const E=this.terrain.getTileHeight(p.gridX,p.gridZ);let R=S-1e3;E>8&&(R+=20),p.id===f&&(R-=200),R<c&&(c=R,l={type:"goblin",obj:p})}}if(this.terrain.buildings){const x=this.role==="knight"||this.role==="wizard"?1/0:30;for(const f of this.terrain.buildings)if(!(this.role==="worker"&&f.type!=="goblin_hut")&&(f.type==="goblin_hut"||f.type==="cave")){if(f.userData&&f.userData.hp<=0||this.ignoredTargets.has(f.id))continue;const p=this.getDistance(f.gridX,f.gridZ);if(p>x)continue;let S=p-5;p<8&&(this.role==="knight"||this.role==="wizard")&&(S-=2e3),S<c&&(c=S,l={type:"building",obj:f})}}this.targetGoblin=null,this.targetBuilding=null,l&&(l.type==="goblin"?this.targetGoblin=l.obj:this.targetBuilding=l.obj),!this.targetGoblin&&!this.targetBuilding&&window.game&&window.game.raidPoints&&window.game.raidPoints.length>0&&this.findRaidTarget()}}if(this.targetGoblin){const l=this.getDistance(this.targetGoblin.gridX,this.targetGoblin.gridZ);let c=1.8;this.role==="wizard"&&(c=5.5),l<=c?(this.action="Fighting",this.isMoving=!1,this.attackGoblin(this.targetGoblin)):(this.isMoving,this.isMoving||(this.action="Chasing",this.triggerMove(this.targetGoblin.gridX,this.targetGoblin.gridZ,t),this.moveInterval=0))}else if(this.targetBuilding){const l=this.getDistance(this.targetBuilding.gridX,this.targetBuilding.gridZ);l<=2?(this.action="Sieging",this.attackBuilding(this.targetBuilding)):!this.isMoving&&t-this.lastTime>this.moveInterval&&(this.action=l>20?"Travelling":"Approaching Target",this.triggerMove(this.targetBuilding.gridX,this.targetBuilding.gridZ,t))}else if(this.targetRaidPoint)this.getDistance(this.targetRaidPoint.x,this.targetRaidPoint.z)<=5?(this.searchSurroundings(this.gridX,this.gridZ),this.targetRaidPoint=null):!this.isMoving&&t-this.lastTime>this.moveInterval&&this.triggerMove(this.targetRaidPoint.x,this.targetRaidPoint.z,t);else if(this.role==="worker"&&this.targetRequest)if(this.isSleeping&&(this.isSleeping=!1),this.isMoving&&(this.action==="Idle"||this.action==="Moving"||this.action==="Migrating")&&(console.log(`[Unit ${this.id}] Interrupting movement for Job ${this.targetRequest.type}`),this.isMoving=!1,this.moveTimer=0,this.lastMoveAttempt=0),this.getDistance(this.targetRequest.x,this.targetRequest.z)<=2)if(this.action="Working",this.isMoving=!1,window.game&&window.game.completeRequest(this,this.targetRequest),this.targetRequest=null,window.game){const c=window.game.findBestRequest(this);c&&window.game.claimRequest(this,c)?(this.targetRequest=c,this.action="Approaching Job",console.log(`[Unit ${this.id}] Chained Job ${c.type}`)):this.action="Idle"}else this.action="Idle";else this.action="Working",!this.isMoving&&t-(this.lastMoveAttempt||0)>1e3&&(this.lastMoveAttempt=t,this.triggerMove(this.targetRequest.x,this.targetRequest.z,t),this.isMoving&&(this.action="Approaching Job"),this.isMoving?this.jobMoveFailures=0:(this.jobMoveFailures=(this.jobMoveFailures||0)+1,this.jobMoveFailures>5&&(console.warn(`Unit ${this.id} failed to reach job ${this.targetRequest.id} after 5 attempts. Releasing.`),window.game&&window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null,this.action="Idle",this.jobMoveFailures=0)));else if(this.role==="worker"&&!this.targetRequest&&window.game&&Math.random()<.5){const l=window.game.findBestRequest(this);l&&window.game.claimRequest(this,l)&&(this.targetRequest=l,console.log(`Unit ${this.id} claimed job ${l.type}`))}if((this.action==="Chasing"||this.action==="Fighting")&&!this.targetGoblin&&!this.targetBuilding&&(this.isMoving=!1,this.action="Idle"),this.gatherResources(t),this.moveStuckTimer=0,this.lastGridX===this.gridX&&this.lastGridZ===this.gridZ&&!this.isSleeping&&!this.isMoving?this.stagnationTimer+=e:(this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0),this.stagnationTimer>10){this.moveRandomly(t),this.stagnationTimer>20&&(this.migrate(t),this.stagnationTimer=0);return}if(!this.isMoving&&!this.targetGoblin&&!this.targetBuilding&&!this.targetRaidPoint&&!this.targetRequest){const l=this.role==="worker"||this.role==="fisher"||this.role==="hunter";if(i&&l){const c=this.terrain.grid[this.gridX][this.gridZ];if(c.hasBuilding&&c.building&&(c.building.type==="house"||c.building.type==="castle")){this.isSleeping||(console.log(`[Unit ${this.id}] Sleeping`),this.isSleeping=!0);return}else if(!this.isMoving&&t-this.lastTime>this.moveInterval){let u=this.homeBase;if(u||(this.nightShelterTarget&&this.nightShelterTarget.userData.hp>0?u=this.nightShelterTarget:(u=this.findNearestShelter(),this.nightShelterTarget=u)),u){this.action="Going Home",this.triggerMove(u.userData.gridX,u.userData.gridZ,t);return}else this.nightShelterTarget=null}}else this.isSleeping&&(this.isSleeping=!1)}if(!this.isMoving&&t-this.lastTime>this.moveInterval){if(this.id===0&&this.debugFrame%60===0&&console.log(`[Unit Debug] Executing Logic. Role: ${this.role}`),this.role==="worker"){const l=this.terrain.grid[this.gridX][this.gridZ];l&&l.moisture!==.5&&Math.random()<.1?this.improveLand(t):this.moveRandomly(t)}else this.role==="knight"||this.role==="wizard"?(this.findRaidTarget()||this.exploreSurroundings(t),this.targetRaidPoint?this.triggerMove(this.targetRaidPoint.x,this.targetRaidPoint.z,t):this.patrol(t)):this.moveRandomly(t);this.lastTime=t,this.moveInterval=2e3+Math.random()*3e3}}searchForHut(t,e){this.findTargetBuilding(40)}findTargetBuilding(t){if(!this.terrain.buildings)return;const e=this.terrain.buildings;let i=null,n=1/0,s=null;const a=t!==void 0?t:1/0;for(const o of e)if(!(this.role==="worker"&&o.type!=="goblin_hut")&&(o.type==="goblin_hut"||o.type==="cave")){const h=this.getDistance(o.gridX,o.gridZ);if(h>a)continue;h<n&&(n=h,i=o,s=o.type)}this.role==="knight"&&Math.random()<.001&&console.log(`[Unit Debug] Targeted: ${this.targetGoblin?"Goblin":this.targetBuilding?this.targetBuilding.type:"None"}`),i&&s&&(this.targetBuilding=i,this.reportEnemy(i))}reportEnemy(t){const e=t.gridX,i=t.gridZ,n=this.game?this.game.gameTotalTime:Date.now();this.homeBase&&this.homeBase.userData&&this.homeBase.userData.memory?this.homeBase.userData.memory.reportRaid(e,i,n):this.game&&this.game.battleMemory&&this.game.battleMemory.reportRaid(e,i,n)}findRaidTarget(){let t=[];const e=this.game?this.game.gameTotalTime:Date.now();if(this.homeBase&&this.homeBase.userData&&this.homeBase.userData.memory?t=this.homeBase.userData.memory.getPriorities(e):this.game&&this.game.battleMemory&&(t=this.game.battleMemory.getPriorities(e)),!t||t.length===0)return;let i=null,n=1/0;return t.forEach(s=>{const a=this.getDistance(s.x,s.z);a<8||this.ignoredTargets&&this.ignoredTargets.has(`${s.x},${s.z}`)||a<n&&(n=a,i=s)}),i?(this.targetRaidPoint=i,!0):!1}findNearestShelter(){if(!this.terrain||!this.terrain.buildings)return null;let t=null,e=1/0;for(const i of this.terrain.buildings)if(!(this.ignoredTargets&&this.ignoredTargets.has(i.id))&&!(this.ignoredTargets&&this.ignoredTargets.has(`${i.gridX},${i.gridZ}`))&&(i.type==="house"||i.type==="castle")&&i.userData&&i.userData.hp>0){const n=this.getDistance(i.gridX,i.gridZ);n<e&&(e=n,t=i)}return t}exploreSurroundings(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.floor(Math.random()*e),s=Math.floor(Math.random()*i);this.terrain.getTileHeight(n,s)<=0||this.getDistance(n,s)<15||(this.targetRaidPoint={x:n,z:s,priority:1},console.log(`Unit ${this.id} exploring to ${n},${s}`))}searchSurroundings(t,e){if(this.game&&this.terrain&&this.terrain.findBestTarget){const i=this.terrain.findBestTarget("goblin",t,e,12,(s,a)=>a);if(i){this.targetGoblin=i,this.reportEnemy(i),console.log(`Unit ${this.id} found Goblin via Spatial Search!`);return}if(this.terrain.findBestTarget("building",t,e,12,(s,a)=>s.userData.type==="goblin_hut"||s.userData.type==="cave"?a:1/0)){console.log(`Unit ${this.id} found Base via Spatial Search!`);return}}}patrol(t){if(this.terrain.buildings&&this.terrain.buildings.length>0){const e=Math.floor(Math.random()*this.terrain.buildings.length),i=this.terrain.buildings[e],n=Math.abs(this.gridX-i.gridX),s=Math.abs(this.gridZ-i.gridZ);n<5&&s<5?this.moveRandomly(t):this.triggerMove(i.gridX,i.gridZ,t)}else this.moveRandomly(t)}onMoveFinished(t){this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0,this.tryBuildStructure(t)?(this.action==="Migrating"&&(console.log(`Unit ${this.id} built structure during migration. Stopping.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0),this.buildStagnationCount=0):this.action==="Migrating"?this.buildStagnationCount=0:(this.buildStagnationCount=(this.buildStagnationCount||0)+1,this.buildStagnationCount>5&&(console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`),this.migrate(t),this.buildStagnationCount=0))}onMoveStep(t){const e=Math.sin(t*Math.PI*4)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-e,this.limbs.rightLeg.x=e,this.mesh&&(this.mesh.position.copy(this.position),this.rotationY!==void 0&&(this.mesh.rotation.y=this.rotationY))}triggerMove(t,e,i){let n=t-this.gridX,s=e-this.gridZ;const a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;Math.abs(n)>a/2&&(n=-Math.sign(n)*(a-Math.abs(n))),Math.abs(s)>o/2&&(s=-Math.sign(s)*(o-Math.abs(s)));let h=this.gridX,l=this.gridZ,c=Math.abs(n)>Math.abs(s);if(c?h+=Math.sign(n):l+=Math.sign(s),h<0&&(h=a-1),h>=a&&(h=0),l<0&&(l=o-1),l>=o&&(l=0),this.canMoveTo(h,l)){this.executeMove(h,l,i);return}let d=this.gridX,u=this.gridZ,m=!1;if(c&&Math.abs(s)>0?(u+=Math.sign(s),m=!0):!c&&Math.abs(n)>0&&(d+=Math.sign(n),m=!0),m&&(d<0&&(d=a-1),d>=a&&(d=0),u<0&&(u=o-1),u>=o&&(u=0),this.canMoveTo(d,u))){this.executeMove(d,u,i);return}if(this.action,this.lastTime=i,this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>10){console.log(`Unit ${this.id} stuck chasing. Skipping target temporarily.`);const g=i+5e3;this.targetGoblin&&(this.ignoredTargets.set(this.targetGoblin.id,g),this.ignoredTargets.set(`${this.targetGoblin.gridX},${this.targetGoblin.gridZ}`,g),this.targetGoblin=null),this.targetBuilding&&(this.ignoredTargets.set(this.targetBuilding.id,g),this.ignoredTargets.set(`${this.targetBuilding.gridX},${this.targetBuilding.gridZ}`,g),this.targetBuilding=null),this.targetRaidPoint&&(this.ignoredTargets.set(`${this.targetRaidPoint.x},${this.targetRaidPoint.z}`,g),this.targetRaidPoint=null),this.stuckCount=0}}canMoveTo(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=t,a=e;s<0&&(s=i-1),s>=i&&(s=0),a<0&&(a=n-1),a>=n&&(a=0);const o=this.terrain.getTileHeight(this.gridX,this.gridZ),h=this.terrain.getTileHeight(s,a);if(h<=0)return console.log(`[Unit ${this.id}] Blocked by Water at ${s},${a} H:${h}`),!1;if(h>8&&console.log(`[Unit ${this.id}] Moving onto Rock at ${s},${a} H:${h} (Speed Penalty)`),Math.abs(h-o)>2)return console.log(`[Unit ${this.id}] Blocked by Slope at ${s},${a} H:${o}->${h}`),!1;const l=this.terrain.grid[s][a];return l.hasBuilding&&l.building,!0}executeMove(t,e,i){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;t<0&&(t=n-1),t>=n&&(t=0),e<0&&(e=s-1),e>=s&&(e=0),super.startMove(t,e,i),this.action="Moving";const a=this.terrain.getTileHeight(this.gridX,this.gridZ),o=this.terrain.getTileHeight(t,e),h=Math.abs(o-a);o>8?this.moveDuration=8e3:h>.1?this.moveDuration=4e3:this.moveDuration=1e3,this.stuckCount=0}gatherResources(t){if(t-this.lastGatherTime<5e3)return;this.lastGatherTime=t;const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,s=!1;const a=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:4,z:0},{x:-4,z:0},{x:0,z:4},{x:0,z:-4}];for(const o of a){let h=this.gridX+o.x,l=this.gridZ+o.z;h<0&&(h=e+h),h>=e&&(h=h-e),l<0&&(l=i+l),l>=i&&(l=l-i),h=(h%e+e)%e,l=(l%i+i)%i;const c=this.terrain.getTileHeight(h,l);if(c<=0?n=!0:c>4&&c<=8&&(s=!0),n&&s)break}if(window.game&&window.game.resources){if(n){const o=this.role==="fisher"?3:1;window.game.resources.fish+=o}if(s){const o=this.role==="hunter"?3:1;window.game.resources.meat+=o}}}findTargetGoblin(t){if(!t||t.length===0)return;let e=null,i=1/0;const n=this.role==="knight"||this.role==="wizard"?50:15;for(const s of t){if(s.isDead||this.ignoredTargets&&this.ignoredTargets.has(s.id))continue;const a=this.gridX-s.gridX,o=this.gridZ-s.gridZ,h=Math.sqrt(a*a+o*o);if(h>n)continue;const l=this.terrain.getTileHeight(s.gridX,s.gridZ);let c=h;l>8&&(c+=20),c<i&&(i=c,e=s)}this.targetGoblin=e}getDistance(t,e){const i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);return Math.sqrt(i*i+n*n)}moveRandomly(t){this.id===0&&console.log(`[Unit Debug] moveRandomly called for ID:0 at ${t}`);const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}];if(this.wanderCount=(this.wanderCount||0)+1,this.wanderCount>15)for(let c=0;c<15;c++){const d=Math.floor(Math.random()*e),u=Math.floor(Math.random()*i),m=this.terrain.getTileHeight(d,u),g=this.terrain.grid[d][u];if((m>8||m>0&&m<2)&&(!g||!g.hasBuilding)){this.migrationTarget={x:d,z:u},this.wanderCount=0,console.log(`Unit bored. Migrating to ${m>8?"Mountain":"Sea"} at ${d},${u}`),this.triggerMove(d,u,t);return}}const s=this.terrain.getTileHeight(this.gridX,this.gridZ),a=[];for(const c of n){let d=this.gridX+c.x,u=this.gridZ+c.z;d<0&&(d=e-1),d>=e&&(d=0),u<0&&(u=i-1),u>=i&&(u=0);const m=this.terrain.getTileHeight(d,u);this.terrain.grid[d][u],Math.abs(m-s)<=2&&m>0&&a.push({x:d,z:u,h:m,dir:c})}if(a.length===0){this.lastTime=t;return}let o=null;if(this.role==="hunter"||this.role==="fisher"){let c=0;a.forEach(u=>{let m=1;this.role==="hunter"?u.h>4&&u.h<=8?m=5:u.h>8&&(m=2):this.role==="fisher"&&u.h<=2.5&&(m=5),u.weight=m,c+=m});let d=Math.random()*c;for(const u of a)if(d-=u.weight,d<=0){o=u;break}}if(!o){const c=Math.floor(Math.random()*a.length);o=a[c]}this.isMoving=!0,this.action="Moving";const h=Math.abs(o.h-s);o.h>8?this.moveDuration=6e3:h>.1?this.moveDuration=2500:this.moveDuration=1e3,this.moveStartTime=t,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=o.x,this.targetGridZ=o.z;const l=Math.atan2(o.dir.x,o.dir.z);this.rotationY=l}cleanIgnoredTargets(t){if(this.ignoredTargets)for(const[e,i]of this.ignoredTargets)t>i&&this.ignoredTargets.delete(e)}forceUnstuck(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;let i=!1,n=0;for(;!i&&n<10;){const s=Math.floor(Math.random()*7)-3,a=Math.floor(Math.random()*7)-3;if(s===0&&a===0)continue;let o=this.gridX+s,h=this.gridZ+a;o<0&&(o=t-1),o>=t&&(o=0),h<0&&(h=e-1),h>=e&&(h=0);const l=this.terrain.getTileHeight(o,h),c=this.terrain.grid[o][h];if(l>0&&c&&!c.hasBuilding){const d=this.gridX,u=this.gridZ;this.gridX=o,this.gridZ=h,this.updatePosition(),this.terrain.moveEntity(this,d,u,o,h,"unit"),console.log(`Unit warped from ${d},${u} to ${o},${h}`),i=!0}n++}}migrate(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.random()*Math.PI*2,s=20+Math.random()*20;let a=Math.floor(this.gridX+Math.cos(n)*s),o=Math.floor(this.gridZ+Math.sin(n)*s);a<0&&(a+=e),a>=e&&(a-=e),o<0&&(o+=i),o>=i&&(o-=i),this.terrain.getTileHeight(a,o)<=0&&(a=(a+5)%e),console.log(`Unit ${this.id} migrating to ${a},${o} (Walking)`),this.action="Migrating",this.migrationTarget={x:a,z:o},this.migrationTimer=0,this.triggerMove(a,o,t)}tryBuildStructure(t){this.terrain.logicalWidth,this.terrain.logicalDepth;const e=this.gridX,i=this.gridZ,n=this.terrain.grid[e][i];if(n.hasBuilding||n.height>8)return;const s=this.terrain.buildings.filter(b=>b.type==="house"),a=this.terrain.buildings.filter(b=>b.type==="farm"),o=this.terrain.buildings.filter(b=>b.type==="mansion"),h=s.length,l=a.length;o.length;const c=window.game?window.game.totalPopulation:0,d=this.terrain.buildings.filter(b=>b.type==="tower"),u=Math.floor(c/3e3);if(d.length<u&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("tower",e,i),this.moveRandomly(t),!0;const g=this.terrain.buildings.filter(b=>b.type==="barracks").length,x=Math.floor(c/1e3);if(g<x&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("barracks",e,i),this.moveRandomly(t),!0;const p=(window.game?window.game.resources.grain:100)<c*2,S=l<h/2+1;return(p||S)&&Math.random()<.3&&this.terrain.checkFlatArea(e,i,2)&&this.buildFarm(t)?!0:this.terrain.checkFlatArea(e,i,2)?n.moisture>.8?!1:(this.terrain.addBuilding("house",e,i),this.moveRandomly(t),!0):!1}improveLand(t){if(!this.terrain.grid[this.gridX]||!this.terrain.grid[this.gridX][this.gridZ])return;const i=this.terrain.grid[this.gridX][this.gridZ].moisture||.5;let s=.5-i,a=s*.4;Math.abs(a)<.1&&Math.abs(s)>.01&&(a=s>0?.1:-.1),Math.abs(a)>Math.abs(s)&&(a=s),this.terrain.modifyMoisture(this.gridX,this.gridZ,a),console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${i.toFixed(2)} -> ${(i+a).toFixed(2)}`),this.moveRandomly(t)}buildFarm(t){let e=null;if(this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]&&(e=this.terrain.grid[this.gridX][this.gridZ]),e){const i=e.moisture||.5;let s=1-Math.abs(i-.5)*2.5;if(s<0&&(s=0),Math.random()>s)return console.log(`Farm construction failed due to soil conditions (Moisture: ${i.toFixed(2)}, Chance: ${(s*100).toFixed(0)}%). Improving Land.`),this.improveLand(t),!1}return this.terrain.addBuilding("farm",this.gridX,this.gridZ),this.moveRandomly(t),!0}static getCrossAssets(){return ft.assets.geometries.crossV||(ft.assets.geometries.crossV=new he(.2,1,.2),ft.assets.geometries.crossH=new he(.8,.2,.2)),ft.assets.geometries}createCross(){const t=new hi,e=ft.getCrossAssets(),i=new oe({color:16777215,transparent:!0,opacity:1}),n=new ne(e.crossV,i);n.position.y=.5,t.add(n);const s=new ne(e.crossH,i);s.position.y=.7,t.add(s);const a=this.getPositionForGrid(this.gridX,this.gridZ);t.position.copy(a),this.scene.add(t),this.crossMesh=t,this.deathTimer=0}updateDeathAnimation(t){if(!this.crossMesh)return;isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=3;if(this.deathTimer>=i)this.scene.remove(this.crossMesh),this.crossMesh.children.forEach(n=>{n.material&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material.opacity=1-n})}}static createWoodTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#8B4513",e.fillRect(0,0,64,64),e.strokeStyle="#5D2906",e.lineWidth=2;for(let i=0;i<8;i++)e.beginPath(),e.moveTo(0,i*8+Math.random()*4),e.lineTo(64,i*8+Math.random()*4),e.stroke();return new Le(t)}static createRoofTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#A52A2A",e.fillRect(0,0,64,64),e.fillStyle="#800000";for(let i=0;i<64;i+=8)for(let n=0;n<64;n+=8)(n+i)%16===0&&e.fillRect(n,i,7,7);return new Le(t)}serialize(){let t,e;return this.homeBase&&this.homeBase.userData&&(t=this.homeBase.userData.gridX,e=this.homeBase.userData.gridZ),{gridX:this.gridX,gridZ:this.gridZ,age:this.age,lifespan:this.lifespan,isDead:this.isDead,isFinished:this.isFinished,isMoving:this.isMoving,targetX:this.targetX,targetZ:this.targetZ,moveStartTime:this.moveStartTime,startGridX:this.startGridX,startGridZ:this.startGridZ,targetGridX:this.targetGridX,targetGridZ:this.targetGridZ,isSpecial:this.isSpecial,role:this.role,hp:this.hp,maxHp:this.maxHp,damage:this.damage,xp:this.xp||0,level:this.level||1,name:this.name,homeBaseGridX:t,homeBaseGridZ:e}}dispose(){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh=null),this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.geometry&&t.geometry.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}static deserialize(t,e,i){const n=new ft(e,i,t.gridX,t.gridZ,t.role||t.isSpecial,t.isSpecial);if(n.age=t.age||20,typeof t.lifespan=="number"&&t.lifespan>0&&(n.lifespan=t.lifespan),t.lifespan&&(n.lifespan=t.lifespan),n.isDead=t.isDead||!1,n.isDead=t.isDead||!1,n.isFinished=t.isFinished||!1,t.hp!==void 0&&(n.hp=t.hp),t.maxHp!==void 0&&(n.maxHp=t.maxHp),t.damage!==void 0&&(n.damage=t.damage),t.xp!==void 0&&(n.xp=t.xp),t.level!==void 0&&(n.level=t.level),t.level!==void 0&&(n.level=t.level),t.name!==void 0&&(n.name=t.name),t.homeBaseGridX!==void 0&&t.homeBaseGridZ!==void 0&&(n.savedHomeBaseX=t.homeBaseGridX,n.savedHomeBaseZ=t.homeBaseGridZ),t.isMoving){n.isMoving=!0,n.targetX=t.targetX,n.targetZ=t.targetZ,n.moveStartTime=t.moveStartTime,n.startGridX=t.startGridX,n.startGridZ=t.startGridZ,n.targetGridX=t.targetGridX,n.targetGridZ=t.targetGridZ,n.getDistance(n.targetGridX,n.targetGridZ);const s=Math.abs(n.startGridX-n.targetGridX),a=Math.abs(n.startGridZ-n.targetGridZ),o=Math.sqrt(s*s+a*a);n.moveDuration=o*1e3}return n.isDead&&(n.isFinished||n.createCross()),n}}const sl={type:"change"},ka={type:"start"},Bl={type:"end"},Fs=new is,rl=new Qe,mm=Math.cos(70*Fh.DEG2RAD),Me=new I,Oe=2*Math.PI,ie={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lr=1e-6;class gm extends Tc{constructor(t,e=null){super(t,e),this.state=ie.NONE,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.DOLLY,RIGHT:Rn.PAN},this.touches={ONE:An.ROTATE,TWO:An.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new I,this._lastQuaternion=new nn,this._lastTargetPosition=new I,this._quat=new nn().setFromUnitVectors(t.up,new I(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Lo,this._sphericalDelta=new Lo,this._scale=1,this._panOffset=new I,this._rotateStart=new yt,this._rotateEnd=new yt,this._rotateDelta=new yt,this._panStart=new yt,this._panEnd=new yt,this._panDelta=new yt,this._dollyStart=new yt,this._dollyEnd=new yt,this._dollyDelta=new yt,this._dollyDirection=new I,this._mouse=new yt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=_m.bind(this),this._onPointerDown=xm.bind(this),this._onPointerUp=Mm.bind(this),this._onContextMenu=wm.bind(this),this._onMouseWheel=ym.bind(this),this._onKeyDown=Sm.bind(this),this._onTouchStart=Tm.bind(this),this._onTouchMove=Em.bind(this),this._onMouseDown=vm.bind(this),this._onMouseMove=bm.bind(this),this._interceptControlDown=Am.bind(this),this._interceptControlUp=Rm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sl),this.update(),this.state=ie.NONE}update(t=null){const e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===ie.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Oe:i>Math.PI&&(i-=Oe),n<-Math.PI?n+=Oe:n>Math.PI&&(n-=Oe),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Me.length();a=this._clampDistance(o*this._scale);const h=o-a;this.object.position.addScaledVector(this._dollyDirection,h),this.object.updateMatrixWorld(),s=!!h}else if(this.object.isOrthographicCamera){const o=new I(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=h!==this.object.zoom;const l=new I(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Fs.origin.copy(this.object.position),Fs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fs.direction))<mm?this.object.lookAt(this.target):(rl.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fs.intersectPlane(rl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Lr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lr||this._lastTargetPosition.distanceToSquared(this.target)>Lr?(this.dispatchEvent(sl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Oe/60*this.autoRotateSpeed*t:Oe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;Me.copy(n).sub(this.target);let s=Me.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=t-i.left,s=e-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new yt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function xm(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function _m(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Mm(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Bl),this.state=ie.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function vm(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=ie.DOLLY;break;case Rn.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ie.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ie.ROTATE}break;case Rn.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=ie.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=ie.PAN}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(ka)}function bm(r){switch(this.state){case ie.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case ie.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case ie.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function ym(r){this.enabled===!1||this.enableZoom===!1||this.state!==ie.NONE||(r.preventDefault(),this.dispatchEvent(ka),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Bl))}function Sm(r){this.enabled!==!1&&this._handleKeyDown(r)}function Tm(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case An.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=ie.TOUCH_ROTATE;break;case An.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=ie.TOUCH_PAN;break;default:this.state=ie.NONE}break;case 2:switch(this.touches.TWO){case An.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=ie.TOUCH_DOLLY_PAN;break;case An.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=ie.TOUCH_DOLLY_ROTATE;break;default:this.state=ie.NONE}break;default:this.state=ie.NONE}this.state!==ie.NONE&&this.dispatchEvent(ka)}function Em(r){switch(this._trackPointer(r),this.state){case ie.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case ie.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case ie.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case ie.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=ie.NONE}}function wm(r){this.enabled!==!1&&r.preventDefault()}function Am(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Rm(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Cm{constructor(){this.prefix="god_game_save_"}save(t,e){try{const i=this.prefix+t,n={timestamp:Date.now(),data:e};return localStorage.setItem(i,JSON.stringify(n)),console.log(`Saved to slot ${t}. Verify:`,JSON.parse(localStorage.getItem(i))),!0}catch(i){return console.error("Save failed:",i),(i.name==="QuotaExceededError"||i.name==="NS_ERROR_DOM_QUOTA_REACHED")&&console.warn("LocalStorage Quota Exceeded!"),!1}}load(t){try{const e=this.prefix+t,i=localStorage.getItem(e);if(console.log(`Loading slot ${t}, Raw JSON:`,i?i.substring(0,50)+"...":"null"),!i)return null;const n=JSON.parse(i);return console.log(`Parsed Data for slot ${t}:`,n),n.data}catch(e){return console.error("Load failed:",e),null}}getSlots(){const t=[];for(let e=1;e<=5;e++){const i=this.prefix+e,n=localStorage.getItem(i);if(n)try{const s=JSON.parse(n);t.push({id:e,timestamp:s.timestamp,empty:!1})}catch{t.push({id:e,empty:!0})}else t.push({id:e,empty:!0})}return t}}class Dm{constructor(t,e,i){this.scene=t,this.clouds=[],this.cloudCount=30,this.spreadRadius=80;const n=512,s=512,a=document.createElement("canvas");a.width=n,a.height=s;const o=a.getContext("2d"),h=o.createImageData(n,s),l=h.data;for(let c=0;c<s;c++)for(let d=0;d<n;d++){const u=(d/n-.5)*2,m=(c/s-.5)*2,g=Math.sqrt(u*u+m*m),x=(Math.sin(u*3+m*2.5)+Math.cos(m*3.5-u*2.5))*.25+(Math.sin(u*8+m*6)+Math.cos(m*9-u*7))*.12+(Math.sin(u*18)+Math.cos(m*22))*.05,f=1-(g+x*1.5);let p=f<0?0:f>1?1:f*f*(3-2*f);const S=Math.max(0,1-Math.pow(g,4));p*=S;const b=(c*n+d)*4;l[b]=255,l[b+1]=255,l[b+2]=255,l[b+3]=Math.floor(Math.max(0,Math.min(1,p*.7))*255)}o.putImageData(h,0,0),this.texture=new Le(a),this.texture.colorSpace=$e,this.texture.minFilter=Oi,this.material=new Tl({map:this.texture,transparent:!0,opacity:.9,color:16777215,depthWrite:!1,blending:tn}),this.initClouds(),this.windSpeed=1,this.windDir=new I(1,0,.5).normalize()}initClouds(){for(let t=0;t<this.cloudCount;t++){const e=new lc(this.material),i=20+Math.random()*10,n=1.2+Math.random()*.6;e.scale.set(i*n,i,1),e.material=this.material.clone(),e.material.rotation=Math.random()*Math.PI*2,e.position.set((Math.random()-.5)*this.spreadRadius*2,20+Math.random()*10,(Math.random()-.5)*this.spreadRadius*2),this.scene.add(e),this.clouds.push(e)}}update(t,e){if(!e)return;const i=e.position.x,n=e.position.z,s=this.spreadRadius;for(const a of this.clouds){a.position.addScaledVector(this.windDir,this.windSpeed*t);let o=a.position.x-i,h=a.position.z-n;o>s?a.position.x-=s*2:o<-s&&(a.position.x+=s*2),h>s?a.position.z-=s*2:h<-s&&(a.position.z+=s*2)}}}class Ae{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ae.assets.initialized)return;const t=new ci(.05,.2,4);t.rotateX(Math.PI/2),Ae.assets.geometries.body=t;const e=new Fe,i=new Float32Array([0,0,0,.3,0,.1,0,0,.15]);e.setAttribute("position",new Ge(i,3)),e.computeVertexNormals(),Ae.assets.geometries.wing=e,Ae.assets.materials.body=new es({color:16777215}),Ae.assets.materials.wing=new es({color:15658734,side:Ye}),Ae.assets.initialized=!0}constructor(t,e,i,n){Ae.initAssets(),this.scene=t,this.terrainWidth=e,this.terrainDepth=i,this.clippingPlanes=n||[],this.birds=[],this.birdCount=20;const s=Ae.assets.materials;Object.values(s).forEach(a=>{a&&(a.clippingPlanes=this.clippingPlanes)}),this.initBirds()}initBirds(){for(let t=0;t<this.birdCount;t++){const e=new hi,i=new ne(Ae.assets.geometries.body,Ae.assets.materials.body);e.add(i);const n=new ne(Ae.assets.geometries.wing,Ae.assets.materials.wing);n.position.set(0,0,0),e.add(n);const s=new ne(Ae.assets.geometries.wing,Ae.assets.materials.wing);s.position.set(0,0,0),s.scale.x=-1,e.add(s),e.userData.leftWing=n,e.userData.rightWing=s,e.position.set((Math.random()-.5)*this.terrainWidth,15+Math.random()*10,(Math.random()-.5)*this.terrainDepth);const a=2+Math.random()*2,o=Math.random()*Math.PI*2;e.userData.velocity=new I(Math.cos(o)*a,0,Math.sin(o)*a),e.userData.speed=a,e.userData.turnSpeed=.5+Math.random(),e.userData.flapOffset=Math.random()*100,this.scene.add(e),this.birds.push(e)}}update(t,e,i){this.birds.forEach(n=>{n.position.addScaledVector(n.userData.velocity,t);const s=this.terrainWidth/2,a=this.terrainDepth/2;n.position.x>s&&(n.position.x-=this.terrainWidth),n.position.x<-s&&(n.position.x+=this.terrainWidth),n.position.z>a&&(n.position.z-=this.terrainDepth),n.position.z<-a&&(n.position.z+=this.terrainDepth);let o=!0;if(i){const c=new ii(n.position,1);o=i.intersectsSphere(c)}if(!o){n.visible=!1;return}if(n.visible=!0,Math.random()<.01){const c=(Math.random()-.5)*2;n.userData.velocity.applyAxisAngle(new I(0,1,0),c*n.userData.turnSpeed*t)}n.lookAt(n.position.clone().add(n.userData.velocity));const l=Math.sin(e*15+n.userData.flapOffset)*.5;n.userData.leftWing.rotation.z=l,n.userData.rightWing.rotation.z=-l,Math.random()<.001&&window.game&&window.game.soundManager&&window.game.soundManager.playBirdSound(n.position)})}}class Se{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Se.assets.initialized||(Se.assets.geometries.body=new he(.4,.3,.6),Se.assets.geometries.head=new he(.25,.25,.3),Se.assets.geometries.leg=new he(.1,.3,.1),Se.assets.materials.body=new oe({color:16777215}),Se.assets.materials.head=new oe({color:1118481}),Se.assets.materials.leg=new oe({color:1118481}),Se.assets.initialized=!0)}constructor(t,e,i){Se.initAssets(),this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.sheeps=[],this.sheepCount=10;const n=Se.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this.initSheeps()}removeSheep(t){this.terrain.unregisterEntity(t),this.scene.remove(t)}initSheeps(){for(let t=0;t<this.sheepCount;t++){const e=this.createSheep();this.spawnSheep(e),this.scene.add(e),this.sheeps.push({mesh:e,state:"idle",timer:Math.random()*5,targetX:0,targetZ:0})}}createSheep(){const t=new hi,e=new ne(Se.assets.geometries.body,Se.assets.materials.body);e.position.y=.3,t.add(e);const i=new ne(Se.assets.geometries.head,Se.assets.materials.head);i.position.set(0,.5,.35),t.add(i);const n=[{x:.1,z:.2},{x:-.1,z:.2},{x:.1,z:-.2},{x:-.1,z:-.2}],s=[];return n.forEach(a=>{const o=new ne(Se.assets.geometries.leg,Se.assets.materials.leg);o.position.set(a.x,.15,a.z),t.add(o),s.push(o)}),t.userData.legs=s,t}spawnSheep(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,s=0;for(;!n&&s<100;){const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);if(this.terrain.getTileHeight(a,o)>.5){const l=this.getPositionForGrid(a,o);t.position.copy(l),t.userData.gridX=a,t.userData.gridZ=o,this.terrain.registerEntity(t,a,o,"sheep"),n=!0}s++}}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=this.terrain.getInterpolatedHeight(t,e);return new I(t-i/2+.5,s,e-n/2+.5)}update(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;this.sheeps.forEach((s,a)=>{const o=s.mesh;if(this.terrain.getTileHeight(o.userData.gridX,o.userData.gridZ)<=0){this.removeSheep(o),this.sheeps.splice(a,1);return}if(s.timer-=e,s.lastGridX||(s.lastGridX=o.userData.gridX,s.lastGridZ=o.userData.gridZ,s.stagnationTimer=0),s.lastGridX===o.userData.gridX&&s.lastGridZ===o.userData.gridZ?s.stagnationTimer+=e:(s.lastGridX=o.userData.gridX,s.lastGridZ=o.userData.gridZ,s.stagnationTimer=0),s.stagnationTimer>15&&(s.state="moving",s.timer=5,s.stagnationTimer=-Math.random()*5),s.timer<=0)if(Math.random()<.3||s.stagnationTimer<0){s.state="moving",s.timer=2+Math.random()*3;const l=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let d=l.length-1;d>0;d--){const u=Math.floor(Math.random()*(d+1));[l[d],l[u]]=[l[u],l[d]]}let c=!1;for(const d of l){let u=o.userData.gridX+d.x,m=o.userData.gridZ+d.z;u<0&&(u=i-1),u>=i&&(u=0),m<0&&(m=n-1),m>=n&&(m=0);const g=this.terrain.getTileHeight(u,m),x=this.terrain.getTileHeight(o.userData.gridX,o.userData.gridZ);if(g>0&&Math.abs(g-x)<=1){s.targetX=u,s.targetZ=m,c=!0;break}}c||(s.state="idle")}else s.state="idle",s.timer=1+Math.random()*2;if(s.state==="moving"&&s.targetX!==void 0){const l=this.getPositionForGrid(s.targetX,s.targetZ),c=o.position.clone(),d=l.clone().sub(c).normalize();if(c.distanceTo(l)<.1){o.position.copy(l);const g=o.userData.gridX,x=o.userData.gridZ;o.userData.gridX=s.targetX,o.userData.gridZ=s.targetZ,this.terrain.moveEntity(o,g,x,o.userData.gridX,o.userData.gridZ,"sheep"),s.state="idle",s.targetX=void 0}else{o.position.addScaledVector(d,2*e);const x=this.terrain.logicalWidth||80,f=this.terrain.logicalDepth||80,p=o.position.x+x/2-.5,S=o.position.z+f/2-.5;o.position.y=this.terrain.getInterpolatedHeight(p,S);const b=Math.atan2(d.x,d.z);o.rotation.y=b}const m=Math.sin(t*10)*.2;o.userData.legs&&(o.userData.legs[0].rotation.x=m,o.userData.legs[1].rotation.x=-m,o.userData.legs[2].rotation.x=-m,o.userData.legs[3].rotation.x=m)}else o.userData.legs&&o.userData.legs.forEach(l=>l.rotation.x=0)})}}class Pm{constructor(){this.context=null,this.masterGain=null,this.initialized=!1,this.camera=null,this.frustum=new ns,this.projScreenMatrix=new jt}init(t){if(this.camera=t,!this.context)try{const e=window.AudioContext||window.webkitAudioContext;this.context=new e,this.masterGain=this.context.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.context.destination),console.log("AudioContext created")}catch(e){console.error("Web Audio API not supported",e);return}try{const e=this.context.createBuffer(1,1,22050),i=this.context.createBufferSource();i.buffer=e,i.connect(this.context.destination),i.start(0)}catch(e){console.warn("Silent buffer unlock failed",e)}this.context.state!=="running"?this.context.resume().then(()=>{console.log("AudioContext resumed, state:",this.context.state),this.initialized=!0}).catch(e=>{console.error("AudioContext resume failed",e)}):this.initialized=!0}resumeContext(){this.context&&this.context.state!=="running"&&this.context.resume().then(()=>{console.log("AudioContext resumed by user gesture."),this.initialized=!0})}updateFrustum(){this.camera&&(this.camera.updateMatrixWorld(),this.projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projScreenMatrix))}isVisible(t){return!this.camera||!this.initialized?!0:(this.updateFrustum(),this.frustum.containsPoint(t))}getVolume(){if(!this.camera)return .5;const t=this.camera.zoom,e=.8;return .1+(t-e)/(4-e)*.9}playBirdSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=n=>{setTimeout(()=>{if(!this.context)return;const s=this.context.currentTime,a=this.context.createOscillator(),o=this.context.createGain();a.type="sine";const h=2500+Math.random()*200;a.frequency.setValueAtTime(h,s),a.frequency.exponentialRampToValueAtTime(h*.8,s+.1),a.connect(o),o.connect(this.masterGain),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(e*.4,s+.01),o.gain.exponentialRampToValueAtTime(.01,s+.15),a.start(s),a.stop(s+.15)},n)};i(0),i(200),i(400)}playSheepSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=this.context.currentTime,n=.6+Math.random()*.4,s=this.context.createOscillator();s.type="sawtooth";const a=350+Math.random()*40;s.frequency.setValueAtTime(a,i),s.frequency.exponentialRampToValueAtTime(a*.8,i+n);const o=this.context.createOscillator(),h=this.context.createGain();o.frequency.value=7+Math.random()*2,h.gain.setValueAtTime(.7,i);const l=this.context.createGain(),c=this.context.createGain();c.gain.value=1;const d=this.context.createGain();d.gain.value=.3,o.connect(d),d.connect(c.gain),o.start(i),o.stop(i+n);const u=this.context.createBiquadFilter();u.type="lowpass",u.frequency.value=1200,u.Q.value=1,s.connect(c),c.connect(u),u.connect(l),l.connect(this.masterGain),l.gain.setValueAtTime(0,i),l.gain.linearRampToValueAtTime(e*.6,i+.1),l.gain.linearRampToValueAtTime(e*.5,i+n*.6),l.gain.exponentialRampToValueAtTime(.01,i+n),s.start(i),s.stop(i+n)}}class Yt extends Js{static nextId=0;static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Yt.assets.initialized||(Yt.assets.geometries.torsoNormal=new he(.25,.3,.2),Yt.assets.geometries.torsoHob=new he(.35,.3,.2),Yt.assets.geometries.head=new he(.2,.2,.2),Yt.assets.geometries.ear=new ci(.05,.15,4),Yt.assets.geometries.arm=new he(.08,.25,.08),Yt.assets.geometries.leg=new he(.1,.25,.1),Yt.assets.geometries.club=new Ci(.03,.05,.4,6),Yt.assets.geometries.crossV=new he(.2,.8,.2),Yt.assets.geometries.crossH=new he(.6,.2,.2),Yt.assets.materials.skinNormal=new oe({color:5614165}),Yt.assets.materials.clothesNormal=new oe({color:9127187}),Yt.assets.materials.skinHob=new oe({color:3368499}),Yt.assets.materials.clothesHob=new oe({color:2236962}),Yt.assets.materials.club=new oe({color:6636321}),Yt.assets.materials.cross=new oe({color:5614165,transparent:!0,opacity:1}),Yt.assets.initialized=!0)}constructor(t,e,i,n,s="normal",a=null){Yt.initAssets(),super(t,e,i,n,"goblin"),this.type=s,this.type=s,this.clanId=a,this.id=Yt.nextId++,this.type==="hobgoblin"?(this.hp=60+Math.floor(Math.random()*30),this.maxHp=this.hp,this.lifespan=80+Math.random()*40,this.damage=15):(this.hp=30+Math.floor(Math.random()*10),this.maxHp=this.hp,this.lifespan=30+Math.random()*20,this.damage=8),this.age=0,this.isDead=!1,this.isFinished=!1,this.state="idle",this.targetUnit=null,this.targetBuilding=null,this.attackCooldown=0,this.attackRate=1,this.position=new I,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}},this.walkAnimTimer=0,this.position.set(this.terrain.gridToWorld(this.gridX),this.terrain.getTileHeight(this.gridX,this.gridZ),this.terrain.gridToWorld(this.gridZ)),this.isMoving=!1,this.moveTimer=0,this.moveInterval=1600,this.lastTime=window.game&&window.game.gameTotalTime!==void 0?window.game.gameTotalTime:0,this.baseMoveDuration=800,this.moveDuration=this.baseMoveDuration,this.terrain.registerEntity(this,this.gridX,this.gridZ,"goblin")}updateLogic(t,e,i,n){if(this.isDead||this.isFinished)return;if(this.age+=e,this.age>=this.lifespan){this.die();return}if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}if(this.isMoving&&this.updateMovement(t),this.attackCooldown>0&&(this.attackCooldown-=e,this.attackCooldown>1-.2&&(this.limbs.rightArm.x=-Math.PI/2)),Math.random()<.005&&console.log(`[GoblinAI] ID:${this.id} State:${this.state} Moving:${this.isMoving} TargetU:${!!this.targetUnit} TargetB:${!!this.targetBuilding} Pos:${this.gridX.toFixed(1)},${this.gridZ.toFixed(1)}`),!this.isMoving){if(this.state==="migrating"&&this.migrationTarget){this.moveToTarget(this.migrationTarget.x,this.migrationTarget.z,t),this.getDistance(this.migrationTarget.x,this.migrationTarget.z)<2&&(console.log(`Goblin ${this.id} finished migrating.`),this.state="idle",this.migrationTarget=null);return}if(this.findTarget(i,n),this.targetUnit&&this.targetUnit.isDead&&(this.targetUnit=null,this.chaseTimer=0),this.currentMemoryTarget&&!this.targetUnit&&!this.targetBuilding&&(this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z)<5&&window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null),this.targetUnit)if(this.chaseTimer=(this.chaseTimer||0)+e,this.chaseTimer>10)this.targetUnit=null,this.chaseTimer=0,this.moveRandomly(t);else{if(this.moveToTarget(this.targetUnit.gridX,this.targetUnit.gridZ,t),!this.targetUnit)return;this.getDistance(this.targetUnit.gridX,this.targetUnit.gridZ)<=1.8&&(this.attackTarget(t,e),this.chaseTimer=0)}else if(this.targetBuilding)this.moveToTarget(this.targetBuilding.gridX,this.targetBuilding.gridZ,t),this.getDistanceToBuilding(this.targetBuilding)<=1.5&&this.attackTarget(t,e);else if(!this.isMoving&&t-this.lastTime>this.moveInterval){this.wanderCount=(this.wanderCount||0)+1;let a=!1;if(Math.random()<.02&&(a=this.tryBuildHut()),a)this.wanderCount=0;else if(this.wanderCount>10){console.log(`Goblin ${this.id} bored. Migrating...`),this.migrate(t),this.wanderCount=0,this.lastTime=t;return}this.moveRandomly(t),this.lastTime=t}}}findTarget(t,e){if(this.targetUnit&&(this.targetUnit.isDead||this.targetUnit.isFinished)&&(this.targetUnit=null),this.targetBuilding&&this.targetBuilding.userData.hp<=0&&(this.targetBuilding=null),this.targetUnit||this.targetBuilding)return;const i=this.terrain.findBestTarget("unit",this.gridX,this.gridZ,10,(s,a)=>{if(s.isSleeping)return 1/0;const o=this.terrain.getTileHeight(s.gridX,s.gridZ);let h=a;return o>8&&(h+=20),h});if(this.targetUnit=i,this.targetUnit)return;const n=this.terrain.findBestTarget("building",this.gridX,this.gridZ,20,(s,a)=>s.userData.type==="goblin_hut"||s.userData.type==="cave"||s.userData.hp<=0?1/0:a);this.targetBuilding=n,!this.targetUnit&&!this.targetBuilding&&this.currentMemoryTarget&&(this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z)<5&&window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null)}getDistanceToBuilding(t){if(!t)return 1/0;let e=1;this.terrain&&this.terrain.getBuildingSize?e=this.terrain.getBuildingSize(t.type):((t.type==="house"||t.type==="farm")&&(e=2),(t.type==="mansion"||t.type==="barracks"||t.type==="tower")&&(e=3),t.type==="castle"&&(e=4));const i=t.gridX,n=t.gridX+e-1,s=t.gridZ,a=t.gridZ+e-1,o=Math.max(i-this.gridX,0,this.gridX-n),h=Math.max(s-this.gridZ,0,this.gridZ-a);return Math.sqrt(o*o+h*h)}moveToTarget(t,e,i){if(this.isMoving)return;const n=this.getDistance(t,e);let s=this.gridX,a=this.gridZ,o=!1;if(n>2&&this.terrain.findPath){if(this.terrain.grid[t]&&this.terrain.grid[t][e]&&this.terrain.grid[t][e].hasBuilding){let c=t,d=e,u=1/0;const m=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(const g of m){const x=t+g.x,f=e+g.z;if(this.terrain.isValidGrid(x,f)&&!this.terrain.grid[x][f].hasBuilding&&this.terrain.grid[x][f].height>0){const p=Math.pow(this.gridX-x,2)+Math.pow(this.gridZ-f,2);p<u&&(u=p,c=x,d=f)}}u!==1/0&&(t=c,e=d)}if(!this.path||this.path.length===0||i-this.lastPathTime>2e3){const c=this.terrain.findPath(this.gridX,this.gridZ,t,e);c&&c.length>1&&(this.path=c,this.pathIndex=1,this.lastPathTime=i)}if(this.path&&this.pathIndex<this.path.length){const c=this.path[this.pathIndex];s=c.x,a=c.z,this.pathIndex++,o=!0}}if(!o){const c=t-this.gridX,d=e-this.gridZ;Math.abs(c)>Math.abs(d)?s+=Math.sign(c):a+=Math.sign(d);const u=this.terrain.logicalWidth||80,m=this.terrain.logicalDepth||80;s<0&&(s=u-1),s>=u&&(s=0),a<0&&(a=m-1),a>=m&&(a=0)}const h=this.terrain.getTileHeight(s,a);let l=!1;if((h<=0||Math.abs(h-this.terrain.getTileHeight(this.gridX,this.gridZ))>2||this.terrain.grid[s][a].hasBuilding)&&(l=!0),l){this.path=null,this.handleMoveFailure(i);return}this.startMove(s,a,i)}moveRandomly(t){if(this.clanId&&Math.random()<.3){if(Math.random()<.2)console.log(`Goblin ${this.id} distracted from raid!`),this.tryBuildHut();else if(window.game&&window.game.goblinManager){const a=window.game.goblinManager.getClanRaidTarget(this.clanId);if(a){this.currentMemoryTarget=a;const o=a.x-this.gridX,h=a.z-this.gridZ;if(Math.abs(o)>0||Math.abs(h)>0){const l=this.gridX+Math.sign(o),c=this.gridZ+Math.sign(h),d=this.terrain.getTileHeight(l,c),u=this.terrain.getTileHeight(this.gridX,this.gridZ);if(d>0&&Math.abs(d-u)<=2){this.startMove(l,c,t);return}}}}}const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let a=n.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[n[a],n[o]]=[n[o],n[a]]}const s=this.terrain.getTileHeight(this.gridX,this.gridZ);for(const a of n){let o=this.gridX+a.x,h=this.gridZ+a.z;o<0&&(o=e-1),o>=e&&(o=0),h<0&&(h=i-1),h>=i&&(h=0);const l=this.terrain.getTileHeight(o,h);if(Math.abs(l-s)<=2&&l>0){this.startMove(o,h,t);return}}this.lastTime=t}handleMoveFailure(t){this.pathFailCount=(this.pathFailCount||0)+1,this.pathFailCount>3&&(console.log(`Goblin ${this.id} gave up target! Stuck/Coast.`),this.targetUnit=null,this.targetBuilding=null,this.currentMemoryTarget=null,this.path=null,this.pathFailCount=0,this.moveRandomly(t))}startMove(t,e,i){if(this.gridX===void 0||isNaN(this.gridX)){console.error(`Goblin ${this.id} startMove failed: Invalid gridX (${this.gridX})`),this.isMoving=!1;return}const n=this.terrain.getTileHeight(t,e),s=this.terrain.getTileHeight(this.gridX,this.gridZ);if(Math.abs(n-s)>2){this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>5&&(this.targetBuilding=null,this.stuckCount=0,this.moveRandomly(i));return}super.startMove(t,e,i);const a=Math.abs(n-s);n>8?this.moveDuration=6e3:a>.1?this.moveDuration=3e3:this.moveDuration=this.baseMoveDuration||800,this.stuckCount=0,this.pathFailCount=0}onMoveFinished(t){this.walkAnimTimer=0,this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0}onMoveStep(t){this.walkAnimTimer+=.1;const e=Math.sin(this.walkAnimTimer)*.5,i=Math.sin(this.walkAnimTimer)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-i,this.limbs.rightLeg.x=i}attackTarget(t,e){this.targetUnit?this.attackUnit(this.targetUnit):this.targetBuilding&&this.attackBuilding(this.targetBuilding)}attackUnit(t){if(!(this.attackCooldown>0)){if(t.isDead){this.targetUnit=null;return}this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.limbs.rightArm.x=0,!t.isDead&&this.getDistance(t.gridX,t.gridZ)<=2&&(t.takeDamage(this.damage),console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${t.hp}`),t.isDead&&window.game&&window.game.goblinManager&&(window.game.goblinManager.increasePlunder(),window.game.goblinManager.recordRaidLocation(this.clanId,t.gridX,t.gridZ)))},200),this.attackCooldown=this.attackRate}}attackBuilding(t){if(this.attackCooldown>0)return;this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.limbs.rightArm.x=0},200),t.userData.population===void 0&&(t.userData.population=10);const e=t.userData.type==="castle",i=t.userData.type==="farm";if(i&&t.userData.hp!==void 0)t.userData.hp-=1,console.log(`Goblin hit Farm! HP: ${t.userData.hp}`),t.userData.hp<=0&&this.destroyBuilding(t);else{const n=e?2:5;if(t.userData.population-=n,!i){const s=e?.5:.2,a=Math.floor(t.userData.population*s);a>0&&(this.takeDamage(a),console.log(`Goblin took ${a} retaliation damage from ${t.userData.type}!`))}}t.userData.population<1&&this.destroyBuilding(t),window.game&&window.game.goblinManager&&window.game.goblinManager.recordRaidLocation(this.clanId,t.userData.gridX,t.userData.gridZ),this.attackCooldown=this.attackRate}destroyBuilding(t){this.terrain.removeBuilding(t),console.log("Building destroyed!"),window.game&&window.game.goblinManager&&window.game.goblinManager.increasePlunder()}takeDamage(t){if(!this.isDead){if(this.hp-=t,this.isMoving,this.attackCooldown>0){const e=this.attackCooldown/this.attackRate;e<.9&&e>.5&&(this.limbs.rightArm.x=-Math.PI/2+Math.sin(e*Math.PI*4)*.5)}this.hp<=0&&this.die()}}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.createCross())}dispose(){this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.material&&t.userData.clonedMat&&t.material.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}createCross(){const t=new hi,e=new ne(Yt.assets.geometries.crossV,Yt.assets.materials.cross);e.position.y=.4,t.add(e);const i=new ne(Yt.assets.geometries.crossH,Yt.assets.materials.cross);i.position.y=.6,t.add(i);const n=this.terrain.getVisualPosition(this.gridX,this.gridZ,!0);t.position.set(n.x,n.y+.2,n.z),this.scene.add(t),this.crossMesh=t,this.deathTimer=0,setTimeout(()=>{this.crossMesh&&(console.log(`[Goblin] Failsafe removing cross ID:${this.id}`),this.scene.remove(this.crossMesh),this.crossMesh.traverse(s=>{s.material&&s.userData.clonedMat&&s.material.dispose()}),this.crossMesh=null)},1500)}updateDeathAnimation(t){if(!this.crossMesh){this.isFinished=!0;return}isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=1;if(this.deathTimer>=i)console.log(`[Goblin] Death Animation Finished ID:${this.id}. Removing Cross.`),this.scene.remove(this.crossMesh),this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this),this.crossMesh.children.forEach(n=>{n.material&&n.userData.clonedMat&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material&&(s.userData.clonedMat||(s.material=s.material.clone(),s.userData.clonedMat=!0),s.material.opacity=1-n)})}}migrate(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.random()*Math.PI*2,s=20+Math.random()*20;let a=Math.floor(this.gridX+Math.cos(n)*s),o=Math.floor(this.gridZ+Math.sin(n)*s);a<0&&(a+=e),a>=e&&(a-=e),o<0&&(o+=i),o>=i&&(o-=i),this.terrain.getTileHeight(a,o)<=0&&(a=(a+5)%e),console.log(`Goblin ${this.id} migrating to ${a},${o} (Walking)`),this.state="migrating",this.migrationTarget={x:a,z:o},this.moveToTarget(a,o,t)}tryBuildHut(){const t=Math.round(this.gridX),e=Math.round(this.gridZ);if(!this.terrain.grid[t]||!this.terrain.grid[t][e]||this.terrain.grid[t][e].hasBuilding)return!1;const i=this.terrain.getTileHeight(t,e);if(i>8||i<=0)return!1;const n=this.terrain.buildings||[],s=6;for(const o of n)if(o.userData.type==="goblin_hut"){const h=o.userData.gridX-t,l=o.userData.gridZ-e;if(h*h+l*l<s*s)return!1}const a=this.terrain.addBuilding("goblin_hut",t,e);return a?(a.userData.clanId=this.clanId,console.log(`Goblin (Clan: ${this.clanId}) built a Hut!`),!0):!1}}class Im{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.MAX_INSTANCES=5e4,Yt.initAssets();const n=Yt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this._dummy=new xe,this._scratchVector=new I,this._scratchSphere=new ii(new I,2),this.initInstancedMeshes()}initInstancedMeshes(){const t=(i,n,s)=>{const a=new qe(i,n,s);return a.instanceMatrix.setUsage(Ze),a.frustumCulled=!1,a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a),a},e=Yt.assets;this.torsoMesh=t(e.geometries.torsoNormal,this.getWhiteMaterial(),this.MAX_INSTANCES),this.headMesh=t(e.geometries.head,this.getWhiteMaterial(),this.MAX_INSTANCES),this.earMesh=t(e.geometries.ear,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.armMesh=t(e.geometries.arm,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.legMesh=t(e.geometries.leg,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.clubMesh=t(e.geometries.club,e.materials.club,this.MAX_INSTANCES)}getWhiteMaterial(){return this.whiteMat||(this.whiteMat=new oe({color:16777215,clippingPlanes:this.clippingPlanes})),this.whiteMat}update(t,e){if(!t)return;let i=0,n=0,s=0,a=0,o=0;const h=performance.now();(!this.lastLog||h-this.lastLog>2e3)&&(console.log(`[GoblinRenderer] Updating ${t.length} goblins. First pos: ${t[0]?t[0].gridX:"N/A"}`),this.lastLog=h);const l=this._dummy,c=this.terrain.logicalWidth||80,d=this.terrain.logicalDepth||80;e&&(Math.round(e.position.x/c),Math.round(e.position.z/d));const u=new pt(5614165),m=new pt(3368499),g=new pt(9127187),x=new pt(2236962);for(const f of t){if(f.isDead||f.isFinished)continue;const p=f.type==="hobgoblin",S=p?m:u,b=p?x:g;let E;f.position&&f.isMoving?E={x:f.position.x,y:f.position.y,z:f.position.z}:E=this.terrain.getVisualPosition(f.gridX,f.gridZ,!0);const R=90,y=this.terrain.logicalWidth||80,A=this.terrain.logicalDepth||80,U=Math.floor((e.position.x-R-E.x)/y),T=Math.ceil((e.position.x+R-E.x)/y),v=Math.floor((e.position.z-R-E.z)/A),P=Math.ceil((e.position.z+R-E.z)/A),L=f.rotationY||0,O=f.limbs&&f.limbs.leftArm?f.limbs.leftArm.x:0,k=f.limbs&&f.limbs.rightArm?f.limbs.rightArm.x:0,W=f.limbs&&f.limbs.leftLeg?f.limbs.leftLeg.x:0,q=f.limbs&&f.limbs.rightLeg?f.limbs.rightLeg.x:0;for(let J=U;J<=T;J++)for(let V=v;V<=P&&!(i>=this.MAX_INSTANCES);V++){const et=J*y,nt=V*A,xt=E.x+et,Nt=E.z+nt,Gt=E.y;l.position.set(xt,Gt+.3,Nt),l.rotation.set(0,L,0);const _t=p?1.2:1,Kt=p?1.4:1;l.scale.set(_t*Kt,_t,_t),l.updateMatrix(),this.torsoMesh.setMatrixAt(i,l.matrix),this.torsoMesh.setColorAt(i,S),l.position.set(0,.25,0),l.position.set(xt,Gt+.55,Nt),l.rotation.set(0,L,0),l.scale.set(_t,_t,_t),l.updateMatrix(),this.headMesh.setMatrixAt(i,l.matrix),this.headMesh.setColorAt(i,S),l.position.set(.12*_t,.55,0),l.position.applyAxisAngle(new I(0,1,0),L),l.position.add(new I(xt,Gt,Nt)),l.rotation.set(0,L,-Math.PI/2),l.scale.set(_t,_t,_t),l.updateMatrix(),this.earMesh.setMatrixAt(n++,l.matrix),this.earMesh.setColorAt(n-1,S),l.position.set(-.12*_t,.55,0),l.position.applyAxisAngle(new I(0,1,0),L),l.position.add(new I(xt,Gt,Nt)),l.rotation.set(0,L,Math.PI/2),l.scale.set(_t,_t,_t),l.updateMatrix(),this.earMesh.setMatrixAt(n++,l.matrix),this.earMesh.setColorAt(n-1,S),l.position.set(.18*_t,.3,0),l.position.applyAxisAngle(new I(0,1,0),L),l.position.add(new I(xt,Gt,Nt)),l.rotation.set(O,L,0),l.scale.set(_t,_t,_t),l.updateMatrix(),this.armMesh.setMatrixAt(s++,l.matrix),this.armMesh.setColorAt(s-1,S),l.position.set(-.18*_t,.3,0),l.position.applyAxisAngle(new I(0,1,0),L),l.position.add(new I(xt,Gt,Nt)),l.rotation.set(k,L,0),l.scale.set(_t,_t,_t),l.updateMatrix(),this.armMesh.setMatrixAt(s++,l.matrix),this.armMesh.setColorAt(s-1,S);{const X=l.position.clone(),Y=l.rotation.clone(),dt=new I(0,-.15,.1);dt.applyEuler(Y);const Ut=X.clone().add(dt);l.position.copy(Ut),l.rotation.set(k+Math.PI/2,L,0),l.scale.set(_t,_t,_t),l.updateMatrix(),this.clubMesh.setMatrixAt(o++,l.matrix)}l.position.set(.08*_t,.12,0),l.position.applyAxisAngle(new I(0,1,0),L),l.position.add(new I(xt,Gt,Nt)),l.rotation.set(W,L,0),l.scale.set(_t,_t,_t),l.updateMatrix(),this.legMesh.setMatrixAt(a++,l.matrix),this.legMesh.setColorAt(a-1,b),l.position.set(-.08*_t,.12,0),l.position.applyAxisAngle(new I(0,1,0),L),l.position.add(new I(xt,Gt,Nt)),l.rotation.set(q,L,0),l.scale.set(_t,_t,_t),l.updateMatrix(),this.legMesh.setMatrixAt(a++,l.matrix),this.legMesh.setColorAt(a-1,b),i++}}this.torsoMesh.count=i,this.headMesh.count=i,this.earMesh.count=n,this.armMesh.count=s,this.legMesh.count=a,this.clubMesh.count=o,this.torsoMesh.instanceMatrix.needsUpdate=!0,this.torsoMesh.instanceColor.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.headMesh.instanceColor.needsUpdate=!0,this.earMesh.instanceMatrix.needsUpdate=!0,this.earMesh.instanceColor.needsUpdate=!0,this.armMesh.instanceMatrix.needsUpdate=!0,this.armMesh.instanceColor.needsUpdate=!0,this.legMesh.instanceMatrix.needsUpdate=!0,this.legMesh.instanceColor.needsUpdate=!0,this.clubMesh.instanceMatrix.needsUpdate=!0}}class Lm{constructor(t,e,i){this.scene=t,this.terrain=e,this.particleManager=i,this.goblins=[],this.caves=[],this.hutSpawnTimers=new Map,this.renderer=new Im(t,e,e.clippingPlanes),this.spawnTimer=0,this.spawnInterval=2,this.plunderCount=0,this.MAX_GOBLINS=2e4,this.clanMemory={},Yt.initAssets();const n=Yt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.terrain.clippingPlanes)}),this.caveGroup=new hi,this.scene.add(this.caveGroup),this.generateCaves(),this.caves.length>0&&(console.log("GoblinManager: Force spawning Debug Goblin"),this.spawnGoblinAtCave(this.caves[0]))}reset(){console.log("Resetting GoblinManager...");for(const t of this.goblins)t.mesh&&this.scene.remove(t.mesh),t.dispose&&t.dispose();this.goblins=[],this.plunderCount=0,this.caves.forEach(t=>{t.mesh&&this.caveGroup.remove(t.mesh)}),this.caves=[]}scanForCaves(){this.terrain.buildings.forEach(t=>{t.userData.type==="cave"&&this.registerCave(t)})}registerCave(t){if(this.caves.some(i=>i.gridX===t.userData.gridX&&i.gridZ===t.userData.gridZ))return;const e={gridX:t.userData.gridX,gridZ:t.userData.gridZ,mesh:new hi,spawnCooldown:0,originalHeight:t.y,building:t,clanId:`clan_${t.userData.gridX}_${t.userData.gridZ} `};this.caves.push(e)}generateCaves(){console.log("GoblinManager: Generation started...");const t=5,e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=0,s=0;for(;n<t&&s<5e3;){s++;const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);this.isValidCaveSpot(a,o)&&this.createCave(a,o)&&n++}console.log(`GoblinManager: Generated ${n} goblin caves after ${s} attempts.`)}isValidCaveSpot(t,e){const i=this.terrain.getTileHeight(t,e);return!(i<=2||i>10)}createCaveTexture(){if(this.caveTexture)return this.caveTexture;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),i=e.createRadialGradient(64,64,10,64,64,60);return i.addColorStop(0,"#000000"),i.addColorStop(.6,"#1a1a1a"),i.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=i,e.fillRect(0,0,128,128),e.fillStyle="#FFFF00",e.beginPath(),e.arc(50,50,2,0,Math.PI*2),e.arc(78,50,2,0,Math.PI*2),e.fill(),this.caveTexture=new Le(t),this.caveTexture}createCave(t,e){const i=this.terrain.getTileHeight(t,e),n=new ss(.4,16,16),s=new oe({color:0,clippingPlanes:this.terrain.clippingPlanes||[]}),a=new ne(n,s),o=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;a.position.set(t-o/2+.5,i,e-h/2+.5),a.scale.set(1,.6,1),this.caveGroup.add(a);const l=this.terrain.addBuilding("cave",t,e);return l?(console.log(`GoblinManager: Cave registered at ${t},${e} `),l.userData.linkedMesh=a,this.caves.push({mesh:a,building:l,gridX:t,gridZ:e,originalHeight:i,spawnCooldown:Math.random()*this.spawnInterval,clanId:`clan_cave_${t}_${e} `}),!0):(console.warn(`GoblinManager: Failed to register cave at ${t},${e} (Terrain rejected)`),this.caveGroup.remove(a),!1)}update(t,e,i,n,s=1,a){this.caves.forEach((c,d)=>{d===0&&Math.random()<.01&&console.log(`[GoblinManager] Cave 0 Pos: ${c.mesh.position.x.toFixed(2)}, ${c.mesh.position.y.toFixed(2)}, ${c.mesh.position.z.toFixed(2)} Visible:${c.mesh.visible} Parent:${!!c.mesh.parent} `);const u=this.terrain.getTileHeight(c.gridX,c.gridZ);if(u<=0){console.error(`[GoblinManager] Cave destroyed: SUBMERGED(H = ${u})`),this.destroyCave(c,d);return}if(c.building){if(!this.terrain.buildings.includes(c.building)){console.error("[GoblinManager] Cave destroyed: BUILDING MISSING from Terrain!"),this.destroyCave(c,d);return}c.mesh.position.y!==c.building.y&&(c.mesh.position.y=c.building.y)}else c.mesh.position.y=u;Math.abs(u-c.originalHeight)>.1&&(c.originalHeight=u,c.mesh.position.y=u,c.mesh.updateMatrix()),c.spawnCooldown-=e,c.spawnCooldown<=0&&this.goblins.length<(this.MAX_GOBLINS||2e4)&&(this.spawnGoblinAtCave(c),c.spawnCooldown=this.spawnInterval+Math.random()*5)}),this.updateHuts(e);const o=this.terrain.buildings||[],h=Math.max(1,Math.floor(2/s));this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const l=this.frameCount%h;for(let c=this.goblins.length-1;c>=0;c--){const d=this.goblins[c];if(d.updateMovement&&d.updateMovement(t),d.updateVisuals&&d.updateVisuals(),c%h===l){try{d.isDead?d.updateDeathAnimation(e*h):d.updateLogic(t,e*h,n,o)}catch(u){console.error(`[GoblinManager] Error updating goblin ${c}: `,u);continue}d.isFinished&&this.goblins.splice(c,1)}}this.renderer&&this.renderer.update(this.goblins,a)}spawnGoblinAtCave(t){if(t.building&&!this.terrain.buildings.includes(t.building)){console.warn("[GoblinManager] Aborting spawn: Cave building missing"),this.destroyCave(t,this.caves.indexOf(t));return}const e=this.terrain.grid[t.gridX][t.gridZ];if(!e||!e.hasBuilding){console.warn("[GoblinManager] Aborting spawn: Grid cell has no building");return}const i=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];i.sort(()=>Math.random()-.5);for(const n of i){const s=t.gridX+n.x,a=t.gridZ+n.z;if(this.terrain.getTileHeight(s,a)>0){this.spawnGoblin(s,a,t.clanId);return}}this.spawnGoblin(t.gridX,t.gridZ,t.clanId)}spawnGoblin(t,e,i=null){const s=Math.random()<.1?"hobgoblin":"normal",a=new Yt(this.scene,this.terrain,t,e,s,i);this.goblins.push(a),this.terrain.registerEntity&&this.terrain.registerEntity(a,t,e,"goblin"),console.log(`Goblin spawned at ${t},${e} Clan:${i} `)}increasePlunder(){this.plunderCount++,console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount} `)}updateHuts(t){let e=.15;e+=this.plunderCount*.03,e>2&&(e=2),(this.terrain.buildings||[]).forEach(n=>{if(n.userData&&n.userData.type==="goblin_hut"&&(n.userData.population=(n.userData.population||0)+e*t,n.userData.population>=10)){n.userData.population-=10;const s=n.userData.clanId||`clan_hut_${n.userData.gridX}_${n.userData.gridZ}`,a={gridX:n.userData.gridX,gridZ:n.userData.gridZ,clanId:s};this.spawnGoblinAtCave(a),console.log(`Goblin born from Hut! Clan: ${s}. Global Pop: ${this.goblins.length}`)}})}recordRaidLocation(t,e,i){if(!t)return;this.clanMemory[t]||(this.clanMemory[t]=[]);const n=this.clanMemory[t],s=n.find(a=>Math.abs(a.x-e)<5&&Math.abs(a.z-i)<5);s?(s.weight=Math.min(s.weight+1,10),s.timestamp=window.game?window.game.gameTotalTime:Date.now()):n.push({x:e,z:i,weight:1,timestamp:window.game?window.game.gameTotalTime:Date.now()}),n.sort((a,o)=>o.weight-a.weight),n.length>5&&(n.length=5)}getClanRaidTarget(t){if(!t||!this.clanMemory[t]||this.clanMemory[t].length===0)return null;const e=this.clanMemory[t],i=e.reduce((s,a)=>s+a.weight,0);let n=Math.random()*i;for(const s of e)if(n-=s.weight,n<=0)return s;return e[0]}destroyCave(t,e){console.error(`[GoblinManager] DESTROYING CAVE at ${t.gridX},${t.gridZ}!`),t.mesh&&(this.scene.remove(t.mesh),this.caveGroup.remove(t.mesh)),t.building&&this.terrain.buildings.includes(t.building)&&this.terrain.removeBuilding(t.building),this.caves.splice(e,1)}reportRaidFailure(t,e,i){if(!t||!this.clanMemory[t])return;const n=this.clanMemory[t],s=n.findIndex(a=>Math.abs(a.x-e)<5&&Math.abs(a.z-i)<5);s!==-1&&(n[s].weight-=2,console.log(`Clan ${t} raid failure at ${e},${i}. Weight: ${n[s].weight}`),n[s].weight<=0&&(n.splice(s,1),console.log(`Clan ${t} forgot raid location ${e},${i}`)))}}class Ie{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ie.assets.initialized)return;const t=new ss(.12,8,8);t.scale(.4,.6,1.5),Ie.assets.geometries.body=t;const e=new ci(.1,.3,4);e.rotateX(-Math.PI/2),Ie.assets.geometries.tail=e,Ie.assets.materials.fish=new oe({color:4500223}),Ie.assets.initialized=!0}constructor(t,e,i,n){Ie.initAssets(),this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.isDead=!1,this.mesh=new hi;const s=new ne(Ie.assets.geometries.body,Ie.assets.materials.fish);this.mesh.add(s);const a=new ne(Ie.assets.geometries.tail,Ie.assets.materials.fish);a.position.z=-.3,this.mesh.add(a),this.scene.add(this.mesh),this.updatePosition(),this.moveTimer=0,this.moveInterval=500+Math.random()*1500,this.lastTime=performance.now(),this.isMoving=!1,this.targetGridX=i,this.targetGridZ=n,this.startGridX=i,this.startGridZ=n,this.moveStartTime=0,this.moveDuration=800,this.wiggleOffset=Math.random()*100,this.terrain.registerEntity(this,this.gridX,this.gridZ,"fish")}update(t,e,i=!0){if(this.isDead)return;if(this.terrain.getTileHeight(this.gridX,this.gridZ)>.5){this.die();return}if(this.isMoving){const s=(t-this.moveStartTime)/this.moveDuration;if(s>=1)this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition();else{const a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let h=this.startGridX,l=this.startGridZ,c=this.targetGridX,d=this.targetGridZ;c-h>a/2&&(h+=a),h-c>a/2&&(c+=a),d-l>o/2&&(l+=o),l-d>o/2&&(d+=o);const u=h+(c-h)*s,m=l+(d-l)*s,g=this.getPositionForGrid(u,m);if(this.mesh.position.copy(g),i){const x=Math.sin(t*.01+this.wiggleOffset)*.3;this.mesh.rotation.z=x}}}else if(t-this.lastTime>this.moveInterval&&(this.moveRandomly(t),this.lastTime=t),i){const s=Math.sin(t*.003+this.wiggleOffset)*.15;this.mesh.rotation.z=s}}updatePosition(){const t=this._spatial?this._spatial.x:this.gridX,e=this._spatial?this._spatial.z:this.gridZ;this.terrain.moveEntity(this,t,e,this.gridX,this.gridZ,"fish");const i=this.getPositionForGrid(this.gridX,this.gridZ);this.mesh.position.copy(i)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=-.2;return new I(t-i/2+.5,s,e-n/2+.5)}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let s=n.length-1;s>0;s--){const a=Math.floor(Math.random()*(s+1));[n[s],n[a]]=[n[a],n[s]]}for(const s of n){let a=this.gridX+s.x,o=this.gridZ+s.z;if(a<0&&(a=e-1),a>=e&&(a=0),o<0&&(o=i-1),o>=i&&(o=0),this.terrain.getTileHeight(a,o)<=.5){this.isMoving=!0,this.moveStartTime=t,this.startGridX=this.gridX,this.startGridZ=this.gridZ,this.targetGridX=a,this.targetGridZ=o;const l=Math.atan2(s.x,s.z);this.mesh.rotation.y=l;return}}Math.random()<.3&&(this.mesh.rotation.y+=(Math.random()-.5)*1)}die(){this.isDead=!0,this.terrain.unregisterEntity(this),this.scene.remove(this.mesh)}}class Um{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.fishes=[],Ie.initAssets(),Ie.assets.materials.fish&&(Ie.assets.materials.fish.clippingPlanes=this.clippingPlanes),this.init()}init(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;this.fishes=[];for(let i=0;i<75;i++)this.spawnRandomFish(t,e);console.log("Spawned initial fish.")}spawnRandomFish(t,e){if(this.fishes.length>=75)return;let i=0;for(;i<10;){const n=Math.floor(Math.random()*t),s=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,s)<=.5){const o=new Ie(this.scene,this.terrain,n,s);this.fishes.push(o);return}i++}}update(t,e,i){for(let n=this.fishes.length-1;n>=0;n--){const s=this.fishes[n];if(i&&s.mesh){const a=new ii(s.mesh.position,1.5);i.intersectsSphere(a)?s.update(t,e,!0):s.update(t,e,!1)}else s.update(t,e,!0);s.isDead&&this.fishes.splice(n,1)}if(this.fishes.length<60){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;Math.random()<.05&&this.spawnRandomFish(n,s)}}}class Fm{constructor(t){this.game=t,this.terrain=t.terrain,this.canvas=document.getElementById("minimap"),this.ctx=this.canvas.getContext("2d"),this.logicalW=this.terrain.logicalWidth,this.logicalD=this.terrain.logicalDepth,this.isDragging=!1,this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this))}onMouseDown(t){t.preventDefault(),t.stopPropagation(),t.target===this.canvas&&(this.isDragging=!0,this.game.controls&&(this.game.controls.enabled=!1),this.updateCameraFromMiniMap(t))}onMouseMove(t){this.isDragging&&(t.preventDefault(),t.stopPropagation(),this.updateCameraFromMiniMap(t))}onMouseUp(t){this.isDragging=!1,this.game.controls&&(this.game.controls.enabled=!0)}updateCameraFromMiniMap(t){const e=this.canvas.getBoundingClientRect(),i=t.clientX-e.left,n=t.clientY-e.top,s=this.game.terrain.logicalWidth,a=this.game.terrain.logicalDepth,o=i/this.canvas.width,h=n/this.canvas.height,l=o*s,c=h*a,d=l-s/2,u=c-a/2,m=this.game.camera,g=this.game.controls;if(g){const x=g.target.y,f=m.position.x-g.target.x,p=m.position.z-g.target.z,S=m.position.y-g.target.y;g.target.set(d,x,u),m.position.set(d+f,g.target.y+S,u+p),g.update()}}update(){if(!this.ctx)return;this.ctx.fillStyle="#000",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.canvas.width/this.logicalW,e=this.canvas.height/this.logicalD;this.imgData||(this.imgData=this.ctx.createImageData(this.canvas.width,this.canvas.height));const i=this.imgData,n=i.data,s=this.terrain.grid;for(let x=0;x<this.logicalW;x++)for(let f=0;f<this.logicalD;f++){const p=s[x][f],S=p.height,b=this.game.terrain._lastIsNight||!1,E=this.game.terrain.currentSeason||"Spring",R=p.noise,y=p.moisture||.5,A=this.terrain.getBiomeColor(S,y,R,b,E,x,f,!0),U=(f*160+x)*4;n[U]=A.r*255,n[U+1]=A.g*255,n[U+2]=A.b*255,n[U+3]=255}this.ctx.putImageData(i,0,0),this.ctx.fillStyle="blue",this.game.units.forEach(x=>{if(x.isDead)return;const f=Math.floor(x.gridX*t),p=Math.floor(x.gridZ*e);this.ctx.fillRect(f,p,2,2)}),this.ctx.fillStyle="red",this.game.goblinManager.goblins.forEach(x=>{if(x.isDead)return;const f=Math.floor(x.gridX*t),p=Math.floor(x.gridZ*e);this.ctx.fillRect(f,p,2,2)});const a=this.game.camera.position.x,o=this.game.camera.position.z;let h=a,l=o,c=h+this.logicalW/2,d=l+this.logicalD/2;c=(c%this.logicalW+this.logicalW)%this.logicalW,d=(d%this.logicalD+this.logicalD)%this.logicalD;const u=c*t,m=d*e,g=30*t;this.ctx.strokeStyle="white",this.ctx.lineWidth=1,this.ctx.strokeRect(u-g,m-g,g*2,g*2);for(let x=-1;x<=1;x++)for(let f=-1;f<=1;f++){if(x===0&&f===0)continue;const p=u+x*this.canvas.width,S=m+f*this.canvas.height;this.ctx.strokeRect(p-g,S-g,g*2,g*2)}}}class Nm{constructor(t){this.game=t,this.camera=t.camera,this.wrapper=document.createElement("div"),this.wrapper.id="compass-wrapper",this.wrapper.style.position="absolute",this.wrapper.style.top="60px",this.wrapper.style.left="180px",this.wrapper.style.width="60px",this.wrapper.style.height="60px",this.wrapper.style.pointerEvents="none",this.wrapper.style.zIndex="1000",this.canvas=document.createElement("canvas"),this.canvas.width=60,this.canvas.height=60,this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),document.body.appendChild(this.wrapper)}update(){if(!this.game.controls)return;const e=-this.game.controls.getAzimuthalAngle(),i=this.ctx,n=this.canvas.width,s=this.canvas.height,a=n/2,o=s/2,h=n/2-5;i.clearRect(0,0,n,s),i.save(),i.translate(a,o),i.rotate(e),i.strokeStyle="#8B4513",i.lineWidth=4,i.beginPath(),i.arc(0,0,h,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(210, 180, 140, 0.3)",i.fill(),i.fillStyle="#800000",i.beginPath(),i.moveTo(0,-h+5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.strokeStyle="#3e2723",i.lineWidth=1,i.stroke(),i.fillStyle="#D2691E",i.beginPath(),i.moveTo(0,h-5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.stroke(),i.restore(),i.save(),i.translate(a,o),i.rotate(e),i.font="bold 16px serif",i.fillStyle="#F5DEB3",i.textAlign="center",i.textBaseline="middle",i.fillText("N",0,-h+12),i.restore()}}class Bm{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],ft.initAssets();const n=ft.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),n.heads&&n.heads.forEach(s=>s.clippingPlanes=this.clippingPlanes),this.maxInstances=5e4,this.dummy=new xe,this.whiteMaterial=new oe({color:16777215,clippingPlanes:this.clippingPlanes}),this.skinMaterial=ft.assets.materials.skin,this.headMaterials=ft.assets.materials.heads,this.torsoMesh=new qe(ft.assets.geometries.body,this.whiteMaterial,this.maxInstances),this.torsoMesh.instanceMatrix.setUsage(Ze),this.torsoMesh.frustumCulled=!1,this.scene.add(this.torsoMesh),this.headMesh=new qe(ft.assets.geometries.head,ft.assets.materials.hair,this.maxInstances),this.headMesh.instanceMatrix.setUsage(Ze),this.headMesh.frustumCulled=!1,this.scene.add(this.headMesh),this.faceMesh=new qe(ft.assets.geometries.facePlane,ft.assets.materials.face,this.maxInstances),this.faceMesh.instanceMatrix.setUsage(Ze),this.faceMesh.frustumCulled=!1,this.scene.add(this.faceMesh),this.leftArmMesh=new qe(ft.assets.geometries.limb,this.skinMaterial,this.maxInstances),this.leftArmMesh.instanceMatrix.setUsage(Ze),this.leftArmMesh.frustumCulled=!1,this.scene.add(this.leftArmMesh),this.rightArmMesh=new qe(ft.assets.geometries.limb,this.skinMaterial,this.maxInstances),this.rightArmMesh.instanceMatrix.setUsage(Ze),this.rightArmMesh.frustumCulled=!1,this.scene.add(this.rightArmMesh),this.leftLegMesh=new qe(ft.assets.geometries.limb,this.whiteMaterial,this.maxInstances),this.leftLegMesh.instanceMatrix.setUsage(Ze),this.leftLegMesh.frustumCulled=!1,this.scene.add(this.leftLegMesh),this.rightLegMesh=new qe(ft.assets.geometries.limb,this.whiteMaterial,this.maxInstances),this.rightLegMesh.instanceMatrix.setUsage(Ze),this.rightLegMesh.frustumCulled=!1,this.scene.add(this.rightLegMesh),this.swordMesh=new qe(ft.assets.geometries.sword,ft.assets.materials.metal,this.maxInstances),this.swordMesh.instanceMatrix.setUsage(Ze),this.swordMesh.frustumCulled=!1,this.scene.add(this.swordMesh),this.staffMesh=new qe(ft.assets.geometries.staff,ft.assets.materials.wood,this.maxInstances),this.staffMesh.instanceMatrix.setUsage(Ze),this.staffMesh.frustumCulled=!1,this.scene.add(this.staffMesh),this.hatMesh=new qe(ft.assets.geometries.wizardHat,ft.assets.materials.wizardHat,this.maxInstances),this.hatMesh.instanceMatrix.setUsage(Ze),this.hatMesh.frustumCulled=!1,this.scene.add(this.hatMesh),this.hatBrimMesh=new qe(ft.assets.geometries.wizardHatBrim,ft.assets.materials.wizardHat,this.maxInstances),this.hatBrimMesh.instanceMatrix.setUsage(Ze),this.hatBrimMesh.frustumCulled=!1,this.scene.add(this.hatBrimMesh),this._scratchVector=new I,this._scratchSphere=new ii(new I,2),this._up=new I(0,1,0),this._neighborOffsets=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}]}update(t,e,i){if(!i)return;if(!ft.assets.initialized){console.error("UR: Assets Missing");return}let n=0,s=0,a=0,o=0;const h=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;i&&(Math.round(i.position.x/h),Math.round(i.position.z/l)),t.length>0&&Math.random()<.01;const c=new pt(6636321),d=new pt(13938487),u=new pt(139),m=new pt(11184810),g=new pt(4456584),x=new pt(16764074);for(const f of t){if(f.isDead||f.isSleeping||!f.position)continue;let p=c;f.role==="knight"?p=m:f.role==="wizard"?p=g:f.role==="fisher"?p=u:f.role==="hunter"?p=new pt(25600):f.role==="worker"&&(f.isSpecial?p=new pt(9109504):p=c);const S=90,b=Math.floor((i.position.x-S-f.position.x)/h),E=Math.ceil((i.position.x+S-f.position.x)/h),R=Math.floor((i.position.z-S-f.position.z)/l),y=Math.ceil((i.position.z+S-f.position.z)/l);for(let A=b;A<=E;A++)for(let U=R;U<=y&&!(n>=this.maxInstances);U++){const T=A,v=U,P=f.position.x+T*h,L=f.position.z+v*l,O=f.position.y,k=f.rotationY;if(this.dummy.position.set(P,O,L),this.dummy.rotation.set(0,k,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.torsoMesh.setMatrixAt(n,this.dummy.matrix),this.torsoMesh.setColorAt(n,p),this.dummy.position.set(P,O,L),this.dummy.rotation.set(0,k,0),this.dummy.scale.set(1,1,1),f.role==="wizard"&&(this.dummy.scale.set(1,.5,1),this.dummy.position.y+=.2375),this.dummy.updateMatrix(),this.headMesh.setMatrixAt(n,this.dummy.matrix),this.faceMesh.setMatrixAt(n,this.dummy.matrix),f.role==="knight"?this.headMesh.setColorAt(n,p):this.headMesh.setColorAt(n,d),this.faceMesh.setColorAt(n,new pt(16777215)),this.dummy.position.set(.18,.45,0),this.dummy.position.applyAxisAngle(this._up,k),this.dummy.position.add(this._scratchVector.set(P,O,L)),this.dummy.rotation.set(f.limbs.leftArm.x,k,0),this.dummy.updateMatrix(),this.leftArmMesh.setMatrixAt(n,this.dummy.matrix),this.leftArmMesh.setColorAt(n,x),this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,k),this.dummy.position.add(this._scratchVector.set(P,O,L)),this.dummy.rotation.set(f.limbs.rightArm.x,k,0),this.dummy.updateMatrix(),this.rightArmMesh.setMatrixAt(n,this.dummy.matrix),this.rightArmMesh.setColorAt(n,x),this.dummy.position.set(.08,.25,0),this.dummy.position.applyAxisAngle(this._up,k),this.dummy.position.add(this._scratchVector.set(P,O,L)),this.dummy.rotation.set(f.limbs.leftLeg.x,k,0),this.dummy.updateMatrix(),this.leftLegMesh.setMatrixAt(n,this.dummy.matrix),this.leftLegMesh.setColorAt(n,p),this.dummy.position.set(-.08,.25,0),this.dummy.position.applyAxisAngle(this._up,k),this.dummy.position.add(this._scratchVector.set(P,O,L)),this.dummy.rotation.set(f.limbs.rightLeg.x,k,0),this.dummy.updateMatrix(),this.rightLegMesh.setMatrixAt(n,this.dummy.matrix),this.rightLegMesh.setColorAt(n,p),f.role==="knight"&&(this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,k),this.dummy.position.add(this._scratchVector.set(P,O,L)),this.dummy.rotation.set(f.limbs.rightArm.x+Math.PI/2,k,0),this.dummy.rotation.set(f.limbs.rightArm.x,k,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.swordMesh.setMatrixAt(s,this.dummy.matrix),s++),f.role==="wizard"){this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,k),this.dummy.position.add(this._scratchVector.set(P,O,L)),this.dummy.rotation.set(f.limbs.rightArm.x,k,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.staffMesh.setMatrixAt(a,this.dummy.matrix),this.staffMesh.setColorAt(a,ft.assets.materials.wood.color),a++;const W=f.role==="wizard"?.625:.75;this.dummy.position.set(P,O+W,L),this.dummy.rotation.set(0,k,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.hatMesh.setMatrixAt(o,this.dummy.matrix),this.hatBrimMesh.setMatrixAt(o,this.dummy.matrix),o++}n++}}this.torsoMesh.count=n,this.headMesh.count=n,this.faceMesh.count=n,this.leftArmMesh.count=n,this.rightArmMesh.count=n,this.leftLegMesh.count=n,this.rightLegMesh.count=n,this.swordMesh.count=s,this.staffMesh.count=a,this.hatMesh.count=o,this.hatBrimMesh.count=o,this.torsoMesh.frustumCulled=!1,this.headMesh.frustumCulled=!1,this.faceMesh.frustumCulled=!1,this.leftArmMesh.frustumCulled=!1,this.rightArmMesh.frustumCulled=!1,this.leftLegMesh.frustumCulled=!1,this.rightLegMesh.frustumCulled=!1,this.torsoMesh.instanceColor&&(this.torsoMesh.instanceColor.needsUpdate=!0),this.headMesh.instanceColor&&(this.headMesh.instanceColor.needsUpdate=!0),this.faceMesh.instanceColor&&(this.faceMesh.instanceColor.needsUpdate=!0),this.leftLegMesh.instanceColor&&(this.leftLegMesh.instanceColor.needsUpdate=!0),this.rightLegMesh.instanceColor&&(this.rightLegMesh.instanceColor.needsUpdate=!0),this.leftArmMesh.instanceColor&&(this.leftArmMesh.instanceColor.needsUpdate=!0),this.rightArmMesh.instanceColor&&(this.rightArmMesh.instanceColor.needsUpdate=!0),this.staffMesh.instanceColor&&(this.staffMesh.instanceColor.needsUpdate=!0),this.torsoMesh.instanceMatrix.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.faceMesh.instanceMatrix.needsUpdate=!0,this.leftArmMesh.instanceMatrix.needsUpdate=!0,this.rightArmMesh.instanceMatrix.needsUpdate=!0,this.leftLegMesh.instanceMatrix.needsUpdate=!0,this.rightLegMesh.instanceMatrix.needsUpdate=!0,this.swordMesh.instanceMatrix.needsUpdate=!0,this.staffMesh.instanceMatrix.needsUpdate=!0,this.hatMesh.instanceMatrix.needsUpdate=!0,this.hatBrimMesh.instanceMatrix.needsUpdate=!0}}class Om{constructor(t,e,i){this.scene=t,this.terrain=e,this.terrainWidth=e.logicalWidth,this.terrainDepth=e.logicalDepth,this.clippingPlanes=i||[],this.MAX_INSTANCES=1e4,this.meshes={},this.initAssets(),this.initInstancedMeshes(),this._scratchVector=new I,this._scratchSphere=new ii(new I,2),this._dummy=new xe}initAssets(){this.assets={};const t={clippingPlanes:this.clippingPlanes,clipShadows:!0};this.assets.houseWallGeo=new he(1.6,.8,1.6),this.assets.houseWallGeo.translate(0,.4,0);const e=document.createElement("canvas");e.width=128,e.height=64;const i=e.getContext("2d"),n=document.createElement("canvas");n.width=128,n.height=64;const s=n.getContext("2d");i.fillStyle="#654321",i.fillRect(0,0,128,64),s.fillStyle="#000000",s.fillRect(0,0,128,64),i.fillStyle="#5A3A1A";for(let y=0;y<64;y+=16)for(let A=0;A<128;A+=16)(A+y)/16%2===0&&i.fillRect(A+1,y+1,14,14);const a=(y,A)=>{i.fillStyle="#111",i.fillRect(y-6,A-8,12,16),s.fillStyle="#FFFFFF",s.fillRect(y-4,A-6,8,12)};a(32,32),a(96,32),this.assets.houseWallMat=new oe({...t,map:new Le(e),emissiveMap:new Le(n),emissive:0,emissiveIntensity:0});const o=document.createElement("canvas");o.width=64,o.height=64;const h=o.getContext("2d");h.fillStyle="#800000",h.fillRect(0,0,64,64),h.fillStyle="#600000";for(let y=0;y<64;y+=8)h.fillRect(0,y,64,2);h.fillStyle="#A00000";for(let y=0;y<64;y+=8)for(let A=y%16===0?0:4;A<64;A+=8)h.fillRect(A,y,2,8);this.assets.houseRoofMat=new oe({...t,map:new Le(o),color:16777215}),this.assets.houseRoofGeo=new ci(1.2,.8,4),this.assets.houseRoofGeo.translate(0,1.2,0),this.assets.houseRoofGeo.rotateY(Math.PI/4);const l=new Ci(1.4,1.4,4.5,16);l.translate(0,2.25,0);const c=new Ci(1.6,1.6,.4,16);c.translate(0,4.5,0),this.assets.towerGeo=l,this.assets.towerRimGeo=c,console.log("Tower Geometry Initialized (Split Mode)");const d=document.createElement("canvas");d.width=128,d.height=256;const u=d.getContext("2d");u.fillStyle="#505050",u.fillRect(0,0,128,256),u.fillStyle="#404040";for(let y=0;y<256;y+=16){const A=y/16%2===0?0:8;for(let U=0;U<128;U+=16)u.fillRect((U+A)%128+1,y+1,14,14)}u.fillStyle="#101010",u.fillRect(20,80,8,24),u.fillRect(80,80,8,24),u.fillRect(50,180,8,24),u.fillRect(110,180,8,24),this.assets.towerMat=new oe({...t,map:new Le(d),color:15658734,emissive:0}),this.assets.towerCapMat=new oe({...t,color:5263440,map:null,emissive:0}),console.log("Tower Debug: Generated High-Res Tower Texture + Cap Material"),this.assets.farmGeo=new Vi(1.8,1.8),this.assets.farmGeo.rotateX(-Math.PI/2),this.assets.farmGeo.translate(0,.05,0);const m=document.createElement("canvas");m.width=64,m.height=64;const g=m.getContext("2d");g.fillStyle="#DAA520",g.fillRect(0,0,64,64),g.fillStyle="#B8860B";for(let y=0;y<10;y++)g.fillRect(y*6,0,2,64);this.assets.farmMat=new oe({...t,map:new Le(m),side:Ye}),this.assets.barracksGeo=new he(2.4,1.2,2.4),this.assets.barracksGeo.translate(0,.6,0);const x=document.createElement("canvas");x.width=128,x.height=64;const f=x.getContext("2d"),p=document.createElement("canvas");p.width=128,p.height=64;const S=p.getContext("2d");f.fillStyle="#654321",f.fillRect(0,0,128,64),S.fillStyle="#000000",S.fillRect(0,0,128,64),f.fillStyle="#5A3A1A";for(let y=0;y<64;y+=16)for(let A=0;A<128;A+=16)(A+y)/16%2===0&&f.fillRect(A+1,y+1,14,14);const b=(y,A)=>{f.fillStyle="#111",f.fillRect(y-6,A-8,12,16),S.fillStyle="#FFFFEE",S.fillRect(y-4,A-6,8,12)};b(22,32),b(64,32),b(106,32),this.assets.barracksRoofGeo=new ci(2,1.2,8),this.assets.barracksRoofGeo.translate(0,1.8,0),this.assets.barracksMat=new oe({...t,map:new Le(x),emissiveMap:new Le(p),emissive:0,emissiveIntensity:0}),this.assets.barracksRoofMat=new oe({...t,map:new Le(o),color:16777215}),this.assets.goblinHutGeo=new ci(.4,.6,6),this.assets.goblinHutGeo.translate(0,.3,0);const E=document.createElement("canvas");E.width=64,E.height=64;const R=E.getContext("2d");R.fillStyle="#654321",R.fillRect(0,0,64,64),R.fillStyle="#8B4513";for(let y=0;y<30;y++)R.fillRect(Math.random()*60,Math.random()*60,4,2);this.assets.goblinHutMat=new oe({...t,map:new Le(E),color:11184810}),[this.assets.houseWallMat,this.assets.barracksMat].forEach(y=>{y&&(y.clippingPlanes=this.clippingPlanes,y.needsUpdate=!0)})}initInstancedMeshes(){const t=(i,n)=>{const s=new qe(i,n,this.MAX_INSTANCES);return s.instanceMatrix.setUsage(Ze),s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1,this.scene.add(s),s};this.meshes.houseWalls=t(this.assets.houseWallGeo,this.assets.houseWallMat),this.meshes.houseRoofs=t(this.assets.houseRoofGeo,this.assets.houseRoofMat),this.meshes.farms=t(this.assets.farmGeo,this.assets.farmMat),this.meshes.goblinHuts=t(this.assets.goblinHutGeo,this.assets.goblinHutMat);const e=[this.assets.towerMat,this.assets.towerCapMat,this.assets.towerCapMat];this.meshes.towers=t(this.assets.towerGeo,e),this.meshes.towerRims=t(this.assets.towerRimGeo,e),this.meshes.barracksWalls=t(this.assets.barracksGeo,this.assets.barracksMat),this.meshes.barracksRoofs=t(this.assets.barracksRoofGeo,this.assets.barracksRoofMat)}update(t,e,i){if(!t)return;const n=this.terrainWidth||80,s=this.terrainDepth||80;let a=0,o=0;if(i&&(a=Math.round(i.position.x/n),o=Math.round(i.position.z/s)),this._lastBaseGridX===a&&this._lastBaseGridZ===o&&this._lastBuildingCount===t.length&&!this.forceUpdate)return;this._lastBaseGridX=a,this._lastBaseGridZ=o,this._lastBuildingCount=t.length,this.forceUpdate=!1;let h=0,l=0,c=0,d=0,u=0;const m=this._dummy,g=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}],x=new pt(16777215),f=new pt(16777215),p=new pt(11184810);for(const S of t){const b=S.gridX,E=S.gridZ,R=this.terrain.getVisualPosition(b,E,!0),y=R.y||0;for(const A of g){const U=(A.x+a)*n,T=(A.z+o)*s,v=R.x+U,P=R.z+T;let L=v,O=P;S.type==="farm"||S.type==="house"?(L+=.5,O+=.5):(S.type==="barracks"||S.type==="tower")&&(L+=1,O+=1),S.type,m.position.set(L,y,O),m.scale.set(1,1,1),m.rotation.set(0,S.rotation||0,0),m.updateMatrix(),S.type==="house"&&h<this.MAX_INSTANCES?(this.meshes.houseWalls.setMatrixAt(h,m.matrix),this.meshes.houseRoofs.setMatrixAt(h,m.matrix),this.meshes.houseRoofs.setColorAt(h,x),h++):S.type==="farm"&&l<this.MAX_INSTANCES?(this.meshes.farms.setMatrixAt(l,m.matrix),l++):S.type==="barracks"&&d<this.MAX_INSTANCES?(this.meshes.barracksWalls.setMatrixAt(d,m.matrix),this.meshes.barracksRoofs.setMatrixAt(d,m.matrix),this.meshes.barracksRoofs.setColorAt(d,f),d++):S.type==="goblin_hut"&&c<this.MAX_INSTANCES?(this.meshes.goblinHuts.setMatrixAt(c,m.matrix),this.meshes.goblinHuts.setColorAt(c,p),this.meshes.goblinHuts.setColorAt(c,p),c++):S.type==="tower"&&u<this.MAX_INSTANCES&&(this.meshes.towers.setMatrixAt(u,m.matrix),this.meshes.towerRims.setMatrixAt(u,m.matrix),u++)}}Math.random()<.005&&console.log(`[BuildingRenderer] Updated Buffers. House:${h}, Farm:${l} (BaseGrid: ${a},${o})`),this.meshes.houseWalls.count=h,this.meshes.houseRoofs.count=h,this.meshes.farms.count=l,this.meshes.goblinHuts.count=c,this.meshes.barracksWalls.count=d,this.meshes.barracksRoofs.count=d,this.meshes.towers.count=u,this.meshes.towerRims.count=u,this.meshes.houseWalls.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceColor&&(this.meshes.houseRoofs.instanceColor.needsUpdate=!0),this.meshes.farms.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceColor&&(this.meshes.goblinHuts.instanceColor.needsUpdate=!0),this.meshes.barracksWalls.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceColor&&(this.meshes.barracksRoofs.instanceColor.needsUpdate=!0),this.meshes.towers.instanceMatrix.needsUpdate=!0,this.meshes.towerRims.instanceMatrix.needsUpdate=!0}updateLighting(t){if(this._lastIsNight===t)return;this._lastIsNight=t;const e=t?1:0,i=t?16747520:0;this.assets.houseWallMat&&(this.assets.houseWallMat.emissive.setHex(i),this.assets.houseWallMat.emissiveIntensity=e,this.assets.houseWallMat.needsUpdate=!0),this.assets.castleKeepMat&&(this.assets.castleKeepMat.emissive.setHex(i),this.assets.castleKeepMat.emissiveIntensity=e,this.assets.castleKeepMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0)}}class al{constructor(){this.raids=[]}reportRaid(t,e,i){const n=this.raids.find(s=>{const a=s.x-t,o=s.z-e;return a*a+o*o<100});if(n){n.time=i;return}this.raids.push({x:t,z:e,time:i,threat:10}),this.raids.length>20&&this.raids.shift()}reportVictory(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>100})}reportClear(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>25})}getPriorities(t){return this.raids.filter(e=>t-e.time<3e5)}}class zm{constructor(){console.log("Game constructor called"),this.saveManager=new Cm,this.soundManager=new Pm,this.mana=100,this.battleMemory={raids:[],victories:[],reportRaid:(c,d)=>{this.battleMemory.raids.push({x:c,z:d,time:this.gameTotalTime,threat:10}),this.battleMemory.raids.length>20&&this.battleMemory.raids.shift()},reportVictory:(c,d)=>{this.battleMemory.victories.push({x:c,z:d,time:this.gameTotalTime}),this.battleMemory.raids=this.battleMemory.raids.filter(u=>{const m=u.x-c,g=u.z-d;return m*m+g*g>100})},getPriorities:()=>{const c=this.gameTotalTime;return this.battleMemory.raids.filter(d=>c-d.time<3e5)}},window.game=this,this.scene=new ac,this.scene.background=new pt(8900331);const t=window.innerWidth/window.innerHeight,e=50;this.camera=new Ga(-e*t,e*t,e,-e,1,1e3),this.camera.position.set(20,20,20),this.camera.lookAt(this.scene.position),this.renderer=new um({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.localClippingEnabled=!1,document.body.appendChild(this.renderer.domElement),this.controls=new gm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.screenSpacePanning=!1,this.controls.minZoom=.8,this.controls.maxZoom=4,this.controls.maxPolarAngle=Math.PI/2,this.clippingPlanes=[new Qe(new I(1,0,0),0),new Qe(new I(-1,0,0),0),new Qe(new I(0,0,1),0),new Qe(new I(0,0,-1),0)],this.renderer.clippingPlanes=[],this.renderer.localClippingEnabled=!0,this.setupLights(),this.requestQueue=[],this.requestQueue=[],this.requestIdCounter=0,this.projectiles=[],this.terrain=new fm(this.scene,this.clippingPlanes),this.units=[],this.resources={grain:0,fish:0,meat:0},this.cloudManager=new Dm(this.scene,this.terrain.width,this.terrain.depth),this.birdManager=new Ae(this.scene,this.terrain.width,this.terrain.depth,this.clippingPlanes),this.sheepManager=new Se(this.scene,this.terrain,this.clippingPlanes),this.goblinManager=new Lm(this.scene,this.terrain,this,this.clippingPlanes),this.fishManager=new Um(this.scene,this.terrain,this.clippingPlanes),this.minimap=new Fm(this),this.compass=new Nm(this),this.unitRenderer=new Bm(this.scene,this.terrain,this.clippingPlanes),this.buildingRenderer=new Om(this.scene,this.terrain,this.clippingPlanes),this.inputManager=new pm(this.scene,this.camera,this.terrain,this.spawnUnit.bind(this),this.units,this.unitRenderer,this),this.initMarkerMaterial();let i=10,n=10,s=!1,a=0;const o=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;for(;!s&&a<1e3;){const c=Math.floor(Math.random()*o),d=Math.floor(Math.random()*h);this.terrain.getTileHeight(c,d)>1&&(i=c,n=d,s=!0),a++}if(this.spawnUnit(i,n,!0),s){const c=i-o/2,d=n-h/2;this.controls&&(this.controls.target.set(c,0,d),this.camera.position.set(c+20,20,d+20),this.controls.update())}this.statsDisplay=document.getElementById("stats-container"),window.addEventListener("resize",this.onWindowResize.bind(this)),this.lastTime=performance.now(),this.gameTime=8,this.gameTotalTime=0,this.raidPoints=[],this.timeScale=1,this.resources={grain:10,fish:10,meat:10};const l=()=>{this.soundManager.initialized||(this.soundManager.init(this.camera),window.removeEventListener("click",l),window.removeEventListener("touchstart",l),window.removeEventListener("touchend",l),window.removeEventListener("keydown",l))};window.addEventListener("click",l),window.addEventListener("touchstart",l),window.addEventListener("touchend",l),window.addEventListener("keydown",l),window.toggleDebugSpeed=()=>{const c=document.getElementById("debug-speed-btn");this.timeScale===1?(this.timeScale=10,console.log("Debug Speed: 10x"),c&&c.classList.add("active")):(this.timeScale=1,console.log("Debug Speed: 1x"),c&&c.classList.remove("active"))},window.addEventListener("keydown",c=>{if(c.key==="p"||c.key==="P"){const d=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex=((this.currentSeasonIndex||0)+1)%4;const u=d[this.currentSeasonIndex];console.log(`[DEBUG] Force Cycle Season: ${u}`),this.season=u,this.daysPassed=(this.daysPassed||0)+1,this.terrain&&this.terrain.setSeason(u);const m=document.getElementById("season-val");m&&(m.textContent=u)}}),this.timeScale=1,this.animate()}setupLights(){this.ambientLight=new bc(4210752),this.scene.add(this.ambientLight),this.directionalLight=new vc(16777215,1),this.directionalLight.position.set(10,20,10),this.scene.add(this.directionalLight)}spawnUnit(t,e,i=!1,n=null){let s="citizen",a=!1,o=null;if(i===!0)a=!0,s="worker";else if(typeof i=="string")s=i;else if(n){if(o=n,n.type==="barracks")s="knight";else if(n.type==="tower")s="wizard";else{const l=Math.random();l<.2?s="hunter":l<.4?s="fisher":s="worker"}(s==="knight"||s==="wizard")&&!n.userData.memory&&(n.userData.memory=new al),console.log(`Spawned ${s} linked to ${n.type} at ${n.userData.gridX},${n.userData.gridZ}`)}else s=(Math.random()>.5,"worker");const h=new ft(this.scene,this.terrain,t,e,s,a);return h.game=this,h.homeBase=o,this.units.push(h),h}handleBuildingSpawn(t,e,i,n){return this.spawnUnit(t,e,null,n),!0}recordRaidPoint(t,e){this.raidPoints.some(n=>Math.abs(n.x-t)<10&&Math.abs(n.z-e)<10)||this.raidPoints.push({x:t,z:e,time:this.gameTime})}canAction(){return this.mana>=0}consumeMana(t){this.mana-=t}onWindowResize(){const t=window.innerWidth/window.innerHeight,e=20;this.camera.left=-e*t,this.camera.right=e*t,this.camera.top=e,this.camera.bottom=-e,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}updateEnvironment(t){this.gameTime+=t*(this.dayNightSpeed||.05),this.gameTime>=24&&(this.gameTime=0);let e=!1;return this.gameTime>=18||this.gameTime<6?(e=!0,this.scene.background.setHex(51),this.directionalLight.intensity=.2):(this.scene.background.setHex(8900331),this.directionalLight.intensity=1),e}updateSeasons(t){const i=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex===void 0&&(this.currentSeasonIndex=0);const n=this.gameTime/24;if(this.prevTimeOfDay===void 0&&(this.prevTimeOfDay=n),n<this.prevTimeOfDay&&(this.daysPassed=(this.daysPassed||0)+1,console.log(`New Day! Day ${this.daysPassed}. Season: ${i[this.currentSeasonIndex]}`),this.daysPassed%3===0)){this.currentSeasonIndex=(this.currentSeasonIndex+1)%4;const a=i[this.currentSeasonIndex];console.log(`Season Changed to: ${a}`),this.terrain&&this.terrain.setSeason(a)}this.prevTimeOfDay=n;const s=i[this.currentSeasonIndex];this.season!==s&&(console.log(`[DEBUG] Game.updateSeasons: Syncing season mismatch. Game:${this.season} -> ${s}`),this.season=s,this.terrain&&this.terrain.setSeason(this.season))}initMarkerMaterial(){const t=`
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
        `;this.markerMaterial=new _i({uniforms:{uTime:{value:0},uColor:{value:new pt(16776960)}},vertexShader:t,fragmentShader:e,transparent:!0,blending:Ur,depthWrite:!1,side:Ye})}addRequest(t,e,i,n=null,s=null,a=null){const o=`req_${this.requestIdCounter++}`,h={id:o,type:t,x:e,z:i,status:"pending",assignedTo:null,mesh:null,createdAt:Date.now()},l=new Ci(.5,.5,5,16,1,!0),c=this.markerMaterial.clone();c.uniforms.uColor.value.setHex(16776960);const d=new ne(l,c);d.renderOrder=2e3;const u=s!==null?s:e,m=a!==null?a:i;let g=this.terrain.getTileHeight(e,i);return(g===void 0||isNaN(g))&&(g=10),d.position.set(u,g+2,m),this.scene.add(d),h.mesh=d,this.requestQueue.push(h),console.log(`[Game] Request Added: ${t} at (${e},${i}) ID:${o}`),this.forceAssignRequest(h),h}findBestRequest(t){if(!t)return null;let e=null,i=1/0;const n=this.terrain.logicalWidth||160,s=this.terrain.logicalDepth||160;for(const a of this.requestQueue){if(a.status!=="pending")continue;let o=Math.abs(a.x-t.gridX),h=Math.abs(a.z-t.gridZ);o>n/2&&(o=n-o),h>s/2&&(h=s-h);const l=o*o+h*h;l<i&&(i=l,e=a)}return e}forceAssignRequest(t){!t||t.status!=="pending"||setTimeout(()=>{try{if(!this.units||!t||t.status!=="pending")return;let e=null,i=1/0;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=0,o=0,h=0,l=0;for(const c of this.units){if(c.role!=="worker"){h++;continue}a++;let d=0;c.targetRequest?(o++,d=1e6):c.action==="Working"?d=1e6:l++;let u=Math.abs(c.gridX-t.x),m=Math.abs(c.gridZ-t.z);u>n/2&&(u=n-u),m>s/2&&(m=s-m);const x=u*u+m*m+d;x<i&&(i=x,e=c)}if(e)e.targetRequest&&(console.log(`[Game] INTERRUPTING Unit ${e.id} (Job: ${e.targetRequest.id}) for Priority Request ${t.id}`),this.releaseRequest(e,e.targetRequest),e.targetRequest=null,e.action="Idle"),this.claimRequest(e,t)&&(e.targetRequest=t,e.action="Approaching Job",console.log(`[Game] Force-Assigned Request ${t.id} to Unit ${e.id} (Score: ${i.toFixed(1)})`));else{let c=Math.abs(unit.gridX-t.x),d=Math.abs(unit.gridZ-t.z);c>n/2&&(c=n-c),d>s/2&&(d=s-d);const u=c*c+d*d;u<i&&(i=u,e=unit)}e?this.claimRequest(e,t)&&(e.targetRequest=t,e.action="Approaching Job",console.log(`[Game] Force-Assigned (Reassigned) Request ${t.id} to Unit ${e.id} (Dist: ${Math.sqrt(i).toFixed(1)})`)):console.warn(`[Game] Force Assign FAILED for ${t.id}. Scanned:${this.units.length} (Workers:${a} Busy:${o} Valid:${l})`)}catch(e){console.error("[Game] Force Assignment Error:",e)}},10)}claimRequest(t,e){return!e||e.status!=="pending"?!1:(e.status="assigned",e.assignedTo=t.id,!0)}releaseRequest(t,e){e&&e.assignedTo===t.id&&(e.status="pending",e.assignedTo=null,console.log(`[Game] Request ${e.id} released by Unit ${t.id}. Searching for replacement...`),this.forceAssignRequest(e))}updateRequestMarkers(){if(!this.scene||!this.camera)return;const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80,i=this.camera.position.x,n=this.camera.position.z;for(const s of this.requestQueue)if(s.mesh){const a=s.x-t/2,o=s.z-e/2,h=a+Math.round((i-a)/t)*t,l=o+Math.round((n-o)/e)*e;let c=this.terrain.getTileHeight(s.x,s.z);(c===void 0||isNaN(c))&&(c=10),s.mesh.position.set(h,c+2.5,l)}}tryCancelRequest(t,e){let n=-1,s=9;for(let a=0;a<this.requestQueue.length;a++){const o=this.requestQueue[a];if(o.status!=="pending"&&o.status!=="assigned")continue;const h=o.x-t,l=o.z-e,c=h*h+l*l;c<s&&(s=c,n=a)}if(n!==-1){const a=this.requestQueue[n];return a.mesh&&(this.scene.remove(a.mesh),a.mesh.geometry&&a.mesh.geometry.dispose(),a.mesh.material&&a.mesh.material.dispose()),this.requestQueue.splice(n,1),console.log(`[Game] Request Canceled at ${a.x},${a.z} (Target: ${t},${e})`),this.consumeMana(-10),!0}return!1}checkExpiredRequests(t){for(let i=this.requestQueue.length-1;i>=0;i--){const n=this.requestQueue[i];if(n.status==="assigned"){const s=n.assignedTo;if(s!==null){const a=this.units.find(h=>h.id===s);let o=!1;if(a?(a.isDead||a.targetRequest!==n)&&(o=!0):o=!0,o){console.warn(`[Game] Detected ZOMBIE Request ${n.id} (Assigned to ${s}). Resetting.`),n.status="pending",n.assignedTo=null,this.forceAssignRequest(n);continue}}}if(n.status==="pending"&&(n.lastAttempt||(n.lastAttempt=n.createdAt),t-n.lastAttempt>1e3)){const s=t-n.createdAt;s>3e4&&s%5e3<1e3&&console.warn(`[Game] Request ${n.id} pending for ${(s/1e3).toFixed(1)}s. Retrying Force Assign...`),this.forceAssignRequest(n),n.lastAttempt=t}n.status==="pending"&&t-n.createdAt>3e5&&(console.log(`[Game] Request Timed Out: ${n.type} ID:${n.id}`),n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&n.mesh.material.dispose()),this.requestQueue.splice(i,1))}}spawnProjectile(t,e){this.projectileGeo||(this.projectileGeo=new ss(.3,16,16));const i=this.markerMaterial.clone();i.uniforms.uColor.value.setHex(16729088);const n=new ne(this.projectileGeo,i);n.position.copy(t),this.scene.add(n),this.projectiles.push({mesh:n,target:e.clone(),speed:15,uTime:0})}updateProjectiles(t){for(let e=this.projectiles.length-1;e>=0;e--){const i=this.projectiles[e];i.uTime+=t,i.mesh.material.uniforms&&(i.mesh.material.uniforms.uTime.value=i.uTime);const n=new I().subVectors(i.target,i.mesh.position),s=n.length();if(s<.5)this.scene.remove(i.mesh),i.mesh.material&&i.mesh.material.dispose(),this.projectiles.splice(e,1);else{n.normalize();const a=i.speed*t;a>=s?i.mesh.position.copy(i.target):i.mesh.position.add(n.multiplyScalar(a))}}}completeRequest(t,e){if(!e)return;if(console.log(`[Game] Completing Request ${e.type} at ${e.x},${e.z} `),e.mesh){e.mesh.material.uniforms&&e.mesh.material.uniforms.uColor.value.setHex(65280);const n=e.mesh,s=this.scene;setTimeout(()=>{n&&(n.visible=!1,s&&s.remove(n),n.geometry&&n.geometry.dispose(),n.material&&n.material.dispose())},1e3),e.mesh=null}e.type==="raise"?this.terrain.raise(e.x,e.z):e.type==="lower"?this.terrain.lower(e.x,e.z):e.type==="build_tower"?this.terrain.addBuilding("tower",e.x,e.z):e.type==="build_barracks"&&this.terrain.addBuilding("barracks",e.x,e.z);const i=this.requestQueue.indexOf(e);i!==-1&&this.requestQueue.splice(i,1)}updateCameraControls(){this.controls&&this.controls.update();const t=this.camera.position.x,e=this.camera.position.z,i=30;this.clippingPlanes&&(this.clippingPlanes[0].constant=-(t-i),this.clippingPlanes[1].constant=t+i,this.clippingPlanes[2].constant=-(e-i),this.clippingPlanes[3].constant=e+i)}updateStats(){if(!this.statsDisplay)return;const t=this.terrain.totalHousingPop||0;this.totalPopulation=Math.floor(t)+this.units.length*10;const e=Math.floor(this.gameTime),i=Math.floor(this.gameTime%1*60),n=`${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")} `,a=this.gameTime>=18||this.gameTime<6?"🌙":"☀️";document.getElementById("time-val").innerText=`${n} ${a} `;const o=document.getElementById("day-val");o&&(o.innerText=`Day ${this.daysPassed||1} `),document.getElementById("season-val").innerText=this.season||"Spring",document.getElementById("pop-val").innerText=Math.floor(this.totalPopulation||0);const h=this.units.filter(m=>m.role==="knight").length,l=this.units.filter(m=>m.role==="wizard").length;document.getElementById("active-val").innerText=this.units.length;const c=document.getElementById("knight-val");c&&(c.innerText=h);const d=document.getElementById("wizard-val");d&&(d.innerText=l),document.getElementById("house-val").innerText=this.terrain.buildings.filter(m=>m.userData.type==="house").length,document.getElementById("castle-val").innerText=this.terrain.buildings.filter(m=>m.userData.type==="barracks").length,document.getElementById("grain-val").innerText=Math.floor(this.resources.grain),document.getElementById("fish-val").innerText=Math.floor(this.resources.fish),document.getElementById("meat-val").innerText=Math.floor(this.resources.meat);const u=document.getElementById("mana-val");u&&(u.innerText=Math.floor(this.mana),u.style.color=this.mana<0?"#ff4444":"white")}animate(){requestAnimationFrame(this.animate.bind(this));const t=performance.now();let e=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t,e*=this.timeScale||1,this.gameTotalTime+=e*1e3;const i=this.gameTotalTime,n=i/1e3;(!this.lastHeartbeat||t-this.lastHeartbeat>5e3)&&(this.lastHeartbeat=t);let s=!1;try{s=this.updateEnvironment(e),this.updateSeasons(e),this.terrain&&this.terrain.update(e,this.handleBuildingSpawn.bind(this),s)}catch(u){console.error("Env/Season Error:",u)}this.checkExpiredRequests(Date.now()),this.updateRequestMarkers();try{this.updateCameraControls()}catch(u){console.error("Cam Error:",u)}try{this.updateStats()}catch(u){console.error("Stats Error:",u)}const o=(this.totalPopulation||0)*.1*e;this.mana+=o;try{this.inputManager.update(e)}catch(u){console.error("Input Error:",u)}try{this.cloudManager.update(e,this.camera)}catch(u){console.error("Cloud Error:",u)}this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();const h=new ns,l=new jt;l.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),h.setFromProjectionMatrix(l);try{this.birdManager.update(e,n,h)}catch(u){console.error("Bird Error:",u)}try{this.sheepManager.update(n,e)}catch(u){console.error("Sheep Error:",u)}try{this.goblinManager.update(i,e,s,this.units,this.timeScale,this.camera)}catch(u){console.error("Goblin Manager Error:",u)}try{this.fishManager.update(i,e,h)}catch(u){console.error("Fish Error:",u)}if(this.minimap)try{this.minimap.update()}catch(u){console.error("Minimap Error:",u)}if(this.compass)try{this.compass.update()}catch(u){console.error("Compass Error:",u)}this.inputManager&&this.inputManager.update(),this.updateRequestMarkers(),this.markerTime===void 0&&(this.markerTime=0),this.markerTime+=e;for(const u of this.requestQueue)u.mesh&&u.mesh.material.uniforms&&(u.mesh.material.uniforms.uTime.value=this.markerTime);this.updateProjectiles(e),this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const c=Math.max(1,Math.floor(4/this.timeScale)),d=this.frameCount%c;for(let u=this.units.length-1;u>=0;u--){const m=this.units[u];if(u===0&&this.frameCount%60===0&&console.log(`[Game Loop] Updating Units.Count: ${this.units.length}, Unit[0] ID: ${m.id} `),m.updateMovement&&m.updateMovement(i),u%c===d){m.id===0&&this.frameCount%60===0&&(console.log(`[Game Loop] Calling updateLogic for ID: 0. Dead: ${m.isDead} `),console.log(`[Game Loop] Func Start: ${m.updateLogic.toString().substring(0,100)} `),console.log(`[Game Loop Debug]Unit[0] State: Moving = ${m.isMoving}, Action = ${m.action}, Interval = ${m.moveInterval}, LastTime = ${m.lastTime}, T = ${i.toFixed(0)} `));try{m.updateLogic(i,e*c,s,this.goblinManager.goblins)}catch(g){console.error("Unit Logic Error:",g,m)}m.isDead&&m.isFinished&&this.units.splice(u,1)}}try{this.terrain.update(e,this.handleBuildingSpawn.bind(this),s)}catch(u){console.error("Terrain Update Error:",u)}if(this.terrain.updateMeshPosition(this.camera),this.terrain.updateLights(this.gameTime),this.buildingRenderer&&this.buildingRenderer.updateLighting(s),this.unitRenderer)try{this.unitRenderer.update(this.units,h,this.camera)}catch(u){console.error("UnitRenderer Error:",u)}if(this.buildingRenderer)try{this.buildingRenderer.update(this.terrain.buildings,h,this.camera)}catch(u){console.error("BuildingRenderer Error:",u)}this.renderer.render(this.scene,this.camera)}saveGame(t){if(!this.saveManager)return!1;const e={slotId:t,timestamp:Date.now(),resources:this.resources,gameTime:this.gameTime,gameTotalTime:this.gameTotalTime,currentSeasonIndex:this.currentSeasonIndex,daysPassed:this.daysPassed,terrain:this.terrain.serialize(),units:this.units.filter(i=>!i.isDead).map(i=>i.serialize()),camera:{position:{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z},zoom:this.camera.zoom,target:{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}}};return console.log("Saving Game Data:",e),e.terrain||console.error("Save Error: Terrain data is missing!"),this.saveManager.save(t,e)}loadGame(t){if(!this.saveManager)return!1;const e=this.saveManager.load(t);if(!e)return console.error("Load Game Failed: No data for slot",t),!1;console.log("Load Game: Data found",e),this.goblinManager&&this.goblinManager.reset(),this.resources=e.resources||{grain:0,fish:0,meat:0},this.gameTime=e.gameTime||8,this.gameTotalTime=e.gameTotalTime||0,this.currentSeasonIndex=e.currentSeasonIndex||0,this.daysPassed=e.daysPassed||0;const i=["Spring","Summer","Autumn","Winter"];this.season=i[this.currentSeasonIndex],this.terrain&&this.terrain.setSeason(this.season);try{console.log("Deserializing Terrain with:",e.terrain),this.terrain.deserialize(e.terrain)}catch(n){return console.error("Terrain deserialize failed:",n),!1}this.goblinManager&&this.goblinManager.scanForCaves();try{this.units.forEach(n=>{n.dispose?n.dispose():n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose())}),this.units=[]}catch(n){console.error("Unit cleanup failed:",n)}try{(e.units||[]).forEach(s=>{try{const a=ft.deserialize(s,this.scene,this.terrain);if(a.game=this,this.units.push(a),a.role==="knight"||a.role==="wizard"){let o=null;if(a.savedHomeBaseX!==void 0&&a.savedHomeBaseZ!==void 0&&(o=this.terrain.buildings.find(h=>Math.abs(h.gridX-a.savedHomeBaseX)<.1&&Math.abs(h.gridZ-a.savedHomeBaseZ)<.1)),!o){const h=a.role==="knight"?"barracks":"tower";let l=1/0;this.terrain.buildings.forEach(c=>{if(c.userData.type===h){const d=Math.abs(c.gridX-a.gridX)+Math.abs(c.gridZ-a.gridZ);d<l&&(l=d,o=c)}})}o&&(a.homeBase=o,o.userData.memory||(o.userData.memory=new al))}}catch(a){console.error("Failed to deserialize unit:",a,s)}})}catch(n){console.error("Unit restoration loop failed:",n)}return this.inputManager.units=this.units,e.camera&&(e.camera.position&&this.camera.position.set(e.camera.position.x,e.camera.position.y,e.camera.position.z),e.camera.zoom&&(this.camera.zoom=e.camera.zoom),e.camera.target&&this.controls.target.set(e.camera.target.x,e.camera.target.y,e.camera.target.z),this.camera.updateProjectionMatrix(),this.controls.update()),console.log("Game loaded from slot",t),!0}}new zm;
