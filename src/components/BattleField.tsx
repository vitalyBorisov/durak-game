import { FC } from 'react'
import { CoupleCard } from '@/types'
import CardComponent from './CardComponent'
import { Flex } from 'antd'

type BattleFieldProps = {
  cards: CoupleCard
}

const BattleField: FC<BattleFieldProps> = ({ cards }) => {
  return (
    <div>
      <Flex>
        {cards.his.map((card) => (
          <CardComponent card={card} key={card.id} />
        ))}
      </Flex>
      <Flex>
        {cards.my.map((card) => (
          <CardComponent card={card} key={card.id} />
        ))}
      </Flex>
    </div>
  )
}

export default BattleField
