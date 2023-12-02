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
                    "to": '584143913971',
                    "type": "text",
                    "text": { // the text object
                        "preview_url": false,
                        "body": `Se encuentra una conversacion pendiente de intervencion humana de ${jsonRes.object}. URL: ${jsonRes.URL}`,
                    },
                }

                //const enviarMensaje = await axios.post(URLWhatsapp, dataResponse);
            }
        }
    }
});
