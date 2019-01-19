var cards = [
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' },
  { name: 'aquaman',         img: 'aquaman.jpg' },
  { name: 'batman',          img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four',  img: 'fantastic-four.jpg' },
  { name: 'flash',           img: 'flash.jpg' },
  { name: 'green arrow',     img: 'green-arrow.jpg' },
  { name: 'green lantern',   img: 'green-lantern.jpg' },
  { name: 'ironman',         img: 'ironman.jpg' },
  { name: 'spiderman',       img: 'spiderman.jpg' },
  { name: 'superman',        img: 'superman.jpg' },
  { name: 'the avengers',    img: 'the-avengers.jpg' },
  { name: 'thor',            img: 'thor.jpg' }
];

$(document).ready(function(){
  var memoryGame = new MemoryGame(cards);
  memoryGame.finished()
  memoryGame.shuffleCard(cards);
  var html = '';
  memoryGame.cards.forEach(function (pic, index) {
    html += '<div class= "card" id="card_' + pic.name + '">';
    html += '<div class="back"';
    html += '    name="'       + pic.img +  '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + ') no-repeat">';
    html += '</div>';
    html += '</div>';
  });

  // Add all the div's to the HTML
  document.getElementById('memory_board').innerHTML = html;
  // Bind the click event of each element to a function
  let count = 0;
  let card1;
  let card2;
  let card1Attribute;
  let card2Attribute;
  let isEnabled = true

  $('.back').on('click', function (e) {
    if (!isEnabled) return

    $(this).toggleClass('back-hide')
    $(this).siblings().addClass('front-show');

    if (count === 0) {
      //first click save card 1
      card1 = $(this).parent().attr('id');
      card1Attribute = $(this).parent();
      count++;
    } else {
       // second click saves card 2
      card2 = $(this).parent().attr('id'); 
      card2Attribute = $(this).parent();
      count++;
    } 

    if (count === 2) {
      isEnabled = false

      if (memoryGame.checkIfPair(card1, card2)) {
        setTimeout(()=>{
          card1Attribute.toggleClass('remove-card');
          card2Attribute.toggleClass('remove-card');
          isEnabled = true
        }, 1000)
        count = 0;
      } else {
        setTimeout(()=>{
          card1Attribute.children().removeClass('back-hide front-show');
          card2Attribute.children().removeClass('back-hide front-show');
          count = 0;
          isEnabled = true
        }, 1000)
      }
    }

    document.getElementById('pairs_clicked').innerHTML = memoryGame.pairsClicked;
    document.getElementById('pairs_guessed').innerHTML = memoryGame.pairsGuessed;   
  });
});
