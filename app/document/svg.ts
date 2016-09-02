import { SvgElement } from '../svgelements/svgelement';
import { CircleElement } from '../svgelements/circleelement';
import { TextElement } from '../svgelements/textelement';
import { PolygonElement } from '../svgelements/polygonelement';

/**
  * Represents SVg document
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'Text' represents tag name in SVG</li>
  * <li>The last part 'Element' represents type of XML tag</li></ul>
*/
export class SVGDocument {

  /**
     * Represents the core attributes of <circle>
     * @type {SvgAttributes}
     * @public
     */
  public _map: { [tagName: string] : any } = { };

  /**
     * Creates an empty SVGDocument object.
     * @class
     * <p>Represents a SVG Document</p>
     *
     * @constructor
     */
  constructor() { }

  /**
     * Get and set the tag of the element
     * @type {Object}
     * @public
     */
  private Tag(tag?: string, data?: any): any {
    if(tag && data === undefined) this._map[tag] = data;
    return this._map[tag];
  }

  /**
     * Get and set the svg tag
     * @type {Object}
     * @public
     */
  public Svg(svg?: SvgElement): SvgElement {
    return this.Tag("svg", svg);
  }

  /**
     * Get and set the circle tag
     * @type {Object}
     * @public
     */
  public Circle(circle?: CircleElement): CircleElement {
    return this.Tag("circle", circle);
  }

  /**
     * Get and set the circle tag
     * @type {Object}
     * @public
     */
  public Text(text?: TextElement): TextElement {
    return this.Tag("text", text);
  }

  /**
     * Get and set the polygon tag
     * @type {Object}
     * @public
     */
  public Polygon(polygon?: PolygonElement): PolygonElement {
    return this.Tag("polygon", polygon);
  }
}
