<template>
  <div
    class="confirm_wrapper"
    :style="{ alignItems: yPosition, justifyContent: xPosition }"
    @click.self="maskClosableNewFn"
  >
    <div
      class="confirm_box"
      :style="{
        width: `${!isNaN(contentWidth) ? contentWidth : 'auto'}px`,
        background: isBackgroundColorValue
          ? backgroundImage
          : `#fff url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div
        class="confirm_box_header"
        :style="{ padding: title ? '12px 15px 8px' : 'none' }"
        v-if="title || isShowClosable"
      >
        <div class="confirm_box_title" :style="{ textAlign: titleAlign }">
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
      <div
        class="confirm_box_content"
        :style="{
          textAlign: contentAlign,
          height: `${!isNaN(contentHeight) ? contentHeight : 'auto'}px`,
        }"
      >
        <component v-if="isVueOptionsValue" :is="content" />
        <div v-else v-html="content"></div>
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
          :title="cancelBtnText.length > default_length ? cancelBtnText : ''"
          @click="onCancel"
        >
          {{ cancelBtnText }}
        </button>
        <button
          id="btn_confirm"
          class="btn_confirm"
          :title="confirmBtnText.length > default_length ? confirmBtnText : ''"
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
import {
  default_titleText,
  default_confirmBtnText,
  default_cancelBtnText,
  default_titleAlign,
  default_contentAlign,
  default_btnAlign,
  default_mackOpacity,
  default_modalPosition,
  default_styleColor,
  default_length,
  default_isVisibleBtnAll,
  default_isVisibleCancelBtn,
  default_isShowClosable,
  default_keyboardEsc,
  default_maskClosable,
} from "./default";
import {
  mouseFn,
  isBackgroundColor,
  isVueOptions,
  maskClosableFn,
  keyupEvent,
  getxyPosition,
} from "./utils";
export default {
  name: "Confirm_App",
  props: {
    title: {
      type: String,
      default: default_titleText,
    },
    content: {
      default: "",
    },
    confirmBtnText: {
      type: String,
      default: default_confirmBtnText,
    },
    isVisibleBtnAll: {
      default: default_isVisibleBtnAll,
    },
    isVisibleCancelBtn: {
      default: default_isVisibleCancelBtn,
    },
    isShowClosable: {
      default: default_isShowClosable,
    },
    keyboardEsc: {
      default: default_keyboardEsc,
    },
    cancelBtnText: {
      type: String,
      default: default_cancelBtnText,
    },
    contentHeight: [Number, String],
    contentWidth: [Number, String],
    titleAlign: {
      type: String,
      default: default_titleAlign,
    },
    contentAlign: {
      type: String,
      default: default_contentAlign,
    },
    btnAlign: {
      type: String,
      default: default_btnAlign,
    },
    modalPosition: {
      type: String,
      default: default_modalPosition,
    },
    btnStyleColor: {
      type: String,
      default: default_styleColor,
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
    backgroundImage: [String, Number],
  },
  setup(props) {
    onMounted(() => {
      if (props.keyboardEsc) {
        document.addEventListener("keyup", keyupEventFn);
      }
      if (props.isVisibleBtnAll) {
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
    });
    const keyupEventFn = (e) => keyupEvent(e, props);
    const maskClosableNewFn = () => maskClosableFn(props);
    const isBackgroundColorValue = isBackgroundColor(props);
    const isVueOptionsValue = isVueOptions(props.content);
    const { xPosition, yPosition } = getxyPosition(props);
    return {
      maskClosableNewFn,
      isVueOptionsValue,
      isBackgroundColorValue,
      default_length,
      xPosition,
      yPosition,
    };
  },
};
</script>
