import { IonContent, IonHeader, IonPage } from "@ionic/react"
import { Toolbar, Typography, DiscussionBoxUI } from "@eten-lab/ui-kit";
import { useHistory } from "react-router";

interface IProps {

}

const Notifications: React.FC<IProps> = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <Toolbar title='Showcase' buttons={{ discussion: false, notification: true, menu: true }} onClickMenuBtn={() => { }} onClickDiscussionBtn={() => { }} onClickNotificationBtn={() => {  }} />
            </IonHeader>
            <IonContent className='ion-padding' style={{ height: 'fit-content' }}>
            </IonContent>
        </IonPage>
    )
}

export default Notifications