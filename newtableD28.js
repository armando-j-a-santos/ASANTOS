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
  class myNewBlendTableD28 extends HTMLElement {
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
      table_output += '<table><thead><tr><th>Country</th><th>Year</th><th>Population</th><th>LifeExpect</th><th>Income</th>'
      table_output += '<th>LifeExpect Variation %</th><th>Income Variation %</th>'
      table_output += '</tr></thead><tbody>'
      
      // initialize counter of cells
      var counterCells = 1
      
      // initialize country duplicate control
      var previousCountry = ''
      
      // initialize country duplicate control
      var previousCountryResultSetB = ''
      
      // Control first row only
      var firstRow = true      
      
      // To save variation percentages coming from ResultSetB
      var LifeExpectPercentage = ""
      var IncomePercentage = ""
      
      //console.log('----------------')
      //console.log('resultSet:')
      //console.log(resultSet)
      //console.log('----------------')

      // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
      // Loop through the resultset delivered from the backend vvvvvvvvvvvv
      // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv      

      resultSetA.forEach(dp => {
        //console.log(dp)
        //console.log("(counterCells)-->" + counterCells)
         
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
          
        //console.log("(description)-->" + description)     

        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        // DIMENSIONS BELOW vvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        
        // Country
        if (counterCells===1)
        {
               if (firstRow)
               {  
                  table_output += '<tr><td class="myLightBlue"><b>'+ cCountry +'</b></td>'
               } else {
                 if (cCountry === previousCountry)
                 {
                      // Show a space char instead of the country to avoid duplicates
                      table_output += '<tr><td> </td>'
                  } else {
                      table_output += '<tr><td><b>'+ cCountry +'</b></td>'
                  }
               }
        }

        // Update previous country duplicate control variable
        previousCountry = cCountry        
        
        // Year
        if (counterCells===1)
        {
               if (firstRow)
               {          
                  table_output += '<td class="myLightBlue"><b>'+ ctimeline +'</b></td>'
               } else {
                 table_output += '<td><b>'+ ctimeline +'</b></td>'
               }
        }
        
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        // Control NULL values coming from backend within any measures vvvvvvvvvvvv
        // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
        
        if (counterCells === 1)
        {
              if (description !== "Population")
              {
                // Show - sign as NULL value comeing from backend
                table_output += '<td><font style="font-size:14px;"> - </font></td>'
                //console.log("missing Population") 
                counterCells = counterCells + 1
              }
        } else if (counterCells === 2) {
              if (description !== "LifeExpect")
              {
                // Show - sign as NULL value comeing from backend
                table_output += '<td><font style="font-size:14px;"> - </font></td>'
                //console.log("missing LifeExpect") 
                counterCells = counterCells + 1                
              }
        } else if (counterCells === 3) {
              if (description !== "Income")
              {
                // Show - sign as NULL value comeing from backend
                table_output += '<td><font style="font-size:14px;"> - </font></td>'
                //console.log("missing Income") 
                counterCells = counterCells + 1
              }
         }
          
        // Write measure value
        if (firstRow)
        {
            table_output += '<td class="myLightBlue"><b>'+ formattedValue +'</b></td>'
        } else {
            table_output += '<td><font style="font-size:12px;">'+ formattedValue +'</font></td>' 
        }
        
        // Increment the cells counter
        counterCells = counterCells + 1
        
        // Reset the counter for each row
        if (counterCells>3) 
        {
          // Moved into a different country
          // Reset the counter, to start a new row
          counterCells = 1
          
          // Update first row handler
          if (firstRow) {
            firstRow = false
          }
          
          // Exclude first row of totals
          if (cCountry !== "Totals")
          {     
            // To avoid un-necessary loops through a country that we have already the information needed
            if (cCountry !== previousCountryResultSetB)
            {
                // Control the 2nd foreach loop
                var out = false;
                var number_of_measures = 0
              
                // Other table source
                resultSetB.forEach(dpB => {
                  if(out) { return } // Break the resultSetB.forEach loop

                  var cCountry2 = dpB.Country.description

                  //console.log(cCountry2 + " / " + cCountry)

                  if (cCountry2 === cCountry)
                  {
                      // Get the description & formattedValue from the measures (@MeasureDimension)
                      var { formattedValue, description } = dpB['@MeasureDimension']
                      //console.log ('EQUAL -->' + cCountry2)
                      //console.log(formattedValue)
                      //console.log(description)
                    
                      // Add into the table layout the % variation values (LifeExpect & Income)
                      table_output += '<td><font style="font-size:12px;">'+ formattedValue +'</font></td>' 
                    
                      if (number_of_measures === 1) // LifeExpect Variation %
                      {
                        LifeExpectPercentage = formattedValue
                      } else if (number_of_measures === 2) // Income Variation %
                      {
                        IncomePercentage = formattedValue
                      }

                      number_of_measures = number_of_measures + 1
                  }

                  if (number_of_measures>=2) // LifeExpect Variation %   and   Income Variation %
                  {
                    // Update previous country variable
                    previousCountryResultSetB = cCountry
                    number_of_measures = 0        // Reset this measure to be used afterwards in logic --> if (cCountry !== previousCountryResultSetB)
                    out = true;                   // To break the resultSetB.forEach loop
                  }

                }) // END of loop --> resultSet.forEach(dpB => { 
              
            } else { // if (cCountry !== previousCountryResultSetB)
                number_of_measures = number_of_measures + 1
              
                if (number_of_measures === 1) // LifeExpect Variation %
                {
                      // Add into the table layout the saved % LifeExpect variation value
                      table_output += '<td><font style="font-size:12px;">'+ LifeExpectPercentage +'</font></td>' 
                } else if (number_of_measures === 2) // Income Variation %
                {
                      // Add into the table layout the saved % Income variation value
                      table_output += '<td><font style="font-size:12px;">'+ IncomePercentage +'</font></td>' 
                }
            }
          } // if (cCountry !== "Totals")
          
          // Close the row with /tr
          table_output += '</tr>'
          
        } // END of if (counterCells>3)
 
      }) // END of loop --> resultSet.forEach(dp => {
      
      //Close all used tags
      table_output += '</tbody></table></div></div>'
    
      //console.log('----------------')
      //console.log(table_output)
      
      this._shadowRoot.getElementById('my_data').innerHTML = table_output
      
      //Export HTML table into XLS file (locally) if parameter (exportXLS) is Yes
      //window.open('data:application/vnd.ms-excel,' + encodeURIComponent(table_output))

    }
  } // END of method --> render
  
  
  
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  // Return the end result to SAC (SAP ANALYTICS CLOUD) application vvvvvvvvvvvvvvvvvvvvv
  // vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
  customElements.define('com-sap-sample-newtabled28', myNewBlendTableD28)
  
})() // END of function --> (function () {
