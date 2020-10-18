<template>
  <div class="earth">
    <div class="map">
      <div id="cesiumContainer" style="height: 100%;"></div>
      <div class="lonLat">
        <span>经度：{{lonLat.longitude}}</span>
        <span>纬度：{{lonLat.latitude}}</span>
      </div>
      <div class="lonLat top" v-show="isShowLatAndLng">
        <span>经度：{{clickLonLat.longitude}}</span>
        <span>纬度：{{clickLonLat.latitude}}</span>
        <span class="top-close" @click.stop="isShowLatAndLng = false">x</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      isShowLatAndLng: false,   // 经纬度弹窗
      lonLat: {
        longitude: 0,   // 经度
        latitude: 0,    // 纬度
        mapheight: 0,   // 高度
      },
      clickLonLat: {
        longitude: 0,   // 经度
        latitude: 0,    // 纬度
        mapheight: 0,   // 高度
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initMap()
      // this.changeimageryLayers()
      this.cameraPosition(126.96857433834268, 46.654101276837785, 10000)
      this.latAndLng()
      this.$emit('on-load')
    },
    /**
     * 初始化地图
     */
    initMap() {
      let option = {
        baseLayerPicker: true,   //图层选择器
        animation: false,   //左下角仪表
        fullscreenButton: true,   //全屏按钮
        geocoder: false,   //右上角查询搜索
        infoBox: false,   //信息框
        homeButton: false,   //home按钮
        sceneModePicker: true,  //3d 2d选择器
        selectionIndicator: false,  //
        timeline: false,   //时间轴
        navigationHelpButton: false,  //右上角帮助按钮
        imageryProviderViewModels: this.$getMap.getImageryProviderArrGD()
      }      
      let Viewer = new this.$Cesium.Viewer('cesiumContainer', option)
      // 放到window里
      window._Viewer = Viewer
    },
    /**
     * 改变底图
     */
    changeimageryLayers() {
      let Viewer = window._Viewer
      Viewer.imageryLayers.remove()
      Viewer.imageryLayers.addImageryProvider()
    },
    /**
     * 相机位置
     */
    cameraPosition(longitude, latitude, cameraHeight) {
      let Viewer = window._Viewer
      Viewer.scene.camera.setView({
        // 相机经纬度
        destination : new this.$Cesium.Cartesian3.fromDegrees(longitude, latitude, cameraHeight),
        // 相机方向
        orientation: {
            heading : this.$Cesium.Math.toRadians(0.0),   // 左右
            pitch : this.$Cesium.Math.toRadians(-90.0),     //从上往下看为-90
            roll : 0
        }
      })
    },
    /**
     * 获取鼠标经纬度(添加地图点击事件 获取经纬度)
     */
    latAndLng() {
      // 鼠标移动显示经纬高度
      let Viewer = window._Viewer
      Viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(e => {
        let ray = Viewer.camera.getPickRay(e.endPosition)
        let cartesian = Viewer.scene.globe.pick(ray, Viewer.scene)
        let lonLatAlt = {}
        // 计算经纬高度
        if (this.$Cesium.defined(cartesian)) {
          lonLatAlt = this.$common.getLatLng(Viewer, this.$Cesium, cartesian)
        } else {
          lonLatAlt = {}
        }
        this.lonLat.mapheight = lonLatAlt.alt || 0
        this.lonLat.latitude = lonLatAlt.lat || 0
        this.lonLat.longitude = lonLatAlt.lng || 0
      }, this.$Cesium.ScreenSpaceEventType.MOUSE_MOVE)

      // 添加点击地图事件
      Viewer.cesiumWidget.screenSpaceEventHandler.setInputAction(() => {
        this.clickLonLat = JSON.parse(JSON.stringify(this.lonLat))
        this.isShowLatAndLng = true
      }, this.$Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    /**
     * 打点
     */
    addPoint(list, imgUrl) {
      console.log(imgUrl)
      let Viewer = window._Viewer
      let dataSource = new this.$Cesium.CustomDataSource('myData')

      Viewer.dataSources.add(dataSource)

      dataSource.entities.add({
        position : this.$Cesium.Cartesian3.fromDegrees(list[0], list[1], list[2]),
        billboard : {
            image : imgUrl,
            scale: .5,
            verticalOrigin: this.$Cesium.VerticalOrigin.BOTTOM,
            HorizontalOrigin: this.$Cesium.HorizontalOrigin.CENTER
        }
      })

    }
  }
}
</script>
<style lang="scss" scoped>
.earth{
  height: 100%;
}
.map{
  position: fixed;
  height: 100%;
  width: 100%;
}
.lonLat{
  position: fixed;
  bottom: 10px;
  left: 10px;
}
.top{
  top: 120px;
  background-color: #fff;
  height: 42px;
  line-height: 42px;
  padding: 0 30px;
  .top-close{
    position: absolute;
    top: 5px;
    line-height: initial;
    right: 5px;
    cursor: pointer;
  }
}
</style>