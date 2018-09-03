import * as React from 'react';
import * as EventEmitter from 'EventEmitter3';

interface DialogProps {
    innerDialog: React.ReactElement<DialogStateProps>;
    eventEmitter: EventEmitter;
    dialogId: string;
}

interface DialogData {
    show: boolean;
}

export interface DialogStateProps {
    show?: () => void;
    hide?: () => void;
}

export class Dialog extends React.Component<DialogProps, DialogData> {

    constructor(props: DialogProps) {
        super(props);

        props.eventEmitter.addListener(`show_${this.props.dialogId}`, () => {
            this.showDialog();
        });

        props.eventEmitter.addListener(`hide_${this.props.dialogId}`, () => {
            this.hideDialog();
        });

        this.state = { show: false };
    }

    showDialog() {
        this.setState({
            show: true
        });
    }

    hideDialog() {
        this.setState({
            show: false
        });
    }

    render() {

        let className = "dialog show";

        if (!this.state.show) {
            className = "dialog hide";
        }

        return <div className={className}>
            <div className="dialogInner">
                {React.cloneElement(this.props.innerDialog, {
                    show: this.showDialog.bind(this),
                    hide: this.hideDialog.bind(this)
                })}
            </div>
        </div>
    }
} 