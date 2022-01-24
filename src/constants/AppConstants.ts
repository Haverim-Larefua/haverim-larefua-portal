import Option from "../models/Option";

export  enum ParcelStatus {
  Ready = "ready",
  Assign = "assign",
  Distribution = "distribution",
  Delivered = "delivered",
  Exception = "exception",
}
class AppConstants {
  static readonly serverErrorMessage: string = "אופס משהו השתבש, פנה אל מנהל המערכת";
  static readonly errorUIName: string = "סליחה תקלה";
  static readonly closeUIName: string = "סגירה";

  static readonly choose: string = "בחירה";
  static readonly clear: string = "נקה";
  static readonly statusUIName: string = "סטטוס";
  static readonly addressUIName: string = "כתובת";
  static readonly cityUIName: string = "עיר";
  static readonly phone: string = "טלפון";
  static readonly phone2: string = "טלפון 2";
  static readonly nameUIName: string = "שם";
  static readonly idUIName: string = "ת.ז";
  static readonly identifierUIName: string = "מספר";
  static readonly startDate = "מועד התחלה";
  static readonly startTime = "שעת התחלה";
  static readonly creationDateTime = "תאריך יצירה";
  static readonly catalogUIName: string = "מזהה";

  static readonly userUIName: string = "שליח/ה";
  static readonly usersUIName: string = "שליחים/ות";
  static readonly firstName: string = "שם פרטי";
  static readonly lastName: string = "שם משפחה";
  static readonly deliveryAreas: string = "אזורי חלוקה";
  static readonly deliveryDays: string = "ימי חלוקה";
  static readonly email: string = "אימייל";
  static readonly password: string = " סיסמא ( תצוגה בלבד) ";
  static readonly username: string = " שם משתמש/ת ( תצוגה בלבד)";
  static readonly notes: string = "הערות";
  static readonly parcelsUIName: string = "חבילות";
  static readonly chosenParcelsUIName: string = "חבילות נבחרו";
  static readonly addUserUIName: string = "הוספת שליח/ה";
  static readonly add: string = "הוספה";
  static readonly editUserUIName: string = "עריכת שליח/ה";
  static readonly edit: string = "שמירה";
  static readonly notify: string = "שליחה";
  static readonly cancel: string = "ביטול";
  static readonly deleteUserUIName: string = "מחיקת פרטי שליח/ה";
  static readonly deleteParcelUIName: string = "מחיקת חבילה";
  static readonly delete: string = "מחיקה";
  static readonly searchUIName: string = "חיפוש";
  static readonly notifyToUser: string = "שליחת הודעה ל";

  static readonly addFromFileUIName: string = "הוספה מקובץ";
  static readonly associateUserUIName: string = "שיוך לשליח/ה";
  static readonly pushUserUIName: string = "קריאה לשליחים";
  static readonly pushUsersUIName: string = "קריאה לאיסוף וחלוקת חבילות";


  static readonly disassociateUserUIName: string = "הסרת שליח/ה";

  static readonly associateParcelToUserUIName: string = "שיוך חבילות לשליח/ה";
  static readonly changeParcelUser: string = "החלפת שליח/ה";

  static readonly filterUIName: string = "סינון";

  static readonly changeStatusLabel: string = "שינוי סטטוס";
  static readonly pushToUsersModalSubHeader: string = "הודעה בדבר איסוף חלוקת החבילות שנבחרו תשלח לשליחים באזור המיועד.";
  static readonly pushToUsersModalMessage: string = "חבילות ששליחים יאשרו, ישויכו אליהם. \nהודעה על השיוך תופיע בתיבת ההודעות בסרגל הניווט משמאל.";

  static readonly deleteUserConfirmation: string = "הפעולה תמחק את פרטי השליח מהמערכת";
  static readonly deleteUserWarningConfirmation: string = "ישנן חבילות בחלוקה המשוייכות לשליח זה. לא ניתן לבצע מחיקה. ";

  static readonly deleteParcelConfirmation: string = "הפעולה תמחק את החבילה מהמערכת";
  static readonly deleteParcelWarningConfirmation: string = "החבילה לא בסטטוס מוכנה לחלוקה. לא ניתן לבצע מחיקה";

  static readonly commentsUIName: string = "הערות";
  static readonly treeUIName: string = "תת פרוייקט אחרון";
  static readonly signatureUIName: string = "חתימה";

  static readonly cardId: string = "תעודת זהות";
  static readonly cardName: string = "שם כרטיס";
  static readonly allocation: string = "שיוך";

  // Parcel status names
  static readonly all: string = "הכל";
  static readonly readyStatusName: string = "מוכנה לחלוקה";
  static readonly deliveringStatusName: string = "בחלוקה";
  static readonly exceptionStatusName: string = "בחריגה";
  static readonly deliveredStatusName: string = "נמסרה";

  // Toast Messages / Messages
  static readonly parcelStatusChangedSuccessfully = "סטטוס החבילה השתנה בהצלחה";
  static readonly parcelStatusChangedError = "שינוי סטטוס החבילה נכשל";
  static readonly parcelsUserChangedSuccessfully = "שיוך החבילות לשליח בוצע בהצלחה";
  static readonly parcelsUnassignUserSuccessfully = "הסרת שיוך החבילה מהשליח בוצע בהצלחה";

  static readonly parcelsUserChangedError = "שיוך החבילות לשליח נכשל";
  static readonly parcelAssignedToUser = "החבילה שויכה לשליח";

  static readonly sendPushNotificationToUsersSuccessfully = "קריאה לאיסוף וחלוקת חבילות בוצעה בהצלחה";
  static readonly sendPushNotificationToUsersError = "קריאה לאיסוף וחלוקת חבילות נכשלה";

  static readonly parcelStatusOptions: Option<string>[] = [
    { label: AppConstants.all, value: '' },
    { label: AppConstants.readyStatusName, value: ParcelStatus.Ready },
    { label: AppConstants.deliveringStatusName, value: ParcelStatus.Distribution },
    { label: AppConstants.exceptionStatusName, value: ParcelStatus.Exception },
    { label: AppConstants.deliveredStatusName, value: ParcelStatus.Delivered },
  ];

  // Delivery days names
  static readonly allWeek: string = "כל השבוע";
  static readonly sunday: string = "ראשון";
  static readonly monday: string = "שני";
  static readonly tuesday: string = "שלישי";
  static readonly wednesday: string = "רביעי";
  static readonly thursday: string = "חמישי";
  static readonly friday: string = "שישי";

  static readonly sundayInitial: string = "א";
  static readonly mondayInitial: string = "ב";
  static readonly tuesdayInitial: string = "ג";
  static readonly wednesdayInitial: string = "ד";
  static readonly thursdayInitial: string = "ה";
  static readonly fridayInitial: string = "ו";

  static readonly daysOptions: Option<string>[] = [
    { label: AppConstants.allWeek, value: "1,2,3,4,5,6" },
    { label: AppConstants.sundayInitial, value: "1" },
    { label: AppConstants.mondayInitial, value: "2" },
    { label: AppConstants.tuesdayInitial, value: "3" },
    { label: AppConstants.wednesdayInitial, value: "4" },
    { label: AppConstants.thursdayInitial, value: "5" },
    { label: AppConstants.fridayInitial, value: "6" },
  ];

  static readonly searchDebounceTime = 400;
  //IOS platform names
  static readonly iPadSimulator: string = "iPad Simulator";
  static readonly iPhoneSimulator: string = "iPhone Simulator";
  static readonly iPodSimulator: string = "iPod Simulator";
  static readonly iPad: string = "iPad";
  static readonly iPhone: string = "iPhone";
  static readonly iPod: string = "iPod";
  static readonly mac: string = "Mac";

  static readonly downloadAppInfoText: string = "אפליקציית המתנדבים של עמותת חברים לרפואה";
  static readonly downloadAppText: string = " להורדת האפליקציה";

  static readonly allWeekDetailed =
    AppConstants.sundayInitial +
    "," +
    AppConstants.mondayInitial +
    "," +
    AppConstants.tuesdayInitial +
    "," +
    AppConstants.wednesdayInitial +
    "," +
    AppConstants.thursdayInitial +
    "," +
    AppConstants.fridayInitial;
}

export const delivaryDaysToInitials = new Map<string, string>([
  [AppConstants.allWeek, AppConstants.allWeek],
  [AppConstants.sunday, AppConstants.sundayInitial],
  [AppConstants.monday, AppConstants.mondayInitial],
  [AppConstants.tuesday, AppConstants.tuesdayInitial],
  [AppConstants.wednesday, AppConstants.wednesdayInitial],
  [AppConstants.thursday, AppConstants.thursdayInitial],
  [AppConstants.friday, AppConstants.fridayInitial],
]);

//TODO: Rename to AppConstants after move all AppConstants to i18n
export const AppConstants1 = {
  admin: {
    token: "",
    firstName: "",
    lastName: "",
  },
};

export default AppConstants;
