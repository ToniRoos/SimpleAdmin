import * as React from 'react';
import * as EventEmitter from 'EventEmitter3';
import { MessageToast } from '../ui/messageToast';

class MessageToastManager {

    ee = new EventEmitter();
    ui = <MessageToast eventEmitter={this.ee} />;

    constructor() {
    }

    showMessageToast(message: string, timeout?: number) {

        if (timeout === undefined) {
            timeout = 5000;
        }

        this.ee.emit('showMessageEvent', message, timeout);
    }

    getView() {
        return this.ui;
    }
}

export const messageToastManager = new MessageToastManager();
