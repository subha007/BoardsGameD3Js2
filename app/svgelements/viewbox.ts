/**
  * Represents the 'viewbox' attribute of <svg> element in SVG.
  * @interface
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'SVG' represents tag name in SVG</li>
  * <li>The second part 'ViewBox' represents attribute of XML tag</li></ul>
*/
export interface SvgViewBoxAttribute {
  X: number;
  Y: number;
  Width: number;
  Height: number;
}
