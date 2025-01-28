import { ICard } from '@/types'
import { action, makeObservable } from 'mobx'
import PlayerCards from './PlayerCards'
import RootStore from '.'

export default class HisCards extends PlayerCards {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    super()
    makeObservable(this, {
      defineJuniorExistCard: action,
      defineJuniorCard: action,
      defineCardForAction: action,
      defineCardForAttack: action,
      defineCardForDefense: action,
    })
    this.rootStore = rootStore
  }

  defineJuniorExistCard(battleFieldCards: ICard[]) {
    const existRankCards = this.cards.filter(
      (card) => !!battleFieldCards.find((c) => c.rank === card.rank),
    )

    return existRankCards.length ? this.defineJuniorCard(existRankCards) : null
  }
  defineJuniorCard(cards: ICard[]): ICard {
    const juniorCard = cards.reduce((acc, curCard) =>
      acc.rank < curCard.rank ? acc : curCard,
    )

    if (juniorCard) this.reduceCard(juniorCard.id)

    return juniorCard
  }

  defineCardForAction() {
    const battleFieldCards = [
      ...this.rootStore.battleFieldStore.cards.his,
      ...this.rootStore.battleFieldStore.cards.my,
    ]
    if (this.rootStore.gameStore.isMyAttack) {
      return this.defineCardForDefense(battleFieldCards)
    }

    return this.defineCardForAttack(battleFieldCards)
  }

  defineCardForAttack = (battleFieldCards: ICard[]) => {
    if (this.cards.length) {
      let cardForAttack = null
      if (!battleFieldCards.length) {
        const trumpCards = this.cards.filter(
          (card) => card.type === this.rootStore.gameStore.trumpCard,
        )
        const notTrumpCards = this.cards.filter(
          (card) => card.type !== this.rootStore.gameStore.trumpCard,
        )

        if (notTrumpCards.length) {
          cardForAttack = this.defineJuniorCard(notTrumpCards)
        } else {
          cardForAttack = this.defineJuniorCard(trumpCards)
        }
        this.rootStore.gameStore.setAttackCard(cardForAttack)
        return cardForAttack
      }

      cardForAttack = this.defineJuniorExistCard(battleFieldCards)
      if (cardForAttack) {
        this.rootStore.gameStore.setAttackCard(cardForAttack)
      }
      return cardForAttack
    }
  }

  defineCardForDefense(battleFieldCards: ICard[]) {
    const attackCard = this.rootStore.gameStore.attackCard

    if (attackCard) {
      const higherCards = this.cards.filter(
        (card) => card.type === attackCard.type && card.rank > attackCard.rank,
      )

      const trumpCards = this.cards.filter(
        (card) => card.type === this.rootStore.gameStore.trumpCard,
      )

      if (higherCards.length) {
        return this.defineJuniorCard(higherCards)
      }

      if (
        attackCard.type !== this.rootStore.gameStore.trumpCard &&
        trumpCards.length
      ) {
        return this.defineJuniorCard(trumpCards)
      }

      this.addCards(battleFieldCards)
      this.rootStore.gameStore.toggleStep()
      this.rootStore.gameStore.setIsGetCard(true)
    }
  }
}
