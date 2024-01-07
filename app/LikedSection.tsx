'use client'
import { useEffect, useState } from "react"
import { getUser } from "~/context/UserContext"
import { actions, useAccountDispatch, useAccountSelector } from "~/redux/AccountStore"
import Pokemon from '~/components/Pokemon'
import PokeAPI from "~/api/PokeAPI"

export default function LikeSection() {
  const user = getUser()!
  const likes = useAccountSelector(state => state.liked)
  const dispatch = useAccountDispatch()

  useEffect(() => {
    dispatch(actions.load(user.username))
  }, [])

  return <>
    <div className="divider">Here is what you like</div>
    <div className="grid grid-cols-5 gap-5">
      {likes.map(like => (
        <WrapperPokemon id={like} key={like} />
      ))}
    </div>
  </>
}

function WrapperPokemon({ id }: { id: number }) {
  const [poke, setPoke] = useState(undefined)

  useEffect(() => {
    PokeAPI.get<any>(`pokemon/${id}`).then(setPoke)
  }, [])

  if (poke) {
    return <Pokemon pokemon={poke} />
  }

  return (
    <div className="flex flex-col gap-4 w-52">
      <div className="skeleton h-60 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  )
}
