import React, { useEffect, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonPage,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import { CreateDiscussion } from "../../components/dicussion/CreateDiscussion/CreateDiscussion";
import { DiscussionList } from "../../components/dicussion/DiscussionList";
import useRepositories from "../../hooks/useRepositories";
import { Discussion } from "../../models/Discussions";
import { PlusButton, Toolbar, Typography } from "@eten-lab/ui-kit";
import "./DiscussionList.css";
import { useHistory } from 'react-router';
import AppRoutes from '../../constants/AppRoutes';

const sampleData: Discussion[] = [{ title: 'Discussoin Title #1', text: '', id: 1, user: Object.create(null) }, { title: 'Discussoin Title #2', text: '', id: 2, user: Object.create(null) }]

export const AllDiscussion = () => {
    // const {discussionRepository} = useRepositories();
    const history = useHistory()
    const [isCreateDiscussionShow, setIsCreateDiscussionShow] = useState<boolean>()
    const { discussionRepository } = useRepositories()
    const [discussions, setDiscussions] = useState<Discussion[]>(sampleData)
    const createDiscussion = () => {
        setIsCreateDiscussionShow(true)
    }

    useEffect(() => {
        discussionRepository?.getAll()
            .then((data) => {
                setDiscussions(sampleData)
            })
    }, [discussionRepository, isCreateDiscussionShow])

    return (
        <IonPage>
            <IonHeader>
                <Toolbar title='Showcase' buttons={{ discussion: true, notification: true, menu: true }} onClickMenuBtn={() => { }} onClickDiscussionBtn={() => { }} onClickNotificationBtn={() => {history.push(AppRoutes.notifications)}} />
            </IonHeader>
            <IonContent className='ion-padding' style={{ height: 'fit-content' }}>
                <Typography variant='h2'>Discussions</Typography>
                {
                    discussions?.length
                        ?
                        <DiscussionList discussions={discussions} />
                        :
                        <></>
                }
            </IonContent>

            {isCreateDiscussionShow &&
                <IonContent className='ion-padding'>
                    <CreateDiscussion setIsCreateDiscussionShow={setIsCreateDiscussionShow} />
                </IonContent>
            }

            {/* <IonFooter>
                <IonToolbar>
                    <PlusButton variant={'primary'} onClick={createDiscussion} />
                    <IonText>
                        new Post
                    </IonText>
                </IonToolbar>
            </IonFooter> */}
        </IonPage>
    );
};
