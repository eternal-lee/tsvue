import moment from 'moment'

// 在console中显示信息
export function copyRightConsole (packageInfo: any) {
  /* 样式代码 */
  const projectNameStyle =
    'font-size: 20px;font-weight: 600;color: rgb(244,167,89);'
  const descriptionStyle =
    'font-style: oblique;font-size:14px;color: rgb(244,167,89);font-weight: 400;'
  const versionStyle = 'color: rgb(30,152,255);padding:8px 0 2px;'
  const contentStyle = 'color: rgb(30,152,255);padding:0 0 2px;'
  const dateTimeStyle = 'color: rgb(30,152,255);padding:0 0 5px;'

  /* 内容代码 */
  const projectName = packageInfo.name || ''
  const description = packageInfo.description || '描述'
  const version = `版 本 号：${
    packageInfo.version
  }    【ArcGIS API for JavaScript 版本：${
    packageInfo?.dependencies?.['@c_arcgis/core'] ||
    packageInfo?.dependencies?.['@arcgis/core'] ||
    ''
  }】`
  const dateTime = `编译日期：${moment().format('YYYY-MM-DD HH:mm:ss')}`
  const releaseDateTime = `发布时间：${moment().format('yyyy-MM-DD HH:mm:ss')}`

  // 空格有意义，不要格式化
  console.log(
    `%c${description} 
    %c${projectName}
    %c${version}
    %c${releaseDateTime}
    %c${dateTime}`,
    descriptionStyle,
    projectNameStyle,
    versionStyle,
    contentStyle,
    dateTimeStyle
  )
}
