import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import BookCard from "./Book-card";
import { storeBooks } from '../redux/action/action-creators';

const Home = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.data.books);

    useEffect(() => {
        fetch('/api/books').then(res => res.json()).then(data => {
            dispatch(storeBooks(data));
        });
    }, []);


    if(books.length === 0) return (<span className="loading">Loading...</span>);

    return (
        <>
            <div className="container">
                <div className="row">
                    {books.map(book => {
                        return <div key={book.isbn} className="col-lg-3 col-md-6 d-flex mb-1"><BookCard book={book} /></div>;
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
