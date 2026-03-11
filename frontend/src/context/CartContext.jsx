import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(p => p._id === product._id);

    if (existing) {
      const updatedCart = cart.map(p =>
        p._id === product._id
          ? { ...p, qty: p.qty + 1 }
          : p
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map(p =>
      p._id === id
        ? { ...p, qty: p.qty + 1 }
        : p
    );
    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart
      .map(p =>
        p._id === id
          ? { ...p, qty: p.qty - 1 }
          : p
      )
      .filter(p => p.qty > 0);

    setCart(updatedCart);
  };

  // Remove product
  const removeItem = (id) => {
    const updatedCart = cart.filter(p => p._id !== id);
    setCart(updatedCart);
  };

  // ⭐ NEW: Clear cart after order
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}