import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCallback } from 'react';
import useSeedService from '../hooks/useSeedService';

import './Home.css';

const Seed: React.FC = () => {
  const seedService = useSeedService();

  const doSeed = useCallback(() => {
    if (!seedService) {
      console.warn(`Seed service is not initialized`);
      return;
    }

    seedService.createNodesAndRelationship();
  }, [seedService]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seed Database</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={doSeed}>Seed Database</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Seed;
