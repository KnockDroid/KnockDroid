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
                        init : ["Welcome to KnockDroid"]
                    },
                    {
                        ui : "ButtonRaised",
                        init : ["Explore"],
                        bind : {
                            route : {
                                ev : "SetOnTouch",
                                path : "explore"
                            }
                        }
                    }
                ]
            }
        },
        model : {}
    }
} );