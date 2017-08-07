/* global goog $id fut */

// wrapped charPicker

goog.require('goog.dom')
goog.require('goog.events')
goog.require('goog.a11y.aria')
goog.require('goog.i18n.CharPickerData')
goog.require('goog.i18n.uChar.LocalNameFetcher')
goog.require('goog.ui.CharPicker')

goog.provide('fut.charPicker')

fut.charPicker = function (el, onCharPicked) {
  var charPicker = new goog.ui.CharPicker(
    new goog.i18n.CharPickerData(),
    new goog.i18n.uChar.LocalNameFetcher(),
    ['\uD869\uDED6', 'a', 'b', 'c'], 10, 1)

  charPicker.decorate(el)

  // Don't leak memory
  goog.events.listen(charPicker, 'action', function (e) {
    var ch = charPicker.getSelectedChar()
    onCharPicked(ch, e)
  })
}

goog.exportSymbol('fut.charPicker', fut.charPicker)
