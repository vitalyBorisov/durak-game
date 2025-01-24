export enum TypeCard {
  chervi = 'chervi',
  bubi = 'bubi',
  piki = 'piki',
  kresti = 'kresti',
}

export interface ICard {
  id: number
  rank: number
  type: TypeCard
  img: string
}

export interface CoupleCard {
  my: ICard[]
  his: ICard[]
}
