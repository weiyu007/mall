<template>
  <TabBar>
    <TabBarItem path="/home" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/shouye.png" alt />
      <img slot="item-icon-active" src="../../assets/img/tabbar/shouye-active.png" alt />
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/fenlei" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/fenlei.png" alt />
      <img slot="item-icon-active" src="../../assets/img/tabbar/fenlei-active.png" alt />
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/gwc" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/che.png" alt />
      <img slot="item-icon-active" src="../../assets/img/tabbar/che-active.png" alt />
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/wode" activeColor="blue">
      <img slot="item-icon" src="../../assets/img/tabbar/wode.png" alt />
      <img slot="item-icon-active" src="../../assets/img/tabbar/wode-active.png" alt />
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from "../conmon/tabbar/TabBar";
import TabBarItem from "../conmon/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
</style>
