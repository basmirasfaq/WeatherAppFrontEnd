import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

import { Icon, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import {
  Fill,
  Stroke,
  
} from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class OpenlayerMapService {

  createMap(
    target: string,
    lat: number,
    lon: number
  ): Map {

    const map = new Map({

      target,

      layers: [

        new TileLayer({
          source: new OSM()
        })

      ],

      view: new View({

        center: fromLonLat([lon, lat]),

        zoom: 10

      })

    });

    return map;
  }

  addMarker(
    map: Map,
    lat: number,
    lon: number
  ) {

    const marker = new Feature({

      geometry:
        new Point(
          fromLonLat([lon, lat])
        )

    });

    marker.setStyle(

      new Style({

        image: new Icon({

          src:
            'https://cdn-icons-png.flaticon.com/512/684/684908.png',

          scale: 0.08

        })

      })

    );

    const vectorLayer =
      new VectorLayer({

        source:
          new VectorSource({

            features: [marker]

          })

      });

    map.addLayer(vectorLayer);
  }
addWeatherZone(
  map: Map,
  lat: number,
  lon: number,
  temp: number
) {

  let color = '#22c55e';

  if (temp > 35) {

    color = '#ef4444';

  } else if (temp > 28) {

    color = '#f59e0b';

  } else if (temp > 20) {

    color = '#3b82f6';

  }

  const circleFeature =
    new Feature({

      geometry:
        new Circle(
          fromLonLat([lon, lat]),
          5000
        )

    });

  circleFeature.setStyle(

    new Style({

      fill: new Fill({

        color:
          color + '55'

      }),

      stroke:
        new Stroke({

          color: color,

          width: 3

        })

    })

  );

  const layer =
    new VectorLayer({

      source:
        new VectorSource({

          features: [
            circleFeature
          ]

        })

    });

  map.addLayer(layer);

}
}