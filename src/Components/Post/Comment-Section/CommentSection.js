import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../../../firebase-config";
import { useContext, useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import moment from "moment";
import Comment from "./Comment/Comment";
import { AuthContext } from "../../../context/AuthContext";
import { Row, Col, Container } from "react-bootstrap";
// import { useRouter } from "next/navigation";

export default function CommentSection(props) {
  const authContext = useContext(AuthContext);
  const [commentTxt, setCommentTxt] = useState("");
  const [commentsDisplay, setCommentsDisplay] = useState("");
  const [commentsCount, setCommetsCount] = useState("");
  // const router = useRouter();

  // const fetchComments = async () => {
  //   const currentPost = await getDoc(props.postDoc);
  //   console.log(props.postDoc.id);
  //   const comments = currentPost.data()?.comments;

  //   setCommentsDisplay(
  //     comments?.map((comment, index) => (
  //       <Comment
  //         key={index}
  //         id={index}
  //         postDoc={props.postDoc}
  //         isOptionsBtnActive={comment.commenterId === auth.currentUser.uid}
  //         commenterImg={comment.commenterImg}
  //         commenterName={comment.commenterName}
  //         commentTime={moment(comment.commentTime).fromNow()}
  //         commentTxt={comment.commentTxt}
  //       />
  //     ))
  //   );
  // };
  useEffect(() => {
    onSnapshot(collection(db, "posts"), (querySnapshot) => {
      setCommentsDisplay(
        querySnapshot?.docs
          ?.filter((doc) => doc.id === props.postDoc.id)[0]
          ?.data()
          ?.comments?.map((comment, index) => (
            <Comment
              key={index}
              id={index}
              postDoc={props.postDoc}
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
    // fetchComments();
  }, []);

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
    // const postDoc = doc(db, "posts", props.postId);

    await updateDoc(props.postDoc, comment);
    // setCommetsCount((prev) => (prev = prev + 1));
    setCommentTxt("");
    // window.location.reload();
    // router.refresh();
  }
  return (
    <section className="comment-sect">
      {authContext.isAuth && (
        <form onSubmit={(e) => submitComment(e)}>
          {/* <Container> */}
          {/* <Row className="gx-1 w-100"> */}
          {/* <Col xs="2"> */}
          <div
            className="comment-img"
            style={{
              backgroundImage: `url(${auth.currentUser.photoURL})`,
            }}
            referrerPolicy="no-referrer"
          ></div>
          {/* </Col> */}
          <div
            style={{
              width: "91%",
              display: "flex",
              // flexDirection: "column",
              // alignItems: "flex-end",
              columnGap: ".2rem",
            }}
          >
            {/* <Col> */}
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
            {/* </Col> */}
            {/* <Col xs="2"> */}
            <span
              className="btn btn-outline-primary "
              onClick={(e) => submitComment(e)}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </span>
            {/* </Col> */}
          </div>
          {/* </Row> */}
          {/* </Container> */}
        </form>
      )}
      <section className="comments-list">{commentsDisplay}</section>
    </section>
  );
}
