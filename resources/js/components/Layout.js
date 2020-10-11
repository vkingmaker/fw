import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const Layout = ({ children }) => {
    const history = useHistory();
    const errorMessage = useSelector(state => state.data.errorMessage);

    const notify = () => toast.error(`${errorMessage}`, { position: 'bottom-right' });

    useEffect(() => {
         if (errorMessage !== '') notify();
    }, [errorMessage]);

    return (
        <>
            <h1 className="brand font-weight-bolder" onClick={() => { history.push('/')}}>fw.</h1>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-12">{children}</div>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default Layout;
