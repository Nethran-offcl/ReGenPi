import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
}

const RecentItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError('Failed to load recent items');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading recent items...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (items.length === 0) {
    return <div className="text-center py-4 text-gray-500">No items have been added yet.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="mt-1">
                  {item.category} • {item.condition}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="capitalize">
                {item.frequency}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">
                  {item.quantity} {item.unit}
                </span>
                <span className="text-gray-500">{item.location}</span>
              </div>
              {item.notes && (
                <p className="text-sm text-gray-500 italic line-clamp-1">
                  Note: {item.notes}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecentItems; 