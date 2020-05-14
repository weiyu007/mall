<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 1.创建BScroll实例对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // this.scroll.scrollTo(0, 0);
    // 2.监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log("111");
      this.$emit("pullingUp");
    });
    // console.log(this.scroll);
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll & this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("-防抖验证-");
      this.scroll & this.scroll.refresh();
    }
  }
};
</script>

<style>
</style>