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
      
      ///////////////////////////////////////////////////////////////
      // Scrollbar necessary CSS classes
      ///////////////////////////////////////////////////////////////
      #table-wrapper {
        position:relative;
      }
      #table-scroll {
        height:150px;
        overflow:auto;  
        margin-top:20px;
      }
      #table-wrapper table {
        width:100%;

      }
      #table-wrapper table * {
        background:yellow;
        color:black;
      }
      #table-wrapper table thead th .text {
        position:absolute;   
        top:-20px;
        z-index:2;
        height:20px;
        width:35%;
        border:1px solid red;
      }
      ///////////////////////////////////////////////////////////////
      
      </style>
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">myresultset data</div>
        <div class="table-wrapper>
          <div id="table-scroll">
            <div id="my_data">data...</div>
          </div>
        </div>
      </div>
    `
  class myResultSet5e extends HTMLElement {
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
      
      this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      
      // Table Headers definition
      var table_output = '<table><thead><tr><th>Country</th><th>Year</th><th>Population</th><th>LifeExpect</th><th>Income</th></tr></thead><tbody>'
          //<!--ALWAYS ADD THIS EXTRA CELL AT END OF HEADER ROW-->
          table_output += '<th class="scrollbarhead"/>'
      
      // initialize counter of rows
      var counterRows = 1
      
      console.log('----------------')
      // Loop through the resultset
      resultSet.forEach(dp => {
         console.log(dp)
         var cCountry = dp.Country.description
         var ctimeline = dp.timeline.description
         var { formattedValue, description } = dp['@MeasureDimension']
         
        if (counterRows === 1)
        {
          // Dimensions
          table_output += '<tr><td>'+ cCountry +'</td>'
          table_output += '<td>'+ ctimeline +'</td>'
          // First Measures
          table_output += '<td>'+ formattedValue +'</td>'
        } else {
            // Only the measures values to display
           table_output += '<td>'+ formattedValue +'</td>'
        }

        counterRows = counterRows + 1
        
        // Reset the counter for each row
        if (counterRows>3) 
        {
          // Close the row
          table_output += '</tr>'
          // Reset the counter, to start a new row
          counterRows = 1
        }
        
      })
    
      //Close the table tag
      table_output += '</tbody></table>'
      
      console.log(table_output)
      
      this._shadowRoot.getElementById('my_data').innerHTML = table_output
      
    }
  }

  customElements.define('com-sap-sample-resultset5e', myResultSet5e)
})()
