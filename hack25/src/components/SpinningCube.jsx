import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react';

function Cube({ onCubeClick, selectedPair }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.00;
      meshRef.current.rotation.y += 0.01;
    }
  });

  // Define cube colors for different pairs with brighter shades
  const getCubeColor = (outer, inner) => {
    if (outer === 'technology' && inner === 'resources') {
      return "#8b5cf6"; // Brighter purple (violet-500) for Technology + Resources
    } else if (outer === 'technology' && inner === 'norms') {
      return "#e05ffa"; // Brighter blue (blue-500) for Society combinations
    } else if (outer === 'technology' && inner === 'concerns') {
      return "#d9afff"; // Brighter blue (blue-500) for Society combinations
    } 
    
    else if (outer === 'society' && inner === 'resources') {
        return "#5db1ff"; // Brighter blue (blue-500) for Society combinations
    } else if (outer === 'society' && inner === 'norms') {
      return "#3b82f6"; // Brighter blue (blue-500) for Society combinations
    } else if (outer === 'society' && inner === 'concerns') {
      return "#0029ff"; // Brighter blue (blue-500) for Society combinations
    } 
    
    else if (outer === 'nature' && inner === 'resources') {
      return "#b3ffaf"; // Brighter blue (blue-500) for Society combinations
    } else if (outer === 'nature' && inner === 'norms') {
      return "#65ff5d"; // Brighter blue (blue-500) for Society combinations
    } else if (outer === 'nature' && inner === 'concerns') {
      return "#29ab22"; // Brighter blue (blue-500) for Society combinations
    } 
    
    else if (outer === 'economy' && inner === 'resources') {
      return "#ffafaf"; // Brighter red (red-500) for Economy combinations
    } else if (outer === 'economy' && inner === 'norms') {
      return "#ef4444"; // Brighter red (red-500) for Economy combinations
    } else if (outer === 'economy' && inner === 'concerns') {
      return "#ef4444"; // Brighter red (red-500) for Economy combinations
    }
  };

  const cubeColor = selectedPair.outer && selectedPair.inner 
    ? getCubeColor(selectedPair.outer, selectedPair.inner)
    : "#61e0f6"; // Even lighter purple (violet-200) when no selection

  return (
    <mesh
      ref={meshRef}
      scale={3}
      onClick={onCubeClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      
      <meshPhysicalMaterial 
        color={hovered ? "#c084fc" : cubeColor}
        metalness={0.0}
        roughness={0.8}
        clearcoat={1.0}
        clearcoatRoughness={0.2}
        reflectivity={0.5}
      />

    </mesh>
  );
}

const SpinningCube = ({ onCubeClick, selectedPair }) => {
  return (
    <Canvas camera={{ position: [7, 5, -2], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 3]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} />
      <Cube onCubeClick={onCubeClick} selectedPair={selectedPair} />
    </Canvas>
  );
};

export default SpinningCube; 