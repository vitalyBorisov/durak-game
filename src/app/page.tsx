'use client'

import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import './page.module.css'
import HisCards from '@/components/HisCards'
import BattleField from '@/components/BattleField'
import MyCards from '@/components/MyCards'
import Deck from '@/components/Deck'
import MyActions from '@/components/MyActions'
import GameOver from '@/components/GameOver'
import { battleField, hisCards, myCards, game } from '@/store'
import { Card } from '@/types'

const Home = observer(() => {
  const startGame = () => {
    const { firstHisCards, firstMyCards } = game.startGame()
    hisCards.addCards(firstHisCards)
    myCards.addCards(firstMyCards)
  }

  const hisAction = () => {
    if (!game.isMyStep) {
      const battleFieldCards = [
        ...battleField.cards.his,
        ...battleField.cards.my,
      ]

      const hisJuniorCard = hisCards.defineCardForAction(battleFieldCards)

      if (hisJuniorCard) {
        battleField.addHisCard(hisJuniorCard)
      } else {
        battleField.clearBattleField(myCards, hisCards)
      }
    }
  }

  useEffect(startGame, [])

  useEffect(hisAction, [game.isMyStep])

  const clickMyCard = (card: Card) => {
    if (game.isMyStep) {
      const myStepCard = myCards.checkMyStep(card, [
        ...battleField.cards.my,
        ...battleField.cards.his,
      ])
      if (myStepCard) {
        battleField.addMyCard(myStepCard)
      }
    }
  }

  const getCard = () => {
    myCards.addCards([...battleField.cards.my, ...battleField.cards.his])
    game.toggleStep()
    game.setIsGetCard(true)
    battleField.clearBattleField(myCards, hisCards)
  }

  return (
    <div className="app">
      <HisCards cards={hisCards.cards} />
      <BattleField cards={battleField.cards} />
      <MyCards cards={myCards.cards} onStep={clickMyCard} />
      <Deck trump={game.trumpCard} cardBallance={game.deckCards.length} />
      <MyActions
        isMyAttack={game.isMyAttack}
        onRepulsed={() => battleField.clearBattleField(myCards, hisCards)}
        onGetCard={getCard}
      />
      <GameOver
        isShow={
          !game.deckCards.length &&
          (!myCards.cards.length || !hisCards.cards.length)
        }
        isMyWin={!myCards.cards.length}
        onRestartGame={startGame}
      />
    </div>
  )
})

export default Home
