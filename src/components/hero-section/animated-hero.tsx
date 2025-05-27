"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/hero-section/animated-hero-button";
import Background from "./background";

function Hero() {
  // State management for animated text
  const [titleNumber, setTitleNumber] = useState(0);
  
  // List of content types that will be animated
  const titles = useMemo(
    () => [
      "Shopify",
      "Website",
      "PDF",
      "Excel",
      "Powerpoint",
      "Word",
      "Image",
      "Tiktok",
      "YouTube",
      "Audio",
      "Video",
    ],
    []
  );

  // Animation timing control - cycles through titles every 2 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    // Main hero container
    <div className="w-full">
      <Background />
      <div className="container mx-auto">
        {/* Hero content wrapper with padding and flex layout */}
        <div className="flex gap-8 py-10 items-center justify-center flex-col">
          {/* Top CTA Button Section */}
          <div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-4"
              asChild
            >
              <a 
                href="https://docs.wetrocloud.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                🎉 Check out our API documentation <MoveRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          {/* Main Content Section */}
          <div className="flex gap-4 flex-col">
            {/* Hero Title with Animated Text */}
            <h1 className="text-5xl md:text-6xl max-w-2xl tracking-tighter text-center font-regular">
              {/* Static part of the title */}
              <span className="text-spektr-cyan-50">
                Scrape Clean Data from
              </span>
              {/* Animated words container */}
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {/* Animated words mapping */}
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-blue-500"
                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 45, 
                      damping: 10,
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 }
                    }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                            scale: 0.8,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Hero Description Text */}
            <p className="text-lg md:text-xl px-6 leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Power your AI applications with clean structured data from all types of resources. Web, File, Image, Audio, Video & Youtube.
            </p>
          </div>

          {/* Bottom CTA Buttons Section (Currently Commented Out) */}
          {/* <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export { Hero };
