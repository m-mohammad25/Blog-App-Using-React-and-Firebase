import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../../firebase-config";
import { useContext, useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import Comment from "./Comment/Comment";
import { AuthContext } from "../../../context/AuthContext";

export default function CommentSection(props) {
  const authContext = useContext(AuthContext);
  const [commentTxt, setCommentTxt] = useState("");
  const [commentsDisplay, setCommentsDisplay] = useState("");
  const [commentId, setCommentId] = useState("");
  const q = query(
    collection(db, "comments"),
    where("postId", "==", props.postId)
  );
  const getCommentId = async () => {
    const querySnapshot = await getDocs(q);
    setCommentId(querySnapshot.docs[0]?.id);
  };
  useEffect(() => {
    getCommentId();
  }, []);

  useEffect(() => {
    if (!commentId) return;
    onSnapshot(q, (querySnapshot) => {
      setCommentsDisplay(
        querySnapshot.docs[0]
          ?.data()
          ?.comments?.map((comment, index) => (
            <Comment
              key={index}
              index={index}
              commentId={commentId}
              isOptionsBtnActive={
                comment.commenterId === auth?.currentUser.uid &&
                authContext.isAuth === true
              }
              commenterImg={comment.commenterImg}
              commenterName={comment.commenterName}
              commentTime={moment(comment.commentTime).fromNow()}
              commentTxt={comment.commentTxt}
            />
          ))
      );
    });
  }, [commentId]);

  async function submitComment(e) {
    e.preventDefault();
    if (commentTxt === "") return;
    const comment = {
      comments: arrayUnion({
        commenterId: auth.currentUser.uid,
        commenterName: auth.currentUser.displayName,
        commenterImg: auth.currentUser.photoURL,
        commentTxt,
        commentTime: moment().toISOString(),
      }),
    };
    await updateDoc(doc(db, "comments", commentId), comment);
    setCommentTxt("");
  }

  return (
    <section className="comment-sect">
      {authContext.isAuth && (
        <form onSubmit={(e) => submitComment(e)}>
          <div
            className="comment-img"
            style={{
              backgroundImage: `url(${auth.currentUser.photoURL})`,
            }}
            referrerPolicy="no-referrer"
          ></div>
          <div
            style={{
              width: "91%",
              display: "flex",

              columnGap: ".2rem",
            }}
          >
            <input
              type="text"
              id="comment-txt"
              name="comment-txt"
              placeholder="write a comment"
              value={commentTxt}
              onChange={(e) => {
                setCommentTxt(e.target.value);
              }}
            />
            <span
              className="btn btn-outline-primary "
              onClick={(e) => submitComment(e)}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
          </div>
        </form>
      )}
      <section className="comments-list">{commentsDisplay}</section>
    </section>
  );
}
