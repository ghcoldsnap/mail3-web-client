import { Box } from '@chakra-ui/react'
import { RollingBackground } from './rollingSubtitles'

export const Developers: React.FC = () => (
  <Box h="611px" w="full" position="relative">
    <RollingBackground
      count={1}
      position="absolute"
      top="0"
      left="0"
      h="full"
    />
  </Box>
)
