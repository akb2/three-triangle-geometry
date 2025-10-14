import { Meta, StoryObj } from "@storybook/preact";
import "preact";
import { useLayoutEffect, useRef } from "preact/hooks";
import { Color, DoubleSide, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { TriangleGeometry } from "./geometry";

const rendererWidth = 600;
const rendererHeight = 400;

const meta: Meta = {
  title: "Three/TriangleGeometry",
  tags: ["autodocs"],
  parameters: {
    controls: {
      expanded: true
    }
  },
  argTypes: {
    sideA: {
      control: "number",
      description: "Length of side A (Left)",
      min: 10,
      max: 20,
      step: 1,
    },
    sideB: {
      control: "number",
      description: "Length of side B (Base)",
      min: 10,
      max: 20,
      step: 1,
    },
    sideC: {
      control: "number",
      description: "Length of side C (Right)",
      min: 10,
      max: 20,
      step: 1,
    },
    segments: {
      control: "number",
      description: "Number of segments",
      min: 1,
      max: 2,
      step: 1,
      defaultValue: 1
    },
  },
  args: {
    sideA: 12,
    sideB: 10,
    sideC: 12,
    segments: 2,
  }
};

export default meta;

export const Default: StoryObj = {
  render: args => {
    const hostRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const host = hostRef.current;

      if (!host) {
        return;
      }

      const renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      const camera = new PerspectiveCamera(60, 1, 0.1, 100);
      const control = new OrbitControls(camera, renderer.domElement);
      const scene = new Scene();
      const geometry = new TriangleGeometry(
        args.sideA / 10,
        args.sideB / 10,
        args.sideC / 10,
        args.segments
      );
      const material = new MeshStandardMaterial({ color: 0xff0000, side: DoubleSide, flatShading: true, wireframe: true });
      const mesh = new Mesh(geometry, material);

      host.appendChild(renderer.domElement);
      host.style.width = "calc(100svw - 2rem)";
      host.style.height = "calc(100svh - 2rem)";
      camera.position.set(0, 0, 3);
      scene.background = new Color(0xffffff);
      scene.add(mesh);

      // Рендер
      const renderLoop = () => {
        requestAnimationFrame(renderLoop);
        control.update();
        renderer.render(scene, camera);
      };

      // Изменение размера
      const onResize = () => {
        const { width, height } = host.getBoundingClientRect();
        renderer.setSize(width, height, false);
        renderer.setPixelRatio(window.devicePixelRatio ?? 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };
      const resizeObserver = new ResizeObserver(onResize);

      onResize();
      renderLoop();

      return () => {
        host.removeChild(renderer.domElement);
        resizeObserver.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });

    return <div ref={hostRef} />;
  },
};