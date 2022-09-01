import { useEffect, useState } from "react";
import { axiosPrivate } from "../../axios/axios";
import { configuredAxios } from "../../axios/axios";

const SignUp = () => {

	const [email, setEmail] = useState('');
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState('');
	const [confPassword, setConfPassword] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [success, setSuccess] = useState(false);

	// clear errors when user unputs are changed
	useEffect(() => {
		setErrors([]);
	}, [email, firstName, lastName, password, confPassword])

	// handle sign up
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			await configuredAxios.post(
				'/users/sign-up',
				{
					email,
					first_name: firstName,
					last_name: lastName,
					password,
					confPassword,
				}
			);
			setSuccess(true);
			setErrors([]);
		} catch (error: any) {
			console.error(error);
			setSuccess(false);
			if (!error?.response?.data) {
				setErrors(["No server response", ...errors]);
			} else {
				const errorList = error.response.data.errors;
				if (errorList.length > 0) {
					setErrors([...errors, ...errorList.map((errorObj: any) => errorObj.msg)]);
				} else {
					setErrors(["Signing up failed", ...errors]);
				}
			}
		}
	}

	const successScreen = (
		<h1>Registration successul. Please <a href="/users/sign-in">sign in</a></h1>
	)

	return (
		success === true ? successScreen : (
			<div className="auth-form-container">
				<h1>Sign up</h1>
				<form onSubmit={handleSubmit} className="form auth-form">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						placeholder="Enter email"
						id="email"
						className="form-element-blue form-input"
						onChange={(e: any) => setEmail(e.target.value)}
						value={email}
						required
					/>
					<label htmlFor="first-name">First name</label>
					<input
						type="text"
						placeholder="Enter first name"
						id="first-name"
						className="form-element-blue form-input"
						onChange={(e: any) => setFirstName(e.target.value)}
						value={firstName}
						required
					/>
					<label htmlFor="last-name">Last name</label>
					<input
						type="text"
						placeholder="Enter last name"
						id="last-name"
						className="form-element-blue form-input"
						onChange={(e: any) => setLastName(e.target.value)}
						value={lastName}
						required
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						placeholder="Enter password"
						id="password"
						className="form-element-blue"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
					/>
					<label htmlFor="confPassword">Password Confirmation</label>
					<input
						type="password"
						placeholder="Enter password confirmation"
						id="confPassword"
						className="form-element-blue"
						onChange={(e) => setConfPassword(e.target.value)}
						value={confPassword}
						required
					/>

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
					<input
						type="submit"
						className="form-element-blue"
					/>
				</form>
			</div>
		)

	)
}

export default SignUp;