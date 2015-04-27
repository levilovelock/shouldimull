buttonHit = false

var AT_LEAST = "At least"
var EXACTLY = "Exactly"
var choice = ""

UpdateStats = function() {  
  grabVariables();

  if (choice == EXACTLY) {
    result = calcHypergeometricFormula(x,N,n,k);
  } else if (choice == AT_LEAST) {
    result = 0.0;

    for (var i = x; i <= k; i++) {
      console.log("x:" + x + " k:" + k)
      r = calcHypergeometricFormula(i,N,n,k);
      result += r
      console.log("i: " + i + "\tr: " + r + "\tres: " + result)

      if (i > 10) { alert(5) }
    }
  }

  updateResultsSection(result);
  unhideResults();
};

calcHypergeometricFormula = function(x,N,n,k){
  a = combi(k,x);
  b = combi((N-k),(n-x))
  c = combi(N,n);
  rawResult = (a * b) / c;
  return rawResult;
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
  niceResult = parseFloat(Math.round(r * 10000) / 100).toFixed(2);
  $("#resultantChance").text(niceResult)
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

  choice = $("#hyperChoice").val();

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