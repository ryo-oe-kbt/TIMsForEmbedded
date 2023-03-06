import { endPointUrl } from '../../menuConfig'
import axios from "axios";
import qs from 'qs';

export const accessCountApi = async (accessCountTitle: string | undefined, title: string | undefined) => {

  // pageIdが空文字もしくは未記入な場合、titleを使用
  if (accessCountTitle === undefined || accessCountTitle === '')
    accessCountTitle = title

  // APIエンドポイント取得(IENTではmenuConfig.tsxから取得)
  //const targetUrl = endPointUrl + '/api/accesscount/'
  // 設計時はnode.express のつもりがAzureFunctionsになったので、サフィックス不要に。
  const targetUrl = endPointUrl
  // リクエストパラメーター
  const pageIdData = { 'pageId': accessCountTitle }
  // リクエスト情報
  const options = {
    method: 'GET',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: targetUrl,
    data: qs.stringify(pageIdData),
    params: pageIdData,
  };

  // リクエスト
  await axios(options)
    .then((response) => { console.log(response) })
    .catch((error) => { console.log(error) })
    .finally(() => { })

}