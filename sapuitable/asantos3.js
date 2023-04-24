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

        /*
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
        */

        /*
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
        */

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }

    }
    customElements.define("com-asantos-sap-sac-sapuitable", ASANTOS);

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

                            var oData = [
                                {
                                  "text": "Node1",
                                  "ref": "sap-icon://attachment-audio",
                                  "nodes":
                                  [
                                      {
                                          "text": "Node1-1",
                                          "ref": "sap-icon://attachment-e-pub",
                                          "nodes":[
                                              {
                                                  "text": "Node1-1-1",
                                                  "ref": "sap-icon://attachment-html"
                                              },
                                              {
                                                  "text": "Node1-1-2",
                                                  "ref": "sap-icon://attachment-photo",
                                                  "nodes":[
                                                      {
                                                          "text": "Node1-1-2-1",
                                                          "ref": "sap-icon://attachment-text-file",
                                                          "nodes":[
                                                              {
                                                                  "text": "Node1-1-2-1-1",
                                                                  "ref": "sap-icon://attachment-video"
                                                              },
                                                              {
                                                                  "text": "Node1-1-2-1-2",
                                                                  "ref": "sap-icon://attachment-zip-file"
                                                              },
                                                              {
                                                                  "text": "Node1-1-2-1-3",
                                                                  "ref": "sap-icon://course-program"
                                                              }
                                                          ]
                                                      }
                                                  ]
                                              }
                                          ]
                                      },
                                      {
                                          "text": "Node1-2",
                                          "ref": "sap-icon://create"
                                      }
                                  ]
                              },
                              {
                                  "text": "Node2",
                                  "ref": "sap-icon://customer-financial-fact-sheet"
                              }
                            ];

                             // Create the model linked to the data (oData)
                            var _oModel = new JSONModel(oData);
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