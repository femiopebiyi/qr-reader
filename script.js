const wrapper = document.querySelector('.wrapper');

const  form = document.querySelector('form');

const fileInp =  document.querySelector('input')

const infoTxt = document.querySelector('p')

const img = document.querySelector('img')
const resultDisplay = document.querySelector('textarea');

const button =  document.querySelectorAll('button')

form.addEventListener('click',function(){
    fileInp.click()
})

function fetchRequest (formData, file){
    infoTxt.innerText = "Scanning Qr Code"
    fetch("http://api.qrserver.com/v1/read-qr-code/", {

    method: "POST",
    body: formData
    }).then((res)=>res.json()).then((result)=>{
        result = result[0].symbol[0].data;
        
        infoTxt.innerText = result ? "Upload QR Code to Read" : "Couldnt Read Qr Code"
        if(!result) return;
        wrapper.classList.add('active')
        resultDisplay.innerText = result
        img.src = URL.createObjectURL(file)
    }).catch((error)=>{
        infoTxt.innerText = "Couldnt Read Qr Code"

        setTimeout(()=>{
            infoTxt.innerText = "Upload QR Code to Read"
        },2000)

        console.log('wahala')
    })
}

fileInp.addEventListener ('change', function(e){
    let file = e.target.files[0]; //getting user selected file
    if (!file) return;
    let formData = new FormData() //creating a new formdata object
    formData.append('file', file) //adding selected file to formData
    fetchRequest(formData, file)

})


button[1].addEventListener("click", function(){
    let text = resultDisplay.textContent;

    navigator.clipboard.writeText(text)

    this.innerText = 'Copied';

    setTimeout(()=>{
        button[1].innerText = "Copy text"
    }, 2000)
})


button[0].addEventListener('click', ()=>{
    wrapper.classList.remove('active')
})


// function test (){
//     const formData = new FormData()
    
//     formData.append("name", "opebiyi femi")

//     let username = formData.get("name")

//     console.log(username)
// }

// test()