import MyCards from './MyCards'
import HisCards from './HisCards'
import BattleField from './BattleField'
import Game from './Game'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

export default class RootStore {
  gameStore: Game
  myCardsStore: MyCards
  hisCardsStore: HisCards
  battleFieldStore: BattleField

  constructor() {
    this.gameStore = new Game(this)
    this.myCardsStore = new MyCards(this)
    this.hisCardsStore = new HisCards(this)
    this.battleFieldStore = new BattleField(this)
  }
}
