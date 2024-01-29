import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { db, auth } from "../../firebase-config";
import { collection, doc, getDocs } from "firebase/firestore";

import Post from "../../Components/Post/Post";
import { Container, Row, Col } from "react-bootstrap";
import Cookies from "universal-cookie";
import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db, "posts");
  const authContext = useContext(AuthContext);
  const cookie = new Cookies();
  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef);
    setPosts(
      data.docs.map((doc, index) => ({ ...doc.data(), id: doc.id, key: index }))
    );
  };

  useEffect(() => {
    authContext.setIsAuth(cookie.get("isAuth"));
    getPosts();
  }, []);

  const postsDisplay = posts.map((post, index) => {
    // console.log(post);
    const isPostAuthor =
      authContext.isAuth === true && post.author.id === auth.currentUser.uid;
    const isPostLiked =
      authContext.isAuth === true &&
      post.likedBy?.includes(auth.currentUser.uid);
    // console.log(auth.currentUser.displayName);
    return (
      <Col
        key={index}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <Post
          id={post.id}
          key={index}
          title={post.title}
          content={post.content}
          authorImg={post.author.img}
          authorName={post.author.name}
          isDeleteBtnActive={isPostAuthor}
          onPostDelete={getPosts}
          inPostLiked={isPostLiked}
        />
      </Col>
    );
  });
  return (
    <>
      <Header />
      <div className="home-page ">
        <Container>
          <Row className="flex-column">
            {/* <Col className="d-flex flex-column justify-content-center align-items-center"> */}
            {postsDisplay}
            {/* </Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
}
