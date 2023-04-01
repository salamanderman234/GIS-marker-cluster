import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { pb } from "../../repository/pocketbase";
import { useRef, useState, useMemo } from "react";

export function StaticMarker({ data }) {
	// state
	const [positionState, setPositionState] = useState(data.position);
	const [name, setName] = useState(data.nama);
	const [atribut, setAtribut] = useState(data.atribut);
	const markerRef = useRef(null);
	// icon
	const defaultIcon = new L.Icon({
		iconUrl: require("../../assets/icons/restaurant.png"),
		iconSize: new L.Point(40, 40),
	});
	const warnetIcon = new L.Icon({
		iconUrl: require("../../assets/icons/computer.png"),
		iconSize: new L.Point(40, 40),
	});
	// event
	const onPopUpButtonClick = async () => {
		await pb.collection("positions").delete(data.id);
	};
	const onPopUpUpdate = async () => {
		await pb.collection("positions").update(data.id, {
			name,
			attribute: atribut,
		});
	};
	const eventHandlers = useMemo(
		() => ({
			async dragend() {
				const marker = markerRef.current;
				await pb.collection("positions").update(data.id, {
					position: marker.getLatLng(),
				});
				setPositionState(marker.getLatLng());
				marker.openPopup();
			},
		}),
		[data]
	);
	// map
	var attributeList = [];
	for (const property in atribut) {
		attributeList.push(
			<div key={property} className="flex flex-col mb-1">
				<div className="grid grid-cols-2 items-center gap-1 mb-1">
					<span className="font-bold mr-1 w-full">
						{property.split("_").join(" ")}
					</span>
					<input
						className="py-1 px-2 border border-blue-500 rounded-md"
						type="text"
						value={atribut[property] || ""}
						onChange={(e) =>
							setAtribut((prev) => {
								const atr = {};
								atr[property] = e.target.value;
								return (prev = {
									...prev,
									...atr,
								});
							})
						}
					></input>
				</div>
			</div>
		);
	}
	// jsx
	return (
		<Marker
			ref={markerRef}
			position={positionState}
			eventHandlers={eventHandlers}
			draggable={true}
			icon={data.tipe == "warnet" ? warnetIcon : defaultIcon}
		>
			<Popup minWidth={90}>
				{/* <div className="flex mb-5">
					<span className="text-xs">{`[${positionState.lat} , ${positionState.lng}]`}</span>
				</div> */}
				<div className="flex flex-col mb-1">
					<div className="grid grid-cols-2 items-center">
						<span className="font-bold mr-1 w-full">Nama</span>
						<input
							className="py-1 border border-blue-500 rounded-md px-2"
							type="text"
							id="alamat_detail"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className="flex flex-col my-2">
					<div className="grid grid-cols-2 items-center">
						<span className="font-bold w-full">Tipe</span>
						<span className="ml-1 font-extrabold text-rose-700">
							{data.tipe}
						</span>
					</div>
				</div>
				{attributeList}
				<div className="mt-5 flex flex-col">
					<button
						className="bg-green-500 py-1 rounded-md w-full text-white mb-2"
						onClick={onPopUpUpdate}
					>
						Update
					</button>
					<button
						className="bg-red-500 py-1 rounded-md w-full text-white"
						onClick={onPopUpButtonClick}
					>
						Hapus Lokasi
					</button>
				</div>
			</Popup>
		</Marker>
	);
}
