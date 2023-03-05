import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact, useIonRouter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import DiscussionDevelopmentPage from './pages/DiscussionDevelopmentPage';
import ImportFilesPage from './pages/ImportFilesPage';
import ImportFunctionsPage from './pages/ImportFunctionsPage';
import TranslationPage from './pages/TranslationPage';
import GraphViewerPage from './pages/GraphViewerPage';
import DictionaryPage from './pages/DictionaryPage';
import LexiconPage from './pages/LexiconPage';
import PericopeBoundariesPage from './pages/PericopeBoundariesPage';
import LanguageProficiencyPage from './pages/LanguageProficiencyPage';
import AdminPage from './pages/AdminPage';
import LanguageListsPage from './pages/LanguageListsPage';
import Home from './pages/Home';
import KeyTermsPage from './pages/key-terms/KeyTermsPage';

setupIonicReact();

const App: React.FC = () => {
  const router = useIonRouter()
  return <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle
          onClick={(e) => {
            e.preventDefault();
            router.push('/home');
          }}
        >Crowd Peer Graph</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/discussion">
            <DiscussionDevelopmentPage />
          </Route>
          <Route exact path="/language-lists">
            <LanguageListsPage />
          </Route>
          <Route exact path="/translation">
            <TranslationPage />
          </Route>
          <Route exact path="/import-functions">
            <ImportFunctionsPage />
          </Route>
          <Route exact path="/import-files">
            <ImportFilesPage />
          </Route>
          <Route exact path="/graph-viewer">
            <GraphViewerPage />
          </Route>
          <Route exact path="/dictionary">
            <DictionaryPage />
          </Route>
          <Route exact path="/lexicon">
            <LexiconPage />
          </Route>
          <Route exact path="/key-terms">
            <KeyTermsPage />
          </Route>
          <Route exact path="/pericope-boundaries">
            <PericopeBoundariesPage />
          </Route>
          <Route exact path="/language-proficiency">
            <LanguageProficiencyPage />
          </Route>
          <Route exact path="/admin">
            <AdminPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonContent>
  </IonApp>
};

export default App;
