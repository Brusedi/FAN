var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Rslt = function (ret, rest) { return ({ ret: ret, rest: rest }); };
var Rslts = function (ret, rests) { return ({ ret: ret, rests: rests }); };
var RsltsEmpty = Rslts(false, []);
var setRes2lvl = function (ret, prev) { return ({ ret: ret, prev: prev }); };
var res2lvlEmpty = setRes2lvl(RsltsEmpty, undefined);
var addMatch = function (to, add) {
    return to.ret && add.ret
        ? __assign(__assign({}, to), { rests: to.rests.concat([add.rest]) }) : add.ret ? { ret: true, rests: [add.rest] } : to;
};
var concatMatch = function (to, add) {
    return to.ret && add.ret
        ? __assign(__assign({}, to), { rests: to.rests.concat(add.rests) }) : add.ret ? add : to;
};
var getMatcher = function (mtc) { return function (sx) { return sx.reduce(function (ac, s) { return addMatch(ac, mtc(s)); }, RsltsEmpty); }; };
var getMatcherFromMatches = function (mtc) { return function (sx) { return sx.reduce(function (ac, s) { return concatMatch(ac, mtc(s)); }, RsltsEmpty); }; };
/// 
var isMatchDot = function (s) { return s.length > 0 ? Rslt(true, s.substring(1, s.length)) : Rslt(false, s); };
var matcherDot = getMatcher(isMatchDot);
var getMatchChar = function (c) { return function (s) { return s.length >= c.length && s.substring(0, c.length) == c ? Rslt(true, s.substring(c.length, s.length)) : Rslt(false, s); }; };
var getMatcherChar = function (c) { return getMatcher(getMatchChar(c)); };
var getZeroOrSome = function (match) { return function (s) {
    return __spreadArray([], Array(s.length), true).map(function (_, i) { return i; }).reduce(function (ac, x) { return addMatch(ac, match(s.substring(x, s.length))); }, Rslts(true, [s]));
}; };
var getZeroOrSomeFromMatcher = function (match) { return function (s) {
    return __spreadArray([], Array(s.length), true).map(function (_, i) { return i; }).reduce(function (ac, x) { return concatMatch(ac, match([s.substring(x, s.length)])); }, Rslts(true, [s]));
}; };
var getZeroOrSomeMatcher = function (match) { return getMatcherFromMatches(getZeroOrSome(match)); };
var getZeroOrSomeFromMatcherMatcher = function (matcher) { return getMatcherFromMatches(getZeroOrSomeFromMatcher(matcher)); };
// console.log( getZeroOrSome( getMatchChar('c' ))( 'ccccc' ) )
// console.log( getZeroOrSomeMatcher( getMatchChar('c' ))(['ccccc'] ) )
// console.log( getZeroOrSomeFromMatcherMatcher( getMatcherChar('c') )(['ccccc'] ) ) 
var isMatch = function (s, p) {
    //     //p = "a*a."
    //     //s = "aaa"
    var res = p.split('').reduce(function (ac, x) {
        //console.log(`${ac.ret.rests } ` )
        return ac.prev
            ? x == '*'
                ? setRes2lvl(getZeroOrSomeFromMatcherMatcher(ac.prev)(ac.ret.rests), undefined)
                : setRes2lvl(ac.prev(ac.ret.rests), x == '.' ? matcherDot : getMatcherChar(x))
            : setRes2lvl(ac.ret, x == '.' ? matcherDot : getMatcherChar(x));
    }, setRes2lvl(Rslts(false, [s]), undefined));
    var r = res.prev ? res.prev(res.ret.rests) : res.ret;
    console.log(r);
    return r.ret && r.rests.indexOf('') >= 0;
};
console.log(isMatch("mississippi", "mis*is*p*."));
//console.log(isMatch( "aa", "a" ))
//console.log(isMatch( "aab", "c*a*b" ))
//isMatch( "aaa", "a*a" )
