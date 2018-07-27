import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as $ from "jquery";
import { Navbar } from './ui/navbar';
import { Popover } from './ui/popover';
import { loadingAdornerManager } from './logic/loadingAdornerManager';
import { messageToastManager } from './logic/messageToastManager';
import { setUnassignedIdTags } from './logic/idManager';
import { ChangeStorage } from "./logic/changeStorage";
import { sendHttpRequest } from './logic/httpRequestManager';
import './styles/main.scss';

//-------------------------//
//        Bootstrap        //
//-------------------------//

// add styles
var head = document.head;
var mainStylelink = document.createElement("link");

mainStylelink.type = "text/css";
mainStylelink.rel = "stylesheet";
mainStylelink.href = 'SimpleAdmin/styles/main.css';

head.appendChild(mainStylelink);

var fontAwesomelink = document.createElement("link");

fontAwesomelink.type = "text/css";
fontAwesomelink.rel = "stylesheet";
fontAwesomelink.href = 'SimpleAdmin/libs/font-awesome/css/font-awesome.min.css';

head.appendChild(fontAwesomelink);

// create root elements for admin tools
const popoverElement = document.createElement('div');
const popoverId = "easyadmin-popover";
popoverElement.id = popoverId;
popoverElement.className = "hide";
$("body").append(popoverElement);

const navbarElement = document.createElement('div');
const navbarId = "easyadmin-navbar";
navbarElement.id = navbarId;
$("body").append(navbarElement);

const messageToat = document.createElement('div');
const messageToatId = "messageToast";
messageToat.id = messageToatId;
$("body").append(messageToat);

const loadingAdorner = document.createElement('div');
const loadingAdornerId = "loadingAdorner";
loadingAdorner.id = loadingAdornerId;
$("body").append(loadingAdorner);

ReactDom.render(loadingAdornerManager.getView(), document.getElementById(loadingAdornerId));
loadingAdornerManager.showLoadingAdorner();

ReactDom.render(messageToastManager.getView(), document.getElementById(messageToatId));

sendHttpRequest("nextAvailableIndex", "get", {}, (nextAvailableIndex) => {
    // get all a,p,h-tags
    const tags = $("h1, h2, h3, h4, h5, h6, a, p");
    // let nextAvailableIndex = findNextAvailableIndex(tags);
    const index = parseInt(nextAvailableIndex.data);
    setUnassignedIdTags(tags, index);

    // render admin tools
    const changeStorage = new ChangeStorage();

    ReactDom.render(<Popover changeStorage={changeStorage} />, document.getElementById(popoverId));
    ReactDom.render(<Navbar changeStorage={changeStorage} tags={tags.toArray()} />, document.getElementById(navbarId));

    loadingAdornerManager.hideLoadingAdorner();
});
