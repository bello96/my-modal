import { createApp } from 'vue'
import Modal_App from './Modal.vue'
import './modal.css'
import {
  default_titleAlign,
  default_btnAlign,
  default_contentAlign,
  default_styleColor,
  default_confirmBtnText,
  default_cancelBtnText,
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
  return createApp(Modal_App, {
    title: params.title,
    content: params.content,
    confirmBtnText: params.confirmBtnText || default_confirmBtnText,
    cancelBtnText: params.cancelBtnText || default_cancelBtnText,
    titleAlign: default_positionArr.includes(params.titleAlign) ? params.titleAlign : default_titleAlign,
    contentAlign: default_positionArr.includes(params.contentAlign) ? params.contentAlign : default_contentAlign,
    btnAlign: default_positionArr.includes(params.btnAlign) ? params.btnAlign : default_btnAlign,
    isVisibleBtnAll: params.isVisibleBtnAll,
    isVisibleCancelBtn: params.isVisibleCancelBtn,
    isShowClosable: params.isShowClosable,
    btnStyleColor: params.btnStyleColor ? params.btnStyleColor : default_styleColor,
    contentHeight: params.contentHeight,
    contentWidth: params.contentWidth,
    keyboardEsc: params.keyboardEsc,
    maskClosable: params.maskClosable,
    mackOpacity: params.mackOpacity ? params.mackOpacity : default_mackOpacity,
    modalPosition: params.modalPosition,
    backgroundImage: params.backgroundImage,
    onConfirm: () => {
      unmount()
      resolve('ok')
    },
    onCancel: () => {
      unmount()
      reject('cancel')
    }
  })
}

