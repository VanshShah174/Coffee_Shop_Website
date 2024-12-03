import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButton,
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  // Path to the background image
  const backgroundImage = '/assets/coffee-hero.jpg';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Coffee Bliss</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Hero Section */}
        <div
          style={{
            position: 'relative',
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="hero-overlay">
            <h1 className="hero-title">Welcome to Coffee Bliss</h1>
            <p className="hero-subtitle">Sip the joy, savor the flavor.</p>
            <IonButton fill="outline" className="hero-button" href="/menu">
              Explore Our Menu
            </IonButton>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="highlights-section">
          <div className="highlight">
            <h3>Freshly Brewed Coffee</h3>
            <p>Made from the finest beans, sourced globally.</p>
          </div>
          <div className="highlight">
            <h3>Cozy Atmosphere</h3>
            <p>Experience warmth and comfort with every sip.</p>
          </div>
          <div className="highlight">
            <h3>Artisan Pastries</h3>
            <p>Pair your coffee with delicious handcrafted treats.</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;