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
      
      .scrollingtable {
        box-sizing: border-box;
        display: inline-block;
        vertical-align: middle;
        overflow: hidden;
        width: auto; /*set table width here if using fixed value*/
        /*min-width: 100%;*/ /*set table width here if using %*/
        height: 188px; /*set table height here; can be fixed value or %*/
        /*min-height: 104px;*/ /*if using % height, make this at least large enough to fit scrollbar arrows + captions + thead*/
        font-family: Verdana, Tahoma, sans-serif;
        font-size: 15px;
        line-height: 20px;
        padding-top: 20px; /*this determines top caption height*/
        padding-bottom: 20px; /*this determines bottom caption height*/
        text-align: left;
      }
      .scrollingtable * {box-sizing: border-box;}
      .scrollingtable > div {
        position: relative;
        border-top: 1px solid black; /*top table border*/
        height: 100%;
        padding-top: 20px; /*this determines column header height*/
      }
      .scrollingtable > div:before {
        top: 0;
        background: cornflowerblue; /*column header background color*/
      }
      .scrollingtable > div:before,
      .scrollingtable > div > div:after {
        content: "";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 50%;
        left: 0;
      }
      .scrollingtable > div > div {
        /*min-height: 43px;*/ /*if using % height, make this at least large enough to fit scrollbar arrows*/
        max-height: 100%;
        overflow: scroll; /*set to auto if using fixed or % width; else scroll*/
        overflow-x: hidden;
        border: 1px solid black; /*border around table body*/
      }
      .scrollingtable > div > div:after {background: white;} /*match page background color*/
      .scrollingtable > div > div > table {
        width: 100%;
        border-spacing: 0;
        margin-top: -20px; /*inverse of column header height*/
        /*margin-right: 17px;*/ /*uncomment if using % width*/
      }
      .scrollingtable > div > div > table > caption {
        position: absolute;
        top: -20px; /*inverse of caption height*/
        margin-top: -1px; /*inverse of border-width*/
        width: 100%;
        font-weight: bold;
        text-align: center;
      }
      .scrollingtable > div > div > table > * > tr > * {padding: 0;}
      .scrollingtable > div > div > table > thead {
        vertical-align: bottom;
        white-space: nowrap;
        text-align: center;
      }
      .scrollingtable > div > div > table > thead > tr > * > div {
        display: inline-block;
        padding: 0 6px 0 6px; /*header cell padding*/
      }
      .scrollingtable > div > div > table > thead > tr > :first-child:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 20px; /*match column header height*/
        border-left: 1px solid black; /*leftmost header border*/
      }
      .scrollingtable > div > div > table > thead > tr > * > div[label]:before,
      .scrollingtable > div > div > table > thead > tr > * > div > div:first-child,
      .scrollingtable > div > div > table > thead > tr > * + :before {
        position: absolute;
        top: 0;
        white-space: pre-wrap;
        color: white; /*header row font color*/
      }
      .scrollingtable > div > div > table > thead > tr > * > div[label]:before,
      .scrollingtable > div > div > table > thead > tr > * > div[label]:after {content: attr(label);}
      .scrollingtable > div > div > table > thead > tr > * + :before {
        content: "";
        display: block;
        min-height: 20px; /*match column header height*/
        padding-top: 1px;
        border-left: 1px solid black; /*borders between header cells*/
      }
      .scrollingtable .scrollbarhead {float: right;}
      .scrollingtable .scrollbarhead:before {
        position: absolute;
        width: 100px;
        top: -1px; /*inverse border-width*/
        background: white; /*match page background color*/
      }
      .scrollingtable > div > div > table > tbody > tr:after {
        content: "";
        display: table-cell;
        position: relative;
        padding: 0;
        border-top: 1px solid black;
        top: -1px; /*inverse of border width*/
      }
      .scrollingtable > div > div > table > tbody {vertical-align: top;}
      .scrollingtable > div > div > table > tbody > tr {background: white;}
      .scrollingtable > div > div > table > tbody > tr > * {
        border-bottom: 1px solid black;
        padding: 0 6px 0 6px;
        height: 20px; /*match column header height*/
      }
      .scrollingtable > div > div > table > tbody:last-of-type > tr:last-child > * {border-bottom: none;}
      .scrollingtable > div > div > table > tbody > tr:nth-child(even) {background: gainsboro;} /*alternate row color*/
      .scrollingtable > div > div > table > tbody > tr > * + * {border-left: 1px solid black;} /*borders between body cells*/
      ///////////////////////////////////////////////////////////////
      
      
      </style>
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">myresultset data</div>
        <div class="scrollingtable">
        <div id="my_data">data...</div>
      </div>
    `
  class myResultSet5b extends HTMLElement {
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

  customElements.define('com-sap-sample-resultset5b', myResultSet5b)
})()
