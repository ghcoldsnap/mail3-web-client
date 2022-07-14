import { Box, Flex, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import React from 'react'

import IMGClear from '../../assets/mailbox/clear.png'
import { ReactComponent as SVGBottom } from '../../assets/mailbox/is-bottom.svg'
import { ReactComponent as SVGNone } from '../../assets/mailbox/none.svg'
import IMGNewNone from '../../assets/mailbox/new-none.png'

export const EmptyStatus = () => {
  const [t] = useTranslation('mailboxes')

  return (
    <Flex h="500px" justifyContent="center" alignItems="center">
      <Box>
        <Box
          fontSize="20px"
          fontWeight={500}
          lineHeight="30px"
          marginBottom="30px"
        >
          {t('inbox.all-clear')}
        </Box>
        <Image src={IMGClear} />
      </Box>
    </Flex>
  )
}

export const ThisBottomStatus = () => {
  const [t] = useTranslation('mailboxes')

  return (
    <Flex h="200px" justifyContent="center" alignItems="center">
      <Box>
        <Box
          fontSize="12px"
          fontWeight={400}
          lineHeight="18px"
          marginBottom="20px"
          textAlign="center"
        >
          {t('this-is-bottom')}
        </Box>
        <SVGBottom />
      </Box>
    </Flex>
  )
}

export const ClearStatus = () => {
  const [t] = useTranslation('mailboxes')

  return (
    <Flex h="500px" justifyContent="center" alignItems="center">
      <Box>
        <Box
          fontSize="16px"
          fontWeight={400}
          lineHeight="18px"
          marginBottom="20px"
          textAlign="center"
        >
          {t('trash.clear')}
        </Box>
        <SVGNone />
      </Box>
    </Flex>
  )
}

export const NoNewStatus = () => {
  const [t] = useTranslation('mailboxes')

  return (
    <Flex h="300px" justifyContent="center" alignItems="center">
      <Box textAlign="center">
        <Box
          fontSize="20px"
          fontWeight={500}
          lineHeight="30px"
          marginBottom="30px"
        >
          {t('inbox.no-new')}
        </Box>
        <Box mr="40px">
          <Image src={IMGNewNone} />
        </Box>
      </Box>
    </Flex>
  )
}
