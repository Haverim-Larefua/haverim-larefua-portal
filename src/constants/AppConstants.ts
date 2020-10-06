 class AppConstants {

  static readonly errorUIName: string = 'סליחה תקלה';
  static readonly closeUIName: string = 'סגירה';

  static readonly chooseOne: string = 'בחירה';
  static readonly statusUIName: string = 'סטטוס';
  static readonly addressUIName: string = 'כתובת';
  static readonly cityUIName: string = 'עיר';
  static readonly phone: string = 'טלפון';
  static readonly nameUIName: string = 'שם';
  static readonly identifierUIName: string ='מספר';
  static readonly catalogUIName: string ='מזהה';

  static readonly userUIName: string = 'שליח/ה';
  static readonly usersUIName: string = 'שליחים/ות';
  static readonly firstName: string = 'שם פרטי';
  static readonly lastName: string = 'שם משפחה';
  static readonly deliveryArea: string = 'עיר חלוקה';
  static readonly deliveryDays: string = 'ימי חלוקה';
  static readonly email: string = 'אימייל';
  static readonly password: string = ' סיסמא ( תצוגה בלבד) ';
  static readonly username: string = ' שם משתמש/ת ( תצוגה בלבד)';
  static readonly notes: string = 'הערות';
  static readonly parcelsUIName: string = 'חבילות';

  static readonly addUserUIName: string = 'הוספת שליח/ה';
  static readonly add: string = 'הוספה';
  static readonly editUserUIName: string = 'עריכת שליח/ה';
  static readonly edit: string = 'שמירה';
  static readonly cancel: string = 'ביטול';
  static readonly deleteUserUIName: string = 'מחיקת פרטי שליח/ה';
  static readonly deleteParcelUIName: string = 'מחיקת חבילה';
  static readonly delete: string = 'מחיקה';
  static readonly searchUIName: string = 'חיפוש';

  static readonly notify: string = 'שליחת הודעה ל';

  static readonly addFromFileUIName: string = 'הוספה מקובץ';
  static readonly associateUserUIName: string = 'שיוך לשליח/ה';
  static readonly associateParcelToUserUIName: string = 'שיוך חבילות לשליח/ה';


  static readonly deleteUserConfirmation: string = 'הפעולה תמחק את פרטי השליח מהמערכת';
  static readonly deleteUserWarningConfirmation: string =  'ישנן חבילות בחלוקה או בחריגה המשוייכות לשליח זה. לא ניתן לבצע מחיקה. ';

  static readonly deleteParcelConfirmation: string = 'הפעולה תמחק את החבילה מהמערכת';
  static readonly deleteParcelWarningConfirmation: string =  ' ? ישנו שליח המיועד לאסוף את החבילה. האם בכל זאת תרצה/י למחוק ';

  static readonly commentsUIName: string = 'הערות';
  static readonly signatureUIName: string = 'חתימה';

  static readonly cardName: string = 'שם כרטיס';
  static readonly allocation: string = 'שיוך';

  // Parcel status names
  static readonly all: string = 'הכל';
  static readonly readyStatusName: string = 'מוכנה לחלוקה';
  static readonly deliveringStatusName: string = 'בחלוקה';
  static readonly exceptionStatusName: string = 'בחריגה';
  static readonly deliveredStatusName: string = 'נמסרה';

  // Delivery days names
  static readonly allWeek: string = 'כל השבוע';
  static readonly sunday: string = 'ראשון';
  static readonly monday: string = 'שני';
  static readonly tuesday: string = 'שלישי';
  static readonly wednesday: string = 'רביעי';
  static readonly thursday: string = 'חמישי';
  static readonly friday: string = 'שישי';

  static readonly sundayInitial: string = 'א';
  static readonly mondayInitial: string = 'ב';
  static readonly tuesdayInitial: string = 'ג';
  static readonly wednesdayInitial: string = 'ד';
  static readonly thursdayInitial: string = 'ה';
  static readonly fridayInitial: string = 'ו';

  static readonly allWeekDetailed =
            AppConstants.sundayInitial + ',' +
            AppConstants.mondayInitial + ',' +
            AppConstants.tuesdayInitial + ',' +
            AppConstants.wednesdayInitial + ',' +
            AppConstants.thursdayInitial + ',' +
            AppConstants.fridayInitial;
 }

export const delivaryDaysToInitials = new Map<string, string> ([
  [AppConstants.allWeek, AppConstants.allWeek],
  [AppConstants.sunday, AppConstants.sundayInitial],
  [AppConstants.monday, AppConstants.mondayInitial],
  [AppConstants.tuesday, AppConstants.tuesdayInitial],
  [AppConstants.wednesday, AppConstants.wednesdayInitial],
  [AppConstants.thursday, AppConstants.thursdayInitial],
  [AppConstants.friday, AppConstants.fridayInitial]
]);

//TODO: Rename to AppConstants after move all AppConstants to i18n
export const AppConstants1 = {
    admin: {
        token: '',
        firstName: '',
        lastName: ''
    }
}

export default AppConstants;
