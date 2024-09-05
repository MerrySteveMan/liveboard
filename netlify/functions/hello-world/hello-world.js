// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
 const supakey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9jbnBhcG5hZHl2cm1qZXR0aWJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTQ2MDc2OCwiZXhwIjoyMDQxMDM2NzY4fQ._amNNZ-4JS38m7lChw-VXdTRmk0FvbVzbuq5ceImDjw"
 let sup = require('@supabase/supabase-js')
  const createClient = sup.createClient
 const supabase = createClient("https://ocnpapnadyvrmjettibu.supabase.co",supakey,{
  auth: {
    autoRefreshToken: false,
    persistSession: true
  }
})

function reduce(list){
  if (list.length <= 100){
    return list
  }

  if (list.length <=133) {
    return reduce(list.filter((a,i)=>i % 4 <= 2))

  }

  if (list.length <= 166){
    return reduce(list.filter((a,i)=>i % 3 <= 1))
  }

  return reduce(list.filter((a,i)=>i % 2 == 0))
}

const handler = async (event) => {
  try {
    const type = event.queryStringParameters.type  || "get"
    const zone = event.queryStringParameters.zoneName || "UCC"
    const roomNumber = Number(event.queryStringParameters.roomNumber || 0) || 0
    if (type == "get"){
      
      const from = Number(event.queryStringParameters.from || 0)
      
  
      let { data, error } = await supabase.from(zone).select().eq('roomnum', roomNumber).gte('id',from)
      if (error) {
        console.log(error)
        return {
          statusCode: 500,
          body: JSON.stringify(`{error: ${error}`),
        }   
      }

      if (data.length>=100){
        let id150 = data[data.length - 100].id
        data = data.filter(a=>a.id > id150)
      }
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      }
    }else if (type == "post") {
      let a = event.body
      a= JSON.parse(a)
      console.log(zone)

      let { data, error } = await supabase.from(zone).insert({roomnum:roomNumber, data:{type:a[0], info:reduce(a[1]),width:a[2],color:a[3]}})

      if (error){
        return {
          statusCode: 500,
          body: JSON.stringify(`{error: ${error}`),
        } 
      }



      return {
        statusCode: 200,
        body: "good",      
      }
    }

    return { statusCode: 500, body: "invalid request type" }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
