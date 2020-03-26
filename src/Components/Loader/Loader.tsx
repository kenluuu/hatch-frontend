import React from 'react';
import { Spinner } from 'reactstrap';

const Loader: React.FC = () => {
    return (
        <div className="v-center h-center">
            <Spinner color="info" />
        </div>
    )
}

export default Loader



