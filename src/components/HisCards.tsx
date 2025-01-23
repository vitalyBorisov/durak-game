import { FC } from 'react'
import { Card } from '@/types'
import CardComponent from './CardComponent'

type HisCardsProps = {
  cards: Card[]
}

const HisCards: FC<HisCardsProps> = ({ cards }) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} />
      ))}
    </div>
  )
}

export default HisCards
