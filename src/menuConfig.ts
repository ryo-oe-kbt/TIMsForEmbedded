//部門名
export const ENGINE_DIVISION_NAME = 'エンジン課'
export const TRACTOR_DIVISION_NAME = 'トラクタ課'
export const MACHINE_DIVISION_NAME = '機械課'
export const INSPECTION_DIVISION_NAME = '検査課'
export const PRODUCTION_TECHNOLOGY_DIVISION_NAME = '生産技術課'
export const KPS_PROMOTION_DIVISION_NAME = 'KPS推進課'
export const MANAGEMENT_DIVISION_NAME = '管理課'
export const LABOR_DIVISION_NAME = '勤労課'
export const INFOMATION_PLANNING_DIVISION_NAME = '情報企画課'

//メニュー(機能名)
// OVERALL_REPORT_NAME, TOP_REPORT_NAME はこの値を参照し制御に用いている箇所がある。注意。
export const OVERALL_REPORT_NAME = '工場（KPI）'
export const TOP_REPORT_NAME = '工場（KPI）'
export const TOP_REPORT_SUBNAME = '製造進捗'


/* アクセスカウンターエンドポイント */
export const endPointUrl: string = 'https://timsaccesscountertest1.azurewebsites.net/api/HttpTrigger1?code=e3kv73ZKe1jhcgm8uEutBzldx1621BtWTkjLoq3zJLNIAzFuL1-icQ=='


// PowerBiのメニューの情報
// 最低でも下記の情報が必要
// export const menus: Menu[] = [
//   {
//     title: OVERALL_REPORT_NAME,
//     subMenu: [
//       {
//         title: TOP_REPORT_NAME,
//         embedUrl: `https://app.powerbi.com/reportEmbed?reportId=c9f90f14-696f-41ae-837e-77ba20d2120a`,
//         details: [],
//       },
//     ],
//   },
// ]

/* URLはpowerBIの埋め込み用リンクをそのまま使用してください */
export const menus: Menu[] = [
  {
    title: OVERALL_REPORT_NAME,
    noMenuFlag: false,
    anotherTabFlag: false,
    subMenu: [
      {
        title: TOP_REPORT_NAME,
        anotherTabFlag: false,
        noMenuFlag: true,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=a6a12d56-b38e-493d-8e90-21e1a844e923`,
        dateSlicerType: 'month',
        accessCountTitle: '工場(KPI)',
        details: [
          {
            title: 'S',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=66236a50-45de-4631-b27c-ba4cbfed564c',
            dateSlicerType: 'month',
            accessCountTitle: '安全(S)',
          },
          {
            title: 'Q',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=25199b4e-3078-4e90-9c72-38257e1d23ad',
            dateSlicerType: 'month',
            accessCountTitle: '品質(Q)',
          },
          {
            title: 'C',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=edf4e32a-4dd3-41b6-b28a-b5ec87443c20',
            dateSlicerType: 'month',
            accessCountTitle: '費用(C)',
          },
          //{
          //  title: 'D',
          //  anotherTabFlag: false,
          //  embedUrl:
          //    'https://app.powerbi.com/reportEmbed?reportId=43aaafa3-6986-4b75-8098-aa52f6d33090',
          //},
          {
            title: 'E',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=2a4b1426-4fb4-4b4a-9a1f-d91d18e78212',
            dateSlicerType: 'month',
            accessCountTitle: '環境(E)',
          },
          {
            title: 'Ma',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=3013f2a6-405e-41bd-ae72-fa58aa0894a0',
            dateSlicerType: 'month',
            accessCountTitle: '人員(Ma)',
          },
          {
            title: 'Mc',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=a69a7510-a183-4464-8062-61291bc0bbe3',
            dateSlicerType: 'month',
            accessCountTitle: '設備(Mc)',
          },
        ],
      },
      {
        title: 'エンジン課（KPI）',
        anotherTabFlag: false,
        dateSlicerType: 'month',
        noMenuFlag: true,
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=230a4248-2a75-45cb-988a-a5764efbb56c&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
       ]
      },
      {
        title: '情報企画課（KPI）',
        anotherTabFlag: false,
        dateSlicerType: 'month',
        noMenuFlag: true,
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=31e8d9c6-e5a0-4334-98fe-43fc1f3e99d8&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
       ]
      },
    ],
  },
  {
    title: TRACTOR_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: TOP_REPORT_SUBNAME,
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=11d9df35-ea11-407f-aca7-243d0e808b2e&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        accessCountTitle: TRACTOR_DIVISION_NAME + ' '+ TOP_REPORT_SUBNAME,
        details: [
        ],
      },
      {
        title: '滞留台数',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=ff649720-d9f1-4c1b-a308-0e2b65d0b9b4&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '直行率',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=40d10874-6457-4b1f-b350-e58f0c40f9f0&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D',
        details: [
        ],
      },
      {
        title: '工数負荷分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=e1e12d24-a489-4042-ac9b-9b467ef8e36d&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: 'ERライン マウンターエラー見える化',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=689e5e92-b59c-44f4-a4ea-d69b9764c3f3&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        accessCountTitle: 'ERラインマウンター',
        details: [
        ],
      },
    ],
  },
  {
    title: ENGINE_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: TOP_REPORT_SUBNAME,
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=9685d97a-5957-4985-9b00-fd5811878b70&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        accessCountTitle: ENGINE_DIVISION_NAME + ' '+ TOP_REPORT_SUBNAME,
        details: [
        ],
      },
    ],
  },
  {
    title: MACHINE_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: TOP_REPORT_SUBNAME,
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=c69f2fc7-f970-4648-b9b6-57d92768d7ad&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        accessCountTitle: MACHINE_DIVISION_NAME + ' '+ TOP_REPORT_SUBNAME,
        details: [
        ],
      },
      {
        title: '材料不良',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=ce71d8e3-8f87-4b94-a3bd-0c07a74f6ab0&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
    ],
  },
  {
    title: INSPECTION_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: '品質情報分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=653766e5-8b88-485e-8ad3-16cd8be0b41a&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '軸力測定',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=7379f9df-a9eb-441c-8c7b-4be0fd574d97&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
    ],
  },
  {
    title: PRODUCTION_TECHNOLOGY_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: '設備 故障・停止状況',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=e3ee4369-128a-4a72-bbfc-7db844455fd1&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '設備故障分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=e716c8cb-189c-4d3b-b71e-4636e9594eee&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ]
      },
    ],
  },
  {
    title: KPS_PROMOTION_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: '環境パフォーマンス',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=d81d35be-a0e5-49ba-a685-58d4558a67d4&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '産業廃棄物分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=636e7da2-61ca-497c-918c-f601e59ead5a&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '環境事故管理システム',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=0ea6c2f8-47e5-4b57-a56a-7891758a1750&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '工場内電力使用量分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=ea626315-12b8-4fc0-ac37-dc16db09d3e6&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: 'VR安全教育',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=9637111d-e680-4b71-8d84-7929fd54414c&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '安全管理傾向分析',
        anotherTabFlag: false,
        dateSlicerType: 'month',
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=99e1230a-fc50-4eeb-a9a0-09a72c717f4e&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f',
        details: [
        ],
      },
    ],
  },
  {
    title: MANAGEMENT_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: '再検補充発注分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=c710c747-3be5-476e-afa3-09a80f62b080&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
        details: [
        ],
      },
    ],
  },
  {
    title: LABOR_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: '所属人員構成',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=5d25b79a-0c01-41f7-ba32-388d98628450&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '通勤情報',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=f9ea258c-9b83-4504-88c9-b816f148c3f1&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: '離職人数分析',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=120e9fdf-22f4-4af2-b741-acc4c22b96e4&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
    ],
  },
  {
    title: INFOMATION_PLANNING_DIVISION_NAME,
    noMenuFlag: false,
    anotherTabFlag: true,
    subMenu: [
      {
        title: 'ペーパレスモニタリング',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=af918146-5b6c-4f58-9a08-8f1b3e9b67f9&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: 'システムアクセスランキング',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=5f61d390-4ccd-49d4-9e32-4c5c86370d66&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
      {
        title: 'PC稼働状況確認',
        anotherTabFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=1c74c307-6938-4e74-bc8d-b481a6c9a9be&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWphcGFuLWVhc3QtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQvIn0%3D&navContentPaneEnabled=false',
        details: [
        ],
      },
    ],
  },
]

export type Under = {
  title: string
  accessCountTitle?: string
  embedUrl: string
  dateSlicerType?: string //日付スライサー種別
}

export type Detail = {
  title: string
  accessCountTitle?: string
  anotherTabFlag: boolean //別タブで開くか否か
  embedUrl: string
  dateSlicerType?: string //日付スライサー種別
  underMenu?: Under[]
}

export type SubMenu = {
  title: string
  accessCountTitle?: string
  anotherTabFlag: boolean //別タブで開くか否か
  embedUrl: string
  noMenuFlag?: boolean //メニューを表示するか否か
  dateSlicerType?: string //日付スライサー種別
  details: Detail[]
}

export type Menu = {
  title: string
  accessCountTitle?: string
  noMenuFlag?: boolean //メニューを表示するか否か
  anotherTabFlag: boolean //別タブで開くか否か
  subMenu: SubMenu[]
}
