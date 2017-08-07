#!/usr/bin/env bash

#
# Build the closure components
#

rm -f ./public/closure-components.js \
      ./public/closure-components.css

python2 ./node_modules/google-closure-library/closure/bin/build/closurebuilder.py \
    --root=./node_modules/google-closure-library/closure \
    --root=./node_modules/google-closure-library/third_party/closure \
    --root=./fut \
    --output_mode=compiled \
    --compiler_jar=./node_modules/google-closure-compiler/compiler.jar \
    --compiler_flags="--language_in ECMASCRIPT6 --language_out ECMASCRIPT5" \
    --compiler_flags="--compilation_level ADVANCED" \
    --namespace=fut.colorPicker \
    --namespace=fut.charPicker > ./public/closure-components.js


cat node_modules/google-closure-library/closure/goog/css/common.css \
    node_modules/google-closure-library/closure/goog/demos/css/demo.css \
    node_modules/google-closure-library/closure/goog/css/menubutton.css \
    node_modules/google-closure-library/closure/goog/css/charpicker.css \
    node_modules/google-closure-library/closure/goog/css/colorpicker-simplegrid.css \
    node_modules/google-closure-library/closure/goog/css/hsvapalette.css \
    | sed -e '/^@import/ d' > ./public/closure-components.css
