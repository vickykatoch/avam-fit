export interface Role {
      code                : string;
      description         : string;
      isAdmin             : boolean;
      isActive?           : string;
      priority?           : number;
  }
  
  export interface Resource {
      name                : string;
      caption             : string;
      type                : string; // Type of resource i.e Menu, display Item
      isActive            : boolean;
      icon?               : string;
      path?               : string;
      parent?             : string;
      target?             : string;         
  }
  
  export interface UserData {
      roles               : Role[];
      resources           : Resource;
  } 
  
  
  export interface User {
      userId              : string;
      name                : string;
      data                : UserData;
  }
  
  export const ResourceType = Object.freeze({
      MENU              : 'MENU',
      ACTION_ITEM       : 'ACTION_ITEM',
      ITEM              : 'ITEM'
  });
  