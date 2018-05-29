import { formatNumber } from 'libphonenumber-js'
export function orderHeading(code){
  if (!code){
    return;
  }
  switch (code) {
    case 10:
     return "order_status--new";
    case 20:
     return "order_status--processing";
    case 100:
     return "order_status--canceled";
    case 200:
     return "order_status--waitingForPayment";
    case 300:
     return "order_status--paymentInProgress";
    case 400:
     return "order_status--paymentAuthorized";
    case 500:
     return "order_status--paid";
    case 600:
     return "order_status--delivering";
    case 700:
      return "order_status--done";
    default:
     break;
  }
};

export function priceFormat(price){
    return new Intl.NumberFormat('ru-RU').format(parseInt(price, 10));
}

export function declension(q){
    var variants = ["товаров", "товар", "товара"];
    var index = q % 100;
    if (index >=11 && index <= 14) {
        index = 0;
    } else {
        index = (index %= 10) < 5 ? (index > 2 ? 2 : index): 0;
    }
    return(variants[index]);
}

export function checkErrorsDeeper(obj,output,search) {
    if( typeof search === 'string' ) {
        Object.keys(obj).map((key, i)=>{
            if( Object.prototype.toString.call(obj[key]) !== '[object Array]' ) {
                if (obj[key].hasOwnProperty(search)){
                    obj[key][search].map(newerr =>output.push(newerr));
                } else {
                    checkErrorsDeeper(obj[key],output,search);
                }
            }
            return true;
        })
    }
};

export function phoneFormat(phone){
    if(phone.charAt(0) === "3"){
        return formatNumber(phone.slice(3), 'BY', 'International')
    } else if(phone.charAt(0) === "7" || phone.charAt(0) === "8") {
        return formatNumber(phone.slice(1), 'RU', 'International')
    }
}

export function genderFormat(gender){
    switch (gender) {
        case "":
            return "Не указан"

        case "Male":
            return "Мужской"

        case "Female":
            return "Женский"

        default:
            return "Не указан"
    
    }
}
