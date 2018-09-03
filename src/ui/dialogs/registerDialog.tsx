import * as React from 'react';
import { sendHttpRequest } from '../../logic/httpRequestManager';
import { messageToastManager } from "../../logic/messageToastManager";
import { DialogStateProps } from "./dialog";

interface RegisterProps extends DialogStateProps {
}

interface RegisterData {
    user: string;
    pwd: string;
}

export class RegisterDialog extends React.Component<RegisterProps, RegisterData> {

    constructor(props: RegisterProps) {
        super(props);

        this.state = { user: "", pwd: "" };
    }

    resetDialog() {
        this.setState({
            user: "",
            pwd: ""
        });
    }

    invokeRegistration() {
        sendHttpRequest("userManagement/registerUser", "post", { user: this.state.user, pwd: this.state.pwd }, (response) => {
            messageToastManager.showMessageToast(response.data, 1000);
            this.props.hide();
        });
    }

    render() {

        return <div className="formBox">
            <input onChange={
                event => {
                    const newValue = event.target.value;
                    this.setState({ user: newValue });
                }}>
            </input>
            <input type="password" onChange={
                event => {
                    const newValue = event.target.value;
                    this.setState({ pwd: newValue });
                }}
                onKeyDown={
                    event => {
                        // check if enter was hit
                        if (event.keyCode === 13) {
                            this.invokeRegistration();
                        }
                    }
                }
            />
            <div className="dialogButton pointer" onClick={this.invokeRegistration.bind(this)}>
                <i className="fa fa-arrow-right"></i>
                <div className="easyAdmin-navText">
                    Register
                </div>
            </div>
        </div>
    }
} 