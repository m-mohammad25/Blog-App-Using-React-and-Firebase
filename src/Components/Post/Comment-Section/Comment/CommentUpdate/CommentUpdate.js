import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CommentUpdate(props) {
  const [commentTxt, setCommentTxt] = useState(props.commentTxt);
  const updateComment = async () => {
    if (commentTxt === "") return;
    try {
      const comments = await props.fetchCommentsDoc();
      comments[props.commentIndx].commentTxt = commentTxt;

      await props.updateComment(comments);
      setCommentTxt("");
    } catch (err) {
      console.log(err);
    } finally {
      props.setIsUpdateFormActive(false);
    }
  };
  return (
    <form
      className="comment-update-form w-100"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="h-100 w-100"
        value={commentTxt}
        onChange={(e) => setCommentTxt(e.target.value)}
      />
      <span
        className="btn btn-outline-danger "
        onClick={(e) => props.setIsUpdateFormActive(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </span>
      <span
        className="btn btn-outline-primary "
        onClick={(e) => updateComment()}
      >
        <FontAwesomeIcon icon={faPaperPlane} />
      </span>
    </form>
  );
}
