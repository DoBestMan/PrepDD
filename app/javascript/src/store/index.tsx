import React, { useReducer, createContext, useContext } from 'react'
import { CurrentUser_currentUser_user } from '../graphql/queries/__generated__/CurrentUser'

type State = {
  selectedCompany: string;
  currentUser: CurrentUser_currentUser_user;
}

type Action =
  | { type: 'SET_SELECTED_COMPANY', companyId: string }
  | { type: 'SET_CURRENT_USER', user: CurrentUser_currentUser_user }

const rootReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_SELECTED_COMPANY':
      return {
        ...state,
        selectedCompany: action.companyId
      }
      break
    case 'SET_CURRENT_USER':
      return {
        ...state, 
        currentUser: action.user
      }
      break
    default:
      return state
  }
}

const initialState: State = {
  selectedCompany: '', 
  currentUser: {
    __typename: "User",
    id: '',
    email: '',
    fullName: '',
    displayName: '',
    profileUrl: '',
    lastViewedCompanyId: '', 
    ownedCompanies: [],
    companies: [],
    roles: []
  }
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