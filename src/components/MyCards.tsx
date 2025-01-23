import { FC } from 'react'
import { Card } from '@/types'
import CardComponent from './CardComponent'

type MyCardsProps = {
  cards: Array<Card>
  onStep: (card: Card) => void
}

const MyCards: FC<MyCardsProps> = ({ cards, onStep }) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} onClick={() => onStep(card)} />
      ))}
    </div>
  )
}

export default MyCards
