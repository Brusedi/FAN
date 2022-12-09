type ft = (x:any) => ft ;

const fa = (f:ft) => { console.log(f) ; return f(f); } ;

const fn:ft = (x:any) => x > 3 ? x : fn ( x + 1) ;


console.log( fa( fn )(1) )