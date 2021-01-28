import React from 'react';

import { PfAttachment, PFfetchCustomerByIdQuery } from '../../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import AttachmentCard from '../../AttachmentCard';
import AttachmentDropzoneDialog from '../../AttachmentDropzoneDialog';

const useStyles = makeStyles(
    (theme) => createStyles({
        root: {
            
        },
        actionRow: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        button: {
            color: theme.palette.common.white
        },
        accordion: {
            border: `1px solid #efefef`,
            marginTop: theme.spacing(1)
        },
        accordionHeading: {
            flexBasis: '40%',
            flexShrink: 0
        },
        accordionSubHeading: {
            flexBasis: '40%',
            flexShrink: 0
        },
        noCustomerFoundWarning: {
            fontSize: '2rem',
            textAlign: 'center',
            color: '#afafaf',
            padding: '5px',
            marginTop: '20px',
            marginBottom: '20px'
        },
        girdListRoot: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
        },
        gridList: {
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
        titleBar: {
            background:
                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        icon: {
            color: 'white',
        },
    })
)

interface AttachmentGridListProps {
    attachments: PfAttachment[]
}

const AttachmentGridList: React.FC<AttachmentGridListProps> = ({attachments}) => {
  const classes = useStyles();

  return (
    <div className={classes.girdListRoot}>
        <GridList cellHeight={200} spacing={1} className={classes.gridList}>
            <GridListTile cols={1} rows={1}>
                <AttachFileIcon />
                    <GridListTileBar
                        title="Anexar Arquivo"
                        titlePosition="bottom"
                        className={classes.titleBar}/>
            </GridListTile>
            {attachments.map((attachment) => (
                <GridListTile key={attachment.id} cols={1} rows={1}>
                    <img src={attachment.key} alt={attachment.comments ? attachment.comments : attachment.id} />
                        <GridListTileBar
                            title={attachment.comments}
                            titlePosition="bottom"
                            actionIcon={
                            <IconButton aria-label={`Edit ${attachment.comments}`} className={classes.icon}>
                                <EditIcon />
                            </IconButton>
                            }
                            actionPosition="right"
                            className={classes.titleBar}
                    />
                </GridListTile>
            ))}
        </GridList>
    </div>
  );
}




export interface AttachmentTabProps {
    customer?: PFfetchCustomerByIdQuery;
}

export const AttachmentTab: React.FC<AttachmentTabProps> = ({customer}) => {
    
    // CSS
    const classes = useStyles();

    // State
    const [newAttachmentFormOpen, setNewAttachmentFormOpen] = React.useState(false);

    return (
        <React.Fragment>
            <Grid container direction='column'>
                <Grid item container direction='row-reverse' className={classes.actionRow}>
                    <Button 
                        className={classes.button}
                        variant='contained'
                        color='primary'
                        onClick={() => setNewAttachmentFormOpen(true)}>
                            Anexar Arquivo
                    </Button>
                </Grid>
                
                {customer && (!customer.PFfetchCustomerById.PFextraInfo.attachments || 
                    customer.PFfetchCustomerById.PFextraInfo.attachments.length === 0) && (
                        <Grid item>
                            <Typography className={classes.noCustomerFoundWarning}>
                                Nenhum Anexo Encontrado.
                            </Typography>
                            <Typography className={classes.noCustomerFoundWarning}>
                                Para Adicionar Novos Endereços, Utilize o Atalho Acima !
                            </Typography>
                        </Grid>)}

                {customer && customer.PFfetchCustomerById.PFextraInfo.attachments &&
                    <Grid item container direction='row' spacing={3}> 
                        {customer.PFfetchCustomerById.PFextraInfo.attachments.map(attachment => 
                            <Grid item lg={4}>
                                <AttachmentCard attachment={attachment} />
                            </Grid>)}
                    </Grid>}
                
            </Grid>
            <AttachmentDropzoneDialog open={newAttachmentFormOpen} setOpen={setNewAttachmentFormOpen} />
        </React.Fragment>
    );
}

export default AttachmentTab;