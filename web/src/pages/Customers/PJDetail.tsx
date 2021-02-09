import React from "react";

import { usePJfetchCustomerByIdQuery } from "../../graphql/generated";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";

import { PJCustomerForm } from "../../components/Forms";
import AddressTab from "../../components/ExtraInfoDialog/PJ/AddressTab";
import ContactTab from "../../components/ExtraInfoDialog/PJ/ContactTab"
import ProfessionalHistoryTab from "../../components/ExtraInfoDialog/PJ/ProfessionalHistoryTab";
import AttachmentTab from "../../components/ExtraInfoDialog/PJ/AttachmentsTab";
import { Redirect, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: '100%',
            marginTop: theme.spacing(4),
            maxHeight: `100%`,
        },
        extraInfoDialogContentRoot: {
            overflowY: 'hidden',
            height: '100%',
        },
        tabPanel: {
            height: '75vh',
            overflowY: 'auto',
            overflowX: 'hidden'
        },
        tabIndicator: {
            backgroundColor: theme.palette.primary.main
        }
    })
);

// PF Customer Extra Info Dialog
interface PFDetailPageProps {
    
    
}

interface TabPanelProps extends GridProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export const PJDetailPage: React.FC<PFDetailPageProps> = () => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { PJcustomerID } = useParams<{PJcustomerID: string}>();


    const [tab, setTab] = React.useState<'addresses' | 'contacts' | 'disabilities' | 'professionalHistory | attachments'>('addresses')

    const { data, loading, error, refetch } = usePJfetchCustomerByIdQuery({ variables: { PJCustomerID: PJcustomerID } })

    // TODO: Better Handle Fetch Error
    if (error) {
        console.error(error);
        enqueueSnackbar("Cliente Não Encontrado !" , {variant: "error"});
        return <Redirect to="/customers" />;
    }

    if (data) {
        var { __typename, ...customer } = data.PJfetchCustomerById;
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
        <Container  className={classes.root}>
            {data && customer && 
                <Grid container direction='row' justify='center' spacing={3} className={classes.extraInfoDialogContentRoot}>
                    <Grid item xs={4} container direction='column' justify='center' spacing={3}>
                        <h3 style={{textAlign: 'center'}}>Informações Básicas</h3>
                        <Grid item>
                            <PJCustomerForm  initialData={data.PJfetchCustomerById}/>
                        </Grid>
                    </Grid>

                    <Divider orientation="vertical" flexItem />

                    <Grid item xs={8} container direction='column' justify='flex-end' spacing={3}>

                        <Grid item>
                            <Tabs
                                value={tab}
                                onChange={(event, newValue) => setTab(newValue)}
                                centered
                                variant="fullWidth">
                                <Tab label='Endereços' value='addresses' />
                                <Tab label='Contatos' value='contacts' />
                                <Tab label='Classificação de Atividades' value='activityClassification' />
                                <Tab label='Funcionarios' value='employees' />
                                <Tab label='Anexos' value='attachments' />
                            </Tabs>
                        </Grid>

                        <Grid item className={classes.tabPanel}>
                            <TabPanel value={tab} index={'addresses'}>
                                <AddressTab customer={data}/>
                            </TabPanel>
                            <TabPanel value={tab} index={'contacts'}>
                                {/* <ContactTab customer={data}/> */}
                            </TabPanel>
                            <TabPanel value={tab} index={'activityClassification'}>
                                {/* <ProfessionalHistoryTab customer={data} refetch={refetch} /> */}
                            </TabPanel>
                            <TabPanel value={tab} index={'employees'}>
                                {/* <ProfessionalHistoryTab customer={data} refetch={refetch} /> */}
                            </TabPanel>
                            <TabPanel value={tab} index={'attachments'}>
                                {/* <AttachmentTab customer={data} /> */}
                            </TabPanel>
                        </Grid>

                    </Grid>
                </Grid>
            }
            <Backdrop open={loading} style={{ zIndex: 10 }}>
                <CircularProgress size={75} color='secondary' />
            </Backdrop>
        </Container>
    );
}