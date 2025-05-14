
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    
    setIsSubmitting(false);
    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-regen-blue-dark to-regen-green-dark text-white py-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-regen-blue/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-regen-green/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h1>
              <p className="mt-6 text-xl text-white/80">
                Have questions about Re-Genπ? We're here to help you connect waste materials with new opportunities.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Get in Touch</h2>
                <p className="text-gray-500 text-lg mb-8">
                  Whether you have questions about how our platform works, need technical support, or want to explore partnership opportunities, our team is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Our Location</h3>
                      <p className="text-gray-500 mt-1">123 Sustainability Street<br />Eco City, EC 12345<br />United States</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Email Us</h3>
                      <p className="text-gray-500 mt-1">info@regenpi.com<br />support@regenpi.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Call Us</h3>
                      <p className="text-gray-500 mt-1">+1 (555) 123-4567<br />Monday-Friday, 9am-5pm PST</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="font-bold mb-4">Connect With Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="bg-muted p-3 rounded-full hover:bg-muted/80">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-3 rounded-full hover:bg-muted/80">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a href="#" className="bg-muted p-3 rounded-full hover:bg-muted/80">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <Card>
                  <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <h3 className="text-2xl font-bold">Send Us a Message</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" name="subject" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" name="message" rows={5} required />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-lg">
                Find quick answers to common questions about our platform.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  question: "How does Re-Genπ match waste materials with buyers?",
                  answer: "Our AI-powered system analyzes various factors including material type, quality, quantity, and location to find optimal matches between waste producers and potential buyers."
                },
                {
                  question: "Is there a cost to list materials on the platform?",
                  answer: "Basic listings are free. Premium features like advanced analytics and priority matching are available on our paid tiers."
                },
                {
                  question: "How do I track the environmental impact of my transactions?",
                  answer: "Each transaction includes detailed impact metrics showing carbon emissions saved, landfill diversion, and other sustainability indicators."
                },
                {
                  question: "Can Re-Genπ help with logistics and transportation?",
                  answer: "Yes, we offer integrated logistics solutions to help coordinate the transportation of materials between parties efficiently and sustainably."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-lg shadow-sm border p-6">
                  <h3 className="font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-500">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="mb-4 text-gray-500">
                Don't see your question? Contact our support team.
              </p>
              <Button>View All FAQs</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
