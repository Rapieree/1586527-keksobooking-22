/* global _:readonly */
import { setStatusAdvertForm } from './advert-form.js';
import { filterInitialization, setStatusFilterForm } from './filter-form.js';
import { getAdvertsDataOfServer, errorServerHandler } from './server.js';
import { initializationMap, setExtraMarkers } from './map.js';

const RERENDERER_RELAY = 500;

setStatusAdvertForm(false);
setStatusFilterForm(false);

if(initializationMap()) {
  getAdvertsDataOfServer((advertsArray) => {
    setExtraMarkers(advertsArray);
    filterInitialization(_.debounce(() => setExtraMarkers(advertsArray), RERENDERER_RELAY));
    setStatusFilterForm(true);
  }, errorServerHandler);
}


