const { Client, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();
const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

const TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Replace with your bot token
const PORT = 3000;

app.use(express.json());

app.post('/send-embed', (req, res) => {
    const embedData = req.body;
    const channel = client.channels.cache.get('YOUR_CHANNEL_ID'); // Replace with target channel ID

    if (!channel) return res.status(404).send('Channel not found');

    const embed = new EmbedBuilder()
        .setTitle(embedData.title)
        .setDescription(embedData.description)
        .setColor(embedData.color)
        .setFooter({ text: embedData.footer.text })
        .setTimestamp(embedData.timestamp || null);

    if (embedData.fields && embedData.fields.length > 0) {
        embed.addFields(embedData.fields);
    }
    if (embedData.image && embedData.image.url) {
        embed.setImage(embedData.image.url); // Base64 or URL
    }
    if (embedData.author && embedData.author.name) {
        embed.setAuthor({ name: embedData.author.name, iconURL: embedData.author.icon_url });
    }

    channel.send({ embeds: [embed] })
        .then(() => res.status(200).send('Embed sent!'))
        .catch(err => res.status(500).send('Error: ' + err.message));
});

client.once('ready', () => {
    console.log('Bot is ready!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

client.login(TOKEN);
