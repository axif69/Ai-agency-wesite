"use client";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars, MeshWobbleMaterial, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

function FloatingElements() {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  
  const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const positionY = useTransform(scrollYProgress, [0, 1], [0, -5]);

  useFrame((state) => {
    if (groupRef.current) {
      // Base scroll-controlled rotation + mouse pointer parallax tracking
      const targetRotY = rotationY.get() + state.pointer.x * 0.2;
      const targetPosY = positionY.get() + state.pointer.y * 0.4;
      const targetPosX = state.pointer.x * 0.4;
      
      // Smooth interpolation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.05);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05 + state.pointer.y * 0.1;
    }
  });

  const spheres = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 15
      ] as [number, number, number],
      scale: Math.random() * 0.4 + 0.05,
      speed: Math.random() * 1.5 + 0.5,
      distort: Math.random() * 0.6 + 0.2
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {spheres.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1} floatIntensity={1}>
          <Sphere position={s.position} scale={s.scale}>
            <MeshDistortMaterial
              color={i % 3 === 0 ? "#ffffff" : i % 3 === 1 ? "#666666" : "#111111"}
              attach="material"
              distort={s.distort}
              speed={s.speed}
              roughness={0.05}
              metalness={1}
              transparent
              opacity={0.25}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

function MainBlob() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 2.5, 1.5]);
  const distort = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
      meshRef.current.scale.setScalar(scale.get());
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[1, 128, 128]}>
        <MeshDistortMaterial
          color="#111111"
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={1}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile === null || isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={40} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#444444" />
        
        <FloatingElements />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
    </div>
  );
}
