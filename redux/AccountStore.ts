'use client'

import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import * as ls from 'local-storage'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const check = (state: unknown, message?: string) => {
  if (!state) {
    throw Error(message || 'must load user before start')
  }
}

const likeSlice = createSlice({
  name: 'account-like',
  initialState: {
    account: '',
    liked:  [] as number[]
  },

  reducers: {
    load: (_state, action: PayloadAction<string>) => {
      if (!ls.get(action.payload)) {
        ls.set(action.payload, [])
      }

      return {
        account: action.payload,
        liked: [...new Set(ls.get(action.payload) as [])]
      }
    },

    like: (state, action: PayloadAction<number>) => {
      check(state.account)

      state.liked.push(action.payload)
      ls.set(state.account, [...new Set(state.liked.values())])

      return state
    },

    unlike: (state, action: PayloadAction<number>) => {
      check(state.account)

      state.liked = state.liked.filter(id => id != action.payload)
      ls.set(state.account, [...new Set(state.liked.values())])

      return state
    }
  }
})

const store = configureStore({ reducer: likeSlice.reducer })

export type AccountState = ReturnType<typeof store.getState>
export type AccountDispatch = typeof store.dispatch

export const useAccountDispatch: () => AccountDispatch = useDispatch
export const useAccountSelector: TypedUseSelectorHook<AccountState> = useSelector

export const actions = likeSlice.actions
export default store
