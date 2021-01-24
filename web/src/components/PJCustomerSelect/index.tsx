import React from 'react';

import { PjCustomer, PJfetchCustomersQuery } from '../../graphql/generated';
import { ApolloError } from '@apollo/client';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PJCustomerSelect(
    props: TextFieldProps & {queryData?: PJfetchCustomersQuery, queryLoading: boolean, queryError?: ApolloError}
) {
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<PjCustomer[]>([]);
  
    const {queryData, queryLoading, queryError, defaultValue, ...restOfProps} = props;

    React.useEffect(() => {        
        if (queryData) {
            setOptions(queryData.PJfetchCustomers);
        } else {
            setOptions([]);
        }
    }, [queryLoading, queryData])
  
    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.tradingName}
            options={options}
            loading={queryLoading}
            defaultValue={defaultValue as PjCustomer}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...restOfProps}
                    label="Empresa"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {queryLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}