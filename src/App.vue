<template>
  <button @click="showConfirm">弹出框</button>
  &nbsp;&nbsp;&nbsp;
  <button @click="increment">count +5</button>
  &nbsp;
  <span>count: {{ count }}</span>
</template>

<script>
import Antd from "ant-design-vue";
import ElementPlus from "element-plus";
import Store from "./store";
import { computed } from "vue";
import { useStore } from "vuex";

// import { Modal } from "./model/index";
import { Modal } from "vue-custom-modal";
import HelloWord from "./view/HelloWord.vue";

export default {
  name: "App",
  setup() {
    const store = useStore();
    const showConfirm = () => {
      Modal(
        {
          title: "最新通知消息",
          titleStyle: {
            textAlign: "center",
            color: "#D44B3E",
            fontSize: "30px",
            letterSpacing: "10px",
            background: require("./images/title.png"),
          },

          content: HelloWord,
          contentStyle: {
            width: 1500,
            height: "800px",
            textAlign: "left",
            // background: require("./images/content.jpg"),
          },

          okText: "成功",
          cancelText: "失败",
          btnStyle: {
            textAlign: "center",
            color: "#61B883",
            background: require("./images/bottom.png"),
            fontSize: "20px",
          },

          isShowBtnAll: true,
          isShowCancelBtn: true,
          isShowClosable: true,
          isDraggable: true,
          keyboardEsc: true,
          maskClosable: true,
          mackOpacity: "0.3",
          position: "center-center",
          background: require("./images/beijing.jpeg"),
        },
        [Antd, ElementPlus, Store]
      )
        .then((e) => {
          console.log("确认回调~");
          if (true) {
            // 满足条件 关闭弹框
            e.unmount();
          }
        })
        .catch(() => {
          console.log("取消回调~");
        });
    };
    return {
      showConfirm,
      increment: () => store.commit("increment", { amount: 5 }),
      count: computed(() => store.state.count),
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
</style>
