buttonHit = false

UpdateStats = function() {
  if (buttonHit == false) {
    $(function(){
      $("#resultsSection").removeClass('hide')
    })
    buttonHit = true
  }
}