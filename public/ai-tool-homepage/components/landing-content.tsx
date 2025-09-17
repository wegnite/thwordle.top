import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Palette, Shield, Zap } from 'lucide-react';

export function LandingContent() {
  return (
    <div className="space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold mb-6">
          What is seedream?
        </h2>
        <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
          seedream is where imagination meets artificial intelligence. Our
          platform nurtures the seeds of your creativity, transforming abstract
          thoughts and wild dreams into stunning visual masterpieces. Whether
          you're an artist, storyteller, or dreamer, seedream helps you
          visualize the impossible and bring your inner visions to life.
        </p>
      </div>

      {/* Why Choose Us */}
      <div>
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-center mb-12">
          Why Choose seedream?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Zap className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-xl">Instant Dreams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Watch your dreams materialize in seconds with our lightning-fast
                AI dream engine.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Palette className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-xl">Limitless Styles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                From ethereal dreamscapes to surreal fantasies, explore infinite
                artistic possibilities.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-xl">
                Your Dreams, Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Every dream you create belongs to you with full commercial usage
                rights.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Download className="h-12 w-12 mx-auto text-primary mb-4" />
              <CardTitle className="text-xl">Crystal Clear Visions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Download your dreams in stunning 4K resolution for any creative
                project.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How to Use It */}
      <div>
        <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-center mb-12">
          How to Plant Your Dreams?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                1
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Plant Your Seed</h3>
            <p className="text-muted-foreground">
              Describe your wildest dreams and impossible visions. Let your
              imagination flow freely.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                2
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Choose Your Reality</h3>
            <p className="text-muted-foreground">
              Select from dreamlike, surreal, or fantastical styles to shape
              your vision.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-foreground">
                3
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3">Watch It Bloom</h3>
            <p className="text-muted-foreground">
              See your dream come to life in stunning detail, then harvest it in
              high resolution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
