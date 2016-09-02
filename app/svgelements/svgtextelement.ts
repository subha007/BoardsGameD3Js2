import { SvgAttributes } from './svgattributes';

/**
  * Represents an <text> element in SVG
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'Text' represents tag name in SVG</li>
  * <li>The last part 'Element' represents type of XML tag</li></ul>
*/
export class SvgTextElement {

  /**
     * Represents the core attributes of <circle>
     * @type {SvgAttributes}
     * @public
     */
  public Attributes: SvgAttributes;

  /**
   * The actual text
   */
  public Value: string;

  /**
     * Creates an empty CircleElement object.
     * @class
     * <p>Represents a <svg> tag and its properties. A Board Game is always
     * rendered in svg. This element is used as the base container which
     * holds all other elemnts of a board game.</p>
     *
     * @constructor
     */
  constructor(value? : string) {
    this.Attributes = new SvgAttributes();

    this.Value = value;
  }
}
