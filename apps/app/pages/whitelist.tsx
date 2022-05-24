import React from 'react'
import type { NextPage, GetServerSideProps } from 'next'
import { Center, Link } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { PageContainer } from 'ui'
import LogoSvg from 'assets/svg/logo.svg'
import { WhiteList } from '../components/Whitelist'
import { NAVBAR_HEIGHT } from '../constants'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      'whitelist',
      'common',
    ])),
  },
})

const Navbar = () => (
  <Center h={`${NAVBAR_HEIGHT}px`}>
    <Link isExternal href="https://mail3.me">
      <LogoSvg />
    </Link>
  </Center>
)

const WhiteListPage: NextPage = () => (
  <PageContainer>
    <Navbar />
    <WhiteList />
  </PageContainer>
)

export default WhiteListPage