import {ModalStore} from "./modalStore";

export class MainStore{
    modalStore: ModalStore;

    constructor() {
        this.modalStore = new ModalStore(this);

    }
}

const mainStore = new MainStore();

export default  mainStore;