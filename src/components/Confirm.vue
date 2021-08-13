<template>
  <div class="confirm_wrapper">
    <div
      class="confirm_box"
      :style="{ width: `${!isNaN(contentWidth) ? contentWidth : 'auto'}px` }"
    >
      <div class="confirm_box_header">
        <div class="confirm_box_title" :style="{ textAlign: titleAlign }">
          <span :title="title.length > 10 ? title : ''">{{ title }}</span>
        </div>
        <button class="confirm_box_headerbtn" @click="onCancel">
          <svg
            t="1628678180582"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
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
      <div class="confirm_box_btns" :style="{ textAlign: btnAlign }">
        <button @click="onCancel">{{ cancelBtnText }}</button>
        <button @click="onConfirm">{{ confirmBtnText }}</button>
      </div>
    </div>
  </div>
  <div class="transparent_frame"></div>
</template>

<script>
export default {
  name: "Confirm",
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
      default: "rigght",
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
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
  align-items: center;
  justify-content: center;
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
  padding: 15px 15px 10px;
}
.confirm_box_title {
  padding-left: 0;
  margin-bottom: 0;
  font-size: 16px;
  line-height: 1;
  color: #303133;
  font-weight: bold;
  padding-right: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.confirm_box_headerbtn {
  position: absolute;
  top: 15px;
  right: 12px;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  width: 18px;
  height: 18px;
}
.confirm_box_content {
  padding: 10px 15px;
  color: #606266;
  font-size: 14px;
  text-align: center;
  overflow: auto;
  max-height: 600px;
  min-height: 50px;
  display: flex;
  align-items: flex-start;
}
.confirm_box_btns {
  padding: 10px 15px 10px;
}
.transparent_frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 2000;
}
</style>
