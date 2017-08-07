/* global goog fut $id */
goog.require('goog.dom')
goog.require('goog.events')
goog.require('goog.ui.HsvaPalette')

goog.provide('fut.colorPicker')

fut.colorPicker = function (el, onColorPicked) {
  var hsvaPalette = new goog.ui.HsvaPalette()
  hsvaPalette.render(el)

  goog.events.listen(hsvaPalette,
    goog.ui.Component.EventType.ACTION, function (ev) {
      var color = ev.target.getColorRgbaHex() || '#000000'
      onColorPicked(color, ev)
    })
}
goog.exportSymbol('fut.colorPicker', fut.colorPicker)
