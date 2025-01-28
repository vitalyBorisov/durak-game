import { ICard } from '@/types'
import { action, makeObservable } from 'mobx'
import PlayerCards from './PlayerCards'
import RootStore from '.'

export default class MyCards extends PlayerCards {
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    super()
    makeObservable(this, {
      checkMyStep: action,
      myAttack: action,
      myDefense: action,
    })
    this.rootStore = rootStore
  }

  checkMyStep(card: ICard) {
    if (this.rootStore.gameStore.isMyAttack) {
      return this.myAttack(card)
    }

    return this.myDefense(card)
  }

  myAttack(card: ICard) {
    const battleFieldCards = [
      ...this.rootStore.battleFieldStore.cards.my,
      ...this.rootStore.battleFieldStore.cards.his,
    ]
    if (
      !battleFieldCards.length ||
      battleFieldCards.some((c) => c.rank === card.rank)
    ) {
      this.rootStore.gameStore.setAttackCard(card)
      this.reduceCard(card.id)
      return card
    }
  }

  myDefense(card: ICard) {
    const attackCard = this.rootStore.gameStore.attackCard
    const strongerCard =
      card.rank > attackCard.rank && card.type === attackCard.type
    const strongerTrumpCard =
      attackCard.type !== this.rootStore.gameStore.trumpCard &&
      card.type === this.rootStore.gameStore.trumpCard

    if (strongerCard || strongerTrumpCard) {
      this.reduceCard(card.id)
      return card
    }
  }
}
