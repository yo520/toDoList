var add_input =document.getElementById("add-input");
var ptn =document.getElementById("btn");
var myselect=document.getElementById("myselect");
var searchinput=document.getElementById("search");
var allTodo=[];
var todoContainer=document.getElementById("todo-container");
if(localStorage.getItem("todolist")!=null)
{
    allTodo=JSON.parse(localStorage.getItem("todolist"));
    display(allTodo);
}
ptn.addEventListener("click" ,function(){
    var task={
        taskName:add_input.value,
        id:Math.floor(Math.random()*10000),
        iscompleted:false
    };
   allTodo.push(task);
    localStorage.setItem("todolist", JSON.stringify(allTodo))
   display(allTodo);
    
});

function display(data)
{
    var dataContainer=``;
    for(var i=0 ;i<data.length;i++)
    {
        dataContainer +=`
        <div class="col-11 ${data[i].iscompleted?"completed":""}">
            <div class="row bg-dark">
                <div class="col-8 py-3 fs-5">${data[i].taskName}</div>
                <div onclick="beCompleted(${i})" class="col-2 py-3 bg-success d-flex justify-content-center"><i class="fa-solid fa-check fs-3"></i></div>
                <div  onclick="delet(${i})" class="col-2 py-3 bg-danger d-flex justify-content-center"><i class="fa-solid fa-trash fs-4"></i></div>
            </div>

        </div>
        `
    }
    todoContainer.innerHTML=dataContainer;

    
}
function delet(index)
{
allTodo.splice(index,1);
localStorage.setItem("todolist",JSON.stringify(allTodo));
display(allTodo)
}
function beCompleted(index)
{
allTodo[index].iscompleted=true;
display(allTodo)
}

myselect.addEventListener("change",function(){
    switch(myselect.value)
    {
        case "All":
            display(allTodo);
            break;
        case "completed":
            var comp=allTodo.filter(function(comp){return comp.iscompleted==true});
            display(comp);   
            break;
        case "nonCompleted":
            var ncomp=allTodo.filter(function(ncomp){return ncomp.iscompleted==false});
            display(ncomp);
            break;    

    } 


})
searchinput.addEventListener("input",function(e){
var res=[];
for(var i=0;i<allTodo.length;i++)
{
    if(allTodo[i].taskName.includes(e.target.value))
    {
        res.push(allTodo[i]);
    }
}
display(res);

})