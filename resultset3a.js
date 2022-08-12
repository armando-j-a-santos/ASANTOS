var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      #root {
        background-color: white;
      }
      #placeholder {
        padding-top: 1em;
        text-align: center;
        font-size: 1.5em;
        color: black;
      }
      
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }

      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }

      tr:nth-child(even) {
        background-color: #dddddd;
      }
      
      
      </style>
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">myresultset data</div>
        <div id="my_data">data...</div>
      </div>
    `
  class myResultSet3a extends HTMLElement {
    constructor () {
      super()

      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this._root = this._shadowRoot.getElementById('root')
     
      this._props = {}
    }
  
    // ------------------
    // Scripting methods
    // ------------------
    async render (resultSet) {
      // await getScriptPromisify('https://cdn.bootcdn.net/ajax/libs/echarts/5.0.0/echarts.min.js')
      console.log('resultSet:')
      console.log(resultSet)
      
      console.log('now:')
      // var my_data = document.getElementById("my_data")
      // my_data.innerHtml='<h1>Hello member</h1>'
      // document.getElementById("my_data").innerHTML = table_output
      
      // this._armando2 = this._shadowRoot.getElementById('my_data').innerHTML = "ole"
      

      this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      var MEASURE_DIMENSION = '@MeasureDimension'
      var countries = []
      var timeline = []
      var series = []
      var unique_country = ''
      var table_output = '<table class="table table-striped table-bordered">'
      
      console.log('----------------')
      resultSet.forEach(dp => {
        console.log(dp)
        const { rawValue, description } = dp[MEASURE_DIMENSION]
        const country = dp.Country.description
        const year = Number(dp.timeline.description)

        if (country !== unique_country)
        {
          unique_country = country
          console.log('before')
          table_output += '<br>'+ country +'</br>'
        }
        
        if (countries.indexOf(country) === -1) {
          countries.push(country)
        }
        if (timeline.indexOf(year) === -1) {
          timeline.push(year)
        }
        const iT = timeline.indexOf(year)
        series[iT] = series[iT] || []
        const iC = countries.indexOf(country)
        series[iT][iC] = series[iT][iC] || []

        let iV
        if (description === 'Income') { iV = 0 }
        if (description === 'LifeExpect') { iV = 1 }
        if (description === 'Population') { iV = 2 }
        series[iT][iC][iV] = rawValue
        series[iT][iC][3] = country
        series[iT][iC][4] = year
      })
    
      //table_output += '</tr>'
      table_output += '</table>'
      
      console.log(table_output)
      
      // Giving error: Cannot set properties of null (setting 'innerHTML')
      // below line
      //document.getElementById("my_data").innerHTML = table_output
      
      // Works well below line
      //this._armando2 = this._shadowRoot.getElementById('my_data').innerHTML = table_output
      // this._shadowRoot.getElementById('my_data').innerHTML = table_output
      
       var table_output2 = '<table><tr><th>Company</th><th>Contact</th><th>Country</th></tr><tr><td>Alfreds Futterkiste</td>'
       table_output2 += '<td>Maria Anders</td><td>Germany</td></tr><tr><td>Centro comercial Moctezuma</td><td>Francisco Chang</td>'
       table_output2 += '<td>Mexico</td></tr><tr><td>Ernst Handel</td><td>Roland Mendel</td><td>Austria</td></tr>'
       table_output2 += '<tr><td>Island Trading</td><td>Helen Bennett</td><td>UK</td></tr><tr><td>Laughing Bacchus Winecellars</td>'
       table_output2 += '<td>Yoshi Tannamuri</td><td>Canada</td></tr><tr><td>Magazzini Alimentari Riuniti</td><td>Giovanni Rovelli</td>'
       table_output2 += '<td>Italy</td></tr></table>'
      
      this._shadowRoot.getElementById('my_data').innerHTML = table_output2
      
    }
  }

  customElements.define('com-sap-sample-resultset3a', myResultSet3a)
})()
