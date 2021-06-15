import logo from '../../images/logo.jpg'
import SiteNav, {ContentGroup} from 'react-site-nav';
import {categories} from '../../Vars'
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div style = {{zIndex : '1', gridRow : '2 / span 1' }}>
            <img src = {logo} height = '100' width = '100'/>
            <SiteNav background="#FFFFFF" color="gray">
                {categories.map(item =>
                    <ContentGroup title = {item.names} height="200" width = "700">
                        <div style = {{display : 'flex', alignItems : 'center'}}>
                            <img src = {item.imgURL} height = '150px' width = '150px'/>
                            <div style = {{display: 'grid', gridTemplateColumns:'repeat(5, 1fr)', gridAutoRows : 'minmax(100px, auto)'}}>
                                {item.ids.map(elt =><Link to={`categories/${elt.id}`}>{elt.name}</Link>)}
                            </div>
                        </div>
                    </ContentGroup>
                )}
            </SiteNav>
        </div>
    )
}

export default Menu