import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButton,
  IonBadge,
  IonSpinner,
  IonAlert,
} from '@ionic/react';
import { cartOutline } from 'ionicons/icons';
import './Menu.css';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const Menu: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search term
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All'); // State for the active category
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false); // State for login alert
  const { cart, addToCart, incrementQuantity, decrementQuantity } = useCart();
  const history = useHistory();

  const isAuthenticated = Boolean(localStorage.getItem('token')); // Check if user is authenticated

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        const data = await response.json();

        // Map _id to id
        const mappedData = data.map((product: any) => ({
          ...product,
          id: product._id,
        }));

        setProducts(mappedData);
        setFilteredProducts(mappedData); // Initially display all products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search functionality
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) &&
        (activeCategory === 'All' || product.category === activeCategory)
    );
    setFilteredProducts(filtered);
  };

  // Handle category filtering
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    if (category === 'All') {
      setFilteredProducts(
        searchTerm
          ? products.filter((product) =>
              product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : products
      );
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.category.toLowerCase() === category.toLowerCase() &&
            (searchTerm
              ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
              : true)
        )
      );
    }
  };

  // Handle adding items to cart
  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      setShowLoginAlert(true); // Show login alert if not authenticated
      return;
    }
    addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
          {/* Cart Button Redirect */}
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => history.push('/cart')}
          >
            <IonIcon icon={cartOutline} />
            {cart.length > 0 && (
              <IonBadge color="danger" slot="end">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </IonBadge>
            )}
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* Searchbar */}
        <div className="search-bar-container">
          <IonSearchbar
            value={searchTerm}
            onIonInput={(e: any) => handleSearch(e.target.value)} // Update the search term
            placeholder="Search menu items"
          />
        </div>

        {/* Categories */}
        <div className="categories">
          {['All', 'Hot Drinks', 'Cold Drinks', 'Pastries', 'Sandwiches'].map((category) => (
            <button
              key={category}
              className={`category-btn ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Section */}
        {loading ? (
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <p>Loading...</p>
          </div>
        ) : (
          <div className="menu-items-section">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <IonCard key={product.id} className="menu-item-card">
                  <IonCardHeader>
                    <IonCardTitle>{product.name}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    {product.description}
                    <p className="price">${product.price.toFixed(2)}</p>
                    {cart.find((item) => item.id === product.id) ? (
                      <div className="quantity-controls">
                        <IonButton
                          fill="outline"
                          size="large"
                          onClick={() => decrementQuantity(product.id)}
                        >
                          -
                        </IonButton>
                        <span className="quantity">
                          {cart.find((item) => item.id === product.id)?.quantity || 0}
                        </span>
                        <IonButton
                          fill="outline"
                          size="large"
                          onClick={() => incrementQuantity(product.id)}
                        >
                          +
                        </IonButton>
                      </div>
                    ) : (
                      <IonButton
                        fill="solid"
                        expand="block"
                        className="add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </IonButton>
                    )}
                  </IonCardContent>
                </IonCard>
              ))
            ) : (
              <p>No items match your search.</p>
            )}
          </div>
        )}

        {/* Login Alert */}
        <IonAlert
          isOpen={showLoginAlert}
          onDidDismiss={() => setShowLoginAlert(false)}
          header="Login Required"
          message="You need to login first to add items to your cart."
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Login',
              handler: () => history.push('/profile'),
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Menu;