{{template "common/head.tpl"}}
  <script src="static/js/helpers.js"></script>
  <script src="static/js/mulls.js"></script>
</head>

<body>
  <div class="container">
    <div class="page-header">
      <h1>Welcome to the Mulligan Calculator!</h1>
    </div>

    <form class="form-horizontal">
      <div class="form-group">
        <label for="cardsInDeck" class="col-sm-6 control-label">How big is the deck</label>
        <div class="col-sm-2">
          <input type="number" min="1" class="form-control" id="cardsInDeck" placeholder="60">
        </div>
      </div>

      <div class="form-group">
        <label for="cardsYouWant" class="col-sm-6 control-label">How many copies in the deck</label>
        <div class="col-sm-2">
          <input type="number" min="1" class="form-control" id="cardsYouWant" placeholder="4">
        </div>
      </div>

      <div class="form-group">
        <label for="cardDraws" class="col-sm-6 control-label">Number of card draws</label>
        <div class="col-sm-2">
          <input type="number" min="1" class="form-control" id="cardDraws" placeholder="7">
        </div>
      </div>

      <div class="form-group">
        <label for="cardsYouWant" class="col-sm-4 control-label">And you want</label>
        <div class="col-sm-2">
          <select class="form-control" id="hyperChoice">
            <option>At least</option>
            <option>Exactly</option>
          </select>
        </div>
        <div class="col-sm-2">
          <input type="number" min="1" class="form-control" id="numYouWant" placeholder="1">
        </div>
      </div>

      <div class="text-center">
        <button type="button" class="btn btn-warning hide" id="resetButton" onclick="resetPage()">Reset</button>
        <button type="button" class="btn btn-primary" id="goButton" onclick="UpdateStats()">Go</button>
        <button type="button" class="btn btn-success hide" id="mulliganButton" onclick="mulligan()">
          Mulligan</button>
        <button type="button" class="btn btn-link hide" id="shareButton" onclick="share()">Share</button>
      </div>
    </form>
  </div>

  <div class="container hide" id="resultsSection">
    <h3 class="text-center">You have a <span id="resultantChance"></span>% chance of drawing <span id="cardPluralisation"></span><span id="mulliganResults"></span></h3>
  </div>
{{template "common/foot.tpl"}}
