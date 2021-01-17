import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {yupLocale} from '../../../../../utilities/misc';

import {
    FormControlLabel,
    Grid,
    MenuItem,
    Switch,
    TextField,
    CircularProgress,
    Backdrop
} from '@material-ui/core';

import { usePFaddAddressMutation } from '../../../../../graphql/generated';
import { useSnackbar } from 'notistack';

interface AddressFormProps {
    
}

const AddressForm: React.FC<AddressFormProps> = ({}) => {
    
    return (
        <h1>ADDRESS</h1>    
    );
} 