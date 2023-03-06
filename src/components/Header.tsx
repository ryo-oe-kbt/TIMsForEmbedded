import { Box, Typography, SvgIcon, Breadcrumbs, Link } from '@mui/material'
import { FC } from 'react'
import { Theme } from '@mui/material'
import { ReactComponent as MenuIcon } from '../assets/icons/menu_white.svg'
import { CurrentMenu } from '../Tims'
import { menus, OVERALL_REPORT_NAME, TOP_REPORT_NAME } from '../menuConfig'
// アクセスカウンター
import { accessCountApi } from '../components/api/AccessCountApi'

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '13px 0',
    margin: '0 26px 0 30px',
    borderBottom: (theme: Theme) => `1px solid ${theme.colors.line}`,
  },
  hamburgerIcon: {
    cursor: 'pointer',
    width: 'auto',
    height: 'auto',
  },
}

const StyledLink = ({ children, ...props }: any) => {
  return props.onClick === undefined ? (
    <Typography>{children}</Typography>
  ) : (
    <Link
      underline="hover"
      color="inherit"
      {...props}
      sx={{ cursor: 'pointer' }}
    >
      {children}
    </Link>
  )
}

type Props = {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  isOpenMenu: boolean
  currentMenu: CurrentMenu
  setCurrentMenu: React.Dispatch<React.SetStateAction<CurrentMenu>>
}

export const Header: FC<Props> = ({
  isOpenMenu,
  setIsOpenMenu,
  currentMenu,
  setCurrentMenu,
}) => {
  // パンくずリストに工場全体が押下される時
  const handleBackToOverallReport = () => {
    const mainReport = menus
      .find((menu) => menu.title === OVERALL_REPORT_NAME)
    const overallReport = menus
      .find((menu) => menu.title === OVERALL_REPORT_NAME)
      ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
    setCurrentMenu({
      mainTitle: OVERALL_REPORT_NAME,
      mainAccessCountTitle: mainReport?.accessCountTitle,
      subMenuTitle: overallReport?.title,
      subMenuAccessCountTitle: overallReport?.accessCountTitle,
      subMenuEmbedUrl: overallReport?.embedUrl,
      subMenuDateSlicerType: overallReport?.dateSlicerType,
      detailTitle: undefined,
      detailAccessCountTitle: undefined,
      detailEmbedUrl: undefined,
      detailsDateSlicerType: undefined,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuAccessCountTitle: undefined,
      underMenuEmbedUrl: undefined,
      underMenuDateSlicerType: undefined,
      noMenuFlag: overallReport?.noMenuFlag ? overallReport?.noMenuFlag : false
    })
    accessCountApi(overallReport?.accessCountTitle, overallReport?.title)
  }

  // パンくずリストに各課が押下される時
  const handleBackToMainReport = () => {
    const report = menus
      .find((menu) => menu.title === currentMenu.mainTitle)
      ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
    setCurrentMenu({
      mainTitle: currentMenu.mainTitle,
      mainAccessCountTitle: currentMenu.mainAccessCountTitle,
      subMenuTitle: report?.title,
      subMenuAccessCountTitle: report?.accessCountTitle,
      subMenuEmbedUrl: report?.embedUrl,
      subMenuDateSlicerType: report?.dateSlicerType,
      detailTitle: undefined,
      detailAccessCountTitle: undefined,
      detailEmbedUrl: undefined,
      detailsDateSlicerType: undefined,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuAccessCountTitle: undefined,
      underMenuEmbedUrl: undefined,
      underMenuDateSlicerType: undefined,
      noMenuFlag: report?.noMenuFlag ? report?.noMenuFlag : false
    })
    accessCountApi(report?.accessCountTitle, report?.title)
  }

  // パンくずリストに各課のサブメニューが押下される時(MARなど)
  const handleBackToSubMenuReport = () => {
    const report = menus
      .find((menu) => menu.title === currentMenu.mainTitle)
      ?.subMenu.find((subMenu) => subMenu.title === currentMenu.subMenuTitle)
    setCurrentMenu({
      mainTitle: currentMenu.mainTitle,
      mainAccessCountTitle: currentMenu.mainAccessCountTitle,
      subMenuTitle: report?.title,
      subMenuAccessCountTitle: report?.accessCountTitle,
      subMenuEmbedUrl: report?.embedUrl,
      subMenuDateSlicerType: report?.dateSlicerType,
      detailTitle: undefined,
      detailAccessCountTitle: undefined,
      detailEmbedUrl: undefined,
      detailsDateSlicerType: undefined,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuAccessCountTitle: undefined,
      underMenuEmbedUrl: undefined,
      underMenuDateSlicerType: undefined,
      noMenuFlag: report?.noMenuFlag
    })
    accessCountApi(report?.accessCountTitle, report?.title)
  }

  // パンくずリストの詳細メニューが押されたとき(S,Q,Cなど)
  const handleBackToDetailMenuReport = () => {
    const report = menus
      .find((menu) => menu.title === currentMenu.mainTitle)
      ?.subMenu.find((subMenu) => subMenu.title === currentMenu.subMenuTitle)
      ?.details.find((detail) => detail.title === currentMenu.detailTitle)
    setCurrentMenu({
      mainTitle: currentMenu.mainTitle,
      mainAccessCountTitle: currentMenu.mainAccessCountTitle,
      subMenuTitle: currentMenu.subMenuTitle,
      subMenuAccessCountTitle: currentMenu.subMenuAccessCountTitle,
      subMenuEmbedUrl: currentMenu.subMenuEmbedUrl,
      subMenuDateSlicerType: currentMenu.detailsDateSlicerType,
      detailTitle: report?.title,
      detailAccessCountTitle: report?.accessCountTitle,
      detailEmbedUrl: report?.embedUrl,
      detailsDateSlicerType: report?.dateSlicerType,
      underMenu: undefined,
      underMenuTitle: undefined,
      underMenuAccessCountTitle: undefined,
      underMenuEmbedUrl: undefined,
      underMenuDateSlicerType: undefined,
      noMenuFlag: false
    })
    accessCountApi(report?.accessCountTitle, report?.title)
  }

  return (
    <Box sx={styles.root}>
      <Box>
        <Breadcrumbs
          separator="＞"
          aria-label="breadcrumb"
          sx={{ color: '#fff' }}
        >
          {currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
            (currentMenu.noMenuFlag ?
              (/* noMenuFlagがtrue */
                <StyledLink
                  key="2"
                  onClick={
                    currentMenu.subMenuTitle !== TOP_REPORT_NAME ||
                      currentMenu.detailTitle !== undefined
                      ? handleBackToMainReport
                      : undefined
                  }
                >
                  {currentMenu.mainTitle}
                </StyledLink>) :
              (/* noMenuFlagがfalse */
                <StyledLink>
                  {currentMenu.mainTitle}
                </StyledLink>)
            )
          }
          {currentMenu.subMenuTitle !== TOP_REPORT_NAME && (
            <StyledLink
              key="3"
              onClick={
                currentMenu.detailTitle !== undefined
                  ? handleBackToSubMenuReport
                  : undefined
              }
            >
              {currentMenu.subMenuTitle}
            </StyledLink>
          )}
          {currentMenu.detailTitle !== undefined && currentMenu.underMenu === undefined && (
            <StyledLink key="4" onClick={
              currentMenu.underMenuTitle !== undefined
                ? handleBackToDetailMenuReport
                : undefined
            }>
              {currentMenu.detailTitle}
            </StyledLink>
          )}
          {currentMenu.underMenuTitle !== undefined && (
            <StyledLink key="5" onClick={undefined}>
              {currentMenu.underMenuTitle}
            </StyledLink>
          )}
        </Breadcrumbs>
      </Box>
    </Box>
  )
}
