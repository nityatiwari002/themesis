import React, { useState } from "react";
import "../styles/Login.css";
function Login() {
	const [unamefocus, setUnamefocus] = useState(false);
	const [passfocus, setPassfocus] = useState(false);
	return (
		<div className="login-card">
			<div className="login-title">
				<span className="initial login-txt">L</span>
				<span className="login-txt">ogin</span>
			</div>

			<div className="login-form">
				<form>
					<div className="form-group">
						<div className="label-wrapper">
							<label
								htmlFor="username"
								className={
									unamefocus ? `input-label` : `hide-element`
								}
							>
								Email ID / Username
							</label>
						</div>
						<input
							type="text"
							className="form-input"
							id="username"
							placeholder="Email ID / Username"
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
					<div className="form-group2">
						<div>
							<input type="checkbox" id="remember" />
							<label
								htmlFor="remember"
								className="input-label check-box"
							>
								Remember me
							</label>
						</div>
						<div>
							<a
								href="/forgot-password"
								className="links-lc input-label"
							>
								Forgot Password?
							</a>
						</div>
					</div>
					<div className="btn-wrapper">
						<button type="submit" className="btn btn-primary">
							Login
						</button>
					</div>
				</form>
				<div className="login-link">
					<a href="/sign-up" className="links-lc forgot-link">Don't have an account?</a>
				</div>
			</div>
		</div>
	);
}

export default Login;
