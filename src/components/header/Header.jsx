import SearchBar from './SearchBar'
import Menu from './Menu'

const Header = () => {
    return(
        <div style = {{display : 'grid', gridTemplateRows : '50px 1fr', gridColumnStart : '1', gridColumnEnd : 'span 3'}}>
            <SearchBar/>
            <Menu/>
        </div>
    )
}

export default Header