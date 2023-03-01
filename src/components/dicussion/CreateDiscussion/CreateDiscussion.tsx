import React, {FormEventHandler, useState} from 'react';
import {IonButton, IonInput, IonItem, IonItemGroup, IonLabel, IonTextarea} from "@ionic/react";
import useRepositories from "../../../hooks/useRepositories";
import {InputChangeEventDetail, TextareaChangeEventDetail} from "@ionic/core";
import {IonInputCustomEvent, IonTextareaCustomEvent} from "@ionic/core/dist/types/components";

interface PropsCreateDiscussion {
    setIsCreateDiscussionShow: React.Dispatch<React.SetStateAction<boolean| undefined>>
}

interface ICreateDiscussion {
    title: string
    text: string
}

export const CreateDiscussion: React.FC<PropsCreateDiscussion> = ({setIsCreateDiscussionShow}) => {
    const [formData, setFormData] = useState<ICreateDiscussion>({
        text: '',
        title: '',
    })
    const {discussionRepository} = useRepositories()

    const onCreate = () => {
        if(formData.title !== '' && formData.text !== '') {
            discussionRepository?.create({...formData, userId: 1} as any)
                .then(()=>{
                    setIsCreateDiscussionShow(false)
                })
        }
    }

    const onTitleChange = (e: IonInputCustomEvent<InputChangeEventDetail>) => {
        setFormData(prevState => ({
            ...prevState,
            title: e.target.value as string
        }))
    }
    const onTextChange = (e: IonTextareaCustomEvent<TextareaChangeEventDetail>) => {
        setFormData(prevState => ({
            ...prevState,
            text: e.target.value as string
        }))
    }
    const onClose = () => {
        setIsCreateDiscussionShow(false)
    }

    return (
        <IonItemGroup>
            <IonLabel>
                Create your own discussion )
            </IonLabel>
            <IonItem>
                <IonInput value={formData.title}  onIonChange={onTitleChange} placeholder={'title'}/>
            </IonItem>
            <IonItem>
                <IonTextarea value={formData.text} onIonChange={onTextChange}  rows={5} placeholder={'text'}/>
            </IonItem>
            <IonButton onClick={onCreate}>
                Create
            </IonButton>
            <IonButton onClick={onClose}>Close</IonButton>
        </IonItemGroup>
    );
};
