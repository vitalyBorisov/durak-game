import { action, makeObservable, observable } from 'mobx'
import { ICard, CoupleCard } from '@/types'
import RootStore from '.'

export default class BattleField {
  cards: CoupleCard = {
    my: [],
    his: [],
  }
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      cards: observable,
      addMyCard: action,
      addHisCard: action,
      clearBattleField: action,
    })
    this.rootStore = rootStore
  }

  addMyCard = (card: ICard) => {
    this.cards.my.push(card)
    this.rootStore.gameStore.toggleStep()
  }

  addHisCard = (card: ICard) => {
    this.cards.his.push(card)
    this.rootStore.gameStore.toggleStep()
  }

  clearBattleField() {
    this.cards.my = []
    this.cards.his = []
    this.rootStore.gameStore.addPlayersCards()

    if (!this.rootStore.gameStore.isGetCard) {
      this.rootStore.gameStore.toggleStep()
      this.rootStore.gameStore.toggleAttack()
    } else {
      this.rootStore.gameStore.setIsGetCard(false)
    }
  }
}
