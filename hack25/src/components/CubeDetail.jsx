import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, useTexture } from '@react-three/drei';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zukunftLogo from '../assets/zukunft-fabrik-logo.png';

function CubeFace({ position, rotation, color, hoverColor, label, route, navigate, buttonImage }) {
  const [hovered, setHovered] = useState(false);

  // Load the button texture - using the imported image
  const texture = useTexture(buttonImage || zukunftLogo); // Using zukunftLogo as default for now
  // Random, was annoying my editor..
  const hover = () => hoverColor;
  hover();

  return (
    <group position={position} rotation={rotation}>
      {/* Main face - not clickable */}
      <mesh>
        <planeGeometry args={[1.2, 1.2]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.0}
          roughness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.2}
          reflectivity={0.5}
          side={2}
        />
      </mesh>

      {/* Clickable button with image texture */}
      <mesh
        position={[0, 0, 0.01]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => navigate(route)}
      >
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial
          map={texture}
          transparent={true}
          opacity={hovered ? 0.8 : 1}
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
  //const [hovered, setHovered] = useState(false);

  // Define cube colors for different pairs
  const getCubeColor = (outer, inner) => {
    if (outer === 'technology' && inner === 'resources') {
      return "#8b5cf6"; // Brighter purple (violet-500) for Technology + Resources
    } else if (outer === 'society') {
      return "#3b82f6"; // Brighter blue (blue-500) for Society combinations
    } else if (outer === 'nature') {
      return "#10b981"; // Brighter green (emerald-500) for Nature combinations
    } else if (outer === 'economy') {
      return "#ef4444"; // Brighter red (red-500) for Economy combinations
    }
    return "#a855f7"; // Brighter default purple (purple-500)
  };

  // Define face configurations based on selected pair
  const getFaceConfig = (outer, inner) => {

    return [
      { position: [0, 0, 0.61], rotation: [0, 0, 0], label: "Front", route: `/${outer}/${inner}/front`, buttonImage: zukunftLogo },
      { position: [0, 0, -0.61], rotation: [0, Math.PI, 0], label: "Back", route: `/${outer}/${inner}/back`, buttonImage: zukunftLogo },
      { position: [0.61, 0, 0], rotation: [0, Math.PI / 2, 0], label: "Right", route: `/${outer}/${inner}/right`, buttonImage: zukunftLogo },
      { position: [-0.61, 0, 0], rotation: [0, -Math.PI / 2, 0], label: "Left", route: `/${outer}/${inner}/left`, buttonImage: zukunftLogo },
      { position: [0, 0.61, 0], rotation: [-Math.PI / 2, 0, 0], label: "Top", route: `/${outer}/${inner}/top`, buttonImage: zukunftLogo },
      { position: [0, -0.61, 0], rotation: [Math.PI / 2, 0, 0], label: "Bottom", route: `/${outer}/${inner}/bottom`, buttonImage: zukunftLogo }
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
          hoverColor={cubeColor === "#8b5cf6" ? "#c084fc" : cubeColor} // Brighter hover color
          navigate={navigate}
        />
      ))}
    </mesh>
  );
}

const SelectionVisualization = ({ selectedPair }) => {
  const outerCircleSize = "90px"; // Halved from 120px
  const innerCircleSize = "70px"; // 75% of outer circle size

  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
      {/* Outer circle with label */}
      <div className="flex flex-col items-center">
        <div
          className="rounded-full flex items-center justify-center mb-2"
          style={{
            width: outerCircleSize,
            height: outerCircleSize,
            backgroundColor: '#6cb8cd',
            // opacity: 0.8
          }}
        >
          <span className="text-white font-bold text-sm">
            {selectedPair.outer ? selectedPair.outer.charAt(0).toUpperCase() + selectedPair.outer.slice(1) : ''}
          </span>
        </div>
      </div>

      {/* Inner circle with label */}
      <div className="flex flex-col items-center">
        <div
          className="rounded-full flex items-center justify-center mb-2"
          style={{
            width: innerCircleSize,
            height: innerCircleSize,
            backgroundColor: '#b3dbe6',
            // opacity: 0.8
          }}
        >
          <span className="text-white font-bold text-xs">
            {selectedPair.inner ? selectedPair.inner.charAt(0).toUpperCase() + selectedPair.inner.slice(1) : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

const CubeDetail = ({ onClose, selectedPair }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100">
      <div className="relative w-[95vw] h-[95vh] bg-gray-100 rounded-lg">
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

        {/* Cube container - moved slightly to the left */}
        <div className="absolute left-0 w-3/4 h-full">
          <Canvas camera={{ position: [8, 8, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 3]} intensity={0.6} />
            <pointLight position={[-5, -5, -5]} intensity={0.3} />
            <DetailedCube selectedPair={selectedPair} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={6}
              maxDistance={20}
            />
          </Canvas>
        </div>

        {/* Selection Visualization */}
        <SelectionVisualization selectedPair={selectedPair} />
      </div>
    </div>
  );
};

export default CubeDetail; 