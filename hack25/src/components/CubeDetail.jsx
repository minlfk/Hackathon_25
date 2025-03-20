import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CubeFace({ position, rotation, color, hoverColor, label, route, navigate }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position} rotation={rotation}>
      {/* Main face - not clickable */}
      <mesh>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial 
          color={color}
          metalness={0.1}
          roughness={0.5}
          side={2}
        />
      </mesh>

      {/* Clickable button */}
      <mesh
        position={[0, 0, 0.01]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => navigate(route)}
      >
        <circleGeometry args={[0.2]} />
        <meshStandardMaterial 
          color={hovered ? hoverColor : 'white'}
          metalness={0.1}
          roughness={0.3}
          side={2}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.4, 0.01]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function DetailedCube({ selectedPair }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  // Define cube colors for different pairs
  const getCubeColor = (outer, inner) => {
    if (outer === 'technology' && inner === 'resources') {
      return "#6d28d9"; // Purple for Technology + Resources
    } else if (outer === 'society') {
      return "#2563eb"; // Blue for Society combinations
    } else if (outer === 'nature') {
      return "#059669"; // Green for Nature combinations
    } else if (outer === 'economy') {
      return "#dc2626"; // Red for Economy combinations
    }
    return "#8b5cf6"; // Default purple
  };

  // Define face configurations based on selected pair
  const getFaceConfig = (outer, inner) => {
    if (outer === 'technology' && inner === 'resources') {
      return [
        { position: [0, 0, 0.61], rotation: [0, 0, 0], label: "A", route: "/tech-resources/a" },
        { position: [0, 0, -0.61], rotation: [0, Math.PI, 0], label: "B", route: "/tech-resources/b" },
        { position: [0.61, 0, 0], rotation: [0, Math.PI / 2, 0], label: "C", route: "/tech-resources/c" },
        { position: [-0.61, 0, 0], rotation: [0, -Math.PI / 2, 0], label: "D", route: "/tech-resources/d" },
        { position: [0, 0.61, 0], rotation: [-Math.PI / 2, 0, 0], label: "E", route: "/tech-resources/e" },
        { position: [0, -0.61, 0], rotation: [Math.PI / 2, 0, 0], label: "F", route: "/tech-resources/f" }
      ];
    }

    // Default face configuration for other combinations
    return [
      { position: [0, 0, 0.61], rotation: [0, 0, 0], label: "Front", route: "/front" },
      { position: [0, 0, -0.61], rotation: [0, Math.PI, 0], label: "Back", route: "/back" },
      { position: [0.61, 0, 0], rotation: [0, Math.PI / 2, 0], label: "Right", route: "/right" },
      { position: [-0.61, 0, 0], rotation: [0, -Math.PI / 2, 0], label: "Left", route: "/left" },
      { position: [0, 0.61, 0], rotation: [-Math.PI / 2, 0, 0], label: "Top", route: "/top" },
      { position: [0, -0.61, 0], rotation: [Math.PI / 2, 0, 0], label: "Bottom", route: "/bottom" }
    ];
  };

  const cubeColor = getCubeColor(selectedPair.outer, selectedPair.inner);
  const faces = getFaceConfig(selectedPair.outer, selectedPair.inner);

  return (
    <mesh scale={3}>
      {faces.map((face, index) => (
        <CubeFace
          key={index}
          {...face}
          color={cubeColor}
          hoverColor={cubeColor === "#6d28d9" ? "#7c3aed" : cubeColor} // Lighter shade for hover
          navigate={navigate}
        />
      ))}
    </mesh>
  );
}

const CubeDetail = ({ onClose, selectedPair }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Semi-transparent background */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-10"
        onClick={onClose}
      />
      
      {/* Cube container */}
      <div className="relative w-[80vw] h-[80vh] bg-transparent rounded-lg">
        {/* Instruction text */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white text-lg font-medium bg-purple-900 bg-opacity-50 px-4 py-2 rounded-full shadow-lg">
          Turn the cube around
        </div>

        <button
          className="absolute top-4 right-4 text-white text-xl bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
          onClick={onClose}
        >
          ×
        </button>
        
        <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <DetailedCube selectedPair={selectedPair} />
          <OrbitControls 
            enableZoom={true}
            enablePan={false}
            minDistance={6}
            maxDistance={20}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default CubeDetail; 