import {observer} from "mobx-react";
import {useStores} from "../../../../utils/use-stores-hook";
import {cloneElement} from "react";

export const ModalConstructor = observer(() => {
    const {modalStore: {currentModal: CurrentModal}} = useStores();

    if(CurrentModal){
        // @ts-ignore
        return cloneElement(<CurrentModal/>)
    }else{
        return null;
    }

})