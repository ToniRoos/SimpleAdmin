import * as React from 'react';
import * as EventEmitter from 'EventEmitter3';
import { LoadingAdorner } from '../ui/loadingAdorner';

class LoadingAdornerManager {

    ee = new EventEmitter();
    ui = <LoadingAdorner eventEmitter={this.ee} />;

    constructor() {
    }

    showLoadingAdorner() {
        this.ee.emit('showLoadingAdornerEvent');
    }

    hideLoadingAdorner() {
        this.ee.emit('hideLoadingAdornerEvent');
    }

    getView() {
        return this.ui;
    }
}

export const loadingAdornerManager = new LoadingAdornerManager();
