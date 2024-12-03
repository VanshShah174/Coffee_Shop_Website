import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  homeOutline,
  cartOutline,
  personOutline,
  restaurantOutline,
} from 'ionicons/icons';

import Profile from './pages/Profile';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login'; // Import Login
import Signup from './pages/Signup'; // Import Signup

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
import { CartProvider } from './context/CartContext';

/* CartProvider */


setupIonicReact();

const App: React.FC = () => (
  <CartProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Authentication Routes */}
          <Route exact path="/profile" component={Login} />
          <Route exact path="/profile" component={Signup} />

          {/* Tabbed Routes */}
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/menu">
            <Menu />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>

          {/* Default Redirect */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        {/* Tab Navigation */}
        <IonTabs>
          <IonRouterOutlet>
            {/* Repeat tabbed routes to work with tabs */}
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/menu">
              <Menu />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            {/* Home Tab */}
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={homeOutline} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>

            {/* Menu Tab */}
            <IonTabButton tab="menu" href="/menu">
              <IonIcon icon={restaurantOutline} />
              <IonLabel>Menu</IonLabel>
            </IonTabButton>

            {/* Cart Tab */}
            <IonTabButton tab="cart" href="/cart">
              <IonIcon icon={cartOutline} />
              <IonLabel>Cart</IonLabel>
            </IonTabButton>

            {/* Profile Tab */}
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  </CartProvider>
);

export default App;