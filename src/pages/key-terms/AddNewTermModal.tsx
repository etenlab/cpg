import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import React, { memo, useRef } from "react";

interface IProps {
    isOpen: boolean
    onDismiss: (value?: string, isCancelled?: boolean) => void
}

const AddNewTermModal: React.FC<IProps> = (props) => {
    const { onDismiss, isOpen } = props;
    const inputRef = useRef<HTMLIonInputElement>(null)

    return (
        <IonModal isOpen={isOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton color="danger" onClick={() => { onDismiss(undefined, true) }}>
                            Cancel
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Key Term</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => { onDismiss(inputRef.current?.value as string) }}>Submit</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem className="ion-no-padding">
                    <IonLabel position={'stacked'}>
                        Key Term
                    </IonLabel>
                    <IonInput ref={inputRef} placeholder='Enter key term...'></IonInput>
                </IonItem>
            </IonContent>
        </IonModal>
    )
}

export default memo(AddNewTermModal);