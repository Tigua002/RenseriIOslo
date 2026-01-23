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
        let listings = document.getElementsByClassName("listings")[0]
        uniqueItems.forEach((kat) => {         
            let CatDiv = document.createElement("div")
            let CatTitle = document.createElement("h1")

            listings.appendChild(CatDiv)
            CatDiv.appendChild(CatTitle)
            CatDiv.setAttribute("class", "kategori flex")
            CatDiv.setAttribute("id", kat)

            CatTitle.setAttribute("class", "katTitle")
            CatTitle.textContent = kat
        })
        

        answer.forEach((item) => {
            let kat = document.getElementById(item.Kategori)
            let gjenstand = document.createElement("div");
            let bilde = document.createElement("img");
            let itemName = document.createElement("p");

            kat.appendChild(gjenstand)
            gjenstand.appendChild(bilde);
            gjenstand.appendChild(itemName);
            gjenstand.setAttribute("class", "gjenstander flex");

            bilde.setAttribute("class", "gjenstandBilde");
            bilde.setAttribute("src", "./" + item.Bilde);

            itemName.setAttribute("class", "gjenstandNavn")
            itemName.textContent = item.Navn

            gjenstand.addEventListener("click", () => {
                
            })

        });
    } catch (err) {
        console.log(err);
        alert("Critical server fail, we apologise for the trouble");
    }
};
loadItems();
