import {transform} from 'lodash'
import {ReactFreeStyle, create as _createStyler} from 'react-free-style'

interface Style {
  [index: string]: string | Number | Style
}

/**
 * Style processor function. Accepts a style as a js object, passes it through all our
 * postcss plugins, and returns the modified js object. Note that require() is used to
 * get around our lack of .d.ts files for these plugins.
 */
const processor: { (style: Style): Style } = require('postcss-js').sync([
  // require('precss'), TODO - this is causing a weird error by requiring .md files
  require('lost'),
  require('postcss-cssnext')
])

/**
 * Passes a JS object representing CSS through a PostCSS preprocessor pipeline.
 * Note that we wrap the style in a "&" selector, because some PostCSS plugins
 * crash when we have rules with no parent selector.
 * 
 * @export
 * @param {Style} style A JS object representing a single style
 * @returns {Style} processed version of style
 */
export function processStyle (style: Style): Style {
  return processor({ "&": style })
}

/**
 * Passes a JS object representing CSS through a PostCSS preprocessor pipeline.
 * Unlike processStyle, this does not wrap the style in a selector.
 * 
 * @export
 * @param {Style} style A JS object representing a single style
 * @returns {Style} processed version of style
 */
export function processRule (style: Style): Style {
  return processor(style)
}


/**
 * Accepts a Free Style object and a dict of styles. Each style is processed and then registered
 * with the provided styler. Input should be an object where keys are rules. The return value can
 * be used to apply classes in JSX.
 * 
 * @export
 * @param {ReactFreeStyle} styler object to call registerStyle on
 * @param {Dict<Style>} styles dict of rule objects
 * @returns {Dict<string>} map of input rules to generated classnames
 */
export function registerStyles (styler: ReactFreeStyle, styles: Dict<Style>): Dict<string> {
  return transform<Style, string>(styles,
    (result: Dict<string>, style: Style, className: string) => result[className] = styler.registerStyle(processStyle(style)),
    {})
}

/**
 * Re-export of ReactFreeStyle.create
 * 
 * @export
 * @returns {ReactFreeStyle} new style instance
 */
export function createStyler () {
  return _createStyler()
}