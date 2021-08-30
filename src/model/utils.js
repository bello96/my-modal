import { default_positionAll } from './default'
export const mouseFn = (e, props) => {
  e.stopPropagation();
  let { target, type } = e;
  if (target.tagName === "BUTTON") {
    if (target.className === "btn_confirm") {
      target.style.backgroundColor = props.btnStyleColor;
      if (type === 'mouseover') {
        target.style.opacity = "0.8";
      } else if (type === 'mouseout') {
        target.style.opacity = "1";
      }
    }
    if (target.className === "btn_cancel") {
      if (type === 'mouseover') {
        target.style.color = props.btnStyleColor;
        target.style.borderColor = props.btnStyleColor;
      } else if (type === 'mouseout') {
        target.style.color = null;
        target.style.borderColor = null;
      }
    }
  }
};
export const isBackgroundColor = (props) =>
  /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(props.backgroundImage);
export const isVueOptions = (options) => {
  if (!options) return false;
  return (
    typeof options.template === "string" ||
    typeof options.render === "function" ||
    typeof options.setup === "function" ||
    typeof options.components === "object"
  );
};
export const maskClosableFn = (props) => {
  if (!props.maskClosable) return;
  props.onCancel();
};
export const keyupEvent = (e, props) => {
  if (e.key === "Escape") {
    props.onCancel();
  }
};
export const getxyPosition = (props) => {
  let activePos = props.modalPosition,
      xPosition = "",
      yPosition = "";
    if (default_positionAll.includes(activePos)) {
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
  return { xPosition, yPosition }
}