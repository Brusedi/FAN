// type ft = (x:any) => ft ;
// const fa = (f:ft) => { console.log(f) ; return f(f); } ;
// const fn:ft = (x:any) => x > 3 ? x : fn ( x + 1) ;
var compose = function (f, g) { return function (p) { return g(f(p)); }; };
var compose2 = function (f, g) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return g(f(args));
}; };
var f1 = function (x) { return x + "f1!"; };
var f2 = function (x) { return x + "f2!"; };
console.log(compose(f1, f2)(2));
console.log(compose2(compose2(f1, f2), f1)(2));
//console.log( fa( fn )(1) )
