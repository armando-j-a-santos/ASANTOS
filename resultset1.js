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
        background-color: #100c2a;
      }
      #placeholder {
        padding-top: 1em;
        text-align: center;
        font-size: 1.5em;
        color: white;
      }
      </style>
      <div id="root" style="width: 100%; height: 100%;">
        <div id="placeholder">myresultset data</div>
      </div>
    `
  class myResultSet extends HTMLElement {
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

      this._placeholder = this._root.querySelector('#placeholder')
      if (this._placeholder) {
        this._root.removeChild(this._placeholder)
        this._placeholder = null
      }
      const MEASURE_DIMENSION = '@MeasureDimension'
      const countries = []
      const timeline = []
      const series = []
      console.log('----------------')
      resultSet.forEach(dp => {
        console.log(dp)
        const { rawValue, description } = dp[MEASURE_DIMENSION]
        const country = dp.Country.description
        const year = Number(dp.timeline.description)

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
    
    }
  }

  customElements.define('com-sap-sample-resultset1', myResultSet)
})()
