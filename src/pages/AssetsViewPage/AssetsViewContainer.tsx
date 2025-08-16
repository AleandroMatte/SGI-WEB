import { useQuery } from "@tanstack/react-query";
import AssetsViewPage from "./AssetsViewPage";
import { backApi } from "../../services/api";
import { LatLng, Map as LeafletMap, type LeafletMouseEvent } from "leaflet";
import { useRef, useState } from "react";
import type { AgGridReact } from "ag-grid-react";
import { Marker } from "leaflet";

export type AssetData = {
  id: string;
  asset_image?: string;
  asset_identifier: string;
  asset_lat: number;
  asset_long: number;
  asset_type: string;
  created_at: string;
};
export type InspectionData = {
  id: string;
  user: string;
  asset: string;
  inspection_date: string;
  created_at: string;
  updated_at: string;
};
export default function AssetsViewContainer() {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const gridRef = useRef<AgGridReact<object>>(null);
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);
  const [isLeftPannelHidden, setLeftPannelHidden] = useState<
    "visible" | "hidden"
  >("visible");
  const assetsData = useQuery({
    queryFn: getAssets,
    queryKey: ["getAssets"],
  });
  const assetInspectionsQuery = useQuery({
    queryFn: getAssetInspection,
    queryKey: ["getAssetInspections", selectedAsset],
    enabled: !!selectedAsset,
  });

  async function getAssets(): Promise<AssetData[]> {
    const response = await backApi.get<AssetData[]>("/assets/");
    return response.data.map((asset) => {
      // Para compatibilidade com o Mapa, os numeros devem ter apenas 5 casas decimais
      asset.asset_lat = parseFloat(asset.asset_lat.toString());
      asset.asset_long = parseFloat(asset.asset_long.toString());
      return asset;
    });
  }
  async function getAssetInspection(): Promise<InspectionData[]> {
    const response = await backApi.get<InspectionData[]>(
      `/inspections/asset/${selectedAsset?.id}`
    );

    return response.data;
  }

  function handleIsLeftPannelVisible() {
    console.log(isLeftPannelHidden);
    if (isLeftPannelHidden === "visible") {
      setLeftPannelHidden("hidden");
    }
    if (isLeftPannelHidden === "hidden") {
      setLeftPannelHidden("visible");
    }
  }
  function handleMarkerClick(e: LeafletMouseEvent, asset: AssetData) {
    map?.flyTo(e.latlng, 15);
    setSelectedAsset(asset);
    setSelectedAssetInGridRow(asset.id);
  }

  function handleAssetListRowClick() {
    // selectedRow sempre trará um array com um item pois setei singleRow na tabela.
    const selectedRow = gridRef.current?.api.getSelectedRows()[0] as AssetData;

    const selectedRowLocation = new LatLng(
      selectedRow.asset_lat,
      selectedRow.asset_long
    );
    map?.flyTo(selectedRowLocation, 18, { duration: 2 });
    map?.eachLayer((layer) => {
      if (!(layer instanceof Marker)) {
        return;
      }
      if (!layer.getPopup()?.getLatLng()) {
        return;
      }
      // i have no idea why, but the comparision only works if they are casted to string
      if (
        layer.getPopup()?.getLatLng()?.toString() ===
        selectedRowLocation.toString()
      ) {
        layer.openPopup();
      }
    });
    setSelectedAsset(selectedRow);
  }
  function setSelectedAssetInGridRow(assetId: string) {
    const node = gridRef.current?.api.getRowNode(assetId);
    node?.setSelected(true);
  }

  return (
    <AssetsViewPage
      selectedAsset={selectedAsset}
      assetsData={assetsData.data}
      mapRef={setMap}
      isLeftPannelHidden={isLeftPannelHidden}
      setLeftPannelHidden={handleIsLeftPannelVisible}
      gridRef={gridRef}
      onMarkerClick={handleMarkerClick}
      handleAssetListRowClick={handleAssetListRowClick}
      assetInspectionData={assetInspectionsQuery.data}
    />
  );
}
