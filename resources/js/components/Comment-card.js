import React from "react";

const CommentCard = ({ comment: { body } }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex">
                <figure className="comment-profile-pic">
                    <img src="/images/profile-pic.jpeg" />
                </figure>
                <div>
                    <p>{body}</p>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
