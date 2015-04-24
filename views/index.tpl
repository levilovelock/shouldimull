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
        <label for="cardsYouWant" class="col-sm-5 control-label">How many of the card you want</label>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="cardsYouWant" placeholder="4">
        </div>
      </div>

      <div class="form-group">
        <label for="cardsYouWant" class="col-sm-3 control-label">And you want</label>
        <div class="col-sm-2">
          <select class="form-control">
            <option>At least</option>
            <option>Exactly</option>
            <option>At most</option>
          </select>
        </div>
        <div class="col-sm-6">
          <input type="number" class="form-control" id="cardsYouWant" placeholder="1">
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-block center-block" id="goButton">Go</button>
    </form>
  </div>
{{template "common/foot.tpl"}}