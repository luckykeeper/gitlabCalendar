!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.GitlabActivityCalendar=e():t.GitlabActivityCalendar=e()}(self,(()=>(()=>{"use strict";var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{GitlabCalendar:()=>Zt,default:()=>te});const n={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function r(t){return(e={})=>{const n=e.width?String(e.width):t.defaultWidth;return t.formats[n]||t.formats[t.defaultWidth]}}const i={date:r({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:r({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:r({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},a={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function o(t){return(e,n)=>{let r;if("formatting"===(n?.context?String(n.context):"standalone")&&t.formattingValues){const e=t.defaultFormattingWidth||t.defaultWidth,i=n?.width?String(n.width):e;r=t.formattingValues[i]||t.formattingValues[e]}else{const e=t.defaultWidth,i=n?.width?String(n.width):t.defaultWidth;r=t.values[i]||t.values[e]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function s(t){return(e,n={})=>{const r=n.width,i=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],a=e.match(i);if(!a)return null;const o=a[0],s=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],u=Array.isArray(s)?function(t,e){for(let e=0;e<t.length;e++)if(t[e].test(o))return e}(s):function(t,e){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e].test(o))return e}(s);let c;return c=t.valueCallback?t.valueCallback(u):u,c=n.valueCallback?n.valueCallback(c):c,{value:c,rest:e.slice(o.length)}}}var u;const c={code:"en-US",formatDistance:(t,e,r)=>{let i;const a=n[t];return i="string"==typeof a?a:1===e?a.one:a.other.replace("{{count}}",e.toString()),r?.addSuffix?r.comparison&&r.comparison>0?"in "+i:i+" ago":i},formatLong:i,formatRelative:(t,e,n,r)=>a[t],localize:{ordinalNumber:(t,e)=>{const n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:o({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:o({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:o({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:o({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:o({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(u={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,e={})=>{const n=t.match(u.matchPattern);if(!n)return null;const r=n[0],i=t.match(u.parsePattern);if(!i)return null;let a=u.valueCallback?u.valueCallback(i[0]):i[0];return a=e.valueCallback?e.valueCallback(a):a,{value:a,rest:t.slice(r.length)}}),era:s({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:s({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:s({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:s({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:s({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let h={};function l(){return h}Math.pow(10,8);const d=6048e5,f=864e5;function m(t){const e=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===e?new t.constructor(+t):"number"==typeof t||"[object Number]"===e||"string"==typeof t||"[object String]"===e?new Date(t):new Date(NaN)}function p(t){const e=m(t);return e.setHours(0,0,0,0),e}function g(t){const e=m(t),n=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return n.setUTCFullYear(e.getFullYear()),+t-+n}function y(t,e){return t instanceof Date?new t.constructor(e):new Date(e)}function w(t){const e=m(t);return function(t,e){const n=p(t),r=p(e),i=+n-g(n),a=+r-g(r);return Math.round((i-a)/f)}(e,function(t){const e=m(t),n=y(t,0);return n.setFullYear(e.getFullYear(),0,1),n.setHours(0,0,0,0),n}(e))+1}function v(t,e){const n=l(),r=e?.weekStartsOn??e?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,i=m(t),a=i.getDay(),o=(a<r?7:0)+a-r;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}function b(t){return v(t,{weekStartsOn:1})}function _(t){const e=m(t),n=e.getFullYear(),r=y(t,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const i=b(r),a=y(t,0);a.setFullYear(n,0,4),a.setHours(0,0,0,0);const o=b(a);return e.getTime()>=i.getTime()?n+1:e.getTime()>=o.getTime()?n:n-1}function S(t){const e=m(t),n=+b(e)-+function(t){const e=_(t),n=y(t,0);return n.setFullYear(e,0,4),n.setHours(0,0,0,0),b(n)}(e);return Math.round(n/d)+1}function x(t,e){const n=m(t),r=n.getFullYear(),i=l(),a=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??i.firstWeekContainsDate??i.locale?.options?.firstWeekContainsDate??1,o=y(t,0);o.setFullYear(r+1,0,a),o.setHours(0,0,0,0);const s=v(o,e),u=y(t,0);u.setFullYear(r,0,a),u.setHours(0,0,0,0);const c=v(u,e);return n.getTime()>=s.getTime()?r+1:n.getTime()>=c.getTime()?r:r-1}function M(t,e){const n=m(t),r=+v(n,e)-+function(t,e){const n=l(),r=e?.firstWeekContainsDate??e?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,i=x(t,e),a=y(t,0);return a.setFullYear(i,0,r),a.setHours(0,0,0,0),v(a,e)}(n,e);return Math.round(r/d)+1}function D(t,e){return(t<0?"-":"")+Math.abs(t).toString().padStart(e,"0")}const P={y(t,e){const n=t.getFullYear(),r=n>0?n:1-n;return D("yy"===e?r%100:r,e.length)},M(t,e){const n=t.getMonth();return"M"===e?String(n+1):D(n+1,2)},d:(t,e)=>D(t.getDate(),e.length),a(t,e){const n=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(t,e)=>D(t.getHours()%12||12,e.length),H:(t,e)=>D(t.getHours(),e.length),m:(t,e)=>D(t.getMinutes(),e.length),s:(t,e)=>D(t.getSeconds(),e.length),S(t,e){const n=e.length,r=t.getMilliseconds();return D(Math.trunc(r*Math.pow(10,n-3)),e.length)}},k={G:function(t,e,n){const r=t.getFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){const e=t.getFullYear(),r=e>0?e:1-e;return n.ordinalNumber(r,{unit:"year"})}return P.y(t,e)},Y:function(t,e,n,r){const i=x(t,r),a=i>0?i:1-i;return"YY"===e?D(a%100,2):"Yo"===e?n.ordinalNumber(a,{unit:"year"}):D(a,e.length)},R:function(t,e){return D(_(t),e.length)},u:function(t,e){return D(t.getFullYear(),e.length)},Q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return D(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){const r=Math.ceil((t.getMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return D(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){const r=t.getMonth();switch(e){case"M":case"MM":return P.M(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){const r=t.getMonth();switch(e){case"L":return String(r+1);case"LL":return D(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(t,e,n,r){const i=M(t,r);return"wo"===e?n.ordinalNumber(i,{unit:"week"}):D(i,e.length)},I:function(t,e,n){const r=S(t);return"Io"===e?n.ordinalNumber(r,{unit:"week"}):D(r,e.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getDate(),{unit:"date"}):P.d(t,e)},D:function(t,e,n){const r=w(t);return"Do"===e?n.ordinalNumber(r,{unit:"dayOfYear"}):D(r,e.length)},E:function(t,e,n){const r=t.getDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){const i=t.getDay(),a=(i-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(a);case"ee":return D(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(i,{width:"short",context:"formatting"});default:return n.day(i,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){const i=t.getDay(),a=(i-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(a);case"cc":return D(a,e.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(i,{width:"narrow",context:"standalone"});case"cccccc":return n.day(i,{width:"short",context:"standalone"});default:return n.day(i,{width:"wide",context:"standalone"})}},i:function(t,e,n){const r=t.getDay(),i=0===r?7:r;switch(e){case"i":return String(i);case"ii":return D(i,e.length);case"io":return n.ordinalNumber(i,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){const r=t.getHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){const r=t.getHours();let i;switch(i=12===r?"noon":0===r?"midnight":r/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(i,{width:"narrow",context:"formatting"});default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},B:function(t,e,n){const r=t.getHours();let i;switch(i=r>=17?"evening":r>=12?"afternoon":r>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(i,{width:"narrow",context:"formatting"});default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){let e=t.getHours()%12;return 0===e&&(e=12),n.ordinalNumber(e,{unit:"hour"})}return P.h(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getHours(),{unit:"hour"}):P.H(t,e)},K:function(t,e,n){const r=t.getHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):D(r,e.length)},k:function(t,e,n){let r=t.getHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):D(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getMinutes(),{unit:"minute"}):P.m(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getSeconds(),{unit:"second"}):P.s(t,e)},S:function(t,e){return P.S(t,e)},X:function(t,e,n){const r=t.getTimezoneOffset();if(0===r)return"Z";switch(e){case"X":return T(r);case"XXXX":case"XX":return W(r);default:return W(r,":")}},x:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"x":return T(r);case"xxxx":case"xx":return W(r);default:return W(r,":")}},O:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+A(r,":");default:return"GMT"+W(r,":")}},z:function(t,e,n){const r=t.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+A(r,":");default:return"GMT"+W(r,":")}},t:function(t,e,n){return D(Math.trunc(t.getTime()/1e3),e.length)},T:function(t,e,n){return D(t.getTime(),e.length)}};function A(t,e=""){const n=t>0?"-":"+",r=Math.abs(t),i=Math.trunc(r/60),a=r%60;return 0===a?n+String(i):n+String(i)+e+D(a,2)}function T(t,e){return t%60==0?(t>0?"-":"+")+D(Math.abs(t)/60,2):W(t,e)}function W(t,e=""){const n=t>0?"-":"+",r=Math.abs(t);return n+D(Math.trunc(r/60),2)+e+D(r%60,2)}const N=(t,e)=>{switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}},O=(t,e)=>{switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}},C={p:O,P:(t,e)=>{const n=t.match(/(P+)(p+)?/)||[],r=n[1],i=n[2];if(!i)return N(t,e);let a;switch(r){case"P":a=e.dateTime({width:"short"});break;case"PP":a=e.dateTime({width:"medium"});break;case"PPP":a=e.dateTime({width:"long"});break;default:a=e.dateTime({width:"full"})}return a.replace("{{date}}",N(r,e)).replace("{{time}}",O(i,e))}},E=/^D+$/,Y=/^Y+$/,z=["D","DD","YY","YYYY"];function F(t){if(!(e=t,e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)||"number"==typeof t))return!1;var e;const n=m(t);return!isNaN(Number(n))}const q=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,j=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,H=/^'([^]*?)'?$/,L=/''/g,B=/[a-zA-Z]/;function G(t,e,n){const r=l(),i=n?.locale??r.locale??c,a=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,o=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=m(t);if(!F(s))throw new RangeError("Invalid time value");let u=e.match(j).map((t=>{const e=t[0];return"p"===e||"P"===e?(0,C[e])(t,i.formatLong):t})).join("").match(q).map((t=>{if("''"===t)return{isToken:!1,value:"'"};const e=t[0];if("'"===e)return{isToken:!1,value:Q(t)};if(k[e])return{isToken:!0,value:t};if(e.match(B))throw new RangeError("Format string contains an unescaped latin alphabet character `"+e+"`");return{isToken:!1,value:t}}));i.localize.preprocessor&&(u=i.localize.preprocessor(s,u));const h={firstWeekContainsDate:a,weekStartsOn:o,locale:i};return u.map((r=>{if(!r.isToken)return r.value;const a=r.value;return(!n?.useAdditionalWeekYearTokens&&function(t){return Y.test(t)}(a)||!n?.useAdditionalDayOfYearTokens&&function(t){return E.test(t)}(a))&&function(t,e,n){const r=function(t,e,n){const r="Y"===t[0]?"years":"days of the month";return`Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(t,e,n);if(console.warn(r),z.includes(t))throw new RangeError(r)}(a,e,String(t)),(0,k[a[0]])(s,a,i.localize,h)})).join("")}function Q(t){const e=t.match(H);return e?e[1].replace(L,"'"):t}function X(){}function V(t){return null==t?X:function(){return this.querySelector(t)}}function J(){return[]}function I(t){return function(e){return e.matches(t)}}var U=Array.prototype.find;function $(){return this.firstElementChild}var R=Array.prototype.filter;function K(){return Array.from(this.children)}function Z(t){return new Array(t.length)}function tt(t,e){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=e}function et(t,e,n,r,i,a){for(var o,s=0,u=e.length,c=a.length;s<c;++s)(o=e[s])?(o.__data__=a[s],r[s]=o):n[s]=new tt(t,a[s]);for(;s<u;++s)(o=e[s])&&(i[s]=o)}function nt(t,e,n,r,i,a,o){var s,u,c,h=new Map,l=e.length,d=a.length,f=new Array(l);for(s=0;s<l;++s)(u=e[s])&&(f[s]=c=o.call(u,u.__data__,s,e)+"",h.has(c)?i[s]=u:h.set(c,u));for(s=0;s<d;++s)c=o.call(t,a[s],s,a)+"",(u=h.get(c))?(r[s]=u,u.__data__=a[s],h.delete(c)):n[s]=new tt(t,a[s]);for(s=0;s<l;++s)(u=e[s])&&h.get(f[s])===u&&(i[s]=u)}function rt(t){return t.__data__}function it(t){return"object"==typeof t&&"length"in t?t:Array.from(t)}function at(t,e){return t<e?-1:t>e?1:t>=e?0:NaN}tt.prototype={constructor:tt,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,e){return this._parent.insertBefore(t,e)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var ot="http://www.w3.org/1999/xhtml";const st={svg:"http://www.w3.org/2000/svg",xhtml:ot,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function ut(t){var e=t+="",n=e.indexOf(":");return n>=0&&"xmlns"!==(e=t.slice(0,n))&&(t=t.slice(n+1)),st.hasOwnProperty(e)?{space:st[e],local:t}:t}function ct(t){return function(){this.removeAttribute(t)}}function ht(t){return function(){this.removeAttributeNS(t.space,t.local)}}function lt(t,e){return function(){this.setAttribute(t,e)}}function dt(t,e){return function(){this.setAttributeNS(t.space,t.local,e)}}function ft(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttribute(t):this.setAttribute(t,n)}}function mt(t,e){return function(){var n=e.apply(this,arguments);null==n?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,n)}}function pt(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function gt(t){return function(){this.style.removeProperty(t)}}function yt(t,e,n){return function(){this.style.setProperty(t,e,n)}}function wt(t,e,n){return function(){var r=e.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,n)}}function vt(t){return function(){delete this[t]}}function bt(t,e){return function(){this[t]=e}}function _t(t,e){return function(){var n=e.apply(this,arguments);null==n?delete this[t]:this[t]=n}}function St(t){return t.trim().split(/^|\s+/)}function xt(t){return t.classList||new Mt(t)}function Mt(t){this._node=t,this._names=St(t.getAttribute("class")||"")}function Dt(t,e){for(var n=xt(t),r=-1,i=e.length;++r<i;)n.add(e[r])}function Pt(t,e){for(var n=xt(t),r=-1,i=e.length;++r<i;)n.remove(e[r])}function kt(t){return function(){Dt(this,t)}}function At(t){return function(){Pt(this,t)}}function Tt(t,e){return function(){(e.apply(this,arguments)?Dt:Pt)(this,t)}}function Wt(){this.textContent=""}function Nt(t){return function(){this.textContent=t}}function Ot(t){return function(){var e=t.apply(this,arguments);this.textContent=null==e?"":e}}function Ct(){this.innerHTML=""}function Et(t){return function(){this.innerHTML=t}}function Yt(t){return function(){var e=t.apply(this,arguments);this.innerHTML=null==e?"":e}}function zt(){this.nextSibling&&this.parentNode.appendChild(this)}function Ft(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function qt(t){return function(){var e=this.ownerDocument,n=this.namespaceURI;return n===ot&&e.documentElement.namespaceURI===ot?e.createElement(t):e.createElementNS(n,t)}}function jt(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function Ht(t){var e=ut(t);return(e.local?jt:qt)(e)}function Lt(){return null}function Bt(){var t=this.parentNode;t&&t.removeChild(this)}function Gt(){var t=this.cloneNode(!1),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function Qt(){var t=this.cloneNode(!0),e=this.parentNode;return e?e.insertBefore(t,this.nextSibling):t}function Xt(t){return function(){var e=this.__on;if(e){for(var n,r=0,i=-1,a=e.length;r<a;++r)n=e[r],t.type&&n.type!==t.type||n.name!==t.name?e[++i]=n:this.removeEventListener(n.type,n.listener,n.options);++i?e.length=i:delete this.__on}}}function Vt(t,e,n){return function(){var r,i=this.__on,a=function(t){return function(e){t.call(this,e,this.__data__)}}(e);if(i)for(var o=0,s=i.length;o<s;++o)if((r=i[o]).type===t.type&&r.name===t.name)return this.removeEventListener(r.type,r.listener,r.options),this.addEventListener(r.type,r.listener=a,r.options=n),void(r.value=e);this.addEventListener(t.type,a,n),r={type:t.type,name:t.name,value:e,listener:a,options:n},i?i.push(r):this.__on=[r]}}function Jt(t,e,n){var r=pt(t),i=r.CustomEvent;"function"==typeof i?i=new i(e,n):(i=r.document.createEvent("Event"),n?(i.initEvent(e,n.bubbles,n.cancelable),i.detail=n.detail):i.initEvent(e,!1,!1)),t.dispatchEvent(i)}function It(t,e){return function(){return Jt(this,t,e)}}function Ut(t,e){return function(){return Jt(this,t,e.apply(this,arguments))}}Mt.prototype={add:function(t){this._names.indexOf(t)<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var e=this._names.indexOf(t);e>=0&&(this._names.splice(e,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var $t=[null];function Rt(t,e){this._groups=t,this._parents=e}Rt.prototype=function(){return new Rt([[document.documentElement]],$t)}.prototype={constructor:Rt,select:function(t){"function"!=typeof t&&(t=V(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var a,o,s=e[i],u=s.length,c=r[i]=new Array(u),h=0;h<u;++h)(a=s[h])&&(o=t.call(a,a.__data__,h,s))&&("__data__"in a&&(o.__data__=a.__data__),c[h]=o);return new Rt(r,this._parents)},selectAll:function(t){t="function"==typeof t?function(t){return function(){return null==(e=t.apply(this,arguments))?[]:Array.isArray(e)?e:Array.from(e);var e}}(t):function(t){return null==t?J:function(){return this.querySelectorAll(t)}}(t);for(var e=this._groups,n=e.length,r=[],i=[],a=0;a<n;++a)for(var o,s=e[a],u=s.length,c=0;c<u;++c)(o=s[c])&&(r.push(t.call(o,o.__data__,c,s)),i.push(o));return new Rt(r,i)},selectChild:function(t){return this.select(null==t?$:function(t){return function(){return U.call(this.children,t)}}("function"==typeof t?t:I(t)))},selectChildren:function(t){return this.selectAll(null==t?K:function(t){return function(){return R.call(this.children,t)}}("function"==typeof t?t:I(t)))},filter:function(t){"function"!=typeof t&&(t=function(t){return function(){return this.matches(t)}}(t));for(var e=this._groups,n=e.length,r=new Array(n),i=0;i<n;++i)for(var a,o=e[i],s=o.length,u=r[i]=[],c=0;c<s;++c)(a=o[c])&&t.call(a,a.__data__,c,o)&&u.push(a);return new Rt(r,this._parents)},data:function(t,e){if(!arguments.length)return Array.from(this,rt);var n,r=e?nt:et,i=this._parents,a=this._groups;"function"!=typeof t&&(n=t,t=function(){return n});for(var o=a.length,s=new Array(o),u=new Array(o),c=new Array(o),h=0;h<o;++h){var l=i[h],d=a[h],f=d.length,m=it(t.call(l,l&&l.__data__,h,i)),p=m.length,g=u[h]=new Array(p),y=s[h]=new Array(p);r(l,d,g,y,c[h]=new Array(f),m,e);for(var w,v,b=0,_=0;b<p;++b)if(w=g[b]){for(b>=_&&(_=b+1);!(v=y[_])&&++_<p;);w._next=v||null}}return(s=new Rt(s,i))._enter=u,s._exit=c,s},enter:function(){return new Rt(this._enter||this._groups.map(Z),this._parents)},exit:function(){return new Rt(this._exit||this._groups.map(Z),this._parents)},join:function(t,e,n){var r=this.enter(),i=this,a=this.exit();return"function"==typeof t?(r=t(r))&&(r=r.selection()):r=r.append(t+""),null!=e&&(i=e(i))&&(i=i.selection()),null==n?a.remove():n(a),r&&i?r.merge(i).order():i},merge:function(t){for(var e=t.selection?t.selection():t,n=this._groups,r=e._groups,i=n.length,a=r.length,o=Math.min(i,a),s=new Array(i),u=0;u<o;++u)for(var c,h=n[u],l=r[u],d=h.length,f=s[u]=new Array(d),m=0;m<d;++m)(c=h[m]||l[m])&&(f[m]=c);for(;u<i;++u)s[u]=n[u];return new Rt(s,this._parents)},selection:function(){return this},order:function(){for(var t=this._groups,e=-1,n=t.length;++e<n;)for(var r,i=t[e],a=i.length-1,o=i[a];--a>=0;)(r=i[a])&&(o&&4^r.compareDocumentPosition(o)&&o.parentNode.insertBefore(r,o),o=r);return this},sort:function(t){function e(e,n){return e&&n?t(e.__data__,n.__data__):!e-!n}t||(t=at);for(var n=this._groups,r=n.length,i=new Array(r),a=0;a<r;++a){for(var o,s=n[a],u=s.length,c=i[a]=new Array(u),h=0;h<u;++h)(o=s[h])&&(c[h]=o);c.sort(e)}return new Rt(i,this._parents).order()},call:function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this},nodes:function(){return Array.from(this)},node:function(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r=t[e],i=0,a=r.length;i<a;++i){var o=r[i];if(o)return o}return null},size:function(){let t=0;for(const e of this)++t;return t},empty:function(){return!this.node()},each:function(t){for(var e=this._groups,n=0,r=e.length;n<r;++n)for(var i,a=e[n],o=0,s=a.length;o<s;++o)(i=a[o])&&t.call(i,i.__data__,o,a);return this},attr:function(t,e){var n=ut(t);if(arguments.length<2){var r=this.node();return n.local?r.getAttributeNS(n.space,n.local):r.getAttribute(n)}return this.each((null==e?n.local?ht:ct:"function"==typeof e?n.local?mt:ft:n.local?dt:lt)(n,e))},style:function(t,e,n){return arguments.length>1?this.each((null==e?gt:"function"==typeof e?wt:yt)(t,e,null==n?"":n)):function(t,e){return t.style.getPropertyValue(e)||pt(t).getComputedStyle(t,null).getPropertyValue(e)}(this.node(),t)},property:function(t,e){return arguments.length>1?this.each((null==e?vt:"function"==typeof e?_t:bt)(t,e)):this.node()[t]},classed:function(t,e){var n=St(t+"");if(arguments.length<2){for(var r=xt(this.node()),i=-1,a=n.length;++i<a;)if(!r.contains(n[i]))return!1;return!0}return this.each(("function"==typeof e?Tt:e?kt:At)(n,e))},text:function(t){return arguments.length?this.each(null==t?Wt:("function"==typeof t?Ot:Nt)(t)):this.node().textContent},html:function(t){return arguments.length?this.each(null==t?Ct:("function"==typeof t?Yt:Et)(t)):this.node().innerHTML},raise:function(){return this.each(zt)},lower:function(){return this.each(Ft)},append:function(t){var e="function"==typeof t?t:Ht(t);return this.select((function(){return this.appendChild(e.apply(this,arguments))}))},insert:function(t,e){var n="function"==typeof t?t:Ht(t),r=null==e?Lt:"function"==typeof e?e:V(e);return this.select((function(){return this.insertBefore(n.apply(this,arguments),r.apply(this,arguments)||null)}))},remove:function(){return this.each(Bt)},clone:function(t){return this.select(t?Qt:Gt)},datum:function(t){return arguments.length?this.property("__data__",t):this.node().__data__},on:function(t,e,n){var r,i,a=function(t){return t.trim().split(/^|\s+/).map((function(t){var e="",n=t.indexOf(".");return n>=0&&(e=t.slice(n+1),t=t.slice(0,n)),{type:t,name:e}}))}(t+""),o=a.length;if(!(arguments.length<2)){for(s=e?Vt:Xt,r=0;r<o;++r)this.each(s(a[r],e,n));return this}var s=this.node().__on;if(s)for(var u,c=0,h=s.length;c<h;++c)for(r=0,u=s[c];r<o;++r)if((i=a[r]).type===u.type&&i.name===u.name)return u.value},dispatch:function(t,e){return this.each(("function"==typeof e?Ut:It)(t,e))},[Symbol.iterator]:function*(){for(var t=this._groups,e=0,n=t.length;e<n;++e)for(var r,i=t[e],a=0,o=i.length;a<o;++a)(r=i[a])&&(yield r)}};var Kt=function(){return Kt=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t},Kt.apply(this,arguments)},Zt=function(){function t(t,e,n){var r=this;this._daySizeWithSpace=0,this._millisecondsPerDay=864e5,this._defaultOptions={daySize:15,hintText:"Issues, merge requests, pushes, and comments.",daySpace:1,utcOffset:0,dayTitles:{monday:"M",wednesday:"W",friday:"F",saturday:"S",sunday:"S"},monthsAgo:12,monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],inputFormat:"yyyy-MM-dd",weekdayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],legendValues:[{title:"No contributions",min:0},{title:"1-9 contributions",min:1},{title:"10-19 contributions",min:10},{title:"20-29 contributions",min:20},{title:"30+ contributions",min:30}],firstDayOfWeek:0,tooltipDateFormat:"MMM d, yyyy",tooltipFormatter:function(t,e,n){var r="No contributions";return t>0&&(r=1===t?"1 contribution":"".concat(t," contributions")),"".concat(r," on ").concat(e," ").concat(n)}},this.months=[],this.timestamps=[],this.options=this._defaultOptions,this.getDayName=function(t){return r.options.weekdayNames[t.getDay()]},this.getDayDifference=function(t,e){var n=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate()),i=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate());return Math.floor((i-n)/r._millisecondsPerDay)},this.getSystemDate=function(t){var e=new Date,n=0-e.getTimezoneOffset(),r=t/60;return e.setMinutes(e.getMinutes()-n+r),e},this.formatTooltipText=function(t){var e=t.date,n=t.count,i=new Date(e),a=r.getDayName(i),o=G(i,r.options.tooltipDateFormat);return r.options.tooltipFormatter(n,a,o)},this.getLevelFromContributions=function(t){if(t<=0)return 0;var e=r.options.legendValues.findIndex((function(e){var n=e.min;return t<n}));return e>=0?e-1:r.options.legendValues.length-1},this.options=Kt(Kt({},this._defaultOptions),n);var i=this.buildArrays(e);this._daySizeWithSpace=this.options.daySize+2*this.options.daySpace,this.svg=this.renderSvg(t,i),this.renderDays(),this.renderMonths(),this.renderDayTitles(),this.renderKey(),this.renderHint(),this.addTitles()}return t.prototype.buildArrays=function(t){var e=0,n=this.getSystemDate(this.options.utcOffset);n.setHours(0,0,0,0);var r=new Date(n);r.setMonth(n.getMonth()-this.options.monthsAgo);for(var i=this.getDayDifference(r,n),a=0;a<=i;a+=1){var o=new Date(r);o.setDate(o.getDate()+a);var s=o.getDay(),u=t[G(o,this.options.inputFormat)]||0;(s===this.options.firstDayOfWeek&&0!==a||0===a)&&(this.timestamps.push([]),e+=1),this.timestamps[e-1].push({count:u,date:o,day:s})}return e},t.prototype.getExtraWidthPadding=function(t){var e=0;return this.timestamps[t-1][0].date.getMonth()!==this.timestamps[t-2][0].date.getMonth()&&(e=6),e},t.prototype.renderSvg=function(t,e){var n=(e+1)*this._daySizeWithSpace+this.getExtraWidthPadding(e);return function(t){return"string"==typeof t?new Rt([[document.querySelector(t)]],[document.documentElement]):new Rt([[t]],$t)}(t).append("svg").attr("width",n).attr("height",167)},t.prototype.dayYPos=function(t){return this._daySizeWithSpace*((t+7-this.options.firstDayOfWeek)%7)},t.prototype.renderDays=function(){var t=this;this.svg.selectAll("g").data(this.timestamps).enter().append("g").attr("transform",(function(e,n){return e.forEach((function(e,r){if(0===r&&e.day===t.options.firstDayOfWeek){var i=e.date.getMonth(),a=t._daySizeWithSpace*n+1+t._daySizeWithSpace,o=t.months[t.months.length-1];(null==o||i!==o.month&&a-t._daySizeWithSpace!==o.x)&&t.months.push({month:i,x:a})}})),"translate(".concat(t._daySizeWithSpace*n+1+t._daySizeWithSpace,", 18)")})).selectAll("rect").data((function(t){return t})).enter().append("rect").attr("x","0").attr("y",(function(e){return t.dayYPos(e.day)})).attr("width",this.options.daySize).attr("height",this.options.daySize).attr("data-level",(function(e){return t.getLevelFromContributions(e.count)})).attr("title",(function(e){return t.formatTooltipText(e)}))},t.prototype.renderDayTitles=function(){var t=[{text:this.options.dayTitles.monday,y:29+this.dayYPos(1)},{text:this.options.dayTitles.wednesday,y:29+this.dayYPos(3)},{text:this.options.dayTitles.friday,y:29+this.dayYPos(5)}];1===this.options.firstDayOfWeek?t.push({text:this.options.dayTitles.sunday,y:29+this.dayYPos(7)}):6===this.options.firstDayOfWeek&&t.push({text:this.options.dayTitles.saturday,y:29+this.dayYPos(6)}),this.svg.append("g").selectAll("text").data(t).enter().append("text").attr("text-anchor","middle").attr("x",8).attr("y",(function(t){return t.y})).text((function(t){return t.text}))},t.prototype.renderMonths=function(){var t=this;this.svg.append("g").selectAll("text").data(this.months).enter().append("text").attr("x",(function(t){return t.x})).attr("y",10).text((function(e){return t.options.monthNames[e.month]}))},t.prototype.renderKey=function(){var t=this;this.svg.append("g").attr("transform","translate(18, ".concat(8*this._daySizeWithSpace+16,")")).selectAll("rect").data(this.options.legendValues).enter().append("rect").attr("width",this.options.daySize).attr("height",this.options.daySize).attr("x",(function(e,n){return t._daySizeWithSpace*n})).attr("y",0).attr("data-level",(function(t,e){return e})).attr("title",(function(t){return t.title}))},t.prototype.renderHint=function(){this.svg.append("g").attr("transform","translate(".concat(this.svg.property("width").baseVal.value,", ").concat(8*this._daySizeWithSpace+25,")")).append("text").attr("text-anchor","end").text(this.options.hintText)},t.prototype.addTitles=function(){this.svg.selectAll("rect").each((function(){var t,e=this;if(e){var n=document.createElementNS("http://www.w3.org/2000/svg","g"),r=e.getAttribute("title")||"",i=document.createElementNS("http://www.w3.org/2000/svg","title");null===(t=e.parentNode)||void 0===t||t.insertBefore(n,e),i.innerHTML=r,n.appendChild(i),n.appendChild(e)}}))},t}();const te=Zt;return e})()));
//# sourceMappingURL=index.js.map