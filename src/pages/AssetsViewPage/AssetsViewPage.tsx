import { type Ref } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import type { AssetData, InspectionData } from "./AssetsViewContainer";
import AgTable from "../../components/Table";
import type { MapRef } from "react-leaflet/MapContainer";
import type { LeafletMouseEvent } from "leaflet";
import type { AgGridReact } from "ag-grid-react";
import { type RowClickedEvent } from "ag-grid-community";
import { BiSolidInfoCircle } from "react-icons/bi";
interface AssetsViewPageInterface {
  assetsData?: AssetData[];
  selectedAsset: AssetData | null;
  mapRef?: Ref<MapRef> | undefined;
  onMarkerClick: (e: LeafletMouseEvent, assetIndex: AssetData) => void;
  gridRef: Ref<AgGridReact<object> | null>;
  handleAssetListRowClick: (event: RowClickedEvent<any, any>) => void;
  assetInspectionData?: InspectionData[];
  isLeftPannelHidden: "hidden" | "visible";
  setLeftPannelHidden: () => void;
}

export default function AssetsViewPage({
  assetsData,
  mapRef,
  selectedAsset,
  onMarkerClick,
  gridRef,
  handleAssetListRowClick,
  assetInspectionData,
  isLeftPannelHidden,
  setLeftPannelHidden,
}: AssetsViewPageInterface) {
  const leftPannelPositions = {
    hidden: "left-[-1000px]",
    visible: "left-2",
  };
  return (
    <>
      <div className="flex justify-center items-center gap-0 w-[100vw] h-[100vh]">
        <BiSolidInfoCircle
          onClick={() => setLeftPannelHidden()}
          className="absolute top-1 left-2 z-20 rounded-full text-3xl backdrop-blur-lg backdrop-grayscale-100 cursor-pointer hover:text-4xl hover:bg-white text-gray-500 duration-500"
        />
        <div
          className={`absolute resize-x flex flex-col gap-2 w-[30vw] h-[90vh] z-10 rounded-2xl shadow-2xl  ${leftPannelPositions[isLeftPannelHidden]}  top-10 p-5 backdrop-blur-lg backdrop-grayscale-100 duration-2000 `}
          style={{
            scrollbarColor: "gray transparent",
          }}
        >
          <div className="w-[100%] h-[40%] overflow-hidden shadow-2xl ">
            {assetsData && (
              <AgTable
                onRowClicked={handleAssetListRowClick}
                getRowIdFunction={(params: { data: AssetData }) =>
                  params.data.id
                }
                ref={gridRef}
                themeConfig={{
                  backgroundColor: "#dfdfdf4e",
                  borderColor: "none",
                }}
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
          <div className="w-[100%] h-[60%]  rounded-2xl p-5   bg-[#dfdfdf4e] shadow-2xl">
            {selectedAsset && (
              <div className="w-full h-full flex flex-col overflow-y-scroll items-center gap-3">
                <h1 className="mb-5">Dados do Ativo</h1>
                <img className="w-[50%]" src={selectedAsset.asset_image}></img>
                <div className=" w-[100%] flex flex-col gap-2">
                  <p>Identificador: {selectedAsset.asset_identifier}</p>
                  <p>Tipo de Ativo: {selectedAsset.asset_type}</p>
                  <p>Latitude: {selectedAsset.asset_lat}</p>
                  <p>Longitude: {selectedAsset.asset_long}</p>
                  <p>Instalado em: {selectedAsset?.created_at}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="absolute flex flex-col gap-2 w-[20vw] h-[90vh] overflow-y-scroll  bg-[#dfdfdf4e] shadow-2xl z-10 right-2 top-2 p-5  backdrop-blur-lg backdrop-grayscale-100">
          <div
            className="w-[100%] h-[40%] rounded-xl overflow-hidden shadow-2xl"
            style={{
              scrollbarColor: "gray transparent",
            }}
          >
            {assetInspectionData && (
              <AgTable
                rowData={assetInspectionData}
                themeConfig={{
                  backgroundColor: "#dfdfdf4e",
                  borderColor: "none",
                }}
                columnDefinition={[
                  {
                    field: "inspection_date",
                    headerName: "Data",
                  },
                  {
                    field: "user_email",
                    headerName: "Operador",
                  },
                ]}
              />
            )}
          </div>
        </div>
        <MapContainer
          zoomControl={false}
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-full z-0"
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {assetsData?.map((item) => (
            <Marker
              key={item.id}
              position={[item.asset_lat, item.asset_long]}
              eventHandlers={{
                click: (e) => {
                  onMarkerClick(e, item);
                },
              }}
            >
              <Popup>
                <img src={item.asset_image} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
0;
