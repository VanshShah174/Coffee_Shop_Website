import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useCart } from '../context/CartContext';
import './Cart.css'; // Ensure you have a separate CSS file if needed
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection

const Cart: React.FC = () => {
  const { cart, incrementQuantity, decrementQuantity, clearCart } = useCart(); // Include clearCart function from context
  const history = useHistory(); // Initialize useHistory for redirection

  // Calculate the total price for all items in the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle Checkout
  const handleCheckout = () => {
    clearCart(); // Clear the cart
    history.push('/home'); // Redirect to home page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {cart.length > 0 ? (
          <div className="cart-items-section">
            {cart.map((item) => (
              <IonCard key={item.id} className="cart-item-card">
                <IonCardHeader>
                  <IonCardTitle>{item.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className="price">
                    ${item.price.toFixed(2)} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="quantity-controls">
                    <IonButton
                      fill="outline"
                      size="large"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      -
                    </IonButton>
                    <span className="quantity">{item.quantity}</span>
                    <IonButton
                      fill="outline"
                      size="large"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
            </div>
            {/* Checkout Button */}
            <IonButton expand="block" color="primary" onClick={handleCheckout}>
              Checkout
            </IonButton>
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Cart;