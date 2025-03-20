import React from 'react';
import { useLocation } from 'react-router-dom';
import { matrix } from '../data/matrix';

const DeepDive = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id1 = queryParams.get('id1');
    const id2 = queryParams.get('id2');
    const id3 = queryParams.get('id3');

    const queryNestedObject = (data, id1, id2, id3) => {
        if (data[id1] && data[id1][id2] && data[id1][id2][id3]) {
            return data[id1][id2][id3];
        }
        return null;
    };

    const result = queryNestedObject(matrix, id1, id2, id3);

    return (
        <div>
            {result ? (
                <div>{JSON.stringify(result)}</div>
            ) : (
                <div>No data found for the provided query parameters.</div>
            )}
        </div>
    );
};

export default DeepDive;
