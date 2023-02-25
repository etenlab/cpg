import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {CreateDiscussion} from "../../components/dicussion/CreateDiscussion/CreateDiscussion";
import {DiscussionList} from "../../components/dicussion/DiscussionList";
import useRepositories from "../../hooks/useRepositories";
import {Discussion} from "../../models/Discussions";
import {PlusButton} from "@eten-lab/ui-kit";

export const AllDiscussion = () => {
    // const {discussionRepository} = useRepositories();
    const [isCreateDiscussionShow, setIsCreateDiscussionShow] = useState<boolean>()
    const {discussionRepository} = useRepositories()
    const [discussions, setDiscussions] = useState<Discussion[]>()
    const createDiscussion = () => {
        setIsCreateDiscussionShow(true)
    }

    useEffect(() => {
        console.log('get discussions')
        discussionRepository?.getAll()
            .then((data) => {
                console.log(`
            
        discussions
        
        `)
                console.log(data[data.length - 1])
                // console.log(data)
                setDiscussions(data)
            })
        console.log(isCreateDiscussionShow)
    }, [discussionRepository, isCreateDiscussionShow])

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>All Discussions</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{height: 'fit-content'}}>
                {discussions && <DiscussionList discussions={discussions}/>}
            </IonContent>

            {isCreateDiscussionShow &&
                <IonContent>
                    <CreateDiscussion setIsCreateDiscussionShow={setIsCreateDiscussionShow}/>
                </IonContent>
            }

            <IonFooter>
                <IonToolbar>
                    <PlusButton variant={'primary'} onClick={createDiscussion}/>
                    <IonText>
                        new Post
                    </IonText>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};
