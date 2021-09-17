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
          title: "标题名称",
          titleStyle: {
            textAlign: "center",
            color: "#D44B3E",
            fontSize: "24px",
          },

          content: HelloWord,
          contentStyle: {
            width: 900,
            height: "800px",
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
/* #app ::-webkit-scrollbar {
  width: 1px;
  height: 8px;
}

#app ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e4e6e5;
}
#app ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: transparent;
} */
</style>
