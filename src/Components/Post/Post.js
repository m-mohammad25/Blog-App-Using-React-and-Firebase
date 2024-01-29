import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEllipsisVertical,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faComment,
  faPenToSquare,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useContext, useEffect, useRef, useState } from "react";
import CommentSection from "./Comment-Section/CommentSection";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Post(props) {
  const postDoc = doc(db, "posts", props.id);
  // postDoc.get().then((x) => console.log(x));
  const authContext = useContext(AuthContext);
  const [isCommentSectionShown, setIsCommentSectionShown] = useState(false);
  const [isOptionsBtnClicked, setIsOptonsBtnClicked] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState(props.inPostLiked);

  const navigate = useNavigate();

  const deletePost = async (e) => {
    // e.stopPropagation();
    await deleteDoc(postDoc);
    isDeletePressed.current = true;
    setDeletedPostsCount((prev) => prev + 1);
  };

  const isDeletePressed = useRef(false);
  const [deletedPostsCount, setDeletedPostsCount] = useState(0);

  useEffect(() => {
    if (isDeletePressed.current) props.onPostDelete();
    isDeletePressed.current = false;
  }, [deletedPostsCount]);

  const LikePost = async (e) => {
    if (!authContext.isAuth) {
      navigate("/login");
      return;
    }
    if (!isPostLiked) {
      await updateDoc(postDoc, { likedBy: arrayUnion(auth.currentUser.uid) });
      setIsPostLiked(true);
    } else {
      await updateDoc(postDoc, { likedBy: arrayRemove(auth.currentUser.uid) });
      setIsPostLiked(false);
    }
  };

  return (
    <div className="post mx-2 mx-sm-0 mb-4 ">
      <header className="post-header">
        <h5 className="title">{props.title}</h5>
        {props.isDeleteBtnActive && (
          <>
            <div
              className="options-btn"
              onClick={() => setIsOptonsBtnClicked((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} className="icon" />
            </div>

            {isOptionsBtnClicked && (
              <div className="options-menu">
                <div className="option delete-btn" onClick={deletePost}>
                  <FontAwesomeIcon icon={faTrash} className="icon" />
                  Delete
                </div>
                <hr />
                <div
                  className="option"
                  onClick={() => navigate(`update-post/${props.id}`)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} className="icon" />
                  Update
                </div>
              </div>
            )}
          </>
        )}
      </header>
      <p className="content">{props.content}</p>
      <footer>
        <h6 className="attrib">
          <div
            referrerPolicy="no-referrer"
            className="comment-img"
            style={{ backgroundImage: `url(${props.authorImg})` }}
          ></div>
          <span>@{props.authorName}</span>
        </h6>

        <div className="btns">
          <button className="me-2" onClick={(e) => LikePost(e)}>
            {!isPostLiked ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeartSolid} style={{ color: "red" }} />
            )}
            Like
          </button>
          <button onClick={() => setIsCommentSectionShown((prev) => !prev)}>
            <FontAwesomeIcon icon={faComment} />
            Comment
          </button>
        </div>
      </footer>

      {isCommentSectionShown && <CommentSection postDoc={postDoc} />}
    </div>
  );
}
