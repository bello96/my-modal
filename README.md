### 参数说明

- **title**：标题名 | 默认：温馨提示
- **message**：提示信息
- **confirmBtnText**：确定按钮名称 | 默认：确定
- **cancelBtnText**：取消按钮名称 | 默认：取消
- **titleAlign**：标题名对其方式 | 默认：left
  取值 | 释义
  ---|---
  left | 左对齐
  center | 居中
  right | 右对齐
- **contentAlign**：内容对其方式 | 默认：left
  取值 | 释义
  ---|---
  left | 左对齐
  center | 居中
  right | 右对齐
- **btnAlign**：按钮对其方式 | 默认：right
  取值 | 释义
  ---|---
  left | 左对齐
  center | 居中
  right | 右对齐
- **btnStyleColor**：按钮风格颜色 | 默认：#2dc480
- **isVisibleBtnAll**：是否展示所有按钮 | 默认：展示
- **isVisibleCancelBtn**：是否展示取消按钮 | 默认：展示
- **isShowClosable**：是否展示关闭图标 | 默认：展示
- **contentHeight**：内容高度（可接受数字和字符串数字），若数值过大或过小则失效，默认采用最大高 70vh 和最小高 50px
- **contentWidth**：弹框宽度（可接受数字和字符串数字），若数值过大或过小则失效，默认采用最大宽 60% 和最小宽 300px
- **maskClosable**：点击蒙层是否允许关闭（布尔）| 默认：true
- **mackOpacity**：蒙层透明度（0-1) | 默认：0.4
- **keyboardEsc**：是否支持 ESC 键盘关闭弹框 | 默认：可以
- **modalPosition**：弹框显示位置（若给定值不在此范围则默认居中展示）
  取值 | 释义
  ---|---
  left-top | 左上
  center-top | 中上
  right-top | 右上
  left-center | 中左
  center-center | 中中
  right-center | 右中
  left-bottom | 左下
  center-bottom | 中下
  right-bottom | 右下
- **onConfirm**：确认按钮回调函数
- **onCancel**：取消按钮回调函数
