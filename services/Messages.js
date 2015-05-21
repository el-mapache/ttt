module.exports = {
  INVALID_MOVE: 'Whoa, slow down! That space is taken.',
  greetings: ['Hey there.', 'Hi, how are you?', 'Welcome!'],
  win: ['You win!', 'Winners don\'t do drugs.'],
  lose: ['Well, at least you had fun!','Better luck next time!', 'You got second place.'],
  draw: ['Oh cool, another draw.'],
  sampleFrom: function(messageType) {
    var messages = this[messageType];
    var length = messages.length
    return messages[Math.floor(Math.random() * length)];
  }
};

