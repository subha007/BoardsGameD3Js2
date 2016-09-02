import { SvgPolygonElement } from '../svgelements/svgpolygonelement';

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
}