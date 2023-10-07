export class Unit{
     private id!: Number;
     private name!: string;
     private divisionName!: string;
     private locationName!: string;
     private description!: string;
     private active!: boolean;
     private departments!:Department[];
   
       /**
        * Getter $active
        * @return {boolean }
        */
       public get $active(): boolean  {
           return this.active;
       }
   
       /**
        * Setter $active
        * @param {boolean } value
        */
       public set $active(value: boolean ) {
           this.active = value;
       }
   
       /**
        * Getter $description
        * @return {string }
        */
       public get $description(): string  {
           return this.description;
       }
   
       /**
        * Setter $description
        * @param {string } value
        */
       public set $description(value: string ) {
           this.description = value;
       }
   
       /**
        * Getter $name
        * @return {string }
        */
       public get $name(): string  {
           return this.name;
       }
   
       /**
        * Setter $name
        * @param {string } value
        */
       public set $name(value: string ) {
           this.name = value;
       }
   
       /**
        * Getter $locationName
        * @return {string }
        */
       public get $locationName(): string  {
           return this.locationName;
       }
   
       /**
        * Setter $locationName
        * @param {string } value
        */
       public set $locationName(value: string ) {
           this.locationName = value;
       }
   
       /**
        * Getter $divisionName
        * @return {string}
        */
        public get $divisionName(): string {
            return this.divisionName;
        }
    
        /**
         * Setter $divisionName
         * @param {string} value
         */
        public set $divisionName(value: string) {
            this.divisionName = value;
        }
        
       /**
        * Getter $departments
        * @return {string}
        */
       public get $departments(): Department[] {
        return this.departments;
    }

    /**
     * Setter $departments
     * @param {string} value
     */
    public set $departments(value: Department[]) {
        this.departments = value;
    }
    
    /**
     * Setter $departments
     * @param {string} value
     */
     public set $department(value: Department) {
        this.departments.push(value);
    }
   
   }

export class Division
{
    private id!: Number;
     private name!: string; 
     private description!: string;
     private active!: boolean;
     private units!:Unit[];
  /**
        * Getter $active
        * @return {string }
        */
   public get $active(): boolean  {
    return this.active;
}

/**
 * Setter $active
 * @param {string } value
 */
public set $active(value: boolean ) {
    this.active = value;
}

/**
 * Getter $description
 * @return {string }
 */
public get $description(): string  {
    return this.description;
}

/**
 * Setter $description
 * @param {string } value
 */
public set $description(value: string ) {
    this.description = value;
}

/**
 * Getter $name
 * @return {string }
 */
public get $name(): string  {
    return this.name;
}

/**
 * Setter $name
 * @param {string } value
 */
public set $name(value: string ) {
    this.name = value;
}

 
 
/**
 * Getter $units
 * @return {string}
 */
public get $units(): Unit[] {
 return this.units;
}

/**
* Setter $units
* @param {string} value
*/
public set $units(value: Unit[]) {
 this.units = value;
}

/**
* Setter $units
* @param {string} value
*/
public set $unit(value: Unit) {
 this.units.push(value);
}
   
}
export class Location{

    private id!: Number;
     private name!: string; 
     private description!: string;
     private active!: boolean;
     private units!:Unit[];
       /**
        * Getter $active
        * @return {string }
        */
   public get $active(): boolean  {
    return this.active;
}

/**
 * Setter $active
 * @param {string } value
 */
public set $active(value: boolean ) {
    this.active = value;
}

/**
 * Getter $description
 * @return {string }
 */
public get $description(): string  {
    return this.description;
}

/**
 * Setter $description
 * @param {string } value
 */
public set $description(value: string ) {
    this.description = value;
}

/**
 * Getter $name
 * @return {string }
 */
public get $name(): string  {
    return this.name;
}

/**
 * Setter $name
 * @param {string } value
 */
public set $name(value: string ) {
    this.name = value;
}

 
 
/**
 * Getter $units
 * @return {string}
 */
public get $units(): Unit[] {
 return this.units;
}

/**
* Setter $units
* @param {string} value
*/
public set $units(value: Unit[]) {
 this.units = value;
}

/**
* Setter $units
* @param {string} value
*/
public set $unit(value: Unit) {
 this.units.push(value);
}
}
export class Department{

    private id!: Number;
     private name!: string; 
     private description!: string;
     private active!: boolean;
     private subdepartments!:SubDepartment[];
     private unit!:Unit;
       /**
        * Getter $active
        * @return {boolean }
        */
   public get $active(): boolean  {
    return this.active;
}

/**
 * Setter $active
 * @param {boolean } value
 */
public set $active(value: boolean ) {
    this.active = value;
}

/**
 * Getter $description
 * @return {string }
 */
public get $description(): string  {
    return this.description;
}

/**
 * Setter $description
 * @param {string } value
 */
public set $description(value: string ) {
    this.description = value;
}

/**
 * Getter $name
 * @return {string }
 */
 public get $name(): string  {
    return this.name;
}

/**
 * Setter $name
 * @param {string } value
 */
public set $name(value: string ) {
    this.name = value;
}

/**
 * Getter $unit
 * @return {string }
 */
 public get $unit(): Unit  {
    return this.unit;
}

/**
 * Setter $unit
 * @param {Unit } value
 */
public set $unit(value: Unit ) {
    this.unit = value;
}

 
 
/**
 * Getter $subdepartments
 * @return {SubDepartment}
 */
public get $subdepartments(): SubDepartment[] {
 return this.subdepartments;
}

/**
* Setter $subdepartments
* @param {SubDepartment} value
*/
public set $subdepartments(value: SubDepartment[]) {
 this.subdepartments = value;
}

/**
* Setter $subdepartments
* @param {SubDepartment} value
*/
public set $subdepartment(value: SubDepartment) {
 this.subdepartments.push(value);
}
}
export class SubDepartment{

    private id!: Number;
     private name!: string; 
     private description!: string;
     private active!: boolean; 
     private department!:Department;

          /**
        * Getter $active
        * @return {boolean }
        */
   public get $active(): boolean  {
    return this.active;
}

/**
 * Setter $active
 * @param {boolean } value
 */
public set $active(value: boolean ) {
    this.active = value;
}

/**
 * Getter $description
 * @return {string }
 */
public get $description(): string  {
    return this.description;
}

/**
 * Setter $description
 * @param {string } value
 */
public set $description(value: string ) {
    this.description = value;
}

/**
 * Getter $name
 * @return {string }
 */
 public get $name(): string  {
    return this.name;
}

/**
 * Setter $name
 * @param {string } value
 */
public set $name(value: string ) {
    this.name = value;
}

/**
 * Getter $unit
 * @return {Department }
 */
 public get $department(): Department  {
    return this.department;
}

/**
 * Setter $unit
 * @param {Department } value
 */
public set $department(value: Department ) {
    this.department = value;
}
 
 
}