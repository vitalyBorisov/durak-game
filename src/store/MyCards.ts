import { Card } from '@/types'
import { makeObservable, observable } from 'mobx'
import PlayerCards from './PlayerCards'
import { game } from '.'

export class MyCards extends PlayerCards {
  cards: Array<Card> = []

  constructor() {
    super()
    makeObservable(this, { cards: observable })
  }

  checkMyStep(card: Card, buttleFieldCards: Card[]) {
    if (game.isMyAttack) {
      return this.myAttack(card, buttleFieldCards)
    }

    return this.myDefense(card, game.attackCard)
  }

  myAttack(card: Card, battleFieldCards: Card[]) {
    if (
      !battleFieldCards.length ||
      battleFieldCards.some((c) => c.rank === card.rank)
    ) {
      game.setAttackCard(card)
      this.reduceCard(card.id)
      return card
    }
    alert('Такой карты нет на поле битвы')
  }

  myDefense(card: Card, attackCard: Card) {
    const strongerCard =
      card.rank > attackCard.rank && card.type === attackCard.type
    const strongerTrumpCard =
      attackCard.type !== game.trumpCard && card.type === game.trumpCard

    if (strongerCard || strongerTrumpCard) {
      this.reduceCard(card.id)
      return card
    }

    alert('У него карта сильнее')
  }
}

const myCards = new MyCards()

export default myCards
