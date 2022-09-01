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


      ///////////////////////////////////////////////////////////////
      // Table CSS classes
      ///////////////////////////////////////////////////////////////
      
      table {
        font-family: arial, sans-serif;
        font-size: 1em;
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
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">myresultset data</div>
        <div id="my_data">data...</div>
      </div>
    `
  class myNewTableA14 extends HTMLElement {
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
    async render (resultSet, exportXLS, showDuplicates) {
      
      this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      
      // Table Wrapper & Scrollbar definition
      var table_output = '<div id="table-wrapper"><div id="table-scroll">'
      
      // Table Headers & Body
      table_output += '<table><thead><tr><th>Country</th><th>Year</th><th>Population</th><th>LifeExpect</th><th>Income</th></tr></thead><tbody>'
      
      // initialize counter of rows
      var counterRows = 1
      
      // initialize country duplicate control
      var previousCountry = ''
      
      // Control first row only
      var firstRow = true
      
      //console.log('----------------')
      //console.log('resultSet:')
      //console.log(resultSet)
      
      console.log('----------------')
      // Loop through the resultset
      resultSet.forEach(dp => {
          //console.log(dp)
         
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
          
          
          var { formattedValue, description } = dp['@MeasureDimension']
         
          // Another country
          if (counterRows === 1)
          {
            // Dimensions
            if (showDuplicates === "Yes")
                {
                   if (cControlBold === false)
                   {
                     table_output += '<tr><td>'+ cCountry +'</td>'
                   }
                   else {
                     if (firstRow)
                     {
                        table_output += '<tr><td class="myLightBlue"><b>'+ cCountry +'</b></td>'
                     } else {
                        table_output += '<tr><td class="myGrey"><b>'+ cCountry +'</b></td>'
                     }
                  }
                } else {
                    if (cCountry === previousCountry)
                    {
                        // Show a space char instead of the country to avoid duplicates
                        table_output += '<tr><td> </td>'
                    } else {
                           if (cControlBold === false)
                           {
                             table_output += '<tr><td>'+ cCountry +'</td>'
                           } else {
                              if (firstRow)
                                {
                                  table_output += '<tr><td class="myLightBlue"><b>'+ cCountry +'</b></td>'
                                } else {
                                  table_output += '<tr><td class="myGrey"><b>'+ cCountry +'</b></td>'
                              }
                           }
                      }
                  // Update previous country duplicate control variable
                  previousCountry = cCountry
              }
          
            if (cControlBold === false)
            {
              table_output += '<td>'+ ctimeline +'</td>'
            } else {
                if (firstRow)
                {              
                  table_output += '<td class="myLightBlue"><b>'+ ctimeline +'</b></td>'
                } else {
                  table_output += '<td class="myGrey"><b>'+ ctimeline +'</b></td>'
                }
            }
            
            // First Measures
            if (cControlBold === false)
            {
              table_output += '<td>'+ formattedValue +'</td>'
            } else {
                if (firstRow)
                {              
                  table_output += '<td class="myLightBlue"><b>'+ formattedValue +'</b></td>'
                } else {
                  table_output += '<td class="myGrey"><b>'+ formattedValue +'</b></td>'
                }
            } 
        } else {
          
            // Only the measures values to display
            if (cControlBold === false)
            {
              table_output += '<td>'+ formattedValue +'</td>'
            } else {
                if (firstRow)
                {              
                  table_output += '<td class="myLightBlue"><b>'+ formattedValue +'</b></td>'
                } else {
                  table_output += '<td class="myGrey"><b>'+ formattedValue +'</b></td>'
                }
            } 
        }

        counterRows = counterRows + 1
        
        // Reset the counter for each row
        if (counterRows>3) 
        {
          // Close the row
          table_output += '</tr>'
          // Moved into a different country
          // Reset the counter, to start a new row
          counterRows = 1
          
          // Update first row handler
          if (firstRow) {
            firstRow = false
          }
        }     
      })
    
      //Close all used tags
      table_output += '</tbody></table></div></div>'
      
      //console.log('table_output:')
      //console.log(table_output)
      
      //console.log('exportXLS:')
      //console.log(exportXLS)
    

      this._shadowRoot.getElementById('my_data').innerHTML = table_output
      
      //Export HTML table into XLS file (locally) if parameter (exportXLS) is Yes
      if (exportXLS === 'Yes')
      {
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table_output))
      }
    }
  }

  customElements.define('com-sap-sample-newtablea14', myNewTableA14)
})()
