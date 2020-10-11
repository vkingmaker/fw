import React, { useState } from "react";
import { useDispatch } from "react-redux";

import CommentCard from "./Comment-card";
import { addComment, setErrorMessage } from '../redux/action/action-creators';

const Comment = ({ comments, bookId }) => {
    const [userComment, setUserComment] = useState("");
    const dispatch = useDispatch();

    const addCommentHandler = async () => {
        if (userComment !== "") {
            try {
                const { data } = await axios.post("/api/comments", {
                    bookId,
                    body: userComment
                });

                setUserComment('');
                dispatch(addComment(data));
            } catch (e) {
                dispatch(setErrorMessage(`An Error has occurred: ${e.response.data.body[0]}`));
            }
        }
    };

    return (
        <>
            <div className="mt-5 d-flex flex-column">
                <div className="form-group">
                    <label htmlFor="comment">Post a comment:</label>
                    <textarea
                        className="form-control"
                        id="comment"
                        rows="2"
                        value={userComment}
                        onChange={e => {
                            setUserComment(e.target.value);
                        }}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary align-self-end"
                    onClick={addCommentHandler}
                    disabled={userComment === ""}
                >
                    Submit
                </button>
            </div>
            <div className="mt-5">
                <h3 className="mt-5 mb-4">Comments</h3>
                {comments.length ? (
                    comments.map(comment => {
                        return (
                            <CommentCard key={comment.id} comment={comment} />
                        );
                    })
                ) : (
                    <span>No comments yet</span>
                )}
            </div>
        </>
    );
};

export default Comment;
