import { useEffect, useState } from 'react';
import { Heart, Star, Home, Baby, Smile, MapPin } from 'lucide-react';

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    type: 'shape' | 'icon';
    component?: any;
    color: string;
    size: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
  }>>([]);

  const icons = [Heart, Star, Home, Baby, Smile, MapPin];
  const colors = [
    'text-primary', 'text-secondary', 'text-accent', 
    'text-rose-400', 'text-blue-400', 'text-green-400',
    'text-purple-400', 'text-yellow-400', 'text-pink-400'
  ];

  const shapeColors = [
    'bg-primary/20', 'bg-secondary/20', 'bg-accent/20',
    'bg-rose-400/20', 'bg-blue-400/20', 'bg-green-400/20',
    'bg-purple-400/20', 'bg-yellow-400/20', 'bg-pink-400/20'
  ];

  useEffect(() => {
    const createElements = () => {
      const newElements = [];
      
      // Create floating icons
      for (let i = 0; i < 12; i++) {
        newElements.push({
          id: i,
          type: 'icon' as const,
          component: icons[Math.floor(Math.random() * icons.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 16 + 16, // 16-32px
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2
        });
      }

      // Create floating shapes
      for (let i = 12; i < 20; i++) {
        newElements.push({
          id: i,
          type: 'shape' as const,
          color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
          size: Math.random() * 60 + 20, // 20-80px
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 1
        });
      }

      setElements(newElements);
    };

    createElements();

    const interval = setInterval(() => {
      setElements(prevElements => 
        prevElements.map(element => {
          let newX = element.x + element.speedX;
          let newY = element.y + element.speedY;
          let newSpeedX = element.speedX;
          let newSpeedY = element.speedY;

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth - element.size) {
            newSpeedX = -element.speedX;
            newX = Math.max(0, Math.min(window.innerWidth - element.size, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - element.size) {
            newSpeedY = -element.speedY;
            newY = Math.max(0, Math.min(window.innerHeight - element.size, newY));
          }

          return {
            ...element,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: element.rotation + element.rotationSpeed
          };
        })
      );
    }, 16); // ~60fps

    const handleResize = () => {
      createElements();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => {
        const IconComponent = element.component;
        
        return (
          <div
            key={element.id}
            className="absolute transition-opacity duration-1000 opacity-60 hover:opacity-100"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              transform: `rotate(${element.rotation}deg)`,
              width: `${element.size}px`,
              height: `${element.size}px`,
            }}
          >
            {element.type === 'icon' ? (
              <IconComponent 
                className={`w-full h-full ${element.color} drop-shadow-sm animate-pulse`}
                style={{
                  animationDuration: `${2 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ) : (
              <div 
                className={`w-full h-full rounded-full ${element.color} shadow-lg animate-pulse`}
                style={{
                  animationDuration: `${3 + Math.random() * 2}s`,
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            )}
          </div>
        );
      })}
      
      {/* Additional decorative particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full ${colors[i % colors.length].replace('text-', 'bg-')} animate-ping`}
            style={{
              left: `${20 + (i * 12)}%`,
              top: `${10 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${15 + (i * 18)}%`,
              top: `${70 + (i * 5)}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          >
            <Heart className="w-4 h-4 text-primary/30 fill-current" />
          </div>
        ))}
      </div>

      {/* Background gradient bubbles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-40 w-28 h-28 bg-gradient-to-br from-rose-400/5 to-blue-400/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }} />
    </div>
  );
};

export default FloatingElements;