define( function(){
    return {
        View : {
            "Layout" : {
                init : ["Absolute", "FillXY,Vertical"],
                kids : {
                    "FAB" : {
                        id : "counterFab",
                        init : [ "add" ],
                        bind : {
                            event : {
                                "SetOnTouch" : "add"
                            }
                        }
                    },
                    "Layout":{
                        init : ["Linear", "FillXY,Vertical"],
                        kids : {
                            "AppBar":{
                                id : "appbar",
                                init : ["APP NAME"],
                            },
                            "TextEditOutline" : {
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
                            "TextH5" : {
                                id : "counterText",
                                init : ["--", 0.95, -1, "Monospace,Multiline,Left" ],
                                methods : {
                                    "SetPadding" : [0.02,0.02,0.02,0.02]
                                },
                                bind : {
                                    computed : "message"
                                }
                            },
                            "ButtonElegant" : {
                                init : ["Contact Us", 0.35],
                                bind : {
                                    href : {
                                        ev : "SetOnTouch",
                                        path : "contact"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        Model : {
            name : ko.observable("Danish Nayeem")
        }
    }


} );