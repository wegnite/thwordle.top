'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageIcon, Sparkles, Upload } from 'lucide-react';
import { useState } from 'react';

export function AIToolSection() {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Inputs */}
      <div className="space-y-8">
        <div className="text-center lg:text-left">
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-balance mb-4">
            Turn Your Dreams into Reality
          </h1>
          <p className="text-xl text-muted-foreground text-pretty">
            Seedream transforms your wildest imagination into stunning visual
            art. Plant a seed of an idea and watch it bloom into breathtaking
            images.
          </p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-base font-medium">
              Describe your dream
            </Label>
            <Input
              id="prompt"
              placeholder="A floating garden in the clouds with crystalline waterfalls..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-base font-medium">Dream Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Choose a style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dreamlike">Dreamlike</SelectItem>
                  <SelectItem value="surreal">Surreal</SelectItem>
                  <SelectItem value="ethereal">Ethereal</SelectItem>
                  <SelectItem value="fantastical">Fantastical</SelectItem>
                  <SelectItem value="mystical">Mystical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Aspect Ratio</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">Square (1:1)</SelectItem>
                  <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                  <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                  <SelectItem value="4:3">Standard (4:3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Upload an inspiration image (optional)
              </p>
            </div>

            <Button size="lg" className="w-full h-12 text-base font-medium">
              <Sparkles className="h-5 w-5 mr-2" />
              Plant Your Dream
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Column: Outputs */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4">Your Dream Garden</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card
                key={i}
                className="aspect-square overflow-hidden group cursor-pointer"
              >
                <CardContent className="p-0 h-full">
                  <div className="h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h4 className="font-medium mb-3">🌱 Dream Tips</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Let your imagination run wild with impossible scenarios</li>
            <li>• Combine unexpected elements for unique results</li>
            <li>• Use emotional words to set the mood</li>
            <li>• Think beyond reality - this is your dream world</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
