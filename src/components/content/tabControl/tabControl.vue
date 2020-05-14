<template>
  <div class="tabControl">
    <div
      v-for="(item,index) in titles"
      :key="item.index"
      class="tabControl_item"
      :class="{active:index === currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      // this.index = currentIndex;
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>

<style scoped>
.tabControl {
  display: flex;
  width: 100%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tabControl_item {
  flex: 1;
}
.tabControl_item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 6px solid var(--color-tint);
}
</style>