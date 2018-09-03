import * as $ from "jquery";
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as EventEmitter from 'EventEmitter3';
import { Dialog } from '../ui/dialogs/dialog';

class DialogManager {

    ee = new EventEmitter();

    constructor() {
    }

    createDialog(innerDialog: React.ReactElement<any>, dialogId: string) {

        // create new div on body
        const dialog = document.createElement('div');
        dialog.id = dialogId;
        $("body").append(dialog);

        const ui = <Dialog dialogId={dialogId} innerDialog={innerDialog} eventEmitter={this.ee} />;
        ReactDom.render(ui, document.getElementById(dialogId));
    }

    showLoginDialog(dialogId: string, timeout?: number) {
        this.ee.emit(`show_${dialogId}`);

        if (timeout !== undefined) {
            window.setTimeout(() => {
                this.hideLoginDialog(dialogId);
            }, timeout);
        }
    }

    hideLoginDialog(dialogId: string) {
        this.ee.emit(`hide_${dialogId}`);
    }
}
export const dialogManager = new DialogManager();
