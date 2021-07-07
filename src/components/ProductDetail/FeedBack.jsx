import Pagination from "../template/Pagination"
import { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component";



const FeedBack = ({props}) => {

    const [offset, setOffset] = useState(0)
    const [list, setList] = useState([])
    let perPage = 5
    
    const handlePagination = (items) =>{
        setOffset(items)
    }

    useEffect (() => {
        setList(props.data.slice(offset, offset + perPage))
    },[offset])

    return(
        <> 
            <div>
                {list.map(item => 
                    <div style = {{display : 'flex', flexDirection : 'column'}}> 
                        <div style = {{display : 'grid', gridTemplateColumns : '1fr 3fr', gridRowGap : '10px'}}>
                            <p style = {{gridColumn : '1 / span 1'}}>{item.buyerName}</p> 
                            <p style = {{gridColumn : '2 / span 1'}}>{item.buyerFeedback}</p> 
                        </div> 
                        <div style = {{display : 'grid', gridTemplateColumns : '1fr 3fr'}}>
                            <div style = {{gridColumn : '2 / span 1', display : 'flex', alignItems:'center'}}>
                            <p>{item.evalDate}</p>
                            <ReactStars
                                    count={5}
                                    value = {(item.buyerEval*5)/100}
                                    size={24}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"/>
                            </div> 
                            
                        </div>
                    </div>
                )}
            </div>
            <Pagination perPage = {perPage} data = {props.data} handle = {handlePagination}/>
        </>
    )
}

export default FeedBack