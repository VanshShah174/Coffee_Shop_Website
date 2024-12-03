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
  IonItem,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSignup = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Redirect to login after successful signup
        history.push('/login');
      } else {
        setError(data.message || 'Signup failed');
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
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="auth-form">
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              placeholder="Enter your email"
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

          <IonButton expand="block" onClick={handleSignup} disabled={loading}>
            {loading ? <IonSpinner /> : 'Signup'}
          </IonButton>

          <p>
            Already have an account?{' '}
            <IonButton fill="clear" onClick={() => history.push('/login')}>
              Login
            </IonButton>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;