const { app } = require('@azure/functions');
const { default: axios } = require('axios');

app.http('HttpTriggerNotificationWhatsApp', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {

        const res = await request.text();

        const URLWhatsapp = 'https://graph.facebook.com/v17.0/145568885306814/messages'

        const jsonRes = JSON.parse(res)

        if (request.method === 'POST') {

            if (jsonRes.object != '' || jsonRes.URL != '') {
                const dataResponse = {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    "to": '584140952386',
                    "type": "text",
                    "text": { // the text object
                        "preview_url": false,
                        "body": jsonRes.message
                    },
                }
                

                const enviarMensaje = await axios.post(URLWhatsapp, dataResponse, {headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`,
                  }});                     
                  return {
                    status: 200,
                    body: "enviado correctamente"
                  }
            }
        }
    }
});
