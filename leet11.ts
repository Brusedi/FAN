//const rules:{[key:string]:number} = {  "I":1 , "V":5, "X":10, "L":50, "C":100, "D": 500,"M": 1000 } ;

type desc = { char:string ,val:number, gChar: string,  grade:number  } ;
const descs:desc[] = [
    { char:"I" , val:1, gChar:"I",  grade:3  }, 
    { char:"V" , val:5, gChar:"IV",  grade:9  }, 
    { char:"X" , val:10, gChar:"IX",  grade:40 }, 
    { char:"L" , val:50, gChar:"XL",  grade:90  }, 
    { char:"C" , val:100, gChar:"XC",  grade:400  }, 
    { char:"D" , val:500, gChar:"CD",  grade:900  }, 
    { char:"M" , val:1000, gChar:"CM",  grade:4000  }, 
] 
const dd = 
{
    ["I"]:1,
    ["IV"]:4,
    ["IX"]:9,
    ["X"]:10,
    ["XL"]:40,
    ["L"]:50,
    ["XC"]:90,
    ["C"]:100,
    ["CD"]:400,
    ["D"]:500,
    ["CM"]:900,
    ["M"]:1000,
}

function romanToInt(s: string): number {
    s.split('').reduce( (ac,x) => ( ac.p ? dd[(x + ac.p)]        : ({ p:x ,ret:ac.ret}) ) , ({p:"",ret:0}) )

};

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