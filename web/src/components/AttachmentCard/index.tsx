import React from 'react'

import { PfAttachment } from '../../graphql/generated';

import { createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';


const useStyles = makeStyles(
    theme => createStyles({
        root: {
            maxWidth: 345,
            height: 280
        },
        media: {
            height: 140
        },
        dropzoneUploadChip: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black
        }
    })
)




export interface AttachmentCardProps {
    attachment: PfAttachment;
}

export const AttachmentCard: React.FC<AttachmentCardProps> = ({attachment}) => {
    
    let classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} title={attachment.id} image={attachment.key}/>
            {attachment.comments && <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {attachment.comments}
                </Typography>
            </CardContent>}
        </Card>
    );
}

export default AttachmentCard;