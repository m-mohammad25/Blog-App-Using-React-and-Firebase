import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import {
  addDoc,
  collection,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate, useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function UpdatePost() {
  const [updatePostForm, setUpdatePostForm] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const postsCollectionRef = collection(db, "posts");
  const docRef = doc(db, "posts", id);

  function handleFormChange(e) {
    setUpdatePostForm({ ...updatePostForm, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    async function fetchPost() {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUpdatePostForm({
          title: docSnap.data().title,
          content: docSnap.data().content,
        });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    fetchPost();
  }, []);

  async function submitPostData(e) {
    e.preventDefault();
    await updateDoc(docRef, {
      title: updatePostForm.title.trim(),
      content: updatePostForm.content.trim(),
      author: { id: auth.currentUser.uid, name: auth.currentUser.displayName },
    });
    navigate("/");
  }
  return (
    <>
      <Header />
      <div className="create-post-page">
        <form className="post-form">
          <h3 className="form-title">Update Post</h3>
          <div className="input-wrapper">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title..."
              value={updatePostForm.title}
              onChange={handleFormChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="content">Post</label>
            {/* <textarea
              id="content"
              placeholder="Post..."
              name="content"
              value={updatePostForm.content}
              onChange={handleFormChange}
            ></textarea> */}
            <ReactTextareaAutosize
              maxRows={15}
              id="content"
              placeholder="Post..."
              name="content"
              value={updatePostForm.content}
              onChange={handleFormChange}
            />
          </div>
          <button className="submit" onClick={submitPostData}>
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}
