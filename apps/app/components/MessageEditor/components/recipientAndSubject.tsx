import {
  Box,
  Flex,
  Input,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Heading,
  Button as RowButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Button } from 'ui'
import styled from '@emotion/styled'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useTranslation } from 'next-i18next'
import { From } from './from'
import { ToInput } from './toInput'
import { InlineCheckbox } from './inlineCheckbox'
import { useSubject } from '../hooks/useSubject'

const SUBJECT_TEXT_LIMIT = 80

export const Item = styled(Flex)`
  align-items: center;
  border-bottom: 1px solid #e7e7e7;
  margin-bottom: 16px;
  min-height: 38px;
  padding-top: 4px;
  padding-bottom: 4px;
`

const ItemPx = { base: '20px', md: 0 }

export const ItemField = styled(Box)`
  margin-right: 10px;
  color: #6f6f6f;
  font-size: 14px;
  user-select: none;
`

export const RecipientAndSubject: React.FC = () => {
  const {
    subject,
    setSubject,
    toAddresses,
    setToAddresses,
    ccAddresses,
    setCcAddresses,
    bccAddresses,
    setBccAddresses,
    setFromAddress,
  } = useSubject()
  const { t } = useTranslation('edit-message')
  const [isEnabledCC, setIsEnabledCC] = useState(false)
  const [isEnabledBCC, setIsEnabledBCC] = useState(false)
  const {
    isOpen: isOpenCommunityDialog,
    onOpen: onOpenCommunityDialog,
    onClose: onCloseCommunityDialog,
  } = useDisclosure()
  const headingText = "You've found a super cool feature."
  const isFoldCcAndBcc = useBreakpointValue({ base: false, md: true })
  useEffect(() => {
    if (!isFoldCcAndBcc) {
      if (isEnabledCC || isEnabledBCC) {
        setIsEnabledCC(true)
        setIsEnabledBCC(true)
      }
    }
  }, [isFoldCcAndBcc])
  return (
    <>
      <Item h="38px" px={ItemPx}>
        <ItemField>{t('from')}</ItemField>
        <From onChange={setFromAddress} />
      </Item>
      <Item px={ItemPx}>
        <ItemField>To</ItemField>
        <ToInput onChange={setToAddresses} defaultAddresses={toAddresses} />
        <Stack direction="row" spacing="5px">
          <InlineCheckbox checked onClick={onOpenCommunityDialog}>
            {t('community')}
          </InlineCheckbox>
          <RowButton
            variant="unstyled"
            color="#000"
            display={{ base: 'inline-block', md: 'none' }}
            w="30px"
            h="100%"
            minW="unset"
            onClick={() => {
              setIsEnabledCC((b) => !b)
              setIsEnabledBCC((b) => !b)
            }}
          >
            <ChevronDownIcon
              w="15px"
              h="15px"
              style={{
                transform: `rotate(${
                  isEnabledCC && isEnabledBCC ? '180' : '0'
                }deg)`,
              }}
            />
          </RowButton>
          <InlineCheckbox
            display={{ base: 'none', md: 'inline-block' }}
            checked={isEnabledCC}
            onChangeChecked={setIsEnabledCC}
            color="#858585"
            activeBorderColor="#858585"
          >
            {t('cc')}
          </InlineCheckbox>
          <InlineCheckbox
            display={{ base: 'none', md: 'inline-block' }}
            checked={isEnabledBCC}
            onChangeChecked={setIsEnabledBCC}
            color="#858585"
            activeBorderColor="#858585"
          >
            {t('bcc')}
          </InlineCheckbox>
        </Stack>
      </Item>
      {isEnabledCC ? (
        <Item px={ItemPx}>
          <ItemField> {t('cc')}</ItemField>
          <ToInput onChange={setCcAddresses} defaultAddresses={ccAddresses} />
        </Item>
      ) : null}
      {isEnabledBCC ? (
        <Item px={ItemPx}>
          <ItemField> {t('bcc')}</ItemField>
          <ToInput onChange={setBccAddresses} defaultAddresses={bccAddresses} />
        </Item>
      ) : null}
      <Item
        h="38px"
        px={{
          base: '20px',
          md: '0',
        }}
      >
        <ItemField>{t('subject')}</ItemField>
        <Input
          variant="unstyled"
          fontSize="14px"
          lineHeight="28px"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={SUBJECT_TEXT_LIMIT}
        />
        <Box color="#B7B7B7" fontSize="12px">
          {SUBJECT_TEXT_LIMIT - subject.length}
        </Box>
      </Item>
      <Modal
        isOpen={isOpenCommunityDialog}
        onClose={onCloseCommunityDialog}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          w="calc(100% - 40px)"
          h="100%"
          maxH="578px"
          maxW="855px"
          rounded="48px"
          py="32px"
        >
          <ModalBody>
            <Heading fontSize="24px" textAlign="center" lineHeight="36px">
              Congratulations!
              <br />
              {headingText}
            </Heading>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button w="218px">Next</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
