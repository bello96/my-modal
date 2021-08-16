import { createApp } from 'vue'
import Confirm_App from './Confirm_App'
let positionArr = ['left', 'center', 'right'];
export function Confirm({ title, content, confirmBtnText, cancelBtnText, titleAlign, keyboardEsc, contentAlign, btnAlign, btnStyleColor, isShowClosable,isVisibleBtnAll, isVisibleCancelBtn, contentHeight, contentWidth, maskClosable, mackOpacity, modalPosition }) {
  return new Promise((resolve, reject) => {
    const confirmInstance = createApp(Confirm_App, {
      title,
      content,
      confirmBtnText: confirmBtnText || '确定',
      cancelBtnText: cancelBtnText || '取消',
      titleAlign: positionArr.includes(titleAlign) ? titleAlign : 'left',
      contentAlign: positionArr.includes(contentAlign) ? contentAlign : 'left',
      btnAlign: positionArr.includes(btnAlign) ? btnAlign : 'right',
      isVisibleBtnAll,
      isVisibleCancelBtn,
      isShowClosable,
      btnStyleColor: btnStyleColor ? btnStyleColor : '#2dc480',
      contentHeight,
      contentWidth,
      keyboardEsc,
      maskClosable,
      mackOpacity: mackOpacity ? mackOpacity : '0.4',
      modalPosition,
      onConfirm: () => {
        unmount()
        resolve()
      },
      onCancel: () => {
        unmount()
        reject(new Error())
      }
    })
    const unmount = () => {
      confirmInstance.unmount()
      document.body.removeChild(parentNode)
    }
    const parentNode = document.createElement('div')
    document.body.appendChild(parentNode)
    confirmInstance.mount(parentNode)
  })
}
