"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function Star({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.35;
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.25;
      ref.current.position.y = Math.sin(t * 0.6) * 0.15;
    }
    if (wire.current) {
      wire.current.rotation.y = -t * 0.22;
    }
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#f4793a"
          roughness={0.3}
          metalness={0.35}
          flatShading
        />
      </mesh>
      <mesh ref={wire} scale={1.45}>
        <icosahedronGeometry args={[1.1, 0]} />
        <meshBasicMaterial color="#000000" wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/**
 * Small decorative WebGL moment for the CTA sheet — a faceted star
 * spinning inside an ink wireframe. Static star fallback under
 * reduced motion or without WebGL.
 */
export default function StarSpin() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      className="relative mx-auto aspect-square w-[min(46vw,300px)]"
      aria-hidden="true"
    >
      {reduced ? (
        <div className="flex h-full w-full items-center justify-center text-[120px] text-[var(--c-orange)]">
          ★
        </div>
      ) : (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 3.6], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[3, 4, 5]} intensity={1.6} />
          <Star reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}
