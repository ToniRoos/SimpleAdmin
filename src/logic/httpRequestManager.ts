import * as $ from "jquery";
import { loadingAdornerManager } from '../logic/loadingAdornerManager';
import { messageToastManager } from '../logic/messageToastManager';

type phpFunction = "pageScanner" | "nextAvailableIndex";
type mimeType = "post" | "get";

interface ResponseData {
    data: string;
}

export function sendHttpRequest(phpFuntion: phpFunction, type: mimeType, data: any, callback: (parameter: ResponseData) => void) {

    $.ajax({
        type: type,
        url: "php/" + phpFuntion + ".php",
        data: JSON.stringify(data),
        success: (receivedData) => {
            callback(receivedData);
        },
        error: (error) => {
            console.error(error.responseText);
            loadingAdornerManager.hideLoadingAdorner();
            messageToastManager.showMessageToast(error.responseText);
        },
        contentType: "application/json",
        dataType: "json"
    });
}