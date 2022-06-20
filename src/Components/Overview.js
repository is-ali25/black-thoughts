import OverviewCSS from './Overview.module.css'
const Overview = ({description}) => {
    return(
        <div className = {OverviewCSS.overview}>
            <h1>Black Thoughts</h1>
            {description.map(item => {return (item.includes('https://') ? <a href={item}><h3>{item}</h3></a> : <h3>{item}</h3>)})}
        </div>
    )
}

export default Overview