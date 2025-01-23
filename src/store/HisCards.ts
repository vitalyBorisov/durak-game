import { Card } from '@/types'
import { makeObservable, observable } from 'mobx'
import PlayerCards from './PlayerCards'
import { game } from '.'

export class HisCards extends PlayerCards {
  cards: Array<Card> = []

  constructor() {
    super()
    makeObservable(this, { cards: observable })
  }

  defineJuniorExistCard(battleFieldCards: Card[]) {
    const existRankCards = this.cards.filter(
      (card) => !!battleFieldCards.find((c) => c.rank === card.rank),
    )

    return existRankCards.length ? this.defineJuniorCard(existRankCards) : null
  }
  defineJuniorCard(cards: Card[]): Card {
    const juniorCard = cards.reduce((acc, curCard) =>
      acc.rank < curCard.rank ? acc : curCard,
    )

    if (juniorCard) this.reduceCard(juniorCard.id)

    return juniorCard
  }

  defineCardForAction(battleFieldCards: Card[]) {
    if (game.isMyAttack) {
      return this.defineCardForDefense(game.attackCard, battleFieldCards)
    }

    return this.defineCardForAttack(battleFieldCards)
  }

  defineCardForAttack = (battleFieldCards: Card[]) => {
    if (this.cards.length) {
      let cardForAttack = null
      if (!battleFieldCards.length) {
        const trumpCards = this.cards.filter(
          (card) => card.type === game.trumpCard,
        )
        const notTrumpCards = this.cards.filter(
          (card) => card.type !== game.trumpCard,
        )

        if (notTrumpCards.length) {
          cardForAttack = this.defineJuniorCard(notTrumpCards)
        } else {
          cardForAttack = this.defineJuniorCard(trumpCards)
        }
        game.setAttackCard(cardForAttack)
        return cardForAttack
      }

      cardForAttack = this.defineJuniorExistCard(battleFieldCards)
      if (cardForAttack) {
        game.setAttackCard(cardForAttack)
      }
      return cardForAttack
    }
  }

  defineCardForDefense(attackCard: Card | null, battleFieldCards: Card[]) {
    if (attackCard) {
      const higherCards = this.cards.filter(
        (card) =>
          card.type === attackCard?.type && card.rank > attackCard?.rank,
      )

      const trumpCards = this.cards.filter(
        (card) => card.type === game.trumpCard,
      )

      if (higherCards.length) {
        return this.defineJuniorCard(higherCards)
      }

      if (attackCard.type !== game.trumpCard && trumpCards.length) {
        return this.defineJuniorCard(trumpCards)
      }

      this.addCards(battleFieldCards)
      game.toggleStep()
      game.setIsGetCard(true)
    }
  }
}

const myCards = new HisCards()

export default myCards
