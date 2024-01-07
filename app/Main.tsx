'use client'

import Pokemon, { Pokemon as IPokemon } from "~/components/Pokemon"
import { Provider } from 'react-redux'
import AccountStore, { actions, useAccountDispatch } from '~/redux/AccountStore'
import TopSection from "./TopSection"
import { UserProvider, getUser } from "~/context/UserContext"
import { useEffect } from "react"

function LoadStore() {
  const user = getUser()
  const dispatch = useAccountDispatch()

  useEffect(() => {
    user && dispatch(actions.load(user.username))
  }, [user])

  return <></>
}

export default function Main({ pokemons }: { pokemons: IPokemon[] }) {


  return (
    <UserProvider>
      <Provider store={AccountStore}>
      <LoadStore />

        <div className="divider">Explode Pokemon</div>
        <div className="grid grid-cols-5 gap-5">
          {pokemons.map(poke => (
            <Pokemon pokemon={poke} key={poke.id} />
          ))}
        </div>

        <TopSection />
      </Provider>
    </UserProvider>
  )
}
