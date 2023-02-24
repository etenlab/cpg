import React from 'react';
import {IonHeader, IonPage, IonTitle, IonToolbar} from "@ionic/react";
import useRepositories from "../../hooks/useRepositories";
import {DiscussionList} from "../../components/dicussion/DiscussionList";
import {PlusButton} from "../../components/ui-kit";

export const AllDiscussion = () => {
    const {discussionRepository} = useRepositories();

    return (
        <IonPage>
            {/*<IonHeader>*/}
            {/*    <IonToolbar>*/}
            {/*        <IonTitle>All Discussionssrc</IonTitle>*/}
            {/*    </IonToolbar>*/}
            {/*    /!*<DiscussionList/>*!/*/}
            {/*</IonHeader>*/}
            {/*<IonicF*/}
        </IonPage>
    );
};
