import { filter } from "lodash";
import {
    STORE_COMMENTS,
    STORE_CHARACTERS,
    STORE_BOOKS,
    SET_SELECTED_BOOK,
    ADD_COMMENT,
    FILTER_BY_GENDER,
    SORT_CHARACTERS,
    SET_SORT,
    SET_DIRECTION_OF_SORT,
    SET_ERROR_MESSAGE
} from "../action/action";

const defaultState = {
    books: [],
    comments: [],
    characters: {},
    selectedBook: [],
    derivedCharacters: [],
    sort: "",
    sortDirection: "",
    errorMessage: ""
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case STORE_BOOKS: {
            return { ...state, books: action.payload };
        }

        case SET_SELECTED_BOOK: {
            const book = state.books.find(book => book.url === action.payload);

            return { ...state, selectedBook: book };
        }

        case STORE_COMMENTS: {
            return { ...state, comments: action.payload };
        }

        case ADD_COMMENT: {
            const updatedComments = [action.payload, ...state.comments];
            return { ...state, comments: updatedComments };
        }

        case SET_ERROR_MESSAGE: {
            return { ...state, errorMessage: action.payload };
        }

        case STORE_CHARACTERS: {
            return { ...state, characters: action.payload };
        }

        case FILTER_BY_GENDER: {
            const result = state.characters[action.payload.id].filter(
                character => {
                    if (character.gender) {
                        return (
                            character.gender.toLowerCase() ===
                            action.payload.gender
                        );
                    }
                }
            );

            return { ...state, derivedCharacters: result };
        }

        case SORT_CHARACTERS: {
            let result = [];
            const { id, value, direction } = action.payload;

            if (value === "gender" && state.characters[id]) {
                const validGender = state.characters[id].filter(character => {
                    return character.gender;
                });

                const male = filterGender(validGender, "male");
                const female = filterGender(validGender, "female");

                if (direction === "asc") {
                    result = [...female, ...male];
                } else {
                    result = [...male, ...female];
                }
            }

            if (value === "name" && state.characters[id]) {
                const validNames = state.characters[id].filter(character => {
                    return character.name;
                });

                function compareAsc(a, b) {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                }

                function compareDesc(a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (a.name < b.name) {
                        return 1;
                    }
                    return 0;
                }

                if (direction === "asc") {
                    result = validNames.sort(compareAsc);
                } else {
                    result = validNames.sort(compareDesc);
                }
            }

            if (value === "age" && state.characters[id]) {
                const withValidAge = state.characters[id].filter(character => {
                    let { born, died } = character;
                    born = born.match(/(\d+)/);
                    died = died.match(/(\d+)/);
                    if (born && died) return true;
                });

                const customCharacters = withValidAge.map(character => {
                    let { born, died } = character;
                    born = born.match(/(\d+)/)[0];
                    died = died.match(/(\d+)/)[0];
                    character["age"] = parseInt(died) - parseInt(born);
                    return character;
                });

                function compareAsc(a, b) {
                    if (a.age < b.age) {
                        return -1;
                    }
                    if (a.age > b.age) {
                        return 1;
                    }
                    return 0;
                }

                function compareDesc(a, b) {
                    if (a.age > b.age) {
                        return -1;
                    }
                    if (a.age < b.age) {
                        return 1;
                    }
                    return 0;
                }

                if (direction === "asc") {
                    result = customCharacters.sort(compareAsc);
                } else {
                    result = customCharacters.sort(compareDesc);
                }
            }

            return { ...state, derivedCharacters: result };
        }

        case SET_SORT: {
            return { ...state, sort: action.payload };
        }

        case SET_DIRECTION_OF_SORT: {
            return { ...state, sortDirection: action.payload };
        }

        default:
            return state;
    }
};

const filterGender = (arr, value) => {
    return arr.filter(
        character => character.gender.toLowerCase() === `${value}`
    );
};
