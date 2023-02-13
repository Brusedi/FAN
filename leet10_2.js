var setRes2lvl = function (ret, prev) { return ({ ret: ret, prev: prev }); };
var dotMatcher = function (s, idx) { return idx > 0 ? ({ ret: true, rests: [idx - 1] }) : ({ ret: false, rests: [idx] }); };
var getCarMatcher = function (c) { return function (s, idx) {
    return c === s.slice(-idx, idx === 1 ? undefined : -idx + 1)
        ? ({ ret: true, rests: [idx - 1] })
        : ({ ret: false, rests: [idx] });
}; };
var getZeroOrSome = function (match) { return function (s, idx) {
    var ret = [idx];
    while (idx > 0 && match(s, idx).ret) {
        //ret.push(idx) 
        idx--;
        ret.push(idx);
    }
    return ({ ret: true, rests: ret });
}; };
var concatMatch = function (to, add) {
    return to.ret && add.ret
        ? ({ ret: true, rests: to.rests.concat(add.rests).filter(function (v, i, a) { return a.indexOf(v) === i; }) })
        : add.ret ? add : to;
};
var matchToMatcher = function (match) {
    return function (s, idx) { return idx.reduce(function (ac, i) { return concatMatch(ac, match(s, i)); }, ({ ret: false, rests: [] })); };
};
var isMatch = function (s, p) {
    var res = p.split('').reduce(function (ac, x) { return ac.prev
        ? x == '*'
            ? setRes2lvl(matchToMatcher(getZeroOrSome(ac.prev))(s, ac.ret.rests), undefined)
            : setRes2lvl(matchToMatcher(ac.prev)(s, ac.ret.rests), x == '.' ? dotMatcher : getCarMatcher(x))
        : setRes2lvl(ac.ret, x == '.' ? dotMatcher : getCarMatcher(x)); }, setRes2lvl(({ ret: false, rests: [s.length] }), undefined));
    var r = res.prev ? matchToMatcher(res.prev)(s, res.ret.rests) : res.ret;
    return r.ret && (r.rests.length == 0 || r.rests.indexOf(0) >= 0);
};
