import React from "react";
import "../styles/Login.css";

function Register() {
	const [unamefocus, setUnamefocus] = React.useState(false);
	const [namefocus, setNamefocus] = React.useState(false);
	const [passfocus, setPassfocus] = React.useState(false);
	const [cpassfocus, setCpassfocus] = React.useState(false);
	const [emailfocus, setEmailfocus] = React.useState(false);
	const [available, setavailable] = React.useState(true);
	return (
		<div className="register-card">
			<div className="login-title">
				<span className="initial login-txt">S</span>
				<span className="login-txt">ign Up</span>
			</div>

			<div className="register-form">
				<form>
					<div className="form-group">
						<div className="label-wrapper">
							<label
								htmlFor="fullname"
								className={
									namefocus ? `input-label` : `hide-element`
								}
							>
								Full Name
							</label>
						</div>
						<input
							type="text"
							className="form-input"
							id="fullname"
							placeholder="Full Name"
							onFocus={() => setNamefocus(true)}
							onBlur={() => setNamefocus(false)}
						/>
					</div>
					<div className="form-group">
						<div className="label-wrapper">
							<label
								htmlFor="email"
								className={
									emailfocus ? `input-label` : `hide-element`
								}
							>
								Email ID
							</label>
						</div>
						<input
							type="email"
							className="form-input"
							id="email"
							placeholder="Email ID"
							onFocus={() => setEmailfocus(true)}
							onBlur={() => setEmailfocus(false)}
						/>
					</div>
					<div className="form-group">
						<div className="label-wrapper">
							<div>
								<label
									htmlFor="username"
									className={
										unamefocus
											? `input-label`
											: `hide-element`
									}
								>
									Username
								</label>
							</div>
							<div>
								{available && (
									<span
										className={
											unamefocus
												? `available input-label`
												: `hide-element`
										}
									>
										Available
									</span>
								)}
								{!available && (
									<span
										className={
											unamefocus
												? `unavailable input-label`
												: `hide-element`
										}
									>
										Unavailable
									</span>
								)}
							</div>
						</div>
						<input
							type="text"
							className="form-input"
							id="username"
							placeholder="Username"
							onFocus={() => setUnamefocus(true)}
							onBlur={() => setUnamefocus(false)}
						/>
					</div>
					<div className="form-group">
						<div className="label-wrapper">
							<label
								htmlFor="password"
								className={
									passfocus ? `input-label` : `hide-element`
								}
							>
								Password
							</label>
						</div>
						<input
							type="password"
							className="form-input"
							id="password"
							placeholder="Password"
							onFocus={() => setPassfocus(true)}
							onBlur={() => setPassfocus(false)}
						/>
					</div>
					<div className="form-group">
						<div className="label-wrapper">
							<label
								htmlFor="cnfpassword"
								className={
									cpassfocus ? `input-label` : `hide-element`
								}
							>
								Re-enter Password
							</label>
						</div>
						<input
							type="password"
							className="form-input"
							id="cnfpassword"
							placeholder="Confirm Password"
							onFocus={() => setCpassfocus(true)}
							onBlur={() => setCpassfocus(false)}
						/>
					</div>
					<div className="form-group2">
						<label htmlFor="role" className="input-label">
							Register as:
						</label>
						<select id="role" className="form-input-select">
							<option value="user">User</option>
							<option value="lawyer">Lawyer</option>
						</select>
					</div>
					<div className="btn-wrapper">
						<button type="submit" className="btn btn-primary">
							Sign Up
						</button>
					</div>
				</form>
				<div className="login-link">
					<a href="/login" className="links-lc acc-link">
						Already have an account?
					</a>
				</div>
			</div>
		</div>
	);
}

export default Register;
