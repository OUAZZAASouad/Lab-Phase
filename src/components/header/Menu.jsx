import logo from '../../images/logo.jpg'
import SiteNav, {ContentGroup} from 'react-site-nav';
import {categories} from '../../Vars'
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import './Menu.css'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const Menu = () => {
    return (
        <div style = {{gridRow : '2 / span 1', display : 'flex', flexDirection : 'column', alignItems : 'center' }}>
            <img src = {logo} height = '100' width = '100'/>
            <SiteNav background="#FFFFFF" color="gray">
                {categories.map(item =>
                    <ContentGroup title = {item.names} height="200" width = "900">
                        <div style = {{display : 'flex',  justifyContent : 'space-evenly', paddingTop : '15px'}}>
                            <img src = {item.imgURL} height = '150px' width = '150px'/>
                            <div style = {{display: 'grid', gridColumnGap :'40px', gridTemplateColumns:'repeat(4, 1fr)', gridAutoRows : 'minmax(70px, auto)'}}>
                                {item.ids.map(elt =><Link to={`/categories/${elt.id}`}>{elt.name}</Link>)}
                            </div>
                        </div>
                    </ContentGroup>
                )}
            </SiteNav>
        </div>
    )
}

export default Menu