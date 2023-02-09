"use strict";
// type ft = (x:any) => ft ;
// const fa = (f:ft) => { console.log(f) ; return f(f); } ;
// const fn:ft = (x:any) => x > 3 ? x : fn ( x + 1) ;
const compose = (f, g) => (p) => g(f(p));
const compose2 = (f, g) => (...args) => g(f(args));
const f1 = (x) => x + "f1!";
const f2 = (x) => x + "f2!";
console.log(compose(f1, f2)(2));
console.log(compose2(compose2(f1, f2), f1)(2));
//console.log( fa( fn )(1) )
