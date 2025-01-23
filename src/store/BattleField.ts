import { action, makeObservable, observable } from 'mobx'
import { Card, CoupleCard } from '@/types'
import { game } from '.'
import { MyCards } from './MyCards'
import { HisCards } from './HisCards'

class BattleField {
  cards: CoupleCard = {
    my: [],
    his: [],
  }

  constructor() {
    makeObservable(this, {
      cards: observable,
      addMyCard: action,
      addHisCard: action,
    })
  }

  addMyCard = (card: Card) => {
    this.cards.my.push(card)
    game.toggleStep()
  }

  addHisCard = (card: Card) => {
    this.cards.his.push(card)
    game.toggleStep()
  }

  clearBattleField(myCards: MyCards, hisCards: HisCards) {
    this.cards.my = []
    this.cards.his = []
    game.addPlayersCards(myCards, hisCards)

    if (!game.isGetCard) {
      game.toggleStep()
      game.toggleAttack()
    } else {
      game.setIsGetCard(false)
    }
  }
}

const battleField = new BattleField()

export default battleField
