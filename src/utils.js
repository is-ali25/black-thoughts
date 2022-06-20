//translates an element of data into a node object
export function createNode(submission, id) {
    const node = {
        id: id,
        name: submission['title'],
        link: submission['link'],
        keywords: submission['keywords'],
        date: submission['date'],
        author: submission['author'],
        organization: submission['organization'],
        location: submission['location'],
        relatedAuthors: submission['relatedAuthors'],
        citations: submission['citations'],
        val: 1,
        description: submission['description'], //need to add a description field to data objects
      }

      return node;
}

//returns data as an array of node objects
export function nodeAddition(data) {
    if (data.length <= 0) {
      return [];
    }

    const newNodes = []
    var counter = 0;
    data.forEach(submission => {
      const id = counter
      newNodes.push(createNode(submission, id))
      counter ++;
    })
    return newNodes
  }



//returns a HashMap whose keys are authors and whose values are arrays entailing the id's of the nodes which reference that author
export function createAuthorMap(nodes) {
    const newNodes = []
    nodes.forEach(node => {
      const nodeData = {
        id: node['id'], 
        relatedAuthors: [...node['relatedAuthors'].split(', ')]
      }
      newNodes.push(nodeData)
    })
    
    const newAuthorData = {}
    newNodes.forEach(node => {
      node['relatedAuthors'].forEach(author => {
        if (!(author in newAuthorData)) {
          newAuthorData[author] = [node['id']]
        } else {
          newAuthorData[author].push(node['id'])
        }
      })
    })

    return newAuthorData
}

//returns true if an edge already exists in the graph
export function preexistent(newEdge, array) {
    let result = false
    array.forEach(edge => {
      if (edge['source'] == newEdge['source'] &&
          edge['target'] == newEdge['target']) {
            result = true
          }
    })
    return result
}

//creates edges between nodes if nodes majorly cite one or more common authors
export function edgesByAuthor(authorMap) {
    if (Object.keys(authorMap).length <= 0) {
        return []
    }
          
    const edges = []
    for (const author in authorMap) {
        for (let i = 0; i < authorMap[author].length; i++) {
            for(let j = i + 1; j < authorMap[author].length; j++) {
                const newEdge = {
                    'source': authorMap[author][i],
                    'target': authorMap[author][j]
                }

                if (!preexistent(newEdge, edges)) { //does this have to be linear? Might wanna make a HashSet instead
                    console.log(`new edge from ${authorMap[author][i]} to ${authorMap[author][j]}`)
                    edges.push(newEdge)
                }
            }
        }
    }

    return edges;
}

export function blankForm() {
    return {
        title: '',
        description: '',
        link:'',
        keywords:'',
        date: '',
        author: '',
        organization:'',
        location: '',
        relatedAuthors: '',
        citations:'',
      }
}

