<template>
  <button @click="showConfirm">弹出框</button>
</template>

<script>
import Confirm from "./components/index";
export default {
  name: "App",
  setup() {
    const showConfirm = () => {
      Confirm({
        title: "羞答答的玫羞答答的玫瑰静",
        content: "天哪你真还看",
        confirmBtnText: "我是确定按钮啊",
        cancelBtnText: "我是取消按钮啊",
        titleAlign: "left",
        contentAlign: "left",
        btnAlign: "right",
        contentHeight: "800",
        contentWidth: "700",
      })
        .then(() => {
          console.log("点击确认");
        })
        .catch(() => {
          console.log("点击取消");
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
