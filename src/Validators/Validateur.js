class Validateur{
    static async validateurTelephone(phoneNumber){
        return await phoneNumber.replaceAll(' ', '').split('').every(item => '0123456789'.includes(item)) && phoneNumber.replaceAll(' ', '').length>=10 ? true : false;
    }

    static async validateurPassword(firstPassword, secondPassword){
        return await !firstPassword.includes(' ') && firstPassword.length >= 4 ? true : false;
    }

    static async validateurEmail(emailAdress){
        return await emailAdress.includes('@') && emailAdress.split('@').length == 2 &&  emailAdress.split('@')[1].split('.').length==2 && emailAdress.split('@')[1].split('.')[0]!="" && !emailAdress.split('@')[1].split('.')[0].split('').every(item=>'0123456789'.includes(item)) & !emailAdress.split('@')[1].split('.')[1].split('').every(item=>'0123456789'.includes(item)) ? true : false;
    }
}

export default Validateur;