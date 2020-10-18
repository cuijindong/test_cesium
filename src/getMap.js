import * as Cesium from 'cesium/Cesium.js'
export default  {
    /**
     * 高德地图
     */
    getImageryProviderArrGD(){
        let imageryLayerCollection = []
        let imageryLayer
        /*******************高德start**********************/
        imageryLayer = new Cesium.ProviderViewModel({
            name: '蓝色底图',
            tooltip: 'geoq电子地图服务',
            iconUrl: "img/basemaps/bd-c-midnight.png",
            category: '高德',
            creationFunction: function () {
                return new Cesium.ArcGisMapServerImageryProvider({
                    "url": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
                    "enablePickFeatures": false
                });
            }
        })
        
        imageryLayerCollection.push(imageryLayer)

        imageryLayer = new Cesium.ProviderViewModel({
            name: '高德电子',
            tooltip: '高德电子地图服务',
            iconUrl: "img/basemaps/gaode_vec.png",
            category: '高德',
            creationFunction: function () {
                return new Cesium.UrlTemplateImageryProvider({
                    url: 'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
                })
            }
        });
        imageryLayerCollection.push(imageryLayer)

        imageryLayer = new Cesium.ProviderViewModel({
            name: '高德影像',
            tooltip: '百度影像地图服务',
            iconUrl: "img/basemaps/gaode_img.png",
            category: '高德',
            creationFunction: function () {
                return new Cesium.UrlTemplateImageryProvider({
                    url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
                })
            }
        });
        imageryLayerCollection.push(imageryLayer)

        imageryLayer = new Cesium.ProviderViewModel({
            name: '灰色底图',
            tooltip: 'geoq电子地图服务',
            iconUrl: "img/basemaps/bd-c-grayscale.png",
            category: '高德',
            creationFunction: function () {
                return new Cesium.ArcGisMapServerImageryProvider({
                    "url": "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer"
                });
            }
        });
        imageryLayerCollection.push(imageryLayer)
        /*******************高德end**********************/

        return imageryLayerCollection
    },
}