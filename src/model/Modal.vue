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
        ...setBackground(background),
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
          ...setTitleBg(titleStyle),
        }"
        v-if="title || isShowClosable"
      >
        <div class="confirm_box_title" :style="newTitlestyle">
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
        :style="setFootBg()"
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
      let newContentStyle = redefineStyle(props.contentStyle, "width");
      newContentStyle.height = `${
        !isNaN(newContentStyle.height)
          ? newContentStyle.height
          : !isNaN(newContentStyle.height.split("px")[0])
          ? newContentStyle.height.split("px")[0]
          : "auto"
      }px`;
      let bg = setBackground(newContentStyle["background"]);
      return { ...newContentStyle, ...bg };
    };

    const setTitleStyle = (titleStyle) => {
      let a = redefineStyle(titleStyle, "background");
      let b = redefineStyle(a, "backgroundColor");
      return b;
    };

    // 设置头部背景图
    const setTitleBg = (titleStyle) => {
      if (titleStyle && titleStyle["backgroundColor"])
        return { backgroundColor: titleStyle["backgroundColor"] };
      if (titleStyle && titleStyle["background"])
        return setBackground(titleStyle["background"]);
    };

    // 设置底部背景
    const setFootBg = () => {
      let newstyle = props.btnStyle;
      if (newstyle["backgroundColor"]) return newstyle;
      if (newstyle["background"]) {
        let newFootStyle = redefineStyle(newstyle, "background");
        let bg = setBackground(newstyle["background"]);
        return { ...newFootStyle, ...bg };
      }
      return newstyle;
    };

    // 重新定义css
    const redefineStyle = (styleObj, param) => {
      let _newStyle = styleObj;
      let newStyle = {};
      for (let i in _newStyle) {
        if (i != param) {
          newStyle[i] = _newStyle[i];
        }
      }
      return newStyle;
    };

    // 设置背景颜色
    const setBackground = (bg) => {
      if (!bg) return {};
      return {
        background: isBackgroundColor(bg) ? bg : `#fff url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
    };

    return {
      maskClosableNewFn: () => maskClosableFn(props),
      isVueOptionsValue: isVueOptions(props.content),
      default_length,
      xPosition: getxyPosition(props).xPosition,
      yPosition: getxyPosition(props).yPosition,
      draggable_header_dom,
      draggable_confirm_dom,
      newContstyle: setContentStyle(),
      newTitlestyle: setTitleStyle(props.titleStyle),
      setBackground,
      redefineStyle,
      setTitleBg,
      setFootBg,
    };
  },
};
</script>
