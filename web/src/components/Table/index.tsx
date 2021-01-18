import React from 'react'

import { TableToolbar } from './TableToolbar';
import { QueryResult } from '@apollo/client/react/types/types';

import { makeStyles, createStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';

interface Column {
    name: string;
    alignment: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined;
    fetchedName: string;
    formatDate?: boolean;
}

export interface ExtendedTableProps {
    title: string;  
    columns: Column[];
    query(): QueryResult;
    tabledProperty: string;
    rowCallback(id: string): any;
    rowsPerPage: number;
    onSettingsButtonClick?(): void;
    filterBy?: string | string[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
    extraComponents?: React.ReactNode[];
}

interface EnhancedTableRowProps {
    properties: any;
    columns: Column[];
    rowCallback(id: string): any;
    toggleSelectionList(id: string): void;
    selectionList: string[];
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
    },
    noCustomerFoundContainer: {

    },
    noCustomerFoundWarning: {
        fontSize: '2rem',
        textAlign: 'center',
        color: '#afafaf',
        padding: '5px',
        marginTop: '20px',
        marginBottom: '20px'
    }
}));

const EnhancedTableRow: React.FC<EnhancedTableRowProps> = ({
    properties, columns, rowCallback, toggleSelectionList, selectionList
}) => {
    // CSS
    const classes = useExtendedTableStyles();

    const [selected, setSelected] = React.useState(selectionList.includes(properties.id));

    const toggleSelection = (id: string) => {
        setSelected(!selected)
        toggleSelectionList(id);
    }

    return (
        <TableRow hover
            className={classes.tableRow}
            selected={selected}
            onClick={() => toggleSelection(properties.id)}>
            {columns.map(column =>
                <TableCell align={column.alignment} key={`${properties.id}/${column.fetchedName}`}>{column.formatDate 
                        ? new Date(properties[column.fetchedName]).toLocaleString()
                        : properties[column.fetchedName]
                    }
                </TableCell> 
            )}
            <TableCell align='right'>
                <IconButton size='small' onClick={(event) => {
                    event.stopPropagation();
                    rowCallback(properties.id);
                }}>
                    <LaunchIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export const ExtendedTable: React.FC<ExtendedTableProps> = ({
    selected, tabledProperty, filterBy, columns, rowsPerPage, title, extraComponents,
    onSettingsButtonClick, rowCallback, query, setSelected,
}) => {
    
    // CSS
    const classes = useExtendedTableStyles();
    
    // State Initialization
    const [page, setPage] = React.useState(0);
    const [filterValue, setFilterValue] = React.useState('');
    const [numCols] = React.useState(columns.length);

    // GraphQL Query
    let {data, loading, error, refetch: refetchFunc} = query();

    // TODO: Handle Fetch Error The Proper Way
    if (error) {
        console.error(error);
    }

    const addToSelection = (id: string) => {
        let newSelection = selected;
        newSelection.push(id)
        setSelected(newSelection);
    }

    const removeFromSelection = (id: string) =>{
        let newSelection = selected;
        newSelection.splice(newSelection.indexOf(id), 1);
        setSelected(newSelection);
    }

    const isSelected = (id: string): boolean => {
        return selected.indexOf(id) !== -1;
    }

    const toggleSelection = (id: string) => {
        if (isSelected(id)) {
            removeFromSelection(id);
        } else {
            addToSelection(id);
        }
    }

    return (
            <Paper>
                    
                <TableToolbar enablePagination={!Boolean(filterValue)}
                    title={title ? title : 'Data'} 
                    rows={(data && data[tabledProperty]) ? data[tabledProperty].length : 0} 
                    page={page} 
                    onPageChange={(newPage) => setPage(newPage)}
                    onSettingsButtonClick={onSettingsButtonClick}
                    searchFunction={(searchValue) => setFilterValue(searchValue)}
                    rowsPerPage={rowsPerPage}
                    onRefetchButtonClick={() => refetchFunc()}
                    extraComponents={extraComponents}
                />
                    
                <TableContainer>
                    <Table>
                        {((data && data[tabledProperty] && data[tabledProperty].length !== 0)) &&
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    {columns.map(({name, alignment}) => 
                                        <TableCell key={`${title}/${name}`} align={alignment} size='small'>
                                            <Typography className={classes.tableHeaderCell}>
                                                {name}
                                            </Typography>
                                        </TableCell>
                                    )}
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                        }
                        <TableBody>
                            {
                                data &&
                                data[tabledProperty].length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Typography className={classes.noCustomerFoundWarning}>Nenhum Registro Encontrado em {title}.</Typography>
                                            <Typography className={classes.noCustomerFoundWarning}>Para Adicionar Novos {title}, Utilize o Atalho de Rodapé !</Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                            {
                                (loading) ? 
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
                                data[tabledProperty] && 
                                data[tabledProperty].filter((property: any) => {
                                    if (filterBy) {
                                        if (typeof filterBy === 'string') {
                                            return property[filterBy]
                                                .toLowerCase()
                                                .replace(/[\\ ,.-]/g, '')
                                                .includes(
                                                    filterValue
                                                    .toLowerCase()
                                                    .replace(/[\\ ,.-]/g, '')
                                                ); 
                                        } else {
                                            let result: any[] = [];
                                            filterBy.forEach(filter => {
                                                result = result.concat(property[filter]
                                                    .toLowerCase()
                                                    .replace(/[\\ ,.-]/g, '')
                                                    .includes(
                                                        filterValue
                                                        .toLowerCase()
                                                        .replace(/[\\ ,.-]/g, '')
                                                    )
                                                );
                                            });
                                            return result.some(value => value);
                                        }
                                    } else {
                                        return true;
                                    }
                                }).slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map(
                                    (properties: any) => {
                                        return (
                                            <EnhancedTableRow 
                                                key={properties.id}
                                                columns={columns}
                                                properties={properties}
                                                rowCallback={rowCallback}
                                                toggleSelectionList={toggleSelection}
                                                selectionList={selected}/>
                                        )
                                    }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
    );
}
