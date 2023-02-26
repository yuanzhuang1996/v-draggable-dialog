export default {
  install: function (Vue, option) {
    Vue.directive('drag', {
      // 指令绑定时调用，初始化元素的状态和事件监听
      bind(el, binding, vnode) {
        // 初始状态
        let startX,
          startY,
          initialX,
          initialY,
          currentX,
          currentY,
          xOffset = 0,
          yOffset = 0,
          dragging = false;
        // 获取设置了position: absolute的父元素，用于限制拖拽范围
        const parent =
          el.parentNode.style.position === 'absolute' ? el.parentNode : null;

        // 鼠标按下事件
        el.addEventListener('mousedown', function (event) {
          // 记录初始位置
          startX = event.clientX;
          startY = event.clientY;
          initialX = el.offsetLeft;
          initialY = el.offsetTop;
          // 标记为拖拽中状态
          dragging = true;

          // 鼠标移动事件
          document.addEventListener('mousemove', dragElement);
          // 鼠标松开事件
          document.addEventListener('mouseup', stopDraggingElement);
        });

        // 拖拽函数
        function dragElement(event) {
          if (dragging) {
            // 计算当前位置
            currentX = event.clientX - startX;
            currentY = event.clientY - startY;

            // 如果有设置父元素，计算边界
            if (parent) {
              const parentRect = parent.getBoundingClientRect();
              const elRect = el.getBoundingClientRect();
              const maxX = parentRect.width - elRect.width;
              const maxY = parentRect.height - elRect.height;
              currentX = Math.min(Math.max(currentX, 0), maxX);
              currentY = Math.min(Math.max(currentY, 0), maxY);
            }

            // 计算偏移量
            xOffset = currentX;
            yOffset = currentY;

            // 移动元素
            el.style.left = `${initialX + xOffset}px`;
            el.style.top = `${initialY + yOffset}px`;
          }
        }

        // 停止拖拽函数
        function stopDraggingElement() {
          // 取消事件监听
          document.removeEventListener('mousemove', dragElement);
          document.removeEventListener('mouseup', stopDraggingElement);
          // 标记为非拖拽状态
          dragging = false;
        }
      },
    });
  },
};
