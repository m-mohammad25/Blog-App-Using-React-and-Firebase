import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import OptionsBtn from "../../../OptionsBtn/OptionsBtn";
import CommentUpdate from "./CommentUpdate/CommentUpdate";
import { useState } from "react";

export default function Comment(props) {
  const [isUpdateFormActive, setIsUpdateFormActive] = useState(false);
  const docRef = doc(db, "comments", props.commentId);

  const fetchCommentsDoc = async () => {
    try {
      const docSnap = await getDoc(docRef);
      const { comments } = docSnap.data();
      // console.log(comments);
      return comments;
    } catch (err) {
      console.log(err);
    }
  };

  const updateComment = async (comments) => {
    await updateDoc(docRef, { comments });
  };
  const deleteComment = async () => {
    try {
      const comments = await fetchCommentsDoc();
      comments.splice(props.index, 1);
      await updateComment(comments);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment  d-flex justify-content-between">
      <div
        className="comment-img"
        style={{ backgroundImage: `url(${props.commenterImg})` }}
        referrerPolicy="no-referrer"
      ></div>
      <div className="commenter-info">
        <header className="d-flex justify-content-between w-100">
          <span className="commenter-name">{props.commenterName}</span>
          <span className="comment-date">{props.commentTime}</span>
        </header>
        {!isUpdateFormActive && <p>{props.commentTxt}</p>}
        {isUpdateFormActive && (
          <CommentUpdate
            commentTxt={props.commentTxt}
            commentId={props.commentId}
            commentIndx={props.index}
            postDoc={props.postDoc}
            fetchCommentsDoc={fetchCommentsDoc}
            updateComment={updateComment}
            setIsUpdateFormActive={setIsUpdateFormActive}
          />
        )}
      </div>

      {props.isOptionsBtnActive && !isUpdateFormActive && (
        <OptionsBtn
          onDelete={() => deleteComment()}
          onUpdate={() => setIsUpdateFormActive(true)}
        />
      )}
    </div>
  );
}
