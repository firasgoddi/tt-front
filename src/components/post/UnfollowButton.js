import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import avatar from "../../../src/assets/img/svg/unfollow.svg";
import Grid from "@material-ui/core/Grid";
import { UserContext } from "../../context/UserContext";
import  "./unfollow.css";
function UnfollowButton(props) {
	const userId = props.user.userId;
	console.log("userId", userId);
	const { unfollowUser, following } = useContext(UserContext);
	const followerId = props.post.userId;
	console.log(followerId);

	const restoId = props.post.restoId;
	return (
		<div className="user-who-post-options" button>
			<div className="followed">
				<i className="icon-checked" />
				<span>Déjà suivi</span>
			</div>
			<PopupState variant="popover" popupId="demo-popup-popover">
				{(popupState) => (
					<div>
						<div className="more-options">
							<i
								className="icon-dots-horizontal"
								style={{ maxWidth: 30 }}
								{...bindTrigger(popupState)}
							/>
						</div>
						<Popover
							{...bindPopover(popupState)}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "center",
							}}
						>
							<Box style={{ height: 95, width: 95 }}>
								<Grid container direction="row">
									<Grid item xs={4}>
										<img
											src={avatar}
											style={{
												borderRadius: "50%",
												height: 20,
												width: 20,
												marginTop: 5,
												marginLeft: 10,
												marginButtom: 10,
											}}
										/>
									</Grid>

									<Grid item xs={8}>
										<Typography
											style={{ fontSize: 14, marginTop: 5, marginButtom: 10,cursor:"pointer"}}
											button
											onClick={() => unfollowUser(followerId)}
										>
											Unfollow
										</Typography>
										<Typography
											style={{
												fontSize: 14,
												marginTop: 5,
												marginButtom: 10,
											}}
										>
											Masquer
										</Typography>
										<Typography
											style={{
												fontSize: 14,
												marginTop: 5,
												marginButtom: 10,
											}}
										>
											Signaler
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Popover>
					</div>
				)}
			</PopupState>
		</div>
	);
}

UnfollowButton.propTypes = {};

export default UnfollowButton;
