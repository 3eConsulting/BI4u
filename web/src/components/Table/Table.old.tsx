import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import { CollapsibleSearchBar } from '../CollapsibleSearchBar';
import { useFetchCustomersQuery } from '../../graphql/generated';


interface Column {
    name: string;
    alignment: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
}

export interface ExtendedTableProps {
    title: string;  
    columns: Column[];
    onSettingsButtonClick?(): void;
}



const columns: Column[] = [
    {name: 'Name', alignment: 'left'}, 
    {name: 'Owner', alignment: 'center'},
    {name: 'Created At', alignment: 'center'}, 
    {name: 'Updated At', alignment: 'right'}
]



export const numCols = columns.length;
export const ROWS_PER_PAGE = 5;


const useToolbarStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        width:'100%'
    },
}))


const TableToolbar = (
    {title, rows, page, enablePagination, onPageChange, onSettingsButtonClick, searchFunction}:
    {
        title: string, rows: number, page: number, enablePagination: boolean,
        onPageChange(newPage: number): void, onSettingsButtonClick?(): void, searchFunction(searchValue: string): void
    }
) => {

    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={7}>
                    <Typography variant='h5'>{title}</Typography>
                </Grid>
                <Grid item >
                    <CollapsibleSearchBar searchFunction={searchFunction} />
                </Grid>
                {onSettingsButtonClick && 
                    <Grid item>
                        <Button color='inherit' onClick={onSettingsButtonClick}>
                            <Typography variant='caption' color='inherit'>
                                Configurações
                            </Typography>
                        </Button>
                    </Grid>
                }
                {enablePagination ? (
                    <Grid item>
                        <TablePagination
                            component='div'
                            style={{color: 'white', border: 'none'}}
                            align='right'
                            rowsPerPageOptions={[]}
                            count={rows}
                            page={page}
                            onChangePage={(_, newPage) => onPageChange(newPage)}
                            rowsPerPage={ROWS_PER_PAGE}
                        />
                    </Grid>
                ) : ('')}
            </Grid>
            
        </Toolbar>
    )

}


const useExtendedTableStyles = makeStyles(theme => createStyles({
    tableHeader: {
        backgroundColor: theme.palette.primary.light,
    },
    tableHeaderCell: {
        color: theme.palette.common.white,
        fontWeight: "bold"
    },
    tableRow: {
        cursor: 'pointer'
    }
}))


export const ExtendedTable: React.FC<ExtendedTableProps> = ({columns, title, onSettingsButtonClick}) => {

    // CSS
    const classes = useExtendedTableStyles();

    // State Initialization
    const [page, setPage] = React.useState(0);
    const [filterValue, setFilterValue] = React.useState('');

    // GraphQL Query
    let {data, loading, error} = useFetchCustomersQuery();
    const {enqueueSnackbar} = useSnackbar();
    const history = useHistory();

    return (
        <Paper>
                {
                    data && data.fetchCustomers && (
                        <TableToolbar enablePagination={!Boolean(filterValue)}
                            title={title ? title : 'Data'} 
                            rows={data.fetchCustomers.length} 
                            page={page} 
                            onPageChange={(newPage) => setPage(newPage)}
                            onSettingsButtonClick={onSettingsButtonClick}
                            searchFunction={(searchValue) => setFilterValue(searchValue)}
                        />
                    )
                }
                
                <TableContainer>
                    <Table>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                {columns.map(({name, alignment}) => 
                                    <TableCell key={name} align={alignment} size='small'>
                                        <Typography className={classes.tableHeaderCell}>
                                            {name}
                                        </Typography>
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                (loading || error) ? 
                                Array
                                    .from({length: 3}, (_, k: number) => k + 1)
                                    .map(k => (
                                        <TableRow key={k.toString()}>
                                            {Array
                                                .from({length: numCols}, (_, k: number) => k + 1)
                                                .map(k => <TableCell key={k.toString()}><Skeleton/></TableCell>)}
                                        </TableRow>
                                    ))
                                :
                                data && 
                                data.fetchCustomers && 
                                data.fetchCustomers.filter(
                                    customer =>
                                        customer.firstName.toLowerCase()
                                            .replace(/[ ]/g, '')
                                            .startsWith(
                                                filterValue
                                                .toLowerCase()
                                                .replace(/[ ]/g, '')
                                            )
                                ).slice(page * ROWS_PER_PAGE, (page * ROWS_PER_PAGE) + ROWS_PER_PAGE).map(
                                    ({id, firstName, lastName, CPF, createdAt, updatedAt}) => 
                                        <TableRow className={classes.tableRow} key={id} hover onClick={() => history.push(`/customer/${id}`)}>
                                            <TableCell align='left'>{firstName}</TableCell>
                                            <TableCell align='center'>{lastName}</TableCell>
                                            <TableCell align='center'>{CPF}</TableCell>
                                            <TableCell align='center'>{new Date(createdAt).toLocaleString()}</TableCell>
                                            <TableCell align='right'>{new Date(updatedAt).toLocaleString()}</TableCell>
                                        </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    );
}
