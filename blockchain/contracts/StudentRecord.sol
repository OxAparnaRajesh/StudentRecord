pragma solidity 0.5.16;

contract StudentRecord{
    address public blockholic;
    string fromBlockholic;
    
    constructor() public{
        fromBlockholic="Blockholic";
        blockholic=msg.sender;
    }
    modifier onlyBlockholic(){
        require(msg.sender==blockholic,"You aren't authorized person");
        _;
    }
     /* create a struct for individual student details*/
    struct Student{
        bytes32 _fullName;
        bytes32 _courseName;
        uint256 _score;
        address _studentAddress;
        string _createBy;
    }
    Student[] students; /* array of student struct*/
    mapping(address=>Student) studentAddressList;/*mapping gives list of student addresses */
    
    function addStudent(bytes32 _fullName,bytes32 _courseName,uint256 _score,address _studentAddress)public onlyBlockholic(){
        /* adding student details only blockholic */
        /*create instance of the struct */
        
        Student memory _student = Student(_fullName,_courseName,_score,_studentAddress,fromBlockholic);
        students.push(_student); /*push the student record to the array*/
        studentAddressList[_studentAddress]=_student;/*instance address pass to studentAddressList*/
    }
    /* function for get all students address*/
    function getAllStudentAddress()public view returns(address[] memory){
        address[] memory _studentAddresses= new address[](students.length);
        for(uint i;i<students.length;i++){
            _studentAddresses[i]= students[i]._studentAddress;
        }
        return(_studentAddresses);
    }
    /* function for get all the students details */
    function getAllStudents()public view returns(bytes32[] memory,bytes32[] memory,uint256[] memory){
        bytes32[] memory _fullNames = new bytes32[](students.length);
        bytes32[] memory _courseNames =new bytes32[](students.length);
        uint256[] memory _scores = new uint256[](students.length);
        
        for(uint i;i<students.length;i++){
            _fullNames[i]=students[i]._fullName;
            _courseNames[i]=students[i]._courseName;
            _scores[i]=students[i]._score;            
        }
        return(_fullNames,_courseNames,_scores);        
    }
    /*function for get how many students are there in blockholic */
    function numberOfStudents()public view returns(uint256){
        return students.length;
    }
}