export class ChangeStorage {

    tags: HTMLElement[] = [];

    constructor() {
    }

    addTag(tag: HTMLElement) {
        if (this.tags.indexOf(tag) === -1) {
            this.tags.push(tag);
        }
    }

    getTags() {
        return this.tags;
    }

    anyChanges() {
        return this.tags.length > 0;
    }

    noChanges() {
        return this.tags.length === 0;
    }

    clearStorage() {
        this.tags = [];
    }
}