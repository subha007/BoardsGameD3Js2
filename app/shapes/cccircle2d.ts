import { SvgCircleElement } from '../svgelements/svgcircleelement';
import { CCPoint2D } from '../dimensions/ccpoint2d';

/**
 * The main circle in a plane 2D surface
 * 
 * The naming convention used is as follows:
 * 1. The first letters 'CC' represents Cartesian Coordinates
 * 2. The next word 'Circle' represents the shape circle
 * 3. The last word represents the 2D plane system
 */
export class CCCircle2D {

    /**
     * The centre of the circle
     */
    public Origin: CCPoint2D;

    /**
     * The radius of the circle
     */
    public Radius: number;

    /**
     * The <circle> Svg element tag
     */
    public SvgElement: SvgCircleElement;

    /**
     * Basic constructor to initialize the data
     */
    constructor() {
        this.Origin = new CCPoint2D();
        this.Radius = 0;
    }
}