
import { 
  Recycle, 
  Search, 
  MapPin, 
  Users, 
  BarChart4
} from "lucide-react";

const features = [
  {
    icon: <Recycle className="h-10 w-10" />,
    title: "Waste to Resource Transformation",
    description: "Turn your waste materials into valuable resources for other businesses, reducing disposal costs and environmental impact."
  },
  {
    icon: <Search className="h-10 w-10" />,
    title: "AI-Powered Matchmaking",
    description: "Our intelligent system connects you with the perfect partners for your waste materials, ensuring optimal reuse and recycling."
  },
  {
    icon: <MapPin className="h-10 w-10" />,
    title: "Location-Based Tracking",
    description: "Track the movement of materials in real-time and optimize logistics for reduced transportation emissions."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Community Collaboration",
    description: "Join a growing network of environmentally conscious organizations committed to sustainable practices."
  },
  {
    icon: <BarChart4 className="h-10 w-10" />,
    title: "Impact Analytics",
    description: "Measure and report on your environmental impact with detailed sustainability metrics and performance indicators."
  }
];

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Circular Economy Solutions
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Our platform offers comprehensive tools to transform waste into resources, creating a sustainable economy for all.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary transition-colors"
            >
              <div className="mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-regen-green to-regen-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
