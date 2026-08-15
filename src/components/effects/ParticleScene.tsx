import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";

export default function ParticleScene() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 55,
        }}
        dpr={[1, 2]}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}