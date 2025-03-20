import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';

function Cube({ onCubeClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.00;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={3}
      onClick={onCubeClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial 
        color={hovered ? '#a78bfa' : '#c4b5fd'}
        metalness={0.1}
        roughness={0.5}
        envMapIntensity={1}
      />
    </mesh>
  );
}

const SpinningCube = ({ onCubeClick }) => {
  return (
    <Canvas camera={{ position: [7, 5, -2], fov: 45 }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 3]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <Cube onCubeClick={onCubeClick} />
    </Canvas>
  );
};

export default SpinningCube; 