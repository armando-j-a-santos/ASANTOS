(function() {
    let _shadowRoot;
    let div;
    let widgetName;
    var Ar = []; // Array
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
    <style>
    </style>
    `;

    class SAPTABLE03 extends HTMLElement {

        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            this._export_settings = {}; this._export_settings.title = ""; this._export_settings.subtitle = ""; this._export_settings.icon = "";
            this._export_settings.unit = ""; this._export_settings.footer = "";

            this.addEventListener("click", event => {
                console.log('click');

            });

            this._firstConnection = 0;
        }

        connectedCallback() {
        }

        disconnectedCallback() {
            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
        }

        onCustomWidgetAfterUpdate(changedProperties) {		
            var that = this;
            loadthis(that, changedProperties);
        }

        _firePropertiesChanged() {
            this.unit = "";
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        unit: this.unit
                    }
                }
            }));
        }
        
        static get observedAttributes() {
            return [
                "title",
                "subtitle",
                "icon",
                "unit",
                "footer",
                "link"
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("com-asantos-sap-sac-sapuitable2", SAPTABLE03);

    function loadthis(that, changedProperties) {
        var that_ = that;

        widgetName = changedProperties.widgetName;
        if (typeof widgetName === "undefined") {
            widgetName = that._export_settings.title.split("|")[0];
        }

        let div = document.createElement('div');
        div.slot = "content";
	
        let div2 = document.createElement('div');
        div2.innerHTML = `
	<script id="oViewsapuitable2_1" name="oViewsapuitable2_1" src='https://sapui5.hana.ondemand.com/resources/sap-ui-core.js' data-sap-ui-libs='sap.m,sap.ui.layout' data-sap-ui-theme="sap_fiori_3" data-sap-ui-compatversion="edge">
		<mvc:View xmlns:mvc="sap.ui.core.mvc" xmlns:m="sap.m" xmlns="sap.ui.table" xmlns:dnd="sap.ui.core.dnd" controllerName=""myView.Template">
			<Table id="table2" fixedColumnCount="1" visibleRowCount="5" rows="{path: '/ProductCollection', sorter: {path: 'serialId', descending: false} }">
				<columns>
					  <Column width="50px">
					    <m:Text text="S.No" />
					    <template>
					      <m:Text text="{serialId}" wrapping="false"  />
					    </template>
					  </Column>
					  <Column width="200px">
					    <m:Text text="EmployeeName" />
					    <template>
					      <m:Text text="{employeeName}" wrapping="false" />
					    </template>
					  </Column>
					  <Column width="200px">
					    <m:Text text="EmployeeId" />
					    <template>
					      <m:Text text="{employeeId}" wrapping="false" />
					    </template>
					  </Column>
					  <Column width="200px">
					    <m:Text text="Department" />
					    <template>
					      <m:Text text="{department}" wrapping="false" />
					    </template>
					  </Column>
					  <Column width="600px">
					    <m:Text text="Status" />
					    <template>
					      <m:Text text="{status}" wrapping="false" />
					    </template>
					  </Column>
				</columns>
		      </Table>
    		</mvc:View>
	</script>  
    	`;
	_shadowRoot.appendChild(div2);
       
        let div3 = document.createElement('div');
        div3.innerHTML = '<div style="max-height: "' + that.max_height + that.unit_option + '"; border-radius: 15px; overflow-y: hidden;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: ' + that.max_height + that.unit_option + '; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"> </slot></div></div>';
         _shadowRoot.appendChild(div3);

        that_.appendChild(div);
        
        var mapcanvas_divstr = _shadowRoot.getElementById('oView' + widgetName);

        Ar.push({
            'id': widgetName,
            'div': mapcanvas_divstr
        });

        sap.ui.getCore().attachInit(function() {
            "use strict";

            //### Controller ###
            sap.ui.define([
                "jquery.sap.global", "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/ui/core/library",
                "sap/ui/core/Core", 'sap/ui/model/Filter', 'sap/m/library', 'sap/m/MessageBox', 'sap/ui/unified/DateRange', 'sap/ui/core/format/DateFormat',
                'sap/ui/model/BindingMode', 'sap/ui/core/Fragment', 'sap/m/Token', 'sap/ui/model/FilterOperator', 'sap/ui/model/odata/ODataModel', 'sap/m/BusyDialog'
            ], function(jQuery, Controller, JSONModel, MessageToast, coreLibrary, Core, Filter, mobileLibrary, MessageBox, DateRange, DateFormat, BindingMode, 
			 Fragment, Token, FilterOperator, ODataModel, BusyDialog) {
                "use strict";

            var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

            return Controller.extend("myView.Template", {

                    onInit: function() {
                        
                    console.log('inside onInit>>>');
                        
                    // oData defintion (nodes, columns and rows)
                    // Create the model linked to the data (oData)
                    var oModel1 = new sap.ui.model.json.JSONModel();
                
                     this.getView().setModel(new JSONModel({
				ProductCollection: [{
				  serialId: 1,
				  employeeName: "John",
				  employeeId: 100,
				  department: "Accounting",
				  status: "Looking good!"
				},{
				  serialId: 2,
				  employeeName: "Sam",
				  employeeId: 101,
				  department: "IT",
				  status: "On sick leave"
				},{
				  serialId: 3,
				  employeeName: "Bob",
				  employeeId: 102,
				  department: "HR",
				  status: "Something something..."
				}]
			}), that.widgetName);
                }
                });
            });

            console.log("WidgetName Finale:" + widgetName);
            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            console.log(divfinal);

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });
            oView.placeAt(div);
            
        });
    } // end of: function loadthis

})();
