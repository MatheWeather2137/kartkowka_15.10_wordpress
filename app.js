const url = `http://localhost/wordpress/wp-json/wc/v3`

var ilosc = 0
var iloscteraz = 0

async function getData(){
    document.getElementById("lewo").innerHTML = ""

    const data = await fetch(`${url}/products`,{
        headers:{
            Authorization:`Basic ${btoa("Mathew:Mati002008")}`
        }
    })
    const json = await data.json()
    console.log(json)

    for(let i in json){
        const body = document.getElementById("lewo")

        const div = document.createElement("div")
        div.classList.add("divy")

        const nazwa = document.createElement("h1")
        nazwa.innerHTML ="Nazwa: " + json[i].name

        const cena = document.createElement("h2")
        cena.innerHTML ="Cena: " + json[i].regular_price + " zł"

        const ilosc = document.createElement("h3")
        ilosc.innerHTML ="Ilość: " + json[i].stock_quantity
        ilosc.setAttribute("id",json[i].id)

        const zilosc = document.createElement("input")
        zilosc.setAttribute("placeholder","Zwiększ ilość o...")
        zilosc.setAttribute("id","zilosc"+json[i].id)

        const zatwierdz = document.createElement("button")
        zatwierdz.innerHTML = "ZATWIERDŹ"
        zatwierdz.addEventListener('click',()=>{
            zwiększ(json[i].id, json[i].stock_quantity)
        })
        
        body.appendChild(div)
        div.appendChild(nazwa)
        div.appendChild(cena)
        div.appendChild(ilosc)
        div.appendChild(zilosc)
        div.appendChild(zatwierdz)
    }
}
getData()

async function dodaj(){
    const nazwa1 = document.getElementById("nazwa").value
    const cena1 = document.getElementById("cena").value
    const ilosc1 = parseInt(document.getElementById("ilosc").value)

    const body1 = {
        "stock_quantity":ilosc1 + 0,
        "name":nazwa1,
        "regular_price":cena1,
        "manage_stock":true
    }
    const data = await fetch(`${url}/products`,{
        method:"POST",
        body: JSON.stringify(body1),
        headers:{
            Authorization: `Basic ${btoa("Mathew:Mati002008")}`,
            "Content-Type": "application/json"
        }
    })
    const json = await data.json()
    console.log(json)

    getData()
}
async function zwiększ(id,iloscp){
    const ilosc = parseInt(document.getElementById(id).innerHTML)
    const iloscteraz = parseInt(document.getElementById("zilosc"+id).value)

    const body = {stock_quantity:ilosc+iloscteraz}

    const data = await fetch(`${url}/products/${id}`,{
        method:"POST",
        body: JSON.stringify(body),
        headers:{
            Authorization:`Basic ${btoa("Mathew:Mati002008")}`,
            "Content-Type":"application/json"
        }
        
    })
    const json = await data.json()
    console.log(json)

    getData()
}