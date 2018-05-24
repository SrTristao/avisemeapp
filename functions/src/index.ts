import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

exports.newVehicleNotification = functions.firestore
    .document('notifications')
    .onCreate(async event => {
        
        const data = event.data();

        const userId = data.userId;
        const message = data.message;
        const board = data.board;

        //Notification content
        const payload = {
            notification: {
                title: `Notificação: Placa ${board}`,
                body: message,
                icon: 'https://goo.gl/Fz9nrQ'
            }
        }

        // ref to the parent document
        const db = admin.firestore();
        const devicesRef = db.collection('devices').where('userId', '==', userId);

        //get users tokens and send notifications
        const devices = await devicesRef.get();

        const tokens = [];

        //loop over documents
        devices.forEach(result => {
            const token = result.data().token;

            tokens.push( token );
        })

        //send notifications
        return admin.messaging().sendToDevice(tokens, payload);

    })