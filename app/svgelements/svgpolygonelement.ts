import { SvgAttributes } from './svgattributes';

/**
  * Represents an <polygon> element in SVG
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'Polygon' represents tag name in SVG</li>
  * <li>The last part 'Element' represents type of XML tag</li></ul>
*/
export class SvgPolygonElement {

  /**
     * Represents the core attributes of <circle>
     * @type {SvgAttributes}
     * @public
     */
  public _attributes: SvgAttributes;

  /**
     * Creates an empty CircleElement object.
     * @class
     * <p>Represents a <svg> tag and its properties. A Board Game is always
     * rendered in svg. This element is used as the base container which
     * holds all other elemnts of a board game.</p>
     *
     * @constructor
     */
  constructor() {
    this._attributes = new SvgAttributes();
  }

  /**
     * Get the Basic Attributes attribute of the element
     * @type {Object}
     * @public
     */
  public get Attributes(): SvgAttributes { return this._attributes; }
}
