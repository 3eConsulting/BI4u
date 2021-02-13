import React from "react";

import { usePFfetchCustomerByIdQuery } from "../../graphql/generated";

import { createStyles, makeStyles } from "@material-ui/core/styles";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import Grid, { GridProps } from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Tooltip from "@material-ui/core/Tooltip";

import { PFCustomerForm } from "../../components/Forms";
import AddressTab from "../../components/ExtraInfoDialog/PF/AddressTab";
import ContactTab from "../../components/ExtraInfoDialog/PF/ContactTab"
import DisabilityTab from "../../components/ExtraInfoDialog/PF/DisabilityTab";
import ProfessionalHistoryTab from "../../components/ExtraInfoDialog/PF/ProfessionalHistoryTab";
import AttachmentTab from "../../components/ExtraInfoDialog/PF/AttachmentsTab";
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

export const PFDetailPage: React.FC<PFDetailPageProps> = () => {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { PFcustomerID } = useParams<{PFcustomerID: string}>();


    const [tab, setTab] = React.useState<'addresses' | 'contacts' | 'disabilities' | 'professionalHistory | attachments'>('addresses')

    const { data, loading, error, refetch } = usePFfetchCustomerByIdQuery({ variables: { PFCustomerID: PFcustomerID } })

    // TODO: Better Handle Fetch Error
    if (error) {
        console.error(error);
        enqueueSnackbar("Cliente Não Encontrado !" , {variant: "error"});
        return <Redirect to="/customers" />;
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
        <Container  className={classes.root}>
            {data && customer && 
                <Grid container direction='row' justify='center' spacing={3} className={classes.extraInfoDialogContentRoot}>
                    <Grid item xs={4} container direction='column' justify='center' spacing={3}>
                        <h3 style={{textAlign: 'center'}}>Informações Básicas</h3>
                        <Grid item>
                            <PFCustomerForm initialData={customer} />
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
                                <Tab label={
                                    <Tooltip arrow title={customer.hasDisability ? "" : "Para Habilitar o Cadastro de Condições Médicas, Ative a Flag de Paciente com Deficiência Neste Cliente"} >
                                        <span>Condições Médicas</span>
                                    </Tooltip>} value='disabilities' disabled={!customer.hasDisability} style={{ pointerEvents: "auto" }}/>
                                <Tab label='Historico Profissional' value='professionalHistory' />
                                <Tab label='Anexos' value='attachments' disabled={true}/>
                            </Tabs>
                        </Grid>

                        <Grid item className={classes.tabPanel}>
                            <TabPanel value={tab} index={'addresses'}>
                                <AddressTab customer={data}/>
                            </TabPanel>
                            <TabPanel value={tab} index={'contacts'}>
                                <ContactTab customer={data}/>
                            </TabPanel>
                            {customer.hasDisability &&
                                <TabPanel value={tab} index={'disabilities'}>
                                    <DisabilityTab customer={data} />
                                </TabPanel>}
                            <TabPanel value={tab} index={'professionalHistory'}>
                                <ProfessionalHistoryTab customer={data} refetch={refetch} />
                            </TabPanel>
                            <TabPanel value={tab} index={'attachments'}>
                                <AttachmentTab customer={data} />
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