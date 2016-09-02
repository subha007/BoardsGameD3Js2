// declare var document: any;

export class Helper {
    private static _instance: Helper = new Helper();

    constructor() {
        if(Helper._instance){
            throw new Error("Error: Instantiation failed: Use Helper.getInstance() instead of new.");
        }
        Helper._instance = this;
    }

    public static getInstance(): Helper
    {
        return Helper._instance;
    }

    public getValueById(id: string, defaultval: any) {
      let ctrl: HTMLInputElement = (document == null)? null : <HTMLInputElement>document.getElementById(id);

      // Equivalent to if ( foo === null || foo === undefined )
      return (ctrl == null) ? defaultval : ctrl.value;
    }

    public getCheckedById(id: string, defaultval: any) {
      var ctrl: HTMLInputElement = (document == null)? null : <HTMLInputElement>document.getElementById(id);

      // Equivalent to if ( foo === null || foo === undefined )
      return (ctrl == null) ? defaultval : ctrl.checked;
    }
}
