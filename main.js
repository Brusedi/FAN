var fa = function (f) { console.log(f); return f(f); };
var fn = function (x) { return x > 3 ? x : fn(x + 1); };
console.log(fa(fn)(1));
