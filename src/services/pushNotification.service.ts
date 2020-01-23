import httpService from "./http";

var murmurHash3 = require("murmurhash3js");

class PushNotificationService {
  
  publicVapidKey = "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
  privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

  myPubKey = "BIi1dlfrHoeGTnz8dwtp7UoVKJWNZ4oaymf3ssukatxrL_Tx5h1lOmqM3W9bueFqsYj0kmIiW6Y0-5opsoRIt3k";
  myPrivKey ="RbHUlJubWXi9rEnU9NpzXyZ86vP0OcHB1OHzCEUy3lc";
  

  constructor() {
    debugger;
    this.initPush();
  }

  async requestNotificationPermission() {
    console.log('[requestNotificationPermission] requesting notification premission...');
    let permission = Notification.permission;
    if (permission !== "granted") {
      permission = await window.Notification.requestPermission();
      // value of permission 
      // granted: user has accepted the request
      // default: user has dismissed the notification permission popup by clicking on x
      // denied: user has denied the request.
      if (permission !== "granted") {
        throw new Error("Permission not granted for Notification");
      }
      console.log('[requestNotificationPermission] notification premission requested ', permission);
      return permission;
    }
    console.log('[requestNotificationPermission] notification premission requested ', permission);

    return permission;
  }

  private urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // returns the PushSubscription (object that contains unique endpoint for the push server + other info
  async createNotificationSubscription() : Promise<PushSubscription> {
    console.log('[createNotificationSubscription] Creating Notification Subscription ...');
    
    const serviceWorker = await navigator.serviceWorker.ready; //wait for service worker installation to be ready
    
    const subscription = await serviceWorker.pushManager.subscribe({ // subscribe and return the subscription
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(this.myPubKey)
    });
    console.log('[createNotificationSubscription] ...Notification Subscription Created ', subscription);

    return await this.postSubscription(subscription);
  }

  private createClientFingerprint(): number {
    const key = JSON.stringify(navigator.oscpu + navigator.platform + navigator.userAgent + navigator.vendor + navigator.productSub + navigator.appVersion + navigator.language);
    var seed = 256;
    const fingerprint = murmurHash3.x86.hash32(key, seed);
    return fingerprint;
  }

  // send subscription to the server
  async postSubscription(subscription: PushSubscription): Promise<PushSubscription> {
    const body = JSON.stringify(subscription);
    console.log('[postSubscription] posting subscription to serever...', body);
    try {
      const fingerprint = this.createClientFingerprint();
      return await httpService.sendPushSubscription(subscription, fingerprint);
    } catch (ex) {
      console.error('[postSubscription]] No response received ', JSON.stringify(ex));
      return ex.response ? ex.response.data.message : '[postSubscription]] No response received ';
    }
  }

  // returns the subscription if present or nothing
  public getUserSubscription(): Promise<PushSubscription | null> {
    console.log('[getUserSubscription] Getting subscription ...');
    
    return navigator.serviceWorker.ready //wait for service worker installation to be ready, and then
      .then(serviceWorker => {
        const subscription = serviceWorker.pushManager.getSubscription();
        console.log('[getUserSubscription] Subscription  got', subscription)
        return subscription;
      })
      .then(pushSubscription => {
        console.log('[getUserSubscription] Subscription  got', pushSubscription);
        return pushSubscription;
      });
  }

  // trigger notification at server
  async sendNotification() {
    const subscription = await this.getUserSubscription();
    console.log('[sendNotification] retrieved subscription ', subscription);
    if (!subscription) {
      console.error('[sendNotification]] Could not retrieve subscription');
    } else {
      try {
        const fingerprint = this.createClientFingerprint();
        await httpService.sendPushNotification(subscription, fingerprint);
      } catch (ex) {
        console.error('[sendNotification]] No response received ', JSON.stringify(ex));
        return ex.response ? ex.response.data.message : '[sendNotification]] No response received ';
      }
    }
  }

  async sendLocalNotification() {
    console.log('[sendLocalNotification] sending local notification');
    const subscription = this.getUserSubscription();
    console.log('[sendLocalNotification] retrieved subscription ', subscription);

    const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
    const text = "Take a look at this brand new t-shirt!";
    const title = "New Product Available";
    const options = {
      body: text,
      icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
      vibrate: [200, 100, 200],
      tag: "new-product",
      image: img,
      badge: "https://spyna.it/icons/android-icon-192x192.png",
      actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
    };
    navigator.serviceWorker.ready.then(serviceWorker => {
      serviceWorker.showNotification(title, options);
    });
  }

  //TODO: Need to decise when to request Notification Permission from the user
  public async initPush() {
    console.log('[initPush] started ');
    const permission = await this.requestNotificationPermission();
    if (permission === "granted") {
      const pushSubscription = await this.createNotificationSubscription();
      console.log('[initPush] Subscription Created ', pushSubscription);
    }
  }
}

const pushNotificatioService = new PushNotificationService() ;

export default pushNotificatioService;
