document$.subscribe(async function () {

    const mdContentElement = document.querySelector('.md-content');

    if (!mdContentElement) return;

    let content = mdContentElement.innerHTML;

    // Decode HTML entities manually. Cringe.
    content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

    // Use a regex to find channels (Eg: <#931716554175963246>).
    const channelRegex = /<#(\d+)>/g;
    const channels = Array.from(content.matchAll(channelRegex));

    if (channels.length === 0) return;

    // Replace channels with image tags.
    for (const channel of channels) {
        const [fullMatch, channelId] = channel;
        const replacement = `<a href='https://discord.com/channels/331847112486551552/${channelId}' target='_blank'>#${channelId}</a>`;
        content = content.replace(fullMatch, replacement);
    }

    // Update the HTML with replacements.
    mdContentElement.innerHTML = content;

});
