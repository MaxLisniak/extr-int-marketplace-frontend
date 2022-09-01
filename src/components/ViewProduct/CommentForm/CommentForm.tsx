import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchComments } from "../../../features/product/thunks";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import "./CommentForm.scss";

const CommentForm = () => {

  const dispatch = useAppDispatch();
  const [text, setText] = useState("");
  const productId = useAppSelector(state => state.product.product.id);
  const userId = useAppSelector(state => state.user.userId);
  const axiosAuth = useAxiosPrivate();

  if (userId)
    return (
      <form className="comment-form" onSubmit={async (e) => {
        e.preventDefault()

        console.log(axiosAuth);
        const response = await axiosAuth.post('comments', {
          product_id: productId,
          text,
          created: new Date().toISOString().slice(0, 19).replace('T', ' '),
          user_id: userId,
        })
        dispatch(fetchComments(productId))
      }}
      >
        <textarea
          name="comment"
          id="comment"
          value={text}
          onChange={(e) => { setText(e.target.value) }}
        >
        </textarea>
        <button>Publish</button>
      </form>
    )
  else return null;
}

export default CommentForm;