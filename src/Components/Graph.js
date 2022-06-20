import React, {useCallback, useRef} from 'react'
import { ForceGraph3D } from 'react-force-graph'
import GraphCSS from './Graph.module.css'


const Graph = ({data, changeDescription}) => {
    const fgRef = useRef();

    const handleClick = useCallback(node => {
      // Aim at node from outside it
      const distance = 100;
      const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z)
  
      fgRef.current.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        2000  // ms transition duration
      )

      changeDescription([node.name, node.description, node.link, node.relatedAuthors])

    }, [fgRef])

    return(
        <div className={GraphCSS.graph}>
            <ForceGraph3D ref={fgRef} graphData={data} width={900} height={GraphCSS.graph.height} backgroundColor={"#5F9DA0"} onNodeClick={handleClick}/>
        </div>
    )
}

/*next steps:
-implement onClick function
-start adding to database
*/

export default Graph