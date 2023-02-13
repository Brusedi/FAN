// type matchResult  = { ret:boolean , rest:string  }
// type matchResults = { ret:boolean , rests:string[] }
// type strMatch    = (s:string)   => matchResult
// type strMatches  = (s:string)   => matchResults
// type strMatcher  = (s:string[]) => matchResults
// type res2lvl  =   { ret: matchResults , prev?:strMatcher } 
// const Rslt = ( ret:boolean, rest:string ):matchResult => ({ ret:ret , rest:rest })  
// const Rslts = ( ret:boolean, rests:string[] ):matchResults => ({ ret:ret , rests:rests })  
// const RsltsEmpty = Rslts(false,[])  
// const setRes2lvl  = ( ret:matchResults,  prev?:strMatcher ):res2lvl => ({ ret:ret , prev:prev }) 
// const res2lvlEmpty  = setRes2lvl(RsltsEmpty, undefined )
// const addMatch = ( to:matchResults , add: matchResult ):matchResults  => 
//     to.ret && add.ret 
//         ? {...to, rests:to.rests.concat( [add.rest] )} 
//         : add.ret ? { ret:true, rests:[add.rest] } : to  
// const concatMatch = ( to:matchResults , add: matchResults ):matchResults  =>  
//       to.ret && add.ret       
//         ? {...to, rests:to.rests.concat( add.rests )} 
//         : add.ret ?  add  : to  
// const getMatcher            = ( mtc:strMatch ):strMatcher => ( sx:string[] ) => sx.reduce( (ac,s) => addMatch( ac, mtc(s)) , RsltsEmpty  )
// const getMatcherFromMatches = ( mtc:strMatches ):strMatcher => ( sx:string[] ) => sx.reduce( (ac,s) => concatMatch( ac, mtc(s)) , RsltsEmpty  )
// const isMatchDot:strMatch = (s) => s.length > 0 ? Rslt(true, s.substring(1,s.length) ) : Rslt(false,s)
// const matcherDot:strMatcher =  getMatcher( isMatchDot ) 
// const getMatchChar = ( c:string ):strMatch  => (s) => 
//     s.length >= c.length && s.substring( 0, c.length ) == c ? Rslt(true, s.substring( c.length, s.length) ) : Rslt(false,s)
// const getMatcherChar = ( c:string ):strMatcher  => getMatcher( getMatchChar(c) )
// const getZeroOrSomeFromMatcher = (  match:strMatcher ):strMatches => ( s:string ) => 
//         [...Array(s.length)].map( (_,i) =>i ).reduce(
//                 ( ac, x ) => ac.more 
//                     ?( newRes => newRes.ret 
//                             ? ({ res: concatMatch( ac.res, newRes ) ,more:true })
//                             : ({ res: ac.res, more:false })
//                         ) ( match( [ s.substring(x, s.length) ] ) )
//                     : ac    
//                 ,({ res:Rslts( true, [s] ) , more:true }) 
//             ).res 
// const getZeroOrSomeFromMatcherMatcher = (  matcher:strMatcher ) => getMatcherFromMatches( getZeroOrSomeFromMatcher(matcher ) )
// const isMatch = (s: string, p: string): boolean => {
//     const res = p.split('').reduce(
//         ( ac, x ) => {
//             const ee:res2lvl = ac.prev 
//                 ? x == '*' 
//                     ? setRes2lvl( getZeroOrSomeFromMatcherMatcher( ac.prev )( ac.ret.rests ), undefined )
//                     : setRes2lvl( ac.prev(ac.ret.rests),  x == '.' ?  matcherDot : getMatcherChar(x)  )
//                 : setRes2lvl( ac.ret ,  x == '.' ?  matcherDot : getMatcherChar(x) )
//                 return setRes2lvl(Rslts(  ee.ret.ret  , ee.ret.rests.filter( (v,i,a)=> a.indexOf(v) === i ) ) , ee.prev ) 
//             }        
//             ,setRes2lvl(Rslts(false,[s]) ,undefined)   // по умолч не расп
//         ) 
//     const r = res.prev ? res.prev( res.ret.rests ) : res.ret        
//     return r.ret && r.rests.indexOf('') >= 0
// }
// //console.log(isMatch("aaaaaaaaaaaaab" , "a*a*a*a*a*a*a*a*a*a*a*a*b"));
// //console.log(isMatch("aaaaaaaaaaaaab" , "a*a*a*b"));
