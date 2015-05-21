module.exports = {
  INVALID_MOVE: 'Whoa, slow down! That space is taken.',
  greetings: ['Hey there.', 'Hi, how are you?', 'Welcome!'],
  win: ['You win!', 'Very good.'],
  lose: ['Well, at least you had fun!','Maybe try harder next time.', 'Big Gulps, huh? Weeeeeeelll, see ya.'],
  draw: ['Oh cool, another draw.'],
  sampleFrom: function(messageType) {
    var messages = this[messageType];
    var length = messages.length
    return messages[Math.floor(Math.random() * length)];
  }
};

