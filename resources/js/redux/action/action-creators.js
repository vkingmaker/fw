import {
    STORE_BOOKS,
    STORE_CHARACTERS,
    STORE_COMMENTS,
    SET_SELECTED_BOOK,
    ADD_COMMENT,
    FILTER_BY_GENDER,
    SORT_CHARACTERS,
    SET_SORT,
    SET_DIRECTION_OF_SORT,
    SET_ERROR_MESSAGE
} from "./action";

export const storeBooks = payload => {
    return { type: STORE_BOOKS, payload };
};

export const setSelectedBook = url => {
    return { type: SET_SELECTED_BOOK, payload: url };
};

export const storeComments = payload => {
    return { type: STORE_COMMENTS, payload };
};

export const addComment = (payload) => {
    return { type: ADD_COMMENT, payload }
}

export const storeCharacters = (payload) => {
    return { type: STORE_CHARACTERS, payload }
}

export const filterByGender = (gender, id) => {
    return { type: FILTER_BY_GENDER, payload: { gender, id }}
}

export const sortCharacter = (id, value, direction) => {
    return { type: SORT_CHARACTERS, payload: { id, value, direction  }}
}

export const setSort = (value) => {
    return { type: SET_SORT, payload: value};
}

export const setSortDirection = (value) => {
    return { type: SET_DIRECTION_OF_SORT, payload: value }
}

export const setErrorMessage = (msg) => {
    return { type: SET_ERROR_MESSAGE, payload: msg }
}
