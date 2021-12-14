define( function(){
    return {
        view : {
            Layout : {
                init : ["Linear", "FillXY,Vertical,Left"],
                kids : [
                    {
                        ui : "TextH2",
                        init : ["About Us", 0.95, -1],
                        methods : {
                            SetPadding : [0.02, 0.02, 0.02, 0.01]
                        }
                    },
                    {
                        ui : "TextParagraph",
                        init : ["This is a demo application and contains one modules and 2 pages ( about and contact ). You can press the button below to go to the contact page.", 0.95, -1, "Left"],
                        methods : {
                            SetPadding : [0.02, 0, 0.02, 0.02]
                        }
                    },
                    {
                        ui : "ButtonElegant",
                        init : ["Contact Us", 0.35],
                        bind : {
                            route : {
                                ev : "SetOnTouch",
                                path : "contact"
                            }
                        }
                    },
                    {
                        ui :  "Divider",
                        methods : {
                            SetMargins : [0.0, 0.02, 0.0 , 0.0]
                        }
                    },
                    {
                        ui : "TextH2",
                        init : ["Models & Observables", 0.95, -1],
                        methods : {
                            SetPadding : [0.02, 0.02, 0.02, 0.01]
                        }
                    },
                    {
                        ui : "TextParagraph",
                        init : ["Below is an example to demonstrate the use of text and model bindings over computed or normal observables.", 0.95, -1, "Left"],
                        methods : {
                            SetPadding : [0.02, 0, 0.02, 0.02]
                        }
                    },
                    {
                        ui : "TextEditOutline",
                        init : [0.95, "Left", "Type Here", true],
                        methods : {
                            "SetPadding" : [0.0, 0.02, 0.0, 0.02]
                        },
                        bind : {
                            value : {
                                ev : "SetOnChange",
                                obs : "name"
                            }
                        }
                    },
                    {
                        ui : "TextH5",
                        id : "counterText",
                        init : ["--", 0.95, -1, "Monospace,Multiline,Left" ],
                        methods : {
                            "SetPadding" : [0.02,0.02,0.02,0.02]
                        },
                        bind : {
                            computed : "name"
                        }
                    }
                ]
            }
        },
        model : {
            name : ko.observable("KnockDroid Demo")
        }
    }


} );