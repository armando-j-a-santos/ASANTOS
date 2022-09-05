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
      
      .myGrey {
          background-color: #f2f2f2;
      }
      
      .myLightBlue {
          background-color: #c1dff7;
      }
      
      .myLightGreen {
          background-color: #e1f5e1;
      }
      
      .myLightRed {
          background-color: #fcd9e1;
      }
      
      ///////////////////////////////////////////////////////////////
      // Table CSS classes
      ///////////////////////////////////////////////////////////////
      
      table {
        font-family: arial, sans-serif;
        /* font-size: 15px; */
        border-collapse: collapse;
        width: 100%;
      }
      
      /* HEADER DEFINITION */
      th{ 
        position: sticky;   /* Freeze Header */
        top: 0px;           /* Don't forget this, required for the stickiness */
        border-bottom: 1px solid black;
        text-align: left;
        padding: 8px;
        
        background: white; /* Header background color */
        color: black;      /* Header text color */
      }
      
      /* CELL DEFINITION */
      td{
        border-bottom: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      // Alternative rows (white/grey background)
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
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">myresultset data</div>
        <div id="my_data">data...</div>
      </div>
    `
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // HTML extension with all necessary logic(s) wrtitten JS vvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv  
  class myNewBlendTableD1 extends HTMLElement {
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
    async render (resultSetA, resultSetB) {
      
      this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      
      // Table Wrapper & Scrollbar definition
      var table_output = '<div id="table-wrapper"><div id="table-scroll">'
      
      // Table Headers & Body
      table_output += '<table><thead><tr><th>Country</th><th>Year</th><th>Population</th><th>LifeExpect</th><th>Income</th></tr></thead><tbody>'
      
      // initialize counter of cells
      var counterCells = 1
      
      //console.log('----------------')
      //console.log('resultSet:')
      //console.log(resultSet)
      
      console.log('----------------')

      // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
      // Loop through the resultset delivered from the backend vvvvvvvvvvvv
      // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv      

      resultSetA.forEach(dp => {
        console.log(dp)
        console.log("(counterCells)-->" + counterCells)
         
        var cCountry = dp.Country.description
        var ctimeline = dp.timeline.description
          
        //Reset control bold for each row
        var cControlBold = false
          
        // Check if the year needs Totals
        if (ctimeline.length === 0) {
          ctimeline = "Totals"
            
          // A total row
          cControlBold = true
        }
          
        // Get the description & formattedValue from the measures (@MeasureDimension)
        var { formattedValue, description } = dp['@MeasureDimension']
          
        console.log("(description)-->" + description)     

        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        // DIMENSIONS BELOW vvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        

        
        // Increment the cells counter
        counterCells = counterCells + 1
        
        // Reset the counter for each row
        if (counterCells>3) 
        {
          // Close the row
          table_output += '</tr>'
          // Moved into a different country
          // Reset the counter, to start a new row
          counterCells = 1
          
          // Update first row handler
          if (firstRow) {
            firstRow = false
          }
        }     
      }) // END of loop --> resultSet.forEach(dp => {
    
      //Close all used tags
      table_output += '</tbody></table></div></div>'
    

      this._shadowRoot.getElementById('my_data').innerHTML = table_output
      
      //Export HTML table into XLS file (locally) if parameter (exportXLS) is Yes
      if (exportXLS === 'Yes')
      {
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table_output))
      }
    }
  } // END of method --> render
  
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // Return the end result to SAC (SAP ANALYTICS CLOUD) application vvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  customElements.define('com-sap-sample-newtabled1', myNewBlendTableD1)
  
})() // END of function --> (function () {