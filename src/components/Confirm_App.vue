<template>
  <div
    class="confirm_wrapper"
    :style="{ alignItems: yPosition, justifyContent: xPosition }"
    @click.self="maskClosableFn"
  >
    <div
      class="confirm_box"
      :style="{ width: `${!isNaN(contentWidth) ? contentWidth : 'auto'}px` }"
    >
      <div
        class="confirm_box_header"
        :style="{ padding: title ? '12px 15px 8px' : 'none' }"
        v-if="title || isShowClosable"
      >
        <div class="confirm_box_title" :style="{ textAlign: titleAlign }">
          <span :title="title.length > 10 ? title : ''">{{ title }}</span>
        </div>
        <button
          class="confirm_box_headerbtn"
          @click="onCancel"
          v-if="isShowClosable"
        >
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            p-id="3842"
            width="18"
            height="18"
          >
            <path
              d="M286.165333 798.165333L512 572.330667l225.834667 225.834666 60.330666-60.330666L572.330667 512l225.834666-225.834667-60.330666-60.330666L512 451.669333 286.165333 225.834667 225.834667 286.165333 451.669333 512l-225.834666 225.834667z"
              fill="#8a8a8a"
              p-id="3843"
            ></path>
          </svg>
        </button>
      </div>
      <div
        class="confirm_box_content"
        :style="{
          justifyContent:
            contentAlign === 'center'
              ? contentAlign
              : contentAlign === 'right'
              ? 'flex-end'
              : 'flex-start',
          height: `${!isNaN(contentHeight) ? contentHeight : 'auto'}px`,
        }"
      >
        <div v-html="content"></div>
      </div>
      <div
        class="confirm_box_btns"
        id="confirm_box_btns"
        v-if="isVisibleBtnAll"
        :style="{ textAlign: btnAlign }"
      >
        <button
          id="btn_cancel"
          class="btn_cancel"
          v-if="isVisibleCancelBtn"
          :title="cancelBtnText.length > 10 ? cancelBtnText : ''"
          @click="onCancel"
        >
          {{ cancelBtnText }}
        </button>
        <button
          id="btn_confirm"
          class="btn_confirm"
          :title="confirmBtnText.length > 10 ? confirmBtnText : ''"
          :style="{ backgroundColor: btnStyleColor }"
          @click="onConfirm"
        >
          {{ confirmBtnText }}
        </button>
      </div>
    </div>
  </div>
  <div class="transparent_frame" :style="{ opacity: mackOpacity }"></div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";

export default {
  name: "Confirm_App",
  props: {
    title: {
      type: String,
      default: "温馨提示",
    },
    content: {
      type: String,
      default: "",
    },
    confirmBtnText: {
      type: String,
      default: "确认",
    },
    isVisibleBtnAll: {
      default: true,
    },
    isVisibleCancelBtn: {
      default: true,
    },
    isShowClosable: {
      default: true,
    },
    keyboardEsc: {
      default: true,
    },
    cancelBtnText: {
      type: String,
      default: "取消",
    },
    contentHeight: {
      type: [Number, String],
    },
    contentWidth: {
      type: [Number, String],
    },
    titleAlign: {
      type: String,
      default: "left",
    },
    contentAlign: {
      type: String,
      default: "left",
    },
    btnAlign: {
      type: String,
      default: "right",
    },
    modalPosition: {
      type: String,
      default: "center_center",
    },
    btnStyleColor: {
      type: String,
      default: "#2dc480",
    },
    mackOpacity: {
      type: [Number, String],
      default: 0.4,
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    maskClosable: {
      type: [String, Boolean, Number],
      default: true,
    },
  },

  setup(props) {
    onMounted(() => {
      if (props.keyboardEsc) {
        document.addEventListener("keyup", keyupEvent);
      }
      if (props.isVisibleBtnAll) {
        document
          .getElementById("confirm_box_btns")
          .addEventListener("mouseover", mouseoverFn);
        document
          .getElementById("confirm_box_btns")
          .addEventListener("mouseout", onmouseoutFn);
      }
    });
    onUnmounted(() => {
      if (props.keyboardEsc) {
        document.removeEventListener("keyup", keyupEvent);
      }
    });
    const maskClosableFn = () => {
      if (!props.maskClosable) return;
      props.onCancel();
    };
    const keyupEvent = (e) => {
      if (e.key === "Escape") {
        props.onCancel();
      }
    };
    const mouseoverFn = (e) => {
      e.stopPropagation();
      let targetDom = e.target;
      if (targetDom.tagName === "BUTTON") {
        if (targetDom.className === "btn_confirm") {
          targetDom.style.backgroundColor = props.btnStyleColor;
          targetDom.style.opacity = "0.8";
        }
        if (targetDom.className === "btn_cancel") {
          targetDom.style.color = props.btnStyleColor;
          targetDom.style.borderColor = props.btnStyleColor;
        }
      }
    };
    const onmouseoutFn = (e) => {
      e.stopPropagation();
      let targetDom = e.target;
      if (targetDom.tagName === "BUTTON") {
        if (targetDom.className === "btn_confirm") {
          targetDom.style.backgroundColor = props.btnStyleColor;
          targetDom.style.opacity = "1";
        }
        if (targetDom.className === "btn_cancel") {
          targetDom.style.color = null;
          targetDom.style.borderColor = null;
        }
      }
    };
    let activePos = props.modalPosition,
      positions = [
        "left-top",
        "center-top",
        "right-top",
        "left-center",
        "center-center",
        "right-center",
        "left-bottom",
        "center-bottom",
        "right-bottom",
      ],
      xPosition = "",
      yPosition = "";

    if (positions.includes(activePos)) {
      let parr = activePos.split("-");
      xPosition =
        parr[0] === "left"
          ? "flex-start"
          : parr[0] === "right"
          ? "flex-end"
          : "center";
      yPosition =
        parr[1] === "top"
          ? "flex-start"
          : parr[1] === "bottom"
          ? "flex-end"
          : "center";
    } else {
      xPosition = "center";
      yPosition = "center";
    }
    return { maskClosableFn, xPosition, yPosition };
  },
};
</script>

<style scoped>
.confirm_wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2001;
  display: flex;
  padding: 50px;
}
.confirm_box {
  display: inline-block;
  min-width: 300px;
  max-width: 60%;
  vertical-align: middle;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  font-size: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  overflow: hidden;
  backface-visibility: hidden;
}
.confirm_box_header {
  position: relative;
}
.confirm_box_title {
  padding-left: 0;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1;
  font-weight: bold;
  padding-right: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.confirm_box_headerbtn {
  position: absolute;
  top: 11px;
  right: 14px;
  padding: 0;
  border: none;
  outline: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}
.confirm_box_headerbtn:hover {
  background-color: #eee;
}
.confirm_box_content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
  text-align: center;
  overflow: auto;
  max-height: 70vh;
  min-height: 50px;
  display: flex;
  align-items: flex-start;
}
.confirm_box_btns {
  padding: 10px 18px;
}
.confirm_box_btns button {
  line-height: 1.5715;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(119, 84, 84, 0.02);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 30px;
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 3px;
  color: rgba(0, 0, 0, 0.85);
  background: #fff;
  border-color: #d9d9d9;
  max-width: 46%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.confirm_box_btns .btn_confirm {
  color: #fff;
  border: none;
}
.confirm_box_btns button:nth-child(2) {
  margin-left: 14px;
}
.transparent_frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 2000;
}
</style>
