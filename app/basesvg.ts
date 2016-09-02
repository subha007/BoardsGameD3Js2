import { Helper } from './helper';
import { SvgElement } from './svgelements/svgelement';
import { CCPoint2D } from './dimensions/ccpoint2d';

export class SvgBase {
    // Dimensions
    public svgWidth: number = 500;
    public svgHeight: number = 500;

    // Styles
    public svgBorderColor: string = "#ffac39";
    public svgFill: string = "none";
    public svgBorderWidth: string = "3";

    // Local reference
    private helper: Helper = Helper.getInstance();

    // Flags
    public isLockSvgSize: boolean = true;

    constructor() { }

    private reloadPropertiesFromControls() {
        this.svgWidth = this.helper.getValueById("svgwidth", this.svgWidth);
        this.svgHeight = this.helper.getValueById("svgheight", this.svgHeight);
    }

    private reloadStyleFromControls() {
      this.svgBorderColor = this.helper.getValueById("svgbordercolor", this.svgBorderColor);
      this.svgFill = this.helper.getValueById("svgfill", this.svgFill);
      this.svgBorderWidth = this.helper.getValueById("svgborderwidth", this.svgBorderWidth);
    }

    private normalizeSvgArea() {
      this.svgWidth = this.svgHeight = Math.min(this.svgWidth, this.svgHeight);
    }

    public initialize() {
      this.reloadPropertiesFromControls();
      this.reloadStyleFromControls();
    }

    public normalize() {
      this.normalizeSvgArea();
    }

    public getRadialWidth() {
        return this.svgWidth / 2;
    }

    public getRadialHeight() {
        return this.svgHeight / 2;
    }

    public getCenter(): CCPoint2D {
        return new CCPoint2D(this.getRadialWidth(), this.getRadialHeight());
    }
}
