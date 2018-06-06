var type = require('../plugins/options-typography')

exports.simpleDesign = {
  colorBg: { a:1, r: 0, g: 0, b: 255 },
  colorText: { a:1, r: 255, g: 255, b: 255 },
  font: type.reglo,
  uppercase: true,
  hyphenate: false,
  scale: 30,
  spacing: 40,
}

exports.greenOne = {
  "colorBg": { "r": 0, "g": 131, "b": 87, "a": 1 },
  "colorText": { "r": 255, "g": 255, "b": 255, "a": 1 },
  "font": type.wremenaLight,
  "uppercase": false,
  "hyphenate": false,
  "scale": 42,
  "spacing": 30
}

exports.purpleExpanded = {
  "colorBg": { "r": 186, "g": 82, "b": 195, "a": 1 },
  "colorText": { "r": 255, "g": 255, "b": 255, "a": 1 },
  "font": type.lunchtype24MediumExpanded,
  "uppercase": false,
  "hyphenate": false,
  "scale": 32,
  "spacing": 10
}

exports.paper = {
  "colorBg": { "r": 231, "g": 231, "b": 231, "a": 1 },
  "colorText": { "r": 46, "g": 46, "b": 46, "a": 1 },
  "font": type.junicodeBoldCondensed,
  "uppercase": false,
  "hyphenate": true,
  "scale": 63,
  "spacing": 18
}

// red
exports.redone = {
  "colorBg": { "r": 255, "g": 205, "b": 205, "a": 1 },
  "colorText": { "r": 255, "g": 0, "b": 0, "a": 1 },
  "font": type.yatraRegular,
  "uppercase": false,
  "hyphenate": false,
  "scale": 32,
  "spacing": 41
}

exports.blueSerif = {
  "colorBg": { "r": 210, "g": 252, "b": 255, "a": 1 },
  "colorText": { "r": 0, "g": 8, "b": 255, "a": 1 },
  "font": type.sportingGrotesque,
  "uppercase": false,
  "hyphenate": false,
  "scale": 30,
  "spacing": 74
}

exports.authentic = {
  "colorBg": { "r": 170, "g": 170, "b": 170, "a": 1 },
  "colorText": { "r": 255, "g": 255, "b": 255, "a": 1 },
  "font": type.authenticSans,
  "uppercase": false,
  "hyphenate": false,
  "scale": 33,
  "spacing": 30
}

exports.punky = {
  "colorBg": { "r": 255, "g": 255, "b": 255, "a": 1 },
  "colorText": { "r": 255, "g": 83, "b": 177, "a": 1 },
  "font": type.jrugPunk,
  "uppercase": false,
  "hyphenate": false,
  "scale": 33,
  "spacing": 30
}

exports.fraktur = {
  "colorBg": { "r": 0, "g": 0, "b": 0, "a": 1 },
  "colorText": { "r": 255, "g": 255, "b": 255, "a": 1 },
  "font": type.unifrakturMaguntia,
  "uppercase": false,
  "hyphenate": false,
  "scale": 70,
  "spacing": 53
}

exports.spectral = {
  "colorBg": { "r": 255, "g": 218, "b": 218, "a": 1 },
  "colorText": { "r": 86, "g": 91, "b": 131, "a": 1 },
  "font": type.spectralExtraLight,
  "uppercase": false,
  "hyphenate": false,
  "scale": 46,
  "spacing": 72
}

exports.terminal = {
  "colorBg": {
    "r": 207,
    "g": 207,
    "b": 207,
    "a": 1
  },
  "colorText": {
    "r": 0,
    "g": 28,
    "b": 255,
    "a": 1
  },
  "font": type.terminalGrotesque,
  "uppercase": false,
  "hyphenate": false,
  "scale": 46,
  "spacing": 72
}

exports.curvyPurple = {
  "invert": true,
  "newTab": true,
  "autoDismiss": true,
  "colorBg": {
    "r": 245,
    "g": 245,
    "b": 245,
    "a": 1
  },
  "colorText": {
    "r": 100,
    "g": 0,
    "b": 255,
    "a": 1
  },
  "font": type.pecita,
  "uppercase": false,
  "hyphenate": false,
  "scale": 54,
  "spacing": 68
}
