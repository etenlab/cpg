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
import useSyncService from '../hooks/useSyncService';

import './Home.css';

const Dev: React.FC = () => {
  const seedService = useSeedService();
  const syncService = useSyncService();

  const doSeed = useCallback(() => {
    if (!seedService) {
      console.warn(`Seed service is not initialized`);
      return;
    }

    seedService.createNodesAndRelationship();
  }, [seedService]);

  const doSync = useCallback(() => {
    if (!syncService) {
      console.warn(`Sync service is not initialized`);
      return;
    }

    syncService.sync();
  }, [syncService]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sync Tools</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={doSeed}>Seed Database</IonButton>
        <IonButton onClick={doSync}>Sync</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dev;
