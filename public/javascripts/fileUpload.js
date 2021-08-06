const rootStyles= window.getComputedStyle(document.documentElement) //load all css from root tag

if (rootStyles.getPropertyValue('--book-cover-width-large')!=null && 
   rootStyles.getPropertyValue('--book-cover-width-large')!==''){ //to measure ready to get use for get property
   
    ready() //similar like async

} else{ //hasn't happen
    document.getElementById('main-css') //refer to main layout.ejs link
        .addEventListener('load',ready) 
}


function ready(){   
    const coverWidth =parseFloat(rootStyles.getPropertyValue ('--book-cover-width-large'))
    const coverAspectRatio = parseFloat(rootStyles.
        getPropertyValue('--book-cover-aspect-ratio'))//prevent parse with string
    const coverHeight = coverWidth / coverAspectRatio


    //before add css element only part
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    
    )

    FilePond.setOptions({
        stylePanelAspectRatio:1/coverAspectRatio ,
        imageResizeTargetWidth:coverWidth,	
        imageResizeTargetHeight:coverHeight,
    })
//   Turn all file input elements into ponds
    FilePond.parse(document.body);
}
