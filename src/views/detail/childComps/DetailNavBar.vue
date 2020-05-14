<template>
  <div>
    <navbar>
      <div slot="left" @click="backClick" class="back">
        <img src="../../../assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="center">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="item"
          @click="itemClick(index)"
          :class="{Active:index === currentIndex}"
        >{{item}}</div>
      </div>
    </navbar>
  </div>
</template>

<script>
import navbar from "../../../components/conmon/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    navbar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.center {
  display: flex;
}
.center .item {
  flex: 1;
  justify-content: space-around;
}
.Active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 10px;
}
</style>