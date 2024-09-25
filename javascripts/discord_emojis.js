document$.subscribe(function () {

  const mdContentElement = document.querySelector('.md-content');

  if (!mdContentElement) return;

  let content = mdContentElement.innerHTML;

  // Decode HTML entities manually. Cringe.
  content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

  // Use a regex to find emojis.
  const emojiRegex = /<:(.*?):(\d+)>/g;
  const emojis = Array.from(content.matchAll(emojiRegex));

  if (emojis.length === 0) return;

  // Replace emojis with image tags.
  for (const emoji of emojis) {
    const [fullMatch, emojiName, emojiId] = emoji;
    const replacement = `<img src='https://cdn.discordapp.com/emojis/${emojiId}.png' alt='${emojiName}' width='16px'>`;
    content = content.replace(fullMatch, replacement);
  }

  // Update the HTML with replacements.
  mdContentElement.innerHTML = content;

});
