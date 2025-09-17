import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export function RecentCreations() {
  const creations = [
    {
      id: 1,
      prompt: 'Futuristic cityscape at night with neon lights',
      style: 'Photorealistic',
      user: 'Alex M.',
    },
    {
      id: 2,
      prompt: 'Watercolor painting of a peaceful garden',
      style: 'Artistic',
      user: 'Sarah K.',
    },
    {
      id: 3,
      prompt: 'Abstract geometric patterns in blue and gold',
      style: 'Abstract',
      user: 'Mike R.',
    },
    {
      id: 4,
      prompt: 'Vintage poster design for coffee shop',
      style: 'Vintage',
      user: 'Emma L.',
    },
    {
      id: 5,
      prompt: 'Minimalist logo design with mountain silhouette',
      style: 'Minimalist',
      user: 'David P.',
    },
    {
      id: 6,
      prompt: 'Fantasy dragon in mystical forest setting',
      style: 'Artistic',
      user: 'Lisa W.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold mb-4">
          Featured Gallery
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Discover amazing creations from our community. Get inspired and see
          what's possible with AI Image Studio.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creations.map((creation) => (
          <Card
            key={creation.id}
            className="group overflow-hidden cursor-pointer hover:shadow-lg transition-all"
          >
            <CardContent className="p-0">
              <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-sm font-medium mb-1 line-clamp-2">
                    "{creation.prompt}"
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {creation.style}
                    </Badge>
                    <span className="text-xs opacity-75">
                      by {creation.user}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Join thousands of creators who trust AI Image Studio
        </p>
        <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">50K+</div>
            <div>Images Generated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">10K+</div>
            <div>Happy Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">99.9%</div>
            <div>Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}
