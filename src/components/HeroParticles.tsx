import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSwarm = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const particleCount = 6000;
  
  // Generate random positions and colors for particles
  const [positions, colors, basePositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const base = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // 3D Infinity Symbol (Lemniscate + Mobius twist)
      const t = Math.random() * Math.PI * 2;
      const scale = 7;
      const divisor = 1 + Math.sin(t) * Math.sin(t);
      
      const tx = (scale * Math.cos(t)) / divisor;
      const ty = (scale * Math.sin(t) * Math.cos(t)) / divisor;
      const tz = Math.sin(t * 2) * 2; // 3D depth twist

      // Add volume / fuzzy scatter around the core line
      const scatter = Math.random() * 1.2; // Volume thickness
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = tx + scatter * Math.sin(phi) * Math.cos(theta);
      const y = ty + scatter * Math.sin(phi) * Math.sin(theta);
      const z = tz + scatter * Math.cos(phi);
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;
      
      // Mix of gold/yellow colors matching agency theme
      const color = new THREE.Color();
      if (Math.random() > 0.5) {
        color.setHSL(0.12, 0.8, 0.5 + Math.random() * 0.3); // Gold/Yellow
      } else {
        color.setHSL(0.0, 0.0, 0.3 + Math.random() * 0.7); // White/Gray
      }
      
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    
    return [pos, col, base];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Slow rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Map global mouse coordinates to 3D space
    const targetX = (mousePos.current.x * viewport.width) / 2;
    const targetY = (mousePos.current.y * viewport.height) / 2;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Current positions
      const px = positionsArray[i3];
      const py = positionsArray[i3 + 1];
      const pz = positionsArray[i3 + 2];
      
      // Base positions (where they want to return)
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];
      
      // Calculate world position of this particle after rotation
      const vec = new THREE.Vector3(bx, by, bz);
      vec.applyEuler(pointsRef.current.rotation);
      
      // Distance from mouse to particle
      const dx = targetX - vec.x;
      const dy = targetY - vec.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Decreased repulsion range and force by ~20%
      const force = Math.max(0, 6 - dist); 
      
      if (force > 0) {
        // Push away from mouse less aggressively
        positionsArray[i3]     += (-dx / dist) * force * 0.16;
        positionsArray[i3 + 1] += (-dy / dist) * force * 0.16;
      } else {
        // Return to base position softly
        positionsArray[i3]     += (bx - px) * 0.05;
        positionsArray[i3 + 1] += (by - py) * 0.05;
        positionsArray[i3 + 2] += (bz - pz) * 0.05;
      }
      
      // Add subtle wave motion
      positionsArray[i3 + 1] += Math.sin(state.clock.elapsedTime * 2 + px) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
