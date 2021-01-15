import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'

import TablePagination from '@material-ui/core/TablePagination';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import RefreshIcon from '@material-ui/icons/Refresh';

import { CollapsibleSearchBar } from '../CollapsibleSearchBar';

const useToolbarStyles = makeStyles(theme => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        width:'100%'
    },
}))

export interface TableToolbarProps {
    title: string, 
    rows: number,
    rowsPerPage: number,
    page: number, 
    enablePagination: boolean,
    onPageChange(newPage: number): void, 
    onSettingsButtonClick?(): void, 
    searchFunction(searchValue: string): void,
    onRefetchButtonClick?(): void;
    extraComponents?: React.ReactNode[];
}


export const TableToolbar: React.FC<TableToolbarProps> = ({
    title,
    rows,
    rowsPerPage,
    page,
    enablePagination,
    onPageChange,
    onSettingsButtonClick,
    searchFunction,
    onRefetchButtonClick,
    extraComponents
}) => {

    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <Grid container justify='space-between' alignItems='center'>
                <Grid item xs={5}>
                    <Typography variant='h5'>{title}</Typography>
                </Grid>
                {extraComponents && extraComponents.map((component, index) => {
                    return (
                        <Grid item key={`toolbarExtraComponent/${index}`}>
                            {component}
                        </Grid>
                    )
                })}
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
                {enablePagination && (
                    <Grid item>
                        <TablePagination
                            component='div'
                            style={{color: 'white', border: 'none'}}
                            align='right'
                            rowsPerPageOptions={[]}
                            count={rows}
                            page={page}
                            onChangePage={(_, newPage) => onPageChange(newPage)}
                            rowsPerPage={rowsPerPage}
                        />
                    </Grid>
                )}
                {onRefetchButtonClick && 
                    <Grid item>
                        <IconButton color='inherit' onClick={onRefetchButtonClick}>
                            <RefreshIcon />
                        </IconButton>
                    </Grid>
                }
                
            </Grid>
            
        </Toolbar>
    )

}