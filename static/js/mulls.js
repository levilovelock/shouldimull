buttonHit = false

UpdateStats = function() {  
  grabVariables();
  result = calcHypergeometricFormula(x,N,n,k);
  updateResultsSection(result);
  unhideResults();
};

calcHypergeometricFormula = function(x,N,n,k){
  a = combi(k,x);
  b = combi((N-k),(n-x))
  c = combi(N,n);
  rawResult = (a * b) / c;
  niceResult = parseFloat(Math.round(rawResult * 10000) / 100).toFixed(2);
  return niceResult;
};

combi = function(n,r) {
  return fact(n) / (fact(r) * fact(n-r));
};

fact = function(num){
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

updateResultsSection = function(r){
  $("#resultantChance").text(r)
};

grabVariables = function() {
  N = $("#cardsInDeck").val();
  if (N == "") {
    N = $("#cardsInDeck").attr("placeholder");
    $("#cardsInDeck").val(N);
  }

  k = $("#cardsYouWant").val();
  if (k == "") {
    k = $("#cardsYouWant").attr("placeholder");
    $("#cardsYouWant").val(k);
  }

  x = $("#numYouWant").val();
  if (x == "") {
    x = $("#numYouWant").attr("placeholder");
    $("#numYouWant").val(x);
  }

  n = 7
};

unhideResults = function(){
  if (buttonHit == false) {
    $(function(){
      $("#resultsSection").removeClass('hide')
    })
    buttonHit = true
  }
};