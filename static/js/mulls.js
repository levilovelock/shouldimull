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
var sanitizedLastMulliganResult = "";
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
  if (MULL_CALC.choice === EXACTLY) {
    result = calcExactHypergeometricFormulaWithMulligans(MULL_CALC.x, MULL_CALC.N, MULL_CALC.n, MULL_CALC.k, totalMulligans);
  } else if (MULL_CALC.choice === AT_LEAST) {
    result = calcAtLeastHypergeometricFormulaWithMulligans(MULL_CALC.x, MULL_CALC.N, MULL_CALC.n, MULL_CALC.k, totalMulligans);
  }
  return result;
};

var calcLastMulliganResult = function() {
  var result;
  if (MULL_CALC.choice === EXACTLY) {
    result = calcExactHypergeometricFormula(MULL_CALC.x, MULL_CALC.N, MULL_CALC.n - totalMulligans, MULL_CALC.k);
  } else if (MULL_CALC.choice === AT_LEAST) {
    result = calcAtLeastHypergeometricFormula(MULL_CALC.x, MULL_CALC.N, MULL_CALC.n - totalMulligans, MULL_CALC.k);
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

  for (var i = x; i <= k && i <= n; i++) {
    result += calcExactHypergeometricFormula(i,N,n,k);
  }

  return result;
};

var calcExactHypergeometricFormula = function(x,N,n,k){
  if (n <= 0 || N <= 0 || x > n) {
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
  var niceResult = parseFloat(Math.round(r * 10000) / 100).toFixed(2);
  sanitizedResult = Math.min(Math.max(0,niceResult), 100);
};

var sanitizeLastMulliganResult = function(r) {
  var niceResult = parseFloat(Math.round(r * 10000) / 100).toFixed(2);
  sanitizedLastMulliganResult = Math.min(Math.max(0,niceResult), 100);
};

var updateResultsSection = function(r){
  $("#resultantChance").text(sanitizedResult);
  $("#lastMullResults").remove();

  if (totalMulligans === 0) {
    $("#mulliganResults").text("");
  } else if (totalMulligans > 0) {
    if (totalMulligans === 1) {
      $("#mulliganResults").text(" after " + totalMulligans + " mulligan");
    } else {
      $("#mulliganResults").text(" after " + totalMulligans + " mulligans");
    }

    var mullResultTextBlock = "<h5 id=\"lastMullResults\" class=\"text-center\">and you had a " + sanitizedLastMulliganResult + "% chance to draw";

    if (MULL_CALC.choice === EXACTLY) {
      if (MULL_CALC.x === 1) {
        mullResultTextBlock += " it in your last mull";
      } else if (MULL_CALC.x > 1) {
        mullResultTextBlock += " them in your last mull";
      }
    } else if (MULL_CALC.choice === AT_LEAST) {
      if (MULL_CALC.x === 1 && MULL_CALC.k === 1) {
        mullResultTextBlock += " it in your last mull";
      } else if (MULL_CALC.x === MULL_CALC.k) {
        mullResultTextBlock += " them in your last mull";
      } else if (MULL_CALC.x === 1 && MULL_CALC.x + totalMulligans === MULL_CALC.n) {
        mullResultTextBlock += " it in your last mull";
      } else if (MULL_CALC.x > 1 && MULL_CALC.x + totalMulligans === MULL_CALC.n) {
        mullResultTextBlock += " them in your last mull";
      } else {
        mullResultTextBlock += " at least " + MULL_CALC.x + " in your last mull";
      }
    }

    $("#mulliganResults").parent().after(mullResultTextBlock);
  }

  if (MULL_CALC.choice === EXACTLY) {
    if (MULL_CALC.x === 1) {
      $("#cardPluralisation").text("your card");
    } else if (MULL_CALC.x > 1) {
      $("#cardPluralisation").text("your cards");
    }
  } else if (MULL_CALC.choice === AT_LEAST) {
    if (MULL_CALC.k === 1 && MULL_CALC.x === 1) {
      $("#cardPluralisation").text("your card");
    } else if (MULL_CALC.k ===  MULL_CALC.x) {
      $("#cardPluralisation").text("all " + MULL_CALC.k + " of your cards");
    } else if (MULL_CALC.k > 1) {
      $("#cardPluralisation").text("at least " + MULL_CALC.x + " of your cards");
    }
  }
};

var updateMullCalcVariables = function() {
  MULL_CALC.N = $("#cardsInDeck").val();
  if (MULL_CALC.N === "") {
    MULL_CALC.N = $("#cardsInDeck").attr("placeholder");
    $("#cardsInDeck").val(MULL_CALC.N);
  }
  MULL_CALC.N = parseInt(MULL_CALC.N);

  MULL_CALC.k = $("#cardsYouWant").val();
  if (MULL_CALC.k === "") {
    MULL_CALC.k = $("#cardsYouWant").attr("placeholder");
    $("#cardsYouWant").val(MULL_CALC.k);
  }
  MULL_CALC.k = parseInt(MULL_CALC.k);

  MULL_CALC.n = $("#cardDraws").val();
  if (MULL_CALC.n === "") {
    MULL_CALC.n = $("#cardDraws").attr("placeholder");
    $("#cardDraws").val(MULL_CALC.n);
  }
  MULL_CALC.n = parseInt(MULL_CALC.n);

  MULL_CALC.x = $("#numYouWant").val();
  if (MULL_CALC.x === "") {
    MULL_CALC.x = $("#numYouWant").attr("placeholder");
    $("#numYouWant").val(MULL_CALC.x);
  }
  MULL_CALC.x = parseInt(MULL_CALC.x);

  MULL_CALC.choice = $("#hyperChoice").val();
};

var unhideResults = function(){
  if (buttonHit === false) {
    $(function(){
      $("#resetButton").removeClass("hide");
      $("#mulliganButton").removeClass("hide");
      $("#shareButton").removeClass("hide");
      $("#resultsSection").removeClass("hide");
    });
    buttonHit = true;
  }
};

var resetPage = function(){
  hideResults();
  $("#cardsInDeck").val("");
  $("#cardsYouWant").val("");
  $("#cardDraws").val("");
  $("#numYouWant").val("");
};

var hideResults = function(){
  $(function(){
    $("#resetButton").addClass("hide");
    $("#mulliganButton").addClass("hide");
    $("#shareButton").addClass("hide");
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
  var lastMulliganResult = calcLastMulliganResult();

  sanitizeResult(result);
  sanitizeLastMulliganResult(lastMulliganResult);
  updateResultsSection();
};

// Handle GET params
$(document).ready(function() {
  var localx, localN, localn, localk, localm, localOpt;

  localx   = getParameterByName("x");
  localN   = getParameterByName("N");
  localn   = getParameterByName("n");
  localk   = getParameterByName("k");
  localm   = getParameterByName("m");
  localOpt = getParameterByName("o");

  if (localOpt === "atl") {
    $("#hyperChoice").val(AT_LEAST);
  } else if (localOpt === "exa") {
    $("#hyperChoice").val(EXACTLY);
  }

  $("#cardsInDeck").val(localN);
  $("#cardsYouWant").val(localk);
  $("#cardDraws").val(localn);
  $("#numYouWant").val(localx);

  if ((localx !== "" || localN !== "" || localn !== "" || localk !== "") && localm === "") {
    UpdateStats();
  } else if (localm !== "") {
    UpdateStats();
    if (localm < MULL_CALC.n) {
      totalMulligans = localm - 1;
    } else {
      totalMulligans = localm;
    }

    mulligan();
  }
});

function share(){
  var localx, localN, localn, localk, localm, localOpt;

  localx = $("#numYouWant").val();
  localN = $("#cardsInDeck").val();
  localn = $("#cardDraws").val();
  localk = $("#cardsYouWant").val();
  localm = totalMulligans;
  localOpt = $("#hyperChoice").val();

  if (localOpt === EXACTLY) {
    localOpt = "exa";
  } else if (localOpt === AT_LEAST) {
    localOpt = "atl";
  }

  var linkUrl = "http://www.shouldimull.com/?x=" + localx + "&N=" + localN + "&n=" + localn + "&k=" + localk + "&o=" + localOpt;

  if (localm > 0) {
    linkUrl += "&m=" + localm;
  }

  window.prompt("Copy to clipboard: Ctrl+C, Enter", linkUrl);
}
