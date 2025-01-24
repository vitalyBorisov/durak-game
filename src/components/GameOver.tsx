import { Button, Flex, Typography } from 'antd'

interface IGameOverProps {
  isShow: boolean
  isMyWin: boolean
  onRestartGame: () => void
}

const { Text } = Typography

const GameOver: React.FC<IGameOverProps> = ({
  isShow,
  isMyWin,
  onRestartGame,
}) => {
  return isShow ? (
    <Flex
      className="game-over"
      justify="center"
      align="center"
      gap={30}
      vertical
    >
      <Text type={isMyWin ? 'success' : 'danger'} strong>
        {isMyWin ? 'Поздравляю! Ты выиграл!' : 'Увы! Ты проиграл!'}
      </Text>
      <Button
        color="green"
        variant="filled"
        className="game-over-btn"
        onClick={onRestartGame}
      >
        Играть еще раз?
      </Button>
    </Flex>
  ) : null
}

export default GameOver
