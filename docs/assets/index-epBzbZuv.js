(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const Ca="181",Rn={ROTATE:0,DOLLY:1,PAN:2},An={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jl=0,Ja=1,Ql=2,fl=1,th=2,Ei=3,Hi=0,ze=1,Ye=2,Ri=0,tn=1,Nr=2,Qa=3,to=4,eh=5,Ji=100,ih=101,nh=102,sh=103,rh=104,ah=200,oh=201,lh=202,hh=203,Br=204,Or=205,ch=206,dh=207,uh=208,fh=209,ph=210,mh=211,gh=212,xh=213,_h=214,zr=0,Gr=1,kr=2,Dn=3,Hr=4,Vr=5,Wr=6,Xr=7,Da=0,Mh=1,vh=2,Gi=0,bh=1,yh=2,Sh=3,Th=4,wh=5,Eh=6,Ah=7,pl=300,Pn=301,In=302,qr=303,$r=304,Ys=306,Zr=1e3,Ai=1001,Yr=1002,je=1003,Rh=1004,os=1005,ei=1006,er=1007,Oi=1008,xi=1009,ml=1010,gl=1011,Kn=1012,Pa=1013,en=1014,mi=1015,Nn=1016,Ia=1017,La=1018,Jn=1020,xl=35902,_l=35899,Ml=1021,vl=1022,li=1023,Qn=1026,ts=1027,Ua=1028,Fa=1029,Na=1030,Ba=1031,Oa=1033,Ns=33776,Bs=33777,Os=33778,zs=33779,jr=35840,Kr=35841,Jr=35842,Qr=35843,ta=36196,ea=37492,ia=37496,na=37808,sa=37809,ra=37810,aa=37811,oa=37812,la=37813,ha=37814,ca=37815,da=37816,ua=37817,fa=37818,pa=37819,ma=37820,ga=37821,xa=36492,_a=36494,Ma=36495,va=36283,ba=36284,ya=36285,Sa=36286,Ch=3200,Dh=3201,za=0,Ph=1,Bi="",Ze="srgb",Ln="srgb-linear",Hs="linear",ie="srgb",ln=7680,eo=519,Ih=512,Lh=513,Uh=514,bl=515,Fh=516,Nh=517,Bh=518,Oh=519,Ta=35044,qe=35048,io="300 es",gi=2e3,Vs=2001;function yl(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ws(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zh(){const r=Ws("canvas");return r.style.display="block",r}const no={};function Xs(...r){const t="THREE."+r.shift();console.log(t,...r)}function Lt(...r){const t="THREE."+r.shift();console.warn(t,...r)}function fe(...r){const t="THREE."+r.shift();console.error(t,...r)}function es(...r){const t=r.join(" ");t in no||(no[t]=!0,Lt(...r))}function Gh(r,t,e){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}class rn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,a=n.length;s<a;s++)n[s].call(this,t);t.target=null}}}const we=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gs=Math.PI/180,wa=180/Math.PI;function ki(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(we[r&255]+we[r>>8&255]+we[r>>16&255]+we[r>>24&255]+"-"+we[t&255]+we[t>>8&255]+"-"+we[t>>16&15|64]+we[t>>24&255]+"-"+we[e&63|128]+we[e>>8&255]+"-"+we[e>>16&255]+we[e>>24&255]+we[i&255]+we[i>>8&255]+we[i>>16&255]+we[i>>24&255]).toLowerCase()}function kt(r,t,e){return Math.max(t,Math.min(e,r))}function kh(r,t){return(r%t+t)%t}function ir(r,t,e){return(1-e)*r+e*t}function pi(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ne(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Hh={DEG2RAD:Gs};class bt{constructor(t=0,e=0){bt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*n+t.x,this.y=s*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class nn{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,a,o){let l=i[n+0],h=i[n+1],c=i[n+2],u=i[n+3],d=s[a+0],p=s[a+1],g=s[a+2],x=s[a+3];if(o<=0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u;return}if(o>=1){t[e+0]=d,t[e+1]=p,t[e+2]=g,t[e+3]=x;return}if(u!==x||l!==d||h!==p||c!==g){let m=l*d+h*p+c*g+u*x;m<0&&(d=-d,p=-p,g=-g,x=-x,m=-m);let f=1-o;if(m<.9995){const y=Math.acos(m),_=Math.sin(y);f=Math.sin(f*y)/_,o=Math.sin(o*y)/_,l=l*f+d*o,h=h*f+p*o,c=c*f+g*o,u=u*f+x*o}else{l=l*f+d*o,h=h*f+p*o,c=c*f+g*o,u=u*f+x*o;const y=1/Math.sqrt(l*l+h*h+c*c+u*u);l*=y,h*=y,c*=y,u*=y}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,s,a){const o=i[n],l=i[n+1],h=i[n+2],c=i[n+3],u=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return t[e]=o*g+c*u+l*p-h*d,t[e+1]=l*g+c*d+h*u-o*p,t[e+2]=h*g+c*p+o*d-l*u,t[e+3]=c*g-o*u-l*d-h*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,h=o(i/2),c=o(n/2),u=o(s/2),d=l(i/2),p=l(n/2),g=l(s/2);switch(a){case"XYZ":this._x=d*c*u+h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u-d*p*g;break;case"YXZ":this._x=d*c*u+h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u+d*p*g;break;case"ZXY":this._x=d*c*u-h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u-d*p*g;break;case"ZYX":this._x=d*c*u-h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u+d*p*g;break;case"YZX":this._x=d*c*u+h*p*g,this._y=h*p*u+d*c*g,this._z=h*c*g-d*p*u,this._w=h*c*u-d*p*g;break;case"XZY":this._x=d*c*u-h*p*g,this._y=h*p*u-d*c*g,this._z=h*c*g+d*p*u,this._w=h*c*u+d*p*g;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],a=e[1],o=e[5],l=e[9],h=e[2],c=e[6],u=e[10],d=i+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(c-l)*p,this._y=(s-h)*p,this._z=(a-n)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(c-l)/p,this._x=.25*p,this._y=(n+a)/p,this._z=(s+h)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(s-h)/p,this._x=(n+a)/p,this._y=.25*p,this._z=(l+c)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-n)/p,this._x=(s+h)/p,this._y=(l+c)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(kt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,a=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=i*c+a*o+n*h-s*l,this._y=n*c+a*l+s*o-i*h,this._z=s*c+a*h+i*l-n*o,this._w=a*c-i*o-n*l-s*h,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,n=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,s=-s,a=-a,o=-o);let l=1-e;if(o<.9995){const h=Math.acos(o),c=Math.sin(h);l=Math.sin(l*h)/c,e=Math.sin(e*h)/c,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(t=0,e=0,i=0){L.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(so.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(so.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,a=t.y,o=t.z,l=t.w,h=2*(a*n-o*i),c=2*(o*e-s*n),u=2*(s*i-a*e);return this.x=e+l*h+a*u-o*c,this.y=i+l*c+o*h-s*u,this.z=n+l*u+s*c-a*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-s*o,this.y=s*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return nr.copy(this).projectOnVector(t),this.sub(nr)}reflect(t){return this.sub(nr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(kt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const nr=new L,so=new nn;class Bt{constructor(t,e,i,n,s,a,o,l,h){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,l,h)}set(t,e,i,n,s,a,o,l,h){const c=this.elements;return c[0]=t,c[1]=n,c[2]=o,c[3]=e,c[4]=s,c[5]=l,c[6]=i,c[7]=a,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],h=i[1],c=i[4],u=i[7],d=i[2],p=i[5],g=i[8],x=n[0],m=n[3],f=n[6],y=n[1],_=n[4],T=n[7],E=n[2],M=n[5],A=n[8];return s[0]=a*x+o*y+l*E,s[3]=a*m+o*_+l*M,s[6]=a*f+o*T+l*A,s[1]=h*x+c*y+u*E,s[4]=h*m+c*_+u*M,s[7]=h*f+c*T+u*A,s[2]=d*x+p*y+g*E,s[5]=d*m+p*_+g*M,s[8]=d*f+p*T+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*a*c-e*o*h-i*s*c+i*o*l+n*s*h-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=c*a-o*h,d=o*l-c*s,p=h*s-a*l,g=e*u+i*d+n*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=u*x,t[1]=(n*h-c*i)*x,t[2]=(o*i-n*a)*x,t[3]=d*x,t[4]=(c*e-n*l)*x,t[5]=(n*s-o*e)*x,t[6]=p*x,t[7]=(i*l-h*e)*x,t[8]=(a*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,a,o){const l=Math.cos(s),h=Math.sin(s);return this.set(i*l,i*h,-i*(l*a+h*o)+a+t,-n*h,n*l,-n*(-h*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(sr.makeScale(t,e)),this}rotate(t){return this.premultiply(sr.makeRotation(-t)),this}translate(t,e){return this.premultiply(sr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const sr=new Bt,ro=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ao=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vh(){const r={enabled:!0,workingColorSpace:Ln,spaces:{},convert:function(n,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ie&&(n.r=Ci(n.r),n.g=Ci(n.g),n.b=Ci(n.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ie&&(n.r=Cn(n.r),n.g=Cn(n.g),n.b=Cn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Bi?Hs:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,a){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[Ln]:{primaries:t,whitePoint:i,transfer:Hs,toXYZ:ro,fromXYZ:ao,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:i,transfer:ie,toXYZ:ro,fromXYZ:ao,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),r}const Zt=Vh();function Ci(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Cn(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let hn;class Wh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{hn===void 0&&(hn=Ws("canvas")),hn.width=t.width,hn.height=t.height;const n=hn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=hn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ws("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let a=0;a<s.length;a++)s[a]=Ci(s[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ci(e[i]/255)*255):e[i]=Ci(e[i]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Xh=0;class Ga{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?s.push(rr(n[a].image)):s.push(rr(n[a]))}else s=rr(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function rr(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Wh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let qh=0;const ar=new L;class Ce extends rn{constructor(t=Ce.DEFAULT_IMAGE,e=Ce.DEFAULT_MAPPING,i=Ai,n=Ai,s=ei,a=Oi,o=li,l=xi,h=Ce.DEFAULT_ANISOTROPY,c=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=ki(),this.name="",this.source=new Ga(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=a,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new bt(0,0),this.repeat=new bt(1,1),this.center=new bt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ar).x}get height(){return this.source.getSize(ar).y}get depth(){return this.source.getSize(ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==pl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zr:t.x=t.x-Math.floor(t.x);break;case Ai:t.x=t.x<0?0:1;break;case Yr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zr:t.y=t.y-Math.floor(t.y);break;case Ai:t.y=t.y<0?0:1;break;case Yr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ce.DEFAULT_IMAGE=null;Ce.DEFAULT_MAPPING=pl;Ce.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,n=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const l=t.elements,h=l[0],c=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(c-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(h+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(h+1)/2,T=(p+1)/2,E=(f+1)/2,M=(c+d)/4,A=(u+x)/4,D=(g+m)/4;return _>T&&_>E?_<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(_),n=M/i,s=A/i):T>E?T<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(T),i=M/n,s=D/n):E<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(E),i=A/s,n=D/s),this.set(i,n,s,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-c)*(d-c));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-x)/y,this.z=(d-c)/y,this.w=Math.acos((h+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=kt(this.x,t.x,e.x),this.y=kt(this.y,t.y,e.y),this.z=kt(this.z,t.z,e.z),this.w=kt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=kt(this.x,t,e),this.y=kt(this.y,t,e),this.z=kt(this.z,t,e),this.w=kt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(kt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $h extends rn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ei,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new Ce(n);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ei,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Ga(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends $h{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Sl extends Ce{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=je,this.minFilter=je,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zh extends Ce{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=je,this.minFilter=je,this.wrapR=Ai,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class an{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(si.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(si.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=si.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,si):si.fromBufferAttribute(s,a),si.applyMatrix4(t.matrixWorld),this.expandByPoint(si);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ls.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ls.copy(i.boundingBox)),ls.applyMatrix4(t.matrixWorld),this.union(ls)}const n=t.children;for(let s=0,a=n.length;s<a;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,si),si.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(zn),hs.subVectors(this.max,zn),cn.subVectors(t.a,zn),dn.subVectors(t.b,zn),un.subVectors(t.c,zn),Pi.subVectors(dn,cn),Ii.subVectors(un,dn),qi.subVectors(cn,un);let e=[0,-Pi.z,Pi.y,0,-Ii.z,Ii.y,0,-qi.z,qi.y,Pi.z,0,-Pi.x,Ii.z,0,-Ii.x,qi.z,0,-qi.x,-Pi.y,Pi.x,0,-Ii.y,Ii.x,0,-qi.y,qi.x,0];return!or(e,cn,dn,un,hs)||(e=[1,0,0,0,1,0,0,0,1],!or(e,cn,dn,un,hs))?!1:(cs.crossVectors(Pi,Ii),e=[cs.x,cs.y,cs.z],or(e,cn,dn,un,hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,si).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(si).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const vi=[new L,new L,new L,new L,new L,new L,new L,new L],si=new L,ls=new an,cn=new L,dn=new L,un=new L,Pi=new L,Ii=new L,qi=new L,zn=new L,hs=new L,cs=new L,$i=new L;function or(r,t,e,i,n){for(let s=0,a=r.length-3;s<=a;s+=3){$i.fromArray(r,s);const o=n.x*Math.abs($i.x)+n.y*Math.abs($i.y)+n.z*Math.abs($i.z),l=t.dot($i),h=e.dot($i),c=i.dot($i);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const Yh=new an,Gn=new L,lr=new L;class di{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):Yh.setFromPoints(t).getCenter(i);let n=0;for(let s=0,a=t.length;s<a;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Gn.subVectors(t,this.center);const e=Gn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Gn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(lr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Gn.copy(t.center).add(lr)),this.expandByPoint(Gn.copy(t.center).sub(lr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const bi=new L,hr=new L,ds=new L,Li=new L,cr=new L,us=new L,dr=new L;class is{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bi.copy(this.origin).addScaledVector(this.direction,e),bi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){hr.copy(t).add(e).multiplyScalar(.5),ds.copy(e).sub(t).normalize(),Li.copy(this.origin).sub(hr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(ds),o=Li.dot(this.direction),l=-Li.dot(ds),h=Li.lengthSq(),c=Math.abs(1-a*a);let u,d,p,g;if(c>0)if(u=a*l-o,d=a*o-l,g=s*c,u>=0)if(d>=-g)if(d<=g){const x=1/c;u*=x,d*=x,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+h}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+h):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+h):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+h);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(hr).addScaledVector(ds,d),p}intersectSphere(t,e){bi.subVectors(t.center,this.origin);const i=bi.dot(this.direction),n=bi.dot(bi)-i*i,s=t.radius*t.radius;if(n>s)return null;const a=Math.sqrt(s-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,a,o,l;const h=1/this.direction.x,c=1/this.direction.y,u=1/this.direction.z,d=this.origin;return h>=0?(i=(t.min.x-d.x)*h,n=(t.max.x-d.x)*h):(i=(t.max.x-d.x)*h,n=(t.min.x-d.x)*h),c>=0?(s=(t.min.y-d.y)*c,a=(t.max.y-d.y)*c):(s=(t.max.y-d.y)*c,a=(t.min.y-d.y)*c),i>a||s>n||((s>i||isNaN(i))&&(i=s),(a<n||isNaN(n))&&(n=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,bi)!==null}intersectTriangle(t,e,i,n,s){cr.subVectors(e,t),us.subVectors(i,t),dr.crossVectors(cr,us);let a=this.direction.dot(dr),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Li.subVectors(this.origin,t);const l=o*this.direction.dot(us.crossVectors(Li,us));if(l<0)return null;const h=o*this.direction.dot(cr.cross(Li));if(h<0||l+h>a)return null;const c=-o*Li.dot(dr);return c<0?null:this.at(c/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Kt{constructor(t,e,i,n,s,a,o,l,h,c,u,d,p,g,x,m){Kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,l,h,c,u,d,p,g,x,m)}set(t,e,i,n,s,a,o,l,h,c,u,d,p,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=n,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=h,f[6]=c,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Kt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/fn.setFromMatrixColumn(t,0).length(),s=1/fn.setFromMatrixColumn(t,1).length(),a=1/fn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),h=Math.sin(n),c=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*c,p=a*u,g=o*c,x=o*u;e[0]=l*c,e[4]=-l*u,e[8]=h,e[1]=p+g*h,e[5]=d-x*h,e[9]=-o*l,e[2]=x-d*h,e[6]=g+p*h,e[10]=a*l}else if(t.order==="YXZ"){const d=l*c,p=l*u,g=h*c,x=h*u;e[0]=d+x*o,e[4]=g*o-p,e[8]=a*h,e[1]=a*u,e[5]=a*c,e[9]=-o,e[2]=p*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*c,p=l*u,g=h*c,x=h*u;e[0]=d-x*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*c,e[9]=x-d*o,e[2]=-a*h,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*c,p=a*u,g=o*c,x=o*u;e[0]=l*c,e[4]=g*h-p,e[8]=d*h+x,e[1]=l*u,e[5]=x*h+d,e[9]=p*h-g,e[2]=-h,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,p=a*h,g=o*l,x=o*h;e[0]=l*c,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*c,e[9]=-o*c,e[2]=-h*c,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){const d=a*l,p=a*h,g=o*l,x=o*h;e[0]=l*c,e[4]=-u,e[8]=h*c,e[1]=d*u+x,e[5]=a*c,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*c,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(jh,t,Kh)}lookAt(t,e,i){const n=this.elements;return Ve.subVectors(t,e),Ve.lengthSq()===0&&(Ve.z=1),Ve.normalize(),Ui.crossVectors(i,Ve),Ui.lengthSq()===0&&(Math.abs(i.z)===1?Ve.x+=1e-4:Ve.z+=1e-4,Ve.normalize(),Ui.crossVectors(i,Ve)),Ui.normalize(),fs.crossVectors(Ve,Ui),n[0]=Ui.x,n[4]=fs.x,n[8]=Ve.x,n[1]=Ui.y,n[5]=fs.y,n[9]=Ve.y,n[2]=Ui.z,n[6]=fs.z,n[10]=Ve.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],h=i[12],c=i[1],u=i[5],d=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],y=i[3],_=i[7],T=i[11],E=i[15],M=n[0],A=n[4],D=n[8],v=n[12],S=n[1],C=n[5],U=n[9],B=n[13],H=n[2],W=n[6],$=n[10],J=n[14],k=n[3],et=n[7],it=n[11],yt=n[15];return s[0]=a*M+o*S+l*H+h*k,s[4]=a*A+o*C+l*W+h*et,s[8]=a*D+o*U+l*$+h*it,s[12]=a*v+o*B+l*J+h*yt,s[1]=c*M+u*S+d*H+p*k,s[5]=c*A+u*C+d*W+p*et,s[9]=c*D+u*U+d*$+p*it,s[13]=c*v+u*B+d*J+p*yt,s[2]=g*M+x*S+m*H+f*k,s[6]=g*A+x*C+m*W+f*et,s[10]=g*D+x*U+m*$+f*it,s[14]=g*v+x*B+m*J+f*yt,s[3]=y*M+_*S+T*H+E*k,s[7]=y*A+_*C+T*W+E*et,s[11]=y*D+_*U+T*$+E*it,s[15]=y*v+_*B+T*J+E*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],a=t[1],o=t[5],l=t[9],h=t[13],c=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+s*l*u-n*h*u-s*o*d+i*h*d+n*o*p-i*l*p)+x*(+e*l*p-e*h*d+s*a*d-n*a*p+n*h*c-s*l*c)+m*(+e*h*u-e*o*p-s*a*u+i*a*p+s*o*c-i*h*c)+f*(-n*o*c-e*l*u+e*o*d+n*a*u-i*a*d+i*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],h=t[7],c=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],y=u*m*h-x*d*h+x*l*p-o*m*p-u*l*f+o*d*f,_=g*d*h-c*m*h-g*l*p+a*m*p+c*l*f-a*d*f,T=c*x*h-g*u*h+g*o*p-a*x*p-c*o*f+a*u*f,E=g*u*l-c*x*l-g*o*d+a*x*d+c*o*m-a*u*m,M=e*y+i*_+n*T+s*E;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/M;return t[0]=y*A,t[1]=(x*d*s-u*m*s-x*n*p+i*m*p+u*n*f-i*d*f)*A,t[2]=(o*m*s-x*l*s+x*n*h-i*m*h-o*n*f+i*l*f)*A,t[3]=(u*l*s-o*d*s-u*n*h+i*d*h+o*n*p-i*l*p)*A,t[4]=_*A,t[5]=(c*m*s-g*d*s+g*n*p-e*m*p-c*n*f+e*d*f)*A,t[6]=(g*l*s-a*m*s-g*n*h+e*m*h+a*n*f-e*l*f)*A,t[7]=(a*d*s-c*l*s+c*n*h-e*d*h-a*n*p+e*l*p)*A,t[8]=T*A,t[9]=(g*u*s-c*x*s-g*i*p+e*x*p+c*i*f-e*u*f)*A,t[10]=(a*x*s-g*o*s+g*i*h-e*x*h-a*i*f+e*o*f)*A,t[11]=(c*o*s-a*u*s-c*i*h+e*u*h+a*i*p-e*o*p)*A,t[12]=E*A,t[13]=(c*x*n-g*u*n+g*i*d-e*x*d-c*i*m+e*u*m)*A,t[14]=(g*o*n-a*x*n-g*i*l+e*x*l+a*i*m-e*o*m)*A,t[15]=(a*u*n-c*o*n+c*i*l-e*u*l-a*i*d+e*o*d)*A,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,h=s*a,c=s*o;return this.set(h*a+i,h*o-n*l,h*l+n*o,0,h*o+n*l,c*o+i,c*l-n*a,0,h*l-n*o,c*l+n*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,a){return this.set(1,i,s,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,h=s+s,c=a+a,u=o+o,d=s*h,p=s*c,g=s*u,x=a*c,m=a*u,f=o*u,y=l*h,_=l*c,T=l*u,E=i.x,M=i.y,A=i.z;return n[0]=(1-(x+f))*E,n[1]=(p+T)*E,n[2]=(g-_)*E,n[3]=0,n[4]=(p-T)*M,n[5]=(1-(d+f))*M,n[6]=(m+y)*M,n[7]=0,n[8]=(g+_)*A,n[9]=(m-y)*A,n[10]=(1-(d+x))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=fn.set(n[0],n[1],n[2]).length();const a=fn.set(n[4],n[5],n[6]).length(),o=fn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],ri.copy(this);const h=1/s,c=1/a,u=1/o;return ri.elements[0]*=h,ri.elements[1]*=h,ri.elements[2]*=h,ri.elements[4]*=c,ri.elements[5]*=c,ri.elements[6]*=c,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,e.setFromRotationMatrix(ri),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,n,s,a,o=gi,l=!1){const h=this.elements,c=2*s/(e-t),u=2*s/(i-n),d=(e+t)/(e-t),p=(i+n)/(i-n);let g,x;if(l)g=s/(a-s),x=a*s/(a-s);else if(o===gi)g=-(a+s)/(a-s),x=-2*a*s/(a-s);else if(o===Vs)g=-a/(a-s),x=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=c,h[4]=0,h[8]=d,h[12]=0,h[1]=0,h[5]=u,h[9]=p,h[13]=0,h[2]=0,h[6]=0,h[10]=g,h[14]=x,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,n,s,a,o=gi,l=!1){const h=this.elements,c=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),p=-(i+n)/(i-n);let g,x;if(l)g=1/(a-s),x=a/(a-s);else if(o===gi)g=-2/(a-s),x=-(a+s)/(a-s);else if(o===Vs)g=-1/(a-s),x=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=c,h[4]=0,h[8]=0,h[12]=d,h[1]=0,h[5]=u,h[9]=0,h[13]=p,h[2]=0,h[6]=0,h[10]=g,h[14]=x,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const fn=new L,ri=new Kt,jh=new L(0,0,0),Kh=new L(1,1,1),Ui=new L,fs=new L,Ve=new L,oo=new Kt,lo=new nn;class ci{constructor(t=0,e=0,i=0,n=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],a=n[4],o=n[8],l=n[1],h=n[5],c=n[9],u=n[2],d=n[6],p=n[10];switch(e){case"XYZ":this._y=Math.asin(kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(kt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,h)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,h));break;case"YZX":this._z=Math.asin(kt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,p),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return oo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(oo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lo.setFromEuler(this),this.setFromQuaternion(lo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class ka{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Jh=0;const ho=new L,pn=new nn,yi=new Kt,ps=new L,kn=new L,Qh=new L,tc=new nn,co=new L(1,0,0),uo=new L(0,1,0),fo=new L(0,0,1),po={type:"added"},ec={type:"removed"},mn={type:"childadded",child:null},ur={type:"childremoved",child:null};class xe extends rn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new L,e=new ci,i=new nn,n=new L(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Kt},normalMatrix:{value:new Bt}}),this.matrix=new Kt,this.matrixWorld=new Kt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return pn.setFromAxisAngle(t,e),this.quaternion.multiply(pn),this}rotateOnWorldAxis(t,e){return pn.setFromAxisAngle(t,e),this.quaternion.premultiply(pn),this}rotateX(t){return this.rotateOnAxis(co,t)}rotateY(t){return this.rotateOnAxis(uo,t)}rotateZ(t){return this.rotateOnAxis(fo,t)}translateOnAxis(t,e){return ho.copy(t).applyQuaternion(this.quaternion),this.position.add(ho.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(co,t)}translateY(t){return this.translateOnAxis(uo,t)}translateZ(t){return this.translateOnAxis(fo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ps.copy(t):ps.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),kn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(kn,ps,this.up):yi.lookAt(ps,kn,this.up),this.quaternion.setFromRotationMatrix(yi),n&&(yi.extractRotation(n.matrixWorld),pn.setFromRotationMatrix(yi),this.quaternion.premultiply(pn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(po),mn.child=t,this.dispatchEvent(mn),mn.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ec),ur.child=t,this.dispatchEvent(ur),ur.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(yi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(po),mn.child=t,this.dispatchEvent(mn),mn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kn,t,Qh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kn,tc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const u=l[h];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(s(t.materials,this.material[l]));n.material=o}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),h=a(t.textures),c=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),c.length>0&&(i.images=c),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=n,i;function a(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}xe.DEFAULT_UP=new L(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ai=new L,Si=new L,fr=new L,Ti=new L,gn=new L,xn=new L,mo=new L,pr=new L,mr=new L,gr=new L,xr=new ge,_r=new ge,Mr=new ge;class ti{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ai.subVectors(t,e),n.cross(ai);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){ai.subVectors(n,e),Si.subVectors(i,e),fr.subVectors(t,e);const a=ai.dot(ai),o=ai.dot(Si),l=ai.dot(fr),h=Si.dot(Si),c=Si.dot(fr),u=a*h-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(h*l-o*c)*d,g=(a*c-o*l)*d;return s.set(1-p-g,g,p)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Ti)===null?!1:Ti.x>=0&&Ti.y>=0&&Ti.x+Ti.y<=1}static getInterpolation(t,e,i,n,s,a,o,l){return this.getBarycoord(t,e,i,n,Ti)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ti.x),l.addScaledVector(a,Ti.y),l.addScaledVector(o,Ti.z),l)}static getInterpolatedAttribute(t,e,i,n,s,a){return xr.setScalar(0),_r.setScalar(0),Mr.setScalar(0),xr.fromBufferAttribute(t,e),_r.fromBufferAttribute(t,i),Mr.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(xr,s.x),a.addScaledVector(_r,s.y),a.addScaledVector(Mr,s.z),a}static isFrontFacing(t,e,i,n){return ai.subVectors(i,e),Si.subVectors(t,e),ai.cross(Si).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ai.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),ai.cross(Si).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ti.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ti.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return ti.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return ti.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ti.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let a,o;gn.subVectors(n,i),xn.subVectors(s,i),pr.subVectors(t,i);const l=gn.dot(pr),h=xn.dot(pr);if(l<=0&&h<=0)return e.copy(i);mr.subVectors(t,n);const c=gn.dot(mr),u=xn.dot(mr);if(c>=0&&u<=c)return e.copy(n);const d=l*u-c*h;if(d<=0&&l>=0&&c<=0)return a=l/(l-c),e.copy(i).addScaledVector(gn,a);gr.subVectors(t,s);const p=gn.dot(gr),g=xn.dot(gr);if(g>=0&&p<=g)return e.copy(s);const x=p*h-l*g;if(x<=0&&h>=0&&g<=0)return o=h/(h-g),e.copy(i).addScaledVector(xn,o);const m=c*g-p*u;if(m<=0&&u-c>=0&&p-g>=0)return mo.subVectors(s,n),o=(u-c)/(u-c+(p-g)),e.copy(n).addScaledVector(mo,o);const f=1/(m+x+d);return a=x*f,o=d*f,e.copy(i).addScaledVector(gn,a).addScaledVector(xn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Tl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},ms={h:0,s:0,l:0};function vr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class dt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=Zt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Zt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=Zt.workingColorSpace){if(t=kh(t,1),e=kt(e,0,1),i=kt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=vr(a,s,t+1/3),this.g=vr(a,s,t),this.b=vr(a,s,t-1/3)}return Zt.colorSpaceToWorking(this,n),this}setStyle(t,e=Ze){function i(s){s!==void 0&&parseFloat(s)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){const i=Tl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ci(t.r),this.g=Ci(t.g),this.b=Ci(t.b),this}copyLinearToSRGB(t){return this.r=Cn(t.r),this.g=Cn(t.g),this.b=Cn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Zt.workingToColorSpace(Ee.copy(this),t),Math.round(kt(Ee.r*255,0,255))*65536+Math.round(kt(Ee.g*255,0,255))*256+Math.round(kt(Ee.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Zt.workingColorSpace){Zt.workingToColorSpace(Ee.copy(this),e);const i=Ee.r,n=Ee.g,s=Ee.b,a=Math.max(i,n,s),o=Math.min(i,n,s);let l,h;const c=(o+a)/2;if(o===a)l=0,h=0;else{const u=a-o;switch(h=c<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-s)/u+(n<s?6:0);break;case n:l=(s-i)/u+2;break;case s:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=Zt.workingColorSpace){return Zt.workingToColorSpace(Ee.copy(this),e),t.r=Ee.r,t.g=Ee.g,t.b=Ee.b,t}getStyle(t=Ze){Zt.workingToColorSpace(Ee.copy(this),t);const e=Ee.r,i=Ee.g,n=Ee.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Fi),this.setHSL(Fi.h+t,Fi.s+e,Fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fi),t.getHSL(ms);const i=ir(Fi.h,ms.h,e),n=ir(Fi.s,ms.s,e),s=ir(Fi.l,ms.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ee=new dt;dt.NAMES=Tl;let ic=0;class Di extends rn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ic++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=tn,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Br,this.blendDst=Or,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=Dn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=eo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ln,this.stencilZFail=ln,this.stencilZPass=ln,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==tn&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Br&&(i.blendSrc=this.blendSrc),this.blendDst!==Or&&(i.blendDst=this.blendDst),this.blendEquation!==Ji&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Dn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==eo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ln&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ln&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ln&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=n(t.textures),a=n(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Un extends Di{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Da,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new L,gs=new bt;let nc=0;class Ge{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:nc++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ta,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)gs.fromBufferAttribute(this,e),gs.applyMatrix3(t),this.setXY(e,gs.x,gs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=pi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=pi(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=pi(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=pi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=pi(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ta&&(t.usage=this.usage),t}}class wl extends Ge{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class El extends Ge{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ue extends Ge{constructor(t,e,i){super(new Float32Array(t),e,i)}}let sc=0;const Je=new Kt,br=new xe,_n=new L,We=new an,Hn=new an,Te=new L;class Fe extends rn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sc++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yl(t)?El:wl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Bt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,i){return Je.makeTranslation(t,e,i),this.applyMatrix4(Je),this}scale(t,e,i){return Je.makeScale(t,e,i),this.applyMatrix4(Je),this}lookAt(t){return br.lookAt(t),br.updateMatrix(),this.applyMatrix4(br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_n).negate(),this.translate(_n.x,_n.y,_n.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ue(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];We.setFromBufferAttribute(s),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,We.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,We.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(We.min),this.boundingBox.expandByPoint(We.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){const i=this.boundingSphere.center;if(We.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];Hn.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(We.min,Hn.min),We.expandByPoint(Te),Te.addVectors(We.max,Hn.max),We.expandByPoint(Te)):(We.expandByPoint(Hn.min),We.expandByPoint(Hn.max))}We.getCenter(i);let n=0;for(let s=0,a=t.count;s<a;s++)Te.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Te));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Te.fromBufferAttribute(o,h),l&&(_n.fromBufferAttribute(t,h),Te.add(_n)),n=Math.max(n,i.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ge(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let D=0;D<i.count;D++)o[D]=new L,l[D]=new L;const h=new L,c=new L,u=new L,d=new bt,p=new bt,g=new bt,x=new L,m=new L;function f(D,v,S){h.fromBufferAttribute(i,D),c.fromBufferAttribute(i,v),u.fromBufferAttribute(i,S),d.fromBufferAttribute(s,D),p.fromBufferAttribute(s,v),g.fromBufferAttribute(s,S),c.sub(h),u.sub(h),p.sub(d),g.sub(d);const C=1/(p.x*g.y-g.x*p.y);isFinite(C)&&(x.copy(c).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(C),m.copy(u).multiplyScalar(p.x).addScaledVector(c,-g.x).multiplyScalar(C),o[D].add(x),o[v].add(x),o[S].add(x),l[D].add(m),l[v].add(m),l[S].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let D=0,v=y.length;D<v;++D){const S=y[D],C=S.start,U=S.count;for(let B=C,H=C+U;B<H;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const _=new L,T=new L,E=new L,M=new L;function A(D){E.fromBufferAttribute(n,D),M.copy(E);const v=o[D];_.copy(v),_.sub(E.multiplyScalar(E.dot(v))).normalize(),T.crossVectors(M,v);const C=T.dot(l[D])<0?-1:1;a.setXYZW(D,_.x,_.y,_.z,C)}for(let D=0,v=y.length;D<v;++D){const S=y[D],C=S.start,U=S.count;for(let B=C,H=C+U;B<H;B+=3)A(t.getX(B+0)),A(t.getX(B+1)),A(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ge(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const n=new L,s=new L,a=new L,o=new L,l=new L,h=new L,c=new L,u=new L;if(t)for(let d=0,p=t.count;d<p;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);n.fromBufferAttribute(e,g),s.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),c.subVectors(a,s),u.subVectors(n,s),c.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,m),o.add(c),l.add(c),h.add(c),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,p=e.count;d<p;d+=3)n.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),c.subVectors(a,s),u.subVectors(n,s),c.cross(u),i.setXYZ(d+0,c.x,c.y,c.z),i.setXYZ(d+1,c.x,c.y,c.z),i.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,u=o.normalized,d=new h.constructor(l.length*c);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*c;for(let f=0;f<c;f++)d[g++]=h[p++]}return new Ge(d,c,u)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Fe,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],h=t(l,i);e.setAttribute(o,h)}const s=this.morphAttributes;for(const o in s){const l=[],h=s[o];for(let c=0,u=h.length;c<u;c++){const d=h[c],p=t(d,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const h=a[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const h=i[l];t.data.attributes[l]=h.toJSON(t.data)}const n={};let s=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let u=0,d=h.length;u<d;u++){const p=h[u];c.push(p.toJSON(t.data))}c.length>0&&(n[l]=c,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const h in n){const c=n[h];this.setAttribute(h,c.clone(e))}const s=t.morphAttributes;for(const h in s){const c=[],u=s[h];for(let d=0,p=u.length;d<p;d++)c.push(u[d].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let h=0,c=a.length;h<c;h++){const u=a[h];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const go=new Kt,Zi=new is,xs=new di,xo=new L,_s=new L,Ms=new L,vs=new L,yr=new L,bs=new L,_o=new L,ys=new L;class Jt extends xe{constructor(t=new Fe,e=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(s&&o){bs.set(0,0,0);for(let l=0,h=s.length;l<h;l++){const c=o[l],u=s[l];c!==0&&(yr.fromBufferAttribute(u,t),a?bs.addScaledVector(yr,c):bs.addScaledVector(yr.sub(e),c))}e.add(bs)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(s),Zi.copy(t.ray).recast(t.near),!(xs.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(xs,xo)===null||Zi.origin.distanceToSquared(xo)>(t.far-t.near)**2))&&(go.copy(s).invert(),Zi.copy(t.ray).applyMatrix4(go),!(i.boundingBox!==null&&Zi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Zi)))}_computeIntersections(t,e,i){let n;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,h=s.attributes.uv,c=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let T=y,E=_;T<E;T+=3){const M=o.getX(T),A=o.getX(T+1),D=o.getX(T+2);n=Ss(this,f,t,i,h,c,u,M,A,D),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const y=o.getX(m),_=o.getX(m+1),T=o.getX(m+2);n=Ss(this,a,t,i,h,c,u,y,_,T),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){const m=d[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let T=y,E=_;T<E;T+=3){const M=T,A=T+1,D=T+2;n=Ss(this,f,t,i,h,c,u,M,A,D),n&&(n.faceIndex=Math.floor(T/3),n.face.materialIndex=m.materialIndex,e.push(n))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){const y=m,_=m+1,T=m+2;n=Ss(this,a,t,i,h,c,u,y,_,T),n&&(n.faceIndex=Math.floor(m/3),e.push(n))}}}}function rc(r,t,e,i,n,s,a,o){let l;if(t.side===ze?l=i.intersectTriangle(a,s,n,!0,o):l=i.intersectTriangle(n,s,a,t.side===Hi,o),l===null)return null;ys.copy(o),ys.applyMatrix4(r.matrixWorld);const h=e.ray.origin.distanceTo(ys);return h<e.near||h>e.far?null:{distance:h,point:ys.clone(),object:r}}function Ss(r,t,e,i,n,s,a,o,l,h){r.getVertexPosition(o,_s),r.getVertexPosition(l,Ms),r.getVertexPosition(h,vs);const c=rc(r,t,e,i,_s,Ms,vs,_o);if(c){const u=new L;ti.getBarycoord(_o,_s,Ms,vs,u),n&&(c.uv=ti.getInterpolatedAttribute(n,o,l,h,u,new bt)),s&&(c.uv1=ti.getInterpolatedAttribute(s,o,l,h,u,new bt)),a&&(c.normal=ti.getInterpolatedAttribute(a,o,l,h,u,new L),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const d={a:o,b:l,c:h,normal:new L,materialIndex:0};ti.getNormal(_s,Ms,vs,d.normal),c.face=d,c.barycoord=u}return c}class le extends Fe{constructor(t=1,e=1,i=1,n=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:a};const o=this;n=Math.floor(n),s=Math.floor(s),a=Math.floor(a);const l=[],h=[],c=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,i,e,t,a,s,0),g("z","y","x",1,-1,i,e,-t,a,s,1),g("x","z","y",1,1,t,i,e,n,a,2),g("x","z","y",1,-1,t,i,-e,n,a,3),g("x","y","z",1,-1,t,e,i,n,s,4),g("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Ue(h,3)),this.setAttribute("normal",new Ue(c,3)),this.setAttribute("uv",new Ue(u,2));function g(x,m,f,y,_,T,E,M,A,D,v){const S=T/A,C=E/D,U=T/2,B=E/2,H=M/2,W=A+1,$=D+1;let J=0,k=0;const et=new L;for(let it=0;it<$;it++){const yt=it*C-B;for(let Ht=0;Ht<W;Ht++){const qt=Ht*S-U;et[x]=qt*y,et[m]=yt*_,et[f]=H,h.push(et.x,et.y,et.z),et[x]=0,et[m]=0,et[f]=M>0?1:-1,c.push(et.x,et.y,et.z),u.push(Ht/A),u.push(1-it/D),J+=1}}for(let it=0;it<D;it++)for(let yt=0;yt<A;yt++){const Ht=d+yt+W*it,qt=d+yt+W*(it+1),Yt=d+(yt+1)+W*(it+1),Qt=d+(yt+1)+W*it;l.push(Ht,qt,Qt),l.push(qt,Yt,Qt),k+=6}o.addGroup(p,k,v),p+=k,d+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Fn(r){const t={};for(const e in r){t[e]={};for(const i in r[e]){const n=r[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Ie(r){const t={};for(let e=0;e<r.length;e++){const i=Fn(r[e]);for(const n in i)t[n]=i[n]}return t}function ac(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Al(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const oc={clone:Fn,merge:Ie};var lc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends Di{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lc,this.fragmentShader=hc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Fn(t.uniforms),this.uniformsGroups=ac(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Rl extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Kt,this.projectionMatrix=new Kt,this.projectionMatrixInverse=new Kt,this.coordinateSystem=gi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ni=new L,Mo=new bt,vo=new bt;class oi extends Rl{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=wa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wa*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-t/Ni.z)}getViewSize(t,e){return this.getViewBounds(t,Mo,vo),e.subVectors(vo,Mo)}setViewOffset(t,e,i,n,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,h=a.fullHeight;s+=a.offsetX*n/l,e-=a.offsetY*i/h,n*=a.width/l,i*=a.height/h}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Mn=-90,vn=1;class cc extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new oi(Mn,vn,t,e);n.layers=this.layers,this.add(n);const s=new oi(Mn,vn,t,e);s.layers=this.layers,this.add(s);const a=new oi(Mn,vn,t,e);a.layers=this.layers,this.add(a);const o=new oi(Mn,vn,t,e);o.layers=this.layers,this.add(o);const l=new oi(Mn,vn,t,e);l.layers=this.layers,this.add(l);const h=new oi(Mn,vn,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,a,o,l]=e;for(const h of e)this.remove(h);if(t===gi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Vs)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,h,c]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,h),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),t.render(e,c),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Cl extends Ce{constructor(t=[],e=Pn,i,n,s,a,o,l,h,c){super(t,e,i,n,s,a,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class dc extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Cl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new le(5,5,5),s=new _i({name:"CubemapFromEquirect",uniforms:Fn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ze,blending:Ri});s.uniforms.tEquirect.value=e;const a=new Jt(n,s),o=e.minFilter;return e.minFilter===Oi&&(e.minFilter=ei),new cc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(s)}}class ii extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uc={type:"move"};class Sr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,a=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){a=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,i),f=this._getHandJoint(h,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const c=h.joints["index-finger-tip"],u=h.joints["thumb-tip"],d=c.position.distanceTo(u.position),p=.02,g=.005;h.inputState.pinching&&d>p+g?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=p-g&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(uc)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),h!==null&&(h.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ii;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class fc extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class pc{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ta,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,s=this.stride;n<s;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pe=new L;class qs{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyMatrix4(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.applyNormalMatrix(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Pe.fromBufferAttribute(this,e),Pe.transformDirection(t),this.setXYZ(e,Pe.x,Pe.y,Pe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=pi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=pi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=pi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=pi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=pi(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Xs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return new Ge(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new qs(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Xs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Dl extends Di{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let bn;const Vn=new L,yn=new L,Sn=new L,Tn=new bt,Wn=new bt,Pl=new Kt,Ts=new L,Xn=new L,ws=new L,bo=new bt,Tr=new bt,yo=new bt;class mc extends xe{constructor(t=new Dl){if(super(),this.isSprite=!0,this.type="Sprite",bn===void 0){bn=new Fe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new pc(e,5);bn.setIndex([0,1,2,0,2,3]),bn.setAttribute("position",new qs(i,3,0,!1)),bn.setAttribute("uv",new qs(i,2,3,!1))}this.geometry=bn,this.material=t,this.center=new bt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),yn.setFromMatrixScale(this.matrixWorld),Pl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Sn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&yn.multiplyScalar(-Sn.z);const i=this.material.rotation;let n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));const a=this.center;Es(Ts.set(-.5,-.5,0),Sn,a,yn,n,s),Es(Xn.set(.5,-.5,0),Sn,a,yn,n,s),Es(ws.set(.5,.5,0),Sn,a,yn,n,s),bo.set(0,0),Tr.set(1,0),yo.set(1,1);let o=t.ray.intersectTriangle(Ts,Xn,ws,!1,Vn);if(o===null&&(Es(Xn.set(-.5,.5,0),Sn,a,yn,n,s),Tr.set(0,1),o=t.ray.intersectTriangle(Ts,ws,Xn,!1,Vn),o===null))return;const l=t.ray.origin.distanceTo(Vn);l<t.near||l>t.far||e.push({distance:l,point:Vn.clone(),uv:ti.getInterpolation(Vn,Ts,Xn,ws,bo,Tr,yo,new bt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Es(r,t,e,i,n,s){Tn.subVectors(r,e).addScalar(.5).multiply(i),n!==void 0?(Wn.x=s*Tn.x-n*Tn.y,Wn.y=n*Tn.x+s*Tn.y):Wn.copy(Tn),r.copy(t),r.x+=Wn.x,r.y+=Wn.y,r.applyMatrix4(Pl)}class Il extends Ce{constructor(t=null,e=1,i=1,n,s,a,o,l,h=je,c=je,u,d){super(null,a,o,l,h,c,n,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class So extends Ge{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const wn=new Kt,To=new Kt,As=[],wo=new an,gc=new Kt,qn=new Jt,$n=new di;class $e extends Jt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new So(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,gc)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new an),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,wn),wo.copy(t.boundingBox).applyMatrix4(wn),this.boundingBox.union(wo)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new di),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,wn),$n.copy(t.boundingSphere).applyMatrix4(wn),this.boundingSphere.union($n)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,a=t*s+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(qn.geometry=this.geometry,qn.material=this.material,qn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$n.copy(this.boundingSphere),$n.applyMatrix4(i),t.ray.intersectsSphere($n)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,wn),To.multiplyMatrices(i,wn),qn.matrixWorld=To,qn.raycast(t,As);for(let a=0,o=As.length;a<o;a++){const l=As[a];l.instanceId=s,l.object=this,e.push(l)}As.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new So(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Il(new Float32Array(n*this.count),n,this.count,Ua,mi));const s=this.morphTexture.source.data.data;let a=0;for(let h=0;h<i.length;h++)a+=i[h];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const wr=new L,xc=new L,_c=new Bt;class Qe{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=wr.subVectors(i,e).cross(xc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(wr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||_c.getNormalMatrix(t),n=this.coplanarPoint(wr).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Yi=new di,Mc=new bt(.5,.5),Rs=new L;class ns{constructor(t=new Qe,e=new Qe,i=new Qe,n=new Qe,s=new Qe,a=new Qe){this.planes=[t,e,i,n,s,a]}set(t,e,i,n,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=gi,i=!1){const n=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],h=s[3],c=s[4],u=s[5],d=s[6],p=s[7],g=s[8],x=s[9],m=s[10],f=s[11],y=s[12],_=s[13],T=s[14],E=s[15];if(n[0].setComponents(h-a,p-c,f-g,E-y).normalize(),n[1].setComponents(h+a,p+c,f+g,E+y).normalize(),n[2].setComponents(h+o,p+u,f+x,E+_).normalize(),n[3].setComponents(h-o,p-u,f-x,E-_).normalize(),i)n[4].setComponents(l,d,m,T).normalize(),n[5].setComponents(h-l,p-d,f-m,E-T).normalize();else if(n[4].setComponents(h-l,p-d,f-m,E-T).normalize(),e===gi)n[5].setComponents(h+l,p+d,f+m,E+T).normalize();else if(e===Vs)n[5].setComponents(l,d,m,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Yi)}intersectsSprite(t){Yi.center.set(0,0,0);const e=Mc.distanceTo(t.center);return Yi.radius=.7071067811865476+e,Yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Yi)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Rs.x=n.normal.x>0?t.max.x:t.min.x,Rs.y=n.normal.y>0?t.max.y:t.min.y,Rs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Rs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ll extends Di{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const $s=new L,Zs=new L,Eo=new Kt,Zn=new is,Cs=new di,Er=new L,Ao=new L;class vc extends xe{constructor(t=new Fe,e=new Ll){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,s=e.count;n<s;n++)$s.fromBufferAttribute(e,n-1),Zs.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=$s.distanceTo(Zs);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(n),Cs.radius+=s,t.ray.intersectsSphere(Cs)===!1)return;Eo.copy(n).invert(),Zn.copy(t.ray).applyMatrix4(Eo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=this.isLineSegments?2:1,c=i.index,d=i.attributes.position;if(c!==null){const p=Math.max(0,a.start),g=Math.min(c.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=h){const f=c.getX(x),y=c.getX(x+1),_=Ds(this,t,Zn,l,f,y,x);_&&e.push(_)}if(this.isLineLoop){const x=c.getX(g-1),m=c.getX(p),f=Ds(this,t,Zn,l,x,m,g-1);f&&e.push(f)}}else{const p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let x=p,m=g-1;x<m;x+=h){const f=Ds(this,t,Zn,l,x,x+1,x);f&&e.push(f)}if(this.isLineLoop){const x=Ds(this,t,Zn,l,g-1,p,g-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ds(r,t,e,i,n,s,a){const o=r.geometry.attributes.position;if($s.fromBufferAttribute(o,n),Zs.fromBufferAttribute(o,s),e.distanceSqToSegment($s,Zs,Er,Ao)>i)return;Er.applyMatrix4(r.matrixWorld);const h=t.ray.origin.distanceTo(Er);if(!(h<t.near||h>t.far))return{distance:h,point:Ao.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Ro=new L,Co=new L;class bc extends vc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,s=e.count;n<s;n+=2)Ro.fromBufferAttribute(e,n),Co.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Ro.distanceTo(Co);t.setAttribute("lineDistance",new Ue(i,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ul extends Di{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new dt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Do=new Kt,Ea=new is,Ps=new di,Is=new L;class yc extends xe{constructor(t=new Fe,e=new Ul){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ps.copy(i.boundingSphere),Ps.applyMatrix4(n),Ps.radius+=s,t.ray.intersectsSphere(Ps)===!1)return;Do.copy(n).invert(),Ea.copy(t.ray).applyMatrix4(Do);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=i.index,u=i.attributes.position;if(h!==null){const d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,x=p;g<x;g++){const m=h.getX(g);Is.fromBufferAttribute(u,m),Po(Is,m,l,n,t,e,this)}}else{const d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,x=p;g<x;g++)Is.fromBufferAttribute(u,g),Po(Is,g,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Po(r,t,e,i,n,s,a){const o=Ea.distanceSqToPoint(r);if(o<e){const l=new L;Ea.closestPointToPoint(r,l),l.applyMatrix4(i);const h=n.ray.origin.distanceTo(l);if(h<n.near||h>n.far)return;s.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Re extends Ce{constructor(t,e,i,n,s,a,o,l,h){super(t,e,i,n,s,a,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fl extends Ce{constructor(t,e,i=en,n,s,a,o=je,l=je,h,c=Qn,u=1){if(c!==Qn&&c!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,n,s,a,o,l,c,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ga(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Nl extends Ce{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Mi extends Fe{constructor(t=1,e=1,i=1,n=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const h=this;n=Math.floor(n),s=Math.floor(s);const c=[],u=[],d=[],p=[];let g=0;const x=[],m=i/2;let f=0;y(),a===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(c),this.setAttribute("position",new Ue(u,3)),this.setAttribute("normal",new Ue(d,3)),this.setAttribute("uv",new Ue(p,2));function y(){const T=new L,E=new L;let M=0;const A=(e-t)/i;for(let D=0;D<=s;D++){const v=[],S=D/s,C=S*(e-t)+t;for(let U=0;U<=n;U++){const B=U/n,H=B*l+o,W=Math.sin(H),$=Math.cos(H);E.x=C*W,E.y=-S*i+m,E.z=C*$,u.push(E.x,E.y,E.z),T.set(W,A,$).normalize(),d.push(T.x,T.y,T.z),p.push(B,1-S),v.push(g++)}x.push(v)}for(let D=0;D<n;D++)for(let v=0;v<s;v++){const S=x[v][D],C=x[v+1][D],U=x[v+1][D+1],B=x[v][D+1];(t>0||v!==0)&&(c.push(S,C,B),M+=3),(e>0||v!==s-1)&&(c.push(C,U,B),M+=3)}h.addGroup(f,M,0),f+=M}function _(T){const E=g,M=new bt,A=new L;let D=0;const v=T===!0?t:e,S=T===!0?1:-1;for(let U=1;U<=n;U++)u.push(0,m*S,0),d.push(0,S,0),p.push(.5,.5),g++;const C=g;for(let U=0;U<=n;U++){const H=U/n*l+o,W=Math.cos(H),$=Math.sin(H);A.x=v*$,A.y=m*S,A.z=v*W,u.push(A.x,A.y,A.z),d.push(0,S,0),M.x=W*.5+.5,M.y=$*.5*S+.5,p.push(M.x,M.y),g++}for(let U=0;U<n;U++){const B=E+U,H=C+U;T===!0?c.push(H,H+1,B):c.push(H+1,H,B),D+=3}h.addGroup(f,D,T===!0?1:2),f+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hi extends Mi{constructor(t=1,e=1,i=32,n=1,s=!1,a=0,o=Math.PI*2){super(0,t,e,i,n,s,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(t){return new hi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Vi extends Fe{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),h=o+1,c=l+1,u=t/o,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<c;f++){const y=f*d-a;for(let _=0;_<h;_++){const T=_*u-s;g.push(T,-y,0),x.push(0,0,1),m.push(_/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let y=0;y<o;y++){const _=y+h*f,T=y+h*(f+1),E=y+1+h*(f+1),M=y+1+h*f;p.push(_,T,M),p.push(T,E,M)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.width,t.height,t.widthSegments,t.heightSegments)}}class ss extends Fe{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let h=0;const c=[],u=new L,d=new L,p=[],g=[],x=[],m=[];for(let f=0;f<=i;f++){const y=[],_=f/i;let T=0;f===0&&a===0?T=.5/e:f===i&&l===Math.PI&&(T=-.5/e);for(let E=0;E<=e;E++){const M=E/e;u.x=-t*Math.cos(n+M*s)*Math.sin(a+_*o),u.y=t*Math.cos(a+_*o),u.z=t*Math.sin(n+M*s)*Math.sin(a+_*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(M+T,1-_),y.push(h++)}c.push(y)}for(let f=0;f<i;f++)for(let y=0;y<e;y++){const _=c[f][y+1],T=c[f][y],E=c[f+1][y],M=c[f+1][y+1];(f!==0||a>0)&&p.push(_,T,M),(f!==i-1||l<Math.PI)&&p.push(T,E,M)}this.setIndex(p),this.setAttribute("position",new Ue(g,3)),this.setAttribute("normal",new Ue(x,3)),this.setAttribute("uv",new Ue(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Xe extends Di{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class jt extends Di{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=za,this.normalScale=new bt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Da,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sc extends Di{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ch,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Tc extends Di{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Bl extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Ar=new Kt,Io=new L,Lo=new L;class wc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new bt(512,512),this.mapType=xi,this.map=null,this.mapPass=null,this.matrix=new Kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ns,this._frameExtents=new bt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Io.setFromMatrixPosition(t.matrixWorld),e.position.copy(Io),Lo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lo),e.updateMatrixWorld(),Ar.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ar,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ar)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Ha extends Rl{constructor(t=-1,e=1,i=1,n=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,a=s+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Ec extends wc{constructor(){super(new Ha(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ac extends Bl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new Ec}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Rc extends Bl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Cc extends oi{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Uo=new Kt;class Dc{constructor(t,e,i=0,n=1/0){this.ray=new is(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new ka,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Uo.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Uo),this}intersectObject(t,e=!0,i=[]){return Aa(t,this,i,e),i.sort(Fo),i}intersectObjects(t,e=!0,i=[]){for(let n=0,s=t.length;n<s;n++)Aa(t[n],this,i,e);return i.sort(Fo),i}}function Fo(r,t){return r.distance-t.distance}function Aa(r,t,e,i){let n=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)Aa(s[a],t,e,!0)}}class No{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=kt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(kt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Pc extends rn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function Bo(r,t,e,i){const n=Ic(i);switch(e){case Ml:return r*t;case Ua:return r*t/n.components*n.byteLength;case Fa:return r*t/n.components*n.byteLength;case Na:return r*t*2/n.components*n.byteLength;case Ba:return r*t*2/n.components*n.byteLength;case vl:return r*t*3/n.components*n.byteLength;case li:return r*t*4/n.components*n.byteLength;case Oa:return r*t*4/n.components*n.byteLength;case Ns:case Bs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Os:case zs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Kr:case Qr:return Math.max(r,16)*Math.max(t,8)/4;case jr:case Jr:return Math.max(r,8)*Math.max(t,8)/2;case ta:case ea:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case ia:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case na:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case sa:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ra:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case aa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case oa:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case la:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case ha:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case ca:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case da:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ua:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case fa:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case pa:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case ma:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ga:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case xa:case _a:case Ma:return Math.ceil(r/4)*Math.ceil(t/4)*16;case va:case ba:return Math.ceil(r/4)*Math.ceil(t/4)*8;case ya:case Sa:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Ic(r){switch(r){case xi:case ml:return{byteLength:1,components:1};case Kn:case gl:case Nn:return{byteLength:2,components:1};case Ia:case La:return{byteLength:2,components:4};case en:case Pa:case mi:return{byteLength:4,components:1};case xl:case _l:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);function Ol(){let r=null,t=!1,e=null,i=null;function n(s,a){e(s,a),i=r.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=r.requestAnimationFrame(n),t=!0)},stop:function(){r.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Lc(r){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,u=h.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,h,c),o.onUploadCallback();let p;if(h instanceof Float32Array)p=r.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)p=r.HALF_FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(h instanceof Int16Array)p=r.SHORT;else if(h instanceof Uint32Array)p=r.UNSIGNED_INT;else if(h instanceof Int32Array)p=r.INT;else if(h instanceof Int8Array)p=r.BYTE;else if(h instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:p,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,h){const c=l.array,u=l.updateRanges;if(r.bindBuffer(h,o),u.length===0)r.bufferSubData(h,0,c);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){const g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){const x=u[p];r.bufferSubData(h,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,l),h.version=o.version}}return{get:n,remove:s,update:a}}var Uc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fc=`#ifdef USE_ALPHAHASH
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
#endif`,Nc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Oc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gc=`#ifdef USE_AOMAP
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
#endif`,kc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hc=`#ifdef USE_BATCHING
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
#endif`,Vc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Wc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$c=`#ifdef USE_IRIDESCENCE
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
#endif`,Zc=`#ifdef USE_BUMPMAP
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
#endif`,Yc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,td=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
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
#endif`,nd=`#define PI 3.141592653589793
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
} // validated`,sd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rd=`vec3 transformedNormal = objectNormal;
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
#endif`,ad=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,od=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,cd="gl_FragColor = linearToOutputTexel( gl_FragColor );",dd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ud=`#ifdef USE_ENVMAP
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
#endif`,fd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pd=`#ifdef USE_ENVMAP
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
#endif`,md=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
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
#endif`,xd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_d=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Md=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,vd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bd=`#ifdef USE_GRADIENTMAP
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
}`,yd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,wd=`uniform bool receiveShadow;
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
#endif`,Ed=`#ifdef USE_ENVMAP
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
#endif`,Ad=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Pd=`PhysicalMaterial material;
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
#endif`,Id=`uniform sampler2D dfgLUT;
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
}`,Ld=`
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
#endif`,Ud=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Od=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Hd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Vd=`#if defined( USE_POINTS_UV )
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
#endif`,Wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,qd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$d=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yd=`#ifdef USE_MORPHTARGETS
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
#endif`,jd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Kd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,iu=`#ifdef USE_NORMALMAP
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
#endif`,nu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,su=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ru=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,au=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ou=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,du=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,uu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,_u=`float getShadowMask() {
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
}`,Mu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,vu=`#ifdef USE_SKINNING
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
#endif`,bu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,yu=`#ifdef USE_SKINNING
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
#endif`,Su=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Eu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Au=`#ifdef USE_TRANSMISSION
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
#endif`,Ru=`#ifdef USE_TRANSMISSION
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
#endif`,Cu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Du=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Iu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Lu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Uu=`uniform sampler2D t2D;
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
}`,Fu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Nu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ou=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zu=`#include <common>
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
}`,Gu=`#if DEPTH_PACKING == 3200
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
}`,ku=`#define DISTANCE
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
}`,Hu=`#define DISTANCE
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
}`,Vu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wu=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xu=`uniform float scale;
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
}`,qu=`uniform vec3 diffuse;
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
}`,$u=`#include <common>
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
}`,Zu=`uniform vec3 diffuse;
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
}`,Yu=`#define LAMBERT
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
}`,ju=`#define LAMBERT
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
}`,Ku=`#define MATCAP
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
}`,Ju=`#define MATCAP
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
}`,Qu=`#define NORMAL
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
}`,tf=`#define NORMAL
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
}`,ef=`#define PHONG
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
}`,nf=`#define PHONG
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
}`,sf=`#define STANDARD
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
}`,rf=`#define STANDARD
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
}`,af=`#define TOON
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
}`,of=`#define TOON
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
}`,lf=`uniform float size;
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
}`,hf=`uniform vec3 diffuse;
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
}`,cf=`#include <common>
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
}`,df=`uniform vec3 color;
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
}`,uf=`uniform float rotation;
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
}`,ff=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:Uc,alphahash_pars_fragment:Fc,alphamap_fragment:Nc,alphamap_pars_fragment:Bc,alphatest_fragment:Oc,alphatest_pars_fragment:zc,aomap_fragment:Gc,aomap_pars_fragment:kc,batching_pars_vertex:Hc,batching_vertex:Vc,begin_vertex:Wc,beginnormal_vertex:Xc,bsdfs:qc,iridescence_fragment:$c,bumpmap_pars_fragment:Zc,clipping_planes_fragment:Yc,clipping_planes_pars_fragment:jc,clipping_planes_pars_vertex:Kc,clipping_planes_vertex:Jc,color_fragment:Qc,color_pars_fragment:td,color_pars_vertex:ed,color_vertex:id,common:nd,cube_uv_reflection_fragment:sd,defaultnormal_vertex:rd,displacementmap_pars_vertex:ad,displacementmap_vertex:od,emissivemap_fragment:ld,emissivemap_pars_fragment:hd,colorspace_fragment:cd,colorspace_pars_fragment:dd,envmap_fragment:ud,envmap_common_pars_fragment:fd,envmap_pars_fragment:pd,envmap_pars_vertex:md,envmap_physical_pars_fragment:Ed,envmap_vertex:gd,fog_vertex:xd,fog_pars_vertex:_d,fog_fragment:Md,fog_pars_fragment:vd,gradientmap_pars_fragment:bd,lightmap_pars_fragment:yd,lights_lambert_fragment:Sd,lights_lambert_pars_fragment:Td,lights_pars_begin:wd,lights_toon_fragment:Ad,lights_toon_pars_fragment:Rd,lights_phong_fragment:Cd,lights_phong_pars_fragment:Dd,lights_physical_fragment:Pd,lights_physical_pars_fragment:Id,lights_fragment_begin:Ld,lights_fragment_maps:Ud,lights_fragment_end:Fd,logdepthbuf_fragment:Nd,logdepthbuf_pars_fragment:Bd,logdepthbuf_pars_vertex:Od,logdepthbuf_vertex:zd,map_fragment:Gd,map_pars_fragment:kd,map_particle_fragment:Hd,map_particle_pars_fragment:Vd,metalnessmap_fragment:Wd,metalnessmap_pars_fragment:Xd,morphinstance_vertex:qd,morphcolor_vertex:$d,morphnormal_vertex:Zd,morphtarget_pars_vertex:Yd,morphtarget_vertex:jd,normal_fragment_begin:Kd,normal_fragment_maps:Jd,normal_pars_fragment:Qd,normal_pars_vertex:tu,normal_vertex:eu,normalmap_pars_fragment:iu,clearcoat_normal_fragment_begin:nu,clearcoat_normal_fragment_maps:su,clearcoat_pars_fragment:ru,iridescence_pars_fragment:au,opaque_fragment:ou,packing:lu,premultiplied_alpha_fragment:hu,project_vertex:cu,dithering_fragment:du,dithering_pars_fragment:uu,roughnessmap_fragment:fu,roughnessmap_pars_fragment:pu,shadowmap_pars_fragment:mu,shadowmap_pars_vertex:gu,shadowmap_vertex:xu,shadowmask_pars_fragment:_u,skinbase_vertex:Mu,skinning_pars_vertex:vu,skinning_vertex:bu,skinnormal_vertex:yu,specularmap_fragment:Su,specularmap_pars_fragment:Tu,tonemapping_fragment:wu,tonemapping_pars_fragment:Eu,transmission_fragment:Au,transmission_pars_fragment:Ru,uv_pars_fragment:Cu,uv_pars_vertex:Du,uv_vertex:Pu,worldpos_vertex:Iu,background_vert:Lu,background_frag:Uu,backgroundCube_vert:Fu,backgroundCube_frag:Nu,cube_vert:Bu,cube_frag:Ou,depth_vert:zu,depth_frag:Gu,distanceRGBA_vert:ku,distanceRGBA_frag:Hu,equirect_vert:Vu,equirect_frag:Wu,linedashed_vert:Xu,linedashed_frag:qu,meshbasic_vert:$u,meshbasic_frag:Zu,meshlambert_vert:Yu,meshlambert_frag:ju,meshmatcap_vert:Ku,meshmatcap_frag:Ju,meshnormal_vert:Qu,meshnormal_frag:tf,meshphong_vert:ef,meshphong_frag:nf,meshphysical_vert:sf,meshphysical_frag:rf,meshtoon_vert:af,meshtoon_frag:of,points_vert:lf,points_frag:hf,shadow_vert:cf,shadow_frag:df,sprite_vert:uf,sprite_frag:ff},at={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new bt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new bt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},fi={basic:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new dt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Ie([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Ie([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Ie([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new dt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Ie([at.points,at.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Ie([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Ie([at.common,at.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Ie([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Ie([at.sprite,at.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Ie([at.common,at.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Ie([at.lights,at.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};fi.physical={uniforms:Ie([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new bt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new bt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new bt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Ls={r:0,b:0,g:0},ji=new ci,pf=new Kt;function mf(r,t,e,i,n,s,a){const o=new dt(0);let l=s===!0?0:1,h,c,u=null,d=0,p=null;function g(_){let T=_.isScene===!0?_.background:null;return T&&T.isTexture&&(T=(_.backgroundBlurriness>0?e:t).get(T)),T}function x(_){let T=!1;const E=g(_);E===null?f(o,l):E&&E.isColor&&(f(E,1),T=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(r.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(_,T){const E=g(T);E&&(E.isCubeTexture||E.mapping===Ys)?(c===void 0&&(c=new Jt(new le(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:Fn(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,A,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),ji.copy(T.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),c.material.uniforms.envMap.value=E,c.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(pf.makeRotationFromEuler(ji)),c.material.toneMapped=Zt.getTransfer(E.colorSpace)!==ie,(u!==E||d!==E.version||p!==r.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,p=r.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):E&&E.isTexture&&(h===void 0&&(h=new Jt(new Vi(2,2),new _i({name:"BackgroundMaterial",uniforms:Fn(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=E,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.toneMapped=Zt.getTransfer(E.colorSpace)!==ie,E.matrixAutoUpdate===!0&&E.updateMatrix(),h.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||p!==r.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,p=r.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function f(_,T){_.getRGB(Ls,Al(r)),i.buffers.color.setClear(Ls.r,Ls.g,Ls.b,T,a)}function y(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,T=1){o.set(_),l=T,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,f(o,l)},render:x,addToRenderList:m,dispose:y}}function gf(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=d(null);let s=n,a=!1;function o(S,C,U,B,H){let W=!1;const $=u(B,U,C);s!==$&&(s=$,h(s.object)),W=p(S,B,U,H),W&&g(S,B,U,H),H!==null&&t.update(H,r.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,T(S,C,U,B),H!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return r.createVertexArray()}function h(S){return r.bindVertexArray(S)}function c(S){return r.deleteVertexArray(S)}function u(S,C,U){const B=U.wireframe===!0;let H=i[S.id];H===void 0&&(H={},i[S.id]=H);let W=H[C.id];W===void 0&&(W={},H[C.id]=W);let $=W[B];return $===void 0&&($=d(l()),W[B]=$),$}function d(S){const C=[],U=[],B=[];for(let H=0;H<e;H++)C[H]=0,U[H]=0,B[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:B,object:S,attributes:{},index:null}}function p(S,C,U,B){const H=s.attributes,W=C.attributes;let $=0;const J=U.getAttributes();for(const k in J)if(J[k].location>=0){const it=H[k];let yt=W[k];if(yt===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(yt=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(yt=S.instanceColor)),it===void 0||it.attribute!==yt||yt&&it.data!==yt.data)return!0;$++}return s.attributesNum!==$||s.index!==B}function g(S,C,U,B){const H={},W=C.attributes;let $=0;const J=U.getAttributes();for(const k in J)if(J[k].location>=0){let it=W[k];it===void 0&&(k==="instanceMatrix"&&S.instanceMatrix&&(it=S.instanceMatrix),k==="instanceColor"&&S.instanceColor&&(it=S.instanceColor));const yt={};yt.attribute=it,it&&it.data&&(yt.data=it.data),H[k]=yt,$++}s.attributes=H,s.attributesNum=$,s.index=B}function x(){const S=s.newAttributes;for(let C=0,U=S.length;C<U;C++)S[C]=0}function m(S){f(S,0)}function f(S,C){const U=s.newAttributes,B=s.enabledAttributes,H=s.attributeDivisors;U[S]=1,B[S]===0&&(r.enableVertexAttribArray(S),B[S]=1),H[S]!==C&&(r.vertexAttribDivisor(S,C),H[S]=C)}function y(){const S=s.newAttributes,C=s.enabledAttributes;for(let U=0,B=C.length;U<B;U++)C[U]!==S[U]&&(r.disableVertexAttribArray(U),C[U]=0)}function _(S,C,U,B,H,W,$){$===!0?r.vertexAttribIPointer(S,C,U,H,W):r.vertexAttribPointer(S,C,U,B,H,W)}function T(S,C,U,B){x();const H=B.attributes,W=U.getAttributes(),$=C.defaultAttributeValues;for(const J in W){const k=W[J];if(k.location>=0){let et=H[J];if(et===void 0&&(J==="instanceMatrix"&&S.instanceMatrix&&(et=S.instanceMatrix),J==="instanceColor"&&S.instanceColor&&(et=S.instanceColor)),et!==void 0){const it=et.normalized,yt=et.itemSize,Ht=t.get(et);if(Ht===void 0)continue;const qt=Ht.buffer,Yt=Ht.type,Qt=Ht.bytesPerElement,X=Yt===r.INT||Yt===r.UNSIGNED_INT||et.gpuType===Pa;if(et.isInterleavedBufferAttribute){const Z=et.data,ht=Z.stride,wt=et.offset;if(Z.isInstancedInterleavedBuffer){for(let Mt=0;Mt<k.locationSize;Mt++)f(k.location+Mt,Z.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let Mt=0;Mt<k.locationSize;Mt++)m(k.location+Mt);r.bindBuffer(r.ARRAY_BUFFER,qt);for(let Mt=0;Mt<k.locationSize;Mt++)_(k.location+Mt,yt/k.locationSize,Yt,it,ht*Qt,(wt+yt/k.locationSize*Mt)*Qt,X)}else{if(et.isInstancedBufferAttribute){for(let Z=0;Z<k.locationSize;Z++)f(k.location+Z,et.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let Z=0;Z<k.locationSize;Z++)m(k.location+Z);r.bindBuffer(r.ARRAY_BUFFER,qt);for(let Z=0;Z<k.locationSize;Z++)_(k.location+Z,yt/k.locationSize,Yt,it,yt*Qt,yt/k.locationSize*Z*Qt,X)}}else if($!==void 0){const it=$[J];if(it!==void 0)switch(it.length){case 2:r.vertexAttrib2fv(k.location,it);break;case 3:r.vertexAttrib3fv(k.location,it);break;case 4:r.vertexAttrib4fv(k.location,it);break;default:r.vertexAttrib1fv(k.location,it)}}}}y()}function E(){D();for(const S in i){const C=i[S];for(const U in C){const B=C[U];for(const H in B)c(B[H].object),delete B[H];delete C[U]}delete i[S]}}function M(S){if(i[S.id]===void 0)return;const C=i[S.id];for(const U in C){const B=C[U];for(const H in B)c(B[H].object),delete B[H];delete C[U]}delete i[S.id]}function A(S){for(const C in i){const U=i[C];if(U[S.id]===void 0)continue;const B=U[S.id];for(const H in B)c(B[H].object),delete B[H];delete U[S.id]}}function D(){v(),a=!0,s!==n&&(s=n,h(s.object))}function v(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:D,resetDefaultState:v,dispose:E,releaseStatesOfGeometry:M,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function xf(r,t,e){let i;function n(h){i=h}function s(h,c){r.drawArrays(i,h,c),e.update(c,i,1)}function a(h,c,u){u!==0&&(r.drawArraysInstanced(i,h,c,u),e.update(c,i,u))}function o(h,c,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,u);let p=0;for(let g=0;g<u;g++)p+=c[g];e.update(p,i,1)}function l(h,c,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<h.length;g++)a(h[g],c[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(i,h,0,c,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=c[x]*d[x];e.update(g,i,1)}}this.setMode=n,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function _f(r,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(A){return!(A!==li&&i.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const D=A===Nn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==xi&&i.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==mi&&!D)}function l(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(Lt("WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),f=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),_=r.getParameter(r.MAX_VARYING_VECTORS),T=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,M=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:_,maxFragmentUniforms:T,vertexTextures:E,maxSamples:M}}function Mf(r){const t=this;let e=null,i=0,n=!1,s=!1;const a=new Qe,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||n;return n=d,i=u.length,p},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=c(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=r.get(u);if(!n||g===null||g.length===0||s&&!m)s?c(null):h();else{const y=s?0:i,_=y*4;let T=f.clippingState||null;l.value=T,T=c(g,d,_,p);for(let E=0;E!==_;++E)T[E]=e[E];f.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(u,d,p,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=p+x*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,T=p;_!==x;++_,T+=4)a.copy(u[_]).applyMatrix4(y,o),a.normal.toArray(m,T),m[T+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function vf(r){let t=new WeakMap;function e(a,o){return o===qr?a.mapping=Pn:o===$r&&(a.mapping=In),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===qr||o===$r)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const h=new dc(l.height);return h.fromEquirectangularTexture(r,a),t.set(a,h),a.addEventListener("dispose",n),e(h.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const zi=4,Oo=[.125,.215,.35,.446,.526,.582],Qi=20,bf=256,Yn=new Ha,zo=new dt;let Rr=null,Cr=0,Dr=0,Pr=!1;const yf=new L;class Go{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,s={}){const{size:a=256,position:o=yf}=s;Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ho(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Rr,Cr,Dr),this._renderer.xr.enabled=Pr,t.scissorTest=!1,En(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pn||t.mapping===In?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Rr=this._renderer.getRenderTarget(),Cr=this._renderer.getActiveCubeFace(),Dr=this._renderer.getActiveMipmapLevel(),Pr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ei,minFilter:ei,generateMipmaps:!1,type:Nn,format:li,colorSpace:Ln,depthBuffer:!1},n=ko(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ko(t,e,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Sf(s)),this._blurMaterial=wf(s,t,e),this._ggxMaterial=Tf(s,t,e)}return n}_compileMaterial(t){const e=new Jt(new Fe,t);this._renderer.compile(e,Yn)}_sceneToCubeUV(t,e,i,n,s){const l=new oi(90,1,e,i),h=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(zo),u.toneMapping=Gi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jt(new le,new Un({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let f=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,f=!0):(m.color.copy(zo),f=!0);for(let _=0;_<6;_++){const T=_%3;T===0?(l.up.set(0,h[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+c[_],s.y,s.z)):T===1?(l.up.set(0,0,h[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+c[_],s.z)):(l.up.set(0,h[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+c[_]));const E=this._cubeSize;En(n,T*E,_>2?E:0,E,E),u.setRenderTarget(n),f&&u.render(x,l),u.render(t,l)}u.toneMapping=p,u.autoClear=d,t.background=y}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===Pn||t.mapping===In;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ho());const s=n?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;En(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Yn)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,h=i/(this._lodMeshes.length-1),c=e/(this._lodMeshes.length-1),u=Math.sqrt(h*h-c*c),d=.05+h*.95,p=u*d,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-zi?i-g+zi:0),f=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-e,En(s,m,f,3*x,2*x),n.setRenderTarget(s),n.render(o,Yn),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,En(t,m,f,3*x,2*x),n.setRenderTarget(t),n.render(o,Yn)}_blur(t,e,i,n,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",s),this._halfBlur(a,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,a,o){const l=this._renderer,h=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const c=3,u=this._lodMeshes[n];u.material=h;const d=h.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Qi-1),x=s/g,m=isFinite(s)?1+Math.floor(c*x):Qi;m>Qi&&Lt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qi}`);const f=[];let y=0;for(let A=0;A<Qi;++A){const D=A/x,v=Math.exp(-D*D/2);f.push(v),A===0?y+=v:A<m&&(y+=2*v)}for(let A=0;A<f.length;A++)f[A]=f[A]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-i;const T=this._sizeLods[n],E=3*T*(n>_-zi?n-_+zi:0),M=4*(this._cubeSize-T);En(e,E,M,3*T,2*T),l.setRenderTarget(e),l.render(u,Yn)}}function Sf(r){const t=[],e=[],i=[];let n=r;const s=r-zi+1+Oo.length;for(let a=0;a<s;a++){const o=Math.pow(2,n);t.push(o);let l=1/o;a>r-zi?l=Oo[a-r+zi-1]:a===0&&(l=0),e.push(l);const h=1/(o-2),c=-h,u=1+h,d=[c,c,u,c,u,u,c,c,u,u,c,u],p=6,g=6,x=3,m=2,f=1,y=new Float32Array(x*g*p),_=new Float32Array(m*g*p),T=new Float32Array(f*g*p);for(let M=0;M<p;M++){const A=M%3*2/3-1,D=M>2?0:-1,v=[A,D,0,A+2/3,D,0,A+2/3,D+1,0,A,D,0,A+2/3,D+1,0,A,D+1,0];y.set(v,x*g*M),_.set(d,m*g*M);const S=[M,M,M,M,M,M];T.set(S,f*g*M)}const E=new Fe;E.setAttribute("position",new Ge(y,x)),E.setAttribute("uv",new Ge(_,m)),E.setAttribute("faceIndex",new Ge(T,f)),i.push(new Jt(E,null)),n>zi&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function ko(r,t,e){const i=new sn(r,t,e);return i.texture.mapping=Ys,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function En(r,t,e,i,n){r.viewport.set(t,e,i,n),r.scissor.set(t,e,i,n)}function Tf(r,t,e){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bf,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function wf(r,t,e){const i=new Float32Array(Qi),n=new L(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Qi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Ho(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:js(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function Vo(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:js(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function js(){return`

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
	`}function Ef(r){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,h=l===qr||l===$r,c=l===Pn||l===In;if(h||c){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Go(r)),u=h?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const p=o.image;return h&&p&&p.height>0||c&&p&&n(p)?(e===null&&(e=new Go(r)),u=h?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function n(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function s(o){const l=o.target;l.removeEventListener("dispose",s);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Af(r){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=r.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&es("WebGLRenderer: "+i+" extension not supported."),n}}}function Rf(r,t,e,i){const n={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete n[d.id];const p=s.get(d);p&&(t.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const p in d)t.update(d[p],r.ARRAY_BUFFER)}function h(u){const d=[],p=u.index,g=u.attributes.position;let x=0;if(p!==null){const y=p.array;x=p.version;for(let _=0,T=y.length;_<T;_+=3){const E=y[_+0],M=y[_+1],A=y[_+2];d.push(E,M,M,A,A,E)}}else if(g!==void 0){const y=g.array;x=g.version;for(let _=0,T=y.length/3-1;_<T;_+=3){const E=_+0,M=_+1,A=_+2;d.push(E,M,M,A,A,E)}}else return;const m=new(yl(d)?El:wl)(d,1);m.version=x;const f=s.get(u);f&&t.remove(f),s.set(u,m)}function c(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&h(u)}else h(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:c}}function Cf(r,t,e){let i;function n(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,p){r.drawElements(i,p,s,d*a),e.update(p,i,1)}function h(d,p,g){g!==0&&(r.drawElementsInstanced(i,p,s,d*a,g),e.update(p,i,g))}function c(d,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];e.update(m,i,1)}function u(d,p,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)h(d[f]/a,p[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,d,0,x,0,g);let f=0;for(let y=0;y<g;y++)f+=p[y]*x[y];e.update(f,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=u}function Df(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:fe("WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Pf(r,t,e){const i=new WeakMap,n=new ge;function s(a,o,l){const h=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let S=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var p=S;d!==void 0&&d.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),x===!0&&(T=2),m===!0&&(T=3);let E=o.attributes.position.count*T,M=1;E>t.maxTextureSize&&(M=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const A=new Float32Array(E*M*4*u),D=new Sl(A,E,M,u);D.type=mi,D.needsUpdate=!0;const v=T*4;for(let C=0;C<u;C++){const U=f[C],B=y[C],H=_[C],W=E*M*4*C;for(let $=0;$<U.count;$++){const J=$*v;g===!0&&(n.fromBufferAttribute(U,$),A[W+J+0]=n.x,A[W+J+1]=n.y,A[W+J+2]=n.z,A[W+J+3]=0),x===!0&&(n.fromBufferAttribute(B,$),A[W+J+4]=n.x,A[W+J+5]=n.y,A[W+J+6]=n.z,A[W+J+7]=0),m===!0&&(n.fromBufferAttribute(H,$),A[W+J+8]=n.x,A[W+J+9]=n.y,A[W+J+10]=n.z,A[W+J+11]=H.itemSize===4?n.w:1)}}d={count:u,texture:D,size:new bt(E,M)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<h.length;m++)g+=h[m];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",x),l.getUniforms().setValue(r,"morphTargetInfluences",h)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function If(r,t,e,i){let n=new WeakMap;function s(l){const h=i.render.frame,c=l.geometry,u=t.get(l,c);if(n.get(u)!==h&&(t.update(u),n.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==h&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),n.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==h&&(d.update(),n.set(d,h))}return u}function a(){n=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:a}}const zl=new Ce,Wo=new Fl(1,1),Gl=new Sl,kl=new Zh,Hl=new Cl,Xo=[],qo=[],$o=new Float32Array(16),Zo=new Float32Array(9),Yo=new Float32Array(4);function Bn(r,t,e){const i=r[0];if(i<=0||i>0)return r;const n=t*e;let s=Xo[n];if(s===void 0&&(s=new Float32Array(n),Xo[n]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function ye(r,t){if(r.length!==t.length)return!1;for(let e=0,i=r.length;e<i;e++)if(r[e]!==t[e])return!1;return!0}function Se(r,t){for(let e=0,i=t.length;e<i;e++)r[e]=t[e]}function Ks(r,t){let e=qo[t];e===void 0&&(e=new Int32Array(t),qo[t]=e);for(let i=0;i!==t;++i)e[i]=r.allocateTextureUnit();return e}function Lf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Uf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;r.uniform2fv(this.addr,t),Se(e,t)}}function Ff(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;r.uniform3fv(this.addr,t),Se(e,t)}}function Nf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;r.uniform4fv(this.addr,t),Se(e,t)}}function Bf(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,i))return;Yo.set(i),r.uniformMatrix2fv(this.addr,!1,Yo),Se(e,i)}}function Of(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,i))return;Zo.set(i),r.uniformMatrix3fv(this.addr,!1,Zo),Se(e,i)}}function zf(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,i))return;$o.set(i),r.uniformMatrix4fv(this.addr,!1,$o),Se(e,i)}}function Gf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function kf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;r.uniform2iv(this.addr,t),Se(e,t)}}function Hf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;r.uniform3iv(this.addr,t),Se(e,t)}}function Vf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;r.uniform4iv(this.addr,t),Se(e,t)}}function Wf(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function Xf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;r.uniform2uiv(this.addr,t),Se(e,t)}}function qf(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;r.uniform3uiv(this.addr,t),Se(e,t)}}function $f(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;r.uniform4uiv(this.addr,t),Se(e,t)}}function Zf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(Wo.compareFunction=bl,s=Wo):s=zl,e.setTexture2D(t||s,n)}function Yf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||kl,n)}function jf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Hl,n)}function Kf(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Gl,n)}function Jf(r){switch(r){case 5126:return Lf;case 35664:return Uf;case 35665:return Ff;case 35666:return Nf;case 35674:return Bf;case 35675:return Of;case 35676:return zf;case 5124:case 35670:return Gf;case 35667:case 35671:return kf;case 35668:case 35672:return Hf;case 35669:case 35673:return Vf;case 5125:return Wf;case 36294:return Xf;case 36295:return qf;case 36296:return $f;case 35678:case 36198:case 36298:case 36306:case 35682:return Zf;case 35679:case 36299:case 36307:return Yf;case 35680:case 36300:case 36308:case 36293:return jf;case 36289:case 36303:case 36311:case 36292:return Kf}}function Qf(r,t){r.uniform1fv(this.addr,t)}function tp(r,t){const e=Bn(t,this.size,2);r.uniform2fv(this.addr,e)}function ep(r,t){const e=Bn(t,this.size,3);r.uniform3fv(this.addr,e)}function ip(r,t){const e=Bn(t,this.size,4);r.uniform4fv(this.addr,e)}function np(r,t){const e=Bn(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function sp(r,t){const e=Bn(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function rp(r,t){const e=Bn(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function ap(r,t){r.uniform1iv(this.addr,t)}function op(r,t){r.uniform2iv(this.addr,t)}function lp(r,t){r.uniform3iv(this.addr,t)}function hp(r,t){r.uniform4iv(this.addr,t)}function cp(r,t){r.uniform1uiv(this.addr,t)}function dp(r,t){r.uniform2uiv(this.addr,t)}function up(r,t){r.uniform3uiv(this.addr,t)}function fp(r,t){r.uniform4uiv(this.addr,t)}function pp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ye(i,s)||(r.uniform1iv(this.addr,s),Se(i,s));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||zl,s[a])}function mp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ye(i,s)||(r.uniform1iv(this.addr,s),Se(i,s));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||kl,s[a])}function gp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ye(i,s)||(r.uniform1iv(this.addr,s),Se(i,s));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Hl,s[a])}function xp(r,t,e){const i=this.cache,n=t.length,s=Ks(e,n);ye(i,s)||(r.uniform1iv(this.addr,s),Se(i,s));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Gl,s[a])}function _p(r){switch(r){case 5126:return Qf;case 35664:return tp;case 35665:return ep;case 35666:return ip;case 35674:return np;case 35675:return sp;case 35676:return rp;case 5124:case 35670:return ap;case 35667:case 35671:return op;case 35668:case 35672:return lp;case 35669:case 35673:return hp;case 5125:return cp;case 36294:return dp;case 36295:return up;case 36296:return fp;case 35678:case 36198:case 36298:case 36306:case 35682:return pp;case 35679:case 36299:case 36307:return mp;case 35680:case 36300:case 36308:case 36293:return gp;case 36289:case 36303:case 36311:case 36292:return xp}}class Mp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Jf(e.type)}}class vp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=_p(e.type)}}class bp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,a=n.length;s!==a;++s){const o=n[s];o.setValue(t,e[o.id],i)}}}const Ir=/(\w+)(\])?(\[|\.)?/g;function jo(r,t){r.seq.push(t),r.map[t.id]=t}function yp(r,t,e){const i=r.name,n=i.length;for(Ir.lastIndex=0;;){const s=Ir.exec(i),a=Ir.lastIndex;let o=s[1];const l=s[2]==="]",h=s[3];if(l&&(o=o|0),h===void 0||h==="["&&a+2===n){jo(e,h===void 0?new Mp(o,r,t):new vp(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new bp(o),jo(e,u)),e=u}}}class ks{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),a=t.getUniformLocation(e,s.name);yp(s,a,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Ko(r,t,e){const i=r.createShader(t);return r.shaderSource(i,e),r.compileShader(i),i}const Sp=37297;let Tp=0;function wp(r,t){const e=r.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=n;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Jo=new Bt;function Ep(r){Zt._getMatrix(Jo,Zt.workingColorSpace,r);const t=`mat3( ${Jo.elements.map(e=>e.toFixed(4))} )`;switch(Zt.getTransfer(r)){case Hs:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Qo(r,t,e){const i=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+wp(r.getShaderSource(t),o)}else return s}function Ap(r,t){const e=Ep(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Rp(r,t){let e;switch(t){case bh:e="Linear";break;case yh:e="Reinhard";break;case Sh:e="Cineon";break;case Th:e="ACESFilmic";break;case Eh:e="AgX";break;case Ah:e="Neutral";break;case wh:e="Custom";break;default:Lt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Us=new L;function Cp(){Zt.getLuminanceCoefficients(Us);const r=Us.x.toFixed(4),t=Us.y.toFixed(4),e=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Dp(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(jn).join(`
`)}function Pp(r){const t=[];for(const e in r){const i=r[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ip(r,t){const e={},i=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=r.getActiveAttrib(t,n),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function jn(r){return r!==""}function tl(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function el(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Lp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(r){return r.replace(Lp,Fp)}const Up=new Map;function Fp(r,t){let e=Ot[t];if(e===void 0){const i=Up.get(t);if(i!==void 0)e=Ot[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ra(e)}const Np=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function il(r){return r.replace(Np,Bp)}function Bp(r,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function nl(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function Op(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===fl?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===th?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ei&&(t="SHADOWMAP_TYPE_VSM"),t}function zp(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Pn:case In:t="ENVMAP_TYPE_CUBE";break;case Ys:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Gp(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case In:t="ENVMAP_MODE_REFRACTION";break}return t}function kp(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Da:t="ENVMAP_BLENDING_MULTIPLY";break;case Mh:t="ENVMAP_BLENDING_MIX";break;case vh:t="ENVMAP_BLENDING_ADD";break}return t}function Hp(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Vp(r,t,e,i){const n=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Op(e),h=zp(e),c=Gp(e),u=kp(e),d=Hp(e),p=Dp(e),g=Pp(s),x=n.createProgram();let m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(jn).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(jn).join(`
`),f.length>0&&(f+=`
`)):(m=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(jn).join(`
`),f=[nl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gi?"#define TONE_MAPPING":"",e.toneMapping!==Gi?Ot.tonemapping_pars_fragment:"",e.toneMapping!==Gi?Rp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,Ap("linearToOutputTexel",e.outputColorSpace),Cp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(jn).join(`
`)),a=Ra(a),a=tl(a,e),a=el(a,e),o=Ra(o),o=tl(o,e),o=el(o,e),a=il(a),o=il(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===io?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===io?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=y+m+a,T=y+f+o,E=Ko(n,n.VERTEX_SHADER,_),M=Ko(n,n.FRAGMENT_SHADER,T);n.attachShader(x,E),n.attachShader(x,M),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function A(C){if(r.debug.checkShaderErrors){const U=n.getProgramInfoLog(x)||"",B=n.getShaderInfoLog(E)||"",H=n.getShaderInfoLog(M)||"",W=U.trim(),$=B.trim(),J=H.trim();let k=!0,et=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(k=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,x,E,M);else{const it=Qo(n,E,"vertex"),yt=Qo(n,M,"fragment");fe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+W+`
`+it+`
`+yt)}else W!==""?Lt("WebGLProgram: Program Info Log:",W):($===""||J==="")&&(et=!1);et&&(C.diagnostics={runnable:k,programLog:W,vertexShader:{log:$,prefix:m},fragmentShader:{log:J,prefix:f}})}n.deleteShader(E),n.deleteShader(M),D=new ks(n,x),v=Ip(n,x)}let D;this.getUniforms=function(){return D===void 0&&A(this),D};let v;this.getAttributes=function(){return v===void 0&&A(this),v};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=n.getProgramParameter(x,Sp)),S},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Tp++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=M,this}let Wp=0;class Xp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new qp(t),e.set(t,i)),i}}class qp{constructor(t){this.id=Wp++,this.code=t,this.usedTimes=0}}function $p(r,t,e,i,n,s,a){const o=new ka,l=new Xp,h=new Set,c=[],u=n.logarithmicDepthBuffer,d=n.vertexTextures;let p=n.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(v){return h.add(v),v===0?"uv":`uv${v}`}function m(v,S,C,U,B){const H=U.fog,W=B.geometry,$=v.isMeshStandardMaterial?U.environment:null,J=(v.isMeshStandardMaterial?e:t).get(v.envMap||$),k=J&&J.mapping===Ys?J.image.height:null,et=g[v.type];v.precision!==null&&(p=n.getMaxPrecision(v.precision),p!==v.precision&&Lt("WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const it=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,yt=it!==void 0?it.length:0;let Ht=0;W.morphAttributes.position!==void 0&&(Ht=1),W.morphAttributes.normal!==void 0&&(Ht=2),W.morphAttributes.color!==void 0&&(Ht=3);let qt,Yt,Qt,X;if(et){const te=fi[et];qt=te.vertexShader,Yt=te.fragmentShader}else qt=v.vertexShader,Yt=v.fragmentShader,l.update(v),Qt=l.getVertexShaderID(v),X=l.getFragmentShaderID(v);const Z=r.getRenderTarget(),ht=r.state.buffers.depth.getReversed(),wt=B.isInstancedMesh===!0,Mt=B.isBatchedMesh===!0,Nt=!!v.map,_e=!!v.matcap,zt=!!J,he=!!v.aoMap,P=!!v.lightMap,Vt=!!v.bumpMap,Wt=!!v.normalMap,ae=!!v.displacementMap,xt=!!v.emissiveMap,ce=!!v.metalnessMap,Tt=!!v.roughnessMap,Ft=v.anisotropy>0,R=v.clearcoat>0,b=v.dispersion>0,O=v.iridescence>0,q=v.sheen>0,j=v.transmission>0,V=Ft&&!!v.anisotropyMap,vt=R&&!!v.clearcoatMap,ot=R&&!!v.clearcoatNormalMap,Et=R&&!!v.clearcoatRoughnessMap,_t=O&&!!v.iridescenceMap,K=O&&!!v.iridescenceThicknessMap,nt=q&&!!v.sheenColorMap,Dt=q&&!!v.sheenRoughnessMap,Rt=!!v.specularMap,ut=!!v.specularColorMap,It=!!v.specularIntensityMap,I=j&&!!v.transmissionMap,lt=j&&!!v.thicknessMap,st=!!v.gradientMap,rt=!!v.alphaMap,Q=v.alphaTest>0,Y=!!v.alphaHash,mt=!!v.extensions;let Ut=Gi;v.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ut=r.toneMapping);const oe={shaderID:et,shaderType:v.type,shaderName:v.name,vertexShader:qt,fragmentShader:Yt,defines:v.defines,customVertexShaderID:Qt,customFragmentShaderID:X,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:Mt,batchingColor:Mt&&B._colorsTexture!==null,instancing:wt,instancingColor:wt&&B.instanceColor!==null,instancingMorph:wt&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?r.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Ln,alphaToCoverage:!!v.alphaToCoverage,map:Nt,matcap:_e,envMap:zt,envMapMode:zt&&J.mapping,envMapCubeUVHeight:k,aoMap:he,lightMap:P,bumpMap:Vt,normalMap:Wt,displacementMap:d&&ae,emissiveMap:xt,normalMapObjectSpace:Wt&&v.normalMapType===Ph,normalMapTangentSpace:Wt&&v.normalMapType===za,metalnessMap:ce,roughnessMap:Tt,anisotropy:Ft,anisotropyMap:V,clearcoat:R,clearcoatMap:vt,clearcoatNormalMap:ot,clearcoatRoughnessMap:Et,dispersion:b,iridescence:O,iridescenceMap:_t,iridescenceThicknessMap:K,sheen:q,sheenColorMap:nt,sheenRoughnessMap:Dt,specularMap:Rt,specularColorMap:ut,specularIntensityMap:It,transmission:j,transmissionMap:I,thicknessMap:lt,gradientMap:st,opaque:v.transparent===!1&&v.blending===tn&&v.alphaToCoverage===!1,alphaMap:rt,alphaTest:Q,alphaHash:Y,combine:v.combine,mapUv:Nt&&x(v.map.channel),aoMapUv:he&&x(v.aoMap.channel),lightMapUv:P&&x(v.lightMap.channel),bumpMapUv:Vt&&x(v.bumpMap.channel),normalMapUv:Wt&&x(v.normalMap.channel),displacementMapUv:ae&&x(v.displacementMap.channel),emissiveMapUv:xt&&x(v.emissiveMap.channel),metalnessMapUv:ce&&x(v.metalnessMap.channel),roughnessMapUv:Tt&&x(v.roughnessMap.channel),anisotropyMapUv:V&&x(v.anisotropyMap.channel),clearcoatMapUv:vt&&x(v.clearcoatMap.channel),clearcoatNormalMapUv:ot&&x(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Et&&x(v.clearcoatRoughnessMap.channel),iridescenceMapUv:_t&&x(v.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(v.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&x(v.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&x(v.sheenRoughnessMap.channel),specularMapUv:Rt&&x(v.specularMap.channel),specularColorMapUv:ut&&x(v.specularColorMap.channel),specularIntensityMapUv:It&&x(v.specularIntensityMap.channel),transmissionMapUv:I&&x(v.transmissionMap.channel),thicknessMapUv:lt&&x(v.thicknessMap.channel),alphaMapUv:rt&&x(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Wt||Ft),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(Nt||rt),fog:!!H,useFog:v.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ht,skinning:B.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Ht,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:Ut,decodeVideoTexture:Nt&&v.map.isVideoTexture===!0&&Zt.getTransfer(v.map.colorSpace)===ie,decodeVideoTextureEmissive:xt&&v.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(v.emissiveMap.colorSpace)===ie,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ye,flipSided:v.side===ze,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:mt&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&v.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return oe.vertexUv1s=h.has(1),oe.vertexUv2s=h.has(2),oe.vertexUv3s=h.has(3),h.clear(),oe}function f(v){const S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(const C in v.defines)S.push(C),S.push(v.defines[C]);return v.isRawShaderMaterial===!1&&(y(S,v),_(S,v),S.push(r.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function y(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function _(v,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),v.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),v.push(o.mask)}function T(v){const S=g[v.type];let C;if(S){const U=fi[S];C=oc.clone(U.uniforms)}else C=v.uniforms;return C}function E(v,S){let C;for(let U=0,B=c.length;U<B;U++){const H=c[U];if(H.cacheKey===S){C=H,++C.usedTimes;break}}return C===void 0&&(C=new Vp(r,S,v,s),c.push(C)),C}function M(v){if(--v.usedTimes===0){const S=c.indexOf(v);c[S]=c[c.length-1],c.pop(),v.destroy()}}function A(v){l.remove(v)}function D(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:T,acquireProgram:E,releaseProgram:M,releaseShaderCache:A,programs:c,dispose:D}}function Zp(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function i(a){r.delete(a)}function n(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function Yp(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function sl(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function rl(){const r=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function a(u,d,p,g,x,m){let f=r[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},r[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=x,f.group=m),t++,f}function o(u,d,p,g,x,m){const f=a(u,d,p,g,x,m);p.transmission>0?i.push(f):p.transparent===!0?n.push(f):e.push(f)}function l(u,d,p,g,x,m){const f=a(u,d,p,g,x,m);p.transmission>0?i.unshift(f):p.transparent===!0?n.unshift(f):e.unshift(f)}function h(u,d){e.length>1&&e.sort(u||Yp),i.length>1&&i.sort(d||sl),n.length>1&&n.sort(d||sl)}function c(){for(let u=t,d=r.length;u<d;u++){const p=r[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:c,sort:h}}function jp(){let r=new WeakMap;function t(i,n){const s=r.get(i);let a;return s===void 0?(a=new rl,r.set(i,[a])):n>=s.length?(a=new rl,s.push(a)):a=s[n],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function Kp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new dt};break;case"SpotLight":e={position:new L,direction:new L,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":e={color:new dt,position:new L,halfWidth:new L,halfHeight:new L};break}return r[t.id]=e,e}}}function Jp(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new bt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Qp=0;function tm(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function em(r){const t=new Kp,e=Jp(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new L);const n=new L,s=new Kt,a=new Kt;function o(h){let c=0,u=0,d=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,y=0,_=0,T=0,E=0,M=0,A=0;h.sort(tm);for(let v=0,S=h.length;v<S;v++){const C=h[v],U=C.color,B=C.intensity,H=C.distance,W=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)c+=U.r*B,u+=U.g*B,d+=U.b*B;else if(C.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(C.sh.coefficients[$],B);A++}else if(C.isDirectionalLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const J=C.shadow,k=e.get(C);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,i.directionalShadow[p]=k,i.directionalShadowMap[p]=W,i.directionalShadowMatrix[p]=C.shadow.matrix,y++}i.directional[p]=$,p++}else if(C.isSpotLight){const $=t.get(C);$.position.setFromMatrixPosition(C.matrixWorld),$.color.copy(U).multiplyScalar(B),$.distance=H,$.coneCos=Math.cos(C.angle),$.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),$.decay=C.decay,i.spot[x]=$;const J=C.shadow;if(C.map&&(i.spotLightMap[E]=C.map,E++,J.updateMatrices(C),C.castShadow&&M++),i.spotLightMatrix[x]=J.matrix,C.castShadow){const k=e.get(C);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,i.spotShadow[x]=k,i.spotShadowMap[x]=W,T++}x++}else if(C.isRectAreaLight){const $=t.get(C);$.color.copy(U).multiplyScalar(B),$.halfWidth.set(C.width*.5,0,0),$.halfHeight.set(0,C.height*.5,0),i.rectArea[m]=$,m++}else if(C.isPointLight){const $=t.get(C);if($.color.copy(C.color).multiplyScalar(C.intensity),$.distance=C.distance,$.decay=C.decay,C.castShadow){const J=C.shadow,k=e.get(C);k.shadowIntensity=J.intensity,k.shadowBias=J.bias,k.shadowNormalBias=J.normalBias,k.shadowRadius=J.radius,k.shadowMapSize=J.mapSize,k.shadowCameraNear=J.camera.near,k.shadowCameraFar=J.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=W,i.pointShadowMatrix[g]=C.shadow.matrix,_++}i.point[g]=$,g++}else if(C.isHemisphereLight){const $=t.get(C);$.skyColor.copy(C.color).multiplyScalar(B),$.groundColor.copy(C.groundColor).multiplyScalar(B),i.hemi[f]=$,f++}}m>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=u,i.ambient[2]=d;const D=i.hash;(D.directionalLength!==p||D.pointLength!==g||D.spotLength!==x||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==y||D.numPointShadows!==_||D.numSpotShadows!==T||D.numSpotMaps!==E||D.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=T+E-M,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=A,D.directionalLength=p,D.pointLength=g,D.spotLength=x,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=y,D.numPointShadows=_,D.numSpotShadows=T,D.numSpotMaps=E,D.numLightProbes=A,i.version=Qp++)}function l(h,c){let u=0,d=0,p=0,g=0,x=0;const m=c.matrixWorldInverse;for(let f=0,y=h.length;f<y;f++){const _=h[f];if(_.isDirectionalLight){const T=i.directional[u];T.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(n),T.direction.transformDirection(m),u++}else if(_.isSpotLight){const T=i.spot[p];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),T.direction.sub(n),T.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const T=i.rectArea[g];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),a.identity(),s.copy(_.matrixWorld),s.premultiply(m),a.extractRotation(s),T.halfWidth.set(_.width*.5,0,0),T.halfHeight.set(0,_.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){const T=i.point[d];T.position.setFromMatrixPosition(_.matrixWorld),T.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const T=i.hemi[x];T.direction.setFromMatrixPosition(_.matrixWorld),T.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function al(r){const t=new em(r),e=[],i=[];function n(c){h.camera=c,e.length=0,i.length=0}function s(c){e.push(c)}function a(c){i.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:h,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function im(r){let t=new WeakMap;function e(n,s=0){const a=t.get(n);let o;return a===void 0?(o=new al(r),t.set(n,[o])):s>=a.length?(o=new al(r),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const nm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sm=`uniform sampler2D shadow_pass;
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
}`;function rm(r,t,e){let i=new ns;const n=new bt,s=new bt,a=new ge,o=new Sc({depthPacking:Dh}),l=new Tc,h={},c=e.maxTextureSize,u={[Hi]:ze,[ze]:Hi,[Ye]:Ye},d=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new bt},radius:{value:4}},vertexShader:nm,fragmentShader:sm}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new Fe;g.setAttribute("position",new Ge(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Jt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fl;let f=this.type;this.render=function(M,A,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const v=r.getRenderTarget(),S=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Ri),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=f!==Ei&&this.type===Ei,H=f===Ei&&this.type!==Ei;for(let W=0,$=M.length;W<$;W++){const J=M[W],k=J.shadow;if(k===void 0){Lt("WebGLShadowMap:",J,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;n.copy(k.mapSize);const et=k.getFrameExtents();if(n.multiply(et),s.copy(k.mapSize),(n.x>c||n.y>c)&&(n.x>c&&(s.x=Math.floor(c/et.x),n.x=s.x*et.x,k.mapSize.x=s.x),n.y>c&&(s.y=Math.floor(c/et.y),n.y=s.y*et.y,k.mapSize.y=s.y)),k.map===null||B===!0||H===!0){const yt=this.type!==Ei?{minFilter:je,magFilter:je}:{};k.map!==null&&k.map.dispose(),k.map=new sn(n.x,n.y,yt),k.map.texture.name=J.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const it=k.getViewportCount();for(let yt=0;yt<it;yt++){const Ht=k.getViewport(yt);a.set(s.x*Ht.x,s.y*Ht.y,s.x*Ht.z,s.y*Ht.w),U.viewport(a),k.updateMatrices(J,yt),i=k.getFrustum(),T(A,D,k.camera,J,this.type)}k.isPointLightShadow!==!0&&this.type===Ei&&y(k,D),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,r.setRenderTarget(v,S,C)};function y(M,A){const D=t.update(x);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new sn(n.x,n.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(A,null,D,d,x,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(A,null,D,p,x,null)}function _(M,A,D,v){let S=null;const C=D.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(C!==void 0)S=C;else if(S=D.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=S.uuid,B=A.uuid;let H=h[U];H===void 0&&(H={},h[U]=H);let W=H[B];W===void 0&&(W=S.clone(),H[B]=W,A.addEventListener("dispose",E)),S=W}if(S.visible=A.visible,S.wireframe=A.wireframe,v===Ei?S.side=A.shadowSide!==null?A.shadowSide:A.side:S.side=A.shadowSide!==null?A.shadowSide:u[A.side],S.alphaMap=A.alphaMap,S.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,S.map=A.map,S.clipShadows=A.clipShadows,S.clippingPlanes=A.clippingPlanes,S.clipIntersection=A.clipIntersection,S.displacementMap=A.displacementMap,S.displacementScale=A.displacementScale,S.displacementBias=A.displacementBias,S.wireframeLinewidth=A.wireframeLinewidth,S.linewidth=A.linewidth,D.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=r.properties.get(S);U.light=D}return S}function T(M,A,D,v,S){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Ei)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,M.matrixWorld);const B=t.update(M),H=M.material;if(Array.isArray(H)){const W=B.groups;for(let $=0,J=W.length;$<J;$++){const k=W[$],et=H[k.materialIndex];if(et&&et.visible){const it=_(M,et,v,S);M.onBeforeShadow(r,M,A,D,B,it,k),r.renderBufferDirect(D,null,B,it,M,k),M.onAfterShadow(r,M,A,D,B,it,k)}}}else if(H.visible){const W=_(M,H,v,S);M.onBeforeShadow(r,M,A,D,B,W,null),r.renderBufferDirect(D,null,B,W,M,null),M.onAfterShadow(r,M,A,D,B,W,null)}}const U=M.children;for(let B=0,H=U.length;B<H;B++)T(U[B],A,D,v,S)}function E(M){M.target.removeEventListener("dispose",E);for(const D in h){const v=h[D],S=M.target.uuid;S in v&&(v[S].dispose(),delete v[S])}}}const am={[zr]:Gr,[kr]:Wr,[Hr]:Xr,[Dn]:Vr,[Gr]:zr,[Wr]:kr,[Xr]:Hr,[Vr]:Dn};function om(r,t){function e(){let I=!1;const lt=new ge;let st=null;const rt=new ge(0,0,0,0);return{setMask:function(Q){st!==Q&&!I&&(r.colorMask(Q,Q,Q,Q),st=Q)},setLocked:function(Q){I=Q},setClear:function(Q,Y,mt,Ut,oe){oe===!0&&(Q*=Ut,Y*=Ut,mt*=Ut),lt.set(Q,Y,mt,Ut),rt.equals(lt)===!1&&(r.clearColor(Q,Y,mt,Ut),rt.copy(lt))},reset:function(){I=!1,st=null,rt.set(-1,0,0,0)}}}function i(){let I=!1,lt=!1,st=null,rt=null,Q=null;return{setReversed:function(Y){if(lt!==Y){const mt=t.get("EXT_clip_control");Y?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT),lt=Y;const Ut=Q;Q=null,this.setClear(Ut)}},getReversed:function(){return lt},setTest:function(Y){Y?Z(r.DEPTH_TEST):ht(r.DEPTH_TEST)},setMask:function(Y){st!==Y&&!I&&(r.depthMask(Y),st=Y)},setFunc:function(Y){if(lt&&(Y=am[Y]),rt!==Y){switch(Y){case zr:r.depthFunc(r.NEVER);break;case Gr:r.depthFunc(r.ALWAYS);break;case kr:r.depthFunc(r.LESS);break;case Dn:r.depthFunc(r.LEQUAL);break;case Hr:r.depthFunc(r.EQUAL);break;case Vr:r.depthFunc(r.GEQUAL);break;case Wr:r.depthFunc(r.GREATER);break;case Xr:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}rt=Y}},setLocked:function(Y){I=Y},setClear:function(Y){Q!==Y&&(lt&&(Y=1-Y),r.clearDepth(Y),Q=Y)},reset:function(){I=!1,st=null,rt=null,Q=null,lt=!1}}}function n(){let I=!1,lt=null,st=null,rt=null,Q=null,Y=null,mt=null,Ut=null,oe=null;return{setTest:function(te){I||(te?Z(r.STENCIL_TEST):ht(r.STENCIL_TEST))},setMask:function(te){lt!==te&&!I&&(r.stencilMask(te),lt=te)},setFunc:function(te,ui,ni){(st!==te||rt!==ui||Q!==ni)&&(r.stencilFunc(te,ui,ni),st=te,rt=ui,Q=ni)},setOp:function(te,ui,ni){(Y!==te||mt!==ui||Ut!==ni)&&(r.stencilOp(te,ui,ni),Y=te,mt=ui,Ut=ni)},setLocked:function(te){I=te},setClear:function(te){oe!==te&&(r.clearStencil(te),oe=te)},reset:function(){I=!1,lt=null,st=null,rt=null,Q=null,Y=null,mt=null,Ut=null,oe=null}}}const s=new e,a=new i,o=new n,l=new WeakMap,h=new WeakMap;let c={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,y=null,_=null,T=null,E=null,M=null,A=new dt(0,0,0),D=0,v=!1,S=null,C=null,U=null,B=null,H=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,J=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(k)[1]),$=J>=1):k.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),$=J>=2);let et=null,it={};const yt=r.getParameter(r.SCISSOR_BOX),Ht=r.getParameter(r.VIEWPORT),qt=new ge().fromArray(yt),Yt=new ge().fromArray(Ht);function Qt(I,lt,st,rt){const Q=new Uint8Array(4),Y=r.createTexture();r.bindTexture(I,Y),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let mt=0;mt<st;mt++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(lt,0,r.RGBA,1,1,rt,0,r.RGBA,r.UNSIGNED_BYTE,Q):r.texImage2D(lt+mt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Q);return Y}const X={};X[r.TEXTURE_2D]=Qt(r.TEXTURE_2D,r.TEXTURE_2D,1),X[r.TEXTURE_CUBE_MAP]=Qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[r.TEXTURE_2D_ARRAY]=Qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),X[r.TEXTURE_3D]=Qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Z(r.DEPTH_TEST),a.setFunc(Dn),Vt(!1),Wt(Ja),Z(r.CULL_FACE),he(Ri);function Z(I){c[I]!==!0&&(r.enable(I),c[I]=!0)}function ht(I){c[I]!==!1&&(r.disable(I),c[I]=!1)}function wt(I,lt){return u[I]!==lt?(r.bindFramebuffer(I,lt),u[I]=lt,I===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=lt),I===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=lt),!0):!1}function Mt(I,lt){let st=p,rt=!1;if(I){st=d.get(lt),st===void 0&&(st=[],d.set(lt,st));const Q=I.textures;if(st.length!==Q.length||st[0]!==r.COLOR_ATTACHMENT0){for(let Y=0,mt=Q.length;Y<mt;Y++)st[Y]=r.COLOR_ATTACHMENT0+Y;st.length=Q.length,rt=!0}}else st[0]!==r.BACK&&(st[0]=r.BACK,rt=!0);rt&&r.drawBuffers(st)}function Nt(I){return g!==I?(r.useProgram(I),g=I,!0):!1}const _e={[Ji]:r.FUNC_ADD,[ih]:r.FUNC_SUBTRACT,[nh]:r.FUNC_REVERSE_SUBTRACT};_e[sh]=r.MIN,_e[rh]=r.MAX;const zt={[ah]:r.ZERO,[oh]:r.ONE,[lh]:r.SRC_COLOR,[Br]:r.SRC_ALPHA,[ph]:r.SRC_ALPHA_SATURATE,[uh]:r.DST_COLOR,[ch]:r.DST_ALPHA,[hh]:r.ONE_MINUS_SRC_COLOR,[Or]:r.ONE_MINUS_SRC_ALPHA,[fh]:r.ONE_MINUS_DST_COLOR,[dh]:r.ONE_MINUS_DST_ALPHA,[mh]:r.CONSTANT_COLOR,[gh]:r.ONE_MINUS_CONSTANT_COLOR,[xh]:r.CONSTANT_ALPHA,[_h]:r.ONE_MINUS_CONSTANT_ALPHA};function he(I,lt,st,rt,Q,Y,mt,Ut,oe,te){if(I===Ri){x===!0&&(ht(r.BLEND),x=!1);return}if(x===!1&&(Z(r.BLEND),x=!0),I!==eh){if(I!==m||te!==v){if((f!==Ji||T!==Ji)&&(r.blendEquation(r.FUNC_ADD),f=Ji,T=Ji),te)switch(I){case tn:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Nr:r.blendFunc(r.ONE,r.ONE);break;case Qa:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case to:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:fe("WebGLState: Invalid blending: ",I);break}else switch(I){case tn:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Nr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Qa:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case to:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",I);break}y=null,_=null,E=null,M=null,A.set(0,0,0),D=0,m=I,v=te}return}Q=Q||lt,Y=Y||st,mt=mt||rt,(lt!==f||Q!==T)&&(r.blendEquationSeparate(_e[lt],_e[Q]),f=lt,T=Q),(st!==y||rt!==_||Y!==E||mt!==M)&&(r.blendFuncSeparate(zt[st],zt[rt],zt[Y],zt[mt]),y=st,_=rt,E=Y,M=mt),(Ut.equals(A)===!1||oe!==D)&&(r.blendColor(Ut.r,Ut.g,Ut.b,oe),A.copy(Ut),D=oe),m=I,v=!1}function P(I,lt){I.side===Ye?ht(r.CULL_FACE):Z(r.CULL_FACE);let st=I.side===ze;lt&&(st=!st),Vt(st),I.blending===tn&&I.transparent===!1?he(Ri):he(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),s.setMask(I.colorWrite);const rt=I.stencilWrite;o.setTest(rt),rt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),xt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?Z(r.SAMPLE_ALPHA_TO_COVERAGE):ht(r.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(I){S!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),S=I)}function Wt(I){I!==Jl?(Z(r.CULL_FACE),I!==C&&(I===Ja?r.cullFace(r.BACK):I===Ql?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ht(r.CULL_FACE),C=I}function ae(I){I!==U&&($&&r.lineWidth(I),U=I)}function xt(I,lt,st){I?(Z(r.POLYGON_OFFSET_FILL),(B!==lt||H!==st)&&(r.polygonOffset(lt,st),B=lt,H=st)):ht(r.POLYGON_OFFSET_FILL)}function ce(I){I?Z(r.SCISSOR_TEST):ht(r.SCISSOR_TEST)}function Tt(I){I===void 0&&(I=r.TEXTURE0+W-1),et!==I&&(r.activeTexture(I),et=I)}function Ft(I,lt,st){st===void 0&&(et===null?st=r.TEXTURE0+W-1:st=et);let rt=it[st];rt===void 0&&(rt={type:void 0,texture:void 0},it[st]=rt),(rt.type!==I||rt.texture!==lt)&&(et!==st&&(r.activeTexture(st),et=st),r.bindTexture(I,lt||X[I]),rt.type=I,rt.texture=lt)}function R(){const I=it[et];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function b(){try{r.compressedTexImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function O(){try{r.compressedTexImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function q(){try{r.texSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function j(){try{r.texSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function V(){try{r.compressedTexSubImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function vt(){try{r.compressedTexSubImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function ot(){try{r.texStorage2D(...arguments)}catch(I){I("WebGLState:",I)}}function Et(){try{r.texStorage3D(...arguments)}catch(I){I("WebGLState:",I)}}function _t(){try{r.texImage2D(...arguments)}catch(I){I("WebGLState:",I)}}function K(){try{r.texImage3D(...arguments)}catch(I){I("WebGLState:",I)}}function nt(I){qt.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),qt.copy(I))}function Dt(I){Yt.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Yt.copy(I))}function Rt(I,lt){let st=h.get(lt);st===void 0&&(st=new WeakMap,h.set(lt,st));let rt=st.get(I);rt===void 0&&(rt=r.getUniformBlockIndex(lt,I.name),st.set(I,rt))}function ut(I,lt){const rt=h.get(lt).get(I);l.get(lt)!==rt&&(r.uniformBlockBinding(lt,rt,I.__bindingPointIndex),l.set(lt,rt))}function It(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),c={},et=null,it={},u={},d=new WeakMap,p=[],g=null,x=!1,m=null,f=null,y=null,_=null,T=null,E=null,M=null,A=new dt(0,0,0),D=0,v=!1,S=null,C=null,U=null,B=null,H=null,qt.set(0,0,r.canvas.width,r.canvas.height),Yt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Z,disable:ht,bindFramebuffer:wt,drawBuffers:Mt,useProgram:Nt,setBlending:he,setMaterial:P,setFlipSided:Vt,setCullFace:Wt,setLineWidth:ae,setPolygonOffset:xt,setScissorTest:ce,activeTexture:Tt,bindTexture:Ft,unbindTexture:R,compressedTexImage2D:b,compressedTexImage3D:O,texImage2D:_t,texImage3D:K,updateUBOMapping:Rt,uniformBlockBinding:ut,texStorage2D:ot,texStorage3D:Et,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:V,compressedTexSubImage3D:vt,scissor:nt,viewport:Dt,reset:It}}function lm(r,t,e,i,n,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new bt,c=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return p?new OffscreenCanvas(R,b):Ws("canvas")}function x(R,b,O){let q=1;const j=Ft(R);if((j.width>O||j.height>O)&&(q=O/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const V=Math.floor(q*j.width),vt=Math.floor(q*j.height);u===void 0&&(u=g(V,vt));const ot=b?g(V,vt):u;return ot.width=V,ot.height=vt,ot.getContext("2d").drawImage(R,0,0,V,vt),Lt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+V+"x"+vt+")."),ot}else return"data"in R&&Lt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),R;return R}function m(R){return R.generateMipmaps}function f(R){r.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function _(R,b,O,q,j=!1){if(R!==null){if(r[R]!==void 0)return r[R];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let V=b;if(b===r.RED&&(O===r.FLOAT&&(V=r.R32F),O===r.HALF_FLOAT&&(V=r.R16F),O===r.UNSIGNED_BYTE&&(V=r.R8)),b===r.RED_INTEGER&&(O===r.UNSIGNED_BYTE&&(V=r.R8UI),O===r.UNSIGNED_SHORT&&(V=r.R16UI),O===r.UNSIGNED_INT&&(V=r.R32UI),O===r.BYTE&&(V=r.R8I),O===r.SHORT&&(V=r.R16I),O===r.INT&&(V=r.R32I)),b===r.RG&&(O===r.FLOAT&&(V=r.RG32F),O===r.HALF_FLOAT&&(V=r.RG16F),O===r.UNSIGNED_BYTE&&(V=r.RG8)),b===r.RG_INTEGER&&(O===r.UNSIGNED_BYTE&&(V=r.RG8UI),O===r.UNSIGNED_SHORT&&(V=r.RG16UI),O===r.UNSIGNED_INT&&(V=r.RG32UI),O===r.BYTE&&(V=r.RG8I),O===r.SHORT&&(V=r.RG16I),O===r.INT&&(V=r.RG32I)),b===r.RGB_INTEGER&&(O===r.UNSIGNED_BYTE&&(V=r.RGB8UI),O===r.UNSIGNED_SHORT&&(V=r.RGB16UI),O===r.UNSIGNED_INT&&(V=r.RGB32UI),O===r.BYTE&&(V=r.RGB8I),O===r.SHORT&&(V=r.RGB16I),O===r.INT&&(V=r.RGB32I)),b===r.RGBA_INTEGER&&(O===r.UNSIGNED_BYTE&&(V=r.RGBA8UI),O===r.UNSIGNED_SHORT&&(V=r.RGBA16UI),O===r.UNSIGNED_INT&&(V=r.RGBA32UI),O===r.BYTE&&(V=r.RGBA8I),O===r.SHORT&&(V=r.RGBA16I),O===r.INT&&(V=r.RGBA32I)),b===r.RGB&&(O===r.UNSIGNED_INT_5_9_9_9_REV&&(V=r.RGB9_E5),O===r.UNSIGNED_INT_10F_11F_11F_REV&&(V=r.R11F_G11F_B10F)),b===r.RGBA){const vt=j?Hs:Zt.getTransfer(q);O===r.FLOAT&&(V=r.RGBA32F),O===r.HALF_FLOAT&&(V=r.RGBA16F),O===r.UNSIGNED_BYTE&&(V=vt===ie?r.SRGB8_ALPHA8:r.RGBA8),O===r.UNSIGNED_SHORT_4_4_4_4&&(V=r.RGBA4),O===r.UNSIGNED_SHORT_5_5_5_1&&(V=r.RGB5_A1)}return(V===r.R16F||V===r.R32F||V===r.RG16F||V===r.RG32F||V===r.RGBA16F||V===r.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function T(R,b){let O;return R?b===null||b===en||b===Jn?O=r.DEPTH24_STENCIL8:b===mi?O=r.DEPTH32F_STENCIL8:b===Kn&&(O=r.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===en||b===Jn?O=r.DEPTH_COMPONENT24:b===mi?O=r.DEPTH_COMPONENT32F:b===Kn&&(O=r.DEPTH_COMPONENT16),O}function E(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==je&&R.minFilter!==ei?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function M(R){const b=R.target;b.removeEventListener("dispose",M),D(b),b.isVideoTexture&&c.delete(b)}function A(R){const b=R.target;b.removeEventListener("dispose",A),S(b)}function D(R){const b=i.get(R);if(b.__webglInit===void 0)return;const O=R.source,q=d.get(O);if(q){const j=q[b.__cacheKey];j.usedTimes--,j.usedTimes===0&&v(R),Object.keys(q).length===0&&d.delete(O)}i.remove(R)}function v(R){const b=i.get(R);r.deleteTexture(b.__webglTexture);const O=R.source,q=d.get(O);delete q[b.__cacheKey],a.memory.textures--}function S(R){const b=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(b.__webglFramebuffer[q]))for(let j=0;j<b.__webglFramebuffer[q].length;j++)r.deleteFramebuffer(b.__webglFramebuffer[q][j]);else r.deleteFramebuffer(b.__webglFramebuffer[q]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[q])}else{if(Array.isArray(b.__webglFramebuffer))for(let q=0;q<b.__webglFramebuffer.length;q++)r.deleteFramebuffer(b.__webglFramebuffer[q]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let q=0;q<b.__webglColorRenderbuffer.length;q++)b.__webglColorRenderbuffer[q]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[q]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const O=R.textures;for(let q=0,j=O.length;q<j;q++){const V=i.get(O[q]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),a.memory.textures--),i.remove(O[q])}i.remove(R)}let C=0;function U(){C=0}function B(){const R=C;return R>=n.maxTextures&&Lt("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+n.maxTextures),C+=1,R}function H(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function W(R,b){const O=i.get(R);if(R.isVideoTexture&&ce(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&O.__version!==R.version){const q=R.image;if(q===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{X(O,R,b);return}}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,O.__webglTexture,r.TEXTURE0+b)}function $(R,b){const O=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){X(O,R,b);return}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(r.TEXTURE_2D_ARRAY,O.__webglTexture,r.TEXTURE0+b)}function J(R,b){const O=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){X(O,R,b);return}e.bindTexture(r.TEXTURE_3D,O.__webglTexture,r.TEXTURE0+b)}function k(R,b){const O=i.get(R);if(R.version>0&&O.__version!==R.version){Z(O,R,b);return}e.bindTexture(r.TEXTURE_CUBE_MAP,O.__webglTexture,r.TEXTURE0+b)}const et={[Zr]:r.REPEAT,[Ai]:r.CLAMP_TO_EDGE,[Yr]:r.MIRRORED_REPEAT},it={[je]:r.NEAREST,[Rh]:r.NEAREST_MIPMAP_NEAREST,[os]:r.NEAREST_MIPMAP_LINEAR,[ei]:r.LINEAR,[er]:r.LINEAR_MIPMAP_NEAREST,[Oi]:r.LINEAR_MIPMAP_LINEAR},yt={[Ih]:r.NEVER,[Oh]:r.ALWAYS,[Lh]:r.LESS,[bl]:r.LEQUAL,[Uh]:r.EQUAL,[Bh]:r.GEQUAL,[Fh]:r.GREATER,[Nh]:r.NOTEQUAL};function Ht(R,b){if(b.type===mi&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===ei||b.magFilter===er||b.magFilter===os||b.magFilter===Oi||b.minFilter===ei||b.minFilter===er||b.minFilter===os||b.minFilter===Oi)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,et[b.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,et[b.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,et[b.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,it[b.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,it[b.minFilter]),b.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,yt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===je||b.minFilter!==os&&b.minFilter!==Oi||b.type===mi&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||i.get(b).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");r.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,n.getMaxAnisotropy())),i.get(b).__currentAnisotropy=b.anisotropy}}}function qt(R,b){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",M));const q=b.source;let j=d.get(q);j===void 0&&(j={},d.set(q,j));const V=H(b);if(V!==R.__cacheKey){j[V]===void 0&&(j[V]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,O=!0),j[V].usedTimes++;const vt=j[R.__cacheKey];vt!==void 0&&(j[R.__cacheKey].usedTimes--,vt.usedTimes===0&&v(b)),R.__cacheKey=V,R.__webglTexture=j[V].texture}return O}function Yt(R,b,O){return Math.floor(Math.floor(R/O)/b)}function Qt(R,b,O,q){const V=R.updateRanges;if(V.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,b.width,b.height,O,q,b.data);else{V.sort((K,nt)=>K.start-nt.start);let vt=0;for(let K=1;K<V.length;K++){const nt=V[vt],Dt=V[K],Rt=nt.start+nt.count,ut=Yt(Dt.start,b.width,4),It=Yt(nt.start,b.width,4);Dt.start<=Rt+1&&ut===It&&Yt(Dt.start+Dt.count-1,b.width,4)===ut?nt.count=Math.max(nt.count,Dt.start+Dt.count-nt.start):(++vt,V[vt]=Dt)}V.length=vt+1;const ot=r.getParameter(r.UNPACK_ROW_LENGTH),Et=r.getParameter(r.UNPACK_SKIP_PIXELS),_t=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,b.width);for(let K=0,nt=V.length;K<nt;K++){const Dt=V[K],Rt=Math.floor(Dt.start/4),ut=Math.ceil(Dt.count/4),It=Rt%b.width,I=Math.floor(Rt/b.width),lt=ut,st=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,It),r.pixelStorei(r.UNPACK_SKIP_ROWS,I),e.texSubImage2D(r.TEXTURE_2D,0,It,I,lt,st,O,q,b.data)}R.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ot),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Et),r.pixelStorei(r.UNPACK_SKIP_ROWS,_t)}}function X(R,b,O){let q=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(q=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(q=r.TEXTURE_3D);const j=qt(R,b),V=b.source;e.bindTexture(q,R.__webglTexture,r.TEXTURE0+O);const vt=i.get(V);if(V.version!==vt.__version||j===!0){e.activeTexture(r.TEXTURE0+O);const ot=Zt.getPrimaries(Zt.workingColorSpace),Et=b.colorSpace===Bi?null:Zt.getPrimaries(b.colorSpace),_t=b.colorSpace===Bi||ot===Et?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);let K=x(b.image,!1,n.maxTextureSize);K=Tt(b,K);const nt=s.convert(b.format,b.colorSpace),Dt=s.convert(b.type);let Rt=_(b.internalFormat,nt,Dt,b.colorSpace,b.isVideoTexture);Ht(q,b);let ut;const It=b.mipmaps,I=b.isVideoTexture!==!0,lt=vt.__version===void 0||j===!0,st=V.dataReady,rt=E(b,K);if(b.isDepthTexture)Rt=T(b.format===ts,b.type),lt&&(I?e.texStorage2D(r.TEXTURE_2D,1,Rt,K.width,K.height):e.texImage2D(r.TEXTURE_2D,0,Rt,K.width,K.height,0,nt,Dt,null));else if(b.isDataTexture)if(It.length>0){I&&lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let Q=0,Y=It.length;Q<Y;Q++)ut=It[Q],I?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ut.width,ut.height,nt,Dt,ut.data):e.texImage2D(r.TEXTURE_2D,Q,Rt,ut.width,ut.height,0,nt,Dt,ut.data);b.generateMipmaps=!1}else I?(lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,K.width,K.height),st&&Qt(b,K,nt,Dt)):e.texImage2D(r.TEXTURE_2D,0,Rt,K.width,K.height,0,nt,Dt,K.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){I&&lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,rt,Rt,It[0].width,It[0].height,K.depth);for(let Q=0,Y=It.length;Q<Y;Q++)if(ut=It[Q],b.format!==li)if(nt!==null)if(I){if(st)if(b.layerUpdates.size>0){const mt=Bo(ut.width,ut.height,b.format,b.type);for(const Ut of b.layerUpdates){const oe=ut.data.subarray(Ut*mt/ut.data.BYTES_PER_ELEMENT,(Ut+1)*mt/ut.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,Ut,ut.width,ut.height,1,nt,oe)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,ut.width,ut.height,K.depth,nt,ut.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,Rt,ut.width,ut.height,K.depth,0,ut.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?st&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,ut.width,ut.height,K.depth,nt,Dt,ut.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Q,Rt,ut.width,ut.height,K.depth,0,nt,Dt,ut.data)}else{I&&lt&&e.texStorage2D(r.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let Q=0,Y=It.length;Q<Y;Q++)ut=It[Q],b.format!==li?nt!==null?I?st&&e.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,ut.width,ut.height,nt,ut.data):e.compressedTexImage2D(r.TEXTURE_2D,Q,Rt,ut.width,ut.height,0,ut.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ut.width,ut.height,nt,Dt,ut.data):e.texImage2D(r.TEXTURE_2D,Q,Rt,ut.width,ut.height,0,nt,Dt,ut.data)}else if(b.isDataArrayTexture)if(I){if(lt&&e.texStorage3D(r.TEXTURE_2D_ARRAY,rt,Rt,K.width,K.height,K.depth),st)if(b.layerUpdates.size>0){const Q=Bo(K.width,K.height,b.format,b.type);for(const Y of b.layerUpdates){const mt=K.data.subarray(Y*Q/K.data.BYTES_PER_ELEMENT,(Y+1)*Q/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Y,K.width,K.height,1,nt,Dt,mt)}b.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,nt,Dt,K.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Rt,K.width,K.height,K.depth,0,nt,Dt,K.data);else if(b.isData3DTexture)I?(lt&&e.texStorage3D(r.TEXTURE_3D,rt,Rt,K.width,K.height,K.depth),st&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,nt,Dt,K.data)):e.texImage3D(r.TEXTURE_3D,0,Rt,K.width,K.height,K.depth,0,nt,Dt,K.data);else if(b.isFramebufferTexture){if(lt)if(I)e.texStorage2D(r.TEXTURE_2D,rt,Rt,K.width,K.height);else{let Q=K.width,Y=K.height;for(let mt=0;mt<rt;mt++)e.texImage2D(r.TEXTURE_2D,mt,Rt,Q,Y,0,nt,Dt,null),Q>>=1,Y>>=1}}else if(It.length>0){if(I&&lt){const Q=Ft(It[0]);e.texStorage2D(r.TEXTURE_2D,rt,Rt,Q.width,Q.height)}for(let Q=0,Y=It.length;Q<Y;Q++)ut=It[Q],I?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,nt,Dt,ut):e.texImage2D(r.TEXTURE_2D,Q,Rt,nt,Dt,ut);b.generateMipmaps=!1}else if(I){if(lt){const Q=Ft(K);e.texStorage2D(r.TEXTURE_2D,rt,Rt,Q.width,Q.height)}st&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,nt,Dt,K)}else e.texImage2D(r.TEXTURE_2D,0,Rt,nt,Dt,K);m(b)&&f(q),vt.__version=V.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function Z(R,b,O){if(b.image.length!==6)return;const q=qt(R,b),j=b.source;e.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+O);const V=i.get(j);if(j.version!==V.__version||q===!0){e.activeTexture(r.TEXTURE0+O);const vt=Zt.getPrimaries(Zt.workingColorSpace),ot=b.colorSpace===Bi?null:Zt.getPrimaries(b.colorSpace),Et=b.colorSpace===Bi||vt===ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const _t=b.isCompressedTexture||b.image[0].isCompressedTexture,K=b.image[0]&&b.image[0].isDataTexture,nt=[];for(let Y=0;Y<6;Y++)!_t&&!K?nt[Y]=x(b.image[Y],!0,n.maxCubemapSize):nt[Y]=K?b.image[Y].image:b.image[Y],nt[Y]=Tt(b,nt[Y]);const Dt=nt[0],Rt=s.convert(b.format,b.colorSpace),ut=s.convert(b.type),It=_(b.internalFormat,Rt,ut,b.colorSpace),I=b.isVideoTexture!==!0,lt=V.__version===void 0||q===!0,st=j.dataReady;let rt=E(b,Dt);Ht(r.TEXTURE_CUBE_MAP,b);let Q;if(_t){I&&lt&&e.texStorage2D(r.TEXTURE_CUBE_MAP,rt,It,Dt.width,Dt.height);for(let Y=0;Y<6;Y++){Q=nt[Y].mipmaps;for(let mt=0;mt<Q.length;mt++){const Ut=Q[mt];b.format!==li?Rt!==null?I?st&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,0,0,Ut.width,Ut.height,Rt,Ut.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,It,Ut.width,Ut.height,0,Ut.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,0,0,Ut.width,Ut.height,Rt,ut,Ut.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt,It,Ut.width,Ut.height,0,Rt,ut,Ut.data)}}}else{if(Q=b.mipmaps,I&&lt){Q.length>0&&rt++;const Y=Ft(nt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,rt,It,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(K){I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,nt[Y].width,nt[Y].height,Rt,ut,nt[Y].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,It,nt[Y].width,nt[Y].height,0,Rt,ut,nt[Y].data);for(let mt=0;mt<Q.length;mt++){const oe=Q[mt].image[Y].image;I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,0,0,oe.width,oe.height,Rt,ut,oe.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,It,oe.width,oe.height,0,Rt,ut,oe.data)}}else{I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Rt,ut,nt[Y]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,It,Rt,ut,nt[Y]);for(let mt=0;mt<Q.length;mt++){const Ut=Q[mt];I?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,0,0,Rt,ut,Ut.image[Y]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,mt+1,It,Rt,ut,Ut.image[Y])}}}m(b)&&f(r.TEXTURE_CUBE_MAP),V.__version=j.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ht(R,b,O,q,j,V){const vt=s.convert(O.format,O.colorSpace),ot=s.convert(O.type),Et=_(O.internalFormat,vt,ot,O.colorSpace),_t=i.get(b),K=i.get(O);if(K.__renderTarget=b,!_t.__hasExternalTextures){const nt=Math.max(1,b.width>>V),Dt=Math.max(1,b.height>>V);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,V,Et,nt,Dt,b.depth,0,vt,ot,null):e.texImage2D(j,V,Et,nt,Dt,0,vt,ot,null)}e.bindFramebuffer(r.FRAMEBUFFER,R),xt(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,q,j,K.__webglTexture,0,ae(b)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,q,j,K.__webglTexture,V),e.bindFramebuffer(r.FRAMEBUFFER,null)}function wt(R,b,O){if(r.bindRenderbuffer(r.RENDERBUFFER,R),b.depthBuffer){const q=b.depthTexture,j=q&&q.isDepthTexture?q.type:null,V=T(b.stencilBuffer,j),vt=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ot=ae(b);xt(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ot,V,b.width,b.height):O?r.renderbufferStorageMultisample(r.RENDERBUFFER,ot,V,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,V,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,vt,r.RENDERBUFFER,R)}else{const q=b.textures;for(let j=0;j<q.length;j++){const V=q[j],vt=s.convert(V.format,V.colorSpace),ot=s.convert(V.type),Et=_(V.internalFormat,vt,ot,V.colorSpace),_t=ae(b);O&&xt(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,_t,Et,b.width,b.height):xt(b)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,_t,Et,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,Et,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Mt(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const q=i.get(b.depthTexture);q.__renderTarget=b,(!q.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);const j=q.__webglTexture,V=ae(b);if(b.depthTexture.format===Qn)xt(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,V):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(b.depthTexture.format===ts)xt(b)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,V):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Nt(R){const b=i.get(R),O=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const q=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),q){const j=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),b.__depthDisposeCallback=j}b.__boundDepthTexture=q}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");const q=R.texture.mipmaps;q&&q.length>0?Mt(b.__webglFramebuffer[0],R):Mt(b.__webglFramebuffer,R)}else if(O){b.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[q]),b.__webglDepthbuffer[q]===void 0)b.__webglDepthbuffer[q]=r.createRenderbuffer(),wt(b.__webglDepthbuffer[q],R,!1);else{const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=b.__webglDepthbuffer[q];r.bindRenderbuffer(r.RENDERBUFFER,V),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,V)}}else{const q=R.texture.mipmaps;if(q&&q.length>0?e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),wt(b.__webglDepthbuffer,R,!1);else{const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,V=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,V),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,V)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function _e(R,b,O){const q=i.get(R);b!==void 0&&ht(q.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),O!==void 0&&Nt(R)}function zt(R){const b=R.texture,O=i.get(R),q=i.get(b);R.addEventListener("dispose",A);const j=R.textures,V=R.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(q.__webglTexture===void 0&&(q.__webglTexture=r.createTexture()),q.__version=b.version,a.memory.textures++),V){O.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer[ot]=[];for(let Et=0;Et<b.mipmaps.length;Et++)O.__webglFramebuffer[ot][Et]=r.createFramebuffer()}else O.__webglFramebuffer[ot]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer=[];for(let ot=0;ot<b.mipmaps.length;ot++)O.__webglFramebuffer[ot]=r.createFramebuffer()}else O.__webglFramebuffer=r.createFramebuffer();if(vt)for(let ot=0,Et=j.length;ot<Et;ot++){const _t=i.get(j[ot]);_t.__webglTexture===void 0&&(_t.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&xt(R)===!1){O.__webglMultisampledFramebuffer=r.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ot=0;ot<j.length;ot++){const Et=j[ot];O.__webglColorRenderbuffer[ot]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,O.__webglColorRenderbuffer[ot]);const _t=s.convert(Et.format,Et.colorSpace),K=s.convert(Et.type),nt=_(Et.internalFormat,_t,K,Et.colorSpace,R.isXRRenderTarget===!0),Dt=ae(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Dt,nt,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ot,r.RENDERBUFFER,O.__webglColorRenderbuffer[ot])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=r.createRenderbuffer(),wt(O.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(V){e.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Ht(r.TEXTURE_CUBE_MAP,b);for(let ot=0;ot<6;ot++)if(b.mipmaps&&b.mipmaps.length>0)for(let Et=0;Et<b.mipmaps.length;Et++)ht(O.__webglFramebuffer[ot][Et],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Et);else ht(O.__webglFramebuffer[ot],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);m(b)&&f(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let ot=0,Et=j.length;ot<Et;ot++){const _t=j[ot],K=i.get(_t);let nt=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(nt=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(nt,K.__webglTexture),Ht(nt,_t),ht(O.__webglFramebuffer,R,_t,r.COLOR_ATTACHMENT0+ot,nt,0),m(_t)&&f(nt)}e.unbindTexture()}else{let ot=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ot=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ot,q.__webglTexture),Ht(ot,b),b.mipmaps&&b.mipmaps.length>0)for(let Et=0;Et<b.mipmaps.length;Et++)ht(O.__webglFramebuffer[Et],R,b,r.COLOR_ATTACHMENT0,ot,Et);else ht(O.__webglFramebuffer,R,b,r.COLOR_ATTACHMENT0,ot,0);m(b)&&f(ot),e.unbindTexture()}R.depthBuffer&&Nt(R)}function he(R){const b=R.textures;for(let O=0,q=b.length;O<q;O++){const j=b[O];if(m(j)){const V=y(R),vt=i.get(j).__webglTexture;e.bindTexture(V,vt),f(V),e.unbindTexture()}}}const P=[],Vt=[];function Wt(R){if(R.samples>0){if(xt(R)===!1){const b=R.textures,O=R.width,q=R.height;let j=r.COLOR_BUFFER_BIT;const V=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,vt=i.get(R),ot=b.length>1;if(ot)for(let _t=0;_t<b.length;_t++)e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const Et=R.texture.mipmaps;Et&&Et.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let _t=0;_t<b.length;_t++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),ot){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,vt.__webglColorRenderbuffer[_t]);const K=i.get(b[_t]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,K,0)}r.blitFramebuffer(0,0,O,q,0,0,O,q,j,r.NEAREST),l===!0&&(P.length=0,Vt.length=0,P.push(r.COLOR_ATTACHMENT0+_t),R.depthBuffer&&R.resolveDepthBuffer===!1&&(P.push(V),Vt.push(V),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Vt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,P))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ot)for(let _t=0;_t<b.length;_t++){e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.RENDERBUFFER,vt.__webglColorRenderbuffer[_t]);const K=i.get(b[_t]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,vt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+_t,r.TEXTURE_2D,K,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function ae(R){return Math.min(n.maxSamples,R.samples)}function xt(R){const b=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ce(R){const b=a.render.frame;c.get(R)!==b&&(c.set(R,b),R.update())}function Tt(R,b){const O=R.colorSpace,q=R.format,j=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==Ln&&O!==Bi&&(Zt.getTransfer(O)===ie?(q!==li||j!==xi)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",O)),b}function Ft(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(h.width=R.naturalWidth||R.width,h.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(h.width=R.displayWidth,h.height=R.displayHeight):(h.width=R.width,h.height=R.height),h}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=$,this.setTexture3D=J,this.setTextureCube=k,this.rebindTextures=_e,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=Wt,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=xt}function hm(r,t){function e(i,n=Bi){let s;const a=Zt.getTransfer(n);if(i===xi)return r.UNSIGNED_BYTE;if(i===Ia)return r.UNSIGNED_SHORT_4_4_4_4;if(i===La)return r.UNSIGNED_SHORT_5_5_5_1;if(i===xl)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===_l)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===ml)return r.BYTE;if(i===gl)return r.SHORT;if(i===Kn)return r.UNSIGNED_SHORT;if(i===Pa)return r.INT;if(i===en)return r.UNSIGNED_INT;if(i===mi)return r.FLOAT;if(i===Nn)return r.HALF_FLOAT;if(i===Ml)return r.ALPHA;if(i===vl)return r.RGB;if(i===li)return r.RGBA;if(i===Qn)return r.DEPTH_COMPONENT;if(i===ts)return r.DEPTH_STENCIL;if(i===Ua)return r.RED;if(i===Fa)return r.RED_INTEGER;if(i===Na)return r.RG;if(i===Ba)return r.RG_INTEGER;if(i===Oa)return r.RGBA_INTEGER;if(i===Ns||i===Bs||i===Os||i===zs)if(a===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ns)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Os)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ns)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Bs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Os)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===zs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===jr||i===Kr||i===Jr||i===Qr)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===jr)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Kr)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Jr)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Qr)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ta||i===ea||i===ia)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ta||i===ea)return a===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ia)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===na||i===sa||i===ra||i===aa||i===oa||i===la||i===ha||i===ca||i===da||i===ua||i===fa||i===pa||i===ma||i===ga)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===na)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===sa)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ra)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===aa)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oa)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===la)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ha)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===ca)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===da)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ua)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===fa)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===pa)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ma)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ga)return a===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xa||i===_a||i===Ma)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===xa)return a===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_a)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ma)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===va||i===ba||i===ya||i===Sa)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===va)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ba)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ya)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Jn?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:e}}const cm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dm=`
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

}`;class um{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Nl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new _i({vertexShader:cm,fragmentShader:dm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new Vi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fm extends rn{constructor(t,e){super();const i=this;let n=null,s=1,a=null,o="local-floor",l=1,h=null,c=null,u=null,d=null,p=null,g=null;const x=typeof XRWebGLBinding<"u",m=new um,f={},y=e.getContextAttributes();let _=null,T=null;const E=[],M=[],A=new bt;let D=null;const v=new oi;v.viewport=new ge;const S=new oi;S.viewport=new ge;const C=[v,S],U=new Cc;let B=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=E[X];return Z===void 0&&(Z=new Sr,E[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=E[X];return Z===void 0&&(Z=new Sr,E[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=E[X];return Z===void 0&&(Z=new Sr,E[X]=Z),Z.getHandSpace()};function W(X){const Z=M.indexOf(X.inputSource);if(Z===-1)return;const ht=E[Z];ht!==void 0&&(ht.update(X.inputSource,X.frame,h||a),ht.dispatchEvent({type:X.type,data:X.inputSource}))}function $(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",$),n.removeEventListener("inputsourceschange",J);for(let X=0;X<E.length;X++){const Z=M[X];Z!==null&&(M[X]=null,E[X].disconnect(Z))}B=null,H=null,m.reset();for(const X in f)delete f[X];t.setRenderTarget(_),p=null,d=null,u=null,n=null,T=null,Qt.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||a},this.setReferenceSpace=function(X){h=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return g},this.getSession=function(){return n},this.setSession=async function(X){if(n=X,n!==null){if(_=t.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",$),n.addEventListener("inputsourceschange",J),y.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ht=null,wt=null,Mt=null;y.depth&&(Mt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=y.stencil?ts:Qn,wt=y.stencil?Jn:en);const Nt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Nt),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),T=new sn(d.textureWidth,d.textureHeight,{format:li,type:xi,depthTexture:new Fl(d.textureWidth,d.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ht={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(n,e,ht),n.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),T=new sn(p.framebufferWidth,p.framebufferHeight,{format:li,type:xi,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(l),h=null,a=await n.requestReferenceSpace(o),Qt.setContext(n),Qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function J(X){for(let Z=0;Z<X.removed.length;Z++){const ht=X.removed[Z],wt=M.indexOf(ht);wt>=0&&(M[wt]=null,E[wt].disconnect(ht))}for(let Z=0;Z<X.added.length;Z++){const ht=X.added[Z];let wt=M.indexOf(ht);if(wt===-1){for(let Nt=0;Nt<E.length;Nt++)if(Nt>=M.length){M.push(ht),wt=Nt;break}else if(M[Nt]===null){M[Nt]=ht,wt=Nt;break}if(wt===-1)break}const Mt=E[wt];Mt&&Mt.connect(ht)}}const k=new L,et=new L;function it(X,Z,ht){k.setFromMatrixPosition(Z.matrixWorld),et.setFromMatrixPosition(ht.matrixWorld);const wt=k.distanceTo(et),Mt=Z.projectionMatrix.elements,Nt=ht.projectionMatrix.elements,_e=Mt[14]/(Mt[10]-1),zt=Mt[14]/(Mt[10]+1),he=(Mt[9]+1)/Mt[5],P=(Mt[9]-1)/Mt[5],Vt=(Mt[8]-1)/Mt[0],Wt=(Nt[8]+1)/Nt[0],ae=_e*Vt,xt=_e*Wt,ce=wt/(-Vt+Wt),Tt=ce*-Vt;if(Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Tt),X.translateZ(ce),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Mt[10]===-1)X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{const Ft=_e+ce,R=zt+ce,b=ae-Tt,O=xt+(wt-Tt),q=he*zt/R*Ft,j=P*zt/R*Ft;X.projectionMatrix.makePerspective(b,O,q,j,Ft,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function yt(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(n===null)return;let Z=X.near,ht=X.far;m.texture!==null&&(m.depthNear>0&&(Z=m.depthNear),m.depthFar>0&&(ht=m.depthFar)),U.near=S.near=v.near=Z,U.far=S.far=v.far=ht,(B!==U.near||H!==U.far)&&(n.updateRenderState({depthNear:U.near,depthFar:U.far}),B=U.near,H=U.far),U.layers.mask=X.layers.mask|6,v.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const wt=X.parent,Mt=U.cameras;yt(U,wt);for(let Nt=0;Nt<Mt.length;Nt++)yt(Mt[Nt],wt);Mt.length===2?it(U,v,S):U.projectionMatrix.copy(v.projectionMatrix),Ht(X,U,wt)};function Ht(X,Z,ht){ht===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(ht.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=wa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(X){return f[X]};let qt=null;function Yt(X,Z){if(c=Z.getViewerPose(h||a),g=Z,c!==null){const ht=c.views;p!==null&&(t.setRenderTargetFramebuffer(T,p.framebuffer),t.setRenderTarget(T));let wt=!1;ht.length!==U.cameras.length&&(U.cameras.length=0,wt=!0);for(let zt=0;zt<ht.length;zt++){const he=ht[zt];let P=null;if(p!==null)P=p.getViewport(he);else{const Wt=u.getViewSubImage(d,he);P=Wt.viewport,zt===0&&(t.setRenderTargetTextures(T,Wt.colorTexture,Wt.depthStencilTexture),t.setRenderTarget(T))}let Vt=C[zt];Vt===void 0&&(Vt=new oi,Vt.layers.enable(zt),Vt.viewport=new ge,C[zt]=Vt),Vt.matrix.fromArray(he.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(he.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set(P.x,P.y,P.width,P.height),zt===0&&(U.matrix.copy(Vt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),wt===!0&&U.cameras.push(Vt)}const Mt=n.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){u=i.getBinding();const zt=u.getDepthInformation(ht[0]);zt&&zt.isValid&&zt.texture&&m.init(zt,n.renderState)}if(Mt&&Mt.includes("camera-access")&&x){t.state.unbindTexture(),u=i.getBinding();for(let zt=0;zt<ht.length;zt++){const he=ht[zt].camera;if(he){let P=f[he];P||(P=new Nl,f[he]=P);const Vt=u.getCameraImage(he);P.sourceTexture=Vt}}}}for(let ht=0;ht<E.length;ht++){const wt=M[ht],Mt=E[ht];wt!==null&&Mt!==void 0&&Mt.update(wt,Z,h||a)}qt&&qt(X,Z),Z.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Z}),g=null}const Qt=new Ol;Qt.setAnimationLoop(Yt),this.setAnimationLoop=function(X){qt=X},this.dispose=function(){}}}const Ki=new ci,pm=new Kt;function mm(r,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Al(r)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function n(m,f,y,_,T){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),c(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,T)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),x(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,y,_):f.isSpriteMaterial?h(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ze&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ze&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=t.get(f),_=y.envMap,T=y.envMapRotation;_&&(m.envMap.value=_,Ki.copy(T),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),m.envMapRotation.value.setFromMatrix4(pm.makeRotationFromEuler(Ki)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,y,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=_*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ze&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function gm(r,t,e,i){let n={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,_){const T=_.program;i.uniformBlockBinding(y,T)}function h(y,_){let T=n[y.id];T===void 0&&(g(y),T=c(y),n[y.id]=T,y.addEventListener("dispose",m));const E=_.program;i.updateUBOMapping(y,E);const M=t.render.frame;s[y.id]!==M&&(d(y),s[y.id]=M)}function c(y){const _=u();y.__bindingPointIndex=_;const T=r.createBuffer(),E=y.__size,M=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,T),r.bufferData(r.UNIFORM_BUFFER,E,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,T),T}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=n[y.id],T=y.uniforms,E=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let M=0,A=T.length;M<A;M++){const D=Array.isArray(T[M])?T[M]:[T[M]];for(let v=0,S=D.length;v<S;v++){const C=D[v];if(p(C,M,v,E)===!0){const U=C.__offset,B=Array.isArray(C.value)?C.value:[C.value];let H=0;for(let W=0;W<B.length;W++){const $=B[W],J=x($);typeof $=="number"||typeof $=="boolean"?(C.__data[0]=$,r.bufferSubData(r.UNIFORM_BUFFER,U+H,C.__data)):$.isMatrix3?(C.__data[0]=$.elements[0],C.__data[1]=$.elements[1],C.__data[2]=$.elements[2],C.__data[3]=0,C.__data[4]=$.elements[3],C.__data[5]=$.elements[4],C.__data[6]=$.elements[5],C.__data[7]=0,C.__data[8]=$.elements[6],C.__data[9]=$.elements[7],C.__data[10]=$.elements[8],C.__data[11]=0):($.toArray(C.__data,H),H+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(y,_,T,E){const M=y.value,A=_+"_"+T;if(E[A]===void 0)return typeof M=="number"||typeof M=="boolean"?E[A]=M:E[A]=M.clone(),!0;{const D=E[A];if(typeof M=="number"||typeof M=="boolean"){if(D!==M)return E[A]=M,!0}else if(D.equals(M)===!1)return D.copy(M),!0}return!1}function g(y){const _=y.uniforms;let T=0;const E=16;for(let A=0,D=_.length;A<D;A++){const v=Array.isArray(_[A])?_[A]:[_[A]];for(let S=0,C=v.length;S<C;S++){const U=v[S],B=Array.isArray(U.value)?U.value:[U.value];for(let H=0,W=B.length;H<W;H++){const $=B[H],J=x($),k=T%E,et=k%J.boundary,it=k+et;T+=et,it!==0&&E-it<J.storage&&(T+=E-it),U.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=J.storage}}}const M=T%E;return M>0&&(T+=E-M),y.__size=T,y.__cache={},this}function x(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Lt("WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const T=a.indexOf(_.__bindingPointIndex);a.splice(T,1),r.deleteBuffer(n[_.id]),delete n[_.id],delete s[_.id]}function f(){for(const y in n)r.deleteBuffer(n[y]);a=[],n={},s={}}return{bind:l,update:h,dispose:f}}const xm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let wi=null;function _m(){return wi===null&&(wi=new Il(xm,32,32,Na,Nn),wi.minFilter=ei,wi.magFilter=ei,wi.wrapS=Ai,wi.wrapT=Ai,wi.generateMipmaps=!1,wi.needsUpdate=!0),wi}class Mm{constructor(t={}){const{canvas:e=zh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const g=new Set([Oa,Ba,Fa]),x=new Set([xi,en,Kn,Jn,Ia,La]),m=new Uint32Array(4),f=new Int32Array(4);let y=null,_=null;const T=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Gi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let A=!1;this._outputColorSpace=Ze;let D=0,v=0,S=null,C=-1,U=null;const B=new ge,H=new ge;let W=null;const $=new dt(0);let J=0,k=e.width,et=e.height,it=1,yt=null,Ht=null;const qt=new ge(0,0,k,et),Yt=new ge(0,0,k,et);let Qt=!1;const X=new ns;let Z=!1,ht=!1;const wt=new Kt,Mt=new L,Nt=new ge,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let zt=!1;function he(){return S===null?it:1}let P=i;function Vt(w,F){return e.getContext(w,F)}try{const w={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ca}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",Y,!1),e.addEventListener("webglcontextcreationerror",mt,!1),P===null){const F="webgl2";if(P=Vt(F,w),P===null)throw Vt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw w("WebGLRenderer: "+w.message),w}let Wt,ae,xt,ce,Tt,Ft,R,b,O,q,j,V,vt,ot,Et,_t,K,nt,Dt,Rt,ut,It,I,lt;function st(){Wt=new Af(P),Wt.init(),It=new hm(P,Wt),ae=new _f(P,Wt,t,It),xt=new om(P,Wt),ae.reversedDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),ce=new Df(P),Tt=new Zp,Ft=new lm(P,Wt,xt,Tt,ae,It,ce),R=new vf(M),b=new Ef(M),O=new Lc(P),I=new gf(P,O),q=new Rf(P,O,ce,I),j=new If(P,q,O,ce),Dt=new Pf(P,ae,Ft),_t=new Mf(Tt),V=new $p(M,R,b,Wt,ae,I,_t),vt=new mm(M,Tt),ot=new jp,Et=new im(Wt),nt=new mf(M,R,b,xt,j,p,l),K=new rm(M,j,ae),lt=new gm(P,ce,ae,xt),Rt=new xf(P,Wt,ce),ut=new Cf(P,Wt,ce),ce.programs=V.programs,M.capabilities=ae,M.extensions=Wt,M.properties=Tt,M.renderLists=ot,M.shadowMap=K,M.state=xt,M.info=ce}st();const rt=new fm(M,P);this.xr=rt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=Wt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Wt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(w){w!==void 0&&(it=w,this.setSize(k,et,!1))},this.getSize=function(w){return w.set(k,et)},this.setSize=function(w,F,z=!0){if(rt.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}k=w,et=F,e.width=Math.floor(w*it),e.height=Math.floor(F*it),z===!0&&(e.style.width=w+"px",e.style.height=F+"px"),this.setViewport(0,0,w,F)},this.getDrawingBufferSize=function(w){return w.set(k*it,et*it).floor()},this.setDrawingBufferSize=function(w,F,z){k=w,et=F,it=z,e.width=Math.floor(w*z),e.height=Math.floor(F*z),this.setViewport(0,0,w,F)},this.getCurrentViewport=function(w){return w.copy(B)},this.getViewport=function(w){return w.copy(qt)},this.setViewport=function(w,F,z,G){w.isVector4?qt.set(w.x,w.y,w.z,w.w):qt.set(w,F,z,G),xt.viewport(B.copy(qt).multiplyScalar(it).round())},this.getScissor=function(w){return w.copy(Yt)},this.setScissor=function(w,F,z,G){w.isVector4?Yt.set(w.x,w.y,w.z,w.w):Yt.set(w,F,z,G),xt.scissor(H.copy(Yt).multiplyScalar(it).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(w){xt.setScissorTest(Qt=w)},this.setOpaqueSort=function(w){yt=w},this.setTransparentSort=function(w){Ht=w},this.getClearColor=function(w){return w.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(w=!0,F=!0,z=!0){let G=0;if(w){let N=!1;if(S!==null){const tt=S.texture.format;N=g.has(tt)}if(N){const tt=S.texture.type,ct=x.has(tt),gt=nt.getClearColor(),ft=nt.getClearAlpha(),Ct=gt.r,Pt=gt.g,St=gt.b;ct?(m[0]=Ct,m[1]=Pt,m[2]=St,m[3]=ft,P.clearBufferuiv(P.COLOR,0,m)):(f[0]=Ct,f[1]=Pt,f[2]=St,f[3]=ft,P.clearBufferiv(P.COLOR,0,f))}else G|=P.COLOR_BUFFER_BIT}F&&(G|=P.DEPTH_BUFFER_BIT),z&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",Y,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),nt.dispose(),ot.dispose(),Et.dispose(),Tt.dispose(),R.dispose(),b.dispose(),j.dispose(),I.dispose(),lt.dispose(),V.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Xa),rt.removeEventListener("sessionend",qa),Wi.stop()};function Q(w){w.preventDefault(),Xs("WebGLRenderer: Context Lost."),A=!0}function Y(){Xs("WebGLRenderer: Context Restored."),A=!1;const w=ce.autoReset,F=K.enabled,z=K.autoUpdate,G=K.needsUpdate,N=K.type;st(),ce.autoReset=w,K.enabled=F,K.autoUpdate=z,K.needsUpdate=G,K.type=N}function mt(w){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ut(w){const F=w.target;F.removeEventListener("dispose",Ut),oe(F)}function oe(w){te(w),Tt.remove(w)}function te(w){const F=Tt.get(w).programs;F!==void 0&&(F.forEach(function(z){V.releaseProgram(z)}),w.isShaderMaterial&&V.releaseShaderCache(w))}this.renderBufferDirect=function(w,F,z,G,N,tt){F===null&&(F=_e);const ct=N.isMesh&&N.matrixWorld.determinant()<0,gt=ql(w,F,z,G,N);xt.setMaterial(G,ct);let ft=z.index,Ct=1;if(G.wireframe===!0){if(ft=q.getWireframeAttribute(z),ft===void 0)return;Ct=2}const Pt=z.drawRange,St=z.attributes.position;let Xt=Pt.start*Ct,ee=(Pt.start+Pt.count)*Ct;tt!==null&&(Xt=Math.max(Xt,tt.start*Ct),ee=Math.min(ee,(tt.start+tt.count)*Ct)),ft!==null?(Xt=Math.max(Xt,0),ee=Math.min(ee,ft.count)):St!=null&&(Xt=Math.max(Xt,0),ee=Math.min(ee,St.count));const pe=ee-Xt;if(pe<0||pe===1/0)return;I.setup(N,G,gt,z,ft);let me,re=Rt;if(ft!==null&&(me=O.get(ft),re=ut,re.setIndex(me)),N.isMesh)G.wireframe===!0?(xt.setLineWidth(G.wireframeLinewidth*he()),re.setMode(P.LINES)):re.setMode(P.TRIANGLES);else if(N.isLine){let At=G.linewidth;At===void 0&&(At=1),xt.setLineWidth(At*he()),N.isLineSegments?re.setMode(P.LINES):N.isLineLoop?re.setMode(P.LINE_LOOP):re.setMode(P.LINE_STRIP)}else N.isPoints?re.setMode(P.POINTS):N.isSprite&&re.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)es("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Wt.get("WEBGL_multi_draw"))re.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const At=N._multiDrawStarts,de=N._multiDrawCounts,$t=N._multiDrawCount,ke=ft?O.get(ft).bytesPerElement:1,on=Tt.get(G).currentProgram.getUniforms();for(let He=0;He<$t;He++)on.setValue(P,"_gl_DrawID",He),re.render(At[He]/ke,de[He])}else if(N.isInstancedMesh)re.renderInstances(Xt,pe,N.count);else if(z.isInstancedBufferGeometry){const At=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,de=Math.min(z.instanceCount,At);re.renderInstances(Xt,pe,de)}else re.render(Xt,pe)};function ui(w,F,z){w.transparent===!0&&w.side===Ye&&w.forceSinglePass===!1?(w.side=ze,w.needsUpdate=!0,as(w,F,z),w.side=Hi,w.needsUpdate=!0,as(w,F,z),w.side=Ye):as(w,F,z)}this.compile=function(w,F,z=null){z===null&&(z=w),_=Et.get(z),_.init(F),E.push(_),z.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(_.pushLight(N),N.castShadow&&_.pushShadow(N))}),w!==z&&w.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(_.pushLight(N),N.castShadow&&_.pushShadow(N))}),_.setupLights();const G=new Set;return w.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const tt=N.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){const gt=tt[ct];ui(gt,z,N),G.add(gt)}else ui(tt,z,N),G.add(tt)}),_=E.pop(),G},this.compileAsync=function(w,F,z=null){const G=this.compile(w,F,z);return new Promise(N=>{function tt(){if(G.forEach(function(ct){Tt.get(ct).currentProgram.isReady()&&G.delete(ct)}),G.size===0){N(w);return}setTimeout(tt,10)}Wt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let ni=null;function Xl(w){ni&&ni(w)}function Xa(){Wi.stop()}function qa(){Wi.start()}const Wi=new Ol;Wi.setAnimationLoop(Xl),typeof self<"u"&&Wi.setContext(self),this.setAnimationLoop=function(w){ni=w,rt.setAnimationLoop(w),w===null?Wi.stop():Wi.start()},rt.addEventListener("sessionstart",Xa),rt.addEventListener("sessionend",qa),this.render=function(w,F){if(F!==void 0&&F.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(F),F=rt.getCamera()),w.isScene===!0&&w.onBeforeRender(M,w,F,S),_=Et.get(w,E.length),_.init(F),E.push(_),wt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),X.setFromProjectionMatrix(wt,gi,F.reversedDepth),ht=this.localClippingEnabled,Z=_t.init(this.clippingPlanes,ht),y=ot.get(w,T.length),y.init(),T.push(y),rt.enabled===!0&&rt.isPresenting===!0){const tt=M.xr.getDepthSensingMesh();tt!==null&&Qs(tt,F,-1/0,M.sortObjects)}Qs(w,F,0,M.sortObjects),y.finish(),M.sortObjects===!0&&y.sort(yt,Ht),zt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,zt&&nt.addToRenderList(y,w),this.info.render.frame++,Z===!0&&_t.beginShadows();const z=_.state.shadowsArray;K.render(z,w,F),Z===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=y.opaque,N=y.transmissive;if(_.setupLights(),F.isArrayCamera){const tt=F.cameras;if(N.length>0)for(let ct=0,gt=tt.length;ct<gt;ct++){const ft=tt[ct];Za(G,N,w,ft)}zt&&nt.render(w);for(let ct=0,gt=tt.length;ct<gt;ct++){const ft=tt[ct];$a(y,w,ft,ft.viewport)}}else N.length>0&&Za(G,N,w,F),zt&&nt.render(w),$a(y,w,F);S!==null&&v===0&&(Ft.updateMultisampleRenderTarget(S),Ft.updateRenderTargetMipmap(S)),w.isScene===!0&&w.onAfterRender(M,w,F),I.resetDefaultState(),C=-1,U=null,E.pop(),E.length>0?(_=E[E.length-1],Z===!0&&_t.setGlobalState(M.clippingPlanes,_.state.camera)):_=null,T.pop(),T.length>0?y=T[T.length-1]:y=null};function Qs(w,F,z,G){if(w.visible===!1)return;if(w.layers.test(F.layers)){if(w.isGroup)z=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(F);else if(w.isLight)_.pushLight(w),w.castShadow&&_.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){G&&Nt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(wt);const ct=j.update(w),gt=w.material;gt.visible&&y.push(w,ct,gt,z,Nt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){const ct=j.update(w),gt=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Nt.copy(w.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Nt.copy(ct.boundingSphere.center)),Nt.applyMatrix4(w.matrixWorld).applyMatrix4(wt)),Array.isArray(gt)){const ft=ct.groups;for(let Ct=0,Pt=ft.length;Ct<Pt;Ct++){const St=ft[Ct],Xt=gt[St.materialIndex];Xt&&Xt.visible&&y.push(w,ct,Xt,z,Nt.z,St)}}else gt.visible&&y.push(w,ct,gt,z,Nt.z,null)}}const tt=w.children;for(let ct=0,gt=tt.length;ct<gt;ct++)Qs(tt[ct],F,z,G)}function $a(w,F,z,G){const{opaque:N,transmissive:tt,transparent:ct}=w;_.setupLightsView(z),Z===!0&&_t.setGlobalState(M.clippingPlanes,z),G&&xt.viewport(B.copy(G)),N.length>0&&rs(N,F,z),tt.length>0&&rs(tt,F,z),ct.length>0&&rs(ct,F,z),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function Za(w,F,z,G){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[G.id]===void 0&&(_.state.transmissionRenderTarget[G.id]=new sn(1,1,{generateMipmaps:!0,type:Wt.has("EXT_color_buffer_half_float")||Wt.has("EXT_color_buffer_float")?Nn:xi,minFilter:Oi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace}));const tt=_.state.transmissionRenderTarget[G.id],ct=G.viewport||B;tt.setSize(ct.z*M.transmissionResolutionScale,ct.w*M.transmissionResolutionScale);const gt=M.getRenderTarget(),ft=M.getActiveCubeFace(),Ct=M.getActiveMipmapLevel();M.setRenderTarget(tt),M.getClearColor($),J=M.getClearAlpha(),J<1&&M.setClearColor(16777215,.5),M.clear(),zt&&nt.render(z);const Pt=M.toneMapping;M.toneMapping=Gi;const St=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),_.setupLightsView(G),Z===!0&&_t.setGlobalState(M.clippingPlanes,G),rs(w,z,G),Ft.updateMultisampleRenderTarget(tt),Ft.updateRenderTargetMipmap(tt),Wt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let ee=0,pe=F.length;ee<pe;ee++){const me=F[ee],{object:re,geometry:At,material:de,group:$t}=me;if(de.side===Ye&&re.layers.test(G.layers)){const ke=de.side;de.side=ze,de.needsUpdate=!0,Ya(re,z,G,At,de,$t),de.side=ke,de.needsUpdate=!0,Xt=!0}}Xt===!0&&(Ft.updateMultisampleRenderTarget(tt),Ft.updateRenderTargetMipmap(tt))}M.setRenderTarget(gt,ft,Ct),M.setClearColor($,J),St!==void 0&&(G.viewport=St),M.toneMapping=Pt}function rs(w,F,z){const G=F.isScene===!0?F.overrideMaterial:null;for(let N=0,tt=w.length;N<tt;N++){const ct=w[N],{object:gt,geometry:ft,group:Ct}=ct;let Pt=ct.material;Pt.allowOverride===!0&&G!==null&&(Pt=G),gt.layers.test(z.layers)&&Ya(gt,F,z,ft,Pt,Ct)}}function Ya(w,F,z,G,N,tt){w.onBeforeRender(M,F,z,G,N,tt),w.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(M,F,z,G,w,tt),N.transparent===!0&&N.side===Ye&&N.forceSinglePass===!1?(N.side=ze,N.needsUpdate=!0,M.renderBufferDirect(z,F,G,N,w,tt),N.side=Hi,N.needsUpdate=!0,M.renderBufferDirect(z,F,G,N,w,tt),N.side=Ye):M.renderBufferDirect(z,F,G,N,w,tt),w.onAfterRender(M,F,z,G,N,tt)}function as(w,F,z){F.isScene!==!0&&(F=_e);const G=Tt.get(w),N=_.state.lights,tt=_.state.shadowsArray,ct=N.state.version,gt=V.getParameters(w,N.state,tt,F,z),ft=V.getProgramCacheKey(gt);let Ct=G.programs;G.environment=w.isMeshStandardMaterial?F.environment:null,G.fog=F.fog,G.envMap=(w.isMeshStandardMaterial?b:R).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?F.environmentRotation:w.envMapRotation,Ct===void 0&&(w.addEventListener("dispose",Ut),Ct=new Map,G.programs=Ct);let Pt=Ct.get(ft);if(Pt!==void 0){if(G.currentProgram===Pt&&G.lightsStateVersion===ct)return Ka(w,gt),Pt}else gt.uniforms=V.getUniforms(w),w.onBeforeCompile(gt,M),Pt=V.acquireProgram(gt,ft),Ct.set(ft,Pt),G.uniforms=gt.uniforms;const St=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(St.clippingPlanes=_t.uniform),Ka(w,gt),G.needsLights=Zl(w),G.lightsStateVersion=ct,G.needsLights&&(St.ambientLightColor.value=N.state.ambient,St.lightProbe.value=N.state.probe,St.directionalLights.value=N.state.directional,St.directionalLightShadows.value=N.state.directionalShadow,St.spotLights.value=N.state.spot,St.spotLightShadows.value=N.state.spotShadow,St.rectAreaLights.value=N.state.rectArea,St.ltc_1.value=N.state.rectAreaLTC1,St.ltc_2.value=N.state.rectAreaLTC2,St.pointLights.value=N.state.point,St.pointLightShadows.value=N.state.pointShadow,St.hemisphereLights.value=N.state.hemi,St.directionalShadowMap.value=N.state.directionalShadowMap,St.directionalShadowMatrix.value=N.state.directionalShadowMatrix,St.spotShadowMap.value=N.state.spotShadowMap,St.spotLightMatrix.value=N.state.spotLightMatrix,St.spotLightMap.value=N.state.spotLightMap,St.pointShadowMap.value=N.state.pointShadowMap,St.pointShadowMatrix.value=N.state.pointShadowMatrix),G.currentProgram=Pt,G.uniformsList=null,Pt}function ja(w){if(w.uniformsList===null){const F=w.currentProgram.getUniforms();w.uniformsList=ks.seqWithValue(F.seq,w.uniforms)}return w.uniformsList}function Ka(w,F){const z=Tt.get(w);z.outputColorSpace=F.outputColorSpace,z.batching=F.batching,z.batchingColor=F.batchingColor,z.instancing=F.instancing,z.instancingColor=F.instancingColor,z.instancingMorph=F.instancingMorph,z.skinning=F.skinning,z.morphTargets=F.morphTargets,z.morphNormals=F.morphNormals,z.morphColors=F.morphColors,z.morphTargetsCount=F.morphTargetsCount,z.numClippingPlanes=F.numClippingPlanes,z.numIntersection=F.numClipIntersection,z.vertexAlphas=F.vertexAlphas,z.vertexTangents=F.vertexTangents,z.toneMapping=F.toneMapping}function ql(w,F,z,G,N){F.isScene!==!0&&(F=_e),Ft.resetTextureUnits();const tt=F.fog,ct=G.isMeshStandardMaterial?F.environment:null,gt=S===null?M.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Ln,ft=(G.isMeshStandardMaterial?b:R).get(G.envMap||ct),Ct=G.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Pt=!!z.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),St=!!z.morphAttributes.position,Xt=!!z.morphAttributes.normal,ee=!!z.morphAttributes.color;let pe=Gi;G.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(pe=M.toneMapping);const me=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,re=me!==void 0?me.length:0,At=Tt.get(G),de=_.state.lights;if(Z===!0&&(ht===!0||w!==U)){const De=w===U&&G.id===C;_t.setState(G,w,De)}let $t=!1;G.version===At.__version?(At.needsLights&&At.lightsStateVersion!==de.state.version||At.outputColorSpace!==gt||N.isBatchedMesh&&At.batching===!1||!N.isBatchedMesh&&At.batching===!0||N.isBatchedMesh&&At.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&At.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&At.instancing===!1||!N.isInstancedMesh&&At.instancing===!0||N.isSkinnedMesh&&At.skinning===!1||!N.isSkinnedMesh&&At.skinning===!0||N.isInstancedMesh&&At.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&At.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&At.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&At.instancingMorph===!1&&N.morphTexture!==null||At.envMap!==ft||G.fog===!0&&At.fog!==tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==_t.numPlanes||At.numIntersection!==_t.numIntersection)||At.vertexAlphas!==Ct||At.vertexTangents!==Pt||At.morphTargets!==St||At.morphNormals!==Xt||At.morphColors!==ee||At.toneMapping!==pe||At.morphTargetsCount!==re)&&($t=!0):($t=!0,At.__version=G.version);let ke=At.currentProgram;$t===!0&&(ke=as(G,F,N));let on=!1,He=!1,On=!1;const ue=ke.getUniforms(),Ne=At.uniforms;if(xt.useProgram(ke.program)&&(on=!0,He=!0,On=!0),G.id!==C&&(C=G.id,He=!0),on||U!==w){xt.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),ue.setValue(P,"projectionMatrix",w.projectionMatrix),ue.setValue(P,"viewMatrix",w.matrixWorldInverse);const Be=ue.map.cameraPosition;Be!==void 0&&Be.setValue(P,Mt.setFromMatrixPosition(w.matrixWorld)),ae.logarithmicDepthBuffer&&ue.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ue.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),U!==w&&(U=w,He=!0,On=!0)}if(N.isSkinnedMesh){ue.setOptional(P,N,"bindMatrix"),ue.setOptional(P,N,"bindMatrixInverse");const De=N.skeleton;De&&(De.boneTexture===null&&De.computeBoneTexture(),ue.setValue(P,"boneTexture",De.boneTexture,Ft))}N.isBatchedMesh&&(ue.setOptional(P,N,"batchingTexture"),ue.setValue(P,"batchingTexture",N._matricesTexture,Ft),ue.setOptional(P,N,"batchingIdTexture"),ue.setValue(P,"batchingIdTexture",N._indirectTexture,Ft),ue.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&ue.setValue(P,"batchingColorTexture",N._colorsTexture,Ft));const Ke=z.morphAttributes;if((Ke.position!==void 0||Ke.normal!==void 0||Ke.color!==void 0)&&Dt.update(N,z,ke),(He||At.receiveShadow!==N.receiveShadow)&&(At.receiveShadow=N.receiveShadow,ue.setValue(P,"receiveShadow",N.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Ne.envMap.value=ft,Ne.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&F.environment!==null&&(Ne.envMapIntensity.value=F.environmentIntensity),Ne.dfgLUT!==void 0&&(Ne.dfgLUT.value=_m()),He&&(ue.setValue(P,"toneMappingExposure",M.toneMappingExposure),At.needsLights&&$l(Ne,On),tt&&G.fog===!0&&vt.refreshFogUniforms(Ne,tt),vt.refreshMaterialUniforms(Ne,G,it,et,_.state.transmissionRenderTarget[w.id]),ks.upload(P,ja(At),Ne,Ft)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ks.upload(P,ja(At),Ne,Ft),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ue.setValue(P,"center",N.center),ue.setValue(P,"modelViewMatrix",N.modelViewMatrix),ue.setValue(P,"normalMatrix",N.normalMatrix),ue.setValue(P,"modelMatrix",N.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const De=G.uniformsGroups;for(let Be=0,tr=De.length;Be<tr;Be++){const Xi=De[Be];lt.update(Xi,ke),lt.bind(Xi,ke)}}return ke}function $l(w,F){w.ambientLightColor.needsUpdate=F,w.lightProbe.needsUpdate=F,w.directionalLights.needsUpdate=F,w.directionalLightShadows.needsUpdate=F,w.pointLights.needsUpdate=F,w.pointLightShadows.needsUpdate=F,w.spotLights.needsUpdate=F,w.spotLightShadows.needsUpdate=F,w.rectAreaLights.needsUpdate=F,w.hemisphereLights.needsUpdate=F}function Zl(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return v},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(w,F,z){const G=Tt.get(w);G.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Tt.get(w.texture).__webglTexture=F,Tt.get(w.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:z,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,F){const z=Tt.get(w);z.__webglFramebuffer=F,z.__useDefaultFramebuffer=F===void 0};const Yl=P.createFramebuffer();this.setRenderTarget=function(w,F=0,z=0){S=w,D=F,v=z;let G=!0,N=null,tt=!1,ct=!1;if(w){const ft=Tt.get(w);if(ft.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(ft.__webglFramebuffer===void 0)Ft.setupRenderTarget(w);else if(ft.__hasExternalTextures)Ft.rebindTextures(w,Tt.get(w.texture).__webglTexture,Tt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const St=w.depthTexture;if(ft.__boundDepthTexture!==St){if(St!==null&&Tt.has(St)&&(w.width!==St.image.width||w.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(w)}}const Ct=w.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ct=!0);const Pt=Tt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Pt[F])?N=Pt[F][z]:N=Pt[F],tt=!0):w.samples>0&&Ft.useMultisampledRTT(w)===!1?N=Tt.get(w).__webglMultisampledFramebuffer:Array.isArray(Pt)?N=Pt[z]:N=Pt,B.copy(w.viewport),H.copy(w.scissor),W=w.scissorTest}else B.copy(qt).multiplyScalar(it).floor(),H.copy(Yt).multiplyScalar(it).floor(),W=Qt;if(z!==0&&(N=Yl),xt.bindFramebuffer(P.FRAMEBUFFER,N)&&G&&xt.drawBuffers(w,N),xt.viewport(B),xt.scissor(H),xt.setScissorTest(W),tt){const ft=Tt.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+F,ft.__webglTexture,z)}else if(ct){const ft=F;for(let Ct=0;Ct<w.textures.length;Ct++){const Pt=Tt.get(w.textures[Ct]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Ct,Pt.__webglTexture,z,ft)}}else if(w!==null&&z!==0){const ft=Tt.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ft.__webglTexture,z)}C=-1},this.readRenderTargetPixels=function(w,F,z,G,N,tt,ct,gt=0){if(!(w&&w.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=Tt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft){xt.bindFramebuffer(P.FRAMEBUFFER,ft);try{const Ct=w.textures[gt],Pt=Ct.format,St=Ct.type;if(!ae.textureFormatReadable(Pt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(St)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=w.width-G&&z>=0&&z<=w.height-N&&(w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(F,z,G,N,It.convert(Pt),It.convert(St),tt))}finally{const Ct=S!==null?Tt.get(S).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(w,F,z,G,N,tt,ct,gt=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=Tt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft)if(F>=0&&F<=w.width-G&&z>=0&&z<=w.height-N){xt.bindFramebuffer(P.FRAMEBUFFER,ft);const Ct=w.textures[gt],Pt=Ct.format,St=Ct.type;if(!ae.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.bufferData(P.PIXEL_PACK_BUFFER,tt.byteLength,P.STREAM_READ),w.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+gt),P.readPixels(F,z,G,N,It.convert(Pt),It.convert(St),0);const ee=S!==null?Tt.get(S).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,ee);const pe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Gh(P,pe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Xt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,tt),P.deleteBuffer(Xt),P.deleteSync(pe),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,F=null,z=0){const G=Math.pow(2,-z),N=Math.floor(w.image.width*G),tt=Math.floor(w.image.height*G),ct=F!==null?F.x:0,gt=F!==null?F.y:0;Ft.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,z,0,0,ct,gt,N,tt),xt.unbindTexture()};const jl=P.createFramebuffer(),Kl=P.createFramebuffer();this.copyTextureToTexture=function(w,F,z=null,G=null,N=0,tt=null){tt===null&&(N!==0?(es("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=N,N=0):tt=0);let ct,gt,ft,Ct,Pt,St,Xt,ee,pe;const me=w.isCompressedTexture?w.mipmaps[tt]:w.image;if(z!==null)ct=z.max.x-z.min.x,gt=z.max.y-z.min.y,ft=z.isBox3?z.max.z-z.min.z:1,Ct=z.min.x,Pt=z.min.y,St=z.isBox3?z.min.z:0;else{const Ke=Math.pow(2,-N);ct=Math.floor(me.width*Ke),gt=Math.floor(me.height*Ke),w.isDataArrayTexture?ft=me.depth:w.isData3DTexture?ft=Math.floor(me.depth*Ke):ft=1,Ct=0,Pt=0,St=0}G!==null?(Xt=G.x,ee=G.y,pe=G.z):(Xt=0,ee=0,pe=0);const re=It.convert(F.format),At=It.convert(F.type);let de;F.isData3DTexture?(Ft.setTexture3D(F,0),de=P.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Ft.setTexture2DArray(F,0),de=P.TEXTURE_2D_ARRAY):(Ft.setTexture2D(F,0),de=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment);const $t=P.getParameter(P.UNPACK_ROW_LENGTH),ke=P.getParameter(P.UNPACK_IMAGE_HEIGHT),on=P.getParameter(P.UNPACK_SKIP_PIXELS),He=P.getParameter(P.UNPACK_SKIP_ROWS),On=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,me.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,me.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ct),P.pixelStorei(P.UNPACK_SKIP_ROWS,Pt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,St);const ue=w.isDataArrayTexture||w.isData3DTexture,Ne=F.isDataArrayTexture||F.isData3DTexture;if(w.isDepthTexture){const Ke=Tt.get(w),De=Tt.get(F),Be=Tt.get(Ke.__renderTarget),tr=Tt.get(De.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Be.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let Xi=0;Xi<ft;Xi++)ue&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.get(w).__webglTexture,N,St+Xi),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Tt.get(F).__webglTexture,tt,pe+Xi)),P.blitFramebuffer(Ct,Pt,ct,gt,Xt,ee,ct,gt,P.DEPTH_BUFFER_BIT,P.NEAREST);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(N!==0||w.isRenderTargetTexture||Tt.has(w)){const Ke=Tt.get(w),De=Tt.get(F);xt.bindFramebuffer(P.READ_FRAMEBUFFER,jl),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Kl);for(let Be=0;Be<ft;Be++)ue?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ke.__webglTexture,N,St+Be):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ke.__webglTexture,N),Ne?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,De.__webglTexture,tt,pe+Be):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,De.__webglTexture,tt),N!==0?P.blitFramebuffer(Ct,Pt,ct,gt,Xt,ee,ct,gt,P.COLOR_BUFFER_BIT,P.NEAREST):Ne?P.copyTexSubImage3D(de,tt,Xt,ee,pe+Be,Ct,Pt,ct,gt):P.copyTexSubImage2D(de,tt,Xt,ee,Ct,Pt,ct,gt);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Ne?w.isDataTexture||w.isData3DTexture?P.texSubImage3D(de,tt,Xt,ee,pe,ct,gt,ft,re,At,me.data):F.isCompressedArrayTexture?P.compressedTexSubImage3D(de,tt,Xt,ee,pe,ct,gt,ft,re,me.data):P.texSubImage3D(de,tt,Xt,ee,pe,ct,gt,ft,re,At,me):w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,tt,Xt,ee,ct,gt,re,At,me.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,tt,Xt,ee,me.width,me.height,re,me.data):P.texSubImage2D(P.TEXTURE_2D,tt,Xt,ee,ct,gt,re,At,me);P.pixelStorei(P.UNPACK_ROW_LENGTH,$t),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ke),P.pixelStorei(P.UNPACK_SKIP_PIXELS,on),P.pixelStorei(P.UNPACK_SKIP_ROWS,He),P.pixelStorei(P.UNPACK_SKIP_IMAGES,On),tt===0&&F.generateMipmaps&&P.generateMipmap(de),xt.unbindTexture()},this.initRenderTarget=function(w){Tt.get(w).__webglFramebuffer===void 0&&Ft.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Ft.setTextureCube(w,0):w.isData3DTexture?Ft.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Ft.setTexture2DArray(w,0):Ft.setTexture2D(w,0),xt.unbindTexture()},this.resetState=function(){D=0,v=0,S=null,xt.reset(),I.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Zt._getUnpackColorSpace()}}class vm{constructor(t,e){this.scene=t,this.clippingPlanes=e||[],this.logicalWidth=160,this.logicalDepth=160,this.width=this.logicalWidth*3,this.depth=this.logicalDepth*3,this.grid=[],this.geometry=null,this.mesh=null,this.chunkSize=16,this.visibleChunks={},this.pathCache=[],this.pathfindingCalls=0,this.lastFrameTime=0,this.waterMesh=null,this.meshes=[],this.buildings=[],this.initTerrain(),this.totalHousingPop=0,this.entityGrid=[],this.initEntityGrid()}initEntityGrid(){this.entityGrid=[];for(let t=0;t<this.logicalWidth;t++){this.entityGrid[t]=[];for(let e=0;e<this.logicalDepth;e++)this.entityGrid[t][e]=[]}}registerEntity(t,e,i,n){this.isValidGrid(e,i)&&(t._spatial={x:e,z:i,type:n},this.entityGrid[e][i].push(t))}unregisterEntity(t){if(!t._spatial)return;const{x:e,z:i}=t._spatial;if(this.isValidGrid(e,i)){const n=this.entityGrid[e][i],s=n.indexOf(t);s!==-1&&n.splice(s,1)}t._spatial=null}gridToWorld(t){return t-this.logicalWidth/2+.5}moveEntity(t,e,i,n,s,a){if(Math.floor(e)===Math.floor(n)&&Math.floor(i)===Math.floor(s)){t._spatial={x:n,z:s,type:a};return}this.unregisterEntity(t),this.registerEntity(t,n,s,a)}findNearestEntity(t,e,i,n){let s=null,a=n*n;const o=Math.ceil(n),l=this.logicalWidth,h=this.logicalDepth;for(let c=-o;c<=o;c++)for(let u=-o;u<=o;u++){const d=c*c+u*u;if(d>n*n)continue;const p=(e+c+l)%l,g=(i+u+h)%h,x=this.entityGrid[p][g];for(let m=0;m<x.length;m++){const f=x[m];if(f._spatial&&f._spatial.type===t){if(f.isDead)continue;d<a&&(a=d,s=f)}}}return s}findBestTarget(t,e,i,n,s,a=null){let o=null,l=1/0;const h=this.logicalWidth,c=this.logicalDepth;e=(e%h+h)%h,i=(i%c+c)%c;const u=this.grid[Math.floor(e)][Math.floor(i)],d=u?u.regionId:0,p=2*n*(2*n);if(a&&(p>a.length*3||a.length<100)){for(let m=0;m<a.length;m++){const f=a[m];if(f.isDead||f.isFinished)continue;if(d>0){const M=this.grid[f.gridX][f.gridZ];if(!M||M.regionId!==d)continue}t==="building"&&(!f.userData||f.userData.type!=="house"&&f.userData.type!=="farm"&&f.userData.type!=="barracks"&&f.userData.type!=="tower"&&f.userData.type!=="mansion"&&f.userData.type!=="goblin_hut"&&f.userData.type);let y=Math.abs(f.gridX-e),_=Math.abs(f.gridZ-i);y>h/2&&(y=h-y),_>c/2&&(_=c-_);const T=Math.sqrt(y*y+_*_);if(T>n)continue;const E=s(f,T);E<l&&(l=E,o=f)}return o}const x=Math.ceil(n);for(let m=-x;m<=x;m++)for(let f=-x;f<=x;f++){const y=Math.sqrt(m*m+f*f);if(y>n)continue;const _=(e+m+h)%h,T=(i+f+c)%c;if(!this.entityGrid||!this.entityGrid[_]||!this.entityGrid[_][T])continue;if(d>0){if(this.grid[_][T].regionId!==d)continue}else if(this.grid[_][T].regionId>0)continue;const E=this.entityGrid[_][T];for(let M=0;M<E.length;M++){const A=E[M];if(A._spatial&&A._spatial.type===t){if(A.isDead)continue;const D=s(A,y);D<l&&(l=D,o=A)}}}return o}initTerrain(){this.grid=[];for(let i=0;i<this.logicalWidth;i++){this.grid[i]=[];for(let n=0;n<this.logicalDepth;n++)this.grid[i][n]={height:0,type:"grass",hasBuilding:!1,noise:(Math.random()-.5)*.05}}this.geometry=new Vi(this.width,this.depth,this.width,this.depth);const t=this.geometry.attributes.position.count;this.geometry.setAttribute("color",new Ge(new Float32Array(t*3),3));const e=this.geometry.attributes.position;for(let i=0;i<t;i++){const n=e.getX(i),s=e.getY(i),a=this.getVisualOffset(n,s);e.setX(i,n+a.x),e.setY(i,s+a.y)}e.needsUpdate=!0,this.generateRandomTerrain(),this.createMesh(),this.createWater()}generateRandomTerrain(){this.seed=Math.random()*100;for(let t=0;t<this.logicalWidth;t++)for(let e=0;e<this.logicalDepth;e++){const i=t/this.logicalWidth,n=e/this.logicalDepth;let a=this.seamlessFbm(i,n,this.seed)*35-15;a=Math.max(-5,a),a=Math.round(a),this.grid[t][e].height=a;let o=this.seamlessFbm(i,n,this.seed+123.45);this.grid[t][e].moisture=o}this.updateMesh(),this.calculateRegions()}calculateRegions(){const t=this.logicalWidth,e=this.logicalDepth;let i=0;for(let a=0;a<t;a++)for(let o=0;o<e;o++)this.grid[a][o].regionId=0;const n=[],s=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let a=0;a<t;a++)for(let o=0;o<e;o++){const l=this.grid[a][o];if(l.height>0&&l.regionId===0)for(i++,l.regionId=i,n.push({x:a,z:o});n.length>0;){const{x:h,z:c}=n.pop();for(const u of s){let d=h+u.x,p=c+u.z;d<0&&(d=t-1),d>=t&&(d=0),p<0&&(p=e-1),p>=e&&(p=0);const g=this.grid[d][p];g.height>0&&g.regionId===0&&(g.regionId=i,n.push({x:d,z:p}))}}}this.updateColors()}findClosestReachablePoint(t,e,i,n=10){const s=this.logicalWidth,a=this.logicalDepth,o=Math.round(t),l=Math.round(e);if(this.canAccess(o,l,i))return{x:o,z:l};for(let h=1;h<=n;h++)for(let c=-h;c<=h;c++){if(this.canAccess(o+c,l-h,i))return{x:this.wrap(o+c,s),z:this.wrap(l-h,a)};if(this.canAccess(o+c,l+h,i))return{x:this.wrap(o+c,s),z:this.wrap(l+h,a)};if(c>-h&&c<h){if(this.canAccess(o-h,l+c,i))return{x:this.wrap(o-h,s),z:this.wrap(l+c,a)};if(this.canAccess(o+h,l+c,i))return{x:this.wrap(o+h,s),z:this.wrap(l+c,a)}}}return null}canAccess(t,e,i){const n=this.logicalWidth,s=this.logicalDepth,a=(t%n+n)%n,o=(e%s+s)%s;return this.grid[a]&&this.grid[a][o]?this.grid[a][o].regionId===i:!1}wrap(t,e){return(t%e+e)%e}updateColors(){}updateMesh(){const t=this.geometry.attributes.position.array;for(let e=0;e<t.length;e+=3){const i=t[e],n=t[e+1],s=Math.round(i+this.width/2),a=Math.round(-n+this.depth/2),o=(s%this.logicalWidth+this.logicalWidth)%this.logicalWidth,l=(a%this.logicalDepth+this.logicalDepth)%this.logicalDepth;this.grid[o]&&this.grid[o][l]&&(t[e+2]=this.grid[o][l].height)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}createMesh(){this.mesh&&this.scene.remove(this.mesh),this.meshes=[];const t=new jt({vertexColors:!0,flatShading:!1,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.mesh=new Jt(this.geometry,t),this.mesh.rotation.x=-Math.PI/2,this.mesh.position.set(0,0,0);const e=new Fe;e.setAttribute("position",this.geometry.attributes.position);const i=[],n=this.width+1,s=this.depth+1;for(let c=0;c<s;c++)for(let u=0;u<n;u++){const d=c*n+u;u<this.width&&i.push(d,d+1),c<this.depth&&i.push(d,d+n)}e.setIndex(i);const a=new Ll({color:0,transparent:!0,opacity:.15,clippingPlanes:this.clippingPlanes}),o=new bc(e,a);o.position.set(0,0,.04),this.mesh.add(o);const l=new Ul({color:0,size:.15,sizeAttenuation:!0,transparent:!0,opacity:.2,clippingPlanes:this.clippingPlanes}),h=new yc(this.geometry,l);h.position.set(0,0,.05),this.mesh.add(h),this.scene.add(this.mesh),this.meshes.push(this.mesh)}createWater(){this.waterMesh&&this.scene.remove(this.waterMesh);const t=new Vi(this.width,this.depth),e=new jt({color:2003199,transparent:!0,opacity:.6,side:Ye,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.waterMesh=new Jt(t,e),this.waterMesh.rotation.x=-Math.PI/2,this.waterMesh.position.set(0,.2,0),this.scene.add(this.waterMesh)}updateLights(t){const e=t>=18||t<6;this._lastIsNight!==e&&(this._lastIsNight=e,this.updateColors(e),console.log(`Terrain: Night Lights Update. Night=${e}`))}setSeason(t){this.currentSeason!==t&&(console.log(`[DEBUG] Terrain.setSeason: Changing from ${this.currentSeason} to ${t}`),this.currentSeason=t,this.updateColors(this._lastIsNight))}updateColors(t){t===void 0&&(t=this._lastIsNight||!1);const e=this.geometry.attributes.color.array,i=this.geometry.attributes.position.array,n=this.currentSeason||"Spring";console.log(`[DEBUG] Terrain.updateColors: Season=${n}, IsNight=${t}`);for(let s=0;s<i.length;s+=3){const a=i[s],o=i[s+1],l=Math.round(a+this.width/2),h=Math.round(-o+this.depth/2),c=(l%this.logicalWidth+this.logicalWidth)%this.logicalWidth,u=(h%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[c]&&this.grid[c][u]){const d=this.grid[c][u],p=d.height,g=d.noise,x=d.moisture||.5,m=this.getBiomeColor(p,x,g,t,n,c,u);e[s]=m.r,e[s+1]=m.g,e[s+2]=m.b}}this.geometry.attributes.color.needsUpdate=!0}getBiomeColor(t,e,i,n,s,a,o,l=!1){const h=new dt;if(t<=0){if(l){const u=new dt(8965375),d=new dt(26316);let p=Math.abs(t)/10;return p=Math.min(1,p),h.copy(u).lerp(d,p),h}h.setHex(16032864);const c=.9+i*.2;return h.multiplyScalar(c),h}}update(t,e,i){this.pathfindingCalls=0,this.waterMesh&&this.waterMesh.material.uniforms&&(this.waterMesh.material.uniforms.uTime.value+=t)}updateColors(t="Spring",e=!1){if(!this.geometry)return;const i=this.geometry.attributes.position.count,n=this.geometry.attributes.color,s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<i;o++){const l=this.geometry.attributes.position.getX(o),h=this.geometry.attributes.position.getY(o);let c=Math.floor(l+s/2),u=Math.floor(-h+a/2);c=(c%s+s)%s,u=(u%a+a)%a;const d=this.grid[c][u];if(d){const p=d.height,g=d.moisture||.5,x=d.noise,m=this.getBiomeColor(p,g,x,e,t,c,u);n.setXYZ(o,m.r,m.g,m.b)}}n.needsUpdate=!0}getBiomeColor(t,e,i,n,s,a,o,l=!1){const h=new dt;if(l&&t<=0){const c=new dt(49151),u=new dt(139);let d=Math.min(1,Math.abs(t)/5);return c.lerp(u,d*.5),c}if(t<=4)if(s==="Winter"){h.setHex(12433259);const c=(i+1)*.5;h.lerp(new dt(10525274),c*.2)}else s==="Summer"?h.setHex(43088):h.setHex(8969608);else if(t<=8)if(s==="Winter"){h.setHex(16777215);const c=(i+1)*.5;h.lerp(new dt(15660543),c*.1)}else if(s==="Autumn"){const c=a*12.9898+o*78.233;let u=Math.sin(c)*43758.5453;u=u-Math.floor(u),u>.66?h.setHex(13369344):u>.33?h.setHex(16763904):h.setHex(2263842)}else s==="Summer"?h.setHex(25600):h.setHex(2263842);else{h.setHex(8421504);const c=(i+1)*.5;h.lerp(new dt(6316128),c*.2)}if(e<.5&&t<=8){const c=new dt(16032864);let u=1;e>.35&&(u=1-(e-.35)/.15),h.lerp(c,u)}if(e>.6&&t<=3){const c=new dt(3100495);let u=Math.min(1,Math.max(0,(e-.6)/.15));s==="Autumn"&&c.setHex(4929057);let d=t>2?1-(t-2):1;h.lerp(c,u*d)}if(n){const c={};h.getHSL(c),c.l*=.3,h.setHSL(c.h,c.s,c.l)}return h}modifyMoisture(t,e,i){const n=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,s=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[n]&&this.grid[n][s]){const a=this.grid[n][s];a.moisture=Math.max(0,Math.min(1,(a.moisture||.5)+i)),this.updateColorAt(n,s)}}updateColorAt(t,e){const i=this._lastIsNight||!1,n=this.currentSeason||"Spring",s=this.geometry.attributes.color,a=this.logicalWidth,o=this.logicalDepth,l=a+1,h=[{x:t,z:e}];t===0&&h.push({x:a,z:e}),e===0&&h.push({x:t,z:o}),t===0&&e===0&&h.push({x:a,z:o}),h.forEach(c=>{const u=c.z*l+c.x;if(u<0||u>=s.count)return;const d=c.x%a,p=c.z%o;if(this.grid[d]&&this.grid[d][p]){const g=this.grid[d][p],x=g.height,m=g.noise,f=g.moisture||.5,y=this.getBiomeColor(x,f,m,i,n,d,p);s.setXYZ(u,y.r,y.g,y.b)}}),s.needsUpdate=!0}modifyHeight(t,e,i){let n=0;const s=[],a=(h,c)=>({x:(h+this.logicalWidth)%this.logicalWidth,z:(c+this.logicalDepth)%this.logicalDepth}),o=a(t,e);this.grid[o.x]&&this.grid[o.x][o.z]&&(this.grid[o.x][o.z].height+=i,n+=Math.abs(i),s.push(o));let l=0;for(;l<s.length;){const h=s[l++],c=h.x,u=h.z,d=this.grid[c][u],p=d.height;d.hasBuilding&&d.building&&(d.building.userData.type==="cave"?(d.building.y=p,d.building.userData.y=p):this.removeBuilding(d.building));const g=[{x:c+1,z:u},{x:c-1,z:u},{x:c,z:u+1},{x:c,z:u-1}];for(const m of g){const f=a(m.x,m.z),y=this.grid[f.x][f.z],_=y.height,T=p-_;if(T>1){const E=p-1;n+=Math.abs(E-_),y.height=E,s.push(f)}else if(T<-1){const E=p+1;n+=Math.abs(E-_),y.height=E,s.push(f)}}[{x:(c-1+this.logicalWidth)%this.logicalWidth,z:(u-1+this.logicalDepth)%this.logicalDepth},{x:c,z:(u-1+this.logicalDepth)%this.logicalDepth},{x:(c-1+this.logicalWidth)%this.logicalWidth,z:u},{x:c,z:u}].forEach(m=>{const f=this.grid[m.x][m.z];f.hasBuilding&&f.building&&(this.checkBuildingIntegrity(f.building)||this.removeBuilding(f.building))})}return this.updateMesh(),this.updateColors(),n}getTileHeight(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]?this.grid[i][n].height:0}getBuildingAt(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]&&this.grid[i][n].building?this.grid[i][n].building:null}findBestTarget(t,e,i,n,s,a){let o=null,l=1/0;const h=n*n,c=a||[],u=this.logicalWidth,d=this.logicalDepth;for(const p of c){if(p.isDead||p.isFinished)continue;let g=Math.abs(p.gridX-e),x=Math.abs(p.gridZ-i);g>u/2&&(g=u-g),x>d/2&&(x=d-x);const m=g*g+x*x;if(m>h)continue;const f=Math.sqrt(m),y=s(p,f);y<l&&(l=y,o=p)}return o}getVisualOffset(t,e){if(this.grid){const u=this.logicalWidth||80,d=this.logicalDepth||80,p=Math.round(t+u/2),g=Math.round(-e+d/2),x=(p%u+u)%u,m=(g%d+d)%d;if(this.grid[x]&&this.grid[x][m]&&this.grid[x][m].hasBuilding)return{x:0,y:0}}const i=this.logicalWidth||80,n=this.logicalDepth||80,s=Math.PI*2/i,a=Math.PI*2/n,o=t*s*10,l=e*a*10,h=(Math.sin(l)+Math.cos(o))*.2,c=(Math.cos(l)+Math.sin(o))*.2;return{x:h,y:c}}getVisualPosition(t,e,i=!0){const n=this.logicalWidth||80,s=this.logicalDepth||80,a=i?.5:0,o=t-n/2+a,l=e-s/2+a,h=o,c=-l,u=this.getVisualOffset(h,c),d=o+u.x,p=l-u.y,g=this.getTileHeight(t,e);return{x:d,y:g,z:p}}getInterpolatedHeight(t,e){let i=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,n=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;const s=Math.floor(i),a=Math.floor(n),o=(s+1)%this.logicalWidth,l=(a+1)%this.logicalDepth,h=i-s,c=n-a,u=this.grid[s][a].height,d=this.grid[o][a].height,p=this.grid[s][l].height,g=this.grid[o][l].height,x=u*(1-h)+d*h,m=p*(1-h)+g*h;return x*(1-c)+m*c}isValidGrid(t,e){return t>=0&&t<this.logicalWidth&&e>=0&&e<this.logicalDepth}raise(t,e){return this.invalidatePathCache(),this.modifyHeight(t,e,1)}lower(t,e){return this.invalidatePathCache(),this.modifyHeight(t,e,-1)}seamlessFbm(t,e,i){let n=0,s=1,a=1,o=0;for(let l=0;l<4;l++)n+=this.periodicNoise(t*a,e*a,a,i)*s,o+=s,s*=.5,a*=2;return n/o}periodicNoise(t,e,i,n){const a=t*5,o=e*5,l=i*5,h=Math.floor(a),c=Math.floor(o),u=a-h,d=o-c,p=Math.floor(l),g=E=>(E%p+p)%p,x=this.random(g(h),g(c),n),m=this.random(g(h+1),g(c),n),f=this.random(g(h),g(c+1),n),y=this.random(g(h+1),g(c+1),n),_=u*u*(3-2*u),T=d*d*(3-2*d);return(1-_)*(1-T)*x+_*(1-T)*m+(1-_)*T*f+_*T*y}raycast(t,e){t.clone();const s=e.clone().normalize(),a=new L;for(let o=0;o<300;o+=.5){if(a.copy(s).multiplyScalar(o).add(t),a.y>50)continue;if(a.y<-10)break;const l=a.x+this.logicalWidth/2,h=a.z+this.logicalDepth/2,c=this.getInterpolatedHeight(l,h);if(a.y<=c)return a.y=c,a}return null}random(t,e,i){const n=Math.sin(t*12.9898+e*78.233+i)*43758.5453123;return n-Math.floor(n)}addBuilding(t,e,i,n=!1){if(this.invalidatePathCache(),!this.grid[e]||!this.grid[e][i])return null;const s=this.grid[e][i].height,a={type:t,gridX:e,gridZ:i,y:s,rotation:Math.random()*Math.PI*2,population:0,id:Math.random().toString(36).substr(2,9),userData:{type:t,gridX:e,gridZ:i,population:0,hp:t==="goblin_hut"?100:t==="cave"?200:50,squadId:(t==="barracks"||t==="tower")&&window.game&&window.game.registerSquad?window.game.registerSquad(t):null}},o=this.logicalWidth,l=this.logicalDepth,h=this.getBuildingSize(t);if(this.clearArea(e,i,h),this.flattenArea(e,i,h),!n&&t!=="cave"&&!this.checkFlatArea(e,i,h))return null;console.log(`[Terrain] addBuilding: ${t} at ${e},${i}. Force:${n}`),this.buildings.push(a);for(let c=0;c<h;c++)for(let u=0;u<h;u++){const d=(e+c)%o,p=(i+u)%l,g=this.grid[d][p];g.hasBuilding=!0,g.building=a}return console.log(`[Terrain] Building Added: ${t} at (${e}, ${i}) Size:${h}x${h}. Total: ${this.buildings.length}`),this.registerEntity(a,e,i,"building"),this.updateMesh(),a}clearArea(t,e,i){const n=new Set,s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<i;o++)for(let l=0;l<i;l++){const h=(t+o)%s,c=(e+l)%a,u=this.grid[h][c];u.hasBuilding&&u.building&&n.add(u.building)}for(const o of n)console.log(`[Terrain] Clearing obstacle: ${o.type} for new construction.`),this.removeBuilding(o)}removeBuilding(t){if(this.invalidatePathCache(),!t)return;let e=this.buildings.indexOf(t);e===-1&&(console.log(`[Terrain] removeBuilding: Identity mismatch! searching by coord ${t.gridX},${t.gridZ}`),e=this.buildings.findIndex(l=>l.gridX===t.gridX&&l.gridZ===t.gridZ)),e>-1?(this.buildings[e]!==t&&(console.log("[Terrain] Swapping ghost building object for authoritative one."),t=this.buildings[e]),this.buildings.splice(e,1)):console.log(`[Terrain] removeBuilding: Failed to find in list! ${t.gridX},${t.gridZ}`);const i=this.getBuildingSize(t.userData.type),n=t.gridX,s=t.gridZ,a=this.logicalWidth,o=this.logicalDepth;for(let l=0;l<i;l++)for(let h=0;h<i;h++){const c=(n+l)%a,u=(s+h)%o;if(this.grid[c]&&this.grid[c][u]){const d=this.grid[c][u];d.building===t?(d.hasBuilding=!1,d.building=null):d.building&&(d.building.gridX===n&&d.building.gridZ===s||d.building.constructor===Object&&d.building.x===void 0)&&(console.warn(`[Terrain] Force clearing cell ${c},${u} (Identity Mismatch resolved)`),d.hasBuilding=!1,d.building=null)}}if(this.entityGrid)if(this.unregisterEntity)this.unregisterEntity(t);else{const l=Math.floor(t.userData.gridX),h=Math.floor(t.userData.gridZ);if(this.entityGrid[l]&&this.entityGrid[l][h]){const c=this.entityGrid[l][h].indexOf(t);c>-1&&this.entityGrid[l][h].splice(c,1)}}t.userData.isDead=!0,t.userData.hp=0,console.log(`[Terrain] Building removed at ${n},${s}`)}getBuildingSize(t){return t==="tower"||t==="barracks"?3:t==="farm"||t==="house"?2:1}checkBuildingIntegrity(t){if(!t)return!1;const e=this.grid[t.gridX][t.gridZ].height;if(e<=0)return!1;if(t.userData.type!=="cave"&&(typeof t.y!="number"||Math.abs(e-t.y)>.1))return console.log(`[Terrain] Integrity Fail: Type = ${t.userData.type} RootH = ${e.toFixed(2)} b.y = ${t.y} (Height Mismatch)`),!1;const i=t.userData.type,n=this.getBuildingSize(i);if(i==="cave")return!0;const s=this.logicalWidth,a=this.logicalDepth;for(let o=0;o<=n;o++)for(let l=0;l<=n;l++){const h=(t.gridX+o)%s,c=(t.gridZ+l)%a,u=this.grid[h][c];if(u.height!==e||u.height<=0)return!1}return!0}checkFlatArea(t,e,i){const n=this.logicalWidth,s=this.logicalDepth;if(!this.grid[t]||!this.grid[t][e])return!1;const a=this.grid[t][e].height;if(a<=0||this.grid[t][e].hasBuilding)return!1;for(let o=0;o<=i;o++)for(let l=0;l<=i;l++){const h=(t+o)%n,c=(e+l)%s,u=this.grid[h][c];if(u.height!==a||u.height<=0||o<i&&l<i&&u.hasBuilding)return!1}return!0}flattenArea(t,e,i){const n=this.grid[t][e].height,s=this.logicalWidth,a=this.logicalDepth;let o=!1;for(let l=0;l<=i;l++)for(let h=0;h<=i;h++){const c=(t+l)%s,u=(e+h)%a,d=this.grid[c][u];d.height!==n&&(d.height=n,o=!0,d.hasBuilding&&d.building&&this.checkBuildingIntegrity(d.building))}return o&&(this.updateMesh(),this.updateColors(),this.calculateRegions()),!0}updatePopulation(t,e,i,n){let s=0;this.buildings.forEach(m=>{const f=m.userData.type;(f==="house"||f==="mansion"||f==="castle")&&m.userData.population>0&&(s+=m.userData.population)}),this.totalHousingPop=s;const a=Math.floor(s)+i;let o=.005;e&&(o*=.1);let l=a*o*t;const h=window.game&&window.game.resources?window.game.resources:{grain:0,fish:0,meat:0};let c=!0;if(l>0){let m=l*.4,f=l*.3,y=l*.3;const _=(D,v)=>{if(v<=0)return 0;if(h[D]>=v)return h[D]-=v,0;{const S=h[D];return h[D]=0,v-S}};let T=_("grain",m),E=_("meat",f),M=_("fish",y);T>0&&(T=_("meat",T)),E>0&&(E=_("fish",E)),T>0&&(T=_("fish",T));let A=T+E+M;A>0&&(A=_("grain",A),A=_("meat",A),A=_("fish",A)),A>1e-4&&(c=!1)}let u=0;h.grain>0&&u++,h.fish>0&&u++,h.meat>0&&u++;let d=.5;u===1&&(d=1),u===2&&(d=2.5),u===3&&(d=5);const p=.05*d;this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const g=20,x=this.frameCount%g;this.buildings.forEach((m,f)=>{if(f%g!==x)return;const y=t*g,_=m.userData.type;if(_==="house"||_==="barracks"){const T=m.userData.gridX,E=m.userData.gridZ;let M=p,A=10;_==="barracks"&&(M*=5,A=200);const D=2e5/(2e5+a);if(M*=D,c||(M=0),m.userData.population+=M*y,m.userData.population>=A&&n)if(_==="house")n(T,E,_,m)?m.userData.population=0:m.userData.population=A;else if(_==="barracks"){let v=0;for(let S=0;S<2;S++)n(T,E,_,m,m.userData.squadId)&&v++;v>0?m.userData.population=0:m.userData.population=A}else m.userData.population>A&&(m.userData.population=A)}else if(_==="tower"){const T=p*5,E=300;if(m.userData.population+=T*y,m.userData.population>=E&&n){let M=0;for(let A=0;A<2;A++)n(m.userData.gridX,m.userData.gridZ,"tower",m,m.userData.squadId)&&M++;M>0?m.userData.population=0:m.userData.population=E}}else if(_==="farm"){for(m.userData.population=(m.userData.population||0)+10*y;m.userData.population>=100;)if(m.userData.population-=100,window.game&&window.game.resources){const E=m.userData.gridX,M=m.userData.gridZ,A=this.grid[E][M].moisture||.5;let v=1-Math.abs(A-.5)*2;v<.2&&(v=.2);const S=Math.floor(8*v);window.game.resources.grain+=S}}})}update(t,e,i){this.colorsDirty&&(this.updateColors(),this.colorsDirty=!1);const n=window.game&&window.game.units?window.game.units.length:0;this.updatePopulation(t,i,n,e)}updateLights(t){}serialize(){const t={logicalWidth:this.logicalWidth,logicalDepth:this.logicalDepth,grid:[]},e=new Set;for(let i=0;i<this.logicalWidth;i++){t.grid[i]=[];for(let n=0;n<this.logicalDepth;n++){const s=this.grid[i][n],a={};if(a.h=Math.round(s.height*100)/100,a.n=Math.round(s.noise*100)/100,s.moisture!==void 0&&(a.m=Math.round(s.moisture*100)/100),s.hasBuilding&&(a.hb=1,s.building&&!e.has(s.building.id))){e.add(s.building.id);const o=s.building.gridX!==void 0?s.building.gridX:s.building.userData.gridX,l=s.building.gridZ!==void 0?s.building.gridZ:s.building.userData.gridZ;a.b={t:s.building.userData.type,p:s.building.userData.population,x:o,z:l,r:s.building.rotation!==void 0?Math.round(s.building.rotation*100)/100:0}}t.grid[i][n]=a}}return t}async deserialize(t,e){if(!t){console.error("Terrain.deserialize received invalid data:",t);return}this.buildings.forEach(n=>{this.scene.remove(n),n.userData.clones&&n.userData.clones.forEach(s=>this.scene.remove(s))}),this.buildings=[],this.initEntityGrid();const i=10;for(let n=0;n<this.logicalWidth;n++){n%i===0&&await new Promise(s=>setTimeout(s,0));for(let s=0;s<this.logicalDepth;s++){const a=this.grid[n][s];a.hasBuilding&&a.building&&this.scene.remove(a.building),a.hasBuilding=!1,a.building=null}}this.logicalWidth=t.logicalWidth,this.logicalDepth=t.logicalDepth;for(let n=0;n<this.logicalWidth;n++){if(n%i===0&&(await new Promise(s=>setTimeout(s,0)),e)){const s=Math.floor(n/this.logicalWidth*100);e(s)}for(let s=0;s<this.logicalDepth;s++){const a=t.grid[n][s],o=a.h!==void 0?a.h:a.height,l=a.n!==void 0?a.n:a.noise;this.grid[n][s].height=o,this.grid[n][s].noise=l,a.m!==void 0?this.grid[n][s].moisture=a.m:a.moisture!==void 0&&(this.grid[n][s].moisture=a.moisture);let h=a.hb||a.hasBuilding,c=a.b||a.building;if(h&&c){const u=c.x!==void 0?c.x:c.gridX,d=c.z!==void 0?c.z:c.gridZ;if(u===n&&d===s){const p=c.t||c.type,g={gridX:u,gridZ:d,type:p,population:c.p!==void 0?c.p:c.population,rotation:c.r!==void 0?c.r:c.rotation};p==="house"?this.restoreHouse(g):p==="farm"?this.restoreFarm(g):p==="mansion"?this.restoreMansion(g):p==="castle"?this.restoreCastle(g):p==="goblin_hut"?this.restoreGoblinHut(g):p==="tower"?(g.userData&&!g.userData.squadId&&(g.userData.squadId=window.game.registerSquad("tower")),this.restoreTower(g)):p==="barracks"?(g.userData&&!g.userData.squadId&&(g.userData.squadId=window.game.registerSquad("barracks")),this.restoreBarracks(g)):p==="cave"&&this.restoreCave(g)}}}}this.updateMesh(),this.updateColors(),this.calculateRegions()}restoreHouse(t){const e=this.addBuilding("house",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreFarm(t){const e=this.addBuilding("farm",t.gridX,t.gridZ,!0);e&&(e.userData.hp=5,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreMansion(t){const e=this.addBuilding("mansion",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCastle(t){this.restoreMansion(t)}updateMeshPosition(t){if(!t)return;const e=this.logicalWidth,i=this.logicalDepth,n=t.position.x,s=t.position.z,a=Math.round(n/e)*e,o=Math.round(s/i)*i;(this.mesh.position.x!==a||this.mesh.position.z!==o)&&(this.mesh.position.set(a,0,o),this.waterMesh&&this.waterMesh.position.set(a,.2,o))}restoreGoblinHut(t){const e=this.addBuilding("goblin_hut",t.gridX,t.gridZ,!0);e?(e.population=t.population||1,e.userData.population=t.population||1,t.rotation!==void 0&&(e.rotation=t.rotation)):console.warn("Failed to restore goblin_hut at",t.gridX,t.gridZ)}restoreTower(t){const e=this.addBuilding("tower",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreBarracks(t){const e=this.addBuilding("barracks",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCave(t){const e=this.addBuilding("cave",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0)}resetPathfindingBudget(){this.pathfindingCalls=0}invalidatePathCache(){this.pathCache=[]}findPath(t,e,i,n){this.pathfindingCalls=(this.pathfindingCalls||0)+1;const s=this.pathCache.find(g=>{const x=g.sx===t&&g.sz===e,m=g.ex===i&&g.ez===n;return x&&m});if(s)return[...s.path];if(this.pathfindingCalls>10)return null;const a=this.logicalWidth,o=this.logicalDepth;if(t=Math.round(t),e=Math.round(e),i=Math.round(i),n=Math.round(n),t=(t%a+a)%a,e=(e%o+o)%o,i=(i%a+a)%a,n=(n%o+o)%o,t<0||t>=a||e<0||e>=o||!this.grid[t]||!this.grid[t][e]||!this.grid[i]||!this.grid[i][n])return null;const l={x:t,z:e,g:0,h:0,f:0,parent:null},h=[l],c=new Map;c.set(`${t},${e}`,l);const u=new Set;let d=0;const p=3e3;for(;h.length>0;){if(d++,d>p)return null;h.sort((f,y)=>f.f-y.f);const g=h.shift(),x=`${g.x},${g.z}`;if(c.delete(x),u.add(x),g.x===i&&g.z===n){const f=[];let y=g;for(;y;)f.push({x:y.x,z:y.z}),y=y.parent;const _=f.reverse();return this.pathCache.length>50&&this.pathCache.shift(),this.pathCache.push({sx:t,sz:e,ex:i,ez:n,path:_,timestamp:Date.now()}),_}const m=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(const f of m){let y=g.x+f.x,_=g.z+f.z;y<0&&(y=a-1),y>=a&&(y=0),_<0&&(_=o-1),_>=o&&(_=0);const T=`${y},${_}`;if(u.has(T)||!this.grid[y][_])continue;const E=this.grid[g.x][g.z].height,M=this.grid[y][_].height;if(M<=0||Math.abs(M-E)>2)continue;const D=1+Math.abs(M-E)*2,v=g.g+D;let S=c.get(T);if(S&&S.g<=v)continue;let C=Math.abs(y-i),U=Math.abs(_-n);C>a/2&&(C=a-C),U>o/2&&(U=o-U);const B=C+U;if(S)S.g=v,S.f=v+B,S.parent=g;else{const H={x:y,z:_,g:v,h:B,f:v+B,parent:g};h.push(H),c.set(T,H)}}}return null}getRegion(t,e){return!this.grid[t]||!this.grid[t][e]?-1:this.grid[t][e].regionId||0}getRandomPointInRegion(t,e,i,n){const s=this.logicalWidth,a=this.logicalDepth,o=20;for(let l=0;l<o;l++){const h=Math.random()*Math.PI*2,c=Math.random()*n,u=Math.floor(e+Math.cos(h)*c),d=Math.floor(i+Math.sin(h)*c);let p=(u%s+s)%s,g=(d%a+a)%a;if(this.grid[p]&&this.grid[p][g]&&this.grid[p][g].regionId===t)return{x:p,z:g}}return null}}class bm{constructor(t,e,i,n,s,a,o){this.scene=t,this.camera=e,this.terrain=i,this.spawnCallback=n,this.units=s||[],this.unitRenderer=a,this.game=o,this.raycaster=new Dc,this.mouse=new bt,this.mode="raise";const l=new hi(.2,1,8),h=new Un({color:16711680,wireframe:!0});this.cursor=new Jt(l,h),this.cursor.rotation.x=Math.PI,this.scene.add(this.cursor),this.tooltip=document.getElementById("tooltip"),this.setupUI(),window.addEventListener("pointerdown",this.onPointerDown.bind(this)),window.addEventListener("pointerup",this.onPointerUp.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),this.dragThreshold=5,this.downPosition=new bt}setupUI(){const t=document.getElementById("btn-raise"),e=document.getElementById("btn-lower"),i=document.getElementById("btn-spawn"),n=document.getElementById("btn-barracks"),s=document.getElementById("btn-tower"),a=document.getElementById("btn-cancel"),o=l=>{this.mode=l,t&&t.classList.toggle("active",l==="raise"),e&&e.classList.toggle("active",l==="lower"),i&&i.classList.toggle("active",l==="spawn"),n&&n.classList.toggle("active",l==="barracks"),s&&s.classList.toggle("active",l==="tower"),a&&a.classList.toggle("active",l==="cancel")};t&&t.addEventListener("click",()=>o("raise")),e&&e.addEventListener("click",()=>o("lower")),a&&a.addEventListener("click",()=>o("cancel")),i&&i.addEventListener("click",()=>o("spawn")),n&&n.addEventListener("click",()=>o("barracks")),s&&s.addEventListener("click",()=>o("tower"))}isUIInteraction(t){const e=t.target;return e.closest("button")||e.closest("input")||e.closest("select")||e.closest("a")||e.id==="minimap"||e.closest("#minimap")||e.closest("#start-screen")||e.closest("#save-modal")||e.closest(".ui-container")}onPointerDown(t){this.isUIInteraction(t)||this.downPosition.set(t.clientX,t.clientY)}onPointerUp(t){if(this.isUIInteraction(t))return;const e=new bt(t.clientX,t.clientY);this.downPosition.distanceTo(e)>this.dragThreshold||this.handleInteraction(t)}onMouseMove(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updateCursor(),this.updateTooltip(t.clientX,t.clientY)}updateTooltip(t,e){if(!this.tooltip)return;let i="",n=!1;this.raycaster.setFromCamera(this.mouse,this.camera);const s=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(s){const a=Math.round(s.x),o=Math.round(s.z),l=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;let c=Math.round(a+l/2),u=Math.round(o+h/2);c=(c%l+l)%l,u=(u%h+h)%h;const d=this.terrain.grid[c][u];if(d&&d.hasBuilding&&d.building){const p=d.building,g=p.userData.type||p.type;g==="house"?(i=`House Pop: ${Math.floor(p.userData.population||0)}/10`,n=!0):g==="castle"?(i=`Castle Pop: ${Math.floor(p.userData.population||0)}/200`,n=!0):g==="barracks"?(i=`Barracks Pop: ${Math.floor(p.userData.population||0)}/200`,n=!0):g==="tower"&&(i=`Tower Pop: ${Math.floor(p.userData.population||0)}/300`,n=!0)}if(!n){const p=this.terrain.findNearestEntity("unit",c,u,2.5);p&&(i=`Age: ${Math.floor(p.age)}`,p.getBehaviorMode&&(i+=`
Mode: ${p.getBehaviorMode()}`),p.action&&(i+=`
Act: ${p.action}`),n=!0)}}n?(this.tooltip.textContent=i,this.tooltip.style.display="block",this.tooltip.style.left=t+15+"px",this.tooltip.style.top=e+15+"px"):this.tooltip.style.display="none"}update(){this.lastClientX!==void 0&&this.lastClientY!==void 0&&this.updateTooltip(this.lastClientX,this.lastClientY)}updateCursor(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=null;t=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);const e=t?[{point:t}]:[];if(e.length>0){const n=e[0].point,s=Math.round(n.x),a=Math.round(n.z),o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;let h=Math.round(s+o/2),c=Math.round(a+l/2);h=(h%o+o)%o,c=(c%l+l)%l;const u=this.terrain.getVisualPosition(h,c,!1),d=h-o/2,p=c-l/2,g=u.x-d,x=u.z-p;this.cursor.position.set(s+g,u.y+.5,a+x),this.cursor.visible=!0,this.mode==="spawn"?this.cursor.material.color.setHex(255):this.cursor.material.color.setHex(16711680)}else this.cursor.visible=!1}handleInteraction(t){this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(e){const i=e,n=Math.round(i.x),s=Math.round(i.z),a=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let l=Math.round(n+a/2),h=Math.round(s+o/2);if(l=(l%a+a)%a,h=(h%o+o)%o,t.button===0){if(this.game&&!this.game.canAction()){console.warn("Action Blocked: Not enough Mana (Negative)");return}const c=i.x,u=i.z;this.mode==="raise"?this.game&&(this.game.addRequest("raise",l,h,null,c,u),this.game.consumeMana(10),console.log(`[Input] Request Queued: Raise at ${l},${h}`)):this.mode==="lower"?this.game&&(this.game.addRequest("lower",l,h,null,c,u),this.game.consumeMana(10),console.log(`[Input] Request Queued: Lower at ${l},${h}`)):this.mode==="cancel"?this.game&&this.game.tryCancelRequest(l,h)&&console.log(`[Input] Request Canceled at ${l},${h}`):this.mode==="spawn"?this.spawnCallback&&(this.spawnCallback(l,h,!0),this.game&&this.game.consumeMana(20)):this.mode==="barracks"?this.game&&(this.game.addRequest("build_barracks",l,h,null,c,u),this.game.consumeMana(50)):this.mode==="tower"&&this.game&&(this.game.addRequest("build_tower",l,h,null,c,u),this.game.consumeMana(50))}else if(t.button===2){if(this.game&&!this.game.canAction())return;if(this.game){const c=i.x,u=i.z;this.game.addRequest("lower",l,h,null,c,u),this.game.consumeMana(10)}}this.updateCursor()}}}class Va{static nextId=0;constructor(t,e,i,n,s){this.id=Va.nextId++,this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.type=s||"entity",this.position=new L,this.rotationY=0,this.isMoving=!1,this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.walkAnimTimer=0,this.terrain&&this.terrain.registerEntity&&this.terrain.registerEntity(this,this.gridX,this.gridZ,this.type),this.updatePosition()}updatePosition(){if(isNaN(this.gridX)||isNaN(this.gridZ))return;const t=this.getPositionForGrid(this.gridX,this.gridZ);this.position.copy(t)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=t-i/2+.5,a=e-n/2+.5,o=s,l=-a;let h={x:0,y:0};this.terrain&&this.terrain.getVisualOffset&&(h=this.terrain.getVisualOffset(o,l));let c=0;return this.terrain&&this.terrain.getInterpolatedHeight?c=this.terrain.getInterpolatedHeight(t,e):this.terrain&&this.terrain.getTileHeight&&(c=this.terrain.getTileHeight(t,e)),new L(s+h.x,c,a-h.y)}getDistance(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=Math.abs(this.gridX-t),a=Math.abs(this.gridZ-e);return s>i/2&&(s=i-s),a>n/2&&(a=n-a),Math.sqrt(s*s+a*a)}startMove(t,e,i){if(this.isMoving){const l=(i-this.moveStartTime)/this.moveDuration,h=Math.max(0,Math.min(1,l));let c=this.startGridX,u=this.startGridZ,d=this.targetGridX,p=this.targetGridZ;const g=this.terrain.logicalWidth||80,x=this.terrain.logicalDepth||80;d-c>g/2&&(c+=g),c-d>g/2&&(c-=g),p-u>x/2&&(u+=x),u-p>x/2&&(u-=x),this.startGridX=c+(d-c)*h,this.startGridZ=u+(p-u)*h,this.startGridX=(this.startGridX%g+g)%g,this.startGridZ=(this.startGridZ%x+x)%x}else this.startGridX=this.gridX,this.startGridZ=this.gridZ;this.isMoving=!0,this.moveStartTime=i,this.targetGridX=t,this.targetGridZ=e;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=t-this.gridX,o=e-this.gridZ;Math.abs(a)>n/2&&(a-=Math.sign(a)*n),Math.abs(o)>s/2&&(o-=Math.sign(o)*s),this.rotationY=Math.atan2(a,o)}updateMovement(t){if(!this.isMoving)return;const e=(t-this.moveStartTime)/this.moveDuration;if(e>=1)this.isMoving=!1,this.terrain&&this.terrain.moveEntity&&this.terrain.moveEntity(this,this.gridX,this.gridZ,this.targetGridX,this.targetGridZ,this.type),this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition(),this.onMoveFinished&&this.onMoveFinished(t);else{const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=this.startGridX,a=this.startGridZ,o=this.targetGridX,l=this.targetGridZ;o-s>i/2&&(s+=i),s-o>i/2&&(s-=i),l-a>n/2&&(a+=n),a-l>n/2&&(a-=n);const h=s+(o-s)*e,c=a+(l-a)*e,u=this.getPositionForGrid(h,c);this.position.copy(u),this.onMoveStep&&this.onMoveStep(e)}}die(){this.isDead=!0,this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this)}}class Js extends Va{constructor(t,e,i,n,s){super(t,e,i,n,s),this.path=null,this.pathIndex=0,this.stuckCount=0,this.pathFailCount=0,this.lastPathTime=0,this.minDistToTarget=1/0,this.pathStagnation=0}isReachable(t,e){if(!this.terrain||!this.terrain.grid)return!0;const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=Math.round(t),a=Math.round(e);s<0?s=(s%i+i)%i:s>=i&&(s=s%i),a<0?a=(a%n+n)%n:a>=n&&(a=a%n);const o=this.terrain.grid[this.gridX]?this.terrain.grid[this.gridX][this.gridZ]:null,l=this.terrain.grid[s]?this.terrain.grid[s][a]:null;if(o&&l){const h=o.regionId,c=l.regionId;if(h>0&&c>0&&h!==c){const u=t-this.gridX,d=e-this.gridZ;return u*u+d*d<25}if(h===0&&c>0)return!1}return!0}smartMove(t,e,i){if(this.path&&this.path.length>0){const u=this.path[0];if(this.canMoveTo(u.x,u.z))return this.executeMove(u.x,u.z,i),this.path.shift(),this.path.length===0&&(this.path=null),!0;this.path=null}if(!this.path&&this.getDistance(t,e)>15){const d=1e3+this.id%20*100;if(i-this.lastPathTime>d){if(this.terrain.pathfindingCalls>10)return!0;if(this.lastPathTime=i,!this.isReachable(t,e))return!1;const p=this.terrain.findPath(this.gridX,this.gridZ,t,e);if(p&&p.length>0)return this.path=p,!0;console.warn(`[Actor ${this.id}] Pathfinding Failed. Falling back to Linear.`)}else return!0}if(!this.isReachable(t,e))return!1;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=t-this.gridX,o=e-this.gridZ;Math.abs(a)>n/2&&(a-=Math.sign(a)*n),Math.abs(o)>s/2&&(o-=Math.sign(o)*s);let l=this.gridX,h=this.gridZ;if(Math.abs(a)>Math.abs(o)?l+=Math.sign(a):h+=Math.sign(o),l<0&&(l=n-1),l>=n&&(l=0),h<0&&(h=s-1),h>=s&&(h=0),this.canMoveTo(l,h))return this.executeMove(l,h,i),!0;{let u=this.gridX,d=this.gridZ;if(Math.abs(a)>Math.abs(o)?o!==0&&(d+=Math.sign(o)):a!==0&&(u+=Math.sign(a)),u<0?u=n-1:u>=n&&(u=0),d<0?d=s-1:d>=s&&(d=0),this.canMoveTo(u,d))return this.executeMove(u,d,i),!0}const c=this.getDistance(t,e);if(!this.path&&c<=15){const u=1e3+this.id%20*100;if(i-this.lastPathTime>u){if(this.terrain.pathfindingCalls>10||(this.lastPathTime=i,!this.isReachable(t,e)))return!1;const d=this.terrain.findPath(this.gridX,this.gridZ,t,e);if(d&&d.length>0)return console.log(`[Actor ${this.id}] Linear Failed. A* Found Path (Len:${d.length})`),this.path=d,!0}}return!1}canMoveTo(t,e){const i=this.terrain.getTileHeight(t,e);if(i<=0)return!1;const n=this.terrain.getTileHeight(this.gridX,this.gridZ);return!(Math.abs(i-n)>2)}executeMove(t,e,i){super.startMove(t,e,i);const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=this.gridX,o=this.gridZ;if(this.isMoving){const x=(i-this.moveStartTime)/this.moveDuration,m=Math.max(0,Math.min(1,x));let f=this.startGridX,y=this.startGridZ,_=this.targetGridX,T=this.targetGridZ;_-f>n/2&&(f+=n),f-_>n/2&&(f-=n),T-y>s/2&&(y+=s),y-T>s/2&&(y-=s),a=f+(_-f)*m,o=y+(T-y)*m}let l=Math.abs(t-a),h=Math.abs(e-o);l>n/2&&(l=n-l),h>s/2&&(h=s-h);const c=Math.sqrt(l*l+h*h),u=this.terrain.getTileHeight(this.gridX,this.gridZ),d=this.terrain.getTileHeight(t,e),p=Math.abs(d-u);let g=600;d>8&&(g+=2e3),this.moveDuration=g*Math.max(1,c)+p*1e3,this.stuckCount=0}}class pt extends Js{static assets={geometries:{},materials:{},textures:{}};static nextId=0;static initAssets(){if(pt.assets.initialized)return;const t=new le(.3,.35,.2);t.translate(0,.3,0),pt.assets.geometries.body=t;const e=new le(.25,.25,.25);e.translate(0,.6,0),pt.assets.geometries.head=e;const i=new Vi(.2,.2);i.translate(0,.6,.126),pt.assets.geometries.facePlane=i;const n=new le(.1,.25,.1);n.translate(0,-.1,0),pt.assets.geometries.limb=n;const s=new le(.05,.5,.05);s.translate(0,.25,0),pt.assets.geometries.sword=s;const a=new le(.05,.8,.05);a.translate(0,0,0),pt.assets.geometries.staff=a,new Mi(.25,.25,.02,16).translate(0,0,0),new hi(.15,.4,16).translate(0,.2,0);const h=new hi(.2,.5,16);h.translate(0,.25,0),pt.assets.geometries.wizardHat=h;const c=new Mi(.3,.3,.02,16);pt.assets.geometries.wizardHatBrim=c,pt.assets.materials.skin=new Xe({color:16764074,roughness:.8}),pt.assets.materials.clothes=new Xe({color:8934707,roughness:1}),pt.assets.materials.tool=new Xe({color:5592405,metalness:.5}),pt.assets.materials.hat=new Xe({color:9127187,roughness:1}),pt.assets.materials.armor=new Xe({color:11184810,metalness:.8,roughness:.2}),pt.assets.materials.helmet=new Xe({color:8947848,metalness:.9,roughness:.1}),pt.assets.materials.robe=new Xe({color:4474009,roughness:1}),pt.assets.materials.robe=new Xe({color:4474009,roughness:1}),pt.assets.materials.wizardHat=new Xe({color:3355528,roughness:1}),pt.assets.materials.metal=new Xe({color:14540253,metalness:.9,roughness:.2}),pt.assets.materials.wood=new Xe({color:9127187,roughness:.9}),pt.assets.materials.darkMagic=new Xe({color:3342387,roughness:1}),pt.assets.textures.face=pt.createFaceTexture(),pt.assets.materials.face=new Xe({map:pt.assets.textures.face,transparent:!0}),pt.assets.textures.hair=pt.createHairTexture(),pt.assets.materials.hair=new jt({map:pt.assets.textures.hair,transparent:!0}),pt.assets.materials.heads=null,pt.assets.initialized=!0}static createFaceTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");return e.fillStyle="#FFCCAA",e.fillRect(0,0,64,64),e.fillStyle="#4A3000",e.fillRect(0,0,64,15),e.fillStyle="#000000",e.fillRect(15,25,8,8),e.fillRect(41,25,8,8),e.fillStyle="#A0522D",e.fillRect(20,45,24,4),new Re(t)}static createHairTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,64,64),e.fillStyle="#DDDDDD";for(let i=0;i<40;i++)e.fillRect(Math.random()*60,Math.random()*60,4,4);return new Re(t)}constructor(t,e,i,n,s,a=!1,o=null){super(t,e,i,n,"unit"),this.id=pt.nextId++,console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${s} Pos:${i},${n} Special:${a}`),this.gridX=i!==void 0?i:20,this.gridZ=n!==void 0?n:20;let l=a;typeof s=="boolean"&&(l=s,s="worker"),this.role=s||"worker",this.role=s||"worker",this.isSpecial=l,this.squadId=o,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0,this.buildStagnationCount=0,this.lastTime=0,this.lastGatherTime=-Math.random()*30,this.position=new L,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}};const h=80+Math.random()*20;this.lifespan=h,this.age=20,this.isDead=!1,this.isFinished=!1,this.crossMesh=null,this.hp=35+Math.floor(Math.random()*15),this.maxHp=this.hp,this.attackCooldown=0,this.attackRate=1,this.damage=4,this.targetGoblin=null,this.role==="knight"?(this.hp*=15,this.maxHp=this.hp,this.damage*=25):this.role==="wizard"&&(this.hp*=3,this.maxHp=this.hp,this.damage*=20,this.attackRate=2),this.updatePosition(),this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.lastTime=0,this.moveInterval=2e3+Math.random()*3e3,(this.role==="knight"||this.role==="wizard")&&(this.moveInterval=0),this.stagnationTimer=0,this.huntingCooldown=0,this.target=null,this.isMoving=!1,this.targetX=0,this.targetZ=0,this.terrain.registerEntity(this,this.gridX,this.gridZ,"unit"),this.wanderCount=0,this.migrationTarget=null,this.ignoredTargets=new Map}takeDamage(t){this.hp-=t,this.hp<=0&&this.die()}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.role==="worker"&&this.targetRequest&&window.game&&(console.log(`Unit ${this.id} died. Releasing job ${this.targetRequest.id}`),window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null),this.createCross(),console.log("Unit died."))}attackGoblin(t){if(!(this.attackCooldown>0)){if(t.isDead){this.targetGoblin=null;return}if(console.log(`[Unit Debug] ATTACKING Goblin ${t.id}`),this.role==="wizard"){if(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,window.game&&window.game.spawnProjectile){const e=this.position.clone().add(new L(0,.9,0)),i=this.terrain.getTileHeight(t.gridX,t.gridZ),n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80,a=new L(t.gridX-n/2,i+1,t.gridZ-s/2);window.game.spawnProjectile(e,a)}setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200);t.takeDamage(this.damage),(this.role==="knight"||this.role==="wizard")&&this.reportEnemy(t),t.hp<=0&&(t.isDead=!0,this.targetGoblin=null,window.game&&(this.role==="knight"||this.role==="wizard")&&this.searchForHut(t.gridX,t.gridZ)),this.attackCooldown=this.attackRate}}attackBuilding(t){if(this.attackCooldown>0||!t||!t.userData)return;this.role==="wizard"?(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)):(this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200));const e=t.userData.type;if(e==="farm")t.userData.hp===void 0&&(t.userData.hp=5),t.userData.hp>5&&(t.userData.hp=5),t.userData.hp-=this.damage,console.log(`Unit ${this.id} attacking Farm. HP: ${t.userData.hp}`),t.userData.hp<=0&&(console.log("Farm Destroyed!"),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ));else if(e==="house"||e==="mansion"||e==="castle"||e==="tower"||e==="barracks"){let i=t.userData.population||0;if(i<=0){console.log(`Unit ${this.id} destroyed Empty ${e}!`),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ),this.attackCooldown=this.attackRate;return}if(t.userData.population-=Math.ceil(this.damage/2),t.population=t.userData.population,console.log(`Unit ${this.id} attacked ${e}. Pop remaining: ${t.userData.population}`),t.userData.population<=0)console.log(`${e} Destroyed (Population wiped out)!`),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ);else{let n=.5;e==="tower"&&(n=2),e==="barracks"&&(n=1.5),e==="castle"&&(n=2);const s=Math.floor(i*n*.5);s>0&&(console.log(`[Combat] ${e} (Pop ${i}) retaliates! Deals ${s} dmg to Unit ${this.id}`),this.takeDamage(s))}}else t.userData.hp===void 0&&(t.userData.hp=100),t.userData.hp-=this.damage,t.userData.hp<=0&&(this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ));this.attackCooldown=this.attackRate}debugGetAge(){return"DEBUG_AGE_"+this.age}getBehaviorMode(){return this.isDead?"Dead":this.targetGoblin?"Combat":this.targetBuilding?"Siege":this.targetRequest?"Working":this.targetRaidPoint?`Patrolling (${this.targetRaidPoint.x},${this.targetRaidPoint.z})`:this.action==="Migrating"?"Migrating":this.role==="worker"?"Wander":this.role==="knight"||this.role==="wizard"?"Patrol":"Idle"}updateLogic(t,e,i,n,s,a){if(this.id===0&&console.log(`[Unit.js] ENTERED updateLogic. Dead=${this.isDead}`),this.isDead){this.updateDeathAnimation(e),this.action="Dead";return}if(this.id===0){const h=this.terrain.getTileHeight(this.gridX,this.gridZ);console.log(`[Unit Debug V2] Start Logic. Night=${i}, Stag=${this.stagnationTimer.toFixed(1)}, Age=${this.age.toFixed(1)}, H=${h}, Action=${this.action}`)}if(this.id===0&&this.debugFrame%60===0&&console.log(`[Unit Heartbeat] ID:${this.id} Action:${this.action} Moving:${this.isMoving} T:${t.toFixed(1)} dt:${e.toFixed(4)} Int:${this.moveInterval.toFixed(0)}`),this.attackCooldown>0&&(this.attackCooldown-=e),this.ignoredTargets.size>0)for(const[h,c]of this.ignoredTargets)t>c&&this.ignoredTargets.delete(h);if(this.isMoving&&t-this.moveStartTime>2e4&&(console.warn(`[Unit] Stuck moving for >20s. Forcing Reset. ID:${this.id}`),this.isMoving=!1,this.updatePosition(),this.role==="worker"&&this.targetRequest&&window.game&&(console.warn(`Unit ${this.id} stuck. Releasing job ${this.targetRequest.id}`),window.game.releaseRequest(this,this.targetRequest),this.targetRequest=null,this.action="Idle")),this.action==="Working"&&!this.targetRequest&&(this.action="Idle",this.isMoving=!1),this.role==="worker"&&this.targetRequest&&window.game&&this.debugFrame%60===0){const h=this.targetRequest,c=window.game.requestQueue.includes(h),u=h.assignedTo===this.id;(!c||!u)&&(console.warn(`[Unit ${this.id}] Detected GHOST Job (Valid:${c}, Ours:${u}). Dropping.`),this.targetRequest=null,this.action="Idle",this.isMoving=!1)}!this.isMoving&&t>=this.lastTime&&this.action!=="Migrating"&&this.action!=="Reinforcing"&&this.action!=="Patrolling Battle"&&(this.action="Idle");let o=1;if((this.role==="knight"||this.role==="wizard")&&(o=.1),this.age+=e*o,this.age>=this.lifespan){this.die();return}if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}if(this.action==="Migrating"&&this.migrationTarget){if(this.migrationTimer=(this.migrationTimer||0)+e,this.migrationTimer>30){console.log(`Unit ${this.id} migration timed out. Retrying.`),this.migrate(t);return}if(Math.random()<.05){if(this.role==="worker"&&window.game){const c=window.game.findBestRequest(this);if(c&&window.game.claimRequest(this,c)){console.log(`Unit ${this.id} interrupted migration for Job ${c.type}`),this.targetRequest=c,this.action="Idle",this.migrationTarget=null,this.migrationTimer=0;return}}if(this.searchSurroundings(this.gridX,this.gridZ,n),this.targetGoblin||this.targetBuilding&&this.role!=="worker"){console.log(`Unit ${this.id} interrupted migration for combat.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0;return}}this.getDistance(this.migrationTarget.x,this.migrationTarget.z)<=2?(console.log(`Unit ${this.id} finished migration.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0):!this.isMoving&&t-(this.lastMoveAttempt||0)>1e3&&(this.lastMoveAttempt=t,this.triggerMove(this.migrationTarget.x,this.migrationTarget.z,t));return}{let h=null,c=1/0;const u=this.targetGoblin&&!this.targetGoblin.isDead,d=this.targetBuilding&&this.targetBuilding.userData.hp>0;let p=this.action==="Chasing"||this.action==="Fighting"||this.action==="Sieging"||this.action==="Unstuck";this.role==="worker"&&this.targetRequest&&(p=!0),this.scanTimer=(this.scanTimer||0)+1;let g=30;(u||d)&&(g=300);const x=this.scanTimer>g;let m=!p||!u&&!d||x;if(this.role==="worker"&&this.targetRequest&&(m=!1),m){x&&(this.scanTimer=0);const f=this.targetGoblin?this.targetGoblin.id:this.targetBuilding?this.targetBuilding.id:null;if(n){const _=this.role==="knight"||this.role==="wizard"?50:15;for(const T of n){if(T.isDead||this.ignoredTargets.has(T.id))continue;const E=this.getDistance(T.gridX,T.gridZ),M=this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]?this.terrain.grid[this.gridX][this.gridZ].regionId:1,A=this.terrain.grid[T.gridX]&&this.terrain.grid[T.gridX][T.gridZ]?this.terrain.grid[T.gridX][T.gridZ].regionId:1;if(M!==A&&E>2.5)continue;let D=_;if(T.id===f&&(D=_*2),E>D)continue;const v=this.terrain.getTileHeight(this.gridX,this.gridZ),S=this.terrain.getTileHeight(T.gridX,T.gridZ);if(Math.abs(v-S)>10)continue;const C=this.terrain.getTileHeight(T.gridX,T.gridZ);let U=E-1e3;C>8&&(U+=20),T.id===f&&(U-=500),U<c&&(c=U,h={type:"goblin",obj:T})}}if(this.terrain.buildings){const _=this.role==="knight"||this.role==="wizard"?1/0:30;for(const T of this.terrain.buildings)if(!(this.role==="worker"&&T.userData.type!=="goblin_hut")&&(T.userData.type==="goblin_hut"||T.userData.type==="cave")){if(T.userData&&T.userData.hp<=0||this.ignoredTargets.has(T.id))continue;const E=this.getDistance(T.gridX,T.gridZ);if(E>_)continue;let M=E-5;T.id===f&&(M-=500),E<8&&(this.role==="knight"||this.role==="wizard")&&(M-=2e3),M<c&&(c=M,h={type:"building",obj:T})}}this.targetGoblin=null,this.targetBuilding=null,h&&(h.type==="goblin"?this.targetGoblin=h.obj:this.targetBuilding=h.obj);const y=this.findRaidTarget();this.targetGoblin&&y&&this.getDistance(this.targetGoblin.gridX,this.targetGoblin.gridZ)>5&&(this.targetGoblin=null),!this.targetGoblin&&!this.targetBuilding&&y&&(this.action==="Idle"||this.action==="Wandering"||this.action==="Patrolling"||this.action==="Migrating")&&this.isMoving&&(console.log(`[Unit ${this.id}] Interrupting ${this.action} for Raid Target!`),this.isMoving=!1,this.action="Approaching Target")}}if(this.targetGoblin&&this.targetGoblin.isDead&&(this.targetGoblin=null),this.targetGoblin){const h=this.getDistance(this.targetGoblin.gridX,this.targetGoblin.gridZ);let c=2.5;if(this.role==="wizard"&&(c=5.5),h<=c)this.action="Fighting",this.isMoving=!1,this.attackGoblin(this.targetGoblin),this.game&&this.squadId&&this.reportEnemy(this.targetGoblin),this.chaseTimer=0;else{if(this.chaseTimer=(this.chaseTimer||0)+e,h>10&&this.chaseTimer>2&&this.findRaidTarget()){console.log(`[Unit ${this.id}] Abandoning distant chase (d=${h.toFixed(1)}) for Squad Target.`),this.targetGoblin=null,this.chaseTimer=0;return}this.chaseTimer>3&&!this.path&&(this.attemptPathfinding(t),this.chaseTimer=0);const u=this.minDistToTarget||1/0;h<u-.5?(this.minDistToTarget=h,this.pathStagnation=0):this.pathStagnation=(this.pathStagnation||0)+e,this.pathStagnation>2&&(this.attemptPathfinding(t),this.pathStagnation=0,this.minDistToTarget=h),this.isMoving,!this.isMoving&&this.targetGoblin&&(this.action="Chasing",this.triggerMove(this.targetGoblin.gridX,this.targetGoblin.gridZ,t),this.moveInterval=0)}}else if(this.targetBuilding){const h=this.getDistance(this.targetBuilding.gridX,this.targetBuilding.gridZ);if(h<=2)this.action="Sieging",this.isMoving=!1,this.attackBuilding(this.targetBuilding);else{const c=this.minDistToTarget||1/0;h<c-.5?(this.minDistToTarget=h,this.pathStagnation=0):this.pathStagnation=(this.pathStagnation||0)+e,this.pathStagnation>5&&(console.log(`[Unit ${this.id}] Path Stagnation detected (Building). Dist: ${h.toFixed(1)}. Force A*.`),this.attemptPathfinding(t),this.pathStagnation=0,this.minDistToTarget=h),!this.isMoving&&t-this.lastTime>this.moveInterval&&(this.targetBuilding?(this.action=h>20?"Travelling":"Approaching Target",this.triggerMove(this.targetBuilding.gridX,this.targetBuilding.gridZ,t)):this.action="Idle")}}else if(this.targetRaidPoint){const h=this.getDistance(this.targetRaidPoint.x,this.targetRaidPoint.z);if(h<=2)this.searchSurroundings(this.gridX,this.gridZ),this.targetRaidPoint=null;else{const c=this.minDistToTarget||1/0;h<c-.5?(this.minDistToTarget=h,this.pathStagnation=0):this.pathStagnation=(this.pathStagnation||0)+e,this.pathStagnation>5&&(console.log(`[Unit ${this.id}] Path Stagnation detected (RaidPoint). Dist: ${h.toFixed(1)}. Force A*.`),this.attemptPathfinding(t),this.pathStagnation=0,this.minDistToTarget=h),h>15&&!this.path?this.attemptPathfinding(t):(this.action==="Idle"&&(this.action="Reinforcing"),!this.isMoving&&t-this.lastTime>200&&(this.checkArrivalAtRaidPoint(),this.targetRaidPoint&&this.triggerMove(this.targetRaidPoint.x,this.targetRaidPoint.z,t)))}}else if(this.action==="Migrating"&&this.migrationTarget){const h=this.getDistance(this.migrationTarget.x,this.migrationTarget.z);h<=2?this.onMoveFinished(t):!this.isMoving&&t-this.lastTime>this.moveInterval&&(console.log(`[Unit ${this.id}] Resume Migration to ${this.migrationTarget.x},${this.migrationTarget.z}`),h>15&&!this.path?this.attemptPathfinding(t):this.triggerMove(this.migrationTarget.x,this.migrationTarget.z,t))}if((this.action==="Chasing"||this.action==="Fighting")&&!this.targetGoblin&&!this.targetBuilding&&(this.isMoving=!1,this.action="Idle"),this.gatherResources(t),this.moveStuckTimer=0,this.lastGridX===this.gridX&&this.lastGridZ===this.gridZ&&!this.isSleeping&&!this.isMoving?this.stagnationTimer+=e:(this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0),this.stagnationTimer>10){this.moveRandomly(t),this.stagnationTimer>20&&(this.migrate(t),this.stagnationTimer=0);return}if(!this.isMoving&&!this.targetGoblin&&!this.targetBuilding&&!this.targetRaidPoint&&!this.targetRequest){const h=this.role==="worker"||this.role==="fisher"||this.role==="hunter";if(i&&h){const c=this.terrain.grid[this.gridX][this.gridZ];if(c.hasBuilding&&c.building&&(c.building.type==="house"||c.building.type==="castle")){this.isSleeping||(console.log(`[Unit ${this.id}] Sleeping`),this.isSleeping=!0);return}else if(!this.isMoving&&t-this.lastTime>this.moveInterval){let d=this.homeBase;if(d||(this.nightShelterTarget&&this.nightShelterTarget.userData.hp>0?d=this.nightShelterTarget:(d=this.findNearestShelter(),this.nightShelterTarget=d)),d){this.action="Going Home",this.triggerMove(d.userData.gridX,d.userData.gridZ,t);return}else this.nightShelterTarget=null}}else this.isSleeping&&(this.isSleeping=!1)}this.id===0&&this.debugFrame%60===0&&console.log(`[Unit Debug] Executing Logic. Role: ${this.role}`),this.role==="worker"?this.updateWorkerLogic(t,e,i,n):this.role==="knight"||this.role==="wizard"||this.moveRandomly(t)}updateWorkerLogic(t,e,i,n){if(!(this.targetGoblin||this.targetBuilding&&this.targetBuilding.userData&&this.targetBuilding.userData.hp>0)){if(i){const s=this.terrain.grid[this.gridX][this.gridZ];if(s.hasBuilding&&s.building&&(s.building.type==="house"||s.building.type==="castle")){this.isSleeping||(this.isSleeping=!0);return}if(!this.isMoving&&t-this.lastTime>this.moveInterval){let o=this.homeBase||this.findNearestShelter();if(o){this.action="Going Home",this.triggerMove(o.userData.gridX,o.userData.gridZ,t);return}}}else this.isSleeping=!1;if(this.targetRequest){if(this.isMoving&&this.action==="Idle"&&(this.isMoving=!1),this.getDistance(this.targetRequest.x,this.targetRequest.z)<=2){this.action="Working",window.game&&window.game.completeRequest(this,this.targetRequest),this.targetRequest=null;let a=!1;if(window.game){const o=window.game.findBestRequest(this);o&&window.game.claimRequest(this,o)&&(this.targetRequest=o,a=!0)}a||(this.isMoving=!1)}else{const a=this.isMoving&&this.targetGridX===this.targetRequest.x&&this.targetGridZ===this.targetRequest.z;(!this.isMoving||!a&&t-this.lastMoveAttempt>1e3)&&(this.lastMoveAttempt=t,this.action="Going to Work",this.triggerMove(this.targetRequest.x,this.targetRequest.z,t))}return}if(window.game&&Math.random()<.1){const s=window.game.findBestRequest(this);if(s&&window.game.claimRequest(this,s)){this.targetRequest=s;return}}!this.isMoving&&t-this.lastTime>this.moveInterval&&(this.moveRandomly(t),this.lastTime=t,this.moveInterval=3e3+Math.random()*2e3),this.lastTime=t,this.moveInterval=2e3+Math.random()*3e3}}searchForHut(t,e){this.findTargetBuilding(40)}findTargetBuilding(t){if(!this.terrain.buildings)return;const e=this.terrain.buildings;let i=null,n=1/0,s=null;const a=t!==void 0?t:1/0;for(const o of e)if(!(this.role==="worker"&&o.type!=="goblin_hut")&&(o.type==="goblin_hut"||o.type==="cave")){const l=this.getDistance(o.gridX,o.gridZ);if(l>a)continue;l<n&&(n=l,i=o,s=o.type)}this.role==="knight"&&Math.random()<.001&&console.log(`[Unit Debug] Targeted: ${this.targetGoblin?"Goblin":this.targetBuilding?this.targetBuilding.type:"None"}`),i&&s&&(this.targetBuilding=i,this.reportEnemy(i))}reportEnemy(t){if(!t)return;const e=t.gridX,i=t.gridZ;this.squadId&&window.game?window.game.reportSquadTarget(this.squadId,e,i):window.game&&window.game.reportGlobalBattle(e,i),this.game&&this.game.battleMemory&&this.game.battleMemory.reportRaid(e,i,this.game.gameTotalTime||Date.now())}findRaidTarget(){if(this.squadId&&window.game){const s=window.game.getSquad(this.squadId);if(s&&s.target){const a=Date.now()-s.target.time;if(Math.random()<.05&&this.role==="knight"){const o=this.getDistance(s.target.x,s.target.z);console.log(`[Unit ${this.id} SquadDebug] ID:${this.squadId} Target:${s.target.x},${s.target.z} Dist:${o.toFixed(1)} Age:${a}ms Reachable:${this.isReachable(s.target.x,s.target.z)} `)}if(a<3e4&&this.getDistance(s.target.x,s.target.z)>2){if(this.isReachable(s.target.x,s.target.z))return this.targetRaidPoint={x:s.target.x,z:s.target.z},!0;{const l=this.terrain.grid[this.gridX][this.gridZ];if(l&&l.regionId>0){const h=this.terrain.findClosestReachablePoint(s.target.x,s.target.z,l.regionId);if(h)return this.targetRaidPoint={x:h.x,z:h.z},!0}}}}}if((this.role==="knight"||this.role==="wizard")&&window.game&&window.game.battleHotspots&&window.game.battleHotspots.length>0){const s=Date.now();let a=null,o=1/0;for(const l of window.game.battleHotspots){if(s-l.time>3e4)continue;let h=l.x,c=l.z,u=this.getDistance(h,c);if(!this.isReachable(h,c)){let d=!1;const p=this.terrain.grid[this.gridX][this.gridZ];if(p&&p.regionId>0){const g=this.terrain.findClosestReachablePoint(h,c,p.regionId);g&&(h=g.x,c=g.z,u=this.getDistance(h,c),d=!0)}if(!d)continue}u<2||u<o&&(o=u,a={x:h,z:c})}if(a)return this.targetRaidPoint={x:a.x,z:a.z},!0}let t=[];const e=this.game?this.game.gameTotalTime:Date.now();if(this.game&&this.game.battleMemory&&(t=this.game.battleMemory.getPriorities(e)),!t||t.length===0)return;let i=null,n=1/0;return t.forEach(s=>{let a=s.x,o=s.z,l=this.getDistance(a,o);if(!(l<4)&&!(this.ignoredTargets&&this.ignoredTargets.has(`${s.x},${s.z}`))){if(this.terrain.grid){const h=this.terrain.logicalWidth||80,c=this.terrain.logicalDepth||80;let u=Math.round(a),d=Math.round(o);u=(u%h+h)%h,d=(d%c+c)%c;const p=this.terrain.grid[this.gridX][this.gridZ],g=this.terrain.grid[u]?this.terrain.grid[u][d]:null;if(p&&g&&p.regionId!==g.regionId&&p.regionId>0&&g.regionId>0){const x=this.terrain.findClosestReachablePoint(a,o,p.regionId);if(x)a=x.x,o=x.z,l=this.getDistance(a,o);else return}}l<n&&(n=l,i={x:a,z:o})}}),i?(this.targetRaidPoint=i,!0):!1}findNearestShelter(){if(!this.terrain||!this.terrain.buildings)return null;let t=null,e=1/0;for(const i of this.terrain.buildings)if(!(this.ignoredTargets&&this.ignoredTargets.has(i.id))&&!(this.ignoredTargets&&this.ignoredTargets.has(`${i.gridX},${i.gridZ}`))&&(i.type==="house"||i.type==="castle")&&i.userData&&i.userData.hp>0){const n=this.getDistance(i.gridX,i.gridZ);n<e&&(e=n,t=i)}return t}checkArrivalAtRaidPoint(){if(!this.targetRaidPoint)return;this.getDistance(this.targetRaidPoint.x,this.targetRaidPoint.z)<=2&&(console.log(`[Unit ${this.id}] Arrived at Raid Point. Scanning...`),this.searchSurroundings(this.gridX,this.gridZ),!this.targetGoblin&&!this.targetBuilding&&(console.log(`[Unit ${this.id}] Nothing found at Raid Point. Clearing Shared Memory.`),this.homeBase&&this.homeBase.userData&&this.homeBase.userData.memory?this.homeBase.userData.memory.reportClear(this.targetRaidPoint.x,this.targetRaidPoint.z):this.game&&this.game.battleMemory&&this.game.battleMemory.reportClear(this.targetRaidPoint.x,this.targetRaidPoint.z),this.targetRaidPoint=null))}searchSurroundings(t,e,i){if(!this.game)return;const n=i||(window.game&&window.game.goblinManager?window.game.goblinManager.goblins:[]);if(this.terrain&&this.terrain.findBestTarget){const s=this.role==="knight"||this.role==="wizard"?50:20,a=this.terrain.findBestTarget("goblin",t,e,s,(l,h)=>{const c=window.game?window.game.gameTotalTime:Date.now(),u=h<5;if(!u&&this.ignoredTargets.has(l.id)&&c<this.ignoredTargets.get(l.id)||l.isDead)return 1/0;const d=this.terrain.getTileHeight(this.gridX,this.gridZ),p=this.terrain.getTileHeight(l.gridX,l.gridZ);if(Math.abs(d-p)>10)return 1/0;if(this.terrain.grid){const g=this.terrain.grid[this.gridX][this.gridZ],x=this.terrain.grid[l.gridX][l.gridZ];if(g&&x&&g.regionId!==x.regionId&&g.regionId>0&&x.regionId>0)return 1/0}if(!u&&this.terrain.grid){const g=this.terrain.grid[this.gridX][this.gridZ],x=this.terrain.grid[l.gridX][l.gridZ];if(g&&x&&g.regionId!==x.regionId&&g.regionId>0&&x.regionId>0)return 1/0}return h},n);if(a){this.targetGoblin=a,this.reportEnemy(a),console.log(`Unit ${this.id} found Goblin via Spatial Search!`);return}if(this.terrain.findBestTarget("building",t,e,12,(l,h)=>{const c=window.game?window.game.gameTotalTime:Date.now(),u=l.userData&&l.userData.id||l.id;if(u&&this.ignoredTargets.has(u)&&c<this.ignoredTargets.get(u))return 1/0;if(l.userData.type==="goblin_hut"||l.userData.type==="cave"){if(this.terrain.grid){const d=this.terrain.grid[this.gridX][this.gridZ],p=this.terrain.grid[l.gridX][l.gridZ];if(d&&p&&d.regionId!==p.regionId&&d.regionId>0&&p.regionId>0)return 1/0}return h}return 1/0})){console.log(`Unit ${this.id} found Base via Spatial Search!`);return}}}patrol(t){if(this.terrain.buildings&&this.terrain.buildings.length>0){const e=Math.floor(Math.random()*this.terrain.buildings.length),i=this.terrain.buildings[e],n=Math.abs(this.gridX-i.gridX),s=Math.abs(this.gridZ-i.gridZ);n<5&&s<5?this.moveRandomly(t):this.triggerMove(i.gridX,i.gridZ,t)}else this.moveRandomly(t)}onMoveFinished(t){this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0,this.tryBuildStructure(t)?(this.action==="Migrating"&&(console.log(`Unit ${this.id} built structure during migration. Stopping.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0),this.buildStagnationCount=0):this.migrationTarget?(this.role==="worker"?(console.log(`Unit ${this.id} (Worker) migration target invalid for build. Searching nearby...`),this.moveRandomly(t),this.isMoving||(this.action="Idle")):(console.log(`Unit ${this.id} (${this.role}) finished migrating. Resuming Idle.`),this.action="Idle",this.migrationTarget=null),this.buildStagnationCount=0):(this.buildStagnationCount=(this.buildStagnationCount||0)+1,this.buildStagnationCount>5&&(console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`),this.migrate(t),this.buildStagnationCount=0))}onMoveStep(t){const e=Math.sin(t*Math.PI*4)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-e,this.limbs.rightLeg.x=e,this.mesh&&(this.mesh.position.copy(this.position),this.rotationY!==void 0&&(this.mesh.rotation.y=this.rotationY))}triggerMove(t,e,i){this.smartMove(t,e,i)?this.stuckCount=0:this.isMoving||(this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>10&&this.handleStuck())}handleStuck(){const t=window.game?window.game.gameTotalTime:0;console.log(`Unit ${this.id} stuck. Handling stuck state...`),this.path=null;const e=t+5e3;this.targetGoblin&&(this.ignoredTargets.set(this.targetGoblin.id,e),this.ignoredTargets.set(`${this.targetGoblin.gridX},${this.targetGoblin.gridZ}`,e),this.targetGoblin=null),this.targetBuilding&&(this.ignoredTargets.set(this.targetBuilding.id,e),this.ignoredTargets.set(`${this.targetBuilding.gridX},${this.targetBuilding.gridZ}`,e),this.targetBuilding=null),this.targetRaidPoint&&(this.ignoredTargets.set(`${this.targetRaidPoint.x},${this.targetRaidPoint.z}`,e),this.targetRaidPoint=null),this.stuckCount=0,this.action="Idle",this.isMoving=!1,console.warn(`[Unit ${this.id}] Stuck Recovery triggered. Resetting to Idle.`)}canMoveTo(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=t,a=e;s<0&&(s=i-1),s>=i&&(s=0),a<0&&(a=n-1),a>=n&&(a=0);const o=this.terrain.getTileHeight(this.gridX,this.gridZ),l=this.terrain.getTileHeight(s,a);if(l<=0){const c=this.game?this.game.gameTotalTime:Date.now();return c-(this.lastWaterLogTime||0)>5e3&&(console.log(`[Unit ${this.id}] Blocked by Water at ${s},${a} H:${l}`),this.lastWaterLogTime=c),!1}if(l>8&&console.log(`[Unit ${this.id}] Moving onto Rock at ${s},${a} H:${l} (Speed Penalty)`),Math.abs(l-o)>2)return console.log(`[Unit ${this.id}] Blocked by Slope at ${s},${a} H:${o}->${l}`),!1;const h=this.terrain.grid[s][a];return h.hasBuilding&&h.building,!0}executeMove(t,e,i){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;t<0&&(t=n-1),t>=n&&(t=0),e<0&&(e=s-1),e>=s&&(e=0),super.startMove(t,e,i),this.action="Moving";const a=this.terrain.getTileHeight(this.gridX,this.gridZ),o=this.terrain.getTileHeight(t,e),l=Math.abs(o-a);let h=800;o>8&&(h+=2e3);let c=this.gridX,u=this.gridZ;if(this.isMoving){const x=(i-this.moveStartTime)/this.moveDuration,m=Math.max(0,Math.min(1,x));let f=this.startGridX,y=this.startGridZ,_=this.targetGridX,T=this.targetGridZ;_-f>n/2&&(f+=n),f-_>n/2&&(f-=n),T-y>s/2&&(y+=s),y-T>s/2&&(y-=s),c=f+(_-f)*m,u=y+(T-y)*m}let d=Math.abs(t-c),p=Math.abs(e-u);d>n/2&&(d=n-d),p>s/2&&(p=s-p);const g=Math.sqrt(d*d+p*p);this.moveDuration=h*Math.max(1,g)+l*1e3,this.stuckCount=0}gatherResources(t){if(t-this.lastGatherTime<5e3)return;this.lastGatherTime=t;const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,s=!1;const a=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:4,z:0},{x:-4,z:0},{x:0,z:4},{x:0,z:-4}];for(const o of a){let l=this.gridX+o.x,h=this.gridZ+o.z;l<0&&(l=e+l),l>=e&&(l=l-e),h<0&&(h=i+h),h>=i&&(h=h-i),l=(l%e+e)%e,h=(h%i+i)%i;const c=this.terrain.getTileHeight(l,h);if(c<=0?n=!0:c>4&&c<=8&&(s=!0),n&&s)break}if(window.game&&window.game.resources){if(n){const o=this.role==="fisher"?3:1;window.game.resources.fish+=o}if(s){const o=this.role==="hunter"?3:1;window.game.resources.meat+=o}}}findTargetGoblin(t){if(!t||t.length===0)return;let e=null,i=1/0;const n=this.role==="knight"||this.role==="wizard"?50:15;for(const s of t){if(s.isDead||this.ignoredTargets&&this.ignoredTargets.has(s.id))continue;const a=this.terrain.grid[this.gridX][this.gridZ],o=this.terrain.grid[s.gridX][s.gridZ];if(a&&o){const p=a.regionId,g=o.regionId;if(p>0){if(g!==p)continue}else if(g>0)continue}const l=this.gridX-s.gridX,h=this.gridZ-s.gridZ,c=Math.sqrt(l*l+h*h);if(c>n)continue;const u=this.terrain.getTileHeight(s.gridX,s.gridZ);let d=c;u>8&&(d+=20),d<i&&(i=d,e=s)}this.targetGoblin=e}getDistance(t,e){let i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);const s=this.terrain.logicalWidth||80,a=this.terrain.logicalDepth||80;return i>s/2&&(i=s-i),n>a/2&&(n=a-n),Math.sqrt(i*i+n*n)}moveRandomly(t){const e=this.terrain.getRegion(this.gridX,this.gridZ),i=this.role==="knight"?30:15,n=this.terrain.getRandomPointInRegion(e,this.gridX,this.gridZ,i);n?this.smartMove(n.x,n.z,t):this.checkStuck()}cleanIgnoredTargets(t){if(this.ignoredTargets)for(const[e,i]of this.ignoredTargets)t>i&&this.ignoredTargets.delete(e)}forceUnstuck(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;let i=!1,n=0;for(;!i&&n<10;){const s=Math.floor(Math.random()*7)-3,a=Math.floor(Math.random()*7)-3;if(s===0&&a===0)continue;let o=this.gridX+s,l=this.gridZ+a;o<0&&(o=t-1),o>=t&&(o=0),l<0&&(l=e-1),l>=e&&(l=0);const h=this.terrain.getTileHeight(o,l),c=this.terrain.grid[o][l];if(h>0&&c&&!c.hasBuilding){const u=this.gridX,d=this.gridZ;this.gridX=o,this.gridZ=l,this.updatePosition(),this.terrain.moveEntity(this,u,d,o,l,"unit"),console.log(`Unit warped from ${u},${d} to ${o},${l}`),i=!0}n++}}migrate(t){const e=20+Math.random()*20;let i=1;this.terrain.grid&&this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]&&(i=this.terrain.grid[this.gridX][this.gridZ].regionId);const n=this.terrain.getRandomPointInRegion(i,this.gridX,this.gridZ,e);n?(console.log(`Unit ${this.id} migrating to ${n.x},${n.z} (Region ${i})`),this.action="Migrating",this.migrationTarget={x:n.x,z:n.z},this.migrationTimer=0,this.triggerMove(n.x,n.z,t)):(console.warn(`Unit ${this.id} could not find migration target in Region ${i}. Staying Idle.`),this.action="Idle")}tryBuildStructure(t){if(this.role!=="worker")return!1;this.terrain.logicalWidth,this.terrain.logicalDepth;const e=this.gridX,i=this.gridZ,n=this.terrain.grid[e][i];if(n.hasBuilding||n.height>8)return;const s=this.terrain.buildings.filter(_=>_.type==="house"),a=this.terrain.buildings.filter(_=>_.type==="farm"),o=this.terrain.buildings.filter(_=>_.type==="mansion"),l=s.length,h=a.length;o.length;const c=window.game?window.game.totalPopulation:0,u=this.terrain.buildings.filter(_=>_.type==="tower"),d=Math.floor(c/3e3);if(u.length<d&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("tower",e,i),this.moveRandomly(t),!0;const g=this.terrain.buildings.filter(_=>_.type==="barracks").length,x=Math.floor(c/1e3);if(g<x&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("barracks",e,i),this.moveRandomly(t),!0;const f=(window.game?window.game.resources.grain:100)<c*2,y=h<l/2+1;return(f||y)&&Math.random()<.3&&this.terrain.checkFlatArea(e,i,2)&&this.buildFarm(t)?!0:this.terrain.checkFlatArea(e,i,2)?n.moisture>.8?!1:(this.terrain.addBuilding("house",e,i),this.moveRandomly(t),!0):!1}improveLand(t){if(!this.terrain.grid[this.gridX]||!this.terrain.grid[this.gridX][this.gridZ])return;const i=this.terrain.grid[this.gridX][this.gridZ].moisture||.5;let s=.5-i,a=s*.4;Math.abs(a)<.1&&Math.abs(s)>.01&&(a=s>0?.1:-.1),Math.abs(a)>Math.abs(s)&&(a=s),this.terrain.modifyMoisture(this.gridX,this.gridZ,a),console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${i.toFixed(2)} -> ${(i+a).toFixed(2)}`),this.targetRequest&&this.game&&Math.abs(this.targetRequest.x-this.gridX)<2&&Math.abs(this.targetRequest.z-this.gridZ)<2&&(this.game.removeRequest(this.targetRequest),this.targetRequest=null),this.moveRandomly(t)}buildFarm(t){let e=null;if(this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]&&(e=this.terrain.grid[this.gridX][this.gridZ]),e){const i=e.moisture||.5;let s=1-Math.abs(i-.5)*2.5;if(s<0&&(s=0),Math.random()>s)return console.log(`Farm construction failed due to soil conditions (Moisture: ${i.toFixed(2)}, Chance: ${(s*100).toFixed(0)}%). Improving Land.`),this.improveLand(t),!1}return this.terrain.addBuilding("farm",this.gridX,this.gridZ),this.moveRandomly(t),!0}static getCrossAssets(){return pt.assets.geometries.crossV||(pt.assets.geometries.crossV=new le(.2,1,.2),pt.assets.geometries.crossH=new le(.8,.2,.2)),pt.assets.geometries}createCross(){const t=new ii,e=pt.getCrossAssets(),i=new jt({color:16777215,transparent:!0,opacity:1}),n=new Jt(e.crossV,i);n.position.y=.5,t.add(n);const s=new Jt(e.crossH,i);s.position.y=.7,t.add(s);const a=this.getPositionForGrid(this.gridX,this.gridZ);t.position.copy(a),this.scene.add(t),this.crossMesh=t,this.deathTimer=0}updateDeathAnimation(t){if(!this.crossMesh)return;isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=3;if(this.deathTimer>=i)this.scene.remove(this.crossMesh),this.crossMesh.children.forEach(n=>{n.material&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material.opacity=1-n})}}static createWoodTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#8B4513",e.fillRect(0,0,64,64),e.strokeStyle="#5D2906",e.lineWidth=2;for(let i=0;i<8;i++)e.beginPath(),e.moveTo(0,i*8+Math.random()*4),e.lineTo(64,i*8+Math.random()*4),e.stroke();return new Re(t)}takeDamage(t){this.isDead||(this.hp-=t,isNaN(this.hp)&&(this.hp=0),this.hp<=0&&(this.hp=0,this.die()))}die(){this.isDead||(this.isDead=!0,this.createCross(),console.log(`Unit ${this.id} (${this.role}) DIED. R.I.P.`),this.targetRequest&&this.game&&this.game.releaseRequest(this,this.targetRequest),this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this))}static createRoofTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#A52A2A",e.fillRect(0,0,64,64),e.fillStyle="#800000";for(let i=0;i<64;i+=8)for(let n=0;n<64;n+=8)(n+i)%16===0&&e.fillRect(n,i,7,7);return new Re(t)}serialize(){let t,e;return this.homeBase&&this.homeBase.userData&&(t=this.homeBase.userData.gridX,e=this.homeBase.userData.gridZ),{gridX:this.gridX,gridZ:this.gridZ,age:this.age,lifespan:this.lifespan,isDead:this.isDead,isFinished:this.isFinished,isMoving:this.isMoving,targetX:this.targetX,targetZ:this.targetZ,moveStartTime:this.moveStartTime,startGridX:this.startGridX,startGridZ:this.startGridZ,targetGridX:this.targetGridX,targetGridZ:this.targetGridZ,isSpecial:this.isSpecial,role:this.role,hp:this.hp,maxHp:this.maxHp,damage:this.damage,xp:this.xp||0,level:this.level||1,name:this.name,homeBaseGridX:t,homeBaseGridZ:e,squadId:this.squadId,targetRequestId:this.targetRequest?this.targetRequest.id:null}}dispose(){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh=null),this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.geometry&&t.geometry.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}attemptPathfinding(t){if(!this.terrain||!this.terrain.findPath)return;let e,i;if(this.targetGoblin)e=this.targetGoblin.gridX,i=this.targetGoblin.gridZ;else if(this.targetBuilding)e=this.targetBuilding.gridX,i=this.targetBuilding.gridZ;else if(this.targetRaidPoint)e=this.targetRaidPoint.x,i=this.targetRaidPoint.z;else if(this.migrationTarget)e=this.migrationTarget.x,i=this.migrationTarget.z;else return;if(t-(this.lastPathAttempt||0)<2e3)return;this.lastPathAttempt=t;const n=this.terrain.findPath(this.gridX,this.gridZ,e,i);if(n&&n.length>0)console.log(`[Unit ${this.id}] Pathfinding SUCCESS! Found path of length ${n.length} to ${e},${i}`),this.path=n,this.stuckCount=0;else{(this.id===0||Math.random()<.05)&&console.log(`[Unit ${this.id}] Pathfinding Failed (UNREACHABLE). Blocked by terrain/water? Aborting & Blacklisting.`);const s=this.game?this.game.gameTotalTime:Date.now();if(this.targetUnit&&this.ignoredTargets.set(this.targetUnit.id,s+15e3),this.targetGoblin&&this.ignoredTargets.set(this.targetGoblin.id,s+15e3),this.targetBuilding){const a=this.targetBuilding.userData?this.targetBuilding.userData.id||this.targetBuilding.id:this.targetBuilding.id;a&&this.ignoredTargets.set(a,s+15e3)}this.targetRaidPoint&&this.ignoredTargets.set(`p_${this.targetRaidPoint.x}_${this.targetRaidPoint.z}`,s+15e3),this.targetUnit=null,this.targetGoblin=null,this.targetBuilding=null,this.targetRaidPoint=null,this.migrationTarget=null,this.targetRequest=null,this.path=null}}static deserialize(t,e,i){const n=new pt(e,i,t.gridX,t.gridZ,t.role||t.isSpecial,t.isSpecial);return n.age=t.age||20,typeof t.lifespan=="number"&&t.lifespan>0&&(n.lifespan=t.lifespan),t.lifespan&&(n.lifespan=t.lifespan),n.isDead=t.isDead||!1,n.isDead=t.isDead||!1,n.isFinished=t.isFinished||!1,t.hp!==void 0&&(n.hp=t.hp),t.maxHp!==void 0&&(n.maxHp=t.maxHp),t.damage!==void 0&&(n.damage=t.damage),t.xp!==void 0&&(n.xp=t.xp),t.level!==void 0&&(n.level=t.level),t.level!==void 0&&(n.level=t.level),t.name!==void 0&&(n.name=t.name),t.homeBaseGridX!==void 0&&t.homeBaseGridZ!==void 0&&(n.savedHomeBaseX=t.homeBaseGridX,n.savedHomeBaseZ=t.homeBaseGridZ),t.squadId!==void 0?n.squadId=t.squadId:n.squadId=null,t.targetRequestId&&(n.savedTargetRequestId=t.targetRequestId),t.isMoving&&(t.targetGridX!==void 0&&(n.targetGridX=t.targetGridX),t.targetGridZ!==void 0&&(n.targetGridZ=t.targetGridZ),n.isMoving=!1,n.action="Idle"),n.isDead&&(n.isFinished||n.createCross()),n}}const ol={type:"change"},Wa={type:"start"},Vl={type:"end"},Fs=new is,ll=new Qe,ym=Math.cos(70*Hh.DEG2RAD),ve=new L,Oe=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lr=1e-6;class Sm extends Pc{constructor(t,e=null){super(t,e),this.state=se.NONE,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Rn.ROTATE,MIDDLE:Rn.DOLLY,RIGHT:Rn.PAN},this.touches={ONE:An.ROTATE,TWO:An.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new L,this._lastQuaternion=new nn,this._lastTargetPosition=new L,this._quat=new nn().setFromUnitVectors(t.up,new L(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new No,this._sphericalDelta=new No,this._scale=1,this._panOffset=new L,this._rotateStart=new bt,this._rotateEnd=new bt,this._rotateDelta=new bt,this._panStart=new bt,this._panEnd=new bt,this._panDelta=new bt,this._dollyStart=new bt,this._dollyEnd=new bt,this._dollyDelta=new bt,this._dollyDirection=new L,this._mouse=new bt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=wm.bind(this),this._onPointerDown=Tm.bind(this),this._onPointerUp=Em.bind(this),this._onContextMenu=Lm.bind(this),this._onMouseWheel=Cm.bind(this),this._onKeyDown=Dm.bind(this),this._onTouchStart=Pm.bind(this),this._onTouchMove=Im.bind(this),this._onMouseDown=Am.bind(this),this._onMouseMove=Rm.bind(this),this._interceptControlDown=Um.bind(this),this._interceptControlUp=Fm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(ol),this.update(),this.state=se.NONE}update(t=null){const e=this.object.position;ve.copy(e).sub(this.target),ve.applyQuaternion(this._quat),this._spherical.setFromVector3(ve),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Oe:i>Math.PI&&(i-=Oe),n<-Math.PI?n+=Oe:n>Math.PI&&(n-=Oe),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(ve.setFromSpherical(this._spherical),ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ve.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new L(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const h=new L(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),a=ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Fs.origin.copy(this.object.position),Fs.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Fs.direction))<ym?this.object.lookAt(this.target):(ll.setFromNormalAndCoplanarPoint(this.object.up,this.target),Fs.intersectPlane(ll,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Lr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lr||this._lastTargetPosition.distanceToSquared(this.target)>Lr?(this.dispatchEvent(ol),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Oe/60*this.autoRotateSpeed*t:Oe/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ve.setFromMatrixColumn(e,0),ve.multiplyScalar(-t),this._panOffset.add(ve)}_panUp(t,e){this.screenSpacePanning===!0?ve.setFromMatrixColumn(e,1):(ve.setFromMatrixColumn(e,0),ve.crossVectors(this.object.up,ve)),ve.multiplyScalar(t),this._panOffset.add(ve)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;ve.copy(n).sub(this.target);let s=ve.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=t-i.left,s=e-i.top,a=i.width,o=i.height;this._mouse.x=n/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Oe*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Oe*this._rotateDelta.x/e.clientHeight),this._rotateUp(Oe*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new bt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Tm(r){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(r.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(r)&&(this._addPointer(r),r.pointerType==="touch"?this._onTouchStart(r):this._onMouseDown(r)))}function wm(r){this.enabled!==!1&&(r.pointerType==="touch"?this._onTouchMove(r):this._onMouseMove(r))}function Em(r){switch(this._removePointer(r),this._pointers.length){case 0:this.domElement.releasePointerCapture(r.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vl),this.state=se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Am(r){let t;switch(r.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Rn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(r),this.state=se.DOLLY;break;case Rn.ROTATE:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=se.ROTATE}break;case Rn.PAN:if(r.ctrlKey||r.metaKey||r.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(r),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(r),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Wa)}function Rm(r){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(r);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(r);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(r);break}}function Cm(r){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(r.preventDefault(),this.dispatchEvent(Wa),this._handleMouseWheel(this._customWheelEvent(r)),this.dispatchEvent(Vl))}function Dm(r){this.enabled!==!1&&this._handleKeyDown(r)}function Pm(r){switch(this._trackPointer(r),this._pointers.length){case 1:switch(this.touches.ONE){case An.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(r),this.state=se.TOUCH_ROTATE;break;case An.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(r),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case An.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(r),this.state=se.TOUCH_DOLLY_PAN;break;case An.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(r),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(Wa)}function Im(r){switch(this._trackPointer(r),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(r),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(r),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(r),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(r),this.update();break;default:this.state=se.NONE}}function Lm(r){this.enabled!==!1&&r.preventDefault()}function Um(r){r.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Fm(r){r.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Nm(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Ur={exports:{}},hl;function Bm(){return hl||(hl=1,(function(r){var t=(function(){var e=String.fromCharCode,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={};function a(l,h){if(!s[l]){s[l]={};for(var c=0;c<l.length;c++)s[l][l.charAt(c)]=c}return s[l][h]}var o={compressToBase64:function(l){if(l==null)return"";var h=o._compress(l,6,function(c){return i.charAt(c)});switch(h.length%4){default:case 0:return h;case 1:return h+"===";case 2:return h+"==";case 3:return h+"="}},decompressFromBase64:function(l){return l==null?"":l==""?null:o._decompress(l.length,32,function(h){return a(i,l.charAt(h))})},compressToUTF16:function(l){return l==null?"":o._compress(l,15,function(h){return e(h+32)})+" "},decompressFromUTF16:function(l){return l==null?"":l==""?null:o._decompress(l.length,16384,function(h){return l.charCodeAt(h)-32})},compressToUint8Array:function(l){for(var h=o.compress(l),c=new Uint8Array(h.length*2),u=0,d=h.length;u<d;u++){var p=h.charCodeAt(u);c[u*2]=p>>>8,c[u*2+1]=p%256}return c},decompressFromUint8Array:function(l){if(l==null)return o.decompress(l);for(var h=new Array(l.length/2),c=0,u=h.length;c<u;c++)h[c]=l[c*2]*256+l[c*2+1];var d=[];return h.forEach(function(p){d.push(e(p))}),o.decompress(d.join(""))},compressToEncodedURIComponent:function(l){return l==null?"":o._compress(l,6,function(h){return n.charAt(h)})},decompressFromEncodedURIComponent:function(l){return l==null?"":l==""?null:(l=l.replace(/ /g,"+"),o._decompress(l.length,32,function(h){return a(n,l.charAt(h))}))},compress:function(l){return o._compress(l,16,function(h){return e(h)})},_compress:function(l,h,c){if(l==null)return"";var u,d,p={},g={},x="",m="",f="",y=2,_=3,T=2,E=[],M=0,A=0,D;for(D=0;D<l.length;D+=1)if(x=l.charAt(D),Object.prototype.hasOwnProperty.call(p,x)||(p[x]=_++,g[x]=!0),m=f+x,Object.prototype.hasOwnProperty.call(p,m))f=m;else{if(Object.prototype.hasOwnProperty.call(g,f)){if(f.charCodeAt(0)<256){for(u=0;u<T;u++)M=M<<1,A==h-1?(A=0,E.push(c(M)),M=0):A++;for(d=f.charCodeAt(0),u=0;u<8;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1}else{for(d=1,u=0;u<T;u++)M=M<<1|d,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=0;for(d=f.charCodeAt(0),u=0;u<16;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1}y--,y==0&&(y=Math.pow(2,T),T++),delete g[f]}else for(d=p[f],u=0;u<T;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1;y--,y==0&&(y=Math.pow(2,T),T++),p[m]=_++,f=String(x)}if(f!==""){if(Object.prototype.hasOwnProperty.call(g,f)){if(f.charCodeAt(0)<256){for(u=0;u<T;u++)M=M<<1,A==h-1?(A=0,E.push(c(M)),M=0):A++;for(d=f.charCodeAt(0),u=0;u<8;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1}else{for(d=1,u=0;u<T;u++)M=M<<1|d,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=0;for(d=f.charCodeAt(0),u=0;u<16;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1}y--,y==0&&(y=Math.pow(2,T),T++),delete g[f]}else for(d=p[f],u=0;u<T;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1;y--,y==0&&(y=Math.pow(2,T),T++)}for(d=2,u=0;u<T;u++)M=M<<1|d&1,A==h-1?(A=0,E.push(c(M)),M=0):A++,d=d>>1;for(;;)if(M=M<<1,A==h-1){E.push(c(M));break}else A++;return E.join("")},decompress:function(l){return l==null?"":l==""?null:o._decompress(l.length,32768,function(h){return l.charCodeAt(h)})},_decompress:function(l,h,c){var u=[],d=4,p=4,g=3,x="",m=[],f,y,_,T,E,M,A,D={val:c(0),position:h,index:1};for(f=0;f<3;f+=1)u[f]=f;for(_=0,E=Math.pow(2,2),M=1;M!=E;)T=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),_|=(T>0?1:0)*M,M<<=1;switch(_){case 0:for(_=0,E=Math.pow(2,8),M=1;M!=E;)T=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),_|=(T>0?1:0)*M,M<<=1;A=e(_);break;case 1:for(_=0,E=Math.pow(2,16),M=1;M!=E;)T=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),_|=(T>0?1:0)*M,M<<=1;A=e(_);break;case 2:return""}for(u[3]=A,y=A,m.push(A);;){if(D.index>l)return"";for(_=0,E=Math.pow(2,g),M=1;M!=E;)T=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),_|=(T>0?1:0)*M,M<<=1;switch(A=_){case 0:for(_=0,E=Math.pow(2,8),M=1;M!=E;)T=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),_|=(T>0?1:0)*M,M<<=1;u[p++]=e(_),A=p-1,d--;break;case 1:for(_=0,E=Math.pow(2,16),M=1;M!=E;)T=D.val&D.position,D.position>>=1,D.position==0&&(D.position=h,D.val=c(D.index++)),_|=(T>0?1:0)*M,M<<=1;u[p++]=e(_),A=p-1,d--;break;case 2:return m.join("")}if(d==0&&(d=Math.pow(2,g),g++),u[A])x=u[A];else if(A===p)x=y+y.charAt(0);else return null;m.push(x),u[p++]=y+x.charAt(0),d--,y=x,d==0&&(d=Math.pow(2,g),g++)}}};return o})();r!=null?r.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(Ur)),Ur.exports}var Om=Bm();const Fr=Nm(Om);class zm{constructor(){this.prefix="god_game_save_"}save(t,e){try{const i=this.prefix+t,n={timestamp:Date.now(),data:e},s=JSON.stringify(n),a=Fr.compressToUTF16(s);return localStorage.setItem(i,a),console.log(`Saved to slot ${t} (Compressed). Size: ${a.length} chars (Original: ${s.length})`),!0}catch(i){return console.error("Save failed:",i),(i.name==="QuotaExceededError"||i.name==="NS_ERROR_DOM_QUOTA_REACHED")&&(console.warn("LocalStorage Quota Exceeded!"),alert("Save Failed: Storage Quota Exceeded. Try deleting old saves.")),!1}}load(t){try{const e=this.prefix+t,i=localStorage.getItem(e);if(!i)return null;console.log(`Loading slot ${t}, Raw length: ${i.length}`);let n=null;const s=Fr.decompressFromUTF16(i);s&&s.startsWith("{")?(n=s,console.log("Load: Decompressed successfully.")):(console.log("Load: Decompression failed or legacy format. Trying raw JSON..."),n=i);const a=JSON.parse(n);return console.log(`Parsed Data for slot ${t}:`,a),a.data}catch(e){return console.error("Load failed:",e),null}}getSlots(){const t=[];for(let e=1;e<=5;e++){const i=this.prefix+e,n=localStorage.getItem(i);if(n)try{let s=null;const a=Fr.decompressFromUTF16(n);a&&a.startsWith("{")?s=a:s=n;const o=JSON.parse(s);t.push({id:e,timestamp:o.timestamp,empty:!1})}catch(s){console.warn(`Slot ${e} check failed:`,s),t.push({id:e,empty:!0})}else t.push({id:e,empty:!0})}return t}}class Gm{constructor(t,e,i){this.scene=t,this.clouds=[],this.cloudCount=30,this.spreadRadius=80;const n=512,s=512,a=document.createElement("canvas");a.width=n,a.height=s;const o=a.getContext("2d"),l=o.createImageData(n,s),h=l.data;for(let c=0;c<s;c++)for(let u=0;u<n;u++){const d=(u/n-.5)*2,p=(c/s-.5)*2,g=Math.sqrt(d*d+p*p),x=(Math.sin(d*3+p*2.5)+Math.cos(p*3.5-d*2.5))*.25+(Math.sin(d*8+p*6)+Math.cos(p*9-d*7))*.12+(Math.sin(d*18)+Math.cos(p*22))*.05,m=1-(g+x*1.5);let f=m<0?0:m>1?1:m*m*(3-2*m);const y=Math.max(0,1-Math.pow(g,4));f*=y;const _=(c*n+u)*4;h[_]=255,h[_+1]=255,h[_+2]=255,h[_+3]=Math.floor(Math.max(0,Math.min(1,f*.7))*255)}o.putImageData(l,0,0),this.texture=new Re(a),this.texture.colorSpace=Ze,this.texture.minFilter=Oi,this.material=new Dl({map:this.texture,transparent:!0,opacity:.9,color:16777215,depthWrite:!1,blending:tn}),this.initClouds(),this.windSpeed=1,this.windDir=new L(1,0,.5).normalize()}initClouds(){for(let t=0;t<this.cloudCount;t++){const e=new mc(this.material),i=20+Math.random()*10,n=1.2+Math.random()*.6;e.scale.set(i*n,i,1),e.material=this.material.clone(),e.material.rotation=Math.random()*Math.PI*2,e.position.set((Math.random()-.5)*this.spreadRadius*2,20+Math.random()*10,(Math.random()-.5)*this.spreadRadius*2),this.scene.add(e),this.clouds.push(e)}}update(t,e){if(!e)return;const i=e.position.x,n=e.position.z,s=this.spreadRadius;for(const a of this.clouds){a.position.addScaledVector(this.windDir,this.windSpeed*t);let o=a.position.x-i,l=a.position.z-n;o>s?a.position.x-=s*2:o<-s&&(a.position.x+=s*2),l>s?a.position.z-=s*2:l<-s&&(a.position.z+=s*2)}}}class Ae{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ae.assets.initialized)return;const t=new hi(.05,.2,4);t.rotateX(Math.PI/2),Ae.assets.geometries.body=t;const e=new Fe,i=new Float32Array([0,0,0,.3,0,.1,0,0,.15]);e.setAttribute("position",new Ge(i,3)),e.computeVertexNormals(),Ae.assets.geometries.wing=e,Ae.assets.materials.body=new Un({color:16777215}),Ae.assets.materials.wing=new Un({color:15658734,side:Ye}),Ae.assets.initialized=!0}constructor(t,e,i,n){Ae.initAssets(),this.scene=t,this.terrainWidth=e,this.terrainDepth=i,this.clippingPlanes=n||[],this.birds=[],this.birdCount=20;const s=Ae.assets.materials;Object.values(s).forEach(a=>{a&&(a.clippingPlanes=this.clippingPlanes)}),this.initBirds()}initBirds(){for(let t=0;t<this.birdCount;t++){const e=new ii,i=new Jt(Ae.assets.geometries.body,Ae.assets.materials.body);e.add(i);const n=new Jt(Ae.assets.geometries.wing,Ae.assets.materials.wing);n.position.set(0,0,0),e.add(n);const s=new Jt(Ae.assets.geometries.wing,Ae.assets.materials.wing);s.position.set(0,0,0),s.scale.x=-1,e.add(s),e.userData.leftWing=n,e.userData.rightWing=s,e.position.set((Math.random()-.5)*this.terrainWidth,15+Math.random()*10,(Math.random()-.5)*this.terrainDepth);const a=2+Math.random()*2,o=Math.random()*Math.PI*2;e.userData.velocity=new L(Math.cos(o)*a,0,Math.sin(o)*a),e.userData.speed=a,e.userData.turnSpeed=.5+Math.random(),e.userData.flapOffset=Math.random()*100,this.scene.add(e),this.birds.push(e)}}update(t,e,i){this.birds.forEach(n=>{n.position.addScaledVector(n.userData.velocity,t);const s=this.terrainWidth/2,a=this.terrainDepth/2;n.position.x>s&&(n.position.x-=this.terrainWidth),n.position.x<-s&&(n.position.x+=this.terrainWidth),n.position.z>a&&(n.position.z-=this.terrainDepth),n.position.z<-a&&(n.position.z+=this.terrainDepth);let o=!0;if(i){const c=new di(n.position,1);o=i.intersectsSphere(c)}if(!o){n.visible=!1;return}if(n.visible=!0,Math.random()<.01){const c=(Math.random()-.5)*2;n.userData.velocity.applyAxisAngle(new L(0,1,0),c*n.userData.turnSpeed*t)}n.lookAt(n.position.clone().add(n.userData.velocity));const h=Math.sin(e*15+n.userData.flapOffset)*.5;n.userData.leftWing.rotation.z=h,n.userData.rightWing.rotation.z=-h,Math.random()<.001&&window.game&&window.game.soundManager&&window.game.soundManager.playBirdSound(n.position)})}}class be extends Js{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){be.assets.initialized||(be.assets.geometries.body=new le(.4,.3,.6),be.assets.geometries.head=new le(.25,.25,.3),be.assets.geometries.leg=new le(.1,.3,.1),be.assets.materials.body=new jt({color:16777215}),be.assets.materials.head=new jt({color:1118481}),be.assets.materials.leg=new jt({color:1118481}),be.assets.initialized=!0)}constructor(t,e,i,n){be.initAssets(),super(t,e,i,n,"sheep"),this.moveInterval=2e3+Math.random()*3e3,this.lastTime=0,this.stagnationTimer=0,this.mesh=this.createMesh(),this.scene.add(this.mesh),this.updatePosition()}createMesh(){const t=new ii,e=new Jt(be.assets.geometries.body,be.assets.materials.body);e.position.y=.3,t.add(e);const i=new Jt(be.assets.geometries.head,be.assets.materials.head);i.position.set(0,.5,.35),t.add(i);const n=[{x:.1,z:.2},{x:-.1,z:.2},{x:.1,z:-.2},{x:-.1,z:-.2}],s=[];return n.forEach(a=>{const o=new Jt(be.assets.geometries.leg,be.assets.materials.leg);o.position.set(a.x,.15,a.z),t.add(o),s.push(o)}),t.userData.legs=s,t}updateLogic(t,e){if(this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die(),this.isDead=!0;return}this.isMoving||(t-this.lastTime>this.moveInterval?(this.moveRandomly(t),this.lastTime=t,this.moveInterval=2e3+Math.random()*3e3):this.mesh&&this.mesh.userData.legs&&this.mesh.userData.legs.forEach(n=>n.rotation.x=0))}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let s=n.length-1;s>0;s--){const a=Math.floor(Math.random()*(s+1));[n[s],n[a]]=[n[a],n[s]]}for(const s of n){let a=this.gridX+s.x,o=this.gridZ+s.z;if(a<0&&(a=e-1),a>=e&&(a=0),o<0&&(o=i-1),o>=i&&(o=0),this.canMoveTo(a,o)){this.executeMove(a,o,t);return}}}canMoveTo(t,e){const i=this.terrain.getTileHeight(t,e),n=this.terrain.getTileHeight(this.gridX,this.gridZ);if(i<=0||Math.abs(i-n)>1)return!1;const s=this.terrain.grid[t]&&this.terrain.grid[t][e];return!(s&&s.hasBuilding)}onMoveStep(t){const e=Math.sin(t*Math.PI*4)*.5;this.mesh&&this.mesh.userData.legs&&(this.mesh.userData.legs[0].rotation.x=e,this.mesh.userData.legs[1].rotation.x=-e,this.mesh.userData.legs[2].rotation.x=-e,this.mesh.userData.legs[3].rotation.x=e),this.mesh&&(this.mesh.rotation.y=this.rotationY,this.mesh.position.copy(this.position))}dispose(){this.mesh&&this.scene.remove(this.mesh),this.terrain.unregisterEntity(this)}}class km{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.sheeps=[],this.sheepCount=10,be.initAssets();const n=be.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this.initSheeps(),console.log("SheepManager Refactored: Initialized with Entity-based Sheep.")}initSheeps(){this.sheeps=[];const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;for(let i=0;i<this.sheepCount;i++)this.spawnRandomSheep(t,e)}spawnRandomSheep(t,e){let i=0;for(;i<50;){const n=Math.floor(Math.random()*t),s=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,s)>.5){const o=this.terrain.grid[n]&&this.terrain.grid[n][s];if(!o||!o.hasBuilding){const l=new be(this.scene,this.terrain,n,s);this.sheeps.push(l);return}}i++}}removeSheep(t){t.dispose()}update(t,e){for(let i=this.sheeps.length-1;i>=0;i--){const n=this.sheeps[i];n.updateLogic(t,e),n.updateMovement(t),n.isDead&&(this.removeSheep(n),this.sheeps.splice(i,1))}}}class Hm{constructor(){this.context=null,this.masterGain=null,this.initialized=!1,this.camera=null,this.frustum=new ns,this.projScreenMatrix=new Kt}init(t){if(this.camera=t,!this.context)try{const e=window.AudioContext||window.webkitAudioContext;this.context=new e,this.masterGain=this.context.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.context.destination),console.log("AudioContext created")}catch(e){console.error("Web Audio API not supported",e);return}try{const e=this.context.createBuffer(1,1,22050),i=this.context.createBufferSource();i.buffer=e,i.connect(this.context.destination),i.start(0)}catch(e){console.warn("Silent buffer unlock failed",e)}this.context.state!=="running"?this.context.resume().then(()=>{console.log("AudioContext resumed, state:",this.context.state),this.initialized=!0}).catch(e=>{console.error("AudioContext resume failed",e)}):this.initialized=!0}resumeContext(){this.context&&this.context.state!=="running"&&this.context.resume().then(()=>{console.log("AudioContext resumed by user gesture."),this.initialized=!0})}updateFrustum(){this.camera&&(this.camera.updateMatrixWorld(),this.projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projScreenMatrix))}isVisible(t){return!this.camera||!this.initialized?!0:(this.updateFrustum(),this.frustum.containsPoint(t))}getVolume(){if(!this.camera)return .5;const t=this.camera.zoom,e=.8;return .1+(t-e)/(4-e)*.9}playBirdSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=n=>{setTimeout(()=>{if(!this.context)return;const s=this.context.currentTime,a=this.context.createOscillator(),o=this.context.createGain();a.type="sine";const l=2500+Math.random()*200;a.frequency.setValueAtTime(l,s),a.frequency.exponentialRampToValueAtTime(l*.8,s+.1),a.connect(o),o.connect(this.masterGain),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(e*.4,s+.01),o.gain.exponentialRampToValueAtTime(.01,s+.15),a.start(s),a.stop(s+.15)},n)};i(0),i(200),i(400)}playSheepSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=this.context.currentTime,n=.6+Math.random()*.4,s=this.context.createOscillator();s.type="sawtooth";const a=350+Math.random()*40;s.frequency.setValueAtTime(a,i),s.frequency.exponentialRampToValueAtTime(a*.8,i+n);const o=this.context.createOscillator(),l=this.context.createGain();o.frequency.value=7+Math.random()*2,l.gain.setValueAtTime(.7,i);const h=this.context.createGain(),c=this.context.createGain();c.gain.value=1;const u=this.context.createGain();u.gain.value=.3,o.connect(u),u.connect(c.gain),o.start(i),o.stop(i+n);const d=this.context.createBiquadFilter();d.type="lowpass",d.frequency.value=1200,d.Q.value=1,s.connect(c),c.connect(d),d.connect(h),h.connect(this.masterGain),h.gain.setValueAtTime(0,i),h.gain.linearRampToValueAtTime(e*.6,i+.1),h.gain.linearRampToValueAtTime(e*.5,i+n*.6),h.gain.exponentialRampToValueAtTime(.01,i+n),s.start(i),s.stop(i+n)}}class Gt extends Js{static nextId=0;static assets={geometries:{},materials:{},initialized:!1};static initAssets(){Gt.assets.initialized||(Gt.assets.geometries.torsoNormal=new le(.25,.3,.2),Gt.assets.geometries.torsoHob=new le(.35,.3,.2),Gt.assets.geometries.head=new le(.2,.2,.2),Gt.assets.geometries.ear=new hi(.05,.15,4),Gt.assets.geometries.arm=new le(.08,.25,.08),Gt.assets.geometries.leg=new le(.1,.25,.1),Gt.assets.geometries.club=new Mi(.03,.05,.4,6),Gt.assets.geometries.staff=new le(.04,.8,.04),Gt.assets.geometries.crossV=new le(.2,.8,.2),Gt.assets.geometries.crossH=new le(.6,.2,.2),Gt.assets.materials.skinNormal=new jt({color:5614165}),Gt.assets.materials.clothesNormal=new jt({color:9127187}),Gt.assets.materials.skinHob=new jt({color:3368499}),Gt.assets.materials.clothesHob=new jt({color:2236962}),Gt.assets.materials.club=new jt({color:6636321}),Gt.assets.materials.staff=new jt({color:9127187}),Gt.assets.materials.skinShaman=new jt({color:34952}),Gt.assets.materials.clothesShaman=new jt({color:3342438}),Gt.assets.materials.skinKing=new jt({color:8912896}),Gt.assets.materials.clothesKing=new jt({color:16766720}),Gt.assets.materials.cross=new jt({color:5614165,transparent:!0,opacity:1}),Gt.assets.initialized=!0)}constructor(t,e,i,n,s="normal",a=null,o=null){Gt.initAssets(),super(t,e,i,n,"goblin"),this.type=s,this.type=s,this.clanId=a,this.id=Gt.nextId++,this.scale=1,this.isRanged=!1,this.type==="king"?(this.hp=1200+Math.floor(Math.random()*200),this.maxHp=this.hp,this.lifespan=300,this.damage=200,this.scale=1.8,this.attackRate=1.5):this.type==="shaman"?(this.hp=500+Math.floor(Math.random()*100),this.maxHp=this.hp,this.lifespan=250,this.damage=80,this.scale=1.2,this.isRanged=!0,this.attackRate=2):this.type==="hobgoblin"?(this.hp=60+Math.floor(Math.random()*30),this.maxHp=this.hp,this.lifespan=200+Math.random()*40,this.damage=15,this.scale=1.2):(this.hp=30+Math.floor(Math.random()*10),this.maxHp=this.hp,this.lifespan=100+Math.random()*20,this.damage=8),this.age=0,this.isDead=!1,this.isFinished=!1,this.state="idle",o&&(this.state="raiding",this.raidGoal={...o},this.raidGoal.x+=(Math.random()-.5)*8,this.raidGoal.z+=(Math.random()-.5)*8,console.log(`Goblin ${this.id} SPAWNED FOR RAIDING! Target: ${this.raidGoal.x.toFixed(0)},${this.raidGoal.z.toFixed(0)}`)),this.attackCooldown=0,this.targetUnit=null,this.targetBuilding=null,this.ignoredTargets=new Map,this.attackRate||(this.attackRate=1),this.position=new L,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}},this.walkAnimTimer=0,this.position.set(this.terrain.gridToWorld(this.gridX),this.terrain.getTileHeight(this.gridX,this.gridZ),this.terrain.gridToWorld(this.gridZ)),this.isMoving=!1,this.moveTimer=0,this.moveInterval=1e3,this.lastTime=-9999,this.baseMoveDuration=500,this.moveDuration=this.baseMoveDuration,this.terrain.registerEntity(this,this.gridX,this.gridZ,"goblin")}updateLogic(t,e,i,n){if(this.isDead||this.isFinished)return;if(this.age+=e,this.age>=this.lifespan){this.die();return}if(!this.isMoving&&this.age>5&&this.age<5.5&&console.log(`[Goblin Debug ${this.id}] 5s Check: State=${this.state} Pos=${this.gridX},${this.gridZ} TargetU=${!!this.targetUnit} TargetB=${!!this.targetBuilding} LastTimeDiff=${t-this.lastTime}`),this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die();return}if(this.isMoving&&this.updateMovement(t),this.attackCooldown>0&&(this.attackCooldown-=e),Math.random()<.005&&console.log(`[GoblinAI] ID:${this.id} State:${this.state} Moving:${this.isMoving} TargetU:${!!this.targetUnit} TargetB:${!!this.targetBuilding} Pos:${this.gridX.toFixed(1)},${this.gridZ.toFixed(1)}`),!this.isMoving){if(this.state==="migrating"&&this.migrationTarget){const a=this.getDistance(this.migrationTarget.x,this.migrationTarget.z),o=this.minDistToTarget||1/0;a<o-.5?(this.minDistToTarget=a,this.pathStagnation=0):this.pathStagnation=(this.pathStagnation||0)+e,this.pathStagnation>5&&(console.log(`[Goblin ${this.id}] Migration Stagnation. Force Re-path.`),this.path=null,this.lastPathTime=0,this.pathStagnation=0,this.minDistToTarget=a),!this.smartMove(this.migrationTarget.x,this.migrationTarget.z,t)&&this.isMoving,a<2&&(console.log(`Goblin ${this.id} finished migrating.`),this.state="idle",this.migrationTarget=null),this.findTarget(i,n,t),(this.targetUnit||this.targetBuilding)&&(console.log(`Goblin ${this.id} interrupted migration for target!`),this.state="idle",this.migrationTarget=null);return}if(this.findTarget(i,n),this.targetUnit&&this.targetUnit.isDead&&(this.targetUnit=null,this.chaseTimer=0),this.currentMemoryTarget&&!this.targetUnit&&!this.targetBuilding){const a=this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z),o=this.minDistToTarget||1/0;if(a<o-.5?(this.minDistToTarget=a,this.pathStagnation=0):this.pathStagnation=(this.pathStagnation||0)+e,this.pathStagnation>5){console.log(`[Goblin ${this.id}] Memory Target Stagnation. Abort.`),this.currentMemoryTarget=null,this.pathStagnation=0,this.moveRandomly(t);return}a<5&&(window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null)}if(this.targetUnit)if(this.chaseTimer=(this.chaseTimer||0)+e,this.chaseTimer>10)this.targetUnit=null,this.chaseTimer=0,this.moveRandomly(t);else{if(this.smartMove(this.targetUnit.gridX,this.targetUnit.gridZ,t),!this.targetUnit)return;this.getDistance(this.targetUnit.gridX,this.targetUnit.gridZ)<=1.8&&(this.attackTarget(t,e),this.chaseTimer=0)}else if(this.targetBuilding)this.smartMove(this.targetBuilding.gridX,this.targetBuilding.gridZ,t),this.getDistanceToBuilding(this.targetBuilding)<=2.5&&this.attackTarget(t,e);else{if(this.state==="raiding"&&this.raidGoal){const a=this.getDistance(this.raidGoal.x,this.raidGoal.z),o=this.minDistToTarget||1/0;if(a<o-.5?(this.minDistToTarget=a,this.pathStagnation=0):this.pathStagnation=(this.pathStagnation||0)+e,this.pathStagnation>5&&(console.log(`[Goblin ${this.id}] Raid Stagnation. Force Re-path.`),this.path=null,this.lastPathTime=0,this.pathStagnation=0,this.minDistToTarget=a),a<5)console.log(`Goblin ${this.id} arrived at Raid Target. Switch to IDLE (Hunt).`),this.state="idle",this.raidGoal=null;else{this.smartMove(this.raidGoal.x,this.raidGoal.z,t);return}}if(!this.isMoving&&t-this.lastTime>this.moveInterval){this.wanderCount=(this.wanderCount||0)+1;let a=!1;if(Math.random()<.02&&(a=this.tryBuildHut()),a)this.wanderCount=0;else if(this.wanderCount>10){console.log(`Goblin ${this.id} bored. Migrating...`),this.migrate(t),this.wanderCount=0,this.lastTime=t;return}this.moveRandomly(t),this.lastTime=t}}}}findTarget(t,e){const i=window.game?window.game.gameTotalTime:Date.now();if(this.frustratedUntil&&i<this.frustratedUntil||(this.targetUnit&&(this.targetUnit.isDead||this.targetUnit.isFinished)&&(this.targetUnit=null),this.targetBuilding&&this.targetBuilding.userData.hp<=0&&(this.targetBuilding=null),this.targetUnit||this.targetBuilding))return;const n=this.state==="raiding"?20:10,s=this.terrain.findBestTarget("unit",this.gridX,this.gridZ,n,(h,c)=>{if(h.isSleeping)return 1/0;const u=window.game?window.game.gameTotalTime:Date.now();if(this.ignoredTargets.has(h.id)&&this.ignoredTargets.get(h.id)>u)return 1/0;const d=this.terrain.getTileHeight(h.gridX,h.gridZ);let p=c;return d>8&&(p+=20),p},t),a=this.state==="raiding"?30:20,o=this.terrain.findBestTarget("building",this.gridX,this.gridZ,a,(h,c)=>!h.userData||h.userData.type==="goblin_hut"||h.userData.type==="cave"||h.userData.hp!==void 0&&h.userData.hp<=0||h.userData.population!==void 0&&h.userData.population<=0?1/0:c,e);let l=null;if(s&&o){const h=this.terrain.logicalWidth||80,c=this.terrain.logicalDepth||80,u=Math.abs(s.gridX-this.gridX),d=Math.abs(s.gridZ-this.gridZ),p=Math.min(u,h-u),g=Math.min(d,c-d),x=Math.sqrt(p*p+g*g),m=Math.abs(o.gridX-this.gridX),f=Math.abs(o.gridZ-this.gridZ),y=Math.min(m,h-m),_=Math.min(f,c-f),T=Math.sqrt(y*y+_*_);T<15?l=o:l=x<T?s:o}else l=s||o;l&&(l.userData&&l.userData.hp!==void 0?this.targetBuilding=l:this.targetUnit=l),!this.targetUnit&&!this.targetBuilding&&this.currentMemoryTarget&&(this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z)<5&&window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null)}getDistanceToBuilding(t){if(!t)return 1/0;let e=1;this.terrain&&this.terrain.getBuildingSize?e=this.terrain.getBuildingSize(t.type):((t.type==="house"||t.type==="farm")&&(e=2),(t.type==="mansion"||t.type==="barracks"||t.type==="tower")&&(e=3),t.type==="castle"&&(e=4));const i=t.gridX,n=t.gridX+e-1,s=t.gridZ,a=t.gridZ+e-1,o=Math.max(i-this.gridX,0,this.gridX-n),l=Math.max(s-this.gridZ,0,this.gridZ-a);return Math.sqrt(o*o+l*l)}moveRandomly(t){if(this.clanId&&Math.random()<.3){if(Math.random()<.2)console.log(`Goblin ${this.id} distracted from raid!`),this.tryBuildHut();else if(window.game&&window.game.goblinManager){const a=window.game.goblinManager.getClanRaidTarget(this.clanId);if(a&&(this.currentMemoryTarget=a,this.getDistance(a.x,a.z)>3)){this.smartMove(a.x,a.z,t);return}}}const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let a=n.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[n[a],n[o]]=[n[o],n[a]]}const s=this.terrain.getTileHeight(this.gridX,this.gridZ);for(const a of n){let o=this.gridX+a.x,l=this.gridZ+a.z;if(o<0&&(o=e-1),o>=e&&(o=0),l<0&&(l=i-1),l>=i&&(l=0),!this.isReachable(o,l))continue;const h=this.terrain.getTileHeight(o,l);if(Math.abs(h-s)<=2&&h>0){if(this.terrain.grid[o][l].hasBuilding)continue;this.startMove(o,l,t);return}}this.lastTime=t}handleMoveFailure(t){this.pathFailCount=(this.pathFailCount||0)+1,this.pathFailCount>3&&(console.log(`Goblin ${this.id} gave up target! Stuck/Coast.`),this.targetUnit=null,this.targetBuilding=null,this.currentMemoryTarget=null,this.path=null,this.pathFailCount=0,this.moveRandomly(t))}startMove(t,e,i){if(this.gridX===void 0||isNaN(this.gridX)){console.error(`Goblin ${this.id} startMove failed: Invalid gridX (${this.gridX})`),this.isMoving=!1;return}const n=this.terrain.getTileHeight(t,e),s=this.terrain.getTileHeight(this.gridX,this.gridZ);if(Math.abs(n-s)>2){this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>5&&(this.targetBuilding=null,this.stuckCount=0,this.moveRandomly(i));return}super.startMove(t,e,i);const a=Math.abs(n-s);n>8?this.moveDuration=6e3:a>.1?this.moveDuration=3e3:this.moveDuration=this.baseMoveDuration||800,this.stuckCount=0,this.pathFailCount=0}onMoveFinished(t){this.walkAnimTimer=0,this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0}onMoveStep(t){this.walkAnimTimer+=.1;const e=Math.sin(this.walkAnimTimer)*.5,i=Math.sin(this.walkAnimTimer)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-i,this.limbs.rightLeg.x=i}attackTarget(t,e){if(window.game&&window.game.goblinManager){const i=this.targetUnit||this.targetBuilding;window.game.goblinManager.notifyClanActivity(this.clanId,i)}this.targetUnit?this.attackUnit(this.targetUnit):this.targetBuilding&&this.attackBuilding(this.targetBuilding)}attackUnit(t){if(!(this.attackCooldown>0)){if(t.isDead){this.targetUnit=null;return}if(this.isRanged){if(this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},500),window.game&&window.game.spawnProjectile){const e=this.position.clone().add(new L(0,.8*this.scale,0)),i=t.position.clone().add(new L(0,.5,0));window.game.spawnProjectile(e,i,65535)}}else this.limbs.rightArm.x=-Math.PI/2;setTimeout(()=>{this.isRanged||(this.limbs.rightArm.x=0);const e=this.getDistance(t.gridX,t.gridZ);!t.isDead&&(this.isRanged||e<=2.5)&&(t.takeDamage(this.damage),console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${t.hp}`),t.isDead&&window.game&&window.game.goblinManager&&(window.game.goblinManager.increasePlunder(),window.game.goblinManager.recordRaidLocation(this.clanId,t.gridX,t.gridZ)))},200),this.attackCooldown=this.attackRate}}attackBuilding(t){if(this.attackCooldown>0)return;if(this.isRanged){if(this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},500),window.game&&window.game.spawnProjectile){const n=this.position.clone().add(new L(0,.8*this.scale,0)),s=this.terrain.gridToWorld(t.userData.gridX),a=this.terrain.gridToWorld(t.userData.gridZ),o=new L(s,t.y+1,a);window.game.spawnProjectile(n,o,65535)}}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.limbs.rightArm.x=0},200);if(!t||!t.userData){console.error(`Goblin ${this.id} attackBuilding failed: Invalid building data`,t),this.targetBuilding=null;return}t.userData.population===void 0&&(t.userData.population=10);const e=t.userData.type==="castle",i=t.userData.type==="farm";if(i&&t.userData.hp!==void 0&&(t.userData.hp-=5,t.userData.hp<=0)){this.destroyBuilding(t);return}if(!i&&t.userData.population>0){const n=e?.2:.1,s=Math.floor(t.userData.population*n);s>0&&this.takeDamage(s)}this.attackCooldown=this.attackRate}destroyBuilding(t){t&&(this.terrain.removeBuilding(t),console.log(`Goblin ${this.id} destroyed ${t.userData.type}!`),window.game&&window.game.goblinManager&&window.game.goblinManager.increasePlunder(),this.targetBuilding=null)}takeDamage(t){if(!this.isDead){if(this.hp-=t,this.isMoving,this.attackCooldown>0){const e=this.attackCooldown/this.attackRate;e<.9&&e>.5&&(this.limbs.rightArm.x=-Math.PI/2+Math.sin(e*Math.PI*4)*.5)}this.hp<=0&&this.die()}}die(){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.clanId&&window.goblinManager,this.createCross(),console.log(`Goblin (${this.type}) died. ID:${this.id}`),this.type==="king"&&window.game&&(window.game.mana+=500,console.log("King Defeated! +500 Mana"),this.terrain&&this.terrain.createFloatingText&&this.terrain.scene.add(this.terrain.createFloatingText("+500",this.mesh.position,16776960))))}dispose(){this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.material&&t.userData.clonedMat&&t.material.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}createCross(){const t=new ii,e=new Jt(Gt.assets.geometries.crossV,Gt.assets.materials.cross);e.position.y=.4,t.add(e);const i=new Jt(Gt.assets.geometries.crossH,Gt.assets.materials.cross);i.position.y=.6,t.add(i);const n=this.terrain.getVisualPosition(this.gridX,this.gridZ,!0);t.position.set(n.x,n.y+.2,n.z),this.scene.add(t),this.crossMesh=t,this.deathTimer=0,setTimeout(()=>{this.crossMesh&&(console.log(`[Goblin] Failsafe removing cross ID:${this.id}`),this.scene.remove(this.crossMesh),this.crossMesh.traverse(s=>{s.material&&s.userData.clonedMat&&s.material.dispose()}),this.crossMesh=null)},1500)}updateDeathAnimation(t){if(!this.crossMesh){this.isFinished=!0;return}isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=1;if(this.deathTimer>=i)console.log(`[Goblin] Death Animation Finished ID:${this.id}. Removing Cross.`),this.scene.remove(this.crossMesh),this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this),this.crossMesh.children.forEach(n=>{n.material&&n.userData.clonedMat&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material&&(s.userData.clonedMat||(s.material=s.material.clone(),s.userData.clonedMat=!0),s.material.opacity=1-n)})}}migrate(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.random()*Math.PI*2,s=20+Math.random()*20;let a=Math.floor(this.gridX+Math.cos(n)*s),o=Math.floor(this.gridZ+Math.sin(n)*s);a<0&&(a+=e),a>=e&&(a-=e),o<0&&(o+=i),o>=i&&(o-=i),this.terrain.getTileHeight(a,o)<=0&&(a=(a+5)%e),console.log(`Goblin ${this.id} migrating to ${a},${o} (Walking)`),this.state="migrating",this.migrationTarget={x:a,z:o},this.smartMove(a,o,t)}tryBuildHut(){const t=Math.round(this.gridX),e=Math.round(this.gridZ);if(!this.terrain.grid[t]||!this.terrain.grid[t][e]||this.terrain.grid[t][e].hasBuilding)return!1;const i=this.terrain.getTileHeight(t,e);if(i>8||i<=0)return!1;const n=this.terrain.buildings||[],s=6;for(const o of n)if(o.userData.type==="goblin_hut"){const l=o.userData.gridX-t,h=o.userData.gridZ-e;if(l*l+h*h<s*s)return!1}const a=this.terrain.addBuilding("goblin_hut",t,e);return a?(a.userData.clanId=this.clanId,console.log(`Goblin (Clan: ${this.clanId}) built a Hut!`),!0):!1}serialize(){return{id:this.id,type:this.type,gridX:this.gridX,gridZ:this.gridZ,hp:this.hp,maxHp:this.maxHp,clanId:this.clanId,age:this.age,lifespan:this.lifespan,state:this.state,migrationTarget:this.migrationTarget,scale:this.scale}}}class Wl{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.MAX_INSTANCES=5e4,Gt.initAssets();const n=Gt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this._dummy=new xe,this._scratchVector=new L,this._scratchSphere=new di(new L,2),this.initInstancedMeshes()}initInstancedMeshes(){const t=(i,n,s)=>{const a=new $e(i,n,s);return a.instanceMatrix.setUsage(qe),a.frustumCulled=!1,a.castShadow=!0,a.receiveShadow=!0,this.scene.add(a),a},e=Gt.assets;this.torsoMesh=t(e.geometries.torsoNormal,this.getWhiteMaterial(),this.MAX_INSTANCES),this.headMesh=t(e.geometries.head,this.getWhiteMaterial(),this.MAX_INSTANCES),this.earMesh=t(e.geometries.ear,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.armMesh=t(e.geometries.arm,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.legMesh=t(e.geometries.leg,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.clubMesh=t(e.geometries.club,e.materials.club,this.MAX_INSTANCES),this.staffMesh=t(e.geometries.staff,e.materials.staff,this.MAX_INSTANCES)}getWhiteMaterial(){return this.whiteMat||(this.whiteMat=new jt({color:16777215,clippingPlanes:this.clippingPlanes})),this.whiteMat}update(t,e){if(!t)return;let i=0,n=0,s=0,a=0,o=0,l=0;const h=performance.now();(!this.lastLog||h-this.lastLog>2e3)&&(console.log(`[GoblinRenderer] Updating ${t.length} goblins.`),this.lastLog=h);const c=this._dummy,u=this.terrain.logicalWidth||80,d=this.terrain.logicalDepth||80;e&&(Math.round(e.position.x/u),Math.round(e.position.z/d));const p=new dt(5614165),g=new dt(3368499),x=new dt(34952),m=new dt(8912896),f=new dt(9127187),y=new dt(2236962),_=new dt(3342438),T=new dt(16766720);for(const E of t){if(E.isDead||E.isFinished)continue;const M=E.type==="hobgoblin",A=E.type==="king",D=E.type==="shaman";let v=p,S=f;M?(v=g,S=y):D?(v=x,S=_):A&&(v=m,S=T);let C=E.scale||1;M&&C===1&&(C=1.2);let U;E.position&&E.isMoving?U={x:E.position.x,y:E.position.y,z:E.position.z}:U=this.terrain.getVisualPosition(E.gridX,E.gridZ,!0);const B=60,H=Math.floor((e.position.x-B-U.x)/u),W=Math.ceil((e.position.x+B-U.x)/u),$=Math.floor((e.position.z-B-U.z)/d),J=Math.ceil((e.position.z+B-U.z)/d),k=E.rotationY||0,et=E.limbs&&E.limbs.leftArm?E.limbs.leftArm.x:0,it=E.limbs&&E.limbs.rightArm?E.limbs.rightArm.x:0,yt=E.limbs&&E.limbs.leftLeg?E.limbs.leftLeg.x:0,Ht=E.limbs&&E.limbs.rightLeg?E.limbs.rightLeg.x:0;for(let qt=H;qt<=W;qt++)for(let Yt=$;Yt<=J&&!(i>=this.MAX_INSTANCES);Yt++){const Qt=qt*u,X=Yt*d,Z=U.x+Qt,ht=U.z+X,wt=U.y;c.position.set(Z,wt+.3,ht),c.rotation.set(0,k,0);const Mt=M?1.4:1;if(c.scale.set(C*Mt,C,C),c.updateMatrix(),this.torsoMesh.setMatrixAt(i,c.matrix),this.torsoMesh.setColorAt(i,v),c.position.set(Z,wt+.55,ht),c.rotation.set(0,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.headMesh.setMatrixAt(i,c.matrix),this.headMesh.setColorAt(i,v),c.position.set(.12*C,.55,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L(Z,wt,ht)),c.rotation.set(0,k,-Math.PI/2),c.scale.set(C,C,C),c.updateMatrix(),this.earMesh.setMatrixAt(n++,c.matrix),this.earMesh.setColorAt(n-1,v),c.position.set(-.12*C,.55,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L(Z,wt,ht)),c.rotation.set(0,k,Math.PI/2),c.scale.set(C,C,C),c.updateMatrix(),this.earMesh.setMatrixAt(n++,c.matrix),this.earMesh.setColorAt(n-1,v),c.position.set(.18*C,.3,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L(Z,wt,ht)),c.rotation.set(et,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.armMesh.setMatrixAt(s++,c.matrix),this.armMesh.setColorAt(s-1,v),c.position.set(-.18*C,.3,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L(Z,wt,ht)),c.rotation.set(it,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.armMesh.setMatrixAt(s++,c.matrix),this.armMesh.setColorAt(s-1,v),D){const Nt=new L(0,0,.1);Nt.applyEuler(c.rotation);const _e=c.position.clone().add(Nt);c.position.copy(_e),c.rotation.set(it+Math.PI/2,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.staffMesh.setMatrixAt(l++,c.matrix)}else{const Nt=new L(0,-.15,.1);Nt.applyEuler(c.rotation);const _e=c.position.clone().add(Nt);c.position.copy(_e),c.rotation.set(it+Math.PI/2,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.clubMesh.setMatrixAt(o++,c.matrix)}c.position.set(.08*C,.12,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L(Z,wt,ht)),c.rotation.set(yt,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.legMesh.setMatrixAt(a++,c.matrix),this.legMesh.setColorAt(a-1,S),c.position.set(-.08*C,.12,0),c.position.applyAxisAngle(new L(0,1,0),k),c.position.add(new L(Z,wt,ht)),c.rotation.set(Ht,k,0),c.scale.set(C,C,C),c.updateMatrix(),this.legMesh.setMatrixAt(a++,c.matrix),this.legMesh.setColorAt(a-1,S),i++}}this.torsoMesh.count=i,this.headMesh.count=i,this.earMesh.count=n,this.armMesh.count=s,this.legMesh.count=a,this.clubMesh.count=o,this.staffMesh.count=l,this.torsoMesh.instanceMatrix.needsUpdate=!0,this.torsoMesh.instanceColor.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.headMesh.instanceColor.needsUpdate=!0,this.earMesh.instanceMatrix.needsUpdate=!0,this.earMesh.instanceColor.needsUpdate=!0,this.armMesh.instanceMatrix.needsUpdate=!0,this.armMesh.instanceColor.needsUpdate=!0,this.legMesh.instanceMatrix.needsUpdate=!0,this.legMesh.instanceColor.needsUpdate=!0,this.clubMesh.instanceMatrix.needsUpdate=!0,this.staffMesh.instanceMatrix.needsUpdate=!0}dispose(){console.log("[GoblinRenderer] Disposing...");const t=e=>{e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):e.material.dispose()))};t(this.torsoMesh),t(this.headMesh),t(this.earMesh),t(this.armMesh),t(this.legMesh),t(this.clubMesh),t(this.staffMesh),this.whiteMat&&this.whiteMat.dispose()}}class Vm{constructor(t,e,i){this.scene=t,this.terrain=e,this.particleManager=i,this.goblins=[],this.caves=[],this.hutSpawnTimers=new Map,this.renderer=new Wl(t,e,e.clippingPlanes),this.spawnTimer=0,this.spawnInterval=20,this.plunderCount=0,this.MAX_GOBLINS=2e4,this.clanMemory={},Gt.initAssets();const n=Gt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.terrain.clippingPlanes)}),this.caveGroup=new ii,this.scene.add(this.caveGroup),this.generateCaves(),this.caves.length>0&&(console.log("GoblinManager: Force spawning Debug Goblin"),this.spawnGoblinAtCave(this.caves[0]))}reset(){console.log("Resetting GoblinManager...");for(const t of this.goblins)t.mesh&&this.scene.remove(t.mesh),t.dispose&&t.dispose();this.goblins=[],this.plunderCount=0,this.caves.forEach(t=>{t.mesh&&this.caveGroup.remove(t.mesh)}),this.caves=[]}scanForCaves(){this.terrain.buildings.forEach(t=>{t.userData.type==="cave"&&this.registerCave(t)})}registerCave(t){if(this.caves.some(i=>i.gridX===t.userData.gridX&&i.gridZ===t.userData.gridZ))return;const e={gridX:t.userData.gridX,gridZ:t.userData.gridZ,mesh:new ii,spawnCooldown:0,originalHeight:t.y,building:t,clanId:`clan_${t.userData.gridX}_${t.userData.gridZ} `};this.caves.push(e)}generateCaves(){console.log("GoblinManager: Generation started...");const t=5,e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=0,s=0;for(;n<t&&s<5e3;){s++;const a=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);this.isValidCaveSpot(a,o)&&this.createCave(a,o)&&n++}console.log(`GoblinManager: Generated ${n} goblin caves after ${s} attempts.`)}isValidCaveSpot(t,e){const i=this.terrain.getTileHeight(t,e);return!(i<=2||i>10)}createCaveTexture(){if(this.caveTexture)return this.caveTexture;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),i=e.createRadialGradient(64,64,10,64,64,60);return i.addColorStop(0,"#000000"),i.addColorStop(.6,"#1a1a1a"),i.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=i,e.fillRect(0,0,128,128),e.fillStyle="#FFFF00",e.beginPath(),e.arc(50,50,2,0,Math.PI*2),e.arc(78,50,2,0,Math.PI*2),e.fill(),this.caveTexture=new Re(t),this.caveTexture}createCave(t,e){const i=this.terrain.getTileHeight(t,e),n=new ss(.4,16,16),s=new jt({color:0,clippingPlanes:this.terrain.clippingPlanes||[]}),a=new Jt(n,s),o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;a.position.set(t-o/2+.5,i,e-l/2+.5),a.scale.set(1,.6,1),this.caveGroup.add(a);const h=this.terrain.addBuilding("cave",t,e);if(h){console.log(`GoblinManager: Cave registered at ${t},${e} `),h.userData.linkedMesh=a;const c=`clan_cave_${t}_${e}`;return this.caves.push({mesh:a,building:h,gridX:t,gridZ:e,originalHeight:i,spawnCooldown:Math.random()*this.spawnInterval,clanId:c}),this.notifyClanActivity(c,null),!0}else return console.warn(`GoblinManager: Failed to register cave at ${t},${e} (Terrain rejected)`),this.caveGroup.remove(a),!1}update(t,e,i,n,s=1,a){this.caves.forEach((c,u)=>{u===0&&Math.random()<.01&&console.log(`[GoblinManager] Cave 0 Pos: ${c.mesh.position.x.toFixed(2)}, ${c.mesh.position.y.toFixed(2)}, ${c.mesh.position.z.toFixed(2)} Visible:${c.mesh.visible} Parent:${!!c.mesh.parent} `);const d=this.terrain.getTileHeight(c.gridX,c.gridZ);if(d<=0){console.error(`[GoblinManager] Cave destroyed: SUBMERGED(H = ${d})`),this.destroyCave(c,u);return}if(c.building){if(!this.terrain.buildings.includes(c.building)){console.error("[GoblinManager] Cave destroyed: BUILDING MISSING from Terrain!"),this.destroyCave(c,u);return}c.mesh.position.y!==c.building.y&&(c.mesh.position.y=c.building.y)}else c.mesh.position.y=d;Math.abs(d-c.originalHeight)>.1&&(c.originalHeight=d,c.mesh.position.y=d,c.mesh.updateMatrix()),c.spawnCooldown-=e,c.spawnCooldown<=0&&this.goblins.length<(this.MAX_GOBLINS||2e4)&&(this.spawnGoblinAtCave(c),c.spawnCooldown=this.spawnInterval+Math.random()*5)}),this.updateClanWaves(e),this.updateHuts(e);const o=this.terrain.buildings||[],l=Math.max(1,Math.floor(2/s));this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const h=this.frameCount%l;for(let c=this.goblins.length-1;c>=0;c--){const u=this.goblins[c];if(u.updateMovement&&u.updateMovement(t),u.updateVisuals&&u.updateVisuals(),c%l===h){try{u.isDead?u.updateDeathAnimation(e*l):u.updateLogic(t,e*l,n,o)}catch(d){this._hasLoggedError||(console.error(`[GoblinManager] CRITICAL Error updating goblin ${c}:`,d.message),console.error(d.stack),this._hasLoggedError=!0);continue}u.isFinished&&this.goblins.splice(c,1)}}this.renderer&&this.renderer.update(this.goblins,a)}notifyClanActivity(t,e=null){if(!t)return;this.clans||(this.clans={});let i=this.clans[t];if(i||(i={id:t,active:!1,waveTimer:0,waveLevel:0,caves:[],raidTarget:null},this.clans[t]=i),e){let n,s;e.gridX!==void 0?(n=e.gridX,s=e.gridZ):e.x!==void 0&&(n=e.x,s=e.z),n!==void 0&&s!==void 0&&(i.raidTarget={x:n,z:s})}i.active||(i.active=!0,i.waveTimer=30,i.waveLevel=1,console.log(`[GoblinManager] Clan ${t} ACTIVATED! Wave 1 in 30s. Target:`,i.raidTarget))}updateClanWaves(t){this.clans&&Object.values(this.clans).forEach(e=>{e.active&&(e.waveTimer-=t,e.waveTimer<=0&&this.triggerWave(e))})}triggerWave(t){console.log(`[GoblinManager] TRIGGERING WAVE Level ${t.waveLevel} for Clan ${t.id}!`);const e=this.caves.filter(i=>i.clanId===t.id);if(e.length===0){const i=t.id.trim(),n=this.caves.filter(s=>s.clanId.trim()===i);if(n.length===0){console.log(`[GoblinManager] Clan ${t.id} has no caves remaining. Deactivating wave system.`),t.active=!1;return}n.forEach(s=>this.spawnWaveAtCave(s,t.waveLevel))}else e.forEach(i=>this.spawnWaveAtCave(i,t.waveLevel));this.mobilizeClan(t),t.waveLevel++,t.waveLevel>20&&(t.waveLevel=20),t.waveTimer=90}spawnWaveAtCave(t,e){const i=Math.min(1+Math.floor(e/10),3);console.log(`[Wave] Spawning ${i} goblins at cave ${t.gridX},${t.gridZ} (Lvl ${e})`);for(let n=0;n<i;n++)setTimeout(()=>{this.spawnGoblinAtCave(t,e)},n*200)}spawnGoblinAtCave(t,e=1){if(t.building&&!this.terrain.buildings.includes(t.building)){console.warn("[GoblinManager] Aborting spawn: Cave building missing"),this.destroyCave(t,this.caves.indexOf(t));return}const i=this.terrain.grid[t.gridX][t.gridZ];if(!i||!i.hasBuilding){console.warn("[GoblinManager] Aborting spawn: Grid cell has no building. Self-healing/Destroying Cave."),this.destroyCave(t,this.caves.indexOf(t));return}const n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];n.sort(()=>Math.random()-.5);for(const s of n){const a=t.gridX+s.x,o=t.gridZ+s.z;if(this.terrain.getTileHeight(a,o)>0){const h=this.getClanRaidTarget(t.clanId);this.spawnGoblin(a,o,t.clanId,h,e);return}}this.spawnGoblin(t.gridX,t.gridZ,t.clanId,null,e)}spawnGoblin(t,e,i=null,n=null,s=1){const a=Math.random();let o="normal";const l=Math.min(s,20)-1,h=.01+l*.0025,c=.045+l*.005,u=.09+l*.01;a<h?(o="king",console.log("👑 Goblin King Spawned!")):a<h+c?o="shaman":a<h+c+u&&(o="hobgoblin");const d=new Gt(this.scene,this.terrain,t,e,o,i,n);this.goblins.push(d),this.terrain.registerEntity&&this.terrain.registerEntity(d,t,e,"goblin")}increasePlunder(){this.plunderCount++,console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount} `)}updateHuts(t){let e=.025;e+=this.plunderCount*.01,e>.5&&(e=.5),(this.terrain.buildings||[]).forEach(n=>{if(n.userData&&n.userData.type==="goblin_hut"&&(n.userData.population=(n.userData.population||0)+e*t,n.userData.population>=10)){n.userData.population-=10;const s=n.userData.clanId||`clan_hut_${n.userData.gridX}_${n.userData.gridZ}`,a={gridX:n.userData.gridX,gridZ:n.userData.gridZ,clanId:s};this.spawnGoblinAtCave(a),console.log(`Goblin born from Hut! Clan: ${s}. Global Pop: ${this.goblins.length}`)}})}recordRaidLocation(t,e,i){if(!t)return;this.clanMemory[t]||(this.clanMemory[t]=[]);const n=this.clanMemory[t],s=n.find(a=>Math.abs(a.x-e)<5&&Math.abs(a.z-i)<5);s?(s.weight=Math.min(s.weight+1,10),s.timestamp=window.game?window.game.gameTotalTime:Date.now()):n.push({x:e,z:i,weight:1,timestamp:window.game?window.game.gameTotalTime:Date.now()}),n.sort((a,o)=>o.weight-a.weight),n.length>5&&(n.length=5)}getClanRaidTarget(t){if(!t)return null;if(this.clanMemory[t]&&this.clanMemory[t].length>0){const e=this.clanMemory[t],i=e.reduce((s,a)=>s+a.weight,0);let n=Math.random()*i;for(const s of e)if(n-=s.weight,n<=0)return s;return e[0]}return this.clans&&this.clans[t]&&this.clans[t].raidTarget?this.clans[t].raidTarget:null}mobilizeClan(t){const e=this.getClanRaidTarget(t.id);if(!e)return;let i=0;this.goblins.forEach(n=>{n.clanId===t.id&&!n.isDead&&(n.state==="idle"||n.state==="patrolling")&&(n.state="raiding",n.raidGoal={x:e.x,z:e.z},n.raidGoal.x+=(Math.random()-.5)*5,n.raidGoal.z+=(Math.random()-.5)*5,n.isMoving=!1,i++)}),i>0&&console.log(`[GoblinManager] Mobilized ${i} idle goblins from Clan ${t.id} to raid target!`)}destroyCave(t,e){console.warn(`[GoblinManager] Removing invalid cave at ${t.gridX},${t.gridZ}`),t.mesh&&(this.scene.remove(t.mesh),this.caveGroup.remove(t.mesh)),t.building&&this.terrain.buildings.includes(t.building)&&this.terrain.removeBuilding(t.building),this.caves.splice(e,1)}reportRaidFailure(t,e,i){if(!t||!this.clanMemory[t])return;const n=this.clanMemory[t],s=n.findIndex(a=>Math.abs(a.x-e)<5&&Math.abs(a.z-i)<5);s!==-1&&(n[s].weight-=2,console.log(`Clan ${t} raid failure at ${e},${i}. Weight: ${n[s].weight}`),n[s].weight<=0&&(n.splice(s,1),console.log(`Clan ${t} forgot raid location ${e},${i}`)))}serialize(){return{plunderCount:this.plunderCount,goblins:this.goblins.map(t=>typeof t.serialize=="function"?t.serialize():(console.warn(`Goblin ${t.id} missing serialize method! HMR issue?`),{id:t.id,type:t.type,gridX:t.gridX,gridZ:t.gridZ,hp:t.hp,maxHp:t.maxHp,clanId:t.clanId,age:t.age||0,lifespan:t.lifespan||100,state:t.state||"idle",migrationTarget:t.migrationTarget})),caves:this.caves.map(t=>({x:t.gridX,z:t.gridZ,spawnCooldown:t.spawnCooldown,clanId:t.clanId}))}}deserialize(t){try{if(!t){console.warn("GoblinManager: No data to deserialize");return}console.log("GoblinManager: Deserializing...",t),this.plunderCount=t.plunderCount||0,this.caves=[],t.caves&&t.caves.forEach(e=>{const i=this.terrain.getBuildingAt(e.x,e.z);i&&i.userData.type==="cave"&&this.caves.push({gridX:e.x,gridZ:e.z,mesh:new ii,spawnCooldown:e.spawnCooldown||0,originalHeight:i.y,building:i,clanId:e.clanId})}),t.goblins&&Array.isArray(t.goblins)?(t.goblins.forEach(e=>{const i=new Gt(this.scene,this.terrain,e.gridX,e.gridZ,e.type,e.clanId);i.id=e.id,i.hp=e.hp,i.maxHp=e.maxHp,i.age=e.age||0,i.lifespan=e.lifespan||100,i.state=e.state||"idle",i.migrationTarget=e.migrationTarget,e.scale&&(i.scale=e.scale),this.goblins.push(i),this.terrain.registerEntity&&this.terrain.registerEntity(i,e.gridX,e.gridZ,"goblin")}),console.log(`GoblinManager: Restored ${this.goblins.length} goblins.`)):console.warn("GoblinManager: No goblins list in save data.")}catch(e){console.error("GoblinManager Deserialize CRITICAL ERROR:",e),alert("Goblin Load Error: "+e.message)}}scanForCaves(){(this.terrain.buildings||[]).forEach(e=>{e.userData.type==="cave"&&this.registerCave(e)})}}class Le extends Js{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Le.assets.initialized)return;const t=new ss(.12,8,8);t.scale(.4,.6,1.5),Le.assets.geometries.body=t;const e=new hi(.1,.3,4);e.rotateX(-Math.PI/2),Le.assets.geometries.tail=e,Le.assets.materials.fish=new jt({color:4500223}),Le.assets.initialized=!0}constructor(t,e,i,n){Le.initAssets(),super(t,e,i,n,"fish"),this.moveInterval=500+Math.random()*1500,this.lastTime=0,this.wiggleOffset=Math.random()*100,this.mesh=this.createMesh(),this.scene.add(this.mesh),this.updatePosition()}createMesh(){const t=new ii,e=new Jt(Le.assets.geometries.body,Le.assets.materials.fish);t.add(e);const i=new Jt(Le.assets.geometries.tail,Le.assets.materials.fish);return i.position.z=-.3,t.add(i),t.userData.tail=i,t}updateLogic(t,e){if(this.terrain.getTileHeight(this.gridX,this.gridZ)>.5){this.die(),this.isDead=!0;return}if(!this.isMoving){if(t-this.lastTime>this.moveInterval)this.moveRandomly(t),this.lastTime=t,this.moveInterval=500+Math.random()*1500;else if(this.mesh){const n=Math.sin(t*.003+this.wiggleOffset)*.15;this.mesh.rotation.z=n}}}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let s=n.length-1;s>0;s--){const a=Math.floor(Math.random()*(s+1));[n[s],n[a]]=[n[a],n[s]]}for(const s of n){let a=this.gridX+s.x,o=this.gridZ+s.z;if(a<0&&(a=e-1),a>=e&&(a=0),o<0&&(o=i-1),o>=i&&(o=0),this.canMoveTo(a,o)){this.executeMove(a,o,t);return}}}canMoveTo(t,e){return!(this.terrain.getTileHeight(t,e)>.5)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=t-i/2+.5,a=e-n/2+.5;let o={x:0,y:0};if(this.terrain&&this.terrain.getVisualOffset){const l=s,h=-a;o=this.terrain.getVisualOffset(l,h)}return new L(s+o.x,-.2,a-o.y)}onMoveStep(t){const e=Math.sin(t*Math.PI*8+this.wiggleOffset)*.3;this.mesh&&(this.mesh.rotation.z=e,this.mesh.position.copy(this.position),this.mesh.rotation.y=this.rotationY)}dispose(){this.mesh&&this.scene.remove(this.mesh),this.terrain.unregisterEntity(this)}}class Wm{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.fishes=[],Le.initAssets(),Le.assets.materials.fish&&(Le.assets.materials.fish.clippingPlanes=this.clippingPlanes),this.init(),console.log("FishManager Refactored: Initialized with Entity-based Fish.")}init(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;this.fishes=[];for(let i=0;i<75;i++)this.spawnRandomFish(t,e);console.log("Spawned initial fish.")}spawnRandomFish(t,e){if(this.fishes.length>=75)return;let i=0;for(;i<10;){const n=Math.floor(Math.random()*t),s=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,s)<=.5){const o=new Le(this.scene,this.terrain,n,s);this.fishes.push(o);return}i++}}update(t,e,i){for(let n=this.fishes.length-1;n>=0;n--){const s=this.fishes[n];s.updateLogic(t,e),s.updateMovement(t),s.isDead&&(this.removeFish(s),this.fishes.splice(n,1))}if(this.fishes.length<60){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;Math.random()<.05&&this.spawnRandomFish(n,s)}}removeFish(t){t.dispose()}}class Xm{constructor(t){this.game=t,this.terrain=t.terrain,this.canvas=document.getElementById("minimap"),this.ctx=this.canvas.getContext("2d"),this.logicalW=this.terrain.logicalWidth,this.logicalD=this.terrain.logicalDepth,this.isDragging=!1,this.canvas.addEventListener("mousedown",this.onMouseDown.bind(this)),window.addEventListener("mousemove",this.onMouseMove.bind(this)),window.addEventListener("mouseup",this.onMouseUp.bind(this))}onMouseDown(t){t.preventDefault(),t.stopPropagation(),t.target===this.canvas&&(this.isDragging=!0,this.game.controls&&(this.game.controls.enabled=!1),this.updateCameraFromMiniMap(t))}onMouseMove(t){this.isDragging&&(t.preventDefault(),t.stopPropagation(),this.updateCameraFromMiniMap(t))}onMouseUp(t){this.isDragging=!1,this.game.controls&&(this.game.controls.enabled=!0)}updateCameraFromMiniMap(t){const e=this.canvas.getBoundingClientRect(),i=t.clientX-e.left,n=t.clientY-e.top,s=this.game.terrain.logicalWidth,a=this.game.terrain.logicalDepth,o=i/this.canvas.width,l=n/this.canvas.height,h=o*s,c=l*a,u=h-s/2,d=c-a/2,p=this.game.camera,g=this.game.controls;if(g){const x=g.target.y,m=p.position.x-g.target.x,f=p.position.z-g.target.z,y=p.position.y-g.target.y;g.target.set(u,x,d),p.position.set(u+m,g.target.y+y,d+f),g.update()}}update(){if(!this.ctx)return;this.ctx.fillStyle="#000",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.canvas.width/this.logicalW,e=this.canvas.height/this.logicalD;this.imgData||(this.imgData=this.ctx.createImageData(this.canvas.width,this.canvas.height));const i=this.imgData,n=i.data,s=this.terrain.grid;for(let x=0;x<this.logicalW;x++)for(let m=0;m<this.logicalD;m++){const f=s[x][m],y=f.height,_=this.game.terrain._lastIsNight||!1,T=this.game.terrain.currentSeason||"Spring",E=f.noise,M=f.moisture||.5,A=this.terrain.getBiomeColor(y,M,E,_,T,x,m,!0),D=(m*160+x)*4;n[D]=A.r*255,n[D+1]=A.g*255,n[D+2]=A.b*255,n[D+3]=255}this.ctx.putImageData(i,0,0),this.ctx.fillStyle="blue",this.game.units.forEach(x=>{if(x.isDead)return;const m=Math.floor(x.gridX*t),f=Math.floor(x.gridZ*e);this.ctx.fillRect(m,f,2,2)}),this.ctx.fillStyle="red",this.game.goblinManager.goblins.forEach(x=>{if(x.isDead)return;const m=Math.floor(x.gridX*t),f=Math.floor(x.gridZ*e);this.ctx.fillRect(m,f,2,2)});const a=this.game.camera.position.x,o=this.game.camera.position.z;let l=a,h=o,c=l+this.logicalW/2,u=h+this.logicalD/2;c=(c%this.logicalW+this.logicalW)%this.logicalW,u=(u%this.logicalD+this.logicalD)%this.logicalD;const d=c*t,p=u*e,g=30*t;this.ctx.strokeStyle="white",this.ctx.lineWidth=1,this.ctx.strokeRect(d-g,p-g,g*2,g*2);for(let x=-1;x<=1;x++)for(let m=-1;m<=1;m++){if(x===0&&m===0)continue;const f=d+x*this.canvas.width,y=p+m*this.canvas.height;this.ctx.strokeRect(f-g,y-g,g*2,g*2)}}}class qm{constructor(t){this.game=t,this.camera=t.camera,this.wrapper=document.createElement("div"),this.wrapper.id="compass-wrapper",this.wrapper.style.position="absolute",this.wrapper.style.top="60px",this.wrapper.style.left="180px",this.wrapper.style.width="60px",this.wrapper.style.height="60px",this.wrapper.style.pointerEvents="none",this.wrapper.style.zIndex="1000",this.canvas=document.createElement("canvas"),this.canvas.width=60,this.canvas.height=60,this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),document.body.appendChild(this.wrapper)}update(){if(!this.game.controls)return;const e=-this.game.controls.getAzimuthalAngle(),i=this.ctx,n=this.canvas.width,s=this.canvas.height,a=n/2,o=s/2,l=n/2-5;i.clearRect(0,0,n,s),i.save(),i.translate(a,o),i.rotate(e),i.strokeStyle="#8B4513",i.lineWidth=4,i.beginPath(),i.arc(0,0,l,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(210, 180, 140, 0.3)",i.fill(),i.fillStyle="#800000",i.beginPath(),i.moveTo(0,-l+5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.strokeStyle="#3e2723",i.lineWidth=1,i.stroke(),i.fillStyle="#D2691E",i.beginPath(),i.moveTo(0,l-5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.stroke(),i.restore(),i.save(),i.translate(a,o),i.rotate(e),i.font="bold 16px serif",i.fillStyle="#F5DEB3",i.textAlign="center",i.textBaseline="middle",i.fillText("N",0,-l+12),i.restore()}}class cl{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],pt.initAssets();const n=pt.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),n.heads&&n.heads.forEach(s=>s.clippingPlanes=this.clippingPlanes),this.maxInstances=5e4,this.dummy=new xe,this.whiteMaterial=new jt({color:16777215,clippingPlanes:this.clippingPlanes}),this.skinMaterial=pt.assets.materials.skin,this.headMaterials=pt.assets.materials.heads,this.torsoMesh=new $e(pt.assets.geometries.body,this.whiteMaterial,this.maxInstances),this.torsoMesh.instanceMatrix.setUsage(qe),this.torsoMesh.frustumCulled=!1,this.scene.add(this.torsoMesh),this.headMesh=new $e(pt.assets.geometries.head,pt.assets.materials.hair,this.maxInstances),this.headMesh.instanceMatrix.setUsage(qe),this.headMesh.frustumCulled=!1,this.scene.add(this.headMesh),this.faceMesh=new $e(pt.assets.geometries.facePlane,pt.assets.materials.face,this.maxInstances),this.faceMesh.instanceMatrix.setUsage(qe),this.faceMesh.frustumCulled=!1,this.scene.add(this.faceMesh),this.leftArmMesh=new $e(pt.assets.geometries.limb,this.skinMaterial,this.maxInstances),this.leftArmMesh.instanceMatrix.setUsage(qe),this.leftArmMesh.frustumCulled=!1,this.scene.add(this.leftArmMesh),this.rightArmMesh=new $e(pt.assets.geometries.limb,this.skinMaterial,this.maxInstances),this.rightArmMesh.instanceMatrix.setUsage(qe),this.rightArmMesh.frustumCulled=!1,this.scene.add(this.rightArmMesh),this.leftLegMesh=new $e(pt.assets.geometries.limb,this.whiteMaterial,this.maxInstances),this.leftLegMesh.instanceMatrix.setUsage(qe),this.leftLegMesh.frustumCulled=!1,this.scene.add(this.leftLegMesh),this.rightLegMesh=new $e(pt.assets.geometries.limb,this.whiteMaterial,this.maxInstances),this.rightLegMesh.instanceMatrix.setUsage(qe),this.rightLegMesh.frustumCulled=!1,this.scene.add(this.rightLegMesh),this.swordMesh=new $e(pt.assets.geometries.sword,pt.assets.materials.metal,this.maxInstances),this.swordMesh.instanceMatrix.setUsage(qe),this.swordMesh.frustumCulled=!1,this.scene.add(this.swordMesh),this.staffMesh=new $e(pt.assets.geometries.staff,pt.assets.materials.wood,this.maxInstances),this.staffMesh.instanceMatrix.setUsage(qe),this.staffMesh.frustumCulled=!1,this.scene.add(this.staffMesh),this.hatMesh=new $e(pt.assets.geometries.wizardHat,pt.assets.materials.wizardHat,this.maxInstances),this.hatMesh.instanceMatrix.setUsage(qe),this.hatMesh.frustumCulled=!1,this.scene.add(this.hatMesh),this.hatBrimMesh=new $e(pt.assets.geometries.wizardHatBrim,pt.assets.materials.wizardHat,this.maxInstances),this.hatBrimMesh.instanceMatrix.setUsage(qe),this.hatBrimMesh.frustumCulled=!1,this.scene.add(this.hatBrimMesh),this._scratchVector=new L,this._scratchSphere=new di(new L,2),this._up=new L(0,1,0),this._neighborOffsets=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}]}update(t,e,i){if(!i)return;if(!pt.assets.initialized){console.error("UR: Assets Missing");return}let n=0,s=0,a=0,o=0;const l=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;i&&(Math.round(i.position.x/l),Math.round(i.position.z/h)),t.length>0&&Math.random()<.01;const c=new dt(6636321),u=new dt(13938487),d=new dt(139),p=new dt(11184810),g=new dt(4456584),x=new dt(16764074);for(const m of t){if(m.isDead||m.isSleeping||!m.position)continue;let f=c;m.role==="knight"?f=p:m.role==="wizard"?f=g:m.role==="fisher"?f=d:m.role==="hunter"?f=new dt(25600):m.role==="worker"&&(m.isSpecial?f=new dt(9109504):f=c);const y=60,_=Math.floor((i.position.x-y-m.position.x)/l),T=Math.ceil((i.position.x+y-m.position.x)/l),E=Math.floor((i.position.z-y-m.position.z)/h),M=Math.ceil((i.position.z+y-m.position.z)/h);for(let A=_;A<=T;A++)for(let D=E;D<=M&&!(n>=this.maxInstances);D++){const v=A,S=D,C=m.position.x+v*l,U=m.position.z+S*h,B=m.position.y,H=m.rotationY;if(this.dummy.position.set(C,B,U),this.dummy.rotation.set(0,H,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.torsoMesh.setMatrixAt(n,this.dummy.matrix),this.torsoMesh.setColorAt(n,f),this.dummy.position.set(C,B,U),this.dummy.rotation.set(0,H,0),this.dummy.scale.set(1,1,1),m.role==="wizard"&&(this.dummy.scale.set(1,.5,1),this.dummy.position.y+=.2375),this.dummy.updateMatrix(),this.headMesh.setMatrixAt(n,this.dummy.matrix),this.faceMesh.setMatrixAt(n,this.dummy.matrix),m.role==="knight"?this.headMesh.setColorAt(n,f):this.headMesh.setColorAt(n,u),this.faceMesh.setColorAt(n,new dt(16777215)),this.dummy.position.set(.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,B,U)),this.dummy.rotation.set(m.limbs.leftArm.x,H,0),this.dummy.updateMatrix(),this.leftArmMesh.setMatrixAt(n,this.dummy.matrix),this.leftArmMesh.setColorAt(n,x),this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,B,U)),this.dummy.rotation.set(m.limbs.rightArm.x,H,0),this.dummy.updateMatrix(),this.rightArmMesh.setMatrixAt(n,this.dummy.matrix),this.rightArmMesh.setColorAt(n,x),this.dummy.position.set(.08,.25,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,B,U)),this.dummy.rotation.set(m.limbs.leftLeg.x,H,0),this.dummy.updateMatrix(),this.leftLegMesh.setMatrixAt(n,this.dummy.matrix),this.leftLegMesh.setColorAt(n,f),this.dummy.position.set(-.08,.25,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,B,U)),this.dummy.rotation.set(m.limbs.rightLeg.x,H,0),this.dummy.updateMatrix(),this.rightLegMesh.setMatrixAt(n,this.dummy.matrix),this.rightLegMesh.setColorAt(n,f),m.role==="knight"&&(this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,B,U)),this.dummy.rotation.set(m.limbs.rightArm.x+Math.PI/2,H,0),this.dummy.rotation.set(m.limbs.rightArm.x,H,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.swordMesh.setMatrixAt(s,this.dummy.matrix),s++),m.role==="wizard"){this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,H),this.dummy.position.add(this._scratchVector.set(C,B,U)),this.dummy.rotation.set(m.limbs.rightArm.x,H,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.staffMesh.setMatrixAt(a,this.dummy.matrix),this.staffMesh.setColorAt(a,pt.assets.materials.wood.color),a++;const W=m.role==="wizard"?.625:.75;this.dummy.position.set(C,B+W,U),this.dummy.rotation.set(0,H,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.hatMesh.setMatrixAt(o,this.dummy.matrix),this.hatBrimMesh.setMatrixAt(o,this.dummy.matrix),o++}n++}}this.torsoMesh.count=n,this.headMesh.count=n,this.faceMesh.count=n,this.leftArmMesh.count=n,this.rightArmMesh.count=n,this.leftLegMesh.count=n,this.rightLegMesh.count=n,this.swordMesh.count=s,this.staffMesh.count=a,this.hatMesh.count=o,this.hatBrimMesh.count=o,this.torsoMesh.frustumCulled=!1,this.headMesh.frustumCulled=!1,this.faceMesh.frustumCulled=!1,this.leftArmMesh.frustumCulled=!1,this.rightArmMesh.frustumCulled=!1,this.leftLegMesh.frustumCulled=!1,this.rightLegMesh.frustumCulled=!1,this.torsoMesh.instanceColor&&(this.torsoMesh.instanceColor.needsUpdate=!0),this.headMesh.instanceColor&&(this.headMesh.instanceColor.needsUpdate=!0),this.faceMesh.instanceColor&&(this.faceMesh.instanceColor.needsUpdate=!0),this.leftLegMesh.instanceColor&&(this.leftLegMesh.instanceColor.needsUpdate=!0),this.rightLegMesh.instanceColor&&(this.rightLegMesh.instanceColor.needsUpdate=!0),this.leftArmMesh.instanceColor&&(this.leftArmMesh.instanceColor.needsUpdate=!0),this.rightArmMesh.instanceColor&&(this.rightArmMesh.instanceColor.needsUpdate=!0),this.staffMesh.instanceColor&&(this.staffMesh.instanceColor.needsUpdate=!0),this.torsoMesh.instanceMatrix.needsUpdate=!0,this.headMesh.instanceMatrix.needsUpdate=!0,this.faceMesh.instanceMatrix.needsUpdate=!0,this.leftArmMesh.instanceMatrix.needsUpdate=!0,this.rightArmMesh.instanceMatrix.needsUpdate=!0,this.leftLegMesh.instanceMatrix.needsUpdate=!0,this.rightLegMesh.instanceMatrix.needsUpdate=!0,this.swordMesh.instanceMatrix.needsUpdate=!0,this.staffMesh.instanceMatrix.needsUpdate=!0,this.hatMesh.instanceMatrix.needsUpdate=!0,this.hatBrimMesh.instanceMatrix.needsUpdate=!0}dispose(){console.log("[UnitRenderer] Disposing...");const t=e=>{e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose())};t(this.torsoMesh),t(this.headMesh),t(this.faceMesh),t(this.leftArmMesh),t(this.rightArmMesh),t(this.leftLegMesh),t(this.rightLegMesh),t(this.swordMesh),t(this.staffMesh),t(this.hatMesh),t(this.hatBrimMesh),this.whiteMaterial&&this.whiteMaterial.dispose()}}class dl{constructor(t,e,i){this.scene=t,this.terrain=e,this.terrainWidth=e.logicalWidth,this.terrainDepth=e.logicalDepth,this.clippingPlanes=i||[],this.MAX_INSTANCES=1e4,this.meshes={},this.initAssets(),this.initInstancedMeshes(),this._scratchVector=new L,this._scratchSphere=new di(new L,2),this._dummy=new xe}initAssets(){this.assets={};const t={clippingPlanes:this.clippingPlanes,clipShadows:!0};this.assets.houseWallGeo=new le(1.6,.8,1.6),this.assets.houseWallGeo.translate(0,.4,0);const e=document.createElement("canvas");e.width=128,e.height=64;const i=e.getContext("2d"),n=document.createElement("canvas");n.width=128,n.height=64;const s=n.getContext("2d");i.fillStyle="#654321",i.fillRect(0,0,128,64),s.fillStyle="#000000",s.fillRect(0,0,128,64),i.fillStyle="#5A3A1A";for(let v=0;v<64;v+=16)for(let S=0;S<128;S+=16)(S+v)/16%2===0&&i.fillRect(S+1,v+1,14,14);const a=(v,S)=>{i.fillStyle="#111",i.fillRect(v-6,S-8,12,16),s.fillStyle="#FFFFFF",s.fillRect(v-4,S-6,8,12)};a(32,32),a(96,32),this.assets.houseWallMat=new jt({...t,map:new Re(e),emissiveMap:new Re(n),emissive:0,emissiveIntensity:0});const o=document.createElement("canvas");o.width=64,o.height=64;const l=o.getContext("2d");l.fillStyle="#800000",l.fillRect(0,0,64,64),l.fillStyle="#600000";for(let v=0;v<64;v+=8)l.fillRect(0,v,64,2);l.fillStyle="#A00000";for(let v=0;v<64;v+=8)for(let S=v%16===0?0:4;S<64;S+=8)l.fillRect(S,v,2,8);this.assets.houseRoofMat=new jt({...t,map:new Re(o),color:16777215}),this.assets.houseRoofGeo=new hi(1.2,.8,4),this.assets.houseRoofGeo.translate(0,1.2,0),this.assets.houseRoofGeo.rotateY(Math.PI/4);const h=new Mi(1.4,1.4,4.5,16);h.translate(0,2.25,0);const c=new Mi(1.6,1.6,.4,16);c.translate(0,4.5,0),this.assets.towerGeo=h,this.assets.towerRimGeo=c,console.log("Tower Geometry Initialized (Split Mode)");const u=document.createElement("canvas");u.width=128,u.height=256;const d=u.getContext("2d"),p=document.createElement("canvas");p.width=128,p.height=256;const g=p.getContext("2d");d.fillStyle="#505050",d.fillRect(0,0,128,256),g.fillStyle="#000000",g.fillRect(0,0,128,256),d.fillStyle="#404040";for(let v=0;v<256;v+=16){const S=v/16%2===0?0:8;for(let C=0;C<128;C+=16)d.fillRect((C+S)%128+1,v+1,14,14)}const x=(v,S,C,U)=>{d.fillStyle="#101010",d.fillRect(v,S,C,U),g.fillStyle="#FFFFEE",g.fillRect(v+1,S+1,C-2,U-2)};x(20,80,6,18),x(80,80,6,18),x(50,180,6,18),x(110,180,6,18),this.assets.towerMat=new jt({...t,map:new Re(u),emissiveMap:new Re(p),color:15658734,emissive:0,emissiveIntensity:0}),this.assets.towerCapMat=new jt({...t,color:5263440,map:null,emissive:0}),console.log("Tower Debug: Generated High-Res Tower Texture + Cap Material"),this.assets.farmGeo=new Vi(1.8,1.8),this.assets.farmGeo.rotateX(-Math.PI/2),this.assets.farmGeo.translate(0,.05,0);const m=document.createElement("canvas");m.width=64,m.height=64;const f=m.getContext("2d");f.fillStyle="#DAA520",f.fillRect(0,0,64,64),f.fillStyle="#B8860B";for(let v=0;v<10;v++)f.fillRect(v*6,0,2,64);this.assets.farmMat=new jt({...t,map:new Re(m),side:Ye}),this.assets.barracksGeo=new le(2.4,1.2,2.4),this.assets.barracksGeo.translate(0,.6,0);const y=document.createElement("canvas");y.width=128,y.height=64;const _=y.getContext("2d"),T=document.createElement("canvas");T.width=128,T.height=64;const E=T.getContext("2d");_.fillStyle="#654321",_.fillRect(0,0,128,64),E.fillStyle="#000000",E.fillRect(0,0,128,64),_.fillStyle="#5A3A1A";for(let v=0;v<64;v+=16)for(let S=0;S<128;S+=16)(S+v)/16%2===0&&_.fillRect(S+1,v+1,14,14);const M=(v,S)=>{_.fillStyle="#111",_.fillRect(v-6,S-8,12,16),E.fillStyle="#FFFFEE",E.fillRect(v-4,S-6,8,12)};M(22,32),M(64,32),M(106,32),this.assets.barracksRoofGeo=new hi(2,1.2,8),this.assets.barracksRoofGeo.translate(0,1.8,0),this.assets.barracksMat=new jt({...t,map:new Re(y),emissiveMap:new Re(T),emissive:0,emissiveIntensity:0}),this.assets.barracksRoofMat=new jt({...t,map:new Re(o),color:16777215}),this.assets.goblinHutGeo=new hi(.4,.6,6),this.assets.goblinHutGeo.translate(0,.3,0);const A=document.createElement("canvas");A.width=64,A.height=64;const D=A.getContext("2d");D.fillStyle="#654321",D.fillRect(0,0,64,64),D.fillStyle="#8B4513";for(let v=0;v<30;v++)D.fillRect(Math.random()*60,Math.random()*60,4,2);this.assets.goblinHutMat=new jt({...t,map:new Re(A),color:11184810}),[this.assets.houseWallMat,this.assets.barracksMat,this.assets.towerMat].forEach(v=>{v&&(v.clippingPlanes=this.clippingPlanes,v.needsUpdate=!0)})}initInstancedMeshes(){const t=(i,n)=>{const s=new $e(i,n,this.MAX_INSTANCES);return s.instanceMatrix.setUsage(qe),s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1,this.scene.add(s),s};this.meshes.houseWalls=t(this.assets.houseWallGeo,this.assets.houseWallMat),this.meshes.houseRoofs=t(this.assets.houseRoofGeo,this.assets.houseRoofMat),this.meshes.farms=t(this.assets.farmGeo,this.assets.farmMat),this.meshes.goblinHuts=t(this.assets.goblinHutGeo,this.assets.goblinHutMat);const e=[this.assets.towerMat,this.assets.towerCapMat,this.assets.towerCapMat];this.meshes.towers=t(this.assets.towerGeo,e),this.meshes.towerRims=t(this.assets.towerRimGeo,e),this.meshes.barracksWalls=t(this.assets.barracksGeo,this.assets.barracksMat),this.meshes.barracksRoofs=t(this.assets.barracksRoofGeo,this.assets.barracksRoofMat)}update(t,e,i){if(!t)return;if(this._debugTimer||(this._debugTimer=0),this._debugTimer++,this._debugTimer>120){this._debugTimer=0;const y={};t.forEach(_=>{const T=_.userData&&_.userData.type?_.userData.type:"unknown";y[T]=(y[T]||0)+1}),console.log(`[BuildingRenderer] ListSize=${t.length}. Types:`,JSON.stringify(y))}const n=this.terrainWidth||80,s=this.terrainDepth||80;let a=0,o=0;if(i&&(a=Math.round(i.position.x/n),o=Math.round(i.position.z/s)),this._lastBaseGridX===a&&this._lastBaseGridZ===o&&this._lastBuildingCount===t.length&&!this.forceUpdate)return;this._lastBaseGridX=a,this._lastBaseGridZ=o,this._lastBuildingCount=t.length,this.forceUpdate=!1;let l=0,h=0,c=0,u=0,d=0;const p=this._dummy,g=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}],x=new dt(16777215),m=new dt(16777215),f=new dt(11184810);for(const y of t){const _=y.gridX,T=y.gridZ,E=this.terrain.getVisualPosition(_,T,!0),M=E.y||0;for(const A of g){const D=(A.x+a)*n,v=(A.z+o)*s,S=E.x+D,C=E.z+v;let U=S,B=C;y.type==="farm"||y.type==="house"?(U+=.5,B+=.5):(y.type==="barracks"||y.type==="tower")&&(U+=1,B+=1),y.type,p.position.set(U,M,B),p.scale.set(1,1,1),p.rotation.set(0,y.rotation||0,0),p.updateMatrix(),y.type==="house"&&l<this.MAX_INSTANCES?(this.meshes.houseWalls.setMatrixAt(l,p.matrix),this.meshes.houseRoofs.setMatrixAt(l,p.matrix),this.meshes.houseRoofs.setColorAt(l,x),l++):y.type==="farm"&&h<this.MAX_INSTANCES?(this.meshes.farms.setMatrixAt(h,p.matrix),h++):y.type==="barracks"&&u<this.MAX_INSTANCES?(this.meshes.barracksWalls.setMatrixAt(u,p.matrix),this.meshes.barracksRoofs.setMatrixAt(u,p.matrix),this.meshes.barracksRoofs.setColorAt(u,m),u++):y.type==="goblin_hut"&&c<this.MAX_INSTANCES?(this.meshes.goblinHuts.setMatrixAt(c,p.matrix),this.meshes.goblinHuts.setColorAt(c,f),this.meshes.goblinHuts.setColorAt(c,f),c++):y.type==="tower"&&d<this.MAX_INSTANCES&&(this.meshes.towers.setMatrixAt(d,p.matrix),this.meshes.towerRims.setMatrixAt(d,p.matrix),d++)}}Math.random()<.005&&console.log(`[BuildingRenderer] Updated Buffers. House:${l}, Farm:${h} (BaseGrid: ${a},${o})`),this.meshes.houseWalls.count=l,this.meshes.houseRoofs.count=l,this.meshes.farms.count=h,this.meshes.goblinHuts.count=c,this.meshes.barracksWalls.count=u,this.meshes.barracksRoofs.count=u,this.meshes.towers.count=d,this.meshes.towerRims.count=d,this.meshes.houseWalls.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceColor&&(this.meshes.houseRoofs.instanceColor.needsUpdate=!0),this.meshes.farms.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceColor&&(this.meshes.goblinHuts.instanceColor.needsUpdate=!0),this.meshes.barracksWalls.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceColor&&(this.meshes.barracksRoofs.instanceColor.needsUpdate=!0),this.meshes.towers.instanceMatrix.needsUpdate=!0,this.meshes.towerRims.instanceMatrix.needsUpdate=!0}updateLighting(t){if(this._lastIsNight===t)return;this._lastIsNight=t;const e=t?1:0,i=t?16747520:0;this.assets.houseWallMat&&(this.assets.houseWallMat.emissive.setHex(i),this.assets.houseWallMat.emissiveIntensity=e,this.assets.houseWallMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0),this.assets.towerMat&&(this.assets.towerMat.emissive.setHex(i),this.assets.towerMat.emissiveIntensity=e,this.assets.towerMat.needsUpdate=!0),this.assets.castleKeepMat&&(this.assets.castleKeepMat.emissive.setHex(i),this.assets.castleKeepMat.emissiveIntensity=e,this.assets.castleKeepMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0)}dispose(){console.log("[BuildingRenderer] Disposing...");const t=e=>{e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):e.material.dispose()))};t(this.meshes.houseWalls),t(this.meshes.houseRoofs),t(this.meshes.farms),t(this.meshes.goblinHuts),t(this.meshes.towers),t(this.meshes.towerRims),t(this.meshes.barracksWalls),t(this.meshes.barracksRoofs),Object.values(this.assets).forEach(e=>{e&&e.dispose&&e.dispose()}),this.meshes={}}}class ul{constructor(){this.raids=[]}reportRaid(t,e,i){const n=this.raids.find(s=>{const a=s.x-t,o=s.z-e;return a*a+o*o<100});if(n){n.time=i;return}this.raids.push({x:t,z:e,time:i,threat:10}),this.raids.length>20&&this.raids.shift()}reportVictory(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>100})}reportClear(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>25})}getPriorities(t){return this.raids.filter(e=>t-e.time<3e5)}}class $m{constructor(){console.log("Game constructor called"),this.saveManager=new zm,this.soundManager=new Hm,this.mana=100,this.battleMemory=new ul,this.squads=new Map,window.game=this,this.scene=new fc,this.scene.background=new dt(8900331);const t=window.innerWidth/window.innerHeight,e=50;this.camera=new Ha(-e*t,e*t,e,-e,1,1e3),this.camera.position.set(20,20,20),this.camera.lookAt(this.scene.position),this.renderer=new Mm({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.localClippingEnabled=!1,document.body.appendChild(this.renderer.domElement),this.controls=new Sm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.screenSpacePanning=!1,this.controls.minZoom=.8,this.controls.maxZoom=4,this.controls.maxPolarAngle=Math.PI/2,this.clippingPlanes=[new Qe(new L(1,0,0),0),new Qe(new L(-1,0,0),0),new Qe(new L(0,0,1),0),new Qe(new L(0,0,-1),0)],this.renderer.clippingPlanes=[],this.renderer.localClippingEnabled=!0,this.setupLights(),this.requestQueue=[],this.requestQueue=[],this.requestIdCounter=0,this.projectiles=[],this.terrain=new vm(this.scene,this.clippingPlanes),this.units=[],this.resources={grain:0,fish:0,meat:0},this.cloudManager=new Gm(this.scene,this.terrain.width,this.terrain.depth),this.birdManager=new Ae(this.scene,this.terrain.width,this.terrain.depth,this.clippingPlanes),this.sheepManager=new km(this.scene,this.terrain,this.clippingPlanes),this.goblinManager=new Vm(this.scene,this.terrain,this,this.clippingPlanes),this.fishManager=new Wm(this.scene,this.terrain,this.clippingPlanes),this.minimap=new Xm(this),this.compass=new qm(this),this.unitRenderer=new cl(this.scene,this.terrain,this.clippingPlanes),this.buildingRenderer=new dl(this.scene,this.terrain,this.clippingPlanes),this.inputManager=new bm(this.scene,this.camera,this.terrain,this.spawnUnit.bind(this),this.units,this.unitRenderer,this),this.initMarkerMaterial();let i=10,n=10,s=!1,a=0;const o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;for(;!s&&a<1e3;){const c=Math.floor(Math.random()*o),u=Math.floor(Math.random()*l);this.terrain.getTileHeight(c,u)>1&&(i=c,n=u,s=!0),a++}if(this.spawnUnit(i,n,!0),s){const c=i-o/2,u=n-l/2;this.controls&&(this.controls.target.set(c,0,u),this.camera.position.set(c+20,20,u+20),this.controls.update())}this.statsDisplay=document.getElementById("stats-container"),window.addEventListener("resize",this.onWindowResize.bind(this)),this.lastTime=performance.now(),this.gameTime=8,this.gameTotalTime=0,this.raidPoints=[],this.timeScale=1,this.resources={grain:10,fish:10,meat:10};const h=()=>{this.soundManager.initialized||(this.soundManager.init(this.camera),window.removeEventListener("click",h),window.removeEventListener("touchstart",h),window.removeEventListener("touchend",h),window.removeEventListener("keydown",h))};window.addEventListener("click",h),window.addEventListener("touchstart",h),window.addEventListener("touchend",h),window.addEventListener("keydown",h),window.toggleDebugSpeed=()=>{const c=document.getElementById("debug-speed-btn");this.timeScale===1?(this.timeScale=10,console.log("Debug Speed: 10x"),c&&c.classList.add("active")):(this.timeScale=1,console.log("Debug Speed: 1x"),c&&c.classList.remove("active"))},window.addEventListener("keydown",c=>{if(c.key==="p"||c.key==="P"){const u=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex=((this.currentSeasonIndex||0)+1)%4;const d=u[this.currentSeasonIndex];console.log(`[DEBUG] Force Cycle Season: ${d}`),this.season=d,this.daysPassed=(this.daysPassed||0)+1,this.terrain&&this.terrain.setSeason(d);const p=document.getElementById("season-val");p&&(p.textContent=d)}}),this.timeScale=1,this.animate()}setupLights(){this.ambientLight=new Rc(4210752),this.scene.add(this.ambientLight),this.directionalLight=new Ac(16777215,1),this.directionalLight.position.set(10,20,10),this.scene.add(this.directionalLight)}spawnUnit(t,e,i=!1,n=null,s=null){let a="citizen",o=!1,l=null;if(i===!0)o=!0,a="worker";else if(typeof i=="string")a=i;else if(n){if(l=n,n.type==="barracks")a="knight";else if(n.type==="tower")a="wizard";else{const c=Math.random();c<.2?a="hunter":c<.4?a="fisher":a="worker"}(a==="knight"||a==="wizard")&&!n.userData.memory&&(n.userData.memory=new ul),console.log(`Spawned ${a} linked to ${n.type} at ${n.userData.gridX},${n.userData.gridZ} SquadID:${s}`)}else a=(Math.random()>.5,"worker"),a=(Math.random()>.5,"worker");const h=new pt(this.scene,this.terrain,t,e,a,o,s);return h.game=this,h.homeBase=l,this.units.push(h),h}handleBuildingSpawn(t,e,i,n,s=null){return this.spawnUnit(t,e,null,n,s),!0}recordRaidPoint(t,e){this.raidPoints.some(n=>Math.abs(n.x-t)<10&&Math.abs(n.z-e)<10)||this.raidPoints.push({x:t,z:e,time:this.gameTime})}canAction(){return this.mana>=0}consumeMana(t){this.mana-=t}onWindowResize(){const t=window.innerWidth/window.innerHeight,e=20;this.camera.left=-e*t,this.camera.right=e*t,this.camera.top=e,this.camera.bottom=-e,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}updateEnvironment(t){this.gameTime+=t*(this.dayNightSpeed||.05),this.gameTime>=24&&(this.gameTime=0);let e=!1;return this.gameTime>=18||this.gameTime<6?(e=!0,this.scene.background.setHex(51),this.directionalLight.intensity=.2):(this.scene.background.setHex(8900331),this.directionalLight.intensity=1),e}updateSeasons(t){const i=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex===void 0&&(this.currentSeasonIndex=0);const n=this.gameTime/24;if(this.prevTimeOfDay===void 0&&(this.prevTimeOfDay=n),n<this.prevTimeOfDay&&(this.daysPassed=(this.daysPassed||0)+1,console.log(`New Day! Day ${this.daysPassed}. Season: ${i[this.currentSeasonIndex]}`),this.daysPassed%3===0)){this.currentSeasonIndex=(this.currentSeasonIndex+1)%4;const a=i[this.currentSeasonIndex];console.log(`Season Changed to: ${a}`),this.terrain&&this.terrain.setSeason(a)}this.prevTimeOfDay=n;const s=i[this.currentSeasonIndex];this.season!==s&&(console.log(`[DEBUG] Game.updateSeasons: Syncing season mismatch. Game:${this.season} -> ${s}`),this.season=s,this.terrain&&this.terrain.setSeason(this.season))}initMarkerMaterial(){const t=`
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
        `;this.markerMaterial=new _i({uniforms:{uTime:{value:0},uColor:{value:new dt(16776960)}},vertexShader:t,fragmentShader:e,transparent:!0,blending:Nr,depthWrite:!1,side:Ye})}addRequest(t,e,i,n=null,s=null,a=null){const o=`req_${this.requestIdCounter++}`,l={id:o,type:t,x:e,z:i,status:"pending",assignedTo:null,mesh:null,createdAt:Date.now()},h=new Mi(.5,.5,5,16,1,!0);let c;this.markerMaterial&&this.markerMaterial.clone?(c=this.markerMaterial.clone(),c.uniforms&&c.uniforms.uColor&&c.uniforms.uColor.value.setHex(16776960)):(console.warn("[Game] Warning: markerMaterial missing or invalid. Using fallback."),c=new Un({color:16776960,transparent:!0,opacity:.8}));const u=new Jt(h,c);u.renderOrder=2e3;const d=s!==null?s:e,p=a!==null?a:i;let g=this.terrain.getTileHeight(e,i);return(g===void 0||isNaN(g))&&(g=10),u.position.set(d,g+2,p),this.scene.add(u),l.mesh=u,this.requestQueue.push(l),console.log(`[Game] Request Added: ${t} at (${e},${i}) ID:${o}`),this.forceAssignRequest(l),l}findBestRequest(t){if(!t)return null;let e=null,i=1/0;const n=this.terrain.logicalWidth||160,s=this.terrain.logicalDepth||160;for(const a of this.requestQueue){if(a.status!=="pending")continue;let o=Math.abs(a.x-t.gridX),l=Math.abs(a.z-t.gridZ);o>n/2&&(o=n-o),l>s/2&&(l=s-l);const h=o*o+l*l;h<i&&(i=h,e=a)}return e}forceAssignRequest(t){!t||t.status!=="pending"||setTimeout(()=>{try{if(!this.units||!t||t.status!=="pending")return;let e=null,i=1/0;const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;let a=0,o=0,l=0,h=0;for(const c of this.units){if(c.role!=="worker"){l++;continue}a++;let u=0;c.targetRequest?(o++,u=1e6):c.action==="Working"?u=1e6:h++;let d=Math.abs(c.gridX-t.x),p=Math.abs(c.gridZ-t.z);d>n/2&&(d=n-d),p>s/2&&(p=s-p);const x=d*d+p*p+u;x<i&&(i=x,e=c)}console.log(e?`[Game] forceAssignRequest FOUND Unit ${e.id} (DistSq:${i}). Scanned:${a}`:`[Game] forceAssignRequest FAILED for Req ${t.id}. Scanned:${a} (RoleSkipped:${l}) Busy:${o} Valid:${h}. TotalUnits:${this.units.length}`),e&&(e.targetRequest&&(this.releaseRequest(e,e.targetRequest),e.targetRequest=null,e.action="Idle"),this.claimRequest(e,t)&&(e.targetRequest=t,e.action="Approaching Job",console.log(`[Game] Force-Assigned Request ${t.id} to Unit ${e.id} (Score: ${i.toFixed(1)})`)))}catch(e){console.error("[Game] Force Assignment Error:",e)}},10)}detectZombieRequests(){if(!(!this.units||!this.requestQueue)){for(const t of this.requestQueue)if(t.status==="assigned"&&t.assignedTo!==null){const e=this.units.find(i=>i.id===t.assignedTo);if(!e||e.isDead){console.log(`[Game] Detected ZOMBIE Request req_${t.id} (Assigned to Dead/Missing ${t.assignedTo}). Resetting.`),t.status="pending",t.assignedTo=null,t.mesh&&(t.mesh.material=this.markerMaterial);continue}(!e.targetRequest||e.targetRequest.id!==t.id)&&(console.log(`[Game] Detected ZOMBIE Request req_${t.id} (Assigned to ${e.id}, but unit has ${e.targetRequest?e.targetRequest.id:"null"}). Resetting.`),t.status="pending",t.assignedTo=null,t.mesh&&(t.mesh.material=this.markerMaterial))}}}claimRequest(t,e){return!e||e.status!=="pending"||t.role!=="worker"?!1:(e.status="assigned",e.assignedTo=t.id,t.targetGoblin=null,t.targetBuilding=null,t.action="Idle",!0)}releaseRequest(t,e){e&&e.assignedTo===t.id&&(e.status="pending",e.assignedTo=null,console.log(`[Game] Request ${e.id} released by Unit ${t.id}. Searching for replacement...`),this.forceAssignRequest(e))}removeRequest(t){if(!t)return;const e=this.requestQueue.findIndex(i=>i===t||i.id===t.id);if(e>-1){const i=this.requestQueue[e];this.requestQueue.splice(e,1),i.mesh&&this.scene.remove(i.mesh),console.log(`[Game] Request ${i.id} COMPLETED and removed.`)}}updateRequestMarkers(){if(!this.scene||!this.camera)return;const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80,i=this.camera.position.x,n=this.camera.position.z;for(const s of this.requestQueue)if(s.mesh){const a=s.x-t/2,o=s.z-e/2,l=a+Math.round((i-a)/t)*t,h=o+Math.round((n-o)/e)*e;let c=this.terrain.getTileHeight(s.x,s.z);(c===void 0||isNaN(c))&&(c=10),s.mesh.position.set(l,c+2.5,h)}else this.frameCount%300===0&&console.warn(`[Game] Request ${s.id} has NO MESH! Status: ${s.status}`)}tryCancelRequest(t,e){let n=-1,s=9;for(let a=0;a<this.requestQueue.length;a++){const o=this.requestQueue[a];if(o.status!=="pending"&&o.status!=="assigned")continue;const l=o.x-t,h=o.z-e,c=l*l+h*h;c<s&&(s=c,n=a)}if(n!==-1){const a=this.requestQueue[n];return a.mesh&&(this.scene.remove(a.mesh),a.mesh.geometry&&a.mesh.geometry.dispose(),a.mesh.material&&a.mesh.material.dispose()),this.requestQueue.splice(n,1),console.log(`[Game] Request Canceled at ${a.x},${a.z} (Target: ${t},${e})`),this.consumeMana(-10),!0}return!1}checkExpiredRequests(t){for(let i=this.requestQueue.length-1;i>=0;i--){const n=this.requestQueue[i];if(n.status==="assigned"){const s=n.assignedTo;if(s!==null){const a=this.units.find(l=>l.id===s);let o=!1;if(a?(a.isDead||a.targetRequest!==n)&&(o=!0):o=!0,o){console.warn(`[Game] Detected ZOMBIE Request ${n.id} (Assigned to ${s}). Resetting.`),n.status="pending",n.assignedTo=null,this.forceAssignRequest(n);continue}}}if(n.status==="pending"&&(n.lastAttempt||(n.lastAttempt=n.createdAt),t-n.lastAttempt>1e3)){const s=t-n.createdAt;s>6e4&&s%1e4<1e3&&console.log(`[Game] Request ${n.id} pending for ${(s/1e3).toFixed(1)}s.`),this.forceAssignRequest(n),n.lastAttempt=t}if(n.status==="completed"&&(n.completedAt||(n.completedAt=t),t-n.completedAt>2e3)){n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&n.mesh.material.dispose(),n.mesh=null),this.requestQueue.splice(i,1);continue}n.status==="pending"&&t-n.createdAt>3e5&&(console.log(`[Game] Request Timed Out: ${n.type} ID:${n.id}`),n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&n.mesh.material.dispose(),n.mesh=null),this.requestQueue.splice(i,1))}}clearProjectiles(){if(this.projectiles){console.log(`Clearing ${this.projectiles.length} projectiles...`);for(const t of this.projectiles)t.mesh&&(this.scene.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),t.mesh.material&&t.mesh.material!==this.markerMaterial&&t.mesh.material.dispose());this.projectiles=[]}}spawnProjectile(t,e,i=16729088){this.projectileGeo||(this.projectileGeo=new ss(.3,16,16));const n=this.markerMaterial.clone();n.uniforms.uColor.value.setHex(i);const s=new Jt(this.projectileGeo,n);s.position.copy(t);const a=this.terrain&&this.terrain.logicalWidth?this.terrain.logicalWidth:80,o=this.terrain&&this.terrain.logicalDepth?this.terrain.logicalDepth:80,l=e.x-t.x,h=e.z-t.z,c=e.clone();Math.abs(l)>a/2&&(l>0?c.x-=a:c.x+=a),Math.abs(h)>o/2&&(h>0?c.z-=o:c.z+=o),this.scene.add(s),this.projectiles.push({mesh:s,target:c,speed:15,uTime:0})}updateProjectiles(t){for(let e=this.projectiles.length-1;e>=0;e--){const i=this.projectiles[e];i.uTime+=t,i.mesh.material.uniforms&&(i.mesh.material.uniforms.uTime.value=i.uTime);const n=new L().subVectors(i.target,i.mesh.position),s=n.length();if(s<.5)this.scene.remove(i.mesh),i.mesh.material&&i.mesh.material.dispose(),this.projectiles.splice(e,1);else{n.normalize();const a=i.speed*t;a>=s?i.mesh.position.copy(i.target):i.mesh.position.add(n.multiplyScalar(a))}}}completeRequest(t,e){if(!e)return;let i=!0;try{e.type==="raise"?this.terrain.raise(e.x,e.z):e.type==="lower"?this.terrain.lower(e.x,e.z):e.type==="build_tower"?this.terrain.addBuilding("tower",e.x,e.z):e.type==="build_barracks"&&this.terrain.addBuilding("barracks",e.x,e.z)}catch(n){console.error(`[Game] Request Execution Failed for ${e.type} at ${e.x},${e.z}:`,n),i=!1}if(i)e.status="completed",e.completedAt=Date.now(),e.mesh&&e.mesh.material&&e.mesh.material.uniforms&&e.mesh.material.uniforms.uColor.value.setHex(65280);else{const n=this.requestQueue.indexOf(e);n!==-1&&this.requestQueue.splice(n,1),e.mesh&&this.scene.remove(e.mesh)}}updateCameraControls(){this.controls&&this.controls.update();const t=this.camera.position.x,e=this.camera.position.z,i=30;this.clippingPlanes&&(this.clippingPlanes[0].constant=-(t-i),this.clippingPlanes[1].constant=t+i,this.clippingPlanes[2].constant=-(e-i),this.clippingPlanes[3].constant=e+i)}updateStats(){if(!this.statsDisplay)return;const t=this.terrain.totalHousingPop||0;this.totalPopulation=Math.floor(t)+this.units.length*10;const e=Math.floor(this.gameTime),i=Math.floor(this.gameTime%1*60),n=`${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")} `,a=this.gameTime>=18||this.gameTime<6?"🌙":"☀️";document.getElementById("time-val").innerText=`${n} ${a} `;const o=document.getElementById("day-val");o&&(o.innerText=`Day ${this.daysPassed||1} `),document.getElementById("season-val").innerText=this.season||"Spring",document.getElementById("pop-val").innerText=Math.floor(this.totalPopulation||0);const l=this.units.filter(p=>p.role==="knight").length,h=this.units.filter(p=>p.role==="wizard").length;document.getElementById("active-val").innerText=this.units.length;const c=document.getElementById("knight-val");c&&(c.innerText=l);const u=document.getElementById("wizard-val");u&&(u.innerText=h),document.getElementById("house-val").innerText=this.terrain.buildings.filter(p=>p.userData.type==="house").length,document.getElementById("castle-val").innerText=this.terrain.buildings.filter(p=>p.userData.type==="barracks").length,document.getElementById("grain-val").innerText=Math.floor(this.resources.grain),document.getElementById("fish-val").innerText=Math.floor(this.resources.fish),document.getElementById("meat-val").innerText=Math.floor(this.resources.meat);const d=document.getElementById("mana-val");d&&(d.innerText=Math.floor(this.mana),d.style.color=this.mana<0?"#ff4444":"white")}animate(){requestAnimationFrame(this.animate.bind(this));const t=performance.now();let e=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t,this.terrain&&this.terrain.resetPathfindingBudget&&this.terrain.resetPathfindingBudget(),e*=this.timeScale||1,this.gameTotalTime+=e*1e3;const i=this.gameTotalTime,n=i/1e3;(!this.lastHeartbeat||t-this.lastHeartbeat>5e3)&&(this.lastHeartbeat=t);let s=!1;try{s=this.updateEnvironment(e),this.updateSeasons(e),this.terrain&&this.terrain.update(e,this.handleBuildingSpawn.bind(this),s)}catch(d){console.error("Env/Season Error:",d)}this.checkExpiredRequests(Date.now()),this.updateRequestMarkers();try{this.updateCameraControls()}catch(d){console.error("Cam Error:",d)}try{this.updateStats()}catch(d){console.error("Stats Error:",d)}const o=(this.totalPopulation||0)*.1*e;this.mana+=o;try{this.inputManager.update(e)}catch(d){console.error("Input Error:",d)}try{this.cloudManager.update(e,this.camera)}catch(d){console.error("Cloud Error:",d)}this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();const l=new ns,h=new Kt;h.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),l.setFromProjectionMatrix(h);try{this.birdManager.update(e,n,l)}catch(d){console.error("Bird Error:",d)}try{this.sheepManager.update(n,e)}catch(d){console.error("Sheep Error:",d)}try{this.goblinManager.update(i,e,s,this.units,this.timeScale,this.camera)}catch(d){console.error("Goblin Manager Error:",d)}try{this.fishManager.update(i,e,l)}catch(d){console.error("Fish Error:",d)}if(this.minimap)try{this.minimap.update()}catch(d){console.error("Minimap Error:",d)}if(this.compass)try{this.compass.update()}catch(d){console.error("Compass Error:",d)}this.inputManager&&this.inputManager.update();try{this.updateRequestMarkers()}catch(d){console.error("RequestMarkers Error:",d)}this.markerTime===void 0&&(this.markerTime=0),this.markerTime+=e;try{for(const d of this.requestQueue)d.mesh&&d.mesh.material.uniforms&&(d.mesh.material.uniforms.uTime.value=this.markerTime)}catch(d){console.error("Shader Uniforms Error:",d)}try{this.updateProjectiles(e)}catch(d){console.error("Projectiles Error:",d)}this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const c=Math.max(1,Math.floor(4/this.timeScale)),u=this.frameCount%c;try{for(let d=this.units.length-1;d>=0;d--){const p=this.units[d];if(p.updateMovement&&p.updateMovement(i),d%c===u){try{p.updateLogic(i,e*c,s,this.goblinManager.goblins)}catch(g){console.error("Unit Logic Error:",g,p)}p.isDead&&p.isFinished&&this.units.splice(d,1)}}}catch(d){console.error("Unit Loop Error:",d)}try{this.terrain.update(e,this.handleBuildingSpawn.bind(this),s)}catch(d){console.error("Terrain Update Error:",d)}try{this.terrain.updateMeshPosition(this.camera),this.terrain.updateLights(this.gameTime)}catch(d){console.error("Terrain Visuals Error:",d)}if(this.frameCount%120===0){const d=this.terrain.buildings?this.terrain.buildings.length:"null";console.log(`[Game] calling BR.update. BR exists: ${!!this.buildingRenderer}, Buildings: ${d}`)}if(this.buildingRenderer&&this.buildingRenderer.updateLighting(s),this.unitRenderer)try{this.unitRenderer.update(this.units,l,this.camera)}catch(d){console.error("UnitRenderer Error:",d)}if(this.buildingRenderer){try{this.buildingRenderer.update(this.terrain.buildings,l,this.camera)}catch(d){console.error("BuildingRenderer Error:",d)}if(this.frameCount%300===0){const d={};this.scene.traverse(p=>{if(p.isMesh){let g=p.name||"Unnamed";if(p.isInstancedMesh)g=`[Instanced] ${p.geometry?p.geometry.type:"UnknownGeo"} (Active:${p.count}/${p.instanceMatrix.count})`;else if(g==="Unnamed"&&p.geometry){const x=p.geometry,m=x.type;let f="";if(m==="BoxGeometry"&&x.parameters){const y=x.parameters;f=`(${y.width.toFixed(1)},${y.height.toFixed(1)},${y.depth.toFixed(1)})`}else m==="SphereGeometry"&&x.parameters?f=`(R${x.parameters.radius.toFixed(1)})`:m==="ConeGeometry"&&(f="(Cone)");g=`Unnamed_${m}${f}`}d[g]=(d[g]||0)+1}}),console.log("[Scene Audit] Objects:",JSON.stringify(d))}}this.renderer.render(this.scene,this.camera)}saveGame(t){if(!this.saveManager)return!1;const e={slotId:t,timestamp:Date.now(),resources:this.resources,gameTime:this.gameTime,gameTotalTime:this.gameTotalTime,currentSeasonIndex:this.currentSeasonIndex,daysPassed:this.daysPassed,terrain:this.terrain.serialize(),units:this.units.filter(i=>!i.isDead).map(i=>i.serialize()),goblinManager:this.goblinManager?this.goblinManager.serialize():null,camera:{position:{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z},zoom:this.camera.zoom,target:{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}},requests:this.requestQueue.map(i=>({id:i.id,type:i.type,x:i.x,z:i.z,status:i.status,assignedTo:i.assignedTo,createdAt:i.createdAt}))};return console.log("Saving Game Data:",e),e.terrain||console.error("Save Error: Terrain data is missing!"),this.saveManager.save(t,e)}async loadGame(t){if(!this.saveManager)return!1;const e=document.getElementById("loading-screen"),i=document.getElementById("loading-bar"),n=document.getElementById("loading-text");e&&(e.style.display="flex",i&&(i.style.width="0%"),n&&(n.innerText="0%")),console.log("Load Started..."),await new Promise(o=>setTimeout(o,50));const s=this.saveManager.load(t);if(!s)return console.error("Load Game Failed: No data for slot",t),e&&(e.style.display="none"),!1;console.log("Load Game: Data found",s),this.goblinManager&&this.goblinManager.reset(),this.clearProjectiles(),this.requestQueue&&(this.requestQueue.forEach(o=>{o.mesh&&(this.scene.remove(o.mesh),o.mesh.geometry&&o.mesh.geometry.dispose(),o.mesh.material&&o.mesh.material.dispose())}),this.requestQueue=[]),this.buildingRenderer&&this.buildingRenderer.dispose&&this.buildingRenderer.dispose(),this.goblinRenderer&&this.goblinRenderer.dispose&&this.goblinRenderer.dispose(),this.unitRenderer&&this.unitRenderer.dispose&&this.unitRenderer.dispose(),this.buildingRenderer=new dl(this.scene,this.terrain,this.clippingPlanes),this.goblinRenderer=new Wl(this.scene,this.terrain,this.clippingPlanes),this.unitRenderer=new cl(this.scene,this.terrain,this.clippingPlanes),this.inputManager&&(this.inputManager.unitRenderer=this.unitRenderer),await this.terrain.deserialize(s.terrain,o=>{i&&(i.style.width=o+"%"),n&&(n.innerText=o+"%")}),this.resources=s.resources||{grain:0,fish:0,meat:0},this.gameTime=s.gameTime||8,this.gameTotalTime=s.gameTotalTime||0,this.currentSeasonIndex=s.currentSeasonIndex||0,this.daysPassed=s.daysPassed||0;const a=["Spring","Summer","Autumn","Winter"];if(this.season=a[this.currentSeasonIndex],this.terrain&&this.terrain.setSeason(this.season),this.units&&this.units.forEach(o=>{o.dispose&&o.dispose(),this.scene.remove(o.mesh),o.crossMesh&&this.scene.remove(o.crossMesh)}),this.units=[],s.units)try{s.units.forEach(o=>{const l=pt.deserialize(o,this.scene,this.terrain);l&&this.units.push(l)})}catch(o){console.error("Unit restore failed:",o)}if(this.goblinManager&&(s.goblinManager?this.goblinManager.deserialize(s.goblinManager):this.goblinManager.scanForCaves()),s.requests){console.log(`[Game] Restoring ${s.requests.length} requests...`);let o=0;s.requests.forEach(l=>{const h=l.id.split("_"),c=parseInt(h[h.length-1]);!isNaN(c)&&c>o&&(o=c);let u=this.terrain.getTileHeight(l.x,l.z);(u===void 0||isNaN(u))&&(u=10);const d=new Mi(.5,.5,5,16,1,!0),p=this.markerMaterial.clone(),g=new Jt(d,p);g.position.set(l.x,u+2,l.z),this.scene.add(g);const x={id:l.id,type:l.type,x:l.x,z:l.z,status:l.status,assignedTo:l.assignedTo,createdAt:l.createdAt||Date.now(),mesh:g};this.requestQueue.push(x)}),this.requestIdCounter=Math.max(this.requestIdCounter,o+1)}if(this.units&&this.units.forEach(o=>{if(o.savedHomeBaseX!==void 0){const l=this.terrain.getBuildingAt(o.savedHomeBaseX,o.savedHomeBaseZ);l&&(o.homeBase=l)}if(o.savedTargetRequestId){const l=this.requestQueue.find(h=>h.id===o.savedTargetRequestId);l?(o.targetRequest=l,console.log(`[Game] Re-linked Unit ${o.id} to Request ${l.id}`),l.status==="pending"&&(l.status="assigned"),l.assignedTo!==o.id&&(l.assignedTo=o.id)):o.targetRequest=null,o.savedTargetRequestId=null}}),s.camera){this.camera.position.set(s.camera.position.x,s.camera.position.y,s.camera.position.z),this.controls&&(this.controls.target.set(s.camera.target.x,s.camera.target.y,s.camera.target.z),this.controls.update());const o=s.camera.zoom!==void 0?s.camera.zoom:1;this.camera.zoom=o,this.camera.updateProjectionMatrix(),console.log(`[Game] Restored Camera Zoom: ${o}`)}return e&&(i&&(i.style.width="100%"),n&&(n.innerText="100%"),await new Promise(o=>setTimeout(o,200)),e.style.display="none"),!0}registerSquad(t){this.squads||(this.squads=new Map);const e=Math.floor(Math.random()*1e6);return this.squads.set(e,{id:e,type:t,target:null,lastUpdate:Date.now()}),console.log(`[Game] Registered Squad ${e} (${t})`),e}getSquad(t){return this.squads?this.squads.get(t):null}reportSquadTarget(t,e,i){if(!this.squads)return;const n=this.squads.get(t);n&&(!n.target||n.target.x!==e||n.target.z!==i?(console.log(`[Squad ${t}] Target Updated: ${e},${i}`),n.target={x:e,z:i,time:Date.now()},n.lastUpdate=Date.now()):n.target&&(n.target.time=Date.now())),this.reportGlobalBattle(e,i)}reportGlobalBattle(t,e){this.battleHotspots||(this.battleHotspots=[]);const i=Date.now();this.battleHotspots=this.battleHotspots.filter(s=>i-s.time<3e4);const n=this.battleHotspots.find(s=>{const a=Math.abs(s.x-t),o=Math.abs(s.z-e);return a<10&&o<10});n?(n.time=i,n.x=t,n.z=e):(this.battleHotspots.push({x:t,z:e,time:i}),console.log(`[Game] New Global Battle Hotspot reported at ${t},${e}`))}}new $m;
