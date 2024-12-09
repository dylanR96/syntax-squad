export interface EditCustomer {
    email: string;
    address: string;
    zipcode: string;
    city: string;
    phoneNumber: string;
  }
  
  export interface GetCustomer {
    customerID: string;
    phoneNumber: string;
    city: string;
    zipcode: string;
    surname: string;
    firstname: string;
    address: string;
    email: string;
  }
  
  export interface GetOrdersByUserID {
    orderNO: number;
    price: number;
    orderDate: string;
    comment: string;
    status: string;
  }
  
  export interface EditFormProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    icon: string;
  }
  