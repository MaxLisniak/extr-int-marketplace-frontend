import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../app/hooks";
import { axiosPrivate } from "../../axios/axios";
import { setAccessToken, setUser } from "../../features/user/userSlice";
import "../SignUp/Sign.scss";

const SignIn = () => {

	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const navigate = useNavigate();

	// clear errors when user unputs are changed
	useEffect(() => {
		setErrors([]);
	}, [email, password])

	// handle sign in
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await axiosPrivate.post(
				'/users/sign-in',
				{
					email: email,
					password: password,
				}
			);
			const accessToken = response.data.accessToken;
			const user = response.data.loggedUser;

			dispatch(setUser(user))
			dispatch(setAccessToken(accessToken));
			navigate("/");
		} catch (error: any) {
			console.error(error);
			if (!error?.response?.data) {
				setErrors(["No server response", ...errors]);
			} else {
				const errorList = error.response.data.errors;
				if (errorList.length > 0) {
					setErrors([...errors, ...errorList.map((errorObj: any) => errorObj.msg)]);
				} else {
					setErrors(["Signing in failed", ...errors]);
				}
			}
		}
	}

	return (
		<div className="container-sign">

			<div className="auth-form-container">
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit} className="auth-form">
					<div className="input-field">
						<label htmlFor="email">Email</label>

						<input
							type="text"
							placeholder="Enter email"
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
						/>
					</div>
					<div className="input-field">

						<label htmlFor="password">Password</label>
						<input
							type="password"
							placeholder="Enter password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
					</div>

					{
						errors.length > 0 ?
							(
								<ul>
									{
										errors.map((error, i) => {
											return <li key={i} className="error-message"><p>{error}</p></li>
										})
									}
								</ul>
							)
							: <></>
					}
					<div className="input-field">
						<button
						>Continue</button>
					</div>
				</form>
			</div>
		</div>

	)
}

export default SignIn;