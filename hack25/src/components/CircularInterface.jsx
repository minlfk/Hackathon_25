import SpinningCube from './SpinningCube';
import CubeDetail from './CubeDetail';
import { useState } from 'react';

const CircularInterface = () => {
  const [showCubeDetail, setShowCubeDetail] = useState(false);
  const [selectedOuter, setSelectedOuter] = useState(null);
  const [selectedInner, setSelectedInner] = useState(null);
  
  // Use consistent measurements
  const containerSize = 400;
  const center = containerSize / 2;
  const radiusOuter = 170;
  const radiusInner = 110;

  // Define button data
  const outerButtons = [
    { label: "Society", value: "society" },
    { label: "Nature", value: "nature" },
    { label: "Technology", value: "technology" },
    { label: "Economy", value: "economy" }
  ];

  const innerButtons = [
    { label: "Resources", value: "resources" },
    { label: "Norms & Values", value: "norms" },
    { label: "Concerns & Interests", value: "concerns" },
  ];

  // Calculate positions for buttons
  const buttonPositionsOuter = Array.from({ length: 4 }).map((_, index) => {
    const angle = (index * Math.PI * 2) / 10  - Math.PI/1.25;
    return {
      left: `${Math.cos(angle) * radiusOuter + center}px`,
      top: `${Math.sin(angle) * radiusOuter + center}px`,
    };
  });

  const buttonPositionsInner = Array.from({ length: 3 }).map((_, index) => {
    const angle = (index * Math.PI * 2) / 8  - Math.PI/1.35;
    return {
      left: `${Math.cos(angle) * radiusInner + center}px`,
      top: `${Math.sin(angle) * radiusInner + center}px`,
    };
  });

  const handleButtonClick = (type, value) => {
    if (type === 'outer') {
      setSelectedOuter(value);
    } else {
      setSelectedInner(value);
    }

    // Show cube when both buttons are selected
    if ((type === 'outer' && selectedInner) || (type === 'inner' && selectedOuter)) {
      setShowCubeDetail(true);
    }
  };

  // Updated CircleButton component
  const CircleButton = ({ position, data, type, isSelected }) => (
    <div
      style={{
        ...position,
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <button
        style={{
          width: '10px',
          height: '10px',
          backgroundColor: isSelected ? '#4ade80' : 'white', // Green when selected
          borderRadius: '50%',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.2s ease',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '4px',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }}
        onClick={() => handleButtonClick(type, data.value)}
        aria-label={data.label}
      />
      <span style={{
        color: 'white',
        fontSize: '10px',
        fontWeight: '500',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        pointerEvents: 'none'
      }}>
        {data.label}
      </span>
    </div>
  );

  return (
    <>
      <div className="relative w-[400px] h-[400px] mx-auto">
        <div className="absolute inset-0 rounded-full bg-teal-400">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/7 h-5/7 rounded-full bg-teal-600">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/7 h-4/7">
              <SpinningCube onCubeClick={() => setShowCubeDetail(true)} />
            </div>
          </div>

          {/* Outer buttons */}
          {buttonPositionsOuter.map((position, index) => (
            <CircleButton 
              key={`outer-${index}`} 
              position={position} 
              data={outerButtons[index]}
              type="outer"
              isSelected={outerButtons[index].value === selectedOuter}
            />
          ))}

          {/* Inner buttons */}
          {buttonPositionsInner.map((position, index) => (
            <CircleButton 
              key={`inner-${index}`} 
              position={position} 
              data={innerButtons[index]}
              type="inner"
              isSelected={innerButtons[index].value === selectedInner}
            />
          ))}
        </div>
      </div>

      {showCubeDetail && (
        <CubeDetail 
          onClose={() => setShowCubeDetail(false)}
          selectedPair={{ outer: selectedOuter, inner: selectedInner }}
        />
      )}
    </>
  );
};

export default CircularInterface; 