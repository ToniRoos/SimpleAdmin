export function setUnassignedIdTags(tags: JQuery<HTMLElement>, startId: number) {
    tags.each(function (tagIndex) {

        const tag = tags[tagIndex];
        if (tag.id === "") {
            tag.id = "__" + tag.tagName + "__" + startId++;
        }
    });
}