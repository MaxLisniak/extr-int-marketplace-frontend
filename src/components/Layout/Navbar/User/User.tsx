import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import AvatarIcon from "./asssets/avatar.png";
import "./User.scss";
import { Link } from "react-router-dom";
import { axiosPrivate } from "../../../../axios/axios";
import { setAccessToken, setUser } from "../../../../features/user/userSlice";

const User = () => {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector(state => state.user.firstName);
  const [clicked, setClicked] = useState(false);

  const signOut = async () => {
    try {
      await axiosPrivate.post('users/sign-out');
      dispatch(setUser({}));
      dispatch(setAccessToken(undefined));
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <div
        className="user"
        onClick={() => setClicked(!clicked)}
      >
        <img src={AvatarIcon} alt="avatar" />
      </div>
      <div className="user-box" style={{ display: clicked ? "flex" : "none" }}>
        {firstName ? <b>{firstName}</b> : <b>Anonymous</b>}
        <div className="links">
          {!firstName ?
            (
              <>
                <Link
                  onClick={() => setClicked(false)}
                  to={"users/sign-in"}
                  style={{ textDecoration: "none", color: "black" }}
                ><i>Sign in</i></Link>
                <Link
                  onClick={() => setClicked(false)}
                  to={"users/sign-up"}
                  style={{ textDecoration: "none", color: "black" }}
                ><i>Sign up</i></Link>
              </>
            ) :
            <i
              onClick={() => signOut()}
            >Sign out</i>
          }
        </div>
      </div>
    </div>
  )
}

export default User;