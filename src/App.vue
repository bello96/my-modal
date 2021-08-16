<template>
  <button @click="showConfirm">弹出框</button>
</template>

<script>
import { Confirm } from "./components/index";

let content = `
  <h2>且把浓情化作诗两行</h2>
  <h2>且把浓情化作诗两行</h2>
  <h2>且把浓情化作诗两行</h2>
  <h2>且把浓情化作诗两行</h2>

`;

export default {
  name: "App",
  setup() {
    const showConfirm = () => {
      Confirm({
        title: "温馨提示",
        content: content,
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
        contentHeight: "300",
        contentWidth: 500,
        mackOpacity: "0.6",
        modalPosition: "center-center",
      })
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
