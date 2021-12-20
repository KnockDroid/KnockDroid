define( ()=>{
    return {
        side : "Left",
        width : 0.8,
        view : {
            Layout : {
                init : ["Linear", "FillXY,VCenter"],
                side : "Left",
                kids : [
                    {
                        ui : "ButtonRaised",
                        init : ["Click Here"]
                    }
                ]
            }
        },
        model : {}
    }
});