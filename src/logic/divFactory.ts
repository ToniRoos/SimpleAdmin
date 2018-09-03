import * as $ from "jquery";

export function createDiv(id: string, className?: string) {

    const newDivTag = document.createElement('div');
    newDivTag.id = id;

    if (className !== undefined) {
        newDivTag.className = "hide";
    }

    $("body").append(newDivTag);
}