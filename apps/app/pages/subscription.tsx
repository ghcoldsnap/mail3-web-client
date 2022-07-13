import React, { useEffect, useRef, useState } from 'react'
import { Button, PageContainer } from 'ui'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { TrackEvent, useTrackClick } from 'hooks'
import { Navbar } from '../components/Navbar'
import { FlexButtonBox, MailboxContainer } from '../components/Inbox'
import { InboxNav } from '../components/Inbox/Nav'
import { RoutePath } from '../route/path'
import { SubscriptionBody } from '../components/SubscriptionBody'
import { ReactComponent as SVGWrite } from '../assets/mailbox/write.svg'

const NewPageContainer = styled(PageContainer)`
  @media (max-width: 600px) {
    padding: 0;
  }
`

const StickyWrap = styled(Box)`
  width: 100%;
  background-color: #fff;
  top: -1px;
  position: sticky;
  z-index: 9;
`

interface StickyProps {
  children: any
}
const Sticky: React.FC<StickyProps> = ({ children }) => {
  const refWrap = useRef(null)
  const [isShadow, setIsShadow] = useState(false)

  useEffect(() => {
    if (refWrap.current) {
      const observer = new IntersectionObserver(
        ([e]) => {
          const isSticky = e.intersectionRatio < 1
          setIsShadow(isSticky)
        },
        { threshold: [1] }
      )
      observer.observe(refWrap.current)

      return () => {
        if (refWrap.current) {
          observer.unobserve(refWrap.current)
        }
      }
    }

    return () => {}
  }, [refWrap.current])

  return (
    <StickyWrap
      ref={refWrap}
      style={{
        boxShadow: isShadow ? '0px 0px 10px 4px rgb(25 25 100 / 10%)' : 'none',
      }}
    >
      {children}
    </StickyWrap>
  )
}

export const SubscriptionPage = () => {
  const navi = useNavigate()
  const trackWriteButton = useTrackClick(TrackEvent.ClickWrite)

  return (
    <>
      {/* <Head>
        <title>Mail3: Subscription</title>
      </Head> */}
      <Sticky>
        <PageContainer>
          <Navbar />
        </PageContainer>
      </Sticky>
      <NewPageContainer>
        <Box paddingTop={{ base: '25px', md: '35px' }}>
          <FlexButtonBox>
            <InboxNav />
            <Button
              className="btn-write"
              onClick={() => {
                trackWriteButton()
                navi(RoutePath.NewMessage)
              }}
            >
              <SVGWrite /> <Box ml="10px">Write</Box>
            </Button>
          </FlexButtonBox>

          <MailboxContainer minH="700px">
            <Box padding={{ base: '20px 30px 60px', md: '40px 64px' }}>
              <SubscriptionBody />
            </Box>
          </MailboxContainer>
        </Box>
      </NewPageContainer>
    </>
  )
}
