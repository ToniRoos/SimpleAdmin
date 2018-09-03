import * as React from 'react';
import { sendHttpRequest } from '../../logic/httpRequestManager';
import { messageToastManager } from "../../logic/messageToastManager";
import { DialogStateProps } from "./dialog";

interface LoginProps extends DialogStateProps {
}

interface LoginData {
    user: string;
    pwd: string;
}

export class LoginDialog extends React.Component<LoginProps, LoginData> {

    constructor(props: LoginProps) {
        super(props);

        this.state = { user: "", pwd: "" };
    }

    resetDialog() {
        this.setState({
            user: "",
            pwd: ""
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
                }}></input>
            <div className="dialogButton pointer" onClick={event => {

                sendHttpRequest("userManagement/verifyLogin", "post", { user: this.state.user, pwd: this.state.pwd }, (response) => {
                    messageToastManager.showMessageToast(response.data, 1000);
                    this.props.hide();
                });

            }}>
                <i className="fa fa-arrow-right"></i>
                <div className="easyAdmin-navText">
                    Login
                </div>
            </div>
        </div>
    }
} 