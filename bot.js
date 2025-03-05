const { Client, EmbedBuilder } = require('discord.js');
const express = require('express');
const app = express();
const client = new Client({ intents: ['Guilds', 'GuildMessages'] });

const TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Replace with your bot token
const PORT = 3000;

app.use(express.json());

// API endpoint to receive embed data from Disrod
app.post('/send-embed', (req, res) => {
    const embedData = req.body;
    const channel = client.channels.cache.get('YOUR_CHANNEL_ID'); // Replace with target channel ID

    if (!channel) return res.status(404).send('Channel not found');

    const embed = new EmbedBuilder()
        .setTitle(embedData.title)
        .setDescription(embedData.description)
        .setColor(embedData.color)
        .setFooter({ text: embedData.footer.text });

    if (embedData.fields && embedData.fields.length > 0) {
        embed.addFields(embedData.fields);
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
