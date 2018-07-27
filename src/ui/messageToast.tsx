import * as React from 'react';
import * as EventEmitter from 'EventEmitter3';

interface MessageToastProps {
    eventEmitter: EventEmitter;
}

interface MessageToastData {
    message?: string;
    timeout?: number;
    show: boolean;
}

export class MessageToast extends React.Component<MessageToastProps, MessageToastData> {

    constructor(props: MessageToastProps) {
        super(props);

        props.eventEmitter.addListener('showMessageEvent', (message: string, timeout?: number) => {
            this.showMessage(message, timeout);
        });

        this.state = { show: false, message: "" };
    }

    showMessage(message: string, timeout?: number) {
        this.setState({
            show: true,
            timeout: timeout,
            message: message
        });
    }

    render() {

        let className = "messageToast show";

        if (!this.state.show) {
            className = "messageToast hide";
        }

        if (this.state.message !== "") {
            window.setTimeout(() => {
                this.setState({
                    message: "",
                    timeout: 0,
                    show: false
                });
            }, this.state.timeout);
        }

        return <div className={className}>
            <div className="messageToastInner">
                {this.state.message}
            </div>
        </div>
    }
} 