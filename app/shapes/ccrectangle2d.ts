import { CCPoint2D } from '../dimensions/ccpoint2d';
import { Size2D } from '../dimensions/size2d';

/**
  * Represents a 2D rectangle in a plane
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul><li>The first two letters 'CC' means 'Cartesian Coordinates'</li>
  * <li>Then 'Rectangle' represents the main class name</li>
  * <li>The last part '2D' represents that it is a plane or 2 Dimension</li></ul>
*/
export class CCRectangle2D {

  /**
     * Represents the top left corner 2D point of the rectangle.
     * @type {CCPoint2D}
     * @public
     */
  public TopLeft: CCPoint2D;

  /**
     * Represents the size of a 2D shape.
     * @type {CCPoint2D}
     * @public
     */
  public Size: Size2D;

  /**
     * Creates an empty Rectangle object.
     * @class
     * <p>A Rectangle is a quadrilateral with four right angles in Euclidean
     * Geometry.</p>
     *
     * <p>Any Class containing four sides should reuse this class. For
     * example:</p>
     * <pre>
     * private _board: CCRectangle2D;
     * </pre>
     * @constructor
     * @param {number=} x The X Coordinate of the top left corner
     * @param {number=} y The y Coordinate of the top left corner
     * @param {number=} width The width of the Rectangle
     * @param {number=} height The height of the Rectangle
     */
  constructor();
  constructor(x?: number, y?: number);
  constructor(x?: number, y?: number, width?: number, height?: number) {
    this.TopLeft = new CCPoint2D();
    this.Size = new Size2D();
    
    this.TopLeft.X = x || 0;
    this.TopLeft.Y = y || 0;
    this.Size.Width = width || 0;
    this.Size.Height = height || 0;
  }
}
