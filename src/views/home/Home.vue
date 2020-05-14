<template>
  <div id="home" class="wrapper">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <tabControl
      :titles="['流行','新款','精选']"
      ref="tabControl1"
      @tabClick="tClick"
      class="tabcontrol"
      v-show="isTabFixed"
    ></tabControl>
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      @scroll="contentScroll"
      :pullUpLoad="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <tabControl
        :titles="['流行','新款','精选']"
        ref="tabControl2"
        @tabClick="tClick"
        :class="{fixed:isTabFixed}"
      ></tabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </scroll>
    <BackTop @click.native="backclick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from "./childCops/HomeSwiper";
import RecommendView from "./childCops/RecommendView";
import FeatureView from "./childCops/FeatureView";

import NavBar from "../../components/conmon/navbar/NavBar";
import tabControl from "../../components/content/tabControl/tabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backtop/BackTop";

import Scroll from "../../components/conmon/scroll/Scroll";
import { debounce } from "../../common/utils"; //不是默认导入需要加花括号

import { getHomeMultidata, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    tabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      isTabFixed: false,
      tabOffSetTop: 0,
      saveY: 0
    };
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 防抖处理
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("imgLoadIng", () => {
      refresh();
      // console.log("119");
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // destroyed() {
  //   // console.log("destroyed");
  // },
  activated() {
    // console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.scroll.y;
  },
  methods: {
    // 方法监听

    tClick(index) {
      console.log("111");
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backclick() {
      // console.log("backtop");
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.显示topback是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tabOffSetTop;
    },
    loadMore() {
      // console.log("111");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    swiperImgLoad() {
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffSetTop);
    },

    // 网络监听方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0; */
  /* better scroll 不会带着home nav一起滚动 */
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  /* height: calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden; */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.fixed {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
}
.tabcontrol {
  position: relative;
  z-index: 9;
}
</style>