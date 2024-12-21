export interface Location {
  coordinates: [number, number];  // [经度, 纬度]
  weight: number;  // 访问频率或停留时间，0-1之间
}

// 苏州及周边城市
export const VISITED_LOCATIONS: Location[] = [
  // 长期居住
  { coordinates: [114.3162, 30.5810], weight: 1 },    // 武汉（20年）
  { coordinates: [151.2093, -33.8688], weight: 0.9 }, // 悉尼（3年）
  
  // 多次访问
  { coordinates: [144.9631, -37.8136], weight: 0.7 }, // 墨尔本（3次）
  { coordinates: [116.4074, 39.9042], weight: 0.7 },  // 北京（3次）
  { coordinates: [114.1694, 22.3193], weight: 0.7 },  // 香港（3次）

  //两次访问
  //南京
  { coordinates: [118.7674, 32.0415], weight: 0.6 },
  //天津
  { coordinates: [117.2005, 39.1256], weight: 0.6 },

  // 单次访问
  // china
  { coordinates: [106.5504, 29.5630], weight: 0.4 },  // 重庆
  { coordinates: [104.0668, 30.5728], weight: 0.4 },  // 成都
  { coordinates: [106.2309, 38.4872], weight: 0.4 },  // 银川
  { coordinates: [120.5853, 31.2989], weight: 0.4 },  // 苏州
  { coordinates: [121.4737, 31.2304], weight: 0.4 },  // 上海
  { coordinates: [118.6762, 24.8740], weight: 0.4 },  // 泉州
  { coordinates: [117.1205, 36.6510], weight: 0.4 },  // 济南
  { coordinates: [118.0894, 24.4798], weight: 0.4 },  // 厦门
  { coordinates: [110.3493, 19.0320], weight: 0.4 },  // 海南
  { coordinates: [112.9823, 28.1941], weight: 0.4 },  // 长沙
  { coordinates: [120.3551, 36.0829], weight: 0.4 },  // 青岛
  { coordinates: [103.8198, 1.3521], weight: 0.4 },   // 新加坡
  //australia
  //nsw
  { coordinates: [150.8931, -34.4250], weight: 0.4 },  // wollongong
  // kiama
  { coordinates: [150.8589, -34.6861], weight: 0.4 },  // kiama
  // orange
  { coordinates: [149.1000, -33.2833], weight: 0.4 },  // orange
  //vic
  // geelong
  { coordinates: [144.3407, -38.1471], weight: 0.4 },  // geelong
  //apollo bay
  { coordinates: [143.6048, -38.7360], weight: 0.4 },  // apollo bay
];

export const CURRENT_LOCATION: {
  coordinates: [number, number];
  name: string;
} = {
  coordinates: [151.2093, -33.8688],
  name: "Sydney"
};

// 地图配置
export const MAP_CONFIG = {
  center: [115.7184, 0.0407] as [number, number],
  zoom: 2,
  maxZoom: 5,
  minZoom: 2
};