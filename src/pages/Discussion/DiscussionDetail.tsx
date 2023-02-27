import { IonAvatar, IonButton, IonButtons, IonContent, IonFooter, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonToolbar } from "@ionic/react"
import { useHistory, useParams } from "react-router"
import { List, ListItem, Box } from "@mui/material";
import { PlusButton, Toolbar, Typography, DiscussionBoxUI } from "@eten-lab/ui-kit";
import { arrowBack } from "ionicons/icons"
import "./DiscussionDetail.css"

interface IProps {

}


const DiscussionDetail: React.FC<IProps> = (props) => {
    const params: { id: string } = useParams()
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <Toolbar title='Showcase' buttons={{ discussion: true, notification: true, menu: true }} onClickMenuBtn={() => { }} onClickDiscussionBtn={() => { }} onClickNotificationBtn={() => { }} />
            </IonHeader>
            <IonContent className='ion-padding' style={{ height: 'fit-content' }}>
                <IonItem lines="none">
                    <IonIcon icon={arrowBack} slot="start" color="light" onClick={() => {
                        history.goBack();
                    }}></IonIcon>
                    <Typography variant='h3'>Discussion Title #{params.id}</Typography>
                </IonItem>

                <IonItem lines="none" className="mb-1">
                    <IonItem slot="start" lines="none">
                        <DiscussionBoxUI.Avatar username="Svetlana Podolianko" url="" />
                        &nbsp;&nbsp;&nbsp;
                        <DiscussionBoxUI.Username username="Hiroshi Tanaka" />
                    </IonItem>
                    <IonItem slot="end" lines="none">
                        <DiscussionBoxUI.DotsMoreButton onClick={() => { }} />
                    </IonItem>
                </IonItem>
                <Typography variant={'body2'} className="mb-1">
                    Also note that only visible icons are loaded, and icons which are "below the fold" and hidden from the user's view do not make fetch requests for the svg resource.
                </Typography>
                <IonItem>
                    <DiscussionBoxUI.ReactionButton emoji={'1f609'} reactions={Object.create(null)} onClick={() => { }} />
                    <IonButtons slot="end">
                        <IonButton slot="primary">
                            Reply
                        </IonButton>
                    </IonButtons>
                </IonItem>
            </IonContent>
            <IonFooter class="ion-no-border">
                <IonToolbar>
                    <DiscussionBoxUI.InputButtonGroup onClick={() => { }} />
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default DiscussionDetail