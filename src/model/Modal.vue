<template>
  <div
    class="confirm_wrapper"
    :style="{ alignItems: yPosition, justifyContent: xPosition }"
    @click.self="maskClosableNewFn"
  >
    <div
      class="confirm_box"
      ref="draggable_confirm_dom"
      :style="{
        background: isBackgroundColorValue
          ? background
          : `#fff url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: `${
          !isNaN(contentStyle.width)
            ? contentStyle.width
            : !isNaN(contentStyle.width.split('px')[0])
            ? contentStyle.width.split('px')[0]
            : 'auto'
        }px`,
      }"
    >
      <div
        class="confirm_box_header"
        ref="draggable_header_dom"
        :style="{
          padding: title ? '12px 15px 8px' : 'none',
          cursor: isDraggable ? 'move' : null,
        }"
        v-if="title || isShowClosable"
      >
        <div class="confirm_box_title" :style="titleStyle">
          <span :title="title.length > default_length ? title : ''">{{
            title
          }}</span>
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
      <div class="confirm_box_content" :style="newContstyle">
        <component v-if="isVueOptionsValue" :is="content" />
        <div v-else v-html="content"></div>
      </div>
      <div
        class="confirm_box_btns"
        id="confirm_box_btns"
        v-if="isShowBtnAll"
        :style="btnStyle"
      >
        <button
          id="btn_cancel"
          class="btn_cancel"
          v-if="isShowCancelBtn"
          :title="cancelText.length > default_length ? cancelText : ''"
          @click="onCancel"
        >
          {{ cancelText }}
        </button>
        <button
          id="btn_confirm"
          class="btn_confirm"
          :title="okText.length > default_length ? okText : ''"
          :style="{ backgroundColor: btnStyle.color }"
          @click="onConfirm"
        >
          {{ okText }}
        </button>
      </div>
    </div>
  </div>
  <div class="transparent_frame" :style="{ opacity: mackOpacity }"></div>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import {
  default_titleText,
  default_okText,
  default_cancelText,
  default_titleAlign,
  default_btnAlign,
  default_mackOpacity,
  default_position,
  default_styleColor,
  default_length,
  default_isShowBtnAll,
  default_isShowCancelBtn,
  default_isShowClosable,
  default_keyboardEsc,
  default_maskClosable,
  default_isDraggable,
} from "./default";
import {
  mouseFn,
  isBackgroundColor,
  isVueOptions,
  maskClosableFn,
  keyupEvent,
  getxyPosition,
  startDrop,
} from "./utils";
export default {
  name: "Confirm_App",
  props: {
    title: {
      default: default_titleText,
    },
    content: {
      default: "",
    },
    okText: {
      default: default_okText,
    },
    isShowBtnAll: {
      default: default_isShowBtnAll,
    },
    isShowCancelBtn: {
      default: default_isShowCancelBtn,
    },
    isShowClosable: {
      default: default_isShowClosable,
    },
    keyboardEsc: {
      default: default_keyboardEsc,
    },
    cancelText: {
      default: default_cancelText,
    },
    contentStyle: [Object],
    position: {
      type: String,
      default: default_position,
    },
    mackOpacity: {
      type: [Number, String],
      default: default_mackOpacity,
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
      default: default_maskClosable,
    },
    background: [String, Number],
    isDraggable: {
      type: [String, Boolean, Number],
      default: default_isDraggable,
    },
    titleStyle: {
      type: Object,
      default: {
        textAlign: default_titleAlign,
      },
    },
    btnStyle: {
      type: Object,
      default: {
        textAlign: default_btnAlign,
        color: default_styleColor,
      },
    },
  },
  setup(props) {
    onMounted(() => {
      if (props.isDraggable) {
        startDrop(draggable_header_dom.value, draggable_confirm_dom.value);
        document.onmouseup = () => (document.onmousemove = null);
      }
      if (props.keyboardEsc) {
        document.addEventListener("keyup", keyupEventFn);
      }
      if (props.isShowBtnAll) {
        document
          .getElementById("confirm_box_btns")
          .addEventListener("mouseover", (e) => mouseFn(e, props));
        document
          .getElementById("confirm_box_btns")
          .addEventListener("mouseout", (e) => mouseFn(e, props));
      }
    });
    onUnmounted(() => {
      if (props.keyboardEsc) {
        document.removeEventListener("keyup", keyupEventFn);
      }
      if (props.isDraggable) {
        document.onmouseup = null;
      }
    });

    const keyupEventFn = (e) => keyupEvent(e, props);
    let draggable_header_dom = ref(null),
      draggable_confirm_dom = ref(null);

    const setContentStyle = () => {
      let contentStyle = props.contentStyle;
      let newContentStyle = {};
      for (let i in contentStyle) {
        if (i != "width") {
          newContentStyle[i] = contentStyle[i];
        }
      }
      newContentStyle.height = `${
        !isNaN(newContentStyle.height)
          ? newContentStyle.height
          : !isNaN(newContentStyle.height.split("px")[0])
          ? newContentStyle.height.split("px")[0]
          : "auto"
      }px`;
      return newContentStyle;
    };

    return {
      maskClosableNewFn: () => maskClosableFn(props),
      isVueOptionsValue: isVueOptions(props.content),
      isBackgroundColorValue: isBackgroundColor(props),
      default_length,
      xPosition: getxyPosition(props).xPosition,
      yPosition: getxyPosition(props).yPosition,
      draggable_header_dom,
      draggable_confirm_dom,
      newContstyle: setContentStyle(),
    };
  },
};
</script>
