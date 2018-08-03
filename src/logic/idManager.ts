/**
 * Enumerate all unassigned tags
 * @param tags tags to set an id for.
 * @param startId number to start enumeration.
*/
export function setUnassignedIdTags(tags: JQuery<HTMLElement>, startId: number) {
    tags.each(function (tagIndex) {

        const tag = tags[tagIndex];
        if (tag.id === "") {
            tag.id = "__" + tag.tagName + "__" + startId++;
        }
    });
}