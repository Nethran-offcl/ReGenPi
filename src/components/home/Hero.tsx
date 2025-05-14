
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CircularAnimation from "../ui/CircularAnimation";

export function Hero() {
  const [animatedText, setAnimatedText] = useState("");
  const textToAnimate = "Re-Genπ";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setAnimatedText((prev) => {
        if (index < textToAnimate.length) {
          index++;
          return textToAnimate.substring(0, index);
        }
        clearInterval(interval);
        return prev;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative overflow-hidden bg-background pt-16 md:pt-24">
      {/* Background gradient elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-regen-green/30 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-regen-blue/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
      
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-regen-green via-regen-blue to-regen-accent1">
                {animatedText}
                <span className="inline-block animate-pulse">|</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Connecting waste producers with material seekers to create a sustainable circular economy.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/input">
                <Button size="lg" className="bg-gradient-to-r from-regen-green to-regen-blue hover:opacity-90 transition-opacity">
                  List Your Materials
                </Button>
              </Link>
              <Link to="/matchmaking">
                <Button size="lg" variant="outline">
                  Find Materials
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-regen-green"></div>
                <span className="text-gray-500">10,000+ Materials Listed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-regen-blue"></div>
                <span className="text-gray-500">5,000+ Organizations</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-regen-accent1"></div>
                <span className="text-gray-500">100+ Countries</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <CircularAnimation 
              className="animate-float"
              radius={120} 
              itemCount={5}
              icons={[
                <div key="1" className="h-12 w-12 rounded-full bg-regen-green flex items-center justify-center text-white shadow-lg">🌱</div>,
                <div key="2" className="h-12 w-12 rounded-full bg-regen-blue flex items-center justify-center text-white shadow-lg">♻️</div>,
                <div key="3" className="h-12 w-12 rounded-full bg-regen-accent1 flex items-center justify-center text-white shadow-lg">🏭</div>,
                <div key="4" className="h-12 w-12 rounded-full bg-regen-accent2 flex items-center justify-center text-white shadow-lg">🚚</div>,
                <div key="5" className="h-12 w-12 rounded-full bg-regen-earth flex items-center justify-center text-white shadow-lg">🌍</div>
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
