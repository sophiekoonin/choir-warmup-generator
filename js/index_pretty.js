const sheetKey = '1fPNGM1Nft1IPl9nSxaIdT4bWcOG_6Y0Ek69CTIVHz0k' // key to the google sheet (public) for the data

const sheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetKey}/od6/public/values?alt=json` // generic format to get json data from a public google sheet

var data = {}

$.get(sheetUrl,d=>{
  data = d.feed.entry.map(e=>({ "type": e.title.$t, "activity": e.content.$t })) 
}); // get data from google. await further instructions

const renderSection = (type,number) => {
  $('#target').append(`
    <h3>${type}</h3>
    ${listify(pickSome(data,type,number))}
  `)

}

const render = () => {
  $('#target').text('')
  // [['Vocal',3],['Physical',3]].forEach(console.log(pair))
   // render a section with 3 physicals including the heading
  renderSection('Physical',3) 
  //COPY THIS ^^
  renderSection('Sounds',3)
  renderSection('Vocal',3)
  renderSection('Song',1) 
}  

const listify = (list) => `
  <ul>
    ${list.map(item=>`<li>${item}</li>`).join``}
  </ul>
  <hr/>`

const tee = (data) => { console.log(data); return data }

const pickSome = (data,warmuptype,howmany=1) => {
  d=data.filter(e=>e.type===warmuptype) // update d to only include warmuptype
  return tee(shuffle(d.length)).slice(0,howmany).map(e=>`${d[e].type} ${d[e].activity}`)
}

// source: BetonMAN : https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4
const shuffle = (limit) => Array.from({length:limit},(e,i)=>i).map(a=>[Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);

// set console log list to render it as a list on the page