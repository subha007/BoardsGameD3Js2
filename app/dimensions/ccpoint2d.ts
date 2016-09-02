/**
  * Represents a 2D point in a plane
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul><li>The first two letters 'CC' means 'Cartesian Coordinates'</li>
  * <li>Then 'Point' represents the main class name</li>
  * <li>The last part '2D' represents that it is a plane or 2 Dimension</li></ul>
*/
export class CCPoint2D {

  /**
     * Represents the X-Coordinate value of the point.
     * @type {number}
     * @public
     */
  public X: number;

  /**
     * Represents the y-Coordinate value of the point.
     * @type {number}
     * @public
     */
  public Y: number;

  /**
     * Creates an empty Point2D object.
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
     * private _topLeft: CCPoint2D;
     * </pre>
     * @constructor
     * @param {number=} x The X Coordinate of the point
     * @param {number=} y The y Coordinate of the point
     */
  constructor();
  constructor(x?: number, y?: number) {
    this.X = x || 0;
    this.Y = y || 0;
  }

}
