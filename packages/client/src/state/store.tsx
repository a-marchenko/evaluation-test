import React, { createContext, useContext, useReducer, Dispatch, ReactElement } from 'react';

/**
 *
 * Declare types
 *
 */

type ChatRoom = {
  id: number;
  name: string;
};

export interface State {
  accessToken: string | null;
  name: string | null;
  chatRooms: ChatRoom[];
  toggledChatId: number | null;
}

type Action =
  | { type: 'UPDATE_ACCESS_TOKEN'; accessToken: string | null }
  | { type: 'UPDATE_NAME'; name: string | null }
  | { type: 'UPDATE_CHAT_ROOMS'; chatRooms: ChatRoom[] }
  | { type: 'UPDATE_TOGGLED_CHAT_ID'; toggledChatId: number | null };

type Reducer<S, A> = (state: S, action: A) => S;

type Context = { state: State; dispatch: Dispatch<Action> };

interface Props {
  children: ReactElement;
}

/**
 *
 * Declare state managment logic
 *
 */

const initialState: State = { accessToken: null, name: null, chatRooms: [], toggledChatId: null };

// main reducer
const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ACCESS_TOKEN':
      return { ...state, accessToken: action.accessToken };
    case 'UPDATE_NAME':
      return { ...state, name: action.name };
    case 'UPDATE_CHAT_ROOMS':
      return { ...state, chatRooms: action.chatRooms };
    case 'UPDATE_TOGGLED_CHAT_ID':
      return { ...state, toggledChatId: action.toggledChatId };
    default:
      throw new Error('Unhandled action type');
  }
};

// store context
export const StoreContext = createContext<Context>({ state: initialState, dispatch: () => {} });

// store context provider
export const StoreProvider = (props: Props) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>{props.children}</StoreContext.Provider>
  );
};

// custom hook to use store
export const useStore = () => useContext<Context>(StoreContext);
