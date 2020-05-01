import Vue from 'vue'
import App from './App.vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import { Map, TileLayer, OsmSource, Geoloc } from 'vuelayers'

Vue.use(Map);
Vue.use(TileLayer);
Vue.use(OsmSource);
Vue.use(Geoloc);
Vue.use(VueLayers);


new Vue({
  el: '#app',
  Map,
  TileLayer,
  OsmSource,
  Geoloc,
  VueLayers,
  render: h => h(App)
});
