// import ext libs
import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as $ from "jquery";

// import UI
import { Navbar } from './ui/navbar';
import { Popover } from './ui/popover';
import { LoginDialog } from "./ui/dialogs/loginDialog";
import { RegisterDialog } from "./ui/dialogs/registerDialog";

// import logic
import { dialogManager } from "./logic/dialogManager";
import { messageToastManager } from './logic/messageToastManager';
import { setUnassignedIdTags } from './logic/idManager';
import { ChangeStorage } from "./logic/changeStorage";
import { sendHttpRequest } from './logic/httpRequestManager';
import { createDiv } from './logic/divFactory';
import { createStyleTag } from './logic/styleFactory';

// import data
import { controlIds } from "./data/controlIds";
import './styles/main.scss';

//-------------------------//
//        Bootstrap        //
//-------------------------//

// add styles
// main
createStyleTag('SimpleAdmin/styles/main.css');
// font-awesome
createStyleTag("https://use.fontawesome.com/releases/v5.3.1/css/all.css",
    "sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU",
    "anonymous"
);

// create root elements for admin tools
// popover
createDiv(controlIds.popover, "hide");
// navbar
createDiv(controlIds.navbar);
// login
dialogManager.createDialog(<LoginDialog />, controlIds.loginDialog);
dialogManager.createDialog(<RegisterDialog />, controlIds.registerDialog);
sendHttpRequest("userManagement/appInitializedCheck", "post", {}, (appInitialized) => {
    if (appInitialized.data) {
        dialogManager.showLoginDialog(controlIds.loginDialog);
    } else {
        dialogManager.showLoginDialog(controlIds.registerDialog);
    }
});

// message toast
createDiv(controlIds.messageToast);
ReactDom.render(messageToastManager.getView(), document.getElementById(controlIds.messageToast));
// loading spinner
dialogManager.createDialog(<i className="fa fa-spinner rotate fa-4x"></i>, controlIds.loadingAdorner)

// get next available tag id and initalize app
sendHttpRequest("nextAvailableIndex", "get", {}, (nextAvailableIndex) => {
    // get all a,p,h-tags
    const tags = $("h1, h2, h3, h4, h5, h6, a, p");
    // let nextAvailableIndex = findNextAvailableIndex(tags);
    const index = parseInt(nextAvailableIndex.data);
    setUnassignedIdTags(tags, index);

    // render admin tools
    const changeStorage = new ChangeStorage();

    ReactDom.render(<Popover changeStorage={changeStorage} />, document.getElementById(controlIds.popover));
    ReactDom.render(<Navbar changeStorage={changeStorage} tags={tags.toArray()} />, document.getElementById(controlIds.navbar));
});
