import {BaseStore} from 'fluxible/addons';

class MetaStore extends BaseStore {
    constructor(dispatcher) {
        super(dispatcher);
        this.pageTitle = '';
    }
    updatePageTitle(payload) {
        this.pageTitle = payload.pageTitle;
        this.emitChange();
    }
    getPageTitle() {
        return this.pageTitle;
    }
    getState() {
        return {
            pageTitle: this.pageTitle
        };
    }
    dehydrate() {
        return this.getState();
    }
    rehydrate(state) {
        this.pageTitle = state.pageTitle;
    }
}

MetaStore.storeName = 'MetaStore';
MetaStore.handlers = {
    'UPDATE_PAGE_TITLE'    : 'updatePageTitle'
};

export default MetaStore;
