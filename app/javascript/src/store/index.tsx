import React, { useReducer } from 'react'

const Context = React.createContext<unknown>({})

const initialState = {
  selectedCompany: ''
}

type State = {
  selectedCompany: string;
}

type Action = { type: 'SET_SELECTED_COMPANY', companyId: string }

const rootReducer = (state: State, action: Action) => {
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

const [state, dispatch] = useReducer(rootReducer, initialState)
const store = {
  dispatch, 
  state, 
  getState: () => state, 
}

export { store, Context }