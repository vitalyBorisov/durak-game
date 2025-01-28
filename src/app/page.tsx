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
import { ICard } from '@/types'
import { useStore } from '@/hooks/useStore'

const Home: FC = observer(() => {
  const [messageApi, contextHolder] = message.useMessage()
  const { gameStore, hisCardsStore, myCardsStore, battleFieldStore } =
    useStore()

  const startGame = () => {
    gameStore.startGame()
  }

  const hisAction = () => {
    if (!gameStore.isMyStep) {
      const hisJuniorCard = hisCardsStore.defineCardForAction()

      if (hisJuniorCard) {
        battleFieldStore.addHisCard(hisJuniorCard)
      } else {
        battleFieldStore.clearBattleField()
      }
    }
  }

  useEffect(startGame, [])

  useEffect(hisAction, [gameStore.isMyStep])

  const clickMyCard = (card: ICard) => {
    if (gameStore.isMyStep) {
      const myStepCard = myCardsStore.checkMyStep(card)
      if (myStepCard) {
        battleFieldStore.addMyCard(myStepCard)
      } else {
        if (gameStore.isMyAttack) {
          messageApi.warning('Такой карты нет на поле битвы')
        } else {
          messageApi.warning('У него карта сильнее')
        }
      }
    }
  }

  const getCard = () => {
    myCardsStore.addCards([
      ...battleFieldStore.cards.my,
      ...battleFieldStore.cards.his,
    ])
    gameStore.toggleStep()
    gameStore.setIsGetCard(true)
    battleFieldStore.clearBattleField()
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
      <HisCards cards={hisCardsStore.cards} />
      <BattleField cards={battleFieldStore.cards} />
      <MyCards cards={myCardsStore.cards} onStep={clickMyCard} />
      <Deck
        trump={gameStore.trumpCard}
        cardBallance={gameStore.deckCards.length}
      />
      <MyActions
        isMyAttack={gameStore.isMyAttack}
        onRepulsed={() => battleFieldStore.clearBattleField()}
        onGetCard={getCard}
      />
      <GameOver
        isShow={
          !gameStore.deckCards.length &&
          (!myCardsStore.cards.length || !hisCardsStore.cards.length)
        }
        isMyWin={!myCardsStore.cards.length}
        onRestartGame={startGame}
      />
    </Flex>
  )
})

export default Home
