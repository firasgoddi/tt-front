import React, { useEffect, useContext } from "react";
import CardListItem from "./CardListItem";
import { useHistory } from "react-router-dom";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { UserContext } from "../../context/UserContext";
import { UiContext } from "../../context/UiContext";
import Grid from "@material-ui/core/Grid";
import { maxHeight } from "@mui/system";
import Switch from "@mui/material/Switch";
function SidebarResidusUser(props) {
	const { myCommande, setMyCommande, articles } = props;
	let history = useHistory();
	const { activeUser } = useContext(UserContext);
	const { associations, setAssociations } = useContext(UiContext);
	console.log(associations, "commande");
	const [state, setState] = React.useState({
		right: false,
	});
	function resetList() {
		setMyCommande([]);
	}
	function commander() {
		history.push("/payerResidus/" + myCommande[0].restaurantId);
	}
	let b;
	function showButton() {
		if (myCommande.length === 0) {
			b = (
				<button className="confirmation" disabled>
					Commander
				</button>
			);
		} else b = <button className="confirmation">Commander</button>;
	}
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};
	const images = myCommande.map((el) => el.image);
	const list = (anchor) => (
		<Box
			sx={{ width: "700px", height: "100%", border: "30px solid #f1f1f1" }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<div>
				<span
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "start",
						marginTop: "50px",
						marginLeft: "40px",
						color: "#ff6900",
						fontSize: "5rem",
					}}
				>
					{activeUser.lastName},
				</span>
				<h1
					style={{ marginLeft: "40px", fontWeight: "bold", color: "#484848" }}
				>
					C'est trés gentil de votre part
				</h1>
				<h2
					style={{ marginLeft: "40px", fontWeight: "normal", color: "#968989" }}
				>
					Vous avez choisi de faire un Don!
				</h2>
				<br></br>
				<h2
					style={{ marginLeft: "40px", fontWeight: "normal", color: "#484848" }}
				>
					Votre liste (
					<span style={{ color: "#ff6900" }}> {myCommande.length}</span>)
				</h2>
				<div
					style={{
						display: "flex",
						marginTop: "3rem",
						marginBottom: "5rem",
						marginRight: "50px",
						overflowX: "scroll",
						overflowY: "hidden",
						filter: " drop-shadow(6px 6px 10px rgba(0, 0, 0, 0.05))",
					}}
				>
					{myCommande.map((el) => (
						<div
							style={{
								display: "flex",
								marginRight: "20px",
								height: "50px",
								width: "100",
							}}
						>
							<img
								src={`https://${el.image}`}
								style={{
									paddingRight: "10px",
									marginLeft: "20px",
									width: "50",
								}}
							/>

							<div
								style={{
									display: "flex",
									flexDirection: "column",
									paddingLeft: "0px",
								}}
							>
								<span
									style={{
										fontWeight: "bold",
										color: "#484848",
										fontSize: "1.6rem",
									}}
								>
									{el.name}
								</span>
								<span
									style={{
										fontWeight: "normal",
										fontSize: "1.8rem",
										color: "#ff6900",
									}}
								>
									{el.price}DT
								</span>
							</div>
						</div>
					))}
				</div>
				<h2 style={{ marginLeft: "40px", fontWeight: "500", color: "#484848" }}>
					Choissez une ONG
				</h2>{" "}
				<Grid container spacing={1}>
					{associations.map((el) => (
						<Grid item xl={6}>
							<div
								style={{
									gridTemplateColumns: "1fr 1fr",
									gridGap: "20px",
									paddingRight: "3rem",
									margin: "1rem 0",
									maxHeight: "100",
									maxWidth: "100",
									border: "3px solid  #e8e8e8",
									maxWidth: "250px",
									maxHeight: "250px",
								}}
							>
								<div
									style={{
										background: "white",

										borderRadius: "5px",
									}}
								>
									<img
										src={el.image}
										style={{ width: "50%", marginLeft: "40px" }}
									/>
									<div style={{ marginTop: "5px", marginLeft: "10px" }}>
										<span
											style={{
												fontSize: "1.6rem",
												color: "#484848",
												fontWeight: "bold",
												marginLeft: "30px",
											}}
										>
											{el.name}
										</span>
										<br></br>
										<i
											class="fal fa-map-marker-alt"
											aria-hidden="true"
											style={{
												fontSize: "1.6rem",
												color: "#484848",
												fontWeight: "normal",
												marginLeft: "30px",
												opacity: "0,8",
											}}
										>
											{el.adresse},{el.ville}
										</i>
									</div>
								</div>
							</div>
						</Grid>
					))}
				</Grid>
				<div style={{ display: "flex", alignItems: "center" }}>
					<i
						class="far fa-exclamation-square"
						style={{
							fontSize: "1.4rem",
							color: "#484848",
							opacity: "0.5",
							marginLeft: "40px",
						}}
					>
						Vous pouvez sélectionner une ONG à la fois
					</i>
				</div>
				<br></br>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						border: "3px solid  #e8e8e8",
						marginLeft: "40px",
						marginTop:"50px"
					}}
				>
					<span
						style={{
							fontSize: "1.4rem",
							color: "#484848",

							marginTop: "5px",
							marginBottom: "5px",
						}}
					>
						Acceptez-vous de publier votre action sur notre timeline?
					</span>
					<div style={{ marginLeft: "100px" }}>
						<span>Oui</span>
						<Switch defaultChecked />
						<span>Non</span>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "flex-end",marginTop:"50px" }}>
					<button
						style={{
							fontWeight: "bold",
							fontSize: "1.4rem",
							color: "#ff6900",
							cursor: "pointer",
							outline: "none",
							paddingRight: "30px",
						}}
					>
						Annuler l'opération
					</button>

					<button
						style={{
							fontWeight: "bold",
							fontSize: "1.8rem",
							color: "#ff6900",
							cursor: "pointer",
							outline: "none",
							background: "#fff",
							border: "1px solid #ff6900",
							borderRadius: "5px",
							width: "32rem",
							height: "6rem",
						}}
					>
						Continuer
					</button>
				</div>
			</div>
		</Box>
	);
	return (
		<div className="feed-secondary">
			<div className="my-list">
				<span className="left-side">
					Ma liste (
					<span style={{ color: "#ff6900" }}>
						{myCommande && myCommande.length && myCommande.length}
					</span>
					)
				</span>
				<span className="right-side" onClick={resetList}>
					Supprimer tout
				</span>
			</div>
			<div className="content-list">
				{myCommande.map((article) => (
					<CardListItem
						article={article}
						myCommande={myCommande}
						setMyCommande={setMyCommande}
					/>
				))}
				{myCommande && myCommande.length === 0 ? (
					<button className="confirmation" onClick={commander} disabled>
						Commander
					</button>
				) : (
					<button className="confirmation" onClick={commander}>
						Commander
					</button>
				)}
				{["right"].map((anchor) => (
					<div key={anchor}>
						<button
							style={{
								width: "100%",
								height: "60px",
								borderRadius: "5px",
								background: "white",
								fontWeight: "bold",
								fontSize: "18px",
								color: " #fffff",
								outline: "none",
								cursor: "pointer",
								borderColor: "#ff6900",
							}}
							onClick={toggleDrawer(anchor, true)}
						>
							Faire un Don{" "}
						</button>
						<Drawer
							anchor={anchor}
							open={state[anchor]}
							onClose={toggleDrawer(anchor, false)}
						>
							{list(anchor)}
						</Drawer>
					</div>
				))}
			</div>
		</div>
	);
}

SidebarResidusUser.propTypes = {};

export default SidebarResidusUser;
