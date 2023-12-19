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
                        "body": jsonRes.message
                    },
                }
                

                const enviarMensaje = await axios.post(URLWhatsapp, dataResponse, {headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer EABfh2tc8g8IBO4150vW7hiaBE4BS8XpajBh9jdiV3QQ1G770h6wfcdN6s8DGzasAZC2ZAnUA2uh5qlTqwuZB1glPVcvEjrN6X1Wx23ZAXkTxCnsy9xINRARbZAe4oI3REZAwKNp3FDSgebKGl5x7RbNCZARshPw7OJVxPWZA2hnehI3g8jX7N0l2BkB775suPw32qZAbTIU2W1s4xYEc3`,
                  }});
                  return {
                    status: 200,
                    body: "enviado correctamente"
                  }
            }
        }
    }
});
