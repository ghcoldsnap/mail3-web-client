import { Box, Flex, Grid, Heading, Link, Text } from '@chakra-ui/react'
import { Logo } from 'ui'
import { RollingBackground } from './rollingSubtitles'
import { GithubIcon, MirrorIcon } from '../SocialIcons'
import { GITHUB_URL, MIRROR_URL } from '../../constants/env'

export const Developers: React.FC = () => (
  <Box position="relative" h="611px" overflow="hidden">
    <RollingBackground
      count={1}
      position="absolute"
      top="0"
      left="0"
      h="full"
      zIndex={0}
    />
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      w="full"
      h="full"
      pt="60px"
      position="relative"
      zIndex={1}
    >
      <Logo
        iconProps={{ w: '50px', h: '50px' }}
        textProps={{ w: '135px', h: '42px' }}
        h="50px"
        w="auto"
        mx="auto"
      />
      <Heading fontSize="48px" lineHeight="128%" mt="70px">
        mail <sup>3</sup> me button
      </Heading>
      <Text
        textAlign="center"
        fontSize="26px"
        lineHeight="36px"
        fontWeight="300"
      >
        Embed decentralized communication features for your own product
      </Text>
      <Grid
        templateColumns="repeat(2, 373px)"
        templateRows="225px"
        gap="20px"
        mt="47px"
        css={`
          .item {
            background-color: #ffffff;
            box-shadow: 0 0 7px rgba(0, 0, 0, 0.25);
            border-radius: 16px;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            line-height: 26px;
            flex-direction: column;
            padding: 0 26px;
            text-align: center;
            display: flex;
          }
          .item:hover {
            text-decoration: none;
            transform: scale(1.05);
          }
        `}
      >
        <Link className="item" href={MIRROR_URL} target="_blank">
          <MirrorIcon w="48px" h="48px" />
          <Text mt="17px">View our best access cases on mirror</Text>
        </Link>
        <Link className="item" href={GITHUB_URL} target="_blank">
          <GithubIcon w="48px" h="48px" />
          <Text mt="17px">Check out the mail me button access on Github</Text>
        </Link>
      </Grid>
    </Flex>
  </Box>
)
