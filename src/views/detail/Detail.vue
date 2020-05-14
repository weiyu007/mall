<template>
  <div id="detail">
    <DetailNavBar class="detail-nav-bar"></DetailNavBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shops"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @detailImgLoad="detailImgLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList :goods="recommends"></GoodsList>
    </Scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "../detail/childComps/DetailSwiper";
import DetailBaseInfo from "../detail/childComps/DetailBaseInfo";
import DetailShopInfo from "../detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "../detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "../detail/childComps/DetailParamInfo";
import DetailCommentInfo from "../detail/childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";

import Scroll from "../../components/conmon/scroll/Scroll";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "../../network/datail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shops: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    };
  },
  methods: {
    detailImgLoad() {
      this.$refs.scroll.refresh();
    }
  },

  created() {
    // 1.保存存入的id
    // console.log(this.$route.params);
    this.iid = this.$route.params.iid;
    // 2.请求详情页数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      //2.1请求轮播图数据
      this.topImages = data.itemInfo.topImages;

      //2.2请求商品复杂数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //2.3.请求商铺数据
      this.shops = new Shop(data.shopInfo);

      //2.4.请求商品详细信息
      this.detailInfo = data.detailInfo;

      //2.5.请求参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //2.6.请求评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐信息
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    });
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>