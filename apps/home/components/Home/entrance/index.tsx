import { Flex, Box, Grid, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import LogoNoColor from 'assets/svg/logo-no-color.svg?url'
import { useInnerSize } from 'hooks'
import { sleep } from '../../../utils'

const MOBILE_SIZE = 960

const BoxStyled = styled(Box)`
  width: 100%;
  height: 100%;
  position: relative;
  &::before {
    content: ' ';
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000;
    transform: scale(0.16);
    transition: 2000ms;
    @media (max-width: ${MOBILE_SIZE}px) {
      transform: scale(0.22);
    }
  }
  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(${LogoNoColor});
    background-repeat: no-repeat;
    background-size: 80%;
    background-position: center;
    opacity: 0;
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    filter: invert(100%);
  }
  &:hover::after {
    animation: 2s show-envelope forwards;
  }
  &:hover::before {
    transform: scale(1);
    transition: 50ms;
  }

  @keyframes show-envelope {
    0%,
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const Entrance: React.FC<{
  onOpen?: () => void
}> = ({ onOpen }) => {
  const { width, height } = useInnerSize()
  const isMobile = width <= MOBILE_SIZE
  const boxSize = isMobile ? '45px' : '60px'
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])
  const [coverInfo, setCoverInfo] = useState<{
    clientX: number
    clientY: number
    isOpen: boolean
  }>({
    clientX: -1,
    clientY: -1,
    isOpen: false,
  })

  return (
    <Flex
      position="fixed"
      h="calc(100vh - 60px)"
      w="full"
      top="60px"
      left="0"
      bg="rgba(255, 255, 255, 1)"
      zIndex={999}
      display="flex"
      justify="center"
      align="center"
      overflowX="hidden"
      overflowY="auto"
      py="30px"
    >
      <Flex direction="column" justify="center" align="center">
        <Grid
          templateColumns={`repeat(${isMobile ? 8 : 16}, ${boxSize})`}
          templateRows={`repeat(${isMobile ? 9 : 8}, ${boxSize})`}
          onClick={async (e) => {
            await setCoverInfo({
              clientX: e.clientX,
              clientY: e.clientY,
              isOpen: true,
            })
            await sleep(500)
            onOpen?.()
          }}
        >
          {new Array(16 * 8)
            .fill(0)
            .map((_, i) => i)
            .map((i) => (
              <BoxStyled key={i} />
            ))}
        </Grid>
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          overflow="hidden"
          pointerEvents="none"
          zIndex={2}
        >
          <Box
            position="absolute"
            top={`${coverInfo.clientY - 110}px`}
            left={`${coverInfo.clientX - 50}px`}
            w="100px"
            h="100px"
            bg="#000"
            style={{
              transition: coverInfo.isOpen ? 'transform 500ms' : '0',
              transformOrigin: 'center',
              transform: coverInfo.isOpen
                ? `scale(${Math.max(height, width) / 50})`
                : `scale(0)`,
            }}
          />
        </Box>
        <Heading pl="20px" w="full" fontSize="24px" lineHeight="36px">
          Communicate with everyone <br />
          in web3
        </Heading>
      </Flex>
    </Flex>
  )
}
