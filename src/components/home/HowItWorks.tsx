
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Register & Create Profile",
    description: "Sign up and create a business profile specifying your industry, location, and sustainability goals.",
    color: "from-regen-green to-regen-green-light"
  },
  {
    number: 2,
    title: "List Waste Materials",
    description: "Upload details and images of your waste materials, including type, quantity, and availability.",
    color: "from-regen-green-light to-regen-blue"
  },
  {
    number: 3,
    title: "Get Matched",
    description: "Our AI system identifies potential buyers for your materials based on compatibility and proximity.",
    color: "from-regen-blue to-regen-blue-light"
  },
  {
    number: 4,
    title: "Arrange Transportation",
    description: "Coordinate pick-up or delivery using our integrated logistics tools and tracking system.",
    color: "from-regen-blue-light to-regen-accent1"
  },
  {
    number: 5,
    title: "Complete Transaction",
    description: "Finalize the exchange, rate your experience, and track your positive environmental impact.",
    color: "from-regen-accent1 to-regen-accent2"
  }
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              How Re-Genπ Works
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Our simple 5-step process connects waste producers with buyers to create a sustainable circular economy.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start space-x-4 p-4 rounded-lg transition-all duration-200 ${
                  activeStep === index ? "bg-muted scale-105" : "hover:bg-muted/50"
                }`}
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${step.color}`}>
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-500">{step.description}</p>
                </div>
                {activeStep === index && (
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-gradient-to-b from-regen-green to-regen-blue" />
                )}
              </div>
            ))}
          </div>
          
          <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-r from-regen-green/10 to-regen-blue/10 p-1">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Step visualization content - this would be different for each step */}
              <div className="text-center">
                <div className="mb-6 mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-regen-green to-regen-blue">
                  <span className="text-2xl font-bold text-white">{steps[activeStep].number}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">{steps[activeStep].description}</p>
                <Button className="bg-gradient-to-r from-regen-green to-regen-blue hover:opacity-90 transition-opacity">
                  {activeStep === 0 ? "Get Started" : activeStep === steps.length - 1 ? "Start Now" : "Next Step"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
