<template>
  <div id="hy-swiper">
    <!-- touchstart、touchmove、touchend是触摸事件，非自定义 -->
    <div
      class="swiper"
      ref="targetSwiper"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <!-- 外部通知需要indicator，并且slide数量大于1时，才使用indicator -->
      <slot name="indicator" v-if="showIndicator && slideCount > 1">
        <!-- 因为在最前面加了最后一张图的复制，因此currentIndex要-1 -->
        <div
          v-for="(item, index) in slideCount"
          class="indi-item"
          :class="{active: index === currentIndex-1}"
          :key="index"
        ></div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0, // 元素个数
      swiperWidth: 0, // 一张滚动图片的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false // 是否正在滚动
    };
  },
  mounted: function() {
    // 1.操作DOM, 在前后添加Slide
    setTimeout(() => {
      this.handleDom();

      // 2.开启定时器
      this.startTimer();
    }, 250); // 延时是为了等轮播图图片全加载完，否则handleDom中前三行记录的数据就不准确
  },
  methods: {
    /**
     * 操作DOM, 在DOM前后添加Slide
     */
    handleDom: function() {
      // 1.获取要操作的元素
      let swiperEl = this.$refs.targetSwiper;
      let slidesEls = swiperEl.getElementsByClassName("slide");

      // 2.保存slide个数
      this.slideCount = slidesEls.length;

      // 3.如果大于1个, 那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        // 前后都加复制
        // 如果没有复制，直接改变大图显示位置的话，图片就会闪现而没有滚动动画效果
        // 比如滚到slidesEls[slideCount]后，先让图滚到cloneLast，然后无延时跳转到slidesEls[1]
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        // 注意这里是在slidesEls[0]前加一个cloneLast，而不是在最前面加两个元素
        swiperEl.insertBefore(cloneLast, slidesEls[0]);
        swiperEl.appendChild(cloneFirst);
        // swiperEl是包住几个slide的外层div，不是所有图片连在一起的大图
        // 因此swiperWidth是一张图的宽度，而不是所有图连在一起的总宽度
        this.swiperWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }

      // 4.让swiper元素, 从slidesEls[1]开始显示
      this.setTransform(-this.swiperWidth);
    },

    /**
     * 定时器操作
     */
    startTimer: function() {
      // this.playTimer相当于给组件新建一个playTimer属性
      this.playTimer = window.setInterval(() => {
        this.currentIndex++;
        this.scrollContent(-this.currentIndex * this.swiperWidth);
      }, this.interval);
    },
    stopTimer: function() {
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确的位置
     */
    scrollContent: function(currentPosition) {
      // 0.设置正在滚动
      this.scrolling = true;

      // 1.开始滚动动画
      this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);

      // 2.判断大图是否到最后一张或第一张
      this.checkPosition();

      // 4.滚动完成
      this.scrolling = false;
    },

    /**
     * 处理图片到了最后一张或第一张时的情况
     */
    checkPosition: function() {
      window.setTimeout(() => {
        // 1.校验正确的位置
        // 设置动画延时为0，无延时切换到slidesEls[1]或slidesEls[slideCount]
        this.swiperStyle.transition = "0ms";
        // 如果大图（播放或被拖动）到第cloneLast处，当前位置为cloneLast
        if (this.currentIndex >= this.slideCount + 1) {
          // 重置currentIndex和大图显示位置，让大图无延时跳到slidesEls[1]处
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.swiperWidth);
          // 如果大图被拖动到cloneFirst处，让大图无延时跳到slidesEls[slideCount]处
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.swiperWidth);
        }

        // 2.结束移动后的回调
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },

    /**
     * 设置显示大图的哪个区域
     */
    setTransform: function(position) {
      // 位移大图，使swiper显示我们需要的位置的那张图
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle[
        "-webkit-transform"
      ] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle["-ms-transform"] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 触摸事件的处理
     */
    // 手指接触屏幕
    touchStart: function(e) {
      // 1.如果正在滚动, 不可以拖动
      if (this.scrolling) return;

      // 2.停止定时器
      this.stopTimer();

      // 3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },
    // 手指滑动
    touchMove: function(e) {
      // 1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.swiperWidth;
      let touchMovePos = this.distance + currentPosition;

      // 2.将大图显示位置设置为当前位置
      this.setTransform(touchMovePos);
    },
    // 手指离开屏幕
    touchEnd: function(e) {
      // 1.获取拖动的距离（包含正负符号）
      let currentMove = Math.abs(this.distance);

      // 2.判断最终的距离
      // 没有移动
      if (this.distance === 0) {
        return;
        // 向右拖动超过一张图宽度的50%
      } else if (
        this.distance > 0 &&
        currentMove > this.swiperWidth * this.moveRatio
      ) {
        this.currentIndex--;
        // 向左拖动超过一张图宽度的50%
      } else if (
        this.distance < 0 &&
        currentMove > this.swiperWidth * this.moveRatio
      ) {
        this.currentIndex++;
      }

      // 3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.swiperWidth);

      // 4.重新开启定时器
      this.startTimer();
    }

    /**
     * 控制上一个, 下一个
     */
    // previous: function() {
    //   this.changeItem(-1);
    // },

    // next: function() {
    //   this.changeItem(1);
    // },

    // changeItem: function(num) {
    //   // 1.移除定时器
    //   this.stopTimer();

    //   // 2.修改index和位置
    //   this.currentIndex += num;
    //   this.scrollContent(-this.currentIndex * this.swiperWidth);

    //   // 3.添加定时器
    //   this.startTimer();
    // }
  }
};
</script>

<style scoped>
#hy-swiper {
  overflow: hidden;
  position: relative;
}

.swiper {
  display: flex;
}

.indicator {
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 8px;
}

.indi-item {
  box-sizing: border-box;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: #fff;
  line-height: 8px;
  text-align: center;
  font-size: 12px;
  margin: 0 5px;
}

.indi-item.active {
  background-color: rgba(212, 62, 46, 1);
}
</style>
