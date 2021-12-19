define( ()=>{
    return {
        view : {
            Layout : {
                init : ["Linear", "FillXY,Vertical,Left"],
                methods : {
                    SetPadding : [.02, .02, .02, .02]
                },
                kids : [
                    {
                        ui : "TextH3",
                        init : ["Explore features of KnockDroid"]
                    },
                    {
                        ui : "ButtonFlat",
                        init : ["Go Back"],
                        bind : {
                            route : {
                                ev : "SetOnTouch",
                                path : "about"
                            }
                        }
                    }
                ]
            }
        },
        model : {}
    }
} );