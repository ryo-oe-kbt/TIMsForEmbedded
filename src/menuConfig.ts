//メニュー(機能名)
// OVERALL_REPORT_NAME, TOP_REPORT_NAME はこの値を参照し制御に用いている箇所がある。注意。
export const OVERALL_REPORT_NAME = '工場（KPI）'

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
        title: 'エンジン課（KPI）',
        anotherTabFlag: false,
        dateSlicerType: 'month',
        noMenuFlag: true,
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=230a4248-2a75-45cb-988a-a5764efbb56c&autoAuth=true&ctid=cdf09dce-c865-4f42-901d-32d3d8d3f60f&navContentPaneEnabled=false',
      },
    ],
  },
]

export type SubMenu = {
  title: string
  accessCountTitle?: string
  anotherTabFlag: boolean //別タブで開くか否か
  embedUrl: string
  noMenuFlag?: boolean //メニューを表示するか否か
  dateSlicerType?: string //日付スライサー種別
}

export type Menu = {
  title: string
  accessCountTitle?: string
  noMenuFlag?: boolean //メニューを表示するか否か
  anotherTabFlag: boolean //別タブで開くか否か
  subMenu: SubMenu[]
}
