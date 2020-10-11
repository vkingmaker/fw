import React from "react";

const CharacterCard = ({ character }) => {
    const { name, gender, aliases, born, died } = character;

    return (
        <div className="container my-4">
            <div className="row d-flex justify-content-center">
                <div className="col-10">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title font-weight-bold">{name ? name: 'Anonymous'}</h5>
                            <p>
                                <span className="d-block"><span className="font-weight-bold">Gender:</span> {gender}</span>
                                <span className="d-block"><span className="font-weight-bold">Born:</span> {born ? born : 'Not given'}</span>
                                <span className="d-block"><span className="font-weight-bold">Died:</span> {died ? died: 'Not given'}</span>
                                {aliases[0] !== "" && <span className="d-block"><span className="font-weight-bold">Aliases:</span> {aliases.join(', ')}</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterCard;
