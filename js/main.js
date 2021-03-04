import { setStatusAdvertForm } from './advert-form.js';
import { filterInitialization, setStatusFilterForm } from './filter-form.js';
import { getAdvertsDataOfServer, errorServerHandler } from './server.js';

import { initializationMap, setExtraMarkers } from './map.js';


setStatusAdvertForm(false);
setStatusFilterForm(false);
initializationMap();

getAdvertsDataOfServer((advertsArray) => {
  setExtraMarkers(advertsArray);
  filterInitialization(() => setExtraMarkers(advertsArray));
}, errorServerHandler);
