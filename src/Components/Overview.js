import OverviewCSS from './Overview.module.css'
const Overview = ({description}) => {
    return(
        <div className = {OverviewCSS.overview}>
            <h1>Black Thoughts</h1>
            {description.map(item => {return (item.includes('https://') ? 
                <a href={item}><h3 key={item}>{item}</h3></a>               //how do I ensure every item gets a unique key?
                : 
                <h3 key={item}>{item}</h3>)})}
        </div>
    )
}

export default Overview