<template>
  <Swiper>
    <SwiperItem :key="item.index" v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" @load="imgLoad" />
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/conmon/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImgLoad");
        // console.log("111");//只需发送一次获取轮播图高度即可
      }
      this.isLoad = true;
    }
  }
};
</script>

<style>
</style>