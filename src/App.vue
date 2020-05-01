<template>
  <div id="app">
    <div class="wrapper">
      <div class="map">
        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                data-projection="EPSG:4326">
          <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
          <vl-layer-tile id="osm">
            <vl-source-osm></vl-source-osm>
          </vl-layer-tile>

          <template v-for="feature in countries.features" >
            <template v-if="feature.type == 'Feature'">
              <vl-feature v-if="feature.geometry.type == 'Polygon'"  :id="feature.id" :properties="feature.properties" :key="feature.id">
                  <vl-geom-polygon :coordinates="feature.geometry.coordinates"></vl-geom-polygon>
              </vl-feature>
              <template v-if="feature.geometry.type == 'MultiPolygon'">
                <vl-feature :id="feature.id" :properties="feature.properties" :key="feature.id">
                  <vl-geom-polygon v-for="coordinates in feature.geometry.coordinates" :coordinates="coordinates"></vl-geom-polygon>
                </vl-feature>
              </template>
            </template>

          </template>


        </vl-map>
      </div>
      <div class="left-menu">
        <h1>Список элементов попадающие в область видимости</h1>
        <div class="border">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            let self = this;
             fetch('/countries.json').then(function (response, reject)  {
                 response.json().then(function (countries, reject) {
                     countries.features.forEach(function (feature, index) {
                        return self.countries.features.push(feature)
                     });
                 })
            });
            return {
                zoom: 2,
                center: [0, 0],
                rotation: 0,
                geolocPosition: undefined,
                countries: {features: []}
            }
        },
    }
</script>

<style scoped>
  .map {
    width: 995px;
    height: 1024px;
    margin-right: 22px;
  }
  .wrapper {
    display: flex;
  }
  .left-menu{
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: bold;
    color: #B83700;
    width: 402px;
    height: 40px;
  }
  .left-menu h1{
    font-size: 16px;
    line-height: 19px;
  }

  .border{
    width: 402px;
    height: 936px;
    border: 1px solid #000000;
  }
</style>
