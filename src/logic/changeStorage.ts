/**
 * Stores all changed tags (HTMLElements).
 */
export class ChangeStorage {

    tags: HTMLElement[] = [];

    constructor() {
    }

    /**
     * Add a tag to storage.
     * @param tag The tag to store.
    */
    addTag(tag: HTMLElement) {
        if (this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
        }
    }

    /**
     * Returns all changed tags.
     * @return Array of tags.
    */
    getTags() {
        return this.tags;
    }

    /**
     * Checks that tag list isn't empty.
     * @return True if not empty.
    */
    anyChanges() {
        return this.tags.length > 0;
    }

    /**
     * Checks that tag list is empty.
     * @return True if empty.
    */
    noChanges() {
        return this.tags.length === 0;
    }

    /**
     * Remove all tags from sotrage.
    */
    clearStorage() {
        this.tags = [];
    }
}