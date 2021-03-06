/// <reference path="../typings/modules/d3/index.d.ts"/>
import { SvgBase } from './basesvg';
import { Helper } from './helper';
import { SVGDocument } from './document/svg';
import { CCPolygon2D } from './shapes/ccpolygon2d';
import { CCCircle2D } from './shapes/cccircle2d';
import { SvgTextElement } from './svgelements/svgtextelement';
import { CCPoint2D } from './dimensions/ccpoint2d';
import { Size2D } from './dimensions/size2d';

//declare let d3: any;

/**
 * The main Abalone board game graphical representation with seperate parts
 * This uses different components to build the board and makes it configurable.
 * 
 * @author Subhadeep Niogi
 * @version 1.0
 * 
 */
export class AbaloneBoard {
	
  /**
   * The base svg area and its properties
   */
  public SvgArea = new SvgBase();

  /**
   * The outermost border of the board
   */
	public OuterBorder: CCPolygon2D;

  /**
   * The inner border of the border which holds all the parts
   */
	public InnerBorder: CCPolygon2D;

  /**
   * The actual places on the board which is used to place player's pieces and play
   */
  public CellsWherePiecesArePlaced: CCCircle2D[][];

  /**
   * The gap between each cell (Same as gap between the radial width)
   */
  public CellGap: number;

  /**
   * The pieces and their positions on the board
   * 1. The first index represents player Id
   * 2. The second and third index represents position (x, y)
   */
  public PiecesAllPerPlayer: CCCircle2D[][][];

  /**
   * Color of each player pieces
   */
  public PlayerPiecesColors: string[];

  /**
   * The position of the row index elements
   */
  public RowIndexTextPosition: CCPoint2D[];

  /**
   * The position of the column index elements
   */
  public ColumnIndexTextPosition: CCPoint2D[];

  /**
   * The text elements of the row positions
   */
  public RowIndexTextElements: SvgTextElement[];

  /**
   * The text elements of the row positions
   */
  public ColumnIndexTextElements: SvgTextElement[];

  /**
   * The X-Width and Y-Width unit used for measurement
   */
  public UnitMeasure: Size2D;

  /**
   * The number of cells in rows and columns
   */
  public CountCells: CCPoint2D;

  /**
   * The center of the abalone board
   */
  public Origin: CCPoint2D;

  // Local reference
  private helper: Helper = Helper.getInstance();

  /**
   * The main translation matrix used to manipulate the cells
   */
  private translationMatrix: CCPoint2D[][];

  /**
   * Initialize the object
   */
  constructor() {
      this.Origin = this.SvgArea.getCenter();

      this.OuterBorder = new CCPolygon2D();
      this.InnerBorder = new CCPolygon2D();

      this.CellsWherePiecesArePlaced = [];
      this.CellGap = 0;

      this.PiecesAllPerPlayer = [];
      this.PlayerPiecesColors = [];
      this.RowIndexTextPosition = [];
      this.ColumnIndexTextPosition = [];

      this.RowIndexTextElements = [];
      this.ColumnIndexTextElements = [];

      this.UnitMeasure = new Size2D();
      this.CountCells = new CCPoint2D();
  }

  /**
   * Get the count of circles per side
   */
  public getCirclesPerSide(): number {
    if(this.translationMatrix != null)
      if(this.translationMatrix[0] != null)
        return this.translationMatrix[0].length;
    
    return 0;
  }

  /**
   * Set the count of circles per side
   */
  public setCirclesPerSide(circlesPerSide: number) {
    this.calculateTranslationMatrix(circlesPerSide);
  }

  /**
   * Get the count of cells in a row
   */
  public getCellRows(): number {
    return 2 * this.getCirclesPerSide() - 1;
  }

  /**
   * Set the count of cells in a row
   */
  public setCellRows(rows: number) {
    let circlesPerSide = 0;

    // Number of rows has to be odd
    if(rows >= 0 && rows % 2 == 1) {
      circlesPerSide = (rows + 1) / 2;

      this.setCirclesPerSide(circlesPerSide);

      this.calculateUnitMeasure();
      this.calculateCircleCentres();
      this.calculateTextCentres();
    }
  }

  /**
   * Get the origin of the board game
   */
  public getOrigin(): CCPoint2D {
    return this.Origin;
  }

  /**
   * Set the origin of the abalone board
   */
  public setOrigin(x: number, y: number) {
    this.Origin = new CCPoint2D(x, y);

    this.calculateCircleCentres();
    this.calculateTextCentres();
  }

  /**
   * Get the border of the abalone board 
   */
  public getBorderBeam() {
    return this.OuterBorder.RadiusOutCircle - this.InnerBorder.RadiusOutCircle;
  }

  /**
   * Set the border beam
   */
  public setBorderBeam(borderWidth: number) {
    this.InnerBorder.setRadius(this.OuterBorder.RadiusOutCircle - borderWidth);

    this.calculateUnitMeasure();
    this.calculateCircleCentres();
    this.calculateTextCentres();
  }

  /**
   * Set the cell gap
   */
  public setCellGap(cellGap: number) {
    this.CellGap = cellGap;

    this.calculateCircleCentres();
  }

  /**
   * Calculate Unit measure
   */
  private calculateUnitMeasure() {
    this.UnitMeasure.Width = this.InnerBorder.RadiusOutCircle / (2 * (this.getCirclesPerSide() - 1) +
                      (1 / Math.sin(this.OuterBorder.ExternalAngleInRad)));
    this.UnitMeasure.Height = this.UnitMeasure.Width * Math.tan(this.OuterBorder.ExternalAngleInRad);
  }

  /**
   * Calculate the translation matrix
   */
  private calculateTranslationMatrix(circlesPerSide: number) {
      for (let y = (-1) * (circlesPerSide - 1), indx1 = 0;
              y <= (circlesPerSide - 1) ; ++y, indx1++) {

          let noOfCols = this.getCellRows() - Math.abs(y);
          let rowData: any[] = [];

          for (let x = (-1) * (noOfCols - 1), indx2 = 0;
                  x <= (noOfCols - 1) ; x += 2, indx2++) {
              rowData.push({ x: x, y: y });
          }

          this.translationMatrix.push(rowData);
      }
  }

  /**
   * Calculate the circle centers
   */
  private calculateCircleCentres() {
    let indexCell = 0;
    for (let x = 0; x < this.translationMatrix.length; x++) {

        let rowData: any[] = [];
        for (let y = 0; y < this.translationMatrix[x].length; y++) {

            rowData.push({
                cx: this.Origin.X + this.translationMatrix[x][y].X * this.UnitMeasure.Width,
                cy: this.Origin.Y + this.translationMatrix[x][y].Y * this.UnitMeasure.Height,
                r: this.UnitMeasure.Width - this.CellGap,
                cellIndex: indexCell++
            });
        }

        this.CellsWherePiecesArePlaced.push(rowData);
    }
  }

  private calculateTextCentres() {

    let circlesPerSide = this.getCirclesPerSide();

    // Get Row Numbers (Alphabets A to I) for top to bottom and left
    // X Axis is on the next/previous circle stop with the border into consideration
    // Y axis 'this.xUnit / 4' is to place the text at the center position when the y of translationMatrix is +ve
    // Else it seems to be out of place. hence it is placed slightly off the center by quarter of the xUnit
    for (var x = 0; x < this.CountCells.X; x++) {
        this.RowIndexTextPosition.push({
            X: this.Origin.X + this.translationMatrix[x][0].X * this.UnitMeasure.Width - 2 * this.UnitMeasure.Width,
            Y: this.Origin.Y + this.translationMatrix[x][0].Y * this.UnitMeasure.Height
        });
    }

    // Set the row text
    for(var x = 0; x < this.CountCells.X; ++x) {
      this.RowIndexTextElements.push(
          new SvgTextElement(String.fromCharCode('A'.charCodeAt(0) + x))
        );
    }

    // Calculate Column Ids
    // Top left start (Only Top portion)
    for(var y = 0; y < this.translationMatrix[0].length; ++y) {
      this.ColumnIndexTextPosition.push({
        X: this.Origin.X + this.translationMatrix[0][y].X * this.UnitMeasure.Width,
        Y: this.Origin.Y + this.translationMatrix[0][y].Y * this.UnitMeasure.Height - 2 * this.UnitMeasure.Width
      });
    }

    // Calculate Column Ids
    // Top left start (Only Top portion)
    for(var y = 0; y < this.translationMatrix[0].length; ++y) {
      this.ColumnIndexTextElements.push(
          new SvgTextElement(String(y))
        );
    }

    // Calculate remaining texts for columns
    // Top left start (Only Right portion)
    for(var x = 0; x < circlesPerSide; ++x) {
      this.ColumnIndexTextPosition.push({
        X: this.Origin.X + this.translationMatrix[x][this.translationMatrix[x].length - 1].X * this.UnitMeasure.Width + 2 * this.UnitMeasure.Width,
        Y: this.Origin.Y + this.translationMatrix[x][this.translationMatrix[x].length - 1].Y * this.UnitMeasure.Height
      });
    }

    for(var x = 1; x <= circlesPerSide; ++x) {
      this.ColumnIndexTextElements.push(
        new SvgTextElement(String(x))
      );
    }
  }

  // private calculatedFromVariables() {
  //     this.extAnglerad = Math.PI / this.edgeCount * 2;
  //     this.innerRadialLength = this.radialLength - this.borderBeam;
  //     this.xUnit = this.innerRadialLength / (2 * (this.circlesPerSide - 1) +
  //                     (1 / Math.sin(this.extAnglerad)));
  //     this.yUnit = this.xUnit * Math.tan(this.extAnglerad);
  //     this.cellRows = 2 * this.circlesPerSide - 1;
  //     this.cellCols = this.cellRows;
  //   }

  //   private reloadPropertiesFromControls() {
  //     this.circlesPerSide = parseInt(this.helper.getValueById("circlesPerSide", this.circlesPerSide), 10);
  //     this.borderBeam = this.helper.getValueById("borderbeam", this.borderBeam);
  //     this.radialLength = this.helper.getValueById("radialwidth", this.radialLength);
  //     this.cellGap = this.helper.getValueById("cellradiusgap", this.cellGap);
  //     this.isLockSvgSize = this.helper.getCheckedById("svgaspectratiocheck", this.isLockSvgSize);
  //     this.isLockSvgAbalone = this.helper.getCheckedById("svglockcalculatecheck", this.isLockSvgAbalone);
  //   }

    private reloadStyleFromControls() {
      this.outerBorderStroke = this.helper.getValueById("outerborderstroke", this.outerBorderStroke);
      this.outerBorderFill = this.helper.getValueById("outerborderfill", this.outerBorderFill);
      this.outerBorderStrokeWidth = this.helper.getValueById("outerborderstrokewidth", this.outerBorderStrokeWidth);
      this.cellBorderStroke = this.helper.getValueById("cellborderstroke", this.cellBorderStroke);
      this.cellBorderFill = this.helper.getValueById("cellborderfill", this.cellBorderFill);
      this.cellBorderStrokeWidth = this.helper.getValueById("cellborderstrokewidth", this.cellBorderStrokeWidth);
    }

    private calculatedFromVariables() {
      this.extAnglerad = Math.PI / this.edgeCount * 2;
      this.innerRadialLength = this.radialLength - this.borderBeam;
      this.xUnit = this.innerRadialLength / (2 * (this.circlesPerSide - 1) +
                      (1 / Math.sin(this.extAnglerad)));
      this.yUnit = this.xUnit * Math.tan(this.extAnglerad);
      this.cellRows = 2 * this.circlesPerSide - 1;
      this.cellCols = this.cellRows;
    }

    private calculatOuterHex() {
        for (var i = 0; i <= this.edgeCount; ++i) {
            this.outerHexVertices.push(this.origin.x
                        + this.radialLength * Math.cos((i) * this.extAnglerad));
            this.outerHexVertices.push(this.origin.y
                        + this.radialLength * Math.sin((i) * this.extAnglerad));
        }
    }

    private calculate2PlayerInitialMatrix() {

      // Player 1
      var x = 0;
      for(; x < this.circlesPerSide - 3; ++x) {
        for(var y = 0; y < this.translationMatrix[x].length; ++y) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 1});
        }
      }
      //last row
      if(this.circlesPerSide - 3 > 0) {
        for(var y = this.circlesPerSide - 3; y < this.circlesPerSide; ++y) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 1});
        }
      }

      // PLayer 2
      x = this.cellRows - 1;
      for(; x >= this.cellRows - (this.circlesPerSide - 3); --x) {
        for(var y = 0; y < this.translationMatrix[x].length; ++y) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 2});
        }
      }

      // Last row
      if(this.circlesPerSide - 3 > 0) {
        for(var y = this.circlesPerSide - 3; y < this.circlesPerSide; ++y) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 2});
        }
      }
    }

    private calculate3PlayerInitialMatrix() {

      var yextent = (((this.circlesPerSide % 2 !== 0)? this.circlesPerSide + 1 : this.circlesPerSide) - 4) / 2 + 1;

      // Player 1 (top left)
      for(var x = 0; x < this.circlesPerSide; ++x) {
        for(var y = 0; y < yextent; ++y) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 1});
        }
      }

      //Residue
      var county = yextent - 1;
      for(var x = this.circlesPerSide, count = 0; count < yextent; ++x, count++) {
        for(var y = 0; y < county; ++y) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 1});
        }
        county--;
      }

      // Player 2 (top right)
      for(var x = 0; x < this.circlesPerSide; ++x) {
        for(var y = this.translationMatrix[x].length - 1, count = 0; count < yextent; --y, count++) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 2});
        }
      }

      //Residue
      var county = yextent - 1;
      for(var x = this.circlesPerSide, count = 0; count < yextent; ++x, count++) {
        for(var y = this.translationMatrix[x].length - 1, indxy = 0; indxy < county; --y, indxy++) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 2});
        }
        county--;
      }

      // Player 3 (top right)
      for(var x = this.cellRows - 1, countx = 0; countx < yextent; --x, countx++) {
        for(var y = 0; y < this.translationMatrix[x].length; y++) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 2});
        }
      }

      //Residue
      var county = yextent - 1;
      for(var x = this.cellRows - 1, count = 0; count < yextent; --x, count++) {
        for(var y = this.translationMatrix[x].length - 1, indxy = 0; indxy < county; --y, indxy++) {
          this.playerPositionIndices.push({x: x, y: y, playerId: 2});
        }
        county--;
      }
    }

    private calculatePlayerInitialPositions() {
      for(var i = 0; i < this.playerPositionIndices.length; ++i) {
        this.playerPositionMatrix.push({
          cx: this.origin.x + this.translationMatrix[this.playerPositionIndices[i].x][this.playerPositionIndices[i].y].x * this.xUnit,
          cy: this.origin.y + this.translationMatrix[this.playerPositionIndices[i].x][this.playerPositionIndices[i].y].y * this.yUnit,
          r: this.xUnit - this.cellGap - 6,
          playerId: this.playerPositionIndices[i].player
        })
      }
    }

    private draw() {
        d3.select(".abalone").select("svg").remove();

        var svg = d3.select(".abalone").append("svg")
                    .attr("class", "svgview")
                    .attr("width", this.svg_area.svgWidth)
                    .attr("height", this.svg_area.svgHeight);

        var svgborder = svg.append("rect")
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("height", this.svg_area.svgHeight)
                            .attr("width", this.svg_area.svgWidth)
                            .style("stroke", this.svg_area.svgBorderColor)
                            .style("fill", this.svg_area.svgFill)
                            .style("stroke-width", this.svg_area.svgBorderWidth);

        var outerborder = svg.append("polygon")
                    .attr("class", "outerborder")
                    .attr("points", this.outerHexVertices.join())
                    .attr("stroke", this.outerBorderStroke)
                    .attr("fill", this.outerBorderFill)
                    .attr("stroke-width", this.outerBorderStrokeWidth);

        var cells = svg.append("g")
                       .selectAll("g")
                       .data(this.cellPositions)
                       .enter()
                       .append("g")
                       .selectAll("circle")
                       .data(function (d: any, i: any, j: any) { return d; })
                       .enter()
                       .append("circle")
                       ;
        var cellsattr = cells.attr("r", function (d: any) {
                                return d.r;
                            })
                             .attr("cx", function (d: any) {
                                 return d.cx;
                             })
                             .attr("cy", function (d: any) {
                                 return d.cy;
                             })
                             .attr("class", "cell")
                             .attr("stroke", this.cellBorderStroke)
                             .attr("fill", this.cellBorderFill)
                             .attr("stroke-width", this.cellBorderStrokeWidth);

         var playerPieces = svg.append("g")
                               .selectAll("g")
                               .data(this.playerPositionMatrix)
                               .enter()
                               .append("circle")
                               ;
         var playerPiecesAttr = playerPieces.attr("r", function (d: any) {
                                 return d.r;
                             })
                              .attr("cx", function (d: any) {
                                  return d.cx;
                              })
                              .attr("cy", function (d: any) {
                                  return d.cy;
                              })
                              .attr("class", "cell")
                              .attr("stroke", this.cellBorderStroke)
                              .attr("fill", "#00ffee")
                              .attr("stroke-width", this.cellBorderStrokeWidth)

                              ;

         var cellsIndices = svg.append("g")
                        .selectAll("g")
                        .data(this.cellPositions)
                        .enter()
                        .append("g")
                        .selectAll("text")
                        .data(function (d: any, i: any, j: any) { return d; })
                        .enter()
                        .append("text")
                        ;
         var cellsIndicesAttr = cellsIndices.attr("x", function(d: any) {
                                   return d.cx;
                               })
                               .attr("y", function(d: any) {
                                   return d.cy;
                               })
                               .text(function(d: any) {
                                   return d.cellIndex;
                               })
                               .attr("font-family", this.cellsIndexFont)
                               .attr("font-size", this.cellsIndexFontSize)
                               .attr("text-anchor", "middle")
                               .attr("alignment-baseline", "central")

                               ;

        var posTextList = svg.append("g").selectAll("text")
                         .data(this.positionText)
                         .enter()
                         .append("text")
                         ;
        var posText = posTextList.attr("x", function(d: any) {
                            return d.x;
                        })
                        .attr("y", function(d: any) {
                            return d.y;
                        })
                        .text(function(d: any) {
                            return d.value;
                        })
                        .attr("font-family", this.textBoardMarkerFont)
                        .attr("font-size", this.textBoardMarkerFontSize)
                        .attr("text-anchor", "middle")
                        .attr("alignment-baseline", "central")
                        ;


    }

    public initialize() {
        this.svg_area.initialize();

        if(this.isLockSvgSize === true)
          this.svg_area.normalize();

        this.origin = this.svg_area.getCenter();

        // Initialize AbaloneBoard
        this.reloadPropertiesFromControls();
        this.reloadStyleFromControls();
        this.calculatedFromVariables();
    }

    public render() {
        this.calculatOuterHex();
        this.calculateTranslationMatrix();
        this.calculateCircleCentres();
        this.calculateTextCentres();
        this.calculate3PlayerInitialMatrix();
        this.calculatePlayerInitialPositions();
        this.draw();
    }
}
 }
}
