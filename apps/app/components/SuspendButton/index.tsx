import { Box, Center, HStack, StyleProps } from '@chakra-ui/react'
import styled from '@emotion/styled'
import React from 'react'

import ReplySVG from '../../assets/preview/reply-white.svg'
import ForwardSVG from '../../assets/preview/forward-white.svg'
import TrashSVG from '../../assets/preview/trash-white.svg'

interface listItem {
  type: SuspendButtonType
  onClick: () => void
}

interface Props {
  list: Array<listItem>
}

export enum SuspendButtonType {
  Reply,
  Forward,
  Delete,
  Restore,
  Trash,
}

interface buttonItemConfig {
  Icon: React.FC
  name: string
  propsStyle?: StyleProps
  useLine?: boolean
}

const buttonConfig: Record<SuspendButtonType, buttonItemConfig> = {
  [SuspendButtonType.Restore]: {
    Icon: ReplySVG,
    name: 'Restore',
    propsStyle: { w: '200px' },
  },
  [SuspendButtonType.Reply]: {
    Icon: ReplySVG,
    name: 'Reply',
  },
  [SuspendButtonType.Forward]: {
    Icon: ForwardSVG,
    name: 'Forward',
  },
  [SuspendButtonType.Delete]: {
    useLine: true,
    Icon: TrashSVG,
    name: 'Delete',
  },
  [SuspendButtonType.Trash]: {
    useLine: true,
    Icon: TrashSVG,
    name: 'Trash',
  },
}

const ButtonItem = styled(Center)`
  flex-direction: column;
  padding: 15px;
  :hover {
    background: #1f1f1f;
  }
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;

  .line {
    position: absolute;
    width: 1px;
    height: 70%;
    top: 50%;
    left: 0;
    background-color: #c4c4c4;
    transform: translateY(-50%);
  }
`

export const SuspendButton: React.FC<Props> = (props) => {
  const { list } = props

  return (
    <Box
      position="fixed"
      left="50%"
      bottom="20px"
      transform="translateX(-50%)"
      zIndex={99}
    >
      <HStack
        borderRadius="32px"
        background="#000"
        fontSize="18px"
        spacing="0px"
        color="#fff"
        overflow="hidden"
      >
        {list.map((item) => {
          const { onClick, type } = item
          const config = buttonConfig[type]
          const { Icon, name, useLine, propsStyle } = config

          return (
            <ButtonItem key={type} onClick={onClick} {...propsStyle}>
              {useLine && <Box className="line" />}
              <Box>
                <Icon />
              </Box>
              <Box>{name}</Box>
            </ButtonItem>
          )
        })}
      </HStack>
    </Box>
  )
}
