(function(){
function mk(){var store={};var f=function(){return mk();};return new Proxy(f,{
 get:function(t,k){if(k===Symbol.toPrimitive)return function(){return 0.5;};if(k==='intersectObjects')return function(){return [];};if(k==='then')return undefined;if(k in store)return store[k];var v=mk();store[k]=v;return v;},
 set:function(t,k,v){store[k]=v;return true;},
 construct:function(){var o=mk();window.__made=(window.__made||0)+1;return o;},
 apply:function(){window.__calls=(window.__calls||0)+1;return mk();}});}
window.THREE=mk();
})();
