<template>
  <div class="home">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  mounted() {
    this.initCesium()
  },
  methods: {
    initCesium() {
      let option = {
        baseLayerPicker: false,   //图层选择器
        animation: false,   //左下角仪表
        fullscreenButton: false,   //全屏按钮
        geocoder: false,   //右上角查询搜索
        infoBox: false,   //信息框
        homeButton: false,   //home按钮
        sceneModePicker: false,  //3d 2d选择器
        selectionIndicator: false,  //
      }      
      let Viewer = new this.$Cesium.Viewer('cesiumContainer', option)
      window._Viewer = Viewer
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
}
</style>