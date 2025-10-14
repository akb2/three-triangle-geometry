import { TriangleGeometryParametersTestData } from "./models";

export const triangleGeometryParametersTestData: TriangleGeometryParametersTestData[] = [
  {
    sideA: 3,
    sideB: 4,
    sideC: 5,
    segments: 1,
    expections: {
      sideC: 5,
      index: new Uint16Array([0, 1, 2]),
      position: new Float32Array([-2, 0, 0, 2, 0, 0, -2, 5, 0]),
      normal: new Float32Array([1, 0, 0, -0.6246950626373291, 0.7808688282966614, 0, 0, -1, 0]),
      uv: new Float32Array([0, 0, 1, 0, 0, 1])
    }
  },

  {
    sideA: 9,
    sideB: 12,
    expections: {
      sideC: 9,
      index: new Uint16Array([0, 1, 2]),
      position: new Float32Array([-6, 0, 0, 6, 0, 0, 0, 6.7082037925720215, 0]),
      normal: new Float32Array([1, 0, 0, -0.6666666865348816, 0.7453559637069702, 0, -0.6666666865348816, -0.7453559637069702, 0]),
      uv: new Float32Array([0, 0, 1, 0, 0.5, 1])
    }
  },

  {
    sideA: 1,
    sideB: 12,
    sideC: 11.958260743101398,
    expections: {
      sideC: 11.958260743101398,
      index: new Uint16Array([0, 1, 2]),
      position: new Float32Array([-6, 0, 0, 6, 0, 0, -5.91666650772094, 11.95797061920166, 0]),
      normal: new Float32Array([1, 0, 0, -0.7058824300765991, 0.7083290219306946, 0, -0.006968683563172817, -0.9999757409095764, 0]),
      uv: new Float32Array([0, 0, 1, 0, 0.0069444444961845875, 1])
    }
  },

  {
    sideA: 3,
    sideB: 4,
    sideC: 5,
    segments: 2,
    expections: {
      sideC: 5,
      index: new Uint16Array([1, 0, 3, 1, 2, 3]),
      position: new Float32Array([-2, 0, 0, 0, 0, 0, 2, 0, 0, -2, 5, 0,]),
      normal: new Float32Array([
        -1,
        0,
        0,
        0,
        1,
        0,
        0.3713906705379486,
        -0.9284766912460327,
        0,
        1,
        0,
        0,
        -0.6246950626373291,
        0.7808688282966614,
        0,
        0.3713906705379486,
        -0.9284766912460327,
        0,
      ]),
      uv: new Float32Array([0, 0, 0.5, 0, 1, 0, 0, 1,])
    }
  }
];