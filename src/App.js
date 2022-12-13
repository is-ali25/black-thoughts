import './App.css'

import Graph from './Components/Graph'
import Overview from './Components/Overview'
import Submission from './Components/Submission'

import React, {useState, useEffect} from 'react'
import axios from 'axios'

import * as Utils from './utils'


const linkSchemes = {
  'byAuthor': (map) => {
      return Utils.edgesByAuthor(map)
  }
}

function App() {
                                      //////////////////////GRAPH FUNCTIONALITY////////////////////
  //initial state for graph data
  const [nodes, setNodes] = useState([])
  const [authorMap, setAuthorMap] = useState({})
  const [linkScheme] = useState('byAuthor')
  const [linkSchemeArgs, setLinkSchemeArgs] = useState({
    'byAuthor': {} //might want the values to be lists for generalizability
  })
  const [links, setLinks] = useState([])
  const [graphReady, setGraphReady] = useState(false)
  const [graphData, setGraphData] = useState({
    nodes: nodes,
    links: links
  })

  //gets data from database on startup, then uses said data to update the nodes state array
  useEffect(async () => {
    await axios.get('http://localhost:5000/')
    .then(res => {
      if(res.data.length > 0) {
        setNodes(Utils.nodeAddition(res.data))
      }
    })
    .catch(err => console.error(err))
  }, [])

  //create a HashMap whose keys are authors and whose values are arrays entailing the id's of the nodes which reference that author
  useEffect( () => {
    setAuthorMap(Utils.createAuthorMap(nodes))
    setLinkSchemeArgs(prevArgs => {
      let newArgs = prevArgs
      newArgs['byAuthor'] = Utils.createAuthorMap(nodes)
      return newArgs
    })
  }, [nodes])

  //use appropriate link generating function to add edges to the new nodes
  useEffect(() => {
    //linkSchemes[linkScheme] is the function being used to create links, and linkSchemeArgs[linkScheme] is the argument the function takes
    setLinks(linkSchemes[linkScheme](linkSchemeArgs[linkScheme]))
    setGraphReady(true)
  }, [authorMap])

  //use nodes and links data to set overall graphData
  useEffect(() => {
    if (graphReady) {
      setGraphData({
        nodes: nodes,
        links: links
      })
      setGraphReady(false)
    }
  }, [graphReady])

                                 //////////////////////SUBMISSION FORM FUNCTIONALITY////////////////////

  //initial state for submission form
  const [show, setShow] = useState(false)
  const[submissionData, setSubmissionData] = useState(Utils.blankForm())

   //state manager for form inputs...apparently I should duplicate this logic for every form input :/
  const updateForm = (name, value) => {
    setSubmissionData(prevData => {return {...prevData, [name]: value }})
  }

  //formHandler function (adds new node with appropriate edges to the graph)
  const formHandler = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/add', submissionData)
        .then(res => {
          setNodes(nodes.push(Utils.createNode(res.data, nodes.length)))
    }).catch(err => console.error(err))
    setSubmissionData(Utils.blankForm())
  }

                      //////////////////////////////////////////FOR GRAPH INTERACTION/////////////////////////////////////

  const [description, setDescription] = useState(["Associate for free"])

  const newDescription = (newTextItems) => {
    setShow(false)
    setDescription(newTextItems)
  }

                      //////////////////////////////////////////THE ACTUAL COMPONENT/////////////////////////////////////
    return (
    <div className="App">

        <Graph data={graphData} changeDescription= {newDescription}/>

        {!show ? <Overview description= {description}/> :

        <Submission 
        title={submissionData.title}              //need to migrate this to a form component...
        description={submissionData.description}
        link={submissionData.link}
        keywords={submissionData.keywords}
        date={submissionData.date}
        author={submissionData.author}
        organization={submissionData.organization}
        location={submissionData.location}
        relatedAuthors={submissionData.relatedAuthors}
        citations={submissionData.citations} 
        update={updateForm}
        formHandler={formHandler} />}

        <button className="addSubBtn" onClick={() => setShow(!show)}>{show ? "Close" : "+"}</button>
    </div>
  );
}

export default App;