'use client'

import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { Flex, message } from 'antd'
import './page.module.css'
import HisCards from '@/components/HisCards'
import BattleField from '@/components/BattleField'
import MyCards from '@/components/MyCards'
import Deck from '@/components/Deck'
import MyActions from '@/components/MyActions'
import GameOver from '@/components/GameOver'
import { battleField, hisCards, myCards, game } from '@/store'
import { ICard } from '@/types'

const Home: FC = observer(() => {
  const [messageApi, contextHolder] = message.useMessage()

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

  const clickMyCard = (card: ICard) => {
    if (game.isMyStep) {
      const myStepCard = myCards.checkMyStep(card, [
        ...battleField.cards.my,
        ...battleField.cards.his,
      ])
      if (myStepCard) {
        battleField.addMyCard(myStepCard)
      } else if (game.isMyAttack) {
        messageApi.warning('Такой карты нет на поле битвы')
      } else {
        messageApi.warning('У него карта сильнее')
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
    <Flex
      gap="middle"
      vertical
      justify="space-around"
      align="center"
      className="app"
    >
      {contextHolder}
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
    </Flex>
  )
})

export default Home
