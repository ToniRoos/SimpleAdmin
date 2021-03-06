import * as React from 'react';
import { ChangeStorage } from "../logic/changeStorage";
import { sendHttpRequest, ErrorData, Erros } from '../logic/httpRequestManager';
import { dialogManager } from "../logic/dialogManager";
import { messageToastManager } from '../logic/messageToastManager';
import { controlIds } from "../data/controlIds";

interface NavbarData {
    tags: HTMLElement[];
    changeStorage: ChangeStorage;
}

interface NavbarProps {
    changeStorage: ChangeStorage;
}

export class Navbar extends React.Component<NavbarData> {

    constructor(props: NavbarData) {
        super(props);
    }

    errorCallback(error: ErrorData) {
        if (error.errorCode === Erros.NO_USER_LOGGED_IN || error.errorCode === Erros.SESSION_TIMED_OUT) {
            dialogManager.showDialog(controlIds.loginDialog);
        }
    }

    render() {

        return <div className="easyAdmin-nav">

            <div className="easyAdmin-navItem pointer" onClick={event => {

                const changeStorage = this.props.changeStorage;
                if (changeStorage.noChanges()) return;

                const changedTags = changeStorage.getTags();
                sendHttpRequest("pageScanner", "post", {
                    page: location.pathname,
                    changedTags: changedTags.map(tag => {
                        const index = this.props.tags.indexOf(tag);
                        return {
                            index: index,
                            id: tag.id,
                            tagName: tag.tagName,
                            text: tag.innerHTML
                        }
                    })
                },
                    (parameter) => {
                        this.props.changeStorage.clearStorage();
                        messageToastManager.showMessageToast("Saved!", 3000);
                    },
                    this.errorCallback
                );
            }}>
                <i className="far fa-save fa-2x"></i>
                <div className="easyAdmin-navText">
                    Save
                </div>
            </div>

            <div className="flexGrowMax"></div>

            <div className="easyAdmin-navItem">

                <div className="easyAdmin-navText">
                    {this.props.tags.filter(element => element.tagName.match(/H\d/)).length}x
                </div>
                <i className="fas fa-heading fa-1-5x"></i>
                <div className="easyAdmin-navText">|</div>
                <div className="easyAdmin-navText">
                    {this.props.tags.filter(element => element.tagName.match(/A|P/)).length}x
                </div>
                <i className="fas fa-font fa-1-5x"></i>
            </div>

        </div>
    }
}