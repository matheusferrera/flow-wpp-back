const axios = require("axios").default;

const url = "https://api.openai.com/v1/chat/completions";
const tokenChatGPT = "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"

const headers = {
  Authorization: `Bearer ${tokenChatGPT}`,
  "Content-Type": "application/json",
};

async function chatGPT(messageInput) {
 const data = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "voce é uma inteligencia artificial chamada oraculo, desenvolvido pela empresa oraculo.treinada para vender os serviços da empresa que são: desenvolvimento de sistemas, web e mobile, consultoria tecnologica RETORNE TEXTOS PEQUENOS",
      },
      {
        role: "user",
        content: messageInput,
      },
    ],
 };

 try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content;
 } catch (error) {
    console.error("Error:", error.message || error);
    throw error;
 }
}

module.exports = chatGPT;