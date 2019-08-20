import React, { useReducer, createContext, useContext } from 'react'

interface State {
  selectedCompany: string;
}

interface Action {
  type: 'SET_SELECTED_COMPANY';
  companyId: string 
}

const rootReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_COMPANY':
      return {
        ...state,
        selectedCompany: action.companyId
      }
      break
    default:
      return state
  }
}

const initialState: State = {
  selectedCompany: ''
}

type ContextType = {
  state: State,
  dispatch: (action: Action) => void
}

const Context = createContext<ContextType>({
  dispatch: () => undefined, 
  state: initialState,
});

export const Provider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  return (
    <Context.Provider value={{state, dispatch}}>
      {props.children}
    </Context.Provider>
  )
}

export const useGlobalState = () => {
  return useContext(Context)
}