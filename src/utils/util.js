import Store from "../store";
// import locale from '../locale/locale';

/**
 * Common tool methods
 */

/**
 * extend two objects
 * @param {Object } jsonbject1
 * @param {Object } jsonbject2
 */
function common_extend(jsonbject1, jsonbject2) {
  let resultJsonObject = {};

  for (let attr in jsonbject1) {
    resultJsonObject[attr] = jsonbject1[attr];
  }

  for (let attr in jsonbject2) {
    // undefined is equivalent to no setting
    if (jsonbject2[attr] == undefined) {
      continue;
    }
    resultJsonObject[attr] = jsonbject2[attr];
  }

  return resultJsonObject;
}

//获取数据类型
function getObjType(obj) {
  let toString = Object.prototype.toString;

  let map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };

  return map[toString.call(obj)];
}

//颜色 rgb转16进制
function rgbTohex(color) {
  let rgb;

  if (color.indexOf("rgba") > -1) {
    rgb = color
      .replace("rgba(", "")
      .replace(")", "")
      .split(",");
  } else {
    rgb = color
      .replace("rgb(", "")
      .replace(")", "")
      .split(",");
  }

  let r = parseInt(rgb[0]);
  let g = parseInt(rgb[1]);
  let b = parseInt(rgb[2]);

  let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

  return hex;
}

//列下标  字母转数字
function ABCatNum(a) {
  // return ret;
  if (a == null || a.length == 0) {
    return NaN;
  }
  var str = a.toLowerCase().split("");
  var num = 0;
  var al = str.length;
  var getCharNumber = function(charx) {
    return charx.charCodeAt() - 96;
  };
  var numout = 0;
  var charnum = 0;
  for (var i = 0; i < al; i++) {
    charnum = getCharNumber(str[i]);
    numout += charnum * Math.pow(26, al - i - 1);
  }
  // console.log(a, numout-1);
  if (numout == 0) {
    return NaN;
  }
  return numout - 1;
}

//列下标  数字转字母
function chatatABC(n) {
  var orda = "a".charCodeAt(0);
  var ordz = "z".charCodeAt(0);
  var len = ordz - orda + 1;
  var s = "";

  while (n >= 0) {
    s = String.fromCharCode((n % len) + orda) + s;

    n = Math.floor(n / len) - 1;
  }

  return s.toUpperCase();
}

/**
 * Common tool methods
 */
// replace temp ${xxx} to dataarry ,temp:String，This is html ，dataarry：an object{"xxx":"String for replace"}
// e.g.：luckysheet.replaceHtml("${image}",{"image":"abc","jskdjslf":"abc"})   ==>  abc
function replaceHtml(temp, dataarry) {
  return temp.replace(/\$\{([\w]+)\}/g, function(s1, s2) {
    let s = dataarry[s2];
    if (typeof s != "undefined") {
      return s;
    } else {
      return s1;
    }
  });
}

export {
  common_extend,
  getObjType,
  chatatABC,
  rgbTohex,
  ABCatNum,
  replaceHtml,
};
