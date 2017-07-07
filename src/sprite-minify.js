
const ss = require('./sprite')

function minifyColor (c) {
  if (c[0] === c[1] && c[2] === c[3] && c[4] === c[5]) return c[0] + c[2] + c[4]
  return c
}

function convertStateCharsToObject (achars) {
  var mid = 18
  return achars.map((ch) => {
    var r = {char: ch.char}
    r.x =  ch.x  || mid;
    r.y =  ch.y  || mid;
    r.sx = ch.sx || mid;
    r.sy = ch.sy || mid;
    r.r =  ch.r  || 0;
    r.sz = ch.sz || mid;
    r.c =  ch.color  || '#555';
    return r;
  })
}

function formatSpritesToIndexed (sprites) {
  var sprites0 = []
  var palette = {}
  var chars = {}
  var s0 = convertStateCharsToObject(sprites);
  console.warn('s0', s0);
  var palCount = 0
  var charCount = 0
  var i
  for (i = 0; i < s0.length; i += 1) {
    var s1 = Object.assign({}, s0[i])
    var c = s1.c.slice(1)
    if (typeof palette[c] === 'undefined') {
      palette[c] = palCount
      palCount += 1
    }
    s1.c = palette[c]
    if (typeof chars[s1.char] === 'undefined') {
      chars[s1.char] = charCount
      charCount += 1
    }
    s1.char = chars[s1.char]
    sprites0 = sprites0.concat(ss.parse(ss.stringify(s1)))
  }

  var res = {
    sprites: sprites0,
    pals: [],
    chars: []
  }
  var k1
  var pkeys = Object.keys(palette)
  console.warn('pkeys', pkeys)
  for (i = 0; i < pkeys.length; i += 1) {
    k1 = pkeys[i]
    res.pals[palette[k1]] = minifyColor(k1)
  }
  var ckeys = Object.keys(chars)
  for (i = 0; i < ckeys.length; i += 1) {
    k1 = ckeys[i]
    res.chars[chars[k1]] = k1
  }
  // var txt = 'chars:' + JSON.stringify(res.chars) + '\n' +
  //       'pal:' + JSON.stringify(res.pals) + '\n' +
  //       '"' + ss.spriteStringify(res.sprites) + '"'
  // elResultText.value = txt
  return res
}

function formatToJson (sprites) {
  var s1 = formatSpritesToIndexed(sprites)
  return {
    chars: s1.chars.join(''),
    pal: s1.pals.join('|'),
    sprites: ss.stringify(s1.sprites)
  }
}

module.exports = formatToJson;
