import { ICard } from '@/types'
import { action, makeObservable, observable } from 'mobx'

class PlayerCards {
  cards: Array<ICard> = []

  constructor() {
    makeObservable(this, {
      cards: observable,
      reduceCard: action,
      addCards: action,
      clearCards: action,
    })
  }

  reduceCard(id: number): void {
    this.cards = this.cards.filter((card) => card.id !== id)
  }

  addCards(cards: Array<ICard>): void {
    this.cards = [...this.cards, ...cards]
  }

  clearCards(): void {
    this.cards = []
  }
}

export default PlayerCards
