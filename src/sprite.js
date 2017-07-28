// Compile a sprite to and from an object
//
// Limitations:
//
// * All sizes are max. 35
// * Everything is an int
//
// TODO Opacity
// TODO Make it possible to use different modes: additive, exclusion + ...
// TODO interpret 4 and 8 chars as alpha color and 1 char as greyscale
// TODO Decouple
// TODO animate on properties accorfing to mode
// TODO Make sprite sheet
// TODO Skew gl viewport to make a glitch if the player is attacked / eats a
// mushroom
//
// anim: {
//   propIndex: 1,
//   min: 2,
//   max: 2,
//   step: 4
// }
//
// colors are an index innto a color array

// Characters integers

/**
* @param {string} ch
* @param {string} defaultValue
*
* @return {string}
*/
function intOfChar(ch, defaultValue) {
  return ch === ' ' ? defaultValue : parseInt(ch, 36);
}

function intToChar(int, prev) {
  if (typeof int !== 'number') int = prev;
  return int === prev ? ' ' : int.toString(36);
}

//
// The values in the char could select:
//
// bit0: draw as fill / stroke
// bit1: is a hitlayer / nothitlayer
// bit2: anim group 1
// bit3: anim group 2
// bit4: amim group 3

// Use 5 bits to get an LE array of numbers 0 = false and others true
function modeChar(v0, v1, v2, v3, v4) {
  return (v0 + (v1 && 2) + (v2 && 4) + (v3 && 8) + (v4 && 16)).toString(36);
}

function modeValue(ch) {
  var i = parseInt(ch, 36);
  return [i & 1, i & 2, i & 4, i & 8, i & 16];
}

function spriteStringifyOne(o, prev) {
  return [
    intToChar(o.char, prev.char),
    intToChar(o.x, prev.x),
    intToChar(o.y, prev.y),
    intToChar(o.c, prev.c),
    intToChar(o.sz, prev.sz),
    intToChar(o.r, prev.r),
    intToChar(o.sx, prev.sx),
    intToChar(o.sy, prev.sy),
    intToChar(o.mode, prev.mode),
  ].join('');
}

function spriteStringify(ss) {
  if (!Array.isArray(ss)) ss = [ss];
  if (!ss[0]) return;
  var res = [spriteStringifyOne(ss[0], {})];
  for (var i = 1; i < ss.length; i += 1) {
    var s1 = ss[i];
    res.push(spriteStringifyOne(s1, ss[i - 1]));
  }
  res = res.join('');
  return res;
}

function spriteParseOne(str, prev) {
  var result = {};
  result.char = intOfChar(str[0], prev.char);
  result.x = intOfChar(str[1], prev.x || 0, 36);
  result.y = intOfChar(str[2], prev.y || 0, 36);
  result.c = intOfChar(str[3], prev.c || 0, 36);
  result.sz = intOfChar(str[4], prev.sz || 18, 36);
  result.r = intOfChar(str[5], prev.r || 0, 36);
  result.sx = intOfChar(str[6], prev.sx || 1, 36);
  result.sy = intOfChar(str[7], prev.sy || 1, 36);
  result.mode = str[8]
    ? str[8] === '-' ? 'stroke' : 'fill'
    : prev.mode || 'fill';
  return result;
}

function splitAt(str, length) {
  var res = [];
  while (str.length > 0) {
    res.push(str.substr(0, length));
    str = str.substr(length);
  }
  return res;
}

// parse all sprite strings into an array of objects
function spriteParse(ss) {
  if (!ss) return '';
  if (!Array.isArray(ss)) ss = splitAt(ss, 9);
  var res = [spriteParseOne(ss[0], {})];
  for (var i = 1; i < ss.length; i += 1) {
    res.push(spriteParseOne(ss[i], res[i - 1]));
  }
  console.warn('spriteParse', ss, res);
  return res;
}

// Scale values in obj by divisor and set the values to ge between
// [-17; 18].  For example if divisor is 3 each of the range of 35 steps would
// be of value 35 / 3 ~= 11, i.e. [-5, 6]
function scale(obj, divisor) {
  var res = {};
  res.char = obj.char;
  res.c = obj.c;
  res.sz = obj.sz;
  res.r = obj.r;
  res.mode = obj.mode;
  res.x = (obj.x - 17) / divisor;
  res.y = (obj.y - 17) / divisor;
  res.sx = (obj.sx - 17) / divisor;
  res.sy = (obj.sy - 17) / divisor;
  return res;
}

// This is included in the client

/**
 * @param ctx The 2d canvas context
 * @param ss  An Array of sprite objects
 * @param cs  An array of chars to be index
 * @param ps  Palette array of colors
 * @param x   x coordinate where to print the sprite
 * @param y   y coordinate to printthe sprite at
 */
function spritePaint(ctx, cs, ps, ss, x, y) {
  if (!Array.isArray(ss)) ss = spriteParse(ss);
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  for (var i = 0; i < ss.length; i += 1) {
    var o = ss[i];
    var ox = o.x - 18;
    var oy = o.y - 18;
    // Scale up to 4,5 the original size
    var sx = (o.sx - 17) / 4;
    var sy = (o.sy - 17) / 4;
    var tx = (ox + x) / sx;
    var ty = (oy + y) / sy;
    ctx.save();
    ctx.font = o.sz + 'px arial';
    ctx.scale(sx, sy);
    // Rotate
    ctx.translate(tx, ty);
    ctx.rotate(Math.PI / 180 * (360 / 36) * o.r);
    ctx.translate(-tx, -ty);
    //    // @dev
    //    ctx.save();
    //    ctx.fillStyle = '#A11';
    //    ctx.fillRect(tx, ty, 1, 1);
    //    ctx.restore();
    //    // @end

    // XXX mode is fixed and borked
    // ctx[o.mode + 'Style'] = '#' + ps[o.c]
    // ctx[o.mode + 'Text'](cs[o.char], tx, ty)
    ctx['fillStyle'] = '#' + ps[o.c].slice(0, 6);
    ctx['fillText'](cs[o.char], tx, ty);
    ctx.restore();
  }
  ctx.restore();
}

// @dev
if (typeof module !== 'undefined') {
  module.exports = {
    stringify: spriteStringify,
    parse: spriteParse,
    paint: spritePaint,
  };
}
// @end
