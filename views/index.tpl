{{template "common/head.tpl"}}
  <div class="container">
    <div class="page-header">
      <h1>Mulligan Calculator welcomes You!</h1>
    </div>

    <form class="form-horizontal">
      <div class="form-group">
        <label for="cardsInDeck" class="col-sm-5 control-label">How many cards in deck</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="cardsInDeck" placeholder="60">
        </div>
      </div>

      <div class="form-group">
        <label for="cardsYouWant" class="col-sm-5 control-label">How many of the one you want</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="cardsYouWant" placeholder="4">
        </div>
      </div>

      <div class="form-group">
        <label for="cardsYouWant" class="col-sm-3 control-label">And you want</label>
        <div class="col-sm-2">
          <select class="form-control" id="hyperChoice">
            <option>At least</option>
            <option>Exactly</option>
          </select>
        </div>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="numYouWant" placeholder="1">
        </div>
      </div>

      <button type="button" class="btn btn-primary btn-block center-block" id="goButton" onclick="UpdateStats()">Go</button>
    </form>
  </div>

  <div class="container hide" id="resultsSection">
    <h3 class="text-center">You have a <span id="resultantChance">39.95</span>% chance of reaching your dreams!</h3>
  </div>

  <script src="static/js/mulls.js"></script>
{{template "common/foot.tpl"}}