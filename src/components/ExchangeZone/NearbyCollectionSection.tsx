import React from "react";
import CollectionGrid from "./CollectionGrid";
import { Collection } from "@/services/marketplace.service";

interface NearbyCollectionSectionProps {
  props: Collection[];
  loading?: boolean;
}

const NearbyCollectionSection = ({
  props,
  loading,
}: NearbyCollectionSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 text-base">
        Bộ sưu tập ở gần bạn
      </h3>
      <CollectionGrid collections={props} />
    </div>
  );
};

export default NearbyCollectionSection;
