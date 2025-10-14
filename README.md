# @akb2/three-triangle-geometry

A simple **custom geometry** for [three.js](https://threejs.org) — generates a triangle based on the lengths of its sides. Supports one or two segments, and includes UV, normal, and position attributes.

## Installation

```bash
npm install @akb2/three-triangle-geometry
```

## Usage

```ts
import { TriangleGeometry } from "@akb2/three-triangle-geometry";
import { Mesh, MeshStandardMaterial, Scene } from "three";

const scene = new Scene();
const geometry = new TriangleGeometry(5, 6, 4);
const material = new MeshStandardMaterial({ color: 0xffaa00, wireframe: true });
const mesh = new Mesh(geometry, material);

scene.add(mesh);
```

## Constructor

```ts
new TriangleGeometry(sideA: number, sideB: number, sideC?: number, segments?: number);
```

| Parameter   | Type                  | Description                                                                           |
|-------------|-----------------------|---------------------------------------------------------------------------------------|
| `sideA`     | `number`              | Left cathetus.                                                                        |
| `sideB`     | `number`              | Base of the triangle.                                                                 |
| `sideC`     | `number` (optional)   | Right cathetus. If not provided, it will be equal to sideA.                           |
| `segments`  | `1` or `2` (optional) | Number of horizontal segments. Default is `1`.                                        |

## Example

```ts
// One segment
const tri1 = new TriangleGeometry(5, 6);

// Two segments
const tri2 = new TriangleGeometry(5, 6, undefined, 2);
```

## Static methods

```ts
TriangleGeometry.fromJSON(data: Record<string, number>): TriangleGeometry;
```

### Creates geometry from JSON data

```ts
const data = { sideA: 5, sideB: 6, sideC: 4 };
const triangle = TriangleGeometry.fromJSON(data);
```

## Interface

```ts
export interface TriangleGeometryParameters {
  sideA: number;
  sideB: number;
  sideC: number;
  segments: number;
}
```

## Internal logic

* Sets missing sideC if not provided as a sideA value:
* Calculates vertex coordinates (a, b, c) using trigonometric formulas.
* Automatically builds:
  * positions
  * normals
  * UVs (uv and uv2)
* Stores parameters in:

  ```ts
  geometry.parameters = { sideA, sideB, sideC, segments };
  ```

## Dependencies

* [Three.js](https://www.npmjs.com/package/three)
* [Three.js Types (@types/three)](https://www.npmjs.com/package/@types/three)
* [AKB2 Math (@akb2/math)](https://www.npmjs.com/package/@akb2/math)
* [AKB2 Types Tools (@akb2/types-tools)](https://www.npmjs.com/package/@akb2/types-tools)

## License

MIT © [Andrei Kobelev (@akb2)](https://github.com/akb2)

[Github repository](https://github.com/akb2/three-triangle-geometry)
