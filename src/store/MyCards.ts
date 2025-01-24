import { ICard } from '@/types'
import { makeObservable } from 'mobx'
import PlayerCards from './PlayerCards'
import { game } from '.'

export class MyCards extends PlayerCards {
  constructor() {
    super()
    makeObservable(this)
  }

  checkMyStep(card: ICard, buttleFieldCards: ICard[]) {
    if (game.isMyAttack) {
      return this.myAttack(card, buttleFieldCards)
    }

    return this.myDefense(card, game.attackCard)
  }

  myAttack(card: ICard, battleFieldCards: ICard[]) {
    if (
      !battleFieldCards.length ||
      battleFieldCards.some((c) => c.rank === card.rank)
    ) {
      game.setAttackCard(card)
      this.reduceCard(card.id)
      return card
    }
  }

  myDefense(card: ICard, attackCard: ICard) {
    const strongerCard =
      card.rank > attackCard.rank && card.type === attackCard.type
    const strongerTrumpCard =
      attackCard.type !== game.trumpCard && card.type === game.trumpCard

    if (strongerCard || strongerTrumpCard) {
      this.reduceCard(card.id)
      return card
    }
  }
}

const myCards = new MyCards()

export default myCards
