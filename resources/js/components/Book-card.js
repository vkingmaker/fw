import React from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setSelectedBook } from '../redux/action/action-creators';

const BookCard = ({
    book: { name, url, comments_count, authors, numberOfPages, publisher }, updatedCommentCount
}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const bookDetailsHandler = () => {
        const id = url.split('/').reverse()[0];
        dispatch(setSelectedBook(url));
        history.push(`/book/${id}`);
    }

    return (
    <div className="card book-card" onClick={bookDetailsHandler}>
        <div className="card-body d-flex flex-column">
            <figure className="book-cover align-self-center">
                <img src="/images/book-details.jpg" />
            </figure>
            <h5 className="card-title my-3"><span className="font-weight-bold">{name}</span></h5>
            <p className="mt-auto">
                <span><span className="font-weight-bold">Author:</span> {authors.join(", ")}</span> |{" "}
                <span><span className="font-weight-bold">Publisher:</span> {publisher}</span> |{" "}
                <span><span className="font-weight-bold">{numberOfPages}</span> pages</span>
            </p>
            <span><span className="font-weight-bold">{updatedCommentCount? updatedCommentCount : comments_count}</span> comment(s)</span>
        </div>
    </div>
    );
};

export default BookCard;
