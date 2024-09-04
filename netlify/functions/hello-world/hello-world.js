// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const zones = {
  babbio:{roomMain:[]},
  UCC: {roomMain:[ [0,"line", 0, 0, 10, 10, 3, "red" ]]},
  Howe : {roomMain:[]},  
}

const handler = async (event) => {
  try {
    const zone = event.queryStringParameters.zoneName || "UCC"
    const roomNumber =  `room${Number(event.queryStringParameters.roomNumber) || "Main"}`
    const from = Number(event.queryStringParameters.from || 0)
    
    let ret = zones[zone][roomNumber].filter(edit=> edit[0] >=from);

    return {
      statusCode: 200,
      body: JSON.stringify(ret),
     
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
