import {
  ConnectWallet as ConnectWalletButton,
  ConnectWalletProps,
  ConnectWalletApiContext,
} from 'connect-wallet-ui'

import { useMemo } from 'react'
import {
  useIsAuthenticated,
  useOpenAuthModal,
  useUnstaopable,
} from '../../hooks/useLogin'
import { useRemember } from '../../hooks/useRemember'
import { UD_CLIENT_ID, UD_REDIRECT_URI } from '../../constants'

export * from 'connect-wallet-ui'

export const ConnectWalletApiContextProvider: React.FC = ({ children }) => {
  const isAuth = useIsAuthenticated()
  const { onRemember, isLoading: isRemembering } = useRemember()
  const openAuthModal = useOpenAuthModal()
  const { setUnstopableUserInfo, unstaopableUserInfo, setIsConnectingUD } =
    useUnstaopable()
  const providerValue = useMemo(
    () => ({
      onRemember,
      isRemembering,
      isAuth,
      udClientId: UD_CLIENT_ID,
      udRedirectUri: UD_REDIRECT_URI,
      openAuthModal,
      setUnstopableUserInfo,
      unstaopableUserInfo,
      setIsConnectingUD,
    }),
    [
      onRemember,
      isRemembering,
      isAuth,
      UD_CLIENT_ID,
      UD_REDIRECT_URI,
      openAuthModal,
      setUnstopableUserInfo,
      unstaopableUserInfo,
      setIsConnectingUD,
    ]
  )

  return (
    <ConnectWalletApiContext.Provider value={providerValue}>
      {children}
    </ConnectWalletApiContext.Provider>
  )
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({ ...props }) => (
  <ConnectWalletApiContextProvider>
    <ConnectWalletButton {...props} />
  </ConnectWalletApiContextProvider>
)
