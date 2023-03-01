import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import UserAddForm from '../components/UserAddForm';
import UserList from '../components/UserList';
import useRepositories from '../hooks/useRepositories';
import { User } from '../models/User';
import './Home.css';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonContent>
        <IonList>
          <IonItem routerLink="/admin">
            <IonLabel>Admin Page</IonLabel>
          </IonItem>
          <IonItem routerLink="/discussion">
            <IonLabel>Discussion Page</IonLabel>
          </IonItem>
          <IonItem routerLink="/translation">
            <IonLabel>Translation Development</IonLabel>
          </IonItem>
          <IonItem routerLink="/import-functions">
            <IonLabel>Import Functions</IonLabel>
          </IonItem>
          <IonItem routerLink="/import-files">
            <IonLabel>Import Files</IonLabel>
          </IonItem>
          <IonItem routerLink="/graph-viewer">
            <IonLabel>Graph Viewer</IonLabel>
          </IonItem>
          <IonItem routerLink="/dictionary">
            <IonLabel>Dictionary</IonLabel>
          </IonItem>
          <IonItem routerLink="/lexicon">
            <IonLabel>Lexicon</IonLabel>
          </IonItem>
          <IonItem routerLink="/key-terms">
            <IonLabel>Key Terms</IonLabel>
          </IonItem>
          <IonItem routerLink="/pericope-boundaries">
            <IonLabel>Pericope Boundaries</IonLabel>
          </IonItem>
          <IonItem routerLink="/language-proficiency">
            <IonLabel>Language Proficiency</IonLabel>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
