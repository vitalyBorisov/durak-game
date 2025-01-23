import { FC } from 'react'
import { CoupleCard } from '@/types'
import CardComponent from './CardComponent'

type BattleFieldProps = {
  cards: CoupleCard
}

const BattleField: FC<BattleFieldProps> = ({ cards }) => {
  return (
    <div>
      <div className="battleField">
        {cards.his.map((card) => (
          <CardComponent card={card} key={card.id} />
        ))}
      </div>
      <div className="battleField">
        {cards.my.map((card) => (
          <CardComponent card={card} key={card.id} />
        ))}
      </div>
    </div>
  )
}

export default BattleField
