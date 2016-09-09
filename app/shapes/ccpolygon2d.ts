import { SvgPolygonElement } from '../svgelements/svgpolygonelement';
import { Helper } from '../helper';

/**
  * Represents a 2D regular polygon in a plane
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul><li>The first two letters 'CC' means 'Cartesian Coordinates'</li>
  * <li>Then 'Polygon' represents the main class name</li>
  * <li>The last part '2D' represents that it is a plane or 2 Dimension</li></ul>
*/
export class CCPolygon2D {
	
	public EdgeCount: number;
	public RadiusOutCircle: number;
	public ExternalAngleInRad: number;
	public SvgElement: SvgPolygonElement;

	// Local reference
  	private helper: Helper = Helper.getInstance();
	
	constructor(edge?: number, radius?: number) {
		this.EdgeCount = edge;
		
		if(radius != null) {
			this.RadiusOutCircle = radius;
			this.Initialize();
		}
	}
	
	private Initialize() {
		this.ExternalAngleInRad = Math.PI / this.EdgeCount * 2;
	}

	/**
	 * Set the radius
	 */
	public setRadius(radius: number) {
		this.RadiusOutCircle = radius;
	}

	public getOuterBorder() {
		let outerBorder: string = this.helper.getValueById("outerborderstroke", this.SvgElement.Attributes.Stroke);
	}
}