import myCards from './MyCards'
import hisCards from './HisCards'
import battleField from './BattleField'
import Game from './Game'
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')

const game = new Game()
export { myCards, hisCards, battleField, game }
