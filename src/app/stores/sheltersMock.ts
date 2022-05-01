import {makeObservable, observable} from 'mobx';
import {ShelterModel} from "../model/ShelterModel";
import photo from "../../assets/spec house.png";
import {getDocs} from "firebase/firestore";


export class SheltersStore {



    @observable sheltersMock: Array<ShelterModel> = [
        {
            id: 1,
            title: 'Spec House',
            image: photo,
            description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.\n' +
                'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
            address: 'ул.Пушкина 32',
            phone: "+7 (951)-171-88-76"
        },

    ]
}
