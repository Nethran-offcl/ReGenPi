
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-regen-green-dark to-regen-blue-dark text-white py-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-regen-green/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-regen-blue/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Re-Genπ</h1>
              <p className="mt-6 text-xl text-white/80">
                We're building a sustainable future by transforming waste into resources through the power of AI and circular economy principles.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter mb-6">Our Mission</h2>
                <p className="text-gray-500 text-lg mb-6">
                  Re-Genπ was founded with a clear mission: to accelerate the transition to a circular economy by connecting waste generators with resource seekers using advanced technology.
                </p>
                <p className="text-gray-500 text-lg">
                  We believe that waste is simply a resource in the wrong place. By facilitating the reuse, recycling, and upcycling of materials, we're helping organizations reduce their environmental footprint while discovering new value in what would otherwise be discarded.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden bg-gradient-to-r from-regen-green/10 to-regen-blue/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-regen-green to-regen-blue flex items-center justify-center text-white text-3xl mx-auto mb-6">
                    🌱
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Regenerative Design</h3>
                  <p className="text-gray-500">
                    Our platform is built on principles of regenerative design, creating systems that renew and revitalize themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-regen-green/20 flex items-center justify-center text-regen-green text-2xl mb-4">
                  ♻️
                </div>
                <h3 className="text-xl font-bold mb-2">Sustainability</h3>
                <p className="text-gray-500">
                  We are committed to environmental stewardship and creating systems that support the health of our planet.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-regen-blue/20 flex items-center justify-center text-regen-blue text-2xl mb-4">
                  🤝
                </div>
                <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                <p className="text-gray-500">
                  We believe in the power of partnership and working together to solve complex environmental challenges.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-regen-accent1/20 flex items-center justify-center text-regen-accent1 text-2xl mb-4">
                  🔬
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-500">
                  We harness the latest technologies to create more efficient and effective circular economy solutions.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-regen-accent2/20 flex items-center justify-center text-regen-accent2 text-2xl mb-4">
                  📊
                </div>
                <h3 className="text-xl font-bold mb-2">Transparency</h3>
                <p className="text-gray-500">
                  We believe in open, honest communication and providing clear insights into the impact of our work.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-regen-green/20 flex items-center justify-center text-regen-green text-2xl mb-4">
                  🌍
                </div>
                <h3 className="text-xl font-bold mb-2">Global Impact</h3>
                <p className="text-gray-500">
                  We think globally and act locally, creating solutions that can scale across regions and industries.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm border">
                <div className="w-12 h-12 rounded-full bg-regen-blue/20 flex items-center justify-center text-regen-blue text-2xl mb-4">
                  💡
                </div>
                <h3 className="text-xl font-bold mb-2">Education</h3>
                <p className="text-gray-500">
                  We are dedicated to spreading knowledge about circular economy practices and inspiring change.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Team</h2>
              <p className="text-gray-500 text-lg">
                Meet the passionate individuals behind Re-Genπ who are dedicated to creating a more sustainable future.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-40 h-40 rounded-full bg-muted mx-auto mb-4"></div>
                  <h3 className="font-bold">Team Member {i}</h3>
                  <p className="text-gray-500 text-sm">Position</p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-xl font-bold mb-4">Join Our Team</h3>
              <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                We're always looking for talented individuals who are passionate about sustainability and technology. Check out our open positions.
              </p>
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium">
                View Open Positions
              </button>
            </div>
          </div>
        </section>
        
        {/* Partners Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter mb-4">Our Partners</h2>
              <p className="text-gray-500 text-lg">
                We collaborate with leading organizations across industries to advance circular economy solutions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-24 bg-card rounded-lg flex items-center justify-center border">
                  <div className="text-2xl text-muted-foreground">Partner {i}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="bg-transparent border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-md font-medium">
                Become a Partner
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
