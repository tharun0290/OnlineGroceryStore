import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCartItems([]);
      return;
    }
    try {
      setLoading(true);
      const { data } = await cartService.getCart();
      setCartItems(data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await cartService.addItem(productId, quantity);
      await fetchCart();
      toast.success('Added to cart!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) return;
    try {
      await cartService.addItem(productId, quantity);
      await fetchCart();
    } catch (err) {
      toast.error('Failed to update quantity');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await cartService.removeItem(cartItemId);
      await fetchCart();
      toast.success('Removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCartItems([]);
      toast.success('Cart cleared');
    } catch (err) {
      toast.error('Failed to clear cart');
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cartItems, loading, cartCount, cartTotal,
      addToCart, updateQuantity, removeFromCart, clearCart, fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}

export default CartContext;
