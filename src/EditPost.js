import  { useEffect, useState} from "react";
import { Link, useLocation, useParams,useNavigate  } from "react-router-dom";

const EditPost = ({ posts, handleEdit, setPosts }) => {
    const { id } = useParams();
    const { state } = useLocation();
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const [isEdit, setEdit] = useState(false);

  const navigate = useNavigate()


    const post = posts && posts.find((p) => p.id.toString() === id.toString());

    const handleSubmit = () => {
        const updatedPosts = posts.map((p) =>
            p.id.toString() === id.toString() ? { ...p, title: editTitle, body: editBody } : p
        );

        setPosts(updatedPosts);
        setEditTitle('')
        setEditBody('')
        navigate('/')
        // Perform any other actions needed on post update

        // Redirect or navigate back after submission
        // You may use the useHistory hook from react-router-dom for this purpose
    };

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post]);

    useEffect(() => {
        if (state && state.post) {
            setEdit(true);
            setEditTitle(state.post.title);
            setEditBody(state.post.body);
        } else {
            setEdit(false);
        }
    }, [state]);

    return (
        <main className="NewPost">
            {isEdit ? (
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Body:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="button" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, That's Disappointing</p>
                    <Link to="/">Visit Our HomePage</Link>
                </>
            )}
        </main>
    );
};

export default EditPost;
