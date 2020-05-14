<template>
  <div class="GoodsListItem" @click="itemClick">
    <img :src="showImg" @load="imgLoad" alt />
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">{{goodsitem.price}}</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imgLoadIng");
    },
    itemClick() {
      console.log("跳转到详情页");
      this.$router.push("/detail/" + this.goodsitem.iid);
    }
  },
  computed: {
    showImg() {
      return this.goodsitem.image || this.goodsitem.show.img;
    }
  }
};
</script>

<style scoped>
.GoodsListItem {
  position: relative;
  width: 48%;
  padding-bottom: 30px;
}
.GoodsListItem img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  font-size: 12px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
  white-space: nowrap;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  position: absolute;
  content: "";
  width: 14px;
  height: 14px;
  left: -15px;
  top: -1px;
  background: url("../../../assets/img/common/collect.svg") 0 0 /14px 14px;
}
</style>