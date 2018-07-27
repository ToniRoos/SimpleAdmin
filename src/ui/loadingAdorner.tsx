import * as React from 'react';
import * as EventEmitter from 'EventEmitter3';

interface LoadingAdornerProps {
    eventEmitter: EventEmitter;
}

interface LoadingAdornerStateData {
    show: boolean;
}

export class LoadingAdorner extends React.Component<LoadingAdornerProps, LoadingAdornerStateData> {

    constructor(props: LoadingAdornerProps) {
        super(props);

        props.eventEmitter.addListener('showLoadingAdornerEvent', () => {
            this.showLoadingAdorner();
        });

        props.eventEmitter.addListener('hideLoadingAdornerEvent', () => {
            this.hideLoadingAdorner();
        });

        this.state = { show: false };
    }

    showLoadingAdorner() {
        this.setState({ show: true });
    }

    hideLoadingAdorner() {
        this.setState({ show: false });
    }

    render() {

        let className = 'loadingAdorner';
        if (!this.state.show) {
            className += ' hide';
        }

        return <div className={className}>
            <div className="loadingAdornerInner">
                <i className="fa fa-spinner rotate fa-4x"></i>
            </div>
        </div>
    }
} 