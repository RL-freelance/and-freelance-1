import React, {PureComponent, useState} from 'react';


import {Outlet} from "react-router-dom";


export default function DetailsMainPage() {
    return (
        <>
            <Outlet />
        </>
    );
}
