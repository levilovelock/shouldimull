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
    r = calcHypergeometricFormula(0,60,7+i,4);
    assert.ok(round(r) == results[i]);
  }

  assert.ok(count == 10);
});

QUnit.test("test draw 3 from 60 with 24, 1 turn", function(assert){
  r = calcHypergeometricFormula(3,60,7,24);
  assert.ok(round(r) == 30.87);
});

QUnit.test("test draw 1 from 2 with 2, 1 draw", function(assert){
  r = calcHypergeometricFormula(1,2,1,2);
  assert.ok(round(r) == 100.00);  
});

QUnit.test("test draw 2 from 2 with 2, 2 draw", function(assert){
  r = calcHypergeometricFormula(2,2,2,2);
  assert.ok(round(r) == 100.00);  
});

// TODO: Fix this test
// QUnit.test("test draw 1 from 2 with 2, 2 draw", function(assert){
//   r = calcHypergeometricFormula(1,2,2,2);
//   console.log(r)
//   assert.ok(round(r) == 0.00);  
// });


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
    assert.ok(res == expectedRes);
  }
});
