import { Box, Paper, Theme } from '@mui/material'
import { FC, useEffect, useState, useRef, useMemo } from 'react'
import { UserAgentApplication, AuthError, AuthResponse } from 'msal'
import { clientId, scopes } from './authConfig'
import { PowerBIEmbed } from 'powerbi-client-react'
import { models, Report, service, Embed } from 'powerbi-client'
import 'powerbi-report-authoring'
import {
  menus,
} from './menuConfig'
// DatePickerインポート
import { YearPickerCalendar } from './components/YearPickerCalendar'
import { MonthPickerCalendar } from './components/MonthPickerCalendar'
import { WeekPickerCalendar } from './components/WeekPickerCalendar'
import { DayPickerCalendar } from './components/DayPickerCalendar'
import { format, startOfWeek, endOfWeek, addDays, subDays } from 'date-fns'
// アクセスカウンター
import { accessCountApi } from './components/api/AccessCountApi'
import { useLocation } from 'react-router-dom';

// フィルターAPI送信ディレイ
const FILTER_DELAY_MSEC_OF_INIT = 2000;
const FILTER_DELAY_MSEC_OF_MOD = 250;

const styles = {
  root: {
    width: '100%',
  },
  collapseRoot: {
    zIndex: 1000,
    position: 'absolute',
    boxShadow: '0px 3px 6px #2C28281C',
  },
  contentContainer: {
    height: '100vh',
    windth: '100vw',
    overflow: 'hidden',
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    color: (theme: Theme) => theme.colors.white,
  },
  btnList: {
    position: 'relative',
    height: '30px',
    background: (theme: Theme) => theme.colors.mainGreen,
  },
  btnMenu: {
    display: 'flex',
    position: 'absolute',
    left: '90px',
    padding: '2px 0',
    width:'calc( 100% - 56px)',
  },
  powerbiContainer: {
    flexGrow: '1',
    borderRadius: '0',
    background: 'none',
    padding: '0',
    boxShadow: 'none',
  },
  btn: {
    height: 24,
    minWidth: 80,
    display: 'flex',
    justifyContent: 'center',
    width: 'max-content',
    paddingLeft: 2,
    paddingRight: 2,
    alignItems: 'center',
    backgroundColor: '#28b8b9',
    cursor: 'pointer',
    border: (theme: Theme) => `1px solid ${theme.colors.line}`,
    '&:nth-of-type(1)': {
      borderRight: 'none',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:last-child': {
      borderLeft: 'none',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    '&:hover': {
      color: (theme: Theme) => theme.colors.mainGreen,
      backgroundColor: (theme: Theme) => theme.colors.white,
    },
  },
  clickedBtn: {
    color: (theme: Theme) => theme.colors.mainGreen,
    backgroundColor: (theme: Theme) => theme.colors.white,
  },
  bookmarksContainer: {
    position: 'relative',
    boxShadow: '0px 3px 2px #1717172d',
    borderRadius: '8px',
  },
  subMenu: {
    transform: 'translate(0, -21.5px)',
    '& .MuiList-root': {
      py: '11px',
    },
    '& .MuiMenuItem-root': {
      padding: '4px 14px',
      color: (theme: Theme) => theme.colors.gray,
    },
  },
  subMenuPaper: {
    background: '#d8efef',
    overflow: 'visible',
    filter: 'drop-shadow(0px 3px 6px #2c28281c)',
    borderRadius: 0,
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 20,
      width: 20,
      height: 20,
      bgcolor: '#d8efef',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

export type CurrentMenu = {
  mainTitle: string
  mainAccessCountTitle?: string | undefined
  subMenuTitle: string | undefined
  subMenuAccessCountTitle?: string | undefined
  subMenuEmbedUrl: string | undefined
  subMenuDateSlicerType?: string | undefined
}

// POST先テーブル/カラム名
export const FILTER_DATE = 'FILTER_DATE' //テーブル名
export const YEAR_STRING = 'YEAR_STRING' //カラム名(対象：'年')
export const MONTH_STRING = 'MONTH_STRING' //カラム名(対象：'月')
export const START_OF_WEEK = 'START_OF_WEEK' //カラム名(対象：'週')
export const DATE_STRING = 'DATE_STRING' //カラム名(対象：'日')

const NameQuery: React.FC = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const pbiUrl = (query.get('pbiUrl')) as string | undefined;
  const dateSlicerType = (query.get('dateSlicerType')) as string | undefined;

  return (
    <div>
      <p>{pbiUrl}</p>
      <p>{dateSlicerType}</p>
    </div>
  );
}


export const Tims: FC = () => {
  // システム日付
  const today = new Date()
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const pbiUrl = (query.get('pbiUrl')) as string | undefined;
  const dateSlicerType = (query.get('dateSlicerType')) as string | undefined;

  // 現在表示しているPowerBIの情報
  // 初期で工場全体の情報を設定する
  const [currentMenu, setCurrentMenu] = useState<CurrentMenu>({
    // 初期でmainTitleが「工場全体」
    mainTitle: menus[0].title,
    mainAccessCountTitle: menus[0].accessCountTitle
      ? menus[0].accessCountTitle
      : menus[0].title,
    // 初期でsubMenuTitleが「トップ」
    // ※工場全体の場合に、「トップ」を定義しているが、サイドメニューに表示する必要ない、「工場全体」のメニューを押下すると、すぐ「工場全体」のPowerBIを表示する）
    // ※「工場全体」のメニュー以外はメニューをクリックするとサブメニューが現れる
    subMenuTitle: menus[0].subMenu[0].title,
    subMenuAccessCountTitle: menus[0].subMenu[0].accessCountTitle
      ? menus[0].subMenu[0].accessCountTitle
      : menus[0].subMenu[0].title,
    /*
        subMenuEmbedUrl: menus[0].subMenu[0].embedUrl,
        subMenuDateSlicerType: menus[0].subMenu[0].dateSlicerType
          */
    subMenuEmbedUrl: pbiUrl
      ? pbiUrl
      : menus[0].subMenu[0].embedUrl,
    subMenuDateSlicerType: dateSlicerType
      ? dateSlicerType
      : menus[0].subMenu[0].dateSlicerType
  })
  // ブックマークのリスト
  const [bookmarks, setBookmarks] = useState<
    models.IReportBookmark[] | undefined
  >(undefined)

  // Filterのパラメータ
  const [pickerDate, setPickerDate] = useState<Date>(today)

  // 選択しているブックマーク
  const [currentBookmark, setCurrentBookmark] = useState<
    models.IReportBookmark | undefined
  >(undefined)
  // レポートDOMのrefを保管するref
  const reportRef = useRef<Report | undefined>(undefined)
  // トークン
  // アイエンター社内に開発する時、PowerBIのサイトからトークンを取って開発する（1時間ごとに再取得必要）
  // クボタ様を渡す時に、「undefined」で設定
  const accessToken = useRef<string | undefined>(
    undefined
    /*'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzc1NmYxOTYtZDdkYi00NTFiLWIyYTktOWUxYTAxODU1ZmUxLyIsImlhdCI6MTY3MTAwODA2NiwibmJmIjoxNjcxMDA4MDY2LCJleHAiOjE2NzEwMTI2OTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFwb3BZVVpwWmp5aWpjZjc4RDUrcGk3MjAvOUM3QXZxaHQraDFZVmJOMEVsL0k4N0N4bzdJeURtSlZXOEtMRmdXTDJ4VC9FUUdzdStwdEM0NzJBaGxxdUJxcDVpanJPUEdjUlU4dFFSMjB2MD0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiLmsrPph44iLCJnaXZlbl9uYW1lIjoi6Iux5oG1IiwiaXBhZGRyIjoiMjE3LjE3OC4xNTAuMTQ4IiwibmFtZSI6Iuays-mHjiDoi7HmgbUiLCJvaWQiOiIxOTEzNTRjMy1lZTBjLTRiZjQtYTAzNy1hZjZjMmFhNDlhMWYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzA0MzQ1OTY1Ny0zNDY4NDYyNDU4LTIwMjUyMDM2ODUtMTkzMjUiLCJwdWlkIjoiMTAwMzIwMDExREMzNUUwMyIsInJoIjoiMC5BVDBBbHZGV045dlhHMFd5cVo0YUFZVmY0UWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBSVEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiSmNub3VJYkZwT3dGZXJEUC1DcWtXRUdrXzh2bWJwNUloY19IZ1BkQjdzTSIsInRpZCI6IjM3NTZmMTk2LWQ3ZGItNDUxYi1iMmE5LTllMWEwMTg1NWZlMSIsInVuaXF1ZV9uYW1lIjoiaC1rYXdhbm9AaS1lbnRlci5jby5qcCIsInVwbiI6Imgta2F3YW5vQGktZW50ZXIuY28uanAiLCJ1dGkiOiJtbmdOZF8zR0FVNjQ3eGM3MnpNaUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.Tf4egWMpWddDvQLRnLBJPJsAhtaVqZtAzd97_MY2DU6XqPq9FcyANCsSpdfIK4SmdFisrViUw8ItRH0MjRtS4mYziBbLbGDpF3MY7-3N7_A0Y2rSHSvus6DsDSA63p_YkY8aIWEfmcOVeVkLlyUZZuKcgYuOtTeyhtKq-X9yVxf0-epM7se1WcQd7Nea2Q9wf-dl4GXB-kgN4UnEW5_4azWPejJDqFoN48HtPgm04FOQ79zQPxdHuSiu1w2VeN4sHVEQKqrKQD2ukLJJvOhpaFd_6hcXDdHP6KfKitDd5GpMNb6eOVKxfHiiKhEX7LWI5397wBWxBiunSqlDAtPJnQ'*/
  )

  // PowerBIを表示するのに設定の値
  const [reportConfig, setReportConfig] =
    useState<models.IReportEmbedConfiguration>({
      type: 'report',
      // 表示するembedUrl
      embedUrl: undefined,
      // トークン
      accessToken: undefined,
      // トークンのタイプ
      //　アイエンター内に実装する時に、「Aad」にする
      // クボタ様を渡す時に、「Embed」で設定
      tokenType: models.TokenType.Aad,
      // tokenType: models.TokenType.Embed,
      settings: {
        panes: {
          filters: {
            // フィルターパネルを表示しないように設定
            expanded: false,
            visible: false,
          },
          pageNavigation: {
            // エクセルみたいに下ページパネルを表示しないように設定
            visible: false,
          },
        },
      },
    })

  const loadedEvent = async () => {
    if (reportRef.current === undefined) return

    try {
      // ブックマークを取得
      const bookmarks = await reportRef.current.bookmarksManager.getBookmarks()
      // 「()」で囲まれるブックマークしか取得しない
      const filteredBookmarks = bookmarks.filter((item) =>
        /^\(.+\)$/.test(item.displayName)
      )
      //　ブックマークのリストをセット
      await setBookmarks(filteredBookmarks)
      if (currentBookmark === undefined)
        setCurrentBookmark(filteredBookmarks[0])
        selectedDatePost(FILTER_DELAY_MSEC_OF_INIT )
    } catch (error) {
      console.log(error)
    }
  }

  const eventHandlersMap = new Map([
    // PowerBIが取得される時
    ['loaded', async () => { }],
    // PowerBIが表示される時
    ['rendered', async () => { }],
    // PowerBIのエラーが発生する時
    [
      'error',
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail)
        }
      },
    ],
    // ボタンがクリックされる時
    [
      'buttonClicked',
      (event: any) => {
        // ボタンをクリックした時に、ボタンのtitleを取得できる
        // titleは「トラクタ課/トップ/S」という形に設定されている

        //　titleを取得「トラクタ課/トップ/S」
        const destinationTitle = event.detail.title
        //　titleを分解する["トラクタ課","トップ","S"]
        const destinationTitleExplode = destinationTitle.split('/')

        // 外だしJSONファイルにPowerBIのembedUrlを検索する
        // メインメニューを検索(工場全体やトラクタ課など)
        const menu = menus.find(
          (menu) => menu.title === destinationTitleExplode[0]
        )
        if (menu === undefined) return
        //　メインメニューの中のサブメニューを検索(トップやMARなど)
        const subMenu = menu.subMenu.find(
          (subMenu: any) => subMenu.title === destinationTitleExplode[1]
        )
        if (subMenu === undefined) return
        //　もっと細かくメニューを検索(SやQやMcなど)

        // 表示させるPowerBI情報を設定する
        setCurrentMenu({
          mainTitle: menu.title,
          mainAccessCountTitle: menu.accessCountTitle,
          subMenuTitle: subMenu.title,
          subMenuAccessCountTitle: subMenu.accessCountTitle,
          subMenuEmbedUrl: subMenu.embedUrl,
          subMenuDateSlicerType: subMenu.dateSlicerType,
        })

        if (
          destinationTitleExplode[1] !== '' ||
          destinationTitleExplode[1] !== undefined
        ) {
          accessCountApi(subMenu.accessCountTitle, subMenu.title)
        }
      },
    ],
  ])

  // トークンを取得するため認証を行う関数(検証できないので、サンプルのまま実装)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authenticate = () => {
    console.log('Auth')
    const msalConfig = {
      auth: {
        clientId: clientId,
      },
    }

    const loginRequest = {
      scopes: scopes,
    }

    const msalInstance: UserAgentApplication = new UserAgentApplication(
      msalConfig
    )

    const successCallback = (response: AuthResponse) => {
      console.log('success', response)
      if (response.tokenType === 'id_token') {
        authenticate()
      } else if (response.tokenType === 'access_token') {
        accessToken.current = response.accessToken

        // Refresh User Permissions
        tryRefreshUserPermissions()
        // getembedUrl(config.reportId)
        setReportConfig({
          ...reportConfig,
          accessToken: response.accessToken,
          embedUrl: currentMenu?.subMenuEmbedUrl,
        })
      } else {
        console.log('Token type is: ' + response.tokenType)
      }
    }

    const failCallBack = (error: AuthError) => {
      console.log('Authentication was fail', error)
    }

    msalInstance.handleRedirectCallback(successCallback, failCallBack)

    // check if there is a cached user
    if (msalInstance.getAccount()) {
      // get access token silently from cached id-token
      msalInstance
        .acquireTokenSilent(loginRequest)
        .then((response: AuthResponse) => {
          // get access token from response: response.accessToken
          accessToken.current = response.accessToken
          // getembedUrl(config.reportId)
          setReportConfig({
            ...reportConfig,
            accessToken: response.accessToken,
            embedUrl: currentMenu?.subMenuEmbedUrl,
          })
        })
        .catch((err: AuthError) => {
          // refresh access token silently from cached id-token
          // makes the call to handleredirectcallback
          if (err.name === 'InteractionRequiredAuthError') {
            msalInstance.acquireTokenRedirect(loginRequest)
          } else {
            console.log('Authentication was fail', err)
          }
        })
    } else {
      // user is not logged in or cached, you will need to log them in to acquire a token
      msalInstance.loginRedirect(loginRequest)
    }
  }

  // 再認証を行う関数(検証できないので、サンプルのまま実装)
  const tryRefreshUserPermissions = () => {
    fetch('https://api.powerbi.com/v1.0/myorg/RefreshUserPermissions', {
      headers: {
        Authorization: 'Bearer ' + accessToken.current,
      },
      method: 'POST',
    })
      .then(function (response) {
        if (response.ok) {
          console.log('User permissions refreshed successfully.')
        } else {
          // Too many requests in one hour will cause the API to fail
          if (response.status === 429) {
            console.error(
              'Permissions refresh will be available in up to an hour.'
            )
          } else {
            console.error(response)
          }
        }
      })
      .catch(function (error) {
        console.error('Failure in making API call.' + error)
      })
  }

  useEffect(() => {
    console.log('初期表示')
    // クボタ様を渡す時に、authenticate()を行うため、コメントを戻す
    authenticate()
    reportRef.current?.off('loaded')
    reportRef.current?.on('loaded', loadedEvent)

    // アクセスカウンター呼び出し
    accessCountApi(
      currentMenu.subMenuAccessCountTitle,
      currentMenu.subMenuTitle
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (accessToken.current === undefined) return
    // PowerBIを切り替える時に、ブックマークをクリアする
    setCurrentBookmark(undefined)
    //　切り替える先のPowerBIを判断
    //　currentMenuにdetailメニューの情報がある場合にdetail(S,Q,Mcなど)のPowerBIを表示するわけ
    //　currentMenuにdetailメニューの情報がない場合にsuvMenuのPowerBIを表示するわけ
    let embedUrl = currentMenu.subMenuEmbedUrl

    //　レポートの設定を設定する
    setReportConfig({
      ...reportConfig,
      accessToken: accessToken.current,
      embedUrl: embedUrl,
    })
    reportRef.current?.off('loaded')
    reportRef.current?.on('loaded', loadedEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMenu])

  // ブックマークを選択時
  const HandleChangeBookmark = async (item: models.IReportBookmark) => {
    if (reportRef.current === undefined) return
    try {
      await reportRef.current.bookmarksManager.apply(item.name)
      await setCurrentBookmark(item)
      selectedDatePost( FILTER_DELAY_MSEC_OF_MOD )
    } catch (errors) {
      console.log(errors)
    }
  }

  // Datepicker再選択時レンダリング
  useEffect(() => {
    selectedDatePost(FILTER_DELAY_MSEC_OF_MOD)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickerDate])

  // 各コンポーネントPOST
  // 年
  const yearDateFilter = async (pickerDate: Date , waitMSec: number ) => {
    console.log('年フィルタ実行:' + format(pickerDate, 'yyyy'))

    const filterYear = {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: FILTER_DATE,
        column: YEAR_STRING,
      },
      operator: 'In',
      values: [format(pickerDate, 'yyyy')],
      filterType: models.FilterType.Basic,
      requireSingleSelection: true,
    }
    setTimeout(async () => {
      const pages = await reportRef.current!.getPages()
      const activePage = pages?.filter(function (page) {
        return page.isActive
      })[0]

      await activePage.updateFilters(models.FiltersOperations.Replace, [
        filterYear,
      ])
    }, waitMSec)
  }
  // 年月
  const monthDateFilter = async (pickerDate: Date, waitMSec: number) => {
    console.log('月フィルタ実行:' + format(pickerDate, 'yyyy/MM'))

    const filterMonth = {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: FILTER_DATE,
        column: MONTH_STRING,
      },
      operator: 'In',
      values: [format(pickerDate, 'yyyy/MM')],
      filterType: models.FilterType.Basic,
      requireSingleSelection: true,
    }

    const pages = await reportRef.current!.getPages()
    console.log('getPages完了');
    const activePage = pages?.filter(function (page) {
      return page.isActive
    })[0]
    console.log('アクティブページ取得完了:' + activePage.name);
    const filtersBefore = await activePage?.getFilters();
    console.log(filtersBefore);

    setTimeout(async () => {

      await activePage.updateFilters(models.FiltersOperations.Replace, [
        filterMonth,
      ])
      console.log('updateFilters完了');

      const filtersAfter = await activePage?.getFilters();
      console.log(filtersAfter);

    }, waitMSec)
  }
  // 週
  const weekDateFilter = async (pickerDate: Date , waitMSec: number ) => {
    // 選択値別POST日(月曜日)取得
    let selectedDate = pickerDate.getDay()
    let start: string
    let end: string
    //選択日付けが日曜の場合
    if (selectedDate === 0) {
      start = format(subDays(startOfWeek(pickerDate), 6), 'yyyy/MM/dd')
      end = format(subDays(endOfWeek(pickerDate), 6), 'MM/dd')
    } else {
      //選択日付けが日曜以外の場合
      start = format(addDays(startOfWeek(pickerDate), 1), 'yyyy/MM/dd')
      end = format(addDays(endOfWeek(pickerDate), 1), 'MM/dd')
    }

    console.log('週フィルタ実行:' + start + ' ~ ' + end)

    const filterWeek = {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: FILTER_DATE,
        column: START_OF_WEEK,
      },
      operator: 'In',
      values: [start], //週の始まり(月曜日)日付け
      filterType: models.FilterType.Basic,
      requireSingleSelection: true,
    }
    const pages = await reportRef.current!.getPages()
    console.log('getPages完了');
    const activePage = pages?.filter(function (page) {
      return page.isActive
    })[0]
    console.log('アクティブページ取得完了:' + activePage.name);

    const filtersBefore = await activePage?.getFilters();
    console.log(filtersBefore);
    await setTimeout(async () => {

      await activePage.updateFilters(models.FiltersOperations.Replace, [
        filterWeek,
      ])
      console.log('updateFilters完了');

      const filtersAfter = await activePage?.getFilters();
      console.log(filtersAfter);
    }, waitMSec)
  }
  // 日付け
  const dayDateFilter = async (pickerDate: Date , waitMSec: number ) => {
    console.log('日付けフィルタ実行:' + format(pickerDate, 'yyyy/MM/dd'))

    const filterDay = {
      $schema: 'http://powerbi.com/product/schema#basic',
      target: {
        table: FILTER_DATE,
        column: DATE_STRING,
      },
      operator: 'In',
      values: [format(pickerDate, 'yyyy/MM/dd')],
      filterType: models.FilterType.Basic,
      requireSingleSelection: true,
    }
    setTimeout(async () => {
      const pages = await reportRef.current!.getPages()
      const activePage = pages?.filter(function (page) {
        return page.isActive
      })[0]
      await activePage.updateFilters(models.FiltersOperations.Replace, [
        filterDay,
      ])
    }, waitMSec)
  }

  // 各DataPickerコンポーネントPOST呼び出し
  const selectedDatePost = (waitMSec: number) => {
    //年のパターン
    if (menuFilterType === 'year') {
      yearDateFilter(pickerDate, waitMSec)
    }
    //月のパターン
    else if (menuFilterType === 'month') {
      monthDateFilter(pickerDate, waitMSec)
    }
    //週のパターン
    else if (menuFilterType === 'week') {
      weekDateFilter(pickerDate, waitMSec)
    }
    //日付のパターン
    else if (menuFilterType === 'day') {
      dayDateFilter(pickerDate, waitMSec)
    }
    //その他('none'含め)
    else {
      return
    }
  }

  // TODO : 必要ない可能性が高い
  // DataPicker切替
  const menuFilterType = useMemo(() => {
    // currentMenuが更新されるとこの処理が走って、menuFilterTypeにreturnが返される
    if (currentMenu.subMenuDateSlicerType !== undefined) {
      return currentMenu.subMenuDateSlicerType
    } else {
      // どれでもなかったらundefined
      return undefined
    }
    // currentMenuの更新がトリガー
  }, [currentMenu])

  return (
    <Box sx={styles.root} display="flex">
      <Box sx={styles.contentContainer} width="100%">
        <Box display="flex" sx={styles.btnList} width="100%">
          <Box py={4} sx={styles.btnMenu} width="100%">
            <Box
              display="flex"
              sx={styles.bookmarksContainer}
              mr={bookmarks && bookmarks.length > 0 ? 4 : 0}
            >
              {bookmarks &&
                bookmarks.map((item) => {
                  if (item === null) return <Box />
                  const display = item.displayName.match(/\(([^)]*)\)/)![1]
                  return (
                    <Box
                      sx={{
                        ...styles.btn,
                        ...(currentBookmark?.displayName === item.displayName
                          ? styles.clickedBtn
                          : {}),
                      }}
                      key={item.displayName}
                      onClick={() => {
                        HandleChangeBookmark(item)
                      }}
                    >
                      {display}
                    </Box>
                  )
                })}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Box display="flex" sx={styles.bookmarksContainer}>
              </Box>
              {/* DataPicker */}
              <Box mr="60px">
                {menuFilterType === 'year' && (
                  <YearPickerCalendar
                    pickerDate={pickerDate}
                    setPickerDate={setPickerDate}
                  ></YearPickerCalendar>
                )}
                {menuFilterType === 'month' && (
                  <MonthPickerCalendar
                    pickerDate={pickerDate}
                    setPickerDate={setPickerDate}
                  ></MonthPickerCalendar>
                )}
                {menuFilterType === 'week' && (
                  <WeekPickerCalendar
                    pickerDate={pickerDate}
                    setPickerDate={setPickerDate}
                  ></WeekPickerCalendar>
                )}
                {menuFilterType === 'day' && (
                  <DayPickerCalendar
                    pickerDate={pickerDate}
                    setPickerDate={setPickerDate}
                  ></DayPickerCalendar>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box component={Paper} p={2} sx={styles.powerbiContainer}>
          <PowerBIEmbed
            embedConfig={reportConfig}
            eventHandlers={eventHandlersMap}
            cssClassName={'report-style-class'}
            getEmbeddedComponent={(embedObject: Embed) => {
              // console.log(
              //   `Embedded object of type "${embedObject.embedtype}" received`,
              //   embedObject
              // )
              reportRef.current = embedObject as Report
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
