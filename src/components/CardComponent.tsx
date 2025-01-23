import { FC } from 'react'
import { Card } from '@/types'
// import Image from 'next/image'

type TCardComponentProps = {
  card: Card
  onClick?: () => void
}

const CardComponent: FC<TCardComponentProps> = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.img} alt={`${card.id}`} width={80} />
    </div>
  )
}

export default CardComponent
