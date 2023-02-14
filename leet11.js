//const rules:{[key:string]:number} = {  "I":1 , "V":5, "X":10, "L":50, "C":100, "D": 500,"M": 1000 } ;
var _a;
var descs = [
    { char: "I", val: 1, gChar: "I", grade: 3 },
    { char: "V", val: 5, gChar: "IV", grade: 9 },
    { char: "X", val: 10, gChar: "IX", grade: 40 },
    { char: "L", val: 50, gChar: "XL", grade: 90 },
    { char: "C", val: 100, gChar: "XC", grade: 400 },
    { char: "D", val: 500, gChar: "CD", grade: 900 },
    { char: "M", val: 1000, gChar: "CM", grade: 4000 },
];
var dd = (_a = {},
    _a["I"] = 1,
    _a["IV"] = 4,
    _a["V"] = 5,
    _a["IX"] = 9,
    _a["X"] = 10,
    _a["XL"] = 40,
    _a["L"] = 50,
    _a["XC"] = 90,
    _a["C"] = 100,
    _a["CD"] = 400,
    _a["D"] = 500,
    _a["CM"] = 900,
    _a["M"] = 1000,
    _a);
var romanToInt = function (s) {
    return (function (x) { return x.prev ? x.ret + dd[x.prev] : x.ret; })(s.split('')
        .reduce(function (ac, x) {
        console.log("-> ".concat(x, "   ").concat(ac.prev + x, "  ").concat(dd[ac.prev + x], " / ").concat(ac.prev, "  ").concat(dd[ac.prev], " ret: ").concat(ac.ret, " "));
        return (!!ac.prev
            ? dd.hasOwnProperty(ac.prev + x)
                ? ({ prev: "", ret: ac.ret + dd[ac.prev + x] })
                : ({ prev: x, ret: ac.ret + dd[ac.prev] })
            : ({ prev: x, ret: ac.ret }));
    }, ({ prev: "", ret: 0 })));
};
(["LVIII"]).reduce(function (ac, x) { console.log(" ".concat(x, ", ").concat(romanToInt(x), " ")); return ""; }, ""); //console.log( ` ${x}, ${ romanToInt( x )} ` ) //"III", "IV" , "MCMXCIV" , 
// function intToRoman(num: number):string {
//     const repeat = ( ac:string , n:number ):string  => n < 1 ? '' : n < 2 ? ac : n < 3 ? ac+ac : n < 4 ? ac+ac+ac : n < 5 ? ac + ac + ac + ac : " "  
//     let ret  = '';
//     let r    = '';
//     while(num > 0) {
//         [ r, num ] =   
//             num <= 3    ? [ repeat( 'I' , num  ), 0 ] 
//                : num <  9    ? num < 5    ? [ "IV" , 0 ]                : [ "V" , num - 5 ]       
//                : num <  40   ? num < 10   ? [ "IV" , 0 ]                : [  repeat( 'X', Math.floor( num/10 ))  , num - Math.floor( num / 10) * 10  ]  
//                : num <  90   ? num < 50   ? [ "XL" ,  num - 40 ]        : [ "L", num - 50 ]
//                : num <  400  ? num < 100  ? [ "XC" ,  num - 90 ]        : [  repeat('C', Math.floor( num / 100 )), num - Math.floor( num / 100) * 100 ]
//                : num <  900  ? num < 500  ? [ "CD" ,  num - 400]        : [ 'D' , num - 500 ] 
//                : num <  4000 ? num < 1000 ? [ "CM" ,  num - 900]        : [ repeat('M', Math.floor( num/1000 )) , num -  Math.floor( num / 1000) * 1000 ]
//             : ["X3" , 0 ] 
//         ret += r;     
//     }
//     return ret
//  };
//  for(let i = 1; i<500; i++) {
//     console.log( `${intToRoman(i)} ${i}  `)
//  }        
