type MatchResults = { ret:boolean , rests:number[] }

type Match   = ( s:string , idx:number )   => MatchResults
type Matcher = ( s:string , idx:number[] ) => MatchResults

type res2lvl  =   { ret: MatchResults , prev?:Match } 
const setRes2lvl  = ( ret:MatchResults,  prev?:Match ):res2lvl => ({ ret:ret , prev:prev }) 

const dotMatcher:Match  = (s:string , idx:number ) => idx > 0 ? ({ ret: true , rests:[idx-1] }) : ({ ret: false , rests:[idx] })  

const getCarMatcher  = (c:string):Match => (  s:string , idx:number ) => 
     c === s.slice(-idx,idx === 1 ? undefined : -idx + 1  ) 
        ? ({ ret: true  , rests:[ idx-1 ] }) 
        : ({ ret: false , rests:[idx] })  
        


const getZeroOrSome = ( match:Match ):Match  => (  s:string , idx:number ) => {
    let ret = [idx]; 
    while ( idx > 0 && match( s, idx ).ret ) {
        //ret.push(idx) 
        idx -- ;   
        ret.push(idx) 
    }
    return ({ ret: true , rests:ret  }) 
}

const concatMatch = ( to:MatchResults , add: MatchResults ):MatchResults  =>  
       to.ret && add.ret       
         ? ({ ret:true , rests:to.rests.concat( add.rests ).filter( (v,i,a)=> a.indexOf(v) === i ) }) 
         : add.ret ?  add  : to  


const matchToMatcher = ( match:Match ):Matcher => 
    (s:string , idx:number[] ) => idx.reduce( (ac,i) => concatMatch( ac, match(s, i)) ,  ({ ret: false , rests:[] }) as MatchResults  )

const isMatch = (s: string, p: string): boolean => {
    const res = p.split('').reduce(
        ( ac, x ) => ac.prev 
            ? x == '*'         
                ? setRes2lvl( matchToMatcher( getZeroOrSome( ac.prev ) )(s, ac.ret.rests ) , undefined )  
                : setRes2lvl( matchToMatcher( ac.prev ) (s, ac.ret.rests ),  x == '.' ?  dotMatcher : getCarMatcher(x)  )
            : setRes2lvl( ac.ret ,  x == '.' ?  dotMatcher : getCarMatcher(x) )
        ,setRes2lvl( ({ ret: false, rests:[s.length] }) , undefined )  
    ) 

    const r = res.prev ? matchToMatcher(res.prev) ( s, res.ret.rests ) : res.ret  ; 
   
    return r.ret && ( r.rests.length == 0 ||  r.rests.indexOf(0) >= 0)

}     

