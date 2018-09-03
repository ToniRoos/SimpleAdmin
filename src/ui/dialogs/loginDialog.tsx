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

    invokeLogin() {
        sendHttpRequest("userManagement/verifyLogin", "post", { user: this.state.user, pwd: this.state.pwd }, (response) => {
            messageToastManager.showMessageToast(response.data, 1000);
            this.props.hide();
        });
    }

    componentDidMount() {
        document.getElementById("easyAdmin_login_user").focus();
    }

    render() {

        return <div className="formBox">
            <input id="easyAdmin_login_user" onChange={
                event => {
                    const newValue = event.target.value;
                    this.setState({ user: newValue });
                }}>
            </input>
            <input id="easyAdmin_login_pwd" type="password" onChange={
                event => {
                    const newValue = event.target.value;
                    this.setState({ pwd: newValue });
                }}
                onKeyDown={
                    event => {
                        // check if enter was hit
                        if (event.keyCode === 13) {
                            this.invokeLogin();
                        }
                    }
                }
            />
            <div className="dialogButton pointer" onClick={this.invokeLogin.bind(this)}>
                <i className="fa fa-arrow-right"></i>
                <div className="easyAdmin-navText">
                    Login
                </div>
            </div>
        </div>
    }
} 