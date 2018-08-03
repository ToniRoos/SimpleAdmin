import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as EventEmitter from 'EventEmitter3';
import * as $ from "jquery";
import { LoadingAdorner } from '../ui/loadingAdorner';

/**
 * Manages the appearance of an loading adorner
*/
class LoadingAdornerManager {

    ee = new EventEmitter();
    ui = <LoadingAdorner eventEmitter={this.ee} />;

    constructor() {

        const loadingAdorner = document.createElement('div');
        const loadingAdornerId = "loadingAdorner";
        loadingAdorner.id = loadingAdornerId;
        $("body").append(loadingAdorner);

        ReactDom.render(this.ui, document.getElementById(loadingAdornerId));
    }

    /**
     * shows the loading adorner
    */
    showLoadingAdorner() {
        this.ee.emit('showLoadingAdornerEvent');
    }

    /**
     * hides the loading adorner
    */
    hideLoadingAdorner() {
        this.ee.emit('hideLoadingAdornerEvent');
    }
<<<<<<< HEAD
=======

    /**
     * returns the rendered UI of the loading adorner
    */
    // getView() {
    //     return this.ui;
    // }
>>>>>>> d9c1d6647f94ed5b0f984beab3110560ec63e5f9
}

export const loadingAdornerManager = new LoadingAdornerManager();
