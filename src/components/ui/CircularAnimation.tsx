
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface CircularAnimationProps {
  itemCount?: number;
  radius?: number;
  speed?: number;
  className?: string;
  icons?: React.ReactNode[];
}

export const CircularAnimation = ({
  itemCount = 5,
  radius = 150,
  speed = 20,
  className,
  icons
}: CircularAnimationProps) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.2) % 360);
    }, speed);
    
    return () => clearInterval(interval);
  }, [speed]);
  
  // Default circular items if no icons provided
  const defaultItems = Array(itemCount).fill(0).map((_, i) => (
    <div 
      key={i}
      className="h-12 w-12 rounded-full bg-gradient-to-br from-regen-green to-regen-blue flex items-center justify-center text-white shadow-md"
    >
      {i + 1}
    </div>
  ));
  
  const items = icons || defaultItems;
  
  return (
    <div className={cn("circular-motion-container h-[300px] w-[300px] mx-auto", className)}>
      {items.map((item, i) => {
        const angle = rotation + (i * (360 / itemCount));
        const x = radius * Math.cos(angle * (Math.PI / 180));
        const y = radius * Math.sin(angle * (Math.PI / 180));
        const scale = 0.8 + (0.2 * Math.sin(angle * (Math.PI / 180)));
        
        return (
          <div 
            key={i}
            className="circular-motion-item transition-all duration-500 ease-in-out"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`,
              zIndex: Math.round(scale * 10)
            }}
          >
            {item}
          </div>
        );
      })}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-regen-accent1 to-regen-accent2 animate-pulse-slow flex items-center justify-center text-white font-bold">
          Re-Genπ
        </div>
      </div>
    </div>
  );
};

export default CircularAnimation;
