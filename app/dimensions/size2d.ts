/**
  * Represents size of a 2D shape in a plane
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'Size' represents the main class name</li>
  * <li>The last part '2D' represents that it is a plane or 2 Dimension</li></ul>
*/
export class Size2D {

  /**
     * Represents the width of a shape.
     * @type {number}
     * @public
     */
  public Width: number;

  /**
     * Represents the height of a shape.
     * @type {number}
     * @public
     */
  public Height: number;

  /**
     * Creates an empty Size object.
     * @class
     * <p>A point is the basic primitive notion on which Euclidean
     * Geometry is based. It is defined by axioms and do not have any dimensions.
     * In 2D plane a point is defined by an ordered pair (x, y) where first
     * number represents the horizontal and second represents vertical by
     * convention.</p>
     *
     * <p>Any Class containing dimension should reuse this class. For
     * example:</p>
     * <pre>
     * private _topLeft: Point;
     * </pre>
     * @constructor
     * @param {number=} width The width of the shape
     * @param {number=} height The height of the shape
     */
  constructor(width?: number, height?: number) {
    this.Width = width || 0;
    this.Height = height || 0;
  }
}
