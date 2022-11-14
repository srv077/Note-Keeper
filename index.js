const add=document.getElementById("addnotes");
const popup=document.getElementById("popup");
const close=document.getElementById("close");
const save=document.getElementById("save");
const shownotes=document.getElementById("shownotes");
const allnotes=document.getElementById("allnotes");
const closenotes=document.getElementById("closeimg");
const headnote=document.getElementById("headnotes");
let title=document.getElementById("title");
let date=document.getElementById("date");
let note=document.getElementById("note");
let updateposs = false;
let updateidnow;
add.addEventListener("click",function(e){
    headnote.innerText="Add Notes";
    popup.classList.remove("hide");
    popup.classList.add('show');
})
close.addEventListener("click",function(e){
    popup.classList.remove("show");
    popup.classList.add('hide');
})
save.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log(updateposs);
    if(updateposs==false){
        fetch("/notes",{
            method: "POST",
            headers:{
                "content-type": "application/json"
            },
            body:JSON.stringify({
                title:title.value,
                date:date.value,
                notes:note.value
            })
        })
    }else{
        console.log("worked");
        updatedata(updateidnow);
        updateposs=false;
        updateidnow=null;
    }
    popup.classList.remove("show");
    popup.classList.add('hide');
})
shownotes.addEventListener("click",function(e){
    console.log("clicked");
    allnotes.style.display="grid";
    allnotes.classList.remove("hide");
    allnotes.classList.add('show');
    getdata()
})
closenotes.addEventListener("click",function(e){
    console.log("clicked");
    allnotes.style.display="none";
    allnotes.classList.add("hide");
    allnotes.classList.remove('show');
})
function getdata(){
    fetch("/notes")
    .then((res)=>res.json())
    .then((data)=> append(data))
    .catch((e)=>console.log(e));
}

function append(data){
    console.log(data);
    console.log(data[0].id);
    data.map((e,i)=>{
    let div=document.createElement("div");
    let head=document.createElement("h3");
    let des=document.createElement("p");
    let dele=document.createElement("button");
    let update=document.createElement("button");
    head.innerText=`${e.id})\u00A0\u00A0${e.title}`;
    des.innerHTML=e.notes;
    dele.innerText="delete";
    update.innerText="update";
    dele.addEventListener("click",()=>{
        deletedata(e.id)
        e.preventDefault();
    })
    update.addEventListener("click",()=>{

        updateidnow=e.id;
        updateposs=true;
        console.log(updateposs);
        headnote.innerText="Update Notes";
        title.value=e.title;
        date.value=e.date;
        note.innerText=e.notes;
        popup.classList.remove("hide");
        popup.classList.add('show');
    })
    div.append(head,des,dele,update);
    div.setAttribute("class","notecard");
    document.getElementById("notesadded").append(div);
    })
}
function deletedata(id){
    fetch(`/notes/${id}`,{
         method:"DELETE"
    })
}
function updatedata(id){
    fetch(`/notes/${id}`,{
         method:"PATCH",
         headers:{
            "content-type": "application/json"
        },
        body:JSON.stringify({
          title:title.value,
          date:date.value,
          notes:note.value
        })
    }) 
}