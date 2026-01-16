(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const Oa="181",Un={ROTATE:0,DOLLY:1,PAN:2},Ln={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hh=0,ho=1,ch=2,wl=1,dh=2,Ci=3,$i=0,ke=1,$e=2,Ii=0,an=1,Xr=2,co=3,uo=4,uh=5,sn=100,fh=101,ph=102,mh=103,gh=104,xh=200,_h=201,Mh=202,vh=203,qr=204,Zr=205,yh=206,bh=207,Sh=208,wh=209,Th=210,Eh=211,Ah=212,Rh=213,Ch=214,$r=0,Yr=1,jr=2,Nn=3,Kr=4,Jr=5,Qr=6,ta=7,Ga=0,Dh=1,Ph=2,qi=0,Ih=1,Lh=2,Uh=3,Fh=4,Nh=5,zh=6,Bh=7,Tl=300,zn=301,Bn=302,ea=303,ia=304,ir=306,na=1e3,Di=1001,sa=1002,Ye=1003,Oh=1004,fs=1005,ti=1006,cr=1007,Wi=1008,yi=1009,El=1010,Al=1011,ns=1012,ka=1013,on=1014,Mi=1015,kn=1016,Ha=1017,Va=1018,ss=1020,Rl=35902,Cl=35899,Dl=1021,Pl=1022,ci=1023,rs=1026,as=1027,Wa=1028,Xa=1029,qa=1030,Za=1031,$a=1033,Hs=33776,Vs=33777,Ws=33778,Xs=33779,ra=35840,aa=35841,oa=35842,la=35843,ha=36196,ca=37492,da=37496,ua=37808,fa=37809,pa=37810,ma=37811,ga=37812,xa=37813,_a=37814,Ma=37815,va=37816,ya=37817,ba=37818,Sa=37819,wa=37820,Ta=37821,Ea=36492,Aa=36494,Ra=36495,Ca=36283,Da=36284,Pa=36285,Ia=36286,Gh=3200,kh=3201,Ya=0,Hh=1,Vi="",Ze="srgb",On="srgb-linear",$s="linear",ie="srgb",pn=7680,fo=519,Vh=512,Wh=513,Xh=514,Il=515,qh=516,Zh=517,$h=518,Yh=519,La=35044,ja=35048,po="300 es",vi=2e3,Ys=2001;function Ll(a){for(let t=a.length-1;t>=0;--t)if(a[t]>=65535)return!0;return!1}function js(a){return document.createElementNS("http://www.w3.org/1999/xhtml",a)}function jh(){const a=js("canvas");return a.style.display="block",a}const mo={};function Ks(...a){const t="THREE."+a.shift();console.log(t,...a)}function Lt(...a){const t="THREE."+a.shift();console.warn(t,...a)}function fe(...a){const t="THREE."+a.shift();console.error(t,...a)}function os(...a){const t=a.join(" ");t in mo||(mo[t]=!0,Lt(...a))}function Kh(a,t,e){return new Promise(function(i,n){function s(){switch(a.clientWaitSync(t,a.SYNC_FLUSH_COMMANDS_BIT,0)){case a.WAIT_FAILED:n();break;case a.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}class dn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,r=n.length;s<r;s++)n[s].call(this,t);t.target=null}}}const Ae=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],qs=Math.PI/180,Ua=180/Math.PI;function Zi(){const a=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ae[a&255]+Ae[a>>8&255]+Ae[a>>16&255]+Ae[a>>24&255]+"-"+Ae[t&255]+Ae[t>>8&255]+"-"+Ae[t>>16&15|64]+Ae[t>>24&255]+"-"+Ae[e&63|128]+Ae[e>>8&255]+"-"+Ae[e>>16&255]+Ae[e>>24&255]+Ae[i&255]+Ae[i>>8&255]+Ae[i>>16&255]+Ae[i>>24&255]).toLowerCase()}function Ht(a,t,e){return Math.max(t,Math.min(e,a))}function Jh(a,t){return(a%t+t)%t}function dr(a,t,e){return(1-e)*a+e*t}function _i(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return a/4294967295;case Uint16Array:return a/65535;case Uint8Array:return a/255;case Int32Array:return Math.max(a/2147483647,-1);case Int16Array:return Math.max(a/32767,-1);case Int8Array:return Math.max(a/127,-1);default:throw new Error("Invalid component type.")}}function ne(a,t){switch(t.constructor){case Float32Array:return a;case Uint32Array:return Math.round(a*4294967295);case Uint16Array:return Math.round(a*65535);case Uint8Array:return Math.round(a*255);case Int32Array:return Math.round(a*2147483647);case Int16Array:return Math.round(a*32767);case Int8Array:return Math.round(a*127);default:throw new Error("Invalid component type.")}}const Qh={DEG2RAD:qs};class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*n+t.x,this.y=s*n+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ln{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,r,o){let l=i[n+0],h=i[n+1],c=i[n+2],d=i[n+3],u=s[r+0],f=s[r+1],m=s[r+2],x=s[r+3];if(o<=0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=d;return}if(o>=1){t[e+0]=u,t[e+1]=f,t[e+2]=m,t[e+3]=x;return}if(d!==x||l!==u||h!==f||c!==m){let g=l*u+h*f+c*m+d*x;g<0&&(u=-u,f=-f,m=-m,x=-x,g=-g);let p=1-o;if(g<.9995){const b=Math.acos(g),_=Math.sin(b);p=Math.sin(p*b)/_,o=Math.sin(o*b)/_,l=l*p+u*o,h=h*p+f*o,c=c*p+m*o,d=d*p+x*o}else{l=l*p+u*o,h=h*p+f*o,c=c*p+m*o,d=d*p+x*o;const b=1/Math.sqrt(l*l+h*h+c*c+d*d);l*=b,h*=b,c*=b,d*=b}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,n,s,r){const o=i[n],l=i[n+1],h=i[n+2],c=i[n+3],d=s[r],u=s[r+1],f=s[r+2],m=s[r+3];return t[e]=o*m+c*d+l*f-h*u,t[e+1]=l*m+c*u+h*d-o*f,t[e+2]=h*m+c*f+o*u-l*d,t[e+3]=c*m-o*d-l*u-h*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,h=o(i/2),c=o(n/2),d=o(s/2),u=l(i/2),f=l(n/2),m=l(s/2);switch(r){case"XYZ":this._x=u*c*d+h*f*m,this._y=h*f*d-u*c*m,this._z=h*c*m+u*f*d,this._w=h*c*d-u*f*m;break;case"YXZ":this._x=u*c*d+h*f*m,this._y=h*f*d-u*c*m,this._z=h*c*m-u*f*d,this._w=h*c*d+u*f*m;break;case"ZXY":this._x=u*c*d-h*f*m,this._y=h*f*d+u*c*m,this._z=h*c*m+u*f*d,this._w=h*c*d-u*f*m;break;case"ZYX":this._x=u*c*d-h*f*m,this._y=h*f*d+u*c*m,this._z=h*c*m-u*f*d,this._w=h*c*d+u*f*m;break;case"YZX":this._x=u*c*d+h*f*m,this._y=h*f*d+u*c*m,this._z=h*c*m-u*f*d,this._w=h*c*d-u*f*m;break;case"XZY":this._x=u*c*d-h*f*m,this._y=h*f*d-u*c*m,this._z=h*c*m+u*f*d,this._w=h*c*d+u*f*m;break;default:Lt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],r=e[1],o=e[5],l=e[9],h=e[2],c=e[6],d=e[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(c-l)*f,this._y=(s-h)*f,this._z=(r-n)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(c-l)/f,this._x=.25*f,this._y=(n+r)/f,this._z=(s+h)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(s-h)/f,this._x=(n+r)/f,this._y=.25*f,this._z=(l+c)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(r-n)/f,this._x=(s+h)/f,this._y=(l+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ht(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,r=t._w,o=e._x,l=e._y,h=e._z,c=e._w;return this._x=i*c+r*o+n*h-s*l,this._y=n*c+r*l+s*o-i*h,this._z=s*c+r*h+i*l-n*o,this._w=r*c-i*o-n*l-s*h,this._onChangeCallback(),this}slerp(t,e){if(e<=0)return this;if(e>=1)return this.copy(t);let i=t._x,n=t._y,s=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,n=-n,s=-s,r=-r,o=-o);let l=1-e;if(o<.9995){const h=Math.acos(o),c=Math.sin(h);l=Math.sin(l*h)/c,e=Math.sin(e*h)/c,this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+r*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+n*e,this._z=this._z*l+s*e,this._w=this._w*l+r*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,e=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(go.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(go.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,r=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*r,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*r,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*r,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,r=t.y,o=t.z,l=t.w,h=2*(r*n-o*i),c=2*(o*e-s*n),d=2*(s*i-r*e);return this.x=e+l*h+r*d-o*c,this.y=i+l*c+o*h-s*d,this.z=n+l*d+s*c-r*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,r=e.x,o=e.y,l=e.z;return this.x=n*l-s*o,this.y=s*r-i*l,this.z=i*o-n*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ur.copy(this).projectOnVector(t),this.sub(ur)}reflect(t){return this.sub(ur.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ht(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ur=new U,go=new ln;class zt{constructor(t,e,i,n,s,r,o,l,h){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,r,o,l,h)}set(t,e,i,n,s,r,o,l,h){const c=this.elements;return c[0]=t,c[1]=n,c[2]=o,c[3]=e,c[4]=s,c[5]=l,c[6]=i,c[7]=r,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,r=i[0],o=i[3],l=i[6],h=i[1],c=i[4],d=i[7],u=i[2],f=i[5],m=i[8],x=n[0],g=n[3],p=n[6],b=n[1],_=n[4],v=n[7],w=n[2],M=n[5],A=n[8];return s[0]=r*x+o*b+l*w,s[3]=r*g+o*_+l*M,s[6]=r*p+o*v+l*A,s[1]=h*x+c*b+d*w,s[4]=h*g+c*_+d*M,s[7]=h*p+c*v+d*A,s[2]=u*x+f*b+m*w,s[5]=u*g+f*_+m*M,s[8]=u*p+f*v+m*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],o=t[5],l=t[6],h=t[7],c=t[8];return e*r*c-e*o*h-i*s*c+i*o*l+n*s*h-n*r*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=c*r-o*h,u=o*l-c*s,f=h*s-r*l,m=e*d+i*u+n*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=d*x,t[1]=(n*h-c*i)*x,t[2]=(o*i-n*r)*x,t[3]=u*x,t[4]=(c*e-n*l)*x,t[5]=(n*s-o*e)*x,t[6]=f*x,t[7]=(i*l-h*e)*x,t[8]=(r*e-i*s)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,r,o){const l=Math.cos(s),h=Math.sin(s);return this.set(i*l,i*h,-i*(l*r+h*o)+r+t,-n*h,n*l,-n*(-h*r+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(fr.makeScale(t,e)),this}rotate(t){return this.premultiply(fr.makeRotation(-t)),this}translate(t,e){return this.premultiply(fr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const fr=new zt,xo=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_o=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tc(){const a={enabled:!0,workingColorSpace:On,spaces:{},convert:function(n,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===ie&&(n.r=Li(n.r),n.g=Li(n.g),n.b=Li(n.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ie&&(n.r=Fn(n.r),n.g=Fn(n.g),n.b=Fn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Vi?$s:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,r){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return os("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),a.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return os("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),a.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return a.define({[On]:{primaries:t,whitePoint:i,transfer:$s,toXYZ:xo,fromXYZ:_o,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:i,transfer:ie,toXYZ:xo,fromXYZ:_o,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),a}const jt=tc();function Li(a){return a<.04045?a*.0773993808:Math.pow(a*.9478672986+.0521327014,2.4)}function Fn(a){return a<.0031308?a*12.92:1.055*Math.pow(a,.41666)-.055}let mn;class ec{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{mn===void 0&&(mn=js("canvas")),mn.width=t.width,mn.height=t.height;const n=mn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=mn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=js("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let r=0;r<s.length;r++)s[r]=Li(s[r]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Li(e[i]/255)*255):e[i]=Li(e[i]);return{data:e,width:t.width,height:t.height}}else return Lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ic=0;class Ka{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ic++}),this.uuid=Zi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let r=0,o=n.length;r<o;r++)n[r].isDataTexture?s.push(pr(n[r].image)):s.push(pr(n[r]))}else s=pr(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function pr(a){return typeof HTMLImageElement<"u"&&a instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&a instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&a instanceof ImageBitmap?ec.getDataURL(a):a.data?{data:Array.from(a.data),width:a.width,height:a.height,type:a.data.constructor.name}:(Lt("Texture: Unable to serialize Texture."),{})}let nc=0;const mr=new U;class De extends dn{constructor(t=De.DEFAULT_IMAGE,e=De.DEFAULT_MAPPING,i=Di,n=Di,s=ti,r=Wi,o=ci,l=yi,h=De.DEFAULT_ANISOTROPY,c=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nc++}),this.uuid=Zi(),this.name="",this.source=new Ka(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=r,this.anisotropy=h,this.format=o,this.internalFormat=null,this.type=l,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(mr).x}get height(){return this.source.getSize(mr).y}get depth(){return this.source.getSize(mr).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){Lt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case na:t.x=t.x-Math.floor(t.x);break;case Di:t.x=t.x<0?0:1;break;case sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case na:t.y=t.y-Math.floor(t.y);break;case Di:t.y=t.y<0?0:1;break;case sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}De.DEFAULT_IMAGE=null;De.DEFAULT_MAPPING=Tl;De.DEFAULT_ANISOTROPY=1;class ge{constructor(t=0,e=0,i=0,n=1){ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*n+r[12]*s,this.y=r[1]*e+r[5]*i+r[9]*n+r[13]*s,this.z=r[2]*e+r[6]*i+r[10]*n+r[14]*s,this.w=r[3]*e+r[7]*i+r[11]*n+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const l=t.elements,h=l[0],c=l[4],d=l[8],u=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(c-u)<.01&&Math.abs(d-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(c+u)<.1&&Math.abs(d+x)<.1&&Math.abs(m+g)<.1&&Math.abs(h+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const _=(h+1)/2,v=(f+1)/2,w=(p+1)/2,M=(c+u)/4,A=(d+x)/4,R=(m+g)/4;return _>v&&_>w?_<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(_),n=M/i,s=A/i):v>w?v<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(v),i=M/n,s=R/n):w<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(w),i=A/s,n=R/s),this.set(i,n,s,e),this}let b=Math.sqrt((g-m)*(g-m)+(d-x)*(d-x)+(u-c)*(u-c));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(d-x)/b,this.z=(u-c)/b,this.w=Math.acos((h+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ht(this.x,t.x,e.x),this.y=Ht(this.y,t.y,e.y),this.z=Ht(this.z,t.z,e.z),this.w=Ht(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ht(this.x,t,e),this.y=Ht(this.y,t,e),this.z=Ht(this.z,t,e),this.w=Ht(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ht(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sc extends dn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ti,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ge(0,0,t,e),this.scissorTest=!1,this.viewport=new ge(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new De(n);this.textures=[];const r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:ti,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new Ka(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class hn extends sc{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Ul extends De{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class rc extends De{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ye,this.minFilter=Ye,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class un{constructor(t=new U(1/0,1/0,1/0),e=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ri.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ri.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ri.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,ri):ri.fromBufferAttribute(s,r),ri.applyMatrix4(t.matrixWorld),this.expandByPoint(ri);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ps.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ps.copy(i.boundingBox)),ps.applyMatrix4(t.matrixWorld),this.union(ps)}const n=t.children;for(let s=0,r=n.length;s<r;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ri),ri.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xn),ms.subVectors(this.max,Xn),gn.subVectors(t.a,Xn),xn.subVectors(t.b,Xn),_n.subVectors(t.c,Xn),zi.subVectors(xn,gn),Bi.subVectors(_n,xn),Ki.subVectors(gn,_n);let e=[0,-zi.z,zi.y,0,-Bi.z,Bi.y,0,-Ki.z,Ki.y,zi.z,0,-zi.x,Bi.z,0,-Bi.x,Ki.z,0,-Ki.x,-zi.y,zi.x,0,-Bi.y,Bi.x,0,-Ki.y,Ki.x,0];return!gr(e,gn,xn,_n,ms)||(e=[1,0,0,0,1,0,0,0,1],!gr(e,gn,xn,_n,ms))?!1:(gs.crossVectors(zi,Bi),e=[gs.x,gs.y,gs.z],gr(e,gn,xn,_n,ms))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ri).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ri).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Si=[new U,new U,new U,new U,new U,new U,new U,new U],ri=new U,ps=new un,gn=new U,xn=new U,_n=new U,zi=new U,Bi=new U,Ki=new U,Xn=new U,ms=new U,gs=new U,Ji=new U;function gr(a,t,e,i,n){for(let s=0,r=a.length-3;s<=r;s+=3){Ji.fromArray(a,s);const o=n.x*Math.abs(Ji.x)+n.y*Math.abs(Ji.y)+n.z*Math.abs(Ji.z),l=t.dot(Ji),h=e.dot(Ji),c=i.dot(Ji);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>o)return!1}return!0}const ac=new un,qn=new U,xr=new U;class pi{constructor(t=new U,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):ac.setFromPoints(t).getCenter(i);let n=0;for(let s=0,r=t.length;s<r;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;qn.subVectors(t,this.center);const e=qn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(qn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(xr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(qn.copy(t.center).add(xr)),this.expandByPoint(qn.copy(t.center).sub(xr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const wi=new U,_r=new U,xs=new U,Oi=new U,Mr=new U,_s=new U,vr=new U;class hs{constructor(t=new U,e=new U(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,wi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=wi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(wi.copy(this.origin).addScaledVector(this.direction,e),wi.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){_r.copy(t).add(e).multiplyScalar(.5),xs.copy(e).sub(t).normalize(),Oi.copy(this.origin).sub(_r);const s=t.distanceTo(e)*.5,r=-this.direction.dot(xs),o=Oi.dot(this.direction),l=-Oi.dot(xs),h=Oi.lengthSq(),c=Math.abs(1-r*r);let d,u,f,m;if(c>0)if(d=r*l-o,u=r*o-l,m=s*c,d>=0)if(u>=-m)if(u<=m){const x=1/c;d*=x,u*=x,f=d*(d+r*u+2*o)+u*(r*d+u+2*l)+h}else u=s,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+h;else u=-s,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+h;else u<=-m?(d=Math.max(0,-(-r*s+o)),u=d>0?-s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+h):u<=m?(d=0,u=Math.min(Math.max(-s,-l),s),f=u*(u+2*l)+h):(d=Math.max(0,-(r*s+o)),u=d>0?s:Math.min(Math.max(-s,-l),s),f=-d*d+u*(u+2*l)+h);else u=r>0?-s:s,d=Math.max(0,-(r*u+o)),f=-d*d+u*(u+2*l)+h;return i&&i.copy(this.origin).addScaledVector(this.direction,d),n&&n.copy(_r).addScaledVector(xs,u),f}intersectSphere(t,e){wi.subVectors(t.center,this.origin);const i=wi.dot(this.direction),n=wi.dot(wi)-i*i,s=t.radius*t.radius;if(n>s)return null;const r=Math.sqrt(s-n),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,r,o,l;const h=1/this.direction.x,c=1/this.direction.y,d=1/this.direction.z,u=this.origin;return h>=0?(i=(t.min.x-u.x)*h,n=(t.max.x-u.x)*h):(i=(t.max.x-u.x)*h,n=(t.min.x-u.x)*h),c>=0?(s=(t.min.y-u.y)*c,r=(t.max.y-u.y)*c):(s=(t.max.y-u.y)*c,r=(t.min.y-u.y)*c),i>r||s>n||((s>i||isNaN(i))&&(i=s),(r<n||isNaN(n))&&(n=r),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,wi)!==null}intersectTriangle(t,e,i,n,s){Mr.subVectors(e,t),_s.subVectors(i,t),vr.crossVectors(Mr,_s);let r=this.direction.dot(vr),o;if(r>0){if(n)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Oi.subVectors(this.origin,t);const l=o*this.direction.dot(_s.crossVectors(Oi,_s));if(l<0)return null;const h=o*this.direction.dot(Mr.cross(Oi));if(h<0||l+h>r)return null;const c=-o*Oi.dot(vr);return c<0?null:this.at(c/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Jt{constructor(t,e,i,n,s,r,o,l,h,c,d,u,f,m,x,g){Jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,r,o,l,h,c,d,u,f,m,x,g)}set(t,e,i,n,s,r,o,l,h,c,d,u,f,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=s,p[5]=r,p[9]=o,p[13]=l,p[2]=h,p[6]=c,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Jt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/Mn.setFromMatrixColumn(t,0).length(),s=1/Mn.setFromMatrixColumn(t,1).length(),r=1/Mn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*r,e[9]=i[9]*r,e[10]=i[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(n),h=Math.sin(n),c=Math.cos(s),d=Math.sin(s);if(t.order==="XYZ"){const u=r*c,f=r*d,m=o*c,x=o*d;e[0]=l*c,e[4]=-l*d,e[8]=h,e[1]=f+m*h,e[5]=u-x*h,e[9]=-o*l,e[2]=x-u*h,e[6]=m+f*h,e[10]=r*l}else if(t.order==="YXZ"){const u=l*c,f=l*d,m=h*c,x=h*d;e[0]=u+x*o,e[4]=m*o-f,e[8]=r*h,e[1]=r*d,e[5]=r*c,e[9]=-o,e[2]=f*o-m,e[6]=x+u*o,e[10]=r*l}else if(t.order==="ZXY"){const u=l*c,f=l*d,m=h*c,x=h*d;e[0]=u-x*o,e[4]=-r*d,e[8]=m+f*o,e[1]=f+m*o,e[5]=r*c,e[9]=x-u*o,e[2]=-r*h,e[6]=o,e[10]=r*l}else if(t.order==="ZYX"){const u=r*c,f=r*d,m=o*c,x=o*d;e[0]=l*c,e[4]=m*h-f,e[8]=u*h+x,e[1]=l*d,e[5]=x*h+u,e[9]=f*h-m,e[2]=-h,e[6]=o*l,e[10]=r*l}else if(t.order==="YZX"){const u=r*l,f=r*h,m=o*l,x=o*h;e[0]=l*c,e[4]=x-u*d,e[8]=m*d+f,e[1]=d,e[5]=r*c,e[9]=-o*c,e[2]=-h*c,e[6]=f*d+m,e[10]=u-x*d}else if(t.order==="XZY"){const u=r*l,f=r*h,m=o*l,x=o*h;e[0]=l*c,e[4]=-d,e[8]=h*c,e[1]=u*d+x,e[5]=r*c,e[9]=f*d-m,e[2]=m*d-f,e[6]=o*c,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(oc,t,lc)}lookAt(t,e,i){const n=this.elements;return Xe.subVectors(t,e),Xe.lengthSq()===0&&(Xe.z=1),Xe.normalize(),Gi.crossVectors(i,Xe),Gi.lengthSq()===0&&(Math.abs(i.z)===1?Xe.x+=1e-4:Xe.z+=1e-4,Xe.normalize(),Gi.crossVectors(i,Xe)),Gi.normalize(),Ms.crossVectors(Xe,Gi),n[0]=Gi.x,n[4]=Ms.x,n[8]=Xe.x,n[1]=Gi.y,n[5]=Ms.y,n[9]=Xe.y,n[2]=Gi.z,n[6]=Ms.z,n[10]=Xe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,r=i[0],o=i[4],l=i[8],h=i[12],c=i[1],d=i[5],u=i[9],f=i[13],m=i[2],x=i[6],g=i[10],p=i[14],b=i[3],_=i[7],v=i[11],w=i[15],M=n[0],A=n[4],R=n[8],T=n[12],y=n[1],C=n[5],P=n[9],F=n[13],O=n[2],H=n[6],V=n[10],Q=n[14],W=n[3],tt=n[7],it=n[11],bt=n[15];return s[0]=r*M+o*y+l*O+h*W,s[4]=r*A+o*C+l*H+h*tt,s[8]=r*R+o*P+l*V+h*it,s[12]=r*T+o*F+l*Q+h*bt,s[1]=c*M+d*y+u*O+f*W,s[5]=c*A+d*C+u*H+f*tt,s[9]=c*R+d*P+u*V+f*it,s[13]=c*T+d*F+u*Q+f*bt,s[2]=m*M+x*y+g*O+p*W,s[6]=m*A+x*C+g*H+p*tt,s[10]=m*R+x*P+g*V+p*it,s[14]=m*T+x*F+g*Q+p*bt,s[3]=b*M+_*y+v*O+w*W,s[7]=b*A+_*C+v*H+w*tt,s[11]=b*R+_*P+v*V+w*it,s[15]=b*T+_*F+v*Q+w*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],r=t[1],o=t[5],l=t[9],h=t[13],c=t[2],d=t[6],u=t[10],f=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+s*l*d-n*h*d-s*o*u+i*h*u+n*o*f-i*l*f)+x*(+e*l*f-e*h*u+s*r*u-n*r*f+n*h*c-s*l*c)+g*(+e*h*d-e*o*f-s*r*d+i*r*f+s*o*c-i*h*c)+p*(-n*o*c-e*l*d+e*o*u+n*r*d-i*r*u+i*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],r=t[4],o=t[5],l=t[6],h=t[7],c=t[8],d=t[9],u=t[10],f=t[11],m=t[12],x=t[13],g=t[14],p=t[15],b=d*g*h-x*u*h+x*l*f-o*g*f-d*l*p+o*u*p,_=m*u*h-c*g*h-m*l*f+r*g*f+c*l*p-r*u*p,v=c*x*h-m*d*h+m*o*f-r*x*f-c*o*p+r*d*p,w=m*d*l-c*x*l-m*o*u+r*x*u+c*o*g-r*d*g,M=e*b+i*_+n*v+s*w;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/M;return t[0]=b*A,t[1]=(x*u*s-d*g*s-x*n*f+i*g*f+d*n*p-i*u*p)*A,t[2]=(o*g*s-x*l*s+x*n*h-i*g*h-o*n*p+i*l*p)*A,t[3]=(d*l*s-o*u*s-d*n*h+i*u*h+o*n*f-i*l*f)*A,t[4]=_*A,t[5]=(c*g*s-m*u*s+m*n*f-e*g*f-c*n*p+e*u*p)*A,t[6]=(m*l*s-r*g*s-m*n*h+e*g*h+r*n*p-e*l*p)*A,t[7]=(r*u*s-c*l*s+c*n*h-e*u*h-r*n*f+e*l*f)*A,t[8]=v*A,t[9]=(m*d*s-c*x*s-m*i*f+e*x*f+c*i*p-e*d*p)*A,t[10]=(r*x*s-m*o*s+m*i*h-e*x*h-r*i*p+e*o*p)*A,t[11]=(c*o*s-r*d*s-c*i*h+e*d*h+r*i*f-e*o*f)*A,t[12]=w*A,t[13]=(c*x*n-m*d*n+m*i*u-e*x*u-c*i*g+e*d*g)*A,t[14]=(m*o*n-r*x*n-m*i*l+e*x*l+r*i*g-e*o*g)*A,t[15]=(r*d*n-c*o*n+c*i*l-e*d*l-r*i*u+e*o*u)*A,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,r=t.x,o=t.y,l=t.z,h=s*r,c=s*o;return this.set(h*r+i,h*o-n*l,h*l+n*o,0,h*o+n*l,c*o+i,c*l-n*r,0,h*l-n*o,c*l+n*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,r){return this.set(1,i,s,0,t,1,r,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,r=e._y,o=e._z,l=e._w,h=s+s,c=r+r,d=o+o,u=s*h,f=s*c,m=s*d,x=r*c,g=r*d,p=o*d,b=l*h,_=l*c,v=l*d,w=i.x,M=i.y,A=i.z;return n[0]=(1-(x+p))*w,n[1]=(f+v)*w,n[2]=(m-_)*w,n[3]=0,n[4]=(f-v)*M,n[5]=(1-(u+p))*M,n[6]=(g+b)*M,n[7]=0,n[8]=(m+_)*A,n[9]=(g-b)*A,n[10]=(1-(u+x))*A,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=Mn.set(n[0],n[1],n[2]).length();const r=Mn.set(n[4],n[5],n[6]).length(),o=Mn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],ai.copy(this);const h=1/s,c=1/r,d=1/o;return ai.elements[0]*=h,ai.elements[1]*=h,ai.elements[2]*=h,ai.elements[4]*=c,ai.elements[5]*=c,ai.elements[6]*=c,ai.elements[8]*=d,ai.elements[9]*=d,ai.elements[10]*=d,e.setFromRotationMatrix(ai),i.x=s,i.y=r,i.z=o,this}makePerspective(t,e,i,n,s,r,o=vi,l=!1){const h=this.elements,c=2*s/(e-t),d=2*s/(i-n),u=(e+t)/(e-t),f=(i+n)/(i-n);let m,x;if(l)m=s/(r-s),x=r*s/(r-s);else if(o===vi)m=-(r+s)/(r-s),x=-2*r*s/(r-s);else if(o===Ys)m=-r/(r-s),x=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return h[0]=c,h[4]=0,h[8]=u,h[12]=0,h[1]=0,h[5]=d,h[9]=f,h[13]=0,h[2]=0,h[6]=0,h[10]=m,h[14]=x,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,i,n,s,r,o=vi,l=!1){const h=this.elements,c=2/(e-t),d=2/(i-n),u=-(e+t)/(e-t),f=-(i+n)/(i-n);let m,x;if(l)m=1/(r-s),x=r/(r-s);else if(o===vi)m=-2/(r-s),x=-(r+s)/(r-s);else if(o===Ys)m=-1/(r-s),x=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return h[0]=c,h[4]=0,h[8]=0,h[12]=u,h[1]=0,h[5]=d,h[9]=0,h[13]=f,h[2]=0,h[6]=0,h[10]=m,h[14]=x,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Mn=new U,ai=new Jt,oc=new U(0,0,0),lc=new U(1,1,1),Gi=new U,Ms=new U,Xe=new U,Mo=new Jt,vo=new ln;class fi{constructor(t=0,e=0,i=0,n=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],r=n[4],o=n[8],l=n[1],h=n[5],c=n[9],d=n[2],u=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(Ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Ht(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,h)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,h));break;case"YZX":this._z=Math.asin(Ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ht(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,h),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-c,f),this._y=0);break;default:Lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Mo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vo.setFromEuler(this),this.setFromQuaternion(vo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class Ja{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let hc=0;const yo=new U,vn=new ln,Ti=new Jt,vs=new U,Zn=new U,cc=new U,dc=new ln,bo=new U(1,0,0),So=new U(0,1,0),wo=new U(0,0,1),To={type:"added"},uc={type:"removed"},yn={type:"childadded",child:null},yr={type:"childremoved",child:null};class xe extends dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hc++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new U,e=new fi,i=new ln,n=new U(1,1,1);function s(){i.setFromEuler(e,!1)}function r(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Jt},normalMatrix:{value:new zt}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ja,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return vn.setFromAxisAngle(t,e),this.quaternion.multiply(vn),this}rotateOnWorldAxis(t,e){return vn.setFromAxisAngle(t,e),this.quaternion.premultiply(vn),this}rotateX(t){return this.rotateOnAxis(bo,t)}rotateY(t){return this.rotateOnAxis(So,t)}rotateZ(t){return this.rotateOnAxis(wo,t)}translateOnAxis(t,e){return yo.copy(t).applyQuaternion(this.quaternion),this.position.add(yo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bo,t)}translateY(t){return this.translateOnAxis(So,t)}translateZ(t){return this.translateOnAxis(wo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?vs.copy(t):vs.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Zn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Zn,vs,this.up):Ti.lookAt(vs,Zn,this.up),this.quaternion.setFromRotationMatrix(Ti),n&&(Ti.extractRotation(n.matrixWorld),vn.setFromRotationMatrix(Ti),this.quaternion.premultiply(vn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(fe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(To),yn.child=t,this.dispatchEvent(yn),yn.child=null):fe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(uc),yr.child=t,this.dispatchEvent(yr),yr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(To),yn.child=t,this.dispatchEvent(yn),yn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const r=this.children[i].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zn,t,cc),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zn,dc,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,r=n.length;s<r;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const d=l[h];s(t.shapes,d)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,h=this.material.length;l<h;l++)o.push(s(t.materials,this.material[l]));n.material=o}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(t.animations,l))}}if(e){const o=r(t.geometries),l=r(t.materials),h=r(t.textures),c=r(t.images),d=r(t.shapes),u=r(t.skeletons),f=r(t.animations),m=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),h.length>0&&(i.textures=h),c.length>0&&(i.images=c),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=n,i;function r(o){const l=[];for(const h in o){const c=o[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}xe.DEFAULT_UP=new U(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const oi=new U,Ei=new U,br=new U,Ai=new U,bn=new U,Sn=new U,Eo=new U,Sr=new U,wr=new U,Tr=new U,Er=new ge,Ar=new ge,Rr=new ge;class Qe{constructor(t=new U,e=new U,i=new U){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),oi.subVectors(t,e),n.cross(oi);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){oi.subVectors(n,e),Ei.subVectors(i,e),br.subVectors(t,e);const r=oi.dot(oi),o=oi.dot(Ei),l=oi.dot(br),h=Ei.dot(Ei),c=Ei.dot(br),d=r*h-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(h*l-o*c)*u,m=(r*c-o*l)*u;return s.set(1-f-m,m,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(t,e,i,n,s,r,o,l){return this.getBarycoord(t,e,i,n,Ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ai.x),l.addScaledVector(r,Ai.y),l.addScaledVector(o,Ai.z),l)}static getInterpolatedAttribute(t,e,i,n,s,r){return Er.setScalar(0),Ar.setScalar(0),Rr.setScalar(0),Er.fromBufferAttribute(t,e),Ar.fromBufferAttribute(t,i),Rr.fromBufferAttribute(t,n),r.setScalar(0),r.addScaledVector(Er,s.x),r.addScaledVector(Ar,s.y),r.addScaledVector(Rr,s.z),r}static isFrontFacing(t,e,i,n){return oi.subVectors(i,e),Ei.subVectors(t,e),oi.cross(Ei).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return oi.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),oi.cross(Ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return Qe.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let r,o;bn.subVectors(n,i),Sn.subVectors(s,i),Sr.subVectors(t,i);const l=bn.dot(Sr),h=Sn.dot(Sr);if(l<=0&&h<=0)return e.copy(i);wr.subVectors(t,n);const c=bn.dot(wr),d=Sn.dot(wr);if(c>=0&&d<=c)return e.copy(n);const u=l*d-c*h;if(u<=0&&l>=0&&c<=0)return r=l/(l-c),e.copy(i).addScaledVector(bn,r);Tr.subVectors(t,s);const f=bn.dot(Tr),m=Sn.dot(Tr);if(m>=0&&f<=m)return e.copy(s);const x=f*h-l*m;if(x<=0&&h>=0&&m<=0)return o=h/(h-m),e.copy(i).addScaledVector(Sn,o);const g=c*m-f*d;if(g<=0&&d-c>=0&&f-m>=0)return Eo.subVectors(s,n),o=(d-c)/(d-c+(f-m)),e.copy(n).addScaledVector(Eo,o);const p=1/(g+x+u);return r=x*p,o=u*p,e.copy(i).addScaledVector(bn,r).addScaledVector(Sn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Fl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ki={h:0,s:0,l:0},ys={h:0,s:0,l:0};function Cr(a,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?a+(t-a)*6*e:e<1/2?t:e<2/3?a+(t-a)*6*(2/3-e):a}class ut{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,jt.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=jt.workingColorSpace){return this.r=t,this.g=e,this.b=i,jt.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=jt.workingColorSpace){if(t=Jh(t,1),e=Ht(e,0,1),i=Ht(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,r=2*i-s;this.r=Cr(r,s,t+1/3),this.g=Cr(r,s,t),this.b=Cr(r,s,t-1/3)}return jt.colorSpaceToWorking(this,n),this}setStyle(t,e=Ze){function i(s){s!==void 0&&parseFloat(s)<1&&Lt("Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=n[1],o=n[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:Lt("Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(s,16),e);Lt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){const i=Fl[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Lt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Li(t.r),this.g=Li(t.g),this.b=Li(t.b),this}copyLinearToSRGB(t){return this.r=Fn(t.r),this.g=Fn(t.g),this.b=Fn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return jt.workingToColorSpace(Re.copy(this),t),Math.round(Ht(Re.r*255,0,255))*65536+Math.round(Ht(Re.g*255,0,255))*256+Math.round(Ht(Re.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=jt.workingColorSpace){jt.workingToColorSpace(Re.copy(this),e);const i=Re.r,n=Re.g,s=Re.b,r=Math.max(i,n,s),o=Math.min(i,n,s);let l,h;const c=(o+r)/2;if(o===r)l=0,h=0;else{const d=r-o;switch(h=c<=.5?d/(r+o):d/(2-r-o),r){case i:l=(n-s)/d+(n<s?6:0);break;case n:l=(s-i)/d+2;break;case s:l=(i-n)/d+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=jt.workingColorSpace){return jt.workingToColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=Ze){jt.workingToColorSpace(Re.copy(this),t);const e=Re.r,i=Re.g,n=Re.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(ki),this.setHSL(ki.h+t,ki.s+e,ki.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ki),t.getHSL(ys);const i=dr(ki.h,ys.h,e),n=dr(ki.s,ys.s,e),s=dr(ki.l,ys.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new ut;ut.NAMES=Fl;let fc=0;class Fi extends dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fc++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=an,this.side=$i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qr,this.blendDst=Zr,this.blendEquation=sn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ut(0,0,0),this.blendAlpha=0,this.depthFunc=Nn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pn,this.stencilZFail=pn,this.stencilZPass=pn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){Lt(`Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){Lt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==an&&(i.blending=this.blending),this.side!==$i&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qr&&(i.blendSrc=this.blendSrc),this.blendDst!==Zr&&(i.blendDst=this.blendDst),this.blendEquation!==sn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Nn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fo&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(e){const s=n(t.textures),r=n(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class cn extends Fi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new U,bs=new yt;let pc=0;class He{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pc++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=La,this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)bs.fromBufferAttribute(this,e),bs.applyMatrix3(t),this.setXY(e,bs.x,bs.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=_i(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_i(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_i(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_i(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_i(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==La&&(t.usage=this.usage),t}}class Nl extends He{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class zl extends He{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ne extends He{constructor(t,e,i){super(new Float32Array(t),e,i)}}let mc=0;const Ke=new Jt,Dr=new xe,wn=new U,qe=new un,$n=new un,Se=new U;class ze extends dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:mc++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ll(t)?zl:Nl)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new zt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ke.makeRotationFromQuaternion(t),this.applyMatrix4(Ke),this}rotateX(t){return Ke.makeRotationX(t),this.applyMatrix4(Ke),this}rotateY(t){return Ke.makeRotationY(t),this.applyMatrix4(Ke),this}rotateZ(t){return Ke.makeRotationZ(t),this.applyMatrix4(Ke),this}translate(t,e,i){return Ke.makeTranslation(t,e,i),this.applyMatrix4(Ke),this}scale(t,e,i){return Ke.makeScale(t,e,i),this.applyMatrix4(Ke),this}lookAt(t){return Dr.lookAt(t),Dr.updateMatrix(),this.applyMatrix4(Dr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wn).negate(),this.translate(wn.x,wn.y,wn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ne(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&Lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];qe.setFromBufferAttribute(s),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,qe.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,qe.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(qe.min),this.boundingBox.expandByPoint(qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(qe.setFromBufferAttribute(t),e)for(let s=0,r=e.length;s<r;s++){const o=e[s];$n.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(qe.min,$n.min),qe.expandByPoint(Se),Se.addVectors(qe.max,$n.max),qe.expandByPoint(Se)):(qe.expandByPoint($n.min),qe.expandByPoint($n.max))}qe.getCenter(i);let n=0;for(let s=0,r=t.count;s<r;s++)Se.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Se));if(e)for(let s=0,r=e.length;s<r;s++){const o=e[s],l=this.morphTargetsRelative;for(let h=0,c=o.count;h<c;h++)Se.fromBufferAttribute(o,h),l&&(wn.fromBufferAttribute(t,h),Se.add(wn)),n=Math.max(n,i.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*i.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new U,l[R]=new U;const h=new U,c=new U,d=new U,u=new yt,f=new yt,m=new yt,x=new U,g=new U;function p(R,T,y){h.fromBufferAttribute(i,R),c.fromBufferAttribute(i,T),d.fromBufferAttribute(i,y),u.fromBufferAttribute(s,R),f.fromBufferAttribute(s,T),m.fromBufferAttribute(s,y),c.sub(h),d.sub(h),f.sub(u),m.sub(u);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(x.copy(c).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(C),g.copy(d).multiplyScalar(f.x).addScaledVector(c,-m.x).multiplyScalar(C),o[R].add(x),o[T].add(x),o[y].add(x),l[R].add(g),l[T].add(g),l[y].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let R=0,T=b.length;R<T;++R){const y=b[R],C=y.start,P=y.count;for(let F=C,O=C+P;F<O;F+=3)p(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const _=new U,v=new U,w=new U,M=new U;function A(R){w.fromBufferAttribute(n,R),M.copy(w);const T=o[R];_.copy(T),_.sub(w.multiplyScalar(w.dot(T))).normalize(),v.crossVectors(M,T);const C=v.dot(l[R])<0?-1:1;r.setXYZW(R,_.x,_.y,_.z,C)}for(let R=0,T=b.length;R<T;++R){const y=b[R],C=y.start,P=y.count;for(let F=C,O=C+P;F<O;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const n=new U,s=new U,r=new U,o=new U,l=new U,h=new U,c=new U,d=new U;if(t)for(let u=0,f=t.count;u<f;u+=3){const m=t.getX(u+0),x=t.getX(u+1),g=t.getX(u+2);n.fromBufferAttribute(e,m),s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),c.subVectors(r,s),d.subVectors(n,s),c.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),h.fromBufferAttribute(i,g),o.add(c),l.add(c),h.add(c),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,h.x,h.y,h.z)}else for(let u=0,f=e.count;u<f;u+=3)n.fromBufferAttribute(e,u+0),s.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),c.subVectors(r,s),d.subVectors(n,s),c.cross(d),i.setXYZ(u+0,c.x,c.y,c.z),i.setXYZ(u+1,c.x,c.y,c.z),i.setXYZ(u+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,l){const h=o.array,c=o.itemSize,d=o.normalized,u=new h.constructor(l.length*c);let f=0,m=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*c;for(let p=0;p<c;p++)u[m++]=h[f++]}return new He(u,c,d)}if(this.index===null)return Lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ze,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],h=t(l,i);e.setAttribute(o,h)}const s=this.morphAttributes;for(const o in s){const l=[],h=s[o];for(let c=0,d=h.length;c<d;c++){const u=h[c],f=t(u,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const h=r[o];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const h=i[l];t.data.attributes[l]=h.toJSON(t.data)}const n={};let s=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let d=0,u=h.length;d<u;d++){const f=h[d];c.push(f.toJSON(t.data))}c.length>0&&(n[l]=c,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const h in n){const c=n[h];this.setAttribute(h,c.clone(e))}const s=t.morphAttributes;for(const h in s){const c=[],d=s[h];for(let u=0,f=d.length;u<f;u++)c.push(d[u].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let h=0,c=r.length;h<c;h++){const d=r[h];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ao=new Jt,Qi=new hs,Ss=new pi,Ro=new U,ws=new U,Ts=new U,Es=new U,Pr=new U,As=new U,Co=new U,Rs=new U;class Qt extends xe{constructor(t=new ze,e=new cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(s&&o){As.set(0,0,0);for(let l=0,h=s.length;l<h;l++){const c=o[l],d=s[l];c!==0&&(Pr.fromBufferAttribute(d,t),r?As.addScaledVector(Pr,c):As.addScaledVector(Pr.sub(e),c))}e.add(As)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ss.copy(i.boundingSphere),Ss.applyMatrix4(s),Qi.copy(t.ray).recast(t.near),!(Ss.containsPoint(Qi.origin)===!1&&(Qi.intersectSphere(Ss,Ro)===null||Qi.origin.distanceToSquared(Ro)>(t.far-t.near)**2))&&(Ao.copy(s).invert(),Qi.copy(t.ray).applyMatrix4(Ao),!(i.boundingBox!==null&&Qi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Qi)))}_computeIntersections(t,e,i){let n;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,h=s.attributes.uv,c=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(r))for(let m=0,x=u.length;m<x;m++){const g=u[m],p=r[g.materialIndex],b=Math.max(g.start,f.start),_=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=b,w=_;v<w;v+=3){const M=o.getX(v),A=o.getX(v+1),R=o.getX(v+2);n=Cs(this,p,t,i,h,c,d,M,A,R),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const b=o.getX(g),_=o.getX(g+1),v=o.getX(g+2);n=Cs(this,r,t,i,h,c,d,b,_,v),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(r))for(let m=0,x=u.length;m<x;m++){const g=u[m],p=r[g.materialIndex],b=Math.max(g.start,f.start),_=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=b,w=_;v<w;v+=3){const M=v,A=v+1,R=v+2;n=Cs(this,p,t,i,h,c,d,M,A,R),n&&(n.faceIndex=Math.floor(v/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){const b=g,_=g+1,v=g+2;n=Cs(this,r,t,i,h,c,d,b,_,v),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}}}function gc(a,t,e,i,n,s,r,o){let l;if(t.side===ke?l=i.intersectTriangle(r,s,n,!0,o):l=i.intersectTriangle(n,s,r,t.side===$i,o),l===null)return null;Rs.copy(o),Rs.applyMatrix4(a.matrixWorld);const h=e.ray.origin.distanceTo(Rs);return h<e.near||h>e.far?null:{distance:h,point:Rs.clone(),object:a}}function Cs(a,t,e,i,n,s,r,o,l,h){a.getVertexPosition(o,ws),a.getVertexPosition(l,Ts),a.getVertexPosition(h,Es);const c=gc(a,t,e,i,ws,Ts,Es,Co);if(c){const d=new U;Qe.getBarycoord(Co,ws,Ts,Es,d),n&&(c.uv=Qe.getInterpolatedAttribute(n,o,l,h,d,new yt)),s&&(c.uv1=Qe.getInterpolatedAttribute(s,o,l,h,d,new yt)),r&&(c.normal=Qe.getInterpolatedAttribute(r,o,l,h,d,new U),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const u={a:o,b:l,c:h,normal:new U,materialIndex:0};Qe.getNormal(ws,Ts,Es,u.normal),c.face=u,c.barycoord=d}return c}class le extends ze{constructor(t=1,e=1,i=1,n=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:r};const o=this;n=Math.floor(n),s=Math.floor(s),r=Math.floor(r);const l=[],h=[],c=[],d=[];let u=0,f=0;m("z","y","x",-1,-1,i,e,t,r,s,0),m("z","y","x",1,-1,i,e,-t,r,s,1),m("x","z","y",1,1,t,i,e,n,r,2),m("x","z","y",1,-1,t,i,-e,n,r,3),m("x","y","z",1,-1,t,e,i,n,s,4),m("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new Ne(h,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(d,2));function m(x,g,p,b,_,v,w,M,A,R,T){const y=v/A,C=w/R,P=v/2,F=w/2,O=M/2,H=A+1,V=R+1;let Q=0,W=0;const tt=new U;for(let it=0;it<V;it++){const bt=it*C-F;for(let Vt=0;Vt<H;Vt++){const Gt=Vt*y-P;tt[x]=Gt*b,tt[g]=bt*_,tt[p]=O,h.push(tt.x,tt.y,tt.z),tt[x]=0,tt[g]=0,tt[p]=M>0?1:-1,c.push(tt.x,tt.y,tt.z),d.push(Vt/A),d.push(1-it/R),Q+=1}}for(let it=0;it<R;it++)for(let bt=0;bt<A;bt++){const Vt=u+bt+H*it,Gt=u+bt+H*(it+1),$t=u+(bt+1)+H*(it+1),Wt=u+(bt+1)+H*it;l.push(Vt,Gt,Wt),l.push(Gt,$t,Wt),W+=6}o.addGroup(f,W,T),f+=W,u+=Q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new le(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Gn(a){const t={};for(const e in a){t[e]={};for(const i in a[e]){const n=a[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(Lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function Le(a){const t={};for(let e=0;e<a.length;e++){const i=Gn(a[e]);for(const n in i)t[n]=i[n]}return t}function xc(a){const t=[];for(let e=0;e<a.length;e++)t.push(a[e].clone());return t}function Bl(a){const t=a.getRenderTarget();return t===null?a.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:jt.workingColorSpace}const _c={clone:Gn,merge:Le};var Mc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bi extends Fi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mc,this.fragmentShader=vc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Gn(t.uniforms),this.uniformsGroups=xc(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const r=this.uniforms[n].value;r&&r.isTexture?e.uniforms[n]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[n]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[n]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[n]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[n]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[n]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[n]={type:"m4",value:r.toArray()}:e.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Ol extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=vi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new U,Do=new yt,Po=new yt;class li extends Ol{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ua*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(qs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ua*2*Math.atan(Math.tan(qs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z)}getViewSize(t,e){return this.getViewBounds(t,Do,Po),e.subVectors(Po,Do)}setViewOffset(t,e,i,n,s,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(qs*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,h=r.fullHeight;s+=r.offsetX*n/l,e-=r.offsetY*i/h,n*=r.width/l,i*=r.height/h}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Tn=-90,En=1;class yc extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new li(Tn,En,t,e);n.layers=this.layers,this.add(n);const s=new li(Tn,En,t,e);s.layers=this.layers,this.add(s);const r=new li(Tn,En,t,e);r.layers=this.layers,this.add(r);const o=new li(Tn,En,t,e);o.layers=this.layers,this.add(o);const l=new li(Tn,En,t,e);l.layers=this.layers,this.add(l);const h=new li(Tn,En,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,r,o,l]=e;for(const h of e)this.remove(h);if(t===vi)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ys)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,h,c]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,r),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,h),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,n),t.render(e,c),t.setRenderTarget(d,u,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class Gl extends De{constructor(t=[],e=zn,i,n,s,r,o,l,h,c){super(t,e,i,n,s,r,o,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class bc extends hn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new Gl(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},n=new le(5,5,5),s=new bi({name:"CubemapFromEquirect",uniforms:Gn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ke,blending:Ii});s.uniforms.tEquirect.value=e;const r=new Qt(n,s),o=e.minFilter;return e.minFilter===Wi&&(e.minFilter=ti),new yc(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,i,n);t.setRenderTarget(s)}}class ei extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Sc={type:"move"};class Ir{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ei,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ei,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ei,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,r=null;const o=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){r=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,i),p=this._getHandJoint(h,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const c=h.joints["index-finger-tip"],d=h.joints["thumb-tip"],u=c.position.distanceTo(d.position),f=.02,m=.005;h.inputState.pinching&&u>f+m?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&u<=f-m&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Sc)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),h!==null&&(h.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new ei;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class wc extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Tc{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=La,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,s=this.stride;n<s;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ie=new U;class Js{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=_i(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=_i(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=_i(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=_i(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=_i(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=s,this}clone(t){if(t===void 0){Ks("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return new He(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Js(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){Ks("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class kl extends Fi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let An;const Yn=new U,Rn=new U,Cn=new U,Dn=new yt,jn=new yt,Hl=new Jt,Ds=new U,Kn=new U,Ps=new U,Io=new yt,Lr=new yt,Lo=new yt;class Ec extends xe{constructor(t=new kl){if(super(),this.isSprite=!0,this.type="Sprite",An===void 0){An=new ze;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Tc(e,5);An.setIndex([0,1,2,0,2,3]),An.setAttribute("position",new Js(i,3,0,!1)),An.setAttribute("uv",new Js(i,2,3,!1))}this.geometry=An,this.material=t,this.center=new yt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Rn.setFromMatrixScale(this.matrixWorld),Hl.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Cn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Rn.multiplyScalar(-Cn.z);const i=this.material.rotation;let n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));const r=this.center;Is(Ds.set(-.5,-.5,0),Cn,r,Rn,n,s),Is(Kn.set(.5,-.5,0),Cn,r,Rn,n,s),Is(Ps.set(.5,.5,0),Cn,r,Rn,n,s),Io.set(0,0),Lr.set(1,0),Lo.set(1,1);let o=t.ray.intersectTriangle(Ds,Kn,Ps,!1,Yn);if(o===null&&(Is(Kn.set(-.5,.5,0),Cn,r,Rn,n,s),Lr.set(0,1),o=t.ray.intersectTriangle(Ds,Ps,Kn,!1,Yn),o===null))return;const l=t.ray.origin.distanceTo(Yn);l<t.near||l>t.far||e.push({distance:l,point:Yn.clone(),uv:Qe.getInterpolation(Yn,Ds,Kn,Ps,Io,Lr,Lo,new yt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Is(a,t,e,i,n,s){Dn.subVectors(a,e).addScalar(.5).multiply(i),n!==void 0?(jn.x=s*Dn.x-n*Dn.y,jn.y=n*Dn.x+s*Dn.y):jn.copy(Dn),a.copy(t),a.x+=jn.x,a.y+=jn.y,a.applyMatrix4(Hl)}class Vl extends De{constructor(t=null,e=1,i=1,n,s,r,o,l,h=Ye,c=Ye,d,u){super(null,r,o,l,h,c,n,s,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Uo extends He{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Pn=new Jt,Fo=new Jt,Ls=[],No=new un,Ac=new Jt,Jn=new Qt,Qn=new pi;class Qa extends Qt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Uo(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,Ac)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new un),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Pn),No.copy(t.boundingBox).applyMatrix4(Pn),this.boundingBox.union(No)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new pi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Pn),Qn.copy(t.boundingSphere).applyMatrix4(Pn),this.boundingSphere.union(Qn)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,r=t*s+1;for(let o=0;o<i.length;o++)i[o]=n[r+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(Jn.geometry=this.geometry,Jn.material=this.material,Jn.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qn.copy(this.boundingSphere),Qn.applyMatrix4(i),t.ray.intersectsSphere(Qn)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,Pn),Fo.multiplyMatrices(i,Pn),Jn.matrixWorld=Fo,Jn.raycast(t,Ls);for(let r=0,o=Ls.length;r<o;r++){const l=Ls[r];l.instanceId=s,l.object=this,e.push(l)}Ls.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Uo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new Vl(new Float32Array(n*this.count),n,this.count,Wa,Mi));const s=this.morphTexture.source.data.data;let r=0;for(let h=0;h<i.length;h++)r+=i[h];const o=this.geometry.morphTargetsRelative?1:1-r,l=n*t;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ur=new U,Rc=new U,Cc=new zt;class Je{constructor(t=new U(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=Ur.subVectors(i,e).cross(Rc.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ur),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Cc.getNormalMatrix(t),n=this.coplanarPoint(Ur).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const tn=new pi,Dc=new yt(.5,.5),Us=new U;class cs{constructor(t=new Je,e=new Je,i=new Je,n=new Je,s=new Je,r=new Je){this.planes=[t,e,i,n,s,r]}set(t,e,i,n,s,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(r),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=vi,i=!1){const n=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],h=s[3],c=s[4],d=s[5],u=s[6],f=s[7],m=s[8],x=s[9],g=s[10],p=s[11],b=s[12],_=s[13],v=s[14],w=s[15];if(n[0].setComponents(h-r,f-c,p-m,w-b).normalize(),n[1].setComponents(h+r,f+c,p+m,w+b).normalize(),n[2].setComponents(h+o,f+d,p+x,w+_).normalize(),n[3].setComponents(h-o,f-d,p-x,w-_).normalize(),i)n[4].setComponents(l,u,g,v).normalize(),n[5].setComponents(h-l,f-u,p-g,w-v).normalize();else if(n[4].setComponents(h-l,f-u,p-g,w-v).normalize(),e===vi)n[5].setComponents(h+l,f+u,p+g,w+v).normalize();else if(e===Ys)n[5].setComponents(l,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),tn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),tn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(tn)}intersectsSprite(t){tn.center.set(0,0,0);const e=Dc.distanceTo(t.center);return tn.radius=.7071067811865476+e,tn.applyMatrix4(t.matrixWorld),this.intersectsSphere(tn)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Us.x=n.normal.x>0?t.max.x:t.min.x,Us.y=n.normal.y>0?t.max.y:t.min.y,Us.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Us)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wl extends Fi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ut(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Qs=new U,tr=new U,zo=new Jt,ts=new hs,Fs=new pi,Fr=new U,Bo=new U;class Pc extends xe{constructor(t=new ze,e=new Wl){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,s=e.count;n<s;n++)Qs.fromBufferAttribute(e,n-1),tr.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=Qs.distanceTo(tr);t.setAttribute("lineDistance",new Ne(i,1))}else Lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fs.copy(i.boundingSphere),Fs.applyMatrix4(n),Fs.radius+=s,t.ray.intersectsSphere(Fs)===!1)return;zo.copy(n).invert(),ts.copy(t.ray).applyMatrix4(zo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=this.isLineSegments?2:1,c=i.index,u=i.attributes.position;if(c!==null){const f=Math.max(0,r.start),m=Math.min(c.count,r.start+r.count);for(let x=f,g=m-1;x<g;x+=h){const p=c.getX(x),b=c.getX(x+1),_=Ns(this,t,ts,l,p,b,x);_&&e.push(_)}if(this.isLineLoop){const x=c.getX(m-1),g=c.getX(f),p=Ns(this,t,ts,l,x,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,r.start),m=Math.min(u.count,r.start+r.count);for(let x=f,g=m-1;x<g;x+=h){const p=Ns(this,t,ts,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){const x=Ns(this,t,ts,l,m-1,f,m-1);x&&e.push(x)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ns(a,t,e,i,n,s,r){const o=a.geometry.attributes.position;if(Qs.fromBufferAttribute(o,n),tr.fromBufferAttribute(o,s),e.distanceSqToSegment(Qs,tr,Fr,Bo)>i)return;Fr.applyMatrix4(a.matrixWorld);const h=t.ray.origin.distanceTo(Fr);if(!(h<t.near||h>t.far))return{distance:h,point:Bo.clone().applyMatrix4(a.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:a}}const Oo=new U,Go=new U;class Ic extends Pc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let n=0,s=e.count;n<s;n+=2)Oo.fromBufferAttribute(e,n),Go.fromBufferAttribute(e,n+1),i[n]=n===0?0:i[n-1],i[n+1]=i[n]+Oo.distanceTo(Go);t.setAttribute("lineDistance",new Ne(i,1))}else Lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Xl extends Fi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ut(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ko=new Jt,Fa=new hs,zs=new pi,Bs=new U;class Lc extends xe{constructor(t=new ze,e=new Xl){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zs.copy(i.boundingSphere),zs.applyMatrix4(n),zs.radius+=s,t.ray.intersectsSphere(zs)===!1)return;ko.copy(n).invert(),Fa.copy(t.ray).applyMatrix4(ko);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,h=i.index,d=i.attributes.position;if(h!==null){const u=Math.max(0,r.start),f=Math.min(h.count,r.start+r.count);for(let m=u,x=f;m<x;m++){const g=h.getX(m);Bs.fromBufferAttribute(d,g),Ho(Bs,g,l,n,t,e,this)}}else{const u=Math.max(0,r.start),f=Math.min(d.count,r.start+r.count);for(let m=u,x=f;m<x;m++)Bs.fromBufferAttribute(d,m),Ho(Bs,m,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=n.length;s<r;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ho(a,t,e,i,n,s,r){const o=Fa.distanceSqToPoint(a);if(o<e){const l=new U;Fa.closestPointToPoint(a,l),l.applyMatrix4(i);const h=n.ray.origin.distanceTo(l);if(h<n.near||h>n.far)return;s.push({distance:h,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class we extends De{constructor(t,e,i,n,s,r,o,l,h){super(t,e,i,n,s,r,o,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ql extends De{constructor(t,e,i=on,n,s,r,o=Ye,l=Ye,h,c=rs,d=1){if(c!==rs&&c!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,n,s,r,o,l,c,i,h),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ka(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Zl extends De{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class ii extends ze{constructor(t=1,e=1,i=1,n=32,s=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:l};const h=this;n=Math.floor(n),s=Math.floor(s);const c=[],d=[],u=[],f=[];let m=0;const x=[],g=i/2;let p=0;b(),r===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(c),this.setAttribute("position",new Ne(d,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(f,2));function b(){const v=new U,w=new U;let M=0;const A=(e-t)/i;for(let R=0;R<=s;R++){const T=[],y=R/s,C=y*(e-t)+t;for(let P=0;P<=n;P++){const F=P/n,O=F*l+o,H=Math.sin(O),V=Math.cos(O);w.x=C*H,w.y=-y*i+g,w.z=C*V,d.push(w.x,w.y,w.z),v.set(H,A,V).normalize(),u.push(v.x,v.y,v.z),f.push(F,1-y),T.push(m++)}x.push(T)}for(let R=0;R<n;R++)for(let T=0;T<s;T++){const y=x[T][R],C=x[T+1][R],P=x[T+1][R+1],F=x[T][R+1];(t>0||T!==0)&&(c.push(y,C,F),M+=3),(e>0||T!==s-1)&&(c.push(C,P,F),M+=3)}h.addGroup(p,M,0),p+=M}function _(v){const w=m,M=new yt,A=new U;let R=0;const T=v===!0?t:e,y=v===!0?1:-1;for(let P=1;P<=n;P++)d.push(0,g*y,0),u.push(0,y,0),f.push(.5,.5),m++;const C=m;for(let P=0;P<=n;P++){const O=P/n*l+o,H=Math.cos(O),V=Math.sin(O);A.x=T*V,A.y=g*y,A.z=T*H,d.push(A.x,A.y,A.z),u.push(0,y,0),M.x=H*.5+.5,M.y=V*.5*y+.5,f.push(M.x,M.y),m++}for(let P=0;P<n;P++){const F=w+P,O=C+P;v===!0?c.push(O,O+1,F):c.push(O+1,O,F),R+=3}h.addGroup(p,R,v===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ii(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ui extends ii{constructor(t=1,e=1,i=32,n=1,s=!1,r=0,o=Math.PI*2){super(0,t,e,i,n,s,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:n,openEnded:s,thetaStart:r,thetaLength:o}}static fromJSON(t){return new ui(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ui extends ze{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,r=e/2,o=Math.floor(i),l=Math.floor(n),h=o+1,c=l+1,d=t/o,u=e/l,f=[],m=[],x=[],g=[];for(let p=0;p<c;p++){const b=p*u-r;for(let _=0;_<h;_++){const v=_*d-s;m.push(v,-b,0),x.push(0,0,1),g.push(_/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const _=b+h*p,v=b+h*(p+1),w=b+1+h*(p+1),M=b+1+h*p;f.push(_,v,M),f.push(v,w,M)}this.setIndex(f),this.setAttribute("position",new Ne(m,3)),this.setAttribute("normal",new Ne(x,3)),this.setAttribute("uv",new Ne(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ui(t.width,t.height,t.widthSegments,t.heightSegments)}}class Hn extends ze{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(r+o,Math.PI);let h=0;const c=[],d=new U,u=new U,f=[],m=[],x=[],g=[];for(let p=0;p<=i;p++){const b=[],_=p/i;let v=0;p===0&&r===0?v=.5/e:p===i&&l===Math.PI&&(v=-.5/e);for(let w=0;w<=e;w++){const M=w/e;d.x=-t*Math.cos(n+M*s)*Math.sin(r+_*o),d.y=t*Math.cos(r+_*o),d.z=t*Math.sin(n+M*s)*Math.sin(r+_*o),m.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(M+v,1-_),b.push(h++)}c.push(b)}for(let p=0;p<i;p++)for(let b=0;b<e;b++){const _=c[p][b+1],v=c[p][b],w=c[p+1][b],M=c[p+1][b+1];(p!==0||r>0)&&f.push(_,v,M),(p!==i-1||l<Math.PI)&&f.push(v,w,M)}this.setIndex(f),this.setAttribute("position",new Ne(m,3)),this.setAttribute("normal",new Ne(x,3)),this.setAttribute("uv",new Ne(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ue extends Fi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ut(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ya,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Kt extends Fi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ut(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ut(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ya,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Uc extends Fi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Fc extends Fi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class $l extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ut(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const Nr=new Jt,Vo=new U,Wo=new U;class Nc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.mapType=yi,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cs,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Vo.setFromMatrixPosition(t.matrixWorld),e.position.copy(Vo),Wo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Wo),e.updateMatrixWorld(),Nr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Nr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class to extends Ol{constructor(t=-1,e=1,i=1,n=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,r=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=h*this.view.offsetX,r=s+h*this.view.width,o-=c*this.view.offsetY,l=o-c*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class zc extends Nc{constructor(){super(new to(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Bc extends $l{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new zc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Oc extends $l{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Gc extends li{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const Xo=new Jt;class kc{constructor(t,e,i=0,n=1/0){this.ray=new hs(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new Ja,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):fe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Xo.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xo),this}intersectObject(t,e=!0,i=[]){return Na(t,this,i,e),i.sort(qo),i}intersectObjects(t,e=!0,i=[]){for(let n=0,s=t.length;n<s;n++)Na(t[n],this,i,e);return i.sort(qo),i}}function qo(a,t){return a.distance-t.distance}function Na(a,t,e,i){let n=!0;if(a.layers.test(t.layers)&&a.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const s=a.children;for(let r=0,o=s.length;r<o;r++)Na(s[r],t,e,!0)}}class Zo{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Ht(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Hc extends dn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){Lt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function $o(a,t,e,i){const n=Vc(i);switch(e){case Dl:return a*t;case Wa:return a*t/n.components*n.byteLength;case Xa:return a*t/n.components*n.byteLength;case qa:return a*t*2/n.components*n.byteLength;case Za:return a*t*2/n.components*n.byteLength;case Pl:return a*t*3/n.components*n.byteLength;case ci:return a*t*4/n.components*n.byteLength;case $a:return a*t*4/n.components*n.byteLength;case Hs:case Vs:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case Ws:case Xs:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case aa:case la:return Math.max(a,16)*Math.max(t,8)/4;case ra:case oa:return Math.max(a,8)*Math.max(t,8)/2;case ha:case ca:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*8;case da:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case ua:return Math.floor((a+3)/4)*Math.floor((t+3)/4)*16;case fa:return Math.floor((a+4)/5)*Math.floor((t+3)/4)*16;case pa:return Math.floor((a+4)/5)*Math.floor((t+4)/5)*16;case ma:return Math.floor((a+5)/6)*Math.floor((t+4)/5)*16;case ga:return Math.floor((a+5)/6)*Math.floor((t+5)/6)*16;case xa:return Math.floor((a+7)/8)*Math.floor((t+4)/5)*16;case _a:return Math.floor((a+7)/8)*Math.floor((t+5)/6)*16;case Ma:return Math.floor((a+7)/8)*Math.floor((t+7)/8)*16;case va:return Math.floor((a+9)/10)*Math.floor((t+4)/5)*16;case ya:return Math.floor((a+9)/10)*Math.floor((t+5)/6)*16;case ba:return Math.floor((a+9)/10)*Math.floor((t+7)/8)*16;case Sa:return Math.floor((a+9)/10)*Math.floor((t+9)/10)*16;case wa:return Math.floor((a+11)/12)*Math.floor((t+9)/10)*16;case Ta:return Math.floor((a+11)/12)*Math.floor((t+11)/12)*16;case Ea:case Aa:case Ra:return Math.ceil(a/4)*Math.ceil(t/4)*16;case Ca:case Da:return Math.ceil(a/4)*Math.ceil(t/4)*8;case Pa:case Ia:return Math.ceil(a/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Vc(a){switch(a){case yi:case El:return{byteLength:1,components:1};case ns:case Al:case kn:return{byteLength:2,components:1};case Ha:case Va:return{byteLength:2,components:4};case on:case ka:case Mi:return{byteLength:4,components:1};case Rl:case Cl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Oa}}));typeof window<"u"&&(window.__THREE__?Lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Oa);function Yl(){let a=null,t=!1,e=null,i=null;function n(s,r){e(s,r),i=a.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=a.requestAnimationFrame(n),t=!0)},stop:function(){a.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){a=s}}}function Wc(a){const t=new WeakMap;function e(o,l){const h=o.array,c=o.usage,d=h.byteLength,u=a.createBuffer();a.bindBuffer(l,u),a.bufferData(l,h,c),o.onUploadCallback();let f;if(h instanceof Float32Array)f=a.FLOAT;else if(typeof Float16Array<"u"&&h instanceof Float16Array)f=a.HALF_FLOAT;else if(h instanceof Uint16Array)o.isFloat16BufferAttribute?f=a.HALF_FLOAT:f=a.UNSIGNED_SHORT;else if(h instanceof Int16Array)f=a.SHORT;else if(h instanceof Uint32Array)f=a.UNSIGNED_INT;else if(h instanceof Int32Array)f=a.INT;else if(h instanceof Int8Array)f=a.BYTE;else if(h instanceof Uint8Array)f=a.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)f=a.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:u,type:f,bytesPerElement:h.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,h){const c=l.array,d=l.updateRanges;if(a.bindBuffer(h,o),d.length===0)a.bufferSubData(h,0,c);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){const m=d[u],x=d[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){const x=d[f];a.bufferSubData(h,x.start*c.BYTES_PER_ELEMENT,c,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(a.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const c=t.get(o);(!c||c.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const h=t.get(o);if(h===void 0)t.set(o,e(o,l));else if(h.version<o.version){if(h.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(h.buffer,o,l),h.version=o.version}}return{get:n,remove:s,update:r}}var Xc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qc=`#ifdef USE_ALPHAHASH
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
#endif`,Zc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$c=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kc=`#ifdef USE_AOMAP
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
#endif`,Jc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qc=`#ifdef USE_BATCHING
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
#endif`,td=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ed=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,id=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,nd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sd=`#ifdef USE_IRIDESCENCE
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
#endif`,rd=`#ifdef USE_BUMPMAP
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
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,pd=`#define PI 3.141592653589793
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
} // validated`,md=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gd=`vec3 transformedNormal = objectNormal;
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
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,_d=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Md=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,vd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yd="gl_FragColor = linearToOutputTexel( gl_FragColor );",bd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sd=`#ifdef USE_ENVMAP
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
#endif`,wd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Td=`#ifdef USE_ENVMAP
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
#endif`,Ed=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ad=`#ifdef USE_ENVMAP
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
#endif`,Rd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Id=`#ifdef USE_GRADIENTMAP
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
}`,Ld=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ud=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nd=`uniform bool receiveShadow;
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
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,Bd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hd=`PhysicalMaterial material;
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
#endif`,Vd=`uniform sampler2D dfgLUT;
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
}`,Wd=`
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
#endif`,Xd=`#if defined( RE_IndirectDiffuse )
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
#endif`,qd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$d=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tu=`#if defined( USE_POINTS_UV )
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
#endif`,eu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,iu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,su=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ru=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,au=`#ifdef USE_MORPHTARGETS
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
#endif`,ou=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,du=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,fu=`#ifdef USE_NORMALMAP
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
#endif`,pu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,mu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,gu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_u=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,yu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Su=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,wu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Tu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Eu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Au=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ru=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cu=`float getShadowMask() {
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
}`,Du=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pu=`#ifdef USE_SKINNING
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
#endif`,Iu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lu=`#ifdef USE_SKINNING
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
#endif`,Uu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nu=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bu=`#ifdef USE_TRANSMISSION
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
#endif`,Ou=`#ifdef USE_TRANSMISSION
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
#endif`,Gu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ku=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vu=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Wu=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xu=`uniform sampler2D t2D;
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
}`,qu=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zu=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$u=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yu=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ju=`#include <common>
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
}`,Ku=`#if DEPTH_PACKING == 3200
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
}`,Ju=`#define DISTANCE
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
}`,Qu=`#define DISTANCE
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
}`,tf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ef=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`uniform float scale;
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
}`,sf=`uniform vec3 diffuse;
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
}`,rf=`#include <common>
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
}`,af=`uniform vec3 diffuse;
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
}`,of=`#define LAMBERT
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
}`,lf=`#define LAMBERT
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
}`,hf=`#define MATCAP
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
}`,cf=`#define MATCAP
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
}`,df=`#define NORMAL
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
}`,uf=`#define NORMAL
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
}`,ff=`#define PHONG
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
}`,pf=`#define PHONG
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
}`,mf=`#define STANDARD
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
}`,gf=`#define STANDARD
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
}`,xf=`#define TOON
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
}`,_f=`#define TOON
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
}`,Mf=`uniform float size;
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
}`,vf=`uniform vec3 diffuse;
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
}`,yf=`#include <common>
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
}`,bf=`uniform vec3 color;
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
}`,Sf=`uniform float rotation;
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
}`,wf=`uniform vec3 diffuse;
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
}`,Ot={alphahash_fragment:Xc,alphahash_pars_fragment:qc,alphamap_fragment:Zc,alphamap_pars_fragment:$c,alphatest_fragment:Yc,alphatest_pars_fragment:jc,aomap_fragment:Kc,aomap_pars_fragment:Jc,batching_pars_vertex:Qc,batching_vertex:td,begin_vertex:ed,beginnormal_vertex:id,bsdfs:nd,iridescence_fragment:sd,bumpmap_pars_fragment:rd,clipping_planes_fragment:ad,clipping_planes_pars_fragment:od,clipping_planes_pars_vertex:ld,clipping_planes_vertex:hd,color_fragment:cd,color_pars_fragment:dd,color_pars_vertex:ud,color_vertex:fd,common:pd,cube_uv_reflection_fragment:md,defaultnormal_vertex:gd,displacementmap_pars_vertex:xd,displacementmap_vertex:_d,emissivemap_fragment:Md,emissivemap_pars_fragment:vd,colorspace_fragment:yd,colorspace_pars_fragment:bd,envmap_fragment:Sd,envmap_common_pars_fragment:wd,envmap_pars_fragment:Td,envmap_pars_vertex:Ed,envmap_physical_pars_fragment:zd,envmap_vertex:Ad,fog_vertex:Rd,fog_pars_vertex:Cd,fog_fragment:Dd,fog_pars_fragment:Pd,gradientmap_pars_fragment:Id,lightmap_pars_fragment:Ld,lights_lambert_fragment:Ud,lights_lambert_pars_fragment:Fd,lights_pars_begin:Nd,lights_toon_fragment:Bd,lights_toon_pars_fragment:Od,lights_phong_fragment:Gd,lights_phong_pars_fragment:kd,lights_physical_fragment:Hd,lights_physical_pars_fragment:Vd,lights_fragment_begin:Wd,lights_fragment_maps:Xd,lights_fragment_end:qd,logdepthbuf_fragment:Zd,logdepthbuf_pars_fragment:$d,logdepthbuf_pars_vertex:Yd,logdepthbuf_vertex:jd,map_fragment:Kd,map_pars_fragment:Jd,map_particle_fragment:Qd,map_particle_pars_fragment:tu,metalnessmap_fragment:eu,metalnessmap_pars_fragment:iu,morphinstance_vertex:nu,morphcolor_vertex:su,morphnormal_vertex:ru,morphtarget_pars_vertex:au,morphtarget_vertex:ou,normal_fragment_begin:lu,normal_fragment_maps:hu,normal_pars_fragment:cu,normal_pars_vertex:du,normal_vertex:uu,normalmap_pars_fragment:fu,clearcoat_normal_fragment_begin:pu,clearcoat_normal_fragment_maps:mu,clearcoat_pars_fragment:gu,iridescence_pars_fragment:xu,opaque_fragment:_u,packing:Mu,premultiplied_alpha_fragment:vu,project_vertex:yu,dithering_fragment:bu,dithering_pars_fragment:Su,roughnessmap_fragment:wu,roughnessmap_pars_fragment:Tu,shadowmap_pars_fragment:Eu,shadowmap_pars_vertex:Au,shadowmap_vertex:Ru,shadowmask_pars_fragment:Cu,skinbase_vertex:Du,skinning_pars_vertex:Pu,skinning_vertex:Iu,skinnormal_vertex:Lu,specularmap_fragment:Uu,specularmap_pars_fragment:Fu,tonemapping_fragment:Nu,tonemapping_pars_fragment:zu,transmission_fragment:Bu,transmission_pars_fragment:Ou,uv_pars_fragment:Gu,uv_pars_vertex:ku,uv_vertex:Hu,worldpos_vertex:Vu,background_vert:Wu,background_frag:Xu,backgroundCube_vert:qu,backgroundCube_frag:Zu,cube_vert:$u,cube_frag:Yu,depth_vert:ju,depth_frag:Ku,distanceRGBA_vert:Ju,distanceRGBA_frag:Qu,equirect_vert:tf,equirect_frag:ef,linedashed_vert:nf,linedashed_frag:sf,meshbasic_vert:rf,meshbasic_frag:af,meshlambert_vert:of,meshlambert_frag:lf,meshmatcap_vert:hf,meshmatcap_frag:cf,meshnormal_vert:df,meshnormal_frag:uf,meshphong_vert:ff,meshphong_frag:pf,meshphysical_vert:mf,meshphysical_frag:gf,meshtoon_vert:xf,meshtoon_frag:_f,points_vert:Mf,points_frag:vf,shadow_vert:yf,shadow_frag:bf,sprite_vert:Sf,sprite_frag:wf},ot={common:{diffuse:{value:new ut(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ut(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ut(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new ut(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},gi={basic:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:Le([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new ut(0)},specular:{value:new ut(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:Le([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new ut(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:Le([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new ut(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:Le([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:Le([ot.points,ot.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:Le([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:Le([ot.common,ot.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:Le([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:Le([ot.sprite,ot.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:Le([ot.common,ot.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:Le([ot.lights,ot.fog,{color:{value:new ut(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};gi.physical={uniforms:Le([gi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new ut(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new ut(0)},specularColor:{value:new ut(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Os={r:0,b:0,g:0},en=new fi,Tf=new Jt;function Ef(a,t,e,i,n,s,r){const o=new ut(0);let l=s===!0?0:1,h,c,d=null,u=0,f=null;function m(_){let v=_.isScene===!0?_.background:null;return v&&v.isTexture&&(v=(_.backgroundBlurriness>0?e:t).get(v)),v}function x(_){let v=!1;const w=m(_);w===null?p(o,l):w&&w.isColor&&(p(w,1),v=!0);const M=a.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(a.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),a.clear(a.autoClearColor,a.autoClearDepth,a.autoClearStencil))}function g(_,v){const w=m(v);w&&(w.isCubeTexture||w.mapping===ir)?(c===void 0&&(c=new Qt(new le(1,1,1),new bi({name:"BackgroundCubeMaterial",uniforms:Gn(gi.backgroundCube.uniforms),vertexShader:gi.backgroundCube.vertexShader,fragmentShader:gi.backgroundCube.fragmentShader,side:ke,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,A,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),en.copy(v.backgroundRotation),en.x*=-1,en.y*=-1,en.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(en.y*=-1,en.z*=-1),c.material.uniforms.envMap.value=w,c.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Tf.makeRotationFromEuler(en)),c.material.toneMapped=jt.getTransfer(w.colorSpace)!==ie,(d!==w||u!==w.version||f!==a.toneMapping)&&(c.material.needsUpdate=!0,d=w,u=w.version,f=a.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new Qt(new Ui(2,2),new bi({name:"BackgroundMaterial",uniforms:Gn(gi.background.uniforms),vertexShader:gi.background.vertexShader,fragmentShader:gi.background.fragmentShader,side:$i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=jt.getTransfer(w.colorSpace)!==ie,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||u!==w.version||f!==a.toneMapping)&&(h.material.needsUpdate=!0,d=w,u=w.version,f=a.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function p(_,v){_.getRGB(Os,Bl(a)),i.buffers.color.setClear(Os.r,Os.g,Os.b,v,r)}function b(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,v=1){o.set(_),l=v,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,p(o,l)},render:x,addToRenderList:g,dispose:b}}function Af(a,t){const e=a.getParameter(a.MAX_VERTEX_ATTRIBS),i={},n=u(null);let s=n,r=!1;function o(y,C,P,F,O){let H=!1;const V=d(F,P,C);s!==V&&(s=V,h(s.object)),H=f(y,F,P,O),H&&m(y,F,P,O),O!==null&&t.update(O,a.ELEMENT_ARRAY_BUFFER),(H||r)&&(r=!1,v(y,C,P,F),O!==null&&a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,t.get(O).buffer))}function l(){return a.createVertexArray()}function h(y){return a.bindVertexArray(y)}function c(y){return a.deleteVertexArray(y)}function d(y,C,P){const F=P.wireframe===!0;let O=i[y.id];O===void 0&&(O={},i[y.id]=O);let H=O[C.id];H===void 0&&(H={},O[C.id]=H);let V=H[F];return V===void 0&&(V=u(l()),H[F]=V),V}function u(y){const C=[],P=[],F=[];for(let O=0;O<e;O++)C[O]=0,P[O]=0,F[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:P,attributeDivisors:F,object:y,attributes:{},index:null}}function f(y,C,P,F){const O=s.attributes,H=C.attributes;let V=0;const Q=P.getAttributes();for(const W in Q)if(Q[W].location>=0){const it=O[W];let bt=H[W];if(bt===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(bt=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(bt=y.instanceColor)),it===void 0||it.attribute!==bt||bt&&it.data!==bt.data)return!0;V++}return s.attributesNum!==V||s.index!==F}function m(y,C,P,F){const O={},H=C.attributes;let V=0;const Q=P.getAttributes();for(const W in Q)if(Q[W].location>=0){let it=H[W];it===void 0&&(W==="instanceMatrix"&&y.instanceMatrix&&(it=y.instanceMatrix),W==="instanceColor"&&y.instanceColor&&(it=y.instanceColor));const bt={};bt.attribute=it,it&&it.data&&(bt.data=it.data),O[W]=bt,V++}s.attributes=O,s.attributesNum=V,s.index=F}function x(){const y=s.newAttributes;for(let C=0,P=y.length;C<P;C++)y[C]=0}function g(y){p(y,0)}function p(y,C){const P=s.newAttributes,F=s.enabledAttributes,O=s.attributeDivisors;P[y]=1,F[y]===0&&(a.enableVertexAttribArray(y),F[y]=1),O[y]!==C&&(a.vertexAttribDivisor(y,C),O[y]=C)}function b(){const y=s.newAttributes,C=s.enabledAttributes;for(let P=0,F=C.length;P<F;P++)C[P]!==y[P]&&(a.disableVertexAttribArray(P),C[P]=0)}function _(y,C,P,F,O,H,V){V===!0?a.vertexAttribIPointer(y,C,P,O,H):a.vertexAttribPointer(y,C,P,F,O,H)}function v(y,C,P,F){x();const O=F.attributes,H=P.getAttributes(),V=C.defaultAttributeValues;for(const Q in H){const W=H[Q];if(W.location>=0){let tt=O[Q];if(tt===void 0&&(Q==="instanceMatrix"&&y.instanceMatrix&&(tt=y.instanceMatrix),Q==="instanceColor"&&y.instanceColor&&(tt=y.instanceColor)),tt!==void 0){const it=tt.normalized,bt=tt.itemSize,Vt=t.get(tt);if(Vt===void 0)continue;const Gt=Vt.buffer,$t=Vt.type,Wt=Vt.bytesPerElement,q=$t===a.INT||$t===a.UNSIGNED_INT||tt.gpuType===ka;if(tt.isInterleavedBufferAttribute){const Y=tt.data,pt=Y.stride,Ut=tt.offset;if(Y.isInstancedInterleavedBuffer){for(let _t=0;_t<W.locationSize;_t++)p(W.location+_t,Y.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let _t=0;_t<W.locationSize;_t++)g(W.location+_t);a.bindBuffer(a.ARRAY_BUFFER,Gt);for(let _t=0;_t<W.locationSize;_t++)_(W.location+_t,bt/W.locationSize,$t,it,pt*Wt,(Ut+bt/W.locationSize*_t)*Wt,q)}else{if(tt.isInstancedBufferAttribute){for(let Y=0;Y<W.locationSize;Y++)p(W.location+Y,tt.meshPerAttribute);y.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Y=0;Y<W.locationSize;Y++)g(W.location+Y);a.bindBuffer(a.ARRAY_BUFFER,Gt);for(let Y=0;Y<W.locationSize;Y++)_(W.location+Y,bt/W.locationSize,$t,it,bt*Wt,bt/W.locationSize*Y*Wt,q)}}else if(V!==void 0){const it=V[Q];if(it!==void 0)switch(it.length){case 2:a.vertexAttrib2fv(W.location,it);break;case 3:a.vertexAttrib3fv(W.location,it);break;case 4:a.vertexAttrib4fv(W.location,it);break;default:a.vertexAttrib1fv(W.location,it)}}}}b()}function w(){R();for(const y in i){const C=i[y];for(const P in C){const F=C[P];for(const O in F)c(F[O].object),delete F[O];delete C[P]}delete i[y]}}function M(y){if(i[y.id]===void 0)return;const C=i[y.id];for(const P in C){const F=C[P];for(const O in F)c(F[O].object),delete F[O];delete C[P]}delete i[y.id]}function A(y){for(const C in i){const P=i[C];if(P[y.id]===void 0)continue;const F=P[y.id];for(const O in F)c(F[O].object),delete F[O];delete P[y.id]}}function R(){T(),r=!0,s!==n&&(s=n,h(s.object))}function T(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:R,resetDefaultState:T,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:g,disableUnusedAttributes:b}}function Rf(a,t,e){let i;function n(h){i=h}function s(h,c){a.drawArrays(i,h,c),e.update(c,i,1)}function r(h,c,d){d!==0&&(a.drawArraysInstanced(i,h,c,d),e.update(c,i,d))}function o(h,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,h,0,c,0,d);let f=0;for(let m=0;m<d;m++)f+=c[m];e.update(f,i,1)}function l(h,c,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<h.length;m++)r(h[m],c[m],u[m]);else{f.multiDrawArraysInstancedWEBGL(i,h,0,c,0,u,0,d);let m=0;for(let x=0;x<d;x++)m+=c[x]*u[x];e.update(m,i,1)}}this.setMode=n,this.render=s,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function Cf(a,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=a.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){return!(A!==ci&&i.convert(A)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const R=A===kn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==yi&&i.convert(A)!==a.getParameter(a.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Mi&&!R)}function l(A){if(A==="highp"){if(a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.HIGH_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&a.getShaderPrecisionFormat(a.VERTEX_SHADER,a.MEDIUM_FLOAT).precision>0&&a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,a.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(Lt("WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),m=a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=a.getParameter(a.MAX_TEXTURE_SIZE),g=a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),p=a.getParameter(a.MAX_VERTEX_ATTRIBS),b=a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),_=a.getParameter(a.MAX_VARYING_VECTORS),v=a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),w=m>0,M=a.getParameter(a.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:h,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:_,maxFragmentUniforms:v,vertexTextures:w,maxSamples:M}}function Df(a){const t=this;let e=null,i=0,n=!1,s=!1;const r=new Je,o=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||n;return n=u,i=d.length,f},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){e=c(d,u,0)},this.setState=function(d,u,f){const m=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,p=a.get(d);if(!n||m===null||m.length===0||s&&!g)s?c(null):h();else{const b=s?0:i,_=b*4;let v=p.clippingState||null;l.value=v,v=c(m,u,_,f);for(let w=0;w!==_;++w)v[w]=e[w];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function c(d,u,f,m){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=f+x*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let _=0,v=f;_!==x;++_,v+=4)r.copy(d[_]).applyMatrix4(b,o),r.normal.toArray(g,v),g[v+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function Pf(a){let t=new WeakMap;function e(r,o){return o===ea?r.mapping=zn:o===ia&&(r.mapping=Bn),r}function i(r){if(r&&r.isTexture){const o=r.mapping;if(o===ea||o===ia)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const h=new bc(l.height);return h.fromEquirectangularTexture(a,r),t.set(r,h),r.addEventListener("dispose",n),e(h.texture,r.mapping)}else return null}}return r}function n(r){const o=r.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const Xi=4,Yo=[.125,.215,.35,.446,.526,.582],rn=20,If=256,es=new to,jo=new ut;let zr=null,Br=0,Or=0,Gr=!1;const Lf=new U;class Ko{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,i=.1,n=100,s={}){const{size:r=256,position:o=Lf}=s;zr=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),Or=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(zr,Br,Or),this._renderer.xr.enabled=Gr,t.scissorTest=!1,In(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===zn||t.mapping===Bn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),zr=this._renderer.getRenderTarget(),Br=this._renderer.getActiveCubeFace(),Or=this._renderer.getActiveMipmapLevel(),Gr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:ti,minFilter:ti,generateMipmaps:!1,type:kn,format:ci,colorSpace:On,depthBuffer:!1},n=Jo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jo(t,e,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Uf(s)),this._blurMaterial=Nf(s,t,e),this._ggxMaterial=Ff(s,t,e)}return n}_compileMaterial(t){const e=new Qt(new ze,t);this._renderer.compile(e,es)}_sceneToCubeUV(t,e,i,n,s){const l=new li(90,1,e,i),h=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(jo),d.toneMapping=qi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(n),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qt(new le,new cn({name:"PMREM.Background",side:ke,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let p=!1;const b=t.background;b?b.isColor&&(g.color.copy(b),t.background=null,p=!0):(g.color.copy(jo),p=!0);for(let _=0;_<6;_++){const v=_%3;v===0?(l.up.set(0,h[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+c[_],s.y,s.z)):v===1?(l.up.set(0,0,h[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+c[_],s.z)):(l.up.set(0,h[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+c[_]));const w=this._cubeSize;In(n,v*w,_>2?w:0,w,w),d.setRenderTarget(n),p&&d.render(x,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=b}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===zn||t.mapping===Bn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qo());const s=n?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;In(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(r,es)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodMeshes.length;for(let s=1;s<n;s++)this._applyGGXFilter(t,s-1,s);e.autoClear=i}_applyGGXFilter(t,e,i){const n=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,h=i/(this._lodMeshes.length-1),c=e/(this._lodMeshes.length-1),d=Math.sqrt(h*h-c*c),u=.05+h*.95,f=d*u,{_lodMax:m}=this,x=this._sizeLods[i],g=3*x*(i>m-Xi?i-m+Xi:0),p=4*(this._cubeSize-x);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=m-e,In(s,g,p,3*x,2*x),n.setRenderTarget(s),n.render(o,es),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=m-i,In(t,g,p,3*x,2*x),n.setRenderTarget(t),n.render(o,es)}_blur(t,e,i,n,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,i,n,"latitudinal",s),this._halfBlur(r,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,r,o){const l=this._renderer,h=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&fe("blur direction must be either latitudinal or longitudinal!");const c=3,d=this._lodMeshes[n];d.material=h;const u=h.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*rn-1),x=s/m,g=isFinite(s)?1+Math.floor(c*x):rn;g>rn&&Lt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${rn}`);const p=[];let b=0;for(let A=0;A<rn;++A){const R=A/x,T=Math.exp(-R*R/2);p.push(T),A===0?b+=T:A<g&&(b+=2*T)}for(let A=0;A<p.length;A++)p[A]=p[A]/b;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=p,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:_}=this;u.dTheta.value=m,u.mipInt.value=_-i;const v=this._sizeLods[n],w=3*v*(n>_-Xi?n-_+Xi:0),M=4*(this._cubeSize-v);In(e,w,M,3*v,2*v),l.setRenderTarget(e),l.render(d,es)}}function Uf(a){const t=[],e=[],i=[];let n=a;const s=a-Xi+1+Yo.length;for(let r=0;r<s;r++){const o=Math.pow(2,n);t.push(o);let l=1/o;r>a-Xi?l=Yo[r-a+Xi-1]:r===0&&(l=0),e.push(l);const h=1/(o-2),c=-h,d=1+h,u=[c,c,d,c,d,d,c,c,d,d,c,d],f=6,m=6,x=3,g=2,p=1,b=new Float32Array(x*m*f),_=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let M=0;M<f;M++){const A=M%3*2/3-1,R=M>2?0:-1,T=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];b.set(T,x*m*M),_.set(u,g*m*M);const y=[M,M,M,M,M,M];v.set(y,p*m*M)}const w=new ze;w.setAttribute("position",new He(b,x)),w.setAttribute("uv",new He(_,g)),w.setAttribute("faceIndex",new He(v,p)),i.push(new Qt(w,null)),n>Xi&&n--}return{lodMeshes:i,sizeLods:t,sigmas:e}}function Jo(a,t,e){const i=new hn(a,t,e);return i.texture.mapping=ir,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function In(a,t,e,i,n){a.viewport.set(t,e,i,n),a.scissor.set(t,e,i,n)}function Ff(a,t,e){return new bi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:If,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:nr(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Nf(a,t,e){const i=new Float32Array(rn),n=new U(0,1,0);return new bi({name:"SphericalGaussianBlur",defines:{n:rn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:nr(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Qo(){return new bi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:nr(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function tl(){return new bi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:nr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function nr(){return`

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
	`}function zf(a){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,h=l===ea||l===ia,c=l===zn||l===Bn;if(h||c){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new Ko(a)),d=h?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return h&&f&&f.height>0||c&&f&&n(f)?(e===null&&(e=new Ko(a)),d=h?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function n(o){let l=0;const h=6;for(let c=0;c<h;c++)o[c]!==void 0&&l++;return l===h}function s(o){const l=o.target;l.removeEventListener("dispose",s);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:r}}function Bf(a){const t={};function e(i){if(t[i]!==void 0)return t[i];const n=a.getExtension(i);return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&os("WebGLRenderer: "+i+" extension not supported."),n}}}function Of(a,t,e,i){const n={},s=new WeakMap;function r(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const m in u.attributes)t.remove(u.attributes[m]);u.removeEventListener("dispose",r),delete n[u.id];const f=s.get(u);f&&(t.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return n[u.id]===!0||(u.addEventListener("dispose",r),n[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const f in u)t.update(u[f],a.ARRAY_BUFFER)}function h(d){const u=[],f=d.index,m=d.attributes.position;let x=0;if(f!==null){const b=f.array;x=f.version;for(let _=0,v=b.length;_<v;_+=3){const w=b[_+0],M=b[_+1],A=b[_+2];u.push(w,M,M,A,A,w)}}else if(m!==void 0){const b=m.array;x=m.version;for(let _=0,v=b.length/3-1;_<v;_+=3){const w=_+0,M=_+1,A=_+2;u.push(w,M,M,A,A,w)}}else return;const g=new(Ll(u)?zl:Nl)(u,1);g.version=x;const p=s.get(d);p&&t.remove(p),s.set(d,g)}function c(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&h(d)}else h(d);return s.get(d)}return{get:o,update:l,getWireframeAttribute:c}}function Gf(a,t,e){let i;function n(u){i=u}let s,r;function o(u){s=u.type,r=u.bytesPerElement}function l(u,f){a.drawElements(i,f,s,u*r),e.update(f,i,1)}function h(u,f,m){m!==0&&(a.drawElementsInstanced(i,f,s,u*r,m),e.update(f,i,m))}function c(u,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,u,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,i,1)}function d(u,f,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<u.length;p++)h(u[p]/r,f[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,s,u,0,x,0,m);let p=0;for(let b=0;b<m;b++)p+=f[b]*x[b];e.update(p,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=d}function kf(a){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(e.calls++,r){case a.TRIANGLES:e.triangles+=o*(s/3);break;case a.LINES:e.lines+=o*(s/2);break;case a.LINE_STRIP:e.lines+=o*(s-1);break;case a.LINE_LOOP:e.lines+=o*s;break;case a.POINTS:e.points+=o*s;break;default:fe("WebGLInfo: Unknown draw mode:",r);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Hf(a,t,e){const i=new WeakMap,n=new ge;function s(r,o,l){const h=r.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=c!==void 0?c.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let T=function(){A.dispose(),i.delete(o),o.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();const f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let _=0;f===!0&&(_=1),m===!0&&(_=2),x===!0&&(_=3);let v=o.attributes.position.count*_,w=1;v>t.maxTextureSize&&(w=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const M=new Float32Array(v*w*4*d),A=new Ul(M,v,w,d);A.type=Mi,A.needsUpdate=!0;const R=_*4;for(let y=0;y<d;y++){const C=g[y],P=p[y],F=b[y],O=v*w*4*y;for(let H=0;H<C.count;H++){const V=H*R;f===!0&&(n.fromBufferAttribute(C,H),M[O+V+0]=n.x,M[O+V+1]=n.y,M[O+V+2]=n.z,M[O+V+3]=0),m===!0&&(n.fromBufferAttribute(P,H),M[O+V+4]=n.x,M[O+V+5]=n.y,M[O+V+6]=n.z,M[O+V+7]=0),x===!0&&(n.fromBufferAttribute(F,H),M[O+V+8]=n.x,M[O+V+9]=n.y,M[O+V+10]=n.z,M[O+V+11]=F.itemSize===4?n.w:1)}}u={count:d,texture:A,size:new yt(v,w)},i.set(o,u),o.addEventListener("dispose",T)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(a,"morphTexture",r.morphTexture,e);else{let f=0;for(let x=0;x<h.length;x++)f+=h[x];const m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(a,"morphTargetBaseInfluence",m),l.getUniforms().setValue(a,"morphTargetInfluences",h)}l.getUniforms().setValue(a,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(a,"morphTargetsTextureSize",u.size)}return{update:s}}function Vf(a,t,e,i){let n=new WeakMap;function s(l){const h=i.render.frame,c=l.geometry,d=t.get(l,c);if(n.get(d)!==h&&(t.update(d),n.set(d,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==h&&(e.update(l.instanceMatrix,a.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,a.ARRAY_BUFFER),n.set(l,h))),l.isSkinnedMesh){const u=l.skeleton;n.get(u)!==h&&(u.update(),n.set(u,h))}return d}function r(){n=new WeakMap}function o(l){const h=l.target;h.removeEventListener("dispose",o),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:s,dispose:r}}const jl=new De,el=new ql(1,1),Kl=new Ul,Jl=new rc,Ql=new Gl,il=[],nl=[],sl=new Float32Array(16),rl=new Float32Array(9),al=new Float32Array(4);function Vn(a,t,e){const i=a[0];if(i<=0||i>0)return a;const n=t*e;let s=il[n];if(s===void 0&&(s=new Float32Array(n),il[n]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=e,a[r].toArray(s,o)}return s}function ye(a,t){if(a.length!==t.length)return!1;for(let e=0,i=a.length;e<i;e++)if(a[e]!==t[e])return!1;return!0}function be(a,t){for(let e=0,i=t.length;e<i;e++)a[e]=t[e]}function sr(a,t){let e=nl[t];e===void 0&&(e=new Int32Array(t),nl[t]=e);for(let i=0;i!==t;++i)e[i]=a.allocateTextureUnit();return e}function Wf(a,t){const e=this.cache;e[0]!==t&&(a.uniform1f(this.addr,t),e[0]=t)}function Xf(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;a.uniform2fv(this.addr,t),be(e,t)}}function qf(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(a.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;a.uniform3fv(this.addr,t),be(e,t)}}function Zf(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;a.uniform4fv(this.addr,t),be(e,t)}}function $f(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;a.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(ye(e,i))return;al.set(i),a.uniformMatrix2fv(this.addr,!1,al),be(e,i)}}function Yf(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;a.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(ye(e,i))return;rl.set(i),a.uniformMatrix3fv(this.addr,!1,rl),be(e,i)}}function jf(a,t){const e=this.cache,i=t.elements;if(i===void 0){if(ye(e,t))return;a.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(ye(e,i))return;sl.set(i),a.uniformMatrix4fv(this.addr,!1,sl),be(e,i)}}function Kf(a,t){const e=this.cache;e[0]!==t&&(a.uniform1i(this.addr,t),e[0]=t)}function Jf(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;a.uniform2iv(this.addr,t),be(e,t)}}function Qf(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;a.uniform3iv(this.addr,t),be(e,t)}}function tp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;a.uniform4iv(this.addr,t),be(e,t)}}function ep(a,t){const e=this.cache;e[0]!==t&&(a.uniform1ui(this.addr,t),e[0]=t)}function ip(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(a.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;a.uniform2uiv(this.addr,t),be(e,t)}}function np(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(a.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;a.uniform3uiv(this.addr,t),be(e,t)}}function sp(a,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(a.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;a.uniform4uiv(this.addr,t),be(e,t)}}function rp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n);let s;this.type===a.SAMPLER_2D_SHADOW?(el.compareFunction=Il,s=el):s=jl,e.setTexture2D(t||s,n)}function ap(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Jl,n)}function op(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Ql,n)}function lp(a,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(a.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Kl,n)}function hp(a){switch(a){case 5126:return Wf;case 35664:return Xf;case 35665:return qf;case 35666:return Zf;case 35674:return $f;case 35675:return Yf;case 35676:return jf;case 5124:case 35670:return Kf;case 35667:case 35671:return Jf;case 35668:case 35672:return Qf;case 35669:case 35673:return tp;case 5125:return ep;case 36294:return ip;case 36295:return np;case 36296:return sp;case 35678:case 36198:case 36298:case 36306:case 35682:return rp;case 35679:case 36299:case 36307:return ap;case 35680:case 36300:case 36308:case 36293:return op;case 36289:case 36303:case 36311:case 36292:return lp}}function cp(a,t){a.uniform1fv(this.addr,t)}function dp(a,t){const e=Vn(t,this.size,2);a.uniform2fv(this.addr,e)}function up(a,t){const e=Vn(t,this.size,3);a.uniform3fv(this.addr,e)}function fp(a,t){const e=Vn(t,this.size,4);a.uniform4fv(this.addr,e)}function pp(a,t){const e=Vn(t,this.size,4);a.uniformMatrix2fv(this.addr,!1,e)}function mp(a,t){const e=Vn(t,this.size,9);a.uniformMatrix3fv(this.addr,!1,e)}function gp(a,t){const e=Vn(t,this.size,16);a.uniformMatrix4fv(this.addr,!1,e)}function xp(a,t){a.uniform1iv(this.addr,t)}function _p(a,t){a.uniform2iv(this.addr,t)}function Mp(a,t){a.uniform3iv(this.addr,t)}function vp(a,t){a.uniform4iv(this.addr,t)}function yp(a,t){a.uniform1uiv(this.addr,t)}function bp(a,t){a.uniform2uiv(this.addr,t)}function Sp(a,t){a.uniform3uiv(this.addr,t)}function wp(a,t){a.uniform4uiv(this.addr,t)}function Tp(a,t,e){const i=this.cache,n=t.length,s=sr(e,n);ye(i,s)||(a.uniform1iv(this.addr,s),be(i,s));for(let r=0;r!==n;++r)e.setTexture2D(t[r]||jl,s[r])}function Ep(a,t,e){const i=this.cache,n=t.length,s=sr(e,n);ye(i,s)||(a.uniform1iv(this.addr,s),be(i,s));for(let r=0;r!==n;++r)e.setTexture3D(t[r]||Jl,s[r])}function Ap(a,t,e){const i=this.cache,n=t.length,s=sr(e,n);ye(i,s)||(a.uniform1iv(this.addr,s),be(i,s));for(let r=0;r!==n;++r)e.setTextureCube(t[r]||Ql,s[r])}function Rp(a,t,e){const i=this.cache,n=t.length,s=sr(e,n);ye(i,s)||(a.uniform1iv(this.addr,s),be(i,s));for(let r=0;r!==n;++r)e.setTexture2DArray(t[r]||Kl,s[r])}function Cp(a){switch(a){case 5126:return cp;case 35664:return dp;case 35665:return up;case 35666:return fp;case 35674:return pp;case 35675:return mp;case 35676:return gp;case 5124:case 35670:return xp;case 35667:case 35671:return _p;case 35668:case 35672:return Mp;case 35669:case 35673:return vp;case 5125:return yp;case 36294:return bp;case 36295:return Sp;case 36296:return wp;case 35678:case 36198:case 36298:case 36306:case 35682:return Tp;case 35679:case 36299:case 36307:return Ep;case 35680:case 36300:case 36308:case 36293:return Ap;case 36289:case 36303:case 36311:case 36292:return Rp}}class Dp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=hp(e.type)}}class Pp{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Cp(e.type)}}class Ip{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,r=n.length;s!==r;++s){const o=n[s];o.setValue(t,e[o.id],i)}}}const kr=/(\w+)(\])?(\[|\.)?/g;function ol(a,t){a.seq.push(t),a.map[t.id]=t}function Lp(a,t,e){const i=a.name,n=i.length;for(kr.lastIndex=0;;){const s=kr.exec(i),r=kr.lastIndex;let o=s[1];const l=s[2]==="]",h=s[3];if(l&&(o=o|0),h===void 0||h==="["&&r+2===n){ol(e,h===void 0?new Dp(o,a,t):new Pp(o,a,t));break}else{let d=e.map[o];d===void 0&&(d=new Ip(o),ol(e,d)),e=d}}}class Zs{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),r=t.getUniformLocation(e,s.name);Lp(s,r,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,r=e.length;s!==r;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.id in e&&i.push(r)}return i}}function ll(a,t,e){const i=a.createShader(t);return a.shaderSource(i,e),a.compileShader(i),i}const Up=37297;let Fp=0;function Np(a,t){const e=a.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let r=n;r<s;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return i.join(`
`)}const hl=new zt;function zp(a){jt._getMatrix(hl,jt.workingColorSpace,a);const t=`mat3( ${hl.elements.map(e=>e.toFixed(4))} )`;switch(jt.getTransfer(a)){case $s:return[t,"LinearTransferOETF"];case ie:return[t,"sRGBTransferOETF"];default:return Lt("WebGLProgram: Unsupported color space: ",a),[t,"LinearTransferOETF"]}}function cl(a,t,e){const i=a.getShaderParameter(t,a.COMPILE_STATUS),s=(a.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Np(a.getShaderSource(t),o)}else return s}function Bp(a,t){const e=zp(t);return[`vec4 ${a}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Op(a,t){let e;switch(t){case Ih:e="Linear";break;case Lh:e="Reinhard";break;case Uh:e="Cineon";break;case Fh:e="ACESFilmic";break;case zh:e="AgX";break;case Bh:e="Neutral";break;case Nh:e="Custom";break;default:Lt("WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+a+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gs=new U;function Gp(){jt.getLuminanceCoefficients(Gs);const a=Gs.x.toFixed(4),t=Gs.y.toFixed(4),e=Gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${a}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kp(a){return[a.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",a.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(is).join(`
`)}function Hp(a){const t=[];for(const e in a){const i=a[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Vp(a,t){const e={},i=a.getProgramParameter(t,a.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=a.getActiveAttrib(t,n),r=s.name;let o=1;s.type===a.FLOAT_MAT2&&(o=2),s.type===a.FLOAT_MAT3&&(o=3),s.type===a.FLOAT_MAT4&&(o=4),e[r]={type:s.type,location:a.getAttribLocation(t,r),locationSize:o}}return e}function is(a){return a!==""}function dl(a,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return a.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ul(a,t){return a.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Wp=/^[ \t]*#include +<([\w\d./]+)>/gm;function za(a){return a.replace(Wp,qp)}const Xp=new Map;function qp(a,t){let e=Ot[t];if(e===void 0){const i=Xp.get(t);if(i!==void 0)e=Ot[i],Lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return za(e)}const Zp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fl(a){return a.replace(Zp,$p)}function $p(a,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function pl(a){let t=`precision ${a.precision} float;
	precision ${a.precision} int;
	precision ${a.precision} sampler2D;
	precision ${a.precision} samplerCube;
	precision ${a.precision} sampler3D;
	precision ${a.precision} sampler2DArray;
	precision ${a.precision} sampler2DShadow;
	precision ${a.precision} samplerCubeShadow;
	precision ${a.precision} sampler2DArrayShadow;
	precision ${a.precision} isampler2D;
	precision ${a.precision} isampler3D;
	precision ${a.precision} isamplerCube;
	precision ${a.precision} isampler2DArray;
	precision ${a.precision} usampler2D;
	precision ${a.precision} usampler3D;
	precision ${a.precision} usamplerCube;
	precision ${a.precision} usampler2DArray;
	`;return a.precision==="highp"?t+=`
#define HIGH_PRECISION`:a.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:a.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Yp(a){let t="SHADOWMAP_TYPE_BASIC";return a.shadowMapType===wl?t="SHADOWMAP_TYPE_PCF":a.shadowMapType===dh?t="SHADOWMAP_TYPE_PCF_SOFT":a.shadowMapType===Ci&&(t="SHADOWMAP_TYPE_VSM"),t}function jp(a){let t="ENVMAP_TYPE_CUBE";if(a.envMap)switch(a.envMapMode){case zn:case Bn:t="ENVMAP_TYPE_CUBE";break;case ir:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Kp(a){let t="ENVMAP_MODE_REFLECTION";if(a.envMap)switch(a.envMapMode){case Bn:t="ENVMAP_MODE_REFRACTION";break}return t}function Jp(a){let t="ENVMAP_BLENDING_NONE";if(a.envMap)switch(a.combine){case Ga:t="ENVMAP_BLENDING_MULTIPLY";break;case Dh:t="ENVMAP_BLENDING_MIX";break;case Ph:t="ENVMAP_BLENDING_ADD";break}return t}function Qp(a){const t=a.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function tm(a,t,e,i){const n=a.getContext(),s=e.defines;let r=e.vertexShader,o=e.fragmentShader;const l=Yp(e),h=jp(e),c=Kp(e),d=Jp(e),u=Qp(e),f=kp(e),m=Hp(s),x=n.createProgram();let g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(is).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(is).join(`
`),p.length>0&&(p+=`
`)):(g=[pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(is).join(`
`),p=[pl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qi?"#define TONE_MAPPING":"",e.toneMapping!==qi?Ot.tonemapping_pars_fragment:"",e.toneMapping!==qi?Op("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,Bp("linearToOutputTexel",e.outputColorSpace),Gp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(is).join(`
`)),r=za(r),r=dl(r,e),r=ul(r,e),o=za(o),o=dl(o,e),o=ul(o,e),r=fl(r),o=fl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===po?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===po?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const _=b+g+r,v=b+p+o,w=ll(n,n.VERTEX_SHADER,_),M=ll(n,n.FRAGMENT_SHADER,v);n.attachShader(x,w),n.attachShader(x,M),e.index0AttributeName!==void 0?n.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(x,0,"position"),n.linkProgram(x);function A(C){if(a.debug.checkShaderErrors){const P=n.getProgramInfoLog(x)||"",F=n.getShaderInfoLog(w)||"",O=n.getShaderInfoLog(M)||"",H=P.trim(),V=F.trim(),Q=O.trim();let W=!0,tt=!0;if(n.getProgramParameter(x,n.LINK_STATUS)===!1)if(W=!1,typeof a.debug.onShaderError=="function")a.debug.onShaderError(n,x,w,M);else{const it=cl(n,w,"vertex"),bt=cl(n,M,"fragment");fe("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(x,n.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+H+`
`+it+`
`+bt)}else H!==""?Lt("WebGLProgram: Program Info Log:",H):(V===""||Q==="")&&(tt=!1);tt&&(C.diagnostics={runnable:W,programLog:H,vertexShader:{log:V,prefix:g},fragmentShader:{log:Q,prefix:p}})}n.deleteShader(w),n.deleteShader(M),R=new Zs(n,x),T=Vp(n,x)}let R;this.getUniforms=function(){return R===void 0&&A(this),R};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=n.getProgramParameter(x,Up)),y},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Fp++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=M,this}let em=0;class im{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(s)===!1&&(r.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new nm(t),e.set(t,i)),i}}class nm{constructor(t){this.id=em++,this.code=t,this.usedTimes=0}}function sm(a,t,e,i,n,s,r){const o=new Ja,l=new im,h=new Set,c=[],d=n.logarithmicDepthBuffer,u=n.vertexTextures;let f=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return h.add(T),T===0?"uv":`uv${T}`}function g(T,y,C,P,F){const O=P.fog,H=F.geometry,V=T.isMeshStandardMaterial?P.environment:null,Q=(T.isMeshStandardMaterial?e:t).get(T.envMap||V),W=Q&&Q.mapping===ir?Q.image.height:null,tt=m[T.type];T.precision!==null&&(f=n.getMaxPrecision(T.precision),f!==T.precision&&Lt("WebGLProgram.getParameters:",T.precision,"not supported, using",f,"instead."));const it=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,bt=it!==void 0?it.length:0;let Vt=0;H.morphAttributes.position!==void 0&&(Vt=1),H.morphAttributes.normal!==void 0&&(Vt=2),H.morphAttributes.color!==void 0&&(Vt=3);let Gt,$t,Wt,q;if(tt){const te=gi[tt];Gt=te.vertexShader,$t=te.fragmentShader}else Gt=T.vertexShader,$t=T.fragmentShader,l.update(T),Wt=l.getVertexShaderID(T),q=l.getFragmentShaderID(T);const Y=a.getRenderTarget(),pt=a.state.buffers.depth.getReversed(),Ut=F.isInstancedMesh===!0,_t=F.isBatchedMesh===!0,Bt=!!T.map,Te=!!T.matcap,kt=!!Q,he=!!T.aoMap,I=!!T.lightMap,Xt=!!T.bumpMap,qt=!!T.normalMap,ae=!!T.displacementMap,xt=!!T.emissiveMap,ce=!!T.metalnessMap,wt=!!T.roughnessMap,Nt=T.anisotropy>0,D=T.clearcoat>0,S=T.dispersion>0,B=T.iridescence>0,Z=T.sheen>0,j=T.transmission>0,X=Nt&&!!T.anisotropyMap,vt=D&&!!T.clearcoatMap,lt=D&&!!T.clearcoatNormalMap,Tt=D&&!!T.clearcoatRoughnessMap,Mt=B&&!!T.iridescenceMap,K=B&&!!T.iridescenceThicknessMap,nt=Z&&!!T.sheenColorMap,Dt=Z&&!!T.sheenRoughnessMap,Rt=!!T.specularMap,dt=!!T.specularColorMap,It=!!T.specularIntensityMap,L=j&&!!T.transmissionMap,ht=j&&!!T.thicknessMap,st=!!T.gradientMap,rt=!!T.alphaMap,J=T.alphaTest>0,$=!!T.alphaHash,mt=!!T.extensions;let Ft=qi;T.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Ft=a.toneMapping);const oe={shaderID:tt,shaderType:T.type,shaderName:T.name,vertexShader:Gt,fragmentShader:$t,defines:T.defines,customVertexShaderID:Wt,customFragmentShaderID:q,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:f,batching:_t,batchingColor:_t&&F._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&F.instanceColor!==null,instancingMorph:Ut&&F.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:Y===null?a.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:On,alphaToCoverage:!!T.alphaToCoverage,map:Bt,matcap:Te,envMap:kt,envMapMode:kt&&Q.mapping,envMapCubeUVHeight:W,aoMap:he,lightMap:I,bumpMap:Xt,normalMap:qt,displacementMap:u&&ae,emissiveMap:xt,normalMapObjectSpace:qt&&T.normalMapType===Hh,normalMapTangentSpace:qt&&T.normalMapType===Ya,metalnessMap:ce,roughnessMap:wt,anisotropy:Nt,anisotropyMap:X,clearcoat:D,clearcoatMap:vt,clearcoatNormalMap:lt,clearcoatRoughnessMap:Tt,dispersion:S,iridescence:B,iridescenceMap:Mt,iridescenceThicknessMap:K,sheen:Z,sheenColorMap:nt,sheenRoughnessMap:Dt,specularMap:Rt,specularColorMap:dt,specularIntensityMap:It,transmission:j,transmissionMap:L,thicknessMap:ht,gradientMap:st,opaque:T.transparent===!1&&T.blending===an&&T.alphaToCoverage===!1,alphaMap:rt,alphaTest:J,alphaHash:$,combine:T.combine,mapUv:Bt&&x(T.map.channel),aoMapUv:he&&x(T.aoMap.channel),lightMapUv:I&&x(T.lightMap.channel),bumpMapUv:Xt&&x(T.bumpMap.channel),normalMapUv:qt&&x(T.normalMap.channel),displacementMapUv:ae&&x(T.displacementMap.channel),emissiveMapUv:xt&&x(T.emissiveMap.channel),metalnessMapUv:ce&&x(T.metalnessMap.channel),roughnessMapUv:wt&&x(T.roughnessMap.channel),anisotropyMapUv:X&&x(T.anisotropyMap.channel),clearcoatMapUv:vt&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:lt&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:nt&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&x(T.sheenRoughnessMap.channel),specularMapUv:Rt&&x(T.specularMap.channel),specularColorMapUv:dt&&x(T.specularColorMap.channel),specularIntensityMapUv:It&&x(T.specularIntensityMap.channel),transmissionMapUv:L&&x(T.transmissionMap.channel),thicknessMapUv:ht&&x(T.thicknessMap.channel),alphaMapUv:rt&&x(T.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(qt||Nt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!H.attributes.uv&&(Bt||rt),fog:!!O,useFog:T.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pt,skinning:F.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Vt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:T.dithering,shadowMapEnabled:a.shadowMap.enabled&&C.length>0,shadowMapType:a.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Bt&&T.map.isVideoTexture===!0&&jt.getTransfer(T.map.colorSpace)===ie,decodeVideoTextureEmissive:xt&&T.emissiveMap.isVideoTexture===!0&&jt.getTransfer(T.emissiveMap.colorSpace)===ie,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===$e,flipSided:T.side===ke,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:mt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(mt&&T.extensions.multiDraw===!0||_t)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return oe.vertexUv1s=h.has(1),oe.vertexUv2s=h.has(2),oe.vertexUv3s=h.has(3),h.clear(),oe}function p(T){const y=[];if(T.shaderID?y.push(T.shaderID):(y.push(T.customVertexShaderID),y.push(T.customFragmentShaderID)),T.defines!==void 0)for(const C in T.defines)y.push(C),y.push(T.defines[C]);return T.isRawShaderMaterial===!1&&(b(y,T),_(y,T),y.push(a.outputColorSpace)),y.push(T.customProgramCacheKey),y.join()}function b(T,y){T.push(y.precision),T.push(y.outputColorSpace),T.push(y.envMapMode),T.push(y.envMapCubeUVHeight),T.push(y.mapUv),T.push(y.alphaMapUv),T.push(y.lightMapUv),T.push(y.aoMapUv),T.push(y.bumpMapUv),T.push(y.normalMapUv),T.push(y.displacementMapUv),T.push(y.emissiveMapUv),T.push(y.metalnessMapUv),T.push(y.roughnessMapUv),T.push(y.anisotropyMapUv),T.push(y.clearcoatMapUv),T.push(y.clearcoatNormalMapUv),T.push(y.clearcoatRoughnessMapUv),T.push(y.iridescenceMapUv),T.push(y.iridescenceThicknessMapUv),T.push(y.sheenColorMapUv),T.push(y.sheenRoughnessMapUv),T.push(y.specularMapUv),T.push(y.specularColorMapUv),T.push(y.specularIntensityMapUv),T.push(y.transmissionMapUv),T.push(y.thicknessMapUv),T.push(y.combine),T.push(y.fogExp2),T.push(y.sizeAttenuation),T.push(y.morphTargetsCount),T.push(y.morphAttributeCount),T.push(y.numDirLights),T.push(y.numPointLights),T.push(y.numSpotLights),T.push(y.numSpotLightMaps),T.push(y.numHemiLights),T.push(y.numRectAreaLights),T.push(y.numDirLightShadows),T.push(y.numPointLightShadows),T.push(y.numSpotLightShadows),T.push(y.numSpotLightShadowsWithMaps),T.push(y.numLightProbes),T.push(y.shadowMapType),T.push(y.toneMapping),T.push(y.numClippingPlanes),T.push(y.numClipIntersection),T.push(y.depthPacking)}function _(T,y){o.disableAll(),y.supportsVertexTextures&&o.enable(0),y.instancing&&o.enable(1),y.instancingColor&&o.enable(2),y.instancingMorph&&o.enable(3),y.matcap&&o.enable(4),y.envMap&&o.enable(5),y.normalMapObjectSpace&&o.enable(6),y.normalMapTangentSpace&&o.enable(7),y.clearcoat&&o.enable(8),y.iridescence&&o.enable(9),y.alphaTest&&o.enable(10),y.vertexColors&&o.enable(11),y.vertexAlphas&&o.enable(12),y.vertexUv1s&&o.enable(13),y.vertexUv2s&&o.enable(14),y.vertexUv3s&&o.enable(15),y.vertexTangents&&o.enable(16),y.anisotropy&&o.enable(17),y.alphaHash&&o.enable(18),y.batching&&o.enable(19),y.dispersion&&o.enable(20),y.batchingColor&&o.enable(21),y.gradientMap&&o.enable(22),T.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),T.push(o.mask)}function v(T){const y=m[T.type];let C;if(y){const P=gi[y];C=_c.clone(P.uniforms)}else C=T.uniforms;return C}function w(T,y){let C;for(let P=0,F=c.length;P<F;P++){const O=c[P];if(O.cacheKey===y){C=O,++C.usedTimes;break}}return C===void 0&&(C=new tm(a,y,T,s),c.push(C)),C}function M(T){if(--T.usedTimes===0){const y=c.indexOf(T);c[y]=c[c.length-1],c.pop(),T.destroy()}}function A(T){l.remove(T)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:w,releaseProgram:M,releaseShaderCache:A,programs:c,dispose:R}}function rm(){let a=new WeakMap;function t(r){return a.has(r)}function e(r){let o=a.get(r);return o===void 0&&(o={},a.set(r,o)),o}function i(r){a.delete(r)}function n(r,o,l){a.get(r)[o]=l}function s(){a=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function am(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.material.id!==t.material.id?a.material.id-t.material.id:a.z!==t.z?a.z-t.z:a.id-t.id}function ml(a,t){return a.groupOrder!==t.groupOrder?a.groupOrder-t.groupOrder:a.renderOrder!==t.renderOrder?a.renderOrder-t.renderOrder:a.z!==t.z?t.z-a.z:a.id-t.id}function gl(){const a=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function r(d,u,f,m,x,g){let p=a[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:m,renderOrder:d.renderOrder,z:x,group:g},a[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=x,p.group=g),t++,p}function o(d,u,f,m,x,g){const p=r(d,u,f,m,x,g);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):e.push(p)}function l(d,u,f,m,x,g){const p=r(d,u,f,m,x,g);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):e.unshift(p)}function h(d,u){e.length>1&&e.sort(d||am),i.length>1&&i.sort(u||ml),n.length>1&&n.sort(u||ml)}function c(){for(let d=t,u=a.length;d<u;d++){const f=a[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:c,sort:h}}function om(){let a=new WeakMap;function t(i,n){const s=a.get(i);let r;return s===void 0?(r=new gl,a.set(i,[r])):n>=s.length?(r=new gl,s.push(r)):r=s[n],r}function e(){a=new WeakMap}return{get:t,dispose:e}}function lm(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new U,color:new ut};break;case"SpotLight":e={position:new U,direction:new U,color:new ut,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new U,color:new ut,distance:0,decay:0};break;case"HemisphereLight":e={direction:new U,skyColor:new ut,groundColor:new ut};break;case"RectAreaLight":e={color:new ut,position:new U,halfWidth:new U,halfHeight:new U};break}return a[t.id]=e,e}}}function hm(){const a={};return{get:function(t){if(a[t.id]!==void 0)return a[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return a[t.id]=e,e}}}let cm=0;function dm(a,t){return(t.castShadow?2:0)-(a.castShadow?2:0)+(t.map?1:0)-(a.map?1:0)}function um(a){const t=new lm,e=hm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new U);const n=new U,s=new Jt,r=new Jt;function o(h){let c=0,d=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,b=0,_=0,v=0,w=0,M=0,A=0;h.sort(dm);for(let T=0,y=h.length;T<y;T++){const C=h[T],P=C.color,F=C.intensity,O=C.distance,H=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)c+=P.r*F,d+=P.g*F,u+=P.b*F;else if(C.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(C.sh.coefficients[V],F);A++}else if(C.isDirectionalLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,W=e.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,i.directionalShadow[f]=W,i.directionalShadowMap[f]=H,i.directionalShadowMatrix[f]=C.shadow.matrix,b++}i.directional[f]=V,f++}else if(C.isSpotLight){const V=t.get(C);V.position.setFromMatrixPosition(C.matrixWorld),V.color.copy(P).multiplyScalar(F),V.distance=O,V.coneCos=Math.cos(C.angle),V.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),V.decay=C.decay,i.spot[x]=V;const Q=C.shadow;if(C.map&&(i.spotLightMap[w]=C.map,w++,Q.updateMatrices(C),C.castShadow&&M++),i.spotLightMatrix[x]=Q.matrix,C.castShadow){const W=e.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,i.spotShadow[x]=W,i.spotShadowMap[x]=H,v++}x++}else if(C.isRectAreaLight){const V=t.get(C);V.color.copy(P).multiplyScalar(F),V.halfWidth.set(C.width*.5,0,0),V.halfHeight.set(0,C.height*.5,0),i.rectArea[g]=V,g++}else if(C.isPointLight){const V=t.get(C);if(V.color.copy(C.color).multiplyScalar(C.intensity),V.distance=C.distance,V.decay=C.decay,C.castShadow){const Q=C.shadow,W=e.get(C);W.shadowIntensity=Q.intensity,W.shadowBias=Q.bias,W.shadowNormalBias=Q.normalBias,W.shadowRadius=Q.radius,W.shadowMapSize=Q.mapSize,W.shadowCameraNear=Q.camera.near,W.shadowCameraFar=Q.camera.far,i.pointShadow[m]=W,i.pointShadowMap[m]=H,i.pointShadowMatrix[m]=C.shadow.matrix,_++}i.point[m]=V,m++}else if(C.isHemisphereLight){const V=t.get(C);V.skyColor.copy(C.color).multiplyScalar(F),V.groundColor.copy(C.groundColor).multiplyScalar(F),i.hemi[p]=V,p++}}g>0&&(a.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ot.LTC_FLOAT_1,i.rectAreaLTC2=ot.LTC_FLOAT_2):(i.rectAreaLTC1=ot.LTC_HALF_1,i.rectAreaLTC2=ot.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=d,i.ambient[2]=u;const R=i.hash;(R.directionalLength!==f||R.pointLength!==m||R.spotLength!==x||R.rectAreaLength!==g||R.hemiLength!==p||R.numDirectionalShadows!==b||R.numPointShadows!==_||R.numSpotShadows!==v||R.numSpotMaps!==w||R.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=v,i.spotShadowMap.length=v,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=v+w-M,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=A,R.directionalLength=f,R.pointLength=m,R.spotLength=x,R.rectAreaLength=g,R.hemiLength=p,R.numDirectionalShadows=b,R.numPointShadows=_,R.numSpotShadows=v,R.numSpotMaps=w,R.numLightProbes=A,i.version=cm++)}function l(h,c){let d=0,u=0,f=0,m=0,x=0;const g=c.matrixWorldInverse;for(let p=0,b=h.length;p<b;p++){const _=h[p];if(_.isDirectionalLight){const v=i.directional[d];v.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(g),d++}else if(_.isSpotLight){const v=i.spot[f];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(_.matrixWorld),n.setFromMatrixPosition(_.target.matrixWorld),v.direction.sub(n),v.direction.transformDirection(g),f++}else if(_.isRectAreaLight){const v=i.rectArea[m];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),r.identity(),s.copy(_.matrixWorld),s.premultiply(g),r.extractRotation(s),v.halfWidth.set(_.width*.5,0,0),v.halfHeight.set(0,_.height*.5,0),v.halfWidth.applyMatrix4(r),v.halfHeight.applyMatrix4(r),m++}else if(_.isPointLight){const v=i.point[u];v.position.setFromMatrixPosition(_.matrixWorld),v.position.applyMatrix4(g),u++}else if(_.isHemisphereLight){const v=i.hemi[x];v.direction.setFromMatrixPosition(_.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function xl(a){const t=new um(a),e=[],i=[];function n(c){h.camera=c,e.length=0,i.length=0}function s(c){e.push(c)}function r(c){i.push(c)}function o(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:h,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:r}}function fm(a){let t=new WeakMap;function e(n,s=0){const r=t.get(n);let o;return r===void 0?(o=new xl(a),t.set(n,[o])):s>=r.length?(o=new xl(a),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const pm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mm=`uniform sampler2D shadow_pass;
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
}`;function gm(a,t,e){let i=new cs;const n=new yt,s=new yt,r=new ge,o=new Uc({depthPacking:kh}),l=new Fc,h={},c=e.maxTextureSize,d={[$i]:ke,[ke]:$i,[$e]:$e},u=new bi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:pm,fragmentShader:mm}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const m=new ze;m.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Qt(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wl;let p=this.type;this.render=function(M,A,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;const T=a.getRenderTarget(),y=a.getActiveCubeFace(),C=a.getActiveMipmapLevel(),P=a.state;P.setBlending(Ii),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const F=p!==Ci&&this.type===Ci,O=p===Ci&&this.type!==Ci;for(let H=0,V=M.length;H<V;H++){const Q=M[H],W=Q.shadow;if(W===void 0){Lt("WebGLShadowMap:",Q,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;n.copy(W.mapSize);const tt=W.getFrameExtents();if(n.multiply(tt),s.copy(W.mapSize),(n.x>c||n.y>c)&&(n.x>c&&(s.x=Math.floor(c/tt.x),n.x=s.x*tt.x,W.mapSize.x=s.x),n.y>c&&(s.y=Math.floor(c/tt.y),n.y=s.y*tt.y,W.mapSize.y=s.y)),W.map===null||F===!0||O===!0){const bt=this.type!==Ci?{minFilter:Ye,magFilter:Ye}:{};W.map!==null&&W.map.dispose(),W.map=new hn(n.x,n.y,bt),W.map.texture.name=Q.name+".shadowMap",W.camera.updateProjectionMatrix()}a.setRenderTarget(W.map),a.clear();const it=W.getViewportCount();for(let bt=0;bt<it;bt++){const Vt=W.getViewport(bt);r.set(s.x*Vt.x,s.y*Vt.y,s.x*Vt.z,s.y*Vt.w),P.viewport(r),W.updateMatrices(Q,bt),i=W.getFrustum(),v(A,R,W.camera,Q,this.type)}W.isPointLightShadow!==!0&&this.type===Ci&&b(W,R),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,a.setRenderTarget(T,y,C)};function b(M,A){const R=t.update(x);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new hn(n.x,n.y)),u.uniforms.shadow_pass.value=M.map.texture,u.uniforms.resolution.value=M.mapSize,u.uniforms.radius.value=M.radius,a.setRenderTarget(M.mapPass),a.clear(),a.renderBufferDirect(A,null,R,u,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,a.setRenderTarget(M.map),a.clear(),a.renderBufferDirect(A,null,R,f,x,null)}function _(M,A,R,T){let y=null;const C=R.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(C!==void 0)y=C;else if(y=R.isPointLight===!0?l:o,a.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const P=y.uuid,F=A.uuid;let O=h[P];O===void 0&&(O={},h[P]=O);let H=O[F];H===void 0&&(H=y.clone(),O[F]=H,A.addEventListener("dispose",w)),y=H}if(y.visible=A.visible,y.wireframe=A.wireframe,T===Ci?y.side=A.shadowSide!==null?A.shadowSide:A.side:y.side=A.shadowSide!==null?A.shadowSide:d[A.side],y.alphaMap=A.alphaMap,y.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,y.map=A.map,y.clipShadows=A.clipShadows,y.clippingPlanes=A.clippingPlanes,y.clipIntersection=A.clipIntersection,y.displacementMap=A.displacementMap,y.displacementScale=A.displacementScale,y.displacementBias=A.displacementBias,y.wireframeLinewidth=A.wireframeLinewidth,y.linewidth=A.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=a.properties.get(y);P.light=R}return y}function v(M,A,R,T,y){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&y===Ci)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,M.matrixWorld);const F=t.update(M),O=M.material;if(Array.isArray(O)){const H=F.groups;for(let V=0,Q=H.length;V<Q;V++){const W=H[V],tt=O[W.materialIndex];if(tt&&tt.visible){const it=_(M,tt,T,y);M.onBeforeShadow(a,M,A,R,F,it,W),a.renderBufferDirect(R,null,F,it,M,W),M.onAfterShadow(a,M,A,R,F,it,W)}}}else if(O.visible){const H=_(M,O,T,y);M.onBeforeShadow(a,M,A,R,F,H,null),a.renderBufferDirect(R,null,F,H,M,null),M.onAfterShadow(a,M,A,R,F,H,null)}}const P=M.children;for(let F=0,O=P.length;F<O;F++)v(P[F],A,R,T,y)}function w(M){M.target.removeEventListener("dispose",w);for(const R in h){const T=h[R],y=M.target.uuid;y in T&&(T[y].dispose(),delete T[y])}}}const xm={[$r]:Yr,[jr]:Qr,[Kr]:ta,[Nn]:Jr,[Yr]:$r,[Qr]:jr,[ta]:Kr,[Jr]:Nn};function _m(a,t){function e(){let L=!1;const ht=new ge;let st=null;const rt=new ge(0,0,0,0);return{setMask:function(J){st!==J&&!L&&(a.colorMask(J,J,J,J),st=J)},setLocked:function(J){L=J},setClear:function(J,$,mt,Ft,oe){oe===!0&&(J*=Ft,$*=Ft,mt*=Ft),ht.set(J,$,mt,Ft),rt.equals(ht)===!1&&(a.clearColor(J,$,mt,Ft),rt.copy(ht))},reset:function(){L=!1,st=null,rt.set(-1,0,0,0)}}}function i(){let L=!1,ht=!1,st=null,rt=null,J=null;return{setReversed:function($){if(ht!==$){const mt=t.get("EXT_clip_control");$?mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.ZERO_TO_ONE_EXT):mt.clipControlEXT(mt.LOWER_LEFT_EXT,mt.NEGATIVE_ONE_TO_ONE_EXT),ht=$;const Ft=J;J=null,this.setClear(Ft)}},getReversed:function(){return ht},setTest:function($){$?Y(a.DEPTH_TEST):pt(a.DEPTH_TEST)},setMask:function($){st!==$&&!L&&(a.depthMask($),st=$)},setFunc:function($){if(ht&&($=xm[$]),rt!==$){switch($){case $r:a.depthFunc(a.NEVER);break;case Yr:a.depthFunc(a.ALWAYS);break;case jr:a.depthFunc(a.LESS);break;case Nn:a.depthFunc(a.LEQUAL);break;case Kr:a.depthFunc(a.EQUAL);break;case Jr:a.depthFunc(a.GEQUAL);break;case Qr:a.depthFunc(a.GREATER);break;case ta:a.depthFunc(a.NOTEQUAL);break;default:a.depthFunc(a.LEQUAL)}rt=$}},setLocked:function($){L=$},setClear:function($){J!==$&&(ht&&($=1-$),a.clearDepth($),J=$)},reset:function(){L=!1,st=null,rt=null,J=null,ht=!1}}}function n(){let L=!1,ht=null,st=null,rt=null,J=null,$=null,mt=null,Ft=null,oe=null;return{setTest:function(te){L||(te?Y(a.STENCIL_TEST):pt(a.STENCIL_TEST))},setMask:function(te){ht!==te&&!L&&(a.stencilMask(te),ht=te)},setFunc:function(te,mi,si){(st!==te||rt!==mi||J!==si)&&(a.stencilFunc(te,mi,si),st=te,rt=mi,J=si)},setOp:function(te,mi,si){($!==te||mt!==mi||Ft!==si)&&(a.stencilOp(te,mi,si),$=te,mt=mi,Ft=si)},setLocked:function(te){L=te},setClear:function(te){oe!==te&&(a.clearStencil(te),oe=te)},reset:function(){L=!1,ht=null,st=null,rt=null,J=null,$=null,mt=null,Ft=null,oe=null}}}const s=new e,r=new i,o=new n,l=new WeakMap,h=new WeakMap;let c={},d={},u=new WeakMap,f=[],m=null,x=!1,g=null,p=null,b=null,_=null,v=null,w=null,M=null,A=new ut(0,0,0),R=0,T=!1,y=null,C=null,P=null,F=null,O=null;const H=a.getParameter(a.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,Q=0;const W=a.getParameter(a.VERSION);W.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(W)[1]),V=Q>=1):W.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),V=Q>=2);let tt=null,it={};const bt=a.getParameter(a.SCISSOR_BOX),Vt=a.getParameter(a.VIEWPORT),Gt=new ge().fromArray(bt),$t=new ge().fromArray(Vt);function Wt(L,ht,st,rt){const J=new Uint8Array(4),$=a.createTexture();a.bindTexture(L,$),a.texParameteri(L,a.TEXTURE_MIN_FILTER,a.NEAREST),a.texParameteri(L,a.TEXTURE_MAG_FILTER,a.NEAREST);for(let mt=0;mt<st;mt++)L===a.TEXTURE_3D||L===a.TEXTURE_2D_ARRAY?a.texImage3D(ht,0,a.RGBA,1,1,rt,0,a.RGBA,a.UNSIGNED_BYTE,J):a.texImage2D(ht+mt,0,a.RGBA,1,1,0,a.RGBA,a.UNSIGNED_BYTE,J);return $}const q={};q[a.TEXTURE_2D]=Wt(a.TEXTURE_2D,a.TEXTURE_2D,1),q[a.TEXTURE_CUBE_MAP]=Wt(a.TEXTURE_CUBE_MAP,a.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[a.TEXTURE_2D_ARRAY]=Wt(a.TEXTURE_2D_ARRAY,a.TEXTURE_2D_ARRAY,1,1),q[a.TEXTURE_3D]=Wt(a.TEXTURE_3D,a.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),Y(a.DEPTH_TEST),r.setFunc(Nn),Xt(!1),qt(ho),Y(a.CULL_FACE),he(Ii);function Y(L){c[L]!==!0&&(a.enable(L),c[L]=!0)}function pt(L){c[L]!==!1&&(a.disable(L),c[L]=!1)}function Ut(L,ht){return d[L]!==ht?(a.bindFramebuffer(L,ht),d[L]=ht,L===a.DRAW_FRAMEBUFFER&&(d[a.FRAMEBUFFER]=ht),L===a.FRAMEBUFFER&&(d[a.DRAW_FRAMEBUFFER]=ht),!0):!1}function _t(L,ht){let st=f,rt=!1;if(L){st=u.get(ht),st===void 0&&(st=[],u.set(ht,st));const J=L.textures;if(st.length!==J.length||st[0]!==a.COLOR_ATTACHMENT0){for(let $=0,mt=J.length;$<mt;$++)st[$]=a.COLOR_ATTACHMENT0+$;st.length=J.length,rt=!0}}else st[0]!==a.BACK&&(st[0]=a.BACK,rt=!0);rt&&a.drawBuffers(st)}function Bt(L){return m!==L?(a.useProgram(L),m=L,!0):!1}const Te={[sn]:a.FUNC_ADD,[fh]:a.FUNC_SUBTRACT,[ph]:a.FUNC_REVERSE_SUBTRACT};Te[mh]=a.MIN,Te[gh]=a.MAX;const kt={[xh]:a.ZERO,[_h]:a.ONE,[Mh]:a.SRC_COLOR,[qr]:a.SRC_ALPHA,[Th]:a.SRC_ALPHA_SATURATE,[Sh]:a.DST_COLOR,[yh]:a.DST_ALPHA,[vh]:a.ONE_MINUS_SRC_COLOR,[Zr]:a.ONE_MINUS_SRC_ALPHA,[wh]:a.ONE_MINUS_DST_COLOR,[bh]:a.ONE_MINUS_DST_ALPHA,[Eh]:a.CONSTANT_COLOR,[Ah]:a.ONE_MINUS_CONSTANT_COLOR,[Rh]:a.CONSTANT_ALPHA,[Ch]:a.ONE_MINUS_CONSTANT_ALPHA};function he(L,ht,st,rt,J,$,mt,Ft,oe,te){if(L===Ii){x===!0&&(pt(a.BLEND),x=!1);return}if(x===!1&&(Y(a.BLEND),x=!0),L!==uh){if(L!==g||te!==T){if((p!==sn||v!==sn)&&(a.blendEquation(a.FUNC_ADD),p=sn,v=sn),te)switch(L){case an:a.blendFuncSeparate(a.ONE,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Xr:a.blendFunc(a.ONE,a.ONE);break;case co:a.blendFuncSeparate(a.ZERO,a.ONE_MINUS_SRC_COLOR,a.ZERO,a.ONE);break;case uo:a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE);break;default:fe("WebGLState: Invalid blending: ",L);break}else switch(L){case an:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE_MINUS_SRC_ALPHA,a.ONE,a.ONE_MINUS_SRC_ALPHA);break;case Xr:a.blendFuncSeparate(a.SRC_ALPHA,a.ONE,a.ONE,a.ONE);break;case co:fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uo:fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:fe("WebGLState: Invalid blending: ",L);break}b=null,_=null,w=null,M=null,A.set(0,0,0),R=0,g=L,T=te}return}J=J||ht,$=$||st,mt=mt||rt,(ht!==p||J!==v)&&(a.blendEquationSeparate(Te[ht],Te[J]),p=ht,v=J),(st!==b||rt!==_||$!==w||mt!==M)&&(a.blendFuncSeparate(kt[st],kt[rt],kt[$],kt[mt]),b=st,_=rt,w=$,M=mt),(Ft.equals(A)===!1||oe!==R)&&(a.blendColor(Ft.r,Ft.g,Ft.b,oe),A.copy(Ft),R=oe),g=L,T=!1}function I(L,ht){L.side===$e?pt(a.CULL_FACE):Y(a.CULL_FACE);let st=L.side===ke;ht&&(st=!st),Xt(st),L.blending===an&&L.transparent===!1?he(Ii):he(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),s.setMask(L.colorWrite);const rt=L.stencilWrite;o.setTest(rt),rt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),xt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Y(a.SAMPLE_ALPHA_TO_COVERAGE):pt(a.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(L){y!==L&&(L?a.frontFace(a.CW):a.frontFace(a.CCW),y=L)}function qt(L){L!==hh?(Y(a.CULL_FACE),L!==C&&(L===ho?a.cullFace(a.BACK):L===ch?a.cullFace(a.FRONT):a.cullFace(a.FRONT_AND_BACK))):pt(a.CULL_FACE),C=L}function ae(L){L!==P&&(V&&a.lineWidth(L),P=L)}function xt(L,ht,st){L?(Y(a.POLYGON_OFFSET_FILL),(F!==ht||O!==st)&&(a.polygonOffset(ht,st),F=ht,O=st)):pt(a.POLYGON_OFFSET_FILL)}function ce(L){L?Y(a.SCISSOR_TEST):pt(a.SCISSOR_TEST)}function wt(L){L===void 0&&(L=a.TEXTURE0+H-1),tt!==L&&(a.activeTexture(L),tt=L)}function Nt(L,ht,st){st===void 0&&(tt===null?st=a.TEXTURE0+H-1:st=tt);let rt=it[st];rt===void 0&&(rt={type:void 0,texture:void 0},it[st]=rt),(rt.type!==L||rt.texture!==ht)&&(tt!==st&&(a.activeTexture(st),tt=st),a.bindTexture(L,ht||q[L]),rt.type=L,rt.texture=ht)}function D(){const L=it[tt];L!==void 0&&L.type!==void 0&&(a.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function S(){try{a.compressedTexImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function B(){try{a.compressedTexImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function Z(){try{a.texSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function j(){try{a.texSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function X(){try{a.compressedTexSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function vt(){try{a.compressedTexSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function lt(){try{a.texStorage2D(...arguments)}catch(L){L("WebGLState:",L)}}function Tt(){try{a.texStorage3D(...arguments)}catch(L){L("WebGLState:",L)}}function Mt(){try{a.texImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function K(){try{a.texImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function nt(L){Gt.equals(L)===!1&&(a.scissor(L.x,L.y,L.z,L.w),Gt.copy(L))}function Dt(L){$t.equals(L)===!1&&(a.viewport(L.x,L.y,L.z,L.w),$t.copy(L))}function Rt(L,ht){let st=h.get(ht);st===void 0&&(st=new WeakMap,h.set(ht,st));let rt=st.get(L);rt===void 0&&(rt=a.getUniformBlockIndex(ht,L.name),st.set(L,rt))}function dt(L,ht){const rt=h.get(ht).get(L);l.get(ht)!==rt&&(a.uniformBlockBinding(ht,rt,L.__bindingPointIndex),l.set(ht,rt))}function It(){a.disable(a.BLEND),a.disable(a.CULL_FACE),a.disable(a.DEPTH_TEST),a.disable(a.POLYGON_OFFSET_FILL),a.disable(a.SCISSOR_TEST),a.disable(a.STENCIL_TEST),a.disable(a.SAMPLE_ALPHA_TO_COVERAGE),a.blendEquation(a.FUNC_ADD),a.blendFunc(a.ONE,a.ZERO),a.blendFuncSeparate(a.ONE,a.ZERO,a.ONE,a.ZERO),a.blendColor(0,0,0,0),a.colorMask(!0,!0,!0,!0),a.clearColor(0,0,0,0),a.depthMask(!0),a.depthFunc(a.LESS),r.setReversed(!1),a.clearDepth(1),a.stencilMask(4294967295),a.stencilFunc(a.ALWAYS,0,4294967295),a.stencilOp(a.KEEP,a.KEEP,a.KEEP),a.clearStencil(0),a.cullFace(a.BACK),a.frontFace(a.CCW),a.polygonOffset(0,0),a.activeTexture(a.TEXTURE0),a.bindFramebuffer(a.FRAMEBUFFER,null),a.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),a.bindFramebuffer(a.READ_FRAMEBUFFER,null),a.useProgram(null),a.lineWidth(1),a.scissor(0,0,a.canvas.width,a.canvas.height),a.viewport(0,0,a.canvas.width,a.canvas.height),c={},tt=null,it={},d={},u=new WeakMap,f=[],m=null,x=!1,g=null,p=null,b=null,_=null,v=null,w=null,M=null,A=new ut(0,0,0),R=0,T=!1,y=null,C=null,P=null,F=null,O=null,Gt.set(0,0,a.canvas.width,a.canvas.height),$t.set(0,0,a.canvas.width,a.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:Y,disable:pt,bindFramebuffer:Ut,drawBuffers:_t,useProgram:Bt,setBlending:he,setMaterial:I,setFlipSided:Xt,setCullFace:qt,setLineWidth:ae,setPolygonOffset:xt,setScissorTest:ce,activeTexture:wt,bindTexture:Nt,unbindTexture:D,compressedTexImage2D:S,compressedTexImage3D:B,texImage2D:Mt,texImage3D:K,updateUBOMapping:Rt,uniformBlockBinding:dt,texStorage2D:lt,texStorage3D:Tt,texSubImage2D:Z,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:vt,scissor:nt,viewport:Dt,reset:It}}function Mm(a,t,e,i,n,s,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new yt,c=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,S){return f?new OffscreenCanvas(D,S):js("canvas")}function x(D,S,B){let Z=1;const j=Nt(D);if((j.width>B||j.height>B)&&(Z=B/Math.max(j.width,j.height)),Z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const X=Math.floor(Z*j.width),vt=Math.floor(Z*j.height);d===void 0&&(d=m(X,vt));const lt=S?m(X,vt):d;return lt.width=X,lt.height=vt,lt.getContext("2d").drawImage(D,0,0,X,vt),Lt("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+vt+")."),lt}else return"data"in D&&Lt("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),D;return D}function g(D){return D.generateMipmaps}function p(D){a.generateMipmap(D)}function b(D){return D.isWebGLCubeRenderTarget?a.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?a.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?a.TEXTURE_2D_ARRAY:a.TEXTURE_2D}function _(D,S,B,Z,j=!1){if(D!==null){if(a[D]!==void 0)return a[D];Lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let X=S;if(S===a.RED&&(B===a.FLOAT&&(X=a.R32F),B===a.HALF_FLOAT&&(X=a.R16F),B===a.UNSIGNED_BYTE&&(X=a.R8)),S===a.RED_INTEGER&&(B===a.UNSIGNED_BYTE&&(X=a.R8UI),B===a.UNSIGNED_SHORT&&(X=a.R16UI),B===a.UNSIGNED_INT&&(X=a.R32UI),B===a.BYTE&&(X=a.R8I),B===a.SHORT&&(X=a.R16I),B===a.INT&&(X=a.R32I)),S===a.RG&&(B===a.FLOAT&&(X=a.RG32F),B===a.HALF_FLOAT&&(X=a.RG16F),B===a.UNSIGNED_BYTE&&(X=a.RG8)),S===a.RG_INTEGER&&(B===a.UNSIGNED_BYTE&&(X=a.RG8UI),B===a.UNSIGNED_SHORT&&(X=a.RG16UI),B===a.UNSIGNED_INT&&(X=a.RG32UI),B===a.BYTE&&(X=a.RG8I),B===a.SHORT&&(X=a.RG16I),B===a.INT&&(X=a.RG32I)),S===a.RGB_INTEGER&&(B===a.UNSIGNED_BYTE&&(X=a.RGB8UI),B===a.UNSIGNED_SHORT&&(X=a.RGB16UI),B===a.UNSIGNED_INT&&(X=a.RGB32UI),B===a.BYTE&&(X=a.RGB8I),B===a.SHORT&&(X=a.RGB16I),B===a.INT&&(X=a.RGB32I)),S===a.RGBA_INTEGER&&(B===a.UNSIGNED_BYTE&&(X=a.RGBA8UI),B===a.UNSIGNED_SHORT&&(X=a.RGBA16UI),B===a.UNSIGNED_INT&&(X=a.RGBA32UI),B===a.BYTE&&(X=a.RGBA8I),B===a.SHORT&&(X=a.RGBA16I),B===a.INT&&(X=a.RGBA32I)),S===a.RGB&&(B===a.UNSIGNED_INT_5_9_9_9_REV&&(X=a.RGB9_E5),B===a.UNSIGNED_INT_10F_11F_11F_REV&&(X=a.R11F_G11F_B10F)),S===a.RGBA){const vt=j?$s:jt.getTransfer(Z);B===a.FLOAT&&(X=a.RGBA32F),B===a.HALF_FLOAT&&(X=a.RGBA16F),B===a.UNSIGNED_BYTE&&(X=vt===ie?a.SRGB8_ALPHA8:a.RGBA8),B===a.UNSIGNED_SHORT_4_4_4_4&&(X=a.RGBA4),B===a.UNSIGNED_SHORT_5_5_5_1&&(X=a.RGB5_A1)}return(X===a.R16F||X===a.R32F||X===a.RG16F||X===a.RG32F||X===a.RGBA16F||X===a.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function v(D,S){let B;return D?S===null||S===on||S===ss?B=a.DEPTH24_STENCIL8:S===Mi?B=a.DEPTH32F_STENCIL8:S===ns&&(B=a.DEPTH24_STENCIL8,Lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===on||S===ss?B=a.DEPTH_COMPONENT24:S===Mi?B=a.DEPTH_COMPONENT32F:S===ns&&(B=a.DEPTH_COMPONENT16),B}function w(D,S){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Ye&&D.minFilter!==ti?Math.log2(Math.max(S.width,S.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?S.mipmaps.length:1}function M(D){const S=D.target;S.removeEventListener("dispose",M),R(S),S.isVideoTexture&&c.delete(S)}function A(D){const S=D.target;S.removeEventListener("dispose",A),y(S)}function R(D){const S=i.get(D);if(S.__webglInit===void 0)return;const B=D.source,Z=u.get(B);if(Z){const j=Z[S.__cacheKey];j.usedTimes--,j.usedTimes===0&&T(D),Object.keys(Z).length===0&&u.delete(B)}i.remove(D)}function T(D){const S=i.get(D);a.deleteTexture(S.__webglTexture);const B=D.source,Z=u.get(B);delete Z[S.__cacheKey],r.memory.textures--}function y(D){const S=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let j=0;j<S.__webglFramebuffer[Z].length;j++)a.deleteFramebuffer(S.__webglFramebuffer[Z][j]);else a.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&a.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)a.deleteFramebuffer(S.__webglFramebuffer[Z]);else a.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&a.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&a.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&a.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&a.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=D.textures;for(let Z=0,j=B.length;Z<j;Z++){const X=i.get(B[Z]);X.__webglTexture&&(a.deleteTexture(X.__webglTexture),r.memory.textures--),i.remove(B[Z])}i.remove(D)}let C=0;function P(){C=0}function F(){const D=C;return D>=n.maxTextures&&Lt("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+n.maxTextures),C+=1,D}function O(D){const S=[];return S.push(D.wrapS),S.push(D.wrapT),S.push(D.wrapR||0),S.push(D.magFilter),S.push(D.minFilter),S.push(D.anisotropy),S.push(D.internalFormat),S.push(D.format),S.push(D.type),S.push(D.generateMipmaps),S.push(D.premultiplyAlpha),S.push(D.flipY),S.push(D.unpackAlignment),S.push(D.colorSpace),S.join()}function H(D,S){const B=i.get(D);if(D.isVideoTexture&&ce(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&B.__version!==D.version){const Z=D.image;if(Z===null)Lt("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Lt("WebGLRenderer: Texture marked for update but image is incomplete");else{q(B,D,S);return}}else D.isExternalTexture&&(B.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(a.TEXTURE_2D,B.__webglTexture,a.TEXTURE0+S)}function V(D,S){const B=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&B.__version!==D.version){q(B,D,S);return}else D.isExternalTexture&&(B.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(a.TEXTURE_2D_ARRAY,B.__webglTexture,a.TEXTURE0+S)}function Q(D,S){const B=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&B.__version!==D.version){q(B,D,S);return}e.bindTexture(a.TEXTURE_3D,B.__webglTexture,a.TEXTURE0+S)}function W(D,S){const B=i.get(D);if(D.version>0&&B.__version!==D.version){Y(B,D,S);return}e.bindTexture(a.TEXTURE_CUBE_MAP,B.__webglTexture,a.TEXTURE0+S)}const tt={[na]:a.REPEAT,[Di]:a.CLAMP_TO_EDGE,[sa]:a.MIRRORED_REPEAT},it={[Ye]:a.NEAREST,[Oh]:a.NEAREST_MIPMAP_NEAREST,[fs]:a.NEAREST_MIPMAP_LINEAR,[ti]:a.LINEAR,[cr]:a.LINEAR_MIPMAP_NEAREST,[Wi]:a.LINEAR_MIPMAP_LINEAR},bt={[Vh]:a.NEVER,[Yh]:a.ALWAYS,[Wh]:a.LESS,[Il]:a.LEQUAL,[Xh]:a.EQUAL,[$h]:a.GEQUAL,[qh]:a.GREATER,[Zh]:a.NOTEQUAL};function Vt(D,S){if(S.type===Mi&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===ti||S.magFilter===cr||S.magFilter===fs||S.magFilter===Wi||S.minFilter===ti||S.minFilter===cr||S.minFilter===fs||S.minFilter===Wi)&&Lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),a.texParameteri(D,a.TEXTURE_WRAP_S,tt[S.wrapS]),a.texParameteri(D,a.TEXTURE_WRAP_T,tt[S.wrapT]),(D===a.TEXTURE_3D||D===a.TEXTURE_2D_ARRAY)&&a.texParameteri(D,a.TEXTURE_WRAP_R,tt[S.wrapR]),a.texParameteri(D,a.TEXTURE_MAG_FILTER,it[S.magFilter]),a.texParameteri(D,a.TEXTURE_MIN_FILTER,it[S.minFilter]),S.compareFunction&&(a.texParameteri(D,a.TEXTURE_COMPARE_MODE,a.COMPARE_REF_TO_TEXTURE),a.texParameteri(D,a.TEXTURE_COMPARE_FUNC,bt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ye||S.minFilter!==fs&&S.minFilter!==Wi||S.type===Mi&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");a.texParameterf(D,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,n.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Gt(D,S){let B=!1;D.__webglInit===void 0&&(D.__webglInit=!0,S.addEventListener("dispose",M));const Z=S.source;let j=u.get(Z);j===void 0&&(j={},u.set(Z,j));const X=O(S);if(X!==D.__cacheKey){j[X]===void 0&&(j[X]={texture:a.createTexture(),usedTimes:0},r.memory.textures++,B=!0),j[X].usedTimes++;const vt=j[D.__cacheKey];vt!==void 0&&(j[D.__cacheKey].usedTimes--,vt.usedTimes===0&&T(S)),D.__cacheKey=X,D.__webglTexture=j[X].texture}return B}function $t(D,S,B){return Math.floor(Math.floor(D/B)/S)}function Wt(D,S,B,Z){const X=D.updateRanges;if(X.length===0)e.texSubImage2D(a.TEXTURE_2D,0,0,0,S.width,S.height,B,Z,S.data);else{X.sort((K,nt)=>K.start-nt.start);let vt=0;for(let K=1;K<X.length;K++){const nt=X[vt],Dt=X[K],Rt=nt.start+nt.count,dt=$t(Dt.start,S.width,4),It=$t(nt.start,S.width,4);Dt.start<=Rt+1&&dt===It&&$t(Dt.start+Dt.count-1,S.width,4)===dt?nt.count=Math.max(nt.count,Dt.start+Dt.count-nt.start):(++vt,X[vt]=Dt)}X.length=vt+1;const lt=a.getParameter(a.UNPACK_ROW_LENGTH),Tt=a.getParameter(a.UNPACK_SKIP_PIXELS),Mt=a.getParameter(a.UNPACK_SKIP_ROWS);a.pixelStorei(a.UNPACK_ROW_LENGTH,S.width);for(let K=0,nt=X.length;K<nt;K++){const Dt=X[K],Rt=Math.floor(Dt.start/4),dt=Math.ceil(Dt.count/4),It=Rt%S.width,L=Math.floor(Rt/S.width),ht=dt,st=1;a.pixelStorei(a.UNPACK_SKIP_PIXELS,It),a.pixelStorei(a.UNPACK_SKIP_ROWS,L),e.texSubImage2D(a.TEXTURE_2D,0,It,L,ht,st,B,Z,S.data)}D.clearUpdateRanges(),a.pixelStorei(a.UNPACK_ROW_LENGTH,lt),a.pixelStorei(a.UNPACK_SKIP_PIXELS,Tt),a.pixelStorei(a.UNPACK_SKIP_ROWS,Mt)}}function q(D,S,B){let Z=a.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=a.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=a.TEXTURE_3D);const j=Gt(D,S),X=S.source;e.bindTexture(Z,D.__webglTexture,a.TEXTURE0+B);const vt=i.get(X);if(X.version!==vt.__version||j===!0){e.activeTexture(a.TEXTURE0+B);const lt=jt.getPrimaries(jt.workingColorSpace),Tt=S.colorSpace===Vi?null:jt.getPrimaries(S.colorSpace),Mt=S.colorSpace===Vi||lt===Tt?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,S.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,S.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);let K=x(S.image,!1,n.maxTextureSize);K=wt(S,K);const nt=s.convert(S.format,S.colorSpace),Dt=s.convert(S.type);let Rt=_(S.internalFormat,nt,Dt,S.colorSpace,S.isVideoTexture);Vt(Z,S);let dt;const It=S.mipmaps,L=S.isVideoTexture!==!0,ht=vt.__version===void 0||j===!0,st=X.dataReady,rt=w(S,K);if(S.isDepthTexture)Rt=v(S.format===as,S.type),ht&&(L?e.texStorage2D(a.TEXTURE_2D,1,Rt,K.width,K.height):e.texImage2D(a.TEXTURE_2D,0,Rt,K.width,K.height,0,nt,Dt,null));else if(S.isDataTexture)if(It.length>0){L&&ht&&e.texStorage2D(a.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let J=0,$=It.length;J<$;J++)dt=It[J],L?st&&e.texSubImage2D(a.TEXTURE_2D,J,0,0,dt.width,dt.height,nt,Dt,dt.data):e.texImage2D(a.TEXTURE_2D,J,Rt,dt.width,dt.height,0,nt,Dt,dt.data);S.generateMipmaps=!1}else L?(ht&&e.texStorage2D(a.TEXTURE_2D,rt,Rt,K.width,K.height),st&&Wt(S,K,nt,Dt)):e.texImage2D(a.TEXTURE_2D,0,Rt,K.width,K.height,0,nt,Dt,K.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){L&&ht&&e.texStorage3D(a.TEXTURE_2D_ARRAY,rt,Rt,It[0].width,It[0].height,K.depth);for(let J=0,$=It.length;J<$;J++)if(dt=It[J],S.format!==ci)if(nt!==null)if(L){if(st)if(S.layerUpdates.size>0){const mt=$o(dt.width,dt.height,S.format,S.type);for(const Ft of S.layerUpdates){const oe=dt.data.subarray(Ft*mt/dt.data.BYTES_PER_ELEMENT,(Ft+1)*mt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,J,0,0,Ft,dt.width,dt.height,1,nt,oe)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(a.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,nt,dt.data)}else e.compressedTexImage3D(a.TEXTURE_2D_ARRAY,J,Rt,dt.width,dt.height,K.depth,0,dt.data,0,0);else Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?st&&e.texSubImage3D(a.TEXTURE_2D_ARRAY,J,0,0,0,dt.width,dt.height,K.depth,nt,Dt,dt.data):e.texImage3D(a.TEXTURE_2D_ARRAY,J,Rt,dt.width,dt.height,K.depth,0,nt,Dt,dt.data)}else{L&&ht&&e.texStorage2D(a.TEXTURE_2D,rt,Rt,It[0].width,It[0].height);for(let J=0,$=It.length;J<$;J++)dt=It[J],S.format!==ci?nt!==null?L?st&&e.compressedTexSubImage2D(a.TEXTURE_2D,J,0,0,dt.width,dt.height,nt,dt.data):e.compressedTexImage2D(a.TEXTURE_2D,J,Rt,dt.width,dt.height,0,dt.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?st&&e.texSubImage2D(a.TEXTURE_2D,J,0,0,dt.width,dt.height,nt,Dt,dt.data):e.texImage2D(a.TEXTURE_2D,J,Rt,dt.width,dt.height,0,nt,Dt,dt.data)}else if(S.isDataArrayTexture)if(L){if(ht&&e.texStorage3D(a.TEXTURE_2D_ARRAY,rt,Rt,K.width,K.height,K.depth),st)if(S.layerUpdates.size>0){const J=$o(K.width,K.height,S.format,S.type);for(const $ of S.layerUpdates){const mt=K.data.subarray($*J/K.data.BYTES_PER_ELEMENT,($+1)*J/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,$,K.width,K.height,1,nt,Dt,mt)}S.clearLayerUpdates()}else e.texSubImage3D(a.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,nt,Dt,K.data)}else e.texImage3D(a.TEXTURE_2D_ARRAY,0,Rt,K.width,K.height,K.depth,0,nt,Dt,K.data);else if(S.isData3DTexture)L?(ht&&e.texStorage3D(a.TEXTURE_3D,rt,Rt,K.width,K.height,K.depth),st&&e.texSubImage3D(a.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,nt,Dt,K.data)):e.texImage3D(a.TEXTURE_3D,0,Rt,K.width,K.height,K.depth,0,nt,Dt,K.data);else if(S.isFramebufferTexture){if(ht)if(L)e.texStorage2D(a.TEXTURE_2D,rt,Rt,K.width,K.height);else{let J=K.width,$=K.height;for(let mt=0;mt<rt;mt++)e.texImage2D(a.TEXTURE_2D,mt,Rt,J,$,0,nt,Dt,null),J>>=1,$>>=1}}else if(It.length>0){if(L&&ht){const J=Nt(It[0]);e.texStorage2D(a.TEXTURE_2D,rt,Rt,J.width,J.height)}for(let J=0,$=It.length;J<$;J++)dt=It[J],L?st&&e.texSubImage2D(a.TEXTURE_2D,J,0,0,nt,Dt,dt):e.texImage2D(a.TEXTURE_2D,J,Rt,nt,Dt,dt);S.generateMipmaps=!1}else if(L){if(ht){const J=Nt(K);e.texStorage2D(a.TEXTURE_2D,rt,Rt,J.width,J.height)}st&&e.texSubImage2D(a.TEXTURE_2D,0,0,0,nt,Dt,K)}else e.texImage2D(a.TEXTURE_2D,0,Rt,nt,Dt,K);g(S)&&p(Z),vt.__version=X.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function Y(D,S,B){if(S.image.length!==6)return;const Z=Gt(D,S),j=S.source;e.bindTexture(a.TEXTURE_CUBE_MAP,D.__webglTexture,a.TEXTURE0+B);const X=i.get(j);if(j.version!==X.__version||Z===!0){e.activeTexture(a.TEXTURE0+B);const vt=jt.getPrimaries(jt.workingColorSpace),lt=S.colorSpace===Vi?null:jt.getPrimaries(S.colorSpace),Tt=S.colorSpace===Vi||vt===lt?a.NONE:a.BROWSER_DEFAULT_WEBGL;a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,S.flipY),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),a.pixelStorei(a.UNPACK_ALIGNMENT,S.unpackAlignment),a.pixelStorei(a.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const Mt=S.isCompressedTexture||S.image[0].isCompressedTexture,K=S.image[0]&&S.image[0].isDataTexture,nt=[];for(let $=0;$<6;$++)!Mt&&!K?nt[$]=x(S.image[$],!0,n.maxCubemapSize):nt[$]=K?S.image[$].image:S.image[$],nt[$]=wt(S,nt[$]);const Dt=nt[0],Rt=s.convert(S.format,S.colorSpace),dt=s.convert(S.type),It=_(S.internalFormat,Rt,dt,S.colorSpace),L=S.isVideoTexture!==!0,ht=X.__version===void 0||Z===!0,st=j.dataReady;let rt=w(S,Dt);Vt(a.TEXTURE_CUBE_MAP,S);let J;if(Mt){L&&ht&&e.texStorage2D(a.TEXTURE_CUBE_MAP,rt,It,Dt.width,Dt.height);for(let $=0;$<6;$++){J=nt[$].mipmaps;for(let mt=0;mt<J.length;mt++){const Ft=J[mt];S.format!==ci?Rt!==null?L?st&&e.compressedTexSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,0,0,Ft.width,Ft.height,Rt,Ft.data):e.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,It,Ft.width,Ft.height,0,Ft.data):Lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?st&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,0,0,Ft.width,Ft.height,Rt,dt,Ft.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt,It,Ft.width,Ft.height,0,Rt,dt,Ft.data)}}}else{if(J=S.mipmaps,L&&ht){J.length>0&&rt++;const $=Nt(nt[0]);e.texStorage2D(a.TEXTURE_CUBE_MAP,rt,It,$.width,$.height)}for(let $=0;$<6;$++)if(K){L?st&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,nt[$].width,nt[$].height,Rt,dt,nt[$].data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,It,nt[$].width,nt[$].height,0,Rt,dt,nt[$].data);for(let mt=0;mt<J.length;mt++){const oe=J[mt].image[$].image;L?st&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,0,0,oe.width,oe.height,Rt,dt,oe.data):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,It,oe.width,oe.height,0,Rt,dt,oe.data)}}else{L?st&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Rt,dt,nt[$]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,It,Rt,dt,nt[$]);for(let mt=0;mt<J.length;mt++){const Ft=J[mt];L?st&&e.texSubImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,0,0,Rt,dt,Ft.image[$]):e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X+$,mt+1,It,Rt,dt,Ft.image[$])}}}g(S)&&p(a.TEXTURE_CUBE_MAP),X.__version=j.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function pt(D,S,B,Z,j,X){const vt=s.convert(B.format,B.colorSpace),lt=s.convert(B.type),Tt=_(B.internalFormat,vt,lt,B.colorSpace),Mt=i.get(S),K=i.get(B);if(K.__renderTarget=S,!Mt.__hasExternalTextures){const nt=Math.max(1,S.width>>X),Dt=Math.max(1,S.height>>X);j===a.TEXTURE_3D||j===a.TEXTURE_2D_ARRAY?e.texImage3D(j,X,Tt,nt,Dt,S.depth,0,vt,lt,null):e.texImage2D(j,X,Tt,nt,Dt,0,vt,lt,null)}e.bindFramebuffer(a.FRAMEBUFFER,D),xt(S)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,Z,j,K.__webglTexture,0,ae(S)):(j===a.TEXTURE_2D||j>=a.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=a.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&a.framebufferTexture2D(a.FRAMEBUFFER,Z,j,K.__webglTexture,X),e.bindFramebuffer(a.FRAMEBUFFER,null)}function Ut(D,S,B){if(a.bindRenderbuffer(a.RENDERBUFFER,D),S.depthBuffer){const Z=S.depthTexture,j=Z&&Z.isDepthTexture?Z.type:null,X=v(S.stencilBuffer,j),vt=S.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,lt=ae(S);xt(S)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,lt,X,S.width,S.height):B?a.renderbufferStorageMultisample(a.RENDERBUFFER,lt,X,S.width,S.height):a.renderbufferStorage(a.RENDERBUFFER,X,S.width,S.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,vt,a.RENDERBUFFER,D)}else{const Z=S.textures;for(let j=0;j<Z.length;j++){const X=Z[j],vt=s.convert(X.format,X.colorSpace),lt=s.convert(X.type),Tt=_(X.internalFormat,vt,lt,X.colorSpace),Mt=ae(S);B&&xt(S)===!1?a.renderbufferStorageMultisample(a.RENDERBUFFER,Mt,Tt,S.width,S.height):xt(S)?o.renderbufferStorageMultisampleEXT(a.RENDERBUFFER,Mt,Tt,S.width,S.height):a.renderbufferStorage(a.RENDERBUFFER,Tt,S.width,S.height)}}a.bindRenderbuffer(a.RENDERBUFFER,null)}function _t(D,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(a.FRAMEBUFFER,D),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=i.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),H(S.depthTexture,0);const j=Z.__webglTexture,X=ae(S);if(S.depthTexture.format===rs)xt(S)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,j,0,X):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_ATTACHMENT,a.TEXTURE_2D,j,0);else if(S.depthTexture.format===as)xt(S)?o.framebufferTexture2DMultisampleEXT(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,j,0,X):a.framebufferTexture2D(a.FRAMEBUFFER,a.DEPTH_STENCIL_ATTACHMENT,a.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Bt(D){const S=i.get(D),B=D.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==D.depthTexture){const Z=D.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const j=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",j)};Z.addEventListener("dispose",j),S.__depthDisposeCallback=j}S.__boundDepthTexture=Z}if(D.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");const Z=D.texture.mipmaps;Z&&Z.length>0?_t(S.__webglFramebuffer[0],D):_t(S.__webglFramebuffer,D)}else if(B){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(a.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=a.createRenderbuffer(),Ut(S.__webglDepthbuffer[Z],D,!1);else{const j=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,X=S.__webglDepthbuffer[Z];a.bindRenderbuffer(a.RENDERBUFFER,X),a.framebufferRenderbuffer(a.FRAMEBUFFER,j,a.RENDERBUFFER,X)}}else{const Z=D.texture.mipmaps;if(Z&&Z.length>0?e.bindFramebuffer(a.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(a.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=a.createRenderbuffer(),Ut(S.__webglDepthbuffer,D,!1);else{const j=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,X=S.__webglDepthbuffer;a.bindRenderbuffer(a.RENDERBUFFER,X),a.framebufferRenderbuffer(a.FRAMEBUFFER,j,a.RENDERBUFFER,X)}}e.bindFramebuffer(a.FRAMEBUFFER,null)}function Te(D,S,B){const Z=i.get(D);S!==void 0&&pt(Z.__webglFramebuffer,D,D.texture,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,0),B!==void 0&&Bt(D)}function kt(D){const S=D.texture,B=i.get(D),Z=i.get(S);D.addEventListener("dispose",A);const j=D.textures,X=D.isWebGLCubeRenderTarget===!0,vt=j.length>1;if(vt||(Z.__webglTexture===void 0&&(Z.__webglTexture=a.createTexture()),Z.__version=S.version,r.memory.textures++),X){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let Tt=0;Tt<S.mipmaps.length;Tt++)B.__webglFramebuffer[lt][Tt]=a.createFramebuffer()}else B.__webglFramebuffer[lt]=a.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<S.mipmaps.length;lt++)B.__webglFramebuffer[lt]=a.createFramebuffer()}else B.__webglFramebuffer=a.createFramebuffer();if(vt)for(let lt=0,Tt=j.length;lt<Tt;lt++){const Mt=i.get(j[lt]);Mt.__webglTexture===void 0&&(Mt.__webglTexture=a.createTexture(),r.memory.textures++)}if(D.samples>0&&xt(D)===!1){B.__webglMultisampledFramebuffer=a.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(a.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<j.length;lt++){const Tt=j[lt];B.__webglColorRenderbuffer[lt]=a.createRenderbuffer(),a.bindRenderbuffer(a.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Mt=s.convert(Tt.format,Tt.colorSpace),K=s.convert(Tt.type),nt=_(Tt.internalFormat,Mt,K,Tt.colorSpace,D.isXRRenderTarget===!0),Dt=ae(D);a.renderbufferStorageMultisample(a.RENDERBUFFER,Dt,nt,D.width,D.height),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+lt,a.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}a.bindRenderbuffer(a.RENDERBUFFER,null),D.depthBuffer&&(B.__webglDepthRenderbuffer=a.createRenderbuffer(),Ut(B.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(a.FRAMEBUFFER,null)}}if(X){e.bindTexture(a.TEXTURE_CUBE_MAP,Z.__webglTexture),Vt(a.TEXTURE_CUBE_MAP,S);for(let lt=0;lt<6;lt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Tt=0;Tt<S.mipmaps.length;Tt++)pt(B.__webglFramebuffer[lt][Tt],D,S,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+lt,Tt);else pt(B.__webglFramebuffer[lt],D,S,a.COLOR_ATTACHMENT0,a.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(S)&&p(a.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(vt){for(let lt=0,Tt=j.length;lt<Tt;lt++){const Mt=j[lt],K=i.get(Mt);let nt=a.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(nt=D.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),e.bindTexture(nt,K.__webglTexture),Vt(nt,Mt),pt(B.__webglFramebuffer,D,Mt,a.COLOR_ATTACHMENT0+lt,nt,0),g(Mt)&&p(nt)}e.unbindTexture()}else{let lt=a.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(lt=D.isWebGL3DRenderTarget?a.TEXTURE_3D:a.TEXTURE_2D_ARRAY),e.bindTexture(lt,Z.__webglTexture),Vt(lt,S),S.mipmaps&&S.mipmaps.length>0)for(let Tt=0;Tt<S.mipmaps.length;Tt++)pt(B.__webglFramebuffer[Tt],D,S,a.COLOR_ATTACHMENT0,lt,Tt);else pt(B.__webglFramebuffer,D,S,a.COLOR_ATTACHMENT0,lt,0);g(S)&&p(lt),e.unbindTexture()}D.depthBuffer&&Bt(D)}function he(D){const S=D.textures;for(let B=0,Z=S.length;B<Z;B++){const j=S[B];if(g(j)){const X=b(D),vt=i.get(j).__webglTexture;e.bindTexture(X,vt),p(X),e.unbindTexture()}}}const I=[],Xt=[];function qt(D){if(D.samples>0){if(xt(D)===!1){const S=D.textures,B=D.width,Z=D.height;let j=a.COLOR_BUFFER_BIT;const X=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT,vt=i.get(D),lt=S.length>1;if(lt)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(a.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Mt,a.RENDERBUFFER,null),e.bindFramebuffer(a.FRAMEBUFFER,vt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Mt,a.TEXTURE_2D,null,0);e.bindFramebuffer(a.READ_FRAMEBUFFER,vt.__webglMultisampledFramebuffer);const Tt=D.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(a.DRAW_FRAMEBUFFER,vt.__webglFramebuffer[0]):e.bindFramebuffer(a.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(j|=a.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(j|=a.STENCIL_BUFFER_BIT)),lt){a.framebufferRenderbuffer(a.READ_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.RENDERBUFFER,vt.__webglColorRenderbuffer[Mt]);const K=i.get(S[Mt]).__webglTexture;a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,K,0)}a.blitFramebuffer(0,0,B,Z,0,0,B,Z,j,a.NEAREST),l===!0&&(I.length=0,Xt.length=0,I.push(a.COLOR_ATTACHMENT0+Mt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(I.push(X),Xt.push(X),a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,Xt)),a.invalidateFramebuffer(a.READ_FRAMEBUFFER,I))}if(e.bindFramebuffer(a.READ_FRAMEBUFFER,null),e.bindFramebuffer(a.DRAW_FRAMEBUFFER,null),lt)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(a.FRAMEBUFFER,vt.__webglMultisampledFramebuffer),a.framebufferRenderbuffer(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0+Mt,a.RENDERBUFFER,vt.__webglColorRenderbuffer[Mt]);const K=i.get(S[Mt]).__webglTexture;e.bindFramebuffer(a.FRAMEBUFFER,vt.__webglFramebuffer),a.framebufferTexture2D(a.DRAW_FRAMEBUFFER,a.COLOR_ATTACHMENT0+Mt,a.TEXTURE_2D,K,0)}e.bindFramebuffer(a.DRAW_FRAMEBUFFER,vt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const S=D.stencilBuffer?a.DEPTH_STENCIL_ATTACHMENT:a.DEPTH_ATTACHMENT;a.invalidateFramebuffer(a.DRAW_FRAMEBUFFER,[S])}}}function ae(D){return Math.min(n.maxSamples,D.samples)}function xt(D){const S=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ce(D){const S=r.render.frame;c.get(D)!==S&&(c.set(D,S),D.update())}function wt(D,S){const B=D.colorSpace,Z=D.format,j=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||B!==On&&B!==Vi&&(jt.getTransfer(B)===ie?(Z!==ci||j!==yi)&&Lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):fe("WebGLTextures: Unsupported texture color space:",B)),S}function Nt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(h.width=D.naturalWidth||D.width,h.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(h.width=D.displayWidth,h.height=D.displayHeight):(h.width=D.width,h.height=D.height),h}this.allocateTextureUnit=F,this.resetTextureUnits=P,this.setTexture2D=H,this.setTexture2DArray=V,this.setTexture3D=Q,this.setTextureCube=W,this.rebindTextures=Te,this.setupRenderTarget=kt,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=Bt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=xt}function vm(a,t){function e(i,n=Vi){let s;const r=jt.getTransfer(n);if(i===yi)return a.UNSIGNED_BYTE;if(i===Ha)return a.UNSIGNED_SHORT_4_4_4_4;if(i===Va)return a.UNSIGNED_SHORT_5_5_5_1;if(i===Rl)return a.UNSIGNED_INT_5_9_9_9_REV;if(i===Cl)return a.UNSIGNED_INT_10F_11F_11F_REV;if(i===El)return a.BYTE;if(i===Al)return a.SHORT;if(i===ns)return a.UNSIGNED_SHORT;if(i===ka)return a.INT;if(i===on)return a.UNSIGNED_INT;if(i===Mi)return a.FLOAT;if(i===kn)return a.HALF_FLOAT;if(i===Dl)return a.ALPHA;if(i===Pl)return a.RGB;if(i===ci)return a.RGBA;if(i===rs)return a.DEPTH_COMPONENT;if(i===as)return a.DEPTH_STENCIL;if(i===Wa)return a.RED;if(i===Xa)return a.RED_INTEGER;if(i===qa)return a.RG;if(i===Za)return a.RG_INTEGER;if(i===$a)return a.RGBA_INTEGER;if(i===Hs||i===Vs||i===Ws||i===Xs)if(r===ie)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Hs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Hs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Vs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ws)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ra||i===aa||i===oa||i===la)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ra)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===aa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===oa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===la)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ha||i===ca||i===da)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ha||i===ca)return r===ie?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===da)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ua||i===fa||i===pa||i===ma||i===ga||i===xa||i===_a||i===Ma||i===va||i===ya||i===ba||i===Sa||i===wa||i===Ta)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ua)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fa)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pa)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ma)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ga)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xa)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_a)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ma)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===va)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ya)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ba)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sa)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===wa)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ta)return r===ie?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ea||i===Aa||i===Ra)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Ea)return r===ie?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Aa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ra)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ca||i===Da||i===Pa||i===Ia)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ca)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Da)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Pa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ia)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ss?a.UNSIGNED_INT_24_8:a[i]!==void 0?a[i]:null}return{convert:e}}const ym=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bm=`
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

}`;class Sm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Zl(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new bi({vertexShader:ym,fragmentShader:bm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Qt(new Ui(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wm extends dn{constructor(t,e){super();const i=this;let n=null,s=1,r=null,o="local-floor",l=1,h=null,c=null,d=null,u=null,f=null,m=null;const x=typeof XRWebGLBinding<"u",g=new Sm,p={},b=e.getContextAttributes();let _=null,v=null;const w=[],M=[],A=new yt;let R=null;const T=new li;T.viewport=new ge;const y=new li;y.viewport=new ge;const C=[T,y],P=new Gc;let F=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Y=w[q];return Y===void 0&&(Y=new Ir,w[q]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(q){let Y=w[q];return Y===void 0&&(Y=new Ir,w[q]=Y),Y.getGripSpace()},this.getHand=function(q){let Y=w[q];return Y===void 0&&(Y=new Ir,w[q]=Y),Y.getHandSpace()};function H(q){const Y=M.indexOf(q.inputSource);if(Y===-1)return;const pt=w[Y];pt!==void 0&&(pt.update(q.inputSource,q.frame,h||r),pt.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){n.removeEventListener("select",H),n.removeEventListener("selectstart",H),n.removeEventListener("selectend",H),n.removeEventListener("squeeze",H),n.removeEventListener("squeezestart",H),n.removeEventListener("squeezeend",H),n.removeEventListener("end",V),n.removeEventListener("inputsourceschange",Q);for(let q=0;q<w.length;q++){const Y=M[q];Y!==null&&(M[q]=null,w[q].disconnect(Y))}F=null,O=null,g.reset();for(const q in p)delete p[q];t.setRenderTarget(_),f=null,u=null,d=null,n=null,v=null,Wt.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&Lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&Lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||r},this.setReferenceSpace=function(q){h=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(n,e)),d},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function(q){if(n=q,n!==null){if(_=t.getRenderTarget(),n.addEventListener("select",H),n.addEventListener("selectstart",H),n.addEventListener("selectend",H),n.addEventListener("squeeze",H),n.addEventListener("squeezestart",H),n.addEventListener("squeezeend",H),n.addEventListener("end",V),n.addEventListener("inputsourceschange",Q),b.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Ut=null,_t=null;b.depth&&(_t=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=b.stencil?as:rs,Ut=b.stencil?ss:on);const Bt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Bt),n.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new hn(u.textureWidth,u.textureHeight,{format:ci,type:yi,depthTexture:new ql(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const pt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,e,pt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new hn(f.framebufferWidth,f.framebufferHeight,{format:ci,type:yi,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),h=null,r=await n.requestReferenceSpace(o),Wt.setContext(n),Wt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(q){for(let Y=0;Y<q.removed.length;Y++){const pt=q.removed[Y],Ut=M.indexOf(pt);Ut>=0&&(M[Ut]=null,w[Ut].disconnect(pt))}for(let Y=0;Y<q.added.length;Y++){const pt=q.added[Y];let Ut=M.indexOf(pt);if(Ut===-1){for(let Bt=0;Bt<w.length;Bt++)if(Bt>=M.length){M.push(pt),Ut=Bt;break}else if(M[Bt]===null){M[Bt]=pt,Ut=Bt;break}if(Ut===-1)break}const _t=w[Ut];_t&&_t.connect(pt)}}const W=new U,tt=new U;function it(q,Y,pt){W.setFromMatrixPosition(Y.matrixWorld),tt.setFromMatrixPosition(pt.matrixWorld);const Ut=W.distanceTo(tt),_t=Y.projectionMatrix.elements,Bt=pt.projectionMatrix.elements,Te=_t[14]/(_t[10]-1),kt=_t[14]/(_t[10]+1),he=(_t[9]+1)/_t[5],I=(_t[9]-1)/_t[5],Xt=(_t[8]-1)/_t[0],qt=(Bt[8]+1)/Bt[0],ae=Te*Xt,xt=Te*qt,ce=Ut/(-Xt+qt),wt=ce*-Xt;if(Y.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(wt),q.translateZ(ce),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),_t[10]===-1)q.projectionMatrix.copy(Y.projectionMatrix),q.projectionMatrixInverse.copy(Y.projectionMatrixInverse);else{const Nt=Te+ce,D=kt+ce,S=ae-wt,B=xt+(Ut-wt),Z=he*kt/D*Nt,j=I*kt/D*Nt;q.projectionMatrix.makePerspective(S,B,Z,j,Nt,D),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function bt(q,Y){Y===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Y.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(n===null)return;let Y=q.near,pt=q.far;g.texture!==null&&(g.depthNear>0&&(Y=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),P.near=y.near=T.near=Y,P.far=y.far=T.far=pt,(F!==P.near||O!==P.far)&&(n.updateRenderState({depthNear:P.near,depthFar:P.far}),F=P.near,O=P.far),P.layers.mask=q.layers.mask|6,T.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const Ut=q.parent,_t=P.cameras;bt(P,Ut);for(let Bt=0;Bt<_t.length;Bt++)bt(_t[Bt],Ut);_t.length===2?it(P,T,y):P.projectionMatrix.copy(T.projectionMatrix),Vt(q,P,Ut)};function Vt(q,Y,pt){pt===null?q.matrix.copy(Y.matrixWorld):(q.matrix.copy(pt.matrixWorld),q.matrix.invert(),q.matrix.multiply(Y.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Y.projectionMatrix),q.projectionMatrixInverse.copy(Y.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ua*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(q){return p[q]};let Gt=null;function $t(q,Y){if(c=Y.getViewerPose(h||r),m=Y,c!==null){const pt=c.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let Ut=!1;pt.length!==P.cameras.length&&(P.cameras.length=0,Ut=!0);for(let kt=0;kt<pt.length;kt++){const he=pt[kt];let I=null;if(f!==null)I=f.getViewport(he);else{const qt=d.getViewSubImage(u,he);I=qt.viewport,kt===0&&(t.setRenderTargetTextures(v,qt.colorTexture,qt.depthStencilTexture),t.setRenderTarget(v))}let Xt=C[kt];Xt===void 0&&(Xt=new li,Xt.layers.enable(kt),Xt.viewport=new ge,C[kt]=Xt),Xt.matrix.fromArray(he.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(he.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(I.x,I.y,I.width,I.height),kt===0&&(P.matrix.copy(Xt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ut===!0&&P.cameras.push(Xt)}const _t=n.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const kt=d.getDepthInformation(pt[0]);kt&&kt.isValid&&kt.texture&&g.init(kt,n.renderState)}if(_t&&_t.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let kt=0;kt<pt.length;kt++){const he=pt[kt].camera;if(he){let I=p[he];I||(I=new Zl,p[he]=I);const Xt=d.getCameraImage(he);I.sourceTexture=Xt}}}}for(let pt=0;pt<w.length;pt++){const Ut=M[pt],_t=w[pt];Ut!==null&&_t!==void 0&&_t.update(Ut,Y,h||r)}Gt&&Gt(q,Y),Y.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Y}),m=null}const Wt=new Yl;Wt.setAnimationLoop($t),this.setAnimationLoop=function(q){Gt=q},this.dispose=function(){}}}const nn=new fi,Tm=new Jt;function Em(a,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Bl(a)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function n(g,p,b,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),d(g,p)):p.isMeshPhongMaterial?(s(g,p),c(g,p)):p.isMeshStandardMaterial?(s(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),x(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(r(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,b,_):p.isSpriteMaterial?h(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===ke&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===ke&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const b=t.get(p),_=b.envMap,v=b.envMapRotation;_&&(g.envMap.value=_,nn.copy(v),nn.x*=-1,nn.y*=-1,nn.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(nn.y*=-1,nn.z*=-1),g.envMapRotation.value.setFromMatrix4(Tm.makeRotationFromEuler(nn)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function r(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,b,_){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=_*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ke&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function Am(a,t,e,i){let n={},s={},r=[];const o=a.getParameter(a.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,_){const v=_.program;i.uniformBlockBinding(b,v)}function h(b,_){let v=n[b.id];v===void 0&&(m(b),v=c(b),n[b.id]=v,b.addEventListener("dispose",g));const w=_.program;i.updateUBOMapping(b,w);const M=t.render.frame;s[b.id]!==M&&(u(b),s[b.id]=M)}function c(b){const _=d();b.__bindingPointIndex=_;const v=a.createBuffer(),w=b.__size,M=b.usage;return a.bindBuffer(a.UNIFORM_BUFFER,v),a.bufferData(a.UNIFORM_BUFFER,w,M),a.bindBuffer(a.UNIFORM_BUFFER,null),a.bindBufferBase(a.UNIFORM_BUFFER,_,v),v}function d(){for(let b=0;b<o;b++)if(r.indexOf(b)===-1)return r.push(b),b;return fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const _=n[b.id],v=b.uniforms,w=b.__cache;a.bindBuffer(a.UNIFORM_BUFFER,_);for(let M=0,A=v.length;M<A;M++){const R=Array.isArray(v[M])?v[M]:[v[M]];for(let T=0,y=R.length;T<y;T++){const C=R[T];if(f(C,M,T,w)===!0){const P=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let O=0;for(let H=0;H<F.length;H++){const V=F[H],Q=x(V);typeof V=="number"||typeof V=="boolean"?(C.__data[0]=V,a.bufferSubData(a.UNIFORM_BUFFER,P+O,C.__data)):V.isMatrix3?(C.__data[0]=V.elements[0],C.__data[1]=V.elements[1],C.__data[2]=V.elements[2],C.__data[3]=0,C.__data[4]=V.elements[3],C.__data[5]=V.elements[4],C.__data[6]=V.elements[5],C.__data[7]=0,C.__data[8]=V.elements[6],C.__data[9]=V.elements[7],C.__data[10]=V.elements[8],C.__data[11]=0):(V.toArray(C.__data,O),O+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}a.bufferSubData(a.UNIFORM_BUFFER,P,C.__data)}}}a.bindBuffer(a.UNIFORM_BUFFER,null)}function f(b,_,v,w){const M=b.value,A=_+"_"+v;if(w[A]===void 0)return typeof M=="number"||typeof M=="boolean"?w[A]=M:w[A]=M.clone(),!0;{const R=w[A];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return w[A]=M,!0}else if(R.equals(M)===!1)return R.copy(M),!0}return!1}function m(b){const _=b.uniforms;let v=0;const w=16;for(let A=0,R=_.length;A<R;A++){const T=Array.isArray(_[A])?_[A]:[_[A]];for(let y=0,C=T.length;y<C;y++){const P=T[y],F=Array.isArray(P.value)?P.value:[P.value];for(let O=0,H=F.length;O<H;O++){const V=F[O],Q=x(V),W=v%w,tt=W%Q.boundary,it=W+tt;v+=tt,it!==0&&w-it<Q.storage&&(v+=w-it),P.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=Q.storage}}}const M=v%w;return M>0&&(v+=w-M),b.__size=v,b.__cache={},this}function x(b){const _={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(_.boundary=4,_.storage=4):b.isVector2?(_.boundary=8,_.storage=8):b.isVector3||b.isColor?(_.boundary=16,_.storage=12):b.isVector4?(_.boundary=16,_.storage=16):b.isMatrix3?(_.boundary=48,_.storage=48):b.isMatrix4?(_.boundary=64,_.storage=64):b.isTexture?Lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Lt("WebGLRenderer: Unsupported uniform value type.",b),_}function g(b){const _=b.target;_.removeEventListener("dispose",g);const v=r.indexOf(_.__bindingPointIndex);r.splice(v,1),a.deleteBuffer(n[_.id]),delete n[_.id],delete s[_.id]}function p(){for(const b in n)a.deleteBuffer(n[b]);r=[],n={},s={}}return{bind:l,update:h,dispose:p}}const Rm=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Ri=null;function Cm(){return Ri===null&&(Ri=new Vl(Rm,32,32,qa,kn),Ri.minFilter=ti,Ri.magFilter=ti,Ri.wrapS=Di,Ri.wrapT=Di,Ri.generateMipmaps=!1,Ri.needsUpdate=!0),Ri}class Dm{constructor(t={}){const{canvas:e=jh(),context:i=null,depth:n=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=r;const m=new Set([$a,Za,Xa]),x=new Set([yi,on,ns,ss,Ha,Va]),g=new Uint32Array(4),p=new Int32Array(4);let b=null,_=null;const v=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let A=!1;this._outputColorSpace=Ze;let R=0,T=0,y=null,C=-1,P=null;const F=new ge,O=new ge;let H=null;const V=new ut(0);let Q=0,W=e.width,tt=e.height,it=1,bt=null,Vt=null;const Gt=new ge(0,0,W,tt),$t=new ge(0,0,W,tt);let Wt=!1;const q=new cs;let Y=!1,pt=!1;const Ut=new Jt,_t=new U,Bt=new ge,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let kt=!1;function he(){return y===null?it:1}let I=i;function Xt(E,N){return e.getContext(E,N)}try{const E={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Oa}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",mt,!1),I===null){const N="webgl2";if(I=Xt(N,E),I===null)throw Xt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw E("WebGLRenderer: "+E.message),E}let qt,ae,xt,ce,wt,Nt,D,S,B,Z,j,X,vt,lt,Tt,Mt,K,nt,Dt,Rt,dt,It,L,ht;function st(){qt=new Bf(I),qt.init(),It=new vm(I,qt),ae=new Cf(I,qt,t,It),xt=new _m(I,qt),ae.reversedDepthBuffer&&u&&xt.buffers.depth.setReversed(!0),ce=new kf(I),wt=new rm,Nt=new Mm(I,qt,xt,wt,ae,It,ce),D=new Pf(M),S=new zf(M),B=new Wc(I),L=new Af(I,B),Z=new Of(I,B,ce,L),j=new Vf(I,Z,B,ce),Dt=new Hf(I,ae,Nt),Mt=new Df(wt),X=new sm(M,D,S,qt,ae,L,Mt),vt=new Em(M,wt),lt=new om,Tt=new fm(qt),nt=new Ef(M,D,S,xt,j,f,l),K=new gm(M,j,ae),ht=new Am(I,ce,ae,xt),Rt=new Rf(I,qt,ce),dt=new Gf(I,qt,ce),ce.programs=X.programs,M.capabilities=ae,M.extensions=qt,M.properties=wt,M.renderLists=lt,M.shadowMap=K,M.state=xt,M.info=ce}st();const rt=new wm(M,I);this.xr=rt,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const E=qt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=qt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(E){E!==void 0&&(it=E,this.setSize(W,tt,!1))},this.getSize=function(E){return E.set(W,tt)},this.setSize=function(E,N,G=!0){if(rt.isPresenting){Lt("WebGLRenderer: Can't change size while VR device is presenting.");return}W=E,tt=N,e.width=Math.floor(E*it),e.height=Math.floor(N*it),G===!0&&(e.style.width=E+"px",e.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(W*it,tt*it).floor()},this.setDrawingBufferSize=function(E,N,G){W=E,tt=N,it=G,e.width=Math.floor(E*G),e.height=Math.floor(N*G),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(F)},this.getViewport=function(E){return E.copy(Gt)},this.setViewport=function(E,N,G,k){E.isVector4?Gt.set(E.x,E.y,E.z,E.w):Gt.set(E,N,G,k),xt.viewport(F.copy(Gt).multiplyScalar(it).round())},this.getScissor=function(E){return E.copy($t)},this.setScissor=function(E,N,G,k){E.isVector4?$t.set(E.x,E.y,E.z,E.w):$t.set(E,N,G,k),xt.scissor(O.copy($t).multiplyScalar(it).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(E){xt.setScissorTest(Wt=E)},this.setOpaqueSort=function(E){bt=E},this.setTransparentSort=function(E){Vt=E},this.getClearColor=function(E){return E.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(E=!0,N=!0,G=!0){let k=0;if(E){let z=!1;if(y!==null){const et=y.texture.format;z=m.has(et)}if(z){const et=y.texture.type,ct=x.has(et),gt=nt.getClearColor(),ft=nt.getClearAlpha(),Ct=gt.r,Pt=gt.g,St=gt.b;ct?(g[0]=Ct,g[1]=Pt,g[2]=St,g[3]=ft,I.clearBufferuiv(I.COLOR,0,g)):(p[0]=Ct,p[1]=Pt,p[2]=St,p[3]=ft,I.clearBufferiv(I.COLOR,0,p))}else k|=I.COLOR_BUFFER_BIT}N&&(k|=I.DEPTH_BUFFER_BIT),G&&(k|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),nt.dispose(),lt.dispose(),Tt.dispose(),wt.dispose(),D.dispose(),S.dispose(),j.dispose(),L.dispose(),ht.dispose(),X.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",io),rt.removeEventListener("sessionend",no),Yi.stop()};function J(E){E.preventDefault(),Ks("WebGLRenderer: Context Lost."),A=!0}function $(){Ks("WebGLRenderer: Context Restored."),A=!1;const E=ce.autoReset,N=K.enabled,G=K.autoUpdate,k=K.needsUpdate,z=K.type;st(),ce.autoReset=E,K.enabled=N,K.autoUpdate=G,K.needsUpdate=k,K.type=z}function mt(E){fe("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Ft(E){const N=E.target;N.removeEventListener("dispose",Ft),oe(N)}function oe(E){te(E),wt.remove(E)}function te(E){const N=wt.get(E).programs;N!==void 0&&(N.forEach(function(G){X.releaseProgram(G)}),E.isShaderMaterial&&X.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,G,k,z,et){N===null&&(N=Te);const ct=z.isMesh&&z.matrixWorld.determinant()<0,gt=nh(E,N,G,k,z);xt.setMaterial(k,ct);let ft=G.index,Ct=1;if(k.wireframe===!0){if(ft=Z.getWireframeAttribute(G),ft===void 0)return;Ct=2}const Pt=G.drawRange,St=G.attributes.position;let Zt=Pt.start*Ct,ee=(Pt.start+Pt.count)*Ct;et!==null&&(Zt=Math.max(Zt,et.start*Ct),ee=Math.min(ee,(et.start+et.count)*Ct)),ft!==null?(Zt=Math.max(Zt,0),ee=Math.min(ee,ft.count)):St!=null&&(Zt=Math.max(Zt,0),ee=Math.min(ee,St.count));const pe=ee-Zt;if(pe<0||pe===1/0)return;L.setup(z,k,gt,G,ft);let me,re=Rt;if(ft!==null&&(me=B.get(ft),re=dt,re.setIndex(me)),z.isMesh)k.wireframe===!0?(xt.setLineWidth(k.wireframeLinewidth*he()),re.setMode(I.LINES)):re.setMode(I.TRIANGLES);else if(z.isLine){let Et=k.linewidth;Et===void 0&&(Et=1),xt.setLineWidth(Et*he()),z.isLineSegments?re.setMode(I.LINES):z.isLineLoop?re.setMode(I.LINE_LOOP):re.setMode(I.LINE_STRIP)}else z.isPoints?re.setMode(I.POINTS):z.isSprite&&re.setMode(I.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)os("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),re.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(qt.get("WEBGL_multi_draw"))re.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Et=z._multiDrawStarts,de=z._multiDrawCounts,Yt=z._multiDrawCount,Ve=ft?B.get(ft).bytesPerElement:1,fn=wt.get(k).currentProgram.getUniforms();for(let We=0;We<Yt;We++)fn.setValue(I,"_gl_DrawID",We),re.render(Et[We]/Ve,de[We])}else if(z.isInstancedMesh)re.renderInstances(Zt,pe,z.count);else if(G.isInstancedBufferGeometry){const Et=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,de=Math.min(G.instanceCount,Et);re.renderInstances(Zt,pe,de)}else re.render(Zt,pe)};function mi(E,N,G){E.transparent===!0&&E.side===$e&&E.forceSinglePass===!1?(E.side=ke,E.needsUpdate=!0,us(E,N,G),E.side=$i,E.needsUpdate=!0,us(E,N,G),E.side=$e):us(E,N,G)}this.compile=function(E,N,G=null){G===null&&(G=E),_=Tt.get(G),_.init(N),w.push(_),G.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(_.pushLight(z),z.castShadow&&_.pushShadow(z))}),E!==G&&E.traverseVisible(function(z){z.isLight&&z.layers.test(N.layers)&&(_.pushLight(z),z.castShadow&&_.pushShadow(z))}),_.setupLights();const k=new Set;return E.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const et=z.material;if(et)if(Array.isArray(et))for(let ct=0;ct<et.length;ct++){const gt=et[ct];mi(gt,G,z),k.add(gt)}else mi(et,G,z),k.add(et)}),_=w.pop(),k},this.compileAsync=function(E,N,G=null){const k=this.compile(E,N,G);return new Promise(z=>{function et(){if(k.forEach(function(ct){wt.get(ct).currentProgram.isReady()&&k.delete(ct)}),k.size===0){z(E);return}setTimeout(et,10)}qt.get("KHR_parallel_shader_compile")!==null?et():setTimeout(et,10)})};let si=null;function ih(E){si&&si(E)}function io(){Yi.stop()}function no(){Yi.start()}const Yi=new Yl;Yi.setAnimationLoop(ih),typeof self<"u"&&Yi.setContext(self),this.setAnimationLoop=function(E){si=E,rt.setAnimationLoop(E),E===null?Yi.stop():Yi.start()},rt.addEventListener("sessionstart",io),rt.addEventListener("sessionend",no),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(N),N=rt.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,N,y),_=Tt.get(E,w.length),_.init(N),w.push(_),Ut.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),q.setFromProjectionMatrix(Ut,vi,N.reversedDepth),pt=this.localClippingEnabled,Y=Mt.init(this.clippingPlanes,pt),b=lt.get(E,v.length),b.init(),v.push(b),rt.enabled===!0&&rt.isPresenting===!0){const et=M.xr.getDepthSensingMesh();et!==null&&lr(et,N,-1/0,M.sortObjects)}lr(E,N,0,M.sortObjects),b.finish(),M.sortObjects===!0&&b.sort(bt,Vt),kt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,kt&&nt.addToRenderList(b,E),this.info.render.frame++,Y===!0&&Mt.beginShadows();const G=_.state.shadowsArray;K.render(G,E,N),Y===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=b.opaque,z=b.transmissive;if(_.setupLights(),N.isArrayCamera){const et=N.cameras;if(z.length>0)for(let ct=0,gt=et.length;ct<gt;ct++){const ft=et[ct];ro(k,z,E,ft)}kt&&nt.render(E);for(let ct=0,gt=et.length;ct<gt;ct++){const ft=et[ct];so(b,E,ft,ft.viewport)}}else z.length>0&&ro(k,z,E,N),kt&&nt.render(E),so(b,E,N);y!==null&&T===0&&(Nt.updateMultisampleRenderTarget(y),Nt.updateRenderTargetMipmap(y)),E.isScene===!0&&E.onAfterRender(M,E,N),L.resetDefaultState(),C=-1,P=null,w.pop(),w.length>0?(_=w[w.length-1],Y===!0&&Mt.setGlobalState(M.clippingPlanes,_.state.camera)):_=null,v.pop(),v.length>0?b=v[v.length-1]:b=null};function lr(E,N,G,k){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)_.pushLight(E),E.castShadow&&_.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||q.intersectsSprite(E)){k&&Bt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ut);const ct=j.update(E),gt=E.material;gt.visible&&b.push(E,ct,gt,G,Bt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||q.intersectsObject(E))){const ct=j.update(E),gt=E.material;if(k&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Bt.copy(E.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Bt.copy(ct.boundingSphere.center)),Bt.applyMatrix4(E.matrixWorld).applyMatrix4(Ut)),Array.isArray(gt)){const ft=ct.groups;for(let Ct=0,Pt=ft.length;Ct<Pt;Ct++){const St=ft[Ct],Zt=gt[St.materialIndex];Zt&&Zt.visible&&b.push(E,ct,Zt,G,Bt.z,St)}}else gt.visible&&b.push(E,ct,gt,G,Bt.z,null)}}const et=E.children;for(let ct=0,gt=et.length;ct<gt;ct++)lr(et[ct],N,G,k)}function so(E,N,G,k){const{opaque:z,transmissive:et,transparent:ct}=E;_.setupLightsView(G),Y===!0&&Mt.setGlobalState(M.clippingPlanes,G),k&&xt.viewport(F.copy(k)),z.length>0&&ds(z,N,G),et.length>0&&ds(et,N,G),ct.length>0&&ds(ct,N,G),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function ro(E,N,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;_.state.transmissionRenderTarget[k.id]===void 0&&(_.state.transmissionRenderTarget[k.id]=new hn(1,1,{generateMipmaps:!0,type:qt.has("EXT_color_buffer_half_float")||qt.has("EXT_color_buffer_float")?kn:yi,minFilter:Wi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:jt.workingColorSpace}));const et=_.state.transmissionRenderTarget[k.id],ct=k.viewport||F;et.setSize(ct.z*M.transmissionResolutionScale,ct.w*M.transmissionResolutionScale);const gt=M.getRenderTarget(),ft=M.getActiveCubeFace(),Ct=M.getActiveMipmapLevel();M.setRenderTarget(et),M.getClearColor(V),Q=M.getClearAlpha(),Q<1&&M.setClearColor(16777215,.5),M.clear(),kt&&nt.render(G);const Pt=M.toneMapping;M.toneMapping=qi;const St=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),_.setupLightsView(k),Y===!0&&Mt.setGlobalState(M.clippingPlanes,k),ds(E,G,k),Nt.updateMultisampleRenderTarget(et),Nt.updateRenderTargetMipmap(et),qt.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let ee=0,pe=N.length;ee<pe;ee++){const me=N[ee],{object:re,geometry:Et,material:de,group:Yt}=me;if(de.side===$e&&re.layers.test(k.layers)){const Ve=de.side;de.side=ke,de.needsUpdate=!0,ao(re,G,k,Et,de,Yt),de.side=Ve,de.needsUpdate=!0,Zt=!0}}Zt===!0&&(Nt.updateMultisampleRenderTarget(et),Nt.updateRenderTargetMipmap(et))}M.setRenderTarget(gt,ft,Ct),M.setClearColor(V,Q),St!==void 0&&(k.viewport=St),M.toneMapping=Pt}function ds(E,N,G){const k=N.isScene===!0?N.overrideMaterial:null;for(let z=0,et=E.length;z<et;z++){const ct=E[z],{object:gt,geometry:ft,group:Ct}=ct;let Pt=ct.material;Pt.allowOverride===!0&&k!==null&&(Pt=k),gt.layers.test(G.layers)&&ao(gt,N,G,ft,Pt,Ct)}}function ao(E,N,G,k,z,et){E.onBeforeRender(M,N,G,k,z,et),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.onBeforeRender(M,N,G,k,E,et),z.transparent===!0&&z.side===$e&&z.forceSinglePass===!1?(z.side=ke,z.needsUpdate=!0,M.renderBufferDirect(G,N,k,z,E,et),z.side=$i,z.needsUpdate=!0,M.renderBufferDirect(G,N,k,z,E,et),z.side=$e):M.renderBufferDirect(G,N,k,z,E,et),E.onAfterRender(M,N,G,k,z,et)}function us(E,N,G){N.isScene!==!0&&(N=Te);const k=wt.get(E),z=_.state.lights,et=_.state.shadowsArray,ct=z.state.version,gt=X.getParameters(E,z.state,et,N,G),ft=X.getProgramCacheKey(gt);let Ct=k.programs;k.environment=E.isMeshStandardMaterial?N.environment:null,k.fog=N.fog,k.envMap=(E.isMeshStandardMaterial?S:D).get(E.envMap||k.environment),k.envMapRotation=k.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Ct===void 0&&(E.addEventListener("dispose",Ft),Ct=new Map,k.programs=Ct);let Pt=Ct.get(ft);if(Pt!==void 0){if(k.currentProgram===Pt&&k.lightsStateVersion===ct)return lo(E,gt),Pt}else gt.uniforms=X.getUniforms(E),E.onBeforeCompile(gt,M),Pt=X.acquireProgram(gt,ft),Ct.set(ft,Pt),k.uniforms=gt.uniforms;const St=k.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(St.clippingPlanes=Mt.uniform),lo(E,gt),k.needsLights=rh(E),k.lightsStateVersion=ct,k.needsLights&&(St.ambientLightColor.value=z.state.ambient,St.lightProbe.value=z.state.probe,St.directionalLights.value=z.state.directional,St.directionalLightShadows.value=z.state.directionalShadow,St.spotLights.value=z.state.spot,St.spotLightShadows.value=z.state.spotShadow,St.rectAreaLights.value=z.state.rectArea,St.ltc_1.value=z.state.rectAreaLTC1,St.ltc_2.value=z.state.rectAreaLTC2,St.pointLights.value=z.state.point,St.pointLightShadows.value=z.state.pointShadow,St.hemisphereLights.value=z.state.hemi,St.directionalShadowMap.value=z.state.directionalShadowMap,St.directionalShadowMatrix.value=z.state.directionalShadowMatrix,St.spotShadowMap.value=z.state.spotShadowMap,St.spotLightMatrix.value=z.state.spotLightMatrix,St.spotLightMap.value=z.state.spotLightMap,St.pointShadowMap.value=z.state.pointShadowMap,St.pointShadowMatrix.value=z.state.pointShadowMatrix),k.currentProgram=Pt,k.uniformsList=null,Pt}function oo(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=Zs.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function lo(E,N){const G=wt.get(E);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.batchingColor=N.batchingColor,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.instancingMorph=N.instancingMorph,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function nh(E,N,G,k,z){N.isScene!==!0&&(N=Te),Nt.resetTextureUnits();const et=N.fog,ct=k.isMeshStandardMaterial?N.environment:null,gt=y===null?M.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:On,ft=(k.isMeshStandardMaterial?S:D).get(k.envMap||ct),Ct=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Pt=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),St=!!G.morphAttributes.position,Zt=!!G.morphAttributes.normal,ee=!!G.morphAttributes.color;let pe=qi;k.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(pe=M.toneMapping);const me=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,re=me!==void 0?me.length:0,Et=wt.get(k),de=_.state.lights;if(Y===!0&&(pt===!0||E!==P)){const Pe=E===P&&k.id===C;Mt.setState(k,E,Pe)}let Yt=!1;k.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==de.state.version||Et.outputColorSpace!==gt||z.isBatchedMesh&&Et.batching===!1||!z.isBatchedMesh&&Et.batching===!0||z.isBatchedMesh&&Et.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Et.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Et.instancing===!1||!z.isInstancedMesh&&Et.instancing===!0||z.isSkinnedMesh&&Et.skinning===!1||!z.isSkinnedMesh&&Et.skinning===!0||z.isInstancedMesh&&Et.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Et.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Et.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Et.instancingMorph===!1&&z.morphTexture!==null||Et.envMap!==ft||k.fog===!0&&Et.fog!==et||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==Mt.numPlanes||Et.numIntersection!==Mt.numIntersection)||Et.vertexAlphas!==Ct||Et.vertexTangents!==Pt||Et.morphTargets!==St||Et.morphNormals!==Zt||Et.morphColors!==ee||Et.toneMapping!==pe||Et.morphTargetsCount!==re)&&(Yt=!0):(Yt=!0,Et.__version=k.version);let Ve=Et.currentProgram;Yt===!0&&(Ve=us(k,N,z));let fn=!1,We=!1,Wn=!1;const ue=Ve.getUniforms(),Be=Et.uniforms;if(xt.useProgram(Ve.program)&&(fn=!0,We=!0,Wn=!0),k.id!==C&&(C=k.id,We=!0),fn||P!==E){xt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),ue.setValue(I,"projectionMatrix",E.projectionMatrix),ue.setValue(I,"viewMatrix",E.matrixWorldInverse);const Oe=ue.map.cameraPosition;Oe!==void 0&&Oe.setValue(I,_t.setFromMatrixPosition(E.matrixWorld)),ae.logarithmicDepthBuffer&&ue.setValue(I,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ue.setValue(I,"isOrthographic",E.isOrthographicCamera===!0),P!==E&&(P=E,We=!0,Wn=!0)}if(z.isSkinnedMesh){ue.setOptional(I,z,"bindMatrix"),ue.setOptional(I,z,"bindMatrixInverse");const Pe=z.skeleton;Pe&&(Pe.boneTexture===null&&Pe.computeBoneTexture(),ue.setValue(I,"boneTexture",Pe.boneTexture,Nt))}z.isBatchedMesh&&(ue.setOptional(I,z,"batchingTexture"),ue.setValue(I,"batchingTexture",z._matricesTexture,Nt),ue.setOptional(I,z,"batchingIdTexture"),ue.setValue(I,"batchingIdTexture",z._indirectTexture,Nt),ue.setOptional(I,z,"batchingColorTexture"),z._colorsTexture!==null&&ue.setValue(I,"batchingColorTexture",z._colorsTexture,Nt));const je=G.morphAttributes;if((je.position!==void 0||je.normal!==void 0||je.color!==void 0)&&Dt.update(z,G,Ve),(We||Et.receiveShadow!==z.receiveShadow)&&(Et.receiveShadow=z.receiveShadow,ue.setValue(I,"receiveShadow",z.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(Be.envMap.value=ft,Be.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&N.environment!==null&&(Be.envMapIntensity.value=N.environmentIntensity),Be.dfgLUT!==void 0&&(Be.dfgLUT.value=Cm()),We&&(ue.setValue(I,"toneMappingExposure",M.toneMappingExposure),Et.needsLights&&sh(Be,Wn),et&&k.fog===!0&&vt.refreshFogUniforms(Be,et),vt.refreshMaterialUniforms(Be,k,it,tt,_.state.transmissionRenderTarget[E.id]),Zs.upload(I,oo(Et),Be,Nt)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Zs.upload(I,oo(Et),Be,Nt),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ue.setValue(I,"center",z.center),ue.setValue(I,"modelViewMatrix",z.modelViewMatrix),ue.setValue(I,"normalMatrix",z.normalMatrix),ue.setValue(I,"modelMatrix",z.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Pe=k.uniformsGroups;for(let Oe=0,hr=Pe.length;Oe<hr;Oe++){const ji=Pe[Oe];ht.update(ji,Ve),ht.bind(ji,Ve)}}return Ve}function sh(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function rh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(E,N,G){const k=wt.get(E);k.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),wt.get(E.texture).__webglTexture=N,wt.get(E.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,N){const G=wt.get(E);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0};const ah=I.createFramebuffer();this.setRenderTarget=function(E,N=0,G=0){y=E,R=N,T=G;let k=!0,z=null,et=!1,ct=!1;if(E){const ft=wt.get(E);if(ft.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(I.FRAMEBUFFER,null),k=!1;else if(ft.__webglFramebuffer===void 0)Nt.setupRenderTarget(E);else if(ft.__hasExternalTextures)Nt.rebindTextures(E,wt.get(E.texture).__webglTexture,wt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const St=E.depthTexture;if(ft.__boundDepthTexture!==St){if(St!==null&&wt.has(St)&&(E.width!==St.image.width||E.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Nt.setupDepthRenderbuffer(E)}}const Ct=E.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ct=!0);const Pt=wt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pt[N])?z=Pt[N][G]:z=Pt[N],et=!0):E.samples>0&&Nt.useMultisampledRTT(E)===!1?z=wt.get(E).__webglMultisampledFramebuffer:Array.isArray(Pt)?z=Pt[G]:z=Pt,F.copy(E.viewport),O.copy(E.scissor),H=E.scissorTest}else F.copy(Gt).multiplyScalar(it).floor(),O.copy($t).multiplyScalar(it).floor(),H=Wt;if(G!==0&&(z=ah),xt.bindFramebuffer(I.FRAMEBUFFER,z)&&k&&xt.drawBuffers(E,z),xt.viewport(F),xt.scissor(O),xt.setScissorTest(H),et){const ft=wt.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+N,ft.__webglTexture,G)}else if(ct){const ft=N;for(let Ct=0;Ct<E.textures.length;Ct++){const Pt=wt.get(E.textures[Ct]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Ct,Pt.__webglTexture,G,ft)}}else if(E!==null&&G!==0){const ft=wt.get(E.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,ft.__webglTexture,G)}C=-1},this.readRenderTargetPixels=function(E,N,G,k,z,et,ct,gt=0){if(!(E&&E.isWebGLRenderTarget)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=wt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft){xt.bindFramebuffer(I.FRAMEBUFFER,ft);try{const Ct=E.textures[gt],Pt=Ct.format,St=Ct.type;if(!ae.textureFormatReadable(Pt)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ae.textureTypeReadable(St)){fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-k&&G>=0&&G<=E.height-z&&(E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+gt),I.readPixels(N,G,k,z,It.convert(Pt),It.convert(St),et))}finally{const Ct=y!==null?wt.get(y).__webglFramebuffer:null;xt.bindFramebuffer(I.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(E,N,G,k,z,et,ct,gt=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=wt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft)if(N>=0&&N<=E.width-k&&G>=0&&G<=E.height-z){xt.bindFramebuffer(I.FRAMEBUFFER,ft);const Ct=E.textures[gt],Pt=Ct.format,St=Ct.type;if(!ae.textureFormatReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ae.textureTypeReadable(St))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Zt=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,Zt),I.bufferData(I.PIXEL_PACK_BUFFER,et.byteLength,I.STREAM_READ),E.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+gt),I.readPixels(N,G,k,z,It.convert(Pt),It.convert(St),0);const ee=y!==null?wt.get(y).__webglFramebuffer:null;xt.bindFramebuffer(I.FRAMEBUFFER,ee);const pe=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Kh(I,pe,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,Zt),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,et),I.deleteBuffer(Zt),I.deleteSync(pe),et}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,N=null,G=0){const k=Math.pow(2,-G),z=Math.floor(E.image.width*k),et=Math.floor(E.image.height*k),ct=N!==null?N.x:0,gt=N!==null?N.y:0;Nt.setTexture2D(E,0),I.copyTexSubImage2D(I.TEXTURE_2D,G,0,0,ct,gt,z,et),xt.unbindTexture()};const oh=I.createFramebuffer(),lh=I.createFramebuffer();this.copyTextureToTexture=function(E,N,G=null,k=null,z=0,et=null){et===null&&(z!==0?(os("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),et=z,z=0):et=0);let ct,gt,ft,Ct,Pt,St,Zt,ee,pe;const me=E.isCompressedTexture?E.mipmaps[et]:E.image;if(G!==null)ct=G.max.x-G.min.x,gt=G.max.y-G.min.y,ft=G.isBox3?G.max.z-G.min.z:1,Ct=G.min.x,Pt=G.min.y,St=G.isBox3?G.min.z:0;else{const je=Math.pow(2,-z);ct=Math.floor(me.width*je),gt=Math.floor(me.height*je),E.isDataArrayTexture?ft=me.depth:E.isData3DTexture?ft=Math.floor(me.depth*je):ft=1,Ct=0,Pt=0,St=0}k!==null?(Zt=k.x,ee=k.y,pe=k.z):(Zt=0,ee=0,pe=0);const re=It.convert(N.format),Et=It.convert(N.type);let de;N.isData3DTexture?(Nt.setTexture3D(N,0),de=I.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Nt.setTexture2DArray(N,0),de=I.TEXTURE_2D_ARRAY):(Nt.setTexture2D(N,0),de=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,N.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,N.unpackAlignment);const Yt=I.getParameter(I.UNPACK_ROW_LENGTH),Ve=I.getParameter(I.UNPACK_IMAGE_HEIGHT),fn=I.getParameter(I.UNPACK_SKIP_PIXELS),We=I.getParameter(I.UNPACK_SKIP_ROWS),Wn=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,me.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,me.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,Ct),I.pixelStorei(I.UNPACK_SKIP_ROWS,Pt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,St);const ue=E.isDataArrayTexture||E.isData3DTexture,Be=N.isDataArrayTexture||N.isData3DTexture;if(E.isDepthTexture){const je=wt.get(E),Pe=wt.get(N),Oe=wt.get(je.__renderTarget),hr=wt.get(Pe.__renderTarget);xt.bindFramebuffer(I.READ_FRAMEBUFFER,Oe.__webglFramebuffer),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,hr.__webglFramebuffer);for(let ji=0;ji<ft;ji++)ue&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,wt.get(E).__webglTexture,z,St+ji),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,wt.get(N).__webglTexture,et,pe+ji)),I.blitFramebuffer(Ct,Pt,ct,gt,Zt,ee,ct,gt,I.DEPTH_BUFFER_BIT,I.NEAREST);xt.bindFramebuffer(I.READ_FRAMEBUFFER,null),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(z!==0||E.isRenderTargetTexture||wt.has(E)){const je=wt.get(E),Pe=wt.get(N);xt.bindFramebuffer(I.READ_FRAMEBUFFER,oh),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,lh);for(let Oe=0;Oe<ft;Oe++)ue?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,je.__webglTexture,z,St+Oe):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,je.__webglTexture,z),Be?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Pe.__webglTexture,et,pe+Oe):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Pe.__webglTexture,et),z!==0?I.blitFramebuffer(Ct,Pt,ct,gt,Zt,ee,ct,gt,I.COLOR_BUFFER_BIT,I.NEAREST):Be?I.copyTexSubImage3D(de,et,Zt,ee,pe+Oe,Ct,Pt,ct,gt):I.copyTexSubImage2D(de,et,Zt,ee,Ct,Pt,ct,gt);xt.bindFramebuffer(I.READ_FRAMEBUFFER,null),xt.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Be?E.isDataTexture||E.isData3DTexture?I.texSubImage3D(de,et,Zt,ee,pe,ct,gt,ft,re,Et,me.data):N.isCompressedArrayTexture?I.compressedTexSubImage3D(de,et,Zt,ee,pe,ct,gt,ft,re,me.data):I.texSubImage3D(de,et,Zt,ee,pe,ct,gt,ft,re,Et,me):E.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,et,Zt,ee,ct,gt,re,Et,me.data):E.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,et,Zt,ee,me.width,me.height,re,me.data):I.texSubImage2D(I.TEXTURE_2D,et,Zt,ee,ct,gt,re,Et,me);I.pixelStorei(I.UNPACK_ROW_LENGTH,Yt),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Ve),I.pixelStorei(I.UNPACK_SKIP_PIXELS,fn),I.pixelStorei(I.UNPACK_SKIP_ROWS,We),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Wn),et===0&&N.generateMipmaps&&I.generateMipmap(de),xt.unbindTexture()},this.initRenderTarget=function(E){wt.get(E).__webglFramebuffer===void 0&&Nt.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Nt.setTextureCube(E,0):E.isData3DTexture?Nt.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Nt.setTexture2DArray(E,0):Nt.setTexture2D(E,0),xt.unbindTexture()},this.resetState=function(){R=0,T=0,y=null,xt.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return vi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=jt._getUnpackColorSpace()}}class rr{static nextId=0;constructor(t,e,i,n,s){this.id=rr.nextId++,this.scene=t,this.terrain=e,this.gridX=i,this.gridZ=n,this.type=s||"entity",this.spatialType=s||"entity",this.position=new U,this.rotationY=0,this.isMoving=!1,this.moveTimer=0,this.moveDuration=1,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.walkAnimTimer=0,this.terrain&&this.terrain.registerEntity&&this.terrain.registerEntity(this,this.gridX,this.gridZ,this.spatialType),this.updatePosition()}updatePosition(){isNaN(this.gridX)||isNaN(this.gridZ)||this.getPositionForGrid(this.gridX,this.gridZ,this.position)}getPositionForGrid(t,e,i=null){const n=this.terrain&&this.terrain.logicalWidth||240,s=this.terrain&&this.terrain.logicalDepth||240,r=t-n/2+.5,o=e-s/2+.5,l=r,h=-o;let c=0,d=0;if(this.terrain&&this.terrain.getVisualOffset){const f=this.terrain.getVisualOffset(l,h);c=f.x,d=f.y}let u=0;return this.terrain&&this.terrain.getInterpolatedHeight?u=this.terrain.getInterpolatedHeight(t,e):this.terrain&&this.terrain.getTileHeight&&(u=this.terrain.getTileHeight(t,e)),i?(i.set(r+c,u,o-d),i):new U(r+c,u,o-d)}getDistance(t,e,i=null,n=null){const s=i!==null?i:this.gridX,r=n!==null?n:this.gridZ,o=this.terrain&&this.terrain.logicalWidth||240,l=this.terrain&&this.terrain.logicalDepth||240;let h=Math.abs(s-t),c=Math.abs(r-e);return h>o/2&&(h=o-h),c>l/2&&(c=l-c),Math.sqrt(h*h+c*c)}getVisualX(t){if(!this.isMoving)return this.gridX;const e=Math.max(0,Math.min(1,(t-this.moveStartTime)/this.moveDuration));let i=this.startGridX,n=this.targetGridX;const s=this.terrain&&this.terrain.logicalWidth||240;return n-i>s/2&&(i+=s),i-n>s/2&&(i-=s),((i+(n-i)*e)%s+s)%s}getVisualZ(t){if(!this.isMoving)return this.gridZ;const e=Math.max(0,Math.min(1,(t-this.moveStartTime)/this.moveDuration));let i=this.startGridZ,n=this.targetGridZ;const s=this.terrain&&this.terrain.logicalDepth||240;return n-i>s/2&&(i+=s),i-n>s/2&&(i-=s),((i+(n-i)*e)%s+s)%s}startMove(t,e,i){if(this.isMoving){const l=(i-this.moveStartTime)/this.moveDuration,h=Math.max(0,Math.min(1,l));let c=this.startGridX,d=this.startGridZ,u=this.targetGridX,f=this.targetGridZ;const m=this.terrain&&this.terrain.logicalWidth||240,x=this.terrain&&this.terrain.logicalDepth||240;u-c>m/2&&(c+=m),c-u>m/2&&(c-=m),f-d>x/2&&(d+=x),d-f>x/2&&(d-=x),this.startGridX=c+(u-c)*h,this.startGridZ=d+(f-d)*h,this.startGridX=(this.startGridX%m+m)%m,this.startGridZ=(this.startGridZ%x+x)%x}else this.startGridX=this.gridX,this.startGridZ=this.gridZ;this.isMoving=!0,this.moveStartTime=i,this.targetGridX=t,this.targetGridZ=e,this.onMoveStep&&this.onMoveStep(0);const n=this.terrain&&this.terrain.logicalWidth||240,s=this.terrain&&this.terrain.logicalDepth||240;let r=t-this.gridX,o=e-this.gridZ;Math.abs(r)>n/2&&(r-=Math.sign(r)*n),Math.abs(o)>s/2&&(o-=Math.sign(o)*s),this.rotationY=Math.atan2(r,o)}updateMovement(t){if(!this.isMoving)return;let e=(t-this.moveStartTime)/this.moveDuration;if(isNaN(e)&&(e=0),e>=1)this.isMoving=!1,this.terrain&&this.terrain.moveEntity&&this.terrain.moveEntity(this,this.gridX,this.gridZ,this.targetGridX,this.targetGridZ,this.spatialType),this.gridX=this.targetGridX,this.gridZ=this.targetGridZ,this.updatePosition(),this.onMoveFinished&&this.onMoveFinished(t);else{const i=this.terrain&&this.terrain.logicalWidth||240,n=this.terrain&&this.terrain.logicalDepth||240;let s=this.startGridX,r=this.startGridZ,o=this.targetGridX,l=this.targetGridZ;o-s>i/2&&(s+=i),s-o>i/2&&(s-=i),l-r>n/2&&(r+=n),r-l>n/2&&(r-=n);const h=s+(o-s)*e,c=r+(l-r)*e;this.getPositionForGrid(h,c,this.position),this.onMoveStep&&this.onMoveStep(e)}}die(){this.isDead=!0,this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this)}getTooltip(){let t=`ID: ${this.id}`;return this.age!==void 0&&(t+=`
Age: ${Math.floor(this.age)}`),t}}const Pm={logicalWidth:240,logicalDepth:240},Im={viewRadius:40},Lm={worker:{hp:50,damage:12,attackRate:1,lifespanBase:80,lifespanVariance:20,specialMultiplier:{hp:1.5,damage:2,lifespan:4}},knight:{hpMultiplier:20,damageMultiplier:25,attackRate:1,lifespanBase:80,lifespanVariance:20},wizard:{hpMultiplier:3,damage:240,attackRate:1,lifespanBase:80,lifespanVariance:20}},Um={normal:{hp:30,damage:8,attackRate:2,lifespan:100},hobgoblin:{hp:120,damage:20,attackRate:2.5,lifespan:150},shaman:{hp:80,damage:35,attackRate:3,lifespan:120,attackRange:8},king:{hp:1500,damage:80,attackRate:1.5,lifespan:300}},Fm={house:{hp:100,capacity:5,defense:4},mansion:{hp:300,capacity:10,defense:2},tower:{hp:500,capacity:5,defense:10},barracks:{hp:800,capacity:10,defense:2},castle:{hp:2e3,capacity:50,defense:2},cave:{hp:200,capacity:20,growthRate:.125},goblin_hut:{hp:100,capacity:5,growthRate:.25}},Ee={terrain:Pm,render:Im,units:Lm,goblins:Um,buildings:Fm};class Nm extends rr{constructor(t,e,i,n,s){super(t,e,n,s,"building"),this.type=i;let r=100,o=100,l=0,h=0;const c=Ee.buildings[i]||{hp:100,capacity:0};r=c.hp,o=c.hp,l=c.capacity||0,h=c.defense||0,this.userData={type:i,gridX:n,gridZ:s,population:0,hp:r,maxHp:o,capacity:l,defense:h,id:this.id},this.population=0,this.hp=r,this.maxHp=o}update(t,e){if(this.type==="cave"||this.type==="goblin_hut"){const i=Ee.buildings[this.type],n=i&&i.growthRate?i.growthRate:.125;this.population=Math.min(this.userData.capacity,(this.population||0)+n*e)}this.userData.population=this.population,this.userData.hp=this.hp,this.population>0&&this.hp<this.maxHp&&Math.random()<e*.2&&(this.hp=Math.min(this.maxHp,this.hp+1))}takeDamage(t){this.hp,this.hp-=t,this.userData.hp=this.hp;let e=0;if(this.population>0){const i=Math.max(1,Math.floor(t*.1));this.population=Math.max(0,this.population-i),this.userData.population=this.population;let n=2;this.type==="tower"?n=10:this.type==="house"&&(n=4),e=Math.floor(this.population*n)}return console.log(`[Building] ${this.type}(${this.id}) took ${t} dmg. Pop: ${this.population}. Retaliation: ${e}`),e}isDestroyed(){return this.hp<=0&&this.population<1}serialize(){return{type:this.type,gridX:this.gridX,gridZ:this.gridZ,population:this.population,hp:this.hp,id:this.id}}deserialize(t){this.population=t.population||0,this.hp=t.hp||this.userData.maxHp,this.id=t.id||this.id,this.userData.population=this.population,this.userData.hp=this.hp}}class zm{constructor(t,e){this.scene=t,this.clippingPlanes=e||[],this.logicalWidth=Ee.terrain.logicalWidth,this.logicalDepth=Ee.terrain.logicalDepth,this.pathCache=[],this.pathfindingCalls=0,typeof Worker<"u"&&(this.worker=new Worker(new URL(""+new URL("pathfindingWorker-BvK6Mxab.js",import.meta.url).href,import.meta.url),{type:"module"}),this.worker.onerror=i=>console.error("[Terrain] Worker Error:",i),this.workerRequests=new Map,this.requestIdCounter=0,this.worker.onmessage=i=>{const{type:n,id:s,payload:r}=i.data;if(n==="PATH_RESULT"){const o=this.workerRequests.get(s);o&&(o.resolve(r),this.workerRequests.delete(s))}}),this.width=this.logicalWidth*3,this.depth=this.logicalDepth*3,this.grid=[],this.geometry=null,this.mesh=null,this.chunkSize=16,this.visibleChunks={},this.pathCache=[],this.pathfindingCalls=0,this.lastFrameTime=0,this.waterMesh=null,this.meshes=[],this.buildings=[],this.initTerrain(),this.totalHousingPop=0,this.entityGrid=[],this.initEntityGrid()}async checkYield(){return performance.now()-this.lastYieldTime>16?(await new Promise(t=>setTimeout(t,0)),this.lastYieldTime=performance.now(),!0):!1}initEntityGrid(){this.entityGrid=[];for(let t=0;t<this.logicalWidth;t++){this.entityGrid[t]=[];for(let e=0;e<this.logicalDepth;e++)this.entityGrid[t][e]=[]}}registerEntity(t,e,i,n){const s=Math.floor(e),r=Math.floor(i);this.isValidGrid(s,r)&&(t._spatial={x:s,z:r,type:n},this.entityGrid[s]||(this.entityGrid[s]=[]),this.entityGrid[s][r]||(this.entityGrid[s][r]=[]),this.entityGrid[s][r].push(t))}unregisterEntity(t){if(!t._spatial)return;const{x:e,z:i}=t._spatial,n=Math.floor(e),s=Math.floor(i);if(this.isValidGrid(n,s)&&this.entityGrid[n]&&this.entityGrid[n][s]){const r=this.entityGrid[n][s],o=r.indexOf(t);o!==-1&&r.splice(o,1)}t._spatial=null}gridToWorld(t){return t-this.logicalWidth/2+.5}moveEntity(t,e,i,n,s,r){const o=Math.floor(e),l=Math.floor(i),h=Math.floor(n),c=Math.floor(s);if(o===h&&l===c){t._spatial={x:h,z:c,type:r};return}this.unregisterEntity(t),this.registerEntity(t,n,s,r)}findNearestEntity(t,e,i,n){let s=null,r=n*n;const o=Math.ceil(n),l=this.logicalWidth,h=this.logicalDepth;for(let c=-o;c<=o;c++)for(let d=-o;d<=o;d++){const u=c*c+d*d;if(u>n*n)continue;const f=Math.floor((e+c+l)%l),m=Math.floor((i+d+h)%h);if(!this.entityGrid[f]||!this.entityGrid[f][m])continue;const x=this.entityGrid[f][m];for(let g=0;g<x.length;g++){const p=x[g];if(p._spatial&&p._spatial.type===t){if(p.isDead)continue;u<r&&(r=u,s=p)}}}return s}findBestTarget(t,e,i,n,s,r=null){let o=null,l=1/0;const h=this.logicalWidth,c=this.logicalDepth;e=(e%h+h)%h,i=(i%c+c)%c;const d=this.grid[Math.floor(e)][Math.floor(i)],u=d?d.regionId:0,f=2*n*(2*n);if(r&&(f>r.length*3||r.length<100)){for(let b=0;b<r.length;b++){const _=r[b];if(_.isDead||_.isFinished)continue;if(t!=="building"&&u>0){const R=this.grid[_.gridX][_.gridZ];if(!R||R.regionId!==u)continue}t==="building"&&(!_.userData||_.userData.type!=="house"&&_.userData.type!=="farm"&&_.userData.type!=="barracks"&&_.userData.type!=="tower"&&_.userData.type!=="mansion"&&_.userData.type!=="goblin_hut"&&_.userData.type);let v=Math.abs(_.gridX-e),w=Math.abs(_.gridZ-i);v>h/2&&(v=h-v),w>c/2&&(w=c-w);const M=Math.sqrt(v*v+w*w);if(M>n)continue;const A=s(_,M);A<l&&(l=A,o=_)}return o}const x=Math.ceil(n),g=n*n,p=this.entityGrid;if(!p)return null;for(let b=-x;b<=x;b++){const _=b*b;if(_>g)continue;let w=e+b;if((w<0||w>=h)&&(w=(w%h+h)%h),w=Math.floor(w),!!p[w])for(let M=-x;M<=x;M++){const A=M*M,R=_+A;if(R>g)continue;let y=i+M;if((y<0||y>=c)&&(y=(y%c+c)%c),y=Math.floor(y),u>0&&this.grid[w][y].regionId!==u)continue;const C=p[w][y];if(!C||C.length===0)continue;const P=Math.sqrt(R);for(let F=0;F<C.length;F++){const O=C[F];if(O._spatial&&O._spatial.type===t){if(O.isDead)continue;const H=s(O,P);H<l&&(l=H,o=O)}}}}return o}initGrid(){this.grid=[];for(let t=0;t<this.logicalWidth;t++){this.grid[t]=[];for(let e=0;e<this.logicalDepth;e++)this.grid[t][e]={height:0,type:"grass",hasBuilding:!1,noise:(Math.random()-.5)*.05}}}initMeshes(){this.geometry&&this.geometry.dispose(),this.mesh&&(this.scene.remove(this.mesh),this.mesh.material&&(Array.isArray(this.mesh.material)?this.mesh.material.forEach(i=>i.dispose()):this.mesh.material.dispose())),this.waterMesh&&(this.scene.remove(this.waterMesh),this.waterMesh.geometry&&this.waterMesh.geometry.dispose(),this.waterMesh.material&&this.waterMesh.material.dispose()),this.width=this.logicalWidth*3,this.depth=this.logicalDepth*3,this.geometry=new Ui(this.width,this.depth,this.width,this.depth);const t=this.geometry.attributes.position.count;this.geometry.setAttribute("color",new He(new Float32Array(t*3),3));const e=this.geometry.attributes.position;for(let i=0;i<t;i++){const n=e.getX(i),s=e.getY(i),r=this.getVisualOffset(n,s);e.setX(i,n+r.x),e.setY(i,s+r.y)}e.needsUpdate=!0,this.createMesh(),this.createWater()}initTerrain(){this.initGrid(),this.initMeshes(),this.generateRandomTerrain()}generateRandomTerrain(){this.seed=Math.random(),this.lastYieldTime=0;for(let t=0;t<this.logicalWidth;t++)for(let e=0;e<this.logicalDepth;e++){const i=t/this.logicalWidth,n=e/this.logicalDepth;let s=this.seamlessFbm(i,n,this.seed);if(typeof window<"u"&&window.location&&window.location.search&&window.location.search.includes("stressTest=true")){this.grid[t][e].height=1,this.grid[t][e].moisture=.5;continue}let r=s*35-15;r=Math.max(-5,r),r=Math.round(r),this.grid[t][e].height=r;let o=this.seamlessFbm(i,n,this.seed+123.45);this.grid[t][e].moisture=o}this.updateMesh(),this.calculateRegions(),this.syncToWorker()}async calculateRegions(t=!1){const e=this.logicalWidth,i=this.logicalDepth;let n=0;for(let o=0;o<e;o++)for(let l=0;l<i;l++)this.grid[o][l].regionId=0;const s=[],r=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}];for(let o=0;o<e;o++){t&&await this.checkYield();for(let l=0;l<i;l++){const h=this.grid[o][l];if(h.height>0&&h.regionId===0)for(n++,h.regionId=n,s.push({x:o,z:l});s.length>0;){const{x:c,z:d}=s.pop();for(const u of r){let f=c+u.x,m=d+u.z;f<0&&(f=e-1),f>=e&&(f=0),m<0&&(m=i-1),m>=i&&(m=0);const x=this.grid[f][m];x.height>0&&x.regionId===0&&(x.regionId=n,s.push({x:f,z:m}))}}}}this.updateColors()}syncToWorker(){if(!this.worker)return;const t=this.logicalWidth,e=this.logicalDepth,i=new Int16Array(t*e);for(let n=0;n<e;n++)for(let s=0;s<t;s++)this.grid[s]&&this.grid[s][n]&&(i[n*t+s]=this.grid[s][n].height);this.worker.postMessage({type:"INIT",payload:{w:t,h:e,data:i}},[i.buffer]),console.log("[Terrain] Synced Grid to Pathfinding Worker.")}updateWorkerCell(t,e,i){this.worker&&this.worker.postMessage({type:"UPDATE_CELL",payload:{x:t,z:e,h:i}})}findClosestReachablePoint(t,e,i,n=10){const s=this.logicalWidth,r=this.logicalDepth,o=Math.round(t),l=Math.round(e);if(this.canAccess(o,l,i))return{x:o,z:l};for(let h=1;h<=n;h++)for(let c=-h;c<=h;c++){if(this.canAccess(o+c,l-h,i))return{x:this.wrap(o+c,s),z:this.wrap(l-h,r)};if(this.canAccess(o+c,l+h,i))return{x:this.wrap(o+c,s),z:this.wrap(l+h,r)};if(c>-h&&c<h){if(this.canAccess(o-h,l+c,i))return{x:this.wrap(o-h,s),z:this.wrap(l+c,r)};if(this.canAccess(o+h,l+c,i))return{x:this.wrap(o+h,s),z:this.wrap(l+c,r)}}}return null}canAccess(t,e,i){const n=this.logicalWidth,s=this.logicalDepth,r=(t%n+n)%n,o=(e%s+s)%s;return this.grid[r]&&this.grid[r][o]?this.grid[r][o].regionId===i:!1}wrap(t,e){return(t%e+e)%e}updateColors(){}updateMesh(){const t=this.geometry.attributes.position.array;for(let e=0;e<t.length;e+=3){const i=t[e],n=t[e+1],s=Math.round(i+this.width/2),r=Math.round(-n+this.depth/2),o=(s%this.logicalWidth+this.logicalWidth)%this.logicalWidth,l=(r%this.logicalDepth+this.logicalDepth)%this.logicalDepth;this.grid[o]&&this.grid[o][l]&&(t[e+2]=this.grid[o][l].height)}this.geometry.attributes.position.needsUpdate=!0,this.geometry.computeVertexNormals()}createMesh(){this.mesh&&this.scene.remove(this.mesh),this.meshes=[];const t=new Kt({vertexColors:!0,flatShading:!1,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.mesh=new Qt(this.geometry,t),this.mesh.rotation.x=-Math.PI/2,this.mesh.position.set(0,0,0);const e=new ze;e.setAttribute("position",this.geometry.attributes.position);const i=[],n=this.width+1,s=this.depth+1;for(let c=0;c<s;c++)for(let d=0;d<n;d++){const u=c*n+d;d<this.width&&i.push(u,u+1),c<this.depth&&i.push(u,u+n)}e.setIndex(i);const r=new Wl({color:0,transparent:!0,opacity:.15,clippingPlanes:this.clippingPlanes}),o=new Ic(e,r);o.position.set(0,0,.04),this.mesh.add(o);const l=new Xl({color:0,size:.15,sizeAttenuation:!0,transparent:!0,opacity:.2,clippingPlanes:this.clippingPlanes}),h=new Lc(this.geometry,l);h.position.set(0,0,.05),this.mesh.add(h),this.scene.add(this.mesh),this.meshes.push(this.mesh)}createWater(){this.waterMesh&&this.scene.remove(this.waterMesh);const t=new Ui(this.width,this.depth),e=new Kt({color:2003199,transparent:!0,opacity:.6,side:$e,clippingPlanes:this.clippingPlanes,clipShadows:!1});this.waterMesh=new Qt(t,e),this.waterMesh.rotation.x=-Math.PI/2,this.waterMesh.position.set(0,.2,0),this.scene.add(this.waterMesh)}updateLights(t){const e=t>=18||t<6;this._lastIsNight!==e&&(this._lastIsNight=e,this.updateColors(e),console.log(`Terrain: Night Lights Update. Night=${e}`))}setSeason(t){this.currentSeason!==t&&(console.log(`[DEBUG] Terrain.setSeason: Changing from ${this.currentSeason} to ${t}`),this.currentSeason=t,this.updateColors(this._lastIsNight))}updateColors(t){t===void 0&&(t=this._lastIsNight||!1);const e=this.geometry.attributes.color.array,i=this.geometry.attributes.position.array,n=this.currentSeason||"Spring";console.log(`[DEBUG] Terrain.updateColors: Season=${n}, IsNight=${t}`);for(let s=0;s<i.length;s+=3){const r=i[s],o=i[s+1],l=Math.round(r+this.width/2),h=Math.round(-o+this.depth/2),c=(l%this.logicalWidth+this.logicalWidth)%this.logicalWidth,d=(h%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[c]&&this.grid[c][d]){const u=this.grid[c][d],f=u.height,m=u.noise,x=u.moisture||.5,g=this.getBiomeColor(f,x,m,t,n,c,d);e[s]=g.r,e[s+1]=g.g,e[s+2]=g.b}}this.geometry.attributes.color.needsUpdate=!0}isReachable(t,e,i,n){const s=this.grid[t%this.logicalWidth][e%this.logicalDepth],r=this.grid[i%this.logicalWidth][n%this.logicalDepth];return!s||!r||r.height<=0?!1:s.regionId===r.regionId}updateColors(t="Spring",e=!1){if(!this.geometry)return;const i=this.geometry.attributes.position.count,n=this.geometry.attributes.color,s=this.logicalWidth,r=this.logicalDepth;for(let o=0;o<i;o++){const l=this.geometry.attributes.position.getX(o),h=this.geometry.attributes.position.getY(o);let c=Math.floor(l+s/2),d=Math.floor(-h+r/2);c=(c%s+s)%s,d=(d%r+r)%r;const u=this.grid[c][d];if(u){const f=u.height,m=u.moisture||.5,x=u.noise,g=this.getBiomeColor(f,m,x,e,t,c,d);n.setXYZ(o,g.r,g.g,g.b)}}n.needsUpdate=!0}getBiomeColor(t,e,i,n,s,r,o,l=!1){const h=new ut;if(l&&t<=0){const c=new ut(49151),d=new ut(139);let u=Math.min(1,Math.abs(t)/5);return c.lerp(d,u*.5),c}if(t<=4)if(s==="Winter"){h.setHex(12433259);const c=(i+1)*.5;h.lerp(new ut(10525274),c*.2)}else s==="Summer"?h.setHex(43088):h.setHex(8969608);else if(t<=8)if(s==="Winter"){h.setHex(16777215);const c=(i+1)*.5;h.lerp(new ut(15660543),c*.1)}else if(s==="Autumn"){const c=r*12.9898+o*78.233;let d=Math.sin(c)*43758.5453;d=d-Math.floor(d),d>.66?h.setHex(13369344):d>.33?h.setHex(16763904):h.setHex(2263842)}else s==="Summer"?h.setHex(25600):h.setHex(2263842);else{h.setHex(8421504);const c=(i+1)*.5;h.lerp(new ut(6316128),c*.2)}if(e<.5&&t<=8){const c=new ut(16032864);let d=1;e>.35&&(d=1-(e-.35)/.15),h.lerp(c,d)}if(e>.6&&t<=3){const c=new ut(3100495);let d=Math.min(1,Math.max(0,(e-.6)/.15));s==="Autumn"&&c.setHex(4929057);let u=t>2?1-(t-2):1;h.lerp(c,d*u)}if(n){const c={};h.getHSL(c),c.l*=.3,h.setHSL(c.h,c.s,c.l)}return h}modifyMoisture(t,e,i){const n=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,s=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;if(this.grid[n]&&this.grid[n][s]){const r=this.grid[n][s];r.moisture=Math.max(0,Math.min(1,(r.moisture||.5)+i)),this.updateColorAt(n,s)}}updateColorAt(t,e){const i=this._lastIsNight||!1,n=this.currentSeason||"Spring",s=this.geometry.attributes.color,r=this.logicalWidth,o=this.logicalDepth,l=r+1,h=[{x:t,z:e}];t===0&&h.push({x:r,z:e}),e===0&&h.push({x:t,z:o}),t===0&&e===0&&h.push({x:r,z:o}),h.forEach(c=>{const d=c.z*l+c.x;if(d<0||d>=s.count)return;const u=c.x%r,f=c.z%o;if(this.grid[u]&&this.grid[u][f]){const m=this.grid[u][f],x=m.height,g=m.noise,p=m.moisture||.5,b=this.getBiomeColor(x,p,g,i,n,u,f);s.setXYZ(d,b.r,b.g,b.b)}}),s.needsUpdate=!0}modifyHeight(t,e,i){let n=0;const s=[],r=(h,c)=>({x:(h+this.logicalWidth)%this.logicalWidth,z:(c+this.logicalDepth)%this.logicalDepth}),o=r(t,e);this.grid[o.x]&&this.grid[o.x][o.z]&&(this.grid[o.x][o.z].height+=i,this.updateWorkerCell(o.x,o.z,this.grid[o.x][o.z].height),n+=Math.abs(i),s.push(o));let l=0;for(;l<s.length;){const h=s[l++],c=h.x,d=h.z,u=this.grid[c][d],f=u.height;u.hasBuilding&&u.building&&(u.building.userData.type==="cave"?(u.building.y=f,u.building.userData.y=f):this.removeBuilding(u.building));const m=[{x:c+1,z:d},{x:c-1,z:d},{x:c,z:d+1},{x:c,z:d-1}];for(const g of m){const p=r(g.x,g.z),b=this.grid[p.x][p.z],_=b.height,v=f-_;if(v>1){const w=f-1;n+=Math.abs(w-_),b.height=w,this.updateWorkerCell(p.x,p.z,w),s.push(p)}else if(v<-1){const w=f+1;n+=Math.abs(w-_),b.height=w,this.updateWorkerCell(p.x,p.z,w),s.push(p)}}[{x:(c-1+this.logicalWidth)%this.logicalWidth,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:c,z:(d-1+this.logicalDepth)%this.logicalDepth},{x:(c-1+this.logicalWidth)%this.logicalWidth,z:d},{x:c,z:d}].forEach(g=>{const p=this.grid[g.x][g.z];p.hasBuilding&&p.building&&(this.checkBuildingIntegrity(p.building)||this.removeBuilding(p.building))})}return this.updateMesh(),this.updateColors(),this.needsRegionRecalc=!0,n}getTileHeight(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]?this.grid[i][n].height:0}getBuildingAt(t,e){const i=(Math.round(t)+this.logicalWidth)%this.logicalWidth,n=(Math.round(e)+this.logicalDepth)%this.logicalDepth;return this.grid[i]&&this.grid[i][n]&&this.grid[i][n].building?this.grid[i][n].building:null}getVisualOffset(t,e){if(this.grid){const d=this.logicalWidth||160,u=this.logicalDepth||160,f=Math.round(t+d/2),m=Math.round(-e+u/2),x=(f%d+d)%d,g=(m%u+u)%u;if(this.grid[x]&&this.grid[x][g]&&this.grid[x][g].hasBuilding)return{x:0,y:0}}const i=this.logicalWidth||80,n=this.logicalDepth||80,s=Math.PI*2/i,r=Math.PI*2/n,o=t*s*10,l=e*r*10,h=(Math.sin(l)+Math.cos(o))*.2,c=(Math.cos(l)+Math.sin(o))*.2;return{x:h,y:c}}getVisualPosition(t,e,i=!0){const n=this.logicalWidth||80,s=this.logicalDepth||80,r=i?.5:0,o=t-n/2+r,l=e-s/2+r,h=o,c=-l,d=this.getVisualOffset(h,c),u=o+d.x,f=l-d.y,m=this.getTileHeight(t,e);return{x:u,y:m,z:f}}getInterpolatedHeight(t,e){let i=(t%this.logicalWidth+this.logicalWidth)%this.logicalWidth,n=(e%this.logicalDepth+this.logicalDepth)%this.logicalDepth;const s=Math.floor(i),r=Math.floor(n),o=(s+1)%this.logicalWidth,l=(r+1)%this.logicalDepth,h=i-s,c=n-r,d=this.grid[s][r].height,u=this.grid[o][r].height,f=this.grid[s][l].height,m=this.grid[o][l].height;let x;return h+c<=1?x=d+(u-d)*h+(f-d)*c:x=m+(u-m)*(1-c)+(f-m)*(1-h),x}isValidGrid(t,e){return t>=0&&t<this.logicalWidth&&e>=0&&e<this.logicalDepth}raise(t,e){return this.invalidatePathCache(),this.modifyHeight(t,e,1)}lower(t,e){return this.invalidatePathCache(),this.modifyHeight(t,e,-1)}seamlessFbm(t,e,i){let n=0,s=1,r=1,o=0;for(let l=0;l<4;l++)n+=this.periodicNoise(t*r,e*r,r,i)*s,o+=s,s*=.5,r*=2;return n/o}periodicNoise(t,e,i,n){const r=t*5,o=e*5,l=i*5,h=Math.floor(r),c=Math.floor(o),d=r-h,u=o-c,f=Math.floor(l),m=w=>(w%f+f)%f,x=this.random(m(h),m(c),n),g=this.random(m(h+1),m(c),n),p=this.random(m(h),m(c+1),n),b=this.random(m(h+1),m(c+1),n),_=d*d*(3-2*d),v=u*u*(3-2*u);return(1-_)*(1-v)*x+_*(1-v)*g+(1-_)*v*p+_*v*b}raycast(t,e){t.clone();const s=e.clone().normalize(),r=new U;for(let o=0;o<300;o+=.5){if(r.copy(s).multiplyScalar(o).add(t),r.y>50)continue;if(r.y<-10)break;const l=r.x+this.logicalWidth/2,h=r.z+this.logicalDepth/2,c=this.getInterpolatedHeight(l,h);if(r.y<=c)return r.y=c,r}return null}random(t,e,i){const n=Math.sin(t*12.9898+e*78.233+i)*43758.5453123;return n-Math.floor(n)}addBuilding(t,e,i,n=!1,s=!1){if(this.invalidatePathCache(),!this.grid[e]||!this.grid[e][i])return null;const r=new Nm(this.scene,this,t,e,i);r.rotation=Math.random()*Math.PI*2,(t==="barracks"||t==="tower")&&window.game&&window.game.registerSquad&&(r.userData.squadId=window.game.registerSquad(t));const o=this.logicalWidth,l=this.logicalDepth,h=this.getBuildingSize(t);if(this.clearArea(e,i,h),this.flattenArea(e,i,h),!n&&t!=="cave"&&!this.checkFlatArea(e,i,h))return null;this.buildings.push(r);for(let c=0;c<h;c++)for(let d=0;d<h;d++){const u=(e+c)%o,f=(i+d)%l,m=this.grid[u][f];m.hasBuilding=!0,m.building=r}return!s&&!this.isRestoring&&this.updateMesh(),r}clearArea(t,e,i){const n=new Set,s=this.logicalWidth,r=this.logicalDepth;for(let o=0;o<i;o++)for(let l=0;l<i;l++){const h=(t+o)%s,c=(e+l)%r,d=this.grid[h][c];d.hasBuilding&&d.building&&n.add(d.building)}for(const o of n)console.log(`[Terrain] Clearing obstacle: ${o.type} for new construction.`),this.removeBuilding(o)}removeBuilding(t){if(this.invalidatePathCache(),!t)return;let e=this.buildings.indexOf(t);e===-1&&(console.log(`[Terrain] removeBuilding: Identity mismatch! searching by coord ${t.gridX},${t.gridZ}`),e=this.buildings.findIndex(l=>l.gridX===t.gridX&&l.gridZ===t.gridZ)),e>-1?(this.buildings[e]!==t&&(console.log("[Terrain] Swapping ghost building object for authoritative one."),t=this.buildings[e]),this.buildings.splice(e,1)):console.log(`[Terrain] removeBuilding: Failed to find in list! ${t.gridX},${t.gridZ}`);const i=this.getBuildingSize(t.userData.type),n=t.gridX,s=t.gridZ,r=this.logicalWidth,o=this.logicalDepth;for(let l=0;l<i;l++)for(let h=0;h<i;h++){const c=(n+l)%r,d=(s+h)%o;if(this.grid[c]&&this.grid[c][d]){const u=this.grid[c][d];u.building===t?(u.hasBuilding=!1,u.building=null):u.building&&(u.building.gridX===n&&u.building.gridZ===s||u.building.constructor===Object&&u.building.x===void 0)&&(console.warn(`[Terrain] Force clearing cell ${c},${d} (Identity Mismatch resolved)`),u.hasBuilding=!1,u.building=null)}}if(this.entityGrid)if(this.unregisterEntity)this.unregisterEntity(t);else{const l=Math.floor(t.userData.gridX),h=Math.floor(t.userData.gridZ);if(this.entityGrid[l]&&this.entityGrid[l][h]){const c=this.entityGrid[l][h].indexOf(t);c>-1&&this.entityGrid[l][h].splice(c,1)}}t.userData.isDead=!0,t.userData.hp=0,console.log(`[Terrain] Building removed at ${n},${s}`)}invalidatePathCache(){this.pathCache=[]}getBuildingSize(t){return t==="tower"||t==="barracks"?3:t==="farm"||t==="house"?2:1}checkBuildingIntegrity(t){if(!t)return!1;const e=this.grid[t.gridX][t.gridZ].height;if(e<=0)return!1;if(t.userData.type!=="cave"&&(typeof t.y!="number"||Math.abs(e-t.y)>.1))return console.log(`[Terrain] Integrity Fail: Type = ${t.userData.type} RootH = ${e.toFixed(2)} b.y = ${t.y} (Height Mismatch)`),!1;const i=t.userData.type,n=this.getBuildingSize(i);if(i==="cave")return!0;const s=this.logicalWidth,r=this.logicalDepth;for(let o=0;o<=n;o++)for(let l=0;l<=n;l++){const h=(t.gridX+o)%s,c=(t.gridZ+l)%r,d=this.grid[h][c];if(d.height!==e||d.height<=0)return!1}return!0}checkFlatArea(t,e,i){const n=this.logicalWidth,s=this.logicalDepth;if(!this.grid[t]||!this.grid[t][e])return!1;const r=this.grid[t][e].height;if(r<=0||this.grid[t][e].hasBuilding)return!1;for(let o=0;o<=i;o++)for(let l=0;l<=i;l++){const h=(t+o)%n,c=(e+l)%s,d=this.grid[h][c];if(d.height!==r||d.height<=0||o<i&&l<i&&d.hasBuilding)return!1}return!0}flattenArea(t,e,i){const n=this.grid[t][e].height,s=this.logicalWidth,r=this.logicalDepth;let o=!1;for(let l=0;l<=i;l++)for(let h=0;h<=i;h++){const c=(t+l)%s,d=(e+h)%r,u=this.grid[c][d];u.height!==n&&(u.height=n,o=!0,u.hasBuilding&&u.building&&this.checkBuildingIntegrity(u.building))}return o&&(this.updateMesh(),this.updateColors(),this.calculateRegions()),!0}updatePopulation(t,e,i,n){let s=0;this.buildings.forEach(g=>{const p=g.userData.type;(p==="house"||p==="mansion"||p==="castle")&&g.userData.population>0&&(s+=g.userData.population)}),this.totalHousingPop=s;const r=Math.floor(s)+i;let o=.005;e&&(o*=.1);let l=r*o*t;const h=window.game&&window.game.resources?window.game.resources:{grain:0,fish:0,meat:0};let c=!0;if(l>0){let g=l*.4,p=l*.3,b=l*.3;const _=(R,T)=>{if(T<=0)return 0;if(h[R]>=T)return h[R]-=T,0;{const y=h[R];return h[R]=0,T-y}};let v=_("grain",g),w=_("meat",p),M=_("fish",b);v>0&&(v=_("meat",v)),w>0&&(w=_("fish",w)),v>0&&(v=_("fish",v));let A=v+w+M;A>0&&(A=_("grain",A),A=_("meat",A),A=_("fish",A)),A>1e-4&&(c=!1)}let d=0;h.grain>0&&d++,h.fish>0&&d++,h.meat>0&&d++;let u=.5;d===1&&(u=1),d===2&&(u=2.5),d===3&&(u=5);const f=.05*u;this.frameCount===void 0&&(this.frameCount=0),this.frameCount++;const m=20,x=this.frameCount%m;this.buildings.forEach((g,p)=>{if(p%m!==x)return;const b=t*m,_=g.userData.type;if(_==="house"||_==="barracks"){const v=g.userData.gridX,w=g.userData.gridZ;let M=f,A=10;_==="barracks"&&(M*=20,A=200);const R=2e5/(2e5+r);M*=R,c||(M*=.25),typeof g.population=="number"?(g.population+=M*b,g.userData.population=g.population):g.userData.population+=M*b;const T=typeof g.population=="number"?g.population:g.userData.population;if(T>=A&&n)if(_==="house")n(v,w,_,g)?(typeof g.population=="number"&&(g.population=0),g.userData.population=0):(typeof g.population=="number"&&(g.population=A),g.userData.population=A);else if(_==="barracks"){let y=0;for(let C=0;C<2;C++)n(v,w,_,g,g.userData.squadId)&&y++;y>0?(typeof g.population=="number"&&(g.population=0),g.userData.population=0):(typeof g.population=="number"&&(g.population=A),g.userData.population=A)}else{const y=T>A?A:T;typeof g.population=="number"&&(g.population=y),g.userData.population=y}}else if(_==="tower"){const v=f*20,w=300;if(g.userData.population+=v*b,g.userData.population>=w&&n){let M=0;for(let A=0;A<2;A++)n(g.userData.gridX,g.userData.gridZ,"tower",g,g.userData.squadId)&&M++;M>0?g.userData.population=0:g.userData.population=w}}else if(_==="farm"){for(g.userData.population=(g.userData.population||0)+10*b;g.userData.population>=100;)if(g.userData.population-=100,window.game&&window.game.resources){const w=g.userData.gridX,M=g.userData.gridZ,A=this.grid[w][M].moisture||.5;let T=1-Math.abs(A-.5)*2;T<.2&&(T=.2);const y=Math.floor(8*T);window.game.resources.grain+=y}}})}update(t,e,i){this.colorsDirty&&(this.updateColors(),this.colorsDirty=!1),this.waterMesh&&this.waterMesh.material.uniforms&&(this.waterMesh.material.uniforms.uTime.value+=t),this.needsRegionRecalc&&(this.regionRecalcTimer===void 0&&(this.regionRecalcTimer=0),this.regionRecalcTimer+=t,this.regionRecalcTimer>2&&(this.calculateRegions(),this.needsRegionRecalc=!1,this.regionRecalcTimer=0,console.log("[Terrain] Deferred Regions Recalculated"))),this.pathfindingCalls=0,this.updatePopulation(t,i,0,e)}updateLights(t){}serialize(){const t=this.logicalWidth,e=this.logicalDepth,i=t*e,n=new Array(i),s=new Array(i),r=new Array(i);let o=!1;for(let c=0;c<t;c++)for(let d=0;d<e;d++){const u=c*e+d,f=this.grid[c][d];n[u]=Math.round(f.height*100)/100,s[u]=Math.round(f.noise*100)/100,f.moisture!==void 0?(r[u]=Math.round(f.moisture*100)/100,o=!0):r[u]=0}const l=this.buildings.map(c=>({t:c.userData.type,p:c.userData.population,l:c.userData.level||1,x:c.gridX!==void 0?c.gridX:c.userData.gridX,z:c.gridZ!==void 0?c.gridZ:c.userData.gridZ,r:c.rotation!==void 0?Math.round(c.rotation*100)/100:0})),h={logicalWidth:t,logicalDepth:e,version:2,h:n,n:s,b:l};return o&&(h.m=r),h}async deserialize(t,e){if(!t)throw new Error("Terrain.deserialize received invalid data");console.log("[Terrain] deserialize: Start"),this.lastYieldTime=performance.now(),console.log("[Terrain] deserialize: Clearing Buildings...");for(const s of this.buildings)this.scene.remove(s),s.userData.clones&&s.userData.clones.forEach(r=>this.scene.remove(r)),await this.checkYield();this.buildings=[],this.initEntityGrid();const i=t.logicalWidth!==void 0?t.logicalWidth:t.width,n=t.logicalDepth!==void 0?t.logicalDepth:t.depth;if(i!==this.logicalWidth||n!==this.logicalDepth)console.log(`[Terrain] deserialize: Resize detected! ${this.logicalWidth}x${this.logicalDepth} -> ${i}x${n}`),this.logicalWidth=i,this.logicalDepth=n,this.initGrid(),this.initMeshes();else{console.log("[Terrain] deserialize: Clearing Grid...");for(let s=0;s<this.logicalWidth;s++){await this.checkYield()&&e&&e(Math.floor(s/this.logicalWidth*10));for(let r=0;r<this.logicalDepth;r++){const o=this.grid[s][r];o.hasBuilding&&o.building&&this.scene.remove(o.building),o.hasBuilding=!1,o.building=null}}}if(console.log("[Terrain] deserialize: Restoring Grid Data..."),t.version===2||t.h&&Array.isArray(t.h)){const s=t.h,r=t.n,o=t.m,l=this.logicalDepth;for(let h=0;h<this.logicalWidth;h++){await this.checkYield()&&e&&e(10+Math.floor(h/this.logicalWidth*40));for(let c=0;c<this.logicalDepth;c++){const d=h*l+c;this.grid[h][c].height=s[d],this.grid[h][c].noise=r[d],o&&(this.grid[h][c].moisture=o[d])}}if(t.b&&Array.isArray(t.b)){console.log(`[Terrain] deserialize: Restoring ${t.b.length} Buildings...`),this.isRestoring=!0;try{for(let h=0;h<t.b.length;h++){const c=t.b[h];await this.checkYield()&&e&&e(50+Math.floor(h/t.b.length*40));const d={gridX:c.x,gridZ:c.z,type:c.t,population:c.p,level:c.l||1,rotation:c.r};try{switch(c.t){case"house":this.restoreHouse(d);break;case"mansion":this.restoreMansion(d);break;case"castle":this.restoreCastle(d);break;case"tower":this.restoreTower(d);break;case"barracks":this.restoreBarracks(d);break;case"goblin_hut":this.restoreGoblinHut(d);break;case"cave":this.restoreCave(d);break;case"farm":this.restoreFarm(d);break;default:console.warn("Unknown building type:",c.t)}}catch(u){console.error(`[Terrain] Failed to restore building ${c.t} at index ${h}:`,u)}}}catch(h){console.error("[Terrain] Building Restore Loop Failed:",h)}finally{this.isRestoring=!1}this.updateMesh()}}else{console.log("[Terrain] Deserializing Legacy Format...");for(let s=0;s<this.logicalWidth;s++){await this.checkYield()&&e&&e(10+Math.floor(s/this.logicalWidth*40));for(let r=0;r<this.logicalDepth;r++){const o=t.grid[s][r],l=o.h!==void 0?o.h:o.height,h=o.n!==void 0?o.n:o.noise;this.grid[s][r].height=l,this.grid[s][r].noise=h,o.m!==void 0?this.grid[s][r].moisture=o.m:o.moisture!==void 0&&(this.grid[s][r].moisture=o.moisture);let c=o.hb||o.hasBuilding,d=o.b||o.building;if(c&&d){const u=d.x!==void 0?d.x:d.gridX,f=d.z!==void 0?d.z:d.gridZ;if(u===s&&f===r){const m=d.t||d.type,x={gridX:u,gridZ:f,type:m,population:d.p!==void 0?d.p:d.population,rotation:d.r!==void 0?d.r:d.rotation};m==="house"?this.restoreHouse(x):m==="farm"?this.restoreFarm(x):m==="mansion"?this.restoreMansion(x):m==="castle"?this.restoreCastle(x):m==="goblin_hut"?this.restoreGoblinHut(x):m==="tower"?(x.userData&&!x.userData.squadId&&(x.userData.squadId=window.game.registerSquad("tower")),this.restoreTower(x)):m==="barracks"?(x.userData&&!x.userData.squadId&&(x.userData.squadId=window.game.registerSquad("barracks")),this.restoreBarracks(x)):m==="cave"&&this.restoreCave(x)}}}}}await this.checkYield(),this.updateMesh(),await this.checkYield(),this.updateColors(),await this.checkYield(),await this.calculateRegions(!0),this.syncToWorker()}restoreHouse(t){const e=this.addBuilding("house",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,e.level=t.level||1,e.userData.level=t.level||1,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreFarm(t){const e=this.addBuilding("farm",t.gridX,t.gridZ,!0);e&&(e.userData.hp=5,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreMansion(t){const e=this.addBuilding("mansion",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,e.level=t.level||1,e.userData.level=t.level||1,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCastle(t){const e=this.addBuilding("castle",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,e.level=t.level||2,e.userData.level=t.level||2)}updateMeshPosition(t){if(!t)return;const e=this.logicalWidth,i=this.logicalDepth,n=t.position.x,s=t.position.z,r=Math.round(n/e)*e,o=Math.round(s/i)*i;(this.mesh.position.x!==r||this.mesh.position.z!==o)&&(this.mesh.position.set(r,0,o),this.waterMesh&&this.waterMesh.position.set(r,.2,o))}restoreGoblinHut(t){const e=this.addBuilding("goblin_hut",t.gridX,t.gridZ,!0);e?(e.population=t.population||1,e.userData.population=t.population||1,t.rotation!==void 0&&(e.rotation=t.rotation)):console.warn("Failed to restore goblin_hut at",t.gridX,t.gridZ)}restoreTower(t){const e=this.addBuilding("tower",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreBarracks(t){const e=this.addBuilding("barracks",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0,t.rotation!==void 0&&(e.rotation=t.rotation))}restoreCave(t){const e=this.addBuilding("cave",t.gridX,t.gridZ,!0);e&&(e.population=t.population||0,e.userData.population=t.population||0)}resetPathfindingBudget(){this.pathfindingCalls=0}invalidatePathCache(){this.pathCache=[]}findPathAsync(t,e,i,n,s=0){return this.worker?new Promise((r,o)=>{const l=++this.requestIdCounter;this.workerRequests.set(l,{resolve:r,reject:o}),this.worker.postMessage({type:"FIND_PATH",id:l,payload:{sx:t,sz:e,ex:i,ez:n,maxSteps:s}})}):Promise.resolve(this.findPath(t,e,i,n,s))}findPath(t,e,i,n,s=0){this.pathfindingCalls=(this.pathfindingCalls||0)+1;const r=this.pathCache.find(p=>{const b=p.sx===t&&p.sz===e,_=p.ex===i&&p.ez===n;return b&&_});if(r)return[...r.path];if(this.pathfindingCalls>50)return null;const o=this.logicalWidth,l=this.logicalDepth;if(s&&console.log(`[Terrain] findPath with custom limit: ${s}`),t=Math.round(t),e=Math.round(e),i=Math.round(i),n=Math.round(n),t=(t%o+o)%o,e=(e%l+l)%l,i=(i%o+o)%o,n=(n%l+l)%l,t<0||t>=o||e<0||e>=l)return null;if(!this.grid[t]||!this.grid[t][e]||this.grid[t][e].height<=0){let p=!1;for(let b=-1;b<=1;b++){for(let _=-1;_<=1;_++){if(b===0&&_===0)continue;let v=t+b,w=e+_;if(v<0&&(v+=o),v>=o&&(v-=o),w<0&&(w+=l),w>=l&&(w-=l),this.grid[v]&&this.grid[v][w]&&this.grid[v][w].height>0){t=v,e=w,p=!0;break}}if(p)break}if(!p)return null}if(!this.grid[i]||!this.grid[i][n])return null;if(this.grid[i][n].height<=0){let p=!1;for(let b=1;b<=2;b++){for(let _=-b;_<=b;_++){for(let v=-b;v<=b;v++){if(_===0&&v===0)continue;let w=i+_,M=n+v;if(w<0&&(w+=o),w>=o&&(w-=o),M<0&&(M+=l),M>=l&&(M-=l),this.grid[w]&&this.grid[w][M]&&this.grid[w][M].height>0){i=w,n=M,p=!0;break}}if(p)break}if(p)break}if(!p)return null}const h={x:t,z:e,g:0,h:0,f:0,parent:null},c=[h],d=new Map;d.set(`${t},${e}`,h);const u=new Set;let f=0;const m=s>0?s:4e4;let x=h,g=1/0;for(;c.length>0;){if(f++,f>m){console.log(`[Terrain] findPath MAX STEPS (${m}) Exceeded. Returning Partial Path to closest node (${x.x},${x.z} h:${x.h.toFixed(1)}).`);const v=[];let w=x;for(;w;)v.push({x:w.x,z:w.z}),w=w.parent;return v.reverse()}c.sort((v,w)=>v.f-w.f);const p=c.shift();p.h<g&&(g=p.h,x=p);const b=`${p.x},${p.z}`;if(d.delete(b),u.add(b),p.x===i&&p.z===n){const v=[];let w=p;for(;w;)v.push({x:w.x,z:w.z}),w=w.parent;const M=v.reverse();return this.pathCache.length>50&&this.pathCache.shift(),this.pathCache.push({sx:t,sz:e,ex:i,ez:n,path:M,timestamp:Date.now()}),M}const _=[{x:1,z:0,cost:1},{x:-1,z:0,cost:1},{x:0,z:1,cost:1},{x:0,z:-1,cost:1},{x:1,z:1,cost:1.414},{x:1,z:-1,cost:1.414},{x:-1,z:1,cost:1.414},{x:-1,z:-1,cost:1.414}];for(const v of _){let w=p.x+v.x,M=p.z+v.z;w<0&&(w=o-1),w>=o&&(w=0),M<0&&(M=l-1),M>=l&&(M=0);const A=`${w},${M}`;if(u.has(A)||!this.grid[w]||!this.grid[w][M])continue;const R=this.grid[p.x][p.z].height,T=this.grid[w][M].height;if(T<=0)continue;const y=Math.abs(T-R);if(y>2)continue;let P=.8*(v.cost||1);T>8&&(P+=2),P+=y*1;const F=p.g+P;let O=d.get(A);if(O&&O.g<=F)continue;let H=Math.abs(w-i),V=Math.abs(M-n);H>o/2&&(H=o-H),V>l/2&&(V=l-V);const Q=Math.sqrt(H*H+V*V)*.8;if(O)O.g=F,O.f=F+Q,O.parent=p;else{const W={x:w,z:M,g:F,h:Q,f:F+Q,parent:p};c.push(W),d.set(A,W)}}}return null}findBestTarget(t,e,i,n,s,r){let o=null,l=1/0;if(this.entityGrid&&(!r||r.length>500)&&n<40){const c=Math.ceil(n),d=this.logicalWidth,u=this.logicalDepth,f=Math.max(0,e-c),m=Math.min(d-1,e+c),x=Math.max(0,i-c),g=Math.min(u-1,i+c);for(let p=f;p<=m;p++)for(let b=x;b<=g;b++){const _=this.entityGrid[p][b];if(!(!_||_.length===0))for(const v of _){if(t!=="any"&&(t==="goblin"&&v.type!=="goblin"||t==="building"&&v.type!=="building"||t==="unit"&&v.type!=="unit"))continue;const w=(v.gridX-e)**2+(v.gridZ-i)**2;if(w>n*n)continue;const M=Math.sqrt(w),A=s(v,M);A<l&&(l=A,o=v)}}}else{let c=r;c||(t==="building"?c=this.buildings:c=[]);for(const d of c){const u=(d.gridX-e)**2+(d.gridZ-i)**2;if(u>n*n)continue;const f=Math.sqrt(u),m=s(d,f);m<l&&(l=m,o=d)}}return o}unregisterAll(t){if(!this.entityGrid)return;const e=this.logicalWidth,i=this.logicalDepth;let n=0;for(let s=0;s<e;s++)for(let r=0;r<i;r++){const o=this.entityGrid[s][r];if(!(!o||o.length===0))for(let l=o.length-1;l>=0;l--){const h=o[l];let c=t==="goblin"&&(h.type==="goblin"||h.constructor.name==="Goblin");t!=="goblin"&&(c=h.type===t),c&&(h.mesh&&h.mesh.parent&&h.mesh.parent.remove(h.mesh),h.crossMesh&&h.crossMesh.parent&&h.crossMesh.parent.remove(h.crossMesh),o.splice(l,1),n++)}}console.log(`[Terrain] Validated/Cleared ${n} entities of type '${t}'.`)}getRegion(t,e){return!this.grid[t]||!this.grid[t][e]?-1:this.grid[t][e].regionId||0}isAdjacentToRegion(t,e,i){if(!this.grid)return!1;const n=[{x:t+1,z:e},{x:t-1,z:e},{x:t,z:e+1},{x:t,z:e-1}],s=this.logicalWidth||160,r=this.logicalDepth||160;for(const o of n){let l=o.x,h=o.z;l<0?l=s-1:l>=s&&(l=0),h<0?h=r-1:h>=r&&(h=0);const c=this.grid[l]?this.grid[l][h]:null;if(c&&c.regionId===i)return!0}return!1}getRandomPointInRegion(t,e,i,n){const s=this.logicalWidth,r=this.logicalDepth,o=20;for(let l=0;l<o;l++){const h=Math.random()*Math.PI*2,c=Math.random()*n,d=Math.floor(e+Math.cos(h)*c),u=Math.floor(i+Math.sin(h)*c);let f=(d%s+s)%s,m=(u%r+r)%r;if(this.grid[f]&&this.grid[f][m]&&this.grid[f][m].regionId===t)return{x:f,z:m}}return null}}class Bm{constructor(t,e,i,n,s,r,o){this.scene=t,this.camera=e,this.terrain=i,this.spawnCallback=n,this.units=s||[],this.unitRenderer=r,this.game=o,this.raycaster=new kc,this.mouse=new yt,this.mode="raise";const l=new ui(.2,1,8),h=new cn({color:16711680,wireframe:!0});this.cursor=new Qt(l,h),this.cursor.rotation.x=Math.PI,this.scene.add(this.cursor),this.tooltip=document.getElementById("tooltip"),this.setupUI(),this._binds={onPointerDown:this.onPointerDown.bind(this),onPointerUp:this.onPointerUp.bind(this),onPointerMove:this.onPointerMove.bind(this)},window.addEventListener("pointerdown",this._binds.onPointerDown),window.addEventListener("pointerup",this._binds.onPointerUp),window.addEventListener("mousemove",this._binds.onPointerMove),this.dragThreshold=15,this.downPosition=new yt}dispose(){this._binds&&(window.removeEventListener("pointerdown",this._binds.onPointerDown),window.removeEventListener("pointerup",this._binds.onPointerUp),window.removeEventListener("mousemove",this._binds.onPointerMove)),this.cursor&&(this.scene.remove(this.cursor),this.cursor.geometry.dispose(),this.cursor.material.dispose())}setupUI(){const t=document.getElementById("btn-raise"),e=document.getElementById("btn-lower"),i=document.getElementById("btn-spawn"),n=document.getElementById("btn-barracks"),s=document.getElementById("btn-tower"),r=document.getElementById("btn-cancel"),o=document.getElementById("btn-view"),l=h=>{this.mode=h,t&&t.classList.toggle("active",h==="raise"),e&&e.classList.toggle("active",h==="lower"),i&&i.classList.toggle("active",h==="spawn"),n&&n.classList.toggle("active",h==="barracks"),s&&s.classList.toggle("active",h==="tower"),r&&r.classList.toggle("active",h==="cancel"),o&&o.classList.toggle("active",h==="view")};l("view"),o&&o.addEventListener("click",()=>l("view")),t&&t.addEventListener("click",()=>l("raise")),e&&e.addEventListener("click",()=>l("lower")),r&&r.addEventListener("click",()=>l("cancel")),i&&i.addEventListener("click",()=>l("spawn")),n&&n.addEventListener("click",()=>l("barracks")),s&&s.addEventListener("click",()=>l("tower"))}isUIInteraction(t){const e=t.target;return e.closest("button")||e.closest("input")||e.closest("select")||e.closest("a")||e.id==="minimap"||e.closest("#minimap")||e.closest("#start-screen")||e.closest("#save-modal")||e.closest("#help-modal")||e.closest(".ui-container")}onPointerDown(t){this.isUIInteraction(t)||this.downPosition.set(t.clientX,t.clientY)}onPointerUp(t){if(this.isUIInteraction(t))return;const e=new yt(t.clientX,t.clientY);this.downPosition.distanceTo(e)>this.dragThreshold||this.handleInteraction(t)}onPointerMove(t){document.getElementById("help-modal").style.display!=="flex"&&(document.getElementById("save-modal")&&document.getElementById("save-modal").style.display==="flex"||(this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.lastClientX=t.clientX,this.lastClientY=t.clientY,this.updateCursor(),this.updateTooltip(t.clientX,t.clientY)))}updateTooltip(t,e){if(!this.tooltip)return;let i="",n=!1;this.raycaster.setFromCamera(this.mouse,this.camera);const s=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(s){const r=Math.round(s.x),o=Math.round(s.z),l=this.terrain.logicalWidth||80,h=this.terrain.logicalDepth||80;let c=Math.round(r+l/2),d=Math.round(o+h/2);c=(c%l+l)%l,d=(d%h+h)%h;const u=this.terrain.grid[c][d];if(u&&u.hasBuilding&&u.building){const f=u.building,m=f.userData.type||f.type;m==="house"?(i=`House Pop: ${Math.floor(f.userData.population||0)}/10`,n=!0):m==="castle"?(i=`Castle Pop: ${Math.floor(f.userData.population||0)}/200`,n=!0):m==="barracks"?(i=`Barracks Pop: ${Math.floor(f.userData.population||0)}/200`,n=!0):m==="tower"?(i=`Tower Pop: ${Math.floor(f.userData.population||0)}/300`,n=!0):m==="goblin_hut"?(i=`Goblin Hut Pop: ${Math.floor(f.userData.population||0)}/5
HP: ${Math.floor(f.userData.hp)}`,n=!0):m==="cave"?(i=`Goblin Cave Pop: ${Math.floor(f.userData.population||0)}/20
HP: ${Math.floor(f.userData.hp)}`,n=!0):m==="farm"&&(i=`Farm HP: ${Math.floor(f.userData.hp)}`,n=!0)}if(!n){let f=null,m=[];if(this.game&&(this.game.unitRenderer&&this.game.unitRenderer.meshGroup&&m.push(...this.game.unitRenderer.meshGroup.children),this.game.goblinManager&&this.game.goblinManager.renderer&&this.game.goblinManager.renderer.meshGroup&&m.push(...this.game.goblinManager.renderer.meshGroup.children)),m.length>0){this.raycaster.setFromCamera(this.mouse,this.camera);const x=this.raycaster.intersectObjects(m,!0);if(x.length>0){const g=x[0].point,p=this.terrain.logicalWidth||80,b=this.terrain.logicalDepth||80,_=Math.round((g.x%p+p)%p),v=Math.round((g.z%b+b)%b);f=this.terrain.findNearestEntity("unit",_,v,3)||this.terrain.findNearestEntity("goblin",_,v,3)||this.terrain.findNearestEntity("sheep",_,v,3)||this.terrain.findNearestEntity("fish",_,v,3)}}f||(f=this.terrain.findNearestEntity("unit",c,d,4)),f||(f=this.terrain.findNearestEntity("goblin",c,d,4)),f||(f=this.terrain.findNearestEntity("sheep",c,d,4)),f||(f=this.terrain.findNearestEntity("fish",c,d,4)),f&&f.getTooltip&&(i=f.getTooltip(),n=!0)}n?(this.tooltip.textContent=i,this.tooltip.style.display="block",this.tooltip.style.left=t+15+"px",this.tooltip.style.top=e+15+"px"):this.tooltip.style.display="none"}}update(){this.lastClientX!==void 0&&this.lastClientY!==void 0&&this.updateTooltip(this.lastClientX,this.lastClientY)}updateCursor(){this.raycaster.setFromCamera(this.mouse,this.camera);let t=null;t=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);const e=t?[{point:t}]:[];if(e.length>0){const n=e[0].point,s=Math.round(n.x),r=Math.round(n.z),o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;let h=Math.round(s+o/2),c=Math.round(r+l/2);h=(h%o+o)%o,c=(c%l+l)%l;const d=this.terrain.getVisualPosition(h,c,!1),u=h-o/2,f=c-l/2,m=d.x-u,x=d.z-f;this.cursor.position.set(s+m,d.y+.5,r+x),this.cursor.visible=!0,this.mode==="spawn"?this.cursor.material.color.setHex(255):this.mode==="view"?this.cursor.material.color.setHex(16777215):this.cursor.material.color.setHex(16711680)}else this.cursor.visible=!1}handleInteraction(t){if(this.game&&!this.game.gameActive)return;this.mouse.x=t.clientX/window.innerWidth*2-1,this.mouse.y=-(t.clientY/window.innerHeight)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const e=this.terrain.raycast(this.raycaster.ray.origin,this.raycaster.ray.direction);if(e){const i=e,n=Math.round(i.x),s=Math.round(i.z),r=this.terrain.logicalWidth||80,o=this.terrain.logicalDepth||80;let l=Math.round(n+r/2),h=Math.round(s+o/2);if(l=(l%r+r)%r,h=(h%o+o)%o,t.button===0){if(this.game&&!this.game.canAction()){console.warn("Action Blocked: Not enough Mana (Negative)");return}const c=i.x,d=i.z;if(this.mode==="view")return;if(this.mode==="raise")this.game&&(this.game.addRequest("raise",l,h,!0,c,d),this.game.consumeMana(10),console.log(`[Input] Request Queued: Raise at ${l},${h}`));else if(this.mode==="lower")this.game&&(this.game.addRequest("lower",l,h,!0,c,d),this.game.consumeMana(10),console.log(`[Input] Request Queued: Lower at ${l},${h}`));else if(this.mode==="cancel")this.game&&this.game.tryCancelRequest(l,h)&&console.log(`[Input] Request Canceled at ${l},${h}`);else if(this.mode==="spawn")this.game.mana>=50&&this.spawnCallback&&(this.spawnCallback(l,h,!0),this.game&&this.game.consumeMana(50));else if(this.mode==="barracks"){if(this.game){const f=1e3*((this.game.terrain?this.game.terrain.buildings.filter(m=>m.userData.type==="barracks").length:0)+1);this.game.mana>=f&&(this.game.addRequest("build_barracks",l,h,!0,c,d),this.game.consumeMana(f))}}else if(this.mode==="tower"&&this.game){const f=1e3*((this.game.terrain?this.game.terrain.buildings.filter(m=>m.userData.type==="tower").length:0)+1);this.game.mana>=f&&(this.game.addRequest("build_tower",l,h,!0,c,d),this.game.consumeMana(f))}}else if(t.button===2){if(this.game&&!this.game.canAction()||this.mode==="view")return;if(this.game){const c=i.x,d=i.z;this.game.addRequest("lower",l,h,!0,c,d),this.game.consumeMana(10)}}}this.updateCursor()}}class ar extends rr{constructor(t,e,i,n,s){super(t,e,i,n,s),this.path=null,this.pathIndex=0,this.stuckCount=0,this.pathFailCount=0,this.pathFailCount=0,this.lastPathTime=0,this.isPathfinding=!1,this.minDistToTarget=1/0,this.pathStagnation=0,this.state=null,this.simTime=0}changeState(t){this.state&&typeof this.state.exit=="function"&&this.state.exit(t);const e=this.state;this.state=t,this.state&&typeof this.state.enter=="function"&&this.state.enter(e)}isReachable(t,e){if(!this.terrain||!this.terrain.grid)return!0;const i=this.terrain&&this.terrain.logicalWidth?this.terrain.logicalWidth:160,n=this.terrain&&this.terrain.logicalDepth?this.terrain.logicalDepth:160;let s=Math.round(t),r=Math.round(e);s=(s%i+i)%i,r=(r%n+n)%n;const o=this.terrain.grid[this.gridX]?this.terrain.grid[this.gridX][this.gridZ]:null,l=this.terrain.grid[s]?this.terrain.grid[s][r]:null;if(o&&l){const h=o.regionId,c=l.regionId;if(this.terrain.needsRegionRecalc){const u=l.height,f=o.height;if(u>0&&f>0&&(h===0||c===0))return!0}if(h===c&&h!==void 0)return!0;const d=this.getDistance(t,e);if(h>0&&c>0)return d<5;if(h>0&&c===0)return!!(d<3||this.terrain.isAdjacentToRegion(s,r,h));if(h===0&&c>0)return!1}return!0}triggerMove(t,e,i){return this.smartMove(t,e,i)}smartMove(t,e,i,n=0){if(n>5)return!1;if(this.isPathfindingThrottled=!1,this.path&&this.path.length>0){const s=this.path[this.path.length-1];(Math.abs(s.x-t)>2||Math.abs(s.z-e)>2)&&(this.id===0&&console.log(`[Actor] Discarding stale path. Target changed to ${t},${e} from ${s.x},${s.z}`),this.path=null)}if(this.path&&this.path.length>0){const s=this.path[0],r=Math.abs(this.gridX-s.x),o=Math.abs(this.gridZ-s.z);if(r<.1&&o<.1)if(this.path.shift(),this.path.length===0)this.path=null;else return this.smartMove(t,e,i,n+1);else{if(this.canMoveTo(s.x,s.z))return this.isMoving&&Math.abs(this.targetGridX-s.x)<.01&&Math.abs(this.targetGridZ-s.z)<.01||this.executeMove(s.x,s.z,i),!0;this.path=null}}if(!this.path||this.path.length===0){if(this.getDistance(t,e)>4){const b=1+this.id%20*.1;if(i===0||this.lastPathTime===0||i-this.lastPathTime>b)return this.isPathfinding||(this.isUnreachable=!1,this.lastPathTime=i,!this.isReachable(t,e))||(this.isPathfinding=!0,this.terrain.findPathAsync(this.gridX,this.gridZ,t,e).then(_=>{if(this.isPathfinding=!1,_&&_.length>0){if(this.path=_,this.path.length>0){const v=this.path[0];Math.abs(this.gridX-v.x)<.5&&Math.abs(this.gridZ-v.z)<.5&&this.path.shift()}this.smartMove(t,e,this.lastPathTime,n+1)}else this.isUnreachable=!0}).catch(_=>{this.isPathfinding=!1,console.error("[Actor] Pathfinding Error:",_)})),!1;if(this.isPathfindingThrottled=!0,!this.path)return!1}if(!this.isReachable(t,e))return!1;const r=this.terrain?this.terrain.logicalWidth:160,o=this.terrain?this.terrain.logicalDepth:160;let l=t-this.gridX,h=e-this.gridZ;Math.abs(l)>r/2&&(l-=Math.sign(l)*r),Math.abs(h)>o/2&&(h-=Math.sign(h)*o);let c=Math.round(this.gridX),d=Math.round(this.gridZ);if(Math.abs(l)>.5&&Math.abs(h)>.5){const b=(c+Math.sign(l)%r+r)%r,_=(d+Math.sign(h)%o+o)%o;if(this.canMoveTo(b,_))return(!this.isMoving||Math.abs(this.targetGridX-b)>.01||Math.abs(this.targetGridZ-_)>.01)&&this.executeMove(b,_,i),!0}let f=c,m=d;if(Math.abs(l)>Math.abs(h)?f=(c+Math.sign(l)%r+r)%r:m=(d+Math.sign(h)%o+o)%o,this.canMoveTo(f,m))return(!this.isMoving||Math.abs(this.targetGridX-f)>.01||Math.abs(this.targetGridZ-m)>.01)&&this.executeMove(f,m,i),!0;let x=c,g=d;if(Math.abs(l)>Math.abs(h)?h!==0&&(g=(d+Math.sign(h)%o+o)%o):l!==0&&(x=(c+Math.sign(l)%r+r)%r),this.canMoveTo(x,g))return(!this.isMoving||Math.abs(this.targetGridX-x)>.01||Math.abs(this.targetGridZ-g)>.01)&&this.executeMove(x,g,i),!0;const p=this.getDistance(t,e);if(!this.path&&p<=80){const b=1+this.id%20*.1;if(Math.random()<.4||i-this.lastPathTime>b){if(this.isPathfindingThrottled=!1,this.terrain.pathfindingCalls>=30)return this.isPathfindingThrottled=!0,!1;if(this.lastPathTime=i,!this.isReachable(t,e))return!1;const v=this.terrain.findPath(this.gridX,this.gridZ,t,e);return v&&v.length>0?(this.path=v,this.smartMove(t,e,i)):(this.terrain.pathfindingCalls<100&&(this.isUnreachable=!0),!1)}else this.isPathfindingThrottled=!0}}return!1}updateLogic(t,e,i,n){if(this.simTime=t,this.state){this.state.update(t,e,i,n);return}this.isMoving}canMoveTo(t,e){const i=this.terrain.getTileHeight(t,e);if(i<=0)return!1;const n=this.terrain.getTileHeight(this.gridX,this.gridZ);return!(Math.abs(i-n)>2)}executeMove(t,e,i){super.startMove(t,e,i),this.targetGridX!==t&&(this.targetGridX=t),this.targetGridZ!==e&&(this.targetGridZ=e);const n=this.terrain?this.terrain.logicalWidth:160,s=this.terrain?this.terrain.logicalDepth:160;let r=this.gridX,o=this.gridZ;if(this.isMoving){const x=(i-this.moveStartTime)/this.moveDuration;if(this.getDistance(this.targetGridX,this.targetGridZ)<1){this.isMoving=!1,this.gridX=this.targetGridX,this.gridZ=this.targetGridZ;return}const p=Math.max(0,Math.min(1,x));let b=this.startGridX,_=this.startGridZ,v=this.targetGridX,w=this.targetGridZ;v-b>n/2&&(b+=n),b-v>n/2&&(b-=n),w-_>s/2&&(_+=s),_-w>s/2&&(_-=s),r=b+(v-b)*p,o=_+(w-_)*p}let l=Math.abs(t-r),h=Math.abs(e-o);l>n/2&&(l=n-l),h>s/2&&(h=s-h);const c=Math.sqrt(l*l+h*h),d=this.terrain.getTileHeight(this.gridX,this.gridZ),u=this.terrain.getTileHeight(t,e),f=Math.abs(u-d);let m=.6;u>8&&(m+=2),this.moveDuration=(m+f*1.5)*Math.max(.25,c),this.stuckCount=0}getTooltip(){let t=super.getTooltip();if(this.state&&this.state.constructor){let e=this.state.constructor.name;e=e.replace("Goblin","").replace("Unit","").replace("State",""),t+=`
State: ${e}`}else this.getBehaviorMode&&(t+=`
Mode: ${this.getBehaviorMode()}`);return this.action&&(t+=`
Act: ${this.action}`),this.isDead&&(t+=`
[DEAD]`),this.isFinished&&(t+=`
[FINISHED]`),this.raidGoal&&(t+=`
Raid: ${this.raidGoal.x.toFixed(0)},${this.raidGoal.z.toFixed(0)}`),t}getDistanceToBuilding(t){if(!t)return 1/0;let e=1;if(this.terrain&&this.terrain.getBuildingSize)e=this.terrain.getBuildingSize(t.type||(t.userData?t.userData.type:"house"));else{const d=t.type||(t.userData?t.userData.type:"house");(d==="house"||d==="farm"||d==="goblin_hut"||d==="cave")&&(e=2),(d==="mansion"||d==="barracks"||d==="tower")&&(e=3),d==="castle"&&(e=4)}const i=t.userData?t.userData.gridX:t.gridX,n=t.userData?t.userData.gridZ:t.gridZ;if(i===void 0||n===void 0)return this.getDistance(t.x,t.z);const s=i,r=i+e-1,o=n,l=n+e-1,h=Math.max(s-this.gridX,0,this.gridX-r),c=Math.max(o-this.gridZ,0,this.gridZ-l);return Math.sqrt(h*h+c*c)}getDistance(t,e){if(!this.terrain)return 0;const i=this.terrain.logicalWidth||160,n=this.logicalDepth||this.terrain.logicalDepth||160;let s=Math.abs(this.gridX-t),r=Math.abs(this.gridZ-e);return s>i/2&&(s=i-s),r>n/2&&(r=n-r),Math.sqrt(s*s+r*r)}getApproachPoint(t){if(!t)return null;if(t.gridX===void 0||t.userData&&t.userData.gridX!==void 0){const e=t.userData?t.userData:t;if(e.type&&(e.type==="house"||e.type==="farm"||e.type==="goblin_hut"||e.type==="cave"||e.type==="tower"||e.type==="barracks"||e.type==="castle")){const i=this.terrain&&this.terrain.getBuildingSize?this.terrain.getBuildingSize(e.type):1;let n=null,s=1/0;const r=e.gridX-1,o=e.gridX+i,l=e.gridZ-1,h=e.gridZ+i,c=this.terrain&&this.terrain.logicalWidth||80,d=this.terrain&&this.terrain.logicalDepth||80;for(let u=r;u<=o;u++)for(let f=l;f<=h;f++){if(u>=e.gridX&&u<e.gridX+i&&f>=e.gridZ&&f<e.gridZ+i)continue;const m=(u%c+c)%c,x=(f%d+d)%d;if(this.terrain.getTileHeight(m,x)>0){const g=this.getDistance(m,x);g<s&&(s=g,n={x:m,z:x})}}return n||{x:e.gridX,z:e.gridZ}}}return{x:t.gridX,z:t.gridZ}}}class Ni{constructor(t){this.actor=t}enter(t){}update(t,e){}exit(t){}}class or extends Ni{constructor(t){super(t),this.moveInterval=2+Math.random()*3,this.lastTime=0}enter(t){this.actor.action="Wandering",(!this.actor.path||this.actor.path.length===0)&&(this.actor.isMoving=!1),this.lastTime=0}update(t,e){this.lastTime===0&&(this.lastTime=t),!this.actor.isMoving&&t-this.lastTime>this.moveInterval&&(this.actor.moveRandomly(t),this.lastTime=t,this.moveInterval=2+Math.random()*3)}}class xi extends or{constructor(t){super(t),this.name="UnitWanderState"}enter(t){super.enter(t),this.actor.isMoving=!1,this.resumeContext?(this.resumeContext.action==="Migrating"?(this.actor.action="Migrating",this.resumeContext.migrationTarget&&(this.actor.migrationTarget=this.resumeContext.migrationTarget)):this.actor.action="Idle",this.resumeContext.target&&(this.actor.targetGridX=this.resumeContext.target.x,this.actor.targetGridZ=this.resumeContext.target.z,this.actor.lastPathTime=-100,this.actor.smartMove&&this.actor.smartMove(this.resumeContext.target.x,this.resumeContext.target.z,this.actor.simTime||0))):this.actor.action!=="Migrating"&&(this.actor.action="Idle")}update(t,e,i,n){if(this.actor.targetRequest){this.actor.changeState(new ni(this.actor));return}if(this.actor.targetGoblin||this.actor.targetBuilding){this.actor.changeState(new hi(this.actor));return}if(this.actor.checkSelfDefense&&this.actor.checkSelfDefense(n)){this.actor.changeState(new hi(this.actor));return}const s=i||this.actor.isNight||window.game&&window.game.isNight;if(s&&!this.actor.targetRequest&&!this.actor.targetGoblin&&!this.actor.targetBuilding){if(window.game){const r=window.game.findBestRequest(this.actor,!1);if(r&&r.isManual&&window.game.claimRequest(this.actor,r)){this.actor.targetRequest=r,this.actor.changeState(new ni(this.actor));return}}this.actor.changeState(new er(this.actor));return}if(this.actor.role!=="worker"&&this.actor.findRaidTarget&&this.actor.findRaidTarget()&&this.actor.action!=="Migrating"&&this.actor.action!=="Reinforcing"){this.actor.changeState(new hi(this.actor));return}if(window.game){const r=window.game.findBestRequest(this.actor,!0);if(r&&window.game.claimRequest(this.actor,r)){this.actor.id===0&&console.log(`[UnitWander] Found Job! ${r.type}.`),this.actor.targetRequest=r,this.actor.changeState(new ni(this.actor));return}}if(this.actor.role==="worker"&&!s&&!this.actor.targetGoblin&&!this.actor.targetBuilding){if(!(this.actor.lastJobAbortTime&&t-this.actor.lastJobAbortTime<5)){if(this.actor.targetRequest)return;const r=this.actor.terrain.grid[this.actor.gridX][this.actor.gridZ];!this.actor.isMoving&&!this.actor.isSleeping&&r.height>0&&(!this.actor.canBuildAt||this.actor.canBuildAt(this.actor.gridX,this.actor.gridZ)?(this.actor.buildTimer=(this.actor.buildTimer||0)+e,this.actor.buildTimer>=1&&(this.actor.tryBuildStructure(t)?(this.actor.stagnationTimer=0,this.actor.buildTimer=0):this.actor.stagnationTimer=(this.actor.stagnationTimer||0)+e)):this.actor.stagnationTimer=(this.actor.stagnationTimer||0)+e)}if(this.actor.stagnationTimer>20){this.actor.migrate(t);return}}if(this.actor.role!=="worker"&&!this.actor.targetRequest&&!this.actor.targetGoblin&&!this.actor.isMoving&&this.actor.patrol&&this.actor.patrol(t),this.actor.action==="Migrating"&&this.actor.migrationTarget){if(this.actor.migrationTimer=(this.actor.migrationTimer||0)+e,this.actor.migrationTimer>30){this.actor.migrate(t);return}const r=this.actor.checkSelfDefense(n)&&(this.actor.targetGoblin||this.actor.targetBuilding),o=this.actor.role==="worker"&&this.actor.targetRequest;if(r&&!o){this.actor.action="Fighting",this.actor.changeState(new hi(this.actor)),this.actor.migrationTarget=null;return}!this.actor.isMoving&&this.actor.migrationTarget&&(this.actor.getDistance(this.actor.migrationTarget.x,this.actor.migrationTarget.z)<2?(this.actor.action="Idle",this.actor.migrationTarget=null):this.actor.smartMove(this.actor.migrationTarget.x,this.actor.migrationTarget.z,t));return}super.update(t,e),!this.actor.isMoving&&this.actor.role==="worker"&&Math.random()<.05&&this.actor.moveRandomly(t)}}class ni extends Ni{constructor(t){super(t),this.name="JobState",this.targetRequest=t.targetRequest,this.resumeState=null,this.lastMoveAttempt=0,this.pathFailures=0,this.stuckTimer=0,this.checkStuckInterval=2,this.lastStuckCheck=0,this.lastPos={x:0,z:0},this.name="JobState"}enter(t){this.savedResumeContext={action:this.actor.action,target:this.actor.isMoving&&this.actor.targetGridX!==void 0&&this.actor.targetGridZ!==void 0?{x:this.actor.targetGridX,z:this.actor.targetGridZ}:null,migrationTarget:this.actor.migrationTarget||null},this.actor.targetBuilding=null,this.actor.isSleeping=!1,this.actor.action="Approaching Job",this.actor.isMoving=!1,this.actor.lastPathTime=-100,this.actor.isUnreachable=!1,this.targetRequest=this.actor.targetRequest,this.targetRequest&&(this.actor.getVisualX?this.actor.getVisualX(0):this.actor.gridX,this.actor.getVisualZ?this.actor.getVisualZ(0):this.actor.gridZ,this.actor.smartMove(this.targetRequest.x,this.targetRequest.z,this.actor.simTime||0)),t instanceof ni||t instanceof hi||(this.resumeState=t),this.actor.id===0&&console.log(`[JobState] Entered. Target: ${this.targetRequest?this.targetRequest.type:"None"}. ResumeCtx: ${this.savedResumeContext?this.savedResumeContext.action:"None"}`);const e=this.actor.simTime||0;this.lastStuckCheck=e;const i=this.actor.getVisualX?this.actor.getVisualX(0):this.actor.gridX,n=this.actor.getVisualZ?this.actor.getVisualZ(0):this.actor.gridZ;this.lastPos={x:i,z:n}}exit(t){t instanceof hi||t instanceof er||this.actor.targetRequest&&this.targetRequest&&this.actor.targetRequest.id===this.targetRequest.id&&(this.targetRequest.isManual||(this.actor.targetRequest=null))}getResumeState(){this.targetRequest||console.warn(`[JobState ${this.actor.id}] getResumeState called with NO targetRequest.`);const t=new xi(this.actor);return t.resumeContext=this.savedResumeContext,t}update(t,e,i,n){if(!this.targetRequest){console.warn(`[JobState ${this.actor.id}] Abort: No targetRequest (Update). Switching to Wander.`),this.actor.changeState(this.getResumeState());return}if(String(this.targetRequest.assignedTo)!==String(this.actor.id)){console.warn(`[JobState ${this.actor.id}] Ownership LOST for Job ${this.targetRequest.id}. Assignee: ${this.targetRequest.assignedTo}. Switching to Wander.`),this.actor.changeState(this.getResumeState());return}if(this.targetRequest.status==="completed"||this.targetRequest.status==="expired"){this.actor.targetRequest=null,this.actor.changeState(this.getResumeState());return}if(this.actor.targetGoblin){console.log(`[JobState ${this.actor.id}] Retaliating against Goblin ${this.actor.targetGoblin.id}!`),this.actor.changeState(new hi(this.actor));return}if(this.actor.role==="worker"){if(this.actor.checkSelfDefense&&this.actor.checkSelfDefense(n)&&(this.actor.targetGoblin||this.actor.targetBuilding)){console.log(`[JobState ${this.actor.id}] Worker found threat/target on path!`),this.actor.changeState(new hi(this.actor));return}}else if(this.actor.checkSelfDefense&&this.actor.checkSelfDefense(n)&&(this.actor.targetGoblin||this.actor.targetBuilding)){console.log(`[JobState ${this.actor.id}] Auto-engaging target!`),this.actor.changeState(new hi(this.actor));return}if(i&&this.actor.role==="worker"&&!this.targetRequest.isManual){window.game&&window.game.releaseRequest(this.actor,this.targetRequest),this.targetRequest=null,this.actor.targetRequest=null,this.actor.changeState(new er(this.actor));return}if(this.actor.getDistance(this.targetRequest.x,this.targetRequest.z)<1){if(this.actor.isMoving=!1,this.actor.id===0&&console.log("[JobState] Arrived at Job. Completing..."),this.actor.onMoveFinished&&this.actor.onMoveFinished(t),this.actor.action="Working",window.game&&window.game.completeRequest(this.actor,this.targetRequest),this.targetRequest=null,this.actor.targetRequest=null,window.game){const r=window.game.findBestRequest(this.actor);if(r&&window.game.claimRequest(this.actor,r)){this.actor.targetRequest=r,this.targetRequest=r,this.actor.action="Approaching Job",this.enter(this);return}}this.actor.changeState(this.getResumeState());return}if(this.targetRequest&&this.targetRequest.building){const r=this.targetRequest.building;if(!(this.actor.terrain&&this.actor.terrain.buildings&&this.actor.terrain.buildings.includes(r))||r.isDead){console.log(`[JobState ${this.actor.id}] Target building destroyed. Releasing job.`),window.game&&window.game.releaseRequest(this.actor,this.targetRequest),this.actor.targetRequest=null,this.targetRequest=null,this.actor.changeState(this.getResumeState());return}}if(this.actor.isMoving&&this.actor.targetGridX!==void 0&&Math.abs(this.actor.targetGridX-this.targetRequest.x)<.1&&Math.abs(this.actor.targetGridZ-this.targetRequest.z)<.1,this.targetRequest.status==="pending"||this.targetRequest.status==="assigned"){const r=this.actor.triggerMove(this.targetRequest.x,this.targetRequest.z,t);if(this.actor.isUnreachable){console.warn(`[JobState ${this.actor.id}] Abort: Target Unreachable. Req:${this.targetRequest.id} at ${this.targetRequest.x},${this.targetRequest.z}`);const h=this.actor.game||window.game;h&&h.deferRequest&&h.deferRequest(this.targetRequest,15),this.actor.targetRequest=null,this.actor.ignoredTargets&&this.actor.ignoredTargets.set(this.targetRequest.id,t+15),this.targetRequest=null,this.actor.isUnreachable=!1,this.actor.stuckCount=0,this.actor.lastJobAbortTime=t,this.actor.changeState(this.getResumeState());return}r?(this.stuckTimer=0,this.pathFailures=0):(this.lastPos||(this.lastPos={x:this.actor.gridX,z:this.actor.gridZ}),Math.abs(this.actor.gridX-this.lastPos.x)+Math.abs(this.actor.gridZ-this.lastPos.z)<.01?this.stuckTimer+=e:(this.stuckTimer=0,this.lastPos={x:this.actor.gridX,z:this.actor.gridZ})),!r&&!this.actor.isMoving&&!this.actor.isPathfinding&&this.pathFailures++;const l=(this.actor.terrain&&this.actor.terrain.findNearestEntity?this.actor.terrain.findNearestEntity("unit",this.actor.gridX,this.actor.gridZ,2):null)?150:100;if(this.pathFailures>l||this.stuckTimer>45){console.warn(`[JobState ${this.actor.id}] Abort: Path Failures > ${l} or Stuck > 45s.`);const h=this.actor.game||window.game;h&&h.deferRequest&&h.deferRequest(this.targetRequest,15),h&&h.deferRequest&&h.deferRequest(this.targetRequest,15),this.actor.targetRequest=null,this.actor.ignoredTargets&&this.actor.ignoredTargets.set(this.targetRequest.id,t+15),this.targetRequest=null,this.pathFailures=0,this.stuckTimer=0,this.actor.lastJobAbortTime=t,this.actor.changeState(this.getResumeState());return}if(t-this.lastStuckCheck>=this.checkStuckInterval){this.lastStuckCheck=t;const h=this.actor.getVisualX?this.actor.getVisualX(t):this.actor.gridX,c=this.actor.getVisualZ?this.actor.getVisualZ(t):this.actor.gridZ,d=Math.abs(h-this.lastPos.x),u=Math.abs(c-this.lastPos.z);if(d<.5&&u<.5){if(this.stuckTimer+=this.checkStuckInterval,this.stuckTimer>45){console.warn(`[JobState ${this.actor.id}] Abort: Physical Stuck > 45s.`);const m=this.actor.game||window.game;m&&m.deferRequest&&m.deferRequest(this.targetRequest,15),this.actor.targetRequest=null,this.actor.ignoredTargets&&this.actor.ignoredTargets.set(this.targetRequest.id,t+15),this.targetRequest=null,this.stuckTimer=0,this.actor.lastJobAbortTime=t,this.actor.changeState(this.getResumeState());return}}else this.targetRequest&&(this.stuckTimer=0),this.lastPos={x:h,z:c}}}}}class hi extends Ni{constructor(t){super(t),this.stagnationTimer=0,this.name="CombatState"}enter(t){this.savedResumeContext={action:this.actor.action,target:this.actor.isMoving&&this.actor.targetGridX!==void 0&&this.actor.targetGridZ!==void 0?{x:this.actor.targetGridX,z:this.actor.targetGridZ}:null,migrationTarget:this.actor.migrationTarget||null},this.actor.isSleeping=!1,this.actor.migrationTarget=null,this.actor.targetRequest&&(window.game&&window.game.releaseRequest&&(console.log(`[CombatState ${this.actor.id}] Releasing Job ${this.actor.targetRequest.id} to fight!`),window.game.releaseRequest(this.actor,this.actor.targetRequest)),this.actor.targetRequest=null),this.actor.action="Fighting",this.stagnationTimer=0,this.update(this.actor.simTime||0,0)}getResumeState(){const t=new xi(this.actor);return t.resumeContext=this.savedResumeContext,t}update(t,e,i,n){if(!this.actor.targetGoblin&&!this.actor.targetBuilding&&(this.actor.findNextEnemy&&this.actor.findNextEnemy()||(this.actor.findRaidTarget&&this.actor.findRaidTarget(),!this.actor.targetGoblin&&!this.actor.targetBuilding&&this.actor.checkSelfDefense&&this.actor.checkSelfDefense(n))),!this.actor.targetGoblin&&!this.actor.targetBuilding&&!this.actor.targetRaidPoint){this.actor.changeState(this.getResumeState());return}if(this.actor.role==="worker"&&window.game){const c=window.game.findBestRequest(this.actor,!1);if(c&&c.isManual&&window.game.claimRequest(this.actor,c)){this.actor.targetRequest=c,this.actor.changeState(new ni(this.actor));return}}if(this.actor.targetBuilding){const c=this.actor.terrain||window.game?.terrain;if(c&&c.buildings&&!c.buildings.includes(this.actor.targetBuilding)){this.actor.targetBuilding=null;return}}if(this.stagnationTimer+=e,this.stagnationTimer>20){this.actor.targetGoblin=null,this.actor.targetBuilding=null,this.actor.changeState(this.getResumeState());return}let s=this.actor.targetGoblin||this.actor.targetBuilding;if(!s){if(this.actor.checkSelfDefense&&this.actor.checkSelfDefense(n)&&(this.actor.targetGoblin||this.actor.targetBuilding))return;if(this.actor.targetRaidPoint){this.actor.smartMove(this.actor.targetRaidPoint.x,this.actor.targetRaidPoint.z,t),this.actor.action="Patrolling";return}return}let r=999;this.actor.targetGoblin?r=this.actor.getDistance(this.actor.targetGoblin.gridX,this.actor.targetGoblin.gridZ):this.actor.targetBuilding&&(r=this.actor.getDistance(this.actor.targetBuilding.gridX,this.actor.targetBuilding.gridZ),this.actor.targetBuilding.userData&&this.actor.targetBuilding.userData.type==="cave"&&(r-=1)),r<3&&(this.stagnationTimer=0);let o=1.5;if(this.actor.role==="wizard"&&(o=8),r>o){let c=s.gridX,d=s.gridZ;this.actor.smartMove(c,d,t),this.actor.action="Chasing";return}this.actor.action="Fighting",this.actor.isMoving=!1;const l=s.gridX-this.actor.gridX,h=s.gridZ-this.actor.gridZ;if(this.actor.rotationY=Math.atan2(l,h),this.actor.attackCooldown>0){this.actor.attackCooldown-=e;return}if(this.actor.targetGoblin)if(this.actor.attackGoblin)this.actor.attackGoblin(this.actor.targetGoblin);else{let c=this.actor.damage||10;this.actor.targetGoblin.takeDamage(c,this.actor),this.actor.targetGoblin.isDead&&(this.actor.targetGoblin=null),this.actor.attackCooldown=this.actor.attackRate||1}else if(this.actor.targetBuilding)if(this.actor.attackBuilding)this.actor.attackBuilding(this.actor.targetBuilding);else{let c=this.actor.damage||10;s.userData&&s.userData.hp!==void 0&&(s.userData.hp-=c,s.userData.hp<=0&&window.game&&window.game.terrain&&(window.game.terrain.removeBuilding(s),this.actor.targetBuilding=null)),this.actor.attackCooldown=this.actor.attackRate||1}}}class er extends Ni{constructor(t){super(t)}enter(){this.actor.id===0&&console.log("[SleepState] Entering Sleep logic."),this.actor.action="Sleeping",this.actor.isSleeping=!1,this.update(this.actor.simTime||0,0,!0)}exit(){this.actor.isSleeping=!1}update(t,e,i,n){const s=i||window.game&&window.game.isNight;if(this.actor.targetRequest&&this.actor.targetRequest.isManual){this.actor.isSleeping=!1,this.actor.targetRequest.status="assigned",this.actor.changeState(new ni(this.actor));return}if(!s){this.actor.isSleeping=!1,this.actor.changeState(new xi(this.actor));return}if(this.actor.checkSelfDefense&&this.actor.checkSelfDefense(n)&&(this.actor.targetGoblin||this.actor.targetBuilding)){this.actor.isSleeping=!1,this.actor.changeState(new hi(this.actor));return}if(this.actor.role==="worker"&&window.game){const o=window.game.findBestRequest(this.actor,!1);if(o&&o.isManual&&window.game.claimRequest(this.actor,o)){this.actor.isSleeping=!1,this.actor.targetRequest=o,this.actor.changeState(new ni(this.actor));return}}if(this.actor.isSleeping)return;const r=this.actor.findNearestShelter?this.actor.findNearestShelter():null;r?this.actor.getDistance(r.gridX,r.gridZ)<1?(this.actor.isSleeping=!0,this.actor.isMoving=!1,this.actor.action="Sleeping"):(this.actor.action="Going Home",this.actor.smartMove(r.gridX,r.gridZ,t)):(this.actor.isSleeping=!0,this.actor.isMoving=!1)}}class at extends ar{static assets={geometries:{},materials:{},textures:{}};static nextId=0;static async initAssets(t,e){if(at.assets.initialized||at.assets.initializing)return;at.assets.initializing=!0,console.log("[Unit] Starting initAssets...");const i=async n=>{console.log(`[Unit] Yielding: ${n||""}`),t&&await t(!0),console.log(`[Unit] Resumed: ${n||""}`)};e&&e("Initializing Units (Geometries)...");try{console.log("[Unit] Creating Geometries...");const n=new le(.3,.35,.2);n.translate(0,.3,0),at.assets.geometries.body=n;const s=new le(.25,.25,.25);s.translate(0,.6,0),at.assets.geometries.head=s;const r=new Ui(.2,.2);r.translate(0,.6,.126),at.assets.geometries.facePlane=r;const o=new le(.1,.25,.1);o.translate(0,-.1,0),at.assets.geometries.limb=o;const l=new le(.05,.5,.05);l.translate(0,.25,0),at.assets.geometries.sword=l;const h=new le(.05,.8,.05);h.translate(0,0,0),at.assets.geometries.staff=h}catch(n){console.error("[Unit] Error creating geometries:",n)}await i("After Geometries"),e&&e("Initializing Units (Hats)...");try{console.log("[Unit] Creating Hats..."),new ii(.25,.25,.02,16).translate(0,0,0),new ui(.15,.4,16).translate(0,.2,0);const r=new ui(.2,.5,16);r.translate(0,.25,0),at.assets.geometries.wizardHat=r;const o=new ii(.3,.3,.02,16);at.assets.geometries.wizardHatBrim=o;const l=new ii(.04,.02,.25,8);l.translate(0,.15,0),at.assets.geometries.jobIndicatorTop=l;const h=new Hn(.04,8,8);h.translate(0,-.05,0),at.assets.geometries.jobIndicatorDot=h}catch(n){console.error("[Unit] Error creating hats:",n)}await i("After Hats"),e&&e("Initializing Units (Materials)...");try{console.log("[Unit] Creating Materials..."),at.assets.materials.skin=new Ue({color:16764074,roughness:.8}),at.assets.materials.clothes=new Ue({color:8934707,roughness:1}),at.assets.materials.tool=new Ue({color:5592405,metalness:.5}),at.assets.materials.hat=new Ue({color:9127187,roughness:1}),at.assets.materials.armor=new Ue({color:11184810,metalness:.8,roughness:.2}),at.assets.materials.helmet=new Ue({color:8947848,metalness:.9,roughness:.1}),at.assets.materials.robe=new Ue({color:4474009,roughness:1}),at.assets.materials.wizardHat=new Ue({color:3355528,roughness:1}),at.assets.materials.metal=new Ue({color:14540253,metalness:.9,roughness:.2}),at.assets.materials.wood=new Ue({color:9127187,roughness:.9}),at.assets.materials.darkMagic=new Ue({color:3342387,roughness:1})}catch(n){console.error("[Unit] Error creating materials:",n)}await i("After Materials"),at.assets.materials.redIndicator=new Ue({color:16711680,emissive:16711680,emissiveIntensity:1,roughness:.05,metalness:.5}),e&&e("Initializing Units (Textures)...");try{console.log("[Unit] Creating Face Texture..."),at.assets.textures.face=at.createFaceTexture(),at.assets.materials.face=new Ue({map:at.assets.textures.face,transparent:!0}),await i("After Face Texture"),e&&e("Initializing Units (Hair)..."),console.log("[Unit] Creating Hair Texture..."),at.assets.textures.hair=at.createHairTexture(),at.assets.materials.hair=new Kt({map:at.assets.textures.hair,transparent:!0})}catch(n){console.error("[Unit] Error creating textures:",n)}at.assets.materials.heads=null,at.assets.initialized=!0,console.log("[Unit] initAssets Complete.")}static createFaceTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");return e.fillStyle="#FFCCAA",e.fillRect(0,0,64,64),e.fillStyle="#4A3000",e.fillRect(0,0,64,15),e.fillStyle="#000000",e.fillRect(15,25,8,8),e.fillRect(41,25,8,8),e.fillStyle="#A0522D",e.fillRect(20,45,24,4),new we(t)}static createHairTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#FFFFFF",e.fillRect(0,0,64,64),e.fillStyle="#DDDDDD";for(let i=0;i<40;i++)e.fillRect(Math.random()*60,Math.random()*60,4,4);return new we(t)}constructor(t,e,i,n,s,r=!1,o=null){super(t,e,i,n,"unit"),this.id=at.nextId++,console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${s} Pos:${i},${n} Special:${r}`),this.gridX=i!==void 0?i:20,this.gridZ=n!==void 0?n:20;let l=r;typeof s=="boolean"&&(l=s,s="worker"),this.role=s||"worker",this.type=this.role,this.isSpecial=l,this.squadId=o,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.lastGridX=this.gridX,this.lastGridZ=this.gridZ,this.stagnationTimer=0,this.buildStagnationCount=0,this.lastTime=0,this.lastGatherTime=-Math.random()*30,this.position=new U,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}};let h=Ee.units[this.role];h||(h=Ee.units.worker);let c=Ee.units.worker.hp;if(h.hpMultiplier?c*=h.hpMultiplier:h.hp&&(c=h.hp),this.hp=c+Math.floor(Math.random()*15),this.isSpecial&&h.specialMultiplier){const m=h.specialMultiplier;m.hp&&(this.hp=Math.floor(this.hp*m.hp))}this.maxHp=this.hp,this.attackCooldown=0,this.attackRate=h.attackRate||1;let d=Ee.units.worker.damage;h.damageMultiplier?this.damage=Math.floor(d*h.damageMultiplier):h.damage?this.damage=h.damage:this.damage=d,this.isSpecial&&h.specialMultiplier&&h.specialMultiplier.damage&&(this.damage=Math.floor(this.damage*h.specialMultiplier.damage)),this.targetGoblin=null,this.targetRaidPoint=null;const u=Math.random()*(h.lifespanVariance||0);let f=(h.lifespanBase||80)+u;this.isSpecial&&h.specialMultiplier&&h.specialMultiplier.lifespan&&(f*=h.specialMultiplier.lifespan),this.lifespan=f,this.age=20,this.isDead=!1,this.isSleeping=!1,this.updatePosition(),this.moveTimer=0,this.moveDuration=1e3,this.moveStartTime=0,this.startGridX=0,this.startGridZ=0,this.targetGridX=0,this.targetGridZ=0,this.ignoredTargets=new Map,this.lastTime=0,this.moveInterval=2e3+Math.random()*3e3,(this.role==="knight"||this.role==="wizard")&&(this.moveInterval=0),this.stagnationTimer=0,this.huntingCooldown=0,this.target=null,this.targetX=0,this.targetZ=0,typeof xi<"u"&&this.changeState(new xi(this)),this.terrain&&this.terrain.registerEntity&&this.terrain.registerEntity(this,this.gridX,this.gridZ,"unit"),console.log(`[UnitCore.js] Unit Created ID:${this.id} Role:${this.role} Pos:${this.gridX},${this.gridZ}`),this.wanderCount=0,this.migrationTarget=null,this.ignoredTargets=new Map,this.debugFrame=0}takeDamage(t,e){this.isDead||this.isFinished||(this.hp-=t,isNaN(this.hp)&&(this.hp=0),this.hp<=0?(this.hp=0,this.die(),e&&e.increasePlunder&&e.increasePlunder()):(this.lastHitTime=this.simTime||0,!this.targetGoblin&&e&&e.hp>0&&(this.targetGoblin=e)))}die(){if(this.isDead)return;this.isDead=!0,console.log(`Unit ${this.id} (${this.role}) DIED. R.I.P.`);const t=this.game||window.game;this.targetRequest&&t&&(console.log(`[Unit ${this.id}] Releasing request via ${t===this.game?"this.game":"window.game"}`),t.releaseRequest(this,this.targetRequest),this.targetRequest=null),this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this),this.createCross()}attackGoblin(t){if(!(this.attackCooldown>0)){if(t.isDead){this.targetGoblin=null;return}if(console.log(`[Unit Debug] ATTACKING Goblin ${t.id}`),this.role==="wizard"){if(this.limbs.leftArm.x=-Math.PI,this.limbs.rightArm.x=-Math.PI,window.game&&window.game.spawnProjectile){const e=this.position.clone().add(new U(0,.9,0)),i=this.terrain.getTileHeight(t.gridX,t.gridZ),n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80,r=new U(t.gridX-n/2,i+1,t.gridZ-s/2);window.game.spawnProjectile(e,r)}setTimeout(()=>{this.isDead||(this.limbs.leftArm.x=0,this.limbs.rightArm.x=0)},500)}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200);t.takeDamage(this.damage),(this.role==="knight"||this.role==="wizard")&&this.reportEnemy(t),t.hp<=0&&(t.isDead=!0,this.targetGoblin=null,window.game&&(this.role==="knight"||this.role==="wizard")&&this.searchForHut(t.gridX,t.gridZ)),this.attackCooldown=this.attackRate}}attackBuilding(t,e){if(this.attackCooldown>0||!t||!t.userData)return;const i=e!==void 0?e:this.damage||10,n=t.userData.type;if(t.takeDamage){t.takeDamage(i),t.hp<=0&&(this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ)),this.attackCooldown=this.attackRate;return}if(n==="farm")t.userData.hp===void 0&&(t.userData.hp=5),t.userData.hp>5&&(t.userData.hp=5),t.userData.hp-=i,console.log(`Unit ${this.id} attacking Farm. HP: ${t.userData.hp}`),t.userData.hp<=0&&(console.log("Farm Destroyed!"),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ));else if(n==="house"||n==="mansion"||n==="castle"||n==="tower"||n==="barracks"){let s=t.userData.population||0;if(s<=0){console.log(`Unit ${this.id} destroyed Empty ${n}!`),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ),this.attackCooldown=this.attackRate;return}if(t.userData.population-=Math.ceil(i/2),t.population=t.userData.population,console.log(`Unit ${this.id} attacked ${n}. Pop remaining: ${t.userData.population}`),t.userData.population<=0)console.log(`${n} Destroyed (Population wiped out)!`),this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ);else{let r=.5;n==="tower"&&(r=2),n==="barracks"&&(r=1.5),n==="castle"&&(r=2);const o=Math.floor(s*r*.5);o>0&&(console.log(`[Combat] ${n} (Pop ${s}) retaliates! Deals ${o} dmg to Unit ${this.id}`),this.takeDamage(o))}}else t.userData.hp===void 0&&(t.userData.hp=t.userData.type==="cave"?200:100),t.userData.hp-=i,console.log(`Unit ${this.id} attacking ${t.userData.type}. HP: ${t.userData.hp}`),t.userData.hp<=0&&(this.terrain.removeBuilding(t),this.targetBuilding=null,this.searchSurroundings(this.gridX,this.gridZ));this.attackCooldown=this.attackRate}debugGetAge(){return"DEBUG_AGE_"+this.age}getDefaultState(){return new xi(this)}resetToDefaultState(){console.log(`[Unit ${this.id}] Resetting to default state.`),this.targetRequest=null,this.isMoving=!1,this.isUnreachable=!1,this.stagnationCount=0,this.stuckCount=0,this.changeState&&this.changeState(this.getDefaultState())}checkSelfDefense(t,e=!1){let i=null,n=1/0;const s=this.targetGoblin&&!this.targetGoblin.isDead,r=this.targetBuilding&&this.targetBuilding.userData&&this.targetBuilding.userData.hp>0;let o=this.action==="Chasing"||this.action==="Fighting"||this.action==="Sieging"||this.action==="Unstuck"||this.action==="Reinforcing";this.role==="worker"&&this.targetRequest&&(o=!0),this.scanTimer=(this.scanTimer||0)+1;let l=30;(s||r)&&(l=300);const h=e||this.scanTimer>l;let c=!o||!s&&!r||h;if(this.role==="worker"&&this.targetRequest&&!h&&(c=!1),(this.action==="Reinforcing"||this.action==="Migrating"||this.migrationTarget)&&!h)return!1;const d=window.game&&window.game.frameCount?window.game.frameCount:0;if(!h&&(d+this.id)%20!==0){if((this.role==="knight"||this.role==="wizard")&&(d+this.id)%10!==0)return!1;if(this.role==="worker")return!1}if(c){h&&(this.scanTimer=0);const u=this.targetGoblin?this.targetGoblin.id:this.targetBuilding?this.targetBuilding.id:null,f=t||(window.game&&window.game.goblinManager?window.game.goblinManager.goblins:[]),m=this.role==="knight"||this.role==="wizard"?50:15,x=this.terrain.findBestTarget("goblin",this.gridX,this.gridZ,m,(_,v)=>{if(_.isDead||this.ignoredTargets.has(_.id))return 1/0;const w=this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ],M=this.terrain.grid[_.gridX]&&this.terrain.grid[_.gridX][_.gridZ];if(w&&M){const C=w.regionId,P=M.regionId;if(C>0&&P>0&&C!==P||C===0&&P>0||C>0&&P===0)return 1/0}let A=m;if(_.id===u&&(A=m*2),v>A)return 1/0;const R=this.terrain.getTileHeight(this.gridX,this.gridZ),T=this.terrain.getTileHeight(_.gridX,_.gridZ);if(Math.abs(R-T)>10)return 1/0;let y=v-1e3;return T>8&&(y+=20),_.id===u&&(y-=500),y},f);if(x){let v=this.getDistance(x.gridX,x.gridZ)-1e3;this.terrain.getTileHeight(x.gridX,x.gridZ)>8&&(v+=20),x.id===u&&(v-=500),n=v,i={type:"goblin",obj:x}}const g=this.role==="knight"||this.role==="wizard"?50:10,p=this.terrain.findBestTarget("building",this.gridX,this.gridZ,g,(_,v)=>{if(this.role==="worker"&&_.userData.type!=="goblin_hut"&&_.userData.type!=="cave"||_.userData.type!=="goblin_hut"&&_.userData.type!=="cave"||_.userData&&_.userData.hp<=0||this.ignoredTargets.has(_.id)||v>g)return 1/0;let w=v-5;return _.id===u&&(w-=500),v<8&&(this.role==="knight"||this.role==="wizard")&&(w-=2e3),v<4&&this.role==="worker"&&(w-=2e3),w},t?null:this.terrain.buildings);if(p){const _=this.getDistance(p.gridX,p.gridZ);let v=_-5;p.id===u&&(v-=500),_<8&&(this.role==="knight"||this.role==="wizard")&&(v-=2e3),_<4&&this.role==="worker"&&(v-=2e3),v<n&&(n=v,i={type:"building",obj:p})}this.targetGoblin=null,this.targetBuilding=null,i&&(i.type==="goblin"?this.targetGoblin=i.obj:this.targetBuilding=i.obj);const b=this.findRaidTarget();this.targetGoblin&&b&&this.getDistance(this.targetGoblin.gridX,this.targetGoblin.gridZ)>5&&(this.targetGoblin=null)}if(!this.targetGoblin&&c){const u=this.role==="worker"?15:40;this.findTargetBuilding(u)}return!!this.targetGoblin||!!this.targetBuilding}findNextEnemy(){return this.checkSelfDefense(null,!0)}searchForHut(t,e){this.findTargetBuilding(40)}findTargetBuilding(t){if(!this.terrain.buildings)return;const e=this.terrain.buildings;let i=null,n=1/0,s=null;const r=t!==void 0?t:1/0;for(const o of e)if(!(this.role==="worker"&&o.type!=="goblin_hut")&&(o.type==="goblin_hut"||o.type==="cave")){const l=this.getDistance(o.gridX,o.gridZ);if(l>r)continue;l<n&&(n=l,i=o,s=o.type)}this.role==="knight"&&Math.random()<.001&&console.log(`[Unit Debug] Targeted: ${this.targetGoblin?"Goblin":this.targetBuilding?this.targetBuilding.type:"None"}`),i&&s&&(this.targetBuilding=i,this.reportEnemy(i))}reportEnemy(t){if(!t)return;const e=t.gridX,i=t.gridZ;this.squadId&&window.game?window.game.reportSquadTarget(this.squadId,e,i):window.game&&window.game.reportGlobalBattle(e,i),this.game&&this.game.battleMemory&&this.game.battleMemory.reportRaid(e,i,this.game.simTotalTimeSec||0)}findRaidTarget(){if(this.squadId&&window.game){const s=window.game.getSquad(this.squadId);if(s&&s.target){const o=(window.game.simTotalTimeSec||0)-s.target.time;if(Math.random()<.05&&this.role==="knight"){const l=this.getDistance(s.target.x,s.target.z);console.log(`[Unit ${this.id} SquadDebug] ID:${this.squadId} Target:${s.target.x},${s.target.z} Dist:${l.toFixed(1)} Age:${o.toFixed(1)}s Reachable:${this.isReachable(s.target.x,s.target.z)} `)}if(o<30&&this.getDistance(s.target.x,s.target.z)>2){if(this.isReachable(s.target.x,s.target.z))return this.targetRaidPoint={x:s.target.x,z:s.target.z},!0;{const h=this.terrain.grid[this.gridX][this.gridZ];if(h&&h.regionId>0){const c=this.terrain.findClosestReachablePoint(s.target.x,s.target.z,h.regionId);if(c)return this.targetRaidPoint={x:c.x,z:c.z},!0}}}}}if((this.role==="knight"||this.role==="wizard")&&window.game&&window.game.battleHotspots&&window.game.battleHotspots.length>0){const s=window.game.simTotalTimeSec||0;let r=null,o=1/0;for(const l of window.game.battleHotspots){if(s-l.time>30)continue;let h=l.x,c=l.z,d=this.getDistance(h,c);if(!this.isReachable(h,c)){let f=!1;const m=this.terrain.grid[this.gridX][this.gridZ];if(m&&m.regionId>0){const x=this.terrain.findClosestReachablePoint(h,c,m.regionId);x&&(h=x.x,c=x.z,d=this.getDistance(h,c),f=!0)}if(!f)continue}if(d<2)continue;let u=d;if(this.targetRaidPoint){const f=this.targetRaidPoint.x-h,m=this.targetRaidPoint.z-c;Math.abs(f)<1&&Math.abs(m)<1&&(u-=15)}u<o&&(o=u,r={x:h,z:c})}if(r)return this.targetRaidPoint={x:r.x,z:r.z},!0}let t=[];const e=this.game?this.game.simTotalTimeSec:0;if(this.game&&this.game.battleMemory&&(t=this.game.battleMemory.getPriorities(e)),!t||t.length===0)return;let i=null,n=1/0;return t.forEach(s=>{let r=s.x,o=s.z,l=this.getDistance(r,o);if(l<4||this.ignoredTargets&&this.ignoredTargets.has(`${s.x},${s.z}`))return;if(this.terrain.grid){const c=this.terrain.logicalWidth||80,d=this.terrain.logicalDepth||80;let u=Math.round(r),f=Math.round(o);u=(u%c+c)%c,f=(f%d+d)%d;const m=this.terrain.grid[this.gridX][this.gridZ],x=this.terrain.grid[u]?this.terrain.grid[u][f]:null;if(m&&x&&m.regionId!==x.regionId&&m.regionId>0&&x.regionId>0){const g=this.terrain.findClosestReachablePoint(r,o,m.regionId);if(g)r=g.x,o=g.z,l=this.getDistance(r,o);else return}}let h=l;if(this.targetRaidPoint){const c=this.targetRaidPoint.x-r,d=this.targetRaidPoint.z-o;Math.abs(c)<1&&Math.abs(d)<1&&(h-=15)}h<n&&(n=h,i={x:r,z:o})}),i?(this.targetRaidPoint=i,!0):!1}findNearestShelter(){if(!this.terrain||!this.terrain.buildings)return null;let t=null,e=1/0;for(const i of this.terrain.buildings)if(!(this.ignoredTargets&&this.ignoredTargets.has(i.id))&&!(this.ignoredTargets&&this.ignoredTargets.has(`${i.gridX},${i.gridZ}`))&&(i.type==="house"||i.type==="castle")&&i.userData&&i.userData.hp>0){const n=this.getDistance(i.gridX,i.gridZ);n<e&&(e=n,t=i)}return t}checkArrivalAtRaidPoint(){if(!this.targetRaidPoint)return;this.getDistance(this.targetRaidPoint.x,this.targetRaidPoint.z)<=2&&(console.log(`[Unit ${this.id}] Arrived at Raid Point. Scanning...`),this.searchSurroundings(this.gridX,this.gridZ),!this.targetGoblin&&!this.targetBuilding&&(console.log(`[Unit ${this.id}] Nothing found at Raid Point. Clearing Shared Memory.`),this.homeBase&&this.homeBase.userData&&this.homeBase.userData.memory?this.homeBase.userData.memory.reportClear(this.targetRaidPoint.x,this.targetRaidPoint.z):this.game&&this.game.battleMemory&&this.game.battleMemory.reportClear(this.targetRaidPoint.x,this.targetRaidPoint.z),this.targetRaidPoint=null))}searchSurroundings(t,e,i){if(!this.game||this.role==="worker"&&this.targetRequest)return;const n=window.game&&window.game.frameCount?window.game.frameCount:0;if((n+this.id+5)%20!==0){if((this.role==="knight"||this.role==="wizard")&&(n+this.id+5)%10!==0)return;if(this.role==="worker")return}const s=i||(window.game&&window.game.goblinManager?window.game.goblinManager.goblins:[]);if(this.terrain&&this.terrain.findBestTarget){const r=this.role==="knight"||this.role==="wizard"?50:12,o=this.terrain.findBestTarget("goblin",t,e,r,(h,c)=>{const d=window.game?window.game.gameTotalTime:Date.now(),u=c<5;if(!u&&this.ignoredTargets.has(h.id)&&d<this.ignoredTargets.get(h.id)||h.isDead)return 1/0;const f=this.terrain.getTileHeight(this.gridX,this.gridZ),m=this.terrain.getTileHeight(h.gridX,h.gridZ);if(Math.abs(f-m)>10)return 1/0;if(this.terrain.grid){const x=this.terrain.grid[this.gridX][this.gridZ],g=this.terrain.grid[h.gridX][h.gridZ];if(x&&g&&x.regionId!==g.regionId&&x.regionId>0&&g.regionId>0)return 1/0}if(!u&&this.terrain.grid){const x=this.terrain.grid[this.gridX][this.gridZ],g=this.terrain.grid[h.gridX][h.gridZ];if(x&&g&&x.regionId!==g.regionId&&x.regionId>0&&g.regionId>0)return 1/0}return c},s);if(o){this.targetGoblin=o,this.reportEnemy(o),console.log(`Unit ${this.id} found Goblin via Spatial Search!`);return}const l=this.terrain.findBestTarget("building",t,e,25,(h,c)=>{const d=window.game?window.game.gameTotalTime:Date.now(),u=h.userData&&h.userData.id||h.id;if(u&&this.ignoredTargets.has(u)&&d<this.ignoredTargets.get(u))return 1/0;if(h.userData.type==="goblin_hut"||h.userData.type==="cave"){if(this.terrain.grid){const f=this.terrain.grid[this.gridX][this.gridZ],m=this.terrain.grid[h.gridX][h.gridZ];if(f&&m&&f.regionId!==m.regionId&&f.regionId>0&&m.regionId>0)return 1/0}return c}return 1/0});if(l){console.log(`Unit ${this.id} found Base via Spatial Search!`),this.targetBuilding=l,this.reportEnemy(l);return}}}patrol(t){if(this.patrolTarget)if(this.getDistance(this.patrolTarget.x,this.patrolTarget.z)<3)if(this.patrolTimer=(this.patrolTimer||0)+1,this.patrolTimer>100)this.patrolTarget=null,this.patrolTimer=0;else{Math.random()<.05&&this.moveRandomly(t);return}else{this.triggerMove(this.patrolTarget.x,this.patrolTarget.z,t);return}if(this.terrain.buildings&&this.terrain.buildings.length>0){const e=Math.floor(Math.random()*this.terrain.buildings.length),i=this.terrain.buildings[e];this.patrolTarget={x:i.gridX,z:i.gridZ},this.patrolTimer=0,this.triggerMove(i.gridX,i.gridZ,t)}else this.moveRandomly(t)}onMoveFinished(t){this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0,this.tryBuildStructure(t)?(this.action==="Migrating"?(console.log(`Unit ${this.id} built structure during migration. Stopping.`),this.action="Idle",this.migrationTarget=null,this.migrationTimer=0):this.action==="Going to Work"||this.action,this.buildStagnationCount=0):this.migrationTarget?(this.role==="worker"?(console.log(`Unit ${this.id} (Worker) migration target invalid for build. Searching nearby...`),this.moveRandomly(t),this.isMoving||(this.action="Idle")):(console.log(`Unit ${this.id} (${this.role}) finished migrating. Resuming Idle.`),this.action="Idle",this.migrationTarget=null),this.buildStagnationCount=0):this.targetRequest?this.buildStagnationCount=0:(this.buildStagnationCount=(this.buildStagnationCount||0)+1,this.buildStagnationCount>5&&(console.log(`Unit ${this.id} stuck/stagnant (No Build). Migrating...`),this.migrate(t),this.buildStagnationCount=0))}onMoveStep(t){const e=Math.sin(t*Math.PI*4)*.5;this.limbs.leftArm.x=e,this.limbs.rightArm.x=-e,this.limbs.leftLeg.x=-e,this.limbs.rightLeg.x=e,this.mesh&&(this.mesh.position.copy(this.position),this.rotationY!==void 0&&(this.mesh.rotation.y=this.rotationY))}triggerMove(t,e,i){const n=this.smartMove(t,e,i);return n?this.stuckCount=0:!this.isMoving&&!this.isPathfinding&&!this.isPathfindingThrottled&&(this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>10&&this.handleStuck()),n}handleStuck(){const t=window.game?window.game.gameTotalTime:0;console.log(`Unit ${this.id} stuck. Handling stuck state...`),this.path=null;const e=t+5e3;this.targetGoblin&&(this.ignoredTargets.set(this.targetGoblin.id,e),this.ignoredTargets.set(`${this.targetGoblin.gridX},${this.targetGoblin.gridZ}`,e),this.targetGoblin=null),this.targetBuilding&&(this.ignoredTargets.set(this.targetBuilding.id,e),this.ignoredTargets.set(`${this.targetBuilding.gridX},${this.targetBuilding.gridZ}`,e),this.targetBuilding=null),this.targetRaidPoint&&(this.ignoredTargets.set(`${this.targetRaidPoint.x},${this.targetRaidPoint.z}`,e),this.targetRaidPoint=null),this.stuckCount=0,this.action="Idle",this.isMoving=!1,console.warn(`[Unit ${this.id}] Stuck Recovery triggered. Resetting to Idle.`)}canMoveTo(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80;let s=t,r=e;s<0&&(s=i-1),s>=i&&(s=0),r<0&&(r=n-1),r>=n&&(r=0);const o=this.terrain.getTileHeight(this.gridX,this.gridZ),l=this.terrain.getTileHeight(s,r);if(l<=0){const d=this.game?this.game.gameTotalTime:Date.now();return d-(this.lastWaterLogTime||0)>5e3&&(console.log(`[Unit ${this.id}] Blocked by Water at ${s},${r} H:${l}`),this.lastWaterLogTime=d),!1}if(l>8&&console.log(`[Unit ${this.id}] Moving onto Rock at ${s},${r} H:${l} (Speed Penalty)`),Math.abs(l-o)>2)return console.log(`[Unit ${this.id}] Blocked by Slope at ${s},${r} H:${o}->${l}`),!1;if(!this.terrain||!this.terrain.grid)return!0;const h=this.terrain.grid[s];if(!h)return!0;const c=h[r];return!c||c.hasBuilding&&c.building,!0}executeMove(t,e,i){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;t<0&&(t=n-1),t>=n&&(t=0),e<0&&(e=s-1),e>=s&&(e=0),super.startMove(t,e,i),(!this.action||this.action==="Idle"||this.action==="Wandering"||this.action==="Patrolling")&&(this.action="Moving");const r=this.terrain.getTileHeight(this.gridX,this.gridZ),o=this.terrain.getTileHeight(t,e),l=Math.abs(o-r);let h=.8;o>8&&(h+=2);let c=this.gridX,d=this.gridZ;if(this.isMoving){const x=(i-this.moveStartTime)/this.moveDuration,g=Math.max(0,Math.min(1,x));let p=this.startGridX,b=this.startGridZ,_=this.targetGridX,v=this.targetGridZ;_-p>n/2&&(p+=n),p-_>n/2&&(p-=n),v-b>s/2&&(b+=s),b-v>s/2&&(b-=s),c=p+(_-p)*g,d=b+(v-b)*g}let u=Math.abs(t-c),f=Math.abs(e-d);u>n/2&&(u=n-u),f>s/2&&(f=s-f);const m=Math.sqrt(u*u+f*f);this.moveDuration=h*Math.max(.1,m)+l*1,this.stuckCount=0}gatherResources(t){if(t-this.lastGatherTime<5e3)return;this.lastGatherTime=t;const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=!1,s=!1;const r=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:4,z:0},{x:-4,z:0},{x:0,z:4},{x:0,z:-4}];for(const o of r){let l=this.gridX+o.x,h=this.gridZ+o.z;l<0&&(l=e+l),l>=e&&(l=l-e),h<0&&(h=i+h),h>=i&&(h=h-i),l=(l%e+e)%e,h=(h%i+i)%i;const c=this.terrain.getTileHeight(l,h);if(c<=0?n=!0:c>4&&c<=8&&(s=!0),n&&s)break}if(window.game&&window.game.resources&&(n&&window.game&&window.game.resources&&(window.game.resources.fish=(window.game.resources.fish||0)+1),s)){const o=this.role==="hunter"?3:1;window.game.resources.meat+=o}}findTargetGoblin(t){if(!t||t.length===0)return;let e=null,i=1/0;const n=this.role==="knight"||this.role==="wizard"?50:8;for(const s of t){if(s.isDead||this.ignoredTargets&&this.ignoredTargets.has(s.id))continue;const r=this.gridX-s.gridX,o=this.gridZ-s.gridZ,l=Math.sqrt(r*r+o*o);if(l>n)continue;const h=this.terrain.grid[this.gridX][this.gridZ],c=this.terrain.grid[s.gridX][s.gridZ];if(h&&c){const f=h.regionId,m=c.regionId;if(f>0&&m>0&&f!==m||f===0&&m>0||f>0&&m===0)continue}const d=this.terrain.getTileHeight(s.gridX,s.gridZ);let u=l;d>8&&(u+=20),u<i&&(i=u,e=s)}this.targetGoblin=e}getDistance(t,e){let i=Math.abs(this.gridX-t),n=Math.abs(this.gridZ-e);const s=this.terrain.logicalWidth||80,r=this.terrain.logicalDepth||80;return i>s/2&&(i=s-i),n>r/2&&(n=r-n),Math.sqrt(i*i+n*n)}moveRandomly(t){const e=this.terrain.getRegion(this.gridX,this.gridZ),i=this.role==="knight"?30:15,n=this.terrain.getRandomPointInRegion(e,this.gridX,this.gridZ,i);n?this.smartMove(n.x,n.z,t):this.checkStuck()}cleanIgnoredTargets(t){}forceUnstuck(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;let i=!1,n=0;for(;!i&&n<10;){const s=Math.floor(Math.random()*7)-3,r=Math.floor(Math.random()*7)-3;if(s===0&&r===0)continue;let o=this.gridX+s,l=this.gridZ+r;o<0&&(o=t-1),o>=t&&(o=0),l<0&&(l=e-1),l>=e&&(l=0);const h=this.terrain.getTileHeight(o,l),c=this.terrain.grid[o][l];if(h>0&&c&&!c.hasBuilding){const d=this.gridX,u=this.gridZ;this.gridX=o,this.gridZ=l,this.updatePosition(),this.terrain.moveEntity(this,d,u,o,l,"unit"),console.log(`Unit warped from ${d},${u} to ${o},${l}`),i=!0}n++}}migrate(t){this.action="Migrating",(!this.state||!(this.state instanceof xi))&&(this.state=new xi(this)),this.migrationTimer=0,this.findBestPlaceToMigrate(t)}findBestPlaceToMigrate(t){const e=this.terrain&&this.terrain.logicalWidth||80,i=this.terrain&&this.terrain.logicalDepth||80;let n=!1,s=0;for(;!n&&s<10;){const r=20+Math.random()*20,o=Math.random()*Math.PI*2;let l=this.gridX+Math.cos(o)*r,h=this.gridZ+Math.sin(o)*r;l<0?l=(l%e+e)%e:l>=e&&(l=l%e),h<0?h=(h%i+i)%i:h>=i&&(h=h%i),this.terrain&&this.terrain.getTileHeight(l,h)>0&&(this.migrationTarget={x:l,z:h},this.smartMove(l,h,t),n=!0),s++}}getBehaviorMode(){if(this.isDead)return"Dead";if(this.state&&this.state.constructor){const t=this.state.constructor.name;return t==="UnitWanderState"?this.role==="knight"||this.role==="wizard"?"Patrol":"Wander":t==="CombatState"?this.targetGoblin?"Combat":this.targetBuilding?"Siege":this.targetRaidPoint?`Patrolling (${this.targetRaidPoint.x},${this.targetRaidPoint.z})`:"Combat":t==="JobState"?"Working":t==="SleepState"?"Sleeping":t}return this.targetRequest?"Working":this.targetGoblin||this.targetBuilding?"Combat":this.role==="knight"||this.role==="wizard"?"Patrol":"Wander"}updateLogic(t,e,i,n,s,r){if(this.simTime=t,this.updateDeathAnimation(e),this.isDead)return;const o=this.role==="knight"||this.role==="wizard"?.02:.2;if(this.age+=e*o,this.age>=this.lifespan&&!this.isDead){this.die();return}this.state&&this.state.update(t,e,i,n),this.state||(this.checkSelfDefense&&this.checkSelfDefense(n),this.searchSurroundings&&this.searchSurroundings(this.gridX,this.gridZ,n))}updateCombatLogic(t,e){}tryBuildStructure(t){if(this.role!=="worker")return!1;if(this.targetRequest)return console.log(`[Unit ${this.id}] tryBuildStructure BLOCKED by targetRequest: ${this.targetRequest.id}`),!1;this.terrain.logicalWidth,this.terrain.logicalDepth;const e=this.gridX,i=this.gridZ,n=this.terrain.grid[e][i];if(n.hasBuilding||n.height>8)return!1;const s=this.terrain&&this.terrain.buildings?this.terrain.buildings:[],r=s.filter(p=>p.type==="house").length,o=s.filter(p=>p.type==="farm").length;s.filter(p=>p.type==="mansion").length;const l=window.game?window.game.totalPopulation:0,h=s.filter(p=>p.type==="tower"),c=Math.floor(l/3e3);if(h.length<c&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("tower",e,i),this.moveRandomly(t),!0;const d=s.filter(p=>p.type==="barracks").length,u=Math.floor(l/1e3);if(d<u&&this.terrain.checkFlatArea(e,i,3))return this.terrain.addBuilding("barracks",e,i),this.moveRandomly(t),!0;const x=((window.game&&window.game.resources?window.game.resources:{grain:100}).grain||0)<l*2,g=o<r/2+1;return(x||g)&&Math.random()<.3&&this.terrain.checkFlatArea(e,i,2)&&this.buildFarm(t)?!0:this.terrain.checkFlatArea(e,i,2)?n.moisture>.8?!1:(this.terrain.addBuilding("house",e,i),this.moveRandomly(t),!0):!1}improveLand(t){if(!this.terrain.grid[this.gridX]||!this.terrain.grid[this.gridX][this.gridZ])return;const i=this.terrain.grid[this.gridX][this.gridZ].moisture||.5;let s=.5-i,r=s*.4;Math.abs(r)<.1&&Math.abs(s)>.01&&(r=s>0?.1:-.1),Math.abs(r)>Math.abs(s)&&(r=s),this.terrain.modifyMoisture(this.gridX,this.gridZ,r),console.log(`Unit improved land at ${this.gridX},${this.gridZ}. Moisture ${i.toFixed(2)} -> ${(i+r).toFixed(2)}`),this.targetRequest&&this.game&&Math.abs(this.targetRequest.x-this.gridX)<2&&Math.abs(this.targetRequest.z-this.gridZ)<2&&(this.game.removeRequest(this.targetRequest),this.targetRequest=null),this.moveRandomly(t)}buildFarm(t){let e=null;if(this.terrain.grid[this.gridX]&&this.terrain.grid[this.gridX][this.gridZ]?e=this.terrain.grid[this.gridX][this.gridZ]:console.error(`[Unit ${this.id}] buildFarm: Cell not found at ${this.gridX},${this.gridZ}`),e){if(e.moisture<.2)return console.error(`[Unit ${this.id}] Farm failed: Too dry (${e.moisture}). Improving land.`),this.improveLand(t),!0;const i=e.moisture||.5;let s=1-Math.abs(i-.5)*2.5;if(s<0&&(s=0),Math.random()>s)return console.log(`Farm construction failed due to soil conditions (Moisture: ${i.toFixed(2)}, Chance: ${(s*100).toFixed(0)}%). Improving Land.`),this.improveLand(t),!0}return this.terrain.addBuilding("farm",this.gridX,this.gridZ),this.moveRandomly(t),!0}static getCrossAssets(){return at.assets.geometries.crossV||(at.assets.geometries.crossV=new le(.2,1,.2),at.assets.geometries.crossH=new le(.8,.2,.2)),at.assets.geometries}createCross(){const t=new ei,e=at.getCrossAssets(),i=new Kt({color:16777215,transparent:!0,opacity:1}),n=new Qt(e.crossV,i);n.position.y=.5,t.add(n);const s=new Qt(e.crossH,i);s.position.y=.7,t.add(s);const r=this.getPositionForGrid(this.gridX,this.gridZ);t.position.copy(r),this.scene.add(t),this.crossMesh=t,this.deathTimer=0}updateDeathAnimation(t){if(!this.crossMesh)return;isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=3;if(this.deathTimer>=i)this.scene.remove(this.crossMesh),this.crossMesh.children.forEach(n=>{n.material&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0;else{this.crossMesh.position.y+=t*1;const n=this.deathTimer/i;this.crossMesh.children.forEach(s=>{s.material.opacity=1-n})}}static createWoodTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#8B4513",e.fillRect(0,0,64,64),e.strokeStyle="#5D2906",e.lineWidth=2;for(let i=0;i<8;i++)e.beginPath(),e.moveTo(0,i*8+Math.random()*4),e.lineTo(64,i*8+Math.random()*4),e.stroke();return new we(t)}static createRoofTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");e.fillStyle="#A52A2A",e.fillRect(0,0,64,64),e.fillStyle="#800000";for(let i=0;i<64;i+=8)for(let n=0;n<64;n+=8)(n+i)%16===0&&e.fillRect(n,i,7,7);return new we(t)}serialize(){let t,e;return this.homeBase&&this.homeBase.userData&&(t=this.homeBase.userData.gridX,e=this.homeBase.userData.gridZ),{id:this.id,gridX:this.gridX,gridZ:this.gridZ,age:this.age,lifespan:this.lifespan,isDead:this.isDead,isFinished:this.isFinished,isMoving:this.isMoving,targetX:this.targetX,targetZ:this.targetZ,moveStartTime:this.moveStartTime,moveDuration:this.moveDuration,startGridX:this.startGridX,startGridZ:this.startGridZ,targetGridX:this.targetGridX,targetGridZ:this.targetGridZ,isSpecial:this.isSpecial,role:this.role,type:this.type,hp:this.hp,maxHp:this.maxHp,damage:this.damage,xp:this.xp||0,level:this.level||1,name:this.name,homeBaseGridX:t,homeBaseGridZ:e,squadId:this.squadId,targetRequestId:this.targetRequest?this.targetRequest.id:null,action:this.action,ignoredTargets:this.ignoredTargets&&this.ignoredTargets.size>0?Array.from(this.ignoredTargets.entries()):[]}}dispose(){this.mesh&&(this.scene.remove(this.mesh),this.mesh.geometry&&this.mesh.geometry.dispose(),this.mesh=null),this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.geometry&&t.geometry.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}attemptPathfinding(t){if(!this.terrain||!this.terrain.findPath)return;let e,i;if(this.targetGoblin)e=this.targetGoblin.gridX,i=this.targetGoblin.gridZ;else if(this.targetBuilding)e=this.targetBuilding.gridX,i=this.targetBuilding.gridZ;else if(this.targetRaidPoint)e=this.targetRaidPoint.x,i=this.targetRaidPoint.z;else if(this.migrationTarget)e=this.migrationTarget.x,i=this.migrationTarget.z;else return;if(t-(this.lastPathAttempt||0)<2e3)return;this.lastPathAttempt=t;const n=this.terrain.findPath(this.gridX,this.gridZ,e,i);if(n&&n.length>0)console.log(`[Unit ${this.id}] Pathfinding SUCCESS! Found path of length ${n.length} to ${e},${i}`),this.path=n,this.stuckCount=0;else{(this.id===0||Math.random()<.05)&&console.log(`[Unit ${this.id}] Pathfinding Failed (UNREACHABLE). Blocked by terrain/water? Aborting & Blacklisting.`);const s=this.game?this.game.simTotalTimeSec:0;if(this.targetUnit&&this.ignoredTargets.set(this.targetUnit.id,s+15),this.targetGoblin&&this.ignoredTargets.set(this.targetGoblin.id,s+15),this.targetBuilding){const r=this.targetBuilding.userData?this.targetBuilding.userData.id||this.targetBuilding.id:this.targetBuilding.id;r&&this.ignoredTargets.set(r,s+15)}this.targetRaidPoint&&this.ignoredTargets.set(`p_${this.targetRaidPoint.x}_${this.targetRaidPoint.z}`,s+15),this.targetUnit=null,this.targetGoblin=null,this.targetBuilding=null,this.targetRaidPoint=null,this.migrationTarget=null,this.targetRequest=null,this.path=null}}static deserialize(t,e,i){const n=t.role||t.type||(t.isSpecial?"knight":"worker"),s=new at(e,i,t.gridX,t.gridZ,n,t.isSpecial);s.id=t.id!==void 0?Number(t.id):s.id,s.age=t.age||20,t.moveDuration&&(s.moveDuration=t.moveDuration),typeof t.lifespan=="number"&&t.lifespan>0&&(s.lifespan=t.lifespan),s.isDead=t.isDead||!1,s.isFinished=t.isFinished||!1,t.hp!==void 0&&(s.hp=t.hp),t.maxHp!==void 0&&(s.maxHp=t.maxHp),t.damage!==void 0&&(s.damage=t.damage),t.xp!==void 0&&(s.xp=t.xp),t.level!==void 0&&(s.level=t.level),t.name!==void 0&&(s.name=t.name),t.homeBaseGridX!==void 0&&t.homeBaseGridZ!==void 0&&(s.savedHomeBaseX=t.homeBaseGridX,s.savedHomeBaseZ=t.homeBaseGridZ),t.squadId!==void 0?s.squadId=t.squadId:s.squadId=null,t.targetRequestId&&(s.savedTargetRequestId=t.targetRequestId),t.isMoving?(t.targetGridX!==void 0&&(s.targetGridX=t.targetGridX),t.targetGridZ!==void 0&&(s.targetGridZ=t.targetGridZ),s.isMoving=!1,s.action=t.action||"Idle"):t.action&&(s.action=t.action);const r=(s.action||"Idle").toLowerCase();return r.includes("fight")||r.includes("combat")?s.changeState(new hi(s)):r.includes("sleep")?s.changeState(new er(s)):s.savedTargetRequestId||r.includes("job")||r.includes("work")||r.includes("approaching")?s.changeState(new ni(s)):s.changeState(new xi(s)),s.isDead&&(s.isFinished||s.createCross()),t.ignoredTargets&&Array.isArray(t.ignoredTargets)&&(s.ignoredTargets=new Map(t.ignoredTargets)),s}}const _l={type:"change"},eo={type:"start"},th={type:"end"},ks=new hs,Ml=new Je,Om=Math.cos(70*Qh.DEG2RAD),Me=new U,Ge=2*Math.PI,se={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Hr=1e-6;class Gm extends Hc{constructor(t,e=null){super(t,e),this.state=se.NONE,this.target=new U,this.cursor=new U,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Un.ROTATE,MIDDLE:Un.DOLLY,RIGHT:Un.PAN},this.touches={ONE:Ln.ROTATE,TWO:Ln.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new U,this._lastQuaternion=new ln,this._lastTargetPosition=new U,this._quat=new ln().setFromUnitVectors(t.up,new U(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zo,this._sphericalDelta=new Zo,this._scale=1,this._panOffset=new U,this._rotateStart=new yt,this._rotateEnd=new yt,this._rotateDelta=new yt,this._panStart=new yt,this._panEnd=new yt,this._panDelta=new yt,this._dollyStart=new yt,this._dollyEnd=new yt,this._dollyDelta=new yt,this._dollyDirection=new U,this._mouse=new yt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Hm.bind(this),this._onPointerDown=km.bind(this),this._onPointerUp=Vm.bind(this),this._onContextMenu=jm.bind(this),this._onMouseWheel=qm.bind(this),this._onKeyDown=Zm.bind(this),this._onTouchStart=$m.bind(this),this._onTouchMove=Ym.bind(this),this._onMouseDown=Wm.bind(this),this._onMouseMove=Xm.bind(this),this._interceptControlDown=Km.bind(this),this._interceptControlUp=Jm.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(_l),this.update(),this.state=se.NONE}update(t=null){const e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===se.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,n=this.maxAzimuthAngle;isFinite(i)&&isFinite(n)&&(i<-Math.PI?i+=Ge:i>Math.PI&&(i-=Ge),n<-Math.PI?n+=Ge:n>Math.PI&&(n-=Ge),i<=n?this._spherical.theta=Math.max(i,Math.min(n,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+n)/2?Math.max(i,this._spherical.theta):Math.min(n,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const r=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=r!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let r=null;if(this.object.isPerspectiveCamera){const o=Me.length();r=this._clampDistance(o*this._scale);const l=o-r;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const o=new U(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const h=new U(this._mouse.x,this._mouse.y,0);h.unproject(this.object),this.object.position.sub(h).add(o),this.object.updateMatrixWorld(),r=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;r!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(r).add(this.object.position):(ks.origin.copy(this.object.position),ks.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ks.direction))<Om?this.object.lookAt(this.target):(Ml.setFromNormalAndCoplanarPoint(this.object.up,this.target),ks.intersectPlane(Ml,this.target))))}else if(this.object.isOrthographicCamera){const r=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),r!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Hr||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Hr||this._lastTargetPosition.distanceToSquared(this.target)>Hr?(this.dispatchEvent(_l),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ge/60*this.autoRotateSpeed*t:Ge/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const n=this.object.position;Me.copy(n).sub(this.target);let s=Me.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*s/i.clientHeight,this.object.matrix),this._panUp(2*e*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),n=t-i.left,s=e-i.top,r=i.width,o=i.height;this._mouse.x=n/r*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._rotateStart.set(i,n)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panStart.set(i,n)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),n=.5*(t.pageX+i.x),s=.5*(t.pageY+i.y);this._rotateEnd.set(n,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),n=.5*(t.pageY+e.y);this._panEnd.set(i,n)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,n=t.pageY-e.y,s=Math.sqrt(i*i+n*n);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const r=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(r,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new yt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function km(a){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(a.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(a)&&(this._addPointer(a),a.pointerType==="touch"?this._onTouchStart(a):this._onMouseDown(a)))}function Hm(a){this.enabled!==!1&&(a.pointerType==="touch"?this._onTouchMove(a):this._onMouseMove(a))}function Vm(a){switch(this._removePointer(a),this._pointers.length){case 0:this.domElement.releasePointerCapture(a.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(th),this.state=se.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Wm(a){let t;switch(a.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Un.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(a),this.state=se.DOLLY;break;case Un.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=se.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=se.ROTATE}break;case Un.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(a),this.state=se.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(a),this.state=se.PAN}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(eo)}function Xm(a){switch(this.state){case se.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(a);break;case se.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(a);break;case se.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(a);break}}function qm(a){this.enabled===!1||this.enableZoom===!1||this.state!==se.NONE||(a.preventDefault(),this.dispatchEvent(eo),this._handleMouseWheel(this._customWheelEvent(a)),this.dispatchEvent(th))}function Zm(a){this.enabled!==!1&&this._handleKeyDown(a)}function $m(a){switch(this._trackPointer(a),this._pointers.length){case 1:switch(this.touches.ONE){case Ln.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(a),this.state=se.TOUCH_ROTATE;break;case Ln.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(a),this.state=se.TOUCH_PAN;break;default:this.state=se.NONE}break;case 2:switch(this.touches.TWO){case Ln.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(a),this.state=se.TOUCH_DOLLY_PAN;break;case Ln.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(a),this.state=se.TOUCH_DOLLY_ROTATE;break;default:this.state=se.NONE}break;default:this.state=se.NONE}this.state!==se.NONE&&this.dispatchEvent(eo)}function Ym(a){switch(this._trackPointer(a),this.state){case se.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(a),this.update();break;case se.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(a),this.update();break;case se.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(a),this.update();break;case se.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(a),this.update();break;default:this.state=se.NONE}}function jm(a){this.enabled!==!1&&a.preventDefault()}function Km(a){a.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Jm(a){a.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Qm(a){return a&&a.__esModule&&Object.prototype.hasOwnProperty.call(a,"default")?a.default:a}var Vr={exports:{}},vl;function tg(){return vl||(vl=1,(function(a){var t=(function(){var e=String.fromCharCode,i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",s={};function r(l,h){if(!s[l]){s[l]={};for(var c=0;c<l.length;c++)s[l][l.charAt(c)]=c}return s[l][h]}var o={compressToBase64:function(l){if(l==null)return"";var h=o._compress(l,6,function(c){return i.charAt(c)});switch(h.length%4){default:case 0:return h;case 1:return h+"===";case 2:return h+"==";case 3:return h+"="}},decompressFromBase64:function(l){return l==null?"":l==""?null:o._decompress(l.length,32,function(h){return r(i,l.charAt(h))})},compressToUTF16:function(l){return l==null?"":o._compress(l,15,function(h){return e(h+32)})+" "},decompressFromUTF16:function(l){return l==null?"":l==""?null:o._decompress(l.length,16384,function(h){return l.charCodeAt(h)-32})},compressToUint8Array:function(l){for(var h=o.compress(l),c=new Uint8Array(h.length*2),d=0,u=h.length;d<u;d++){var f=h.charCodeAt(d);c[d*2]=f>>>8,c[d*2+1]=f%256}return c},decompressFromUint8Array:function(l){if(l==null)return o.decompress(l);for(var h=new Array(l.length/2),c=0,d=h.length;c<d;c++)h[c]=l[c*2]*256+l[c*2+1];var u=[];return h.forEach(function(f){u.push(e(f))}),o.decompress(u.join(""))},compressToEncodedURIComponent:function(l){return l==null?"":o._compress(l,6,function(h){return n.charAt(h)})},decompressFromEncodedURIComponent:function(l){return l==null?"":l==""?null:(l=l.replace(/ /g,"+"),o._decompress(l.length,32,function(h){return r(n,l.charAt(h))}))},compress:function(l){return o._compress(l,16,function(h){return e(h)})},_compress:function(l,h,c){if(l==null)return"";var d,u,f={},m={},x="",g="",p="",b=2,_=3,v=2,w=[],M=0,A=0,R;for(R=0;R<l.length;R+=1)if(x=l.charAt(R),Object.prototype.hasOwnProperty.call(f,x)||(f[x]=_++,m[x]=!0),g=p+x,Object.prototype.hasOwnProperty.call(f,g))p=g;else{if(Object.prototype.hasOwnProperty.call(m,p)){if(p.charCodeAt(0)<256){for(d=0;d<v;d++)M=M<<1,A==h-1?(A=0,w.push(c(M)),M=0):A++;for(u=p.charCodeAt(0),d=0;d<8;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1}else{for(u=1,d=0;d<v;d++)M=M<<1|u,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=0;for(u=p.charCodeAt(0),d=0;d<16;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1}b--,b==0&&(b=Math.pow(2,v),v++),delete m[p]}else for(u=f[p],d=0;d<v;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1;b--,b==0&&(b=Math.pow(2,v),v++),f[g]=_++,p=String(x)}if(p!==""){if(Object.prototype.hasOwnProperty.call(m,p)){if(p.charCodeAt(0)<256){for(d=0;d<v;d++)M=M<<1,A==h-1?(A=0,w.push(c(M)),M=0):A++;for(u=p.charCodeAt(0),d=0;d<8;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1}else{for(u=1,d=0;d<v;d++)M=M<<1|u,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=0;for(u=p.charCodeAt(0),d=0;d<16;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1}b--,b==0&&(b=Math.pow(2,v),v++),delete m[p]}else for(u=f[p],d=0;d<v;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1;b--,b==0&&(b=Math.pow(2,v),v++)}for(u=2,d=0;d<v;d++)M=M<<1|u&1,A==h-1?(A=0,w.push(c(M)),M=0):A++,u=u>>1;for(;;)if(M=M<<1,A==h-1){w.push(c(M));break}else A++;return w.join("")},decompress:function(l){return l==null?"":l==""?null:o._decompress(l.length,32768,function(h){return l.charCodeAt(h)})},_decompress:function(l,h,c){var d=[],u=4,f=4,m=3,x="",g=[],p,b,_,v,w,M,A,R={val:c(0),position:h,index:1};for(p=0;p<3;p+=1)d[p]=p;for(_=0,w=Math.pow(2,2),M=1;M!=w;)v=R.val&R.position,R.position>>=1,R.position==0&&(R.position=h,R.val=c(R.index++)),_|=(v>0?1:0)*M,M<<=1;switch(_){case 0:for(_=0,w=Math.pow(2,8),M=1;M!=w;)v=R.val&R.position,R.position>>=1,R.position==0&&(R.position=h,R.val=c(R.index++)),_|=(v>0?1:0)*M,M<<=1;A=e(_);break;case 1:for(_=0,w=Math.pow(2,16),M=1;M!=w;)v=R.val&R.position,R.position>>=1,R.position==0&&(R.position=h,R.val=c(R.index++)),_|=(v>0?1:0)*M,M<<=1;A=e(_);break;case 2:return""}for(d[3]=A,b=A,g.push(A);;){if(R.index>l)return"";for(_=0,w=Math.pow(2,m),M=1;M!=w;)v=R.val&R.position,R.position>>=1,R.position==0&&(R.position=h,R.val=c(R.index++)),_|=(v>0?1:0)*M,M<<=1;switch(A=_){case 0:for(_=0,w=Math.pow(2,8),M=1;M!=w;)v=R.val&R.position,R.position>>=1,R.position==0&&(R.position=h,R.val=c(R.index++)),_|=(v>0?1:0)*M,M<<=1;d[f++]=e(_),A=f-1,u--;break;case 1:for(_=0,w=Math.pow(2,16),M=1;M!=w;)v=R.val&R.position,R.position>>=1,R.position==0&&(R.position=h,R.val=c(R.index++)),_|=(v>0?1:0)*M,M<<=1;d[f++]=e(_),A=f-1,u--;break;case 2:return g.join("")}if(u==0&&(u=Math.pow(2,m),m++),d[A])x=d[A];else if(A===f)x=b+b.charAt(0);else return null;g.push(x),d[f++]=b+x.charAt(0),u--,b=x,u==0&&(u=Math.pow(2,m),m++)}}};return o})();a!=null?a.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(Vr)),Vr.exports}var eg=tg();const Wr=Qm(eg);class ig{constructor(){this.prefix="god_game_save_"}save(t,e){try{const i=this.prefix+t,n={timestamp:Date.now(),data:e},s=JSON.stringify(n),r=Wr.compressToUTF16(s);localStorage.removeItem(i);try{localStorage.setItem(i,r)}catch(o){throw console.warn(`Failed to save to ${i}, slot is now empty.`),o}return console.log(`Saved to slot ${t} (Compressed). Size: ${r.length} chars (Original: ${s.length})`),!0}catch(i){console.error("Save failed:",i);let n=0;for(let s in localStorage)localStorage.hasOwnProperty(s)&&(n+=localStorage[s].length*2/1024/1024,console.log(`[Storage] ${s}: ${(localStorage[s].length*2/1024).toFixed(2)} KB`));if(console.warn(`Total LocalStorage Usage: ${n.toFixed(2)} MB`),i.name==="QuotaExceededError"||i.name==="NS_ERROR_DOM_QUOTA_REACHED"){const s=(JSON.stringify(e).length*2/1024/1024).toFixed(2);alert(`Save Failed: Storage Full!
Attempted Size: ~${s} MB
Current Usage: ${n.toFixed(2)} MB

Please clear old saves or other site data.`)}else alert(`Save Failed: ${i.message}`);return!1}}load(t){try{const e=this.prefix+t,i=localStorage.getItem(e);if(!i)return null;console.log(`Loading slot ${t}, Raw length: ${i.length}`);let n=null;const s=Wr.decompressFromUTF16(i);s&&s.startsWith("{")?(n=s,console.log("Load: Decompressed successfully.")):(console.log("Load: Decompression failed or legacy format. Trying raw JSON..."),n=i);const r=JSON.parse(n);return console.log(`Parsed Data for slot ${t}:`,r),r.data}catch(e){return console.error("Load failed:",e),null}}delete(t){try{const e=this.prefix+t;return localStorage.removeItem(e),console.log(`Deleted slot ${t}`),!0}catch(e){return console.error("Delete failed:",e),!1}}getSlots(){const t=[];for(let e=1;e<=5;e++){const i=this.prefix+e,n=localStorage.getItem(i);if(n)try{let s=null;const r=Wr.decompressFromUTF16(n);r&&r.startsWith("{")?s=r:s=n;const o=JSON.parse(s);t.push({id:e,timestamp:o.timestamp,empty:!1})}catch(s){console.warn(`Slot ${e} check failed:`,s),t.push({id:e,empty:!0})}else t.push({id:e,empty:!0})}return t}}class ng{constructor(t,e,i){this.scene=t,this.clouds=[],this.cloudCount=30,this.spreadRadius=80;const n=512,s=512,r=document.createElement("canvas");r.width=n,r.height=s;const o=r.getContext("2d"),l=o.createImageData(n,s),h=l.data;for(let c=0;c<s;c++)for(let d=0;d<n;d++){const u=(d/n-.5)*2,f=(c/s-.5)*2,m=Math.sqrt(u*u+f*f),x=(Math.sin(u*3+f*2.5)+Math.cos(f*3.5-u*2.5))*.25+(Math.sin(u*8+f*6)+Math.cos(f*9-u*7))*.12+(Math.sin(u*18)+Math.cos(f*22))*.05,g=1-(m+x*1.5);let p=g<0?0:g>1?1:g*g*(3-2*g);const b=Math.max(0,1-Math.pow(m,4));p*=b,(d<2||d>=n-2||c<2||c>=s-2)&&(p=0);const _=(c*n+d)*4;h[_]=255,h[_+1]=255,h[_+2]=255,h[_+3]=Math.floor(Math.max(0,Math.min(1,p*.7))*255)}o.putImageData(l,0,0),this.texture=new we(r),this.texture.colorSpace=Ze,this.texture.minFilter=Wi,this.material=new kl({map:this.texture,transparent:!0,opacity:.9,color:16777215,depthWrite:!1,blending:an,clippingPlanes:[],fog:!1}),this.initClouds(),this.windSpeed=1,this.windDir=new U(1,0,.5).normalize()}initClouds(){for(let t=0;t<this.cloudCount;t++){const e=new Ec(this.material),i=20+Math.random()*10,n=1.2+Math.random()*.6;e.scale.set(i*n,i,1),e.material=this.material.clone(),e.material.rotation=Math.random()*Math.PI*2,e.position.set((Math.random()-.5)*this.spreadRadius*2,20+Math.random()*10,(Math.random()-.5)*this.spreadRadius*2),this.scene.add(e),this.clouds.push(e)}}update(t,e){if(!e)return;const i=e.position.x,n=e.position.z,s=this.spreadRadius;for(const r of this.clouds){r.position.addScaledVector(this.windDir,this.windSpeed*t);let o=r.position.x-i,l=r.position.z-n;o>s?r.position.x-=s*2:o<-s&&(r.position.x+=s*2),l>s?r.position.z-=s*2:l<-s&&(r.position.z+=s*2)}}}class Ce{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Ce.assets.initialized)return;const t=new ui(.05,.2,4);t.rotateX(Math.PI/2),Ce.assets.geometries.body=t;const e=new ze,i=new Float32Array([0,0,0,.3,0,.1,0,0,.15]);e.setAttribute("position",new He(i,3)),e.computeVertexNormals(),Ce.assets.geometries.wing=e,Ce.assets.materials.body=new cn({color:16777215}),Ce.assets.materials.wing=new cn({color:15658734,side:$e}),Ce.assets.initialized=!0}constructor(t,e,i,n){Ce.initAssets(),this.scene=t,this.terrainWidth=e,this.terrainDepth=i,this.clippingPlanes=n||[],this.birds=[],this.birdCount=20;const s=Ce.assets.materials;Object.values(s).forEach(r=>{r&&(r.clippingPlanes=this.clippingPlanes)}),this.initBirds()}initBirds(){for(let t=0;t<this.birdCount;t++){const e=new ei,i=new Qt(Ce.assets.geometries.body,Ce.assets.materials.body);e.add(i);const n=new Qt(Ce.assets.geometries.wing,Ce.assets.materials.wing);n.position.set(0,0,0),e.add(n);const s=new Qt(Ce.assets.geometries.wing,Ce.assets.materials.wing);s.position.set(0,0,0),s.scale.x=-1,e.add(s),e.userData.leftWing=n,e.userData.rightWing=s,e.position.set((Math.random()-.5)*this.terrainWidth,15+Math.random()*10,(Math.random()-.5)*this.terrainDepth);const r=2+Math.random()*2,o=Math.random()*Math.PI*2;e.userData.velocity=new U(Math.cos(o)*r,0,Math.sin(o)*r),e.userData.speed=r,e.userData.turnSpeed=.5+Math.random(),e.userData.flapOffset=Math.random()*100,this.scene.add(e),this.birds.push(e)}}update(t,e,i){this.birds.forEach(n=>{n.position.addScaledVector(n.userData.velocity,t);const s=this.terrainWidth/2,r=this.terrainDepth/2;n.position.x>s&&(n.position.x-=this.terrainWidth),n.position.x<-s&&(n.position.x+=this.terrainWidth),n.position.z>r&&(n.position.z-=this.terrainDepth),n.position.z<-r&&(n.position.z+=this.terrainDepth);let o=!0;if(i){const c=new pi(n.position,1);o=i.intersectsSphere(c)}if(!o){n.visible=!1;return}if(n.visible=!0,Math.random()<.01){const c=(Math.random()-.5)*2;n.userData.velocity.applyAxisAngle(new U(0,1,0),c*n.userData.turnSpeed*t)}n.lookAt(n.position.clone().add(n.userData.velocity));const h=Math.sin(e*15+n.userData.flapOffset)*.5;n.userData.leftWing.rotation.z=h,n.userData.rightWing.rotation.z=-h,Math.random()<.001&&window.game&&window.game.soundManager&&window.game.soundManager.playBirdSound(n.position)})}}class Ba extends or{constructor(t){super(t)}update(t,e){if(this.actor.checkForPredators){const i=this.actor.checkForPredators();if(i){this.actor.targetPredator=i,this.actor.changeState(new sg(this.actor));return}}super.update(t,e)}}class sg extends Ni{constructor(t){super(t),this.fleeTimer=0}enter(){this.actor.action="Fleeing",this.actor.id===0&&console.log(`[Sheep] Fleeing from ${this.actor.targetPredator?this.actor.targetPredator.type:"Unknown"}`)}update(t,e){if(this.fleeTimer+=e,this.fleeTimer>5){this.actor.targetPredator=null,this.actor.changeState(new Ba(this.actor));return}if(this.actor.targetPredator){const i=this.actor.targetPredator;this.actor.gridX-i.gridX,this.actor.gridZ-i.gridZ,this.actor.fleeFrom?this.actor.fleeFrom(i,t):this.actor.moveRandomly(t)}else this.actor.changeState(new Ba(this.actor))}}class ve extends ar{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){ve.assets.initialized||(ve.assets.geometries.body=new le(.4,.3,.6),ve.assets.geometries.head=new le(.25,.25,.3),ve.assets.geometries.leg=new le(.1,.3,.1),ve.assets.materials.body=new Kt({color:16777215}),ve.assets.materials.head=new Kt({color:1118481}),ve.assets.materials.leg=new Kt({color:1118481}),ve.assets.initialized=!0)}constructor(t,e,i,n){ve.initAssets(),super(t,e,i,n,"sheep"),this.game=window.game,this.moveInterval=2+Math.random()*3,this.lastTime=0,this.stagnationTimer=0,this.mesh=this.createMesh(),this.scene.add(this.mesh),this.updatePosition(),this.changeState(new Ba(this))}createMesh(){const t=new ei,e=new Qt(ve.assets.geometries.body,ve.assets.materials.body);e.position.y=.3,t.add(e);const i=new Qt(ve.assets.geometries.head,ve.assets.materials.head);i.position.set(0,.5,.35),t.add(i);const n=[{x:.1,z:.2},{x:-.1,z:.2},{x:.1,z:-.2},{x:-.1,z:-.2}],s=[];return n.forEach(r=>{const o=new Qt(ve.assets.geometries.leg,ve.assets.materials.leg);o.position.set(r.x,.15,r.z),t.add(o),s.push(o)}),t.userData.legs=s,t}updateLogic(t,e){if(this.simTime=t,this.terrain.getTileHeight(this.gridX,this.gridZ)<=0){this.die(),this.isDead=!0;return}this.state&&this.state.update(t,e),this.isMoving||this.mesh&&this.mesh.userData.legs&&this.mesh.userData.legs.forEach(n=>n.rotation.x=0),Math.random()<8e-4&&this.game&&this.game.soundManager&&this.game.soundManager.playSheepSound(this.position)}checkForPredators(){if(!window.game)return null;const t=8,e=window.game&&window.game.goblinManager?window.game.goblinManager.goblins:[],i=this.terrain.findBestTarget("goblin",this.gridX,this.gridZ,t,(r,o)=>o,e);if(i)return i;const n=window.game?window.game.units:[],s=this.terrain.findBestTarget("unit",this.gridX,this.gridZ,5,(r,o)=>o,n);return s||null}fleeFrom(t,e){const i=this.gridX-t.gridX,n=this.gridZ-t.gridZ,s=Math.sqrt(i*i+n*n);if(s<.1){this.moveRandomly(e);return}Math.random()<.1&&this.game&&this.game.soundManager&&this.game.soundManager.playSheepSound(this.position);const r=5,o=this.gridX+i/s*r,l=this.gridZ+n/s*r;this.smartMove(o,l,e)}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let s=n.length-1;s>0;s--){const r=Math.floor(Math.random()*(s+1));[n[s],n[r]]=[n[r],n[s]]}for(const s of n){let r=this.gridX+s.x,o=this.gridZ+s.z;if(r<0&&(r=e-1),r>=e&&(r=0),o<0&&(o=i-1),o>=i&&(o=0),this.canMoveTo(r,o)){this.executeMove(r,o,t);return}}}canMoveTo(t,e){const i=this.terrain.getTileHeight(t,e),n=this.terrain.getTileHeight(this.gridX,this.gridZ);if(i<=0||Math.abs(i-n)>1)return!1;const s=this.terrain.grid[t]&&this.terrain.grid[t][e];return!(s&&s.hasBuilding)}onMoveStep(t){const e=Math.sin(t*Math.PI*4)*.5;this.mesh&&this.mesh.userData.legs&&(this.mesh.userData.legs[0].rotation.x=e,this.mesh.userData.legs[1].rotation.x=-e,this.mesh.userData.legs[2].rotation.x=-e,this.mesh.userData.legs[3].rotation.x=e),this.mesh&&(this.mesh.rotation.y=this.rotationY,this.mesh.position.copy(this.position))}dispose(){this.mesh&&this.scene.remove(this.mesh),this.terrain.unregisterEntity(this)}}class rg{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.sheeps=[],this.sheepCount=10,ve.initAssets();const n=ve.assets.materials;Object.values(n).forEach(s=>{s&&(s.clippingPlanes=this.clippingPlanes)}),this.initSheeps(),console.log("SheepManager Refactored: Initialized with Entity-based Sheep.")}initSheeps(){this.sheeps=[];const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;for(let i=0;i<this.sheepCount;i++)this.spawnRandomSheep(t,e)}spawnRandomSheep(t,e){let i=0;for(;i<50;){const n=Math.floor(Math.random()*t),s=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,s)>.5){const o=this.terrain.grid[n]&&this.terrain.grid[n][s];if(!o||!o.hasBuilding){const l=new ve(this.scene,this.terrain,n,s);this.sheeps.push(l);return}}i++}}removeSheep(t){t.dispose()}update(t,e){for(let i=this.sheeps.length-1;i>=0;i--){const n=this.sheeps[i];n.updateLogic(t,e),n.updateMovement(t),n.isDead&&(this.removeSheep(n),this.sheeps.splice(i,1))}}}class ag{constructor(){this.context=null,this.masterGain=null,this.initialized=!1,this.camera=null,this.frustum=new cs,this.projScreenMatrix=new Jt}init(t){if(this.camera=t,!this.context)try{const e=window.AudioContext||window.webkitAudioContext;this.context=new e,this.masterGain=this.context.createGain(),this.masterGain.gain.value=.3,this.masterGain.connect(this.context.destination),console.log("AudioContext created")}catch(e){console.error("Web Audio API not supported",e);return}try{const e=this.context.createBuffer(1,1,22050),i=this.context.createBufferSource();i.buffer=e,i.connect(this.context.destination),i.start(0)}catch(e){console.warn("Silent buffer unlock failed",e)}this.context.state!=="running"?this.context.resume().then(()=>{console.log("AudioContext resumed, state:",this.context.state),this.initialized=!0}).catch(e=>{console.error("AudioContext resume failed",e)}):this.initialized=!0}resumeContext(){this.context&&this.context.state!=="running"&&this.context.resume().then(()=>{console.log("AudioContext resumed by user gesture."),this.initialized=!0})}updateFrustum(){this.camera&&(this.camera.updateMatrixWorld(),this.projScreenMatrix.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),this.frustum.setFromProjectionMatrix(this.projScreenMatrix))}isVisible(t){return!this.camera||!this.initialized?!0:(this.updateFrustum(),this.frustum.containsPoint(t))}getVolume(){if(!this.camera)return .5;const t=this.camera.zoom,e=.8;return .1+(t-e)/(4-e)*.9}playBirdSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=n=>{setTimeout(()=>{if(!this.context)return;const s=this.context.currentTime,r=this.context.createOscillator(),o=this.context.createGain();r.type="sine";const l=2500+Math.random()*200;r.frequency.setValueAtTime(l,s),r.frequency.exponentialRampToValueAtTime(l*.8,s+.1),r.connect(o),o.connect(this.masterGain),o.gain.setValueAtTime(0,s),o.gain.linearRampToValueAtTime(e*.4,s+.01),o.gain.exponentialRampToValueAtTime(.01,s+.15),r.start(s),r.stop(s+.15)},n)};i(0),i(200),i(400)}playSheepSound(t){if(!this.initialized||t&&!this.isVisible(t))return;const e=this.getVolume(),i=this.context.currentTime,n=.5+Math.random()*.4,s=this.context.createOscillator();s.type="sawtooth";const r=220+Math.random()*30;s.frequency.setValueAtTime(r,i),s.frequency.linearRampToValueAtTime(r*.9,i+n);const o=this.context.createOscillator();o.type="sine",o.frequency.value=6+Math.random()*2;const l=this.context.createGain();l.gain.value=10,o.connect(l),l.connect(s.frequency);const h=this.context.createGain();h.gain.value=.8;const c=this.context.createGain();c.gain.value=.2,o.connect(c),c.connect(h.gain),o.start(i),o.stop(i+n);const d=this.context.createBiquadFilter();d.type="lowpass",d.frequency.value=1500,d.Q.value=1,s.connect(h),h.connect(d);const u=this.context.createGain();u.gain.setValueAtTime(0,i),u.gain.linearRampToValueAtTime(e*.3,i+.1),u.gain.linearRampToValueAtTime(e*.25,i+n*.6),u.gain.exponentialRampToValueAtTime(.01,i+n),d.connect(u),u.connect(this.masterGain),s.start(i),s.stop(i+n)}}class Pi extends Ni{constructor(t){super(t),this.scanTimer=0}enter(){this.actor.action="Raiding",this.actor.isMoving=!1}update(t,e,i,n){if(this.scanTimer+=e,this.scanTimer>1){if(this.scanTimer=0,this.actor.findTarget){const s=i||(window.game?window.game.units:[]),r=n||(window.game?window.game.buildings:[]);this.actor.findTarget(s,r)}if(this.actor.targetUnit||this.actor.targetBuilding){this.actor.changeState(new ls(this.actor));return}}if(this.actor.raidGoal){if(this.actor.raidGoal.timestamp&&t-this.actor.raidGoal.timestamp>60){this.actor.changeState(new di(this.actor));return}const s=window.game?window.game.goblinManager:null;if(s&&s.clans){const o=s.clans[this.actor.clanId];if(o&&!o.active){this.actor.changeState(new og(this.actor));return}}if(this.actor.getDistance(this.actor.raidGoal.x,this.actor.raidGoal.z)<5){this.actor.changeState(new di(this.actor));return}if(!this.actor.isMoving){const o=this.actor.smartMove(this.actor.raidGoal.x,this.actor.raidGoal.z,t);this.actor.lastTime=t,o||this.actor.isPathfindingThrottled||this.actor.changeState(new di(this.actor))}}else this.actor.changeState(new di(this.actor))}}class di extends or{constructor(t){super(t),this.scanTimer=0}update(t,e,i,n){if(super.update(t,e),this.scanTimer+=e,this.scanTimer>1){if(this.scanTimer=0,this.actor.findTarget){const s=i||(window.game?window.game.units:[]),r=n||(window.game?window.game.buildings:[]);if(this.actor.findTarget(s,r),this.actor.targetUnit||this.actor.targetBuilding){this.actor.changeState(new ls(this.actor));return}}if(this.actor.type==="goblin"&&Math.random()<.02){const s=this.actor.terrain;if(s){const r=Math.round(this.actor.gridX),o=Math.round(this.actor.gridZ);if(s.canAddBuilding(r,o,1,1)){this.actor.changeState(new lg(this.actor,r,o));return}}}}}}class og extends Ni{constructor(t){super(t),this.cave=null}enter(){this.actor.action="Retreating";const t=window.game?window.game.goblinManager:null;t&&this.actor.clanId&&(this.cave=t.caves.find(e=>e.clanId===this.actor.clanId)),this.actor.isMoving=!1}update(t,e){if(!this.cave){this.actor.isDead=!0;return}if(this.actor.getDistance(this.cave.gridX,this.cave.gridZ)<2){this.actor.isDead=!0;return}this.actor.isMoving||!this.actor.smartMove(this.cave.gridX,this.cave.gridZ,t)&&!this.actor.isPathfindingThrottled&&(this.actor.isDead=!0)}}class ls extends Ni{constructor(t){super(t),this.stagnationTimer=0}enter(){this.actor.action!=="Fighting"&&(this.actor.action="Fighting",this.actor.isMoving=!1),this.stagnationTimer=0}update(t,e,i,n){if(!(this.actor.targetUnit||this.actor.targetBuilding)){this.actor.changeState(new Pi(this.actor));return}if(this.actor.targetBuilding){const r=this.actor.terrain||(window.game?window.game.terrain:null);if(r&&r.buildings&&!r.buildings.includes(this.actor.targetBuilding)){this.actor.targetBuilding=null,this.actor.changeState(new Pi(this.actor));return}}if(this.stagnationTimer+=e,this.stagnationTimer>15){this.actor.targetUnit=null,this.actor.targetBuilding=null,this.actor.changeState(new Pi(this.actor));return}this.actor.executeCombatLogic&&((this.actor.targetUnit?this.actor.getDistance(this.actor.targetUnit.gridX,this.actor.targetUnit.gridZ):this.actor.getDistanceToBuilding?this.actor.getDistanceToBuilding(this.actor.targetBuilding):999)<3&&(this.stagnationTimer=0),this.actor.executeCombatLogic(t,e)),!this.actor.targetUnit&&!this.actor.targetBuilding&&this.actor.changeState(new Pi(this.actor))}}class lg extends Ni{constructor(t,e,i){super(t),this.buildX=e,this.buildZ=i,this.timer=0}enter(){this.actor.action="Building",this.actor.isMoving=!1,this.actor.id%20===0&&console.log(`[Goblin ${this.actor.id}] ENTER BuildState at ${this.buildX},${this.buildZ}`)}update(t,e){if(this.actor.getDistance(this.buildX,this.buildZ)>1.5){this.actor.isMoving||!this.actor.smartMove(this.buildX,this.buildZ,t)&&!this.actor.isPathfindingThrottled&&this.actor.changeState(new di(this.actor));return}if(this.timer+=e,this.timer>5){const n=this.actor.terrain;n&&n.canAddBuilding(this.buildX,this.buildZ,1,1)&&n.addBuilding("goblin_hut",this.buildX,this.buildZ)&&console.log(`[Goblin ${this.actor.id}] Constructed Goblin Hut at ${this.buildX},${this.buildZ}`),this.actor.changeState(new di(this.actor))}}}class At extends ar{static nextId=0;static assets={geometries:{},materials:{},textures:{},initialized:!1};static async initAssets(t){if(At.assets.initialized)return;const e=async()=>{t&&await t()};At.assets.geometries.torsoNormal=new le(.25,.3,.2),At.assets.geometries.torsoHob=new le(.35,.3,.2),At.assets.geometries.head=new le(.2,.2,.2),At.assets.geometries.ear=new ui(.05,.15,4);const i=new le(.08,.25,.08);i.translate(0,-.1,0),At.assets.geometries.arm=i;const n=new le(.1,.25,.1);n.translate(0,-.1,0),At.assets.geometries.leg=n,await e(),At.assets.geometries.club=new ii(.03,.05,.4,6),At.assets.geometries.staff=new le(.04,.8,.04),At.assets.geometries.crossV=new le(.2,.8,.2),At.assets.geometries.crossH=new le(.6,.2,.2),At.assets.materials.skinNormal=new Kt({color:5614165}),At.assets.materials.clothesNormal=new Kt({color:9127187}),At.assets.materials.skinHob=new Kt({color:3368499}),At.assets.materials.clothesHob=new Kt({color:2236962}),At.assets.materials.club=new Kt({color:6636321}),At.assets.materials.staff=new Kt({color:9127187}),await e(),At.assets.materials.skinShaman=new Kt({color:34952}),At.assets.materials.clothesShaman=new Kt({color:3342438}),At.assets.materials.skinKing=new Kt({color:8912896}),At.assets.materials.clothesKing=new Kt({color:16766720}),At.assets.materials.cross=new Kt({color:5614165,transparent:!0,opacity:1}),At.assets.geometries.facePlane=new Ui(.15,.15),At.assets.geometries.facePlane.translate(0,0,.105),At.assets.textures.face=At.createFaceTexture(),At.assets.materials.face=new Ue({map:At.assets.textures.face,transparent:!0}),At.assets.initialized=!0}static createFaceTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d");return e.fillStyle="#FFFF00",e.fillRect(10,20,15,12),e.fillRect(39,20,15,12),e.fillStyle="#000000",e.fillRect(16,22,3,8),e.fillRect(45,22,3,8),e.fillStyle="#330000",e.beginPath(),e.moveTo(15,45),e.lineTo(49,45),e.lineTo(32,55),e.fill(),e.fillStyle="#FFFFFF",e.fillRect(18,45,4,4),e.fillRect(42,45,4,4),new we(t)}constructor(t,e,i,n,s="normal",r=null,o=null){At.initAssets(),super(t,e,i,n,"goblin"),this.type=s||"goblin",this.clanId=r||0,this.scale=1,this.scene&&this.scene.getObjectByName("GoblinGroup"),this.id=At.nextId++;const l=Ee.goblins[this.type]||Ee.goblins.normal;this.hp=l.hp,this.lifespan=l.lifespan||100,this.type==="king"?(this.hp+=Math.floor(Math.random()*200),this.scale=2):this.scale=1,this.maxHp=this.hp,this.damage=l.damage,this.attackRate=l.attackRate||2,l.attackRange?(this.attackRange=l.attackRange,this.isRanged=!0):this.isRanged=!1,this.type==="shaman"&&(this.isRanged=!0,this.attackRange||(this.attackRange=8)),this.age=20,this.isDead=!1,this.isFinished=!1,this.attackCooldown=0,this.targetUnit=null,this.targetBuilding=null,this.ignoredTargets=new Map,o?(this.raidGoal={...o},this.raidGoal.x+=(Math.random()-.5)*8,this.raidGoal.z+=(Math.random()-.5)*8,console.log(`Goblin ${this.id} SPAWNED FOR RAIDING! Target: ${this.raidGoal.x.toFixed(0)},${this.raidGoal.z.toFixed(0)}`),this.changeState(new Pi(this))):this.changeState(new di(this)),this.attackRate||(this.attackRate=1),this.hasStaff=this.type==="shaman",this.hasClub=this.type==="goblin"||this.type==="hobgoblin",this.position=new U,this.rotationY=0,this.limbs={leftArm:{x:0},rightArm:{x:0},leftLeg:{x:0},rightLeg:{x:0}},this.walkAnimTimer=0,this.position.set(this.terrain.gridToWorld(this.gridX),this.terrain.getTileHeight(this.gridX,this.gridZ),this.terrain.gridToWorld(this.gridZ)),this.isMoving=!1,this.moveTimer=0,this.moveInterval=1,this.lastTime=-99,this.baseMoveDuration=1,this.moveDuration=this.baseMoveDuration,this.terrain.registerEntity(this,this.gridX,this.gridZ,"goblin")}updateLogic(t,e,i,n){if(this.isDead||this.isFinished)return;if(this.age+=e*.2,this.age>=this.lifespan){this.die();return}if(this.age>400&&this.type!=="king"){console.warn(`Goblin ${this.id} exceeded max lifespan (${this.age}). Forcing death.`),this.die("Exceeded Lifespan");return}const s=this.terrain.getTileHeight(this.gridX,this.gridZ);if(s<=0){console.log(`[Goblin.js] Dying due to low height: ${s}`),this.die();return}if(this.updateMovement&&this.updateMovement(t),this.attackCooldown>0&&(this.attackCooldown-=e),this.state&&typeof this.state.update=="function"){this.state.update(t,e,i,n);return}else console.log("[Goblin.js] Invalid State! State:",this.state)}executeCombatLogic(t,e){const i=this.targetUnit||this.targetBuilding;if(!i)return;let n=999;this.targetUnit?n=this.getDistance(this.targetUnit.gridX,this.targetUnit.gridZ):this.targetBuilding&&(n=this.getDistanceToBuilding(this.targetBuilding));let s=1.5;if(this.isRanged&&(s=this.attackRange||8),n>s){let r=i.gridX,o=i.gridZ;const l=this.getApproachPoint(i);if(l&&(r=l.x,o=l.z),!this.smartMove(r,o,t)&&!this.isPathfinding){const h=window.game?window.game.simTotalTimeSec:t;this.targetUnit?(console.log(`Goblin ${this.id} stuck reaching target ${this.targetUnit.id}. Blacklisting.`),this.ignoredTargets.set(this.targetUnit.id,h+10),this.targetUnit=null):this.targetBuilding}}else this.attackTarget(t,e)}findTarget(t,e){const i=window.game?window.game.simTotalTimeSec:0;if(this.frustratedUntil&&i<this.frustratedUntil||(this.targetUnit&&(this.targetUnit.isDead||this.targetUnit.isFinished)&&(this.targetUnit=null),this.targetBuilding&&this.targetBuilding.userData.hp<=0&&(this.targetBuilding.userData.population||0)<=0&&(this.targetBuilding=null),this.targetUnit||this.targetBuilding))return;const s=this.state==="raiding"||this.state instanceof Pi?25:12,r=this.terrain.findBestTarget("unit",this.gridX,this.gridZ,s,(c,d)=>{if(c.isSleeping)return 1/0;const u=window.game?window.game.simTotalTimeSec:Date.now()/1e3;if(this.ignoredTargets.has(c.id)&&this.ignoredTargets.get(c.id)>u)return 1/0;const f=this.terrain.getTileHeight(c.gridX,c.gridZ);let m=d;return f>8&&(m+=20),m}),o=s,l=this.terrain.findBestTarget("building",this.gridX,this.gridZ,o,(c,d)=>{if(!c.userData||c.userData.type==="goblin_hut"||c.userData.type==="cave")return 1/0;const u=c.userData.population||0,f=c.userData.hp===void 0?50:c.userData.hp;return u<=0&&f<=0?1/0:d});let h=null;if(r&&l){const c=this.terrain.logicalWidth||80,d=this.terrain.logicalDepth||80,u=Math.abs(r.gridX-this.gridX),f=Math.abs(r.gridZ-this.gridZ),m=Math.min(u,c-u),x=Math.min(f,d-f),g=Math.sqrt(m*m+x*x),p=Math.abs(l.gridX-this.gridX),b=Math.abs(l.gridZ-this.gridZ),_=Math.min(p,c-p),v=Math.min(b,d-b),w=Math.sqrt(_*_+v*v);w<15?h=l:h=g<w?r:l}else h=r||l;h&&(h.userData&&h.userData.hp!==void 0?this.targetBuilding=h:this.targetUnit=h),!this.targetUnit&&!this.targetBuilding&&this.currentMemoryTarget&&(this.getDistance(this.currentMemoryTarget.x,this.currentMemoryTarget.z)<5&&window.game&&window.game.goblinManager&&window.game.goblinManager.reportRaidFailure(this.clanId,this.currentMemoryTarget.x,this.currentMemoryTarget.z),this.currentMemoryTarget=null)}getDistanceToBuilding(t){if(!t)return 1/0;let e=1;this.terrain&&this.terrain.getBuildingSize?e=this.terrain.getBuildingSize(t.type):((t.type==="house"||t.type==="farm")&&(e=2),(t.type==="mansion"||t.type==="barracks"||t.type==="tower")&&(e=3),t.type==="castle"&&(e=4));const i=t.gridX,n=t.gridX+e-1,s=t.gridZ,r=t.gridZ+e-1,o=Math.max(i-this.gridX,0,this.gridX-n),l=Math.max(s-this.gridZ,0,this.gridZ-r);return Math.sqrt(o*o+l*l)}moveRandomly(t){if(this.clanId&&Math.random()<.6){if(Math.random()<.05)console.log(`Goblin ${this.id} distracted from raid!`),this.tryBuildHut();else if(window.game&&window.game.goblinManager){const r=window.game.goblinManager.getClanRaidTarget(this.clanId);if(r&&(this.currentMemoryTarget=r,this.getDistance(r.x,r.z)>3)){this.smartMove(r.x,r.z,t);return}}}const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let r=n.length-1;r>0;r--){const o=Math.floor(Math.random()*(r+1));[n[r],n[o]]=[n[o],n[r]]}const s=this.terrain.getTileHeight(this.gridX,this.gridZ);for(const r of n){let o=this.gridX+r.x,l=this.gridZ+r.z;if(o<0&&(o=e-1),o>=e&&(o=0),l<0&&(l=i-1),l>=i&&(l=0),!this.isReachable(o,l))continue;const h=this.terrain.getTileHeight(o,l);if(Math.abs(h-s)<=2&&h>0){if(this.terrain.grid[o][l].hasBuilding)continue;this.startMove(o,l,t);return}}this.lastTime=t}handleMoveFailure(t){this.pathFailCount=(this.pathFailCount||0)+1,this.pathFailCount>3&&(console.log(`Goblin ${this.id} gave up target! Stuck / Coast.`),this.targetUnit=null,this.targetBuilding=null,this.currentMemoryTarget=null,this.path=null,this.pathFailCount=0,this.moveRandomly(t))}startMove(t,e,i){if(this.gridX===void 0||isNaN(this.gridX)){console.error(`Goblin ${this.id} startMove failed: Invalid gridX(${this.gridX})`),this.isMoving=!1;return}const n=this.terrain.getTileHeight(t,e),s=this.terrain.getTileHeight(this.gridX,this.gridZ);if(Math.abs(n-s)>2){this.stuckCount=(this.stuckCount||0)+1,this.stuckCount>5&&(this.targetBuilding=null,this.stuckCount=0,this.moveRandomly(i));return}super.startMove(t,e,i);const r=Math.abs(n-s);n>8?this.moveDuration=6:r>.1?this.moveDuration=3:this.moveDuration=this.baseMoveDuration||.8,this.stuckCount=0,this.pathFailCount=0}onMoveFinished(t){this.limbs.leftArm.x=0,this.limbs.rightArm.x=0,this.limbs.leftLeg.x=0,this.limbs.rightLeg.x=0,super.onMoveFinished?super.onMoveFinished(t):this.onMoveFinishedSuper&&this.onMoveFinishedSuper(t)}onMoveStep(t){const e=Math.PI*4,n=Math.sin(t*e)*.5;this.limbs.leftArm.x=n,this.limbs.rightArm.x=-n,this.limbs.leftLeg.x=-n,this.limbs.rightLeg.x=n}attackTarget(t,e){if(window.game&&window.game.goblinManager){const i=this.targetUnit||this.targetBuilding;window.game.goblinManager.notifyClanActivity(this.clanId,i)}this.targetUnit?this.attackUnit(this.targetUnit):this.targetBuilding&&this.attackBuilding(this.targetBuilding)}attackUnit(t){if(this.attackCooldown>0)return;if(t.isDead){this.targetUnit=null;return}if(this.isRanged){if(this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},500),window.game&&window.game.spawnProjectile){const i=this.position.clone().add(new U(0,.8*this.scale,0)),n=t.position.clone().add(new U(0,.5,0));window.game.spawnProjectile(i,n,65535)}}else this.limbs.rightArm.x=-Math.PI/2;this.isRanged||(this.limbs.rightArm.x=0);const e=this.getDistance(t.gridX,t.gridZ);!t.isDead&&(this.isRanged||e<=1.5)&&(t.takeDamage(this.damage,this),console.log(`Goblin hit Unit! Dmg: ${this.damage} UnitHP: ${t.hp} `)),this.attackCooldown=this.attackRate}attackBuilding(t){if(!t||this.attackCooldown>0)return;if(this.isRanged){if(this.limbs.rightArm.x=-Math.PI,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},500),window.game&&window.game.spawnProjectile){const s=this.position.clone().add(new U(0,.8*this.scale,0));let r,o;this.terrain&&this.terrain.gridToWorld?(r=this.terrain.gridToWorld(t.userData.gridX),o=this.terrain.gridToWorld(t.userData.gridZ)):(r=t.userData.gridX,o=t.userData.gridZ);const l=new U(r,(t.y||0)+1,o);window.game.spawnProjectile(s,l,65535)}}else this.limbs.rightArm.x=-Math.PI/2,setTimeout(()=>{this.isDead||(this.limbs.rightArm.x=0)},200);if(t.takeDamage){const s=t.takeDamage(this.damage||10);s>0&&!this.isRanged&&this.takeDamage(s,null),(t.isDestroyed?t.isDestroyed():t.hp<=0&&t.population<=0)?(this.destroyBuilding(t),this.targetBuilding=null):this.attackCooldown=this.attackRate||1.5;return}const e=this.damage||10;if(t.userData.population>0){const s=Math.max(1,Math.floor(e*.1));t.userData.population-=s,t.population!==void 0&&(t.population=t.userData.population),console.log(`Goblin Raid: House population reduced.Rem: ${t.userData.population} `);const r=t.userData.type==="tower"?10:4,o=Math.max(0,t.userData.population),l=Math.floor(o*r);if(l>0&&!this.isRanged&&this.takeDamage(l,null),t.userData.population>0){this.attackCooldown=this.attackRate||1.5;return}}t.userData.hp=(t.userData.hp||100)-e;const i=t.userData.population||0;(t.userData.hp||0)<=0&&i<1&&(console.log(`Goblin destroyed Building ${t.userData.type} (Legacy) !`),this.destroyBuilding(t),this.targetBuilding=null),this.attackCooldown=this.attackRate||1.5}destroyBuilding(t){t&&(this.terrain.removeBuilding(t),typeof t.die=="function"?t.die():t.userData.isDead=!0,console.log(`Goblin ${this.id} destroyed ${t.userData.type} !`),window.game&&window.game.goblinManager&&window.game.goblinManager.increasePlunder(),this.targetBuilding=null)}die(t="Unknown"){this.isDead||(this.isDead=!0,this.terrain.unregisterEntity(this),this.clanId&&window.game&&window.game.goblinManager,this.createCross(),console.log(`Goblin(${this.type}) died.ID:${this.id} `),this.type==="king"&&window.game&&(window.game.mana+=500,console.log("King Defeated! +500 Mana"),this.terrain&&this.terrain.createFloatingText&&this.terrain.scene.add(this.terrain.createFloatingText("+500",this.mesh.position,16776960))))}takeDamage(t,e){this.isDead||this.isFinished||(this.hp-=t,this.hp<=0?(this.hp=0,this.die()):(this.lastHitTime=window.game?window.game.simTotalTimeSec:0,e&&(!this.targetUnit||Math.random()<.3)&&e.hp>0&&(this.targetUnit=e,this.state&&this.state.constructor.name!=="GoblinCombatState"&&this.changeState(new ls(this)))))}dispose(){this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(t=>{t.material&&t.userData.clonedMat&&typeof t.material.dispose=="function"&&t.material.dispose()}),this.crossMesh=null),this.terrain.unregisterEntity(this)}createCross(){const t=new ei;if(!At.assets.geometries.crossV)return;const e=new Qt(At.assets.geometries.crossV,At.assets.materials.cross);e.position.y=.4,t.add(e);const i=new Qt(At.assets.geometries.crossH,At.assets.materials.cross);i.position.y=.6,t.add(i);const n=this.terrain.getVisualPosition(this.gridX,this.gridZ,!0);t.position.set(n.x,n.y+.2,n.z),this.scene.add(t),this.crossMesh=t,this.deathTimer=0,setTimeout(()=>{this.crossMesh&&(this.scene.remove(this.crossMesh),this.crossMesh.traverse(s=>{s.material&&s.userData.clonedMat&&typeof s.material.dispose=="function"&&s.material.dispose()}),this.crossMesh=null)},1500)}updateDeathAnimation(t){if(!this.crossMesh){this.isFinished=!0;return}isNaN(this.deathTimer)&&(this.deathTimer=0);const e=t>0?t:.016;this.deathTimer+=e;const i=1;this.deathTimer>=i?(this.scene.remove(this.crossMesh),this.terrain&&this.terrain.unregisterEntity&&this.terrain.unregisterEntity(this),this.crossMesh.children.forEach(n=>{n.material&&(n.userData.clonedMat||(n.material=n.material.clone(),n.userData.clonedMat=!0),n.material.opacity=Math.max(0,1-this.deathTimer/i))}),this.crossMesh.children.forEach(n=>{n.material&&n.userData.clonedMat&&this.deathTimer>=i&&typeof n.material.dispose=="function"&&n.material.dispose()}),this.crossMesh=null,this.isFinished=!0):(this.crossMesh.position.y+=t*1,this.crossMesh.children.forEach(n=>{n.material&&(n.userData.clonedMat||(n.material=n.material.clone(),n.userData.clonedMat=!0),n.material.opacity=Math.max(0,1-this.deathTimer/i))}))}migrate(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=Math.random()*Math.PI*2,s=20+Math.random()*20;let r=Math.floor(this.gridX+Math.cos(n)*s),o=Math.floor(this.gridZ+Math.sin(n)*s);r<0&&(r+=e),r>=e&&(r-=e),o<0&&(o+=i),o>=i&&(o-=i),this.terrain.getTileHeight(r,o)<=0&&(r=(r+5)%e),console.log(`Goblin ${this.id} attempting migration to ${r},${o} `),this.migrationTarget={x:r,z:o},this.smartMove(r,o,t)?this.action="migrating":(console.log(`Goblin ${this.id} migration path blocked.Resetting.`),this.migrationTarget=null,this.action="wandering",this.wanderCount=0)}tryBuildHut(){const t=Math.round(this.gridX),e=Math.round(this.gridZ);if(!this.terrain.grid[t]||!this.terrain.grid[t][e]||this.terrain.grid[t][e].hasBuilding)return!1;const i=this.terrain.getTileHeight(t,e);if(i>8||i<=0)return!1;const n=this.terrain.buildings||[],s=6;for(const o of n)if(o.userData.type==="goblin_hut"){const l=o.userData.gridX-t,h=o.userData.gridZ-e;if(l*l+h*h<s*s)return!1}const r=this.terrain.addBuilding("goblin_hut",t,e);return r?(r.userData.clanId=this.clanId,console.log(`[Goblin] ID:${this.id} built a Hut at ${t},${e}`),!0):!1}serialize(){return{id:this.id,gridX:this.gridX,gridZ:this.gridZ,type:this.type,clanId:this.clanId,hp:this.hp,maxHp:this.maxHp,age:this.age,lifespan:this.lifespan,isDead:this.isDead,isFinished:this.isFinished,state:this.state?this.state.constructor.name:"GoblinWanderState",raidTargetX:this.raidGoal?this.raidGoal.x:null,raidTargetY:this.raidGoal?this.raidGoal.y:this.raidGoal?this.raidGoal.z:null,raidTargetZ:this.raidGoal?this.raidGoal.z:null,raidTargetTS:this.raidGoal?this.raidGoal.timestamp:null,migrationTarget:this.migrationTarget,scale:this.scale}}updateCombatLogic(t,e){if(this.attackCooldown>0&&(this.attackCooldown-=e),this.targetUnit&&this.targetUnit.isDead&&(this.targetUnit=null),this.targetBuilding&&this.targetBuilding.userData.hp<=0&&(this.targetBuilding=null),!(!this.targetUnit&&!this.targetBuilding)){if(this.targetUnit)if(this.chaseTimer=(this.chaseTimer||0)+e,this.chaseTimer>10)this.targetUnit=null,this.chaseTimer=0;else{if(this.smartMove(this.targetUnit.gridX,this.targetUnit.gridZ,t)===!1){this.ignoredTargets||(this.ignoredTargets=new Map),this.ignoredTargets.set(this.targetUnit.id,t+10),this.targetUnit=null,this.chaseTimer=0;return}if(!this.targetUnit)return;this.getDistance(this.targetUnit.gridX,this.targetUnit.gridZ)<=1.8&&(this.attackTarget(t,e),this.chaseTimer=0)}else if(this.targetBuilding){const i=this.getApproachPoint(this.targetBuilding);if(this.smartMove(i.x,i.z,t)===!1){this.ignoredTargets.set(this.targetBuilding.id,t+10),this.targetBuilding=null;return}this.getDistanceToBuilding(this.targetBuilding)<=2.5&&this.attackTarget(t,e)}}}static deserialize(t,e,i){const n=t.type||t.t||"normal",s=t.clanId||t.c||0;let r=null;if(t.rg)r={x:t.rg.x,z:t.rg.z};else if(t.raidTargetX!==null&&t.raidTargetX!==void 0){const h=window.game&&window.game.simTotalTimeSec?window.game.simTotalTimeSec:0,c=t.raidTargetTS!==void 0?t.raidTargetTS:h;r={x:t.raidTargetX,z:t.raidTargetZ,timestamp:c}}const o=new At(e,i,t.gridX!==void 0?t.gridX:t.x,t.gridZ!==void 0?t.gridZ:t.z,n,s,r);o.id=t.id!==void 0?Number(t.id):o.id,t.hp!==void 0?o.hp=t.hp:t.h!==void 0&&(o.hp=t.h),t.maxHp!==void 0?o.maxHp=t.maxHp:t.m!==void 0&&(o.maxHp=t.m),t.lifespan!==void 0?o.lifespan=t.lifespan:t.l!==void 0&&(o.lifespan=t.l),t.age!==void 0?o.age=t.age:t.a!==void 0&&(o.age=t.a),o.isDead=t.isDead||!1,o.isFinished=t.isFinished||!1;const l=(t.state||t.s||"idle").toLowerCase();return l.includes("raid")?(o.changeState(new Pi(o)),r&&(o.state.raidGoal=r)):l.includes("combat")||l.includes("fight")?o.changeState(new ls(o)):!l.includes("idle")&&!l.includes("wander")?o.changeState(new di(o)):o.changeState(new di(o)),(t.migrationTarget||t.mt)&&(o.migrationTarget=t.migrationTarget||t.mt),t.scale&&(o.scale=t.scale),o}}class eh{constructor(t,e,i,n=5e4){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.MAX_INSTANCES=n,this._dummy=new xe,this._scratchVector=new U,this._scratchSphere=new pi(new U,2)}async init(){await At.initAssets(this.terrain.checkYield.bind(this.terrain));const t=i=>{i&&(i.clippingPlanes=this.clippingPlanes,i.needsUpdate=!0)};t(At.assets.materials.club),t(At.assets.materials.staff),t(At.assets.materials.face),t(At.assets.materials.cross);const e=At.assets.materials;Object.values(e).forEach(i=>{i&&(i.isMaterial||Array.isArray(i))&&(Array.isArray(i)?i:[i]).forEach(s=>{s.clippingPlanes=this.clippingPlanes,s.needsUpdate=!0})}),await this.terrain.checkYield(),this.initInstancedMeshes(),this.initialized=!0}initInstancedMeshes(){const t=(i,n,s)=>{const r=new Qa(i,n,s);return r.instanceMatrix.setUsage(ja),r.frustumCulled=!1,r.castShadow=!0,r.receiveShadow=!0,r.geometry&&r.geometry.boundingSphere&&(r.geometry.boundingSphere.radius=1e5),this.scene.add(r),r},e=At.assets;this.torsoMesh=t(e.geometries.torsoNormal,this.getWhiteMaterial(),this.MAX_INSTANCES),this.headMesh=t(e.geometries.head,this.getWhiteMaterial(),this.MAX_INSTANCES),this.earMesh=t(e.geometries.ear,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.armMesh=t(e.geometries.arm,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.legMesh=t(e.geometries.leg,this.getWhiteMaterial(),this.MAX_INSTANCES*2),this.clubMesh=t(e.geometries.club,e.materials.club,this.MAX_INSTANCES),this.staffMesh=t(e.geometries.staff,e.materials.staff,this.MAX_INSTANCES),this.faceMesh=t(e.geometries.facePlane,e.materials.face,this.MAX_INSTANCES)}getWhiteMaterial(){return this.whiteMat||(this.whiteMat=new Kt({color:16777215,clippingPlanes:this.clippingPlanes})),this.whiteMat}update(t,e){if(!this.initialized||!t||!At.assets.initialized&&(console.warn("[GoblinRenderer] Assets not initialized! Re-initializing..."),At.initAssets(),!At.assets.initialized))return;let i=0,n=0,s=0,r=0,o=0,l=0;const h=performance.now();(!this.lastLog||h-this.lastLog>5e3)&&(this.lastLog=h);const c=this._dummy,d=this.terrain.logicalWidth||240,u=this.terrain.logicalDepth||240,f=new U(0,1,0),m=new ut(5614165),x=new ut(3368499),g=new ut(34952),p=new ut(8912896);new ut(9127187),new ut(2236962),new ut(3342438),new ut(16766720);for(const _ of t){if(_.isDead||_.isFinished)continue;const v=120,w=_.type==="hobgoblin"||_.type==="orc",M=_.type==="king",A=_.type==="shaman",R=_.scale||1,T=_.rotationY!==void 0?_.rotationY:0;if(!_.position)continue;let y=m;w?y=x:M?y=p:A&&(y=g);const C=_.limbs&&_.limbs.leftArm?_.limbs.leftArm.x:0,P=_.limbs&&_.limbs.rightArm?_.limbs.rightArm.x:0,F=_.limbs&&_.limbs.leftLeg?_.limbs.leftLeg.x:0,O=_.limbs&&_.limbs.rightLeg?_.limbs.rightLeg.x:0,H=Math.floor((e.x-v-_.position.x)/d),V=Math.ceil((e.x+v-_.position.x)/d),Q=Math.floor((e.z-v-_.position.z)/u),W=Math.ceil((e.z+v-_.position.z)/u);for(let tt=H;tt<=V;tt++)for(let it=Q;it<=W&&!(i>=this.MAX_INSTANCES);it++){const bt=tt*d,Vt=it*u,Gt=_.position.x+bt,$t=_.position.y,Wt=_.position.z+Vt,q=Gt-e.x,Y=Wt-e.z;if(q*q+Y*Y>3600)continue;c.position.set(Gt,$t+.3*R,Wt),c.rotation.set(0,T,0);const Ut=w||M?1.4:1;if(c.scale.set(R*Ut,R,R),c.updateMatrix(),this.torsoMesh.setMatrixAt(i,c.matrix),this.torsoMesh.setColorAt(i,y),c.position.set(Gt,$t+.55*R,Wt),c.rotation.set(0,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.headMesh.setMatrixAt(i,c.matrix),this.headMesh.setColorAt(i,y),this.faceMesh.setMatrixAt(i,c.matrix),this.faceMesh.setColorAt(i,new ut(16777215)),c.position.set(.12*R,.55*R,0),c.position.applyAxisAngle(f,T),c.position.add(this._scratchVector.set(Gt,$t,Wt)),c.rotation.set(0,T,-Math.PI/2),c.scale.set(R,R,R),c.updateMatrix(),this.earMesh.setMatrixAt(n++,c.matrix),this.earMesh.setColorAt(n-1,y),c.position.set(-.12*R,.55*R,0),c.position.applyAxisAngle(f,T),c.position.add(this._scratchVector.set(Gt,$t,Wt)),c.rotation.set(0,T,Math.PI/2),c.scale.set(R,R,R),c.updateMatrix(),this.earMesh.setMatrixAt(n++,c.matrix),this.earMesh.setColorAt(n-1,y),c.position.set(.18*R,.42*R,0),c.position.applyAxisAngle(f,T),c.position.add(this._scratchVector.set(Gt,$t,Wt)),c.rotation.set(C,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.armMesh.setMatrixAt(s++,c.matrix),this.armMesh.setColorAt(s-1,y),c.position.set(-.18*R,.42*R,0),c.position.applyAxisAngle(f,T),c.position.add(this._scratchVector.set(Gt,$t,Wt)),c.rotation.set(P,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.armMesh.setMatrixAt(s++,c.matrix),this.armMesh.setColorAt(s-1,y),A){const _t=new U(0,-.08*R,.1*R);_t.applyEuler(c.rotation);const Bt=c.position.clone().add(_t);c.position.copy(Bt),c.rotation.set(P+Math.PI/2,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.staffMesh.setMatrixAt(l++,c.matrix)}else{const _t=new U(0,-.15*R,.1*R);_t.applyEuler(c.rotation);const Bt=c.position.clone().add(_t);c.position.copy(Bt),c.rotation.set(P+Math.PI/2,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.clubMesh.setMatrixAt(o++,c.matrix)}c.position.set(.08*R,.15*R,0),c.position.applyAxisAngle(f,T),c.position.add(this._scratchVector.set(Gt,$t,Wt)),c.rotation.set(F,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.legMesh.setMatrixAt(r++,c.matrix),this.legMesh.setColorAt(r-1,y),c.position.set(-.08*R,.15*R,0),c.position.applyAxisAngle(f,T),c.position.add(this._scratchVector.set(Gt,$t,Wt)),c.rotation.set(O,T,0),c.scale.set(R,R,R),c.updateMatrix(),this.legMesh.setMatrixAt(r++,c.matrix),this.legMesh.setColorAt(r-1,y),i++}}this.torsoMesh.count=i,this.headMesh.count=i,this.faceMesh.count=i,this.earMesh.count=n,this.armMesh.count=s,this.legMesh.count=r,this.clubMesh.count=o,this.staffMesh.count=l,this.torsoMesh.frustumCulled=!1,this.headMesh.frustumCulled=!1,this.faceMesh.frustumCulled=!1,this.earMesh.frustumCulled=!1,this.armMesh.frustumCulled=!1,this.legMesh.frustumCulled=!1,this.clubMesh.frustumCulled=!1,this.staffMesh.frustumCulled=!1;const b=_=>{_.instanceMatrix&&(_.instanceMatrix.needsUpdate=!0),_.instanceColor&&(_.instanceColor.needsUpdate=!0)};b(this.torsoMesh),b(this.headMesh),b(this.faceMesh),b(this.earMesh),b(this.armMesh),b(this.legMesh),b(this.clubMesh),b(this.staffMesh)}dispose(){console.log("[GoblinRenderer] Disposing...");const t=e=>{e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):e.material.dispose()))};t(this.torsoMesh),t(this.headMesh),t(this.faceMesh),t(this.earMesh),t(this.armMesh),t(this.legMesh),t(this.clubMesh),t(this.staffMesh),this.whiteMat&&this.whiteMat.dispose()}}class hg{constructor(t,e,i,n){this.scene=t,this.terrain=e,this.game=i,this.goblins=[],this.caves=[],this.hutSpawnTimers=new Map;const s=n||e.clippingPlanes||[];this.renderer=new eh(t,e,s),this.renderer.init(),this.spawnTimer=0,this.spawnInterval=40,this.plunderCount=0,this.MAX_GOBLINS=2e4,this.clanMemory={},At.initAssets(),this.caveGroup=new ei,this.scene.add(this.caveGroup),this.generateCaves(),this.caves.length>0&&(console.log("GoblinManager: Force spawning Debug Goblin"),this.spawnGoblinAtCave(this.caves[0]))}reset(){console.log("Resetting GoblinManager...");for(const t of this.goblins)t.mesh&&this.scene.remove(t.mesh),t.dispose&&t.dispose();this.goblins=[],this.plunderCount=0,this.frameCount=0,this.caves.forEach(t=>{t.mesh&&this.caveGroup.remove(t.mesh)}),this.caves=[]}scanForCaves(){this.terrain.buildings.forEach(t=>{t.userData.type==="cave"&&this.registerCave(t)})}registerCave(t){if(this.caves.some(i=>i.gridX===t.userData.gridX&&i.gridZ===t.userData.gridZ))return;const e={gridX:t.userData.gridX,gridZ:t.userData.gridZ,mesh:new ei,spawnCooldown:0,originalHeight:t.y,building:t,clanId:`clan_${t.userData.gridX}_${t.userData.gridZ} `};this.caves.push(e)}generateCaves(){console.log("GoblinManager: Generation started...");const t=5,e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80;let n=0,s=0;for(;n<t&&s<5e3;){s++;const r=Math.floor(Math.random()*e),o=Math.floor(Math.random()*i);this.isValidCaveSpot(r,o)&&this.createCave(r,o)&&n++}console.log(`GoblinManager: Generated ${n} goblin caves after ${s} attempts.`)}isValidCaveSpot(t,e){const i=this.terrain.getTileHeight(t,e);return!(i<=2||i>10)}createCaveTexture(){if(this.caveTexture)return this.caveTexture;const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d"),i=e.createRadialGradient(64,64,10,64,64,60);return i.addColorStop(0,"#000000"),i.addColorStop(.6,"#1a1a1a"),i.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=i,e.fillRect(0,0,128,128),e.fillStyle="#FFFF00",e.beginPath(),e.arc(50,50,2,0,Math.PI*2),e.arc(78,50,2,0,Math.PI*2),e.fill(),this.caveTexture=new we(t),this.caveTexture}createCave(t,e){const i=this.terrain.getTileHeight(t,e),n=new Hn(.4,16,16),s=new Kt({color:0,clippingPlanes:this.terrain.clippingPlanes||[]}),r=new Qt(n,s),o=this.terrain.logicalWidth||80,l=this.terrain.logicalDepth||80;r.position.set(t-o/2+.5,i,e-l/2+.5),r.scale.set(1,.6,1),r.visible=!1,this.caveGroup.add(r);const h=this.terrain.addBuilding("cave",t,e);if(h){console.log(`GoblinManager: Cave registered at ${t},${e} `),h.userData.linkedMesh=r;const c=`clan_cave_${t}_${e}`;return this.caves.push({mesh:r,building:h,gridX:t,gridZ:e,originalHeight:i,spawnCooldown:Math.random()*this.spawnInterval,clanId:c}),this.notifyClanActivity(c,null),!0}else return console.warn(`GoblinManager: Failed to register cave at ${t},${e} (Terrain rejected)`),this.caveGroup.remove(r),!1}update(t,e,i,n,s=1,r){if(typeof window<"u"&&window.location&&window.location.search&&window.location.search.includes("stressTest=true")&&this.goblins.length<this.MAX_GOBLINS){for(let h=0;h<500&&!(this.goblins.length>=this.MAX_GOBLINS);h++)if(this.caves.length>0){const c=this.caves[Math.floor(Math.random()*this.caves.length)];this.spawnGoblinAtCave(c)}}this.caves.forEach((h,c)=>{const d=this.terrain.getTileHeight(h.gridX,h.gridZ);if(d<=0){console.log(`[GoblinManager] Cave destroyed: SUBMERGED(H = ${d})`),this.destroyCave(h,c);return}if(h.building){if(!this.terrain.buildings.includes(h.building)){console.log("[GoblinManager] Cave destroyed: BUILDING MISSING from Terrain (Destroyed by Unit/Event)."),this.destroyCave(h,c);return}h.mesh.position.y!==h.building.y&&(h.mesh.position.y=h.building.y)}else h.mesh.position.y=d;Math.abs(d-h.originalHeight)>.1&&(h.originalHeight=d,h.mesh.position.y=d,h.mesh.updateMatrix())}),this.updateClanWaves(e),this.checkHutSpawns(e);const o=this.terrain.buildings||[],l=Math.max(1,Math.floor(2/s));this.frameCount===void 0&&(this.frameCount=0),this.frameCount++,this.frameCount%l;for(let h=this.goblins.length-1;h>=0;h--){const c=this.goblins[h];let d=!1,u=e;if(r){const f=c.position.x-r.position.x,m=c.position.z-r.position.z,x=f*f+m*m;if(!(c.action==="Fighting"||c.action==="Sieging"||c.state&&c.state.name==="CombatState")){let p=0;x>1e4?p=30:x>3600?p=10:x>900&&(p=2),p>0&&((this.frameCount+h)%p!==0?(d=!0,c.skippedTime=(c.skippedTime||0)+e):(u+=c.skippedTime||0,c.skippedTime=0))}}if(!d){try{c.isDead?c.updateDeathAnimation(u):c.updateLogic(t,u,n,o),c.updateVisuals&&c.updateVisuals()}catch(f){this._hasLoggedError||(console.error(`[GoblinManager] Error updating goblin ${h}:`,f.message),this._hasLoggedError=!0)}c.isFinished&&this.goblins.splice(h,1)}}this.frameCount++}notifyClanActivity(t,e=null){if(!t)return;this.clans||(this.clans={});let i=this.clans[t];if(i||(i={id:t,active:!1,waveTimer:0,waveLevel:0,caves:[],raidTarget:null,aggression:0},this.clans[t]=i),e){let n,s;if(e.gridX!==void 0?(n=e.gridX,s=e.gridZ):e.x!==void 0&&(n=e.x,s=e.z),n!==void 0&&s!==void 0){const r=window.game?window.game.simTotalTimeSec:0;i.raidTarget={x:n,z:s,timestamp:r}}}i.active||(e&&(i.aggression=(i.aggression||0)+1,console.log(`[GoblinManager] Clan ${t} Aggression: ${i.aggression.toFixed(1)} / 3.0`)),i.aggression>=3&&(i.active=!0,i.waveTimer=30,i.waveLevel=1,console.log(`[GoblinManager] Clan ${t} ACTIVATED! Wave 1 in 30s. Target:`,i.raidTarget)))}updateClanWaves(t){this.clans&&Object.values(this.clans).forEach(e=>{!e.active&&e.aggression>0&&(e.aggression-=t*.1,e.aggression<0&&(e.aggression=0)),e.active&&(e.aggression-=t*.05,e.aggression<=0&&(console.log(`[GoblinManager] Clan ${e.id} Exhausted/Pacified. Ending Raid State.`),e.active=!1,e.aggression=0)),e.active&&(e.waveTimer-=t,e.waveTimer<=0&&this.triggerWave(e))})}triggerWave(t){console.log(`[GoblinManager] TRIGGERING WAVE Level ${t.waveLevel} for Clan ${t.id}!`);const e=this.caves.filter(i=>i.clanId===t.id);if(e.length===0){const i=t.id.trim(),n=this.caves.filter(s=>s.clanId.trim()===i);if(n.length===0){console.log(`[GoblinManager] Clan ${t.id} has no caves remaining. Deactivating wave system.`),t.active=!1;return}n.forEach(s=>this.spawnWaveAtCave(s,t.waveLevel))}else e.forEach(i=>this.spawnWaveAtCave(i,t.waveLevel));this.mobilizeClan(t),t.waveLevel++,t.waveLevel>20&&(t.waveLevel=20),t.waveTimer=240}spawnWaveAtCave(t,e){const i=e<15?1:Math.min(1+Math.floor(e/20),2);console.log(`[Wave] Spawning ${i} goblins at cave ${t.gridX},${t.gridZ} (Lvl ${e})`);for(let n=0;n<i;n++)setTimeout(()=>{this.spawnGoblinAtCave(t,e)},n*200)}spawnGoblinAtCave(t,e=1){if(!t)return;if(t.building&&t.building.userData){const s=t.building.userData.population||0;if(s<1){Math.random()<.05&&console.log(`[GoblinManager] Cave at ${t.gridX},${t.gridZ} has insufficient pop: ${s.toFixed(2)}`);return}console.log(`[GoblinManager] SPAWN START: Cave at ${t.gridX},${t.gridZ}, Pop: ${s.toFixed(2)}`),t.building.userData.population-=1}if(t.building&&!this.terrain.buildings.includes(t.building)){console.warn("[GoblinManager] Aborting spawn: Cave building missing"),this.destroyCave(t,this.caves.indexOf(t));return}const i=this.terrain.grid[t.gridX][t.gridZ];if(!i||!i.hasBuilding){console.warn("[GoblinManager] Aborting spawn: Grid cell has no building. Self-healing/Destroying Cave."),this.destroyCave(t,this.caves.indexOf(t));return}let n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];t.building&&t.building.userData.type==="cave"&&(n=[{x:2,z:0},{x:-2,z:0},{x:0,z:2},{x:0,z:-2},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1},{x:2,z:1},{x:2,z:-1},{x:-2,z:1},{x:-2,z:-1},{x:1,z:2},{x:1,z:-2},{x:-1,z:2},{x:-1,z:-2}]),n.sort(()=>Math.random()-.5);for(const s of n){const r=t.gridX+s.x,o=t.gridZ+s.z;if(this.terrain.getTileHeight(r,o)>0){const h=this.getClanRaidTarget(t.clanId);this.spawnGoblin(r,o,t.clanId,h,e);return}}this.spawnGoblin(t.gridX,t.gridZ,t.clanId,null,e)}spawnGoblin(t,e,i=null,n=null,s=1){const r=Math.random();let o="normal";const l=Math.min(s,20)-1,h=.01+l*.0025,c=.045+l*.005,d=.09+l*.01;r<h?(o="king",console.log("👑 Goblin King Spawned!")):r<h+c?o="shaman":r<h+c+d&&(o="hobgoblin");const u=new At(this.scene,this.terrain,t,e,o,i,n);this.goblins.push(u),this.terrain.registerEntity&&this.terrain.registerEntity(u,t,e,"goblin")}increasePlunder(){this.plunderCount++,console.log(`Goblin Raid Success! Plunder Count: ${this.plunderCount} `)}checkHutSpawns(t){(this.terrain.buildings||[]).forEach(i=>{if((i.userData.type==="goblin_hut"||i.userData.type==="cave")&&i.userData.population>=5){if(this.goblins.length>=(this.MAX_GOBLINS||2e4)){console.log(`[GoblinManager] MAX_GOBLINS reached: ${this.goblins.length}`);return}const n=i.userData.clanId||`clan_${i.userData.type}_${i.userData.gridX}_${i.userData.gridZ}`,s={gridX:i.userData.gridX,gridZ:i.userData.gridZ,clanId:n,building:i};this.spawnGoblinAtCave(s),i.userData.population=0,i.population!==void 0&&(i.population=0),console.log(`[DEBUG] Goblin born from ${i.userData.type}! Total: ${this.goblins.length}, Reset population to 0`)}})}recordRaidLocation(t,e,i){if(!t)return;this.clanMemory[t]||(this.clanMemory[t]=[]);const n=this.clanMemory[t],s=n.find(r=>Math.abs(r.x-e)<5&&Math.abs(r.z-i)<5);s?(s.weight=Math.min(s.weight+1,10),s.timestamp=window.game?window.game.simTotalTimeSec:0):n.push({x:e,z:i,weight:1,timestamp:window.game?window.game.simTotalTimeSec:0}),n.sort((r,o)=>o.weight-r.weight),n.length>5&&(n.length=5)}getClanRaidTarget(t){if(!t)return null;if(this.clanMemory[t]&&this.clanMemory[t].length>0){const e=this.clanMemory[t],i=e.reduce((s,r)=>s+r.weight,0);let n=Math.random()*i;for(const s of e)if(n-=s.weight,n<=0)return s;return e[0]}if(this.clans&&this.clans[t]&&this.clans[t].raidTarget){const e=this.clans[t].raidTarget,i=window.game?window.game.simTotalTimeSec:0;return e.timestamp&&i-e.timestamp>60?null:e}return null}mobilizeClan(t){const e=this.getClanRaidTarget(t.id);if(!e)return;let i=0;this.goblins.forEach(n=>{const s=n.state instanceof di||n.state&&n.state.constructor.name==="GoblinWanderState";n.clanId===t.id&&!n.isDead&&s&&(n.raidGoal={x:e.x,z:e.z},n.raidGoal.x+=(Math.random()-.5)*5,n.raidGoal.z+=(Math.random()-.5)*5,n.changeState(new Pi(n)),i++)}),i>0&&console.log(`[GoblinManager] Mobilized ${i} idle goblins from Clan ${t.id} to raid target!`)}destroyCave(t,e){console.warn(`[GoblinManager] Removing invalid cave at ${t.gridX},${t.gridZ}`),t.mesh&&(this.scene.remove(t.mesh),this.caveGroup.remove(t.mesh)),t.building&&this.terrain.buildings.includes(t.building)&&this.terrain.removeBuilding(t.building),this.caves.splice(e,1)}reportRaidFailure(t,e,i){if(!t||!this.clanMemory[t])return;const n=this.clanMemory[t],s=n.findIndex(r=>Math.abs(r.x-e)<5&&Math.abs(r.z-i)<5);s!==-1&&(n[s].weight-=2,console.log(`Clan ${t} raid failure at ${e},${i}. Weight: ${n[s].weight}`),n[s].weight<=0&&(n.splice(s,1),console.log(`Clan ${t} forgot raid location ${e},${i}`)))}serialize(){return{plunderCount:this.plunderCount,goblins:this.goblins.filter(t=>t&&!t.isDead).map(t=>{if(typeof t.serialize=="function"){const e=t.serialize();return t.raidGoal&&(e.rg={x:t.raidGoal.x,z:t.raidGoal.z,ts:t.raidGoal.timestamp}),t.targetUnit&&(e.tu=t.targetUnit.id),t.targetBuilding&&(e.tb={x:t.targetBuilding.gridX,z:t.targetBuilding.gridZ}),e}else return console.warn(`Goblin ${t.id} missing serialize method! HMR issue?`),{id:t.id,x:t.gridX,z:t.gridZ,...t.type!=="normal"&&{t:t.type},...t.hp!==t.maxHp&&{h:t.hp},m:t.maxHp,...t.clanId&&{c:t.clanId},...t.age>1&&{a:Math.floor(t.age)},...t.lifespan&&{l:Math.floor(t.lifespan)},s:t.state&&t.state.constructor?t.state.constructor.name:"GoblinWanderState",...t.migrationTarget&&{mt:t.migrationTarget},...t.raidGoal&&{rg:{x:t.raidGoal.x,z:t.raidGoal.z,ts:t.raidGoal.timestamp}},...t.targetUnit&&{tu:t.targetUnit.id},...t.targetBuilding&&{tb:{x:t.targetBuilding.gridX,z:t.targetBuilding.gridZ}}}}),clans:this.clans?Object.values(this.clans).map(t=>({id:t.id,active:t.active,waveLevel:t.waveLevel,waveTimer:t.waveTimer,raidTarget:t.raidTarget,aggression:t.aggression})):[],caves:this.caves.map(t=>({x:t.gridX,z:t.gridZ,spawnCooldown:t.spawnCooldown,clanId:t.clanId}))}}deserialize(t){try{if(!t){console.warn("GoblinManager: No data to deserialize");return}console.log("GoblinManager: Deserializing...",t),this.plunderCount=t.plunderCount||0,this.clans={},t.clans&&t.clans.forEach(e=>{this.clans[e.id]={id:e.id,active:e.active,waveLevel:e.waveLevel||1,waveTimer:e.waveTimer||150,raidTarget:e.raidTarget,aggression:e.aggression!==void 0?e.aggression:e.active?3:0}}),this.caves=[],t.caves&&t.caves.forEach(e=>{const i=this.terrain.getBuildingAt(e.x,e.z);i&&i.userData.type==="cave"&&this.caves.push({gridX:e.x,gridZ:e.z,mesh:new ei,spawnCooldown:e.spawnCooldown||0,originalHeight:i.y,building:i,clanId:e.clanId})}),this.terrain&&this.terrain.unregisterAll&&this.terrain.unregisterAll("goblin"),this.goblins&&this.goblins.forEach(e=>{typeof e.dispose=="function"&&e.dispose()}),this.goblins=[],t.goblins&&Array.isArray(t.goblins)?(t.goblins.forEach(e=>{const i=e.x!==void 0?e.x:e.gridX,n=e.z!==void 0?e.z:e.gridZ,s=e.t||e.type||"normal",r=e.c||e.clanId||`clan_${i}_${n}`,o=new At(this.scene,this.terrain,i,n,s,r);o.id=e.id,o.hp=e.h||e.hp||o.maxHp,o.maxHp=e.m||e.maxHp||o.maxHp,o.age=e.a||e.age||0,o.lifespan=e.l||e.lifespan||100;let l=(e.s||e.state||"idle").toLowerCase();(l.includes("unitwander")||l.includes("wander"))&&(l="idle"),l.includes("raid")?(o.changeState(new Pi(o)),o.raidGoal&&(o.state.raidGoal=o.raidGoal)):l.includes("combat")||l.includes("fight")?o.changeState(new ls(o)):o.changeState(new di(o)),o.migrationTarget=e.mt||e.migrationTarget,e.scale&&(o.scale=e.scale),e.rg&&(o.raidGoal={x:e.rg.x,z:e.rg.z,timestamp:e.rg.ts}),(e.tu||e.tb)&&(o._restoredTargetUnitId=e.tu,o._restoredTargetBuildingPos=e.tb),this.goblins.push(o),this.terrain.registerEntity&&this.terrain.registerEntity(o,i,n,"goblin")}),console.log(`GoblinManager: Restored ${this.goblins.length} goblins.`),this.goblins.forEach(e=>{if(e._restoredTargetUnitId,e._restoredTargetBuildingPos){const i=this.terrain.getBuildingAt(e._restoredTargetBuildingPos.x,e._restoredTargetBuildingPos.z);i&&(e.targetBuilding=i)}})):console.warn("GoblinManager: No goblins list in save data.")}catch(e){console.error("GoblinManager Deserialize CRITICAL ERROR:",e),alert("Goblin Load Error: "+e.message)}}scanForCaves(){(this.terrain.buildings||[]).forEach(e=>{e.userData.type==="cave"&&this.registerCave(e)})}}class Fe extends ar{static assets={geometries:{},materials:{},initialized:!1};static initAssets(){if(Fe.assets.initialized)return;const t=new Hn(.12,8,8);t.scale(.4,.6,1.5),Fe.assets.geometries.body=t;const e=new ui(.1,.3,4);e.rotateX(-Math.PI/2),Fe.assets.geometries.tail=e,Fe.assets.materials.fish=new Kt({color:4500223}),Fe.assets.initialized=!0}constructor(t,e,i,n){Fe.initAssets(),super(t,e,i,n,"fish"),this.moveInterval=.5+Math.random()*1.5,this.lastTime=0,this.wiggleOffset=Math.random()*100,this.mesh=this.createMesh(),this.scene.add(this.mesh),this.updatePosition(),this.changeState(new or(this))}createMesh(){const t=new ei,e=new Qt(Fe.assets.geometries.body,Fe.assets.materials.fish);t.add(e);const i=new Qt(Fe.assets.geometries.tail,Fe.assets.materials.fish);return i.position.z=-.3,t.add(i),t.userData.tail=i,t}updateLogic(t,e){if(this.simTime=t,this.terrain.getTileHeight(this.gridX,this.gridZ)>.5){this.die(),this.isDead=!0;return}if(this.state&&this.state.update(t,e),!this.isMoving&&this.mesh){const n=Math.sin(t*3+this.wiggleOffset)*.15;this.mesh.rotation.z=n}}moveRandomly(t){const e=this.terrain.logicalWidth||80,i=this.terrain.logicalDepth||80,n=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let s=n.length-1;s>0;s--){const r=Math.floor(Math.random()*(s+1));[n[s],n[r]]=[n[r],n[s]]}for(const s of n){let r=this.gridX+s.x,o=this.gridZ+s.z;if(r<0&&(r=e-1),r>=e&&(r=0),o<0&&(o=i-1),o>=i&&(o=0),this.canMoveTo(r,o)){this.executeMove(r,o,t);return}}}canMoveTo(t,e){return!(this.terrain.getTileHeight(t,e)>.5)}getPositionForGrid(t,e){const i=this.terrain.logicalWidth||80,n=this.terrain.logicalDepth||80,s=t-i/2+.5,r=e-n/2+.5;let o={x:0,y:0};if(this.terrain&&this.terrain.getVisualOffset){const l=s,h=-r;o=this.terrain.getVisualOffset(l,h)}return new U(s+o.x,-.2,r-o.y)}onMoveStep(t){const e=Math.sin(t*Math.PI*8+this.wiggleOffset)*.3;this.mesh&&(this.mesh.rotation.z=e,this.mesh.position.copy(this.position),this.mesh.rotation.y=this.rotationY)}dispose(){this.mesh&&this.scene.remove(this.mesh),this.terrain.unregisterEntity(this)}}class cg{constructor(t,e,i){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.fishes=[],Fe.initAssets(),Fe.assets.materials.fish&&(Fe.assets.materials.fish.clippingPlanes=this.clippingPlanes),this.init(),console.log("FishManager Refactored: Initialized with Entity-based Fish.")}init(){const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80;this.fishes=[];for(let i=0;i<75;i++)this.spawnRandomFish(t,e);console.log("Spawned initial fish.")}spawnRandomFish(t,e){if(this.fishes.length>=75)return;let i=0;for(;i<10;){const n=Math.floor(Math.random()*t),s=Math.floor(Math.random()*e);if(this.terrain.getTileHeight(n,s)<=.5){const o=new Fe(this.scene,this.terrain,n,s);this.fishes.push(o);return}i++}}update(t,e,i){for(let n=this.fishes.length-1;n>=0;n--){const s=this.fishes[n];s.updateLogic(t,e),s.updateMovement(t),s.isDead&&(this.removeFish(s),this.fishes.splice(n,1))}if(this.fishes.length<60){const n=this.terrain.logicalWidth||80,s=this.terrain.logicalDepth||80;Math.random()<.05&&this.spawnRandomFish(n,s)}}removeFish(t){t.dispose()}}class dg{constructor(t){if(this.game=t,this.terrain=t.terrain,this.canvas=document.getElementById("minimap"),!this.canvas){console.warn('Minimap: canvas "#minimap" not found. Minimap disabled.');return}this.ctx=this.canvas.getContext("2d"),this.isDragging=!1,this._binds={onMouseDown:this.onMouseDown.bind(this),onMouseMove:this.onMouseMove.bind(this),onMouseUp:this.onMouseUp.bind(this)},this.canvas&&this.canvas.addEventListener("mousedown",this._binds.onMouseDown),window.addEventListener("mousemove",this._binds.onMouseMove),window.addEventListener("mouseup",this._binds.onMouseUp)}dispose(){this._binds&&(this.canvas.removeEventListener("mousedown",this._binds.onMouseDown),window.removeEventListener("mousemove",this._binds.onMouseMove),window.removeEventListener("mouseup",this._binds.onMouseUp))}onMouseDown(t){t.preventDefault(),t.stopPropagation(),t.target===this.canvas&&(this.isDragging=!0,this.game.controls&&(this.game.controls.enabled=!1),this.updateCameraFromMiniMap(t))}onMouseMove(t){this.isDragging&&(t.preventDefault(),t.stopPropagation(),this.updateCameraFromMiniMap(t))}onMouseUp(t){this.isDragging=!1,this.game.controls&&(this.game.controls.enabled=!0)}updateCameraFromMiniMap(t){const e=this.canvas.getBoundingClientRect(),i=t.clientX-e.left,n=t.clientY-e.top,s=this.game.terrain.logicalWidth,r=this.game.terrain.logicalDepth,o=i/this.canvas.width,l=n/this.canvas.height,h=o*s,c=l*r,d=h-s/2,u=c-r/2,f=this.game.camera,m=this.game.controls;if(m){const x=m.target.y,g=f.position.x-m.target.x,p=f.position.z-m.target.z,b=f.position.y-m.target.y;m.target.set(d,x,u),f.position.set(d+g,m.target.y+b,u+p),m.update()}}update(){if(!this.terrain||!this.terrain.grid||!this.ctx)return;this.ctx.fillStyle="#000",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);const t=this.terrain.logicalWidth,e=this.terrain.logicalDepth,i=this.canvas.width/t,n=this.canvas.height/e;(!this.imgData||this.imgData.width!==this.canvas.width||this.imgData.height!==this.canvas.height)&&(this.imgData=this.ctx.createImageData(this.canvas.width,this.canvas.height));const s=this.imgData,r=s.data,o=this.canvas.width,l=this.canvas.height;for(let _=0;_<l;_++)for(let v=0;v<o;v++){const w=Math.floor(v/i),M=Math.floor(_/n),A=Math.min(Math.max(w,0),t-1),R=Math.min(Math.max(M,0),e-1);if(!this.terrain.grid||!this.terrain.grid[A])continue;const T=this.terrain.grid[A][R];if(!T)continue;const y=T.height,C=T.noise,P=T.moisture||.5,F=this.game.terrain._lastIsNight||!1,O=this.game.terrain.currentSeason||"Spring",H=this.terrain.getBiomeColor(y,P,C,F,O,A,R,!0),V=(_*o+v)*4;r[V]=H.r*255,r[V+1]=H.g*255,r[V+2]=H.b*255,r[V+3]=255}this.ctx.putImageData(s,0,0),this.ctx.fillStyle="blue",this.game.units.forEach(_=>{if(_.isDead)return;const v=Math.floor(_.gridX*i),w=Math.floor(_.gridZ*n);this.ctx.fillRect(v,w,2,2)}),this.ctx.fillStyle="red",this.game.goblinManager.goblins.forEach(_=>{if(_.isDead)return;const v=Math.floor(_.gridX*i),w=Math.floor(_.gridZ*n);this.ctx.fillRect(v,w,2,2)});const h=this.game.camera.position.x,c=this.game.camera.position.z;let d=h,u=c,f=d+t/2,m=u+e/2;f=(f%t+t)%t,m=(m%e+e)%e;const x=f*i,g=m*n,p=Ee.render&&Ee.render.viewRadius?Ee.render.viewRadius:40,b=p*i;this._loggedDebug||(console.log("Minimap Debug:",{canvasW:this.canvas.width,logicalW:t,scaleX:i,viewRadius:p,pixelRadius:b,frameSize:b*2}),this._loggedDebug=!0),this.ctx.strokeStyle="white",this.ctx.lineWidth=1,this.ctx.strokeRect(x-b,g-b,b*2,b*2);for(let _=-1;_<=1;_++)for(let v=-1;v<=1;v++){if(_===0&&v===0)continue;const w=x+_*this.canvas.width,M=g+v*this.canvas.height;this.ctx.strokeRect(w-b,M-b,b*2,b*2)}}}class ug{constructor(t){this.game=t,this.camera=t.camera,this.wrapper=document.createElement("div"),this.wrapper.id="compass-wrapper",this.wrapper.style.position="absolute",this.wrapper.style.top="60px",this.wrapper.style.left="180px",this.wrapper.style.width="60px",this.wrapper.style.height="60px",this.wrapper.style.pointerEvents="none",this.wrapper.style.zIndex="1000",this.canvas=document.createElement("canvas"),this.canvas.width=60,this.canvas.height=60,this.wrapper.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),document.body&&document.body.appendChild(this.wrapper)}update(){if(!this.game.controls)return;const e=-this.game.controls.getAzimuthalAngle(),i=this.ctx;if(!i)return;const n=this.canvas.width,s=this.canvas.height,r=n/2,o=s/2,l=n/2-5;i.clearRect(0,0,n,s),i.save(),i.translate(r,o),i.rotate(e),i.strokeStyle="#8B4513",i.lineWidth=4,i.beginPath(),i.arc(0,0,l,0,Math.PI*2),i.stroke(),i.fillStyle="rgba(210, 180, 140, 0.3)",i.fill(),i.fillStyle="#800000",i.beginPath(),i.moveTo(0,-l+5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.strokeStyle="#3e2723",i.lineWidth=1,i.stroke(),i.fillStyle="#D2691E",i.beginPath(),i.moveTo(0,l-5),i.lineTo(10,0),i.lineTo(-10,0),i.closePath(),i.fill(),i.stroke(),i.restore(),i.save(),i.translate(r,o),i.rotate(e),i.font="bold 16px serif",i.fillStyle="#F5DEB3",i.textAlign="center",i.textBaseline="middle",i.fillText("N",0,-l+12),i.restore()}}class yl{constructor(t,e,i,n=2e3){this.scene=t,this.terrain=e,this.clippingPlanes=i||[],this.maxInstances=n,this.dummy=new xe,this.whiteMat=new Ue({color:16777215,roughness:1,clippingPlanes:this.clippingPlanes})}async init(t,e){const i=t||(this.terrain?this.terrain.checkYield.bind(this.terrain):null);await at.initAssets(i,e),await this.terrain.checkYield(),this.initialized=!0;const n=async()=>{i&&await i(!0)},s=(l,h)=>{if(!l)return console.error("[UnitRenderer] Geometry missing for mesh creation!"),null;const c=new Qa(l,h,this.maxInstances);return c.instanceMatrix.setUsage(ja),c.frustumCulled=!1,c.castShadow=!0,c.receiveShadow=!0,this.scene.add(c),c};e&&e("Initializing Units (Meshes 1/4)..."),await n();const r=l=>{l&&(l.clippingPlanes=this.clippingPlanes,l.needsUpdate=!0)};[at.assets.materials.face,at.assets.materials.metal,at.assets.materials.wood,at.assets.materials.wizardHat,at.assets.materials.redIndicator,at.assets.materials.armor,at.assets.materials.helmet,at.assets.materials.robe].forEach(l=>r(l)),Object.values(at.assets.materials).forEach(l=>{l&&(l.isMaterial||Array.isArray(l))&&(Array.isArray(l)?l:[l]).forEach(c=>{c.clippingPlanes=this.clippingPlanes,c.needsUpdate=!0})}),this.torsoMesh=s(at.assets.geometries.body,this.whiteMat),this.headMesh=s(at.assets.geometries.head,this.whiteMat),this.faceMesh=s(at.assets.geometries.facePlane,at.assets.materials.face),e&&e("Initializing Units (Meshes 2/4)..."),await n(),this.leftArmMesh=s(at.assets.geometries.limb,this.whiteMat),this.rightArmMesh=s(at.assets.geometries.limb,this.whiteMat),this.leftLegMesh=s(at.assets.geometries.limb,this.whiteMat),this.rightLegMesh=s(at.assets.geometries.limb,this.whiteMat),e&&e("Initializing Units (Meshes 3/4)..."),await n(),this.swordMesh=s(at.assets.geometries.sword,at.assets.materials.metal),this.visorMesh=s(at.assets.geometries.head,this.whiteMat),this.staffMesh=s(at.assets.geometries.staff,at.assets.materials.wood),this.hatMesh=s(at.assets.geometries.wizardHat,at.assets.materials.wizardHat),this.hatBrimMesh=s(at.assets.geometries.wizardHatBrim,at.assets.materials.wizardHat),e&&e("Initializing Units (Meshes 4/4)..."),await n(),this.indicatorTopMesh=s(at.assets.geometries.jobIndicatorTop,at.assets.materials.redIndicator),this.indicatorDotMesh=s(at.assets.geometries.jobIndicatorDot,at.assets.materials.redIndicator),this._scratchVector=new U,this._scratchSphere=new pi(new U,2),this._up=new U(0,1,0),this._neighborOffsets=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}]}update(t,e,i){if(!this.initialized||!t)return;if(!at.assets.initialized){console.error("UR: Assets Missing");return}let n=0;const s=this.terrain.logicalWidth||240,r=this.terrain.logicalDepth||240,o=new ut(6636321),l=new ut(13938487),h=new ut(139),c=new ut(10066329),d=new ut(4456584),u=new ut(16764074);for(const m of t){if(m.isDead||m.isSleeping||!m.position)continue;let x=o;m.role==="knight"?x=c:m.role==="wizard"?x=d:m.role==="fisher"?x=new ut(52945):m.role==="hunter"?x=new ut(25600):m.role==="worker"&&(m.isSpecial?x=h:x=o);const g=Ee.render&&Ee.render.viewRadius?Ee.render.viewRadius:120,p=g*g,b=Math.floor((i.x-g-m.position.x)/s),_=Math.ceil((i.x+g-m.position.x)/s),v=Math.floor((i.z-g-m.position.z)/r),w=Math.ceil((i.z+g-m.position.z)/r);for(let M=b;M<=_;M++)for(let A=v;A<=w&&!(n>=this.maxInstances);A++){const R=M,T=A,y=m.position.x+R*s,C=m.position.z+T*r,P=m.position.y,F=m.rotationY,O=y-i.x,H=C-i.z;if(O*O+H*H>p)continue;this.dummy.position.set(y,P,C),this.dummy.rotation.set(0,F,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.torsoMesh.setMatrixAt(n,this.dummy.matrix),this.torsoMesh.setColorAt(n,x),this.dummy.position.set(y,P,C),this.dummy.rotation.set(0,F,0),this.dummy.scale.set(1,1,1);let Q=1;if(m.role==="wizard"&&(Q=.5,this.dummy.scale.set(1,Q,1),this.dummy.position.y+=.2375),this.dummy.updateMatrix(),this.headMesh.setMatrixAt(n,this.dummy.matrix),this.faceMesh.setMatrixAt(n,this.dummy.matrix),m.role==="knight"?this.headMesh.setColorAt(n,x):this.headMesh.setColorAt(n,l),this.faceMesh.setColorAt(n,new ut(16777215)),m.targetRequest){const W=Math.sin(Date.now()*.005)*.1;this.dummy.position.set(y,P+1.2+W,C),this.dummy.rotation.set(0,F,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.indicatorTopMesh.setMatrixAt(n,this.dummy.matrix),this.indicatorDotMesh.setMatrixAt(n,this.dummy.matrix)}else this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.indicatorTopMesh.setMatrixAt(n,this.dummy.matrix),this.indicatorDotMesh.setMatrixAt(n,this.dummy.matrix);m.role==="knight"?(this.dummy.position.set(y,P,C),this.dummy.rotation.set(0,F,0),this.dummy.scale.set(1.1,.2,1.1),this.dummy.position.y+=.53,this.dummy.updateMatrix(),this.visorMesh.setMatrixAt(n,this.dummy.matrix),this.visorMesh.setColorAt(n,new ut(10066329))):(this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.visorMesh.setMatrixAt(n,this.dummy.matrix)),this.dummy.position.set(.18,.45,0),this.dummy.position.applyAxisAngle(this._up,F),this.dummy.position.add(this._scratchVector.set(y,P,C)),this.dummy.rotation.set(m.limbs.leftArm.x,F,0),m.role==="wizard"?(this.dummy.scale.set(1,1.25,1),this.dummy.translateY(-.035)):this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.leftArmMesh.setMatrixAt(n,this.dummy.matrix),this.leftArmMesh.setColorAt(n,u),this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,F),this.dummy.position.add(this._scratchVector.set(y,P,C)),this.dummy.rotation.set(m.limbs.rightArm.x,F,0),m.role==="wizard"?(this.dummy.scale.set(1,1.25,1),this.dummy.translateY(-.035)):this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.rightArmMesh.setMatrixAt(n,this.dummy.matrix),this.rightArmMesh.setColorAt(n,u),this.dummy.position.set(.08,.25,0),this.dummy.position.applyAxisAngle(this._up,F),this.dummy.position.add(this._scratchVector.set(y,P,C)),this.dummy.rotation.set(m.limbs.leftLeg.x,F,0),this.dummy.updateMatrix(),this.leftLegMesh.setMatrixAt(n,this.dummy.matrix),this.leftLegMesh.setColorAt(n,x),this.dummy.position.set(-.08,.25,0),this.dummy.position.applyAxisAngle(this._up,F),this.dummy.position.add(this._scratchVector.set(y,P,C)),this.dummy.rotation.set(m.limbs.rightLeg.x,F,0),this.dummy.updateMatrix(),this.rightLegMesh.setMatrixAt(n,this.dummy.matrix),this.rightLegMesh.setColorAt(n,x),m.role==="knight"?(this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,F),this.dummy.position.add(this._scratchVector.set(y,P,C)),this.dummy.rotation.set(m.limbs.rightArm.x,F,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.swordMesh.setMatrixAt(n,this.dummy.matrix)):(this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.swordMesh.setMatrixAt(n,this.dummy.matrix)),m.role==="wizard"?(this.dummy.position.set(-.18,.45,0),this.dummy.position.applyAxisAngle(this._up,F),this.dummy.position.add(this._scratchVector.set(y,P,C)),this.dummy.scale.set(1,1,1),this.dummy.rotation.set(m.limbs.rightArm.x,F,0),this.dummy.translateY(-.25),this.dummy.rotateX(Math.PI/2),this.dummy.updateMatrix(),this.staffMesh.setMatrixAt(n,this.dummy.matrix),this.staffMesh.setColorAt(n,at.assets.materials.wood.color),this.dummy.position.set(y,P+.6,C),this.dummy.rotation.set(0,F,0),this.dummy.scale.set(1,1,1),this.dummy.updateMatrix(),this.hatMesh.setMatrixAt(n,this.dummy.matrix),this.hatBrimMesh.setMatrixAt(n,this.dummy.matrix)):(this.dummy.scale.set(0,0,0),this.dummy.updateMatrix(),this.staffMesh.setMatrixAt(n,this.dummy.matrix),this.hatMesh.setMatrixAt(n,this.dummy.matrix),this.hatBrimMesh.setMatrixAt(n,this.dummy.matrix)),n++}}this.torsoMesh.count=n,this.headMesh.count=n,this.faceMesh.count=n,this.leftArmMesh.count=n,this.rightArmMesh.count=n,this.leftLegMesh.count=n,this.rightLegMesh.count=n,this.swordMesh.count=n,this.staffMesh.count=n,this.hatMesh.count=n,this.hatBrimMesh.count=n,this.visorMesh.count=n,this.indicatorTopMesh.count=n,this.indicatorDotMesh.count=n;const f=m=>{m.instanceMatrix&&(m.instanceMatrix.needsUpdate=!0),m.instanceColor&&(m.instanceColor.needsUpdate=!0)};f(this.torsoMesh),f(this.headMesh),f(this.faceMesh),f(this.leftArmMesh),f(this.rightArmMesh),f(this.leftLegMesh),f(this.rightLegMesh),f(this.swordMesh),f(this.visorMesh),f(this.staffMesh),f(this.hatMesh),f(this.hatBrimMesh),f(this.indicatorTopMesh),f(this.indicatorDotMesh),this.dummy.position.set(0,0,0),this.dummy.scale.set(1,1,1),this.dummy.rotation.set(0,0,0),this.dummy.updateMatrix()}dispose(){const t=e=>{e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose())};t(this.torsoMesh),t(this.headMesh),t(this.faceMesh),t(this.leftArmMesh),t(this.rightArmMesh),t(this.leftLegMesh),t(this.rightLegMesh),t(this.swordMesh),t(this.visorMesh),t(this.staffMesh),t(this.hatMesh),t(this.hatBrimMesh),t(this.indicatorTopMesh),t(this.indicatorDotMesh),this.whiteMat&&this.whiteMat.dispose()}}class bl{constructor(t,e,i,n=1e4){this.scene=t,this.terrain=e,this.terrainWidth=e.logicalWidth,this.terrainDepth=e.logicalDepth,this.clippingPlanes=i||[],this.MAX_INSTANCES=n,this.MAX_INSTANCES=n,this.meshes={},this._scratchVector=new U,this._scratchSphere=new pi(new U,2),this._dummy=new xe}async init(){console.log("[BuildingRenderer] Initializing Assets..."),await this.initAssets(),await this.initInstancedMeshes(),this.initialized=!0,console.log("[BuildingRenderer] Initialization Complete.")}async initAssets(){this.assets={};const t={clippingPlanes:this.clippingPlanes,clipShadows:!0};this.assets.houseWallGeo=new le(1.6,.8,1.6),this.assets.houseWallGeo.translate(0,.4,0);const e=document.createElement("canvas");e.width=128,e.height=64;const i=e.getContext("2d"),n=document.createElement("canvas");n.width=128,n.height=64;const s=n.getContext("2d");i.fillStyle="#654321",i.fillRect(0,0,128,64),s.fillStyle="#000000",s.fillRect(0,0,128,64),i.fillStyle="#5A3A1A";for(let C=0;C<64;C+=16)for(let P=0;P<128;P+=16)(P+C)/16%2===0&&i.fillRect(P+1,C+1,14,14);const r=(C,P)=>{i.fillStyle="#111",i.fillRect(C-6,P-8,12,16),s.fillStyle="#FFFFFF",s.fillRect(C-4,P-6,8,12)};r(32,32),r(96,32),this.assets.houseWallMat=new Kt({...t,map:new we(e),emissiveMap:new we(n),emissive:0,emissiveIntensity:0}),await this.terrain.checkYield();const o=document.createElement("canvas");o.width=64,o.height=64;const l=o.getContext("2d");l.fillStyle="#800000",l.fillRect(0,0,64,64),l.fillStyle="#600000";for(let C=0;C<64;C+=8)l.fillRect(0,C,64,2);l.fillStyle="#A00000";for(let C=0;C<64;C+=8)for(let P=C%16===0?0:4;P<64;P+=8)l.fillRect(P,C,2,8);this.assets.houseRoofMat=new Kt({...t,map:new we(o),color:16777215}),this.assets.houseRoofGeo=new ui(1.2,.8,4),this.assets.houseRoofGeo.translate(0,1.2,0),this.assets.houseRoofGeo.rotateY(Math.PI/4),await this.terrain.checkYield();const h=new ii(1.4,1.4,4.5,16);h.translate(0,2.25,0);const c=new ii(1.6,1.6,.4,16);c.translate(0,4.5,0),this.assets.towerGeo=h,this.assets.towerRimGeo=c,console.log("Tower Geometry Initialized (Split Mode)");const d=document.createElement("canvas");d.width=128,d.height=256;const u=d.getContext("2d"),f=document.createElement("canvas");f.width=128,f.height=256;const m=f.getContext("2d");u.fillStyle="#505050",u.fillRect(0,0,128,256),m.fillStyle="#000000",m.fillRect(0,0,128,256),u.fillStyle="#404040";for(let C=0;C<256;C+=16){const P=C/16%2===0?0:8;for(let F=0;F<128;F+=16)u.fillRect((F+P)%128+1,C+1,14,14)}const x=(C,P,F,O)=>{u.fillStyle="#101010",u.fillRect(C,P,F,O),m.fillStyle="#FFFFEE",m.fillRect(C+1,P+1,F-2,O-2)};x(20,80,6,18),x(80,80,6,18),x(50,180,6,18),x(110,180,6,18),this.assets.towerMat=new Kt({...t,map:new we(d),emissiveMap:new we(f),color:15658734,emissive:0,emissiveIntensity:0}),this.assets.towerCapMat=new Kt({...t,color:5263440,map:null,emissive:0}),console.log("Tower Debug: Generated High-Res Tower Texture + Cap Material"),await this.terrain.checkYield(),this.assets.farmGeo=new Ui(1.8,1.8),this.assets.farmGeo.rotateX(-Math.PI/2),this.assets.farmGeo.translate(0,.05,0);const g=document.createElement("canvas");g.width=64,g.height=64;const p=g.getContext("2d");p.fillStyle="#DAA520",p.fillRect(0,0,64,64),p.fillStyle="#B8860B";for(let C=0;C<10;C++)p.fillRect(C*6,0,2,64);this.assets.farmMat=new Kt({...t,map:new we(g),side:$e}),await this.terrain.checkYield(),this.assets.barracksGeo=new le(2.4,1.2,2.4),this.assets.barracksGeo.translate(0,.6,0);const b=document.createElement("canvas");b.width=128,b.height=64;const _=b.getContext("2d"),v=document.createElement("canvas");v.width=128,v.height=64;const w=v.getContext("2d");_.fillStyle="#654321",_.fillRect(0,0,128,64),w.fillStyle="#000000",w.fillRect(0,0,128,64),_.fillStyle="#5A3A1A";for(let C=0;C<64;C+=16)for(let P=0;P<128;P+=16)(P+C)/16%2===0&&_.fillRect(P+1,C+1,14,14);const M=(C,P)=>{_.fillStyle="#111",_.fillRect(C-6,P-8,12,16),w.fillStyle="#FFFFEE",w.fillRect(C-4,P-6,8,12)};M(22,32),M(64,32),M(106,32),this.assets.barracksRoofGeo=new ui(2,1.2,8),this.assets.barracksRoofGeo.translate(0,1.8,0),this.assets.barracksMat=new Kt({...t,map:new we(b),emissiveMap:new we(v),emissive:0,emissiveIntensity:0}),this.assets.barracksRoofMat=new Kt({...t,map:new we(o),color:16777215}),this.assets.goblinHutGeo=new ui(.4,.6,6),this.assets.goblinHutGeo.translate(0,.3,0);const A=document.createElement("canvas");A.width=64,A.height=64;const R=A.getContext("2d");R.fillStyle="#654321",R.fillRect(0,0,64,64),R.fillStyle="#8B4513";for(let C=0;C<30;C++)R.fillRect(Math.random()*60,Math.random()*60,4,2);this.assets.goblinHutMat=new Kt({...t,map:new we(A),color:11184810}),this.assets.caveGeo=new ii(.45,.45,.05,16),this.assets.caveGeo.translate(0,0,0);const T=document.createElement("canvas");T.width=64,T.height=64;const y=T.getContext("2d");if(y.createRadialGradient){const C=y.createRadialGradient(32,32,5,32,32,30);C.addColorStop(0,"#000000"),C.addColorStop(.7,"#1a1a1a"),C.addColorStop(1,"#404040"),y.fillStyle=C}else y.fillStyle="#101010";y.fillRect(0,0,64,64),y.fillStyle="#101010";for(let C=0;C<30;C++){const P=Math.random()*Math.PI*2,F=28+Math.random()*4;y.fillRect(32+Math.cos(P)*F,32+Math.sin(P)*F,2,2)}this.assets.caveMat=new Kt({...t,map:new we(T),color:8421504}),[this.assets.houseWallMat,this.assets.barracksMat,this.assets.towerMat,this.assets.caveMat].forEach(C=>{C&&(C.clippingPlanes=this.clippingPlanes,C.needsUpdate=!0)})}initInstancedMeshes(){const t=(i,n)=>{const s=new Qa(i,n,this.MAX_INSTANCES);return s.instanceMatrix.setUsage(ja),s.castShadow=!0,s.receiveShadow=!0,s.frustumCulled=!1,this.scene.add(s),s};this.meshes.houseWalls=t(this.assets.houseWallGeo,this.assets.houseWallMat),this.meshes.houseRoofs=t(this.assets.houseRoofGeo,this.assets.houseRoofMat),this.meshes.farms=t(this.assets.farmGeo,this.assets.farmMat),this.meshes.goblinHuts=t(this.assets.goblinHutGeo,this.assets.goblinHutMat);const e=[this.assets.towerMat,this.assets.towerCapMat,this.assets.towerCapMat];this.meshes.towers=t(this.assets.towerGeo,e),this.meshes.towerRims=t(this.assets.towerRimGeo,e),this.meshes.barracksWalls=t(this.assets.barracksGeo,this.assets.barracksMat),this.meshes.barracksRoofs=t(this.assets.barracksRoofGeo,this.assets.barracksRoofMat),this.meshes.caves=t(this.assets.caveGeo,this.assets.caveMat)}update(t,e,i){if(!this.initialized||!t||!i)return;this._debugTimer||(this._debugTimer=0),this._debugTimer++,this._debugTimer>120&&(this._debugTimer=0,t.forEach(_=>{_.userData&&_.userData.type&&_.userData.type}));const n=this.terrain.logicalWidth||240,s=this.terrain.logicalDepth||240;let r=0,o=0;if(i&&(r=Math.round(i.x/n),o=Math.round(i.z/s)),this._lastBaseGridX===r&&this._lastBaseGridZ===o&&this._lastBuildingCount===t.length&&!this.forceUpdate)return;this._lastBaseGridX=r,this._lastBaseGridZ=o,this._lastBuildingCount=t.length,this.forceUpdate=!1;let l=0,h=0,c=0,d=0,u=0,f=0;const m=this._dummy,x=[{x:0,z:0},{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1},{x:1,z:1},{x:1,z:-1},{x:-1,z:1},{x:-1,z:-1}],g=new ut(16777215),p=new ut(16777215),b=new ut(11184810);for(const _ of t){const v=_.gridX,w=_.gridZ,M=this.terrain.getVisualPosition(v,w,!0),A=M.y||0;for(const R of x){const T=(R.x+r)*n,y=(R.z+o)*s,C=M.x+T,P=M.z+y;let F=C,O=P;_.type==="farm"||_.type==="house"||_.type==="goblin_hut"?(F+=.5,O+=.5):(_.type==="barracks"||_.type==="tower")&&(F+=1,O+=1),_.type,m.position.set(F,A,O),m.scale.set(1,1,1),m.rotation.set(0,_.rotation||0,0),m.updateMatrix(),_.type==="house"&&l<this.MAX_INSTANCES?(this.meshes.houseWalls.setMatrixAt(l,m.matrix),this.meshes.houseRoofs.setMatrixAt(l,m.matrix),this.meshes.houseRoofs.setColorAt(l,g),l++):_.type==="farm"&&h<this.MAX_INSTANCES?(this.meshes.farms.setMatrixAt(h,m.matrix),h++):_.type==="barracks"&&d<this.MAX_INSTANCES?(this.meshes.barracksWalls.setMatrixAt(d,m.matrix),this.meshes.barracksRoofs.setMatrixAt(d,m.matrix),this.meshes.barracksRoofs.setColorAt(d,p),d++):_.type==="goblin_hut"&&c<this.MAX_INSTANCES?(this.meshes.goblinHuts.setMatrixAt(c,m.matrix),this.meshes.goblinHuts.setColorAt(c,b),this.meshes.goblinHuts.setColorAt(c,b),c++):_.type==="tower"&&u<this.MAX_INSTANCES?(this.meshes.towers.setMatrixAt(u,m.matrix),this.meshes.towerRims.setMatrixAt(u,m.matrix),u++):_.type==="cave"&&f<this.MAX_INSTANCES&&(this.meshes.caves.setMatrixAt(f,m.matrix),f++)}}this.meshes.houseWalls.count=l,this.meshes.houseRoofs.count=l,this.meshes.farms.count=h,this.meshes.goblinHuts.count=c,this.meshes.barracksWalls.count=d,this.meshes.barracksRoofs.count=d,this.meshes.towers.count=u,this.meshes.towerRims.count=u,this.meshes.houseWalls.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceMatrix.needsUpdate=!0,this.meshes.houseRoofs.instanceColor&&(this.meshes.houseRoofs.instanceColor.needsUpdate=!0),this.meshes.farms.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceMatrix.needsUpdate=!0,this.meshes.goblinHuts.instanceColor&&(this.meshes.goblinHuts.instanceColor.needsUpdate=!0),this.meshes.barracksWalls.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceMatrix.needsUpdate=!0,this.meshes.barracksRoofs.instanceColor&&(this.meshes.barracksRoofs.instanceColor.needsUpdate=!0),this.meshes.towers.instanceMatrix.needsUpdate=!0,this.meshes.towerRims.instanceMatrix.needsUpdate=!0,this.meshes.caves.count=f,this.meshes.caves.instanceMatrix.needsUpdate=!0}updateLighting(t){if(!this.initialized||this._lastIsNight===t)return;this._lastIsNight=t;const e=t?1:0,i=t?16747520:0;this.assets.houseWallMat&&(this.assets.houseWallMat.emissive.setHex(i),this.assets.houseWallMat.emissiveIntensity=e,this.assets.houseWallMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0),this.assets.towerMat&&(this.assets.towerMat.emissive.setHex(i),this.assets.towerMat.emissiveIntensity=e,this.assets.towerMat.needsUpdate=!0),this.assets.castleKeepMat&&(this.assets.castleKeepMat.emissive.setHex(i),this.assets.castleKeepMat.emissiveIntensity=e,this.assets.castleKeepMat.needsUpdate=!0),this.assets.barracksMat&&(this.assets.barracksMat.emissive.setHex(i),this.assets.barracksMat.emissiveIntensity=e,this.assets.barracksMat.needsUpdate=!0)}dispose(){console.log("[BuildingRenderer] Disposing...");const t=e=>{e&&(this.scene.remove(e),e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(i=>i.dispose()):e.material.dispose()))};t(this.meshes.houseWalls),t(this.meshes.houseRoofs),t(this.meshes.farms),t(this.meshes.goblinHuts),t(this.meshes.towers),t(this.meshes.towerRims),t(this.meshes.barracksWalls),t(this.meshes.barracksRoofs),t(this.meshes.caves),Object.values(this.assets).forEach(e=>{e&&e.dispose&&e.dispose()}),this.meshes={}}}class fg{constructor(){this.fps=0,this.frameCount=0,this.lastFpsUpdate=performance.now(),this.frameTimes=[],this.maxFrameTimeSamples=60,this.memoryUsage=null,this.metrics={entities:{units:0,goblins:0,buildings:0,total:0},updateTime:0,renderTime:0,lastUpdateDuration:0,lastRenderDuration:0},this.stats={avgFps:0,minFps:1/0,maxFps:0,avgUpdateTime:0,avgRenderTime:0},this.history={fps:[],updateTime:[],renderTime:[],entityCount:[],maxHistoryLength:300},this.overlay=null,this.enabled=!1,this.thresholds={lowFps:30,highUpdateTime:16.67,highRenderTime:16.67}}enable(){this.enabled||(this.enabled=!0,this.createOverlay(),console.log("[PerformanceMonitor] Enabled"))}disable(){this.enabled&&(this.enabled=!1,this.overlay&&(this.overlay.remove(),this.overlay=null),console.log("[PerformanceMonitor] Disabled"))}toggle(){this.enabled?this.disable():this.enable()}createOverlay(){typeof document>"u"||(this.overlay=document.createElement("div"),this.overlay.id="performance-monitor",this.overlay.style.cssText=`
            position: fixed;
            top: 200px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 10px;
            border-radius: 5px;
            z-index: 10000;
            min-width: 250px;
            pointer-events: none;
            user-select: none;
        `,document.body.appendChild(this.overlay))}startUpdate(){this.updateStartTime=performance.now()}endUpdate(){if(this.updateStartTime){const t=performance.now()-this.updateStartTime;this.metrics.lastUpdateDuration=t,this.metrics.updateTime=t}}startRender(){this.renderStartTime=performance.now()}endRender(){if(this.renderStartTime){const t=performance.now()-this.renderStartTime;this.metrics.lastRenderDuration=t,this.metrics.renderTime=t}}measureFps(){this.frameCount++;const t=performance.now(),e=t-this.lastFpsUpdate;e>=1e3&&(this.fps=Math.round(this.frameCount*1e3/e),this.frameCount=0,this.lastFpsUpdate=t,this.stats.minFps=Math.min(this.stats.minFps,this.fps),this.stats.maxFps=Math.max(this.stats.maxFps,this.fps))}updateEntityCount(t,e,i){this.metrics.entities.units=t||0,this.metrics.entities.goblins=e||0,this.metrics.entities.buildings=i||0,this.metrics.entities.total=this.metrics.entities.units+this.metrics.entities.goblins+this.metrics.entities.buildings}updateMemoryUsage(){performance.memory&&(this.memoryUsage={used:Math.round(performance.memory.usedJSHeapSize/1048576),total:Math.round(performance.memory.totalJSHeapSize/1048576),limit:Math.round(performance.memory.jsHeapSizeLimit/1048576)})}addToHistory(){const t=(e,i)=>{e.push(i),e.length>this.history.maxHistoryLength&&e.shift()};t(this.history.fps,this.fps),t(this.history.updateTime,this.metrics.updateTime),t(this.history.renderTime,this.metrics.renderTime),t(this.history.entityCount,this.metrics.entities.total)}update(t){if(this.enabled){if(this.measureFps(),this.updateMemoryUsage(),t){const e=t.units?t.units.length:0,i=t.goblinManager&&t.goblinManager.goblins?t.goblinManager.goblins.length:0,n=t.terrain&&t.terrain.buildings?t.terrain.buildings.length:0;this.updateEntityCount(e,i,n)}this.addToHistory(),this.updateOverlay()}}updateOverlay(){if(!this.overlay)return;const{entities:t,updateTime:e,renderTime:i}=this.metrics,n=e+i,s=this.fps<this.thresholds.lowFps,r=e>this.thresholds.highUpdateTime,o=i>this.thresholds.highRenderTime,l=s?"#ff4444":"#00ff00",h=r?"#ff4444":"#00ff00",c=o?"#ff4444":"#00ff00";let d=`
            <div style="margin-bottom: 8px; border-bottom: 1px solid #333; padding-bottom: 5px;">
                <strong>⚡ パフォーマンス測定</strong>
            </div>
            <div style="color: ${l}">FPS: ${this.fps}</div>
            <div style="font-size: 10px; color: #888;">Min: ${this.stats.minFps} | Max: ${this.stats.maxFps}</div>
            <div style="margin-top: 8px;">
                <div style="color: ${h}">更新: ${e.toFixed(2)}ms</div>
                <div style="color: ${c}">描画: ${i.toFixed(2)}ms</div>
                <div>合計: ${n.toFixed(2)}ms</div>
            </div>
            <div style="margin-top: 8px; border-top: 1px solid #333; padding-top: 5px;">
                <div>エンティティ: ${t.total}</div>
                <div style="font-size: 10px; color: #888; margin-left: 10px;">
                    • ユニット: ${t.units}<br>
                    • ゴブリン: ${t.goblins}<br>
                    • 建物: ${t.buildings}
                </div>
            </div>
        `;if(this.memoryUsage){const u=(this.memoryUsage.used/this.memoryUsage.limit*100).toFixed(1),f=u>80?"#ff4444":"#00ff00";d+=`
                <div style="margin-top: 8px; border-top: 1px solid #333; padding-top: 5px;">
                    <div style="color: ${f}">メモリ: ${this.memoryUsage.used}MB / ${this.memoryUsage.limit}MB</div>
                    <div style="font-size: 10px; color: #888;">${u}% 使用中</div>
                </div>
            `}this.overlay.innerHTML=d}getStats(){return{fps:{current:this.fps,min:this.stats.minFps,max:this.stats.maxFps,avg:this.history.fps.length>0?this.history.fps.reduce((t,e)=>t+e,0)/this.history.fps.length:0},timing:{update:this.metrics.updateTime,render:this.metrics.renderTime,total:this.metrics.updateTime+this.metrics.renderTime},entities:{...this.metrics.entities},memory:this.memoryUsage?{...this.memoryUsage}:null,history:{fps:[...this.history.fps],updateTime:[...this.history.updateTime],renderTime:[...this.history.renderTime],entityCount:[...this.history.entityCount]}}}reset(){this.stats.minFps=1/0,this.stats.maxFps=0,this.history.fps=[],this.history.updateTime=[],this.history.renderTime=[],this.history.entityCount=[],console.log("[PerformanceMonitor] Stats reset")}printReport(){const t=this.getStats();console.log("=== パフォーマンスレポート ==="),console.log(`FPS: 現在=${t.fps.current} 最小=${t.fps.min} 最大=${t.fps.max} 平均=${t.fps.avg.toFixed(1)}`),console.log(`処理時間: 更新=${t.timing.update.toFixed(2)}ms 描画=${t.timing.render.toFixed(2)}ms 合計=${t.timing.total.toFixed(2)}ms`),console.log(`エンティティ: 合計=${t.entities.total} (ユニット=${t.entities.units}, ゴブリン=${t.entities.goblins}, 建物=${t.entities.buildings})`),t.memory&&console.log(`メモリ: ${t.memory.used}MB / ${t.memory.limit}MB (${(t.memory.used/t.memory.limit*100).toFixed(1)}%)`),console.log("===========================")}}class Sl{constructor(){this.raids=[]}reportRaid(t,e,i){const n=this.raids.find(s=>{const r=s.x-t,o=s.z-e;return r*r+o*o<100});if(n){n.time=i;return}this.raids.push({x:t,z:e,time:i,threat:10}),this.raids.length>20&&this.raids.shift()}reportVictory(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>100})}reportClear(t,e){this.raids=this.raids.filter(i=>{const n=i.x-t,s=i.z-e;return n*n+s*s>25})}getPriorities(t){return this.raids.filter(e=>t-e.time<300)}}class pg{constructor(t,e,i=!1){if(this.saveManager=new ig,this.soundManager=new ag,this.mana=100,this.gameActive=!1,this.battleMemory=new Sl,this.squads=new Map,window.game=this,t)this.scene=t,this.camera={position:{set:()=>{},x:0,y:0,z:0},lookAt:()=>{},updateProjectionMatrix:()=>{},zoom:1},this.renderer={domElement:{addEventListener:()=>{}},setSize:()=>{},render:()=>{},setClearColor:()=>{},dispose:()=>{}},this.clippingPlanes=[],this.scene.add=()=>{};else{this.scene=new wc,console.log("Scene created:",!!this.scene,"Pos:",typeof this.scene.position);const s=new ut(8900331);this.scene.background=s;const r=window.innerWidth/window.innerHeight,o=50;this.camera=new to(-o*r,o*r,o,-o,1,1e3),console.log("Camera created:",!!this.camera,"Pos:",typeof this.camera.position),this.camera.position.set(20,20,20),this.camera.lookAt(this.scene.position),console.log("Camera setup done"),this.renderer=new Dm({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.localClippingEnabled=!0,document.body.appendChild(this.renderer.domElement),this.controls=new Gm(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.screenSpacePanning=!1,this.controls.minZoom=.5,this.controls.maxZoom=8,this.controls.maxPolarAngle=Math.PI/2,this.viewRadius=Ee.render.viewRadius;const l=this.viewRadius;this.clippingPlanes=[new Je(new U(1,0,0),l),new Je(new U(-1,0,0),l),new Je(new U(0,0,1),l),new Je(new U(0,0,-1),l)],this.renderer.clippingPlanes=[],this.renderer.localClippingEnabled=!0,this.setupLights()}if(this.requestQueue=[],this.requestIdCounter=0,this.projectiles=[],e)this.terrain=e;else if(i)this.terrain={logicalWidth:160,logicalDepth:160,grid:[],buildings:[],entityGrid:[],initEntityGrid:function(){this.entityGrid=Array(160).fill(0).map(()=>Array(160).fill(0).map(()=>[]))},getTileHeight:()=>0,isWalkable:()=>!0,isReachable:()=>!0,update:()=>{},registerEntity:()=>{},unregisterEntity:()=>{},removeBuilding:()=>{},updateMeshPosition:()=>{},updateLights:()=>{},getBuildingAt:()=>null,getRegion:()=>1,isValidGrid:()=>!0,findPath:()=>[],findPathAsync:()=>Promise.resolve([]),checkYield:()=>Promise.resolve(),checkFlatArea:()=>!0,gridToWorld:s=>s,worldToGrid:s=>s,setSeason:()=>{},addBuilding:function(s,r,o){const l={userData:{type:s,gridX:r,gridZ:o},gridX:r,gridZ:o};return this.buildings.push(l),this.grid&&this.grid[r]&&this.grid[r][o]&&(this.grid[r][o].hasBuilding=!0),l},getRandomPointInRegion:()=>({x:10,z:10}),serialize:function(){return{h:[],n:[],b:this.buildings||[],logicalWidth:160,logicalDepth:160,version:2}},deserialize:function(s){s&&s.b&&(this.buildings=s.b)},grid:Array(160).fill(0).map(()=>Array(160).fill(0).map(()=>({height:1,regionId:1})))},this.terrain.initEntityGrid();else try{this.terrain=new zm(this.scene,this.clippingPlanes),console.log("Terrain created:",!!this.terrain)}catch(s){console.log("Terrain creation failed:",s)}this.units=[],this.resources={grain:0,fish:0,meat:0},i?(this.goblinManager={update:()=>{},reset:()=>{},scanForCaves:()=>{},serialize:()=>({}),deserialize:()=>{},notifyClanActivity:()=>{},clans:{},goblins:[]},this.units=[]):(this.cloudManager=new ng(this.scene,this.terrain.width,this.terrain.depth),this.birdManager=new Ce(this.scene,this.terrain.width,this.terrain.depth,this.clippingPlanes),this.sheepManager=new rg(this.scene,this.terrain,this.clippingPlanes),this.goblinManager=new hg(this.scene,this.terrain,this,this.clippingPlanes),this.fishManager=new cg(this.scene,this.terrain,this.clippingPlanes),this.minimap=new dg(this),this.compass=new ug(this),this.unitRenderer=new yl(this.scene,this.terrain,this.clippingPlanes,12e3),this.unitRenderer.init(),this.buildingRenderer=new bl(this.scene,this.terrain,this.clippingPlanes,5e3),this.buildingRenderer.init(),this.performanceMonitor=new fg,typeof window<"u"&&window.location&&window.location.search&&window.location.search.includes("performance=true")&&this.performanceMonitor.enable(),this.inputManager=new Bm(this.scene,this.camera,this.terrain,this.spawnUnit.bind(this),this.units,this.unitRenderer,this)),this.initMarkerMaterial(),this.statsDisplay=document.getElementById("stats-container"),window.addEventListener("resize",this.onWindowResize.bind(this)),this.lastTime=performance.now(),this.gameTime=8,this.gameTotalTime=0,this.raidPoints=[],this.timeScale=1,this.resources={grain:10,fish:10,meat:10};const n=()=>{this.soundManager.initialized||(this.soundManager.init(this.camera),window.removeEventListener("click",n),window.removeEventListener("touchstart",n),window.removeEventListener("touchend",n),window.removeEventListener("keydown",n))};window.addEventListener("click",n),window.addEventListener("touchstart",n),window.addEventListener("touchend",n),window.addEventListener("keydown",n),window.toggleDebugSpeed=()=>{const s=document.getElementById("debug-speed-btn");this.timeScale===1?(this.timeScale=10,console.log("Debug Speed: 10x"),s&&s.classList.add("active")):(this.timeScale=1,console.log("Debug Speed: 1x"),s&&s.classList.remove("active"))},window.addEventListener("keydown",s=>{if(s.key==="f"||s.key==="F")this.performanceMonitor.toggle(),console.log(`[DEBUG] Performance Monitor: ${this.performanceMonitor.enabled?"Enabled":"Disabled"}`);else if(s.key==="s"||s.key==="S"){const r=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex=((this.currentSeasonIndex||0)+1)%4;const o=r[this.currentSeasonIndex];console.log(`[DEBUG] Force Cycle Season: ${o}`),this.season=o,this.daysPassed=(this.daysPassed||0)+1,this.terrain&&this.terrain.setSeason(o);const l=document.getElementById("season-val");l&&(l.textContent=o)}}),this.timeScale=1,this.animate()}setupLights(){this.ambientLight=new Oc(4210752),this.scene.add(this.ambientLight),this.directionalLight=new Bc(16777215,1),this.directionalLight.position.set(10,20,10),this.scene.add(this.directionalLight)}spawnUnit(t,e,i=!1,n=null,s=null){let r="citizen",o=!1,l=null;if(i===!0)o=!0,r="worker";else if(typeof i=="string")r=i;else if(n){if(l=n,n.type==="barracks")r="knight";else if(n.type==="tower")r="wizard";else{const c=Math.random();c<.2?r="hunter":c<.4?r="fisher":r="worker"}(r==="knight"||r==="wizard")&&!n.userData.memory&&(n.userData.memory=new Sl),console.log(`Spawned ${r} linked to ${n.type} at ${n.userData.gridX},${n.userData.gridZ} SquadID:${s}`)}else r="worker";const h=new at(this.scene,this.terrain,t,e,r,o,s);return h.game=this,h.homeBase=l,this.units.push(h),h.role==="worker"&&this.processAssignments(),h}handleBuildingSpawn(t,e,i,n,s=null){return this.spawnUnit(t,e,null,n,s),!0}recordRaidPoint(t,e){this.raidPoints.some(n=>Math.abs(n.x-t)<10&&Math.abs(n.z-e)<10)||this.raidPoints.push({x:t,z:e,time:this.gameTime})}canAction(){return this.mana>=0}consumeMana(t){this.mana-=t}onWindowResize(){const t=window.innerWidth/window.innerHeight,e=20;this.camera.left=-e*t,this.camera.right=e*t,this.camera.top=e,this.camera.bottom=-e,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}updateEnvironment(t){this.gameTime+=t*(this.dayNightSpeed||.05),this.gameTime>=24&&(this.gameTime=0);let e=!1;return this.gameTime>=18||this.gameTime<6?(e=!0,this.scene.background&&this.scene.background.setHex&&this.scene.background.setHex(51),this.directionalLight&&(this.directionalLight.intensity=.2)):(this.scene.background&&this.scene.background.setHex&&this.scene.background.setHex(8900331),this.directionalLight&&(this.directionalLight.intensity=1)),this.isNight=e,e}updateSeasons(t){const i=["Spring","Summer","Autumn","Winter"];this.currentSeasonIndex===void 0&&(this.currentSeasonIndex=0);const n=this.gameTime/24;if(this.prevTimeOfDay===void 0&&(this.prevTimeOfDay=n),n<this.prevTimeOfDay&&(this.daysPassed=(this.daysPassed||0)+1,console.log(`New Day! Day ${this.daysPassed}. Season: ${i[this.currentSeasonIndex]}`),this.daysPassed%3===0)){this.currentSeasonIndex=(this.currentSeasonIndex+1)%4;const r=i[this.currentSeasonIndex];console.log(`Season Changed to: ${r}`),this.terrain&&this.terrain.setSeason(r)}this.prevTimeOfDay=n;const s=i[this.currentSeasonIndex];this.season!==s&&(console.log(`[DEBUG] Game.updateSeasons: Syncing season mismatch. Game:${this.season} -> ${s}`),this.season=s,this.terrain&&this.terrain.setSeason(this.season))}initMarkerMaterial(){const t=`
            #include <clipping_planes_pars_vertex>
            varying vec2 vUv;
            varying vec3 vViewPosition;
            void main() {
                vUv = uv;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
                vViewPosition = -mvPosition.xyz;
                #include <clipping_planes_vertex>
            }
        `,e=`
            #include <clipping_planes_pars_fragment>
            uniform float uTime;
            uniform vec3 uColor;
            varying vec2 vUv;

            // Simple Pseudo-Random Noise
            float random (vec2 st) {
                return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            void main() {
                #include <clipping_planes_fragment>
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
        `;this.markerMaterial=new bi({uniforms:{uTime:{value:0},uColor:{value:new ut(16776960)}},vertexShader:t,fragmentShader:e,transparent:!0,blending:Xr,depthWrite:!1,side:$e,clipping:!0}),this.markerMaterial.clippingPlanes=this.clippingPlanes}addRequest(t,e,i,n=!0,s=null,r=null,o=null){const l=`req_${this.requestIdCounter++}`,h={id:l,type:t,x:e,z:i,status:"pending",assignedTo:null,mesh:null,createdAt:this.simTotalTimeSec||0,isManual:!!n,building:o&&typeof o=="object"&&o.id?o:null,excludedUntil:0},c=new ii(.5,.5,5,16,1,!0);let d;this.markerMaterial&&this.markerMaterial.clone?(d=this.markerMaterial.clone(),d.uniforms&&d.uniforms.uColor&&d.uniforms.uColor.value.setHex(16776960),d.clippingPlanes=this.clippingPlanes):(console.warn("[Game] Warning: markerMaterial missing or invalid. Using fallback."),d=new cn({color:16776960,transparent:!0,opacity:.8}));const u=new Qt(c,d);u.renderOrder=2e3;const f=s!==null?s:e,m=r!==null?r:i;let x=this.terrain.getTileHeight(e,i);return(x===void 0||isNaN(x))&&(x=10),u.position.set(f,x+2,m),this.scene.add(u),h.mesh=u,this.requestQueue.push(h),console.log(`[Game] Request Added: ${t} at (${e},${i}) ID:${l}`),this.assignRequestSync(h),h}findBestRequest(t,e=!1){if(!t)return null;let i=null,n=1/0;const s=this.terrain.logicalWidth||160,r=this.terrain.logicalDepth||160,o=this.simTotalTimeSec,l=t.getVisualX?t.getVisualX(o):t.gridX,h=t.getVisualZ?t.getVisualZ(o):t.gridZ;for(const c of this.requestQueue){if(c.status==="completed"||t.role!=="worker"||t.role!=="worker"||c.excludedUntil&&c.excludedUntil>this.simTotalTimeSec||c.status!=="pending"&&(!e||c.status!=="assigned"||String(c.assignedTo)===String(t.id)||c.isManual))continue;let d=Math.abs(c.x-l),u=Math.abs(c.z-h);d>s/2&&(d=s-d),u>r/2&&(u=r-u);const f=d*d+u*u;if(t.ignoredTargets&&t.ignoredTargets.has(c.id)){const m=t.ignoredTargets.get(c.id),x=this.simTotalTimeSec;if(x<m){console.error(`[Game] Skipping ignored request ${c.id} for Unit ${t.id}. Exp: ${m} Now: ${x}`);continue}else console.error(`[Game] Ignored request ${c.id} EXPIRED for Unit ${t.id}. Exp: ${m} Now: ${x} - Re-allowing.`),t.ignoredTargets.delete(c.id)}if(c.status==="assigned"){if(c.isManual)continue;const m=this.units.find(x=>String(x.id)===String(c.assignedTo));if(m){let x=Math.abs(m.gridX-c.x),g=Math.abs(m.gridZ-c.z);x>s/2&&(x=s-x),g>r/2&&(g=r-g);const p=x*x+g*g;if(!(f<p*.7))continue}}if(f<n||c.isManual&&!i?.isManual){if(t.isReachable&&!t.isReachable(c.x,c.z))continue;if(c.isManual)i&&i.isManual?f<n&&(n=f,i=c):(n=f,i=c);else{if(i&&i.isManual)continue;n=f,i=c}}}return i}processAssignments(t=100){if(!this.requestQueue)return;let e=0;const i=this.simTotalTimeSec;for(const n of this.requestQueue)if(n.status==="pending"){if(n.excludedUntil&&n.excludedUntil>i||n.lastAttempt&&i-n.lastAttempt<.2)continue;if(e>=t)break;this.assignRequestSync(n),n.lastAttempt=i,e++}}assignRequestSync(t){if(!(!t||t.status!=="pending"))try{if(!this.units||!t||t.status!=="pending")return;let e=null,i=1/0;const n=this.terrain.logicalWidth||160,s=this.terrain.logicalDepth||160;let r=0,o=0,l=0,h=0;for(const c of this.units){if(c.isDead)continue;if(c.role!=="worker"){l++;continue}r++;let d=0;if(c.action==="Working"||c.action==="Building"||c.action==="Harvesting"){o++;continue}if(c.targetRequest&&c.targetRequest.isManual||c.targetRequest&&!t.isManual)continue;c.state&&(c.state.constructor.name==="CombatState"||c.state.constructor.name==="SleepState")&&(d+=50);const m=c.getDistance(t.x,t.z)+d;m<i&&(i=m,e=c)}e&&this.claimRequest(e,t)}catch(e){console.error("[Game] assignRequestSync error:",e)}}forceAssignRequest(t){this.assignRequestSync(t)}detectZombieRequests(){if(!(!this.units||!this.requestQueue)){for(const t of this.requestQueue)if(t.status==="assigned"&&t.assignedTo!==null){const e=this.units.find(i=>String(i.id)===String(t.assignedTo));if(!e||e.isDead){console.log(`[Game] Detected ZOMBIE Request req_${t.id} (Assigned to Dead/Missing ${t.assignedTo}). Resetting.`),t.status="pending",t.assignedTo=null,t.mesh&&(t.mesh.material=this.markerMaterial);continue}(!e.targetRequest||String(e.targetRequest.id)!==String(t.id))&&(console.log(`[Game] Detected ZOMBIE Request req_${t.id} (Assigned to ${e.id}, but unit has ${e.targetRequest?e.targetRequest.id:"null"}). Resetting.`),t.status="pending",t.assignedTo=null,t.mesh&&(t.mesh.material=this.markerMaterial))}}}claimRequest(t,e){if(!t||!e)return!1;if(e.status==="assigned"&&String(e.assignedTo)===String(t.id))return!0;if(e.excludedUntil&&e.excludedUntil>this.simTotalTimeSec)return e.status==="assigned"&&String(e.assignedTo)===String(t.id);if(e.status==="assigned"&&e.assignedTo!==null){const i=this.units.find(n=>String(n.id)===String(e.assignedTo));if(i&&(i.targetRequest=null,i.isMoving=!1,i.changeState)){const n=i.getDefaultState?i.getDefaultState():"Wander";i.changeState(n)}}return t.targetRequest&&t.targetRequest.id!==e.id&&this.releaseRequest(t,t.targetRequest),e.status="assigned",e.assignedTo=t.id,e.assignedAt=this.simTotalTimeSec,t.targetRequest=e,t.targetGoblin=null,t.targetBuilding=null,t.isSleeping=!1,t.action="Approaching Job",t.isMoving=!1,t.lastPathTime=0,t.changeState&&t.changeState(new ni(t)),!0}deferRequest(t,e){t&&(t.status="pending",t.assignedTo=null,t.excludedUntil=(this.simTotalTimeSec||0)+e,console.log(`[Game] Request ${t.id} Deferred (Excluded) for ${e}s until ${t.excludedUntil.toFixed(1)}`))}releaseRequest(t,e){e&&String(e.assignedTo)===String(t.id)&&(e.assignedTo=null,e.status==="assigned"&&(e.status="pending",this.forceAssignRequest(e)))}removeRequest(t){if(!t)return;const e=this.requestQueue.findIndex(i=>i===t||i.id===t.id);if(e>-1){const i=this.requestQueue[e];if(this.requestQueue.splice(e,1),i.mesh&&this.scene.remove(i.mesh),i.assignedTo!==null&&i.assignedTo!==void 0){const n=this.units.find(s=>s.id===i.assignedTo);n&&n.targetRequest&&n.targetRequest.id===i.id&&(n.targetRequest=null,n.changeState&&n.changeState(n.getDefaultState?n.getDefaultState():"Wander"))}console.log(`[Game] Request ${i.id} removed and assignments cleared.`)}}tryCancelRequest(t,e){if(!this.requestQueue)return!1;const i=3,n=this.requestQueue.findIndex(s=>{let r=Math.abs(s.x-t),o=Math.abs(s.z-e);return this.terrain&&(r>this.terrain.logicalWidth/2&&(r=this.terrain.logicalWidth-r),o>this.terrain.logicalDepth/2&&(o=this.terrain.logicalDepth-o)),r*r+o*o<i*i});if(n!==-1){const s=this.requestQueue[n];if(console.log(`[Game] Cancelling Request ${s.id} at ${s.x},${s.z}`),s.assignedTo!==null&&s.assignedTo!==void 0){const r=this.units.find(o=>String(o.id)===String(s.assignedTo));if(r){if(r.targetRequest=null,r.resetToDefaultState)r.resetToDefaultState();else if(r.changeState){const o=r.getDefaultState?r.getDefaultState():new xi(r);r.changeState(o)}}}return s.mesh&&(s.mesh.parent?s.mesh.parent.remove(s.mesh):this.scene&&this.scene.remove(s.mesh),s.mesh.geometry&&s.mesh.geometry.dispose(),s.mesh.material&&(Array.isArray(s.mesh.material)?s.mesh.material:[s.mesh.material]).forEach(o=>{o&&o.dispose&&o.dispose()})),this.requestQueue.splice(n,1),this.consumeMana&&this.consumeMana(-10),!0}return!1}updateRequestMarkers(){if(!this.scene||!this.camera)return;const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80,i=this.camera.position.x,n=this.camera.position.z;for(const s of this.requestQueue)if(s.mesh){const r=s.x-t/2,o=s.z-e/2,l=r+Math.round((i-r)/t)*t,h=o+Math.round((n-o)/e)*e;let c=this.terrain.getTileHeight(s.x,s.z);(c===void 0||isNaN(c))&&(c=10),s.mesh.position.set(l,c+2.5,h)}else this.frameCount%300===0&&console.warn(`[Game] Request ${s.id} has NO MESH! Status: ${s.status}`)}checkExpiredRequests(t){for(let i=this.requestQueue.length-1;i>=0;i--){const n=this.requestQueue[i];if(n.status==="assigned"){const s=n.assignedTo;if(s!==null){const r=this.units.find(l=>String(l.id)===String(s));let o=!1;if(!r)o=!0;else if(r.isDead)o=!0;else if(!r.targetRequest||String(r.targetRequest.id)!==String(n.id))o=!0;else if(r.targetGoblin||r.targetBuilding&&r.targetBuilding.userData&&r.targetBuilding.userData.hp>0){const l=n.assignedAt||n.createdAt;t-l>60&&(o=!0)}else if(r.action==="Going to Work"||r.action==="Approaching Job"){const l=n.assignedAt||n.createdAt;t-l>120&&(o=!0)}if(o){console.warn(`[Game] Detected ZOMBIE Request ${n.id} (Assigned to ${s}). Resetting.`),n.status="pending",n.assignedTo=null,this.forceAssignRequest(n);continue}}}if(n.status==="pending"&&(n.lastAttempt||(n.lastAttempt=n.createdAt),t-n.lastAttempt>.2)){const s=t-n.createdAt;s>60&&s%10<1&&console.log(`[Game] Request ${n.id} pending for ${(s/1e3).toFixed(1)}s.`),this.forceAssignRequest(n),n.lastAttempt=t}if(n.status==="completed"&&(n.completedAt||(n.completedAt=t),t-n.completedAt>.2)){n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&(Array.isArray(n.mesh.material)?n.mesh.material:[n.mesh.material]).forEach(r=>{r&&typeof r.dispose=="function"&&r.dispose()}),n.mesh=null),this.requestQueue.splice(i,1);continue}n.status==="pending"&&t-n.createdAt>300&&(console.log(`[Game] Request Timed Out: ${n.type} ID:${n.id}`),n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose(),n.mesh.material&&(Array.isArray(n.mesh.material)?n.mesh.material:[n.mesh.material]).forEach(r=>{r&&typeof r.dispose=="function"&&r.dispose()}),n.mesh=null),this.requestQueue.splice(i,1))}this.processAssignments(50)}clearProjectiles(){if(this.projectiles){console.log(`Clearing ${this.projectiles.length} projectiles...`);for(const t of this.projectiles)t.mesh&&(this.scene.remove(t.mesh),t.mesh.geometry&&t.mesh.geometry.dispose(),t.mesh.material&&t.mesh.material!==this.markerMaterial&&(Array.isArray(t.mesh.material)?t.mesh.material:[t.mesh.material]).forEach(i=>{i&&typeof i.dispose=="function"&&i.dispose()}));this.projectiles=[]}}spawnProjectile(t,e,i=16729088){this.projectileGeo||(this.projectileGeo=new Hn(.3,16,16));const n=this.markerMaterial.clone();n.uniforms.uColor.value.setHex(i);const s=new Qt(this.projectileGeo,n);s.position.copy(t);const r=this.terrain&&this.terrain.logicalWidth?this.terrain.logicalWidth:80,o=this.terrain&&this.terrain.logicalDepth?this.terrain.logicalDepth:80,l=e.x-t.x,h=e.z-t.z,c=e.clone();Math.abs(l)>r/2&&(l>0?c.x-=r:c.x+=r),Math.abs(h)>o/2&&(h>0?c.z-=o:c.z+=o),this.scene.add(s),this.projectiles.push({mesh:s,target:c,speed:15,uTime:0})}updateProjectiles(t){for(let e=this.projectiles.length-1;e>=0;e--){const i=this.projectiles[e];i.uTime+=t,i.mesh.material.uniforms&&(i.mesh.material.uniforms.uTime.value=i.uTime);const n=new U().subVectors(i.target,i.mesh.position),s=n.length();if(s<.5)this.scene.remove(i.mesh),i.mesh.material&&(Array.isArray(i.mesh.material)?i.mesh.material:[i.mesh.material]).forEach(o=>{o&&typeof o.dispose=="function"&&o.dispose()}),this.projectiles.splice(e,1);else{n.normalize();const r=i.speed*t;r>=s?i.mesh.position.copy(i.target):i.mesh.position.add(n.multiplyScalar(r))}}}completeRequest(t,e){if(!e)return;(t.id===0||Math.random()<.1)&&console.log(`[Game] Unit ${t.id} completing Request ${e.type} at ${e.x},${e.z}`);let i=!0;try{const n=Math.round(e.x),s=Math.round(e.z);e.type==="raise"?this.terrain.raise(n,s):e.type==="lower"?this.terrain.lower(n,s):e.type==="build_tower"?this.terrain.addBuilding("tower",n,s):e.type==="build_barracks"&&this.terrain.addBuilding("barracks",n,s)}catch(n){console.error(`[Game] Request Execution Failed for ${e.type} at ${e.x},${e.z}:`,n),i=!1}i?(e.status="completed",e.completedAt=this.simTotalTimeSec,e.mesh&&e.mesh.material&&e.mesh.material.uniforms&&e.mesh.material.uniforms.uColor.value.setHex(65280)):this.removeRequest(e)}updateCameraControls(){this.controls&&this.controls.update();let t,e;this.controls&&this.controls.target?(t=this.controls.target.x,e=this.controls.target.z):(t=this.camera.position.x,e=this.camera.position.z);const i=this.viewRadius||120;this.clippingPlanes&&(this.clippingPlanes[0].constant=-(t-i),this.clippingPlanes[1].constant=t+i,this.clippingPlanes[2].constant=-(e-i),this.clippingPlanes[3].constant=e+i)}updateStats(){if(!this.statsDisplay)return;const t=this.terrain.totalHousingPop||0;this.totalPopulation=Math.floor(t)+this.units.length*10;const e=Math.floor(this.gameTime),i=Math.floor(this.gameTime%1*60),n=`${e.toString().padStart(2,"0")}:${i.toString().padStart(2,"0")} `,r=this.gameTime>=18||this.gameTime<6?"🌙":"☀️";document.getElementById("time-val").innerText=`${n} ${r} `;const o=document.getElementById("day-val");o&&(o.innerText=`Day ${this.daysPassed||1} `),document.getElementById("season-val").innerText=this.season||"Spring",document.getElementById("pop-val").innerText=Math.floor(this.totalPopulation||0);const l=this.units.filter(f=>f.role==="knight").length,h=this.units.filter(f=>f.role==="wizard").length;document.getElementById("active-val").innerText=this.units.length;const c=document.getElementById("knight-val");c&&(c.innerText=l);const d=document.getElementById("wizard-val");d&&(d.innerText=h),document.getElementById("house-val").innerText=this.terrain.buildings.filter(f=>f.userData.type==="house").length,document.getElementById("castle-val").innerText=this.terrain.buildings.filter(f=>f.userData.type==="barracks").length,document.getElementById("grain-val").innerText=Math.floor(this.resources.grain),document.getElementById("fish-val").innerText=Math.floor(this.resources.fish),document.getElementById("meat-val").innerText=Math.floor(this.resources.meat);const u=document.getElementById("mana-val");u&&(u.innerText=Math.floor(this.mana),u.style.color=this.mana<0?"#ff4444":"white"),this.updateButtonStates()}updateButtonStates(){const t=this.mana||0,i=1e3*((this.terrain?this.terrain.buildings.filter(c=>c.userData.type==="barracks").length:0)+1),n=document.getElementById("btn-barracks");n&&(t<i?(n.disabled=!0,n.style.opacity="0.5",n.style.pointerEvents="none"):(n.disabled=!1,n.style.opacity="1.0",n.style.pointerEvents="auto"));const r=1e3*((this.terrain?this.terrain.buildings.filter(c=>c.userData.type==="tower").length:0)+1),o=document.getElementById("btn-tower");o&&(t<r?(o.disabled=!0,o.style.opacity="0.5",o.style.pointerEvents="none"):(o.disabled=!1,o.style.opacity="1.0",o.style.pointerEvents="auto"));const l=50,h=document.getElementById("btn-spawn");h&&(t<l?(h.disabled=!0,h.style.opacity="0.5",h.style.pointerEvents="none"):(h.disabled=!1,h.style.opacity="1.0",h.style.pointerEvents="auto"))}animate(){if(!this.gameActive&&this.stopped)return;this.animationFrameId=requestAnimationFrame(this.animate.bind(this)),this.frameCounter=(this.frameCounter||0)+1;const t=performance.now();let e=Math.min((t-this.lastTime)/1e3,.1);this.lastTime=t,this.lastTime=t,(!this.lastHeartbeat||t-this.lastHeartbeat>5e3)&&(this.lastHeartbeat=t);let i=!1;if(this.gameActive){e*=this.timeScale||1,this.simTotalTimeSec===void 0&&(this.simTotalTimeSec=(this.gameTotalTime||0)/1e3),this.simTotalTimeSec+=e;const r=this.simTotalTimeSec;this.performanceMonitor&&this.performanceMonitor.startUpdate();try{i=this.updateEnvironment(e),this.updateSeasons(e),this.terrain&&(this.terrain.update(e,this.handleBuildingSpawn.bind(this),i),this.terrain.buildings&&this.terrain.buildings.forEach(o=>{o.update&&(o.type==="cave"||o.type==="goblin_hut")&&o.update(r,e)}))}catch(o){console.error("Env/Season Error:",o)}this.checkExpiredRequests(r),this.updateRequestMarkers(),this.frameCount%60===0&&this.detectZombieRequests(),this.updateBattleHotspots(e),this.updateSquadMobilization(e),this.performanceMonitor&&this.performanceMonitor.endUpdate()}else this.terrain&&this.terrain.update(.01,null,!1);try{this.updateCameraControls()}catch(r){console.error("Cam Error:",r)}try{this.updateStats()}catch(r){console.error("Stats Error:",r)}if(this.gameActive){const o=(this.totalPopulation||0)*.1*e;this.mana+=o;try{this.inputManager.update(e)}catch(l){console.error("Input Error:",l)}}this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert();const n=new cs,s=new Jt;if(s.multiplyMatrices(this.camera.projectionMatrix,this.camera.matrixWorldInverse),n.setFromProjectionMatrix(s),this.minimap)try{this.minimap.update()}catch(r){console.error("Minimap Error:",r)}if(this.compass)try{this.compass.update()}catch(r){console.error("Compass Error:",r)}this.inputManager&&this.inputManager.update();try{this.updateRequestMarkers()}catch(r){console.error("RequestMarkers Error:",r)}this.simTotalTimeSec,this.markerTime===void 0&&(this.markerTime=0),this.markerTime+=e;try{for(const r of this.requestQueue)r.mesh&&(Array.isArray(r.mesh.material)?r.mesh.material:[r.mesh.material]).forEach(l=>{l&&l.uniforms&&l.uniforms.uTime&&(l.uniforms.uTime.value=this.markerTime)})}catch(r){console.error("Shader Uniforms Error:",r)}try{this.updateProjectiles(e)}catch(r){console.error("Projectiles Error:",r)}if(this.frameCount===void 0&&(this.frameCount=0),this.frameCount++,this.gameActive)try{const r=this.camera?this.camera.position.x:0,o=this.camera?this.camera.position.z:0,l=!!this.camera,h=2,c=10,d=60,u=1600,f=6400;for(let m=this.units.length-1;m>=0;m--){const x=this.units[m];x.updateMovement&&x.updateMovement(this.simTotalTimeSec);let g=h;if(l){const p=x.position.x-r,b=x.position.z-o,_=p*p+b*b;_>f?g=d:_>u&&(g=c)}if((this.frameCount+m)%g===0){try{const p=e*g;x.updateLogic(this.simTotalTimeSec,p,i,this.goblinManager.goblins)}catch(p){console.error("Unit Logic Error:",p,x)}x.isDead&&x.isFinished&&this.units.splice(m,1)}}}catch(r){console.error("Unit Loop Error:",r)}try{this.gameActive&&(this.frustum=n,this.cloudManager&&this.cloudManager.update(e,this.camera),this.birdManager&&this.birdManager.update(e,this.simTotalTimeSec,n),this.sheepManager&&this.sheepManager.update(this.simTotalTimeSec,e),this.fishManager&&this.fishManager.update(this.simTotalTimeSec,e,n),this.goblinManager&&this.goblinManager.update(this.simTotalTimeSec,e,!1,this.units,this.timeScale,this.camera))}catch(r){console.error("Manager Update Error:",r)}if(this.controls&&this.controls.enabled&&this.controls.update(),this.isLoading){this.renderer.render(this.scene,this.camera),this.performanceMonitor&&(this.performanceMonitor.endRender(),this.performanceMonitor.update(this));return}try{if(this.terrain.updateMeshPosition(this.camera),this.terrain.updateLights(this.gameTime),this.clippingPlanes&&this.clippingPlanes.length===4){const r=this.camera.position.x,o=this.camera.position.z,l=this.viewRadius||30;this.clippingPlanes[0].constant=-r+l,this.clippingPlanes[1].constant=r+l,this.clippingPlanes[2].constant=-o+l,this.clippingPlanes[3].constant=o+l}}catch(r){console.error("Terrain Visuals Error:",r)}if(this.buildingRenderer&&this.buildingRenderer.updateLighting(i),this.unitRenderer)try{this.unitRenderer.update(this.units,n,this.controls?this.controls.target:this.camera.position)}catch(r){console.error("UnitRenderer Error:",r)}if(this.buildingRenderer)try{this.buildingRenderer.update(this.terrain.buildings,n,this.controls?this.controls.target:this.camera.position)}catch(r){console.error("BuildingRenderer Error:",r)}if(this.goblinManager&&this.goblinManager.renderer)try{this.goblinManager.renderer.update(this.goblinManager.goblins,this.controls?this.controls.target:this.camera.position)}catch(r){console.error("GoblinRenderer Error:",r)}this.performanceMonitor&&this.performanceMonitor.startRender(),this.renderer.render(this.scene,this.camera),this.performanceMonitor&&(this.performanceMonitor.endRender(),this.performanceMonitor.update(this))}saveGame(t){if(!this.saveManager)return!1;try{const e={slotId:t,timestamp:Date.now(),resources:this.resources,gameTime:this.gameTime,gameTotalTime:this.gameTotalTime,currentSeasonIndex:this.currentSeasonIndex,daysPassed:this.daysPassed,terrain:this.terrain.serialize(),units:this.units.map(i=>i.serialize()),requests:this.requestQueue.map(i=>({id:i.id,type:i.type,x:i.x,z:i.z,status:i.status,assignedTo:i.assignedTo,assignedAt:i.assignedAt,createdAt:i.createdAt,isManual:i.isManual})),gameTime:this.gameTime,goblinManager:this.goblinManager?this.goblinManager.serialize():null,camera:{position:{x:this.camera.position.x,y:this.camera.position.y,z:this.camera.position.z},zoom:this.camera.zoom,target:this.controls&&this.controls.target?{x:this.controls.target.x,y:this.controls.target.y,z:this.controls.target.z}:{x:0,y:0,z:0}}};return this.saveManager.save(t,e)}catch(e){return console.error("Save failed:",e),!1}}startNewGame(){if(this.gameActive)return;let t=10,e=10,i=!1,n=0;const s=this.terrain.logicalWidth||80,r=this.terrain.logicalDepth||80;for(;!i&&n<1e3;){const l=Math.floor(Math.random()*s),h=Math.floor(Math.random()*r);this.terrain.getTileHeight(l,h)>1&&(t=l,e=h,i=!0),n++}if(this.spawnUnit(t,e,!0),i){const l=t-s/2,h=e-r/2;this.controls&&(this.controls.target.set(l,0,h),this.camera.position.set(l+20,20,h+20),this.controls.update())}this.gameActive=!0,this.lastTime=performance.now();const o=document.getElementById("ui");o&&(o.style.display="flex"),console.log("[Game] Start New Game!")}regenerateWorld(){console.log("[Game] Regenerating World..."),this.gameActive=!1,this.terrain&&(this.terrain.buildings=[],this.terrain.generateRandomTerrain(),this.terrain.updateMesh(),this.terrain.updateColors(this.season||"Spring",!1)),this.units&&(this.units.forEach(l=>{l.dispose&&l.dispose(),this.scene.remove(l.mesh),l.crossMesh&&this.scene.remove(l.crossMesh)}),this.units=[]),this.goblinManager&&(this.goblinManager.reset(),this.goblinManager.generateCaves&&this.goblinManager.generateCaves()),this.requestQueue&&(this.requestQueue.forEach(l=>{l.mesh&&this.scene.remove(l.mesh)}),this.requestQueue=[]);const t=this.terrain.logicalWidth||80,e=this.terrain.logicalDepth||80,i=Math.floor(Math.random()*t),n=Math.floor(Math.random()*e),s=this.terrain.getTileHeight(i,n),r=i-t/2,o=n-e/2;this.controls&&(this.controls.target.set(r,s,o),this.camera.position.set(r+30,s+30,o+30),this.controls.update()),console.log("[Game] World Regenerated.")}async loadGame(t){if(!this.saveManager)return!1;this.gameActive,this.gameActive=!1;const e=document.getElementById("loading-screen"),i=document.getElementById("loading-bar"),n=document.getElementById("loading-text");e&&(e.style.display="flex",i&&(i.style.width="0%"),n&&(n.innerText="0%")),console.log("Load Started...");try{let s=performance.now();const r=async()=>performance.now()-s>16?(await new Promise(c=>setTimeout(c,0)),s=performance.now(),!0):!1;n&&(n.innerText="Reading Data..."),await new Promise(c=>setTimeout(c,50));const o=this.saveManager.load(t);if(!o)return console.error("Load Game Failed: No data for slot",t),e&&(e.style.display="none"),!1;console.log("Load Game: Data found",o),n&&(n.innerText="Cleaning Up..."),await new Promise(c=>setTimeout(c,16));const l=document.getElementById("ui");if(l&&(l.style.display="flex"),this.goblinManager&&this.goblinManager.reset(),this.clearProjectiles(),this.requestQueue){for(const c of this.requestQueue)c.mesh&&(this.scene.remove(c.mesh),c.mesh.geometry&&c.mesh.geometry.dispose(),c.mesh.material&&(Array.isArray(c.mesh.material)?c.mesh.material:[c.mesh.material]).forEach(u=>{u&&typeof u.dispose=="function"&&u.dispose()})),await r();this.requestQueue=[]}this.buildingRenderer&&this.buildingRenderer.dispose&&this.buildingRenderer.dispose(),this.goblinRenderer&&this.goblinRenderer.dispose&&this.goblinRenderer.dispose(),this.unitRenderer&&this.unitRenderer.dispose&&this.unitRenderer.dispose(),console.log("[Game] Deserializing terrain..."),await this.terrain.deserialize(o.terrain,c=>{const d=Math.floor(c*.5);i&&(i.style.width=d+"%"),n&&(n.innerText=d+"%")}),console.log("[Game] Terrain deserialized."),n&&(n.innerText="Initializing Renderers..."),n&&(n.innerText="Initializing Buildings..."),this.buildingRenderer=new bl(this.scene,this.terrain,this.clippingPlanes),await this.buildingRenderer.init(),await r(),n&&(n.innerText="Initializing Goblins..."),this.goblinManager&&this.goblinManager.renderer&&this.goblinManager.renderer.dispose&&this.goblinManager.renderer.dispose(),this.goblinRenderer=new eh(this.scene,this.terrain,this.clippingPlanes),await this.goblinRenderer.init(),this.goblinManager&&(this.goblinManager.renderer=this.goblinRenderer),await r(),n&&(n.innerText="Initializing Units..."),this.unitRenderer=new yl(this.scene,this.terrain,this.clippingPlanes),await this.unitRenderer.init(),await r(),this.inputManager&&(this.inputManager.unitRenderer=this.unitRenderer),i&&(i.style.width="60%"),n&&(n.innerText="60%"),await r(),console.log("[Game] Loading resources/time..."),this.resources=o.resources||{grain:0,fish:0,meat:0},this.gameTime=o.gameTime||8,this.gameTotalTime=o.gameTotalTime||0,this.simTotalTimeSec=this.gameTotalTime/1e3,console.log("[Game] Updating environment..."),this.updateEnvironment(0),await r(),this.currentSeasonIndex=o.currentSeasonIndex||0,this.daysPassed=o.daysPassed||0;const h=["Spring","Summer","Autumn","Winter"];if(this.season=h[this.currentSeasonIndex],this.terrain&&this.terrain.setSeason(this.season),await r(),this.units&&this.units.forEach(c=>{c.dispose&&c.dispose(),this.scene.remove(c.mesh),c.crossMesh&&this.scene.remove(c.crossMesh)}),this.units.length=0,o.units){console.log(`[Game] Restoring ${o.units.length} units...`);try{const c=o.units.length;for(let d=0;d<c;d++){if(await r()){const m=60+Math.floor(d/c*20);i&&(i.style.width=m+"%"),n&&(n.innerText=m+"%")}const u=o.units[d],f=at.deserialize(u,this.scene,this.terrain);f&&this.units.push(f)}}catch(c){throw console.error("CRITICAL Unit restore failed:",c),c}}if(console.log(`[Game] Successfully restored ${this.units.length} units.`),this.goblinManager)if(o.goblinManager){this.goblinManager.deserialize(o.goblinManager);const c=this.goblinManager.goblins.filter(d=>d.type==="unit"||d.role);c.length>0&&console.error(`[DIAGNOSTIC] Transformation Error Detected! ${c.length} Units found in Goblin Manager!`,c)}else this.goblinManager.scanForCaves();if(o.requests){this.requestQueue.length=0,console.log(`[Game] Restoring ${o.requests.length} requests...`);let c=0;const d=o.requests.length;for(let u=0;u<d;u++){if(await r()){const w=80+Math.floor(u/d*10);i&&(i.style.width=w+"%"),n&&(n.innerText=w+"%")}const f=o.requests[u],m=f.id.split("_"),x=parseInt(m[m.length-1]);!isNaN(x)&&x>c&&(c=x);let g=this.terrain.getTileHeight(f.x,f.z);(g===void 0||isNaN(g))&&(g=10);const p=new ii(.5,.5,5,16,1,!0);let b;if(this.markerMaterial&&this.markerMaterial.clone){if(b=this.markerMaterial.clone(),b.uniforms&&b.uniforms.uColor){const w=f.status==="completed"?65280:16776960;b.uniforms.uColor.value.setHex(w)}b.clippingPlanes=this.clippingPlanes}else console.warn("[Game] Warning: markerMaterial missing on Load. Using fallback."),b=new cn({color:16776960,transparent:!0,opacity:.8});const _=new Qt(p,b);_.renderOrder=2e3,_.position.set(f.x,g+2,f.z),this.scene.add(_);const v={id:f.id,type:f.type,x:f.x,z:f.z,status:f.status,assignedTo:f.assignedTo,assignedAt:f.assignedAt||(f.status==="assigned"?(this.gameTotalTime||0)/1e3:void 0),createdAt:f.createdAt||Date.now(),isManual:f.isManual!==void 0?!!f.isManual:["raise","lower","flatten","wall","door","build_tower","build_barracks","build_farm","build_house","migration"].includes(f.type),mesh:_};this.requestQueue.push(v)}this.requestIdCounter=Math.max(this.requestIdCounter,c+1)}if(this.units){let c=-1;this.units.forEach(d=>{if(d.id>c&&(c=d.id),d.savedHomeBaseX!==void 0){const u=this.terrain.getBuildingAt(d.savedHomeBaseX,d.savedHomeBaseZ);u&&(d.homeBase=u)}if(d.savedTargetRequestId){const u=this.requestQueue.find(f=>String(f.id)===String(d.savedTargetRequestId));if(u){if(u.assignedTo&&String(u.assignedTo)!==String(d.id)){const f=this.units.find(m=>String(m.id)===String(u.assignedTo));if(f){console.warn(`[Game] Conflict: Unit ${d.id} tried to claim Job ${u.id}, but it is already owned by ${f.id}. Yielding to owner.`),d.targetRequest=null,d.savedTargetRequestId=null;return}}d.targetRequest=u,console.log(`[Game] Re-linked Unit ${d.id} to Request ${u.id}`),u.status==="pending"&&(u.status="assigned"),String(u.assignedTo)!==String(d.id)&&(console.log(`[Game] Correcting Request ownership for ${u.id} ( ${u.assignedTo} -> ${d.id} )`),u.assignedTo=d.id),d.action="Going to Work",d.changeState&&typeof ni<"u"&&d.changeState(new ni(d))}else d.targetRequest=null;d.savedTargetRequestId=null}}),at.nextId=c+1,this.requestQueue.forEach(d=>{if(d.status==="assigned"){const u=this.units.find(f=>String(f.id)===String(d.assignedTo));(!u||!u.targetRequest||String(u.targetRequest.id)!==String(d.id))&&(console.log(`[Game] Ghost Assignment Cleaned: Request ${d.id} (assigned to ${d.assignedTo}) reset to pending.`),d.status="pending",d.assignedTo=null)}})}if(o.camera){this.camera.position.set(o.camera.position.x,o.camera.position.y,o.camera.position.z),this.controls&&(this.controls.target.set(o.camera.target.x,o.camera.target.y,o.camera.target.z),this.controls.update());const c=o.camera.zoom!==void 0?o.camera.zoom:1;this.camera.zoom=c,this.camera.updateProjectionMatrix(),console.log(`[Game] Restored Camera Zoom: ${c}`)}return e&&(i&&(i.style.width="100%"),n&&(n.innerText="100%"),await new Promise(c=>setTimeout(c,200)),e.style.display="none"),this.buildingRenderer&&(this.buildingRenderer.forceUpdate=!0),this.isLoading=!1,this.gameActive=!0,this.lastTime=performance.now(),!0}catch(s){return console.error("Critical Load Error:",s),e&&(e.style.display="none"),alert("Load Failed: "+s.message),this.gameActive=!0,!1}}registerSquad(t){this.squads||(this.squads=new Map);const e=Math.floor(Math.random()*1e6);return this.squads.set(e,{id:e,type:t,target:null,lastUpdate:this.simTotalTimeSec||0}),e}getSquad(t){return this.squads?this.squads.get(t):null}reportSquadTarget(t,e,i){if(!this.squads)return;const n=this.squads.get(t);n&&(!n.target||n.target.x!==e||n.target.z!==i?(console.log(`[Squad ${t}] Target Updated: ${e},${i}`),n.target={x:e,z:i,time:this.simTotalTimeSec},n.lastUpdate=this.simTotalTimeSec):n.target&&(n.target.time=this.simTotalTimeSec)),this.reportGlobalBattle(e,i)}updateBattleHotspots(t){if(!this.battleHotspots)return;const e=this.simTotalTimeSec,i=2;this.battleHotspots=this.battleHotspots.filter(n=>{n.intensity-=i*t;const s=e-n.time>60;return n.intensity>0&&!s})}reportGlobalBattle(t,e){this.battleHotspots||(this.battleHotspots=[]);const i=this.simTotalTimeSec,n=15;let s=null;for(const r of this.battleHotspots){const o=r.x-t,l=r.z-e;if(Math.sqrt(o*o+l*l)<n){s=r;break}}if(s)s.x=s.x*(1-.2)+t*.2,s.z=s.z*(1-.2)+e*.2,s.intensity=Math.min(100,(s.intensity||10)+15),s.time=i;else{const r=this.terrain?this.terrain.getRegion(t,e):0;this.battleHotspots.push({x:t,z:e,intensity:40,time:i,regionId:r}),console.log(`[Game] New Battle Hotspot at ${t.toFixed(0)},${e.toFixed(0)} (Region:${r})`)}}updateSquadMobilization(t){if(this.mobilizationTimer=(this.mobilizationTimer||0)+t,this.mobilizationTimer<2||(this.mobilizationTimer=0,!this.battleHotspots||this.battleHotspots.length===0)||!this.squads)return;const e=this.simTotalTimeSec;for(const[i,n]of this.squads)if(!n.target||e-n.target.time>5){let r=null,o=-1/0;const l=this.units.find(c=>c.squadId===i&&!c.isDead);if(!l)continue;const h=this.terrain?this.terrain.getRegion(l.gridX,l.gridZ):0;for(const c of this.battleHotspots){if(c.regionId!==h&&c.regionId>0&&h>0)continue;const d=Math.sqrt(Math.pow(c.x-l.gridX,2)+Math.pow(c.z-l.gridZ,2)),u=c.intensity/(d+5);u>o&&(o=u,r=c)}r&&o>.2&&(console.log(`[Game] Mobilizing Squad ${i} to Hotspot at ${r.x.toFixed(0)},${r.z.toFixed(0)} (Intensity:${r.intensity.toFixed(1)})`),this.reportSquadTarget(i,r.x,r.z))}}getRegion(t,e){if(!this.terrain||!this.terrain.grid)return-1;const i=this.terrain.logicalWidth||160,n=this.terrain.logicalDepth||160;let s=Math.floor(t),r=Math.floor(e);s<0?s=(s%i+i)%i:s>=i&&(s=s%i),r<0?r=(r%n+n)%n:r>=n&&(r=r%n);const o=this.terrain.grid[s]?this.terrain.grid[s][r]:null;return o?o.regionId:-1}stop(){this.gameActive=!1,this.stopped=!0,this.animationFrameId&&(cancelAnimationFrame(this.animationFrameId),this.animationFrameId=null)}dispose(){this.stop(),this.renderer&&(this.renderer.dispose(),this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)),this.inputManager&&this.inputManager.dispose&&this.inputManager.dispose(),this.controls&&this.controls.dispose&&this.controls.dispose(),this.minimap&&this.minimap.dispose&&this.minimap.dispose()}}new pg;
