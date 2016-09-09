/**
  * Represents an attribute of any <svg> element in SVG. This class is useful in
  * adding all attributes dynamically to an element.
  * @class
  * <p>The naming convention of the class is as follows:</p>
  * <ul>
  * <li>The 'SVG' represents tag name in SVG</li>
  * <li>The last part 'Attributes' represents attribute of XML tag</li></ul>
*/
export class SvgAttributes {

  /**
     * Represents a map data type
     * @type {SvgAttributes}
     * @public
     */
  private _map: { [keyName: string] : string } = { };

  /**
     * Creates an empty SvgAttributes object.
     * @class
     * <p>Represents a <svg> attribute and its properties. </p>
     *
     * <pre>
     * private _svgAttributes: SvgAttributes;
     * </pre>
     * @constructor
     */
  constructor() { }

  /**
     * Add an attribute and the value
     * @type {number}
     * @public
     * @param height the value of the id property (can be empty)
     * @return Returns the saved value
     */
  public Add(key?: string, value?: any) : any {
    if(key && value === undefined) this._map[key] = value;
    return this._map[key];
  }

  public getValue(key: string): any {
    return this._map[key];
  }

  /**
     * Get or Set the 'width' attribute of the element
     * @type {number}
     * @public
     * @param width The value of the width property (can be empty)
     * @return Returns the saved value
     */
  public Width(width?: number) : number {
    return this.Add("width", width);
  }

  /**
     * Get or Set the 'height' attribute of the element
     * @type {number}
     * @public
     * @param height the value of the height property (can be empty)
     * @return Returns the saved value
     */
  public Height(height?: number) : number {
    return this.Add("height", height);
  }

  /**
     * Get or Set the 'x' attribute of the element
     * @type {number}
     * @public
     * @param x the value of the x property (can be empty)
     * @return Returns the saved value
     */
  public X(x?: number) : number {
    return this.Add("x", x);
  }

  /**
     * Get or Set the 'y' attribute of the element
     * @type {number}
     * @public
     * @param y the value of the y property (can be empty)
     * @return Returns the saved value
     */
  public Y(y?: number) : number {
    return this.Add("y", y);
  }

  /**
     * Get or Set the 'id' attribute of the element
     * @type {string}
     * @public
     * @param id the value of the id property (can be empty)
     * @return Returns the saved value
     */
  public Id(id?: string) : string {
    return this.Add("id", id);
  }

  /**
     * Get or Set the 'xml:base' attribute of the element
     * @type {string}
     * @public
     * @param xmlBase the value of the xmlBase property (can be empty)
     * @return Returns the saved value
     */
  public XmlBase(xmlBase?: string) : string {
    return this.Add("xml:base", xmlBase);
  }

  /**
     * Get or Set the 'xml:space' attribute of the element
     * @type {string}
     * @public
     * @param xmlSpace the value of the xmlSpace property (can be empty)
     * @return Returns the saved value
     */
  public XmlSpace(xmlSpace?: string) : string {
    return this.Add("xml:base", xmlSpace);
  }

  /**
     * Get or Set the 'font-family' attribute of the element
     * @type {string}
     * @public
     * @param fontFamily the value of the fontFamily property (can be empty)
     * @return Returns the saved value
     */
  public FontFamily(fontFamily?: string) : string {
    return this.Add("font-family", fontFamily);
  }

  /**
     * Get or Set the 'font-style' attribute of the element
     * @type {string}
     * @public
     * @param fontStyle the value of the fontStyle property (can be empty)
     * @return Returns the saved value
     */
  public FontStyle(fontStyle?: string) : string {
    return this.Add("font-style", fontStyle);
  }

  /**
     * Get or Set the 'font-variant' attribute of the element
     * @type {string}
     * @public
     * @param fontVariant the value of the fontVariant property (can be empty)
     * @return Returns the saved value
     */
  public FontVariant(fontVariant?: string) : string {
    return this.Add("font-variant", fontVariant);
  }

  /**
     * Get or Set the 'font-weight' attribute of the element
     * @type {string}
     * @public
     * @param fontWeight the value of the fontWeight property (can be empty)
     * @return Returns the saved value
     */
  public FonWeight(fontWeight?: string) : string {
    return this.Add("font-weight", fontWeight);
  }

  /**
     * Get or Set the 'font-stretch' attribute of the element
     * @type {string}
     * @public
     * @param fontStretch the value of the fontStretch property (can be empty)
     * @return Returns the saved value
     */
  public FonStretch(fontStretch?: string) : string {
    return this.Add("font-size", fontStretch);
  }

  /**
     * Get or Set the 'font-size' attribute of the element
     * @type {string}
     * @public
     * @param fontSize the value of the fontSize property (can be empty)
     * @return Returns the saved value
     */
  public FontSize(fontSize?: string) : string {
    return this.Add("font-size", fontSize);
  }

  /**
     * Get or Set the 'fill' attribute of the element
     * @type {string}
     * @public
     * @param fill the value of the fill property (can be empty)
     * @return Returns the saved value
     */
  public Fill(fill?: string) : string {
    return this.Add("fill", fill);
  }

  /**
     * Get or Set the 'fill-opacity' attribute of the element
     * @type {string}
     * @public
     * @param fillOpacity the value of the fillOpacity property (can be empty)
     * @return Returns the saved value
     */
  public FillOpacity(fillOpacity?: string) : string {
    return this.Add("fill-opacity", fillOpacity);
  }
  
  /**
     * Get or Set the 'stroke' attribute of the element
     * @type {string}
     * @public
     * @param stroke the value of the stroke property (can be empty)
     * @return Returns the saved value
     */
  public Stroke(stroke?: string) : string {
    return this.Add("stroke", stroke);
  }
  
  /**
     * Get or Set the 'stroke-width' attribute of the element
     * @type {string}
     * @public
     * @param strokeWidth the value of the strokeWidth property (can be empty)
     * @return Returns the saved value
     */
  public StrokeWidth(strokeWidth?: string) : string {
    return this.Add("stroke-width", strokeWidth);
}
