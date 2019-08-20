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
        selectedCompany: action.companyId
      }
      break
  }
}

const initialState: State = {
  selectedCompany: ''
}

const Context = createContext<State>(initialState)

export const Provider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  console.log("State", state, dispatch)
  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}

export const useGlobalState = () => {
  return useContext(Context)
}