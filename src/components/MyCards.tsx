import { FC } from 'react'
import { ICard } from '@/types'
import CardComponent from './CardComponent'
import { Flex } from 'antd'

type MyCardsProps = {
  cards: Array<ICard>
  onStep: (card: ICard) => void
}

const MyCards: FC<MyCardsProps> = ({ cards, onStep }) => {
  return (
    <Flex justify="center" gap="small" wrap>
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} onClick={() => onStep(card)} />
      ))}
    </Flex>
  )
}

export default MyCards
