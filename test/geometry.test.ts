import { TriangleGeometry } from '../src/geometry';
import { triangleGeometryParametersTestData } from "./data";
import { argsString } from "./tools";

describe(
  "Test geometry instance creation",
  () => triangleGeometryParametersTestData.forEach(({ sideA, sideB, sideC, segments, expections: { index, position, normal, uv, sideC: expectedSideC } }) => {
    const geometry = new TriangleGeometry(sideA, sideB, sideC, segments);

    it(
      `new TriangleGeometry(${argsString(sideA, sideB, sideC, segments)})`,
      () => {
        expect(geometry.parameters.sideC).toBe(expectedSideC);
        expect(geometry.index?.array).toEqual(index);
        expect(geometry.attributes.position.array).toEqual(position);
        expect(geometry.attributes.normal.array).toEqual(normal);
        expect(geometry.attributes.uv.array).toEqual(uv);
        expect(geometry.attributes.uv2.array).toEqual(uv);
      }
    );
  })
);