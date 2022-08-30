var getScriptPromisify = (src) => {
  return new Promise(resolve => {
    $.getScript(src, resolve)
  })
}

(function () {
  
  // Table Wrapper & Scrollbar definition
  var table_output = '<div id="table-wrapper"><div id="table-scroll">'
      
  const template = document.createElement('template')
  
  template.innerHTML = `

      <body>
        
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
      
      ///////////////////////////////////////////////////////////////
      // Table CSS classes
      ///////////////////////////////////////////////////////////////
      
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      /* HEADER DEFINITION */
      th{ 
        position: sticky;   /* Freeze Header */
        top: 0px;          /* Don't forget this, required for the stickiness */
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
        
        background: white; /* Header background color */
        color: black;      /* Header text color */
      }
      
      /* CELL DEFINITION */
      td{
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
        height:500px;
        overflow:auto;  
        margin-top:20px;
      }
      #table-wrapper table {
        width:100%;
      }
      #table-wrapper table * {
        /* background:yellow; */
        color:black;
      }
      #table-wrapper table thead th .text {
        position:absolute;   
        top:-20px;
        z-index:2;
        height:100%;
        width:100%;
        border:1px solid black;
      }
      ///////////////////////////////////////////////////////////////
      
      </style>
      <script>
          var HTML = '<div>Replaced</div>';
    
          function runA() {
            document.querySelector('#contents').innerHTML = HTML;
          }
      </script> 
      
      <div id="root" style="width: 100%; height: 100%;">
      <script>
          var HTML = '<div>Replaced</div>';
    
          function runA() {
            document.querySelector('#contents').innerHTML = HTML;
          }
      </script>         
        <button type="button" onclick="runA()">Run script</button>
      <script>
          var HTML = '<div>Replaced</div>';
    
          function runA() {
            document.querySelector('#contents').innerHTML = HTML;
          }
      </script>         
        <div id="contents">---</div>
         
        <div id="placeholder">myresultset data</div>
        <div id="my_data">data...</div>
      </div> 
      <script>
          var HTML = '<div>Replaced</div>';
    
          function runA() {
            document.querySelector('#contents').innerHTML = HTML;
          }
      </script>       
      </body>
    `

    
  class myResultSetExport7b21 extends HTMLElement {
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
      
      // Table Headers & Body
      table_output += '<table><thead><tr><th>Country</th><th>Year</th><th>Population</th><th>LifeExpect</th><th>Income</th></tr></thead><tbody>'
      
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
    
      //Close all used tags
      table_output += '</tbody></table></div></div>'
      
      console.log(table_output)
      
      this._shadowRoot.getElementById('my_data').innerHTML = table_output   
      
    }
  }

  customElements.define('com-sap-sample-result7b21', myResultSetExport7b21)
})()
