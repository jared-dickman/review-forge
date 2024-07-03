import {GlobalNavigation, Icon, IGlobalNavigationItem, IGlobalNavigationLogo} from '@mparticle/aquarium'
import {AppName} from 'src/components/App.tsx'

export const AppNavigation = () => {

  const logo = {
    label: AppName,
    icon: <Icon name="alicorn" size="xxl"/>,
    onSuiteLogoClick: goHome,
  } as IGlobalNavigationLogo


  const management = [
    {
      label: 'Settings',
      hideLabel: true,
      icon: <Icon name="gear" size="xl"/>,
      type: 'menu',
      isActive: false,
      children: [{
        label: 'Account Settings',
        // hrefOptions: { href: `#/account`, },
        // onClick: goToAccount,
      }],
    }
  ] as IGlobalNavigationItem[]

  const tools = [
    {
      label: 'Home',
      icon: <Icon name="grid" size="xl"/>,
      type: 'link',
      isActive: true,
      hrefOptions: { href: `#` },
    }
  ] as IGlobalNavigationItem[]

  return <>
    <GlobalNavigation
      logo={logo}
      tools={tools}
      management={management}
      onMpHomeClick={goHome}
      showSuiteLogo={true}
    />
  </>

  function goHome(): void {}

}
