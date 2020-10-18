export default {
    /** 
     * 世界坐标转换为经纬度
     */
    getLatLng(Viewer, Cesium, cartesian3) {
        var ellipsoid = Viewer.scene.globe.ellipsoid;

        var cartographic=ellipsoid.cartesianToCartographic(cartesian3);

        var lat = Cesium.Math.toDegrees(cartographic.latitude);

        var lng = Cesium.Math.toDegrees(cartographic.longitude);

        var alt = cartographic.height;

        return {lat, lng, alt}
    }
}