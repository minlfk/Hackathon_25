import SpinningCube from './SpinningCube';

const CircularInterface = () => {
  // Calculate positions for 8 buttons in a circle
  const buttonPositions = Array.from({ length: 8 }).map((_, index) => {
    const angle = (index * Math.PI * 2) / 8;
    const radius = 150; // Adjust this value to change circle size
    return {
      left: `${Math.cos(angle) * radius + 150}px`,
      top: `${Math.sin(angle) * radius + 150}px`,
    };
  });

  return (
    <div className="relative w-[300px] h-[300px] mx-auto">
      {/* Outer circle */}
      <div className="absolute inset-0 rounded-full bg-teal-400">
        {/* Inner circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-teal-600">
          {/* Cube container */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2">
            <SpinningCube />
          </div>
        </div>

        {/* Circular buttons */}
        {buttonPositions.map((position, index) => (
          <button
            key={index}
            className="absolute w-8 h-8 bg-white rounded-full hover:bg-gray-100 transition-colors transform -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            style={position}
            onClick={() => console.log(`Button ${index + 1} clicked`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CircularInterface; 