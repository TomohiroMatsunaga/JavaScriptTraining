// withを利用する場合
function testWith() {
  let myObject = {
      name: 'Jack',
      address: 'NewYork City',
      email: 'test@test.com'
  };
  
  with (myObject) {
      console.log(name);
      console.log(address);
      console.log(email);
  }
}

testWith();

// withを利用しない場合
function testWithout() {
  let myObject = {
      name: 'Jack',
      address: 'NewYork City',
      email: 'test@test.com'
  };
  
  console.log(myObject.name);
  console.log(myObject.address);
  console.log(myObject.email);
}

testWithout();