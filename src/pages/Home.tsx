import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { dbService } from '..';
import UserAddForm from '../components/UserAddForm';
import UserList from '../components/UserList';
import './Home.css';

const Home: React.FC = () => {

  console.log(dbService)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crowd Peer Graph</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Crowd Peer Graph</IonTitle>
          </IonToolbar>
        </IonHeader>
        <UserList />
        <UserAddForm />
      </IonContent>
    </IonPage>
  );
};

export default Home;
