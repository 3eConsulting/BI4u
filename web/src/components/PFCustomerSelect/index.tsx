import React from 'react';

import { PfCustomer, PFfetchCustomersQuery, PjCustomer } from '../../graphql/generated';
import { ApolloError } from '@apollo/client';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PFCustomerSelect(
    props: TextFieldProps & {queryData?: PFfetchCustomersQuery, queryLoading: boolean, queryError?: ApolloError, exclude?: PfCustomer[]}
) {
    
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<PfCustomer[]>([]);
  
    const {queryData, queryLoading, queryError, defaultValue, exclude, ...restOfProps} = props;

    React.useEffect(() => {        
        if (queryData) {

            if (exclude) {
                let exclusionIDS = exclude.map(customer => customer.id);
                let validOptions = queryData.PFfetchCustomers.filter((PFCustomer) => exclusionIDS.indexOf(PFCustomer.id) === -1);
                setOptions(validOptions);
            } else {
                setOptions(queryData.PFfetchCustomers);
            }

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
            getOptionLabel={(option) => `${option.firstName} ${option.lastName} (${option.CPF})`}
            options={options}
            loading={queryLoading}
            defaultValue={defaultValue as PfCustomer}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...restOfProps}
                    label="Funcionário"
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