import React from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data/cases';

const DeepDive = () => {
    const { id1 } = useParams();

    console.log(id1);

    console.log(data[id1]);

    return (
        <div>
            {id1 ? (
                <div>{JSON.stringify(id1)}</div>
            ) : (
                <div>No data found for the provided path parameters.</div>
            )}
        </div>
    );
};

export default DeepDive;
