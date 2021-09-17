import { createApp } from 'vue'
import Modal_App from './Modal.vue'
import './modal.css'
import {
  default_titleAlign,
  default_btnAlign,
  default_contentAlign,
  default_styleColor,
  default_okText,
  default_cancelText,
  default_mackOpacity,
  default_positionArr
} from './default'
export function Modal(params, options = null) {
  return new Promise((resolve, reject) => {
    function unmount() {
      modalApp.unmount()
      rootNode.removeChild(parentNode)
    }
    const modalApp = createModal(resolve, reject, unmount, params),
      { rootNode, parentNode } = createParentNode()
    modalUse(modalApp, parentNode, options)
  })
}
function modalUse(modalApp, parentNode, options) {
  if (options != null && typeof options === 'object') {
    if (Array.isArray(options)) {
      for (let i = 0; i < options.length; i++) {
        modalApp.use(options[i])
      }
    } else {
      modalApp.use(options)
    }
  }
  modalApp.mount(parentNode)
}
function createParentNode() {
  const rootNode = document.getElementById('app'),
    parentNode = document.createElement('div');
  rootNode.appendChild(parentNode)
  return { rootNode, parentNode }
}
function createModal(resolve, reject, unmount, params) {
  params.titleStyle = params.titleStyle ? params.titleStyle : {}
  params.btnStyle = params.btnStyle ? params.btnStyle : { textAlign: default_btnAlign, color: default_styleColor }
  if (!params.btnStyle.color) params.btnStyle.color = default_styleColor
  params.contentStyle = params.contentStyle ? params.contentStyle : {}
  if (!params.contentStyle.width) params.contentStyle.width = 'auto'
  if (!params.contentStyle.height) params.contentStyle.height = 'auto'
  return createApp(Modal_App, {
    title: params.title,
    content: params.content,
    okText: params.okText || default_okText,
    cancelText: params.cancelText || default_cancelText,
    titleStyle: default_positionArr.includes(params.titleStyle.textAlign) ? params.titleStyle : { ...params.titleStyle, textAlign: default_titleAlign },
    btnStyle: default_positionArr.includes(params.btnStyle.textAlign) ? params.btnStyle : { ...params.btnStyle, textAlign: default_btnAlign },
    isShowBtnAll: params.isShowBtnAll,
    isShowCancelBtn: params.isShowCancelBtn,
    isShowClosable: params.isShowClosable,
    contentStyle:default_positionArr.includes(params.contentStyle.textAlign) ? params.contentStyle : { ...params.contentStyle, textAlign: default_contentAlign },
    keyboardEsc: params.keyboardEsc,
    maskClosable: params.maskClosable,
    mackOpacity: params.mackOpacity ? params.mackOpacity : default_mackOpacity,
    position: params.position,
    background: params.background,
    isDraggable:params.isDraggable,
    onConfirm: () => resolve({ unmount }),
    onCancel: () => {
      unmount()
      reject('cancel')
    }
  })
}

