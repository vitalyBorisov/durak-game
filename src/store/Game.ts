import { makeAutoObservable } from 'mobx'
import { ICard, TypeCard } from '@/types'
import { cards as allCards } from '@/cards'
import RootStore from '.'

class Game {
  trumpCard: TypeCard = TypeCard.bubi
  isMyStep: boolean = false
  isGetCard: boolean = false
  isMyAttack: boolean = false
  deckCards: ICard[] = []
  attackCard: ICard = allCards[0]
  rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeAutoObservable(this)
    this.rootStore = rootStore
  }

  toggleStep() {
    this.isMyStep = !this.isMyStep
  }

  toggleAttack() {
    this.isMyAttack = !this.isMyAttack
  }

  setIsGetCard(isGetCard: boolean) {
    this.isGetCard = isGetCard
  }

  setAttackCard(card: ICard) {
    this.attackCard = card
  }

  defineStep() {
    const myJuniorTrumpRank = this.defineJuniorTrumpCard(
      this.rootStore.myCardsStore.cards,
    )
    const hisJuniorTrumpRank = this.defineJuniorTrumpCard(
      this.rootStore.hisCardsStore.cards,
    )

    if (
      myJuniorTrumpRank &&
      (myJuniorTrumpRank < hisJuniorTrumpRank || !hisJuniorTrumpRank)
    ) {
      this.toggleStep()
      this.toggleAttack()
    }
  }

  mixDeck() {
    this.deckCards = this.deckCards.sort(() => Math.random() - 0.5)
    this.trumpCard = this.deckCards[this.deckCards.length - 1].type
  }

  startGame() {
    this.rootStore.hisCardsStore.clearCards()
    this.rootStore.myCardsStore.clearCards()
    this.deckCards = allCards
    this.mixDeck()

    const firstHisCards = this.reduceCards(6)
    const firstMyCards = this.reduceCards(6)

    this.rootStore.hisCardsStore.addCards(firstHisCards)
    this.rootStore.myCardsStore.addCards(firstMyCards)

    this.defineStep()
  }

  addPlayersCards() {
    const myNeed = 6 - this.rootStore.myCardsStore.cards.length
    const hisNeed = 6 - this.rootStore.hisCardsStore.cards.length
    this.rootStore.myCardsStore.addCards(
      this.reduceCards(myNeed > 0 ? myNeed : 0),
    )
    this.rootStore.hisCardsStore.addCards(
      this.reduceCards(hisNeed > 0 ? hisNeed : 0),
    )
  }

  defineJuniorTrumpCard(cards: ICard[]) {
    const trumpRanks = cards
      .filter((card) => card.type === this.trumpCard)
      .map((card) => card.rank)

    if (trumpRanks.length) {
      return Math.min(...trumpRanks)
    }
    return 0
  }

  reduceCards(countCards: number): ICard[] {
    return this.deckCards.splice(0, countCards)
  }
}

export default Game
