(function(t){function e(e){for(var r,a,c=e[0],u=e[1],i=e[2],l=0,p=[];l<c.length;l++)a=c[l],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);d&&d(e);while(p.length)p.shift()();return s.push.apply(s,i||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var c=n[a];0!==o[c]&&(r=!1)}r&&(s.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},a={app:0},o={app:0},s=[];function c(t){return u.p+"js/"+({}[t]||t)+"."+{"chunk-2d0a4f9e":"03e7164c","chunk-2d0bb26b":"fb6d0016","chunk-2d0d7d8e":"fdc53ac9","chunk-2d0da42b":"f9967a6a","chunk-2d0e6c2c":"bf6f89b7","chunk-2d0f1152":"437ce2b8","chunk-2d21f118":"629e39c3","chunk-7cbeeccf":"fef02c1f","chunk-7f39b26e":"852d1784","chunk-944a38da":"2a6285b2","chunk-b88d113a":"de3a503d","chunk-dc638bfe":"8d5dac1e"}[t]+".js"}function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={"chunk-7cbeeccf":1,"chunk-7f39b26e":1,"chunk-944a38da":1,"chunk-b88d113a":1,"chunk-dc638bfe":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-2d0a4f9e":"31d6cfe0","chunk-2d0bb26b":"31d6cfe0","chunk-2d0d7d8e":"31d6cfe0","chunk-2d0da42b":"31d6cfe0","chunk-2d0e6c2c":"31d6cfe0","chunk-2d0f1152":"31d6cfe0","chunk-2d21f118":"31d6cfe0","chunk-7cbeeccf":"5237d041","chunk-7f39b26e":"857ff0ab","chunk-944a38da":"a0026860","chunk-b88d113a":"93165919","chunk-dc638bfe":"e63493af"}[t]+".css",o=u.p+r,s=document.getElementsByTagName("link"),c=0;c<s.length;c++){var i=s[c],l=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(l===r||l===o))return e()}var p=document.getElementsByTagName("style");for(c=0;c<p.length;c++){i=p[c],l=i.getAttribute("data-href");if(l===r||l===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var r=e&&e.target&&e.target.src||o,s=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=r,delete a[t],d.parentNode.removeChild(d),n(s)},d.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){a[t]=0})));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise((function(e,n){r=o[t]=[e,n]}));e.push(r[2]=s);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=c(t);var p=new Error;i=function(e){l.onerror=l.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;p.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",p.name="ChunkLoadError",p.type=r,p.request=a,n[1](p)}o[t]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:l})}),12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(e)},u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/",u.oe=function(t){throw console.error(t),t};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var p=0;p<i.length;p++)e(i[p]);var d=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"3c7e":function(t,e,n){"use strict";var r=n("daee"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},o=[],s=n("2877"),c={},u=Object(s["a"])(c,a,o,!1,null,null,null),i=u.exports,l=(n("caad"),n("d3b7"),n("2532"),n("8c4f")),p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-layout",{attrs:{view:"lHh Lpr lFf"}},[n("q-header",{staticClass:"glossy",attrs:{elevated:""}},[n("q-toolbar",[n("q-btn",{attrs:{flat:"",dense:"",round:"","aria-label":"Menu",icon:"fas fa-bars"},on:{click:function(e){t.leftDrawerOpen=!t.leftDrawerOpen}}}),n("q-toolbar-title",[t._v("EZA+")]),n("q-icon",{staticClass:"account-icon",attrs:{name:"fas fa-user"},on:{click:t.logout}})],1)],1),n("q-drawer",{attrs:{bordered:"","content-class":"bg-grey-1"},model:{value:t.leftDrawerOpen,callback:function(e){t.leftDrawerOpen=e},expression:"leftDrawerOpen"}},[n("q-list",[n("q-item-label",{attrs:{header:""}},[t._v("Navigation")]),n("q-item",{attrs:{to:"/groups",exact:""}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"fas fa-home"}})],1),n("q-item-section",[n("q-item-label",[t._v("Groups")])],1)],1),"Doctor"==t.Role?n("q-item",{attrs:{to:"/mygroups",exact:""}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"fas fa-info"}})],1),n("q-item-section",[n("q-item-label",[t._v("My Groups")])],1)],1):t._e(),"Doctor"==t.Role?n("q-item",{attrs:{to:"/createGroup",exact:""}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"fas fa-plus"}})],1),n("q-item-section",[n("q-item-label",[t._v("Create Group")])],1)],1):t._e(),n("q-item",{attrs:{to:"/account",exact:""}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"fas fa-user"}})],1),n("q-item-section",[n("q-item-label",[t._v("Account")])],1)],1),n("q-item-label",{attrs:{header:""}},[t._v("My Groups")]),t._l(t.MyGroups,(function(e,r){return n("q-item",{key:r,attrs:{clickable:""},on:{click:function(n){return t.groupClicked(e)}}},[n("q-item-section",{attrs:{avatar:""}},[n("q-icon",{attrs:{name:"fas fa-graduation-cap"}})],1),n("q-item-section",[n("q-item-label",[t._v(" "+t._s(e.Name)+" ")])],1)],1)}))],2)],1),n("q-page-container",[n("router-view")],1)],1)},d=[],f={name:"LayoutDefault",data:function(){return{leftDrawerOpen:this.$q.platform.is.desktop}},computed:{Role:function(){return sessionStorage.getItem("role")},MyGroups:function(){return"Doctor"==this.Role?this.$store.getters.getMyGroups:this.$store.getters.getStudentGroups}},methods:{logout:function(){sessionStorage.removeItem("token"),this.$router.push("/")},groupClicked:function(t){this.$store.commit("clearGroupPosts"),this.$store.commit("clearPostReplies"),this.$store.commit("setCurrentGroup",t),this.$store.dispatch("fetchGroupPosts",t._id),"/posts"!=this.$route.fullPath&&this.$router.push("/posts")}},created:function(){this.$store.dispatch("fetchAllGroups"),this.$store.dispatch("fetchMyGroups"),this.$store.dispatch("fetchStudentGroups")}},h=f,m=(n("3c7e"),Object(s["a"])(h,p,d,!1,null,"33238110",null)),g=m.exports,b=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("q-page",{staticClass:"flex flex-center"},[r("img",{attrs:{alt:"Quasar logo",src:n("cf05")}})])},v=[],k={name:"PageHome"},y=k,G=Object(s["a"])(y,b,v,!1,null,null,null),w=G.exports,P=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",{attrs:{padding:""}},[n("p",[t._v("This is an about page")])])},C=[],_={name:"PageAbout"},q=_,x=Object(s["a"])(q,P,C,!1,null,null,null),S=x.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",attrs:{"data-v-35ea163e":"","data-v-4289441e":""}},[n("div",{staticClass:"carousel carousel-fade",attrs:{"data-v-14623e48":"","data-v-4289441e":"","data-v-35ea163e":""}},[n("div",{staticClass:"carousel-inner",attrs:{"data-v-14623e48":""}},[n("div",{staticClass:"items-container w-100",staticStyle:{height:"1086px"},attrs:{"data-v-14623e48":""}},[n("div",{staticClass:"item animated fadeIn",staticStyle:{"z-index":"2"},attrs:{"data-v-14623e48":""}},[n("div",{attrs:{"data-v-14623e48":""}},[n("div",{staticClass:"view",attrs:{"data-v-14623e48":""}},[n("video",{ref:"videoRef",staticClass:"video-fluid d-block",attrs:{"data-v-14623e48":"",autoplay:"",loop:"loop"}},[n("source",{attrs:{"data-v-14623e48":"",src:"https://mdbootstrap.com/img/video/Lines.mp4",type:"video/mp4"}})]),n("div",{staticClass:"mask rgba-black-light",attrs:{"data-v-457711ef":"","data-v-14623e48":""}}),n("h1",{staticClass:"font-weight-bold text-uppercase info-header"},[t._v("Welcome To EZA+")]),n("a",{staticClass:"btn btn-unique btn-lg btn-rounded mr-0 waves-effect waves-light",attrs:{target:"_blank"},on:{click:t.register}},[t._v("Sign up!")]),n("a",{staticClass:"btn btn-login btn-lg btn-rounded",attrs:{target:"_blank"},on:{click:t.login}},[t._v("Log In")])])])])]),t._m(0)])])])},R=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{"data-v-14623e48":""}},[n("a",{staticClass:"carousel-control-prev",staticStyle:{"z-index":"1000"},attrs:{"data-v-14623e48":""}},[n("span",{staticClass:"carousel-control-prev-icon",attrs:{"data-v-14623e48":"","aria-hidden":"true"}}),n("span",{staticClass:"sr-only",attrs:{"data-v-14623e48":""}},[t._v("Prev")])]),n("a",{staticClass:"carousel-control-next",staticStyle:{"z-index":"1000"},attrs:{"data-v-14623e48":""}},[n("span",{staticClass:"carousel-control-next-icon",attrs:{"data-v-14623e48":"","aria-hidden":"true"}}),n("span",{staticClass:"sr-only",attrs:{"data-v-14623e48":""}},[t._v("Next")])])])}],A={name:"VideoPage",data:function(){return{}},methods:{login:function(){this.$router.push("/login")},register:function(){this.$router.push("/registration")}}},D=A,$=(n("e4f0"),Object(s["a"])(D,O,R,!1,null,"2ba6582a",null)),j=$.exports;r["a"].use(l["a"]);var M=new l["a"]({mode:"history",routes:[{path:"/login",alias:"/login",component:function(){return n.e("chunk-dc638bfe").then(n.bind(null,"40eb"))}},{path:"/home",component:g,children:[{path:"",name:"home",component:w},{path:"/about",name:"about",component:S},{path:"/2",name:"view2",component:function(){return n.e("chunk-2d0e6c2c").then(n.bind(null,"99b8"))}},{path:"/groups",name:"Groups",component:function(){return n.e("chunk-2d0bb26b").then(n.bind(null,"39f5"))}},{path:"/createGroup",name:"CreateGroup",component:function(){return n.e("chunk-2d0a4f9e").then(n.bind(null,"0976"))}},{path:"/myGroups",name:"DoctorGroups",component:function(){return n.e("chunk-2d0da42b").then(n.bind(null,"6b9b"))}},{path:"/posts",name:"Posts",component:function(){return n.e("chunk-2d0f1152").then(n.bind(null,"9eb2"))}},{path:"/account",name:"Account",component:function(){return n.e("chunk-944a38da").then(n.bind(null,"4c16"))}},{path:"/replies",name:"Replies",component:function(){return n.e("chunk-2d0d7d8e").then(n.bind(null,"790f"))}}]},{path:"/1",component:function(){return n.e("chunk-2d21f118").then(n.bind(null,"d7f5"))}},{path:"/",name:"Intro",component:j},{path:"/1",component:function(){return n.e("chunk-2d21f118").then(n.bind(null,"d7f5"))}},{path:"/forgot",component:function(){return n.e("chunk-7cbeeccf").then(n.bind(null,"f8fc"))}},{path:"/registration",component:function(){return n.e("chunk-7f39b26e").then(n.bind(null,"c2c7"))}},{path:"/resetPassword/:resetToken",props:!0,component:function(){return n.e("chunk-b88d113a").then(n.bind(null,"8f48"))}}]});M.beforeEach((function(t,e,n){"/login"===t.fullPath||"/"===t.fullPath?sessionStorage.getItem("token")&&n("/home"):sessionStorage.getItem("token")||("/forgot"==t.path||"/registration"==t.path||t.fullPath.includes("/resetPassword")?n():n("/")),n()}));var E=M,U=(n("99af"),n("96cf"),n("2f62")),L=n("c151"),T=n("bfa9");r["a"].use(U["a"]);var I=new T["a"]({storage:window.sessionStorage}),N=new U["a"].Store({state:{UserData:null,AllGroups:[],MyGroups:[],StudentGroups:[],GroupPosts:[],CurrentGroup:null,CurrentPost:null,PostReplies:[]},getters:{getUserData:function(t){return t.UserData},getAllGroups:function(t){return t.AllGroups},getMyGroups:function(t){return t.MyGroups},getStudentGroups:function(t){return t.StudentGroups},getGroupPosts:function(t){return t.GroupPosts},getCurrentGroup:function(t){return t.CurrentGroup},getCurrentPost:function(t){return t.CurrentPost},getPostReplies:function(t){return t.PostReplies}},mutations:{setUserData:function(t,e){t.UserData=e},setAllGroups:function(t,e){t.AllGroups=e},setMyGroups:function(t,e){t.MyGroups=e},setStudentGroups:function(t,e){t.StudentGroups=e},setGroupPosts:function(t,e){t.GroupPosts=e},setCurrentGroup:function(t,e){t.CurrentGroup=e},clearUserData:function(t){t.UserData={},t.AllGroups=[],t.MyGroups=[],t.StudentGroups=[],t.GroupPosts=[],t.CurrentGroup=null,sessionStorage.clear()},clearGroupPosts:function(t){t.GroupPosts=[]},setCurrentPost:function(t,e){t.CurrentPost=e},clearCurrentPost:function(t){t.CurrentPost=null},setPostReplies:function(t,e){t.PostReplies=e},clearPostReplies:function(t){t.PostReplies=[]}},actions:{fetchAllGroups:function(t){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Object(L["a"])().get("/groups/getAllGroups").then((function(e){"sucess"==e.data.status&&t.commit("setAllGroups",e.data.data)})).catch((function(){})));case 2:case"end":return e.stop()}}))},fetchMyGroups:function(t){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return e=t.getters.getUserData.id,n.next=3,regeneratorRuntime.awrap(Object(L["a"])().get("/groups/getAllGroupByCreator/".concat(e)).then((function(e){"success"==e.data.status&&t.commit("setMyGroups",e.data.data)})));case 3:case"end":return n.stop()}}))},fetchStudentGroups:function(t){var e;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return e=t.getters.getUserData.id,n.next=3,regeneratorRuntime.awrap(Object(L["a"])().get("/groups/getAllGroupByUser/".concat(e)).then((function(e){"success"==e.data.status&&t.commit("setStudentGroups",e.data.data)})));case 3:case"end":return n.stop()}}))},fetchGroupPosts:function(t,e){var n;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.getters.getUserData.id,r.next=3,regeneratorRuntime.awrap(Object(L["a"])().get("/posts/getGroupPosts/".concat(n,"/").concat(e)).then((function(e){"success"==e.data.status&&t.commit("setGroupPosts",e.data.data)})));case 3:case"end":return r.stop()}}))},fetchPostReplies:function(t){var e,n;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return e=t.getters.getUserData.id,n=t.getters.getCurrentPost._id,r.next=4,regeneratorRuntime.awrap(Object(L["a"])().get("/replies/getAllReplies/".concat(e,"/").concat(n)).then((function(e){"success"==e.data.status&&t.commit("setPostReplies",e.data.data)})));case 4:case"end":return r.stop()}}))}},plugins:[I.plugin]}),z=(n("a4ac"),n("5c7d"),n("b3f7")),B=(n("7d6e"),n("e54f"),n("573e"),n("b178"));r["a"].use(B["a"],{config:{},iconSet:z["a"]}),new r["a"]({router:E,store:N,render:function(t){return t(i)}}).$mount("#app")},a4ac:function(t,e,n){},c151:function(t,e,n){"use strict";var r=n("bc3a"),a=n.n(r);e["a"]=function(){return a.a.create({baseURL:"https://ezaplus.herokuapp.com/api",headers:{Authorization:sessionStorage.getItem("token")}})}},cf05:function(t,e,n){t.exports=n.p+"img/logo.f8443120.png"},daee:function(t,e,n){},e0ae:function(t,e,n){},e4f0:function(t,e,n){"use strict";var r=n("e0ae"),a=n.n(r);a.a}});
//# sourceMappingURL=app.0548b990.js.map