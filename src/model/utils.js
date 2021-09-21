import { default_positionAll,colors } from './default'
export const mouseFn = (e, props) => {
  e.stopPropagation();
  let { target, type } = e;
  if (target.tagName === "BUTTON") {
    if (target.className === "btn_confirm") {
      target.style.backgroundColor = props.btnStyle.color;
      if (type === 'mouseover') {
        target.style.opacity = "0.8";
      } else if (type === 'mouseout') {
        target.style.opacity = "1";
      }
    }
    if (target.className === "btn_cancel") {
      if (type === 'mouseover') {
        target.style.color = props.btnStyle.color;
        target.style.borderColor = props.btnStyle.color;
      } else if (type === 'mouseout') {
        target.style.color = null;
        target.style.borderColor = null;
      }
    }
  }
};
export const isBackgroundColor = (bg) => {
  return colors.includes(bg) || /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(bg);
}
  
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
  let activePos = props.position,
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
};
const getOffsetXY = (element) => {
  let parent = element.offsetParent,
    top = element.offsetTop,
    left = element.offsetLeft;
  while (parent) {
    left += parent.clientLeft;
    left += parent.offsetLeft;
    top += parent.clientTop;
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return { top, left };
};
export const startDrop = (drop_dom, modal_dom) => {
  drop_dom.onmousedown = function (e) {
    e.preventDefault()
    let { left, top } = getOffsetXY(modal_dom),
      { pageX, pageY } = e,
      boxX = pageX - left,
      boxY = pageY - top;
    document.onmousemove = function (e) {
      e.preventDefault()
      let { pageX, pageY } = e;
      if (pageX <= 0) { pageX = 0 }
      if (pageY <= 0) { pageY = 0 }
      modal_dom.style.left = `${pageX - boxX}px`;
      modal_dom.style.top = `${pageY - boxY}px`;
    };
  };
};