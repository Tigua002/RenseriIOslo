const state = {
    dialog: null,
    dialogActive: false,
    dialogDiv: null,
};
let order = {
    Navn: "Jakke",
    Antall: 5,
    Kommentar: "Veldig lang kommentar",
    Ekstra: ["Rens", "Bytte glidelås", "Fikse hull i jakke", "Knapp"]
}

const loadItems = async () => {
    try {
        const response = await fetch("/get/Items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });
        let answer = await response.json();
        if (!response.ok) {
            let message =
                "Internal server error, our fault not yours:  \n" +
                answer.message;
            alert(message);
            console.error(message);
            return;
        }
        console.log(answer);
        let uniqueItems = answer.reduce((acc, item) => {
            if (!acc.includes(item.Kategoriategory)) acc.push(item.Kategori);
            return acc;
        }, []);
        console.log(uniqueItems);
        let listings = document.getElementsByClassName("listings")[0];
        uniqueItems.forEach((kat) => {
            let CatDiv = document.createElement("div");
            let CatTitle = document.createElement("h1");

            listings.appendChild(CatDiv);
            CatDiv.appendChild(CatTitle);
            CatDiv.setAttribute("class", "kategori flex");
            CatDiv.setAttribute("id", kat);

            CatTitle.setAttribute("class", "katTitle");
            CatTitle.textContent = kat;
        });

        answer.forEach((item) => {
            let kat = document.getElementById(item.Kategori);
            let gjenstand = document.createElement("div");
            let bilde = document.createElement("img");
            let itemName = document.createElement("p");

            kat.appendChild(gjenstand);
            gjenstand.appendChild(bilde);
            gjenstand.appendChild(itemName);
            gjenstand.setAttribute("class", "gjenstander flex");

            bilde.setAttribute("class", "gjenstandBilde");
            bilde.setAttribute("src", "./" + item.Bilde);

            itemName.setAttribute("class", "gjenstandNavn");
            itemName.textContent = item.Navn;

            gjenstand.addEventListener("click", () => {
                openSale("popUpDialog", item.Navn, "popUp");
            });
        });
    } catch (err) {
        console.log(err);
        alert("Critical server fail, we apologise for the trouble");
    }
};
loadItems();

document.addEventListener("click", (event) => {
    // Check if the click is outside the dialog

    if (!document.getElementsByClassName(state.dialogDiv)[0]) {
        return
    }
    if (
        !document
            .getElementsByClassName(state.dialogDiv)[0]
            .contains(event.target) &&
        state.dialogActive
    ) {
        closeModal(state.dialog);
    }
});


const openSale = (name, item, div) => {
    let modal = document.getElementsByClassName(name)[0];
    modal.showModal();
    modal.style.display = "flex";
    if (item) {
        document.getElementsByClassName("DialogTitle")[0].textContent = item;
    }
    state.dialog = JSON.parse(JSON.stringify(name));
    state.dialogActive = true;
    setTimeout(() => { state.dialogDiv = JSON.parse(JSON.stringify(div)) }, 50)
    
    
    
};
const openModal = (name) => {
    let modal = document.getElementsByClassName(name)[0];
    modal.showModal();
    modal.style.display = "flex";
    state.dialog = JSON.parse(JSON.stringify(name));
    state.dialogActive = true;
};

const closeModal = (name) => {
    let modal = document.getElementsByClassName(name)[0];
    modal.close();
    modal.style.display = "none";
    state.dialog = null;
    state.dialogDiv = null;
};


const calcValue = () => {
    try {
        let total = 200
        let collection = document.getElementsByClassName("tjenesterCheck")
        
        for (let i = 0; i < collection.length; i++) {
            const Tjeneste = collection[i];
            if(Tjeneste.checked) {
                total += parseInt(Tjeneste.id)
            }
            
        }
        let sum = total * document.getElementsByClassName("numberValue")[0].value
        document.getElementsByClassName("setIKurv")[0].textContent = `Legg i handlekurv | ${sum}kr`
        


        

    } catch (err) {
        console.error(err)
        // window.location.reload()
    }
}

document.getElementById("minus").addEventListener("click", () => {
    if (!document.getElementsByClassName("numberValue")[0].value || document.getElementsByClassName("numberValue")[0].value <= 0) {
        document.getElementsByClassName("numberValue")[0].value = 0
        calcValue()
        return
    }


    document.getElementsByClassName("numberValue")[0].value = document.getElementsByClassName("numberValue")[0].value - 1
    calcValue()
})
document.getElementById("plus").addEventListener("click", () => {
    if (!document.getElementsByClassName("numberValue")[0].value) {
        document.getElementsByClassName("numberValue")[0].value = 0
        
    }

    document.getElementsByClassName("numberValue")[0].value = parseInt(document.getElementsByClassName("numberValue")[0].value) + 1
    calcValue()
})


let collection = document.getElementsByClassName("tjeneste")
for (let i = 0; i < collection.length; i++) {
    const Tjeneste = collection[i]
    console.log(Tjeneste);
    
    Tjeneste.addEventListener("click", () => {
        calcValue()
    })
    
}