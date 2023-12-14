"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ConfirmationPopup from "@/app/utils/ConfirmationPupUpAlert";

export default function AdminAlert() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [alerts, setAlerts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [editingAlert, setEditingAlert] = useState(null);
	const [formattedAlertDates, setFormattedAlertDates] = useState([]);

	const [showConfirmation, setShowConfirmation] = useState(false);
	const [alertId, setAlertId] = useState(null);
	const [deleteConfirmation, setDeleteConfirmation] = useState(false);

	useEffect(() => {
		fetchAlerts();
	}, []);

	const fetchAlerts = () => {
		setLoading(true);
		axios
			.get("http://localhost:8080/alerts/getAllNonDeletedAlerts")
			.then((response) => {
				setAlerts(response.data);
				setFormattedAlertDates(
					response.data.map((alert) =>
						formatDateTime(alert.alertDate)
					)
				);
				setLoading(false);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Error fetching alerts:", error);
				setLoading(false);
			});
	};

	const formatDateTime = (dateArray) => {
		if (!dateArray || dateArray.length !== 6) {
			return "Invalid Date";
		}

		const [year, month, day, hours, minutes, seconds] = dateArray;
		const formattedDate = new Date(
			year,
			month - 1,
			day,
			hours,
			minutes,
			seconds
		);

		if (isNaN(formattedDate.getTime())) {
			return "Invalid Date";
		}

		const options = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: true,
		};

		return formattedDate.toLocaleString("en-US", options);
	};

	const handleCancel = () => {
		setShowConfirmation(false);
		setDeleteConfirmation(false);
	};

	const handleCreateAlert = () => {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth()).padStart(2, "0");
		const day = String(currentDate.getDate()).padStart(2, "0");
		const hours = String(currentDate.getHours()).padStart(2, "0");
		const minutes = String(currentDate.getMinutes()).padStart(2, "0");
		const seconds = String(currentDate.getSeconds()).padStart(2, "0");

		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

		const newAlert = {
			alertTitle: title,
			alertDescription: description,
			alertDate: formattedDate,
			isDeleted: false,
		};
		console.log(newAlert.alertDate);

		axios
			.post("http://localhost:8080/alerts/createAlert", newAlert)
			.then((response) => {
				setAlerts([...alerts, response.data]);
				setTitle("");
				setDescription("");
			})
			.catch((error) => {
				console.error("Error creating alert:", error);
			});

		setShowConfirmation(false);
	};

	const handleUpdateAlert = (alertId) => {
		setEditingAlert(alertId);
	};

	const handleEditSubmit = () => {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth()).padStart(2, "0");
		const day = String(currentDate.getDate()).padStart(2, "0");
		const hours = String(currentDate.getHours()).padStart(2, "0");
		const minutes = String(currentDate.getMinutes()).padStart(2, "0");
		const seconds = String(currentDate.getSeconds()).padStart(2, "0");

		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

		if (editingAlert) {
			const updatedAlert = {
				alertTitle: title,
				alertDescription: description,
				alertDate: formattedDate,
				isDeleted: false,
			};

			axios
				.put(
					`http://localhost:8080/alerts/updateAlert/${editingAlert}`,
					updatedAlert
				)
				.then((response) => {
					setAlerts((prevAlerts) => {
						const updatedAlerts = prevAlerts.map((alert) =>
							alert.alertId === editingAlert
								? response.data
								: alert
						);
						return updatedAlerts;
					});
					setTitle("");
					setDescription("");
					setEditingAlert(null);
				})
				.catch((error) => {
					console.error("Error updating alert:", error);
				});
		}
	};

	const handleDeleteConfirmation = (alertId) => {
		setAlertId(alertId);
		setDeleteConfirmation(true);
	};

	const handleDeleteAlert = (alertId) => {
		axios
			.put(`http://localhost:8080/alerts/deleteAlert/${alertId}`)
			.then(() => {
				// Remove the deleted alert from the state
				setAlerts((prevAlerts) =>
					prevAlerts.filter((alert) => alert.alertId !== alertId)
				);
			})
			.catch((error) => {
				console.error("Error deleting alert:", error);
			});

		setDeleteConfirmation(false);
	};

	return (
		<div className="h-full w-full flex flex-col bg-slate-100">
			{/* Header */}
			<header
				className="h-72 w-full bg-cover text-black"
				style={{
					backgroundImage: 'url("images/admin-alerts.png")',
				}}
			>
				<div className="flex justify-center flex-col my-auto ml-12 mr-96 h-full">
					<h1 className="font-bold text-6xl">Alerts</h1>
					<span className=" flex justify-center font-small text-lg mt-2 mr-96"></span>
				</div>
			</header>

			<div className="h-[800px] w-4/5 pb-5 flex flex-row gap-x-5 mx-auto mt-4 mb-2">
				<div className="h-full w-2/5 flex flex-col  gap-y-3">
					<div className="h-28 w-full px-4 flex flex-col justify-center">
						<label htmlFor="alertTitle">Title</label>
						<input
							type="text"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="peer relative w-full h-[58px] py-1 shadow-md rounded-lg border border-slate-200 px-4 text-md placeholder-transparent outline-none transition-all"
						/>
					</div>
					<div className="h-80 w-full px-4 flex flex-col justify-center">
						<label htmlFor="alertDescription">Description</label>
						<textarea
							type="text"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="peer relative w-full h-80 py-3 shadow-md rounded-lg border border-slate-200 px-4 text-md  placeholder-transparent outline-none transition-all resize-none "
						/>
					</div>
					<div className="h-20 w-full px-4 flex flex-col justify-end">
						<button
							className="h-[52px] w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
							onClick={() => setShowConfirmation(true)}
						>
							Send Alert
						</button>
					</div>
				</div>
				<div className="h-full w-3/5 p-3 py-4 overflow-y-auto">
					{loading ? (
						<p>Loading...</p>
					) : (
						<ul>
							{alerts.length > 0 ? (
								alerts
									.slice()
									.reverse()
									.map((alert, index) => (
										<div
											className="bg-white h-fit w-full p-4 pr-3 border border-gray-200 flex flex-row gap-4 drop-shadow-md my-3"
											key={index}
										>
											<li className="w-full flex flex-row">
												<div className="w-full flex flex-col gap-y-0.5 justify-center">
													<p className="font-bold text-3xl">
														{alert.alertTitle}
													</p>
													<p className="text-md leading-5">
														{alert.alertDescription}
													</p>
													<p className="text-xs text-gray-500 mt-4">
														{formatDateTime(
															alert.alertDate
														)}
													</p>
												</div>
												<div>
													<img
														src="admin/delete-icon.png"
														className="w-5 h-5 mx-1 opacity-20 hover:opacity-100 transition-opacity duration-300"
														onClick={() =>
															handleDeleteConfirmation(
																alert.alertId
															)
														}
													/>
												</div>
											</li>
										</div>
									))
							) : (
								<div className="flex justify-center italic font-semibold text-gray-500 mt-3">
									No Alerts just yet.
								</div>
							)}
						</ul>
					)}
				</div>
			</div>

			<div>
				{editingAlert && (
					<div className="p-5">
						<h2 className="text-2xl font-semibold">Edit Alert</h2>
						<div className="flex">
							<input
								type="text"
								className="mr-2 border border-gray-300 rounded-md p-2"
								placeholder="Title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<input
								type="text"
								className="mr-2 border border-gray-300 rounded-md p-2"
								placeholder="Description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
								onClick={handleEditSubmit}
							>
								Save
							</button>
							<button
								className="bg-gray-400 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-600"
								onClick={() => setEditingAlert(null)}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>

			<div>
				{showConfirmation && (
					<ConfirmationPopup
						message="Are you sure you want to send the alert?"
						onConfirm={handleCreateAlert}
						onCancel={handleCancel}
					/>
				)}
			</div>

			<div>
				{deleteConfirmation && (
					<ConfirmationPopup
						message="Are you sure you want to delete this alert?"
						onConfirm={() => handleDeleteAlert(alertId)}
						onCancel={handleCancel}
					/>
				)}
			</div>
		</div>
	);
}
