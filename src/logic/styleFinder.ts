export function getStyle(el: any, styleProp: string) {
    var camelize = function (str: string) {
        return str.replace(/\-(\w)/g, function (str, letter) {
            return letter.toUpperCase();
        });
    };

    if (el.currentStyle) {
        return el.currentStyle[camelize(styleProp)];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
        const computedStyle = document.defaultView.getComputedStyle(el);
        const fontSize = computedStyle.getPropertyValue(styleProp);
        return fontSize;
    } else {
        return el.style[camelize(styleProp)];
    }
}