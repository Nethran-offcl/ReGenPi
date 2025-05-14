
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const materialResults = [
  {
    id: 1,
    title: "Plastic Film Scraps",
    category: "Plastic",
    quantity: "500 kg",
    location: "Seattle, WA",
    distance: "15 miles",
    description: "Clean LDPE plastic film scraps from packaging operations.",
    postedDate: "3 days ago",
    match: 98
  },
  {
    id: 2,
    title: "Mixed Paper Waste",
    category: "Paper",
    quantity: "2 tons",
    location: "Portland, OR",
    distance: "120 miles",
    description: "Mixed paper waste including office paper, magazines, and cardboard.",
    postedDate: "1 week ago",
    match: 92
  },
  {
    id: 3,
    title: "Wood Pallets",
    category: "Wood",
    quantity: "50 pieces",
    location: "Vancouver, BC",
    distance: "140 miles",
    description: "Standard wooden pallets, mostly in good condition with minor repairs needed for some.",
    postedDate: "2 days ago",
    match: 85
  },
  {
    id: 4,
    title: "Aluminum Scrap",
    category: "Metal",
    quantity: "800 kg",
    location: "Tacoma, WA",
    distance: "30 miles",
    description: "Clean aluminum scrap from manufacturing process, mostly sheets and offcuts.",
    postedDate: "5 days ago",
    match: 82
  },
  {
    id: 5,
    title: "Glass Bottles",
    category: "Glass",
    quantity: "1.5 tons",
    location: "Bellevue, WA",
    distance: "8 miles",
    description: "Mixed color glass bottles from beverage production.",
    postedDate: "1 day ago",
    match: 78
  }
];

const Matchmaking = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find Materials</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Connect with organizations offering waste materials that match your specific needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters Panel */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Search & Filter</h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Materials</Label>
                    <div className="relative">
                      <Input
                        id="search"
                        placeholder="Search by keyword..."
                        className="pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="material-type">Material Type</Label>
                    <Select>
                      <SelectTrigger id="material-type">
                        <SelectValue placeholder="All Materials" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Materials</SelectItem>
                        <SelectItem value="plastic">Plastics</SelectItem>
                        <SelectItem value="paper">Paper & Cardboard</SelectItem>
                        <SelectItem value="metal">Metals</SelectItem>
                        <SelectItem value="glass">Glass</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="textile">Textiles</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                        <SelectItem value="electronic">Electronics</SelectItem>
                        <SelectItem value="chemical">Chemicals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Distance</Label>
                    <Slider defaultValue={[100]} max={500} step={10} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>0 mi</span>
                      <span>250 mi</span>
                      <span>500 mi</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Minimum Quantity</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Advanced Filters</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Recurring Availability
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Certified Sustainable
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Transport Included
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-full">
                        Process Ready
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pt-4">
                    <Button className="w-full">Apply Filters</Button>
                    <Button variant="outline" className="w-full">Reset</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Panel */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="matches">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="matches" className="flex-1">Best Matches</TabsTrigger>
                  <TabsTrigger value="near" className="flex-1">Nearest</TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">Recently Added</TabsTrigger>
                </TabsList>
                
                <TabsContent value="matches" className="space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-muted-foreground">Showing {materialResults.length} results</p>
                    <Select defaultValue="match">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="match">Match Score</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="recent">Recently Added</SelectItem>
                        <SelectItem value="quantity">Quantity: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {materialResults.map((material) => (
                      <Card key={material.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/4 bg-muted h-full min-h-[140px] flex items-center justify-center">
                              <div className="text-2xl">📦</div>
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-lg font-bold">{material.title}</h3>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{material.location}</span>
                                    <span>•</span>
                                    <span>{material.distance}</span>
                                    <span>•</span>
                                    <span>{material.postedDate}</span>
                                  </div>
                                </div>
                                <Badge className={`${
                                  material.match >= 95 
                                    ? "bg-green-600" 
                                    : material.match >= 80 
                                    ? "bg-green-500" 
                                    : "bg-yellow-500"
                                }`}>
                                  {material.match}% Match
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 my-2">
                                <Badge variant="outline">{material.category}</Badge>
                                <Badge variant="outline">{material.quantity}</Badge>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                              
                              <div className="flex justify-end gap-2 mt-auto">
                                <Button variant="outline" size="sm">View Details</Button>
                                <Button size="sm">Contact Supplier</Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-8">
                    <Button variant="outline">Load More Results</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="near" className="space-y-4">
                  <div className="p-8 text-center border rounded-lg">
                    <p>Nearby materials will be displayed here.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="recent" className="space-y-4">
                  <div className="p-8 text-center border rounded-lg">
                    <p>Recently added materials will be displayed here.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Matchmaking;
