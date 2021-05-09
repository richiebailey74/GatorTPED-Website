import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

//this is the styling used for the FAQS using u-styles in CSS
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: '50%'
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(1, 0, 2),
    },
    div: {
        top: '64px',
        bottom: '64px',
    },
    gridContainer: {
        paddingTop: '125px',
    }
}));

//the exportable used that is actually displayed on the FAQ subpage on the website
export default function SimpleAccordion() {

  //this is the const defined for the exportable, it is the styling
  const classes = useStyles();

  //the returned part of the exportable to actually be displayed
  return (

    //aside from the title of the subpage, each FAQ uses a grid to be displayed and has nearly identical implementation (other than the display)
    //each FAQ is expandable to show the answer and retractable to hide it and each holds a different question and answer
        <Container component="main">

            <CssBaseline />
            
            <Grid container spacing={4} className={classes.gridContainer} justify="center">

                <Grid item xs={12}>
                    <Typography style={{ color: 'white', }} component="h1" variant="h5" align="center" className={classes.avatar}>
                        Frequently Asked Questions
                    </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header" alignItems="center">
                            <Typography className={classes.heading} align="center">HOW DO I JOIN GATOR TPED?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                A good way to start is to come to one of our regular general body meetings. You need to attend a certain number of events to vote, but to be a part of the club, all you need to do is come hang out. The Zoom link is on our Discord!
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading} align="center">WHO CAN JOIN GATOR TPED?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Anyone can join! There are no experience or background requirements. This club is for all UF students.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading} align="center">IS THIS CLUB JUST FOR ENGINEERS?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nope! Although the 'E' in TPED does stand for engineering, we have students of all backgrounds, as design encompasses many aspects. Whether you're an architect or a marine biologist, you are more than welcome!
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading} align="center">WHAT IS THE DESIGN TEAM?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                The TPED design team is a group of students working together on a theme park design project. Currently, we are crafting a functioning small-scale roller coaster.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading} align="center">HOW DO I JOIN THE DESIGN TEAM?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Just come to one of the meetings! Whether the first week or halfway through the year, there is always more work to be done, so new hands are welcome. The link can be found in our Discord server.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading} align="center">DO I NEED EXPERIENCE TO JOIN THE DESIGN TEAM?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Nope! Although the current project is more engineering-heavy, most of the skills needed for the project are learned by working on it hands-on.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography className={classes.heading} align="center">WHAT IS SWAMP THRILLS?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Swamp Thrills is Gator TPED's own theme park design competition, hosted here on University of Florida campus. Multidisciplinary teams respond to up to three project prompts and present their work in front of industry judges.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

                </Grid>
        </Container>
        
        
    
  );
}
