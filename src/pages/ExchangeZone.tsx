
import React from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExchangeZoneHeader from '@/components/ExchangeZone/ExchangeZoneHeader';
import TrendingSection from '@/components/ExchangeZone/TrendingSection';
import AICollectionSection from '@/components/ExchangeZone/AICollectionSection';
import NearbyCollectionSection from '@/components/ExchangeZone/NearbyCollectionSection';

const ExchangeZone = () => {
  return (
    <div className="min-h-screen bg-gray-50 max-w-sm mx-auto">
      <ExchangeZoneHeader />

      <div className="px-4 space-y-6 py-0">
        <TrendingSection />

        <Tabs defaultValue="foryou" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1">
            <TabsTrigger value="foryou" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Heart className="w-4 h-4 mr-2" />
              Cho bạn
            </TabsTrigger>
            <TabsTrigger value="nearby" className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MapPin className="w-4 h-4 mr-2" />
              Gần bạn
            </TabsTrigger>
          </TabsList>

          <TabsContent value="foryou" className="mt-6 space-y-5">
            <AICollectionSection />
          </TabsContent>

          <TabsContent value="nearby" className="mt-6 space-y-5">
            <NearbyCollectionSection />
          </TabsContent>
        </Tabs>

        <div className="pb-20"></div>
      </div>
    </div>
  );
};

export default ExchangeZone;
