import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import UserAddForm from '../components/UserAddForm';
import UserList from '../components/UserList';
import useRepositories from '../hooks/useRepositories';
import { User } from '../models/User';
import './Home.css';

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { userRepository } = useRepositories();

  const getUsers = () => {
    userRepository?.all().then((data) => {
      setUsers(data);
    });
  }

  const addUserHandler = (user: any) => {
    user.id = undefined;
    userRepository?.save(user).then(() => {
      getUsers();
    });
  };

  useEffect(() => {
    getUsers();
  }, [userRepository]);

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
        <UserList users={users} />
        <UserAddForm addUserHandler={addUserHandler} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
