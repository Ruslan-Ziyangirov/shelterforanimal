import {MobXProviderContext, Provider} from "mobx-react";
import React, {useContext} from "react";
import mainStore, {MainStore} from "../app/stores/mainStore";


export function useStores(): MainStore{
    return <MainStore>useContext(MobXProviderContext);
}