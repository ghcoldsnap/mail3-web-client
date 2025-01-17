import { PageContainer } from 'ui'
import { useRedirectHome } from '../hooks/useRedirectHome'
import { LandingPage } from '../components/LandingPage'
import { InboxComponent } from '../components/Inbox'
import { DriftbottleBanner } from '../components/DriftbottleBanner'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export const HomePage = () => {
  const { redirectHome, isAuth } = useRedirectHome()
  useDocumentTitle(isAuth ? 'Inbox' : 'Home')
  if (!isAuth) {
    return redirectHome()
  }

  return (
    <>
      <PageContainer>
        {!isAuth && <LandingPage />}
        <DriftbottleBanner />
      </PageContainer>
      {isAuth && <InboxComponent />}
    </>
  )
}
