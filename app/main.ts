/// <reference path="../typings/declarations.d.ts" />
import { AbaloneBoard } from './abaloneboard';
import { ConfigLoader } from './common/config';

//declare let window: any;
// declare let module: any;
// declare let document: any;

export class Main {
    constructor() {
        console.log("Main called");
    }
}

let main = new Main();
var renderAbalone = new AbaloneBoard();
window.onload = () => {



    // export Class1 as entire module
    // if (typeof module != 'undefined')
    //     module.exports = renderAbalone;
    // else
    //     window.renderAbalone = renderAbalone;

    renderAbalone.initialize();
    renderAbalone.render();

    let config = ConfigLoader.getInstance();
};
