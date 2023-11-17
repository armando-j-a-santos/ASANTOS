(function() {
    let _shadowRoot;

    let div;
    let widgetName;
    var Ar = [];

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
      </style>      
    `;

    class ASANTOS extends HTMLElement {

        constructor() {
            super();

            _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));

            /*
            _id = createGuid();
            _shadowRoot.querySelector("#oView").id = "oView";
            */

            this._export_settings = {};
            this._export_settings.title = "";
            this._export_settings.subtitle = "";
            this._export_settings.icon = "";
            this._export_settings.unit = "";
            this._export_settings.footer = "";

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


        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("com-asantos-sap-sac-saptreetable", ASANTOS);

    function loadthis(that, changedProperties) {
        var that_ = that;

        widgetName = changedProperties.widgetName;
        if (typeof widgetName === "undefined") {
            widgetName = that._export_settings.title.split("|")[0];
        }

        div = document.createElement('div');
        div.slot = "content_" + widgetName;

            
        let div2 = document.createElement('div');
        div2.innerHTML = '<script id="oView' + widgetName + '" name="oView' + widgetName + '" type="sapui5/xmlview"><mvc:View controllerName="myView.Template" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc"  xmlns="sap.m"><Tree class=""  id="Tree"  items="{' + widgetName + '>/}" mode="MultiSelect"  selectionChange="onSelect" includeItemInSelection="true" updateFinished="onDefaultSelction"><headerToolbar></headerToolbar><StandardTreeItem title="{' + widgetName + '>text}" selected="{selected}"/></Tree></mvc:View></script>';
        _shadowRoot.appendChild(div2);
       
        
        let div3 = document.createElement('div');
        div3.innerHTML = '<div style="max-height: "' + that.max_height + that.unit_option + '"; border-radius: 15px; overflow-y: hidden;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><div style="max-height: ' + that.max_height + that.unit_option + '; border-radius: 15px; overflow-y: auto;" id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"> </slot></div></div>';
         _shadowRoot.appendChild(div3);

        
        let div4 =document.createElement('div');
        div4.innerHTML = `
            <script src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
                type="text/javascript"
                id="sap-ui-bootstrap"
                data-sap-ui-libs="sap.m,sap.ui.commons,sap.ui.table,sap.ui.layout"
                data-sap-ui-theme="sap_bluecrystal">
            </script>
        
            <div id="dataTable"></div>  
        `;

        
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
                "jquery.sap.global",
                "sap/ui/core/mvc/Controller",
                "sap/ui/model/json/JSONModel",
                "sap/m/MessageToast",
                "sap/ui/core/library",
                "sap/ui/core/Core",
                'sap/ui/model/Filter',
                'sap/m/library',
                'sap/m/MessageBox',
                'sap/ui/unified/DateRange',
                'sap/ui/core/format/DateFormat',
                'sap/ui/model/BindingMode',
                'sap/ui/core/Fragment',
                'sap/m/Token',
                'sap/ui/model/FilterOperator',
                'sap/ui/model/odata/ODataModel',
                'sap/m/BusyDialog'
            ], function(jQuery, Controller, JSONModel, MessageToast, coreLibrary, Core, Filter, mobileLibrary, MessageBox, DateRange, DateFormat, BindingMode, Fragment, Token, FilterOperator, ODataModel, BusyDialog) {
                "use strict";

                var busyDialog = (busyDialog) ? busyDialog : new BusyDialog({});

                return Controller.extend("myView.Template", {

                    onInit: function() {
                        
                        console.log('>>>>>>>>>>>>>>>inside onInit');
                        
                            // oData defintion (nodes, columns and rows)
                            /*
                            var oData = [{
                              text: "Node1",
                              nodes: [{
                                text: "Node1-1"
                              }]
                            }, {
                              text: "Node2",
                              nodes: [{
                                text: "Node2-1"
                              }]
                            }];
                            */
                           //ADD -------------------------------------------
                            var oData = {  "catalog": {
                                "clothing": {
                                  "categories": [
                                    {"name1": "Women", "amount": 160.99, "currency": "EUR", "size": "S", "selected": "X", "categories": [
                                      {"name1":"Clothing", "categories": [
                                         {"name1": "Dresses", "amount": 16.99, "currency": "EUR", "size": "S", "selected": "X", 
                                          "categories": [
                                         {"name1": "Casual Red Dress", "amount": 16.99, "currency": "EUR", "size": "S", "selected": "X"},
                                         {"name1": "Short Black Dress", "amount": 47.99, "currency": "EUR", "size": "M"},
                                         {"name1": "Long Blue Dinner Dress", "amount": 103.99, "currency": "USD", "size": "L"}
                                        ]},
                                        {"name1": "Tops", "categories": [
                                          {"name1": "Printed Shirt", "amount": 24.99, "currency": "USD", "size": "M"},
                                          {"name1": "Tank Top", "amount": 14.99, "currency": "USD", "size": "S"}
                                        ]},
                                        {"name1": "Pants", "categories": [
                                          {"name1": "Red Pant", "amount": 32.99, "currency": "USD", "size": "M"},
                                          {"name1": "Skinny Jeans", "amount": 44.99, "currency": "USD", "size": "S"},
                                          {"name1": "Black Jeans", "amount": 99.99, "currency": "USD", "size": "XS"},
                                          {"name1": "Relaxed Fit Jeans", "amount": 56.99, "currency": "USD", "size": "L"}
                                        ]},
                                        {"name1": "Skirts", "categories": [
                                          {"name1": "Striped Skirt", "amount": 24.99, "currency": "USD", "size": "M"},
                                          {"name1": "Black Skirt", "amount": 44.99, "currency": "USD", "size": "S"}
                                        ]}
                                      ]},
                                      {"name1":"Jewelry", "categories": [
                                          {"name1": "Necklace", "amount": 16.99, "currency": "USD"},
                                          {"name1": "Bracelet", "amount": 47.99, "currency": "USD"},
                                          {"name1": "Gold Ring", "amount": 399.99, "currency": "USD"}
                                        ]},
                                      {"name1":"Handbags", "categories": [
                                        {"name1": "Little Black Bag", "amount": 16.99, "currency": "USD", "size": "S"},
                                        {"name1": "Grey Shopper", "amount": 47.99, "currency": "USD", "size": "M"}
                                      ]},
                                      {"name1":"Shoes", "categories": [
                                        {"name1": "Pumps", "amount": 89.99, "currency": "USD"},
                                        {"name1": "Sport Shoes", "amount": 47.99, "currency": "USD"},
                                        {"name1": "Boots", "amount": 103.99, "currency": "USD"}
                                      ]}
                                    ]}]}
                            }};
                            
                            
                             //ADD -------------------------------------------
                            var treeTable = new sap.ui.table.TreeTable({
                                title:"Tree Table",
                                selectionMode : sap.ui.table.SelectionMode.None,
                                editable:true,
                                ariaLabelledBy:"title",
                                toggleOpenState: function (oEvent) {}
                            });
                            

                            //ADD----------------   // Create the model linked to the data (oData)
                            var _oModel = new sap.ui.model.json.JSONModel(OData);
                            _oModel =   treeTable.setModel(OData);
                            _oModel =   treeTable.addColumn(new sap.ui.table.Column({
                                        label: new sap.ui.commons.Label({text: "Categories - AAA"}),
                                        template: new sap.m.Text({ text : "{name1}"}),
                                        sortProperty: "NscItem"}));
                            _oModel =    treeTable.addColumn(new sap.ui.table.Column({
                                        label: new sap.ui.commons.Label({text: "Armando"}),
                                        template: new sap.m.Text({ text : "{amount}"}),
                                        sortProperty: "NscItem"}));
                            _oModel =   treeTable.addColumn(new sap.ui.table.Column({
                                        label: new sap.ui.commons.Label({text: "SANTOS"}),
                                        template: new sap.m.Text({ text : "{currency}"}),
                                        sortProperty: "NscItem"}));
                            _oModel =treeTable.addColumn(new sap.ui.table.Column({
                                        label: new sap.ui.commons.Label({text: "Size"}),
                                        template: new sap.m.Text({ text : "{size}"}),
                                        sortProperty: "NscItem"}));
                            _oModel =treeTable.bindRows("/catalog/clothing/");
                            _oModel =treeTable.placeAt("dataTable");

                             // Create the model linked to the data (oData)
                            //var _oModel = new JSONModel(oData);
                            _oModel.setSizeLimit(1000000);
                            
                            // Link the model to the widget
                            this.getView()
                                .setModel(_oModel, that.widgetName);
                            sap.ui.getCore().setModel(_oModel, that.widgetName);
                    }

                });
            });

            console.log("WidgetName Final:" + widgetName);
            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            console.log(divfinal);

            
            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });
            oView.placeAt(div);
            
        });
    } // end of: function loadthis(that, changedProperties) {

    
})();
