/* The hidden two-column dictionary: folk term -> technical term, with the week
   where the learner built the intuition. Revealed as the Week 10 set-piece. */
GM.jargon = [
  { folk: 'the guessing game', tech: 'next-token prediction', week: 1, where: 'cloze rounds & Shannon’s letter game' },
  { folk: 'penalty for a low-probability prediction', tech: 'cross-entropy loss (not felt surprise)', week: 10, where: 'the text-training loop; Week 2 supplies the intuition' },
  { folk: 'a map that leaves details out', tech: 'lossy compression (an analogy for models)', week: 3, where: 'the ten-word summary' },
  { folk: 'calculating next-token scores', tech: 'forward pass', week: 8, where: 'the score card' },
  { folk: 'choosing from scores', tech: 'decoding; temperature adjusts selection probabilities', week: 8, where: 'the ticket-bag example' },
  { folk: 'changing weights vs using them', tech: 'training vs inference', week: 7, where: 'the note-on-the-desk analogy' },
  { folk: 'confidence that does not match accuracy', tech: 'miscalibration; hallucination is a separate content error', week: 6, where: 'the calibration quiz; compare Week 9' },
  { folk: 'which earlier words matter', tech: 'attention', week: 11, where: 'the relevance visualizer' },
];
