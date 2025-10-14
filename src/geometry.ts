import { round } from "@akb2/math";
import { anyToFloat } from "@akb2/types-tools";
import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
import { TriangleGeometryParameters } from "./models";

export class TriangleGeometry extends BufferGeometry {
  parameters: TriangleGeometryParameters;

  override type = "TriangleGeometry";

  /**
   * Convert a Vector3 array to a number array
   */
  private vector3ToNumber(...vectors: Vector3[]): number[] {
    return vectors
      .map(({ x, y, z }) => ([x, y, z]))
      .reduce((o, v) => ([...o, ...v]), []);
  }

  /**
   * @param [sideA] — First side.
   * @param [sideB] — Second side.
   * @param [sideC] — Third side (if not specified, it will be from sideA).
   */
  constructor(sideA: number, sideB: number, sideC: number = sideA, segments: 1 | 2 = 1) {
    super();
    // Angles
    // ? cX: Coordinate X of the angle: top
    // ? a: Coordinates of the angle: bottom left
    // ? b: Coordinates of the angle: bottom right
    // ? c: Coordinates of the angle: top
    const cX = round((Math.pow(sideA, 2) + Math.pow(sideB, 2) - Math.pow(sideC, 2)) / (2 * sideB), 10);
    const cY = round(Math.sqrt((sideC * sideC) - (cX * cX)), 10);
    const a = new Vector3(-sideB / 2, 0, 0);
    const b = new Vector3(sideB / 2, 0, 0);
    const c = new Vector3(cX - (sideB / 2), cY, 0);
    const dirAB = new Vector3().subVectors(b, a).normalize();
    const dirBC = new Vector3().subVectors(c, b).normalize();
    const dirCA = new Vector3().subVectors(a, c).normalize();
    let uvs: number[] = [];
    let position: number[] = [];
    let normal: number[] = [];
    let indexes: number[] = [];
    // Parameters: two segments
    if (segments === 2) {
      const d = new Vector3((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
      const dirAC = new Vector3().subVectors(c, a).normalize();
      const dirDA = new Vector3().subVectors(a, d).normalize();
      const dirDB = new Vector3().subVectors(b, d).normalize();
      const dirCD = new Vector3().subVectors(d, c).normalize();
      // UVs, positions, normals, indexes
      uvs = [0, 0, 0.5, 0, 1, 0, cX / sideB, 1];
      position = this.vector3ToNumber(a, d, b, c);
      normal = this.vector3ToNumber(dirDA, dirAC, dirCD, dirDB, dirBC, dirCD);
      indexes = [1, 0, 3, 1, 2, 3];
    }
    // Parameters: one segment
    else {
      uvs = [0, 0, 1, 0, cX / sideB, 1];
      position = this.vector3ToNumber(a, b, c);
      normal = this.vector3ToNumber(dirAB, dirBC, dirCA);
      indexes = [0, 1, 2];
      segments = 1;
    }
    // Properties
    this.parameters = { sideA, sideB, sideC, segments };
    this.setIndex(indexes);
    this.setAttribute("position", new Float32BufferAttribute(position, 3));
    this.setAttribute("normal", new Float32BufferAttribute(normal, 3));
    this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
    this.setAttribute("uv2", new Float32BufferAttribute(uvs, 2));
  }

  // Generate TriangleGeometry from JSON
  static fromJSON(data: Record<string, number>): TriangleGeometry {
    return new TriangleGeometry(
      anyToFloat(data.sideA, 1),
      anyToFloat(data.sideB, 1),
      anyToFloat(data.sideC, 1),
    );
  }
}
