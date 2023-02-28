import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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
import './theme/global.css';
import { AllDiscussion } from "./pages/Discussion/AllDiscussion";
import { ThemeProvider } from '@eten-lab/ui-kit';
import DiscussionDetail from './pages/Discussion/DiscussionDetail';
import Notifications from './pages/Notification/Notification';
import AppRoutes from './constants/AppRoutes';

setupIonicReact();

const App: React.FC = () => {

    const initialPage = '/discussions'

    return (
        <ThemeProvider >
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route exact path={AppRoutes.home}>
                            <Home />
                        </Route>
                        <Route exact path={AppRoutes.discussions}>
                            <AllDiscussion />
                        </Route>
                        <Route path={AppRoutes.discussionDetail}>
                            <DiscussionDetail />
                        </Route>
                        <Route exact path={AppRoutes.notifications}>
                            <Notifications />
                        </Route>
                        <Route exact path="/">
                            <Redirect to={initialPage} />
                        </Route>
                    </IonRouterOutlet>
                </IonReactRouter>
            </IonApp>
        </ThemeProvider>
    )
};

export default App;
