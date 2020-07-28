pragma solidity 0.5.16;

contract StudentRecord{
    
    address public blockholic;
    string fromBlockholic;
    
    constructor() public{
        blockholic=msg.sender;
        fromBlockholic ="blockholic";
    }
    modifier onlyBlockholic(){
        require(msg.sender==blockholic,"You are not an authorized person");
        _;
    }
    
    /* create a struct for individual student details*/
    struct Student{
        address studentAddress;
        bytes32 fullName;
        bytes32 courseName;
        uint256 score;
        string  createdBy;
    }
    
    Student[] public student;/* array of student struct*/
    mapping(address=>Student) studentAddressList;/*mapping gives list of student addresses */
    
    function addStudent(address _studentAddress,bytes32 _fullName,bytes32 _courseName,uint256 _score) public onlyBlockholic() {
        /* adding student details only blockholic */
        /*create instance of the struct */
        
        Student memory _student = Student(_studentAddress,_fullName,_courseName,_score,fromBlockholic);
        student.push(_student); /*push the student record to the array*/
        studentAddressList[_studentAddress]=_student;/*instance address pass to studentAddressList*/
        
    }
    
    function getAllStudentAddress()public view returns(address[] memory){
        address[] memory studentsAddresses = new address[](student.length);
        
        for(uint i;i<student.length;i++){
            studentsAddresses[i]=student[i].studentAddress;
        }
        return(studentsAddresses);
    }
    
    function getAllStudents()    public view returns(bytes32[] memory,bytes32[] memory,uint256[] memory){
        bytes32[] memory fullNames = new bytes32[](student.length);
        bytes32[] memory courseNames = new bytes32[] (student.length);
        uint256[] memory scores = new uint256[] (student.length);
        
        for(uint i; i<student.length;i++){
            fullNames[i]=student[i].fullName;
            courseNames[i]=student[i].courseName;
            scores[i]= student[i].score;
        }
        return(fullNames,courseNames,scores);
    }
    
    function numberOfStudents() public view returns(uint256){
        return student.length;
    }
    
}