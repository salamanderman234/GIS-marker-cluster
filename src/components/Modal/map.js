import { useState } from "react";
import { pb } from "../../repository/pocketbase";

export const AddPositionModal = ({ position, onClose }) => {
	const [nama, setNama] = useState("");
	const [tipe, setTipe] = useState("restoran");
	const [warnetAtribut, setWarnetAtribut] = useState({});
	const [restoranAtribut, setRestoranAtribut] = useState({});
	// warnet attribut

	const onSubmitEvent = async (e) => {
		e.preventDefault();
		let attribute = restoranAtribut;
		if (tipe === "warnet") {
			attribute = warnetAtribut;
		}
		const newData = {
			position,
			name: nama,
			type: tipe,
			attribute,
		};
		await pb.collection("positions").create(newData);
		onClose();
	};

	const restaurantAttribute = (
		<>
			<div className="label-input">
				<label className="mb-1" htmlFor="jumlah-meja">
					Jumlah Meja :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="jumlah-meja"
					onChange={(e) =>
						setRestoranAtribut(
							(prev) =>
								(prev = {
									...prev,
									jumlah_meja: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="tema-restoran">
					Tema Restoran :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="tema-restoran"
					onChange={(e) =>
						setRestoranAtribut(
							(prev) =>
								(prev = {
									...prev,
									tema_restoran: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="menu-vegan">
					Menu Vegan :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="menu-vegan"
					onChange={(e) =>
						setRestoranAtribut(
							(prev) =>
								(prev = {
									...prev,
									menu_vegan: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="halal">
					Halal :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="halal"
					onChange={(e) =>
						setRestoranAtribut(
							(prev) =>
								(prev = {
									...prev,
									halal: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="jam-operasi">
					Jam Operasi :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="jam-operasi"
					onChange={(e) =>
						setRestoranAtribut(
							(prev) =>
								(prev = {
									...prev,
									jam_operasi: e.target.value,
								})
						)
					}
					required
				/>
			</div>
		</>
	);

	const warnetAttribute = (
		<>
			<div className="label-input">
				<label className="mb-1" htmlFor="jumlah-komputer">
					Jumlah Komputer :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="jumlah-komputer"
					onChange={(e) =>
						setWarnetAtribut(
							(prev) =>
								(prev = {
									...prev,
									jumlah_komputer: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="harga-billing">
					Harga Billing/jam :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="harga-billing"
					onChange={(e) =>
						setWarnetAtribut(
							(prev) =>
								(prev = {
									...prev,
									harga_billing: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="kecepatan-internet">
					Kecepatan Internet :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="kecepatan-internet"
					onChange={(e) =>
						setWarnetAtribut(
							(prev) =>
								(prev = {
									...prev,
									kecepatan_internet: e.target.value,
								})
						)
					}
					required
				/>
			</div>
			<div className="label-input">
				<label className="mb-1" htmlFor="jam-operasi">
					Jam Operasi :
				</label>
				<input
					className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
					type="text"
					id="jam-operasi"
					onChange={(e) =>
						setWarnetAtribut(
							(prev) =>
								(prev = {
									...prev,
									jam_operasi: e.target.value,
								})
						)
					}
					required
				/>
			</div>
		</>
	);

	return (
		<>
			<div
				className="overlay h-screen w-screen absolute opacity-30 bg-slate-800 z-10"
				onClick={onClose}
			></div>
			<div className="modal-content bg-white rounded-md absolute z-30 center left-1/3 top-28 p-5">
				<div className="close-container flex justify-end mb-5">
					<button
						className="close bg-red-600 text-white px-3 py-1 rounded-md"
						onClick={onClose}
					>
						X
					</button>
				</div>
				<div className="latlng-info flex flex-col">
					<span className="mb-1">Latitude : {position.lat}</span>
					<span className="mb-1">Langitude : {position.lng}</span>
				</div>
				<form onSubmit={onSubmitEvent}>
					<div className="label-input">
						<label className="mb-1" htmlFor="">
							Nama :
						</label>
						<input
							className="mb-1 px-2 py-1 ml-2 border border-blue-500 rounded-md"
							type="text"
							id="nama"
							onChange={(e) => setNama(e.target.value)}
							required
						/>
					</div>
					<div className="label-input	">
						<label className="mb-1" htmlFor="">
							Tipe :
						</label>
						<select
							className="mb-1 px-2 py-1 rounded-md ml-2"
							name=""
							id="tipe"
							onChange={(e) => setTipe(e.target.value)}
						>
							<option value="restoran">Restoran</option>
							<option value="warnet">Warnet</option>
						</select>
					</div>
					{tipe === "warnet"
						? warnetAttribute
						: tipe === "restoran"
						? restaurantAttribute
						: ""}
					<div className="flex justify-center mt-5">
						<button
							type="submit"
							className="submit w-full rounded-md bg-blue-500 text-white py-2"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
