import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from "@/components/ui/use-toast";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Item {
  id: number;
  name: string;
  category: string;
  condition: string;
  description: string;
  quantity: string;
  unit: string;
  frequency: string;
  location: string;
  notes: string;
  coordinates?: [number, number];
  email: string;
  image?: string;
}

interface Filters {
  search: string;
  materialType: string;
  distance: number;
  minQuantity: number;
  recurring: boolean;
  sustainable: boolean;
  transport: boolean;
  processReady: boolean;
  userLocation?: [number, number];
}

const Matchmaking = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    materialType: "all",
    distance: 100,
    minQuantity: 0,
    recurring: false,
    sustainable: false,
    transport: false,
    processReady: false,
  });
  const [sortBy, setSortBy] = useState<{ [key: string]: string }>({
    matches: "match",
    near: "distance",
    recent: "recent",
  });
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        
        // Get coordinates for each item's location
        const itemsWithCoordinates = await Promise.all(
          data.map(async (item: Item) => {
            try {
              const geoResponse = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(item.location)}`
              );
              const geoData = await geoResponse.json();
              if (geoData && geoData[0]) {
                return {
                  ...item,
                  coordinates: [parseFloat(geoData[0].lat), parseFloat(geoData[0].lon)],
                };
              }
            } catch (error) {
              console.error('Error fetching coordinates:', error);
            }
            return item;
          })
        );

        setItems(itemsWithCoordinates);
        setFilteredItems(itemsWithCoordinates);
      } catch (err) {
        setError('Failed to load items');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFilters(prev => ({
            ...prev,
            userLocation: [position.coords.latitude, position.coords.longitude],
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const applyFilters = useCallback(() => {
    let filtered = [...items];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(item =>
        (item.name?.toLowerCase() || '').includes(searchLower) ||
        (item.description?.toLowerCase() || '').includes(searchLower) ||
        (item.category?.toLowerCase() || '').includes(searchLower)
      );
    }

    // Apply material type filter
    if (filters.materialType !== "all") {
      filtered = filtered.filter(item =>
        (item.category?.toLowerCase() || '') === filters.materialType.toLowerCase()
      );
    }

    // Apply distance filter
    if (filters.userLocation && filters.distance > 0) {
      filtered = filtered.filter(item => {
        if (!item.coordinates) return false;
        const distance = calculateDistance(
          filters.userLocation![0],
          filters.userLocation![1],
          item.coordinates[0],
          item.coordinates[1]
        );
        return distance <= filters.distance;
      });
    }

    // Apply minimum quantity filter
    if (filters.minQuantity > 0) {
      filtered = filtered.filter(item => {
        const quantity = parseFloat(item.quantity || '0');
        return !isNaN(quantity) && quantity >= filters.minQuantity;
      });
    }

    // Apply advanced filters
    if (filters.recurring) {
      filtered = filtered.filter(item => 
        (item.frequency?.toLowerCase() || '') === 'recurring'
      );
    }
    if (filters.sustainable) {
      filtered = filtered.filter(item => 
        (item.condition?.toLowerCase() || '') === 'sustainable'
      );
    }
    if (filters.transport) {
      filtered = filtered.filter(item => 
        (item.notes?.toLowerCase() || '').includes('transport included')
      );
    }
    if (filters.processReady) {
      filtered = filtered.filter(item => 
        (item.condition?.toLowerCase() || '') === 'ready'
      );
    }

    setFilteredItems(filtered);
  }, [filters, items]);

  const handleSort = (tab: string, value: string) => {
    setSortBy(prev => ({ ...prev, [tab]: value }));
    
    const sorted = [...filteredItems];
    switch (value) {
      case "match":
        sorted.sort((a, b) => {
          // Implement your matching algorithm here
          return 0;
        });
        break;
      case "distance":
        if (filters.userLocation) {
          sorted.sort((a, b) => {
            if (!a.coordinates || !b.coordinates) return 0;
            const distA = calculateDistance(
              filters.userLocation[0],
              filters.userLocation[1],
              a.coordinates[0],
              a.coordinates[1]
            );
            const distB = calculateDistance(
              filters.userLocation[0],
              filters.userLocation[1],
              b.coordinates[0],
              b.coordinates[1]
            );
            return distA - distB;
          });
        }
        break;
      case "recent":
        sorted.sort((a, b) => b.id - a.id);
        break;
      case "quantity":
        sorted.sort((a, b) => {
          const qtyA = parseFloat(a.quantity || '0');
          const qtyB = parseFloat(b.quantity || '0');
          return qtyB - qtyA;
        });
        break;
    }
    setFilteredItems(sorted);
  };

  const resetFilters = () => {
    setFilters(prev => ({
      ...prev,
      search: "",
      materialType: "all",
      distance: 100,
      minQuantity: 0,
      recurring: false,
      sustainable: false,
      transport: false,
      processReady: false,
    }));
    setFilteredItems(items);
  };

  const handleSendEmail = (supplierEmail: string, itemName: string) => {
    const subject = encodeURIComponent(`Inquiry about ${itemName}`);
    const body = encodeURIComponent(`Hello,\n\nI am interested in your item "${itemName}" listed on ReGenPi. Could you please provide more information?\n\nBest regards,\n[Your Name]`);
    
    // Open Gmail compose in a new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${supplierEmail}&su=${subject}&body=${body}`, '_blank');
  };

  const renderItemCard = (item: Item) => (
    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 bg-muted h-full min-h-[140px] flex items-center justify-center">
            <div className="text-2xl">📦</div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{item.location}</span>
                  <span>•</span>
                  <span>{item.frequency}</span>
                </div>
              </div>
              <Badge variant="secondary" className="capitalize">
                {item.condition}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2 my-2">
              <Badge variant="outline">{item.category}</Badge>
              <Badge variant="outline">{item.quantity} {item.unit}</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
            
            <div className="flex justify-end gap-2 mt-auto">
              <Button variant="outline" size="sm" onClick={() => setShowMap(true)}>
                View on Map
              </Button>
            </div>

            <div className="mt-2 text-sm text-gray-500">
              Supplier Email: {item.email}
            </div>

            <Button 
              onClick={() => handleSendEmail(item.email, item.name)}
              className="w-full mt-2"
            >
              Contact Supplier
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex-1 py-12">
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
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
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
                  <Select
                    value={filters.materialType}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, materialType: value }))}
                  >
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
                  <Slider
                    defaultValue={[filters.distance]}
                    max={500}
                    step={10}
                    onValueChange={(value) => setFilters(prev => ({ ...prev, distance: value[0] }))}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0 mi</span>
                    <span>250 mi</span>
                    <span>500 mi</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Minimum Quantity</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minQuantity}
                    onChange={(e) => setFilters(prev => ({ ...prev, minQuantity: Number(e.target.value) }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Advanced Filters</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.recurring ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setFilters(prev => ({ ...prev, recurring: !prev.recurring }))}
                    >
                      Recurring Availability
                    </Button>
                    <Button
                      variant={filters.sustainable ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setFilters(prev => ({ ...prev, sustainable: !prev.sustainable }))}
                    >
                      Certified Sustainable
                    </Button>
                    <Button
                      variant={filters.transport ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setFilters(prev => ({ ...prev, transport: !prev.transport }))}
                    >
                      Transport Included
                    </Button>
                    <Button
                      variant={filters.processReady ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setFilters(prev => ({ ...prev, processReady: !prev.processReady }))}
                    >
                      Process Ready
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 pt-4">
                  <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                  <Button variant="outline" className="w-full" onClick={resetFilters}>Reset</Button>
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
                  <p className="text-sm text-muted-foreground">Showing {filteredItems.length} results</p>
                  <Select
                    value={sortBy.matches}
                    onValueChange={(value) => handleSort("matches", value)}
                  >
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
                  {loading ? (
                    <div className="text-center py-4">Loading items...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                  ) : filteredItems.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No items found.</div>
                  ) : (
                    filteredItems.map(renderItemCard)
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="near" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">Showing {filteredItems.length} results</p>
                  <Select
                    value={sortBy.near}
                    onValueChange={(value) => handleSort("near", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="match">Match Score</SelectItem>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="quantity">Quantity: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">Loading items...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                  ) : filteredItems.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No items found.</div>
                  ) : (
                    filteredItems.map(renderItemCard)
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="recent" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-muted-foreground">Showing {filteredItems.length} results</p>
                  <Select
                    value={sortBy.recent}
                    onValueChange={(value) => handleSort("recent", value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Added</SelectItem>
                      <SelectItem value="match">Match Score</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="quantity">Quantity: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-4">Loading items...</div>
                  ) : error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                  ) : filteredItems.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">No items found.</div>
                  ) : (
                    filteredItems.map(renderItemCard)
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-[90vw] h-[90vh] relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 z-10"
                onClick={() => setShowMap(false)}
              >
                Close
              </Button>
              <MapContainer
                center={filters.userLocation || [0, 0]}
                zoom={13}
                className="w-full h-full rounded-lg"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {filters.userLocation && (
                  <Marker position={filters.userLocation}>
                    <Popup>Your Location</Popup>
                  </Marker>
                )}
                {filteredItems.map((item) => 
                  item.coordinates && (
                    <Marker key={item.id} position={item.coordinates}>
                      <Popup>
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p>{item.location}</p>
                          <p>{item.quantity} {item.unit}</p>
                        </div>
                      </Popup>
                    </Marker>
                  )
                )}
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matchmaking;
