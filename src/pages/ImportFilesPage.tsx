import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import UserAddForm from '../components/UserAddForm';
import UserList from '../components/UserList';
import useRepositories from '../hooks/useRepositories';
import { User } from '../models/User';

const ImportFilesPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        Import Files Page
      </IonContent>
    </IonPage>
  );
};

export default ImportFilesPage;
