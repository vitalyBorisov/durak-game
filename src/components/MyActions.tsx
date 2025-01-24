import { Button, ConfigProvider } from 'antd'
import { FC } from 'react'

type MyActionsProps = {
  isMyAttack: boolean
  onRepulsed: () => void
  onGetCard: () => void
}
const MyActions: FC<MyActionsProps> = ({
  isMyAttack,
  onRepulsed,
  onGetCard,
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 360,
          controlHeight: 50,
        },
        components: {
          Button: { fontWeight: 700 },
        },
      }}
    >
      <Button
        color={isMyAttack ? 'primary' : 'danger'}
        variant="solid"
        className="btn-actions"
        onClick={isMyAttack ? onRepulsed : onGetCard}
        style={{ position: 'fixed' }}
      >
        {isMyAttack ? 'Бито' : 'Беру'}
      </Button>
    </ConfigProvider>
  )
}

export default MyActions
