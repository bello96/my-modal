import { createApp } from 'vue'
import Confirm from './Confirm'
function confirm ({ title, content, confirmBtnText, cancelBtnText ,titleAlign,contentAlign,btnAlign,contentHeight,contentWidth}) {
  return new Promise((resolve, reject) => {
    // 实例化组件，createApp第二个参数是props
    const confirmInstance = createApp(Confirm, {
      title: title || '温馨提示',
      content: content || '',
      confirmBtnText: confirmBtnText || '确定',
      cancelBtnText: cancelBtnText || '取消',
      titleAlign: titleAlign || 'left',
      contentAlign: contentAlign || 'left',
      btnAlign: btnAlign || 'right',
      contentHeight:contentHeight,
      contentWidth:contentWidth,
      onConfirm: () => {
        unmount()
        resolve()
      },
      onCancel: () => {
        unmount()
        reject(new Error())
      }
    })
    // 卸载组件
    const unmount = () => {
      confirmInstance.unmount()
      document.body.removeChild(parentNode)
    }
    // 创建一个挂载容器
    const parentNode = document.createElement('div')
    document.body.appendChild(parentNode)
    // 挂载组件
    confirmInstance.mount(parentNode)
  })
}

export default confirm