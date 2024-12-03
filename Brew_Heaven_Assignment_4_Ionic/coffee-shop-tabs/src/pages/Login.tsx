import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonLabel,
  IonSpinner,
  IonText,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Save token
        history.push('/home'); // Redirect to home
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="auth-form">
          <IonLabel>Email</IonLabel>
          <IonInput
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            placeholder="Enter your email"
          />

          <IonLabel>Password</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            placeholder="Enter your password"
          />

          {error && (
            <IonText color="danger" className="error-message">
              {error}
            </IonText>
          )}

          <IonButton expand="block" onClick={handleLogin} disabled={loading}>
            {loading ? <IonSpinner /> : 'Login'}
          </IonButton>

          <p>
            Don't have an account?{' '}
            <IonButton fill="clear" onClick={() => history.push('/signup')}>
              Signup
            </IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
