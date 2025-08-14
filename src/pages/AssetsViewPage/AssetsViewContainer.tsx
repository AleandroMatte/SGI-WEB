import { useQuery } from "@tanstack/react-query";
import AssetsViewPage from "./AssetsViewPage";
import { backApi } from "../../services/api";
import { useMapEvents } from "react-leaflet";
import { map } from "leaflet";
import { useState } from "react";

export type AssetData = {
  id: string;
  asset_image?: string;
  asset_identifier: string;
  asset_lat: number;
  asset_long: number;
};
export default function AssetsViewContainer() {
  const assetsData = useQuery({
    queryFn: getAssets,
    queryKey: ["getAssets"],
  });

  async function getAssets(): Promise<AssetData[]> {
    const response = await backApi.get<AssetData[]>("/assets/");
    return response.data.map((asset) => {
      asset.asset_lat = parseFloat(asset.asset_lat.toString());
      asset.asset_long = parseFloat(asset.asset_long.toString());
      return asset;
    });
  }

  return <AssetsViewPage assetsData={assetsData.data} />;
}
