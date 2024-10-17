import { stat } from 'fs';
import React from 'react'
import {useSelector} from "react-redux"
import { AppDispatch, RootState } from "reduxs/store";

const useStatusControl = () => 
{
    const status = useSelector((state:RootState) => state.register.status_type);
    return status;
}


export  { useStatusControl}   
