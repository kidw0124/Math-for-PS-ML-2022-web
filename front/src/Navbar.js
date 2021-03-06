import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ user, logout }) {
	return (
		<div className="Navbar">
			<div id="Navbar-title">
				<Link id="navbar-logo" to="/">
					<img id="navbar-logo-img" src="/cube.png" alt="logo" />
				</Link>
			</div>
			<div id="Navbar-menu">
				<Link to="/problems" className="Navbar-menu-item">
					<div className="Navbar-menu-item-title">Problems</div>
				</Link>
				<Link to="/contests" className="Navbar-menu-item">
					<div className="Navbar-menu-item-title">Contest</div>
				</Link>
				<Link to="/rank" className="Navbar-menu-item">
					<div className="Navbar-menu-item-title">Rank</div>
				</Link>
			</div>
			<div id="Navbar-menu-right">
				<div>
					<div className="Navbar-menu-item">
						<div className="Navbar-menu-item-title" onClick={logout}>
							๋ก๊ทธ์์
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
