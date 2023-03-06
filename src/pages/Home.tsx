import { IonContent, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem routerLink="/table">
            <IonLabel>Table</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
