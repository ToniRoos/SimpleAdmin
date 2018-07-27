import * as React from 'react';
import { ChangeStorage } from "../logic/changeStorage";
import { sendHttpRequest } from '../logic/httpRequestManager';
import { loadingAdornerManager } from '../logic/loadingAdornerManager';
import { messageToastManager } from '../logic/messageToastManager';

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

    render() {

        return <div className="easyAdmin-nav">

            <div className="easyAdmin-navItem pointer" onClick={event => {

                const changeStorage = this.props.changeStorage;
                if (changeStorage.noChanges()) return;

                loadingAdornerManager.showLoadingAdorner();

                const changedTags = changeStorage.getTags();
                sendHttpRequest("pageScanner", "post", {
                    page: location.pathname,
                    textList: changedTags.map(tag => {
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
                        loadingAdornerManager.hideLoadingAdorner();

                        messageToastManager.showMessageToast("Saved!", 3000);
                    }
                );
            }}>
                <i className="fa fa-save fa-2x"></i>
                <div className="easyAdmin-navText">
                    Speichern
                </div>
            </div>

            <div className="flexGrowMax"></div>

            <div className="easyAdmin-navItem">
                <i className="fa fa-file fa-1-5x"></i>
                <div className="easyAdmin-navText">
                    {this.props.tags.filter(element => element.tagName.match(/H\d/)).length}        Überschriften gefunden
                    </div>

                <i className="fa fa-align-left fa-1-5x"></i>
                <div className="easyAdmin-navText">
                    {this.props.tags.filter(element => element.tagName.match(/A|P/)).length} Texte      gefunden
                    </div>
            </div>

        </div>
    }
}