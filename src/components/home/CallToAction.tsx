
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-regen-green via-regen-blue to-regen-accent1">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center justify-center text-center space-y-8 text-white">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
                  Join the Circular Economy Revolution
                </h2>
                <p className="mx-auto max-w-[700px] text-white/90 md:text-xl lg:text-2xl">
                  Start transforming waste into resources today and become part of the sustainable future.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/input">
                  <Button size="lg" className="bg-white text-regen-green hover:bg-white/90 transition-colors">
                    List Your Materials
                  </Button>
                </Link>
                <Link to="/matchmaking">
                  <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 transition-colors">
                    Find Materials
                  </Button>
                </Link>
              </div>
              
              <div className="pt-4 text-sm text-white/80">
                Join 5,000+ organizations already making a difference
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
