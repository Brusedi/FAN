// type matchResult   = { ret:boolean , rest:string }
// type matchResults  = matchResult[]

// type strMatch = (s:string) => matchResult         //=> { ret:boolean , rest:string }
// type strMatches = (s:string) => matchResults      //=> { ret:boolean , rest:string }

// const r = (ret:boolean , rest:string ):matchResult => ({ ret:ret , rest:rest}) 

// const isMatchDot:strMatch = (s) =>   s.length > 0 ? r(true, s.substring(1,s.length) ) : r(false,s)
// const isMatchesDot:strMatches = (s) => [isMatchDot(s)]

// const getMatchChar = ( c:string ):strMatch  => (s) => s.length >= c.length && s.substring( 0, c.length ) == c ? r(true, s.substring( c.length, s.length) ) : r(false,s)
// const getMatchesChar = ( c:string ):strMatches  => (s) => [ getMatchChar(c)(s) ]

// const getZeroOrSome = ( matcher:strMatch ):strMatch => (s) => 
//     [...Array( s.length ).keys()].reduce(
//         ( ac, i ) => { 
//             //console.log( ac )
//             return ac.more 
//                 ? ( (x) => x.ret ? ({ ret:x, more:true }) : ({ ret:ac.ret , more:false })  ) ( matcher(ac.ret.rest ) )
//                 : ac 
//         }                
//         ,({ ret:r(true,s), more:true  })   
//     ).ret  

// const getZeroOrSomeMatches = ( matcher:strMatch ):strMatches => (s) => 
//     [...Array( s.length ).keys()].reduce(
//         ( ac, i ) => { 
//             //console.log( ac )
//             return ac.more 
//                 ?  ( res =>  ({ ret: ac.ret.concat(res) , more: !!res.length  })  )(  ac.ret.map( rs => matcher( rs.rest ) ).filter( x => x.ret)  ) 
//                 : ac 
//         }                
//         ,({ ret: [ r(true,s) ]  , more:true  })   
//     ).ret  

// const mapend = ()



// const isMatch = (s: string, p: string): boolean => {
//     //p = "a*a."
//     //s = "aaa"
    
//     const res = p.split('').reduce(
//         ( ac, x ) => {
//             console.log(`${!!ac.prev } ${ac.ret.rest } ${x}`)  //${!!ac.ret.rest }


//             return ac.prev 
//                 ? x == '*' 
//                     ? ({ ret: ac.ret.reduce(  (ac1, x1) => ac1.concat( getZeroOrSomeMatches( ac.prev )( x1.ret.rest ) )     , ac.ret  )     )          // getZeroOrSome( ac.prev )( ac.ret.rest )  , prev: undefined })


//                     : ({ ret: ac.prev( ac.ret.rest )  , prev:  x == '.' ?  isMatchDot : getMatchChar(x)   })  
//                 : x == '.' ? ({ ...ac , prev:isMatchDot }) : ({ ...ac , prev:getMatchChar(x) })
//         }        
//         ,({ ret:[ r( true, s ) ], prev:undefined  }) as { ret: matchResults , prev?:strMatch } 
//     )

//     const r2 = res.prev ? res.prev( res.ret.rest ) : res.ret
 
//     console.log(r2)

//     return r2.ret && r2.rest == ''

// };

