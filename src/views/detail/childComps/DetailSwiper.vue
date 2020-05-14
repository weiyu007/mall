<template>
  <div>
    <Swiper class="s-item">
      <SwiperItem v-for="(item,index) in topImages" :key="index">
        <img :src="item" alt />
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/conmon/swiper";
export default {
  name: "DetailSwiper",
  components: { Swiper, SwiperItem },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.s-item {
  height: 300px;
  overflow: hidden;
}
</style>