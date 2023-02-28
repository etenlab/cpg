import { IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react"
import { Toolbar, Typography, DiscussionBoxUI } from "@eten-lab/ui-kit";
import { useHistory } from "react-router";
import { checkmark, close, closeOutline, disc } from "ionicons/icons";
import { List, ListItem, Divider, Stack } from "@mui/material";
import "./Notification.css";
const { Username, DateViewer } = DiscussionBoxUI;

interface IProps {

}

const Notifications: React.FC<IProps> = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <Toolbar title='Showcase' buttons={{ discussion: false, notification: true, menu: true }} onClickMenuBtn={() => { }} onClickDiscussionBtn={() => { }} onClickNotificationBtn={() => { }} />
            </IonHeader>
            <IonContent className='ion-padding' style={{ height: 'fit-content' }}>
                <IonItem lines="none">
                    <Typography variant='h2'>Notifications</Typography>
                </IonItem>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} className={'action-btns'}>
                    <IonChip color={'primary'}>
                        <IonIcon icon={checkmark} color={'primary'} />
                        <IonLabel>CHECK ALL</IonLabel>
                    </IonChip>
                    <IonChip color={'danger'}>
                        <IonIcon icon={close} color={'danger'} />
                        <IonLabel>REMOVE ALL</IonLabel>
                    </IonChip>
                </Stack>
                <List>
                    {
                        new Array(3).fill(1).map((item, idx) =>
                            <Stack key={idx} direction={'column'} className={'mb-1'}>
                                <Stack alignItems={'center'} className={'mb-1'}><DateViewer date={new Date()} /></Stack>
                                <Stack direction={'row'} className={'mb-1'}>
                                    <IonIcon icon={disc} color={'danger'} size={'small'} className={'mt-1'} />
                                    <Stack direction={'column'}>
                                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                            <Stack direction={'row'} alignItems={'center'}>
                                                <Username username="username" />
                                                &nbsp;
                                                <Typography variant={'caption'}>
                                                    upvote your post <span className="emoji">&#128077;</span>
                                                </Typography>
                                            </Stack>
                                            <IonIcon icon={closeOutline} size={'large'} className="close-btn"></IonIcon>
                                        </Stack>
                                        <Typography variant="body2">
                                            <i>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing...</i>
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Divider />
                            </Stack>
                        )
                    }
                </List>
            </IonContent>
        </IonPage>
    )
}

export default Notifications