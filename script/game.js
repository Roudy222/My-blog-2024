//The data to keep track of
let model = {
    startingDeck: [
        1,1,
        2,2,
        3,3,
        4,4,
        5,5,
        6,6,
    ],
    shuffledDeck: [],
    cardPicks: [],
    matches: 0,
    attempts: 0,
    accuracy: function(){
        let matches;
        if(this.matches == 0){
            per = "0%";
        }else{
            let dec = this.matches / this.attempts;
            per = Math.round( dec * 100) + "%";
        }
        return per;
    },
    lastPickWasMatch: false,
    shuffleDeck: function(){
        console.log("shuffling deck...");
        let shuffled = [];
        this.shuffledDeck = shuffled;
        let tempDeck = this.startingDeck;
        let cardCount = this.startingDeck.length;
        for(let i = 0; i< cardCount; i++){
            let cardDraw = Math.floor( (Math.random() * tempDeck.length) );
            this.shuffledDeck.push( tempDeck[cardDraw]);
            tempDeck.splice(cardDraw,1);
        }
    },
    addCard: function(card){
        console.log("adding card: ", card);
        this.cardPicks.push(card);
    },
    removeCard: function(card){
        console.log("removing card: ", card);
        for(let i = 0; i < this.cardPicks.length; i++){
            if(card == this.cardPicks[i]){
                this.cardPicks.splice(i, 1);
            }
        }
    },
    updateScore: function(){
        console.log("updating score data...");
        this.matches++;
        this.lastPickWasMatch = true;
    },
    resetCardPicks: function(){
        console.log("resetting card picks...");
        this.cardPicks = [];
    }
}


//The changes to display
let view = {
    scoreArea: document.getElementById("score-area"),
    accuracyArea: document.getElementById("accuracy-area"),
    cardArea: document.getElementById("card-area"),
    messageArea: document.getElementById("message-area"),
    btnContinue: document.getElementById("continue"),
    cards: document.getElementsByClassName("card"),
    removeCards: function(){
        console.log("updating cards...")
    },
    selectCard: function(card){
        console.log("highlihting card: ", card);
        card.classList.add("active");
    },
    deselectCard: function(card){
        card.classList.remove("active");
        console.log("deselecting cards...", card);
    },
    updateScore: function(matches){
        console.log("updating score...", matches);
        this.scoreArea.innerText = matches;
    },
    removeMatch: function(){
        console.log("removing match...");
        let matchedCards = document.getElementsByClassName("active");
        matchedCards[1].classList.add("removed");
        matchedCards[1].classList.remove("active");
        matchedCards[0].classList.add("removed")
        matchedCards[0].classList.remove("active");
    },
    updateMessageArea: function(msg){
        this.messageArea.innerText = this.messages[msg].text;
        this.messageArea.setAttribute("class","");
        this.messageArea.classList.add(this.messages[msg].appearance);
    },
    messages: {
        start: {
            text: "Click a card to check it.",
            appearance: "default",
        },
        match: {
            text: "It's a match!",
            appearance: "match",
        },
        noMatch: {
            text: "Try again...",
            appearance: "noMatch",
        },
        win: {
            text: "Congratuatlations, you won!",
            appearance: "win",
        }
    },
    requestContinue: function() {
        this.btnContinue.classList.remove("hidden");
        this.btnContinue.focus();
    },
    hideContinue: function(){
        this.btnContinue.classList.add("hidden");
    },
    distributeDeck: function(deck){
        console.log("distributing shuffled deck...");
        for(let i = 0; i < deck.length; i++){
            view.cards[i].innerText = deck[i];
        }
        
    },
    updateAccuracy: function(accuracy){
        view.accuracyArea.innerText = accuracy;
    }
    
}

//The background logic
let controller = {
    selectCard: function(card){
        if(card.classList.contains("active")){
            this.deselectCard(card);
            return;
        }
        if(
            model.cardPicks.length < 2 && card.classList.contains("active") == false && card != model.cardPicks[0]
            ){
            view.selectCard(card);
            model.addCard(card);
        }

        if(model.cardPicks.length == 2){
            this.checkMatch();
        }
    },
    deselectCard: function(card){
        view.deselectCard(card);
        model.removeCard(card);
        view.updateMessageArea("start");
    },
    checkMatch: function(){
        console.log("checking match...");
        model.attempts++;
        if(model.cardPicks[0].innerText === model.cardPicks[1].innerText){
            this.match();
        }else{
            this.noMatch();
        };
    },

    match: function(){
        model.updateScore();
        view.updateScore(model.matches);
        view.updateMessageArea("match");
        view.requestContinue();
        if(model.matches == model.startingDeck.length / 2){
            this.gameOver();
        }
    },
    noMatch: function(){
        model.lastPickWasMatch = false;
        view.updateMessageArea("noMatch");
        view.requestContinue();
    },
    nextRound: function(){
        if(model.lastPickWasMatch){
            view.removeMatch();
        }else{
            view.deselectCard( model.cardPicks[0] );
            view.deselectCard( model.cardPicks[1] );
        }
        view.updateAccuracy(model.accuracy());
        view.updateMessageArea("start");
        model.resetCardPicks();
        view.hideContinue();
    },
    newGame: function(){
        model.shuffleDeck();
        view.distributeDeck(model.shuffledDeck);
        view.updateMessageArea("start");
    },
    gameOver: function(){
        view.updateMessageArea("win");
    },
}

//Game Start
controller.newGame();
