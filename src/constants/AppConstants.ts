 class AppConstants {
    static readonly chooseOne: string = 'בחירה';
    static readonly statusUIName: string = 'סטטוס';
    static readonly addressUIName: string = 'כתובת';
    static readonly cityUIName: string = 'עיר';
    static readonly phone: string = 'טלפון';
    static readonly nameUIName: string = 'שם';
    static readonly identifierUIName: string ='מזהה';
    static readonly catalogUIName: string ='מק״ט';

    static readonly userUIName: string = 'שליח.ה';
    static readonly usersUIName: string = 'שליחים.ות';
    static readonly firstName: string = 'שם פרטי';
    static readonly lastName: string = 'שם משפחה';
    static readonly deliveryArea: string = 'עיר חלוקה';
    static readonly deliveryDays: string = 'ימי חלוקה';
    static readonly email: string = 'אימייל';
    static readonly password: string = 'סיסמה';
    static readonly userName: string = 'שם משתמש.ת';
    static readonly notes: string = 'הערות';
    static readonly parcelsUIName: string = 'חבילות';

    static readonly addUserUIName: string = 'הוספת שליח.ה';

    static readonly addFromFileUIName: string = 'הוספה מקובץ';
    static readonly associateUserUIName: string = '+ שיוך לשליח.ה';



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
}

//TODO: Rename to AppConstants after move all AppConstants to i18n
export const AppConstants1 = {
    admin: {
        token: '',
        firstName: '',
        lastName: ''
    }
}

export default AppConstants;
