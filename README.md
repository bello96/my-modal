### 使用须知

- 基于 `vue3` 通过 `createApp` 方式创建一个新的应用实例
- 依靠 `Promise` 异步处理，`then` 方法和 `catch` 方法分别为确定和取消回调
- 提示内容可以是一个 **`vue 组件`** 或 **`HTML 组合模板`** 等...

### 参数说明

- **`title`**：标题名 | _默认：`温馨提示`_

- **`titleStyle`**：标题风格 | **`object`**
  - 背景可取字段 `background` 和 `backgroundColor`
  - `background` 取值同下 `background`

* **`content`**：提示信息

* **`contentStyle`**：提示信息风格 | **`object`**
  - 背景可取字段 `background` 和 `backgroundColor`
  - `background` 取值同下 `background`


- **`okText`**：确定按钮名称 | _默认：`确定`_

- **`cancelText`**：取消按钮名称 | _默认：`取消`_

- **`btnStyle`**：按钮风格 | **`object`**
  - 背景可取字段 `background` 和 `backgroundColor`
  - `background` 取值同下 `background`

- **`isShowBtnAll`**：是否展示所有按钮（布尔） | _默认：`true`_

- **`isShowCancelBtn`**：是否展示取消按钮（布尔） | _默认：`true`_

- **`isShowClosable`**：右上角是否展示关闭图标（布尔） | _默认：`true`_

- **`keyboardEsc`**：是否支持 ESC 键关闭弹框（布尔） | _默认：`true`_

- **`maskClosable`**：点击蒙层是否允许关闭弹框（布尔）| _默认：`true`_

- **`isDraggable`**：是否可拖拽移动弹框（布尔）| _默认：`false`_

- **`mackOpacity`**：蒙层透明度（0-1) | _默认：`0.6`_

- **`position`**：弹框位置（若给定值不在此范围则默认 _居中展示_）
  | 值 | 类型 | 释义 |
  | ---- | ---- | ---- |
  | left-top | string | 左上 |
  | center-top | string | 中上 |
  | right-top | string | 右上 |
  | left-center | string | 中左 |
  | center-center | string | 中中 |
  | right-center | string | 右中 |
  | left-bottom | string | 左下 |
  | center-bottom | string | 中下 |
  | right-bottom | string | 右下 |

- **`background`**：弹框背景 | _默认：白色_
  | 类型 | 释义 |
  | ----|---- |
  | 颜色 | 颜色值（常用英文和16进制） |
  | 本地图片 | 通过 require() 方式引入 |
  | 网络图片 | 在线 url 地址 |

### 使用示例

- **下载**：npm install vue-custom-modal
- **引入**：import { Modal } from "vue-custom-modal"

```javascript
import HelloWord from "./components/HelloWord.vue"
setup() {
  const showConfirm = () => {
    Modal(
      {
        title: "标题名称",
        titleStyle: {
          textAlign: "center",
          color: "#D44B3E",
          fontSize: "24px",
        },
        content: HelloWord,
        contentStyle: {
          width: 700,
          height: "600px",
          textAlign: "left",
        },
        okText: "确定按钮",
        cancelText: "取消按钮",
        btnStyle: {
          textAlign: "center",
          color: "#1A73E8",

        },
        isShowBtnAll: true,
        isShowCancelBtn: true,
        isShowClosable: true,
        isDraggable: true,
        keyboardEsc: true,
        maskClosable: true,
        mackOpacity: "0.3",
        position: "center-top",
        background: require("./images/beijing.jpeg")
      }
    ).then( e => {
      console.log("确认回调~")
    }).catch(() => {
      console.log("取消回调~")
    })
  }
}
```

### 注\*

> 由于弹框是一个新的应用实例，若弹框内容使了通过 use 引入的插件组件（如 store，router，ui 组件等...），需要当作第二的参数传入，`多个插件可放在一个数组中`_（如下）_

> 确定后，需在 `then` 中调用 `unmount` 方法关闭弹框 _（如下）_

```javascript
App.vue

import Store from "./store";
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";

Modal(
  {
    content:'HelloWord',
    ...
    ...
  }, [Store, Antd, ElementPlus]
).then( e => {
  console.log("确认回调~")
  if (true) {
    // 满足条件 关闭弹框
    e.unmount()
  }
})
```
