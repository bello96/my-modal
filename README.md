### 使用须知

- 基于 `vue3` 通过 `createApp` 方法创建一个新的应用实例
- 利用 `Promise` 异步处理，其中 `then` 方法和 `catch` 方法分别为 确定 和 取消 回调
- 提示信息可以是一个 **vue组件** 或 **HTML 组合模板** 等...

### 使用说明

- **下载**：`npm install vue-custom-modal`
- **引入**：`import { Modal } from "vue-custom-modal"`

```javascript
import HelloWord from "./components/HelloWord.vue"
setup() {
  const showConfirm = () => {
    Modal({
      title: "温馨提示",
      content: HelloWord,
      confirmBtnText: "确定",
      cancelBtnText: "取消",
      titleAlign: "left",
      contentAlign: "center",
      btnAlign: "right",
      keyboardEsc: true,
      btnStyleColor: "#282C34",
      isVisibleBtnAll: true,
      isVisibleCancelBtn: true,
      isShowClosable: true,
      maskClosable: true,
      contentHeight: "400",
      contentWidth: 800,
      mackOpacity: "0.6",
      modalPosition: "center-center",
      backgroundImage: require("../images/flower.jpg")
    }).then(() => {
        console.log("确认的回调~");
    }).catch(() => {
        console.log("取消的回调~");
      })
    }
    return {
      showConfirm
    }
  }
```

### 参数说明

- **`title`**：标题名 | _默认：温馨提示_

- **`titleAlign`**：标题名对齐方式 | _默认：left_
  值 | 类型 | 释义
  ---|---|---
  left | string | 左对齐
  center | string | 居中
  right | string | 右对齐

- **`content`**：提示信息

- **`contentAlign`**：提示信息对齐方式 | _默认：center_
  值 | 类型 | 释义
  ---|---|---
  left | string | 左对齐
  center | string | 居中
  right | string | 右对齐

- **`confirmBtnText`**：确定按钮名称 | _默认：确定_

- **`cancelBtnText`**：取消按钮名称 | _默认：取消_

- **`btnAlign`**：按钮对齐方式 | _默认：right_
  值 | 类型 | 释义
  ---|---|---
  left | string | 左对齐
  center | string | 居中
  right | string | 右对齐

- **`btnStyleColor`**：按钮风格主题色 | _默认：#2dc480_

- **`isVisibleBtnAll`**：是否展示所有按钮（布尔） | _默认：true_

- **`isVisibleCancelBtn`**：是否展示取消按钮（布尔） | _默认：true_

- **`isShowClosable`**：右上角是否展示关闭图标（布尔） | _默认：true_

- **`keyboardEsc`**：是否支持 ESC 键关闭弹框（布尔） | _默认：true_

- **`maskClosable`**：点击蒙层是否允许关闭弹框（布尔）| _默认：true_

- **`mackOpacity`**：蒙层透明度（0-1) | _默认：0.4_

- **`contentHeight`**：展示的内容高度（string | number），_最大高 70vh_ ， _最小高 50px_

- **`contentWidth`**：弹框宽度（string | number），_最大宽 60%_ ， _最小宽 300px_

- **`modalPosition`**：弹框位置（若给定值不在此范围则默认 _居中展示_）
  值 | 类型 | 释义
  ---|--- | ---
  `left-top` | string | 左上
  `center-top` | string | 中上
  `right-top` | string | 右上
  `left-center` | string | 中左
  `center-center` | string | 中中
  `right-center` | string | 右中
  `left-bottom` | string | 左下
  `center-bottom` | string | 中下
  `right-bottom` | string | 右下

- **`backgroundImage`**：弹框背景 | _默认：白色_
  类型 | 释义
  ---|---
  颜色 | **只接受 16 进制颜色** _`（例：#398DEE）`_
  本地图片 | 通过 require() 方式引入
  网络图片 | 在线网络地址

- **`onConfirm`**：确认按钮回调函数

- **`onCancel`**：取消按钮回调函数

### `注*`
- 由于弹框是一个新的应用实例，若弹框内容使用了通过 use 引入的插件组件（如`store`，`router`，`UI组件`等...) 则需要当作第二的参数传入
- *引用多个插件时，可放在一个数组中*（如下）
```javascript
App.vue

import Store from "./store";
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";

Modal({
  content: HelloWord，
  ...
  ...
  ...
}, [Store, Antd, ElementPlus])
```