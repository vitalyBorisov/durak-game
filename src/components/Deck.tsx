import { FC } from 'react'
import { TypeCard } from '@/types'
import { ConfigProvider, Flex, Typography } from 'antd'

type DeckProps = {
  trump: TypeCard
  cardBallance: number
}

const { Text } = Typography

const Deck: FC<DeckProps> = ({ trump, cardBallance }) => {
  const trumps = {
    chervi: { color: 'red', code: { __html: '&#9829;' } },
    bubi: { color: 'red', code: { __html: '&#9830;' } },
    kresti: { color: 'black', code: { __html: '&#9827;' } },
    piki: { color: 'black', code: { __html: '&#9824;' } },
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#fff',
        },
      }}
    >
      <Flex align="center" gap="small">
        <div
          className={trumps[trump].color}
          dangerouslySetInnerHTML={trumps[trump].code}
        ></div>
        <Text>{'Остаток в колоде: ' + cardBallance}</Text>
      </Flex>
    </ConfigProvider>
  )
}

export default Deck
