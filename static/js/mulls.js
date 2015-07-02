var buttonHit = false;

var AT_LEAST = "At least";
var EXACTLY = "Exactly";

var MULL_CALC = {
  x: 0,
  N: 0,
  n: 0,
  k: 0,
  choice: ""
};

// Result related vars
var sanitizedResult = "";
var totalMulligans = 0;

var UpdateStats = function() {
  totalMulligans = 0;
  updateMullCalcVariables();
  var result = calcResult();
  sanitizeResult(result);
  updateResultsSection();
  unhideResults();
};

var calcResult = function() {
  var result;
  if (MULL_CALC.choice == EXACTLY) {
    result = calcExactHypergeometricFormulaWithMulligans(MULL_CALC.x, MULL_CALC.N, MULL_CALC.n, MULL_CALC.k, totalMulligans);
  } else if (MULL_CALC.choice == AT_LEAST) {
    result = calcAtLeastHypergeometricFormulaWithMulligans(MULL_CALC.x, MULL_CALC.N, MULL_CALC.n, MULL_CALC.k, totalMulligans);
  }
  return result;
};

var calcAtLeastHypergeometricFormulaWithMulligans = function(x,N,n,k,m){
  if (m === 0) {
    return calcAtLeastHypergeometricFormula(x,N,n,k);
  } else {
    var previousHand = calcAtLeastHypergeometricFormulaWithMulligans(x,N,n,k,m-1);
    return previousHand + (1 - previousHand) * calcAtLeastHypergeometricFormula(x,N,n-m,k);
  }
};

var calcExactHypergeometricFormulaWithMulligans = function(x,N,n,k,m){
  if (m === 0) {
    return calcExactHypergeometricFormula(x,N,n,k);
  } else {
    var previousHand = calcExactHypergeometricFormulaWithMulligans(x,N,n,k,m-1);
    return previousHand + (1 - previousHand) * calcExactHypergeometricFormula(x,N,n-m,k);
  }
};

var calcAtLeastHypergeometricFormula = function(x,N,n,k){
  var result = 0.0;

  for (var i = x; i <= k; i++) {
    result += calcExactHypergeometricFormula(i,N,n,k);
  }

  return result;
};

var calcExactHypergeometricFormula = function(x,N,n,k){
  if (n <= 0 || N <= 0) {
    return 0;
  }
  var a, b, c;
  a = combi(k,x);
  b = combi((N-k),(n-x));
  c = combi(N,n);
  rawResult = (a * b) / c;
  return rawResult;
};

var combi = function(n,r) {
  return fact(n) / (fact(r) * fact(n-r));
};

var fact = function(num){
    var rval=1.0;
    for (var i = 2.0; i <= num; i++)
        rval = rval * i;
    return rval;
};

var sanitizeResult = function(r) {
  niceResult = parseFloat(Math.round(r * 10000) / 100).toFixed(2);
  sanitizedResult = Math.min(Math.max(0,niceResult), 100);
};

var updateResultsSection = function(r){
  $("#resultantChance").text(sanitizedResult);
  $("#mulliganNumber").text(totalMulligans);
};

var updateMullCalcVariables = function() {
  MULL_CALC.N = $("#cardsInDeck").val();
  if (MULL_CALC.N === "") {
    MULL_CALC.N = $("#cardsInDeck").attr("placeholder");
    $("#cardsInDeck").val(MULL_CALC.N);
  }

  MULL_CALC.k = $("#cardsYouWant").val();
  if (MULL_CALC.k === "") {
    MULL_CALC.k = $("#cardsYouWant").attr("placeholder");
    $("#cardsYouWant").val(MULL_CALC.k);
  }

  MULL_CALC.n = $("#cardDraws").val();
  if (MULL_CALC.n === "") {
    MULL_CALC.n = $("#cardDraws").attr("placeholder");
    $("#cardDraws").val(MULL_CALC.n);
  }

  MULL_CALC.x = $("#numYouWant").val();
  if (MULL_CALC.x === "") {
    MULL_CALC.x = $("#numYouWant").attr("placeholder");
    $("#numYouWant").val(MULL_CALC.x);
  }

  MULL_CALC.choice = $("#hyperChoice").val();
};

var unhideResults = function(){
  if (buttonHit === false) {
    $(function(){
      $("#resetButton").removeClass("hide");
      $("#mulliganButton").removeClass("hide");
      $("#resultsSection").removeClass("hide");
    });
    buttonHit = true;
  }
};

var resetPage = function(){
  hideResults();
  // Basically just reset the fields back to placeholder values - tut
  MULL_CALC.N = $("#cardsInDeck").attr("placeholder");
  $("#cardsInDeck").val(MULL_CALC.N);
  MULL_CALC.k = $("#cardsYouWant").attr("placeholder");
  $("#cardsYouWant").val(MULL_CALC.k);
  MULL_CALC.n = $("#cardDraws").attr("placeholder");
  $("#cardDraws").val(MULL_CALC.n);
  MULL_CALC.x = $("#numYouWant").attr("placeholder");
  $("#numYouWant").val(MULL_CALC.x);
};

var hideResults = function(){
  $(function(){
    $("#resetButton").addClass("hide");
    $("#mulliganButton").addClass("hide");
    $("#resultsSection").addClass("hide");
  });
  buttonHit = false;
};

var mulligan = function(){
  updateMullCalcVariables();

  // Only increment Mulligans if it's less than the number of cards drawn
  // minus the how many are wanted
  if (totalMulligans < (MULL_CALC.n - MULL_CALC.x)){
    totalMulligans++;
  }

  var result = calcResult();
  sanitizeResult(result);
  updateResultsSection();
};
