import { FC } from 'react'
import { ICard } from '@/types'
import CardComponent from './CardComponent'
import { Flex } from 'antd'

type HisCardsProps = {
  cards: ICard[]
}

const HisCards: FC<HisCardsProps> = ({ cards }) => {
  return (
    <Flex justify="center" gap="small">
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} />
      ))}
    </Flex>
  )
}

export default HisCards
