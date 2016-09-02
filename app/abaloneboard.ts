/// <reference path="../typings/modules/d3/index.d.ts"/>
import { SvgBase } from './basesvg';
import { Helper } from './helper';
import { SVGDocument } from './document/svg';
import { CCPolygon2D } from './shapes/ccpolygon2d';

//declare let d3: any;

export class AbaloneBoard {
	
	private _outerBorder: CCPolygon2D;
	private _innerBorder: CCPolygon2D;

    // Private Composition
    private svg_area = new SvgBase();

    // Properties
    private edgeCount: number = 6;
    private circlesPerSide: number = 5;
    private borderBeam: number = 10;
    private radialLength: number = 210;
    private cellGap: number = 0;
    private isLockSvgSize: boolean = true;
    private isLockSvgAbalone: boolean = true;
    private cellRows: number = 0;
    private cellCols: number = 0;
    private xUnit: number = 0;
    private yUnit: number = 0;

    private outerBorderStroke: string = "#00c299";
    private outerBorderFill: string = "#00c299";
    private outerBorderStrokeWidth: string = "5";
    private cellBorderStroke: string = "black";
    private cellBorderFill: string = "#00c299";
    private cellBorderStrokeWidth: string = "5";
    private textBoardMarkerFont: string = "sans-serif";
    private textBoardMarkerFontSize: string = "12";
    private cellsIndexFont: string = "sans-serif";
    private cellsIndexFontSize: string = "12";

    // Manipulated
    private origin: any;

    private extAnglerad: number = 0;
    private innerRadialLength: number = 0;

    // temporary Private variables not to be exposed
    // Arrays
    private outerHexVertices: number[];
    private translationMatrix: any[];
    private cellPositions: any[];
    private positionText: any[];
    private cellIndices: any[];
    private playerPositionMatrix: any[];
    private playerPositionIndices: any[];

    // Local reference
    private helper: Helper = Helper.getInstance();

    constructor() {
        this.origin = this.svg_area.getCenter();

        this.outerHexVertices = [];
        this.translationMatrix = [];
        this.cellPositions = [];
        this.positionText = [];
        this.cellIndices = [];
        this.playerPositionMatrix = [];
        this.playerPositionIndices = [];
    }

    private reloadPropertiesFromControls() {
      this.circlesPerSide = parseInt(this.helper.getValueById("circlesPerSide", this.circlesPerSide), 10);
      this.borderBeam = this.helper.getValueById("borderbeam", this.borderBeam);
      this.radialLength = this.helper.getValueById("radialwidth", this.radialLength);
      this.cellGap = this.helper.getValueById("cellradiusgap", this.cellGap);
      this.isLockSvgSize = this.helper.getCheckedById("svgaspectratiocheck", this.isLockSvgSize);
      this.isLockSvgAbalone = this.helper.getCheckedById("svglockcalculatecheck", this.isLockSvgAbalone);
    }

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

    private calculateTranslationMatrix() {
        for (let y = (-1) * (this.circlesPerSide - 1), indx1 = 0;
                y <= (this.circlesPerSide - 1) ; ++y, indx1++) {

            let noOfCols = this.cellRows - Math.abs(y);
            let rowData: any[] = [];

            for (let x = (-1) * (noOfCols - 1), indx2 = 0;
                    x <= (noOfCols - 1) ; x += 2, indx2++) {
                rowData.push({ x: x, y: y });
            }

            this.translationMatrix.push(rowData);
        }
    }

    private calculateCircleCentres() {
      let indexCell = 0;
      for (let x = 0; x < this.translationMatrix.length; x++) {

          let rowData: any[] = [];
          for (let y = 0; y < this.translationMatrix[x].length; y++) {

              rowData.push({
                  cx: this.origin.x + this.translationMatrix[x][y].x * this.xUnit,
                  cy: this.origin.y + this.translationMatrix[x][y].y * this.yUnit,
                  r: this.xUnit - this.cellGap,
                  cellIndex: indexCell++
              });
          }

          this.cellPositions.push(rowData);
      }
    }

    private calculateTextCentres() {

        // Get Row Numbers (Alphabets A to I) for top to bottom and left
        // X Axis is on the next/previous circle stop with the border into consideration
        // Y axis 'this.xUnit / 4' is to place the text at the center position when the y of translationMatrix is +ve
        // Else it seems to be out of place. hence it is placed slightly off the center by quarter of the xUnit
        for (var x = 0; x < this.cellRows; x++) {
            this.positionText.push({
                x: this.origin.x + this.translationMatrix[x][0].x * this.xUnit - 2 * this.xUnit,
                y: this.origin.y + this.translationMatrix[x][0].y * this.yUnit ,
                value: String.fromCharCode('A'.charCodeAt(0) + x)
            });
        }

        // Calculate Column Ids
        // Top left start (Only Top portion)
        for(var y = 0; y < this.translationMatrix[0].length; ++y) {
          this.positionText.push({
            x: this.origin.x + this.translationMatrix[0][y].x * this.xUnit,
            y: this.origin.y + this.translationMatrix[0][y].y * this.yUnit - 2 * this.xUnit,
            value: y
          });
        }

        // Top left start (Only Right portion)
        for(var x = 0; x < this.circlesPerSide; ++x) {
          this.positionText.push({
            x: this.origin.x + this.translationMatrix[x][this.translationMatrix[x].length - 1].x * this.xUnit + 2 * this.xUnit,
            y: this.origin.y + this.translationMatrix[x][this.translationMatrix[x].length - 1].y * this.yUnit ,
            value: x + this.circlesPerSide
          });
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
