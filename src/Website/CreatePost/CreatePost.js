import { useState } from "react";
import Header from "../../Components/Header/Header";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router";
import ReactTextareaAutosize from "react-textarea-autosize";

export default function CreatePost() {
  const [createPostForm, setCreatePostForm] = useState({
    title: "",
    content: "",
  });

  function handleFormChange(e) {
    setCreatePostForm({ ...createPostForm, [e.target.name]: e.target.value });
  }

  const postsCollectionRef = collection(db, "posts");
  const CommentsCollectionRef = collection(db, "comments");
  const navigate = useNavigate();
  async function submitPostData(e) {
    e.preventDefault();
    const postRef = await addDoc(postsCollectionRef, {
      title: createPostForm.title.trim(),
      content: createPostForm.content.trim(),
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        img: auth.currentUser.photoURL,
      },
    });

    await addDoc(CommentsCollectionRef, {
      postId: postRef.id,
      comments: [],
    });
    navigate("/");
  }
  return (
    <>
      <Header />
      <div className="create-post-page">
        <form className="post-form">
          <h3 className="form-title">Create A Post</h3>
          <div className="input-wrapper">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title..."
              value={createPostForm.title}
              onChange={handleFormChange}
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="content">Post</label>
            {/* <textarea
              id="content"
              placeholder="Post..."
              name="content"
              value={createPostForm.content}
              onChange={handleFormChange}
            ></textarea> */}
            <ReactTextareaAutosize
              maxRows={15}
              id="content"
              placeholder="Post..."
              name="content"
              value={createPostForm.content}
              onChange={handleFormChange}
            />
          </div>
          <button className="submit" onClick={submitPostData}>
            Submit Post
          </button>
        </form>
      </div>
    </>
  );
}
