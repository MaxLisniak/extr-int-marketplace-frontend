import { Comment } from "../../../features/types";
import "./CommentItem.scss";
import AvatarIcon from "./assets/avatar.png";

const CommentItem = (props: { comment: Comment }) => {

  return (
    <div className="comment">
      <div className="info-box">
        <img src={AvatarIcon} alt="avatar" />
        <p>{props.comment.user ? props.comment.user?.first_name : "Deleted user"}</p>
        <p>{new Date(props.comment.created).toDateString()}</p>
        <p>{new Date(props.comment.created).toLocaleTimeString()}</p>

      </div>
      <div className="comment-box">
        {props.comment.text}
      </div>
    </div>
  )
}

export default CommentItem;