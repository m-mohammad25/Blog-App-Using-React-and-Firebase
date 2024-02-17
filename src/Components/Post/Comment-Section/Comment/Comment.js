import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import OptionsBtn from "../../../OptionsBtn/OptionsBtn";
import CommentUpdate from "./CommentUpdate/CommentUpdate";
import { useState } from "react";

export default function Comment(props) {
  const [isUpdateFormActive, setIsUpdateFormActive] = useState(false);
  const deleteComment = async () => {
    try {
      console.log(props.commentId);
      const docRef = doc(db, "comments", props.commentId);
      const docSnap = await getDoc(docRef);
      const { comments } = docSnap.data();
      comments.splice(props.index, 1);
      await updateDoc(docRef, { comments });
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
            commentId={props.id}
            postDoc={props.postDoc}
            setIsUpdateFormActive={setIsUpdateFormActive}
          />
        )}
      </div>
      {/* <div className="d-flex flex-column justify-content-between"> */}
      {/* <button>dd</button> */}
      {/* </div> */}

      {props.isOptionsBtnActive && !isUpdateFormActive && (
        <OptionsBtn
          onDelete={() => deleteComment()}
          onUpdate={() => setIsUpdateFormActive(true)}
        />
      )}
    </div>
  );
}
