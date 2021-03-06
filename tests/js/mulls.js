round = function(raw) {
 return parseFloat(Math.round(raw * 10000) / 100).toFixed(2);
}

// calcHypergeometricFormula
QUnit.test("test draw 0 from 60 in 7 with 4, 10 turns", function(assert) {
  //function(x,N,n,k)
  var count = 0;
  var results = [
      60.05,
      55.52,
      51.25,
      47.23,
      43.45,
      39.90,
      36.58,
      33.46,
      30.55,
      27.84
  ];

  for (var i = 0; i < 10; i++) {
    count++
    r = calcExactHypergeometricFormula(0,60,7+i,4);
    assert.ok(round(r) == results[i]);
  }

  assert.ok(count === 10);
});

// ==============================================
// TESTS FOR calcExactHypergeometricFormula
// ==============================================

QUnit.test("test draw 7 from population of 60 with number of successes equal to 24, wanting exactly 3", function(assert){
  r = calcExactHypergeometricFormula(3,60,7,24);
  assert.ok(round(r) === "30.87");
});

QUnit.test("test draw 1 from population of 2 with number of successes equal to 2, wanting exactly 1", function(assert){
  r = calcExactHypergeometricFormula(1,2,1,2);
  assert.ok(round(r) === "100.00");
});

QUnit.test("test draw 2 from population of 2 with number of successes equal to 2, wanting exactly 2", function(assert){
  r = calcExactHypergeometricFormula(2,2,2,2);
  assert.ok(round(r) === "100.00");
});

QUnit.test("test draw 0 from population of 2 with number of successes equal to 2, wanting exactly 2", function(assert){
  r = calcExactHypergeometricFormula(2,2,0,2);
  assert.ok(round(r) === "0.00");
});

QUnit.test("test draw 7 from population of 60 with number of successes equal to 4, with 1 mulligan", function(assert){
  r = calcExactHypergeometricFormulaWithMulligans(1,60,7,4,1);
  assert.ok(round(r) === "53.88");
});

// ==============================================
// TESTS FOR calcAtLeastHypergeometricFormula
// ==============================================

QUnit.test("test draw 7 from population of 60 with number of successes equal to 4, wanting 1", function(assert){
  r = calcAtLeastHypergeometricFormula(1,60,7,4);
  assert.ok(round(r) === "39.95");
});

QUnit.test("test draw 24 from population of 133 with number of successes equal to 42, wanting 6", function(assert){
  r = calcAtLeastHypergeometricFormula(6,133,24,42);
  assert.ok(round(r) === "84.35");
});

QUnit.test("test draw 1 from population of 60 with number of successes equal to 1, wanting 1", function(assert){
  r1 = calcAtLeastHypergeometricFormula(1,60,1,4);
  r2 = calcExactHypergeometricFormula(1,60,1,4);
  assert.ok(round(r1) === "6.67");
  assert.ok(r1 === r2);
});

// Test Combinations
QUnit.test("test combinations", function(assert){

  // Format n choose y = z
  testMap = [
    [2,2,1],
    [2,1,2],
    [50,30,47129212243960]
  ]

  for (var i = 0; i < testMap.length; i++) {
    var n = testMap[i][0]
    var r = testMap[i][1]
    var expectedRes = testMap[i][2]
    res = combi(n,r);
    assert.ok(res === expectedRes);
  }
});
