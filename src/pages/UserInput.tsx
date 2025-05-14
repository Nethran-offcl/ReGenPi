
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const UserInput = () => {
  const { toast } = useToast();
  
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
      title: "Waste material listed successfully!",
      description: "Your material has been added to our database and will be matched with potential buyers.",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">List Your Waste Materials</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Share details about your waste products to find potential buyers in our circular economy marketplace.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="single">Single Material</TabsTrigger>
                <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="single">
                <Card>
                  <form onSubmit={handleFormSubmit}>
                    <CardHeader>
                      <CardTitle>Material Details</CardTitle>
                      <CardDescription>
                        Provide detailed information about your waste material to improve matching accuracy.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="material-name">Material Name</Label>
                        <Input id="material-name" placeholder="e.g., Plastic Scraps, Wood Pallets" required />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="material-category">Category</Label>
                          <Select>
                            <SelectTrigger id="material-category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="plastic">Plastic</SelectItem>
                              <SelectItem value="paper">Paper/Cardboard</SelectItem>
                              <SelectItem value="metal">Metal</SelectItem>
                              <SelectItem value="glass">Glass</SelectItem>
                              <SelectItem value="organic">Organic</SelectItem>
                              <SelectItem value="textile">Textile</SelectItem>
                              <SelectItem value="electronic">Electronic</SelectItem>
                              <SelectItem value="chemical">Chemical</SelectItem>
                              <SelectItem value="construction">Construction</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="condition">Condition</Label>
                          <Select>
                            <SelectTrigger id="condition">
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New/Unused</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                              <SelectItem value="mixed">Mixed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Provide detailed information about composition, source, etc."
                          className="min-h-[120px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="quantity">Quantity</Label>
                          <Input id="quantity" type="number" min="0" placeholder="Amount" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Select>
                            <SelectTrigger id="unit">
                              <SelectValue placeholder="Select unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kg">Kilograms (kg)</SelectItem>
                              <SelectItem value="ton">Metric Tons</SelectItem>
                              <SelectItem value="lb">Pounds (lb)</SelectItem>
                              <SelectItem value="pieces">Pieces</SelectItem>
                              <SelectItem value="liters">Liters</SelectItem>
                              <SelectItem value="gallons">Gallons</SelectItem>
                              <SelectItem value="cubic-m">Cubic Meters</SelectItem>
                              <SelectItem value="pallets">Pallets</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="frequency">Frequency</Label>
                          <Select>
                            <SelectTrigger id="frequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="one-time">One-time</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                              <SelectItem value="quarterly">Quarterly</SelectItem>
                              <SelectItem value="yearly">Yearly</SelectItem>
                              <SelectItem value="irregular">Irregular</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State/Province, Country" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="photos">Photos</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                PNG, JPG or WEBP (MAX. 5MB each)
                              </p>
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" multiple />
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Any special considerations, handling requirements, etc."
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Save Draft</Button>
                      <Button type="submit">Submit Listing</Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              <TabsContent value="bulk">
                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Upload</CardTitle>
                    <CardDescription>
                      Upload multiple materials at once using our template file.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 rounded-md bg-muted">
                      <h3 className="font-medium mb-2">Instructions:</h3>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Download our Excel template</li>
                        <li>Fill in your materials information</li>
                        <li>Upload the completed file</li>
                        <li>Review and submit your listings</li>
                      </ol>
                    </div>
                    
                    <div>
                      <Button variant="outline" className="w-full">
                        Download Template
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bulk-upload">Upload File</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="bulk-file"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/70 transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              Excel or CSV file (MAX. 10MB)
                            </p>
                          </div>
                          <input id="bulk-file" type="file" className="hidden" accept=".xlsx,.csv" />
                        </label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Function not available",
                        description: "Bulk upload functionality will be available in the next release.",
                        variant: "destructive"
                      });
                    }}>
                      Upload and Review
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserInput;
