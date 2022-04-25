import {ModalStore} from "./modalStore";
import {SheltersStore} from "./sheltersMock";

export class MainStore{
    modalStore: ModalStore;
    shelterStore: SheltersStore

    constructor() {
        this.modalStore = new ModalStore(this)
        this.shelterStore = new SheltersStore();


    }
}

const mainStore = new MainStore();

export default  mainStore;