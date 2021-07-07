import ReactPaginate from 'react-paginate'
import './Pagination.css'
const Pagination = ({perPage, data, handle}) => {

    let pageCount = Math.ceil(data.length / perPage)

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        handle(selectedPage * perPage);
    };

    return(
        <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    )
}

export default Pagination