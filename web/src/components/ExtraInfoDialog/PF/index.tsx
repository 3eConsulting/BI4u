import React from "react";

import { usePFfetchCustomerByIdQuery, usePFfetchCustomersByIdQuery } from "../../../graphql/generated";

import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import Grid, { GridProps } from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { TransitionProps } from "@material-ui/core/transitions";

import CloseIcon from '@material-ui/icons/Close';

import { Edit } from "../../Forms/PF/Edit";
import AddressTab from "./AddressTab";
import ContactTab from "./ContactTab"

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            overflowX: 'hidden'
        },
        extraInfoDialogContentRoot: {
            height: `calc(100vh - ${theme.spacing(3)}px)`,
        },
        tabPanel: {
            height: '75vh',
            overflowY: 'auto',
            overflowX: 'hidden'
        }
    })
);

// Dialog Transition Component
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

// PF Customer Extra Info Dialog
interface ExtraInfoDialogProps {
    open: boolean;
    onClose(): void;
    PFcustomerID: string;
}

interface TabPanelProps extends GridProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export const ExtraInfoDialog: React.FC<ExtraInfoDialogProps> = ({
    open, PFcustomerID,
    onClose,
}) => {

    const classes = useStyles();

    const [tab, setTab] = React.useState<'addresses' | 'contacts' | 'disabilities' | 'professionalHistory'>('addresses')

    const { data, loading, error } = usePFfetchCustomerByIdQuery({ variables: { PFCustomerID: PFcustomerID } })

    // TODO: Better Handle Fetch Error
    if (error) {
        console.error(error);
    }

    if (data) {
        var { __typename, ...customer } = data.PFfetchCustomerById;
    }

    const TabPanel = (props: TabPanelProps) => {
        const { children, value, index, ...other } = props;
        return (
            <>
                {value === index && (
                    <Grid container hidden={value !== index} {...other}>
                        {children}
                    </Grid>
                )}
            </>
        )
    }


    return (
        <Dialog open={open} onClose={onClose} fullScreen TransitionComponent={Transition}>
            <AppBar>
                <Toolbar>
                    <Grid container justify='space-between' alignItems='center'>
                        <Typography variant="h6" color='secondary'>
                            Informações Adicionais - {data && data.PFfetchCustomerById.firstName} {data && data.PFfetchCustomerById.lastName}
                        </Typography>
                        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Toolbar>
            </AppBar>

            {data && customer && <DialogContent className={classes.root}>
                <Grid container direction='row' justify='center' spacing={3} className={classes.extraInfoDialogContentRoot}>
                    <Grid item xs={4} container direction='column' justify='space-evenly' spacing={3}>
                        <Grid item><Edit customer={customer} /></Grid>
                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid item xs={8} container direction='column' justify='flex-end' spacing={3}>

                        <Grid item>
                            <Tabs
                                value={tab}
                                onChange={(event, newValue) => setTab(newValue)}
                                indicatorColor="primary"
                                textColor="secondary"
                                variant="fullWidth">

                                <Tab label='Endereços' value='addresses' />
                                <Tab label='Contatos' value='contacts' />
                                {customer.hasDisability && <Tab label='Deficiências' value='disabilities' />}
                                <Tab label='Historico Profissional' value='professionalHistory' />

                            </Tabs>
                        </Grid>

                        <Grid item className={classes.tabPanel}>
                            <TabPanel value={tab} index={'addresses'}>
                                <AddressTab customer={data}/>
                            </TabPanel>
                            <TabPanel value={tab} index={'contacts'}>
                                <ContactTab customer={data}/>
                            </TabPanel>
                            {customer.hasDisability && <TabPanel value={tab} index={'disabilities'}><h1>Disabilities</h1></TabPanel>}
                            <TabPanel value={tab} index={'professionalHistory'}><h1>ProfessionalHistory</h1></TabPanel>
                        </Grid>

                    </Grid>
                </Grid>
            </DialogContent>}
            <Backdrop open={loading} style={{ zIndex: 10 }}>
                <CircularProgress size={75} color='secondary' />
            </Backdrop>
        </Dialog>
    );
}