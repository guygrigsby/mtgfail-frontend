const ParseDeck = deck => {
  if (deck === undefined) {
    return;
  }
  const obs = deck.ContainedObjects;
  const imgs = deck.CustomDeck;
  let cards = [];
  for (let i = 0; i < obs.length; i++) {
    const name = obs[i].Nickname;
    const img = imgs[i + 1];
    var card = {};
    card.Name = name;
    card.Image = img.FaceURL;
    cards.push(card);
  }
  return cards;
};

export default ParseDeck;
