declare module 'window' {
  module window {}
}
declare let module: any;
//declare let document: any;
declare let d3: any;
declare let require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
//declare let console: any;
