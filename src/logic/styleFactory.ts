export function createStyleTag(url: string, integrity?: string, crossOrigin?: string) {

    const head = document.head;
    const styleLink = document.createElement("link");

    styleLink.type = "text/css";
    styleLink.rel = "stylesheet";
    styleLink.href = url;

    if (integrity !== undefined) {
        styleLink.integrity = integrity;
    }

    if (crossOrigin !== undefined) {
        styleLink.crossOrigin = crossOrigin;
    }

    head.appendChild(styleLink);
}