'use client';

import React, { createContext, useContext, useState, ReactNode, JSXElementConstructor } from 'react';
import { UserState, Flower, BouquetDesign, CartItem, Leaf } from './types';

interface BouquetContextType {
  state: UserState;
  selectFlower: (flower: Flower) => void;
  deselectFlower: (flowerId: string) => void;
  incrementFlower: (flowerId: string) => void;
  decrementFlower: (flowerId: string) => void;
  setBouquetDesign: (bouquet: BouquetDesign) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const BouquetContext = createContext<BouquetContextType | undefined>(undefined);

export function BouquetProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<UserState>({
    selectedFlowers: [],
    currentBouquet: null,
    cartItems: [],
    totalPrice: 0,
  });

  const selectFlower = (flower: Flower) => {
    setState((prev) => {
      const existingFlower = prev.selectedFlowers.find((f) => f.id === flower.id);
      if (existingFlower) {
        return {
          ...prev,
          selectedFlowers: prev.selectedFlowers.map((f) =>
            f.id === flower.id ? { ...f, count: f.count + 1 } : f
          ),
        };
      }
      return {
        ...prev,
        selectedFlowers: [...prev.selectedFlowers, { ...flower, count: 1 }],
      };
    });
  };

  const deselectFlower = (flowerId: string) => {
    setState((prev) => ({
      ...prev,
      selectedFlowers: prev.selectedFlowers.filter((f) => f.id !== flowerId),
    }));
  };

  const incrementFlower = (flowerId: string) => {
    setState((prev) => ({
      ...prev,
      selectedFlowers: prev.selectedFlowers.map((f) =>
        f.id === flowerId ? { ...f, count: f.count + 1 } : f
      ),
    }));
  };

  const decrementFlower = (flowerId: string) => {
    setState((prev) => {
      const updatedFlowers = prev.selectedFlowers.map((f) =>
        f.id === flowerId ? { ...f, count: Math.max(0, f.count - 1) } : f
      ).filter((f) => f.count > 0);
      return {
        ...prev,
        selectedFlowers: updatedFlowers,
      };
    });
  };

  const setBouquetDesign = (bouquet: BouquetDesign) => {
    setState((prev) => ({
      ...prev,
      currentBouquet: bouquet,
    }));
  };

  const addToCart = (item: CartItem) => {
    setState((prev) => {
      const newCartItems = [...prev.cartItems, item];
      const newTotalPrice = newCartItems.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0);
      return {
        ...prev,
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
      };
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setState((prev) => {
      const newCartItems = prev.cartItems.filter((item) => item.id !== cartItemId);
      const newTotalPrice = newCartItems.reduce((sum, cartItem) => sum + cartItem.price * cartItem.quantity, 0);
      return {
        ...prev,
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
      };
    });
  };

  const clearCart = () => {
    setState((prev) => ({
      ...prev,
      cartItems: [],
      totalPrice: 0,
    }));
  };

  const getTotalPrice = () => {
    return state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const contextValue: BouquetContextType = {
    state,
    selectFlower,
    deselectFlower,
    incrementFlower,
    decrementFlower,
    setBouquetDesign,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalPrice,
  };

  return React.createElement(
    BouquetContext.Provider,
    { value: contextValue },
    children
  );
}

export function useBouquet() {
  const context = useContext(BouquetContext);
  if (!context) {
    throw new Error('useBouquet must be used within a BouquetProvider');
  }
  return context;
}
