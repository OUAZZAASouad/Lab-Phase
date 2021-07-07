import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FeedBack from '../ProductDetail/FeedBack';
import AddComponent from '../ProductDetail/AddComment';


const TabPanel = ({props, index}) => {
  console.log(props)
  return(
    <>
      {index === 0 ? <FeedBack props = {props}/> : <AddComponent props = {props}/> }
    </>
  )
}


const TabsComments = ({props}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        {props.map(item => <Tab label = {item.tab} /> )}
      </Tabs>
      <Box p={3}>
          <Typography><TabPanel props = {props[value]} index = {value}/></Typography>
        </Box>
    </Paper>
  );
}

export default TabsComments