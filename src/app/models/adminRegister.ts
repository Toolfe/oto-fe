export interface AdminRegister{
	fname:string,
   lname:string,
	email:string,
	mobile:string,
	 password:string 
}
export interface OTPRequest{
	fname:string,
   lname:string, 
	contact:string
}
export interface VerifyContact{
	contact:string,
   otp:string 
}
export interface OTPResponse{ 
	contact:string,
   status:boolean ,
   message:string
}