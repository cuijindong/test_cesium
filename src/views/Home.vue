<template>
  <div class="home">
      <earth @on-load="handlerLoad" ref="earth"></earth>
      <div style="position: absolute;
    top: 10px;" @click="point">要素点1</div>
  </div>
</template>

<script>
import earth from '../components/earth'
export default {
    components: {
        earth
    },
    methods: {
        /**
         * 地图是否加载完
         */
        handlerLoad() {
            // this.$refs.earth.addPoint([126.98319460121984,46.64470284116108], '/img/point/org.png')
        },
        point() {
            let Viewer = window._Viewer
            let dataSource = new this.$Cesium.CustomDataSource('ponit1')
                Viewer.dataSources.add(dataSource)
            dataSource.entities.add({
                name: 'ponit1',
                position: this.$Cesium.Cartesian3.fromDegrees(126.98522, 46.65154),
                billboard: {
                    image: '/img/point/org.png',
                    scale: 1,
                    verticalOrigin: this.$Cesium.VerticalOrigin.BOTTOM,
                    HorizontalOrigin: this.$Cesium.HorizontalOrigin.CENTER
                }
            })
            console.log(dataSource.entities)
        }
    }
}
</script>

<style lang="scss" scoped>
.home{
    height: 100%;
}
</style>>