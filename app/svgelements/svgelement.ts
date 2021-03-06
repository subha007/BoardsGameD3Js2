import { CCRectangle2D } from '../shapes/ccrectangle2d';
import { Size2D } from '../dimensions/size2d';
import { SvgAttributes } from './svgattributes';
import { SvgViewBoxAttribute } from './viewbox';

/**
  * Represents an <svg> element in SVG
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'SVG' represents tag name in SVG</li>
  * <li>The last part 'Element' represents type of XML tag</li></ul>
*/
export class SvgElement {

  /**
     * Represents the core attribute sof <svg>
     * @type {SvgAttributes}
     * @public
     */
  public Attributes: SvgAttributes;

  /**
     * Creates an empty SvgElement object.
     * @class
     * <p>Represents a <svg> tag and its properties. A Board Game is always
     * rendered in svg. This element is used as the base container which
     * holds all other elemnts of a board game.</p>
     *
     * <pre>
     * private _svg: SvgElement;
     * </pre>
     * @constructor
     */
  constructor() {
    this.Attributes = new SvgAttributes();
  }

  /**
     * Get or Set the 'viewbox' attribute of the element
     * @type {Object}
     * @public
     * @param viewBox the value of the viewBox property (can be empty)
     * @return Returns the saved value
     */
  public ViewBox(viewBox?: SvgViewBoxAttribute) : SvgViewBoxAttribute {
    return this.Attributes.Add("viewbox", viewBox);
  }
}
