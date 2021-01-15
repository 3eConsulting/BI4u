import { Button, ButtonProps, createStyles, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => createStyles({
    homeButton: {
        height: 70,
        width: 280,
        fontWeight: 700,
    }
}))

export interface iHomeButtonProps extends ButtonProps {
    title: string;
}

export const HomeButton:React.FC<iHomeButtonProps> = (props) => {

    const classes = useStyles();

    return (
        <Button className={classes.homeButton} {...props}>{props.title}</Button>
    )

}
    