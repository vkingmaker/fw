import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CharacterCard from "./Character-card";
import Comment from "./Comment";
import BookCard from "./Book-card";
import {
    storeComments,
    storeCharacters,
    filterByGender,
    sortCharacter,
    setSort,
    setSortDirection,
    setErrorMessage
} from "../redux/action/action-creators";

const BookDetails = () => {
    const dispatch = useDispatch();
    const book = useSelector(state => state.data.selectedBook);
    const comments = useSelector(state => state.data.comments);
    const id = book.url.split("/").reverse()[0];
    const characters = useSelector(state => state.data.characters[id]);
    const derivedCharacters = useSelector(
        state => state.data.derivedCharacters
    );
    const sort = useSelector(state => state.data.sort);
    const direction = useSelector(state => state.data.sortDirection);

    const fetchComments = async () => {
        try {
            const { data } = await axios(`/api/books/${id}/comments`);
            dispatch(storeComments(data));
        } catch (e) {
            dispatch(setErrorMessage(`An error has occurred: ${e.message}`));
        }
    };

    const fetchCharacters = async () => {
        try {
            const promises = book.characters.map(url =>
                fetch(url).then(response => response.json())
            );
            const data = await Promise.all(promises);
            dispatch(storeCharacters({ [`${id}`]: data }));
        } catch (e) {
            dispatch(setErrorMessage(`An error has occurred: ${e.message}`));
        }
    };

    const filterByGenderHandler = e => {
        dispatch(filterByGender(e.target.value, id));
    };

    const sortHandler = e => {
        dispatch(setSort(e.target.value));
    };

    const directionHandler = e => {
        dispatch(setSortDirection(e.target.value));
    };

    useEffect(() => {
        if (sort !== "" && direction !== "") {
            dispatch(sortCharacter(id, sort, direction));
        }
    }, [sort, direction]);

    useEffect(() => {
        fetchComments();
        fetchCharacters();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-8">
                    <div className="row justify-content-center my-4">
                        <div className="col-8">
                            <BookCard
                                book={book}
                                updatedCommentCount={comments.length}
                            />
                        </div>
                    </div>

                    <div className="row justify-content-center my-4">
                        <div className="col-8">
                            <Comment comments={comments} bookId={id} />
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="sort">Sort by:</label>
                                <select
                                    className="form-control"
                                    id="sort"
                                    onChange={sortHandler}
                                >
                                    <option></option>
                                    <option value="age">Age</option>
                                    <option value="gender">Gender</option>
                                    <option value="name">Name</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="direction">Direction</label>
                                <select
                                    className="form-control"
                                    id="direction"
                                    onChange={directionHandler}
                                >
                                    <option></option>
                                    <option value="asc">Asc</option>
                                    <option value="desc">Desc</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label htmlFor="filter">
                                    Filter by gender:
                                </label>
                                <select
                                    className="form-control"
                                    id="filter"
                                    onChange={filterByGenderHandler}
                                >
                                    <option></option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {derivedCharacters.length == 0 ? (
                        characters ? (
                            characters.map((character, idx) => {
                                return (
                                    <CharacterCard
                                        key={idx}
                                        character={character}
                                    />
                                );
                            })
                        ) : (
                            <span className="font-weight-bold">
                                Loading Characters...
                            </span>
                        )
                    ) : (
                        derivedCharacters.map((character, idx) => {
                            return (
                                <CharacterCard
                                    key={idx}
                                    character={character}
                                />
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
