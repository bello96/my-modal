<template>
  <button @click="showConfirm">弹出框</button>
</template>

<script>
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";

// import { Modal } from "./model/index";
import { Modal } from "vue-custom-modal";

import HelloWord from "./view/HelloWord.vue";

export default {
  name: "App",
  setup() {
    const showConfirm = () => {
      Modal(
        {
          title: "这是标题名字",
          content: HelloWord,
          confirmBtnText: "确定按钮",
          cancelBtnText: "取消按钮",
          titleAlign: "left",
          contentAlign: "center",
          btnAlign: "right",
          keyboardEsc: true,
          btnStyleColor: "#123",
          isVisibleBtnAll: true,
          isVisibleCancelBtn: true,
          isShowClosable: true,
          maskClosable: true,
          contentHeight: "1200",
          contentWidth: 9100,
          mackOpacity: "0.2",
          modalPosition: "center-center",
          backgroundImage: require("./images/beijing.jpeg"),
        },
        [Antd, ElementPlus]
      )
        .then(() => {
          console.log("确认回调~");
        })
        .catch(() => {
          console.log("取消回调~");
        });
    };
    return {
      showConfirm,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
#app ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 8px;
}

#app ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e4e6e5;
}
#app ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: transparent;
}
</style>
