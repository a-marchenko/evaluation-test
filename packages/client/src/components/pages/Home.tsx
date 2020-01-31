import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CenteredLayout from '../layouts/CenteredLayout/CenteredLayout';
import DefaultButton from '../common/DefaultButton/DefaultButton';

import { useStore } from '../../state/store';

interface User {
  name: string;
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { state, dispatch } = useStore();
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // try to get new tokens
        const response = await fetch('/api/users/all', {
          method: 'GET',
        });

        const result = await response.json();

        if (result) {
          setUsers(result);
        } else {
          window.alert('No users fetched!');
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const onLogout = async () => {
    try {
      // try to get new tokens
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      const result = await response.json();

      if (result.ok) {
        // if ok clear state and redirect to login
        dispatch({ type: 'UPDATE_ACCESS_TOKEN', accessToken: null });
        dispatch({ type: 'UPDATE_NAME', name: null });
        history.push('/login');
      } else {
        // if not ok redirect to login page
        window.alert(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <CenteredLayout>
      <h1>Hello, {state.name}!</h1>
      <ul>
        {users.map(user => {
          return <li key={user.name}>{user.name}</li>;
        })}
      </ul>
      <DefaultButton type="button" text="Logout" onClick={() => onLogout()} width={240} isPrimary />
    </CenteredLayout>
  );
};

export default Home;
