
export function Stats() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-regen-green-dark/90 to-regen-blue-dark/90 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
              Our Impact
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Making A Difference Together
            </h2>
            <p className="mx-auto max-w-[700px] text-white/80 md:text-xl">
              Through collaboration and innovation, we're creating significant environmental impact.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
            <div className="text-white/80">Tons of Waste Redirected</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">5K+</div>
            <div className="text-white/80">Organizations Connected</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">8K+</div>
            <div className="text-white/80">CO₂ Emissions Reduced</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
            <div className="text-white/80">Countries Active</div>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">15%</div>
            <div className="text-lg font-medium mb-2">Cost Reduction</div>
            <div className="text-white/80">Average savings for businesses on waste management costs</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">30%</div>
            <div className="text-lg font-medium mb-2">Resource Efficiency</div>
            <div className="text-white/80">Improvement in resource utilization through circular practices</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">25%</div>
            <div className="text-lg font-medium mb-2">Carbon Reduction</div>
            <div className="text-white/80">Average carbon footprint reduction for partner organizations</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
