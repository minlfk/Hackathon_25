import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';

function Cube() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.00;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 3.6 : 3}
      onClick={() => setClicked(!clicked)}
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

const SpinningCube = () => {
  return (
    // <Canvas camera={{ position: [0, 0, -10], fov: 90 }}>
    <Canvas camera={{ position: [7, 5, -2], fov: 90 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 3]} intensity={0.8} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      <Cube />
    </Canvas>
  );
};

export default SpinningCube; 