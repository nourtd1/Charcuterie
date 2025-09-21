"use client";

import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from "@/hooks/use-toast"

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartState = {
  items: CartItem[];
};

type Action =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: Action): CartState => {
  let newState: CartState;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          ),
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { product, quantity }],
        };
      }
      break;
    }
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        newState = {
          ...state,
          items: state.items.filter(item => item.product.id !== productId),
        };
      } else {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        };
      }
      break;
    }
    case 'REMOVE_FROM_CART': {
      newState = {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload.productId),
      };
      break;
    }
    case 'CLEAR_CART': {
      newState = { items: [] };
      break;
    }
    default:
      newState = state;
  }
  
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
  return newState;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { toast } = useToast();

  const addToCart = useCallback((product: Product, quantity: number) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast({
        title: "Ajouté au panier",
        description: `${quantity} x ${product.name}`,
    })
  }, [toast]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getCartTotal = useCallback(() => {
    return state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [state.items]);

  const getCartItemCount = useCallback(() => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
