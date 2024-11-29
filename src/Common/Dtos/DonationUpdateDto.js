export default class DonationUpdateDto {
    constructor(obj = {}) {
      this.nameAndSurname = obj.nameAndSurname
      this.donationType = obj.donationType 
      this.donationClass = obj.donationClass
      this.amount = obj.amount                  
      this.phoneNumber = obj.phoneNumber       
      this.description = obj.description    
    }
  }