export async function GET() {

  const users = [
    { id:1, name:"Ahmed Ali", email:"ahmed@test.com", role:"Admin", active:true },
    { id:2, name:"Sara Mohamed", email:"sara@test.com", role:"User", active:true },
    { id:3, name:"Omar Khaled", email:"omar@test.com", role:"User", active:false },
    { id:4, name:"Mona Hassan", email:"mona@test.com", role:"Manager", active:true },
    { id:5, name:"Ali Mahmoud", email:"ali@test.com", role:"User", active:false },
    { id:6, name:"Laila Sami", email:"laila@test.com", role:"User", active:true },
    { id:7, name:"Youssef Nasser", email:"youssef@test.com", role:"User", active:false },
    { id:8, name:"Ahmed ", email:"youssef@test.com", role:"User", active:true },
    
  ];

  return Response.json(users);
}