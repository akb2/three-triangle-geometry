import { TriangleGeometryParameters } from '../src/models';

export type ArgType = string | number | boolean | undefined | Function | null;

interface TriangleGeometryParametersTestDataExpections {
  index: Uint16Array;
  position: Float32Array;
  normal: Float32Array;
  uv: Float32Array;
  sideC: number;
}

export interface TriangleGeometryParametersTestData extends Pick<TriangleGeometryParameters, "sideA" | "sideB"> {
  sideC?: number;
  segments?: 1 | 2;
  expections: TriangleGeometryParametersTestDataExpections;
}