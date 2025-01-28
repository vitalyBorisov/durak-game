import { FC } from 'react'
import Image from 'next/image'
import { ICard } from '@/types'

type TCardComponentProps = {
  card: ICard
  onClick?: () => void
}

const CardComponent: FC<TCardComponentProps> = ({ card, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <Image
        src={card.img}
        alt={`${card.id}`}
        width={80}
        height={110}
        priority
      />
    </div>
  )
}

export default CardComponent
