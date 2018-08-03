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

    /**
     * returns the rendered UI of the loading adorner
    */
    // getView() {
    //     return this.ui;
    // }
}

export const loadingAdornerManager = new LoadingAdornerManager();
