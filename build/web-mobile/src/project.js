System.register([], function(_export, _context) { return { execute: function () {
System.register("chunks:///Component/BodyBase.js",["../_virtual/_rollupPluginBabelHelpers.js","cc"],(function(o,t){var e,n,s,r,i,c,a,u,l,y,p,d,f;return o({_dec:void 0,_class:void 0}),{setters:[function(o){e=o.inherits,n=o.createClass,s=o.classCallCheck,r=o.possibleConstructorReturn,i=o.getPrototypeOf},function(o){c=o.cclegacy,a=o._decorator,u=o.Quat,l=o.Vec3,y=o.Component}],execute:function(){c._RF.push({},"340d6Posu1EApoUm/4ajW2s","BodyBase",void 0),f=a.ccclass,a.property,o("BodyBase",(p=f("BodyBase"),p(d=function(o){function t(){return s(this,t),r(this,i(t).apply(this,arguments))}return e(t,o),n(t,[{key:"LookRotation",value:function(o){var t=new u;return t=u.rotationTo(t,new l(0,0,1),o)}},{key:"LookAt",value:function(o){this.node.rotation=this.LookRotation(o)}},{key:"myDestory",value:function(){this.node.destroy()}}]),t}(y))||d)),c._RF.pop()}}}));

System.register("chunks:///Core/PubUtils.js",["../_virtual/_rollupPluginBabelHelpers.js","cc"],(function(e,t){var a,n,r,o,u,l,i,c;return{setters:[function(e){a=e.createClass,n=e.classCallCheck,r=e.typeof},function(e){o=e.cclegacy,u=e.Vec3,l=e.instantiate,i=e.tween}],execute:function(){o._RF.push({},"c6a397LMNBI+ai9ZfbdOpCJ","PubUtils",void 0),e("PubUtils",c=function(){function e(){n(this,e)}return a(e,null,[{key:"SetGameLocalData",value:function(e,t,a){this.SetLocalData(e+t,a)}},{key:"SetLocalData",value:function(e,t){"object"==r(t)&&(t=JSON.stringify(t)),localStorage.setItem(e,t)}},{key:"GetLocalData",value:function(e){var t=localStorage.getItem(e);return null==t||""==t||null==typeof t||"NaN"==t?null:t=JSON.parse(t)}},{key:"GetGameLocalData",value:function(e,t){return this.GetLocalData(e+t)}},{key:"ClearLocalData",value:function(e){null!=e&&""!=e&&localStorage.removeItem(e)}},{key:"ClearGameLocalData",value:function(e,t){this.ClearLocalData(e+t)}},{key:"Range",value:function(e,t){return Math.floor(1e5*Math.random())%(t-e)+e}},{key:"randomNum",value:function(e,t,a){var n=0,r=0;switch(t<=e?(r=t,n=e):(r=e,n=t),arguments.length){case 1:return Math.floor(Math.random()*(n+1));case 2:return Math.floor(Math.random()*(n-r+1)+r);case 3:return parseFloat((Math.random()*(n-r)+r).toFixed(a));default:return Math.random()}}},{key:"Lerp",value:function(e,t,a){return e+(t-e)*this.Clamp01(a)}},{key:"Clamp01",value:function(e){return e<0?0:e>1?1:e}},{key:"EaseOutQuart",value:function(e){return e=this.Clamp(e,0,1),-(--e*e*e*e-1)}},{key:"Clamp",value:function(e,t,a){return e<t?e=t:e>a&&(e=a),e}},{key:"MathMoveTowards",value:function(e,t,a){return Math.abs(t-e)<=a?t:e+Math.sign(t-e)*a}},{key:"MoveTowards",value:function(e,t,a){var n=t.x-e.x,r=t.y-e.y,o=t.z-e.z,l=n*n+r*r+o*o;if(0==l||l<=a*a)return t;var i=Math.sqrt(l);return new u(e.x+n/i*a,e.y+r/i*a,e.z+o/i*a)}},{key:"parseJsonToModel",value:function(e,t,a){for(var n=Object.keys(a),r=0;r<n.length;r++){var o=n[r];switch(a[o]){case"int":e[o]=parseInt(t[o]);break;case"float":e[o]=parseFloat(t[o]);break;case"array-int":for(var u=t[o].split(","),l=0;l<u.length;l++)e[o].push(parseInt(u[l]));break;case"array-string":for(var i=t[o].split(","),c=0;c<i.length;c++)e[o].push(i[c]);break;default:e[o]=t[o]}}}},{key:"copyObject",value:function(e,t){var a=Object.keys(e);for(var n in a){var r=a[n];e[r]instanceof Array?t[r]=[].concat(e[r]):t[r]=e[r]}}},{key:"SmoothDamp",value:function(t,a,n,r){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:Number.POSITIVE_INFINITY,u=arguments.length>5?arguments[5]:void 0,l=2/(r=Math.max(1e-4,r)),i=l*u,c=1/(1+i+.48*i*i+.235*i*i*i),s=t-a,f=a,h=o*r,v=(n+l*(s=e.Clamp(s,-h,h)))*u;n=(n-l*v)*c;var y=(a=t-s)+(s+v)*c;return f-t>0==y>f&&(n=((y=f)-f)/u),y}},{key:"SmoothDampToSpeed",value:function(e,t,a,n,r){return this.SmoothDamp(e,t,a,n,Number.POSITIVE_INFINITY,r)}},{key:"getMoble",value:function(){for(var t=new Array("130","131","132","133","135","137","138","170","187","189"),a=t[e.Range(0,t.length)],n=0;n<8;n++)a+=Math.floor(10*Math.random());return a}},{key:"phoneNameToName",value:function(e){return e.slice(0,3)+"****"+e.slice(-2)}},{key:"getNums",value:function(e){for(var t=e.split(","),a=[],n=0;n<t.length;n++)a.push(parseInt(t[n]));return a}},{key:"coinNumToStr",value:function(e){if(e<1e3)return e.toString();if(e<1e4){var t=e/1e3;return(t=this.toFixed(t,2))+"K"}if(e<1e8){var a=e/1e4,n=0;return e<1e5?n=2:e<1e6&&(n=1),this.toFixed(a,n)+"W"}return"9999W"}},{key:"toFixed",value:function(e,t){return Math.floor(e*Math.pow(10,t))/Math.pow(10,t)}},{key:"generateUUID",value:function(){var e=(new Date).getTime();window.performance&&"function"==typeof window.performance.now&&(e+=performance.now());var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var a=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?a:3&a|8).toString(16)}));return console.log(t),t}},{key:"getUUID",value:function(){return(this.UUID++).toString()}},{key:"createGoldAnim",value:function(e,t,a,n,r,o,c,s,f){for(var h=this.getPoint(o,a.x,a.y,c),v=new Array,y=0;y<h.length;y++){var d=l(e),g=new u(h[y].x+this.Range(0,50),h[y].y+this.Range(0,50));v.push({gold:d,randPos:g}),t.addChild(d),d.setWorldPosition(a)}v.sort((function(e,t){return u.distance(e.randPos,n)-u.distance(t.randPos,n)}));for(var x=!1,p=r,m=function(e){var t=v[e].randPos,a=v[e].gold;i(a).to(.5,{worldPosition:t}).delay(.03*e).to(.5,{worldPosition:n}).call((function(){x||(x=!0,i(p).to(.1,{scale:new u(2,2,2)}).to(.1,{scale:new u(1,1,1)}).call((function(){x=!1})).start()),e==v.length-1&&null!=f&&f(s),a.destroy()})).start(),v[e].gold.id=e},k=0;k<v.length;k++)m(k)}},{key:"getPoint",value:function(e,t,a,n){for(var r=[],o=Math.PI/180*Math.round(360/n),u=0;u<n;u++){var l=t+e*Math.sin(o*u),i=a+e*Math.cos(o*u);r.unshift({x:l,y:i})}return r}},{key:"Rad2Deg",get:function(){return 1/this.Deg2Rad}}]),e}()),c.Deg2Rad=2*Math.PI/360,c.UUID=1,o._RF.pop()}}}));

System.register("chunks:///Controller/CameraFollowController.js",["../_virtual/_rollupPluginBabelHelpers.js","cc","../Component/BodyBase.js","../Core/PubUtils.js"],(function(t,e){var o,r,i,n,a,s,l,c,u,d,p,h,f,v,y,_,C,g,m,w,R;return t({_dec:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_temp:void 0}),{setters:[function(t){o=t.applyDecoratedDescriptor,r=t.inherits,i=t.classCallCheck,n=t.possibleConstructorReturn,a=t.getPrototypeOf,s=t.initializerDefineProperty,l=t.assertThisInitialized,c=t.createClass},function(t){u=t.cclegacy,d=t._decorator,p=t.Vec3,h=t.Quat},function(t){f=t.BodyBase},function(t){v=t.PubUtils}],execute:function(){u._RF.push({},"2fa14+CTUhKfKcuy7apWEo0","CameraFollowController",void 0),m=d.ccclass,w=d.property,new p,y=m("CameraFollowController"),R=y((g=o((C=function(t){function e(){var t,o;i(this,e);for(var r=arguments.length,c=new Array(r),u=0;u<r;u++)c[u]=arguments[u];return o=n(this,(t=a(e)).call.apply(t,[this].concat(c))),s(o,"moveSpeed",g,l(o)),o._curRotate=new p(0,0,1),o}return r(e,t),c(e,[{key:"onLoad",value:function(){e.instance=this}},{key:"setTarget",value:function(t){this._target=t}},{key:"setRotate",value:function(t){this._curRotate.set(t.x,t.y,t.z)}},{key:"lateUpdate",value:function(t){if(this._target){this.node.setWorldPosition(v.MoveTowards(this.node.getWorldPosition(),this._target.getWorldPosition(),this.moveSpeed*t));var e=this.LookRotation(this._curRotate),o=new h;h.slerp(o,this.node.getWorldRotation(),e,5*t),this.node.rotation=o}}}]),e}(f)).prototype,"moveSpeed",[w],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return.4}}),_=C))||_,u._RF.pop(),t("default",R)}}}));

System.register("chunks:///Component/BaseCom.js",["../_virtual/_rollupPluginBabelHelpers.js","cc"],(function(e,t){var o,s,n,c,r,i,u,a,l,p,C;return e({_dec:void 0,_class:void 0}),{setters:[function(e){o=e.inherits,s=e.createClass,n=e.classCallCheck,c=e.possibleConstructorReturn,r=e.getPrototypeOf},function(e){i=e.cclegacy,u=e._decorator,a=e.Component}],execute:function(){i._RF.push({},"8d8aczOPINExYIh25QOZn97","BaseCom",void 0),C=u.ccclass,u.property,e("BaseCom",(l=C("BaseCom"),l(p=function(e){function t(){return n(this,t),c(this,r(t).apply(this,arguments))}return o(t,e),s(t,[{key:"init",value:function(e){this.model=e}}]),t}(a))||p)),i._RF.pop()}}}));

System.register("chunks:///Component/RotateCom.js",["../_virtual/_rollupPluginBabelHelpers.js","cc","./BaseCom.js"],(function(t,e){var s,o,i,n,a,r,l,c,u,p,h,d,f;return t({_dec:void 0,_class:void 0}),{setters:[function(t){s=t.inherits,o=t.createClass,i=t.classCallCheck,n=t.possibleConstructorReturn,a=t.getPrototypeOf,r=t.get},function(t){l=t.cclegacy,c=t._decorator,u=t.Vec3},function(t){p=t.BaseCom}],execute:function(){l._RF.push({},"97990ZED7RG3J5LO2WJFfSb","RotateCom",void 0),f=c.ccclass,c.property,t("RotateCom",(h=f("RotateCom"),h(d=function(t){function e(){return i(this,e),n(this,a(e).apply(this,arguments))}return s(e,t),o(e,[{key:"init",value:function(t){r(a(e.prototype),"init",this).call(this,t);var s=t.p.split(",");this.dir=new u(parseFloat(s[0]),parseFloat(s[1]),parseFloat(s[2])),this.speed=parseFloat(s[3])}},{key:"update",value:function(t){this.model&&(this.node.eulerAngles=this.node.eulerAngles.add(this.dir.clone().multiplyScalar(this.speed*t)))}}]),e}(p))||d)),l._RF.pop()}}}));

System.register("chunks:///Controller/TouchController.js",["../_virtual/_rollupPluginBabelHelpers.js","cc"],(function(t,e){var o,n,i,r,c,s,u,h,a,l,p,v,d;return t({_dec:void 0,_class:void 0,_temp:void 0}),{setters:[function(t){o=t.inherits,n=t.classCallCheck,i=t.possibleConstructorReturn,r=t.getPrototypeOf,c=t.createClass},function(t){s=t.cclegacy,u=t._decorator,h=t.Vec3,a=t.Node,l=t.Component}],execute:function(){s._RF.push({},"830cdEGjehA5rsOg+cB1Anf","TouchController",void 0),d=u.ccclass,u.property,t("TouchController",(p=d("TouchController"),p(v=function(t){function e(){var t,o;n(this,e);for(var c=arguments.length,s=new Array(c),u=0;u<c;u++)s[u]=arguments[u];return(o=i(this,(t=r(e)).call.apply(t,[this].concat(s)))).inputVector=new h,o.touchId=-1,o}return o(e,t),c(e,[{key:"onLoad",value:function(){e.instance=this}},{key:"setTarget",value:function(t){this._target=t,this.node.on(a.EventType.TOUCH_START,this.onTouchStart,this),this.node.on(a.EventType.TOUCH_MOVE,this.onTouchMove,this),this.node.on(a.EventType.TOUCH_END,this.onTouchEnd,this)}},{key:"onTouchStart",value:function(t){this.touchId!=t.getID()&&(this.touchId=t.getID())}},{key:"onTouchMove",value:function(t){if(this.touchId==t.getID()){var e=t.getLocation().subtract(t.getStartLocation());this.inputVector.set(e.normalize().x,e.normalize().y)}}},{key:"onTouchEnd",value:function(t){this.touchId==t.getID()&&(this.inputVector=new h,this._target.Move(new h(-this.Horizontal,0,this.Vertical),0))}},{key:"update",value:function(t){!this._target||0==this.Vertical&&0==this.Horizontal||this._target.Move(new h(-this.Horizontal,0,this.Vertical),t)}},{key:"Horizontal",get:function(){return this.inputVector.x}},{key:"Vertical",get:function(){return this.inputVector.y}}]),e}(l))||v)),s._RF.pop()}}}));

System.register("chunks:///Controller/LeveController.js",["../_virtual/_rollupPluginBabelHelpers.js","cc","./CameraFollowController.js","../Component/RotateCom.js","./TouchController.js","./ThirdPersonController.js","../Component/BalkCom.js"],(function(e,t){var o,l,n,r,a,s,i,c,u,d,h,v,k,p,f,C,B,b,y,g,M,x,m,w,P,I,L,z,R,_;return e({_dec:void 0,_dec2:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_temp:void 0}),{setters:[function(e){o=e.applyDecoratedDescriptor,l=e.inherits,n=e.classCallCheck,r=e.possibleConstructorReturn,a=e.getPrototypeOf,s=e.initializerDefineProperty,i=e.assertThisInitialized,c=e.createClass},function(e){u=e.cclegacy,d=e._decorator,h=e.JsonAsset,v=e.Vec3,k=e.Node,p=e.loader,f=e.Prefab,C=e.instantiate,B=e.Quat,b=e.Component},function(e){y=e.default},function(e){g=e.RotateCom},function(e){M=e.TouchController},function(e){x=e.ThirdPersonController},function(e){m=e.BalkCom}],execute:function(){u._RF.push({},"f0243OWdNlBYY+Gopap3w3J","LeveController",void 0),R=d.ccclass,_=d.property,e("LeveController",(w=R("LeveController"),P=_(h),w((z=o((L=function(e){function t(){var e,o;n(this,t);for(var l=arguments.length,c=new Array(l),u=0;u<l;u++)c[u]=arguments[u];return o=r(this,(e=a(t)).call.apply(e,[this].concat(c))),s(o,"levelJson",z,i(o)),o.levelMap=new Map,o.blockFab=new Map,o.blockClas=new Map,o.blockMap=new Map,o.paths=[],o.curLevelModelIndex=0,o.curBlockIndex=0,o}return l(t,e),c(t,[{key:"onLoad",value:function(){t.instance=this}},{key:"start",value:function(){this.blockClas.set("RotateCom",g),this.blockClas.set("BalkCom",m),this.loadBlock(this.loadBlockOver.bind(this))}},{key:"loadBlock",value:function(e){var t=this,o=this.levelJson.json;if(this.curLevelModelIndex>=o.list.length)console.log("生成完成"),e&&e();else{var l=o.list[this.curLevelModelIndex];if("Path"==l.pn){for(var n=0;n<l.list.length;n++)this.paths.push(new v(l.list[n].x,l.list[n].y,l.list[n].z));this.curLevelModelIndex++,this.loadBlock(e)}else{var r=this.levelMap.get(l.pn);null==r&&(r=new k(l.pn),this.node.addChild(r),r.worldPosition=new v(l.x,l.y,l.z),this.levelMap.set(l.pn,r));var a=l.list[this.curBlockIndex],s=this.blockFab.get(a.bn);null==s?p.loadRes("Prefab/"+a.bn,f,(function(o,n){t.blockFab.set(a.bn,n),t.createBlock(n,r,a),t.curBlockIndex++,t.curBlockIndex>=l.list.length&&(t.curBlockIndex=0,t.curLevelModelIndex++),t.loadBlock(e)})):(null==s&&console.log(a.bn),this.createBlock(s,r,a),this.curBlockIndex++,this.curBlockIndex>=l.list.length&&(this.curBlockIndex=0,this.curLevelModelIndex++),this.loadBlock(e))}}}},{key:"createBlock",value:function(e,t,o){var l=this.blockClas.get(o.cn),n=C(e);if(t.addChild(n),n.position=new v(o.x,o.y,o.z),n.rotation=new B(o.rx,o.ry,o.rz,o.rw),n.scale=new v(o.sx,o.sy,o.sz),"Block"==t.name&&this.setBlockMap(Math.round(o.x),Math.round(o.z),n),null==l)return null;var r=n.addComponent(l);return r.init(o),r}},{key:"setBlockMap",value:function(e,t,o){var l=1e5*e+t;this.blockMap.set(l,o)}},{key:"getBlockByPos",value:function(e){var t=1e5*Math.round(e.x)+Math.round(e.z);return this.getBlock(t)}},{key:"getBlock",value:function(e){return this.blockMap.get(e)}},{key:"loadBlockOver",value:function(){this.loadPlayer()}},{key:"loadPlayer",value:function(){var e=this;p.loadRes("Prefab/Red",f,(function(t,o){if(!t){var l=C(o),n=e.levelMap.get("Block");e.node.addChild(l);var r=n.children[0].worldPosition.clone().add3f(0,2,0);l.setWorldPosition(r);var a=l.getComponent(x);a.setPaths(e.paths),a.setStartPos(r);var s=e.paths[1].clone().subtract(e.paths[0]).normalize();a.LookAt(s.clone()),a.setRotate(s.clone()),y.instance.setTarget(l),y.instance.setRotate(s.clone()),M.instance.setTarget(a)}}))}}]),t}(b)).prototype,"levelJson",[P],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),I=L))||I)),u._RF.pop()}}}));

System.register("chunks:///Controller/ThirdPersonController.js",["../_virtual/_rollupPluginBabelHelpers.js","cc","../Component/BodyBase.js","./CameraFollowController.js","./LeveController.js"],(function(t,e){var o,i,n,s,r,l,a,c,u,h,d,p,y,v,f,b,m,g,C,P,_,k,z,R,w,x,I,B,A,D,J,L;return t({_dec:void 0,_dec2:void 0,_dec3:void 0,_dec4:void 0,_dec5:void 0,_class:void 0,_class2:void 0,_descriptor:void 0,_descriptor2:void 0,_descriptor3:void 0,_descriptor4:void 0,_temp:void 0}),{setters:[function(t){o=t.applyDecoratedDescriptor,i=t.inherits,n=t.classCallCheck,s=t.possibleConstructorReturn,r=t.getPrototypeOf,l=t.initializerDefineProperty,a=t.assertThisInitialized,c=t.createClass,u=t.get},function(t){h=t.cclegacy,d=t._decorator,p=t.RigidBody,y=t.Node,v=t.Vec3,f=t.Collider,b=t.Quat},function(t){m=t.BodyBase},function(t){g=t.default},function(t){C=t.LeveController}],execute:function(){h._RF.push({},"506eeP30vhI1YHDLcGQQaYc","ThirdPersonController",void 0),J=d.ccclass,L=d.property,t("ThirdPersonController",(P=J("ThirdPersonController"),_=L({tooltip:"移动速度"}),k=L({type:p,tooltip:"身体"}),z=L({type:y,tooltip:"球节点"}),R=L({type:y,tooltip:"球"}),P((I=o((x=function(t){function e(){var t,o;n(this,e);for(var i=arguments.length,c=new Array(i),u=0;u<i;u++)c[u]=arguments[u];return o=s(this,(t=r(e)).call.apply(t,[this].concat(c))),l(o,"moveSpeed",I,a(o)),l(o,"body",B,a(o)),l(o,"ball",A,a(o)),l(o,"ballNode",D,a(o)),o.paths=[],o.pathIndex=1,o.curMoveDir=new v,o._curRotate=new v(0,0,1),o.isJump=!1,o.startPos=new v,o}return i(e,t),c(e,[{key:"onLoad",value:function(){this.getComponent(f).on("onCollisionEnter",this.onCollisionEnter,this)}},{key:"setPaths",value:function(t){this.paths=[].concat(t),this.pathIndex=1}},{key:"setStartPos",value:function(t){this.startPos.set(t.x,t.y,t.z)}},{key:"Move",value:function(t,e){if(!this.isJump){var o=t.multiplyScalar(this.moveSpeed).multiplyScalar(e),i=this.node.getPosition();this.node.translate(o,0);var n=this.node.getPosition();C.instance.getBlockByPos(n)||this.node.setPosition(i),this.curMoveDir.set(160*t.z,0,-1*t.x*160)}}},{key:"LookAt",value:function(t){var o=t.clone();o.y=0,u(r(e.prototype),"LookAt",this).call(this,o)}},{key:"setRotate",value:function(t){this._curRotate.set(t.x,t.y,t.z)}},{key:"Jump",value:function(t){this.isJump=!0,this.body.applyImpulse(t)}},{key:"update",value:function(t){if(!this.isJump){if(this.ballNode.eulerAngles=this.ballNode.eulerAngles.add3f(this.curMoveDir.x,0,0),this.ball.eulerAngles=this.ball.eulerAngles.add3f(0,0,this.curMoveDir.z),v.distance(this.node.getWorldPosition(),this.paths[this.pathIndex-1])>=1&&v.distance(this.node.getWorldPosition(),this.paths[this.pathIndex])<=1){var e=this.paths[this.pathIndex+1],o=this.paths[this.pathIndex];g.instance.setRotate(e.clone().subtract(o).normalize()),this._curRotate=e.clone().subtract(o).normalize(),this.pathIndex++}var i=this.LookRotation(this._curRotate),n=new b;b.slerp(n,this.node.getWorldRotation(),i,10*t),this.node.rotation=n}this.node.worldPosition.y<=0&&this.myClear()}},{key:"clearVelocity",value:function(){this.body.setLinearVelocity(new v),this.body.setAngularVelocity(new v)}},{key:"myClear",value:function(){this.isJump=!1,this.node.setWorldPosition(this.startPos);var t=this.paths[1],e=this.paths[0];g.instance.setRotate(t.clone().subtract(e).normalize()),this.setRotate(t.clone().subtract(e).normalize()),this.pathIndex=1,this.clearVelocity()}},{key:"onCollisionEnter",value:function(t){if("Rotation_Box_Three"==t.otherCollider.node.name){var e=new v;t.contacts[0].isBodyA?t.contacts[0].getWorldPointOnA(e):t.contacts[0].getWorldPointOnB(e);var o=this.node.getWorldPosition();this.body.applyImpulse(o.subtract(e).normalize().multiplyScalar(5))}else"Cube"==t.otherCollider.node.name&&this.isJump&&(this.isJump=!1,this.clearVelocity())}}]),e}(m)).prototype,"moveSpeed",[_],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 5}}),B=o(x.prototype,"body",[k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),A=o(x.prototype,"ball",[z],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),D=o(x.prototype,"ballNode",[R],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),w=x))||w)),h._RF.pop()}}}));

System.register("chunks:///Component/BalkCom.js",["../_virtual/_rollupPluginBabelHelpers.js","cc","./BaseCom.js","../Controller/ThirdPersonController.js"],(function(t,e){var o,r,n,i,s,l,c,a,u,p,h,C,g,f,d;return t({_dec:void 0,_class:void 0}),{setters:[function(t){o=t.inherits,r=t.createClass,n=t.classCallCheck,i=t.possibleConstructorReturn,s=t.getPrototypeOf,l=t.get},function(t){c=t.cclegacy,a=t._decorator,u=t.Vec3,p=t.Collider},function(t){h=t.BaseCom},function(t){C=t.ThirdPersonController}],execute:function(){c._RF.push({},"0215cI8xwVDZrHkhGkfDtFN","BalkCom",void 0),d=a.ccclass,a.property,t("BalkCom",(g=d("BalkCom"),g(f=function(t){function e(){return n(this,e),i(this,s(e).apply(this,arguments))}return o(e,t),r(e,[{key:"init",value:function(t){l(s(e.prototype),"init",this).call(this,t);var o=t.p.split(",");this.dir=new u(parseFloat(o[0]),parseFloat(o[1]),parseFloat(o[2])),this.getComponent(p).on("onTriggerEnter",this.onTriggerEnter,this)}},{key:"onTriggerEnter",value:function(t){var e=t.otherCollider.getComponent(C);e&&e.Jump(this.dir.clone())}}]),e}(h))||f)),c._RF.pop()}}}));

System.register("chunks:///easystar.js",["./_virtual/_rollupPluginBabelHelpers.js","cc"],(function(t,n){var e;return{setters:[function(t){},function(t){e=t.cclegacy}],execute:function(){e._RF.push({},"6a9e9Pr4H5PaIxgXoM7CZ/9","easystar",void 0),function(t){var n={};function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}return e.m=t,e.c=n,e.p="",e(0)}([function(t,n,e){var o={},r=e(1),i=e(2),s=e(3);t.exports=o;var u=1;o.js=function(){var t,n,e,a=!1,l={},c={},f={},h={},p=!0,d={},y=[],v=Number.MAX_VALUE,T=!1;this.setAcceptableTiles=function(t){t instanceof Array?e=t:!isNaN(parseFloat(t))&&isFinite(t)&&(e=[t])},this.enableSync=function(){a=!0},this.disableSync=function(){a=!1},this.enableDiagonals=function(){T=!0},this.disableDiagonals=function(){T=!1},this.setGrid=function(n){t=n;for(var e=0;e<t.length;e++)for(var o=0;o<t[0].length;o++)c[t[e][o]]||(c[t[e][o]]=1)},this.setTileCost=function(t,n){c[t]=n},this.setAdditionalPointCost=function(t,n,e){void 0===f[n]&&(f[n]={}),f[n][t]=e},this.removeAdditionalPointCost=function(t,n){void 0!==f[n]&&delete f[n][t]},this.removeAllAdditionalPointCosts=function(){f={}},this.setDirectionalCondition=function(t,n,e){void 0===h[n]&&(h[n]={}),h[n][t]=e},this.removeAllDirectionalConditions=function(){h={}},this.setIterationsPerCalculation=function(t){v=t},this.avoidAdditionalPoint=function(t,n){void 0===l[n]&&(l[n]={}),l[n][t]=1},this.stopAvoidingAdditionalPoint=function(t,n){void 0!==l[n]&&delete l[n][t]},this.enableCornerCutting=function(){p=!0},this.disableCornerCutting=function(){p=!1},this.stopAvoidingAllAdditionalPoints=function(){l={}},this.findPath=function(n,o,i,l,c){var f=function(t){a?c(t):setTimeout((function(){c(t)}))};if(void 0===e)throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");if(void 0===t)throw new Error("You can't set a path without first calling setGrid() on EasyStar.");if(n<0||o<0||i<0||l<0||n>t[0].length-1||o>t.length-1||i>t[0].length-1||l>t.length-1)throw new Error("Your start or end point is outside the scope of your grid.");if(n!==i||o!==l){for(var h=t[l][i],p=!1,v=0;v<e.length;v++)if(h===e[v]){p=!0;break}if(!1!==p){var T=new r;T.openList=new s((function(t,n){return t.bestGuessDistance()-n.bestGuessDistance()})),T.isDoneCalculating=!1,T.nodeHash={},T.startX=n,T.startY=o,T.endX=i,T.endY=l,T.callback=f,T.openList.push(m(T,T.startX,T.startY,null,1));var g=u++;return d[g]=T,y.push(g),g}f(null)}else f([])},this.cancelPath=function(t){return t in d&&(delete d[t],!0)},this.calculate=function(){if(0!==y.length&&void 0!==t&&void 0!==e)for(n=0;n<v;n++){if(0===y.length)return;a&&(n=0);var o=y[0],r=d[o];if(void 0!==r)if(0!==r.openList.size()){var i=r.openList.pop();if(r.endX!==i.x||r.endY!==i.y)i.list=0,i.y>0&&g(r,i,0,-1,1*b(i.x,i.y-1)),i.x<t[0].length-1&&g(r,i,1,0,1*b(i.x+1,i.y)),i.y<t.length-1&&g(r,i,0,1,1*b(i.x,i.y+1)),i.x>0&&g(r,i,-1,0,1*b(i.x-1,i.y)),T&&(i.x>0&&i.y>0&&(p||x(t,e,i.x,i.y-1,i)&&x(t,e,i.x-1,i.y,i))&&g(r,i,-1,-1,1.4*b(i.x-1,i.y-1)),i.x<t[0].length-1&&i.y<t.length-1&&(p||x(t,e,i.x,i.y+1,i)&&x(t,e,i.x+1,i.y,i))&&g(r,i,1,1,1.4*b(i.x+1,i.y+1)),i.x<t[0].length-1&&i.y>0&&(p||x(t,e,i.x,i.y-1,i)&&x(t,e,i.x+1,i.y,i))&&g(r,i,1,-1,1.4*b(i.x+1,i.y-1)),i.x>0&&i.y<t.length-1&&(p||x(t,e,i.x,i.y+1,i)&&x(t,e,i.x-1,i.y,i))&&g(r,i,-1,1,1.4*b(i.x-1,i.y+1)));else{var s=[];s.push({x:i.x,y:i.y});for(var u=i.parent;null!=u;)s.push({x:u.x,y:u.y}),u=u.parent;s.reverse();var l=s;r.callback(l),delete d[o],y.shift()}}else r.callback(null),delete d[o],y.shift();else y.shift()}};var g=function(n,o,r,i,s){var u=o.x+r,a=o.y+i;if((void 0===l[a]||void 0===l[a][u])&&x(t,e,u,a,o)){var c=m(n,u,a,o,s);void 0===c.list?(c.list=1,n.openList.push(c)):o.costSoFar+s<c.costSoFar&&(c.costSoFar=o.costSoFar+s,c.parent=o,n.openList.updateItem(c))}},x=function(t,n,e,o,r){var i=h[o]&&h[o][e];if(i){var s=O(r.x-e,r.y-o);if(!function(){for(var t=0;t<i.length;t++)if(i[t]===s)return!0;return!1}())return!1}for(var u=0;u<n.length;u++)if(t[o][e]===n[u])return!0;return!1},O=function(t,n){if(0===t&&-1===n)return o.TOP;if(1===t&&-1===n)return o.TOP_RIGHT;if(1===t&&0===n)return o.RIGHT;if(1===t&&1===n)return o.BOTTOM_RIGHT;if(0===t&&1===n)return o.BOTTOM;if(-1===t&&1===n)return o.BOTTOM_LEFT;if(-1===t&&0===n)return o.LEFT;if(-1===t&&-1===n)return o.TOP_LEFT;throw new Error("These differences are not valid: "+t+", "+n)},b=function(n,e){return f[e]&&f[e][n]||c[t[e][n]]},m=function(t,n,e,o,r){if(void 0!==t.nodeHash[e]){if(void 0!==t.nodeHash[e][n])return t.nodeHash[e][n]}else t.nodeHash[e]={};var s=P(n,e,t.endX,t.endY);if(null!==o)var u=o.costSoFar+r;else u=0;var a=new i(o,n,e,u,s);return t.nodeHash[e][n]=a,a},P=function(t,n,e,o){var r,i;return T?(r=Math.abs(t-e))<(i=Math.abs(n-o))?1.4*r+i:1.4*i+r:(r=Math.abs(t-e))+(i=Math.abs(n-o))}},o.TOP="TOP",o.TOP_RIGHT="TOP_RIGHT",o.RIGHT="RIGHT",o.BOTTOM_RIGHT="BOTTOM_RIGHT",o.BOTTOM="BOTTOM",o.BOTTOM_LEFT="BOTTOM_LEFT",o.LEFT="LEFT",o.TOP_LEFT="TOP_LEFT"},function(t,n){t.exports=function(){this.pointsToAvoid={},this.startX,this.callback,this.startY,this.endX,this.endY,this.nodeHash={},this.openList}},function(t,n){t.exports=function(t,n,e,o,r){this.parent=t,this.x=n,this.y=e,this.costSoFar=o,this.simpleDistanceToTarget=r,this.bestGuessDistance=function(){return this.costSoFar+this.simpleDistanceToTarget}}},function(t,n,e){t.exports=e(4)},function(t,n,e){var o,r,i;(function(){var e,s,u,a,l,c,f,h,p,d,y,v,T,g,x;u=Math.floor,d=Math.min,s=function(t,n){return t<n?-1:t>n?1:0},p=function(t,n,e,o,r){var i;if(null==e&&(e=0),null==r&&(r=s),e<0)throw new Error("lo must be non-negative");for(null==o&&(o=t.length);e<o;)r(n,t[i=u((e+o)/2)])<0?o=i:e=i+1;return[].splice.apply(t,[e,e-e].concat(n)),n},c=function(t,n,e){return null==e&&(e=s),t.push(n),g(t,0,t.length-1,e)},l=function(t,n){var e,o;return null==n&&(n=s),e=t.pop(),t.length?(o=t[0],t[0]=e,x(t,0,n)):o=e,o},h=function(t,n,e){var o;return null==e&&(e=s),o=t[0],t[0]=n,x(t,0,e),o},f=function(t,n,e){var o;return null==e&&(e=s),t.length&&e(t[0],n)<0&&(n=(o=[t[0],n])[0],t[0]=o[1],x(t,0,e)),n},a=function(t,n){var e,o,r,i,a,l;for(null==n&&(n=s),a=[],o=0,r=(i=function(){l=[];for(var n=0,e=u(t.length/2);0<=e?n<e:n>e;0<=e?n++:n--)l.push(n);return l}.apply(this).reverse()).length;o<r;o++)e=i[o],a.push(x(t,e,n));return a},T=function(t,n,e){var o;if(null==e&&(e=s),-1!==(o=t.indexOf(n)))return g(t,0,o,e),x(t,o,e)},y=function(t,n,e){var o,r,i,u,l;if(null==e&&(e=s),!(r=t.slice(0,n)).length)return r;for(a(r,e),i=0,u=(l=t.slice(n)).length;i<u;i++)o=l[i],f(r,o,e);return r.sort(e).reverse()},v=function(t,n,e){var o,r,i,u,c,f,h,y,v;if(null==e&&(e=s),10*n<=t.length){if(!(i=t.slice(0,n).sort(e)).length)return i;for(r=i[i.length-1],u=0,f=(h=t.slice(n)).length;u<f;u++)e(o=h[u],r)<0&&(p(i,o,0,null,e),i.pop(),r=i[i.length-1]);return i}for(a(t,e),v=[],c=0,y=d(n,t.length);0<=y?c<y:c>y;0<=y?++c:--c)v.push(l(t,e));return v},g=function(t,n,e,o){var r,i,u;for(null==o&&(o=s),r=t[e];e>n&&o(r,i=t[u=e-1>>1])<0;)t[e]=i,e=u;return t[e]=r},x=function(t,n,e){var o,r,i,u,a;for(null==e&&(e=s),r=t.length,a=n,i=t[n],o=2*n+1;o<r;)(u=o+1)<r&&!(e(t[o],t[u])<0)&&(o=u),t[n]=t[o],o=2*(n=o)+1;return t[n]=i,g(t,a,n,e)},e=function(){function t(t){this.cmp=null!=t?t:s,this.nodes=[]}return t.push=c,t.pop=l,t.replace=h,t.pushpop=f,t.heapify=a,t.updateItem=T,t.nlargest=y,t.nsmallest=v,t.prototype.push=function(t){return c(this.nodes,t,this.cmp)},t.prototype.pop=function(){return l(this.nodes,this.cmp)},t.prototype.peek=function(){return this.nodes[0]},t.prototype.contains=function(t){return-1!==this.nodes.indexOf(t)},t.prototype.replace=function(t){return h(this.nodes,t,this.cmp)},t.prototype.pushpop=function(t){return f(this.nodes,t,this.cmp)},t.prototype.heapify=function(){return a(this.nodes,this.cmp)},t.prototype.updateItem=function(t){return T(this.nodes,t,this.cmp)},t.prototype.clear=function(){return this.nodes=[]},t.prototype.empty=function(){return 0===this.nodes.length},t.prototype.size=function(){return this.nodes.length},t.prototype.clone=function(){var n;return(n=new t).nodes=this.nodes.slice(0),n},t.prototype.toArray=function(){return this.nodes.slice(0)},t.prototype.insert=t.prototype.push,t.prototype.top=t.prototype.peek,t.prototype.front=t.prototype.peek,t.prototype.has=t.prototype.contains,t.prototype.copy=t.prototype.clone,t}(),r=[],void 0===(i="function"==typeof(o=function(){return e})?o.apply(n,r):o)||(t.exports=i)}).call(this)}]),console.log("EasyStar"),e._RF.pop()}}}));

System.register("chunks:///_virtual/prerequisite-imports:main",["../Component/BodyBase.js","../Core/PubUtils.js","../Controller/CameraFollowController.js","../Component/BaseCom.js","../Component/RotateCom.js","../Controller/TouchController.js","../Controller/LeveController.js","../Controller/ThirdPersonController.js","../Component/BalkCom.js","../easystar.js"],(function(o,n){return{setters:[function(o){},function(o){},function(o){},function(o){},function(o){},function(o){},function(o){},function(o){},function(o){},function(o){}],execute:function(){}}}));

(function(r) {
  r('project:///assets/Script/Component/BodyBase.js', 'chunks:///Component/BodyBase.js');
  r('project:///assets/Script/Core/PubUtils.js', 'chunks:///Core/PubUtils.js');
  r('project:///assets/Script/Controller/CameraFollowController.js', 'chunks:///Controller/CameraFollowController.js');
  r('project:///assets/Script/Component/BaseCom.js', 'chunks:///Component/BaseCom.js');
  r('project:///assets/Script/Component/RotateCom.js', 'chunks:///Component/RotateCom.js');
  r('project:///assets/Script/Controller/TouchController.js', 'chunks:///Controller/TouchController.js');
  r('project:///assets/Script/Controller/LeveController.js', 'chunks:///Controller/LeveController.js');
  r('project:///assets/Script/Controller/ThirdPersonController.js', 'chunks:///Controller/ThirdPersonController.js');
  r('project:///assets/Script/Component/BalkCom.js', 'chunks:///Component/BalkCom.js');
  r('project:///assets/Script/easystar.js', 'chunks:///easystar.js');
  r('virtual:///prerequisite-imports:main', 'chunks:///_virtual/prerequisite-imports:main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    var _m;
    return {
        setters: [function(m) { _m = m; }],
        execute: function () { _export(_m); }
    };
    });
});
} }; });