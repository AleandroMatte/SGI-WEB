import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { AssetData } from "./AssetsViewContainer";
import AgTable from "../../components/Table";

interface AssetsViewPageInterface {
  assetsData?: AssetData[];
}

export default function AssetsViewPage({
  assetsData,
}: AssetsViewPageInterface) {
  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="absolute w-[30vw] h-[90vh] z-10 shadow-2xl bg-amber-50 rounded-2xl left-2 top-2 p-5">
          <div className="w-[100%] h-[40%] bg-amber-300 rounded-xl">
            {assetsData && (
              <AgTable
                rowData={assetsData}
                columnDefinition={[
                  {
                    field: "asset_identifier",
                    headerName: "Id",
                  },
                  {
                    field: "asset_lat",
                    headerName: "Lat",
                  },
                  {
                    field: "asset_long",
                    headerName: "Long",
                  },
                  {
                    field: "created_at",
                    headerName: "Instalação",
                  },
                ]}
              />
            )}
          </div>
        </div>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {assetsData?.map((item) => (
            <Marker key={item.id} position={[item.asset_lat, item.asset_long]}>
              <Popup />
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
0;
