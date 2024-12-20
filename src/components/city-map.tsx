"use client";

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { VISITED_LOCATIONS, MAP_CONFIG, CURRENT_LOCATION } from '@/data/locations';

// 定义地图样式
const MAP_STYLES = {
  light: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
  dark: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png'
};

export function CityMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [zoom, setZoom] = useState(MAP_CONFIG.zoom);
  const { theme } = useTheme();

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: [theme === 'dark' ? MAP_STYLES.dark : MAP_STYLES.light],
            tileSize: 256,
            attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 0,
            maxzoom: 22
          }
        ]
      },
      center: [MAP_CONFIG.center[0], MAP_CONFIG.center[1]],
      zoom: MAP_CONFIG.zoom,
      maxZoom: MAP_CONFIG.maxZoom,
      minZoom: MAP_CONFIG.minZoom,
      antialias: true
    });

    // 添加导航控件
    map.current.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true
      })
    );

    map.current.on('load', () => {
      // 添加热力图数据源
      map.current?.addSource('heat', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: VISITED_LOCATIONS.map(location => ({
            type: 'Feature',
            properties: {
              weight: location.weight * 2
            },
            geometry: {
              type: 'Point',
              coordinates: location.coordinates
            }
          }))
        }
      });

      // 添加热力图层
      map.current?.addLayer({
        id: 'heat',
        type: 'heatmap',
        source: 'heat',
        paint: {
          'heatmap-weight': ['get', 'weight'],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, theme === 'dark' ? 'rgba(147, 51, 234, 0)' : 'rgba(236, 72, 153, 0)',
            0.2, theme === 'dark' ? 'rgba(147, 51, 234, 0.4)' : 'rgba(236, 72, 153, 0.4)',
            0.4, theme === 'dark' ? 'rgba(236, 72, 153, 0.6)' : 'rgba(239, 68, 68, 0.6)',
            0.6, theme === 'dark' ? 'rgba(236, 72, 153, 0.8)' : 'rgba(239, 68, 68, 0.8)',
            0.8, theme === 'dark' ? 'rgba(239, 68, 68, 0.9)' : 'rgba(239, 68, 68, 0.9)',
            1, theme === 'dark' ? 'rgba(239, 68, 68, 1)' : 'rgba(239, 68, 68, 1)'
          ],
          'heatmap-radius': 100,
          'heatmap-opacity': theme === 'dark' ? 0.8 : 0.6
        }
      });

      // 添加当前位置标记
      const el = document.createElement('div');
      el.className = 'current-location-marker';
      
      new maplibregl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(CURRENT_LOCATION.coordinates)
        .setPopup(
          new maplibregl.Popup({ offset: 25 })
            .setHTML('<div class="text-sm font-medium">Current Location</div>')
        )
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [theme]);

  // 监听主题变化并更新地图样式
  useEffect(() => {
    if (!map.current) return;

    const source = map.current.getSource('raster-tiles') as maplibregl.RasterTileSource;
    if (source && source.setTiles) {
      source.setTiles([theme === 'dark' ? MAP_STYLES.dark : MAP_STYLES.light]);
    }

    // 更新热力图颜色
    if (map.current.getLayer('heat')) {
      map.current.setPaintProperty('heat', 'heatmap-color', [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, theme === 'dark' ? 'rgba(147, 51, 234, 0)' : 'rgba(236, 72, 153, 0)',
        0.2, theme === 'dark' ? 'rgba(147, 51, 234, 0.2)' : 'rgba(236, 72, 153, 0.2)',
        0.4, theme === 'dark' ? 'rgba(236, 72, 153, 0.4)' : 'rgba(239, 68, 68, 0.4)',
        0.6, theme === 'dark' ? 'rgba(236, 72, 153, 0.6)' : 'rgba(239, 68, 68, 0.6)',
        0.8, theme === 'dark' ? 'rgba(239, 68, 68, 0.8)' : 'rgba(239, 68, 68, 0.8)',
        1, theme === 'dark' ? 'rgba(239, 68, 68, 1)' : 'rgba(239, 68, 68, 1)'
      ]);
      map.current.setPaintProperty('heat', 'heatmap-opacity', theme === 'dark' ? 0.35 : 0.25);
    }
  }, [theme]);

  return (
    <div className="w-full space-y-4">
      <div 
        ref={mapContainer} 
        className="w-full h-[500px] rounded-xl overflow-hidden"
      />
    </div>
  );
} 