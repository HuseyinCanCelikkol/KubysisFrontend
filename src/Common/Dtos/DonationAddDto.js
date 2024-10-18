export default class DonationDto {
    constructor(obj = {}) {
      this.nameAndSurname = obj.nameAndSurname
      this.donationType = obj.donationType 
      this.donationClass = obj.donationClass  
      this.amount = obj.amount                  
      this.phoneNumber = obj.phoneNumber       
      this.donationStatus = 1
      this.description = obj.description     
      this.createUserId = obj.createUserId    
      this.companyId = obj.companyId         
    }
  }
  