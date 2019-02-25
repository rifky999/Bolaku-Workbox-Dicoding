var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/d8k4enrPQ8E:APA91bHFTDRzw6OnJaJG8WB-Bm9eBCDdS8gM-9qEf2LHEeE98cdrh82spgstmD1GuWC_CZV4B3q8uP42aZSSSUj3_gHvSXgVGgN-2M1DUhMzKa90iLHOjLOI-DwG0-jaxMm4PHq-6g5-",
    "keys": {
        "p256dh": "BKYHH1WUN5R7SbMd1G2cAnXi9hxFaIGs0vkB8KHlMOQmJmfOSn+CJtIOGapGF22VtfOvVt+bhib4AfJkC7z7oP4=",
        "auth": "u6lnw4xIbvm8sKA6YR2DXw=="
    }
};
var payload = 'Notification Bolaku';
var options = {
    gcmAPIKey: 'AIzaSyCXOZoS69bC7nJ4pHHWZhmilBe6PAwP7Fs',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);