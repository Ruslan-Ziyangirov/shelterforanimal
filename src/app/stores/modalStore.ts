import {MainStore} from "./mainStore";
import {makeAutoObservable} from "mobx";

export class ModalStore{
    currentModal = null;

    constructor(mainStore: MainStore) {
        this.currentModal = null;

        makeAutoObservable(this);
    }

    clearCurrentModal = () => {
        this.currentModal = null;
    }

    setCurrentModal = (modal:any) => {
        this.currentModal = modal;
    }
}