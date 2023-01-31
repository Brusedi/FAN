// type ft = (x:any) => ft ;
// const fa = (f:ft) => { console.log(f) ; return f(f); } ;
// const fn:ft = (x:any) => x > 3 ? x : fn ( x + 1) ;


type fnTT<T>  = (...args:any[]) => T 
type fnFT<T>  = ( arg:T ) => any 

type fnT<T,U> = (arg:T) => U 



const compose = <T,U,V>( f:fnT<T,U> , g:fnT<U,V> )  => (p:T) => g(f(p))

const compose2 = <U>( f:fnTT<U> , g:fnFT<U> )  => (...args:any[]) => g(f(args))


const f1 = (x:number) => x + "f1!" ;

const f2 = (x:string) => x + "f2!" ;


console.log( compose(f1,f2)( 2 ) );
console.log( compose2( compose2(f1,f2), f1 )( 2 ) );









//console.log( fa( fn )(1) )