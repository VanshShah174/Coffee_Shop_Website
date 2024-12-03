import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonText,
  IonItem,
  IonSpinner,
  IonCard,
  IonCardContent,
  IonCardTitle,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Profile.css'

const Profile: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUsername = localStorage.getItem('username');
    if (token && savedUsername) {
      setIsAuthenticated(true);
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home');
    }
  }, [isAuthenticated, history]);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username); // Save username
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', username); // Save username
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {isAuthenticated ? (
          // Authenticated User Profile Section
          <div className="profile-card-container">
            <IonCard>
              <IonCardContent>
                <IonCardTitle>
                  Welcome, <strong>{username}</strong>!
                </IonCardTitle>
                <p>Your account is now fully set up and ready to use.</p>
                <IonButton expand="block" color="danger" onClick={handleLogout}>
                  Logout
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        ) : (
          // Login/Signup Section
          <div className="auth-card-container">
            <IonCard>
              <IonCardContent>
                <IonItem>
                  <IonLabel position="stacked">Username</IonLabel>
                  <IonInput
                    value={username}
                    onIonChange={(e) => setUsername(e.detail.value!)}
                    placeholder="Enter your username"
                    clearInput
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Password</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)}
                    placeholder="Enter your password"
                    clearInput
                  />
                </IonItem>

                {error && (
                  <IonText color="danger" className="error-message">
                    {error}
                  </IonText>
                )}

                <IonButton expand="block" onClick={handleLogin} disabled={loading}>
                  {loading ? <IonSpinner /> : 'Login'}
                </IonButton>
                <IonButton expand="block" color="secondary" onClick={handleSignup} disabled={loading}>
                  {loading ? <IonSpinner /> : 'Signup'}
                </IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Profile;