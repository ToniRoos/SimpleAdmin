import * as $ from "jquery";
import { dialogManager } from '../logic/dialogManager';
import { controlIds } from "../data/controlIds";
import { messageToastManager } from '../logic/messageToastManager';

type phpFunction =
    "pageScanner" |
    "nextAvailableIndex" |
    "userManagement/registerUser" |
    "userManagement/verifyLogin" |
    "userManagement/appInitializedCheck";

type mimeType = "post" | "get";

export enum Erros {
    SESSION_TIMED_OUT = 1100,
    INVALID_USER_PWD = 1101,
    NO_USER_LOGGED_IN = 1102
}

interface ResponseData {
    data: string;
}

export interface ErrorData {
    errorCode: number;
    errorText: string;
}

export function sendHttpRequest(phpFuntion: phpFunction,
    type: mimeType,
    data: any,
    successCallback: (parameter: ResponseData) => void,
    errorCallback?: (parameter: ErrorData) => void) {

    dialogManager.showDialog(controlIds.loadingAdorner);

    $.ajax({
        type: type,
        url: "SimpleAdmin/php/" + phpFuntion + ".php",
        data: JSON.stringify(data),
        success: (receivedData: any) => {
            successCallback(receivedData);
            dialogManager.hideDialog(controlIds.loadingAdorner);
        },
        error: (error) => {

            console.error(error.responseText);
            // loadingAdornerManager.hideLoadingAdorner();
            dialogManager.hideDialog(controlIds.loadingAdorner);

            const encodedError = <ErrorData>JSON.parse(error.responseText);
            messageToastManager.showMessageToast(encodedError.errorText);
            if (errorCallback !== undefined) {
                errorCallback(encodedError);
            }
        },
        contentType: "application/json",
        dataType: "json"
    });
}