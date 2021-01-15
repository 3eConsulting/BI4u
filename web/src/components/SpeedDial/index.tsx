import React from 'react';
import Backdrop from '@material-ui/core/Backdrop'

import SpeedDialBase from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';

export interface Action {
    title: string;
    icon: React.ReactNode;
    handler?(): void;
    disabled?: boolean;
}

interface SpeedDialProps {
    actions: Action[];
    className?: string;
    backdropHander?(state: boolean): void;
    open: boolean;
    setOpen(value: boolean): void;
}

export const SpeedDial = ({actions, className, backdropHander, open, setOpen} : SpeedDialProps) => {

    const handleOpen = () => {
        setOpen(true);
        if (backdropHander) backdropHander(true)
    }

    const handleClose = () => {
        setOpen(false);
        if (backdropHander) backdropHander(false)
    }

    return (
        <>
            {!backdropHander && (<Backdrop open={open} style={{zIndex: 999}}/>)}
            <SpeedDialBase ariaLabel='SpeedDial Customer Options' direction='right'
                icon={<SpeedDialIcon icon={<ChevronRightIcon/>} openIcon={<CloseIcon/>}/>}
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                className={className}
            >
                {actions.map(action => !action.disabled &&
                    <SpeedDialAction
                        key={action.title}    
                        icon={action.icon}
                        tooltipTitle={action.title}
                        tooltipPlacement='bottom'
                        onClick={action.handler}
                    />
                )}
            </SpeedDialBase>
        </>
    );
}