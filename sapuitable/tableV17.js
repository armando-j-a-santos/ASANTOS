(function() {
    let _shadowRoot;
    //////let _id;
    //////let _score;

    let div;
    let widgetName;
    var Ar = [];

    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
      </style>      
    `;

    class sapuitableV17 extends HTMLElement {

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
            /*
            try {
                if (window.commonApp) {
                    let outlineContainer = commonApp.getShell().findElements(true, ele => ele.hasStyleClass && ele.hasStyleClass("sapAppBuildingOutline"))[0]; // sId: "__container0"

                    if (outlineContainer && outlineContainer.getReactProps) {
                        let parseReactState = state => {
                            let components = {};

                            let globalState = state.globalState;
                            let instances = globalState.instances;
                            let app = instances.app["[{\"app\":\"MAIN_APPLICATION\"}]"];
                            let names = app.names;

                            for (let key in names) {
                                let name = names[key];

                                let obj = JSON.parse(key).pop();
                                let type = Object.keys(obj)[0];
                                let id = obj[type];

                                components[id] = {
                                    type: type,
                                    name: name
                                };
                            }

                            for (let componentId in components) {
                                let component = components[componentId];
                            }

                            let metadata = JSON.stringify({
                                components: components,
                                vars: app.globalVars
                            });

                            if (metadata != this.metadata) {
                                this.metadata = metadata;

                                this.dispatchEvent(new CustomEvent("propertiesChanged", {
                                    detail: {
                                        properties: {
                                            metadata: metadata
                                        }
                                    }
                                }));
                            }
                        };

                        let subscribeReactStore = store => {
                            this._subscription = store.subscribe({
                                effect: state => {
                                    parseReactState(state);
                                    return {
                                        result: 1
                                    };
                                }
                            });
                        };

                        let props = outlineContainer.getReactProps();
                        if (props) {
                            subscribeReactStore(props.store);
                        } else {
                            let oldRenderReactComponent = outlineContainer.renderReactComponent;
                            outlineContainer.renderReactComponent = e => {
                                let props = outlineContainer.getReactProps();
                                subscribeReactStore(props.store);

                                oldRenderReactComponent.call(outlineContainer, e);
                            }
                        }
                    }
                }
            } catch (e) {}
            */
        }

        disconnectedCallback() {
            if (this._subscription) { // react store subscription
                this._subscription();
                this._subscription = null;
            }
        }

        onCustomWidgetBeforeUpdate(changedProperties) {
            /*
            if ("designMode" in changedProperties) {
                this._designMode = changedProperties["designMode"];
            }
            */
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
    customElements.define("com-asantos-sap-sac-sapuitable", sapuitableV17);

    // UTILS
    function loadthis(that, changedProperties) {
        var that_ = that;

        widgetName = changedProperties.widgetName;
        if (typeof widgetName === "undefined") {
            widgetName = that._export_settings.title.split("|")[0];
        }

        div = document.createElement('div');
        div.slot = "content_" + widgetName;

        let div0 = document.createElement('div');
        div0.innerHTML = '<?xml version="1.0"?><script id="oView_' + widgetName + '" name="oView_' + widgetName + '" type="sapui5/xmlview"><mvc:View height="100%" xmlns="sap.m" xmlns:l="sap.ui.layout" xmlns:core="sap.ui.core" xmlns:mvc="sap.ui.core.mvc" controllerName="myView.Template"><l:VerticalLayout class="sapUiContentPadding" width="100%"><l:content><MultiInput width="100%" id="multiInput" suggestionItems="{' + widgetName + '>/}" valueHelpRequest="handleValueHelp"><core:Item key="{' + widgetName + '>partner}" text="{' + widgetName + '>partner}" /></MultiInput></l:content><Button id="buttonId" class="sapUiSmallMarginBottom" text="Get Score" width="150px /></l:VerticalLayout></mvc:View></script>';
        _shadowRoot.appendChild(div0);

        /*
        let div1 = document.createElement('div');
        div1.innerHTML = '<?xml version="1.0"?><script id="myXMLFragment_' + widgetName + '" type="sapui5/fragment"><core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><SelectDialog title="Partner Number" class="sapUiPopupWithPadding"  items="{' + widgetName + '>/}" search="_handleValueHelpSearch"  confirm="_handleValueHelpClose"  cancel="_handleValueHelpClose"  multiSelect="true" showClearButton="true" rememberSelections="true"><StandardListItem icon="{' + widgetName + '>ProductPicUrl}" iconDensityAware="false" iconInset="false" title="{' + widgetName + '>partner}" description="{' + widgetName + '>partner}" /></SelectDialog></core:FragmentDefinition></script>';
        _shadowRoot.appendChild(div1);

        let div2 = document.createElement('div');
        div2.innerHTML = '<div id="ui5_content_' + widgetName + '" name="ui5_content_' + widgetName + '"><slot name="content_' + widgetName + '"></slot></div>';
        _shadowRoot.appendChild(div2);
        */

        that_.appendChild(div);

        var mapcanvas_divstr = _shadowRoot.getElementById('oView_' + widgetName);
        var mapcanvas_fragment_divstr = _shadowRoot.getElementById('myXMLFragment_' + widgetName);

        Ar.push({
            'id': widgetName,
            'div': mapcanvas_divstr,
            'divf': mapcanvas_fragment_divstr
        });

        //that_._renderExportButton();

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
                        
                        console.log('>>>>>>>>>>>>>>>++++');

                        /////if (that._firstConnection === 0) {
                        /////    that._firstConnection = 1;
                        /////} else {
                            var _oModel = new JSONModel("armando-j-a-santos.github.io/ASANTOS/sapuitable/Clothing.json");

                            var selOrgJson = [
                                {
                                    "catalog": {
                                      "clothing": {
                                        "categories": [
                                          {"name": "Women", "categories": [
                                            {"name":"Clothing", "categories": [
                                              {"name": "Dresses", "categories": [
                                                {"name": "Casual Red Dress", "amount": 16.99, "currency": "EUR", "size": "S"},
                                                {"name": "Short Black Dress", "amount": 47.99, "currency": "EUR", "size": "M"},
                                                {"name": "Long Blue Dinner Dress", "amount": 103.99, "currency": "USD", "size": "L"}
                                              ]},
                                              {"name": "Tops", "categories": [
                                                {"name": "Printed Shirt", "amount": 24.99, "currency": "USD", "size": "M"},
                                                {"name": "Tank Top", "amount": 14.99, "currency": "USD", "size": "S"}
                                              ]},
                                              {"name": "Pants", "categories": [
                                                {"name": "Red Pant", "amount": 32.99, "currency": "USD", "size": "M"},
                                                {"name": "Skinny Jeans", "amount": 44.99, "currency": "USD", "size": "S"},
                                                {"name": "Black Jeans", "amount": 99.99, "currency": "USD", "size": "XS"},
                                                {"name": "Relaxed Fit Jeans", "amount": 56.99, "currency": "USD", "size": "L"}
                                              ]},
                                              {"name": "Skirts", "categories": [
                                                {"name": "Striped Skirt", "amount": 24.99, "currency": "USD", "size": "M"},
                                                {"name": "Black Skirt", "amount": 44.99, "currency": "USD", "size": "S"}
                                              ]}
                                            ]},
                                            {"name":"Jewelry", "categories": [
                                                {"name": "Necklace", "amount": 16.99, "currency": "USD"},
                                                {"name": "Bracelet", "amount": 47.99, "currency": "USD"},
                                                {"name": "Gold Ring", "amount": 399.99, "currency": "USD"}
                                              ]},
                                            {"name":"Handbags", "categories": [
                                              {"name": "Little Black Bag", "amount": 16.99, "currency": "USD", "size": "S"},
                                              {"name": "Grey Shopper", "amount": 47.99, "currency": "USD", "size": "M"}
                                            ]},
                                            {"name":"Shoes", "categories": [
                                              {"name": "Pumps", "amount": 89.99, "currency": "USD"},
                                              {"name": "Sport Shoes", "amount": 47.99, "currency": "USD"},
                                              {"name": "Boots", "amount": 103.99, "currency": "USD"}
                                            ]}
                                          ]},
                                          {"name": "Men", "categories": [
                                            {"name":"Clothing", "categories": [
                                              {"name": "Shirts", "categories": [
                                                {"name": "Black T-shirt", "amount": 9.99, "currency": "USD", "size": "XL"},
                                                {"name": "Polo T-shirt", "amount": 47.99, "currency": "USD", "size": "M"},
                                                {"name": "White Shirt", "amount": 103.99, "currency": "USD", "size": "L"}
                                              ]},
                                              {"name": "Pants", "categories": [
                                                {"name": "Blue Jeans", "amount": 78.99, "currency": "USD", "size": "M"},
                                                {"name": "Stretch Pant", "amount": 54.99, "currency": "USD", "size": "S"}
                                              ]},
                                              {"name": "Shorts", "categories": [
                                                {"name": "Trouser Short", "amount": 62.99, "currency": "USD", "size": "M"},
                                                {"name": "Slim Short", "amount": 44.99, "currency": "USD", "size": "S"}
                                              ]}
                                            ]},
                                            {"name":"Accessories", "categories": [
                                              {"name": "Tie", "amount": 36.99, "currency": "USD"},
                                              {"name": "Wallet", "amount": 47.99, "currency": "USD"},
                                              {"name": "Sunglasses", "amount": 199.99, "currency": "USD"}
                                            ]},
                                            {"name":"Shoes", "categories": [
                                              {"name": "Fashion Sneaker", "amount": 89.99, "currency": "USD"},
                                              {"name": "Sport Shoe", "amount": 47.99, "currency": "USD"},
                                              {"name": "Boots", "amount": 103.99, "currency": "USD"}
                                            ]}
                                          ]},
                                            {"name": "Girls", "categories": [
                                              {"name":"Clothing", "categories": [
                                                {"name": "Shirts", "categories": [
                                                  {"name": "Red T-shirt", "amount": 16.99, "currency": "USD", "size": "S"},
                                                  {"name": "Tunic Top", "amount": 47.99, "currency": "USD", "size": "M"},
                                                  {"name": "Fuzzy Sweater", "amount": 103.99, "currency": "USD", "size": "L"}
                                                ]},
                                                {"name": "Pants", "categories": [
                                                  {"name": "Blue Jeans", "amount": 24.99, "currency": "USD", "size": "M"},
                                                  {"name": "Red Pant", "amount": 54.99, "currency": "USD", "size": "S"}
                                                ]},
                                                {"name": "Shorts", "categories": [
                                                  {"name": "Jeans Short", "amount": 32.99, "currency": "USD", "size": "M"},
                                                  {"name": "Sport Short", "amount": 14.99, "currency": "USD", "size": "S"}
                                                ]}
                                              ]},
                                              {"name":"Accessories", "categories": [
                                                {"name": "Necklace", "amount": 26.99, "currency": "USD"},
                                                {"name": "Gloves", "amount": 7.99, "currency": "USD"},
                                                {"name": "Beanie", "amount": 12.99, "currency": "USD"}
                                              ]},
                                              {"name":"Shoes", "categories": [
                                                {"name": "Sport Shoes", "amount": 39.99, "currency": "USD"},
                                                {"name": "Boots", "amount": 87.99, "currency": "USD"},
                                                {"name": "Sandals", "amount": 63.99, "currency": "USD"}
                                              ]}
                                            ]},
                                              {"name": "Boys", "categories": [
                                                {"name":"Clothing", "categories": [
                                                  {"name": "Shirts", "categories": [
                                                    {"name": "Black T-shirt with Print", "amount": 16.99, "currency": "USD", "size": "S"},
                                                    {"name": "Blue Shirt", "amount": 47.99, "currency": "USD", "size": "M"},
                                                    {"name": "Yellow Sweater", "amount": 63.99, "currency": "USD", "size": "L"}
                                                  ]},
                                                  {"name": "Pants", "categories": [
                                                    {"name": "Blue Jeans", "amount": 44.99, "currency": "USD", "size": "M"},
                                                    {"name": "Brown Pant", "amount": 89.99, "currency": "USD", "size": "S"}
                                                  ]},
                                                  {"name": "Shorts", "categories": [
                                                    {"name": "Sport Short", "amount": 32.99, "currency": "USD", "size": "M"},
                                                    {"name": "Jeans Short", "amount": 99.99, "currency": "USD", "size": "XS"},
                                                    {"name": "Black Short", "amount": 56.99, "currency": "USD", "size": "L"}
                                                  ]}
                                                ]},
                                                {"name":"Accessories", "categories": [
                                                  {"name": "Sunglasses", "amount": 36.99, "currency": "USD"},
                                                  {"name": "Beanie", "amount": 17.99, "currency": "USD"},
                                                  {"name": "Scarf", "amount": 15.99, "currency": "USD"}
                                                ]},
                                                {"name":"Shoes", "categories": [
                                                  {"name": "Sneaker", "amount": 89.99, "currency": "USD"},
                                                  {"name": "Sport Shoe", "amount": 47.99, "currency": "USD"},
                                                  {"name": "Boots", "amount": 103.99, "currency": "USD"}
                                                ]}
                                              ]}
                                          ]}
                                  
                                      },
                                    "sizes": [
                                      {"key": "XS", "value": "Extra Small"},
                                      {"key": "S", "value": "Small"},
                                      {"key": "M", "value": "Medium"},
                                      {"key": "L", "value": "Large"}
                                    ]
                                    }
                            ];

                            var selModel = new sap.ui.model.json.JSONModel();
                            selModel.setData(selOrgJson);
                            
                            console.log("selOrgJson:");
                            console.log(selOrgJson);

                            _oModel.setSizeLimit(1000000);

                            console.log("_oModel:");
                            console.log(_oModel);

                            this.getView()
                                .setModel(_oModel, that.widgetName);

                            sap.ui.getCore().setModel(_oModel, that.widgetName);
                        /////}
                    }

                    /*
                    handleValueHelp: function(oEvent) {
                        var sInputValue = oEvent.getSource().getValue();

                        if (!this._valueHelpDialog) {

                            var foundIndex_ = Ar.findIndex(x => x.id == widgetName);
                            var divfinal_ = Ar[foundIndex].divf;

                            this._valueHelpDialog = sap.ui.xmlfragment({
                                fragmentContent: jQuery(divfinal_).html()
                            }, this);

                            var oModel = sap.ui.getCore().getModel(widgetName);

                            this._valueHelpDialog.setModel(oModel);
                            this.getView().addDependent(this._valueHelpDialog);
                        }
                        this._openValueHelpDialog(sInputValue);
                    },
                    */

                    /*
                    _openValueHelpDialog: function(sInputValue) {
                        // create a filter for the binding
                        this._valueHelpDialog.getBinding("items").filter([new Filter(
                            "partner",
                            FilterOperator.Contains,
                            sInputValue
                        )]);

                        // open value help dialog filtered by the input value
                        this._valueHelpDialog.open(sInputValue);
                    },
                    */
                    
                    /*
                    _handleValueHelpSearch: function(evt) {
                        var sValue = evt.getParameter("value");
                        var oFilter = new Filter(
                            "partner",
                            FilterOperator.Contains,
                            sValue
                        );
                        evt.getSource().getBinding("items").filter([oFilter]);
                    },

                    _handleValueHelpClose: function(evt) {
                        var aSelectedItems = evt.getParameter("selectedItems"),
                            oMultiInput = this.byId("multiInput");

                        if (aSelectedItems && aSelectedItems.length > 0) {
                            aSelectedItems.forEach(function(oItem) {
                                oMultiInput.addToken(new Token({
                                    text: oItem.getTitle()
                                }));
                            });
                        }
                    },
                    */

                    /*
                    onButtonPress: async function(oEvent) {
                        var this_ = this;
                        this_.wasteTime();
                        var oMultiInput = this.byId("multiInput");

                        var aTokens = oMultiInput.getTokens();
                        // Get an array of the keys of the tokens and join them together with a "," inbetween
                        var sData = aTokens.map(function(oToken) {
                            return oToken.getText();
                        }).join(",");

                        console.log(sData);

                        _score = sData;

                        that._firePropertiesChanged();
                        this.settings = {};
                        this.settings.score = "";

                        that.dispatchEvent(new CustomEvent("onStart", {
                            detail: {
                                settings: this.settings
                            }
                        }));
                        */

                        /*
                        this_.runNext();
                        
                    },
                    */

                    /*
                    wasteTime: function() {
                        busyDialog.open();
                    },
                    
                    runNext: function() {
                        busyDialog.close();
                    },
                    */

                });
            });

            console.log("widgetName Final:" + widgetName);
            var foundIndex = Ar.findIndex(x => x.id == widgetName);
            var divfinal = Ar[foundIndex].div;
            console.log(divfinal);
            
           // console.log("_oModel:");
           // console.log(_oModel);

            //### THE APP: place the XMLView somewhere into DOM ###
            var oView = sap.ui.xmlview({
                viewContent: jQuery(divfinal).html(),
            });

            oView.placeAt(div);
            if (that_._designMode) {
                oView.byId("multiInput").setEnabled(false);
                ////oView.byId("buttonId").setEnabled(false);
            }
        });
    }

    /*
    function createGuid() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
            let r = Math.random() * 16 | 0,
                v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    */

    function loadScript(src, shadowRoot) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => {
                console.log("Load: " + src);
                resolve(script);
            }
            script.onerror = () => reject(new Error(`Script load error for ${src}`));

            shadowRoot.appendChild(script)
        });
    }
})();
