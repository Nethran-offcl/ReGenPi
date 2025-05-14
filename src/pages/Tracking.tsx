
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const shipments = [
  {
    id: "SHP12345",
    material: "Plastic Film Scraps",
    origin: "Seattle, WA",
    destination: "Portland, OR",
    quantity: "500 kg",
    status: "In Transit",
    statusColor: "bg-yellow-500",
    departureDate: "2025-05-10",
    estimatedArrival: "2025-05-15",
    carbonSaved: "120 kg"
  },
  {
    id: "SHP67890",
    material: "Aluminum Scrap",
    origin: "Tacoma, WA",
    destination: "Vancouver, BC",
    quantity: "800 kg",
    status: "Delivered",
    statusColor: "bg-green-500",
    departureDate: "2025-05-05",
    estimatedArrival: "2025-05-12",
    carbonSaved: "210 kg"
  },
  {
    id: "SHP24680",
    material: "Glass Bottles",
    origin: "Bellevue, WA",
    destination: "Olympia, WA",
    quantity: "1.5 tons",
    status: "Processing",
    statusColor: "bg-blue-500",
    departureDate: "2025-05-12",
    estimatedArrival: "2025-05-18",
    carbonSaved: "320 kg"
  }
];

const Tracking = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Track Shipments</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Monitor your material shipments in real-time and optimize logistics for sustainability.
            </p>
          </div>
          
          <div className="mx-auto max-w-5xl">
            <div className="bg-card rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="tracking-id">Track a Shipment</Label>
                  <div className="flex gap-2 mt-2">
                    <Input placeholder="Enter tracking ID" />
                    <Button>Track</Button>
                  </div>
                </div>
                <div className="flex-1">
                  <Label>Quick Stats</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="p-2 rounded-md bg-muted text-center">
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Active Shipments</div>
                    </div>
                    <div className="p-2 rounded-md bg-muted text-center">
                      <div className="text-2xl font-bold">650</div>
                      <div className="text-xs text-muted-foreground">kg CO₂ Saved</div>
                    </div>
                    <div className="p-2 rounded-md bg-muted text-center">
                      <div className="text-2xl font-bold">2.8</div>
                      <div className="text-xs text-muted-foreground">Tons Shipped</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="active">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="active" className="flex-1">Active Shipments</TabsTrigger>
                <TabsTrigger value="history" className="flex-1">Shipment History</TabsTrigger>
                <TabsTrigger value="map" className="flex-1">Map View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-6">
                {shipments.map((shipment) => (
                  <Card key={shipment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold flex items-center gap-2">
                            {shipment.material}
                            <Badge className={shipment.statusColor}>{shipment.status}</Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground">Tracking ID: {shipment.id}</p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <p className="text-sm font-medium">Quantity: {shipment.quantity}</p>
                          <p className="text-sm text-muted-foreground">CO₂ Saved: {shipment.carbonSaved}</p>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-muted -translate-y-1/2"></div>
                        <div className="relative flex justify-between">
                          <div className="text-center">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white mx-auto">1</div>
                            <p className="mt-2 text-xs font-medium">Processing</p>
                            <p className="text-xs text-muted-foreground">{shipment.origin}</p>
                          </div>
                          
                          <div className="text-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full mx-auto ${shipment.status === "In Transit" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>2</div>
                            <p className="mt-2 text-xs font-medium">In Transit</p>
                            <p className="text-xs text-muted-foreground">On Route</p>
                          </div>
                          
                          <div className="text-center">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full mx-auto ${shipment.status === "Delivered" ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>3</div>
                            <p className="mt-2 text-xs font-medium">Delivered</p>
                            <p className="text-xs text-muted-foreground">{shipment.destination}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="p-3 rounded bg-muted">
                          <p className="text-xs text-muted-foreground">Origin</p>
                          <p className="font-medium">{shipment.origin}</p>
                          <p className="text-xs text-muted-foreground">Departure: {new Date(shipment.departureDate).toLocaleDateString()}</p>
                        </div>
                        <div className="p-3 rounded bg-muted">
                          <p className="text-xs text-muted-foreground">Destination</p>
                          <p className="font-medium">{shipment.destination}</p>
                          <p className="text-xs text-muted-foreground">
                            Estimated Arrival: {new Date(shipment.estimatedArrival).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-end gap-2 border-t p-4">
                      <Button variant="outline" size="sm">Contact Driver</Button>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="history" className="space-y-6">
                <div className="p-8 text-center border rounded-lg">
                  <p>Shipment history will be displayed here.</p>
                  <Button className="mt-4">Load Shipment History</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="map" className="space-y-6">
                <div className="p-8 text-center border rounded-lg h-[400px] flex items-center justify-center bg-muted">
                  <div>
                    <p className="mb-4">Interactive map will be displayed here.</p>
                    <Button>Enable Location Services</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4">Optimization Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Route Optimization</h3>
                    <p className="text-sm text-muted-foreground">
                      Combining shipments SHP12345 and SHP24680 could reduce emissions by an additional 45kg CO₂.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Low-Carbon Transport</h3>
                    <p className="text-sm text-muted-foreground">
                      Switching to electric vehicles for local deliveries could reduce your carbon footprint by 30%.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tracking;
