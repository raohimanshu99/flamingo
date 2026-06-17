import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: JSON.parse(localStorage.getItem('flamingo_cart') || '[]'),
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.id === action.payload.id && i.size === action.payload.size
      )
      const items = existing
        ? state.items.map(i =>
            i.id === action.payload.id && i.size === action.payload.size
              ? { ...i, qty: i.qty + 1 }
              : i
          )
        : [...state.items, { ...action.payload, qty: 1 }]
      return { ...state, items }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.id === action.payload.id && i.size === action.payload.size)
        ),
      }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id && i.size === action.payload.size
            ? { ...i, qty: action.payload.qty }
            : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'CLOSE_CART':
      return { ...state, isOpen: false }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('flamingo_cart', JSON.stringify(state.items))
  }, [state.items])

  const totalItems = state.items.reduce((acc, i) => acc + i.qty, 0)
  const totalPrice = state.items.reduce((acc, i) => acc + i.price * i.qty, 0)

  const addItem    = (product) => dispatch({ type: 'ADD_ITEM',    payload: product })
  const removeItem = (id, size) => dispatch({ type: 'REMOVE_ITEM', payload: { id, size } })
  const updateQty  = (id, size, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, size, qty } })
  const clearCart  = () => dispatch({ type: 'CLEAR' })
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const closeCart  = () => dispatch({ type: 'CLOSE_CART' })

  return (
    <CartContext.Provider value={{
      items: state.items,
      isOpen: state.isOpen,
      totalItems,
      totalPrice,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      toggleCart,
      closeCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}