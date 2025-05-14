
import { useState } from "react";

const testimonials = [
  {
    quote: "Re-Genπ has transformed our waste management approach. We've reduced disposal costs by 40% while contributing to a greener planet.",
    author: "Sarah Johnson",
    role: "Sustainability Manager",
    company: "GreenTech Industries"
  },
  {
    quote: "The AI matching system is remarkable. We found consistent suppliers for recycled materials that perfectly suit our manufacturing needs.",
    author: "Michael Chen",
    role: "Procurement Director",
    company: "Circular Solutions"
  },
  {
    quote: "The tracking features have simplified our logistics and reporting. We can now accurately measure and share our environmental impact.",
    author: "Ana Rodríguez",
    role: "Operations Lead",
    company: "EcoManufacturing Co."
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Hear from organizations that have successfully implemented circular economy solutions with Re-Genπ.
            </p>
          </div>
        </div>
        
        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-xl bg-muted p-8 md:p-10">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <blockquote>
                    <div className="mb-6">
                      <svg
                        className="h-10 w-10 text-primary"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="text-xl font-medium leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-6">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-500">
                        {testimonial.role}, {testimonial.company}
                      </div>
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === activeIndex ? "bg-primary" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4">
              <button
                onClick={prevTestimonial}
                className="h-10 w-10 rounded-full bg-background shadow flex items-center justify-center text-gray-500 hover:text-gray-700"
                aria-label="Previous testimonial"
              >
                &lt;
              </button>
              <button
                onClick={nextTestimonial}
                className="h-10 w-10 rounded-full bg-background shadow flex items-center justify-center text-gray-500 hover:text-gray-700"
                aria-label="Next testimonial"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
